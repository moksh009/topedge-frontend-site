import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Calculator, Sparkles, Zap, Star, ShieldCheck } from 'lucide-react';

const PricingHero = () => {
  const navigate = useNavigate();

  // --- Premium Entrance Animations ---
  // These play once on page load. The "exit" is handled by the next section scrolling over this one.
  const titleVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const actionsVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    // CRITICAL CHANGE: The container is now sticky, h-screen, and has z-0.
    // This allows the next section (with a higher z-index) to scroll over it.
    <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#FAFAFC] z-0">
      <div className="relative h-full w-full flex flex-col justify-center">

        {/* --- Premium Background Elements --- */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Subtle noise texture for a premium feel */}
          <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

          {/* Smooth Mesh Gradients with gentle breathing animation */}
          <motion.div
            animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.5, 0.4], y: [0, -30, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10%] left-[-5%] w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-indigo-200/40 rounded-full blur-[120px] will-change-transform"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.4, 0.3], y: [0, 30, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[-10%] right-[-5%] w-[90vw] h-[90vw] max-w-[1000px] max-h-[1000px] bg-blue-200/30 rounded-full blur-[140px] will-change-transform"
          />

          {/* Floating Tech Annotations */}
          <div className="absolute inset-0 z-0 max-w-7xl mx-auto hidden md:block">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[20%] left-[5%] p-4 border border-slate-200/60 rounded-xl backdrop-blur-md bg-white/40 shadow-sm pointer-events-none"
            >
              <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-2">System.Status</div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
                <span className="text-[10px] font-mono text-slate-700 font-medium">NEURAL_READY :: EDGE</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-[35%] right-[5%] p-4 border border-slate-200/60 rounded-xl backdrop-blur-md bg-white/40 shadow-sm pointer-events-none"
            >
              <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-2">Latency.Target</div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-indigo-600 font-bold">&lt; 12ms</span>
                <span className="text-[9px] font-mono text-slate-500">@GLOBAL_ACCEL</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- Main Content Area --- */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center flex flex-col items-center justify-center">

            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-slate-200 shadow-sm text-[11px] font-bold uppercase tracking-[0.2em] mb-10"
            >
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500">Investment Reveal 2026</span>
            </motion.div>

            {/* Staggered Content Reveal */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            >
              {/* Title */}
              <motion.div variants={titleVariants} className="relative z-20 will-change-transform mb-6">
                <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-[-0.04em] text-slate-900 leading-[1.05]">
                  Pricing for <br />
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-600 pb-2">
                    Visionaries.
                    {/* Subtle glow behind the gradient text */}
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-500 to-indigo-600 blur-2xl opacity-20 -z-10 bg-clip-text text-transparent mix-blend-multiply" aria-hidden="true">
                      Visionaries.
                    </span>
                  </span>
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.div variants={subtitleVariants} className="relative px-4 z-10 will-change-transform mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl text-slate-500 font-medium leading-tight tracking-tight max-w-4xl mx-auto">
                  Transparent economics.
                  <span className="text-slate-900 font-bold block sm:inline"> Built for meaningful impact.</span>
                </h2>
              </motion.div>

              {/* Actions */}
              <motion.div variants={actionsVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-30 will-change-transform">
                <button
                  onClick={() => document.getElementById('pricing-plans')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group relative px-8 py-4 rounded-full bg-slate-900 text-white font-bold text-lg flex items-center gap-3 overflow-hidden shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <CreditCard className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Explore Economics</span>
                </button>

                <button
                  onClick={() => navigate('/roi')}
                  className="group px-8 py-4 rounded-full bg-white/80 backdrop-blur-md border border-slate-200/80 text-slate-900 font-bold text-lg flex items-center gap-3 hover:bg-white hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 shadow-sm"
                >
                  <Calculator className="w-5 h-5 text-indigo-600 group-hover:rotate-12 transition-transform duration-300" />
                  Project My ROI
                </button>
              </motion.div>
            </motion.div>

          </div>
        </div>



        {/* Global Trust Bar */}
        <div className="absolute bottom-0 left-0 w-full py-6 border-t border-slate-200/50 bg-white/50 backdrop-blur-xl z-30">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 sm:gap-12 md:gap-24 items-center px-4">
            {[
              { icon: ShieldCheck, text: "Privacy First", color: "text-emerald-600", bg: "bg-emerald-100" },
              { icon: Zap, text: "Global Edge", color: "text-blue-600", bg: "bg-blue-100" },
              { icon: Star, text: "24/7 Support", color: "text-indigo-600", bg: "bg-indigo-100" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1, duration: 0.6 }}
                className="flex items-center gap-2.5"
              >
                <div className={`p-1.5 rounded-lg ${item.bg}`}>
                  <item.icon className={`w-4 h-4 ${item.color}`} />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PricingHero;