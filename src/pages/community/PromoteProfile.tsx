import React, { useState, useEffect } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Loader2, Edit2, Globe, Phone, User, 
  Building, Brain, Camera, Check, Sparkles, Share2, MapPin, Briefcase
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/services/firebase'; // Removed storage import
import { useAuth } from '@/contexts/AuthContext';
import { UserProfile } from '@/types/user';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';

// --- CONFIGURATION ---
// If you are using Create React App, change import.meta.env to process.env
const CLOUD_NAME = "dn9gh1goq"; 
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "YOUR_UPLOAD_PRESET_HERE"; 

const countries = [
  "United States", "India", "United Kingdom", "Canada", "Australia", "Germany", "France", "Japan", "Brazil", 
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
  "Cambodia", "Cameroon", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia",
  "Fiji", "Finland",
  "Gabon", "Gambia", "Georgia", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guyana",
  "Haiti", "Honduras", "Hungary",
  "Iceland", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy",
  "Jamaica", "Jordan",
  "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
  "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
  "Oman",
  "Pakistan", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar",
  "Romania", "Russia", "Rwanda",
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Somalia", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sudan", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tunisia", "Turkey", "Turkmenistan",
  "Uganda", "Ukraine", "United Arab Emirates", "Uruguay", "Uzbekistan",
  "Venezuela", "Vietnam",
  "Yemen", "Zambia", "Zimbabwe"
];

const PromoteProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userProfile, loading: authLoading, refreshProfile } = useAuth();
  
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
        aiSkills: userProfile.aiSkills || [],
        phoneNumber: userProfile.phoneNumber || '',
        location: userProfile.location || ''
      });
      setSkillsInput(userProfile.aiSkills?.join(', ') || '');
      if (editParam) setIsEditing(true); 
    } else if (user) {
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
      setIsEditing(false);
      navigate(`/community/profile/${user.uid}`, { replace: true });
      
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  // --- CLOUDINARY UPLOAD FUNCTION ---
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate Preset Exists
    if (!UPLOAD_PRESET || UPLOAD_PRESET === "YOUR_UPLOAD_PRESET_HERE") {
        toast.error("Upload preset is missing in .env config");
        console.error("Missing VITE_CLOUDINARY_UPLOAD_PRESET");
        return;
    }

    try {
      setUploadingPhoto(true);
      
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", UPLOAD_PRESET); 
      data.append("cloud_name", CLOUD_NAME);
      // Optional: Add folder organization
      data.append("folder", "user_profiles"); 

      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: data
      });

      const result = await response.json();

      if (result.secure_url) {
        setFormData(prev => ({ ...prev, photoURL: result.secure_url }));
        toast.success('Photo uploaded successfully');
      } else {
        throw new Error(result.error?.message || "Upload failed");
      }

    } catch (err) {
      console.error("Cloudinary upload error:", err);
      toast.error('Failed to upload photo');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const copyProfileLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast.success('Profile link copied!');
  };

  if (authLoading) return (
    <CommunityLayout>
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB]">
        <Loader2 className="w-8 h-8 animate-spin text-slate-900" />
      </div>
    </CommunityLayout>
  );

  // ==================== VIEW MODE (PREMIUM UI) ====================
  if (userProfile && !isEditing) {
    return (
      <CommunityLayout>
        <div className="min-h-screen bg-slate-50/50 pb-20 font-sans selection:bg-indigo-500 selection:text-white">
          
          {/* --- HERO COVER --- */}
          <div className="relative h-80 w-full overflow-hidden">
             {/* Abstract Gradient Mesh */}
             <div className="absolute inset-0 bg-slate-900">
               <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black opacity-80"></div>
               <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[200%] bg-indigo-500/20 blur-[100px] rounded-full mix-blend-screen animate-pulse"></div>
               <div className="absolute top-[20%] right-[-10%] w-[60%] h-[150%] bg-blue-500/10 blur-[120px] rounded-full mix-blend-screen"></div>
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
             </div>

             {/* Navigation */}
             <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-10">
                <Link to="/community/profiles" className="flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-md border border-white/10 rounded-full text-white/90 text-sm font-medium hover:bg-black/40 transition-all">
                    <ArrowLeft className="w-4 h-4" /> <span className="hidden sm:inline">Directory</span>
                </Link>
                <div className="flex gap-3">
                   <button onClick={copyProfileLink} className="p-2 bg-black/20 backdrop-blur-md border border-white/10 rounded-full text-white/90 hover:bg-white hover:text-black transition-all">
                      <Share2 className="w-4 h-4" />
                   </button>
                   {user?.uid === userProfile.uid && (
                      <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-5 py-2 bg-white text-slate-900 rounded-full text-sm font-bold shadow-lg hover:scale-105 transition-transform">
                          <Edit2 className="w-3.5 h-3.5" /> Edit Profile
                      </button>
                   )}
                </div>
             </div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-20 -mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
               
               {/* --- LEFT COLUMN: PROFILE CARD --- */}
               <div className="lg:col-span-4">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] relative overflow-hidden"
                  >
                     {/* Status Pill */}
                     {userProfile.workingStatus && (
                        <div className="absolute top-6 right-6">
                           <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                              {userProfile.workingStatus}
                           </span>
                        </div>
                     )}

                     {/* Avatar */}
                     <div className="mb-6 relative inline-block">
                        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-[2rem] p-1.5 bg-white border border-slate-100 shadow-xl shadow-slate-200/50">
                           {userProfile.photoURL ? (
                              <img src={userProfile.photoURL} alt={userProfile.fullName} className="w-full h-full object-cover rounded-[1.6rem] bg-slate-100" />
                           ) : (
                              <div className="w-full h-full flex items-center justify-center bg-slate-50 rounded-[1.6rem] text-slate-300">
                                 <User className="w-12 h-12" />
                              </div>
                           )}
                        </div>
                     </div>

                     {/* Identity */}
                     <div className="mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight capitalize mb-2">
                           {userProfile.fullName}
                        </h1>
                        <p className="text-lg text-slate-500 font-medium">
                           {userProfile.currentWork || "Member"}
                        </p>
                        {userProfile.companyName && (
                           <div className="flex items-center gap-2 text-slate-400 font-medium text-sm mt-1">
                              <Building className="w-3.5 h-3.5" />
                              {userProfile.companyName}
                           </div>
                        )}
                     </div>

                     {/* Meta Info */}
                     <div className="space-y-4 pt-6 border-t border-slate-100">
                        {userProfile.location && (
                           <div className="flex items-center gap-3 text-slate-600">
                              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                 <MapPin className="w-4 h-4" />
                              </div>
                              <span className="text-sm font-medium">{userProfile.location}</span>
                           </div>
                        )}
                        {userProfile.websiteURL && (
                           <a href={userProfile.websiteURL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-600 group hover:text-blue-600 transition-colors">
                              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                                 <Globe className="w-4 h-4" />
                              </div>
                              <span className="text-sm font-medium truncate underline decoration-slate-200 underline-offset-4 group-hover:decoration-blue-200">
                                 {userProfile.websiteURL.replace(/^https?:\/\//, '')}
                              </span>
                           </a>
                        )}
                        {userProfile.phoneNumber && (
                           <div className="flex items-center gap-3 text-slate-600">
                              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                                 <Phone className="w-4 h-4" />
                              </div>
                              <span className="text-sm font-medium">{userProfile.phoneNumber}</span>
                           </div>
                        )}
                     </div>

                     {/* Action Buttons */}
                     <div className="mt-8 grid grid-cols-2 gap-3">
                        <button 
                           onClick={() => window.location.href = `mailto:${userProfile.email}`}
                           className="col-span-2 py-3.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 hover:-translate-y-0.5 transition-all shadow-lg shadow-slate-900/20"
                        >
                           Contact Me
                        </button>
                     </div>
                  </motion.div>
               </div>

               {/* --- RIGHT COLUMN: BENTO GRID --- */}
               <div className="lg:col-span-8 space-y-6">
                  
                  {/* ABOUT CARD */}
                  <motion.div 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.1 }}
                     className="bg-white rounded-[2.5rem] border border-slate-200 p-8 sm:p-10 shadow-sm"
                  >
                     <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                           <User className="w-5 h-5" />
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">About</h2>
                     </div>
                     <p className="text-slate-600 text-lg leading-relaxed whitespace-pre-wrap">
                        {userProfile.description || "No bio available."}
                     </p>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     
                     {/* BUILDING IN AI CARD (Dark Theme) */}
                     {userProfile.buildingInAI && (
                        <motion.div 
                           initial={{ opacity: 0, scale: 0.95 }}
                           animate={{ opacity: 1, scale: 1 }}
                           transition={{ delay: 0.2 }}
                           className="relative bg-slate-900 rounded-[2.5rem] p-8 text-white overflow-hidden flex flex-col justify-between min-h-[280px]"
                        >
                           {/* Decorative Glows */}
                           <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-[60px]"></div>
                           <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/20 rounded-full blur-[60px]"></div>
                           
                           <div className="relative z-10">
                              <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider mb-4">
                                 <Brain className="w-4 h-4" />
                                 Current Focus
                              </div>
                              <h3 className="text-2xl font-bold mb-4 leading-tight">Building in AI</h3>
                              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-slate-200 text-sm leading-relaxed">
                                 {userProfile.buildingInAI}
                              </div>
                           </div>
                           
                           <div className="relative z-10 mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                              <span className="text-xs font-medium text-slate-400">Ask me about this</span>
                              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                 <ArrowLeft className="w-4 h-4 rotate-[135deg]" />
                              </div>
                           </div>
                        </motion.div>
                     )}

                     {/* TECH STACK CARD */}
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-[2.5rem] border border-slate-200 p-8 flex flex-col"
                     >
                        <div className="flex items-center gap-3 mb-6">
                           <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                              <Sparkles className="w-5 h-5" />
                           </div>
                           <h2 className="text-xl font-bold text-slate-900">Tech Stack</h2>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 content-start">
                           {userProfile.aiSkills && userProfile.aiSkills.length > 0 ? (
                              userProfile.aiSkills.map((skill, i) => (
                                 <span key={i} className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-100 transition-colors cursor-default">
                                    {skill}
                                 </span>
                              ))
                           ) : (
                              <span className="text-slate-400 italic text-sm">No skills listed yet.</span>
                           )}
                        </div>
                     </motion.div>
                  </div>

                  {/* INTENT TAGS */}
                  {userProfile.networkingIntent && userProfile.networkingIntent.length > 0 && (
                     <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-[2.5rem] border border-slate-200 p-8"
                     >
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Open to</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           {userProfile.networkingIntent.map((intent, i) => (
                              <div key={i} className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 hover:bg-white hover:shadow-sm transition-all">
                                 <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center border border-slate-100 text-emerald-500 shadow-sm group-hover:scale-110 transition-transform">
                                    <Check className="w-5 h-5" />
                                 </div>
                                 <span className="font-bold text-slate-700">{intent}</span>
                              </div>
                           ))}
                        </div>
                     </motion.div>
                  )}

               </div>
            </div>
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
              {/* Identity Section */}
              <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
                 <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-indigo-600" /> Identity
                 </h2>
                 <div className="flex flex-col md:flex-row gap-8">
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
                          <select name="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all appearance-none">
                             <option value="">Select Country</option>
                             {countries.map((c) => (
                               <option key={c} value={c}>{c}</option>
                             ))}
                          </select>
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

              {/* Professional Section */}
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

              {/* Status Section */}
              <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
                 <h2 className="text-xl font-bold text-slate-900 mb-6">Work Status & Intent</h2>
                 <div className="space-y-6">
                    <div>
                       <label className="text-sm font-semibold text-slate-700 block mb-3">Current Status</label>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {['Full-time Business', 'Part-time Business', 'Full-time Freelancer', 'Open to Work'].map((status) => (
                             <div key={status} onClick={() => setFormData(p => ({...p, workingStatus: status}))} className={cn("cursor-pointer px-4 py-3 rounded-xl border text-sm font-medium transition-all flex items-center justify-between", formData.workingStatus === status ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300")}>
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
                                <div key={intent} onClick={() => { setFormData(prev => { const current = prev.networkingIntent || []; const next = isSelected ? current.filter(i => i !== intent) : [...current, intent]; return { ...prev, networkingIntent: next }; }); }} className={cn("cursor-pointer px-4 py-3 rounded-xl border text-sm font-medium transition-all flex items-center justify-between", isSelected ? "bg-indigo-50 text-indigo-700 border-indigo-200" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300")}>
                                   {intent}
                                   {isSelected && <Check className="w-4 h-4" />}
                                </div>
                             )
                          })}
                       </div>
                    </div>
                 </div>
              </div>

              {/* Contact Section */}
              <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
                 <h2 className="text-xl font-bold text-slate-900 mb-6">Contact Links</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-sm font-semibold text-slate-700">Website URL (Optional)</label>
                       <input type="url" name="websiteURL" value={formData.websiteURL} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none" placeholder="https://" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-semibold text-slate-700">Phone (Optional)</label>
                       <input type="tel" name="phoneNumber" value={formData.phoneNumber || ''} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none" placeholder="+1 234 567 8900" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                       <label className="text-sm font-semibold text-slate-700">Email Address</label>
                       <input type="email" name="contactDetails" value={formData.contactDetails} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                    </div>
                 </div>
              </div>

              <div className="flex justify-end pt-4">
                 <button type="submit" disabled={saving} className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl shadow-xl shadow-slate-200 hover:bg-slate-800 hover:-translate-y-1 transition-all disabled:opacity-50 flex items-center gap-2">
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