import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { 
  ArrowRight, XCircle, Clock, Zap, 
  MessageSquare, Smartphone, Grip, Link as LinkIcon
} from 'lucide-react';

// --- Types ---
interface AutomationApp {
  name: string;
  image: string;
  description: string;
  category: string;
}

const automationApps: AutomationApp[] = [
  {
    name: "WhatsApp",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
    description: "Instant Replies & Broadcasting",
    category: "Messaging"
  },
  {
    name: "Instagram",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
    description: "DM Automation & Story Replies",
    category: "Social"
  },
  {
    name: "Messenger",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg",
    description: "Customer Support Chat",
    category: "Support"
  },
  {
    name: "Telegram",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg",
    description: "Channel Management",
    category: "Community"
  },
  {
    name: "Slack",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
    description: "Internal Team Alerts",
    category: "Productivity"
  },
  {
    name: "Gmail",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg",
    description: "Email Sequences",
    category: "Email"
  }
];

// Duplicate for infinite scroll (3x for smoothness)
const extendedApps = [...automationApps, ...automationApps, ...automationApps];

const AutomationAppsShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // --- Animation Logic ---
  // We use a CSS animation for the marquee for smoother performance than JS
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    // Calculate total width of one set of items
    // This is approximate; for production, measure real DOM width
    const totalWidth = scrollContainer.scrollWidth / 3;
    
    // We can use CSS keyframes defined in style tag or global CSS
    // For this component, we'll use inline styles for the "track"
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-[#FAFAFA] py-32 overflow-hidden font-sans selection:bg-slate-200"
    >
      {/* --- Ambient Background --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft, diffuse gradient at top */}
        <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-white to-[#FAFAFA]" />
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-[1200px]">
        
        {/* --- Header Section --- */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-8 bg-white border border-slate-200/60 rounded-full shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]"
          >
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest">Ecosystem</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-semibold text-[#1d1d1f] tracking-tight leading-[1.05] mb-8"
          >
            Connected to <br />
            everything you use.
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-[#86868b] font-medium leading-relaxed max-w-2xl mx-auto"
          >
            TopEdge integrates seamlessly with your favorite apps.
            <span className="text-[#1d1d1f]"> No code required.</span>
          </motion.p>
        </div>

        {/* --- Bento Grid Layout --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-32">
          
          {/* Card 1: The Cost (Large - Span 7) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="col-span-1 md:col-span-7 relative overflow-hidden bg-white rounded-[2.5rem] p-10 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] border border-slate-100 group"
          >
            <div className="relative z-10 flex flex-col justify-between h-full min-h-[280px]">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 rounded-2xl bg-[#F5F5F7] flex items-center justify-center text-slate-900 group-hover:bg-rose-50 group-hover:text-rose-500 transition-colors duration-500">
                  <XCircle className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <div className="px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-xs font-bold uppercase tracking-wider">
                  The Problem
                </div>
              </div>
              
              <div>
                <h3 className="text-3xl font-semibold text-[#1d1d1f] mb-4">Silence Kills Deals</h3>
                <p className="text-lg text-[#86868b] leading-relaxed max-w-md">
                  <span className="font-semibold text-[#1d1d1f]">72% of customers</span> choose a competitor if their call isn't answered immediately. Don't let voicemail be your revenue leak.
                </p>
              </div>
            </div>
            {/* Soft Ambient Light */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none" />
          </motion.div>

          {/* Card 2: Instant Response (Medium - Span 5) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -4 }}
            className="col-span-1 md:col-span-5 relative overflow-hidden bg-[#1d1d1f] rounded-[2.5rem] p-10 shadow-2xl"
          >
            <div className="relative z-10 flex flex-col justify-between h-full min-h-[280px]">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white backdrop-blur-sm">
                  <Zap className="w-7 h-7" strokeWidth={1.5} />
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider">
                  Solved
                </div>
              </div>
              
              <div>
                <h3 className="text-3xl font-semibold text-white mb-4">Instant Speed</h3>
                <p className="text-lg text-gray-400 leading-relaxed">
                  Zero wait times. Handles <span className="text-white">10,000+</span> concurrent calls effortlessly.
                </p>
              </div>
            </div>
            {/* Grain Texture Overlay */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] mix-blend-overlay pointer-events-none" />
          </motion.div>

        </div>

        {/* --- Infinite Marquee (Premium Physics) --- */}
        <div className="relative w-full">
          
          {/* Fade Masks for seamless look */}
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-[#FAFAFA] to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-[#FAFAFA] to-transparent z-20 pointer-events-none" />

          {/* Marquee Track */}
          <div className="flex overflow-hidden py-10 group/track">
            {/* Inner Moving Container - Animation defined in CSS/Tailwind config or inline style */}
            <motion.div 
              className="flex gap-8 pl-8"
              animate={{ x: ["0%", "-33.33%"] }}
              transition={{ 
                repeat: Infinity, 
                ease: "linear", 
                duration: 40 // Slow, heavy movement
              }}
              style={{ width: "fit-content" }}
            >
              {extendedApps.map((app, index) => (
                <motion.div
                  key={`${app.name}-${index}`}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="flex-shrink-0 w-[300px] h-[180px] bg-white rounded-[2rem] p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100 transition-all duration-300 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] cursor-pointer group/card relative overflow-hidden"
                >
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="p-3 bg-[#F5F5F7] rounded-2xl group-hover/card:bg-white group-hover/card:shadow-md transition-all duration-300">
                        <img 
                          src={app.image} 
                          alt={app.name} 
                          className="w-8 h-8 object-contain" 
                        />
                      </div>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 text-slate-300 group-hover/card:text-slate-600 group-hover/card:bg-slate-100 transition-colors">
                        <LinkIcon className="w-4 h-4" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div>
                      <h3 className="text-lg font-bold text-[#1d1d1f] mb-1">{app.name}</h3>
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">{app.category}</p>
                      <p className="text-sm text-[#86868b] line-clamp-1">{app.description}</p>
                    </div>
                  </div>

                  {/* Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AutomationAppsShowcase;