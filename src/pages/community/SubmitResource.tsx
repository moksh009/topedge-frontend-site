import React, { useState, useEffect } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { motion } from 'framer-motion';
import { Loader2, ArrowLeft, DollarSign, Video, Wrench, Sparkles, Layout, AlertCircle } from 'lucide-react';
import { doc, setDoc, serverTimestamp, getDoc, collection, addDoc, query, where, getCountFromServer } from 'firebase/firestore';
import { db, auth } from '@/services/firebase';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

const SubmitResource = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user, userProfile, isAdmin, loading: authLoading } = useAuth();
  const [uploadCount, setUploadCount] = useState(0);
  const [checkingLimit, setCheckingLimit] = useState(true);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    whatItDoes: '', 
    outcome: '', 
    videoUrl: '',
    monetization: 'free', // free | paid
    price: '',
    toolkit: '', // Comma separated
    category: 'automation', // automation | project | tool
  });

  useEffect(() => {
    const checkEligibility = async () => {
      if (authLoading) return;

      if (!user) {
        navigate('/community/login');
        return;
      }

      if (!userProfile) {
        toast.error("You must promote your profile before uploading resources.");
        navigate('/community/promote-profile');
        return;
      }

      // Check upload limit for non-admins
      if (!isAdmin) {
        try {
          const q = query(
            collection(db, 'community_resources'), 
            where('userId', '==', user.uid)
          );
          const snapshot = await getCountFromServer(q);
          const count = snapshot.data().count;
          setUploadCount(count);
          
          if (count >= 10) {
            toast.error("You have reached the limit of 10 uploads.");
            navigate('/community/automation-hub');
          }
        } catch (error) {
          console.error("Error checking upload limit:", error);
        }
      }
      setCheckingLimit(false);
    };

    checkEligibility();
  }, [user, userProfile, isAdmin, authLoading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !userProfile) return;
    
    if (!isAdmin && uploadCount >= 10) {
      toast.error("Upload limit reached.");
      return;
    }

    setLoading(true);

    try {
      const resourceData = {
        userId: user.uid,
        authorName: userProfile.fullName,
        authorPhoto: userProfile.photoURL,
        title: formData.title,
        description: formData.description, // Short description
        fullDescription: formData.description, // Using same for now, or split if needed
        whatItDoes: formData.whatItDoes,
        outcome: formData.outcome,
        demoVideoUrl: formData.videoUrl,
        isPaid: formData.monetization === 'paid',
        price: formData.monetization === 'paid' ? parseFloat(formData.price) : 0,
        tools: formData.toolkit.split(',').map(s => s.trim()).filter(s => s),
        category: formData.category,
        tags: [], // Can add tags later
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        downloads: 0,
        views: 0
      };

      // Add to community_resources collection
      await addDoc(collection(db, 'community_resources'), resourceData);
      
      toast.success("Resource published successfully!");
      navigate('/community/automation-hub');
    } catch (error) {
      console.error("Error submitting resource:", error);
      toast.error("Failed to submit resource. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || checkingLimit) {
    return (
      <CommunityLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </CommunityLayout>
    );
  }

  return (
    <CommunityLayout>
      <div className="min-h-screen bg-gray-50 py-20 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <Link 
            to="/community/automation-hub" 
            className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Hub
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Submit Resource</h1>
              <p className="text-gray-600 text-lg">Share your automation, tool, or project with the community.</p>
              {!isAdmin && (
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  <AlertCircle className="w-4 h-4" />
                  Uploads remaining: {10 - uploadCount} / 10
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-8 border border-gray-100">
              {/* Basic Info */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <Layout className="w-6 h-6 text-blue-600" />
                  <h2 className="text-xl font-bold text-gray-900">Basic Information</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Real Estate AI Caller Agent"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Short Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      placeholder="Brief overview of what this resource is..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all h-24 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      >
                        <option value="automation">Automation</option>
                        <option value="project">Full Project</option>
                        <option value="tool">Tool / Utility</option>
                        <option value="prompt">Prompt Engineering</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Toolkit Used</label>
                      <div className="relative">
                        <Wrench className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="toolkit"
                          value={formData.toolkit}
                          onChange={handleChange}
                          placeholder="e.g. n8n, OpenAI, Supabase (comma separated)"
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Details */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  <h2 className="text-xl font-bold text-gray-900">Deep Dive</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">What it does</label>
                    <textarea
                      name="whatItDoes"
                      value={formData.whatItDoes}
                      onChange={handleChange}
                      required
                      placeholder="Explain the core functionality..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all h-32 resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Outcome Achieved</label>
                    <textarea
                      name="outcome"
                      value={formData.outcome}
                      onChange={handleChange}
                      required
                      placeholder="What is the end result? (e.g. Saves 10 hours/week)"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all h-32 resize-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Demo Video URL</label>
                  <div className="relative">
                    <Video className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      name="videoUrl"
                      value={formData.videoUrl}
                      onChange={handleChange}
                      placeholder="https://youtube.com/..."
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <p className="text-xs text-gray-500">YouTube or Vimeo links supported.</p>
                </div>
              </section>

              {/* Monetization */}
              <section className="space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <DollarSign className="w-6 h-6 text-green-600" />
                  <h2 className="text-xl font-bold text-gray-900">Monetization</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Type</label>
                    <div className="flex gap-4">
                      <label className="flex-1 cursor-pointer">
                        <input
                          type="radio"
                          name="monetization"
                          value="free"
                          checked={formData.monetization === 'free'}
                          onChange={handleChange}
                          className="peer sr-only"
                        />
                        <div className="text-center px-4 py-3 rounded-xl border border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 transition-all hover:border-gray-300">
                          Free
                        </div>
                      </label>
                      <label className="flex-1 cursor-pointer">
                        <input
                          type="radio"
                          name="monetization"
                          value="paid"
                          checked={formData.monetization === 'paid'}
                          onChange={handleChange}
                          className="peer sr-only"
                        />
                        <div className="text-center px-4 py-3 rounded-xl border border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-700 transition-all hover:border-gray-300">
                          Paid
                        </div>
                      </label>
                    </div>
                  </div>

                  {formData.monetization === 'paid' && (
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-2"
                    >
                      <label className="text-sm font-medium text-gray-700">Price ($)</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      />
                    </motion.div>
                  )}
                </div>
              </section>

              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    'Publish Resource'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </CommunityLayout>
  );
};

export default SubmitResource;
