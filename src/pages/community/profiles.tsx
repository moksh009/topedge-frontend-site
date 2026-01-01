import React, { useState, useEffect } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { motion } from 'framer-motion';
import { Plus, Search, MapPin, Briefcase, Globe, Github, Linkedin, User } from 'lucide-react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db, auth } from '@/services/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';

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
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Community Profiles</h1>
              <p className="text-gray-500 max-w-xl text-lg">
                Connect with talented developers, AI specialists, and automation experts.
              </p>
            </div>
            
            <Link 
              to="/community/promote-profile"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all flex items-center gap-2 shadow-md"
            >
              <Plus className="w-5 h-5" />
              Promote My Profile
            </Link>
          </div>

          {/* Search */}
          <div className="relative mb-12 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text"
              placeholder="Search by name, role, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-sm"
            />
          </div>

          {/* Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProfiles.map((profile, index) => (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white rounded-[2rem] p-8 shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 transition-all border border-gray-100 relative overflow-hidden"
                >
                  {/* Decorative gradient blob */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-bl-[4rem] -z-0 transition-transform group-hover:scale-110" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-24 h-24 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-md ring-4 ring-white">
                          {profile.photoURL ? (
                            <img src={profile.photoURL} alt={profile.fullName} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                              {profile.fullName.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">{profile.fullName}</h3>
                          {profile.currentWork && (
                            <p className="text-sm text-blue-600 font-medium">{profile.currentWork}</p>
                          )}
                        </div>
                      </div>
                      {profile.workingStatus && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 text-gray-700 text-xs font-semibold rounded-full border border-gray-200">
                          {profile.workingStatus}
                        </span>
                      )}
                    </div>

                    <div className="mb-6 space-y-2">
                       <div className="flex items-center gap-2 text-gray-500 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>{profile.location || '—'}</span>
                       </div>
                       {profile.companyName && (
                         <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <Briefcase className="w-4 h-4" />
                            <span>{profile.companyName}</span>
                         </div>
                       )}
                    </div>

                    <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed text-sm min-h-[60px]">
                      {profile.description || ''}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8 min-h-[52px]">
                      {(profile.networkingIntent || []).slice(0, 3).map((intent, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-white text-gray-700 text-xs font-medium rounded-lg border border-gray-200"
                        >
                          {intent}
                        </span>
                      ))}
                      {(profile.aiSkills || []).slice(0, 3).map((skill, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-lg border border-gray-100 group-hover:border-blue-100 group-hover:bg-blue-50/50 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                      {(profile.aiSkills || []).length > 3 && (
                        <span className="px-3 py-1 bg-gray-50 text-gray-400 text-xs font-medium rounded-lg border border-gray-100">
                          +{(profile.aiSkills || []).length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
                      {profile.github && (
                        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all">
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {profile.linkedin && (
                        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {profile.websiteURL && (
                        <a href={profile.websiteURL} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all">
                          <Globe className="w-5 h-5" />
                        </a>
                      )}
                      <Link 
                        to={`/community/profile/${profile.id}`}
                        className="ml-auto px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg transition-all shadow-md"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </CommunityLayout>
  );
};

export default CommunityProfiles;
