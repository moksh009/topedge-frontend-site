import React, { useState, useEffect } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, MapPin, Github, Linkedin, 
  ArrowRight, UserPlus, Building2, ExternalLink 
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
  email?: string;
  github?: string;
  linkedin?: string;
  workingStatus?: string;
  networkingIntent?: string[];
  resourcesCount?: number;
  totalUpvotesReceived?: number;
}

const CommunityProfiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(auth.currentUser);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeHireId, setActiveHireId] = useState<string | null>(null);
  const [resourcesByUser, setResourcesByUser] = useState<Record<string, { count: number; upvotes: number }>>({});

  // REMOVED: Scroll listener logic that caused flickering

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
        const byUser: Record<string, { count: number; upvotes: number }> = {};
        rSnap.docs.forEach(d => {
          const data = d.data() as any;
          const uid = data.userId as string;
          if (!uid) return;
          if (!byUser[uid]) byUser[uid] = { count: 0, upvotes: 0 };
          byUser[uid].count += 1;
          byUser[uid].upvotes += ((data.upvotes ?? data.stars) || 0);
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

  const ProfileCard = ({ profile }: { profile: Profile }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="group relative flex flex-col bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200 overflow-hidden hover:border-indigo-200 hover:shadow-[0_20px_40px_-12px_rgba(79,70,229,0.1)] transition-all duration-300 hover:-translate-y-2 text-center h-full w-full"
    >
      {/* Banner */}
      <div className="h-28 sm:h-32 bg-gradient-to-br from-indigo-50 via-slate-50 to-purple-50 relative overflow-hidden">
          {profile.bannerURL ? (
            <img src={profile.bannerURL} alt="Banner" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', filter: 'contrast(120%) brightness(120%)' }}></div>
          )}
          
          <div className="absolute top-4 right-4 flex gap-2">
              {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" className="p-1.5 sm:p-2 rounded-full bg-white/60 backdrop-blur-md text-slate-600 hover:bg-[#0077b5] hover:text-white transition-all shadow-sm">
                      <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
              )}
              {profile.github && (
                  <a href={profile.github} target="_blank" className="p-1.5 sm:p-2 rounded-full bg-white/60 backdrop-blur-md text-slate-600 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                      <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
              )}
              {profile.websiteURL && (
                  <a href={profile.websiteURL} target="_blank" className="p-1.5 sm:p-2 rounded-full bg-white/60 backdrop-blur-md text-slate-600 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                      <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </a>
              )}
          </div>
      </div>

      <div className="px-4 sm:px-8 pb-6 sm:pb-8 flex-1 flex flex-col relative items-center">
        
        {/* Avatar */}
        <div className={cn(
          'w-40 h-40 sm:w-60 sm:h-60 rounded-[2rem] sm:rounded-[2.5rem] p-1.5 bg-white shadow-xl rotate-0 group-hover:rotate-1 transition-transform duration-300 relative z-10 -mt-12 sm:-mt-16',
          profile.workingStatus === 'Open to Work' ? 'ring-4 ring-emerald-100' : ''
        )}>
          {profile.photoURL ? (
            <img src={profile.photoURL} alt={profile.fullName} className="w-full h-full rounded-[1.7rem] sm:rounded-[2.1rem] object-cover bg-slate-100" />
          ) : (
            <div className="w-full h-full rounded-[1.7rem] sm:rounded-[2.1rem] bg-slate-100 flex items-center justify-center text-4xl sm:text-5xl font-bold text-slate-300">
                {profile.fullName.charAt(0)}
            </div>
          )}
        </div>
        
        {/* Identity */}
        <div className="mb-4 sm:mb-5 flex flex-col items-center mt-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight mb-1 group-hover:text-indigo-600 transition-colors">
              {profile.fullName}
            </h3>
            
            {/* Reputation */}
            {(() => {
              const r = resourcesByUser[profile.id] || { count: 0, upvotes: 0 };
              const resourcesArr = r.count === 0 ? [] : [{ userId: profile.id, upvotes: r.upvotes }];
              const rep = calculateReputation({ bio: profile.description, photoURL: profile.photoURL }, resourcesArr);
              return (
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border-slate-200">
                  <span>{rep.tier}</span>
                  <span className="text-slate-300">•</span>
                  <span>{rep.score} pts</span>
                </div>
              );
            })()}

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
        >
            View Profile
        </Link>
        {profile.workingStatus === 'Open to Work' && (
          <button
            onClick={() => setActiveHireId(profile.id)}
            className="block w-full p-2.5 sm:p-3 text-center rounded-[1.2rem] sm:rounded-[1.5rem] bg-emerald-600 text-xs sm:text-sm font-bold text-white hover:bg-emerald-700 transition-all shadow-md"
          >
            Hire Me
          </button>
        )}
      </div>
    </motion.div>
  );

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
              className="w-full sm:w-auto flex justify-center lg:justify-end"
            >
              <Link 
                to="/community/promote-profile"
                className="group w-auto relative inline-flex items-center justify-center gap-3 px-6 py-3.5 sm:px-8 sm:py-4 bg-slate-900 text-white rounded-2xl font-bold overflow-hidden shadow-xl shadow-slate-200 hover:-translate-y-1 transition-all"
              >
                <span className="relative text-sm sm:text-base">Create Public Profile</span>
                <ArrowRight className="w-4 h-4 relative transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>

          {/* --- FIXED SEARCH BAR (No Flickering) --- */}
          {/* Changed 'sticky top-20' to 'relative' so it stays on page */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
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
                const myProfiles = filteredProfiles.filter(p => p.id === (user?.uid || ''));
                const otherProfiles = filteredProfiles.filter(p => p.id !== (user?.uid || ''));
                const isPreLaunch = new Date() < new Date('2026-01-19');
                
                return (
                  <>
                    {myProfiles.length > 0 && (
                      <div className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Your Profile</h2>
                          <Link to={`/community/profile/${myProfiles[0].id}`} className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">View</Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {myProfiles.map((profile) => <ProfileCard key={profile.id} profile={profile} />)}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Community Profiles</h2>
                      <span className="text-xs sm:text-sm font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">Locked until launch</span>
                    </div>
                    
                    <LaunchGate
                      active={isPreLaunch}
                      title="Profiles visible after launch"
                      description="Create your profile now. Directory unlocks on launch day."
                    >
                      {/* Grid with mobile height restriction */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-12 max-h-[500px] md:max-h-none overflow-hidden">
                        {otherProfiles.map((profile) => <ProfileCard key={profile.id} profile={profile} />)}
                      </div>
                    </LaunchGate>
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