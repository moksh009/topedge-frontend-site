import React, { useState, useEffect } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { Loader2, ArrowLeft } from 'lucide-react';
import { addDoc, collection, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { isAdminEmail } from '@/utils/admin';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !isAdmin) return;
    setLoading(true);

    try {
      await addDoc(collection(db, 'community_announcements'), {
        ...formData,
        author: user.displayName || 'Admin',
        authorId: user.uid,
        createdAt: serverTimestamp(),
      });
      
      navigate('/community/announcements');
    } catch (error) {
      console.error("Error creating announcement:", error);
      alert("Failed to create announcement.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-gray-900 w-8 h-8" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <CommunityLayout>
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <Link to="/community/announcements" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Announcements
          </Link>

          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Announcement</h1>
            <p className="text-gray-500">
              Share updates, wins, and news with the community.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Title</label>
              <input
                required
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:border-blue-500 outline-none transition-colors"
                placeholder="e.g. New Feature Released: Voice Agents"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Content</label>
              <textarea
                required
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:border-blue-500 outline-none transition-colors"
                placeholder="Write your announcement here..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Tag</label>
              <select
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:border-blue-500 outline-none transition-colors"
              >
                <option value="update">Update</option>
                <option value="win">Win</option>
                <option value="milestone">Milestone</option>
                <option value="news">News</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2 shadow-lg shadow-gray-900/10"
            >
              {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Post Announcement'}
            </button>
          </form>
        </div>
      </div>
    </CommunityLayout>
  );
};

export default AdminAnnouncements;
