import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CommunitySEO from '@/components/community/CommunitySEO';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '@/services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, User, Mail, Lock, AlertCircle, ChevronRight } from 'lucide-react';

// Define Interface for Firebase Errors
interface FirebaseError {
  code: string;
  message: string;
}

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // 1. Create Auth User
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Update Profile Name
      await updateProfile(user, { displayName: name });

      // 3. Save to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: user.email,
        createdAt: new Date().toISOString(),
        role: 'member',
      });

      navigate('/community/home');
    } catch (err: unknown) {
      console.error(err);
      const firebaseError = err as FirebaseError;
      
      if (firebaseError.code === 'auth/email-already-in-use') {
        setError('This email is already associated with an account.');
      } else if (firebaseError.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError('Failed to create account. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#F8F9FA] relative overflow-hidden font-sans">
      <CommunitySEO 
        title="Join TopEdge AI Community - Sign Up"
        description="Create your account to access exclusive AI resources, tools, and connect with the community."
        url="/community/signup"
      />
      
      {/* --- Premium Ambient Background --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        {/* Softer, more elegant blurred orbs */}
        <div className="hidden md:block absolute top-[-10%] right-[-5%] h-[600px] w-[600px] rounded-full bg-blue-50/80 blur-[120px]" />
        <div className="hidden md:block absolute bottom-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-purple-50/80 blur-[120px]" />
      </div>

      {/* --- Navigation --- */}
      <div className="z-20 w-full p-4 md:p-6 md:absolute md:top-0 md:left-0 flex justify-start">
        <Link 
          to="/community/home" 
          className="group flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-all shadow-sm hover:shadow-md"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* --- Main Content --- */}
      <div className="flex-1 flex items-center justify-center p-4 z-10 my-6 md:my-0">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-[460px]"
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] border border-white/50 p-8 sm:p-12 relative overflow-hidden ring-1 ring-gray-100">
            
            {/* Header Section with LOGO */}
            <div className="text-center mb-6 md:mb-8">
              <div className="flex justify-center mb-6">
                <img 
                  src="/logo.png" 
                  alt="TopEdge Logo" 
                  className="h-10 w-auto object-contain drop-shadow-sm" 
                />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 tracking-tight">Create Account</h1>
              <p className="text-gray-500 text-sm font-medium">
                Join our community of innovators today
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-50/80 backdrop-blur-sm border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm mb-6 flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p>{error}</p>
              </motion.div>
            )}

            <form onSubmit={handleSignup} className="space-y-5">
              
              {/* Name Input */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:bg-white focus:ring-4 focus:ring-gray-100 focus:border-gray-300 transition-all placeholder:text-gray-400 font-medium"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:bg-white focus:ring-4 focus:ring-gray-100 focus:border-gray-300 transition-all placeholder:text-gray-400 font-medium"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:bg-white focus:ring-4 focus:ring-gray-100 focus:border-gray-300 transition-all placeholder:text-gray-400 font-medium"
                    placeholder="Min. 6 characters"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              {/* Premium Button */}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full relative group overflow-hidden py-3.5 px-6 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg shadow-gray-900/10 hover:shadow-xl hover:shadow-gray-900/20 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-4"
              >
                <div className="flex items-center justify-center gap-2">
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ChevronRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center pt-6 border-t border-gray-100/60">
              <p className="text-gray-500 text-sm">
                Already have an account?{' '}
                <Link to="/community/login" className="text-gray-900 font-bold hover:underline decoration-2 decoration-gray-900/30 underline-offset-4 transition-all">
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center pb-8 md:pb-0">
            <p className="text-gray-400 text-xs font-medium tracking-wide">
              &copy; {new Date().getFullYear()} TopEdge AI Community
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;