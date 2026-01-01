import React, { useState, useEffect } from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Settings = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/community/login');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-gray-900 w-8 h-8" />
      </div>
    );
  }

  return (
    <CommunityLayout>
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Settings</h1>
          
          <div className="bg-white border border-gray-200 rounded-3xl p-8 space-y-8 shadow-sm">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Account Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <input 
                    type="email" 
                    value={user?.email || ''} 
                    disabled 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-500">Display Name</label>
                  <input 
                    type="text" 
                    value={user?.displayName || ''} 
                    disabled 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Notifications</h2>
              <div className="flex items-center justify-between py-3 border-b border-gray-50">
                <span className="text-gray-700">Email Notifications</span>
                <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-gray-50">
                <span className="text-gray-700">Marketing Emails</span>
                <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100">
              <button className="px-6 py-3 bg-red-50 text-red-600 border border-red-100 rounded-xl hover:bg-red-100 transition-colors font-medium">
                  Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </CommunityLayout>
  );
};

export default Settings;
