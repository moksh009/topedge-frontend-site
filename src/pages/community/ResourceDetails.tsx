import React, { useState, useEffect } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Play, ExternalLink, Tag, User, Clock, DollarSign, Wrench, Edit2, Trash2 } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, serverTimestamp, deleteDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { isAdminEmail } from '@/utils/admin';

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
}

const ResourceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [resource, setResource] = useState<Resource | null>(null);
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

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
          setEditForm({
            title: data.title,
            description: data.description,
            whatItDoes: data.whatItDoes || '',
            outcome: data.outcome || '',
            videoUrl: data.videoUrl || '',
            link: data.link || '',
            price: data.price?.toString() || '',
            tools: data.tools ? data.tools.join(', ') : '',
            category: data.category,
            isPaid: data.isPaid
          });
        } else {
          console.error("Resource not found");
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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resource || !user || (user.uid !== resource.userId && !isAdminEmail(user.email))) return;
    
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
      
      // Update local state
      setResource(prev => prev ? ({ ...prev, ...updatedData, tools: updatedData.tools as string[], category: updatedData.category as any }) : null);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating resource:", error);
      alert("Failed to update resource");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!resource || !user || (user.uid !== resource.userId && !isAdminEmail(user.email))) return;
    
    if (window.confirm("Are you sure you want to delete this resource? This action cannot be undone.")) {
      try {
        await deleteDoc(doc(db, 'community_resources', resource.id));
        navigate('/community/automation-hub');
      } catch (error) {
        console.error("Error deleting resource:", error);
        alert("Failed to delete resource");
      }
    }
  };

  const isOwner = user && resource && (user.uid === resource.userId || isAdminEmail(user.email));

  if (loading) {
    return (
      <CommunityLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-gray-900 animate-spin" />
        </div>
      </CommunityLayout>
    );
  }

  if (!resource) return null;

  return (
    <CommunityLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link to="/community/automation-hub" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Hub
          </Link>

          {isEditing ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 shadow-xl"
            >
              <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                <h1 className="text-2xl font-bold text-gray-900">Edit Resource</h1>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="text-gray-500 hover:text-gray-900 text-sm font-medium"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={editForm.category}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value as any })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                    >
                      <option value="automation">Automation</option>
                      <option value="project">Project</option>
                      <option value="tool">Tool</option>
                      <option value="prompt">Prompt</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Video URL (Optional)</label>
                    <input
                      type="url"
                      value={editForm.videoUrl}
                      onChange={(e) => setEditForm({ ...editForm, videoUrl: e.target.value })}
                      placeholder="https://youtube.com/..."
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Link</label>
                  <input
                    type="url"
                    value={editForm.link}
                    onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tools Used (comma separated)</label>
                  <input
                    type="text"
                    value={editForm.tools}
                    onChange={(e) => setEditForm({ ...editForm, tools: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                  />
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3 mb-4">
                    <input
                      type="checkbox"
                      id="isPaid"
                      checked={editForm.isPaid}
                      onChange={(e) => setEditForm({ ...editForm, isPaid: e.target.checked })}
                      className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="isPaid" className="font-medium text-gray-900">This is a paid resource</label>
                  </div>
                  
                  {editForm.isPaid && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                      <input
                        type="number"
                        value={editForm.price}
                        onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                        placeholder="0.00"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-gray-900/10 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
                </button>
              </form>
            </motion.div>
          ) : (
            <div className="space-y-8">
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div className="space-y-4 flex-1">
                   <div className="flex items-center gap-3">
                     <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100">
                       {resource.category}
                     </span>
                     <span className="text-gray-400 text-sm flex items-center gap-1">
                       <Clock className="w-3 h-3" />
                       {resource.createdAt?.toDate ? resource.createdAt.toDate().toLocaleDateString() : 'Recently'}
                     </span>
                   </div>
                   <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{resource.title}</h1>
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                        {resource.userPhoto ? (
                          <img src={resource.userPhoto} alt={resource.userName} className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-5 h-5 text-gray-400" />
                        )}
                     </div>
                     <div>
                       <p className="text-sm font-semibold text-gray-900">{resource.userName}</p>
                       <p className="text-xs text-gray-500">Creator</p>
                     </div>
                   </div>
                </div>

                <div className="flex flex-col gap-3 min-w-[200px]">
                  {resource.link && (
                    <a 
                      href={resource.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Project
                    </a>
                  )}
                  {isOwner && (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="w-full py-3 bg-white text-gray-900 border border-gray-200 font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit Resource
                      </button>
                      <button
                        onClick={handleDelete}
                        className="w-full py-3 bg-red-50 text-red-600 border border-red-100 font-semibold rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </>
                  )}
                  <div className="flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 rounded-lg text-gray-600 font-medium text-sm">
                    {resource.isPaid ? (
                      <><DollarSign className="w-4 h-4" /> ${resource.price}</>
                    ) : (
                      "Free Resource"
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2 space-y-8">
                    {resource.videoUrl && (
                      <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-lg">
                        <iframe 
                          src={resource.videoUrl.replace('watch?v=', 'embed/')} 
                          title="Resource Video"
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    )}
                    
                    <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-8">
                       <div>
                         <h3 className="text-xl font-bold text-gray-900 mb-4">About this resource</h3>
                         <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                           {resource.description}
                         </div>
                       </div>

                       {resource.whatItDoes && (
                         <div className="pt-8 border-t border-gray-100">
                           <h3 className="text-xl font-bold text-gray-900 mb-4">What it does</h3>
                           <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                             {resource.whatItDoes}
                           </div>
                         </div>
                       )}

                       {resource.outcome && (
                         <div className="pt-8 border-t border-gray-100">
                           <h3 className="text-xl font-bold text-gray-900 mb-4">Outcome Achieved</h3>
                           <div className="prose prose-gray max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                             {resource.outcome}
                           </div>
                         </div>
                       )}
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                       <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                         <Wrench className="w-5 h-5 text-gray-400" />
                         Tools Used
                       </h3>
                       <div className="flex flex-wrap gap-2">
                         {(resource.tools || []).map((tool, i) => (
                           <span key={i} className="px-3 py-1.5 bg-gray-50 border border-gray-100 text-gray-700 text-sm font-medium rounded-lg">
                             {tool}
                           </span>
                         ))}
                       </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
                       <h3 className="text-lg font-bold mb-2">Need help with this?</h3>
                       <p className="text-blue-100 text-sm mb-4">
                         Connect with the creator or join our Discord community for support.
                       </p>
                       <Link 
                         to="/community/discord"
                         className="inline-flex items-center justify-center w-full py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-sm font-semibold transition-all"
                       >
                         Join Community
                       </Link>
                    </div>
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </CommunityLayout>
  );
};

export default ResourceDetails;