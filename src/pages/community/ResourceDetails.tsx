import React, { useState, useEffect } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Loader2, User, Clock, 
  Edit2, Trash2, CheckCircle2, Share2, 
  Sparkles, Zap, Box, Upload, X, PlayCircle, Lock,
  ArrowRight, ArrowBigUp, Link as LinkIcon, Video
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
  attachments?: Array<{ name: string; url: string; size?: number }>;
  userId: string;
  userName: string;
  userPhoto?: string;
  link?: string;
  category: 'automation' | 'project' | 'tool' | 'prompt';
  createdAt?: any;
  contactEmail?: string;
  contactPhone?: string;
  contactWebsite?: string;
  upvotes?: number;
  upvotedBy?: string[];
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
  const [uploadingAttachment, setUploadingAttachment] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState<number>(0);
  const [isUpvoted, setIsUpvoted] = useState<boolean>(false);

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
    contactWebsite: '',
    attachments: [] as Array<{ name: string; url: string; size?: number }>
  });

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
          setUpvoteCount((data as any).upvotes || 0);
          setIsUpvoted(((data as any).upvotedBy || []).includes(user?.uid));
          
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
            contactWebsite: data.contactWebsite || '',
            attachments: (data.attachments || []) as Array<{ name: string; url: string; size?: number }>
          });

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

  useEffect(() => {
    if (!resource) return;
    const key = `viewed_resource_${resource.id}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, '1');
    try {
      updateDoc(doc(db, 'community_resources', resource.id), { views: increment(1) });
    } catch {}
  }, [resource?.id]);

  const getYouTubeEmbed = (url: string) => {
    if (!url) return '';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
    }
    return url; 
  };

  const handleLockedAttachmentClick = () => {
    toast.error("Unlock attachments by buying this resource");
  };

  const toggleUpvote = async () => {
    if (!resource || !user) return toast.error("Please login to upvote");
    try {
      const ref = doc(db, 'community_resources', resource.id);
      if (isUpvoted) {
        await updateDoc(ref, { upvotes: increment(-1), upvotedBy: arrayRemove(user.uid) });
        setUpvoteCount(c => Math.max(0, c - 1));
        setIsUpvoted(false);
      } else {
        await updateDoc(ref, { upvotes: increment(1), upvotedBy: arrayUnion(user.uid) });
        setUpvoteCount(c => c + 1);
        setIsUpvoted(true);
        if (resource.userId !== user.uid) {
            addDoc(collection(db, 'notifications'), {
                recipientId: resource.userId,
                senderId: user.uid,
                senderName: user.displayName || 'User',
                type: 'upvote',
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
    const toastId = toast.loading("Uploading video...");

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", UPLOAD_PRESET as string); 
      data.append("cloud_name", CLOUD_NAME);
      data.append("resource_type", "video");

      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/video/upload`, {
        method: "POST",
        body: data
      });
      const result = await response.json();
      if (result.secure_url) {
        setEditForm(prev => ({ ...prev, videoUrl: result.secure_url }));
        toast.success("Video uploaded!", { id: toastId });
      } else {
        throw new Error("Upload failed");
      }
    } catch {
      toast.error("Failed to upload video", { id: toastId });
    } finally {
      setUploadingVideo(false);
    }
  };

  const handleAttachmentsUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    try {
      setUploadingAttachment(true);
      for (const file of files) {
        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
          toast.error('Images and videos are not allowed here');
          continue;
        }
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", UPLOAD_PRESET as string);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`, {
          method: "POST",
          body: data
        });
        const json = await res.json();
        if (json.secure_url) {
          setEditForm(prev => ({
            ...prev,
            attachments: [...prev.attachments, { name: file.name, url: json.secure_url, size: file.size }]
          }));
        } else {
          throw new Error(json.error?.message || 'Upload failed');
        }
      }
      toast.success('Attachment(s) uploaded');
    } catch (err) {
      console.error(err);
      toast.error('Failed to upload attachment');
    } finally {
      setUploadingAttachment(false);
      if (e.target) e.target.value = '';
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
        attachments: editForm.attachments
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
      toast.success("Link copied!");
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const isOwner = user && resource && (user.uid === resource.userId || isAdminEmail(user.email));

  // --- SUB-COMPONENTS ---
  const TechStack = () => (
    <div className="bg-white rounded-[1.25rem] p-5 border border-slate-200 shadow-sm w-full">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Box className="w-3.5 h-3.5" /> Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2">
            {(resource?.tools || []).map((tool, i) => (
                <span key={i} className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-700 text-[10px] lg:text-xs font-bold uppercase tracking-wide rounded-lg">
                    {tool}
                </span>
            ))}
            {(!resource?.tools || resource.tools.length === 0) && <span className="text-slate-400 text-xs italic">No tools listed</span>}
        </div>
    </div>
  );

  const AccessCard = () => (
    <div className="bg-white rounded-[1.25rem] p-5 border border-slate-200 shadow-xl shadow-slate-200/50">
        <div className="flex items-end justify-between mb-4 pb-4 border-b border-slate-50">
            <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Access</p>
                <h2 className="text-3xl font-extrabold text-slate-900">
                    {resource?.isPaid ? `$${resource.price}` : 'Free'}
                </h2>
            </div>
            {resource?.isPaid && <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-bold uppercase">One-time</span>}
        </div>

        <button 
            onClick={toggleUpvote} 
            className={cn("w-full py-3 rounded-xl text-sm font-bold border mb-3 flex items-center justify-center gap-2 transition-all", isUpvoted ? "bg-orange-50 border-orange-200 text-orange-600" : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50")}
        >
            <ArrowBigUp className={cn("w-5 h-5", isUpvoted ? "fill-orange-600 text-orange-600" : "text-slate-400")} />
            <span>{isUpvoted ? "Upvoted" : "Upvote"}</span>
            <span className="bg-slate-100 px-2 py-0.5 rounded-full text-xs text-slate-600 ml-1">{upvoteCount}</span>
        </button>

        {resource?.link ? (
            <a 
                href={resource.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-slate-900/20 mb-2 group text-sm"
            >
                Get Access <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
        ) : (
            <button disabled className="w-full py-3 bg-slate-100 text-slate-400 font-bold rounded-xl cursor-not-allowed text-sm">
                Link Unavailable
            </button>
        )}
        <p className="text-[10px] text-center text-slate-400 font-medium">Secure access provided by creator</p>
    </div>
  );

  const ContactCard = () => (
    <div className="bg-white rounded-[1.25rem] p-5 border border-slate-200 shadow-sm w-full">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <User className="w-3.5 h-3.5" /> Contact Creator
        </h3>
        <div className="space-y-2">
            {resource?.contactEmail && <a href={`mailto:${resource.contactEmail}`} className="block text-sm font-medium text-slate-700 hover:text-indigo-600 truncate">{resource.contactEmail}</a>}
            {resource?.contactPhone && <div className="text-sm font-medium text-slate-700 truncate">{resource.contactPhone}</div>}
            {resource?.contactWebsite && <a href={resource.contactWebsite} target="_blank" rel="noopener noreferrer" className="block text-sm font-medium text-slate-700 hover:text-indigo-600 truncate">{resource.contactWebsite.replace(/^https?:\/\//, '')}</a>}
            {!resource?.contactEmail && !resource?.contactPhone && !resource?.contactWebsite && <div className="text-xs text-slate-400">No contact details provided.</div>}
        </div>
    </div>
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  if (!resource) return null;

  return (
    <CommunityLayout>
        {/* --- EDIT MODAL --- */}
        <AnimatePresence>
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        onClick={() => setIsEditing(false)}
                    />
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white sticky top-0 z-10">
                            <h2 className="text-lg font-bold text-slate-900">Edit Resource</h2>
                            <button onClick={() => setIsEditing(false)} className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="overflow-y-auto p-6 space-y-8 flex-1">
                            {/* Essentials Section */}
                            <div className="space-y-6">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                  <Sparkles className="w-4 h-4" /> Essentials
                                </h3>
                                
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
                                    <label className="text-sm font-bold text-slate-700">Description</label>
                                    <textarea value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} rows={2} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none resize-none" />
                                </div>

                                {/* Media & Attachments */}
                                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-5">
                                    {/* Video */}
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                           <label className="text-sm font-bold text-slate-700">Demo Video</label>
                                           <div className="flex gap-2 text-xs">
                                              <button type="button" onClick={() => setVideoSourceType('link')} className={cn("px-2 py-1 rounded font-bold", videoSourceType === 'link' ? "bg-white shadow-sm text-slate-900" : "text-slate-500")}>Link</button>
                                              <button type="button" onClick={() => setVideoSourceType('upload')} className={cn("px-2 py-1 rounded font-bold", videoSourceType === 'upload' ? "bg-white shadow-sm text-slate-900" : "text-slate-500")}>Upload</button>
                                           </div>
                                        </div>
                                        {videoSourceType === 'upload' ? (
                                            <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-100">
                                                <input type="file" accept="video/*" onChange={handleVideoUpload} className="hidden" disabled={uploadingVideo} />
                                                <span className="text-xs font-bold text-slate-600">{uploadingVideo ? 'Uploading...' : 'Upload Video File'}</span>
                                            </label>
                                        ) : (
                                            <input value={editForm.videoUrl} onChange={e => setEditForm({...editForm, videoUrl: e.target.value})} className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm" placeholder="YouTube or Video URL" />
                                        )}
                                    </div>

                                    {/* Attachments */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700">Attachments</label>
                                        <div className="space-y-2">
                                            {editForm.attachments.map((f, i) => (
                                                <div key={i} className="flex items-center justify-between text-xs bg-white p-2 rounded-lg border border-slate-200">
                                                    <span className="truncate max-w-[200px]">{f.name}</span>
                                                    <button onClick={() => setEditForm(prev => ({ ...prev, attachments: prev.attachments.filter((_, idx) => idx !== i) }))}><Trash2 className="w-3 h-3 text-rose-500" /></button>
                                                </div>
                                            ))}
                                            <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-indigo-600 hover:text-indigo-700">
                                                <Upload className="w-4 h-4" /> {uploadingAttachment ? "Uploading..." : "Add File"}
                                                <input type="file" multiple className="hidden" onChange={handleAttachmentsUpload} disabled={uploadingAttachment} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Deep Dive Section */}
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Deep Dive</h3>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-slate-700">Setup User Guide</label>
                                        <textarea value={editForm.whatItDoes} onChange={e => setEditForm({...editForm, whatItDoes: e.target.value})} rows={4} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none resize-none" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-slate-700">What it Does / Outcome Achieved</label>
                                        <textarea value={editForm.outcome} onChange={e => setEditForm({...editForm, outcome: e.target.value})} rows={4} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none resize-none" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-sm font-bold text-slate-700">Tech Stack</label>
                                    <input value={editForm.tools} onChange={e => setEditForm({...editForm, tools: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                                </div>
                            </div>

                            {/* Access & Commerce */}
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-sm font-bold text-slate-700">Access Link</label>
                                        <input value={editForm.link} onChange={e => setEditForm({...editForm, link: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex flex-col justify-center">
                                        <label className="flex items-center justify-between cursor-pointer mb-2">
                                            <span className="text-sm font-bold text-slate-700">Is this Paid?</span>
                                            <input type="checkbox" checked={editForm.isPaid} onChange={e => setEditForm({...editForm, isPaid: e.target.checked})} className="w-4 h-4" />
                                        </label>
                                        {editForm.isPaid && (
                                            <input value={editForm.price} onChange={e => setEditForm({...editForm, price: e.target.value})} className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none" placeholder="Price" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 sticky bottom-0 z-10">
                            <button onClick={() => setIsEditing(false)} className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50">Cancel</button>
                            <button onClick={handleUpdate} disabled={saving} className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 shadow-lg">{saving ? 'Saving...' : 'Save Changes'}</button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

        {/* --- RESOURCE HEADER --- */}
        {/* FIX: Added mt-20 on mobile to push content below the Global Navbar */}
        <div className="bg-white border-b border-slate-200 relative md:sticky md:top-0 z-30 shadow-sm/50 mt-8 md:mt-0">
             <div className="container mx-auto px-4 sm:px-6 max-w-6xl h-16 lg:h-20 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Link to="/community/automation-hub" className="p-2 -ml-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-colors shrink-0">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="h-5 w-px bg-slate-200 hidden sm:block shrink-0"></div>
                    
                    <div className="min-w-0 flex-1">
                        <h1 className="text-base lg:text-lg font-bold text-slate-900 leading-none truncate">{resource.title}</h1>
                        <span className="text-[10px] lg:text-xs font-semibold text-slate-400 uppercase tracking-wide block truncate">{resource.category}</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    {isOwner && (
                        <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold uppercase rounded-full hover:bg-slate-200 transition-colors">
                            <Edit2 className="w-3.5 h-3.5" /> <span>Edit</span>
                        </button>
                    )}
                    <button onClick={handleShare} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-indigo-600 transition-colors">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
             </div>
        </div>

        {/* Main Grid */}
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl pt-6 lg:pt-8 pb-14 lg:pb-20 relative z-10">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* LEFT COLUMN */}
                <div className="lg:col-span-8 space-y-6 min-w-0">
                    {/* Video */}
                    <div className="w-full rounded-2xl overflow-hidden bg-black shadow-lg ring-1 ring-slate-200 relative aspect-video">
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
                    <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                        <Link to={`/community/profile/${resource.userId}`} className="flex items-center gap-3 group">
                            {resource.userPhoto ? (
                                <img src={resource.userPhoto} alt={resource.userName} className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-sm" />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400"><User className="w-6 h-6" /></div>
                            )}
                            <div>
                                <p className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{resource.userName}</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100"><CheckCircle2 className="w-3 h-3" /> Verified</span>
                                    <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {resource.createdAt?.toDate ? resource.createdAt.toDate().toLocaleDateString() : 'New'}</span>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Mobile Only: Tech Stack & Sidebar */}
                    <div className="block lg:hidden space-y-4">
                        <AccessCard />
                        <TechStack />
                        <ContactCard />
                    </div>

                    {/* Content Tabs */}
                    <div className="space-y-8">
                        {/* 1. Overview */}
                        <section>
                            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2"><Sparkles className="w-5 h-5 text-indigo-500" /> Overview</h3>
                            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line text-sm lg:text-base">{resource.description}</div>
                        </section>

                        {/* 2. What it Does / Outcome */}
                        {(resource.outcome) && (
                            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500" /> What it Does / Outcome Achieved</h3>
                                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line text-sm lg:text-base">{resource.outcome}</div>
                            </section>
                        )}

                        {/* 3. Setup Guide */}
                        {resource.whatItDoes && (
                            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2"><Zap className="w-5 h-5 text-amber-500" /> Setup User Guide</h3>
                                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-line text-sm lg:text-base">{resource.whatItDoes}</div>
                            </section>
                        )}

                        {/* 4. Files */}
                        {resource.attachments && resource.attachments.length > 0 && (
                          <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2"><Box className="w-5 h-5 text-indigo-500" /> Resource Files</h3>
                            <ul className="divide-y divide-slate-100 bg-white rounded-xl border border-slate-200">
                              {resource.attachments.map((f, i) => (
                                <li key={`${f.name}-${i}`} className="flex items-center justify-between px-4 py-3 text-sm">
                                  <a href={resource.isPaid ? undefined : f.url} className="font-medium text-slate-700 hover:text-indigo-600 truncate max-w-[200px] sm:max-w-md">
                                    {f.name}
                                  </a>
                                  {resource.isPaid ? (
                                    <button onClick={handleLockedAttachmentClick} className="px-3 py-1.5 text-xs font-bold bg-slate-100 text-slate-600 rounded-lg border border-slate-200 hover:bg-slate-200 flex items-center gap-1">
                                      <Lock className="w-3 h-3" /> Download
                                    </button>
                                  ) : (
                                    <a href={f.url} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 text-xs font-bold bg-slate-900 text-white rounded-lg hover:bg-slate-800">
                                      Download
                                    </a>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </section>
                        )}
                        
                        <div className="pt-8 border-t border-slate-200">
                            <ResourceDiscussion resourceId={resource.id} />
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-200">
                        <ResourceReviews resourceId={resource.id} />
                    </div>

                    <RelatedResources current={{ id: resource.id, title: resource.title, tools: resource.tools || [], category: resource.category, userId: resource.userId }} />
                </div>

                {/* RIGHT COLUMN (Desktop Sidebar) */}
                <div className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-5">
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