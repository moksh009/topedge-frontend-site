import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Phone, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CTASection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  // Parallax effect for the background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-32 overflow-hidden bg-[#020617]"
    >
      {/* --- ANIMATED BACKGROUND FLOW LINES --- */}
      <div className="absolute inset-0 w-full h-full opacity-30">
        {/* Grid Pattern */}
        <div 
            className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" 
        />
        
        {/* Moving Flow Beams */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            {/* Beam 1 */}
            <motion.div 
                animate={{ top: ["-10%", "110%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 0 }}
                className="absolute left-[20%] w-[1px] h-[200px] bg-gradient-to-b from-transparent via-indigo-500 to-transparent opacity-70"
            />
            {/* Beam 2 */}
            <motion.div 
                animate={{ top: ["-10%", "110%"] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 2 }}
                className="absolute left-[50%] w-[1px] h-[300px] bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-50"
            />
            {/* Beam 3 */}
            <motion.div 
                animate={{ top: ["-20%", "120%"] }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 4 }}
                className="absolute right-[20%] w-[1px] h-[250px] bg-gradient-to-b from-transparent via-purple-500 to-transparent opacity-60"
            />
        </div>
      </div>

      {/* Ambient Glows */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
      </motion.div>
          
      <div className="relative container mx-auto px-4 sm:px-6 z-10">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-md shadow-lg shadow-indigo-500/10"
          >
            <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span>Deployment Ready</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="text-3xl sm:text-5xl md:text-7xl font-semibold mb-6 md:mb-8 tracking-tight text-white leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Deploy your <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-indigo-400 animate-gradient-x">
              Digital Workforce.
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            className="text-base sm:text-lg md:text-2xl text-slate-400 mb-8 md:mb-12 leading-relaxed max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Stop trading time for money. Implement AI agents that capture leads, book meetings, and support customers <strong className="text-white font-semibold">24/7/365</strong>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Primary Button */}
            <Link
              to="/booking"
              className="group relative w-auto overflow-hidden rounded-full bg-white p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 block"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="w-full h-full"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-5 py-2.5 md:px-8 md:py-4 text-sm md:text-lg font-bold text-white backdrop-blur-3xl gap-2">
                  Launch My AI Agent
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.div>
            </Link>

            {/* Secondary Button */}
            <motion.a
              onClick={() => document.getElementById('roi-calculator-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="cursor-pointer group flex items-center justify-center gap-2 px-5 py-2.5 md:px-8 md:py-4 w-auto rounded-full bg-white/5 text-white font-medium text-sm md:text-lg border border-white/10 hover:bg-white/10 transition-all backdrop-blur-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Zap className="w-4 h-4 md:w-5 md:h-5 text-indigo-400 fill-current" />
              <span>Calculate ROI</span>
            </motion.a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
             initial={{ opacity: 0 }}
             animate={isInView ? { opacity: 1 } : {}}
             transition={{ delay: 0.6, duration: 1 }}
             className="mt-10 pt-6 md:mt-16 md:pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 text-xs md:text-sm text-slate-500 font-medium"
          >
             <div className="flex items-center gap-2">
                <div className="p-1 bg-green-500/10 rounded-full"><div className="w-1.5 h-1.5 bg-green-500 rounded-full" /></div>
                99.9% Uptime
             </div>
             <div className="hidden md:block w-1 h-1 bg-slate-700 rounded-full" />
             <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400" />
                Telephony & VoIP Ready
             </div>
             <div className="hidden md:block w-1 h-1 bg-slate-700 rounded-full" />
             <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-slate-400" />
                WhatsApp Certified
             </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};