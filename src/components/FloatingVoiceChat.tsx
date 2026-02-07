import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { vapiService } from '../services/vapiService';

// --- CUSTOM ICONS (SVG) ---
// Replacing standard Lucide icons with premium, gradient-styled assets

const AIOrbIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <circle cx="12" cy="12" r="10" stroke="url(#grad1)" strokeWidth="0" fill="url(#grad1)" />
    <defs>
      <linearGradient id="grad1" x1="2" y1="2" x2="22" y2="22">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#a855f7" />
      </linearGradient>
    </defs>
    <path d="M7 12H17M12 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const PhoneIcon = () => (
  <div className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-200">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
    <div className="absolute inset-0 rounded-full border border-white/20" />
  </div>
);

const CloseIcon = () => (
  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  </div>
);

// --- VISUALIZER ---
const AudioWave = () => (
  <div className="flex items-center justify-center gap-1 h-16 w-full">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          height: [16, Math.random() * 48 + 16, 16],
          opacity: [0.6, 1, 0.6],
          backgroundColor: ["#818cf8", "#c084fc", "#818cf8"] // Indigo to Purple
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          delay: i * 0.08,
          ease: "easeInOut"
        }}
        className="w-1.5 rounded-full"
      />
    ))}
  </div>
);

const FloatingVoiceChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [callStatus, setCallStatus] = useState<'idle' | 'connecting' | 'active'>('idle');

  // --- LOGIC ---
  const handleStartCall = async () => {
    setCallStatus('connecting');
    try {
      await vapiService.start();
      setCallStatus('active');
    } catch (error) {
      console.error('Failed to start:', error);
      setCallStatus('idle');
    }
  };

  const handleEndCall = async () => {
    try {
      await vapiService.close();
    } catch (error) {
      console.error('Failed to end:', error);
    } finally {
      setCallStatus('idle');
    }
  };

  return (
    <div className="fixed z-[9999] bottom-6 right-6 font-sans">
      <AnimatePresence mode="wait">
        
        {/* 1. COLLAPSED PILL */}
        {!isOpen && (
          <motion.button
            layoutId="voice-widget"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 pl-2 pr-6 py-2 bg-white/90 backdrop-blur-xl border border-white/50 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_35px_rgba(99,102,241,0.15)] transition-all duration-500"
          >
            <PhoneIcon />
            <div className="flex flex-col items-start">
               <span className="text-sm font-bold text-slate-800 leading-none">Talk to AI</span>
               <div className="flex items-center gap-1.5 mt-1">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">Online</span>
               </div>
            </div>
          </motion.button>
        )}

        {/* 2. EXPANDED CARD */}
        {isOpen && (
          <motion.div
            layoutId="voice-widget"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
            className="w-[360px] bg-white/95 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.1)] overflow-hidden relative"
          >
            {/* Soft Gradient Background */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-50/80 to-transparent pointer-events-none" />

            {/* HEADER */}
            <div className="relative z-10 flex items-center justify-between px-6 pt-6">
               <div className="flex items-center gap-2 px-3 py-1 bg-white/60 rounded-full border border-slate-100 shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">TopEdge AI</span>
               </div>
               <button onClick={() => setIsOpen(false)} className="transition-transform active:scale-90">
                  <CloseIcon />
               </button>
            </div>

            {/* MAIN CONTENT */}
            <div className="relative z-10 px-8 py-10 flex flex-col items-center text-center min-h-[320px] justify-between">
               
               {/* --- IDLE STATE --- */}
               {callStatus === 'idle' && (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                   className="flex flex-col items-center w-full"
                 >
                    {/* The "Brain" Orb */}
                    <div className="relative w-32 h-32 mb-8">
                       <div className="absolute inset-0 bg-gradient-to-tr from-indigo-400 to-purple-400 rounded-full blur-2xl opacity-20 animate-pulse" />
                       <div className="relative w-full h-full rounded-full bg-gradient-to-br from-indigo-50 to-white shadow-xl flex items-center justify-center border border-white">
                          <motion.div 
                             animate={{ rotate: 360 }}
                             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                             className="w-24 h-24 rounded-full bg-[conic-gradient(from_0deg,#e0e7ff,#818cf8,#e0e7ff)] opacity-30 blur-md"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 shadow-lg flex items-center justify-center text-white">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                   <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                                   <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
                                   <line x1="12" y1="19" x2="12" y2="22"/>
                                   <line x1="8" y1="22" x2="16" y2="22"/>
                                </svg>
                             </div>
                          </div>
                       </div>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-800 mb-2 tracking-tight">How can I help?</h3>
                    <p className="text-sm text-slate-500 leading-relaxed max-w-[260px]">
                       Ask about our features, pricing, or get support instantly.
                    </p>
                 </motion.div>
               )}

               {/* --- CONNECTING STATE --- */}
               {callStatus === 'connecting' && (
                 <motion.div 
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                   className="flex flex-col items-center w-full"
                 >
                    <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
                       <svg className="animate-spin w-full h-full text-indigo-200" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                       </svg>
                       <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                             </svg>
                          </div>
                       </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">Connecting...</h3>
                    <p className="text-xs text-slate-400 mt-1">Establishing secure channel</p>
                 </motion.div>
               )}

               {/* --- ACTIVE STATE --- */}
               {callStatus === 'active' && (
                 <motion.div 
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                   className="flex flex-col items-center w-full"
                 >
                    <div className="w-full h-32 flex items-center justify-center mb-4 bg-indigo-50/50 rounded-3xl border border-indigo-100/50">
                       <AudioWave />
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 text-xs font-bold uppercase tracking-wide mb-2">
                       <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                       Live Session
                    </div>
                    <p className="text-sm text-slate-500 font-medium">Listening to you...</p>
                 </motion.div>
               )}

               {/* ACTIONS */}
               <div className="w-full mt-8">
                  {callStatus === 'idle' ? (
                     <button
                        onClick={handleStartCall}
                        className="w-full relative group overflow-hidden rounded-2xl bg-slate-900 text-white px-6 py-4 font-bold text-base shadow-[0_10px_20px_-5px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_-5px_rgba(99,102,241,0.3)] transition-all transform hover:-translate-y-0.5"
                     >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                           Start Conversation
                           <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform">
                              <path d="M5 12h14M12 5l7 7-7 7"/>
                           </svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                     </button>
                  ) : (
                     <button
                        onClick={handleEndCall}
                        disabled={callStatus === 'connecting'}
                        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-rose-50 text-rose-500 hover:bg-rose-100 hover:text-rose-600 rounded-2xl font-bold text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                           <path d="M18 6L6 18M6 6l12 12"/>
                        </svg>
                        <span>End Session</span>
                     </button>
                  )}
               </div>

            </div>

            {/* FOOTER */}
            <div className="relative z-10 bg-slate-50/80 py-3 text-center border-t border-slate-100">
               <p className="text-[10px] text-slate-400 font-semibold tracking-wide">
                  POWERED BY <span className="text-indigo-500">TOPEDGE NEURAL ENGINE</span>
               </p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingVoiceChat;