import React, { useState, useEffect } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { motion } from 'framer-motion';
import { Bell, Calendar, Tag, Plus, Megaphone } from 'lucide-react';
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

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'update': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'win': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'milestone': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'news': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <CommunityLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl py-8">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
                  <Megaphone className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                  <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Announcements</h1>
                  <p className="text-gray-500 text-lg">Updates, wins, and news from the TopEdge AI team.</p>
              </div>
            </div>

            {isAdmin && (
              <Link 
                to="/community/admin/announcements"
                className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Post Announcement
              </Link>
            )}
          </div>

          <div className="space-y-8">
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                announcements.length > 0 ? (
                    announcements.map((announcement, index) => (
                    <motion.div
                        key={announcement.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white border border-gray-200 rounded-[2rem] p-8 md:p-10 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50 rounded-bl-[4rem] -z-0" />
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <span className={cn("px-3 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wider", getTagColor(announcement.tag))}>
                                    {announcement.tag}
                                </span>
                                <span className="text-gray-400 text-sm flex items-center gap-1.5 font-medium">
                                    <Calendar className="w-4 h-4" />
                                    {announcement.createdAt?.toDate ? announcement.createdAt.toDate().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Just now'}
                                </span>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 tracking-tight">{announcement.title}</h2>
                            
                            <div className="prose prose-lg prose-gray max-w-none text-gray-600 leading-relaxed">
                                <p className="whitespace-pre-line">{announcement.content}</p>
                            </div>
                        </div>
                    </motion.div>
                    ))
                ) : (
                    <div className="text-center py-20 bg-white rounded-[2rem] border border-gray-200 shadow-sm">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Bell className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">No announcements yet</h3>
                        <p className="text-gray-500">Stay tuned for updates!</p>
                    </div>
                )
            )}
          </div>
        </div>
      </div>
    </CommunityLayout>
  );
};

export default Announcements;