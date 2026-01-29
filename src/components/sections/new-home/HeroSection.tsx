import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Play, Mic, Command, Zap } from 'lucide-react';

// --- PART 1: LIGHT MODE FLUID BACKGROUND ---
const AuroraBackgroundLight = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    // Light Theme Colors (Soft Pastels)
    const blobs = [
        { x: w * 0.2, y: h * 0.4, r: 600, color: 'rgba(56, 189, 248, 0.08)', vx: 0.2, vy: 0.1 }, // Sky Blue
        { x: w * 0.8, y: h * 0.2, r: 500, color: 'rgba(168, 85, 247, 0.08)', vx: -0.2, vy: 0.1 }, // Purple
        { x: w * 0.5, y: h * 0.8, r: 550, color: 'rgba(236, 72, 153, 0.06)', vx: 0.1, vy: -0.2 }, // Pink
    ];

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      blobs.forEach(blob => {
        blob.x += blob.vx;
        blob.y += blob.vy;

        // Soft bounce
        if (blob.x < -100 || blob.x > w + 100) blob.vx *= -1;
        if (blob.y < -100 || blob.y > h + 100) blob.vy *= -1;

        const g = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r);
        g.addColorStop(0, blob.color);
        g.addColorStop(1, 'transparent');
        
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    animate();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

// --- PART 2: HERO SECTION ---
const HeroSection = () => {
  const { scrollY } = useScroll();
  
  // Parallax Logic: Moves the card slower than the scroll, creating depth
  // We clamp the movement to ensure it doesn't overlap incorrectly
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]); 
  const opacity = useTransform(scrollY, [0, 400], [1, 0]); // Fades out text as you scroll
  
  return (
    <div className="relative bg-white min-h-[120vh] overflow-hidden font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
       
       {/* 1. Background Layers */}
       <AuroraBackgroundLight />
       {/* Subtle grid pattern for technical feel */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] z-[1] pointer-events-none"></div>
       
       {/* 2. Main Content Container */}
       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-40">
         
         <div className="flex flex-col items-center text-center">
            
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 shadow-sm mb-8 hover:bg-blue-100 transition-colors cursor-pointer group"
            >
              <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span className="text-sm font-semibold text-blue-700 tracking-tight">TopEdge AI 3.0</span>
              <ArrowRight className="w-3 h-3 text-blue-600 group-hover:translate-x-1 transition-transform" />
            </motion.div>
            
            {/* Headline */}
            <motion.h1 
              style={{ opacity }} // Apply scroll fade out
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 text-gray-900 leading-[1.1]"
            >
              Own Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Voice AI
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
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
              <button className="px-8 py-4 rounded-full bg-[#111] text-white font-semibold text-lg hover:bg-black transition-all hover:scale-105 shadow-xl shadow-black/10 flex items-center gap-2 group">
                Start Building Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 rounded-full bg-white text-gray-700 font-medium text-lg border border-gray-200 hover:bg-gray-50 transition-all hover:scale-105 flex items-center gap-2 shadow-sm">
                <Play className="w-4 h-4 fill-current text-gray-400" /> Book Demo
              </button>
            </motion.div>

            {/* 3. The "App Interface" Visualization */}
            <motion.div
               style={{ y: y1 }}
               initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
               animate={{ opacity: 1, scale: 1, rotateX: 0 }}
               transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
               className="relative w-full max-w-5xl mx-auto perspective-1000"
            >
                {/* Glow behind the card (Light Mode: Soft Blue/Purple Shadow) */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[90%] h-[80%] bg-gradient-to-b from-blue-200/40 to-purple-200/40 blur-[80px] -z-10 rounded-full" />

                {/* The Card Interface */}
                <div className="rounded-3xl border border-gray-200 bg-white/70 backdrop-blur-xl shadow-2xl shadow-blue-900/5 overflow-hidden ring-1 ring-gray-900/5">
                    
                    {/* Browser Header */}
                    <div className="h-14 border-b border-gray-100 bg-white/50 flex items-center px-6 gap-4 justify-between">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-gray-200 border border-gray-300" />
                            <div className="w-3 h-3 rounded-full bg-gray-200 border border-gray-300" />
                            <div className="w-3 h-3 rounded-full bg-gray-200 border border-gray-300" />
                        </div>
                        <div className="px-4 py-1.5 rounded-lg bg-gray-100/50 border border-gray-200/50 flex items-center gap-2 text-xs font-medium text-gray-500">
                             <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                             <span>Live Environment</span>
                        </div>
                        <div className="w-16"></div> {/* Spacer for centering */}
                    </div>

                    {/* Main UI Body */}
                    <div className="p-8 md:p-12 grid md:grid-cols-2 gap-12 items-center">
                        
                        {/* Left: Interactive Controls */}
                        <div className="space-y-8 text-left">
                            
                            {/* Model Selector */}
                            <div className="space-y-3">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">Selected Model</label>
                                <div className="p-1 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col gap-1">
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-white shadow-sm border border-gray-100 cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-md">V3</div>
                                            <div>
                                                <div className="text-gray-900 font-semibold">TopEdge Turbo v2.5</div>
                                                <div className="text-xs text-gray-500">Ultra-low latency (75ms)</div>
                                            </div>
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Sliders */}
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-medium text-gray-600">
                                        <span>Emotion</span>
                                        <span>85%</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full w-[85%] bg-blue-500 rounded-full"></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-medium text-gray-600">
                                        <span>Stability</span>
                                        <span>92%</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full w-[92%] bg-purple-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Audio Visualizer */}
                        <div className="relative h-72 rounded-3xl bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden shadow-inner">
                            {/* Dot Pattern Background */}
                            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-100"></div>
                            
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
                                        className="w-2.5 rounded-full bg-gradient-to-t from-blue-500 to-purple-600 shadow-sm"
                                    />
                                ))}
                            </div>

                            {/* Status Badge */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-lg shadow-gray-200/50">
                                <div className="relative flex h-3 w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                </div>
                                <span className="text-sm font-semibold text-gray-700">Listening...</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Bottom Bar */}
                    <div className="h-10 bg-gray-50 border-t border-gray-100 flex items-center px-6 justify-between text-[10px] text-gray-400 font-mono uppercase tracking-widest">
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