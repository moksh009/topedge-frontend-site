import React, { useState, useEffect } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Loader2, ExternalLink, User, Clock, 
  DollarSign, Edit2, Trash2, CheckCircle2, Share2, 
  Sparkles, Zap, Box, Upload, X, FileVideo, PlayCircle,
  ArrowRight, Star
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, serverTimestamp, deleteDoc, arrayUnion, arrayRemove, increment } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { isAdminEmail } from '@/utils/admin';
import toast from 'react-hot-toast';

// CLOUDINARY CONFIG
const CLOUD_NAME = "dn9gh1goq"; 
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "YOUR_UPLOAD_PRESET_HERE"; 

interface Resource {
  id: string;
  title: string;
  description: string;
  whatItDoes?: string;
  outcome?: string;
  videoUrl?: string;
  isPaid: boolean;
  price?: number;
  tools: string[];
  userId: string;
  userName: string;
  userPhoto?: string;
  link?: string;
  category: 'automation' | 'project' | 'tool' | 'prompt';
  createdAt?: any;
  contactEmail?: string;
  contactPhone?: string;
  contactWebsite?: string;
  stars?: number;
  starredBy?: string[];
}

const ResourceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [resource, setResource] = useState<Resource | null>(null);
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [starCount, setStarCount] = useState<number>(0);
  const [starred, setStarred] = useState<boolean>(false);

  // Edit State
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    whatItDoes: '',
    outcome: '',
    videoUrl: '',
    link: '',
    price: '',
    tools: '',
    category: 'automation',
    isPaid: false
  });

  useEffect(() => {
    const fetchResource = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'community_resources', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setResource({ ...data, id: docSnap.id } as Resource);
          setStarCount((data as any).stars || 0);
          setStarred(((data as any).starredBy || []).includes(user?.uid));
          setEditForm({
            title: data.title,
            description: data.description || '',
            whatItDoes: data.whatItDoes || '',
            outcome: data.outcome || '',
            videoUrl: data.videoUrl || '',
            link: data.link || '',
            price: data.price?.toString() || '',
            tools: data.tools ? data.tools.join(', ') : '',
            category: data.category as any,
            isPaid: data.isPaid || false
          });
        } else {
          toast.error("Resource not found");
          navigate('/community/automation-hub');
        }
      } catch (error) {
        console.error("Error fetching resource:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResource();
  }, [id, navigate]);

  const toggleStar = async () => {
    if (!resource || !user) return;
    try {
      const ref = doc(db, 'community_resources', resource.id);
      if (starred) {
        await updateDoc(ref, { stars: increment(-1), starredBy: arrayRemove(user.uid) });
        setStarCount(c => Math.max(0, c - 1));
        setStarred(false);
      } else {
        await updateDoc(ref, { stars: increment(1), starredBy: arrayUnion(user.uid) });
        setStarCount(c => c + 1);
        setStarred(true);
      }
    } catch (e) {
      console.error("Star toggle error:", e);
    }
  };

  // --- VIDEO UPLOAD HANDLER ---
  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 100 * 1024 * 1024) { // 100MB Limit check
        toast.error("File is too large (Max 100MB)");
        return;
    }

    try {
      setUploadingVideo(true);
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", UPLOAD_PRESET); 
      data.append("cloud_name", CLOUD_NAME);
      data.append("resource_type", "video"); // Crucial for video uploads

      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`, {
        method: "POST",
        body: data
      });

      const result = await response.json();

      if (result.secure_url) {
        setEditForm(prev => ({ ...prev, videoUrl: result.secure_url }));
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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resource || !user) return;
    
    setSaving(true);
    try {
      const updatedData = {
        title: editForm.title,
        description: editForm.description,
        whatItDoes: editForm.whatItDoes,
        outcome: editForm.outcome,
        videoUrl: editForm.videoUrl,
        link: editForm.link,
        isPaid: editForm.isPaid,
        price: editForm.isPaid ? parseFloat(editForm.price) || 0 : 0,
        tools: editForm.tools.split(',').map(t => t.trim()).filter(t => t),
        category: editForm.category,
        updatedAt: serverTimestamp()
      };

      await updateDoc(doc(db, 'community_resources', resource.id), updatedData);
      
      setResource(prev => prev ? ({ ...prev, ...updatedData, tools: updatedData.tools as string[], category: updatedData.category as any }) : null);
      setIsEditing(false);
      toast.success("Resource updated!");
    } catch (error) {
      console.error("Error updating resource:", error);
      toast.error("Failed to update resource");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!resource || !user) return;
    if (window.confirm("Are you sure you want to delete this resource?")) {
      try {
        await deleteDoc(doc(db, 'community_resources', resource.id));
        toast.success("Resource deleted");
        navigate('/community/automation-hub');
      } catch (error) {
        console.error("Error deleting resource:", error);
        toast.error("Failed to delete");
      }
    }
  };

  const isOwner = user && resource && (user.uid === resource.userId || isAdminEmail(user.email));

  if (loading) return (
    <CommunityLayout>
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-slate-900 animate-spin" />
      </div>
    </CommunityLayout>
  );

  if (!resource) return null;

  return (
    <CommunityLayout>
      <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-indigo-500 selection:text-white pb-24">
        
        {/* ================= EDIT MODAL (Full Screen Overlay) ================= */}
        <AnimatePresence>
            {isEditing && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
                >
                    <motion.div 
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 20 }}
                        className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl relative"
                    >
                        <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-slate-900">Edit Resource</h2>
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs font-bold">
                              <Star className="w-4 h-4" />
                              {starCount} Stars
                            </div>
                            <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                <X className="w-6 h-6 text-slate-500" />
                            </button>
                        </div>

                        <form onSubmit={handleUpdate} className="p-8 space-y-8">
                            
                            {/* Section 1: Identity */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Basic Info</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Title</label>
                                        <input type="text" value={editForm.title} onChange={(e) => setEditForm({...editForm, title: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900/20 outline-none transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Category</label>
                                        <select value={editForm.category} onChange={(e) => setEditForm({...editForm, category: e.target.value as any})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all">
                                            <option value="automation">Automation</option>
                                            <option value="project">Project</option>
                                            <option value="tool">Tool</option>
                                            <option value="prompt">Prompt</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Media (Video Upload) */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Media</h3>
                                <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 flex flex-col items-center justify-center text-center transition-all hover:border-indigo-300 hover:bg-indigo-50/30">
                                    {editForm.videoUrl ? (
                                        <div className="w-full relative">
                                            <video src={editForm.videoUrl} className="w-full h-48 object-cover rounded-xl bg-black" controls />
                                            <button 
                                                type="button" 
                                                onClick={() => setEditForm(prev => ({...prev, videoUrl: ''}))}
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
                                    <input type="url" placeholder="https://..." value={editForm.videoUrl} onChange={(e) => setEditForm({...editForm, videoUrl: e.target.value})} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none" />
                                </div>
                            </div>

                            {/* Section 3: Details */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Deep Dive</h3>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Short Description</label>
                                    <textarea value={editForm.description} onChange={(e) => setEditForm({...editForm, description: e.target.value})} rows={3} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">How it works (Technical)</label>
                                    <textarea value={editForm.whatItDoes} onChange={(e) => setEditForm({...editForm, whatItDoes: e.target.value})} rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Outcome / Benefit</label>
                                    <textarea value={editForm.outcome} onChange={(e) => setEditForm({...editForm, outcome: e.target.value})} rows={3} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                                </div>
                            </div>

                            {/* Section 4: Metadata */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Metadata</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                     <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Project URL (Access Link)</label>
                                        <input type="url" value={editForm.link} onChange={(e) => setEditForm({...editForm, link: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" placeholder="https://..." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Tools Used (comma separated)</label>
                                        <input type="text" value={editForm.tools} onChange={(e) => setEditForm({...editForm, tools: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50">
                                    <input 
                                        type="checkbox" 
                                        id="paidToggle" 
                                        checked={editForm.isPaid} 
                                        onChange={(e) => setEditForm({...editForm, isPaid: e.target.checked})}
                                        className="w-5 h-5 rounded text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label htmlFor="paidToggle" className="flex-1 font-bold text-slate-700">This is a Paid Resource</label>
                                    {editForm.isPaid && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-slate-400">$</span>
                                            <input 
                                                type="number" 
                                                value={editForm.price} 
                                                onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                                                className="w-24 px-3 py-2 border border-slate-300 rounded-lg outline-none" 
                                                placeholder="0.00"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Footer Actions */}
                            <div className="sticky bottom-0 bg-white pt-4 pb-2 border-t border-slate-100 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors">Cancel</button>
                                <button type="submit" disabled={saving || uploadingVideo} className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2">
                                    {saving ? <Loader2 className="animate-spin w-5 h-5" /> : "Save All Changes"}
                                </button>
                            </div>

                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* ================= HEADER ================= */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
             <div className="container mx-auto px-4 sm:px-6 max-w-6xl h-20 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/community/automation-hub" className="p-2 -ml-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
                    <div className="flex flex-col">
                        <h1 className="text-lg font-bold text-slate-900 leading-none">{resource.title}</h1>
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-1">{resource.category}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {isOwner && (
                        <button onClick={() => setIsEditing(true)} className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wide rounded-full transition-colors">
                            <Edit2 className="w-3.5 h-3.5" /> Edit
                        </button>
                    )}
                    <button 
                      onClick={toggleStar} 
                      className={cn("hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border transition-colors", starred ? "bg-yellow-500 text-white border-yellow-500" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100")}
                    >
                      <Star className={cn("w-4 h-4", starred ? "text-white" : "text-yellow-500")} fill={starred ? "currentColor" : "none"} />
                      <span>Give a Star</span>
                      <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", starred ? "bg-white/20" : "bg-slate-100")}>{starCount}</span>
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-indigo-600 transition-colors">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
             </div>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl pt-8 relative z-10">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT COLUMN (Content) */}
                <div className="lg:col-span-8 space-y-8">
                    
                    {/* Video Player */}
                    <div className="w-full rounded-[1.5rem] overflow-hidden bg-black shadow-2xl shadow-slate-200 ring-1 ring-slate-200 relative group aspect-video">
                        {resource.videoUrl ? (
                            resource.videoUrl.includes('cloudinary') ? (
                                <video 
                                    src={resource.videoUrl} 
                                    controls 
                                    className="w-full h-full object-contain bg-black"
                                    poster={resource.userPhoto} // Fallback poster
                                />
                            ) : (
                                <iframe 
                                  src={resource.videoUrl.replace('watch?v=', 'embed/')} 
                                  title="Resource Video"
                                  className="w-full h-full"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                            )
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-50 text-slate-300">
                                <div className="text-center">
                                    <PlayCircle className="w-16 h-16 mx-auto mb-2 opacity-50" />
                                    <p className="font-bold">No Preview Video</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Author & Stats Row */}
                    <div className="flex items-center justify-between pb-6 border-b border-slate-200">
                        <div className="flex items-center gap-3">
                            {resource.userPhoto ? (
                                <img src={resource.userPhoto} alt={resource.userName} className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-sm" />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                    <User className="w-6 h-6" />
                                </div>
                            )}
                            <div>
                                <p className="text-base font-bold text-slate-900">{resource.userName}</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                                        <CheckCircle2 className="w-3 h-3" /> Verified Creator
                                    </span>
                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> 
                                        {resource.createdAt?.toDate ? resource.createdAt.toDate().toLocaleDateString() : 'New'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Detailed Content Tabs style */}
                    <div className="space-y-10">
                        <section>
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-indigo-500" /> Overview
                            </h3>
                            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line text-lg">
                                {resource.description}
                            </div>
                        </section>

                        {resource.whatItDoes && (
                            <section className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-amber-500" /> How it Works
                                </h3>
                                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line">
                                    {resource.whatItDoes}
                                </div>
                            </section>
                        )}

                        {resource.outcome && (
                            <section className="bg-emerald-50/50 p-8 rounded-[2rem] border border-emerald-100">
                                <h3 className="text-lg font-bold text-emerald-900 mb-4 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-600" /> Expected Outcomes
                                </h3>
                                <p className="text-emerald-800 leading-relaxed font-medium">
                                    {resource.outcome}
                                </p>
                            </section>
                        )}
                    </div>
                </div>

                {/* RIGHT COLUMN (Sticky Sidebar) */}
                <div className="lg:col-span-4 space-y-6">
                    
                    {/* Access Card */}
                    <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-xl shadow-slate-200/50 sticky top-24">
                        <div className="flex items-end justify-between mb-6 pb-6 border-b border-slate-50">
                            <div>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Access</p>
                                <h2 className="text-4xl font-extrabold text-slate-900">
                                    {resource.isPaid ? `$${resource.price}` : 'Free'}
                                </h2>
                            </div>
                            {resource.isPaid && <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase">One-time</span>}
                        </div>

                        <button 
                          onClick={toggleStar} 
                          className={cn("w-full py-3 rounded-xl text-sm font-bold border mb-4 flex items-center justify-center gap-2", starred ? "bg-yellow-500 text-white border-yellow-500" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50")}
                        >
                          <Star className={cn("w-4 h-4", starred ? "text-white" : "text-yellow-500")} fill={starred ? "currentColor" : "none"} />
                          <span>Give a Star if you like it</span>
                          <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", starred ? "bg-white/20" : "bg-slate-100")}>{starCount}</span>
                        </button>

                        {resource.link ? (
                            <a 
                              href={resource.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-slate-900/20 mb-3 group"
                            >
                              Get Access <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </a>
                        ) : (
                            <button disabled className="w-full py-4 bg-slate-100 text-slate-400 font-bold rounded-xl cursor-not-allowed">
                                Link Unavailable
                            </button>
                        )}
                        <p className="text-xs text-center text-slate-400 font-medium">Secure access provided by creator</p>
                    </div>

                    {/* Tools Stack */}
                    <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                             <Box className="w-4 h-4" /> Tech Stack
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {(resource.tools || []).map((tool, i) => (
                                <span key={i} className="px-3 py-1.5 bg-slate-50 border border-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wide rounded-lg">
                                    {tool}
                                </span>
                            ))}
                            {(!resource.tools || resource.tools.length === 0) && (
                                <span className="text-slate-400 text-sm italic">No tools listed</span>
                            )}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                             <User className="w-4 h-4" /> Contact Creator
                        </h3>
                        <div className="space-y-3">
                          {resource.contactEmail && (
                            <a href={`mailto:${resource.contactEmail}`} className="block text-sm font-medium text-slate-700 hover:text-indigo-600 underline decoration-slate-200 underline-offset-4">
                              {resource.contactEmail}
                            </a>
                          )}
                          {resource.contactPhone && (
                            <div className="text-sm font-medium text-slate-700">{resource.contactPhone}</div>
                          )}
                          {resource.contactWebsite && (
                            <a href={resource.contactWebsite} target="_blank" rel="noopener noreferrer" className="block text-sm font-medium text-slate-700 hover:text-indigo-600 underline decoration-slate-200 underline-offset-4">
                              {resource.contactWebsite.replace(/^https?:\/\//, '')}
                            </a>
                          )}
                          {!resource.contactEmail && !resource.contactPhone && !resource.contactWebsite && (
                            <div className="text-sm text-slate-400">No contact details provided.</div>
                          )}
                        </div>
                    </div>

                    {/* Mobile Owner Actions */}
                    {isOwner && (
                        <div className="lg:hidden grid grid-cols-2 gap-3">
                            <button onClick={() => setIsEditing(true)} className="py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl flex items-center justify-center gap-2">
                                <Edit2 className="w-4 h-4" /> Edit
                            </button>
                            <button onClick={handleDelete} className="py-3 bg-red-50 border border-red-100 text-red-600 font-bold rounded-xl flex items-center justify-center gap-2">
                                <Trash2 className="w-4 h-4" /> Delete
                            </button>
                        </div>
                    )}

                </div>
             </div>
        </div>
      </div>
    </CommunityLayout>
  );
};

export default ResourceDetails;
