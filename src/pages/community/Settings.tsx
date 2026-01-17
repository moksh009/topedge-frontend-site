import React, { useState, useEffect, useRef } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { onAuthStateChanged, updateProfile, sendPasswordResetEmail, deleteUser, signOut } from 'firebase/auth';
import { auth, db, storage } from '@/services/firebase';
import { doc, setDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { Loader2, User, Mail, Shield, Save, LogOut, Trash2, Camera, KeyRound, BellRing } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';

const Settings = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();
  const { refreshProfile, userProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || '');
      } else {
        navigate('/community/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    const toastId = toast.loading("Uploading photo...");
    try {
      const storageRef = ref(storage, `profile_photos/${user.uid}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);

      // Update Auth Profile
      await updateProfile(user, { photoURL });

      // Update Firestore Profile
      const userDocRef = doc(db, 'public_profiles', user.uid);
      await setDoc(userDocRef, { photoURL }, { merge: true });

      // Refresh Context
      await refreshProfile();
      
      // Update local state
      setUser({ ...user, photoURL });

      toast.success("Profile photo updated!", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload photo", { id: toastId });
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await updateProfile(user, { displayName });
      
      // Also update Firestore
      const userDocRef = doc(db, 'public_profiles', user.uid);
      await setDoc(userDocRef, { displayName }, { merge: true });
      
      await refreshProfile();
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!user?.email) return;
    try {
      await sendPasswordResetEmail(auth, user.email);
      toast.success(`Password reset email sent to ${user.email}`);
    } catch (error) {
      toast.error("Failed to send reset email");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out successfully");
      navigate('/community/login');
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign out");
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This will permanently remove your account and your community resources. This action cannot be undone."
    );
    if (!confirmed) return;

    const toastId = toast.loading("Deleting your account...");

    try {
      const resourcesQ = query(
        collection(db, 'community_resources'),
        where('userId', '==', user.uid)
      );
      const resourcesSnap = await getDocs(resourcesQ);
      for (const docSnap of resourcesSnap.docs) {
        try {
          await deleteDoc(docSnap.ref);
        } catch (e) {
          console.error('Failed to delete resource while deleting account:', e);
        }
      }

      try {
        await deleteDoc(doc(db, 'public_profiles', user.uid));
      } catch (e) {
        console.error('Failed to delete public profile while deleting account:', e);
      }

      try {
        await deleteUser(user);
      } catch (error: any) {
        console.error('Failed to delete auth user:', error);
        let message = "Failed to delete account. Please try again.";
        if (error?.code === 'auth/requires-recent-login') {
          message = "For security, please log in again and then delete your account.";
        }
        toast.error(message, { id: toastId });
        return;
      }

      toast.success("Your account has been deleted.", { id: toastId });
      navigate('/community/automation-hub');
    } catch (error) {
      console.error('Error during account deletion:', error);
      toast.error("Something went wrong while deleting your account.", { id: toastId });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center">
        <Loader2 className="animate-spin text-slate-900 w-8 h-8" />
      </div>
    );
  }

  return (
    <CommunityLayout>
      <div className="min-h-screen bg-[#F8F9FB] py-20 font-sans text-slate-900">
        
        {/* Background Pattern */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

        <div className="container relative mx-auto px-4 max-w-3xl">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">Account Settings</h1>
            <p className="text-slate-500 text-lg">Manage your personal information and security preferences.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-8"
          >
            {/* ================= PROFILE SECTION ================= */}
            <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                   <User className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Personal Information</h2>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-start">
                
                {/* Avatar Section */}
                <div className="flex flex-col items-center gap-3">
                   <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handlePhotoUpload} 
                        accept="image/*" 
                        className="hidden" 
                      />
                      <div className="w-24 h-24 rounded-full border-4 border-slate-50 bg-slate-100 overflow-hidden shadow-inner">
                         {userProfile?.photoURL || user?.photoURL ? (
                            <img
                              src={userProfile?.photoURL || user?.photoURL || ''}
                              alt="Profile"
                              className="w-full h-full object-cover"
                            />
                         ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                               <User className="w-10 h-10" />
                            </div>
                         )}
                      </div>
                      <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                         <Camera className="w-6 h-6" />
                      </div>
                   </div>
                   <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Profile Photo</span>
                </div>

                {/* Inputs */}
                <div className="flex-1 w-full space-y-5">
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Display Name</label>
                      <input 
                        type="text" 
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                        placeholder="Your Name"
                      />
                   </div>

                   <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Email Address</label>
                      <div className="relative">
                         <input 
                           type="email" 
                           value={user?.email || ''} 
                           disabled 
                           className="w-full px-5 py-3 pl-12 bg-slate-50/50 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed font-medium"
                         />
                         <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                         <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                            VERIFIED
                         </div>
                      </div>
                   </div>

                   <div className="pt-4">
                      <button 
                        onClick={handleUpdateProfile}
                        disabled={saving}
                        className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-slate-200 flex items-center gap-2 disabled:opacity-50"
                      >
                         {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                         Save Changes
                      </button>
                   </div>
                </div>
              </div>
            </div>

            {/* ================= SECURITY & PREFS ================= */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               
               {/* Security */}
               <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm h-full">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <Shield className="w-5 h-5" />
                     </div>
                     <h2 className="text-lg font-bold text-slate-900">Security</h2>
                  </div>
                  
                  <div className="space-y-4">
                     <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                        <div className="flex items-start justify-between mb-2">
                           <div className="font-semibold text-slate-900 text-sm">Password</div>
                           <KeyRound className="w-4 h-4 text-slate-400" />
                        </div>
                        <p className="text-xs text-slate-500 mb-4">
                           Last changed: Never
                        </p>
                        <button 
                           onClick={handlePasswordReset}
                           className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
                        >
                           Send Reset Link
                        </button>
                     </div>
                  </div>
               </div>

               {/* Notifications (Simplified) */}
               <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm h-full">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                        <BellRing className="w-5 h-5" />
                     </div>
                     <h2 className="text-lg font-bold text-slate-900">Preferences</h2>
                  </div>

                  <div className="space-y-4">
                     <div className="flex items-center justify-between p-1">
                        <div>
                           <div className="text-sm font-bold text-slate-900">Product Updates</div>
                           <div className="text-xs text-slate-500">Receive news about new features</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                           <input type="checkbox" className="sr-only peer" defaultChecked />
                           <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-900"></div>
                        </label>
                     </div>
                  </div>
               </div>

               {/* Session */}
               <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm h-full">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-700">
                        <LogOut className="w-5 h-5" />
                     </div>
                     <h2 className="text-lg font-bold text-slate-900">Session</h2>
                  </div>
                  <div className="space-y-4">
                     <p className="text-sm text-slate-500">
                        Sign out of your account on this device.
                     </p>
                     <button
                       onClick={handleLogout}
                       className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                     >
                       <LogOut className="w-4 h-4" />
                       Log Out
                     </button>
                  </div>
               </div>
            </div>

            {/* ================= DANGER ZONE ================= */}
            <div className="bg-rose-50/30 border border-rose-100 rounded-[2rem] p-8">
               <h2 className="text-lg font-bold text-rose-700 mb-2">Danger Zone</h2>
               <p className="text-sm text-rose-600/80 mb-6">
                  Once you delete your account, there is no going back. Please be certain.
               </p>
               <button
                 onClick={handleDeleteAccount}
                 className="px-6 py-3 bg-white border border-rose-200 text-rose-600 font-bold rounded-xl hover:bg-rose-50 hover:border-rose-300 transition-all flex items-center gap-2 shadow-sm"
               >
                  <Trash2 className="w-4 h-4" />
                  Delete Account
               </button>
            </div>

          </motion.div>
        </div>
      </div>
    </CommunityLayout>
  );
};

export default Settings;
