import React, { useState, useEffect } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import CommunitySEO from '@/components/community/CommunitySEO';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowLeft, DollarSign, Video, Wrench, Sparkles, Layout, AlertCircle, Rocket, Gift, Tag, Check, User, Upload, Trash2, CheckCircle2 } from 'lucide-react';
import { serverTimestamp, collection, addDoc, query, where, getCountFromServer, doc, setDoc } from 'firebase/firestore';
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
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingAttachment, setUploadingAttachment] = useState(false);
  const [attachments, setAttachments] = useState<Array<{ name: string; url: string; size?: number }>>([]);
  
  const CLOUD_NAME = "dn9gh1goq";
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "YOUR_UPLOAD_PRESET_HERE";
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    whatItDoes: '', 
    outcome: '', 
    videoUrl: '',
    imageUrl: '',
    projectUrl: '',
    youtubeUrl: '',
    contactEmail: '',
    contactPhone: '',
    contactWebsite: '',
    monetization: 'free', 
    price: '',
    pricingType: 'one_time',
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
          const q = query(collection(db, 'community_resources'), where('userId', '==', user.uid));
          const snapshot = await getCountFromServer(q);
          const count = snapshot.data().count;
          setUploadCount(count);
          if (count >= 10) {
            toast.error("Upload limit reached (10/10).");
            navigate('/community/automation-hub');
          }
        } catch (error) { console.error(error); }
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
    if (file.size > 100 * 1024 * 1024) return toast.error("File is too large (Max 100MB)");
    
    try {
      setUploadingVideo(true);
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", UPLOAD_PRESET);
      data.append("cloud_name", CLOUD_NAME);
      data.append("resource_type", "video");
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`, { method: "POST", body: data });
      const result = await response.json();
      if (result.secure_url) {
        setFormData(prev => ({ ...prev, videoUrl: result.secure_url }));
        toast.success('Video uploaded successfully!');
      } else { throw new Error(result.error?.message || "Upload failed"); }
    } catch (err) { toast.error('Failed to upload video'); } 
    finally { setUploadingVideo(false); }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image is too large (Max 10MB)");
      return;
    }
    try {
      setUploadingImage(true);
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", UPLOAD_PRESET);
      data.append("cloud_name", CLOUD_NAME);
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: data
      });
      const result = await response.json();
      if (result.secure_url) {
        setFormData(prev => ({ ...prev, imageUrl: result.secure_url }));
        toast.success("Image uploaded successfully!");
      } else {
        throw new Error(result.error?.message || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image");
    } finally {
      setUploadingImage(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleAttachmentsUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    try {
      setUploadingAttachment(true);
      for (const file of files) {
        if (file.type.startsWith('image/') || file.type.startsWith('video/')) { toast.error('Images and videos are not allowed'); continue; }
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", UPLOAD_PRESET);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`, { method: "POST", body: data });
        const json = await res.json();
        if (json.secure_url) {
          setAttachments(prev => [...prev, { name: file.name, url: json.secure_url, size: file.size }]);
        }
      }
      toast.success('Attachment(s) uploaded');
    } catch (err) { toast.error('Failed to upload attachment'); } 
    finally { setUploadingAttachment(false); e.target.value = ''; }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !userProfile) return;
    if (!isAdmin && uploadCount >= 10) return toast.error("Upload limit reached.");
    if (!formData.contactEmail.trim()) return toast.error("Email is required");
    if (formData.monetization === 'paid' && (!formData.price || isNaN(Number(formData.price)))) {
    if (formData.monetization === 'paid' && !formData.projectUrl.trim()) return toast.error("Access link is required for paid resources");
    }
    if (formData.monetization === 'paid' && !formData.projectUrl.trim()) {
      return toast.error("For paid resources, please provide a private access link");
    }

    setLoading(true);
    try {
      const isPaid = formData.monetization === 'paid';
      const hasProtectedLink = isPaid && !!formData.projectUrl.trim();

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
        imageUrl: formData.imageUrl || '',
        link: isPaid ? '' : (formData.projectUrl || ''),
        hasProtectedLink,
        contactEmail: formData.contactEmail || '',
        contactPhone: formData.contactPhone || '',
        contactWebsite: formData.contactWebsite || '',
        isPaid,
        price: isPaid ? parseFloat(formData.price) : 0,
        pricingType: isPaid ? formData.pricingType : 'one_time',
        tools: formData.toolkit.split(',').map(s => s.trim()).filter(Boolean),
        category: formData.category,
        isHiring: formData.isHiring,
        tags: [],
        attachments,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        downloads: 0,
        views: 0,
        upvotes: 0,
        upvotedBy: [],
        purchasers: []
      };

      const resourceRef = await addDoc(collection(db, 'community_resources'), resourceData);

      if (hasProtectedLink) {
        const protectedLinkRef = doc(db, 'protected_resource_links', resourceRef.id);
        await setDoc(protectedLinkRef, {
          resourceId: resourceRef.id,
          link: formData.projectUrl.trim(),
          createdAt: serverTimestamp()
        });
      }
      toast.success("Resource launched successfully!");
      navigate('/community/automation-hub');
    } catch (error) { console.error(error); toast.error("Failed to publish."); } 
    finally { setLoading(false); }
  };

  if (authLoading || checkingLimit) return <CommunityLayout><div className="min-h-screen flex items-center justify-center bg-[#F8F9FB]"><Loader2 className="w-8 h-8 animate-spin text-slate-900" /></div></CommunityLayout>;

  const progressPercentage = Math.min((uploadCount / 10) * 100, 100);

  return (
    <CommunityLayout>
      <CommunitySEO 
        title="Submit Resource - TopEdge AI Community"
        description="Share your AI automation tools, projects, and resources with the community."
        url="/community/submit-resource"
      />
      <div className="min-h-screen bg-[#F8F9FB] text-slate-900 font-sans selection:bg-indigo-500 selection:text-white pb-14 md:pb-20">
        <div className="absolute inset-0 pointer-events-none opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        {/* Adjusted padding on container for mobile (px-4) */}
        <div className="container relative mx-auto px-4 max-w-4xl pt-10 md:pt-12">
          
          {needsProfile && (
            <div className="mb-6 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 mt-1" />
                <div className="flex-1">
                  <p className="text-sm font-bold">Create your public profile to submit resources</p>
                  <div className="mt-4 flex gap-3">
                    <Link to="/community/promote-profile" className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold">Promote Profile</Link>
                    <Link to="/community/automation-hub" className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold">Back</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <Link to="/community/automation-hub" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 mb-8 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Cancel & Back
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
               <div>
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-2">Launch Resource</h1>
                  <p className="text-lg text-slate-500">Share your automation workflows with the community.</p>
               </div>
               {!isAdmin && (
                 <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm w-full md:w-64">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                       <span>Upload Limit</span><span>{uploadCount}/10</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-slate-900 rounded-full transition-all duration-1000 ease-out" style={{ width: `${progressPercentage}%` }} />
                    </div>
                 </div>
               )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              
              {/* ================= SECTION 1: ESSENTIALS ================= */}
              {/* Adjusted padding: p-5 on mobile, p-8 on desktop */}
              <div className="bg-white rounded-2xl md:rounded-[2rem] border border-slate-200 p-5 md:p-8 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><Layout className="w-5 h-5" /></div>
                  <h2 className="text-xl font-bold text-slate-900">The Essentials</h2>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Resource Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Real Estate AI Caller" 
                        className="w-full px-4 py-3 md:px-5 md:py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none font-medium" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required rows={2} placeholder="A quick hook..." 
                        className="w-full px-4 py-3 md:px-5 md:py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none font-medium resize-none" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Category</label>
                        <div className="relative">
                           <select name="category" value={formData.category} onChange={handleChange} 
                                className="w-full px-4 py-3 md:px-5 md:py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none font-medium appearance-none">
                              <option value="automation">Automation Workflow</option>
                              <option value="project">Full Project / Codebase</option>
                              <option value="tool">Tool / Utility</option>
                              <option value="prompt">Prompt Engineering</option>
                              <option value="resource">Resource</option>
                              <option value="other">Others</option>
                           </select>
                           <Tag className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Toolkit Used</label>
                        <div className="relative">
                           <input type="text" name="toolkit" value={formData.toolkit} onChange={handleChange} placeholder="n8n, OpenAI..." 
                                className="w-full px-4 py-3 md:px-5 md:py-4 pl-11 md:pl-12 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none font-medium" />
                           <Wrench className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        </div>
                     </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Live Project Link</label>
                    <input type="url" name="projectUrl" value={formData.projectUrl} onChange={handleChange} placeholder="https://..." 
                        className="w-full px-4 py-3 md:px-5 md:py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none font-medium" />
                  </div>

                  {/* Video, Image & Attachments Section */}
                  <div className="pt-2 space-y-4">
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Demo Video</label>
                        <div className="p-5 md:p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 flex flex-col items-center justify-center text-center transition-all hover:border-purple-300">
                            {formData.videoUrl ? (
                                <div className="w-full relative">
                                    <video src={formData.videoUrl} className="w-full h-48 object-cover rounded-xl bg-black" controls />
                                    <button type="button" onClick={() => setFormData(prev => ({...prev, videoUrl: ''}))} className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full shadow-md"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            ) : (
                                <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center py-4">
                                    {uploadingVideo ? <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-2" /> : <Upload className="w-8 h-8 text-slate-400 mb-2" />}
                                    <span className="text-sm font-bold text-slate-700">{uploadingVideo ? "Uploading..." : "Upload Demo Video"}</span>
                                    <input type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} disabled={uploadingVideo} />
                                </label>
                            )}
                        </div>
                        <input type="url" name="youtubeUrl" value={formData.youtubeUrl} onChange={handleChange} placeholder="Or paste YouTube URL..." 
                            className="w-full px-4 py-3 md:px-5 md:py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white outline-none font-medium text-sm" />
                     </div>

                     <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Cover Image (optional)</label>
                        <div className="p-5 md:p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 flex flex-col items-center justify-center text-center transition-all hover:border-purple-300">
                          {formData.imageUrl ? (
                            <div className="w-full relative">
                              <img src={formData.imageUrl} alt={formData.title || "Cover"} className="w-full h-48 object-cover rounded-xl bg-slate-100" />
                              <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full shadow-md"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center py-4">
                              {uploadingImage ? (
                                <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mb-2" />
                              ) : (
                                <Upload className="w-8 h-8 text-slate-400 mb-2" />
                              )}
                              <span className="text-sm font-bold text-slate-700">
                                {uploadingImage ? "Uploading..." : "Upload Cover Image"}
                              </span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                                disabled={uploadingImage}
                              />
                            </label>
                          )}
                        </div>
                     </div>

                     <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Attachments</label>
                        <div className="p-4 md:p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 flex flex-col gap-3 items-center justify-center text-center hover:border-indigo-300">
                            <label className="cursor-pointer w-full flex flex-col items-center justify-center py-2">
                                {uploadingAttachment ? <Loader2 className="w-6 h-6 animate-spin text-indigo-500" /> : <Upload className="w-6 h-6 text-slate-400" />}
                                <span className="text-sm font-bold text-slate-700 mt-2">{uploadingAttachment ? "Uploading..." : "Upload files (.zip, .json, .csv)"}</span>
                                <input type="file" multiple className="hidden" onChange={handleAttachmentsUpload} disabled={uploadingAttachment} />
                            </label>
                            {attachments.length > 0 && (
                                <div className="w-full grid gap-2">
                                    {attachments.map((f, i) => (
                                        <div key={i} className="flex justify-between items-center bg-white p-2 rounded border border-slate-200 text-xs">
                                            <span className="truncate">{f.name}</span>
                                            <button type="button" onClick={() => setAttachments(prev => prev.filter((_, idx) => idx !== i))} className="text-rose-500"><Trash2 className="w-4 h-4" /></button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                     </div>
                  </div>
                </div>
              </div>

              {/* ================= SECTION 2: DEEP DIVE ================= */}
              {/* Separate Card, same padding adjustments */}
              <div className="bg-white rounded-2xl md:rounded-[2rem] border border-slate-200 p-5 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600"><Sparkles className="w-5 h-5" /></div>
                  <h2 className="text-xl font-bold text-slate-900">Deep Dive</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Setup User Guide</label>
                    <textarea name="whatItDoes" value={formData.whatItDoes} onChange={handleChange} required placeholder="Step-by-step instructions..." 
                        className="w-full px-4 py-3 md:px-5 md:py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500/20 outline-none font-medium h-40 resize-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Outcome Achieved (What it does)</label>
                    <textarea name="outcome" value={formData.outcome} onChange={handleChange} required placeholder="What is the ROI?..." 
                        className="w-full px-4 py-3 md:px-5 md:py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-purple-500/20 outline-none font-medium h-40 resize-none" />
                  </div>
                </div>
              </div>

              {/* ================= SECTION 3: CONTACT ================= */}
              <div className="bg-white rounded-2xl md:rounded-[2rem] border border-slate-200 p-5 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><User className="w-5 h-5" /></div>
                  <h2 className="text-xl font-bold text-slate-900">Contact Details</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} placeholder="Email" 
                    className="w-full px-4 py-3 md:px-5 md:py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium" />
                  <input type="text" name="contactPhone" value={formData.contactPhone} onChange={handleChange} placeholder="Phone" 
                    className="w-full px-4 py-3 md:px-5 md:py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium" />
                  <input type="url" name="contactWebsite" value={formData.contactWebsite} onChange={handleChange} placeholder="Website" 
                    className="w-full px-4 py-3 md:px-5 md:py-4 bg-slate-50 border border-slate-200 rounded-xl outline-none font-medium" />
                </div>
                <div className="mt-6 flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <input type="checkbox" name="isHiring" checked={formData.isHiring} onChange={handleCheckboxChange} className="w-5 h-5 rounded text-indigo-600" />
                  <label className="font-bold text-slate-700 text-sm">I am looking for collaborators</label>
                </div>
              </div>

              {/* ================= SECTION 4: COMMERCE ================= */}
              <div className="bg-white rounded-2xl md:rounded-[2rem] border border-slate-200 p-5 md:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600"><DollarSign className="w-5 h-5" /></div>
                  <h2 className="text-xl font-bold text-slate-900">Distribution</h2>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                      onClick={() => setFormData(p => ({ ...p, monetization: 'free', pricingType: 'one_time' }))}
                      className={cn(
                        "cursor-pointer p-5 md:p-6 rounded-2xl border-2 transition-all",
                        formData.monetization === 'free' ? "bg-emerald-50/30 border-emerald-500" : "bg-slate-50 border-transparent"
                      )}
                    >
                        <div className="flex justify-between mb-2">
                           <Gift className={cn("w-6 h-6", formData.monetization === 'free' ? "text-emerald-600" : "text-slate-400")} />
                           {formData.monetization === 'free' && <Check className="w-5 h-5 text-emerald-600" />}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Free Resource</h3>
                    </div>

                    <div
                      onClick={() => setFormData(p => ({ ...p, monetization: 'paid', pricingType: 'one_time' }))}
                      className={cn(
                        "cursor-pointer p-5 md:p-6 rounded-2xl border-2 transition-all",
                        formData.monetization === 'paid' && formData.pricingType === 'one_time'
                          ? "bg-slate-900/5 border-slate-900"
                          : "bg-slate-50 border-transparent"
                      )}
                    >
                        <div className="flex justify-between mb-2">
                           <DollarSign className={cn("w-6 h-6", formData.monetization === 'paid' && formData.pricingType === 'one_time' ? "text-slate-900" : "text-slate-400")} />
                           {formData.monetization === 'paid' && formData.pricingType === 'one_time' && <Check className="w-5 h-5 text-slate-900" />}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">One-time Purchase</h3>
                    </div>

                    <div
                      onClick={() => setFormData(p => ({ ...p, monetization: 'paid', pricingType: 'monthly' }))}
                      className={cn(
                        "cursor-pointer p-5 md:p-6 rounded-2xl border-2 transition-all",
                        formData.monetization === 'paid' && formData.pricingType === 'monthly'
                          ? "bg-slate-900/5 border-slate-900"
                          : "bg-slate-50 border-transparent"
                      )}
                    >
                        <div className="flex justify-between mb-2">
                           <DollarSign className={cn("w-6 h-6", formData.monetization === 'paid' && formData.pricingType === 'monthly' ? "text-slate-900" : "text-slate-400")} />
                           {formData.monetization === 'paid' && formData.pricingType === 'monthly' && <Check className="w-5 h-5 text-slate-900" />}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Monthly Access</h3>
                    </div>
                  </div>

                  <AnimatePresence>
                     {formData.monetization === 'paid' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                           <div className="pt-2">
                              <label className="text-sm font-bold text-slate-700 mb-2 block">Price (USD)</label>
                              <div className="relative max-w-xs">
                                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-900 font-bold text-lg">$</span>
                                 <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="0.00" min="0" step="0.01" 
                                    className="w-full px-5 py-4 pl-10 bg-white border-2 border-slate-200 rounded-xl focus:border-slate-900 outline-none font-bold text-lg" />
                              </div>
                           </div>
                        </motion.div>
                     )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="pt-6">
                <button type="submit" disabled={loading} className="w-full py-5 bg-slate-900 text-white text-lg font-bold rounded-2xl hover:bg-slate-800 shadow-xl flex items-center justify-center gap-3">
                  {loading ? <Loader2 className="animate-spin" /> : <Rocket />} Launch Resource
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
