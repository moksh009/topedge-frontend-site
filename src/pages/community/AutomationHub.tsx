import React, { useState, useEffect, useRef } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import CommunitySEO from '@/components/community/CommunitySEO';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Search, ArrowRight, Zap, Sparkles,
  Workflow, Terminal, Box, Filter, Play, CheckCircle2, Star, ArrowBigUp, User
} from 'lucide-react';
import { collection, query, getDocs, orderBy, doc, updateDoc, increment, arrayUnion, arrayRemove, limit } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import LaunchGate from '@/components/ui/LaunchGate';
import TopBuilders from '@/components/community/TopBuilders';
import { getDoc } from 'firebase/firestore'; // Fixed import
import { isAdminEmail } from '@/utils/admin';
import { EmailService } from '@/services/emailService';

interface Resource {
  id: string;
  title: string;
  description: string;
  isPaid: boolean;
  price?: number;
  pricingType?: 'one_time' | 'monthly';
  tools: string[];
  userId: string;
  userName: string;
  userPhoto?: string;
  videoUrl?: string;
  imageUrl?: string;
  category: 'automation' | 'project' | 'tool' | 'prompt';
  upvotes?: number;
  upvotedBy?: string[];
  contactEmail?: string;
  contactPhone?: string;
  contactWebsite?: string;
  isHiring?: boolean;
}

const containerVar = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVar = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

// Helper to extract YouTube ID
const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

// Helper to get Smart Poster for Cloudinary
const getSmartPoster = (url: string) => {
    if (!url) return undefined;
    if (url.includes('cloudinary.com') && (url.endsWith('.mp4') || url.endsWith('.webm'))) {
        return url.replace(/\.[^/.]+$/, ".jpg");
    }
    return undefined;
}

const authorProfileCache: Record<string, any> = {};
const reviewStatsCache: Record<string, { count: number; avg: number }> = {};

