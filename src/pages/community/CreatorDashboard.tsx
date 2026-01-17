import React, { useEffect, useMemo, useState } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { db } from '@/services/firebase';
import {
  collection,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
  orderBy,
  updateDoc,
  serverTimestamp,
  addDoc,
  getDoc,
  arrayUnion,
} from 'firebase/firestore';
import { motion } from 'framer-motion';
import { 
  BarChart3, Eye, ThumbsUp, FolderPlus, Trash2, ArrowRight, 
  TrendingUp, Trophy, Edit3, DollarSign, Zap 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { calculateReputation } from '@/utils/reputation';
import { emailService } from '@/services/emailService';

interface ResourceItem {
  id: string;
  title: string;
  category: 'automation' | 'project' | 'tool' | 'prompt';
  views?: number;
  upvotes?: number;
  isPaid?: boolean;
  price?: number;
  createdAt?: any;
}
interface RequestItem {
  id: string;
  resourceTitle: string;
  buyerName: string;
  buyerEmail: string;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  createdAt?: any;
}

const CreatorDashboard = () => {
  const { user, userProfile, loading } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<ResourceItem[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [deletingReqId, setDeletingReqId] = useState<string | null>(null);
  const [requestActionLoadingId, setRequestActionLoadingId] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate('/community/login');
      return;
    }
    const q = query(collection(db, 'community_resources'), where('userId', '==', user.uid));
    const unsub = onSnapshot(q, (snap) => {
      const all = snap.docs
        .map(d => {
          const data = d.data() as any;
          return {
            id: d.id,
            title: data.title || 'Untitled',
            category: (data.category || 'automation') as ResourceItem['category'],
            views: Number(data.views || 0),
            upvotes: Number((data.upvotes ?? data.stars) || 0),
            isPaid: !!data.isPaid,
            price: Number(data.price || 0),
            createdAt: data.createdAt
          };
        })
        .sort((a, b) => {
          const da = a.createdAt?.toDate?.() || new Date(0);
          const dbb = b.createdAt?.toDate?.() || new Date(0);
          return dbb.getTime() - da.getTime();
        });
      setItems(all);
    }, (e) => console.error(e));
    return () => unsub();
  }, [user, loading, navigate]);

  useEffect(() => {
    if (loading) return;
    if (!user) return;
    const q = query(
      collection(db, 'resource_access_requests'),
      where('ownerId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs
        .map(d => {
          const data = d.data() as any;
          return {
            id: d.id,
            resourceTitle: data.resourceTitle || '',
            buyerName: data.buyerName || 'Buyer',
            buyerEmail: data.buyerEmail || '',
            status: (data.status || 'pending') as RequestItem['status'],
            createdAt: data.createdAt
          } as RequestItem;
        })
        .sort((a, b) => {
          const da = a.createdAt?.toDate?.() || new Date(0);
          const dbb = b.createdAt?.toDate?.() || new Date(0);
          return dbb.getTime() - da.getTime();
        });
      setRequests(list);
    }, (e) => console.error(e));
    return () => unsub();
  }, [user, loading]);

  const handleApproveRequest = async (request: RequestItem & { buyerId?: string; resourceId?: string }) => {
    if (!user) return;
    if (!request.id) return;
    setRequestActionLoadingId(request.id);
    try {
      const reqRef = doc(db, 'resource_access_requests', request.id);
      const reqSnap = await getDoc(reqRef);
      if (!reqSnap.exists()) {
        setRequestActionLoadingId(null);
        return;
      }
      const data = reqSnap.data() as any;
      if (data.status !== 'pending') {
        setRequestActionLoadingId(null);
        return;
      }

      await updateDoc(reqRef, {
        status: 'approved',
        approvedAt: serverTimestamp(),
        approvedBy: user.uid,
      });

      if (data.resourceId && data.buyerId) {
        await updateDoc(doc(db, 'community_resources', data.resourceId), {
          purchasers: arrayUnion(data.buyerId),
        });
      }

      try {
        await addDoc(collection(db, 'resource_access_audit_logs'), {
          resourceId: data.resourceId,
          buyerId: data.buyerId,
          action: 'approved',
          performedBy: user.uid,
          requestId: request.id,
          createdAt: serverTimestamp(),
        });
      } catch (e) {
        console.error('Failed to write access audit log (approved from dashboard):', e);
      }

      if (data.buyerEmail) {
        const resTitle = data.resourceTitle || 'Resource';
        const priceText =
          data.isPaid && typeof data.price === 'number'
            ? `$${data.price || 0} ${
                (data.pricingType || 'one_time') === 'monthly' ? '(Monthly)' : '(One-time)'
              }`
            : 'Free';

        const messageLines = [
          `Good news – your access request has been approved for: ${resTitle}.`,
          '',
          `Price: ${priceText}`,
          '',
          'You can now access this resource directly from your TopEdge AI community account.',
          'Sign in, open the community resource page, and the resource will be unlocked for your account.',
        ];

        try {
          await emailService.sendContactEmails({
            name: data.buyerName || 'Buyer',
            email: data.buyerEmail,
            phone: '',
            companyName: '',
            subject: 'Your paid resource access has been approved',
            message: messageLines.join('\n'),
          });
        } catch (e) {
          console.error('Failed to send approval email from dashboard:', e);
        }
      }

      if (user.email) {
        const resTitle = data.resourceTitle || 'Resource';
        try {
          await emailService.sendContactEmails({
            name: user.displayName || 'Creator',
            email: user.email,
            phone: '',
            companyName: '',
            subject: 'You approved a paid resource access request',
            message: `You approved access for ${data.buyerEmail || 'a buyer'} to "${resTitle}".`,
          });
        } catch (e) {
          console.error('Failed to send creator confirmation email from dashboard:', e);
        }
      }

      if (data.buyerId && data.resourceId) {
        try {
          await addDoc(collection(db, 'notifications'), {
            recipientId: data.buyerId,
            senderId: user.uid,
            senderName: user.displayName || user.email || 'Creator',
            type: 'access_approved',
            resourceId: data.resourceId,
            resourceTitle: data.resourceTitle || 'Paid Resource',
            read: false,
            createdAt: serverTimestamp(),
          });
        } catch (e) {
          console.error('Failed to create access approved notification from dashboard:', e);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setRequestActionLoadingId(null);
    }
  };

  const handleRejectRequest = async (request: RequestItem) => {
    if (!user) return;
    if (!request.id) return;
    setRequestActionLoadingId(request.id);
    try {
      const reqRef = doc(db, 'resource_access_requests', request.id);
      const reqSnap = await getDoc(reqRef);
      if (!reqSnap.exists()) {
        setRequestActionLoadingId(null);
        return;
      }
      const data = reqSnap.data() as any;
      if (data.status !== 'pending') {
        setRequestActionLoadingId(null);
        return;
      }

      await updateDoc(reqRef, {
        status: 'rejected',
        rejectedAt: serverTimestamp(),
        rejectedBy: user.uid,
      });

      try {
        await addDoc(collection(db, 'resource_access_audit_logs'), {
          resourceId: data.resourceId,
          buyerId: data.buyerId,
          action: 'rejected',
          performedBy: user.uid,
          requestId: request.id,
          createdAt: serverTimestamp(),
        });
      } catch (e) {
        console.error('Failed to write access audit log (rejected from dashboard):', e);
      }

      if (data.buyerEmail) {
        const resTitle = data.resourceTitle || 'Resource';
        try {
          await emailService.sendContactEmails({
            name: data.buyerName || 'Buyer',
            email: data.buyerEmail,
            phone: '',
            companyName: '',
            subject: 'Your paid resource access request was rejected',
            message: `Your request for access to "${resTitle}" was rejected by the creator. You can contact them via the community profile if you believe this is a mistake.`,
          });
        } catch (e) {
          console.error('Failed to send rejection email from dashboard:', e);
        }
      }

      if (data.buyerId && data.resourceId) {
        try {
          await addDoc(collection(db, 'notifications'), {
            recipientId: data.buyerId,
            senderId: user.uid,
            senderName: user.displayName || user.email || 'Creator',
            type: 'access_rejected',
            resourceId: data.resourceId,
            resourceTitle: data.resourceTitle || 'Paid Resource',
            read: false,
            createdAt: serverTimestamp(),
          });
        } catch (e) {
          console.error('Failed to create access rejected notification from dashboard:', e);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setRequestActionLoadingId(null);
    }
  };

  const stats = useMemo(() => {
    const count = items.length;
    const views = items.reduce((sum, r) => sum + (r.views || 0), 0);
    const upvotes = items.reduce((sum, r) => sum + (r.upvotes || 0), 0);
    
    const rep = calculateReputation(
        {
            bio: userProfile?.description,
            photoURL: userProfile?.photoURL,
            github: userProfile?.github,
            linkedin: userProfile?.linkedin,
            websiteURL: userProfile?.websiteURL
        },
        items.map(i => ({ userId: user?.uid || '', upvotes: i.upvotes }))
    );

    return { count, views, upvotes, score: rep.score, tier: rep.tier };
  }, [items, userProfile, user]);

  const topByViews = useMemo(() => {
    return [...items].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 7);
  }, [items]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure? This cannot be undone.')) return;
    try {
      setDeletingId(id);
      await deleteDoc(doc(db, 'community_resources', id));
    } catch (e) {
      console.error(e);
    } finally {
      setDeletingId(null);
    }
  };
  const handleDeleteRequest = async (id: string) => {
    if (!window.confirm('Delete this request?')) return;
    try {
      setDeletingReqId(id);
      await deleteDoc(doc(db, 'community_requests', id));
    } catch (e) {
      console.error(e);
    } finally {
      setDeletingReqId(null);
    }
  };

  if (loading) {
    return (
      <CommunityLayout>
        <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB]">
          <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
        </div>
      </CommunityLayout>
    );
  }

  return (
    <CommunityLayout>
      <div className="min-h-screen bg-[#F8F9FB] text-slate-900 font-sans pb-16 md:pb-24">
        
        {/* Background Pattern */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

        <div className="container relative mx-auto px-4 sm:px-6 max-w-7xl pt-8 md:pt-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3">
                <BarChart3 className="w-3.5 h-3.5" />
                Creator Studio
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Overview</h1>
              <p className="text-slate-500 mt-2">Track your impact, reputation, and resource performance.</p>
            </div>
            <Link
              to="/community/submit-resource"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <FolderPlus className="w-5 h-5" />
              <span>New Resource</span>
            </Link>
          </div>

          {/* Stats Grid - MODIFIED FOR 2 COLUMNS ON MOBILE */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-10">
            {[
              { label: 'Total Views', value: stats.views.toLocaleString(), icon: Eye, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Total Upvotes', value: stats.upvotes.toLocaleString(), icon: ThumbsUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
              { label: 'Resources', value: stats.count, icon: FolderPlus, color: 'text-purple-600', bg: 'bg-purple-50' },
              { label: 'Reputation', value: `${stats.score} pts`, icon: Trophy, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-5 sm:p-6 rounded-[1.25rem] sm:rounded-[1.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className={cn("w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-colors group-hover:scale-110", stat.bg, stat.color)}>
                    <stat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  {i === 3 && <span className="text-[9px] sm:text-[10px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full uppercase hidden sm:inline-block">{stats.tier}</span>}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Analytics & Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            
            {/* PERFORMANCE CHART */}
            <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-200 shadow-sm p-6 sm:p-8 relative overflow-hidden">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-indigo-500" /> Performance
                        </h3>
                    </div>
                </div>
                
                {/* Custom CSS Bar Chart */}
                <div className="h-48 sm:h-64 w-full flex items-end gap-2 sm:gap-6">
                    {topByViews.length === 0 ? (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
                            <BarChart3 className="w-8 h-8 mb-2 opacity-50" />
                            <span className="text-sm font-medium">No view data yet</span>
                        </div>
                    ) : (
                        topByViews.map((item, index) => {
                            const maxViews = Math.max(...topByViews.map(i => i.views || 0), 10);
                            const heightPercentage = Math.max(((item.views || 0) / maxViews) * 100, 5); // Min 5% height
                            
                            return (
                                <div key={item.id} className="flex-1 flex flex-col items-center group h-full justify-end relative">
                                    {/* Tooltip */}
                                    <div className="absolute bottom-[calc(100%+8px)] bg-slate-900 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 z-10 shadow-xl whitespace-nowrap">
                                        {item.views} Views
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                                    </div>

                                    {/* Bar */}
                                    <div 
                                        className="w-full max-w-[64px] bg-indigo-50 rounded-t-xl relative overflow-hidden transition-all duration-500 ease-out group-hover:bg-indigo-100"
                                        style={{ height: `${heightPercentage}%` }}
                                    >
                                        <div className="absolute bottom-0 left-0 right-0 top-0 bg-gradient-to-t from-indigo-500 to-violet-400 opacity-80 group-hover:opacity-100 transition-opacity" />
                                    </div>

                                    {/* Label */}
                                    <div className="mt-3 w-full text-center">
                                        <p className="text-[10px] font-bold text-slate-500 truncate w-full px-1">{item.title}</p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            {/* QUICK TIPS WIDGET */}
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-xl shadow-slate-900/10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none" />
                <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-indigo-300 ring-1 ring-white/20">
                        <Zap className="w-6 h-6" fill="currentColor" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">Boost Your Reach</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        Top creators update their resources weekly. Adding a <span className="text-white font-bold">Demo Video</span> increases views by 3.5x on average.
                    </p>
                </div>
                <div className="relative z-10 mt-6 pt-6 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                        <span>Next Milestone</span>
                        <span>{stats.tier === 'Builder' ? '50 pts' : stats.tier === 'Architect' ? '200 pts' : 'Max Level'}</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-400 to-purple-400 h-full rounded-full" style={{ width: '65%' }}></div>
                    </div>
                </div>
            </div>
          </div>

          {/* Resources Table List */}
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-slate-900">Your Resources</h3>
                <div className="flex gap-2">
                    <select className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-slate-200 cursor-pointer">
                        <option>Newest First</option>
                        <option>Most Viewed</option>
                        <option>Most Upvotes</option>
                    </select>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                            <th className="px-8 py-4 first:pl-8">Resource</th>
                            <th className="px-6 py-4">Stats</th>
                            <th className="px-6 py-4">Monetization</th>
                            <th className="px-6 py-4 text-right last:pr-8">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-8 py-16 text-center">
                                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                                        <FolderPlus className="w-8 h-8" />
                                    </div>
                                    <p className="text-slate-900 font-bold mb-1">No resources found</p>
                                    <p className="text-slate-500 text-sm mb-4">Start building your portfolio today.</p>
                                    <Link to="/community/submit-resource" className="text-indigo-600 font-bold text-sm hover:underline">Create your first resource</Link>
                                </td>
                            </tr>
                        ) : (
                            items.map((item) => (
                                <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg shrink-0">
                                                {item.title.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="min-w-0 max-w-xs">
                                                <p className="font-bold text-slate-900 truncate">{item.title}</p>
                                                <p className="text-xs text-slate-500 font-medium capitalize flex items-center gap-1.5 mt-0.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                    {item.category}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
                                            <div className="flex items-center gap-1.5 min-w-[60px]" title="Views">
                                                <Eye className="w-4 h-4 text-slate-400" /> {item.views}
                                            </div>
                                            <div className="flex items-center gap-1.5" title="Upvotes">
                                                <ThumbsUp className="w-4 h-4 text-slate-400" /> {item.upvotes}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={cn(
                                            "inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide",
                                            item.isPaid 
                                                ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                                                : "bg-slate-100 text-slate-600 border border-slate-200"
                                        )}>
                                            {item.isPaid ? `$${item.price}` : 'Free'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                            <Link 
                                                to={`/community/resource/${item.id}`}
                                                className="p-2 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200 transition-all"
                                                title="View Page"
                                            >
                                                <ArrowRight className="w-4 h-4" />
                                            </Link>
                                            <Link 
                                                to={`/community/resource/${item.id}`} 
                                                className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-white border border-transparent hover:border-indigo-100 transition-all"
                                                title="Edit Details"
                                            >
                                                <Edit3 className="w-4 h-4" />
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(item.id)}
                                                disabled={deletingId === item.id}
                                                className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-white border border-transparent hover:border-red-100 transition-all"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
          </div>

          {/* Access Requests */}
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden mt-10">
            <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Access Requests</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {requests.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-3 text-slate-400">
                    <FolderPlus className="w-6 h-6" />
                  </div>
                  <p className="text-sm text-slate-500">No access requests yet.</p>
                </div>
              ) : (
                requests.map((r) => (
                  <div key={r.id} className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-slate-900 truncate">{r.resourceTitle || 'Paid Resource'}</div>
                        <div className="text-xs text-slate-500 mt-1">
                          {r.buyerName} • {r.buyerEmail}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteRequest(r.id)}
                        disabled={deletingReqId === r.id}
                        className="inline-flex items-center gap-1 px-3 py-2 text-xs font-bold rounded-lg bg-red-50 border border-red-100 text-red-600 hover:bg-red-100 disabled:opacity-50"
                        title="Delete Request"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide",
                        r.status === 'approved'
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          : r.status === 'rejected'
                          ? "bg-red-50 text-red-700 border border-red-100"
                          : r.status === 'expired'
                          ? "bg-slate-100 text-slate-700 border border-slate-200"
                          : "bg-amber-50 text-amber-700 border border-amber-100"
                      )}>
                        {r.status}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRejectRequest(r)}
                          disabled={r.status !== 'pending' || requestActionLoadingId === r.id}
                          className="px-3 py-2 text-xs font-bold rounded-lg bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleApproveRequest(r as any)}
                          disabled={r.status !== 'pending' || requestActionLoadingId === r.id}
                          className="px-3 py-2 text-xs font-bold rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50"
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </CommunityLayout>
  );
};

export default CreatorDashboard;
