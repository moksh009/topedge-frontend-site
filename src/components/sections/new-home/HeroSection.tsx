import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Zap } from 'lucide-react';

const HeroSection = () => {
  const { scrollY } = useScroll();
  
  // Parallax Logic: Moves the card slower than the scroll, creating depth
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]); 
  const opacity = useTransform(scrollY, [0, 400], [1, 0]); // Fades out text as you scroll
  
  return (
    <div className="relative bg-white min-h-[120vh] overflow-hidden font-sans text-slate-900 selection:bg-slate-900 selection:text-white">
       
       {/* 1. Background Layers - Clean & Minimal */}
       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-50 via-white to-white pointer-events-none" />
       
       {/* 2. Main Content Container */}
       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-40">
         
         <div className="flex flex-col items-center text-center">
            
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 mb-8 hover:bg-slate-100 transition-colors cursor-pointer group"
            >
              <span className="flex h-1.5 w-1.5 rounded-full bg-slate-900"></span>
              <span className="text-sm font-medium text-slate-700 tracking-tight">TopEdge AI 3.0</span>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </motion.div>
            
            {/* Headline */}
            <motion.h1 
              style={{ opacity }} // Apply scroll fade out
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-slate-900 leading-[1.1]"
            >
              Own Your <br />
              <span className="text-slate-900">
                Voice AI
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
            >
              Deploy autonomous voice agents that sound human. <br className="hidden md:block" />
              Zero latency. Infinite scale. Pure performance.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-4 mb-24 relative z-20"
            >
              <button className="px-8 py-4 rounded-full bg-slate-900 text-white font-medium text-lg hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20 flex items-center gap-2 group">
                Start Building Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 rounded-full bg-white text-slate-700 font-medium text-lg border border-slate-200 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
                <Play className="w-4 h-4 fill-current text-slate-400" /> Book Demo
              </button>
            </motion.div>

            {/* 3. The "App Interface" Visualization */}
            <motion.div
               style={{ y: y1 }}
               initial={{ opacity: 0, scale: 0.98, rotateX: 5 }}
               animate={{ opacity: 1, scale: 1, rotateX: 0 }}
               transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
               className="relative w-full max-w-5xl mx-auto perspective-1000"
            >
                {/* Clean shadow instead of colored glow */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[95%] h-[90%] bg-slate-200/50 blur-3xl -z-10 rounded-full" />

                {/* The Card Interface */}
                <div className="rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/50 overflow-hidden ring-1 ring-slate-900/5">
                    
                    {/* Browser Header */}
                    <div className="h-12 border-b border-slate-100 bg-white flex items-center px-6 gap-4 justify-between">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-slate-100 border border-slate-200" />
                            <div className="w-3 h-3 rounded-full bg-slate-100 border border-slate-200" />
                            <div className="w-3 h-3 rounded-full bg-slate-100 border border-slate-200" />
                        </div>
                        <div className="px-3 py-1 rounded-md bg-slate-50 border border-slate-100 flex items-center gap-2 text-xs font-medium text-slate-500">
                             <Zap className="w-3 h-3 text-slate-400 fill-slate-400" />
                             <span>Live Environment</span>
                        </div>
                        <div className="w-16"></div> {/* Spacer for centering */}
                    </div>

                    {/* Main UI Body */}
                    <div className="p-8 md:p-12 grid md:grid-cols-2 gap-12 items-center bg-white">
                        
                        {/* Left: Interactive Controls */}
                        <div className="space-y-8 text-left">
                            
                            {/* Model Selector */}
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Selected Model</label>
                                <div className="p-1 rounded-xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
                                    <div className="flex items-center justify-between p-3 rounded-lg bg-white shadow-sm border border-slate-100 cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center text-white text-xs font-bold shadow-md">V3</div>
                                            <div>
                                                <div className="text-slate-900 font-semibold">TopEdge Turbo v2.5</div>
                                                <div className="text-xs text-slate-500">Ultra-low latency (75ms)</div>
                                            </div>
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Sliders */}
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-medium text-slate-600">
                                        <span>Emotion</span>
                                        <span>85%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full w-[85%] bg-slate-900 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-medium text-slate-600">
                                        <span>Stability</span>
                                        <span>92%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full w-[92%] bg-slate-900 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Audio Visualizer */}
                        <div className="relative h-72 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden shadow-inner">
                            {/* Dot Pattern Background */}
                            <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] opacity-100"></div>
                            
                            {/* Waveform Animation */}
                            <div className="flex items-center gap-1.5 z-10 h-32">
                                {[...Array(16)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ 
                                            height: [30, Math.random() * 100 + 30, 30],
                                        }}
                                        transition={{ 
                                            duration: 1.2, 
                                            repeat: Infinity, 
                                            delay: i * 0.05,
                                            ease: "easeInOut"
                                        }}
                                        className="w-2.5 rounded-full bg-slate-900 shadow-sm"
                                    />
                                ))}
                            </div>

                            {/* Status Badge */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-lg shadow-slate-200/50">
                                <div className="relative flex h-2.5 w-2.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                </div>
                                <span className="text-sm font-semibold text-slate-700">Listening...</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Bottom Bar */}
                    <div className="h-10 bg-slate-50 border-t border-slate-100 flex items-center px-6 justify-between text-[10px] text-slate-400 font-mono uppercase tracking-widest">
                        <span>System Ready</span>
                        <span>v3.0.1-stable</span>
                    </div>
                </div>
            </motion.div>
         </div>
       </div>
    </div>
  );
};

export default HeroSection;
