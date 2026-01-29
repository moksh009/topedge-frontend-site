import React, { useEffect, useMemo, useState } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import CommunitySEO from '@/components/community/CommunitySEO';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '@/services/firebase';
import { addDoc, collection, doc, getDoc, increment, onSnapshot, orderBy, query, serverTimestamp, updateDoc, deleteDoc } from 'firebase/firestore';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Sparkles, DollarSign, AlarmClock, X, Plus, Search, ThumbsUp, ArrowUpRight, Phone, Mail, ChevronRight, Edit3, User, Briefcase, Trash2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import { isAdminEmail } from '@/utils/admin';

type RequestItem = {
  id: string;
  title: string;
  description?: string;
  budget?: string;
  techStack?: string[];
  urgency?: 'ASAP' | 'Soon' | 'Flexible';
  contactEmail: string;
  contactPhone?: string;
  upvotes?: number;
  requesterId?: string;
  requesterName?: string;
  requesterPhoto?: string;
  createdAt?: any;
};

const urgencyConfig = {
  ASAP: { label: 'Urgent', color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100', icon: AlarmClock },
  Soon: { label: 'Soon', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', icon: AlarmClock },
  Flexible: { label: 'Flexible', color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200', icon: Sparkles },
};

export default function RequestBoard() {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const [items, setItems] = useState<RequestItem[]>([]);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'urgent' | 'high_budget'>('all');
  const [submitting, setSubmitting] = useState(false);
  const [contactItem, setContactItem] = useState<RequestItem | null>(null);
  const [showProfilePrompt, setShowProfilePrompt] = useState(false);
  const [deleteRequestItem, setDeleteRequestItem] = useState<RequestItem | null>(null);
  
  // Edit Mode State
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    description: '',
    budget: '',
    techStack: '',
    urgency: 'ASAP',
    contactEmail: '',
    contactPhone: ''
  });

  // Fetch Requests
  useEffect(() => {
    const q = query(collection(db, 'community_requests'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map(d => ({
        id: d.id,
        ...d.data(),
        techStack: d.data().techStack || [],
        upvotes: d.data().upvotes || 0,
      })) as RequestItem[];
      
      setItems(list);
    }, (error) => {
      console.error("Error fetching requests:", error);
    });
    return () => unsub();
  }, []);

  // Handle "Post Request" Click (Profile Check)
  const handlePostClick = async () => {
    if (!user) {
      navigate('/community/login');
      return;
    }
    try {
        const profileDoc = await getDoc(doc(db, 'public_profiles', user.uid));
        if (!profileDoc.exists()) {
            setShowProfilePrompt(true);
            return;
        }
        // Pre-fill email from profile if available
        setForm(prev => ({ 
            ...prev, 
            contactEmail: userProfile?.email || user.email || '',
            contactPhone: (userProfile as any)?.phone || '' 
        }));
        setEditingId(null);
        setOpen(true);
    } catch (e) {
        console.error(e);
        toast.error("Error checking profile.");
    }
  };

  const handleEditClick = (item: RequestItem) => {
      setForm({
          title: item.title,
          description: item.description || '',
          budget: item.budget || '',
          techStack: item.techStack?.join(', ') || '',
          urgency: (item.urgency as any) || 'ASAP',
          contactEmail: item.contactEmail,
          contactPhone: item.contactPhone || ''
      });
      setEditingId(item.id);
      setOpen(true);
  };

  const handleUpvote = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return toast.error("Login to upvote");
    try {
      const ref = doc(db, 'community_requests', id);
      await updateDoc(ref, { upvotes: increment(1) });
      toast.success("Upvoted!");
    } catch (error) {
      console.error(error);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.contactEmail) return;
    setSubmitting(true);
    
    try {
      const data = {
        title: form.title.trim(),
        description: form.description.trim(),
        budget: form.budget.trim(),
        techStack: form.techStack.split(',').map(t => t.trim()).filter(Boolean),
        urgency: form.urgency,
        contactEmail: form.contactEmail.trim(),
        contactPhone: form.contactPhone.trim(),
      };

      if (editingId) {
          // Update Existing
          await updateDoc(doc(db, 'community_requests', editingId), {
              ...data,
          });
          toast.success("Request updated!");
      } else {
          // Create New
          await addDoc(collection(db, 'community_requests'), {
            ...data,
            upvotes: 0,
            createdAt: serverTimestamp(),
            requesterId: user!.uid,
            requesterName: userProfile?.fullName || 'Anonymous',
            requesterPhoto: userProfile?.photoURL || ''
          });
          toast.success("Request posted successfully!");
      }
      
      setOpen(false);
      setForm({ title: '', description: '', budget: '', techStack: '', urgency: 'ASAP', contactEmail: '', contactPhone: '' });
      setEditingId(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save request.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSolveClick = (item: RequestItem) => {
    if (item.contactPhone) {
        setContactItem(item);
    } else {
        window.location.href = `mailto:${item.contactEmail}?subject=Regarding Request: ${item.title}`;
    }
  };

  const handleDeleteRequest = async (item: RequestItem) => {
    if (!user) {
      toast.error("You must be logged in to delete a request");
      return;
    }

    const canDelete = user.uid === item.requesterId || isAdminEmail(user.email);
    if (!canDelete) {
      toast.error("You do not have permission to delete this request");
      return;
    }

    try {
      await deleteDoc(doc(db, 'community_requests', item.id));
      toast.success('Request deleted');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete request');
    }
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.techStack?.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      
      if (!matchesSearch) return false;
      if (filter === 'urgent') return item.urgency === 'ASAP';
      if (filter === 'high_budget') {
        const b = parseInt(item.budget?.replace(/[^0-9]/g, '') || '0');
        return b >= 1000;
      }
      return true;
    });
  }, [items, searchTerm, filter]);

  const displayedItems = useMemo(() => {
    if (!user && filteredItems.length > 3) {
      return filteredItems.slice(0, 3);
    }
    return filteredItems;
  }, [filteredItems, user]);

  const masonry = useMemo(() => {
    const left: RequestItem[] = [];
    const right: RequestItem[] = [];
    displayedItems.forEach((r, i) => (i % 2 === 0 ? left : right).push(r));
    return { left, right };
  }, [displayedItems]);

  return (
    <CommunityLayout>
      <CommunitySEO 
        title="Request Board - Hire AI Talent & Projects"
        description="Post your AI project requests or find paid opportunities. Connect with skilled developers and founders."
        url="/community/requests"
      />
      <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans pb-24 relative overflow-hidden">
        
        <div className="container relative mx-auto px-4 sm:px-6 max-w-7xl pt-10 md:pt-12">
          
          {/* Header */}
          {/* UPDATED: flex-col items-center (mobile) -> md:flex-row md:items-end (desktop) */}
          {/* UPDATED: mb-6 md:mb-10 (Reduced margin bottom) */}
          <div className="flex flex-col items-center md:flex-row md:items-end justify-between mb-6 md:mb-10 gap-8 text-center md:text-left">
            <div className="relative z-10 flex flex-col items-center md:items-start">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-[11px] font-bold uppercase tracking-wider text-indigo-600 mb-5 shadow-sm">
                <Sparkles className="w-3 h-3" />
                Reverse Marketplace
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4 leading-tight">
                Community Requests
              </h1>
              <p className="text-lg text-slate-500 max-w-xl leading-relaxed">
                Find your next freelance gig or automation project. Solve real problems posted by businesses.
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={handlePostClick}
              className="w-fit group relative inline-flex justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:shadow-2xl hover:shadow-slate-300/50 transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[length:200%_auto] animate-gradient" />
              <span className="relative z-10 flex items-center gap-2">
                <Plus className="w-5 h-5" /> Post a Request
              </span>
            </motion.button>
          </div>

          {/* Floating Filter Bar */}
          <div className="sticky top-24 z-30 mb-10">
            <div className="p-2 bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-[24px] shadow-lg shadow-slate-200/20 flex flex-col sm:flex-row gap-2 ring-1 ring-slate-900/5">
                <div className="relative flex-grow group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                        <Search className="w-4 h-4" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Search for Python, Real Estate, Automation..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-12 pl-12 pr-4 bg-transparent outline-none font-medium text-slate-700 placeholder:text-slate-400 rounded-xl focus:bg-white/50 transition-all"
                    />
                </div>
                <div className="hidden sm:block w-px h-8 bg-slate-200 my-auto mx-2" />
                <div className="flex bg-slate-100/50 p-1 rounded-xl gap-1 overflow-x-auto no-scrollbar">
                    {(['all', 'urgent', 'high_budget'] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={cn(
                            "px-5 h-10 rounded-xl text-xs font-bold capitalize transition-all whitespace-nowrap",
                            filter === f 
                                ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200" 
                                : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                            )}
                        >
                            {f.replace('_', ' ')}
                        </button>
                    ))}
                </div>
            </div>
          </div>

          {/* Grid Layout */}
          {filteredItems.length === 0 ? (
             <div className="text-center py-32 bg-white rounded-[32px] border border-dashed border-slate-300">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300 shadow-inner">
                   <Search className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">No requests found</h3>
                <p className="text-slate-500">Try adjusting your filters or be the first to post.</p>
             </div>
          ) : (
            <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[masonry.left, masonry.right].map((col, ci) => (
                <div key={ci} className="space-y-6">
                  {col.map((r, i) => {
                    const urgency = urgencyConfig[r.urgency || 'Flexible'];
                    const UrgencyIcon = urgency.icon;
                    const isOwner = user && (user.uid === r.requesterId || isAdminEmail(user.email));

                    return (
                      <motion.div
                        key={r.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="group relative bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 hover:border-indigo-100 transition-all duration-300"
                      >
                        {/* Header: Requester Info + Edit Button */}
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-50">
                            <Link to={r.requesterId ? `/community/profile/${r.requesterId}` : '#'} className="flex items-center gap-3 group/user">
                                {r.requesterPhoto ? (
                                    <img src={r.requesterPhoto} alt={r.requesterName} className="w-8 h-8 rounded-full object-cover border border-slate-100" />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                        <User className="w-4 h-4" />
                                    </div>
                                )}
                                <span className="text-xs font-bold text-slate-600 group-hover/user:text-indigo-600 transition-colors">
                                    {r.requesterName || 'Anonymous User'}
                                </span>
                            </Link>
                            
                            {isOwner && (
                              <div className="flex items-center gap-1">
                                <button 
                                    onClick={() => handleEditClick(r)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                                    title="Edit Request"
                                >
                                    <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setDeleteRequestItem(r)}
                                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all"
                                    title="Delete Request"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            )}
                        </div>

                        {/* Title & Badge */}
                        <div className="flex items-start justify-between mb-5">
                           <div className="flex flex-col">
                                <h3 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-indigo-600 transition-colors">
                                    {r.title}
                                </h3>
                                <div className="flex items-center gap-2 mt-2.5">
                                    <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1", urgency.bg, urgency.color, "border", urgency.border)}>
                                        <UrgencyIcon className="w-3 h-3" /> {urgency.label}
                                    </span>
                                    <span className="text-xs text-slate-400 font-medium px-2 border-l border-slate-200">
                                        {r.createdAt?.toDate ? r.createdAt.toDate().toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'New'}
                                    </span>
                                </div>
                           </div>
                           
                           <div className="flex flex-col items-end">
                                <div className="bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-100 font-extrabold text-sm shadow-sm">
                                    {r.budget ? `$${r.budget}` : 'Open'}
                                </div>
                           </div>
                        </div>

                        {/* Description */}
                        <p className="text-slate-600 leading-relaxed text-sm mb-6 line-clamp-3">
                           {r.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-2 mb-8">
                           {(r.techStack || []).slice(0, 4).map((t, idx) => (
                              <span key={idx} className="px-3 py-1.5 bg-slate-50 border border-slate-100 text-slate-600 text-xs font-bold rounded-lg group-hover:bg-indigo-50/50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-colors">
                                 {t}
                              </span>
                           ))}
                           {(r.techStack?.length || 0) > 4 && (
                               <span className="px-2 py-1.5 text-xs font-bold text-slate-400">+{(r.techStack?.length || 0) - 4}</span>
                           )}
                        </div>

                        {/* Footer Actions */}
                        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                           <button 
                              onClick={(e) => handleUpvote(e, r.id)}
                              className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors group/upvote py-2 px-1"
                           >
                              <ThumbsUp className="w-4 h-4 group-hover/upvote:scale-110 transition-transform" />
                              <span className="text-xs font-bold">{r.upvotes || 0}</span>
                           </button>

                           <button
                              onClick={() => {
                                if (!user) {
                                  navigate('/community/signup');
                                  return;
                                }
                                handleSolveClick(r);
                              }}
                              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-indigo-600 transition-all shadow-md hover:shadow-lg group/btn transform active:scale-95"
                           >
                              Solve This
                              <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                           </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ))}
            </div>
            {!user && (
               <div className="w-full flex flex-col items-center justify-center py-16 text-center bg-white/50 backdrop-blur-sm rounded-[2.5rem] border border-slate-200 border-dashed mt-8 relative overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50 pointer-events-none" />
                   
                   <div className="relative z-10 flex flex-col items-center px-4">
                       <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md ring-1 ring-slate-100 group-hover:scale-110 transition-transform duration-500">
                           <Briefcase className="w-8 h-8 text-indigo-500" />
                       </div>
                       <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
                           Login to view all {filteredItems.length} requests
                       </h3>
                       <p className="text-slate-500 max-w-md mb-8 leading-relaxed">
                           Join our community to access paid opportunities and collaborate on projects. It's free to join.
                       </p>
                       <Link 
                           to="/community/signup"
                           className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1 flex items-center gap-2"
                       >
                           Sign Up Now <ArrowRight className="w-4 h-4" />
                       </Link>
                   </div>
               </div>
            )}
            </>
          )}
        </div>

        <AnimatePresence>
          {open && (
            <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6">
              <motion.div 
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }} 
                 exit={{ opacity: 0 }} 
                 className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                 onClick={() => setOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-white rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden ring-1 ring-white/20"
              >
                <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 bg-slate-50/80 backdrop-blur-md">
                  <div>
                     <h2 className="text-xl font-bold text-slate-900">{editingId ? 'Edit Request' : 'Post a Request'}</h2>
                     <p className="text-xs text-slate-500 mt-1 font-medium">Connect with builders to solve your problem.</p>
                  </div>
                  <button onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <form onSubmit={submit} className="p-8 space-y-6 max-h-[80vh] overflow-y-auto">
                  
                  {/* Title Input */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block pl-1">Project Title</label>
                    <input
                      value={form.title}
                      onChange={e => setForm({ ...form, title: e.target.value })}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold text-slate-900 placeholder:font-normal placeholder:text-slate-400"
                      placeholder="e.g. AI Voice Agent for Dental Clinic"
                      required
                    />
                  </div>
                  
                  {/* Budget & Urgency */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block pl-1">Budget (USD)</label>
                        <div className="relative">
                           <DollarSign className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                           <input
                              value={form.budget}
                              onChange={e => setForm({ ...form, budget: e.target.value })}
                              className="w-full pl-11 pr-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-bold"
                              placeholder="500"
                           />
                        </div>
                     </div>
                     <div>
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block pl-1">Urgency</label>
                        <div className="relative">
                           <select
                              value={form.urgency}
                              onChange={e => setForm({ ...form, urgency: e.target.value as any })}
                              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none font-bold text-slate-700"
                           >
                              <option value="ASAP">🚨 ASAP (Critical)</option>
                              <option value="Soon">📅 Soon (This Month)</option>
                              <option value="Flexible">✨ Flexible</option>
                           </select>
                           <ArrowUpRight className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none rotate-90" />
                        </div>
                     </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block pl-1">Details & Requirements</label>
                    <textarea
                      value={form.description}
                      onChange={e => setForm({ ...form, description: e.target.value })}
                      rows={4}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none text-slate-700 font-medium"
                      placeholder="Describe what you need built..."
                    />
                  </div>

                  {/* Contact Info */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                     <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-indigo-500" /> Contact Information
                     </h4>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Email (Required)</label>
                            <input
                                type="email"
                                value={form.contactEmail}
                                onChange={e => setForm({ ...form, contactEmail: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all"
                                placeholder="you@company.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Phone (Optional)</label>
                            <input
                                type="tel"
                                value={form.contactPhone}
                                onChange={e => setForm({ ...form, contactPhone: e.target.value })}
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 transition-all"
                                placeholder="+1 234..."
                            />
                        </div>
                     </div>
                  </div>
                  
                  {/* Tech Stack */}
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block pl-1">Preferred Tech Stack</label>
                    <input
                       value={form.techStack}
                       onChange={e => setForm({ ...form, techStack: e.target.value })}
                       className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                       placeholder="n8n, Python, Vapi..."
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Sparkles className="w-5 h-5" /> {editingId ? 'Save Changes' : 'Publish Request'}</>}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* --- CONTACT SELECTION MODAL --- */}
        <AnimatePresence>
            {contactItem && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        onClick={() => setContactItem(null)}
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 10 }} 
                        animate={{ opacity: 1, scale: 1, y: 0 }} 
                        exit={{ opacity: 0, scale: 0.9, y: 10 }} 
                        className="relative bg-white p-8 rounded-[2rem] shadow-2xl max-w-sm w-full overflow-hidden text-center"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Decor */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
                        
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-600 shadow-sm">
                            <Briefcase className="w-8 h-8" />
                        </div>

                        <h3 className="text-xl font-bold text-slate-900 mb-2">Connect with Requester</h3>
                        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                            How would you like to reach out regarding <span className="font-bold text-slate-700">"{contactItem.title}"</span>?
                        </p>

                        <div className="space-y-3">
                            <a 
                                href={`mailto:${contactItem.contactEmail}?subject=Regarding: ${contactItem.title}`}
                                className="flex items-center justify-between px-5 py-4 rounded-xl border-2 border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/50 transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-slate-100 rounded-lg text-slate-600 group-hover:bg-white group-hover:text-indigo-600 transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-slate-700 group-hover:text-indigo-900">Send Email</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-400" />
                            </a>

                            {contactItem.contactPhone && (
                                <a 
                                    href={`tel:${contactItem.contactPhone}`}
                                    className="flex items-center justify-between px-5 py-4 rounded-xl border-2 border-slate-100 hover:border-emerald-100 hover:bg-emerald-50/50 transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-100 rounded-lg text-slate-600 group-hover:bg-white group-hover:text-emerald-600 transition-colors">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <span className="font-bold text-slate-700 group-hover:text-emerald-900">Call Phone</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-400" />
                                </a>
                            )}
                        </div>

                        <button 
                            onClick={() => setContactItem(null)} 
                            className="mt-8 text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-wider"
                        >
                            Cancel
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
        <AnimatePresence>
          {showProfilePrompt && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={() => setShowProfilePrompt(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 z-10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900/5 flex items-center justify-center text-slate-900">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Promote your public profile</h2>
                    <p className="text-sm text-slate-500">
                      You need a public profile to post requests on the board.
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowProfilePrompt(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50"
                  >
                    Not now
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowProfilePrompt(false);
                      navigate('/community/promote-profile');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 text-sm font-bold text-white hover:bg-slate-800"
                  >
                    Promote profile
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {deleteRequestItem && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                onClick={() => deleteRequestItem && setDeleteRequestItem(null)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 z-10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
                    <Trash2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Delete request?</h2>
                    <p className="text-sm text-slate-500">
                      This will remove the request from the board for everyone.
                    </p>
                  </div>
                </div>
                <p className="text-xs text-rose-500 font-medium mb-6">
                  This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setDeleteRequestItem(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (deleteRequestItem) {
                        handleDeleteRequest(deleteRequestItem);
                        setDeleteRequestItem(null);
                      }
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 text-sm font-bold text-white hover:bg-rose-700 shadow-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </CommunityLayout>
  );
}

function Loader2({ className }: { className?: string }) {
   return (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
   );
}
