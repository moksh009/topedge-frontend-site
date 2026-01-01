import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { motion } from 'framer-motion';
import { doc, getDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { UserProfile } from '@/types/user';
import { ArrowLeft, Loader2, Edit2, Globe, Mail, MapPin, Briefcase, User, Building, Brain, ArrowRight, Phone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

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
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      try {
        // Fetch Profile
        const docRef = doc(db, 'public_profiles', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
          
          // Fetch User's Resources
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
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </CommunityLayout>
    );
  }

  if (!profile) {
    return (
      <CommunityLayout>
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h1>
          <p className="text-gray-600 mb-8">The profile you are looking for does not exist.</p>
          <Link to="/community/profiles" className="text-blue-600 hover:underline">
            Back to Community
          </Link>
        </div>
      </CommunityLayout>
    );
  }

  const isOwner = user?.uid === profile.uid;

  return (
    <CommunityLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
          >
            {/* Header Banner */}
            <div className="h-48 bg-white/10 backdrop-blur-xl relative border-b border-white/20">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.3),_transparent_60%)]" />
              <div className="absolute top-6 left-6">
                  <Link to="/community/profiles" className="text-white/80 hover:text-white flex items-center gap-2 transition-colors">
                      <ArrowLeft className="w-5 h-5" />
                      Back to Profiles
                  </Link>
              </div>
              {isOwner && (
                <Link 
                  to="/community/promote-profile?edit=1"
                  className="absolute top-6 right-6 bg-white/30 backdrop-blur-md text-gray-900 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/40 transition-all font-medium border border-white/50"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </Link>
              )}
            </div>

            {/* Profile Info */}
            <div className="px-8 pb-12 relative">
              <div className="flex flex-col md:flex-row items-start gap-6 -mt-16 mb-8">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white ring-4 ring-blue-100">
                  {profile.photoURL ? (
                    <img src={profile.photoURL} alt={profile.fullName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <User className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="pt-16 md:pt-0 mt-2 flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.fullName}</h1>
                  <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-4">
                    {profile.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {profile.location}
                      </span>
                    )}
                    {profile.companyName && (
                      <span className="flex items-center gap-1">
                        <Building className="w-4 h-4" /> {profile.companyName}
                      </span>
                    )}
                    {profile.currentWork && (
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" /> {profile.currentWork}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="md:col-span-2 space-y-8">
                  {profile.description && (
                    <section>
                      <h2 className="text-lg font-bold text-gray-900 mb-3">About</h2>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{profile.description}</p>
                    </section>
                  )}

                  {profile.buildingInAI && (
                    <section className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                      <h2 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                        <Brain className="w-5 h-5" />
                        Building in AI
                      </h2>
                      <p className="text-blue-800 leading-relaxed">{profile.buildingInAI}</p>
                    </section>
                  )}

                  {profile.aiSkills && profile.aiSkills.length > 0 && (
                    <section>
                      <h2 className="text-lg font-bold text-gray-900 mb-3">AI Skills</h2>
                      <div className="flex flex-wrap gap-2">
                        {profile.aiSkills.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  <div className="bg-white/50 backdrop-blur-xl p-6 rounded-2xl border border-white/40 shadow-sm">
                    <h3 className="font-semibold text-gray-900 mb-4">Details</h3>
                    <div className="space-y-4 text-sm">
                      {profile.age && (
                          <div className="flex justify-between">
                              <span className="text-gray-500">Age</span>
                              <span className="text-gray-900 font-medium">{profile.age}</span>
                          </div>
                      )}
                      {profile.gender && (
                          <div className="flex justify-between">
                              <span className="text-gray-500">Gender</span>
                              <span className="text-gray-900 font-medium">{profile.gender}</span>
                          </div>
                      )}
                      {profile.workingStatus && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Working Status</span>
                          <span className="text-gray-900 font-medium">{profile.workingStatus}</span>
                        </div>
                      )}
                      {profile.networkingIntent && profile.networkingIntent.length > 0 && (
                        <div>
                          <span className="text-gray-500 block mb-2">Networking Intent</span>
                          <div className="flex flex-wrap gap-2">
                            {profile.networkingIntent.map((intent, idx) => (
                              <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                {intent}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white/50 backdrop-blur-xl p-6 rounded-2xl border border-white/40 shadow-sm">
                    <h3 className="font-semibold text-gray-900 mb-4">Contact & Links</h3>
                    <div className="space-y-4">
                      {profile.websiteURL && (
                        <a href={profile.websiteURL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors">
                          <Globe className="w-5 h-5" />
                          <span className="truncate">Website</span>
                        </a>
                      )}
                      {profile.contactDetails && (
                        <div className="flex items-center gap-3 text-gray-600">
                          <Mail className="w-5 h-5" />
                          <span className="truncate">{profile.contactDetails}</span>
                        </div>
                      )}
                      {profile.phoneNumber && (
                        <div className="flex items-center gap-3 text-gray-600">
                          <Phone className="w-5 h-5" />
                          <span className="truncate">{profile.phoneNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

              {/* User Resources Section */}
              {resources.length > 0 && (
                <div className="mt-16 border-t border-gray-100 pt-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">Uploaded Resources</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {resources.map((resource) => (
                      <Link 
                        key={resource.id}
                        to={`/community/resource/${resource.id}`}
                        className="group relative bg-white border border-gray-200 rounded-[2rem] p-6 overflow-hidden hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 shadow-sm ring-1 ring-gray-100 hover:ring-blue-100"
                      >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-purple-50 rounded-bl-[3rem] -z-0 transition-transform group-hover:scale-110" />
                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                              <span className="px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-xs font-bold uppercase tracking-wider border border-gray-200">
                                {resource.category}
                              </span>
                              <span className={resource.isPaid ? "px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100" : "px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100"}>
                                {resource.isPaid ? `$${resource.price}` : 'Free'}
                              </span>
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {resource.title}
                          </h3>
                          <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                            {resource.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-6">
                            {resource.tools.slice(0, 3).map((tool, i) => (
                              <span key={i} className="text-xs font-medium text-gray-600 bg-gray-50 border border-gray-100 px-2.5 py-1.5 rounded-lg group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                                {tool}
                              </span>
                            ))}
                            {resource.tools.length > 3 && (
                              <span className="text-xs font-medium text-gray-500 bg-gray-50 border border-gray-100 px-2.5 py-1.5 rounded-lg">
                                +{resource.tools.length - 3}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-start">
                            <span className="inline-flex items-center gap-1.5 text-blue-600 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                              View Details <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </CommunityLayout>
  );
};

export default ProfileDetails;
