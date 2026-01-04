import React, { useState, useEffect } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, Briefcase, Globe, Github, Linkedin, 
  ArrowRight, UserPlus, Terminal, Building2, ExternalLink 
} from 'lucide-react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db, auth } from '@/services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import LaunchGate from '@/components/ui/LaunchGate';
import HireModal from '@/components/community/HireModal';
import { calculateReputation } from '@/utils/reputation';

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
  websiteURL?: string;
  email?: string; // Ensure email is typed
  github?: string;
  linkedin?: string;
  workingStatus?: string;
  networkingIntent?: string[];
  resourcesCount?: number;
  totalStarsReceived?: number;
}

const CommunityProfiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(auth.currentUser);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeHireId, setActiveHireId] = useState<string | null>(null);
  const [resourcesByUser, setResourcesByUser] = useState<Record<string, { count: number; stars: number }>>({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const q = query(
          collection(db, 'public_profiles'),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const profilesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Profile[];
        setProfiles(profilesData);

        const rQ = query(collection(db, 'community_resources'), orderBy('createdAt', 'desc'));
        const rSnap = await getDocs(rQ);
        const byUser: Record<string, { count: number; stars: number }> = {};
        rSnap.docs.forEach(d => {
          const data = d.data() as any;
          const uid = data.userId as string;
          if (!uid) return;
          if (!byUser[uid]) byUser[uid] = { count: 0, stars: 0 };
          byUser[uid].count += 1;
          byUser[uid].stars += (data.stars || 0);
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

  // Helper to render a single profile card (Premium UI Preserved)
  const ProfileCard = ({ profile }: { profile: Profile }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative flex flex-col bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden hover:border-indigo-200 hover:shadow-[0_20px_40px_-12px_rgba(79,70,229,0.1)] transition-all duration-300 hover:-translate-y-2 text-center h-full"
    >
      {/* Banner Area */}
      <div className="h-32 bg-gradient-to-br from-indigo-50 via-slate-50 to-purple-50 relative overflow-hidden">
          {profile.bannerURL ? (
            <img src={profile.bannerURL} alt="Banner" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <>
              <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', filter: 'contrast(120%) brightness(120%)' }}></div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/5 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl"></div>
            </>
          )}
          
          {/* Social Icons (Top Right) */}
          <div className="absolute top-4 right-4 flex gap-2">
              {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" className="p-2 rounded-full bg-white/60 backdrop-blur-md text-slate-600 hover:bg-[#0077b5] hover:text-white transition-all shadow-sm">
                      <Linkedin className="w-4 h-4" />
                  </a>
              )}
              {profile.github && (
                  <a href={profile.github} target="_blank" className="p-2 rounded-full bg-white/60 backdrop-blur-md text-slate-600 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                      <Github className="w-4 h-4" />
                  </a>
              )}
              {profile.websiteURL && (
                  <a href={profile.websiteURL} target="_blank" className="p-2 rounded-full bg-white/60 backdrop-blur-md text-slate-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                      <ExternalLink className="w-4 h-4" />
                  </a>
              )}
          </div>
      </div>

      {/* Main Content */}
      <div className="px-8 pb-8 flex-1 flex flex-col relative items-center">
        
        {/* Large Premium Avatar (Overlapping) */}
        <div className={cn(
          'w-60 h-60 rounded-[2.5rem] p-1.5 bg-white shadow-xl rotate-0 group-hover:rotate-1 transition-transform duration-300 relative z-10 -mt-16',
          profile.workingStatus === 'Open to Work' ? 'ring-4 ring-emerald-100' : '',
          profile.workingStatus && profile.workingStatus !== 'Open to Work' ? 'ring-4 ring-amber-100' : ''
        )}>
          {profile.photoURL ? (
            <img src={profile.photoURL} alt={profile.fullName} className="w-full h-full rounded-[2.1rem] object-cover bg-slate-100" />
          ) : (
            <div className="w-full h-full rounded-[2.1rem] bg-slate-100 flex items-center justify-center text-5xl font-bold text-slate-300">
                {profile.fullName.charAt(0)}
            </div>
          )}
        </div>
        
        {/* Status Dot (Top Right of Avatar Area) */}
        {profile.workingStatus && (
          <div className={cn(
              'absolute top-0 right-0 w-7 h-7 rounded-full border-[3px] border-white shadow-sm z-20 flex items-center justify-center',
              profile.workingStatus === 'Open to Work' ? 'bg-emerald-500' : 'bg-amber-500'
          )} title={profile.workingStatus}>
              <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></div>
          </div>
        )}

        {/* Identity & Reputation */}
        <div className="mb-5 flex flex-col items-center mt-4">
            <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-1 group-hover:text-indigo-600 transition-colors">
              {profile.fullName}
            </h3>
            
            {/* Reputation Badge */}
            {(() => {
              const r = resourcesByUser[profile.id] || { count: 0, stars: 0 };
              const resourcesArr = r.count === 0
                ? []
                : [
                    { userId: profile.id, stars: r.stars },
                    ...Array.from({ length: Math.max(0, r.count - 1) }).map(() => ({ userId: profile.id, stars: 0 }))
                  ];
              const rep = calculateReputation(
                {
                  bio: profile.description,
                  photoURL: profile.photoURL,
                  github: profile.github,
                  linkedin: profile.linkedin,
                  websiteURL: profile.websiteURL
                },
                resourcesArr
              );
              const points = rep.score;
              const tier = rep.tier;
              const styles =
                tier === 'Grandmaster'
                  ? 'bg-yellow-100 text-yellow-800 border-yellow-200 shadow-sm ring-1 ring-yellow-200'
                  : tier === 'Architect'
                  ? 'bg-blue-50 text-blue-700 border-blue-100'
                  : 'bg-slate-100 text-slate-600 border-slate-200';
              return (
                <div className={`mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${styles}`}>
                  <span>{tier}</span>
                  <span className="text-slate-300">•</span>
                  <span>{points} pts</span>
                </div>
              );
            })()}

            <p className="text-slate-500 font-medium text-sm flex items-center gap-2 justify-center mt-3">
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
            {profile.location && (
                <div className="flex items-center gap-1 mt-2 text-xs font-bold text-slate-400 uppercase tracking-wide justify-center">
                  <MapPin className="w-3.5 h-3.5" />
                  {profile.location}
                </div>
            )}
        </div>

        {/* Bio */}
        <div className="mb-6 relative w-full">
            <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mx-auto max-w-xs text-center">
                {profile.description || 'No bio available.'}
            </p>
        </div>

        {/* Skills */}
        <div className="mt-auto pt-6 border-t border-slate-100 w-full flex justify-center">
            <div className="flex flex-wrap gap-2 justify-center">
              {(profile.aiSkills || []).slice(0, 4).map((skill, idx) => (
                  <span key={idx} className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-50 text-slate-600 border border-slate-200 group-hover:border-indigo-100 group-hover:bg-indigo-50/50 group-hover:text-indigo-600 transition-colors">
                    {skill}
                  </span>
              ))}
              {(profile.aiSkills || []).length > 4 && (
                  <span className="px-2 py-1.5 text-xs font-bold rounded-lg bg-slate-100 text-slate-400 border border-transparent">
                    +{(profile.aiSkills || []).length - 4}
                  </span>
              )}
            </div>
        </div>
      </div>

      {/* --- BUTTON ACTIONS AREA --- */}
      <div className="px-6 pb-6 flex flex-col gap-3">
        {/* Always show View Profile */}
        <Link 
            to={`/community/profile/${profile.id}`}
            className="block w-full p-3 text-center rounded-[1.5rem] bg-slate-900 text-sm font-bold text-white group-hover:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-lg"
        >
            View Profile
        </Link>

        {/* Conditionally show Hire Me if Open to Work */}
        {profile.workingStatus === 'Open to Work' && (
          <button
            onClick={() => setActiveHireId(profile.id)}
            className="block w-full p-3 text-center rounded-[1.5rem] bg-emerald-600 text-sm font-bold text-white hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg"
          >
            Hire Me
          </button>
        )}
      </div>
    </motion.div>
  );

  return (
    <CommunityLayout>
      <div className="min-h-screen bg-[#F8F9FB] text-slate-900 font-sans selection:bg-indigo-500 selection:text-white pb-20">
        
        {/* Background Pattern */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        <div className="container relative mx-auto px-6 max-w-7xl pt-16">

          {/* ... Hero Section (Standard) ... */}
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold uppercase tracking-wider text-indigo-600 mb-6">
                <UserPlus className="w-3.5 h-3.5" />
                Talent Directory
              </div>
              <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                Connect with the <br/>
                <span className="text-slate-400">Builders & Architects.</span>
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
                A curated network of AI engineers, automation specialists, and founders. Find collaborators or your next hire.
              </p>
            </motion.div>
            
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
            >
              <Link 
                to="/community/promote-profile"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold overflow-hidden shadow-xl shadow-slate-200 hover:shadow-2xl hover:shadow-slate-400/20 transition-all hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative">Create Public Profile</span>
                <ArrowRight className="w-4 h-4 relative transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* ... Search Toolbar (Standard) ... */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="sticky top-24 z-30 mb-12"
          >
             <div className="relative group max-w-2xl mx-auto md:mx-0">
                <div className="absolute inset-0 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50" />
                <div className="relative flex items-center p-2">
                   <div className="flex items-center justify-center w-12 h-12 text-slate-400">
                      <Search className="w-5 h-5" />
                   </div>
                   <input 
                      type="text"
                      placeholder="Search by name, company, or stack..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full h-12 bg-transparent text-lg font-medium text-slate-900 placeholder:text-slate-400 outline-none"
                   />
                   {searchTerm && (
                     <button 
                       onClick={() => setSearchTerm('')}
                       className="px-4 py-2 text-xs font-bold text-slate-400 hover:text-slate-900 uppercase tracking-wider"
                     >
                       Clear
                     </button>
                   )}
                </div>
             </div>
          </motion.div>

          {/* ================= PROFILES GRID ================= */}
          {loading ? (
             <div className="flex flex-col items-center justify-center py-32 opacity-50">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mb-4"></div>
                <p className="text-sm font-medium text-slate-500">Loading network...</p>
             </div>
          ) : (
            <>
              {(() => {
                const myProfiles = filteredProfiles.filter(p => p.id === (user?.uid || ''));
                const otherProfiles = filteredProfiles.filter(p => p.id !== (user?.uid || ''));
                const isPreLaunch = new Date() < new Date('2026-01-19');
                
                return (
                  <>
                    {myProfiles.length > 0 && (
                      <div className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-2xl font-bold text-slate-900">Your Profile</h2>
                          <Link to={`/community/profile/${myProfiles[0].id}`} className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">View</Link>
                        </div>
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          <AnimatePresence>
                            {myProfiles.map((profile) => (
                              <ProfileCard key={profile.id} profile={profile} />
                            ))}
                          </AnimatePresence>
                        </motion.div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-slate-900">Community Profiles</h2>
                      <span className="text-sm font-semibold text-slate-400">Locked until launch</span>
                    </div>
                    
                    <LaunchGate
                      active={isPreLaunch}
                      title="Profiles visible after launch"
                      description="Create your profile now. Directory unlocks on launch day."
                    >
                      <motion.div 
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12"
                      >
                        <AnimatePresence>
                          {otherProfiles.map((profile) => (
                            <ProfileCard key={profile.id} profile={profile} />
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    </LaunchGate>
                  </>
                );
              })()}
            </>
          )}

          {/* Empty State */}
          {!loading && filteredProfiles.length === 0 && (
             <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 bg-white rounded-[32px] border border-dashed border-slate-300"
            >
                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">No profiles found</h3>
                <p className="text-slate-500 max-w-sm mx-auto mb-6">
                   Try adjusting your search terms or be the first to join with these criteria.
                </p>
                <button 
                  onClick={() => setSearchTerm('')}
                  className="text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
                >
                  Clear search
                </button>
             </motion.div>
          )}

        </div>
      </div>

      {/* --- HIRE MODAL (FIXED TO PASS EMAIL) --- */}
      {activeHireId && (() => {
        const p = profiles.find(x => x.id === activeHireId);
        if (!p) return null;
        
        const available = p.workingStatus === 'Open to Work' 
            ? ['Freelance', 'Full-time', 'Consulting'] 
            : ['Networking', 'Consulting'];

        return (
          <HireModal
            open={!!activeHireId}
            onClose={() => setActiveHireId(null)}
            name={p.fullName}
            photoURL={p.photoURL}
            contactEmail={p.email} // Passed correctly now
            contactWebsite={p.websiteURL} // Passed correctly now
            availableFor={available}
            recipientId={p.id}
          />
        );
      })()}
    </CommunityLayout>
  );
};

export default CommunityProfiles;
