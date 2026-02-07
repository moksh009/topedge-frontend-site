import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Zap, Cpu, Activity, Mic, Settings2, Terminal, Wifi } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]); 
  const opacity = useTransform(scrollY, [0, 400], [1, 0]); 

  // Simulation State
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
    <div className="relative bg-white min-h-[100vh] overflow-hidden text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
       
       {/* Background */}
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/50 via-white to-white pointer-events-none" />
       
       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
         
         <div className="flex flex-col items-center text-center">
            
            {/* Header Content */}
            <Link to="/booking">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-4 mt-8 hover:border-indigo-200 transition-colors cursor-pointer group"
              >
                <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-600 tracking-wide uppercase">TopEdge AI 3.0 Live</span>
                <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all" />
              </motion.div>
            </Link>
            
            <motion.h1 
              style={{ opacity }}
              className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight mb-8 text-slate-900 leading-[1.1]"
            >
              Human-level AI. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 animate-gradient-x">
                Scale-level speed.
              </span>
            </motion.h1>

            <motion.p 
              className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
            >
              Our AI Communication agents outperform manual inquiry managers. <br className="hidden md:block"/>
whose manual, slow & energy in response get dull after tired.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row items-center gap-4 mb-24 relative z-20">
              <button 
                onClick={() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 rounded-full bg-slate-900 text-white font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:-translate-y-1 flex items-center gap-2 group"
              >
                Client Feedbacks <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link to="/booking" className="px-8 py-4 rounded-full bg-white text-slate-700 font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm hover:shadow-md">
                <Play className="w-4 h-4 fill-current text-indigo-500" /> Book Coffee Call
              </Link>
            </motion.div>

            {/* --- ADVANCED UI INTERFACE --- */}
            <motion.div
               style={{ y: y1 }}
               initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
               animate={{ opacity: 1, scale: 1, rotateX: 0 }}
               transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 50 }}
               className="relative w-full max-w-6xl mx-auto perspective-1000"
            >
                {/* Glow Behind */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-500/10 blur-[100px] rounded-full -z-10" />

                {/* Main Glass Container */}
                <div className="rounded-[2rem] border border-white/40 bg-white/60 backdrop-blur-2xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden ring-1 ring-white/50">
                    
                    {/* Toolbar */}
                    <div className="h-14 border-b border-slate-200/50 bg-white/50 flex items-center px-6 justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                                <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                                <div className="w-3 h-3 rounded-full bg-green-400/80" />
                            </div>
                            <div className="h-4 w-[1px] bg-slate-300" />
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-100/50 px-3 py-1.5 rounded-lg border border-slate-200/50">
                                <Cpu className="w-3.5 h-3.5 text-indigo-500" />
                                <span>Neural Engine v3.5</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="flex h-2 w-2 relative">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">System Operational</span>
                        </div>
                    </div>

                    {/* Dashboard Grid */}
                    <div className="p-2 grid grid-cols-12 gap-2 bg-slate-50/30">
                        
                        {/* LEFT: Live Logs & Stats */}
                        <div className="col-span-12 md:col-span-4 flex flex-col gap-2">
                            {/* Card 1: Terminal */}
                            <div className="flex-1 bg-black rounded-2xl p-5 border border-slate-800 shadow-inner flex flex-col min-h-[220px]">
                                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono">
                                        <Terminal className="w-3 h-3" />
                                        <span>System Logs</span>
                                    </div>
                                    <Wifi className="w-3 h-3 text-slate-500" />
                                </div>
                                <div className="flex-col flex gap-2 overflow-hidden font-mono text-[10px] leading-relaxed text-slate-300/80">
                                    {logs.map((log, i) => (
                                        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                                            {log}
                                        </motion.div>
                                    ))}
                                    <motion.div 
                                        animate={{ opacity: [0, 1, 0] }} 
                                        transition={{ repeat: Infinity, duration: 0.8 }}
                                        className="w-2 h-4 bg-emerald-500 mt-1"
                                    />
                                </div>
                            </div>

                            {/* Card 2: Metrics */}
                            <div className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <Activity className="w-4 h-4 text-indigo-500" />
                                    <span className="text-xs font-bold text-slate-700 uppercase">Performance</span>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                                            <span>Processing Load</span>
                                            <span>32%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div 
                                                animate={{ width: ["30%", "35%", "30%"] }} 
                                                transition={{ repeat: Infinity, duration: 2 }}
                                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" 
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                                            <span>Memory Usage</span>
                                            <span>1.2GB</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div 
                                                className="h-full w-[45%] bg-slate-400 rounded-full" 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Voice Visualizer (Hero Element) */}
                        <div className="col-span-12 md:col-span-8 bg-white rounded-2xl border border-slate-200/60 shadow-sm relative overflow-hidden flex flex-col">
                            {/* Visualizer Background */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-50/80 via-white to-white" />
                            
                            {/* Top Controls */}
                            <div className="relative z-10 flex justify-between p-5">
                                <div className="bg-white/80 backdrop-blur-md border border-slate-200/50 rounded-lg px-3 py-1.5 flex items-center gap-2 shadow-sm">
                                    <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                                    <span className="text-xs font-bold text-slate-600">Recording</span>
                                    <span className="text-xs font-mono text-slate-400 ml-2">00:04:12</span>
                                </div>
                                <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 cursor-pointer transition-colors">
                                    <Settings2 className="w-4 h-4 text-slate-500" />
                                </div>
                            </div>

                            {/* Center Orb & Waves */}
                            <div className="flex-1 relative flex items-center justify-center">
                                {/* Glowing Orb */}
                                <div className="relative w-32 h-32 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
                                    <div className="relative w-24 h-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 rounded-full shadow-2xl flex items-center justify-center z-10">
                                        <Mic className="w-10 h-10 text-white fill-white/20" />
                                    </div>
                                    
                                    {/* Orbiting Rings */}
                                    <motion.div 
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-[-20px] rounded-full border border-indigo-200/50 border-dashed"
                                    />
                                    <motion.div 
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-[-40px] rounded-full border border-purple-200/30 border-dashed"
                                    />
                                </div>

                                {/* Dynamic Sound Waves */}
                                <div className="absolute bottom-0 left-0 right-0 h-32 flex items-end justify-center gap-1.5 px-10 pb-8 opacity-50">
                                    {[...Array(30)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{ 
                                                height: [20, Math.random() * 80 + 20, 20],
                                                opacity: [0.5, 1, 0.5]
                                            }}
                                            transition={{ 
                                                duration: 0.8, 
                                                repeat: Infinity, 
                                                delay: i * 0.03,
                                                ease: "easeInOut" 
                                            }}
                                            className="w-1.5 rounded-full bg-gradient-to-t from-indigo-500 to-purple-400"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Caption Text */}
                            <div className="relative z-10 pb-6 text-center">
                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-lg font-medium text-slate-700"
                                >
                                    "Checking availability for Tuesday..."
                                </motion.p>
                                <p className="text-xs text-slate-400 font-medium mt-1">Confidence Score: 99.2%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
         </div>
       </div>
    </div>
  );
};

export default HeroSection;