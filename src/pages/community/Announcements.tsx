import React, { useState, useEffect } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { motion } from 'framer-motion';
import { Bell, Calendar, Tag, Plus, Megaphone, PartyPopper, Trophy, Info, Rocket, ArrowRight, Radio } from 'lucide-react';
import { collection, query, getDocs, orderBy, doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { isAdminEmail } from '@/utils/admin';

interface Announcement {
  id: string;
  title: string;
  content: string;
  createdAt: any;
  tag: 'update' | 'win' | 'milestone' | 'news';
  author: string;
}

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const isAdmin = user && isAdminEmail(user.email);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const q = query(
          collection(db, 'community_announcements'),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const announcementsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Announcement[];
        setAnnouncements(announcementsData);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  const getTagConfig = (tag: string) => {
    switch (tag) {
      case 'update': 
        return { 
          color: 'bg-blue-50 text-blue-700 border-blue-200', 
          icon: Rocket,
          label: 'System Update'
        };
      case 'win': 
        return { 
          color: 'bg-amber-50 text-amber-700 border-amber-200', 
          icon: Trophy,
          label: 'Community Win'
        };
      case 'milestone': 
        return { 
          color: 'bg-purple-50 text-purple-700 border-purple-200', 
          icon: PartyPopper,
          label: 'Major Milestone'
        };
      default: 
        return { 
          color: 'bg-emerald-50 text-emerald-700 border-emerald-200', 
          icon: Radio,
          label: 'News & Info'
        };
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp?.toDate) return 'Just now';
    return timestamp.toDate().toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
    });
  };

  return (
    <CommunityLayout>
      <div className="min-h-screen bg-slate-50/50 pb-20">
        
        {/* Background Pattern */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        <div className="container relative mx-auto px-4 sm:px-6 max-w-5xl pt-16 sm:pt-24">
          
          {/* ================= HEADER ================= */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold uppercase tracking-wider text-rose-500 mb-6">
                <Megaphone className="w-3.5 h-3.5" />
                Latest Updates
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                What's new in <br className="hidden md:block" />
                <span className="text-slate-500">TopEdge AI.</span>
              </h1>
            </motion.div>

            {isAdmin && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <Link 
                  to="/community/admin/announcements"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 hover:-translate-y-1 transition-all shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)]"
                >
                  <Plus className="w-5 h-5" />
                  New Post
                </Link>
              </motion.div>
            )}
          </div>

          {/* ================= TIMELINE FEED ================= */}
          <div className="relative">
            {/* Vertical Line (Desktop only) */}
            <div className="hidden md:block absolute left-[140px] top-4 bottom-10 w-px bg-slate-200" />

            {loading ? (
                <div className="flex flex-col items-center justify-center py-32">
                    <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mb-4"></div>
                    <p className="text-sm font-medium text-slate-400">Loading updates...</p>
                </div>
            ) : (
                <div className="space-y-12">
                  {announcements.length > 0 ? (
                    announcements.map((item, index) => {
                      const { color, icon: Icon, label } = getTagConfig(item.tag);
                      
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ delay: index * 0.1 }}
                          className="relative flex flex-col md:flex-row gap-6 md:gap-16 group"
                        >
                          {/* Date Column */}
                          <div className="md:w-[140px] flex-shrink-0 flex md:flex-col items-center md:items-end md:text-right gap-3 md:gap-1">
                             <div className="md:hidden absolute left-[19px] top-10 bottom-0 w-px bg-slate-200" />
                             
                             {/* Mobile Dot */}
                             <div className="md:hidden relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-400 shadow-sm">
                                <Icon className="w-4 h-4" />
                             </div>

                             <span className="text-sm font-bold text-slate-900">
                               {formatDate(item.createdAt)}
                             </span>
                             <span className="text-xs font-medium text-slate-400 hidden md:block">
                               {item.createdAt?.toDate?.().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                             </span>
                             
                             {/* Desktop Dot */}
                             <div className="hidden md:flex absolute left-[134px] w-3 h-3 bg-white border-2 border-slate-300 rounded-full mt-2 group-hover:border-slate-900 group-hover:scale-125 transition-all" />
                          </div>

                          {/* Content Card */}
                          <div className="flex-grow">
                             <div className="bg-white rounded-[24px] border border-slate-200 p-6 md:p-8 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:border-slate-300 transition-all duration-300 relative overflow-hidden group/card">
                                
                                {/* Top Badges */}
                                <div className="flex flex-wrap items-center gap-3 mb-6">
                                   <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider", color)}>
                                      <Icon className="w-3.5 h-3.5" />
                                      {label}
                                   </span>
                                   {isAdmin && (
                                     <span className="text-xs text-slate-400 font-mono">ID: {item.id.slice(0,4)}</span>
                                   )}
                                </div>

                                {/* Title */}
                                <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover/card:text-blue-600 transition-colors">
                                  {item.title}
                                </h2>
                                
                                {/* Content */}
                                <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed">
                                   <p className="whitespace-pre-line">{item.content}</p>
                                </div>

                                {/* Footer/Author (Optional) */}
                                {item.author && (
                                   <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-2">
                                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                        {item.author[0]}
                                      </div>
                                      <span className="text-xs font-semibold text-slate-500">Posted by {item.author}</span>
                                   </div>
                                )}
                             </div>
                          </div>
                        </motion.div>
                      );
                    })
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="ml-0 md:ml-[140px] text-center py-24 bg-white rounded-[32px] border border-dashed border-slate-300"
                    >
                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Bell className="w-8 h-8 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No updates yet</h3>
                        <p className="text-slate-500">We're working on something exciting. Stay tuned!</p>
                    </motion.div>
                  )}
                </div>
            )}
          </div>
        </div>
      </div>
    </CommunityLayout>
  );
};

export default Announcements;