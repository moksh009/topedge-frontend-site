import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/services/firebase'; 
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, Mail, Lock, AlertCircle, ChevronRight } from 'lucide-react';

// Define a simple interface for the Firebase error to fix the "unknown" type error
interface FirebaseError {
  code: string;
  message: string;
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Fix: Explicitly tell TypeScript this state can be a string OR null
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fix: Type the event as React.FormEvent
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/community/home');
    } catch (err: unknown) {
      console.error(err);
      // Fix: Cast 'err' to our interface or 'any' to access .code safely
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-[#F8F9FA] relative overflow-hidden font-sans">
      
      {/* --- Premium Ambient Background --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        {/* Softer, more elegant blurred orbs */}
        <div className="hidden md:block absolute top-[-10%] right-[-5%] h-[600px] w-[600px] rounded-full bg-blue-50/80 blur-[120px]" />
        <div className="hidden md:block absolute bottom-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-50/80 blur-[120px]" />
      </div>

      {/* --- Navigation --- */}
      <div className="z-20 w-full p-6 md:absolute md:top-0 md:left-0 flex justify-start">
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
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-[440px]"
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] border border-white/50 p-8 sm:p-12 relative overflow-hidden ring-1 ring-gray-100">
            
            {/* Header Section with LOGO */}
            <div className="text-center mb-10">
              {/* Logo Implementation */}
              <div className="flex justify-center mb-8">
                <img 
                  src="/logo.png" 
                  alt="TopEdge Logo" 
                  className="h-12 w-auto object-contain drop-shadow-sm" 
                />
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 tracking-tight">Welcome Back</h1>
              <p className="text-gray-500 text-sm font-medium">
                Enter your credentials to access your account
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

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              
              <div className="space-y-2">
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
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Password</label>
                  <a href="#" className="text-xs font-semibold text-gray-900 hover:text-gray-600 transition-colors">Forgot?</a>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-4 py-4 bg-gray-50/50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:bg-white focus:ring-4 focus:ring-gray-100 focus:border-gray-300 transition-all placeholder:text-gray-400 font-medium"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full relative group overflow-hidden py-4 px-6 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg shadow-gray-900/10 hover:shadow-xl hover:shadow-gray-900/20 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-2"
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
              </button>
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