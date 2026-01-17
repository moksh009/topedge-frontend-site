import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import CommunitySEO from '@/components/community/CommunitySEO';
import { motion, AnimatePresence } from 'framer-motion';
import { doc, getDoc, collection, query, where, getDocs, orderBy, deleteDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { UserProfile } from '@/types/user';
import { 
  ArrowLeft, Loader2, Edit2, Globe, Mail, MapPin, Briefcase, 
  User, Building2, Brain, Phone, Calendar, 
  Linkedin, Github, Zap, CheckCircle2, Youtube, Instagram, Trash2
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { isAdminEmail } from '@/utils/admin';
import toast from 'react-hot-toast';

interface Resource {
  id: string;
  title: string;
  description: string;
  isPaid: boolean;
  price?: number;
  tools: string[];
  category: 'automation' | 'project' | 'tool' | 'prompt';
}

const ProfileDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, 'public_profiles', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
          
          const q = query(
            collection(db, 'community_resources'),
            where('userId', '==', id),
            orderBy('createdAt', 'desc')
          );
          const resourceSnap = await getDocs(q);
          setResources(resourceSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Resource[]);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <CommunityLayout>
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
          <Loader2 className="w-10 h-10 animate-spin text-slate-900" />
        </div>
      </CommunityLayout>
    );
  }

  if (!profile) {
    return (
      <CommunityLayout>
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-[#FAFAFA]">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <User className="w-10 h-10 text-slate-400" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Profile Not Found</h1>
          <p className="text-slate-500 mb-8 max-w-md">The builder you are looking for has either moved or does not exist in our directory.</p>
          <Link to="/community/profiles" className="px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors">
            Back to Directory
          </Link>
        </div>
      </CommunityLayout>
    );
  }

  const isOwner = user?.uid === profile.uid;
  const isAdmin = isAdminEmail(user?.email);
  const canEdit = isOwner || isAdmin;
  const [showDeleteProfile, setShowDeleteProfile] = useState(false);
  const [deletingProfile, setDeletingProfile] = useState(false);

  const handleDeleteProfile = async () => {
    if (!id || !user || !isAdmin || deletingProfile) return;
    setDeletingProfile(true);
    try {
      await deleteDoc(doc(db, 'public_profiles', id));
      toast.success('Profile deleted');
      navigate('/community/profiles');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete profile');
    } finally {
      setDeletingProfile(false);
      setShowDeleteProfile(false);
    }
  };

  const containerVars = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <CommunityLayout>
      <CommunitySEO 
        title={`${profile.fullName} - AI Builder Profile | TopEdge AI`}
        description={profile.bio || `Connect with ${profile.fullName}, ${profile.currentWork} at TopEdge AI Community.`}
        image={profile.photoURL}
        url={`/community/profile/${id}`}
        type="profile"
      />
      {/* CLEAN BACKGROUND: No gradients, just crisp white/gray */}
      <div className="min-h-screen bg-[#FAFAFA] font-sans selection:bg-slate-900 selection:text-white pb-24">
        
        <div className="container relative z-10 mx-auto px-4 sm:px-6 max-w-6xl pt-6">
          
          <div className="flex justify-between items-center mb-8">
            <Link to="/community/profiles" className="group flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-600 text-sm font-medium hover:bg-slate-50 hover:border-slate-300 transition-all">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">Back to Directory</span>
                <span className="sm:hidden">Back</span>
            </Link>

            <div className="flex items-center gap-3">
              {canEdit && (
                <Link to="/community/promote-profile?edit=1" className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white rounded-full text-sm font-bold shadow-lg shadow-slate-900/10 hover:scale-105 transition-transform">
                  <Edit2 className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Edit Profile</span><span className="sm:hidden">Edit</span>
                </Link>
              )}
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => setShowDeleteProfile(true)}
                  className="px-4 py-2 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold hover:bg-red-100 transition-colors"
                >
                  Delete Profile
                </button>
              )}
            </div>
          </div>

          <motion.div 
            variants={containerVars}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            
            {/* ================= LEFT COLUMN ================= */}
            <div className="lg:col-span-8 space-y-6">
                
                {/* 1. HERO IDENTITY CARD - MOBILE OPTIMIZED */}
                <motion.div variants={itemVars} className="relative bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-200 shadow-sm overflow-hidden">
                    {/* Header Decoration (Subtle Grey) */}
                    <div className="absolute top-0 left-0 w-full h-24 sm:h-32 bg-slate-50 border-b border-slate-100"></div>
                    
                    {/* Content */}
                    <div className="relative flex flex-col sm:flex-row gap-6 items-center sm:items-start pt-8 sm:pt-12 text-center sm:text-left">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                             <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-[2rem] p-1.5 bg-white shadow-xl">
                                {profile.photoURL ? (
                                    <img src={profile.photoURL} alt={profile.fullName} className="w-full h-full object-cover rounded-[1.6rem] bg-slate-100" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-50 rounded-[1.6rem] text-slate-300">
                                        <User className="w-12 h-12" />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Text Info */}
                        <div className="flex-1 pt-2 sm:pt-8 w-full">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mb-2 justify-center sm:justify-start">
                                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">{profile.fullName}</h1>
                                {profile.workingStatus && (
                                    <span className={cn(
                                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border",
                                        profile.workingStatus === "Open to Work" 
                                            ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                                            : "bg-slate-100 text-slate-600 border-slate-200"
                                    )}>
                                        {profile.workingStatus}
                                    </span>
                                )}
                            </div>
                            
                            <p className="text-lg text-slate-500 font-medium mb-5 flex flex-wrap justify-center sm:justify-start items-center gap-2">
                                {profile.currentWork}
                                {profile.companyName && (
                                    <>
                                        <span className="hidden sm:inline w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                        <span className="text-slate-400 flex items-center gap-1">
                                            <Building2 className="w-4 h-4" /> {profile.companyName}
                                        </span>
                                    </>
                                )}
                            </p>

                            <div className="flex flex-wrap justify-center sm:justify-start gap-3 text-sm text-slate-500 font-medium">
                                {profile.location && (
                                    <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg">
                                        <MapPin className="w-3.5 h-3.5" /> {profile.location}
                                    </div>
                                )}
                                {profile.websiteURL && (
                                    <a href={profile.websiteURL} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-900 transition-colors">
                                        <Globe className="w-3.5 h-3.5" /> Website
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 2. CURRENT FOCUS CARD */}
                {profile.buildingInAI && (
                    <motion.div variants={itemVars} className="relative overflow-hidden bg-[#0F172A] rounded-[2rem] p-8 text-white shadow-xl shadow-slate-200">
                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-500"></div>
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/10 rounded-lg backdrop-blur-md text-indigo-300">
                                        <Brain className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Building Now</h3>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-[10px] font-bold text-indigo-200 uppercase tracking-wide">
                                    <span className="relative flex h-2 w-2">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                                    </span>
                                    Active
                                </div>
                            </div>
                            <p className="text-white/90 text-lg sm:text-xl leading-relaxed font-light border-l-2 border-white/10 pl-4 ml-1">
                                "{profile.buildingInAI}"
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* 3. ABOUT SECTION */}
                {profile.description && (
                    <motion.div variants={itemVars} className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">About</h3>
                        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
                            {profile.description}
                        </div>
                    </motion.div>
                )}

                {/* 4. RESOURCES GRID */}
                {resources.length > 0 && (
                    <motion.div variants={itemVars}>
                        <div className="flex items-center justify-between mb-6 mt-8 px-2">
                            <h3 className="text-lg font-bold text-slate-900">Published Resources</h3>
                            <span className="px-2 py-1 bg-slate-100 rounded-md text-xs font-bold text-slate-500">{resources.length}</span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {resources.map((resource) => (
                                <Link 
                                    key={resource.id}
                                    to={`/community/resource/${resource.id}`}
                                    className="group bg-white border border-slate-200 rounded-[1.5rem] p-6 hover:border-slate-300 hover:shadow-md transition-all duration-300"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-2.5 rounded-xl bg-slate-50 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                            <Zap className="w-5 h-5" />
                                        </div>
                                        <span className={cn(
                                            "px-3 py-1 rounded-full text-xs font-bold border",
                                            resource.isPaid ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-slate-50 text-slate-600 border-slate-100"
                                        )}>
                                            {resource.isPaid ? `$${resource.price}` : 'Free'}
                                        </span>
                                    </div>
                                    <h4 className="font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">{resource.title}</h4>
                                    <p className="text-sm text-slate-500 line-clamp-2 mb-4">{resource.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {resource.tools.slice(0, 2).map((tool, i) => (
                                            <span key={i} className="px-2 py-1 bg-slate-50 rounded-md text-[10px] font-bold text-slate-500 uppercase">
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* ================= RIGHT COLUMN ================= */}
            <div className="lg:col-span-4 space-y-6">
                
                {/* 1. CONTACT CARD - UPDATED WITH SOCIALS */}
                <motion.div variants={itemVars} className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Connect</h3>
                    <div className="space-y-3">
                        {profile.contactDetails && (
                            <a href={`mailto:${profile.contactDetails}`} className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors group">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:text-slate-900 shadow-sm border border-slate-100">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Email</p>
                                    <p className="text-sm font-bold text-slate-900 truncate">{profile.contactDetails}</p>
                                </div>
                            </a>
                        )}
                        {profile.phoneNumber && (
                             <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-50">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 shadow-sm border border-slate-100">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase">Phone</p>
                                    <p className="text-sm font-bold text-slate-900">{profile.phoneNumber}</p>
                                </div>
                            </div>
                        )}
                        
                        {/* SOCIAL LINKS GRID */}
                        <div className="grid grid-cols-2 gap-3 mt-4 pt-2">
                            {/* YouTube */}
                            {(profile as any).youtube && (
                                <a href={(profile as any).youtube} target="_blank" rel="noreferrer" className="flex items-center justify-center py-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm">
                                    <Youtube className="w-5 h-5" />
                                </a>
                            )}
                            {/* Instagram */}
                            {(profile as any).instagram && (
                                <a href={(profile as any).instagram} target="_blank" rel="noreferrer" className="flex items-center justify-center py-3 bg-pink-50 text-pink-600 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white rounded-xl transition-all shadow-sm">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            )}
                            {/* LinkedIn */}
                            {profile.linkedin && (
                                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-center py-3 bg-blue-50 text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white rounded-xl transition-all shadow-sm">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            )}
                            {/* GitHub */}
                            {profile.github && (
                                <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center justify-center py-3 bg-slate-50 text-[#24292e] hover:bg-[#24292e] hover:text-white rounded-xl transition-all shadow-sm">
                                    <Github className="w-5 h-5" />
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* 2. STATS & INTENT */}
                <motion.div variants={itemVars} className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Profile Info</h3>
                    
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-slate-50">
                            <span className="text-sm text-slate-500 font-medium">Joined</span>
                            <span className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-slate-400" />
                                {profile.createdAt ? new Date(profile.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                            </span>
                        </div>
                        
                        {profile.age && (
                             <div className="flex justify-between items-center py-2 border-b border-slate-50">
                                <span className="text-sm text-slate-500 font-medium">Age</span>
                                <span className="text-sm font-bold text-slate-900">{profile.age}</span>
                            </div>
                        )}

                        {profile.gender && (
                             <div className="flex justify-between items-center py-2 border-b border-slate-50">
                                <span className="text-sm text-slate-500 font-medium">Gender</span>
                                <span className="text-sm font-bold text-slate-900 capitalize">{profile.gender}</span>
                            </div>
                        )}

                        {profile.networkingIntent && profile.networkingIntent.length > 0 && (
                            <div className="pt-4">
                                <span className="text-[10px] font-bold text-slate-400 uppercase mb-3 block">Looking For</span>
                                <div className="flex flex-wrap gap-2">
                                    {profile.networkingIntent.map((intent, i) => (
                                        <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-100">
                                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                            {intent}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* 3. TECH STACK */}
                {profile.aiSkills && profile.aiSkills.length > 0 && (
                    <motion.div variants={itemVars} className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2">
                            {profile.aiSkills.map((skill, index) => (
                                <span key={index} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold uppercase tracking-wide border border-slate-200">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {showDeleteProfile && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => !deletingProfile && setShowDeleteProfile(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 z-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Delete profile?</h2>
                  <p className="text-sm text-slate-500">
                    This will remove this builder from the public directory.
                  </p>
                </div>
              </div>
              <p className="text-xs text-rose-500 font-medium mb-6">
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowDeleteProfile(false)}
                  disabled={deletingProfile}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteProfile}
                  disabled={deletingProfile}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 text-sm font-bold text-white hover:bg-rose-700 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {deletingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </CommunityLayout>
  );
};

export default ProfileDetails;
