import React, { useState, useEffect } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { Loader2, ArrowLeft, Megaphone, Check, PenTool, Trophy, Flag, Radio, Send } from 'lucide-react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { isAdminEmail } from '@/utils/admin';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

const AdminAnnouncements = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const isAdmin = user && isAdminEmail(user.email);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
        navigate('/community/announcements');
    }
  }, [authLoading, isAdmin, navigate]);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tag: 'update', // update | win | milestone | news
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !isAdmin) return;
    setLoading(true);

    try {
      await addDoc(collection(db, 'community_announcements'), {
        ...formData,
        author: user.displayName || 'TopEdge Team',
        authorId: user.uid,
        createdAt: serverTimestamp(),
      });
      
      toast.success("Announcement broadcasted successfully.");
      navigate('/community/announcements');
    } catch (error) {
      console.error("Error creating announcement:", error);
      toast.error("Failed to broadcast.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-slate-900 w-8 h-8" />
      </div>
    );
  }

  if (!isAdmin) return null;

  const tagOptions = [
    { value: 'update', label: 'System Update', icon: PenTool, color: 'bg-blue-50 border-blue-200 text-blue-700' },
    { value: 'win', label: 'Community Win', icon: Trophy, color: 'bg-amber-50 border-amber-200 text-amber-700' },
    { value: 'milestone', label: 'Major Milestone', icon: Flag, color: 'bg-purple-50 border-purple-200 text-purple-700' },
    { value: 'news', label: 'General News', icon: Radio, color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
  ];

  return (
    <CommunityLayout>
      <div className="min-h-screen bg-[#F8F9FB] pb-14 md:pb-20 pt-10 md:pt-12 relative overflow-hidden">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        <div className="container relative z-10 mx-auto px-4 max-w-3xl">
          
          <Link 
            to="/community/announcements" 
            className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Feed
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider mb-4">
               <Megaphone className="w-3 h-3" /> Admin Console
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-2">Broadcast Update</h1>
            <p className="text-slate-500 text-lg">
              Push a new notification to the community feed.
            </p>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit} 
            className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 space-y-8"
          >
            
            {/* Tag Selection */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-slate-700 ml-1">Announcement Type</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                 {tagOptions.map((option) => (
                    <div
                       key={option.value}
                       onClick={() => setFormData(prev => ({ ...prev, tag: option.value }))}
                       className={cn(
                          "cursor-pointer flex items-center gap-3 p-4 rounded-2xl border-2 transition-all duration-200",
                          formData.tag === option.value 
                             ? cn(option.color, "ring-2 ring-offset-2 ring-slate-100") 
                             : "bg-slate-50 border-transparent text-slate-500 hover:bg-slate-100"
                       )}
                    >
                       <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                          formData.tag === option.value ? "bg-white/50" : "bg-white shadow-sm"
                       )}>
                          <option.icon className="w-5 h-5" />
                       </div>
                       <div className="font-bold text-sm">{option.label}</div>
                       {formData.tag === option.value && (
                          <div className="ml-auto bg-white/50 p-1 rounded-full">
                             <Check className="w-3 h-3" />
                          </div>
                       )}
                    </div>
                 ))}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Headline</label>
              <input
                required
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100 focus:border-slate-300 outline-none transition-all"
                placeholder="e.g. Introducing Voice Agents 2.0"
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Content Body</label>
              <textarea
                required
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={8}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-medium placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-100 focus:border-slate-300 outline-none transition-all resize-none leading-relaxed"
                placeholder="Write your announcement here. Supports basic line breaks."
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-slate-900 text-white font-bold text-lg rounded-2xl hover:bg-slate-800 hover:-translate-y-1 transition-all shadow-xl shadow-slate-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3"
              >
                {loading ? (
                   <>
                     <Loader2 className="animate-spin w-5 h-5" />
                     Broadcasting...
                   </>
                ) : (
                   <>
                     <Send className="w-5 h-5" />
                     Post Announcement
                   </>
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </CommunityLayout>
  );
};

export default AdminAnnouncements;
