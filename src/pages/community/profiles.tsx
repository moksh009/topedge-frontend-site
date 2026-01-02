import React, { useState, useEffect } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, MapPin, Briefcase, Globe, Github, Linkedin, ArrowRight, UserPlus, Sparkles, Terminal } from 'lucide-react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db, auth } from '@/services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface Profile {
  id: string;
  fullName: string;
  photoURL?: string;
  location?: string;
  currentWork?: string;
  companyName?: string;
  aiSkills?: string[];
  description?: string;
  websiteURL?: string;
  github?: string;
  linkedin?: string;
  workingStatus?: string;
  networkingIntent?: string[];
}

const CommunityProfiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(auth.currentUser);
  const [searchTerm, setSearchTerm] = useState('');

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

  return (
    <CommunityLayout>
      <div className="min-h-screen bg-[#F8F9FB] text-slate-900 font-sans selection:bg-indigo-500 selection:text-white pb-20">
        
        {/* Background Pattern */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        <div className="container relative mx-auto px-6 max-w-7xl pt-16">

          {/* ================= HERO SECTION ================= */}
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

          {/* ================= SEARCH TOOLBAR ================= */}
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

          {/* ================= GRID SECTION ================= */}
          {loading ? (
             <div className="flex flex-col items-center justify-center py-32 opacity-50">
                <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mb-4"></div>
                <p className="text-sm font-medium text-slate-500">Loading network...</p>
             </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12"
            >
              <AnimatePresence>
                {filteredProfiles.map((profile, index) => (
                  <motion.div
                    layout
                    key={profile.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative flex flex-col bg-white rounded-[32px] border border-slate-200 p-2 hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-1"
                  >
                    <div className="flex-1 p-6 flex flex-col rounded-[24px] bg-white relative overflow-hidden">
                      
                      {/* Top Action Row */}
                      <div className="flex justify-between items-start mb-6">
                         <div className="relative">
                            <div className="w-20 h-20 rounded-2xl bg-slate-100 p-1 shadow-inner overflow-hidden">
                                {profile.photoURL ? (
                                    <img src={profile.photoURL} alt={profile.fullName} className="w-full h-full rounded-xl object-cover" />
                                ) : (
                                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-xl font-bold text-slate-400">
                                        {profile.fullName.charAt(0)}
                                    </div>
                                )}
                            </div>
                            {profile.workingStatus && (
                                <div className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[9px] font-bold uppercase tracking-wide rounded-full border border-white shadow-sm truncate max-w-[80px]">
                                    {profile.workingStatus}
                                </div>
                            )}
                         </div>

                         {/* Social Stack */}
                         <div className="flex flex-col gap-2">
                            {profile.github && (
                                <a href={profile.github} target="_blank" className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-colors" title="GitHub">
                                    <Github className="w-4 h-4" />
                                </a>
                            )}
                            {profile.linkedin && (
                                <a href={profile.linkedin} target="_blank" className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-[#0077b5] hover:text-white transition-colors" title="LinkedIn">
                                    <Linkedin className="w-4 h-4" />
                                </a>
                            )}
                            {profile.websiteURL && (
                                <a href={profile.websiteURL} target="_blank" className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-indigo-600 hover:text-white transition-colors" title="Website">
                                    <Globe className="w-4 h-4" />
                                </a>
                            )}
                         </div>
                      </div>

                      {/* Info Block */}
                      <div className="mb-6">
                         <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                            {profile.fullName}
                         </h3>
                         <div className="mt-1 flex flex-col gap-0.5">
                             {profile.currentWork ? (
                                <span className="text-sm font-semibold text-slate-600">{profile.currentWork}</span>
                             ) : (
                                <span className="text-sm text-slate-400 italic">No role listed</span>
                             )}
                             {profile.companyName && (
                                <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                                   <Briefcase className="w-3 h-3" /> {profile.companyName}
                                </span>
                             )}
                         </div>
                      </div>

                      {/* Bio */}
                      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-8 min-h-[40px]">
                         {profile.description || "No bio provided yet."}
                      </p>

                      {/* Skills / Tech Stack */}
                      <div className="mt-auto">
                         <div className="flex items-center gap-2 mb-3">
                            <Terminal className="w-3.5 h-3.5 text-slate-400" />
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tech Stack</span>
                         </div>
                         <div className="flex flex-wrap gap-2">
                            {(profile.aiSkills || []).slice(0, 3).map((skill, idx) => (
                               <span key={idx} className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 text-slate-600 border border-slate-200">
                                  {skill}
                                </span>
                            ))}
                            {(profile.aiSkills || []).length > 3 && (
                                <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-50 text-slate-400 border border-slate-100">
                                  +{(profile.aiSkills || []).length - 3}
                                </span>
                            )}
                         </div>
                      </div>
                    </div>

                    {/* Bottom Link Area */}
                    <Link 
                      to={`/community/profile/${profile.id}`}
                      className="mt-2 mx-2 mb-2 py-4 rounded-[24px] bg-slate-50 border border-transparent text-slate-600 text-sm font-bold flex items-center justify-center gap-2 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300"
                    >
                        View Full Profile
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
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
    </CommunityLayout>
  );
};

export default CommunityProfiles;