import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CommunitySEO from '@/components/community/CommunitySEO';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/services/firebase'; 
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Loader2, Mail, Lock, AlertCircle, ChevronRight, CheckCircle, Info, ShieldCheck, Eye, EyeOff } from 'lucide-react';

interface FirebaseError {
  code: string;
  message: string;
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resetMessage, setResetMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // --- HANDLE LOGIN ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResetMessage(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const returnUrl = localStorage.getItem('returnUrl');
      if (returnUrl) {
        localStorage.removeItem('returnUrl');
        navigate(returnUrl);
      } else {
        navigate('/community/home');
      }
    } catch (err: unknown) {
      console.error(err);
      setLoading(false);
      const firebaseError = err as FirebaseError;
      
      if (
        firebaseError.code === 'auth/user-not-found' || 
        firebaseError.code === 'auth/wrong-password' || 
        firebaseError.code === 'auth/invalid-credential'
      ) {
        setError('Invalid email or password.');
      } else {
        setError('Failed to login. Please try again.');
      }
    }
  };

  // --- HANDLE FORGOT PASSWORD ---
  const handleForgotPassword = async () => {
    setError(null);
    setResetMessage(null);

    // 1. Check if email is empty
    if (!email) {
      setError("Please enter your email address above first.");
      return;
    }

    setLoading(true);

    try {
      // 2. Send Reset Email
      await sendPasswordResetEmail(auth, email);
      setResetMessage(`Password reset link sent to ${email}. Please check your inbox and spam folder.`);
    } catch (err: unknown) {
      const firebaseError = err as FirebaseError;
      if (firebaseError.code === 'auth/user-not-found') {
        setError("No account found with this email.");
      } else if (firebaseError.code === 'auth/invalid-email') {
        setError("Please enter a valid email address.");
      } else {
        setError("Failed to send reset email. Try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#F8F9FA] relative overflow-hidden font-sans">
      <CommunitySEO 
        title="Login - TopEdge AI Community"
        description="Access your TopEdge AI Community account."
        url="/community/login"
      />
      
      {/* --- Premium Ambient Background --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="hidden md:block absolute top-[-10%] right-[-5%] h-[600px] w-[600px] rounded-full bg-blue-50/80 blur-[120px]" />
        <div className="hidden md:block absolute bottom-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-50/80 blur-[120px]" />
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
      <div className="flex-1 flex items-center justify-center p-4 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[440px]"
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] border border-white/50 p-8 sm:p-12 relative overflow-hidden ring-1 ring-gray-100">
            
            {/* Header */}
            <div className="text-center mb-8 md:mb-10">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex justify-center mb-8"
              >
                <img 
                  src="/logo.png" 
                  alt="TopEdge Logo" 
                  className="h-12 w-auto object-contain drop-shadow-sm" 
                />
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 tracking-tight"
              >
                Welcome Back
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-gray-500 text-sm font-medium"
              >
                Enter your credentials to access your account
              </motion.p>
            </div>

            {/* ALERTS SECTION */}
            <AnimatePresence mode="wait">
              {/* Success Message (Password Reset) */}
              {resetMessage && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ opacity: 1, height: 'auto', scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.95 }}
                  className="bg-emerald-50/90 backdrop-blur-sm border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-sm mb-6 flex items-start gap-3 shadow-sm overflow-hidden"
                >
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
                  <div className="leading-snug">
                    <span className="font-bold block mb-0.5">Check your email</span>
                    {resetMessage}
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ opacity: 1, height: 'auto', scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.95 }}
                  className="bg-red-50/90 backdrop-blur-sm border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-6 flex items-start gap-3 shadow-sm overflow-hidden"
                >
                  {error.includes("enter your email") ? (
                    <Info className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
                  )}
                  <p className="leading-snug font-medium">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-2"
              >
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-4 bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:bg-white focus:ring-4 focus:ring-gray-100 focus:border-gray-300 transition-all placeholder:text-gray-400 font-medium"
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Password</label>
                  
                  {/* Forgot Password Button */}
                  <button 
                    type="button" 
                    onClick={handleForgotPassword}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors hover:underline underline-offset-2"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-12 py-4 bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:bg-white focus:ring-4 focus:ring-gray-100 focus:border-gray-300 transition-all placeholder:text-gray-400 font-medium"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </motion.div>

              <motion.button 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={loading}
                className="w-full relative group overflow-hidden py-4 px-6 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg shadow-gray-900/10 hover:shadow-xl hover:shadow-gray-900/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 mt-2"
              >
                <div className="flex items-center justify-center gap-2">
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ChevronRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
              </motion.button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center pt-6 border-t border-gray-100/60">
              <p className="text-gray-500 text-sm">
                New to TopEdge?{' '}
                <Link to="/community/signup" className="text-gray-900 font-bold hover:underline decoration-2 decoration-gray-900/30 underline-offset-4 transition-all">
                  Create an account
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-xs font-medium tracking-wide">
              &copy; {new Date().getFullYear()} TopEdge AI Community
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
