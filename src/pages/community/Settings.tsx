import React, { useState, useEffect, useRef } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { onAuthStateChanged, updateProfile, sendPasswordResetEmail, deleteUser, signOut } from 'firebase/auth';
import { auth, db, storage } from '@/services/firebase';
import { doc, setDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { Loader2, User, Mail, Shield, Save, LogOut, Trash2, Camera, KeyRound, BellRing } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';

const Settings = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const [cropZoom, setCropZoom] = useState(1);
  const [cropOffset, setCropOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const { refreshProfile, userProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cropImageRef = useRef<HTMLImageElement | null>(null);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);

  const clampProfileOffset = (next: { x: number; y: number }, zoom: number) => {
    const img = cropImageRef.current;
    if (!img) return next;
    const canvasSize = 288;
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
    if (!naturalWidth || !naturalHeight) return next;
    const baseScale = Math.max(canvasSize / naturalWidth, canvasSize / naturalHeight);
    const scale = baseScale * zoom;
    const scaledWidth = naturalWidth * scale;
    const scaledHeight = naturalHeight * scale;
    const maxX = Math.max(0, (scaledWidth - canvasSize) / 2);
    const maxY = Math.max(0, (scaledHeight - canvasSize) / 2);
    let x = next.x;
    let y = next.y;
    if (x > maxX) x = maxX;
    if (x < -maxX) x = -maxX;
    if (y > maxY) y = maxY;
    if (y < -maxY) y = -maxY;
    return { x, y };
  };

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

  const uploadCroppedPhoto = async (blob: Blob) => {
    if (!user) return;
    setUploadingPhoto(true);
    const toastId = toast.loading("Uploading photo...");
    try {
      const storageRef = ref(storage, `profile_photos/${user.uid}`);
      await uploadBytes(storageRef, blob);
      const photoURL = await getDownloadURL(storageRef);
      await updateProfile(user, { photoURL });
      const userDocRef = doc(db, 'public_profiles', user.uid);
      await setDoc(userDocRef, { photoURL }, { merge: true });
      await refreshProfile();
      setUser({ ...user, photoURL });
      toast.success("Profile photo updated!", { id: toastId });
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload photo", { id: toastId });
    } finally {
      setUploadingPhoto(false);
      setIsCropOpen(false);
      setCropImageSrc(null);
      setCropZoom(1);
      setCropOffset({ x: 0, y: 0 });
      setIsDragging(false);
      dragStartRef.current = null;
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    const src = URL.createObjectURL(file);
    setCropImageSrc(src);
    setIsCropOpen(true);
    setCropZoom(1);
    setCropOffset({ x: 0, y: 0 });
    if (e.target) e.target.value = '';
  };

  const handleCropPointerDown = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    const point = 'touches' in e ? e.touches[0] : (e as React.MouseEvent);
    dragStartRef.current = { x: point.clientX, y: point.clientY };
  };

  const handleCropPointerMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStartRef.current) return;
    const point = 'touches' in e ? e.touches[0] : (e as React.MouseEvent);
    const dx = point.clientX - dragStartRef.current.x;
    const dy = point.clientY - dragStartRef.current.y;
    dragStartRef.current = { x: point.clientX, y: point.clientY };
    setCropOffset(prev => clampProfileOffset({ x: prev.x + dx, y: prev.y + dy }, cropZoom));
  };

  const handleCropPointerUp = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  const handleCropSave = () => {
    if (!cropImageSrc || !user) return;
    const img = cropImageRef.current;
    if (!img) return;
    const previewSize = 288;
    const outputSize = 512;
    const canvas = document.createElement('canvas');
    canvas.width = outputSize;
    canvas.height = outputSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
    if (!naturalWidth || !naturalHeight) return;
    const baseScalePreview = Math.max(previewSize / naturalWidth, previewSize / naturalHeight);
    const scale = baseScalePreview * cropZoom * (outputSize / previewSize);
    const offsetNormX = cropOffset.x / previewSize;
    const offsetNormY = cropOffset.y / previewSize;
    ctx.clearRect(0, 0, outputSize, outputSize);
    ctx.save();
    ctx.translate(outputSize / 2 + offsetNormX * outputSize, outputSize / 2 + offsetNormY * outputSize);
    ctx.scale(scale, scale);
    ctx.drawImage(img, -naturalWidth / 2, -naturalHeight / 2);
    ctx.restore();
    canvas.toBlob(blob => {
      if (!blob) {
        toast.error("Failed to process image");
        return;
      }
      uploadCroppedPhoto(blob);
    }, 'image/jpeg', 0.9);
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
    if (!user || deleting) return;
    const toastId = toast.loading("Deleting your account...");
    setDeleting(true);
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
    } finally {
      setDeleting(false);
      setShowDeleteConfirm(false);
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
                onClick={() => setShowDeleteConfirm(true)}
                disabled={deleting}
                className="px-6 py-3 bg-white border border-rose-200 text-rose-600 font-bold rounded-xl hover:bg-rose-50 hover:border-rose-300 transition-all flex items-center gap-2 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
               >
                  <Trash2 className="w-4 h-4" />
                  Delete Account
               </button>
            </div>

          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {isCropOpen && cropImageSrc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => !uploadingPhoto && setIsCropOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 z-10"
            >
              <h2 className="text-lg font-bold text-slate-900 mb-2">Adjust profile photo</h2>
              <p className="text-sm text-slate-500 mb-4">
                Drag to reposition and use the slider to zoom.
              </p>
              <div
                className="mx-auto mb-4 w-72 h-72 rounded-2xl bg-slate-900 overflow-hidden relative touch-none"
                onMouseDown={handleCropPointerDown}
                onMouseMove={handleCropPointerMove}
                onMouseUp={handleCropPointerUp}
                onMouseLeave={handleCropPointerUp}
                onTouchStart={handleCropPointerDown}
                onTouchMove={handleCropPointerMove}
                onTouchEnd={handleCropPointerUp}
              >
                {cropImageSrc && (
                  <img
                    ref={cropImageRef}
                    src={cropImageSrc}
                    alt="Crop"
                    className="absolute inset-0 m-auto select-none"
                    style={{
                      transform: `translate3d(${cropOffset.x}px, ${cropOffset.y}px, 0) scale(${cropZoom})`,
                      transformOrigin: 'center center'
                    }}
                    draggable={false}
                  />
                )}
              </div>
              <div className="mb-6">
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.05}
                  value={cropZoom}
                  onChange={e => {
                    const z = parseFloat(e.target.value);
                    setCropZoom(z);
                    setCropOffset(prev => clampProfileOffset(prev, z));
                  }}
                  className="w-full accent-slate-900"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCropOpen(false)}
                  disabled={uploadingPhoto}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCropSave}
                  disabled={uploadingPhoto}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-sm font-bold text-white hover:bg-slate-800 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {uploadingPhoto ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                  Save
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showDeleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => !deleting && setShowDeleteConfirm(false)}
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
                  <h2 className="text-lg font-bold text-slate-900">Delete account?</h2>
                  <p className="text-sm text-slate-500">
                    This will permanently remove your account and your community resources.
                  </p>
                </div>
              </div>
              <p className="text-xs text-rose-500 font-medium mb-6">
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={deleting}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 text-sm font-bold text-white hover:bg-rose-700 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
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

export default Settings;
