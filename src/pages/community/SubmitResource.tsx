import React, { useState, useEffect } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowLeft, DollarSign, Video, Wrench, Sparkles, Layout, AlertCircle, Rocket, Gift, Tag, Check, User, Upload, Trash2, CheckCircle2 } from 'lucide-react';
import { serverTimestamp, collection, addDoc, query, where, getCountFromServer } from 'firebase/firestore';
import { db } from '@/services/firebase';
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
  const [needsProfile, setNeedsProfile] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  
  const CLOUD_NAME = "dn9gh1goq";
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "YOUR_UPLOAD_PRESET_HERE";
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    whatItDoes: '', 
    outcome: '', 
    videoUrl: '',
    projectUrl: '',
    youtubeUrl: '',
    contactEmail: '',
    contactPhone: '',
    contactWebsite: '',
    monetization: 'free', // free | paid
    price: '',
    toolkit: '',
    category: 'automation',
    isHiring: false,
  });

  useEffect(() => {
    const checkEligibility = async () => {
      if (authLoading) return;

      if (!user) {
        navigate('/community/login');
        return;
      }

      if (!userProfile) {
        setNeedsProfile(true);
        setCheckingLimit(false);
        return;
      }

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
            toast.error("Upload limit reached (10/10).");
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

  useEffect(() => {
    if (user || userProfile) {
      setFormData(prev => ({
        ...prev,
        contactEmail: userProfile?.contactDetails || user?.email || '',
        contactPhone: userProfile?.phoneNumber || '',
        contactWebsite: userProfile?.websiteURL || ''
      }));
    }
  }, [user, userProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 100 * 1024 * 1024) {
      toast.error("File is too large (Max 100MB)");
      return;
    }
    try {
      setUploadingVideo(true);
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", UPLOAD_PRESET);
      data.append("cloud_name", CLOUD_NAME);
      data.append("resource_type", "video");
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`, {
        method: "POST",
        body: data
      });
      const result = await response.json();
      if (result.secure_url) {
        setFormData(prev => ({ ...prev, videoUrl: result.secure_url }));
        toast.success('Video uploaded successfully!');
      } else {
        throw new Error(result.error?.message || "Upload failed");
      }
    } catch (err) {
      console.error("Video upload error:", err);
      toast.error('Failed to upload video');
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !userProfile) return;
    
    if (!isAdmin && uploadCount >= 10) {
      toast.error("Upload limit reached.");
      return;
    }

    if (!formData.contactEmail.trim()) {
      toast.error("Email is required");
      return;
    }
    if (formData.monetization === 'paid' && (!formData.price || isNaN(Number(formData.price)))) {
      toast.error("Enter a valid price");
      return;
    }

    setLoading(true);

    try {
      const resourceData = {
        userId: user.uid,
        userName: userProfile.fullName,
        userPhoto: userProfile.photoURL,
        title: formData.title,
        description: formData.description,
        fullDescription: formData.description,
        whatItDoes: formData.whatItDoes,
        outcome: formData.outcome,
        videoUrl: formData.youtubeUrl || formData.videoUrl,
        link: formData.projectUrl || '',
        contactEmail: formData.contactEmail || '',
        contactPhone: formData.contactPhone || '',
        contactWebsite: formData.contactWebsite || '',
        isPaid: formData.monetization === 'paid',
        price: formData.monetization === 'paid' ? parseFloat(formData.price) : 0,
        tools: formData.toolkit.split(',').map(s => s.trim()).filter(s => s),
        category: formData.category,
        isHiring: formData.isHiring,
        tags: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        downloads: 0,
        views: 0,
        upvotes: 0,
        upvotedBy: []
      };

      await addDoc(collection(db, 'community_resources'), resourceData);
      toast.success("Resource launched successfully!");
      navigate('/community/automation-hub');
    } catch (error) {
      console.error("Error submitting resource:", error);
      toast.error("Failed to publish. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || checkingLimit) {
    return (
      <CommunityLayout>
        <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB]">
          <Loader2 className="w-8 h-8 animate-spin text-slate-900" />
        </div>
      </CommunityLayout>
    );
  }

  const progressPercentage = Math.min((uploadCount / 10) * 100, 100);

  return (
    <CommunityLayout>
      <div className="min-h-screen bg-[#F8F9FB] pb-20 font-sans text-slate-900">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        <div className="container relative mx-auto px-4 max-w-4xl pt-12">
          
          {needsProfile && (
            <div className="mb-6 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">Create your public profile to submit resources</p>
                  <p className="text-sm text-slate-500 mt-1">Add your name, photo, and contact details. Your profile appears on your resources.</p>
                  <div className="mt-4 flex gap-3">
                    <Link to="/community/promote-profile" className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800">Create Profile</Link>
                    <Link to="/community/automation-hub" className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-200">Back</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Top Navigation */}
          <Link 
            to="/community/automation-hub" 
            className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Cancel & Back
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
               <div>
                  <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">
                     Launch Resource
                  </h1>
                  <p className="text-lg text-slate-500">
                     Share your automation workflows and tools with the community.
                  </p>
               </div>
               
               {/* Usage Meter (Non-Admins) */}
               {!isAdmin && (
                 <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm w-full md:w-64">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                       <span>Upload Limit</span>
                       <span>{uploadCount}/10</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                       <div 
                          className="h-full bg-slate-900 rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: `${progressPercentage}%` }}
                       />
                    </div>
                 </div>
               )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* ================= SECTION 1: ESSENTIALS ================= */}
              <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                     <Layout className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">The Essentials</h2>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Resource Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      placeholder="e.g. Real Estate AI Caller Agent"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium placeholder:text-slate-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Short Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={2}
                      placeholder="A quick 1-2 sentence hook about what this is..."
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium placeholder:text-slate-400 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Category</label>
                        <div className="relative">
                           <select
                              name="category"
                              value={formData.category}
                              onChange={handleChange}
                              className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium appearance-none cursor-pointer"
                           >
                              <option value="automation">Automation Workflow</option>
                              <option value="project">Full Project / Codebase</option>
                              <option value="tool">Tool / Utility</option>
                              <option value="prompt">Prompt Engineering</option>
                           </select>
                           <Tag className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                     </div>
                     
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Toolkit Used</label>
                        <div className="relative">
                           <input
                              type="text"
                              name="toolkit"
                              value={formData.toolkit}
                              onChange={handleChange}
                              placeholder="n8n, OpenAI, Supabase..."
                              className="w-full px-5 py-4 pl-12 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium placeholder:text-slate-400"
                           />
                           <Wrench className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        </div>
                     </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Live Project Link</label>
                    <input
                      type="url"
                      name="projectUrl"
                      value={formData.projectUrl}
                      onChange={handleChange}
                      placeholder="https://..."
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* ================= SECTION 2: DEEP DIVE ================= */}
              <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                     <Sparkles className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Deep Dive</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">What it does</label>
                    <textarea
                      name="whatItDoes"
                      value={formData.whatItDoes}
                      onChange={handleChange}
                      required
                      placeholder="Explain the core functionality step-by-step..."
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all font-medium h-40 resize-none placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Outcome Achieved</label>
                    <textarea
                      name="outcome"
                      value={formData.outcome}
                      onChange={handleChange}
                      required
                      placeholder="What is the ROI? (e.g. Saves 10 hours/week, Automates lead gen)"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all font-medium h-40 resize-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-700">Demo Video</label>
                  <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 flex flex-col items-center justify-center text-center transition-all hover:border-purple-300 hover:bg-purple-50/30">
                    {formData.videoUrl ? (
                      <div className="w-full relative">
                        <video src={formData.videoUrl} className="w-full h-48 object-cover rounded-xl bg-black" controls />
                        <button 
                          type="button" 
                          onClick={() => setFormData(prev => ({...prev, videoUrl: ''}))}
                          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-md"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <p className="mt-2 text-xs text-emerald-600 font-bold flex items-center justify-center gap-1"><CheckCircle2 className="w-3 h-3" /> Video Uploaded</p>
                      </div>
                    ) : (
                      <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center py-6">
                        {uploadingVideo ? (
                          <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-2" />
                        ) : (
                          <Upload className="w-8 h-8 text-slate-400 mb-2" />
                        )}
                        <span className="text-sm font-bold text-slate-700">
                          {uploadingVideo ? "Uploading..." : "Upload Demo Video"}
                        </span>
                        <span className="text-xs text-slate-400 mt-1">MP4, WebM (Max 100MB)</span>
                        <input type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} disabled={uploadingVideo} />
                      </label>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Or External Link (YouTube/Loom)</label>
                    <div className="relative">
                      <input
                        type="url"
                        name="youtubeUrl"
                        value={formData.youtubeUrl}
                        onChange={handleChange}
                        placeholder="https://youtube.com/watch?v=..."
                        className="w-full px-5 py-4 pl-12 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all font-medium placeholder:text-slate-400"
                      />
                      <Video className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ================= SECTION 3: CONTACT ================= */}
              <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                     <User className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Contact Details</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email</label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Phone</label>
                    <input
                      type="text"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      placeholder="+1 555-555-5555"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium placeholder:text-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Website</label>
                    <input
                      type="url"
                      name="contactWebsite"
                      value={formData.contactWebsite}
                      onChange={handleChange}
                      placeholder="https://..."
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium placeholder:text-slate-400"
                    />
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <input
                    type="checkbox"
                    name="isHiring"
                    checked={formData.isHiring}
                    onChange={handleCheckboxChange}
                    className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label className="font-bold text-slate-700">
                    I am looking for collaborators on this project
                  </label>
                </div>
              </div>

              {/* ================= SECTION 3: COMMERCE ================= */}
              <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                     <DollarSign className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">Distribution</h2>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Free Option */}
                    <div 
                        onClick={() => setFormData(p => ({...p, monetization: 'free'}))}
                        className={cn(
                            "cursor-pointer group relative p-6 rounded-2xl border-2 transition-all duration-300",
                            formData.monetization === 'free'
                                ? "bg-emerald-50/30 border-emerald-500"
                                : "bg-slate-50 border-transparent hover:bg-slate-100"
                        )}
                    >
                        <div className="flex items-start justify-between mb-2">
                           <Gift className={cn("w-6 h-6", formData.monetization === 'free' ? "text-emerald-600" : "text-slate-400")} />
                           {formData.monetization === 'free' && <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Free Resource</h3>
                        <p className="text-sm text-slate-500">Available to everyone in the community.</p>
                    </div>

                    {/* Paid Option */}
                    <div 
                        onClick={() => setFormData(p => ({...p, monetization: 'paid'}))}
                        className={cn(
                            "cursor-pointer group relative p-6 rounded-2xl border-2 transition-all duration-300",
                            formData.monetization === 'paid'
                                ? "bg-slate-900/5 border-slate-900"
                                : "bg-slate-50 border-transparent hover:bg-slate-100"
                        )}
                    >
                        <div className="flex items-start justify-between mb-2">
                           <DollarSign className={cn("w-6 h-6", formData.monetization === 'paid' ? "text-slate-900" : "text-slate-400")} />
                           {formData.monetization === 'paid' && <div className="w-5 h-5 bg-slate-900 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Paid Asset</h3>
                        <p className="text-sm text-slate-500">Monetize your work. Users pay to access.</p>
                    </div>
                  </div>

                  <AnimatePresence>
                     {formData.monetization === 'paid' && (
                        <motion.div
                           initial={{ opacity: 0, height: 0 }}
                           animate={{ opacity: 1, height: 'auto' }}
                           exit={{ opacity: 0, height: 0 }}
                           className="overflow-hidden"
                        >
                           <div className="pt-2">
                              <label className="text-sm font-bold text-slate-700 mb-2 block">Price (USD)</label>
                              <div className="relative max-w-xs">
                                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 font-bold text-lg">$</span>
                                 <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    min="0"
                                    step="0.01"
                                    className="w-full px-5 py-4 pl-10 bg-white border-2 border-slate-200 rounded-xl focus:border-slate-900 focus:ring-0 outline-none transition-all font-bold text-lg placeholder:text-slate-300"
                                 />
                              </div>
                              <p className="text-xs text-slate-500 mt-2">Platform fees may apply.</p>
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full py-5 bg-slate-900 text-white text-lg font-bold rounded-2xl hover:bg-slate-800 hover:-translate-y-1 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Publishing to Hub...
                    </>
                  ) : (
                    <>
                      <Rocket className="w-6 h-6 group-hover:animate-pulse" />
                      Launch Resource
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-slate-400 mt-4">
                  By publishing, you agree to our community guidelines.
                </p>
              </div>

            </form>
          </motion.div>
        </div>
      </div>
    </CommunityLayout>
  );
};

export default SubmitResource;
