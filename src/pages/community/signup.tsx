import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '@/services/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, UserPlus, User, Mail, Lock, AlertCircle } from 'lucide-react';

// Import phone input and its styles
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

const Signup = () => {
  const [name, setName] = useState('');
  // Phone state will now hold the full number including country code (e.g., +15550000000)
  const [phone, setPhone] = useState<string | undefined>();
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update display name
      await updateProfile(user, { displayName: name });

      // Save user details to Firestore
      // Note: 'phone' variable now contains the full international format (e.g., +123456789)
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        phone: phone || '', // Ensure it's not undefined
        email: user.email,
        createdAt: new Date().toISOString(),
        role: 'member',
      });

      navigate('/community/home');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Email is already in use.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError(err.message || 'Failed to create account.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-gray-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute left-0 top-0 -z-10 h-[310px] w-[310px] rounded-full bg-gray-200 opacity-20 blur-[100px]" />
        <div className="absolute right-0 bottom-0 -z-10 h-[310px] w-[310px] rounded-full bg-blue-100 opacity-20 blur-[100px]" />
      </div>

      <div className="absolute top-6 left-6 z-20">
        <Link 
          to="/community/home" 
          className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors shadow-sm border border-gray-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-gray-200/50 border border-white/50 p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-900 text-white mb-6 shadow-lg shadow-gray-900/20">
              <UserPlus className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Create Account</h1>
            <p className="text-gray-500">Join our community of AI innovators</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm mb-6 flex items-start gap-3 border border-red-100"
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p>{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSignup} className="space-y-5">
            {/* Full Name Input */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors z-10" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            {/* Phone Number Input with Country Code */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">Phone Number</label>
              <div className="relative group">
                {/* We apply a custom class to override the library's default styles 
                   to match your glassmorphism UI.
                */}
                <style>{`
                  .PhoneInput {
                    display: flex;
                    align-items: center;
                    background-color: rgba(255, 255, 255, 0.5);
                    border: 1px solid #e5e7eb;
                    border-radius: 0.75rem; /* rounded-xl */
                    padding: 0.5rem 1rem;
                    transition: all 0.2s;
                  }
                  .PhoneInput:focus-within {
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
                  }
                  .PhoneInputInput {
                    background: transparent;
                    border: none;
                    outline: none;
                    color: #111827;
                    font-size: 1rem;
                    padding-top: 0.5rem;
                    padding-bottom: 0.5rem;
                    width: 100%;
                  }
                  .PhoneInputInput::placeholder {
                    color: #9ca3af;
                  }
                  .PhoneInputCountry {
                    margin-right: 0.75rem;
                  }
                `}</style>
                <PhoneInput
                  international
                  defaultCountry="US"
                  value={phone}
                  onChange={setPhone}
                  placeholder="Enter phone number"
                  className="w-full"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/50 border border-gray-200 rounded-xl py-3.5 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg mt-4"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign Up"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm">
              Already have an account?{' '}
              <Link to="/community/login" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                Log in
              </Link>
            </p>
          </div>
        </div>
        
        <p className="text-center mt-8 text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} TopEdge AI Community
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;