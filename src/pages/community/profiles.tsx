import React, { useState, useEffect } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { motion } from 'framer-motion';
import { 
  Search, Github, Linkedin, 
  ArrowRight, UserPlus, Building2, ExternalLink,
  Youtube, Instagram, User, 
  ArrowDown
} from 'lucide-react';
import { collection, query, getDocs, orderBy, limit } from 'firebase/firestore';
import { db, auth } from '@/services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import LaunchGate from '@/components/ui/LaunchGate';
import HireModal from '@/components/community/HireModal';
import { calculateReputation } from '@/utils/reputation';
import { isAdminEmail } from '@/utils/admin';
import { EmailService } from '@/services/emailService';

interface Profile {

  id: string;
  fullName: string;
  photoURL?: string;
  bannerURL?: string;
  location?: string;
  currentWork?: string;
  companyName?: string;
  aiSkills?: string[];
  description?: string;
  bio?: string; // Added for compatibility
  websiteURL?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  youtube?: string;    // Added
  instagram?: string;  // Added
  workingStatus?: string;
  networkingIntent?: string[];
  resourcesCount?: number;
  totalUpvotesReceived?: number;
  uid?: string;
}

const containerVar = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVar = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

const CommunityProfiles = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCountFromApi, setTotalCountFromApi] = useState<number | null>(null);
  const [user, setUser] = useState(auth.currentUser);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeHireId, setActiveHireId] = useState<string | null>(null);
  const [resourcesByUser, setResourcesByUser] = useState<
    Record<string, { resources: { userId: string; upvotes: number }[] }>
  >({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  
  return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProfiles = async () => {
      // 1. Try API first (Guest friendly & Total Count)
      try {
        const emailService = new EmailService();
        const apiData = await emailService.getPublicStats();
        if (apiData && apiData.success) {
           if (apiData.stats?.totalProfiles) setTotalCountFromApi(apiData.stats.totalProfiles);
           
           // If guest, use API data for the teaser view (Top 3) and skip Firestore
           if (!auth.currentUser && apiData.topProfiles && apiData.topProfiles.length > 0) {
             setProfiles(apiData.topProfiles as any[]); // Cast as any or Profile
             setLoading(false);
             return;
           }
        }
      } catch (e) { console.error("API fetch failed", e); }

      // If guest and API failed, we might hit permission errors on Firestore, but let's try safely
      if (!auth.currentUser) {
         console.warn("Guest user: API failed or partial. Firestore might fail due to permissions.");
         // If we want to be safe, we could return here or set empty. 
         // But maybe public_profiles is public? If not, we should return.
         // Assuming strict rules:
         // return; 
         // For now, let it fall through but handle error gracefully
      }

      try {
        const q = query(
          collection(db, 'public_profiles')
        );
        const querySnapshot = await getDocs(q);
        let profilesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Profile[];
        
        // Sort by createdAt desc (handle missing dates)
        profilesData.sort((a: any, b: any) => {
           const dateA = a.createdAt?.seconds || 0;
           const dateB = b.createdAt?.seconds || 0;
           return dateB - dateA;
        });

        // Filter out incomplete profiles (must have a name)
        const validProfiles = profilesData.filter(p => p.fullName && p.fullName.trim().length > 0);
        setProfiles(validProfiles);

        const rQ = query(collection(db, 'community_resources'), limit(1000));
        const rSnap = await getDocs(rQ);
        const byUser: Record<string, { resources: { userId: string; upvotes: number; views?: number; downloads?: number; linkClicks?: number; purchasers?: string[] }[] }> = {};
        rSnap.docs.forEach(d => {
          const data = d.data() as any;
          const uid = data.userId as string;
          if (!uid) return;
          if (!byUser[uid]) byUser[uid] = { resources: [] };
          byUser[uid].resources.push({
            userId: uid,
            upvotes: Number((data.upvotes ?? data.stars) || 0),
            views: Number(data.views || 0),
            downloads: Number(data.downloads || 0),
            linkClicks: Number(data.linkClicks || 0),
            purchasers: data.purchasers || []
          });
        });
        setResourcesByUser(byUser);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  const filteredProfiles = profiles.filter(profile => 
    (profile.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (profile.aiSkills || []).some(skill => (skill || '').toLowerCase().includes(searchTerm.toLowerCase())) ||
    (profile.currentWork || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getResourcesForProfile = (p: Profile) => {
    const entry = resourcesByUser[p.id];
    let resourcesArr = entry?.resources || [];
    const pUid = p.uid;
    
    // Merge resources from uid bucket if different from id bucket
    if (pUid && pUid !== p.id && resourcesByUser[pUid]) {
        // Resources are bucketed by userId, so these sets are disjoint. Safe to merge.
        resourcesArr = [...resourcesArr, ...resourcesByUser[pUid].resources];
    }
    return resourcesArr;
  };

  const sortedProfiles = [...filteredProfiles].sort((a, b) => {
    const resourcesA = getResourcesForProfile(a);
    const repA = calculateReputation(
        {
          bio: a.description || a.bio,
          photoURL: a.photoURL,
          github: a.github,
          linkedin: a.linkedin,
          websiteURL: a.websiteURL
        },
        resourcesA
      ).score;

      const resourcesB = getResourcesForProfile(b);
      const repB = calculateReputation(
        {
          bio: b.description || b.bio,
          photoURL: b.photoURL,
          github: b.github,
          linkedin: b.linkedin,
          websiteURL: b.websiteURL
        },
        resourcesB
      ).score;

    return repB - repA;
  });

  // Teaser Logic for Guests
  const displayProfiles = !user ? sortedProfiles.slice(0, 3) : sortedProfiles;

  const hasMyProfile = !!user && profiles.some(p => p.id === (user.uid || ''));

  const ProfileCard = ({ profile, index }: { profile: Profile; index: number }) => {
    const resourcesArr = getResourcesForProfile(profile);
    const rep = calculateReputation(
      {
        bio: profile.description || profile.bio,
        photoURL: profile.photoURL,
        github: profile.github,
        linkedin: profile.linkedin,
        websiteURL: profile.websiteURL
      },
      resourcesArr
    );

    const cardBorder =
      rep.tier === 'Grandmaster'
        ? 'border-2 border-amber-200 hover:border-amber-300 hover:shadow-[0_20px_45px_-12px_rgba(245,158,11,0.25)]'
        : rep.tier === 'Architect'
        ? 'border-2 border-blue-200 hover:border-blue-300 hover:shadow-[0_20px_45px_-12px_rgba(37,99,235,0.22)]'
        : 'border border-slate-200 hover:border-indigo-200 hover:shadow-[0_20px_40px_-12px_rgba(79,70,229,0.1)]';

    const avatarRing =
      rep.tier === 'Grandmaster'
        ? 'ring-4 ring-amber-200'
        : rep.tier === 'Architect'
        ? 'ring-4 ring-blue-200'
        : 'ring-2 ring-slate-200';

    const bannerBg =
      rep.tier === 'Grandmaster'
        ? 'bg-gradient-to-br from-amber-50 via-yellow-50 to-emerald-50'
        : rep.tier === 'Architect'
        ? 'bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50'
        : 'bg-gradient-to-br from-indigo-50 via-slate-50 to-purple-50';

    return (
    <motion.div
      layout
      variants={itemVar}
      className={cn(
        "group relative flex flex-col bg-white rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden transition-all duration-300 hover:-translate-y-2 text-center h-full w-full",
        cardBorder
      )}
    >
      <div className={cn("h-28 sm:h-32 relative overflow-hidden", bannerBg)}>
          {/* Rank Badge */}
          <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-slate-700 shadow-sm border border-slate-100">
             #{index + 1}
          </div>

          {profile.bannerURL ? (
            <img src={profile.bannerURL} alt="Banner" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', filter: 'contrast(120%) brightness(120%)' }}></div>
          )}
          
          {/* Social Icons Overlay */}
          <div className="absolute top-4 right-4 flex gap-2">
              {profile.youtube && (
                  <a href={profile.youtube} target="_blank" rel="noreferrer" className="p-1.5 sm:p-2 rounded-full bg-white/60 backdrop-blur-md text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm">
                      <Youtube className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
              )}
              {profile.instagram && (
                  <a href={profile.instagram} target="_blank" rel="noreferrer" className="p-1.5 sm:p-2 rounded-full bg-white/60 backdrop-blur-md text-pink-600 hover:bg-pink-600 hover:text-white transition-all shadow-sm">
                      <Instagram className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
              )}
              {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="p-1.5 sm:p-2 rounded-full bg-white/60 backdrop-blur-md text-slate-600 hover:bg-[#0077b5] hover:text-white transition-all shadow-sm">
                      <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
              )}
              {profile.github && (
                  <a href={profile.github} target="_blank" rel="noreferrer" className="p-1.5 sm:p-2 rounded-full bg-white/60 backdrop-blur-md text-slate-600 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                      <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
              )}
              {profile.websiteURL && (
                  <a href={profile.websiteURL} target="_blank" rel="noreferrer" className="p-1.5 sm:p-2 rounded-full bg-white/60 backdrop-blur-md text-slate-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                      <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
              )}
          </div>
      </div>

      <div className="px-4 sm:px-8 pb-6 sm:pb-8 flex-1 flex flex-col relative items-center">
        
        <div className={cn(
          'w-40 h-40 sm:w-60 sm:h-60 rounded-[2rem] sm:rounded-[2.5rem] p-1.5 bg-white shadow-xl rotate-0 group-hover:rotate-1 transition-transform duration-300 relative z-10 -mt-12 sm:-mt-16',
          avatarRing,
          profile.workingStatus === 'Open to Work' ? 'ring-offset-2 ring-offset-emerald-50' : ''
        )}>
          {profile.photoURL ? (
            <img src={profile.photoURL} alt={profile.fullName} className="w-full h-full rounded-[1.7rem] sm:rounded-[2.1rem] object-cover bg-slate-100" />
          ) : (
            <div className="w-full h-full rounded-[1.7rem] sm:rounded-[2.1rem] bg-slate-100 flex items-center justify-center text-4xl sm:text-5xl font-bold text-slate-300">
                {(profile.fullName || 'U').charAt(0)}
            </div>
          )}
        </div>
        
        {/* Identity */}
        <div className="mb-4 sm:mb-5 flex flex-col items-center mt-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight mb-1 group-hover:text-indigo-600 transition-colors">
              {profile.fullName || 'Anonymous Member'}
            </h3>
            
            <div
              className={cn(
                "mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider",
                rep.tier === 'Grandmaster'
                  ? "bg-yellow-50 text-amber-700 border-amber-100"
                  : rep.tier === 'Architect'
                  ? "bg-blue-50 text-blue-700 border-blue-100"
                  : "bg-slate-100 text-slate-600 border-slate-200"
              )}
            >
              <span>{rep.tier}</span>
              <span className="text-slate-300">•</span>
              <span>{rep.score} pts</span>
            </div>

            <p className="text-slate-500 font-medium text-xs sm:text-sm flex flex-wrap items-center gap-2 justify-center mt-3">
              {profile.currentWork || 'Member'}
              {profile.companyName && (
                  <>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span className="text-slate-400 flex items-center gap-1">
                      <Building2 className="w-3 h-3" /> {profile.companyName}
                  </span>
                  </>
              )}
            </p>
        </div>

        {/* Bio */}
        <div className="mb-6 relative w-full">
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2 mx-auto max-w-xs text-center">
                {profile.description || 'No bio available.'}
            </p>
        </div>

        {/* Skills */}
        <div className="mt-auto pt-4 sm:pt-6 border-t border-slate-100 w-full flex justify-center">
            <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center">
              {(profile.aiSkills || []).slice(0, 4).map((skill, idx) => (
                  <span key={idx} className="px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-semibold rounded-lg bg-slate-50 text-slate-600 border border-slate-200">
                    {skill}
                  </span>
              ))}
            </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex flex-col gap-2 sm:gap-3">
        <Link 
            to={`/community/profile/${profile.id}`}
            className="block w-full p-2.5 sm:p-3 text-center rounded-[1.2rem] sm:rounded-[1.5rem] bg-slate-900 text-xs sm:text-sm font-bold text-white group-hover:bg-slate-800 transition-all shadow-md"
            onClick={(e) => {
              if (!user) {
                e.preventDefault();
                localStorage.setItem('returnUrl', `/community/profile/${profile.id}`);
                navigate('/community/signup');
              }
            }}
        >
            View Profile
        </Link>
        {profile.workingStatus === 'Open to Work' && (
          <button
            onClick={() => {
              if (!user) {
                 navigate('/community/signup');
                 return;
              }
              setActiveHireId(profile.id);
            }}
            className="block w-full p-2.5 sm:p-3 text-center rounded-[1.2rem] sm:rounded-[1.5rem] bg-emerald-600 text-xs sm:text-sm font-bold text-white hover:bg-emerald-700 transition-all shadow-md"
          >
            Hire Me
          </button>
        )}
      </div>
    </motion.div>
  );
  };

  return (
    <CommunityLayout>
      <div className="min-h-screen bg-[#F8F9FB] text-slate-900 font-sans selection:bg-indigo-500 selection:text-white pb-14 md:pb-20">
        
        <div className="fixed inset-0 pointer-events-none opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        <div className="container relative mx-auto px-4 sm:px-6 max-w-7xl pt-24 sm:pt-16">

          {/* Hero */}
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-12 lg:mb-16 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              className="max-w-2xl flex flex-col items-center lg:items-start w-full"
            >
              <div className="inline-flex justify-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-[10px] sm:text-xs font-bold uppercase tracking-wider text-indigo-600 mb-4 sm:mb-6">
                <UserPlus className="w-3.5 h-3.5" />
                Talent Directory
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-slate-900 mb-4 sm:mb-6 leading-[1.1] sm:leading-tight text-center lg:text-left">
                Connect with the <br/>
                <span className="text-slate-400">Builders & Architects.</span>
              </h1>
              
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl text-center lg:text-left">
                A curated network of AI engineers, automation specialists, and founders.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="w-full sm:w-auto flex flex-col items-center lg:items-end gap-3 justify-center lg:justify-end"
            >
              {user && !hasMyProfile && (
                <Link
                  to="/community/promote-profile"
                  className="group relative flex w-full max-w-lg items-center justify-between overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-r from-white via-indigo-50/50 to-indigo-50 p-5 shadow-sm transition-all duration-300 hover:border-indigo-200 hover:shadow-md hover:to-indigo-100/60"
                >
                  <div className="flex flex-col gap-1 pr-4">
                    <h3 className="text-[15px] font-semibold text-slate-900 leading-tight">
                      Your profile is not visible to community members yet.
                    </h3>
                    <p className="text-sm text-slate-500 leading-snug">
                      Set up your profile once to get visible across the community.
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center justify-center rounded-full bg-white/60 p-2 shadow-sm ring-1 ring-indigo-100 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-indigo-600 group-hover:ring-indigo-600">
                    <ArrowRight className="h-5 w-5 text-indigo-600 transition-colors duration-300 group-hover:text-white" />
                  </div>
                </Link>
              )}
              <Link
                to="/community/promote-profile"
                className="group w-auto relative inline-flex items-center justify-center gap-3 px-6 py-3.5 sm:px-8 sm:py-4 bg-slate-900 text-white rounded-2xl font-bold overflow-hidden shadow-xl shadow-slate-200 hover:-translate-y-1 transition-all"
              >
                <span className="relative text-sm sm:text-base">Promote My Profile</span>
                <ArrowRight className="w-4 h-4 relative transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-30 mb-10 sm:mb-12"
          >
             <div className="relative group w-full max-w-2xl mx-auto md:mx-0">
                <div className="absolute inset-0 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50" />
                <div className="relative flex items-center p-1.5 sm:p-2">
                   <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 text-slate-400">
                      <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                   </div>
                   <input 
                      type="text"
                      placeholder="Search by name, company, or stack..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full h-10 sm:h-12 bg-transparent text-sm sm:text-lg font-medium text-slate-900 placeholder:text-slate-400 outline-none"
                   />
                </div>
             </div>
          </motion.div>

          {/* Profiles Grid */}
          {loading ? (
             <div className="flex flex-col items-center justify-center py-32 opacity-50">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mb-4"></div>
             </div>
          ) : (
            <>
              {(() => {
                const myProfiles = sortedProfiles.filter(p => p.id === (user?.uid || ''));
                const otherProfiles = sortedProfiles.filter(p => p.id !== (user?.uid || ''));
                
                return (
                  <>
                    {myProfiles.length > 0 && (
                      <div className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Your Profile</h2>
                          <Link to={`/community/profile/${myProfiles[0].id}`} className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">View</Link>
                        </div>
                        <motion.div variants={containerVar} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {myProfiles.map((profile) => {
                              const rank = sortedProfiles.findIndex(p => p.id === profile.id);
                              return (
                                <ProfileCard 
                                  key={profile.id} 
                                  profile={profile} 
                                  index={rank}
                                />
                              );
                            })}
                        </motion.div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Community Profiles</h2>
                    </div>
                    
                    {/* Grid */}
                    <motion.div
                      layout
                      variants={containerVar}
                      initial="hidden"
                      animate="show"
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-12"
        >
          {displayProfiles.map((profile, index) => (
            <ProfileCard key={profile.id} profile={profile} index={index} />
          ))}
        </motion.div>

                    {/* Guest Banner */}
                    {!user && (() => {
                        const otherProfiles = sortedProfiles; // Use sortedProfiles as the full list
                        if (otherProfiles.length === 0 && !loading) return null;
                        // Only show if we have more profiles than what is displayed
                        if (otherProfiles.length <= 3 && !totalCountFromApi) return null;

                        return (
                          <div className="w-full flex flex-col items-center justify-center py-16 text-center bg-white/50 backdrop-blur-sm rounded-[2.5rem] border border-slate-200 border-dashed mt-4 relative overflow-hidden group">
                              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-50/50 pointer-events-none" />
                              <div className="relative z-10 flex flex-col items-center px-4">
                                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-md ring-1 ring-slate-100 group-hover:scale-110 transition-transform duration-500">
                                      <User className="w-8 h-8 text-indigo-500" />
                                  </div>
                                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
                                      Login to view all {totalCountFromApi || otherProfiles.length} profiles
                                  </h3>
                                  <p className="text-slate-500 max-w-md mb-8 leading-relaxed">
                                      Join our community to connect with top AI talent, founders, and builders. It's free to join.
                                  </p>
                                  <Link 
                                      to="/community/signup"
                                      className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1 flex items-center gap-2"
                                      onClick={() => localStorage.setItem('returnUrl', '/community/profiles')}
                                  >
                                      See all {totalCountFromApi || otherProfiles.length} Profiles <ArrowRight className="w-4 h-4" />
                                  </Link>
                              </div>
                          </div>
                        );
                    })()}
                  </>
                );
              })()}
            </>
          )}
        </div>
      </div>

      {activeHireId && (() => {
        const p = profiles.find(x => x.id === activeHireId);
        if (!p) return null;
        return (
          <HireModal
            open={!!activeHireId}
            onClose={() => setActiveHireId(null)}
            name={p.fullName}
            photoURL={p.photoURL}
            contactEmail={p.email} 
            contactWebsite={p.websiteURL} 
            availableFor={p.workingStatus === 'Open to Work' ? ['Freelance', 'Full-time', 'Consulting'] : ['Networking']}
            recipientId={p.id}
          />
        );
      })()}
    </CommunityLayout>
  );
};

export default CommunityProfiles;
