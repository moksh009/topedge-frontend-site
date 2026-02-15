import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Zap, Cpu, Activity, Mic, Settings2, Terminal, Wifi } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]); 
  const opacity = useTransform(scrollY, [0, 400], [1, 0]); 

  // Simulation State
  // FIX: Added <string[]> to define the type explicitly
  const [logs, setLogs] = useState<string[]>([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newLogs = [
        `> Connecting to Neural Engine v3...`,
        `> Latency: 42ms | Jitter: 2ms`,
        `> Context Window: 128k Tokens`,
        `> Sentiment Analysis: Positive (0.98)`,
        `> Voice Synthesis: Ultra-High Fidelity`
      ];
      setLogs(prev => [...prev, newLogs[Math.floor(Math.random() * newLogs.length)]].slice(-6));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    // Container: h-[100dvh] ensures full viewport height on mobile browsers
    <div className="relative bg-white h-[100dvh] w-full overflow-hidden text-slate-900 font-sans selection:bg-indigo-500 selection:text-white flex flex-col">
       
       {/* Background */}
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/50 via-white to-white pointer-events-none" />
       
       {/* Main Content */}
       <div className="relative z-10 w-full max-w-7xl mx-auto flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
         
         <div className="flex flex-col items-center text-center w-full max-w-4xl mx-auto">
            
            {/* Toggle Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 px-1 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-8 md:mb-10"
            >
              <button
                className="px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-900 text-white shadow-sm hover:bg-slate-800 transition-colors"
              >
                AI Caller
              </button>
              <button
                onClick={() => document.getElementById('chatbot-start')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                Chatbot
              </button>
            </motion.div>
            
            {/* Title */}
            <motion.h1 
              style={{ opacity }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-8 md:mb-10 text-slate-900 leading-[1.1]"
            >
              Human-level AI. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 animate-gradient-x">
                Scale-level speed.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed font-light px-4"
            >
              Our AI Communication agents outperform manual inquiry managers. <br className="hidden md:block"/>
              whose manual, slow & energy in response get dull after tired.
            </motion.p>

            {/* Buttons */}
            <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 w-full relative z-20">
              <button 
                onClick={() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-auto px-8 py-3.5 md:py-4 rounded-full bg-slate-900 text-white font-bold text-sm md:text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2 group"
              >
                Client Feedbacks <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <Link 
                to="/booking" 
                className="w-auto px-8 py-3.5 md:py-4 rounded-full bg-white text-slate-700 font-bold text-sm md:text-lg border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
              >
                <Play className="w-4 h-4 fill-current text-indigo-500" /> Book Coffee Call
              </Link>
            </motion.div>

         </div>
       </div>
    </div>
  );
};

export default HeroSection;