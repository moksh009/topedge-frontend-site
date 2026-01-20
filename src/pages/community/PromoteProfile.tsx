import React, { useState, useEffect, useRef } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { 
  ArrowLeft, Loader2, Edit2, Globe, Phone, User, 
  Building, Camera, Check, Briefcase,
  Youtube, Instagram, Github, Linkedin, Mail
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { UserProfile } from '@/types/user';
import toast from 'react-hot-toast';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// --- CONFIGURATION ---
const CLOUD_NAME = "dn9gh1goq"; 
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "YOUR_UPLOAD_PRESET_HERE"; 

// --- COMPREHENSIVE COUNTRY CODES LIST ---
const countryCodes = [
  // --- AFRICA ---
  { code: "+234", label: "Nigeria (+234)" },
  { code: "+27", label: "South Africa (+27)" },
  { code: "+20", label: "Egypt (+20)" },
  { code: "+254", label: "Kenya (+254)" },
  { code: "+233", label: "Ghana (+233)" },
  { code: "+212", label: "Morocco (+212)" },
  { code: "+251", label: "Ethiopia (+251)" },
  { code: "+213", label: "Algeria (+213)" },
  { code: "+256", label: "Uganda (+256)" },
  { code: "+255", label: "Tanzania (+255)" },
  { code: "+221", label: "Senegal (+221)" },
  { code: "+250", label: "Rwanda (+250)" },
  { code: "+237", label: "Cameroon (+237)" },
  { code: "+225", label: "Ivory Coast (+225)" },
  { code: "+244", label: "Angola (+244)" },
  { code: "+260", label: "Zambia (+260)" },
  { code: "+263", label: "Zimbabwe (+263)" },
  { code: "+216", label: "Tunisia (+216)" },
  { code: "+241", label: "Gabon (+241)" },
  { code: "+220", label: "Gambia (+220)" },
  { code: "+232", label: "Sierra Leone (+232)" },
  { code: "+231", label: "Liberia (+231)" },
  { code: "+243", label: "DR Congo (+243)" },
  { code: "+242", label: "Congo Republic (+242)" },
  { code: "+230", label: "Mauritius (+230)" },
  { code: "+267", label: "Botswana (+267)" },
  { code: "+264", label: "Namibia (+264)" },
  
  // --- MAJOR GLOBAL ---
  { code: "+1", label: "US/Canada (+1)" },
  { code: "+44", label: "UK (+44)" },
  { code: "+91", label: "India (+91)" },
  { code: "+61", label: "Australia (+61)" },
  { code: "+971", label: "UAE (+971)" },
  { code: "+966", label: "Saudi Arabia (+966)" },
  { code: "+49", label: "Germany (+49)" },
  { code: "+33", label: "France (+33)" },
  { code: "+81", label: "Japan (+81)" },
  { code: "+86", label: "China (+86)" },
  { code: "+55", label: "Brazil (+55)" },
  { code: "+7", label: "Russia (+7)" },
  { code: "+39", label: "Italy (+39)" },
  { code: "+34", label: "Spain (+34)" },
  { code: "+31", label: "Netherlands (+31)" },
  { code: "+46", label: "Sweden (+46)" },
  { code: "+65", label: "Singapore (+65)" },
  { code: "+60", label: "Malaysia (+60)" },
  { code: "+62", label: "Indonesia (+62)" },
  { code: "+92", label: "Pakistan (+92)" },
  { code: "+880", label: "Bangladesh (+880)" },
  { code: "+90", label: "Turkey (+90)" },
  { code: "+1", label: "Other" }
];

const countries = [
  "Nigeria", "United States", "India", "United Kingdom", "Canada", "South Africa", "Kenya", "Ghana", "Australia", "Germany", "France", "UAE", "Saudi Arabia", "Japan", "Brazil", 
  "Egypt", "Ethiopia", "Morocco", "Algeria", "Uganda", "Tanzania", "Rwanda", "Senegal", "Cameroon", "Angola", "Zambia", "Zimbabwe",
  "China", "Russia", "Italy", "Spain", "Netherlands", "Sweden", "Singapore", "Malaysia", "Indonesia", "Pakistan", "Bangladesh", "Turkey"
].sort();

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
  const [isPhotoCropOpen, setIsPhotoCropOpen] = useState(false);
  const [photoCropImageSrc, setPhotoCropImageSrc] = useState<string | null>(null);
  const [photoCropZoom, setPhotoCropZoom] = useState(1);
  const [photoCropOffset, setPhotoCropOffset] = useState({ x: 0, y: 0 });
  const [isPhotoDragging, setIsPhotoDragging] = useState(false);
  const photoCropImageRef = useRef<HTMLImageElement | null>(null);
  const photoDragStartRef = useRef<{ x: number; y: number } | null>(null);

  // Phone State Management
  const [phoneCode, setPhoneCode] = useState("+234"); // Default to Nigeria
  const [phoneDigits, setPhoneDigits] = useState("");

  const [formData, setFormData] = useState<Partial<UserProfile> & { youtube?: string, instagram?: string }>({
    fullName: '',
    photoURL: '',
    bannerURL: '',
    location: '',
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
    phoneNumber: '',
    linkedin: '',
    github: '',
    youtube: '',
    instagram: ''
  });

  const [skillsInput, setSkillsInput] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  const clampProfileOffset = (next: { x: number; y: number }, zoom: number) => {
    const img = photoCropImageRef.current;
    if (!img) return next;
    const canvasSize = 288;
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
    if (!naturalWidth || !naturalHeight) return next;
    const baseScale = Math.max(canvasSize / naturalWidth, canvasSize / naturalHeight);
    const scale = baseScale * zoom;
    const scaledWidth = naturalWidth * scale;
    const scaledHeight = naturalHeight * scale;
    const maxX = Math.max(0, (scaledWidth - canvasSize) / 2);
    const maxY = Math.max(0, (scaledHeight - canvasSize) / 2);
    let x = next.x;
    let y = next.y;
    if (x > maxX) x = maxX;
    if (x < -maxX) x = -maxX;
    if (y > maxY) y = maxY;
    if (y < -maxY) y = -maxY;
    return { x, y };
  };

  const normalizeUrl = (value?: string) => {
    const v = (value || '').trim();
    if (!v) return '';
    if (/^https?:\/\//i.test(v)) return v;
    return `https://${v}`;
  };

  // Auth Redirect
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/community/login');
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    const loadProfile = async () => {
      const editParam = new URLSearchParams(location.search).get('edit') === '1';
      if (!user) return;

      try {
        const snap = await getDoc(doc(db, 'public_profiles', user.uid));
        const data = (snap.exists() ? snap.data() : userProfile) as any | null;

        if (data) {
          setFormData(prev => ({
            ...prev,
            ...data,
            aiSkills: data.aiSkills || [],
            location: data.location || '',
            youtube: data.youtube || '',
            instagram: data.instagram || '',
            contactDetails: data.contactDetails || user.email || ''
          }));
          setSkillsInput((data.aiSkills || []).join(', ') || '');

          if (data.phoneNumber) {
            const parts = String(data.phoneNumber).split(' ');
            if (parts.length === 2) {
              setPhoneCode(parts[0]);
              setPhoneDigits(parts[1]);
            } else {
              setPhoneDigits(String(data.phoneNumber).replace(/[^0-9]/g, ''));
            }
          }

          if (editParam) setIsEditing(true);
          return;
        }
      } catch (error) {
        console.error('Error loading profile for edit:', error);
      }

      if (user) {
        setFormData(prev => ({
          ...prev,
          fullName: user.displayName || '',
          photoURL: user.photoURL || '',
          contactDetails: user.email || ''
        }));
        setIsEditing(true);
      }
    };

    if (!authLoading) {
      loadProfile();
    }
  }, [authLoading, user, userProfile, location.search]);

  const buildProfilePayload = () => {
    if (!user) return null;
    const skills = skillsInput.split(',').map(s => s.trim()).filter(s => s);
    const finalPhoneNumber = phoneDigits ? `${phoneCode} ${phoneDigits}` : "";
    const profileData: UserProfile & { youtube?: string; instagram?: string } = {
      uid: user.uid,
      email: user.email || '',
      fullName: formData.fullName || '',
      photoURL: formData.photoURL || '',
      bannerURL: formData.bannerURL || undefined,
      location: formData.location || '',
      age: (formData as any).age ? Number((formData as any).age) : undefined,
      gender: formData.gender || '',
      buildingInAI: formData.buildingInAI || '',
      companyName: formData.companyName || '',
      websiteURL: normalizeUrl(formData.websiteURL),
      description: formData.description || '',
      currentWork: formData.currentWork || '',
      aiSkills: skills,
      workingStatus: formData.workingStatus || '',
      networkingIntent: formData.networkingIntent || [],
      contactDetails: formData.contactDetails || '',
      phoneNumber: finalPhoneNumber,
      createdAt: userProfile?.createdAt || serverTimestamp(),
      updatedAt: serverTimestamp(),
      linkedin: normalizeUrl(formData.linkedin) || undefined,
      github: normalizeUrl(formData.github) || undefined,
      youtube: normalizeUrl(formData.youtube) || undefined,
      instagram: normalizeUrl(formData.instagram) || undefined,
      bio: ''
    };
    const sanitized = Object.fromEntries(
      Object.entries(profileData).filter(([, v]) => v !== undefined)
    );
    return sanitized;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const target = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: target.checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
    setIsDirty(true);
  };

  // Strict Phone Handler
  const handlePhoneDigitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits, max 10
    if (/^\d{0,10}$/.test(value)) {
        setPhoneDigits(value);
        setIsDirty(true);
    }
  };

  useEffect(() => {
    if (!user || !isDirty) return;
    const timer = setTimeout(async () => {
      try {
        const payload = buildProfilePayload();
        if (!payload) return;
        await setDoc(doc(db, 'public_profiles', user.uid), payload, { merge: true });
      } catch (error) {
        console.error('Auto-save profile failed:', error);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [user, isDirty, formData, phoneDigits, phoneCode, skillsInput]);

  // --- CANCEL HANDLER (REDIRECTS TO PROFILE) ---
  const handleCancel = () => {
    if (userProfile && user?.uid) {
        // Redirect to their existing profile page
        navigate(`/community/profile/${user.uid}`);
    } else {
        // Redirect to directory if they are new
        navigate('/community/profiles');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // --- VALIDATION ---
    if (phoneDigits && phoneDigits.length !== 10) {
        toast.error("Phone number must be exactly 10 digits");
        return;
    }

    setSaving(true);

    try {
      const payload = buildProfilePayload();
      if (!payload) return;
      await setDoc(doc(db, 'public_profiles', user.uid), payload);
      await refreshProfile();
      toast.success('Profile saved successfully');
      setIsEditing(false);
      navigate(`/community/profile/${user.uid}`, { replace: true });
      
    } catch (error) {
      console.error("Error saving profile:", error);
      const msg = (error as any)?.message || 'Failed to save profile';
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  // --- CLOUDINARY HANDLERS ---
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    const src = URL.createObjectURL(file);
    setPhotoCropImageSrc(src);
    setIsPhotoCropOpen(true);
    setPhotoCropZoom(1);
    setPhotoCropOffset({ x: 0, y: 0 });
    if (e.target) e.target.value = '';
  };

  const handlePhotoCropPointerDown = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    e.preventDefault();
    setIsPhotoDragging(true);
    const point = 'touches' in e ? e.touches[0] : (e as React.MouseEvent);
    photoDragStartRef.current = { x: point.clientX, y: point.clientY };
  };

  const handlePhotoCropPointerMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    if (!isPhotoDragging || !photoDragStartRef.current) return;
    const point = 'touches' in e ? e.touches[0] : (e as React.MouseEvent);
    const dx = point.clientX - photoDragStartRef.current.x;
    const dy = point.clientY - photoDragStartRef.current.y;
    photoDragStartRef.current = { x: point.clientX, y: point.clientY };
    setPhotoCropOffset(prev =>
      clampProfileOffset({ x: prev.x + dx, y: prev.y + dy }, photoCropZoom)
    );
  };

  const handlePhotoCropPointerUp = () => {
    setIsPhotoDragging(false);
    photoDragStartRef.current = null;
  };

  const handlePhotoCropSave = () => {
    if (!photoCropImageSrc || !user) return;
    const img = photoCropImageRef.current;
    if (!img) return;
    const previewSize = 288;
    const outputSize = 512;
    const canvas = document.createElement('canvas');
    canvas.width = outputSize;
    canvas.height = outputSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
    if (!naturalWidth || !naturalHeight) return;
    const baseScalePreview = Math.max(previewSize / naturalWidth, previewSize / naturalHeight);
    const scale = baseScalePreview * photoCropZoom * (outputSize / previewSize);
    const offsetNormX = photoCropOffset.x / previewSize;
    const offsetNormY = photoCropOffset.y / previewSize;
    ctx.clearRect(0, 0, outputSize, outputSize);
    ctx.save();
    ctx.translate(outputSize / 2 + offsetNormX * outputSize, outputSize / 2 + offsetNormY * outputSize);
    ctx.scale(scale, scale);
    ctx.drawImage(img, -naturalWidth / 2, -naturalHeight / 2);
    ctx.restore();
    canvas.toBlob(
      blob => {
        if (!blob) {
          toast.error("Failed to process image");
          return;
        }
        if (!UPLOAD_PRESET) {
          toast.error("Upload config missing");
          return;
        }
        setUploadingPhoto(true);
        const data = new FormData();
        data.append("file", blob, "profile-photo.jpg");
        data.append("upload_preset", UPLOAD_PRESET);
        data.append("cloud_name", CLOUD_NAME);
        (async () => {
          try {
            const response = await fetch(
              `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
              { method: "POST", body: data }
            );
            const result = await response.json();
            if (result.secure_url) {
              setFormData(prev => ({ ...prev, photoURL: result.secure_url }));
              toast.success("Photo uploaded");
            } else {
              toast.error("Failed to upload photo");
            }
          } catch (err) {
            toast.error("Failed to upload photo");
          } finally {
            setUploadingPhoto(false);
            setIsPhotoCropOpen(false);
            setPhotoCropImageSrc(null);
            setPhotoCropZoom(1);
            setPhotoCropOffset({ x: 0, y: 0 });
            setIsPhotoDragging(false);
            photoDragStartRef.current = null;
          }
        })();
      },
      'image/jpeg',
      0.9
    );
  };

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (!UPLOAD_PRESET) { toast.error("Upload config missing"); return; }
    try {
      setUploadingPhoto(true);
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", UPLOAD_PRESET); 
      data.append("cloud_name", CLOUD_NAME);
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: "POST", body: data });
      const result = await response.json();
      if (result.secure_url) {
        setFormData(prev => ({ ...prev, bannerURL: result.secure_url }));
        toast.success('Banner uploaded');
      }
    } catch (err) { toast.error('Failed to upload banner'); } finally { setUploadingPhoto(false); }
  };

  if (authLoading) return <CommunityLayout><div className="min-h-screen flex items-center justify-center bg-[#F8F9FB]"><Loader2 className="w-8 h-8 animate-spin text-slate-900" /></div></CommunityLayout>;

  // EDIT MODE
  return (
    <CommunityLayout>
      <div className="min-h-screen bg-[#F8F9FB] py-16">
        <div className="container mx-auto px-4 max-w-4xl">
           <div className="flex items-center justify-between mb-10">
              <div>
                 <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Profile Settings</h1>
                 <p className="text-slate-500 mt-2">Manage your public presence and professional details.</p>
              </div>
              
              {/* --- CANCEL BUTTON FIXED --- */}
              <button 
                onClick={handleCancel} 
                className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
              >
                 Cancel
              </button>
           </div>

          <form onSubmit={handleSubmit} className="space-y-8">
              {/* 1. Banner Section */}
              <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
                 <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Camera className="w-5 h-5 text-indigo-600" /> Profile Banner (Optional)
                 </h2>
                 <div className="group relative w-full h-40 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 hover:border-indigo-500 transition-colors overflow-hidden">
                    {formData.bannerURL ? (
                       <img src={formData.bannerURL} alt="Banner Preview" className="w-full h-full object-cover" />
                    ) : (
                       <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                          <Camera className="w-8 h-8 mb-1" />
                          <span className="text-sm font-medium">Upload a wide banner image</span>
                       </div>
                    )}
                    <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity font-medium text-xs">
                       {uploadingPhoto ? 'Uploading...' : 'Change Banner'}
                       <input type="file" accept="image/*" onChange={handleBannerUpload} className="hidden" />
                    </label>
                 </div>
              </div>

              {/* 2. Identity Section */}
              <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
                 <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-indigo-600" /> Identity & Info
                 </h2>
                 
                 <div className="flex flex-col md:flex-row gap-8 mb-8 border-b border-slate-100 pb-8 items-center md:items-start">
                    <div className="flex-shrink-0 mx-auto md:mx-0">
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
                       
                       {/* Phone Number Field */}
                       <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700">Phone (Digits only)</label>
                          <div className="flex gap-1">
                             {/* Country Code Select */}
                             <select 
                                value={phoneCode} 
                                onChange={(e) => setPhoneCode(e.target.value)} 
                                className="w-[120px] px-2 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all text-sm"
                             >
                                {countryCodes.map((c) => (
                                   <option key={c.label} value={c.code}>{c.label}</option>
                                ))}
                             </select>
                             {/* Number Input */}
                             <input 
                                type="text" 
                                value={phoneDigits} 
                                onChange={handlePhoneDigitChange} 
                                className="w-[180px] px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none" 
                                placeholder="9876543210" 
                                inputMode="numeric"
                             />
                          </div>
                          {phoneDigits.length > 0 && phoneDigits.length < 10 && (
                             <p className="text-xs text-red-500">Must be exactly 10 digits</p>
                          )}
                       </div>
                    </div>
                 </div>

                 {/* Socials & Contact */}
                 <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Social & Contact Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2"><Youtube className="w-4 h-4 text-red-500"/> YouTube URL</label>
                            <input type="text" name="youtube" value={formData.youtube || ''} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none" placeholder="https://youtube.com/@... or youtube.com/@..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2"><Instagram className="w-4 h-4 text-pink-500"/> Instagram URL</label>
                            <input type="text" name="instagram" value={formData.instagram || ''} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none" placeholder="https://instagram.com/... or instagram.com/..." />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2"><Mail className="w-4 h-4 text-slate-500"/> Email Address</label>
                            <input type="email" name="contactDetails" value={formData.contactDetails} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2"><Github className="w-4 h-4 text-slate-900"/> GitHub URL</label>
                            <input type="text" name="github" value={(formData as any).github || ''} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none" placeholder="https://github.com/... or github.com/..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2"><Linkedin className="w-4 h-4 text-blue-600"/> LinkedIn URL</label>
                            <input type="text" name="linkedin" value={(formData as any).linkedin || ''} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none" placeholder="https://linkedin.com/in/... or linkedin.com/in/..." />
                        </div>
                    </div>
                 </div>
              </div>

              {/* 3. Professional Section */}
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
                    <div className="space-y-2 md:col-span-2">
                       <label className="text-sm font-semibold text-slate-700 flex items-center gap-2"><Globe className="w-4 h-4 text-indigo-500"/> Website URL</label>
                       <input type="text" name="websiteURL" value={formData.websiteURL} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none" placeholder="https://mywebsite.com or mywebsite.com" />
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

              {/* 4. Status Section */}
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

              <div className="flex justify-center md:justify-end pt-4">
                 <button type="submit" disabled={saving} className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl shadow-xl shadow-slate-200 hover:bg-slate-800 hover:-translate-y-1 transition-all disabled:opacity-50 flex items-center gap-2">
                    {saving && <Loader2 className="w-5 h-5 animate-spin" />}
                    {saving ? 'Saving...' : 'Save Profile Changes'}
                 </button>
              </div>
           </form>
        </div>
      </div>
      <AnimatePresence>
        {isPhotoCropOpen && photoCropImageSrc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => !uploadingPhoto && setIsPhotoCropOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 z-10"
            >
              <h2 className="text-lg font-bold text-slate-900 mb-2">Adjust profile photo</h2>
              <p className="text-sm text-slate-500 mb-4">
                Drag to reposition and use the slider to zoom.
              </p>
              <div
                className="mx-auto mb-4 w-72 h-72 rounded-2xl bg-slate-900 overflow-hidden relative touch-none"
                onMouseDown={handlePhotoCropPointerDown}
                onMouseMove={handlePhotoCropPointerMove}
                onMouseUp={handlePhotoCropPointerUp}
                onMouseLeave={handlePhotoCropPointerUp}
                onTouchStart={handlePhotoCropPointerDown}
                onTouchMove={handlePhotoCropPointerMove}
                onTouchEnd={handlePhotoCropPointerUp}
              >
                {photoCropImageSrc && (
                  <img
                    ref={photoCropImageRef}
                    src={photoCropImageSrc}
                    alt="Crop"
                    crossOrigin="anonymous"
                    className="absolute inset-0 m-auto select-none max-w-none"
                    style={{
                      transform: `translate3d(${photoCropOffset.x}px, ${photoCropOffset.y}px, 0) scale(${photoCropZoom})`,
                      transformOrigin: 'center center'
                    }}
                    draggable={false}
                  />
                )}
              </div>
              <div className="mb-6">
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.05}
                  value={photoCropZoom}
                  onChange={e => {
                    const z = parseFloat(e.target.value);
                    setPhotoCropZoom(z);
                    setPhotoCropOffset(prev => clampProfileOffset(prev, z));
                  }}
                  className="w-full accent-slate-900"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPhotoCropOpen(false)}
                  disabled={uploadingPhoto}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handlePhotoCropSave}
                  disabled={uploadingPhoto}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-sm font-bold text-white hover:bg-slate-800 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {uploadingPhoto ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                  Save
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </CommunityLayout>
  );
};

export default PromoteProfile;
