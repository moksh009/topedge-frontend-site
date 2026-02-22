import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Phone, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CTASectionProps {
  variant?: 'light' | 'dark';
}

export const CTASection = ({ variant = 'dark' }: CTASectionProps) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const isLight = variant === 'light';

  // Parallax effect for the background
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={sectionRef}
      className={`relative py-16 md:py-32 overflow-hidden ${isLight ? 'bg-[#FAFAFC]' : 'bg-[#020617]'}`}
    >
      {/* --- BACKGROUND DECORATION --- */}
      {!isLight ? (
        <div className="absolute inset-0 w-full h-full opacity-30">
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
          />
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <motion.div
              animate={{ top: ["-10%", "110%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute left-[20%] w-[1px] h-[200px] bg-gradient-to-b from-transparent via-indigo-500 to-transparent opacity-70"
            />
            <motion.div
              animate={{ top: ["-10%", "110%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 2 }}
              className="absolute left-[50%] w-[1px] h-[300px] bg-gradient-to-b from-transparent via-blue-500 to-transparent opacity-50"
            />
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-100 rounded-full blur-[120px]"
          />
        </div>
      )}

      {/* Ambient Glows (Dark only) */}
      {!isLight && (
        <motion.div style={{ y: backgroundY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
        </motion.div>
      )}

      <div className="relative container mx-auto px-4 sm:px-6 z-10">
        <motion.div
          className={`max-w-6xl mx-auto ${isLight ? 'bg-white border border-slate-200 rounded-[32px] p-8 md:p-20 shadow-sm' : ''} text-center`}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${isLight ? 'bg-slate-900 text-white' : 'bg-white/5 border border-white/10 text-indigo-300'} text-[10px] font-bold uppercase tracking-[0.2em] mb-8 shadow-lg shadow-indigo-500/10`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Deployment Ready</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            className={`text-3xl sm:text-5xl md:text-7xl font-bold mb-6 md:mb-8 tracking-tighter ${isLight ? 'text-slate-900' : 'text-white'} leading-[1]`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {isLight ? (
              <>
                Ready to architect <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-600 to-slate-900">
                  your AI future?
                </span>
              </>
            ) : (
              <>
                Your future customer are waiting <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-indigo-400 animate-gradient-x">Respond now.</span>
              </>
            )}
          </motion.h2>

          {/* Subtext */}
          <motion.p
            className={`text-base sm:text-lg md:text-xl ${isLight ? 'text-slate-500' : 'text-slate-400'} mb-8 md:mb-12 leading-relaxed max-w-3xl mx-auto font-light`}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {isLight ? (
              "Join the visionary brands leveraging TopEdge Intelligence to redefine customer engagement and unlock scalable AI ROI."
            ) : (
              <>
                Fortunately you're on right website. <br />
                The technology to answer, qualify, and convert every single lead, the moment they reach out, is ready to deploy - are you?
              </>
            )}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link
              to="/booking"
              className={`group flex items-center gap-3 px-8 py-4 rounded-[1.5rem] ${isLight ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'} font-bold text-lg shadow-xl shadow-indigo-500/10 hover:scale-105 transition-all`}
            >
              <span>{isLight ? 'Secure Your Demo' : 'Schedule Coffee call'}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {isLight && (
              <Link
                to="/roi"
                className="group flex items-center gap-3 px-8 py-4 rounded-[1.5rem] bg-white border border-slate-200 text-slate-900 font-bold text-lg hover:bg-slate-50 transition-all shadow-sm"
              >
                <Zap className="w-5 h-5 text-indigo-600" />
                <span>Analyze ROI</span>
              </Link>
            )}
          </motion.div>

          {/* Trust Line */}
          <motion.div
            className={`mt-10 pt-6 md:mt-16 md:pt-8 border-t ${isLight ? 'border-slate-100' : 'border-white/5'} flex flex-wrap justify-center gap-6 md:gap-12 text-[10px] md:text-xs font-bold uppercase tracking-widest ${isLight ? 'text-slate-400' : 'text-slate-500'}`}
          >
            <div className="flex items-center gap-2">
              <div className={`p-1 ${isLight ? 'bg-indigo-50' : 'bg-indigo-500/10'} rounded-full`}>
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
              </div>
              99.9% Uptime Ready
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" />
              VoIP Integrated
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5" />
              SLA Certified
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};