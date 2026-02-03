import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '@/services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { UserProfile, ADMIN_EMAILS } from '@/types/user';
import { emailService } from '@/services/emailService';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  isAdmin: false,
  refreshProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchUserProfile = async (uid: string) => {
    try {
      const docRef = doc(db, 'public_profiles', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as UserProfile;
        setUserProfile(data);
        return data;
      } else {
        setUserProfile(null);
        return null;
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  const checkAndSendAutomationEmails = async (profile: UserProfile, uid: string, email: string) => {
    if (!profile || !email) return;

    const now = new Date();
    // specific check for createdAt - handle both Firestore Timestamp and Date object
    let createdAt = now;
    if (profile.createdAt) {
      createdAt = typeof profile.createdAt.toDate === 'function' 
        ? profile.createdAt.toDate() 
        : new Date(profile.createdAt);
    }
    
    const daysSinceJoined = (now.getTime() - createdAt.getTime()) / (1000 * 3600 * 24);
    const isProfileComplete = Boolean(profile.bio && profile.aiSkills && profile.aiSkills.length > 0 && profile.location);

    const updates: any = {};
    let needsUpdate = false;

    // 1. Welcome Email
    if (!profile.welcomeEmailSent) {
      await emailService.sendWelcomeEmail(email, profile.fullName || 'User');
      updates.welcomeEmailSent = true;
      needsUpdate = true;
    }

    // 2. Profile Completion Reminder
    // Handled by server-side scheduled function (netlify/functions/scheduled-email-automation.js)
    // to ensure reliable delivery even if user doesn't log in.

    // 3. Resource Nudge (Only if profile is complete)
    // Handled by server-side scheduled function.

    if (needsUpdate) {
       try {
         await setDoc(doc(db, 'public_profiles', uid), updates, { merge: true });
         // Update local state to reflect changes without re-fetching
         setUserProfile(prev => prev ? ({ ...prev, ...updates }) : null);
       } catch (e) {
         console.error("Failed to update profile email stats", e);
       }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setIsAdmin(ADMIN_EMAILS.includes(currentUser.email || ''));
        const profile = await fetchUserProfile(currentUser.uid);
        if (profile) {
            checkAndSendAutomationEmails(profile, currentUser.uid, currentUser.email || '');
        }
      } else {
        setUserProfile(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile(user.uid);
    }
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, isAdmin, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
