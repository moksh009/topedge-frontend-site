import React, { useState, useEffect } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Loader2, Edit2, Globe, Mail, MapPin, Briefcase, User, 
  Building, Brain, Phone, Upload, Camera, Check, Sparkles, Linkedin, Github 
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '@/services/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { UserProfile } from '@/types/user';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

const PromoteProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userProfile, loading: authLoading, refreshProfile } = useAuth();
  
  // URL param '?edit=1' forces edit mode
  const [isEditing, setIsEditing] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('edit') === '1';
  });
  
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    fullName: '',
    photoURL: '',
    location: '',
    age: undefined,
    gender: '',
    buildingInAI: '',
    companyName: '',
    websiteURL: '',
    description: '',
    currentWork: '',
    aiSkills: [],
    workingStatus: '',
    networkingIntent: [],
    contactDetails: '',
    phoneNumber: ''
  });

  const [skillsInput, setSkillsInput] = useState('');

  // Auth Redirect
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/community/login');
    }
  }, [authLoading, user, navigate]);

  // Load Data
  useEffect(() => {
    const editParam = new URLSearchParams(location.search).get('edit') === '1';
    
    if (userProfile) {
      setFormData({
        ...userProfile,
        aiSkills: userProfile.aiSkills || []
      });
      setSkillsInput(userProfile.aiSkills?.join(', ') || '');
      // Only switch to view mode if not explicitly asked to edit
      if (editParam) setIsEditing(true); 
    } else if (user) {
      // New profile initialization
      setFormData(prev => ({
        ...prev,
        fullName: user.displayName || '',
        photoURL: user.photoURL || '',
        contactDetails: user.email || ''
      }));
      setIsEditing(true);
    }
  }, [userProfile, user, location.search]);

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const target = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: target.checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);

    try {
      const skills = skillsInput.split(',').map(s => s.trim()).filter(s => s);
      
      const profileData: UserProfile = {
        uid: user.uid,
        email: user.email || '',
        fullName: formData.fullName || '',
        photoURL: formData.photoURL || '',
        location: formData.location || '',
        age: formData.age ? Number(formData.age) : undefined,
        gender: formData.gender || '',
        buildingInAI: formData.buildingInAI || '',
        companyName: formData.companyName || '',
        websiteURL: formData.websiteURL || '',
        description: formData.description || '',
        currentWork: formData.currentWork || '',
        aiSkills: skills,
        workingStatus: formData.workingStatus || '',
        networkingIntent: formData.networkingIntent || [],
        contactDetails: formData.contactDetails || '',
        phoneNumber: formData.phoneNumber || '',
        createdAt: userProfile?.createdAt || serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await setDoc(doc(db, 'public_profiles', user.uid), profileData);
      await refreshProfile();
      toast.success('Profile saved successfully');
      
      // Turn off edit mode
      setIsEditing(false);
      navigate(`/community/profile/${user.uid}`, { replace: true });
      
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    
    try {
      setUploadingPhoto(true);
      // Simulating Cloudinary/Firebase choice logic for brevity
      const safeName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
      const fileRef = ref(storage, `profile_photos/${user.uid}/${safeName}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      
      setFormData(prev => ({ ...prev, photoURL: url }));
      toast.success('Photo updated');
    } catch (err) {
      toast.error('Upload failed');
    } finally {
      setUploadingPhoto(false);
    }
  };

  if (authLoading) return (
    <CommunityLayout>
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB]">
        <Loader2 className="w-8 h-8 animate-spin text-slate-900" />
      </div>
    </CommunityLayout>
  );

  // ==================== VIEW MODE ====================
  if (userProfile && !isEditing) {
    return (
      <CommunityLayout>
        <div className="min-h-screen bg-[#F8F9FB] pb-20">
          
          {/* Header Banner */}
          <div className="relative h-72 w-full overflow-hidden bg-slate-900">
             <div className="absolute inset-0 opacity-30" 
                  style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
             
             <div className="absolute top-6 left-6 z-10">
                <Link to="/community/profiles" className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium border border-white/10">
                    <ArrowLeft className="w-4 h-4" /> Back to Directory
                </Link>
             </div>
             
             <button 
                onClick={() => setIsEditing(true)}
                className="absolute top-6 right-6 z-10 flex items-center gap-2 bg-white text-slate-900 px-5 py-2.5 rounded-full text-sm font-bold shadow-xl hover:bg-slate-50 transition-all"
             >
                <Edit2 className="w-4 h-4" /> Edit Profile
             </button>
          </div>

          <div className="container mx-auto px-6 max-w-6xl -mt-24 relative z-20">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
               {/* Left Sidebar (Profile Card) */}
               <div className="lg:col-span-4 space-y-6">
                  <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm text-center relative overflow-hidden">
                     {/* Status Badge */}
                     {userProfile.workingStatus && (
                        <div className="inline-block mb-6 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100 uppercase tracking-wide">
                           {userProfile.workingStatus}
                        </div>
                     )}

                     {/* Avatar */}
                     <div className="relative mx-auto w-40 h-40 mb-6">
                        <div className="w-full h-full rounded-[2rem] bg-slate-100 p-1 border border-slate-200 overflow-hidden shadow-inner">
                           {userProfile.photoURL ? (
                              <img src={userProfile.photoURL} alt={userProfile.fullName} className="w-full h-full object-cover rounded-[1.8rem]" />
                           ) : (
                              <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-slate-300">
                                 {(userProfile.fullName || 'U')[0]}
                              </div>
                           )}
                        </div>
                     </div>

                     <h1 className="text-3xl font-bold text-slate-900 mb-2">{userProfile.fullName}</h1>
                     <p className="text-slate-500 font-medium mb-6">
                        {userProfile.currentWork || "Member"} 
                        {userProfile.companyName && <span className="text-slate-400"> at {userProfile.companyName}</span>}
                     </p>

                     <div className="flex flex-col gap-3 border-t border-slate-100 pt-6">
                        {userProfile.location && (
                           <div className="flex items-center justify-center gap-2 text-slate-600 text-sm">
                              <MapPin className="w-4 h-4 text-slate-400" /> {userProfile.location}
                           </div>
                        )}
                        {userProfile.websiteURL && (
                           <a href={userProfile.websiteURL} target="_blank" className="flex items-center justify-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                              <Globe className="w-4 h-4" /> Website
                           </a>
                        )}
                        <div className="flex justify-center gap-2 mt-2">
                           <button className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-colors">
                              <Github className="w-5 h-5" />
                           </button>
                           <button className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-[#0077b5] hover:text-white transition-colors">
                              <Linkedin className="w-5 h-5" />
                           </button>
                           <button className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-colors">
                              <Mail className="w-5 h-5" />
                           </button>
                        </div>
                     </div>
                  </div>

                  {/* Skills Card */}
                  <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
                     <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500" /> Tech Stack
                     </h3>
                     <div className="flex flex-wrap gap-2">
                        {userProfile.aiSkills?.map((skill, i) => (
                           <span key={i} className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 text-sm font-medium">
                              {skill}
                           </span>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Right Content Area */}
               <div className="lg:col-span-8 space-y-6">
                  {/* About Section */}
                  <div className="bg-white rounded-[2rem] border border-slate-200 p-8 md:p-10 shadow-sm min-h-[200px]">
                     <h2 className="text-2xl font-bold text-slate-900 mb-6">About</h2>
                     <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
                        {userProfile.description || "No bio added yet."}
                     </div>
                  </div>

                  {/* Building in AI Section */}
                  {userProfile.buildingInAI && (
                     <div className="relative bg-slate-900 rounded-[2rem] p-8 md:p-10 text-white overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                        
                        <h2 className="relative z-10 text-2xl font-bold mb-2 flex items-center gap-3">
                           <Brain className="w-6 h-6 text-indigo-400" />
                           Building in AI
                        </h2>
                        <p className="relative z-10 text-slate-300 mb-6 font-light">Current Project Focus</p>
                        
                        <div className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                           <p className="text-lg leading-relaxed text-slate-200">
                              {userProfile.buildingInAI}
                           </p>
                        </div>
                     </div>
                  )}

                  {/* Intent Tags */}
                  {userProfile.networkingIntent && userProfile.networkingIntent.length > 0 && (
                     <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Open to</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           {userProfile.networkingIntent.map((intent, i) => (
                              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                 <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-slate-200 shadow-sm">
                                    <Check className="w-4 h-4 text-emerald-500" />
                                 </div>
                                 <span className="font-medium text-slate-700">{intent}</span>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}
               </div>
            </motion.div>
          </div>
        </div>
      </CommunityLayout>
    );
  }

  // ==================== EDIT MODE ====================
  return (
    <CommunityLayout>
      <div className="min-h-screen bg-[#F8F9FB] py-16">
        <div className="container mx-auto px-4 max-w-4xl">
           
           <div className="flex items-center justify-between mb-10">
              <div>
                 <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Profile Settings</h1>
                 <p className="text-slate-500 mt-2">Manage your public presence and professional details.</p>
              </div>
              {userProfile && (
                 <button onClick={() => setIsEditing(false)} className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors">
                    Cancel
                 </button>
              )}
           </div>

           <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* SECTION 1: IDENTITY */}
              <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
                 <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-indigo-600" /> Identity
                 </h2>
                 
                 <div className="flex flex-col md:flex-row gap-8">
                    {/* Photo Uploader */}
                    <div className="flex-shrink-0">
                       <div className="group relative w-32 h-32 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 hover:border-indigo-500 transition-colors overflow-hidden">
                          {formData.photoURL ? (
                             <img src={formData.photoURL} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                             <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                                <Camera className="w-8 h-8 mb-1" />
                             </div>
                          )}
                          <label className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity font-medium text-xs">
                             {uploadingPhoto ? 'Uploading...' : 'Change Photo'}
                             <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                          </label>
                       </div>
                    </div>

                    <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700">Full Name</label>
                          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="e.g. Alex Chen" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700">Location</label>
                          <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="e.g. San Francisco, CA" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700">Gender</label>
                          <select name="gender" value={formData.gender || ''} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
                             <option value="">Select...</option>
                             <option value="Male">Male</option>
                             <option value="Female">Female</option>
                             <option value="Other">Other</option>
                             <option value="Prefer not to say">Prefer not to say</option>
                          </select>
                       </div>
                    </div>
                 </div>
              </div>

              {/* SECTION 2: WORK */}
              <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
                 <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-indigo-600" /> Professional Details
                 </h2>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                       <label className="text-sm font-semibold text-slate-700">Current Role</label>
                       <select name="currentWork" value={formData.currentWork || ''} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all">
                          <option value="">Select...</option>
                          <option value="Founder / Owner">Founder / Owner</option>
                          <option value="Engineer / Developer">Engineer / Developer</option>
                          <option value="Freelancer">Freelancer</option>
                          <option value="Student">Student</option>
                          <option value="Other">Other</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-semibold text-slate-700">Company Name</label>
                       <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" />
                    </div>
                 </div>

                 <div className="space-y-2 mb-6">
                    <label className="text-sm font-semibold text-slate-700">Bio / About Me</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none" placeholder="Tell the community about yourself..." />
                 </div>

                 <div className="space-y-2 mb-6">
                    <label className="text-sm font-semibold text-slate-700">What are you building in AI?</label>
                    <textarea name="buildingInAI" value={formData.buildingInAI} onChange={handleChange} rows={3} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all resize-none" placeholder="E.g. Building an agent for legal tech..." />
                 </div>

                 <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Skills (comma separated)</label>
                    <input type="text" value={skillsInput} onChange={(e) => setSkillsInput(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all" placeholder="Python, LangChain, React..." />
                 </div>
              </div>

              {/* SECTION 3: STATUS */}
              <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
                 <h2 className="text-xl font-bold text-slate-900 mb-6">Work Status & Intent</h2>
                 
                 <div className="space-y-6">
                    <div>
                       <label className="text-sm font-semibold text-slate-700 block mb-3">Current Status</label>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {['Full-time Business', 'Part-time Business', 'Full-time Freelancer', 'Open to Work'].map((status) => (
                             <div 
                                key={status} 
                                onClick={() => setFormData(p => ({...p, workingStatus: status}))}
                                className={cn(
                                   "cursor-pointer px-4 py-3 rounded-xl border text-sm font-medium transition-all flex items-center justify-between",
                                   formData.workingStatus === status 
                                      ? "bg-slate-900 text-white border-slate-900" 
                                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                                )}
                             >
                                {status}
                                {formData.workingStatus === status && <Check className="w-4 h-4" />}
                             </div>
                          ))}
                       </div>
                    </div>

                    <div>
                       <label className="text-sm font-semibold text-slate-700 block mb-3">Networking Goals</label>
                       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {['Seek Partnerships', 'Seek Clients', 'Seek Mentorship', 'Hire Talent', 'Invest'].map((intent) => {
                             const isSelected = formData.networkingIntent?.includes(intent);
                             return (
                                <div 
                                   key={intent} 
                                   onClick={() => {
                                      setFormData(prev => {
                                         const current = prev.networkingIntent || [];
                                         const next = isSelected ? current.filter(i => i !== intent) : [...current, intent];
                                         return { ...prev, networkingIntent: next };
                                      });
                                   }}
                                   className={cn(
                                      "cursor-pointer px-4 py-3 rounded-xl border text-sm font-medium transition-all flex items-center justify-between",
                                      isSelected 
                                         ? "bg-indigo-50 text-indigo-700 border-indigo-200" 
                                         : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                                   )}
                                >
                                   {intent}
                                   {isSelected && <Check className="w-4 h-4" />}
                                </div>
                             )
                          })}
                       </div>
                    </div>
                 </div>
              </div>

              {/* SECTION 4: CONTACT */}
              <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
                 <h2 className="text-xl font-bold text-slate-900 mb-6">Contact Links</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-sm font-semibold text-slate-700">Website URL</label>
                       <input type="url" name="websiteURL" value={formData.websiteURL} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none" placeholder="https://" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-semibold text-slate-700">Email Address</label>
                       <input type="email" name="contactDetails" value={formData.contactDetails} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                    </div>
                 </div>
              </div>

              <div className="flex justify-end pt-4">
                 <button 
                    type="submit" 
                    disabled={saving}
                    className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl shadow-xl shadow-slate-200 hover:bg-slate-800 hover:-translate-y-1 transition-all disabled:opacity-50 flex items-center gap-2"
                 >
                    {saving && <Loader2 className="w-5 h-5 animate-spin" />}
                    {saving ? 'Saving...' : 'Save Profile Changes'}
                 </button>
              </div>

           </form>
        </div>
      </div>
    </CommunityLayout>
  );
};

export default PromoteProfile;