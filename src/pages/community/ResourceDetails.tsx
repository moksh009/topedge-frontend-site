import React, { useState, useEffect } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Loader2, ExternalLink, User, Clock, 
  Edit2, Trash2, CheckCircle2, Share2, 
  Sparkles, Zap, Box, Upload, X, PlayCircle,
  ArrowRight, Star, ThumbsUp, DollarSign, Link as LinkIcon, Video
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, serverTimestamp, deleteDoc, arrayUnion, arrayRemove, increment, addDoc, collection } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { isAdminEmail } from '@/utils/admin';
import toast from 'react-hot-toast';
import ResourceReviews from '@/pages/community/ResourceReviews';
import RelatedResources from '@/components/community/RelatedResources';
import ResourceDiscussion from '@/pages/community/ResourceDiscussion';

// CLOUDINARY CONFIG
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "dn9gh1goq";
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

if (!UPLOAD_PRESET) {
  console.error("Missing Cloudinary Upload Preset! Check your .env file.");
}

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
  
  // Interaction State
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [starCount, setStarCount] = useState<number>(0);
  const [starred, setStarred] = useState<boolean>(false);

  // Edit Form State
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
    isPaid: false,
    contactEmail: '',
    contactPhone: '',
    contactWebsite: ''
  });

  // Toggle for Edit Modal (Link vs Upload)
  const [videoSourceType, setVideoSourceType] = useState<'link' | 'upload'>('link');

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
            title: data.title || '',
            description: data.description || '',
            whatItDoes: data.whatItDoes || '',
            outcome: data.outcome || '',
            videoUrl: data.videoUrl || '',
            link: data.link || '',
            price: data.price?.toString() || '',
            tools: data.tools ? data.tools.join(', ') : '',
            category: data.category as any || 'automation',
            isPaid: !!data.isPaid,
            contactEmail: data.contactEmail || '',
            contactPhone: data.contactPhone || '',
            contactWebsite: data.contactWebsite || ''
          });

          // Auto-detect video source type for edit modal
          if (data.videoUrl && data.videoUrl.includes('cloudinary')) {
            setVideoSourceType('upload');
          } else {
            setVideoSourceType('link');
          }
        } else {
          toast.error("Resource not found");
          navigate('/community/automation-hub');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchResource();
  }, [id, navigate, user]);

  // View Counter
  useEffect(() => {
    if (!resource) return;
    const key = `viewed_resource_${resource.id}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, '1');
    try {
      updateDoc(doc(db, 'community_resources', resource.id), { views: increment(1) });
    } catch {}
  }, [resource?.id]);

  // --- HELPER: Fix YouTube URLs for Embedding ---
  const getYouTubeEmbed = (url: string) => {
    if (!url) return '';
    // Regex matches: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
    }
    // Return original if it's not a standard YouTube link (could be Vimeo, etc., or already embedded)
    return url; 
  };

  const toggleStar = async () => {
    if (!resource || !user) return toast.error("Please login to star");
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
        if (resource.userId !== user.uid) {
            addDoc(collection(db, 'notifications'), {
                recipientId: resource.userId,
                senderId: user.uid,
                senderName: user.displayName || 'User',
                type: 'star',
                resourceId: resource.id,
                resourceTitle: resource.title,
                read: false,
                createdAt: serverTimestamp()
            });
        }
      }
    } catch (e) { console.error(e); }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 100 * 1024 * 1024) return toast.error("File too large (Max 100MB)");

    setUploadingVideo(true);
    const toastId = toast.loading("Uploading video... This may take a moment.");

    try {
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
        setEditForm(prev => ({ ...prev, videoUrl: result.secure_url }));
        toast.success("Video uploaded successfully!", { id: toastId });
      } else {
        throw new Error("Upload failed");
      }
    } catch {
      toast.error("Failed to upload video", { id: toastId });
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
        tools: editForm.tools.split(',').map(t => t.trim()).filter(Boolean),
        category: editForm.category,
        contactEmail: editForm.contactEmail,
        contactPhone: editForm.contactPhone,
        contactWebsite: editForm.contactWebsite,
      };

      await updateDoc(doc(db, 'community_resources', resource.id), updatedData as any);
      setResource(prev => prev ? ({ ...prev, ...updatedData, tools: updatedData.tools as string[], category: updatedData.category as any }) : null);
      setIsEditing(false);
      toast.success("Resource updated!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!resource || !user) return;
    if (window.confirm("Are you sure you want to delete this resource?")) {
      try {
        await deleteDoc(doc(db, 'community_resources', resource.id));
        toast.success("Deleted");
        navigate('/community/automation-hub');
      } catch (error) {
        toast.error("Failed to delete");
      }
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const isOwner = user && resource && (user.uid === resource.userId || isAdminEmail(user.email));

  // --- SUB-COMPONENTS ---
  const TechStack = () => (
    <div className="bg-white rounded-[1.5rem] lg:rounded-[2rem] p-5 lg:p-6 border border-slate-200 shadow-sm w-full">
        <h3 className="text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Box className="w-3.5 h-3.5" /> Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2">
            {(resource?.tools || []).map((tool, i) => (
                <span key={i} className="px-2.5 py-1 lg:px-3 lg:py-1.5 bg-slate-50 border border-slate-100 text-slate-700 text-[10px] lg:text-xs font-bold uppercase tracking-wide rounded-lg">
                    {tool}
                </span>
            ))}
            {(!resource?.tools || resource.tools.length === 0) && <span className="text-slate-400 text-xs italic">No tools listed</span>}
        </div>
    </div>
  );

  const AccessCard = () => (
    <div className="bg-white rounded-[1.5rem] lg:rounded-[2rem] p-5 lg:p-6 border border-slate-200 shadow-xl shadow-slate-200/50">
        <div className="flex items-end justify-between mb-5 pb-5 border-b border-slate-50">
            <div>
                <p className="text-[10px] lg:text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Access</p>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900">
                    {resource?.isPaid ? `$${resource.price}` : 'Free'}
                </h2>
            </div>
            {resource?.isPaid && <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase">One-time</span>}
        </div>

        <button 
            onClick={toggleStar} 
            className={cn("w-full py-3 rounded-xl text-xs lg:text-sm font-bold border mb-3 flex items-center justify-center gap-2 transition-all", starred ? "bg-yellow-500 text-white border-yellow-500" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50")}
        >
            <Star className={cn("w-4 h-4", starred ? "text-white" : "text-yellow-500")} fill={starred ? "currentColor" : "none"} />
            <span>{starred ? "Starred" : "Give a Star if you like it"}</span>
            <span className={cn("px-1.5 lg:px-2 py-0.5 rounded-full text-[10px] font-bold", starred ? "bg-white/20" : "bg-slate-100")}>{starCount}</span>
        </button>

        {resource?.link ? (
            <a 
                href={resource.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-slate-900/20 mb-2 group text-xs lg:text-sm"
            >
                Get Access <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
        ) : (
            <button disabled className="w-full py-3.5 bg-slate-100 text-slate-400 font-bold rounded-xl cursor-not-allowed text-xs lg:text-sm">
                Link Unavailable
            </button>
        )}
        <p className="text-[10px] lg:text-xs text-center text-slate-400 font-medium">Secure access provided by creator</p>
    </div>
  );

  const ContactCard = () => (
    <div className="bg-white rounded-[1.5rem] lg:rounded-[2rem] p-5 lg:p-6 border border-slate-200 shadow-sm w-full">
        <h3 className="text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <User className="w-3.5 h-3.5" /> Contact Creator
        </h3>
        <div className="space-y-2 lg:space-y-3">
            {resource?.contactEmail && <a href={`mailto:${resource.contactEmail}`} className="block text-xs lg:text-sm font-medium text-slate-700 hover:text-indigo-600 truncate">{resource.contactEmail}</a>}
            {resource?.contactPhone && <div className="text-xs lg:text-sm font-medium text-slate-700 truncate">{resource.contactPhone}</div>}
            {resource?.contactWebsite && <a href={resource.contactWebsite} target="_blank" rel="noopener noreferrer" className="block text-xs lg:text-sm font-medium text-slate-700 hover:text-indigo-600 truncate">{resource.contactWebsite.replace(/^https?:\/\//, '')}</a>}
            {!resource?.contactEmail && !resource?.contactPhone && !resource?.contactWebsite && <div className="text-xs text-slate-400">No contact details provided.</div>}
        </div>
    </div>
  );

  const renderSidebar = () => (
    <div className="space-y-4 lg:space-y-6">
        <AccessCard />
        <ContactCard />
    </div>
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  if (!resource) return null;

  return (
    <CommunityLayout>
        
        {/* --- PREMIUM EDIT MODAL --- */}
        <AnimatePresence>
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }} 
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        onClick={() => setIsEditing(false)}
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                    >
                        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 bg-white sticky top-0 z-10">
                            <h2 className="text-xl font-bold text-slate-900">Edit Resource</h2>
                            <button onClick={() => setIsEditing(false)} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="overflow-y-auto p-8 space-y-8 flex-1">
                            {/* Section 1: Core Details */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Core Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-slate-700">Title</label>
                                        <input value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-slate-700">Category</label>
                                        <select value={editForm.category} onChange={e => setEditForm({...editForm, category: e.target.value as any})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none">
                                            <option value="automation">Automation</option>
                                            <option value="project">Project</option>
                                            <option value="tool">Tool</option>
                                            <option value="prompt">Prompt</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-slate-700">Short Description</label>
                                    <textarea value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} rows={3} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none resize-none" />
                                </div>
                            </div>

                            {/* Section 2: Media & Video */}
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Media & Video</h3>
                                
                                {/* Video Source Toggles */}
                                <div className="flex gap-2 p-1 bg-slate-100 rounded-xl w-fit">
                                    <button 
                                        type="button"
                                        onClick={() => setVideoSourceType('link')}
                                        className={cn("px-4 py-2 rounded-lg text-xs font-bold transition-all", videoSourceType === 'link' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}
                                    >
                                        <LinkIcon className="w-3 h-3 inline mr-2" />
                                        External Link
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setVideoSourceType('upload')}
                                        className={cn("px-4 py-2 rounded-lg text-xs font-bold transition-all", videoSourceType === 'upload' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700")}
                                    >
                                        <Video className="w-3 h-3 inline mr-2" />
                                        Upload File
                                    </button>
                                </div>

                                {videoSourceType === 'upload' ? (
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-300 text-center relative group cursor-pointer hover:border-indigo-400 transition-colors">
                                        <input type="file" accept="video/*" onChange={handleVideoUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" disabled={uploadingVideo} />
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-indigo-500">
                                                {uploadingVideo ? <Loader2 className="w-6 h-6 animate-spin" /> : <Upload className="w-6 h-6" />}
                                            </div>
                                            <p className="text-sm font-bold text-slate-700">{uploadingVideo ? 'Uploading... please wait' : 'Click to Upload Video'}</p>
                                            <p className="text-xs text-slate-400">MP4, WebM (Max 100MB)</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-slate-700">Paste YouTube / Video URL</label>
                                        <input 
                                            value={editForm.videoUrl} 
                                            onChange={e => setEditForm({...editForm, videoUrl: e.target.value})} 
                                            className="w-full p-3 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                                            placeholder="https://youtube.com/watch?v=..." 
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Section 3: Deep Dive */}
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Deep Dive</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-slate-700">How it Works</label>
                                        <textarea value={editForm.whatItDoes} onChange={e => setEditForm({...editForm, whatItDoes: e.target.value})} rows={4} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none resize-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-slate-700">Outcome</label>
                                        <textarea value={editForm.outcome} onChange={e => setEditForm({...editForm, outcome: e.target.value})} rows={4} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none resize-none" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-slate-700">Tech Stack (Comma Separated)</label>
                                    <input value={editForm.tools} onChange={e => setEditForm({...editForm, tools: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" placeholder="n8n, Python..." />
                                </div>
                            </div>

                            {/* Section 4: Access & Pricing */}
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Access & Pricing</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-slate-700">Access Link</label>
                                        <input value={editForm.link} onChange={e => setEditForm({...editForm, link: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-col justify-center">
                                        <label className="flex items-center justify-between cursor-pointer mb-2">
                                            <span className="text-sm font-bold text-slate-700">Is this Paid?</span>
                                            <div className={cn("w-10 h-6 rounded-full p-1 transition-colors", editForm.isPaid ? "bg-emerald-500" : "bg-slate-300")}>
                                                <input type="checkbox" checked={editForm.isPaid} onChange={e => setEditForm({...editForm, isPaid: e.target.checked})} className="hidden" />
                                                <div className={cn("w-4 h-4 bg-white rounded-full shadow-sm transition-transform", editForm.isPaid ? "translate-x-4" : "translate-x-0")} />
                                            </div>
                                        </label>
                                        {editForm.isPaid && (
                                            <div className="relative">
                                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                                <input value={editForm.price} onChange={e => setEditForm({...editForm, price: e.target.value})} className="w-full pl-9 p-2 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none" placeholder="Price" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Section 5: Contact Info */}
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Contact Info</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <input value={editForm.contactEmail} onChange={e => setEditForm({...editForm, contactEmail: e.target.value})} className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm" placeholder="Email" />
                                    <input value={editForm.contactPhone} onChange={e => setEditForm({...editForm, contactPhone: e.target.value})} className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm" placeholder="Phone" />
                                    <input value={editForm.contactWebsite} onChange={e => setEditForm({...editForm, contactWebsite: e.target.value})} className="p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm" placeholder="Website" />
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center sticky bottom-0 z-10">
                            <button onClick={handleDelete} className="text-rose-600 text-sm font-bold hover:text-rose-700 flex items-center gap-2 px-4 py-2 hover:bg-rose-50 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" /> Delete
                            </button>
                            <div className="flex gap-3">
                                <button onClick={() => setIsEditing(false)} className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors">Cancel</button>
                                <button onClick={handleUpdate} disabled={saving || uploadingVideo} className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg disabled:opacity-50">
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

        {/* Header */}
        <div className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm/50">
             <div className="container mx-auto px-4 sm:px-6 max-w-6xl h-16 lg:h-20 flex items-center justify-between">
                <div className="flex items-center gap-3 lg:gap-4">
                    <Link to="/community/automation-hub" className="p-1.5 lg:p-2 -ml-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-colors">
                        <ArrowLeft className="w-4 h-4 lg:w-5 lg:h-5" />
                    </Link>
                    <div className="h-5 w-px bg-slate-200 hidden sm:block"></div>
                    <div className="flex flex-col">
                        <h1 className="text-base lg:text-lg font-bold text-slate-900 leading-none line-clamp-1">{resource.title}</h1>
                        <span className="text-[10px] lg:text-xs font-semibold text-slate-400 uppercase tracking-wide mt-0.5 lg:mt-1">{resource.category}</span>
                    </div>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-2">
                    {isOwner && (
                        <button onClick={() => setIsEditing(true)} className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-700 text-[10px] lg:text-xs font-bold uppercase rounded-full hover:bg-slate-200 transition-colors">
                            <Edit2 className="w-3 h-3" /> <span className="hidden sm:inline">Edit</span>
                        </button>
                    )}
                    <button 
                        onClick={handleShare}
                        className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-indigo-600 transition-colors"
                        title="Copy Link"
                    >
                        <Share2 className="w-4 h-4 lg:w-5 lg:h-5" />
                    </button>
                </div>
             </div>
        </div>

        {/* Main Grid */}
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl pt-6 lg:pt-8 pb-20 relative z-10">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
                
                {/* LEFT COLUMN (Main Content) */}
                <div className="lg:col-span-8 space-y-4 lg:space-y-8 min-w-0">
                    
                    {/* Video */}
                    <div className="w-full rounded-[1rem] lg:rounded-[1.5rem] overflow-hidden bg-black shadow-lg ring-1 ring-slate-200 relative group aspect-video">
                        {resource.videoUrl ? (
                            resource.videoUrl.includes('cloudinary') ? (
                                <video src={resource.videoUrl} controls className="w-full h-full object-contain bg-black" poster={resource.userPhoto} />
                            ) : (
                                <iframe src={getYouTubeEmbed(resource.videoUrl)} title="Resource Video" className="w-full h-full" allowFullScreen />
                            )
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-50 text-slate-300">
                                <PlayCircle className="w-16 h-16 opacity-50" />
                            </div>
                        )}
                    </div>

                    {/* Author Row */}
                    <div className="flex items-center justify-between pb-4 lg:pb-6 border-b border-slate-200">
                        <Link to={`/community/profile/${resource.userId}`} className="flex items-center gap-3 group">
                            {resource.userPhoto ? (
                                <img src={resource.userPhoto} alt={resource.userName} className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover border border-slate-200 shadow-sm" />
                            ) : (
                                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400"><User className="w-5 h-5" /></div>
                            )}
                            <div>
                                <p className="text-sm lg:text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{resource.userName}</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] lg:text-xs font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-1.5 py-0.5 rounded-full border border-emerald-100"><CheckCircle2 className="w-3 h-3" /> Verified</span>
                                    <span className="text-[10px] lg:text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {resource.createdAt?.toDate ? resource.createdAt.toDate().toLocaleDateString() : 'New'}</span>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Tech Stack (MOBILE) */}
                    <div className="block lg:hidden pt-2">
                        <TechStack />
                    </div>

                    {/* Content Tabs */}
                    <div className="space-y-6 lg:space-y-10 pt-2">
                        <section>
                            <h3 className="text-base lg:text-lg font-bold text-slate-900 mb-3 flex items-center gap-2"><Sparkles className="w-4 h-4 lg:w-5 lg:h-5 text-indigo-500" /> Overview</h3>
                            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line text-sm lg:text-lg">{resource.description}</div>
                        </section>
                        {resource.whatItDoes && (
                            <section className="bg-white p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] border border-slate-200 shadow-sm">
                                <h3 className="text-base lg:text-lg font-bold text-slate-900 mb-3 flex items-center gap-2"><Zap className="w-4 h-4 lg:w-5 lg:h-5 text-amber-500" /> How it Works</h3>
                                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line text-sm lg:text-base">{resource.whatItDoes}</div>
                            </section>
                        )}
                        <div className="hidden lg:block pt-8 border-t border-slate-200">
                            <ResourceDiscussion resourceId={resource.id} />
                        </div>
                    </div>

                    {/* MOBILE ONLY: Sidebar */}
                    <div className="block lg:hidden space-y-4 pt-4">
                        {renderSidebar()}
                    </div>

                    {/* MOBILE ONLY: Discussion */}
                    <div className="block lg:hidden pt-6 border-t border-slate-200">
                        <ResourceDiscussion resourceId={resource.id} />
                    </div>

                    {/* Reviews */}
                    <div className="pt-6 lg:pt-10 border-t border-slate-200">
                        <ResourceReviews resourceId={resource.id} />
                    </div>

                    <RelatedResources current={{ id: resource.id, title: resource.title, tools: resource.tools || [], category: resource.category, userId: resource.userId }} />
                </div>

                {/* RIGHT COLUMN (Desktop Sidebar) */}
                <div className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-6">
                    <AccessCard />
                    <TechStack />
                    <ContactCard />
                </div>

             </div>
        </div>
    </CommunityLayout>
  );
};

export default ResourceDetails;