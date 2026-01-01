import React, { useState, useEffect } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Edit2, Globe, Mail, MapPin, Briefcase, User, Building, Brain, Phone } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { UserProfile } from '@/types/user';

const PromoteProfile = () => {
  const navigate = useNavigate();
  const { user, userProfile, loading: authLoading, refreshProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

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
    workOpenFor: '',
    contactDetails: '',
    lookingToGetHired: false
  });

  const [skillsInput, setSkillsInput] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/community/login');
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (userProfile) {
      setFormData({
        ...userProfile,
        aiSkills: userProfile.aiSkills || []
      });
      setSkillsInput(userProfile.aiSkills?.join(', ') || '');
      setIsEditing(false);
    } else if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.displayName || '',
        photoURL: user.photoURL || '',
        contactDetails: user.email || ''
      }));
      setIsEditing(true);
    }
  }, [userProfile, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
        const target = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: target.checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkillsInput(e.target.value);
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
        workOpenFor: formData.workOpenFor || '',
        contactDetails: formData.contactDetails || '',
        lookingToGetHired: formData.lookingToGetHired || false,
        createdAt: userProfile?.createdAt || serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      await setDoc(doc(db, 'public_profiles', user.uid), profileData);
      await refreshProfile();
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setSaving(false);
    }
  };

  if (authLoading) {
    return (
      <CommunityLayout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </CommunityLayout>
    );
  }

  // View Mode (Profile Details)
  if (userProfile && !isEditing) {
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
              <div className="h-48 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 relative">
                <div className="absolute top-6 left-6">
                    <Link to="/community/profiles" className="text-white/80 hover:text-white flex items-center gap-2 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Profiles
                    </Link>
                </div>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="absolute top-6 right-6 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/30 transition-all font-medium border border-white/30"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>

              {/* Profile Info */}
              <div className="px-8 pb-12 relative">
                <div className="flex flex-col md:flex-row items-start gap-6 -mt-16 mb-8">
                  <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                    {userProfile.photoURL ? (
                      <img src={userProfile.photoURL} alt={userProfile.fullName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <User className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="pt-16 md:pt-0 mt-2 flex-1">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{userProfile.fullName}</h1>
                    <div className="flex flex-wrap gap-4 text-gray-600 text-sm mb-4">
                      {userProfile.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" /> {userProfile.location}
                        </span>
                      )}
                      {userProfile.companyName && (
                        <span className="flex items-center gap-1">
                          <Building className="w-4 h-4" /> {userProfile.companyName}
                        </span>
                      )}
                      {userProfile.currentWork && (
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" /> {userProfile.currentWork}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Left Column */}
                  <div className="md:col-span-2 space-y-8">
                    {userProfile.description && (
                      <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">About</h2>
                        <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{userProfile.description}</p>
                      </section>
                    )}

                    {userProfile.buildingInAI && (
                      <section className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                        <h2 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                          <Brain className="w-5 h-5" />
                          Building in AI
                        </h2>
                        <p className="text-blue-800 leading-relaxed">{userProfile.buildingInAI}</p>
                      </section>
                    )}

                    {userProfile.aiSkills && userProfile.aiSkills.length > 0 && (
                      <section>
                        <h2 className="text-lg font-bold text-gray-900 mb-3">AI Skills</h2>
                        <div className="flex flex-wrap gap-2">
                          {userProfile.aiSkills.map((skill, index) => (
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
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                      <h3 className="font-semibold text-gray-900 mb-4">Details</h3>
                      <div className="space-y-4 text-sm">
                        {userProfile.age && (
                            <div className="flex justify-between">
                                <span className="text-gray-500">Age</span>
                                <span className="text-gray-900 font-medium">{userProfile.age}</span>
                            </div>
                        )}
                        {userProfile.gender && (
                            <div className="flex justify-between">
                                <span className="text-gray-500">Gender</span>
                                <span className="text-gray-900 font-medium">{userProfile.gender}</span>
                            </div>
                        )}
                        {userProfile.lookingToGetHired && (
                          <div className="flex items-center gap-2 text-green-600 font-medium bg-green-50 p-2 rounded-lg justify-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            Open to Opportunities
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                      <h3 className="font-semibold text-gray-900 mb-4">Contact & Links</h3>
                      <div className="space-y-4">
                        {userProfile.websiteURL && (
                          <a href={userProfile.websiteURL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors">
                            <Globe className="w-5 h-5" />
                            <span className="truncate">Website</span>
                          </a>
                        )}
                        {userProfile.contactDetails && (
                          <div className="flex items-center gap-3 text-gray-600">
                            <Mail className="w-5 h-5" />
                            <span className="truncate">{userProfile.contactDetails}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </CommunityLayout>
    );
  }

  // Edit Mode (Form)
  return (
    <CommunityLayout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-8">
                {userProfile && (
                    <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                )}
                <h1 className="text-3xl font-bold text-gray-900">
                    {userProfile ? 'Edit Your Profile' : 'Promote Your Profile'}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 space-y-8">
              {/* Basic Info */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Basic Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Photo URL</label>
                    <input
                      type="url"
                      name="photoURL"
                      value={formData.photoURL}
                      onChange={handleChange}
                      placeholder="https://..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Age</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age || ''}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    >
                      <option value="">Select...</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Professional Info */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Professional Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Current Role/Business</label>
                    <input
                      type="text"
                      name="currentWork"
                      value={formData.currentWork}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Website URL</label>
                  <input
                    type="url"
                    name="websiteURL"
                    value={formData.websiteURL}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">What I'm Building in AI</label>
                  <textarea
                    name="buildingInAI"
                    value={formData.buildingInAI}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Briefly describe your current AI project..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Description / Bio</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">AI Skills (comma separated)</label>
                  <input
                    type="text"
                    value={skillsInput}
                    onChange={handleSkillsChange}
                    placeholder="Python, OpenAI, TensorFlow, etc."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              {/* Preferences */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Preferences & Contact</h2>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Work Open For</label>
                  <input
                    type="text"
                    name="workOpenFor"
                    value={formData.workOpenFor}
                    onChange={handleChange}
                    placeholder="Freelance, Full-time, Consulting..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Contact Details (Email/Phone)</label>
                  <input
                    type="text"
                    name="contactDetails"
                    value={formData.contactDetails}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <input
                    type="checkbox"
                    name="lookingToGetHired"
                    checked={formData.lookingToGetHired}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                  />
                  <label className="text-gray-900 font-medium">I am looking to get hired</label>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving Profile...
                    </>
                  ) : (
                    'Save Profile'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </CommunityLayout>
  );
};

export default PromoteProfile;