const ResourceCard = ({ resource, index, currentUser }: { resource: Resource; index: number; currentUser: any }) => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState<number>(resource.upvotes ?? ((resource as any).stars ?? 0));
  const [upvoted, setUpvoted] = useState<boolean>(!!(((resource.upvotedBy ?? ((resource as any).starredBy ?? [])) as string[])).includes(currentUser?.uid));
    const [reviewCount, setReviewCount] = useState<number>(0);
    const [avgRating, setAvgRating] = useState<number>(0);
    const [authorProfile, setAuthorProfile] = useState<any>(null);
    const [isVoting, setIsVoting] = useState(false);

    const youtubeId = getYouTubeId(resource.videoUrl || '');
  const isYoutube = !!youtubeId;
  const smartPoster = getSmartPoster(resource.videoUrl || '');

  useEffect(() => {
    // Native Video Autoplay Logic
    if (videoRef.current && !isYoutube) {
      if (isHovering) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0; // Reset to start
      }
    }
  }, [isHovering, isYoutube]);

  useEffect(() => {
    const cached = reviewStatsCache[resource.id];
    if (cached) {
      setReviewCount(cached.count);
      setAvgRating(cached.avg);
      return;
    }
    const fetchReviews = async () => {
      try {
        const q = query(collection(db, 'community_resources', resource.id, 'reviews'), orderBy('createdAt', 'desc'));
        const snap = await getDocs(q);
        const ratings = snap.docs
          .map(d => (d.data() as any).rating as number)
          .filter(n => typeof n === 'number');
        const count = ratings.length;
        const avg = count > 0 ? ratings.reduce((t, n) => t + n, 0) / count : 0;
        reviewStatsCache[resource.id] = { count, avg };
        setReviewCount(count);
        setAvgRating(avg);
      } catch {}
    };
    fetchReviews();
  }, [resource.id]);

  useEffect(() => {
    if (!resource.userId) {
      return;
    }
    const cached = authorProfileCache[resource.userId];
    if (cached) {
      setAuthorProfile(cached);
      return;
    }
    const fetchAuthor = async () => {
      try {
        const profileRef = doc(db, 'public_profiles', resource.userId);
        const profileSnap = await getDoc(profileRef);
        if (profileSnap.exists()) {
          const data = profileSnap.data();
          authorProfileCache[resource.userId] = data;
          setAuthorProfile(data);
        } else {
          authorProfileCache[resource.userId] = null;
          setAuthorProfile(null);
        }
      } catch (error) {
        console.error('Error fetching author profile:', error);
      }
    };
    fetchAuthor();
  }, [resource.userId]);

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'automation': return <Workflow className="w-4 h-4 text-indigo-500" />;
      case 'tool': return <Terminal className="w-4 h-4 text-emerald-500" />;
      case 'prompt': return <Sparkles className="w-4 h-4 text-amber-500" />;
      default: return <Box className="w-4 h-4 text-blue-500" />;
    }
  };

  const toggleUpvote = async (e: React.MouseEvent) => {
      e.preventDefault();
      if (!currentUser) return;
      if (isVoting) return;
      
      setIsVoting(true);
      try {
        setUpvoted(!upvoted);
        setUpvoteCount(prev => upvoted ? Math.max(0, prev - 1) : prev + 1);
        const ref = doc(db, 'community_resources', resource.id);
        if (upvoted) {
          await updateDoc(ref, { upvotes: increment(-1), upvotedBy: arrayRemove(currentUser.uid) });
        } else {
          await updateDoc(ref, { upvotes: increment(1), upvotedBy: arrayUnion(currentUser.uid) });
        }
      } catch (e) {
        console.error(e);
        setUpvoted(!upvoted);
        setUpvoteCount(prev => upvoted ? prev + 1 : prev - 1);
      } finally {
        setIsVoting(false);
      }
    };

  return (
    <motion.div
      layout
      variants={itemVar}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="group flex flex-col h-full bg-white rounded-[2rem] border border-slate-200 overflow-hidden hover:border-indigo-200 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-2 relative"
    >
        {/* Link Wrapper for the whole card */}
        <Link to={`/community/resource/${resource.id}`} className="absolute inset-0 z-10" />

        {/* Media Header */}
        <div className="relative aspect-video w-full bg-slate-900 overflow-hidden border-b border-slate-50">
            {/* Category Tag */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 pointer-events-none">
               <div className="px-2.5 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-white/20 shadow-sm flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
                  {getCategoryIcon(resource.category)}
                  {resource.category}
               </div>
            </div>
            {/* Price Tag */}
            <div className="absolute top-4 right-4 z-20 flex gap-2 pointer-events-none">
               {resource.isPaid && (
                 <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-slate-700 rounded-full text-xs font-bold border border-white/20 shadow-sm uppercase">
                   {(resource.pricingType || 'one_time') === 'monthly' ? 'Monthly' : 'One-time'}
                 </span>
               )}
               <span className={cn("px-3 py-1.5 rounded-full text-xs font-bold border shadow-sm backdrop-blur-md", resource.isPaid ? "bg-slate-900/90 text-white border-slate-900" : "bg-white/90 text-slate-700 border-white/20")}>
                  {resource.isPaid ? `$${resource.price}` : 'Free'}
               </span>
            </div>

            {/* Media Logic: prefer image, then video, then placeholder */}
            {resource.imageUrl ? (
              <img
                src={resource.imageUrl}
                alt={resource.title}
                className="w-full h-full object-cover"
              />
            ) : resource.videoUrl ? (
              isYoutube ? (
                <div className="w-full h-full relative bg-black">
                  {isHovering ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${youtubeId}`}
                      className="w-full h-full object-cover pointer-events-none"
                      allow="autoplay; encrypted-media"
                      title="Preview"
                    />
                  ) : (
                    <img
                      src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                      alt={resource.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {!isHovering && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Play className="w-6 h-6 text-white fill-white" />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-full relative">
                  <video
                    ref={videoRef}
                    src={resource.videoUrl}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster={smartPoster}
                  />
                  <div
                    className={cn(
                      "absolute inset-0 flex items-center justify-center bg-black/10 transition-opacity duration-300",
                      isHovering ? "opacity-0" : "opacity-100"
                    )}
                  >
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div className="w-full h-full bg-slate-50 relative">
                <div
                  className="absolute inset-0 opacity-[0.4]"
                  style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '16px 16px' }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-3xl bg-white shadow-sm border border-slate-100 flex items-center justify-center">
                    {getCategoryIcon(resource.category)}
                  </div>
                </div>
              </div>
            )}
        </div>

        {/* Body */}
        <div className="p-6 flex-1 flex flex-col relative z-20">
            <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-1">{resource.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 min-h-[40px]">{resource.description}</p>
                {/* Resource Count / Author Stats */}
                <div className="flex items-center gap-3 mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {authorProfile?.resourcesCount !== undefined && (
                     <span className="flex items-center gap-1">
                       <Box className="w-3 h-3" /> {authorProfile.resourcesCount} Resources
                     </span>
                  )}
                  {reviewCount > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-slate-700 font-semibold">{avgRating.toFixed(1)}</span>
                      <span className="text-slate-400">({reviewCount})</span>
                    </span>
                  )}
                </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
                {(resource.tools || []).slice(0, 3).map((tool, i) => (
                    <span key={i} className="px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wide rounded-md group-hover:bg-slate-100 transition-colors">{tool}</span>
                ))}
                {(resource.tools || []).length > 3 && <span className="px-2 py-1 text-[10px] font-bold text-slate-400">+{resource.tools.length - 3}</span>}
            </div>

            <div className="mt-auto pt-4 border-t border-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Author Info (Clickable to profile) */}
                <Link 
                  to={`/community/profile/${resource.userId}`} 
                  className="flex items-center gap-2 relative z-30 px-2 py-1 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
                >
                    {resource.userPhoto ? (
                        <img src={resource.userPhoto} alt={resource.userName || 'User'} className="w-8 h-8 rounded-full object-cover border border-slate-100" />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">{(resource.userName || 'A').charAt(0)}</div>
                    )}
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900 group-hover:underline group-hover:text-indigo-600">{resource.userName || 'Anonymous Member'}</span>
                        {authorProfile?.isVerified && (
                          <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" /> Verified
                          </span>
                        )}
                    </div>
                </Link>

                {/* Actions Row */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    {/* Upvote Button */}
                    <button 
                        onClick={toggleUpvote} 
                        className={cn(
                            "relative z-30 h-10 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all flex-1 sm:flex-none justify-center", 
                            upvoted ? "bg-orange-50 border-orange-200 text-orange-600" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                        )}
                    >
                        <ArrowBigUp className={cn("w-5 h-5", upvoted && "fill-current")} />
                        <span>{upvoteCount}</span>
                    </button>

                    {/* View Button */}
                    <Link 
                        to={`/community/resource/${resource.id}`} 
                        className="relative z-30 h-10 px-4 bg-slate-900 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-sm min-w-[120px]"
                        onClick={(e) => {
                          if (!currentUser) {
                            e.preventDefault();
                            localStorage.setItem('returnUrl', `/community/resource/${resource.id}`);
                            navigate('/community/signup');
                          }
                        }}
                    >
                        View Details <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                </div>
            </div>
        </div>
    </motion.div>
  );
};

const AutomationHub = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCountFromApi, setTotalCountFromApi] = useState<number | null>(null);
  const { user, userProfile } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'free' | 'paid' | 'collab'>('all');
  const [showProfilePrompt, setShowProfilePrompt] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);

      // 1. Try API first (Guest friendly & Total Count)
      try {
        const emailService = new EmailService();
        const apiData = await emailService.getPublicStats();
        if (apiData && apiData.success) {
           if (apiData.stats?.totalResources) setTotalCountFromApi(apiData.stats.totalResources);
           if (apiData.newResources) setResources(apiData.newResources as Resource[]);
        }
      } catch (e) { console.error("API fetch failed", e); }

      // 2. Try Firestore (For authenticated users or full list)
      try {
        const q = query(
          collection(db, 'community_resources'),
          orderBy('createdAt', 'desc'),
          limit(120)
        );
        const querySnapshot = await getDocs(q);
        let fetched = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Resource[];

        setResources(fetched);
      } catch (error) {
        console.error("Error fetching resources:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const handlePromoteProject = async () => {
    if (!user) {
      localStorage.setItem('returnUrl', '/community/automation-hub');
      navigate('/community/login');
      return;
    }
    try {
      const profileDoc = await getDoc(doc(db, 'public_profiles', user.uid));
      if (profileDoc.exists()) {
        navigate('/community/submit-resource');
      } else {
        setShowProfilePrompt(true);
      }
    } catch (error) {
      console.error("Error checking profile:", error);
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.tools.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filter === 'all' || 
                          (filter === 'free' && !resource.isPaid) || 
                          (filter === 'paid' && resource.isPaid) ||
                          (filter === 'collab' && !!resource.isHiring);

    return matchesSearch && matchesFilter;
  }).sort((a, b) => (b.upvotes ?? 0) - (a.upvotes ?? 0));

  // Teaser Logic for Guests
  const displayResources = !user ? filteredResources.slice(0, 3) : filteredResources;
  const totalCount = totalCountFromApi || filteredResources.length;

  return (
    <CommunityLayout>
      <CommunitySEO 
        title="Automation Hub - AI Tools & Resources"
        description="Discover top-rated AI automation tools, templates, and workflows. Share your own resources and get feedback from the community."
        url="/community/automation-hub"
      />
      <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-slate-900 selection:text-white pb-14 md:pb-20">
        
        <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>

        <div className="container relative z-10 mx-auto px-6 max-w-7xl pt-12 md:pt-16">
          
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-16 gap-8 lg:gap-12">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl text-center lg:text-left flex-1"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold uppercase tracking-wider text-slate-600 mb-6 mx-auto lg:mx-0">
                <Zap className="w-3.5 h-3.5" />
                Automation Marketplace
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                Discover verified <br/>
                <span className="text-slate-400">
                  Engineering Assets
                </span>
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Stop rebuilding the basics. Access production-ready automations, agents, and templates built by the community.
              </p>
            </motion.div>
            
            <div className="flex flex-col items-center lg:items-end gap-6 w-full lg:w-auto">
               <div className="w-full max-w-sm">
                  <TopBuilders />
               </div>

               <div className="flex flex-col items-center lg:items-end gap-3 w-full">
                 {user && (!userProfile || !userProfile.fullName) && (
                   <Link
      to="/community/promote-profile"
      className="
        group relative flex w-full max-w-lg items-center justify-between
        overflow-hidden rounded-2xl border border-indigo-100
        bg-gradient-to-r from-white via-indigo-50/50 to-indigo-50
        p-5 shadow-sm transition-all duration-300
        hover:border-indigo-200 hover:shadow-md hover:to-indigo-100/60
      "
    >
      {/* Text Section */}
      <div className="flex flex-col gap-1 pr-4">
        <h3 className="text-[15px] font-semibold text-slate-900 leading-tight">
          Your profile isn't visible to community members.
        </h3>
        <p className="text-sm text-slate-500 leading-snug">
          Let's setup your profile first and boost your visibility.
        </p>
      </div>

      {/* Arrow Section - Vertically Centered */}
      <div className="flex shrink-0 items-center justify-center rounded-full bg-white/60 p-2 shadow-sm ring-1 ring-indigo-100 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-indigo-600 group-hover:ring-indigo-600">
        <ArrowRight className="h-5 w-5 text-indigo-600 transition-colors duration-300 group-hover:text-white" />
      </div>
    </Link>
                 )}

                 <motion.button 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePromoteProject}
                    className="group relative w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:shadow-2xl hover:shadow-slate-300/50 transition-all overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-white/10 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    <Plus className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Promote Resource Card</span>
                  </motion.button>
               </div>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-30 mb-12"
          >
            <div className="p-2 bg-white/80 backdrop-blur-xl border border-slate-200 rounded-[24px] shadow-lg shadow-slate-200/50 flex flex-col md:flex-row gap-2">
              <div className="relative flex-grow group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-slate-100 text-slate-400 group-focus-within:bg-slate-200 group-focus-within:text-slate-900 transition-colors">
                  <Search className="w-4 h-4" />
                </div>
                <input 
                  type="text"
                  placeholder="Search workflows, stacks, or creators..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-4 h-12 md:h-14 bg-transparent rounded-xl text-slate-900 placeholder:text-slate-400 font-medium outline-none border border-transparent focus:bg-white focus:border-slate-300 transition-all text-sm md:text-base"
                />
              </div>

              <div className="hidden md:block w-px h-10 bg-slate-200 my-auto mx-2" />

              <div className="flex bg-slate-100/50 p-1 rounded-xl overflow-x-auto no-scrollbar pb-1 md:pb-0">
                {(['all', 'free', 'paid', 'collab'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={cn(
                      "px-6 h-10 md:h-12 rounded-lg text-sm font-bold capitalize transition-all duration-300 whitespace-nowrap flex-shrink-0",
                      filter === f 
                        ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200" 
                        : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                    )}
                  >
                    {f === 'collab' ? 'Collaborate' : f}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Grid Section */}
          {loading ? (
             <div className="flex flex-col items-center justify-center py-32 opacity-50">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mb-4"></div>
                <p className="text-sm font-medium text-slate-500">Loading marketplace...</p>
             </div>
          ) : (
            <>
              {(() => {
                const myResources = filteredResources.filter(r => r.userId === (user?.uid || ''));
                const otherResources = filteredResources.filter(r => r.userId !== (user?.uid || ''));
                
                return (
                  <>
                    {myResources.length > 0 && (
                     <div className="mb-12">
  <div className="flex items-center justify-center md:justify-start mb-10">
    <h2 className="text-4xl md:text-6xl font-bold text-slate-900">
      My Resources
    </h2>
    
    {/* If you add the button back here later, it will sit next to the title on desktop */}
  </div>
  
  {/* Your Grid code follows here... */}

                        <motion.div layout variants={containerVar} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-2">
                          <AnimatePresence>
                            {myResources.map((resource, index) => (
                              <ResourceCard key={resource.id} resource={resource} index={index} currentUser={user} />
                            ))}
                          </AnimatePresence>
                        </motion.div>
                      </div>
                    )}
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-slate-900">Community Marketplace</h2>
                    </div>
                    
                      <motion.div 
                        layout
                        variants={containerVar}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12"
                      >
                        <AnimatePresence>
                          {(!user ? otherResources.slice(0, 3) : otherResources).map((resource, index) => (
                            <ResourceCard key={resource.id} resource={resource} index={index} currentUser={user} />
                          ))}
                        </AnimatePresence>
                      </motion.div>

                    {!user && (totalCountFromApi ? totalCountFromApi > 3 : otherResources.length > 3) && (
                       <div className="w-full flex flex-col items-center justify-center py-16 text-center bg-white/50 backdrop-blur-sm rounded-[2.5rem] border border-slate-200 border-dashed mt-4 relative overflow-hidden group">
                           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50 pointer-events-none" />
                           <div className="relative z-10 flex flex-col items-center px-4">
                               <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md ring-1 ring-slate-100 group-hover:scale-110 transition-transform duration-500">
                                   <Zap className="w-8 h-8 text-amber-500" />
                               </div>
                               <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
                                   Login to explore all {totalCountFromApi || otherResources.length} resources
                               </h3>
                               <p className="text-slate-500 max-w-md mb-8 leading-relaxed">
                                   Access production-ready automations, agents, and templates. It's free to join.
                               </p>
                               <Link 
                                   to="/community/signup"
                                   className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-1 flex items-center gap-2"
                                   onClick={() => localStorage.setItem('returnUrl', '/community/automation-hub')}
                               >
                                   See all {totalCountFromApi || otherResources.length} Resources <ArrowRight className="w-4 h-4" />
                               </Link>
                           </div>
                       </div>
                    )}
                  </>
                );
              })()}
            </>
          )}
          
          {!loading && filteredResources.length === 0 && (
             <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-center py-24 bg-white rounded-[32px] border border-dashed border-slate-300"
            >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <Filter className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">No resources found</h3>
                <p className="text-slate-500 max-w-sm mx-auto">
                  We couldn't find any resources matching your search. Try adjusting your filters or search terms.
                </p>
                <button 
                  onClick={() => {setSearchTerm(''); setFilter('all');}}
                  className="mt-6 text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
                >
                  Clear all filters
                </button>
             </motion.div>
          )}
        </div>
      </div>
      <AnimatePresence>
        {showProfilePrompt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowProfilePrompt(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 z-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900/5 flex items-center justify-center text-slate-900">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Promote your public profile</h2>
                  <p className="text-sm text-slate-500">
                    You need a public profile to post a resource in the community.
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowProfilePrompt(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  Not now
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowProfilePrompt(false);
                    navigate('/community/promote-profile');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 text-sm font-bold text-white hover:bg-slate-800"
                >
                  Promote profile
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </CommunityLayout>
  );
};

export default AutomationHub;
