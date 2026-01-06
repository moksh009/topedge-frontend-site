import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, MessageCircle, AlertTriangle, 
  Zap, Sparkles, TrendingUp, 
  X, ArrowDown, ArrowRight, CheckCircle2 
} from 'lucide-react';

const problems = [
  {
    icon: Clock,
    title: 'Missed Opportunities',
    description: 'Late-night queries go unanswered, pushing leads to competitors.',
    color: 'text-rose-500',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-100'
  },
  {
    icon: MessageCircle,
    title: 'Fragmented Chaos',
    description: 'DMs, emails, and comments scattered across 5 different apps.',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-100'
  },
  {
    icon: AlertTriangle,
    title: 'Inconsistent Support',
    description: 'Manual replies are slow and vary in quality.',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-100'
  },
];

const solutions = [
  {
    icon: Zap,
    title: 'Instant 24/7 Response',
    description: 'AI replies in seconds, ensuring you never miss a lead.',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-100'
  },
  {
    icon: Sparkles,
    title: 'Unified Intelligence',
    description: 'One brain managing DMs, comments, and emails seamlessly.',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-100'
  },
  {
    icon: TrendingUp,
    title: 'Revenue Focused',
    description: 'Conversations designed to convert inquiries into sales.',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-100'
  },
];

const ProblemsSolutionsSection = () => {
  return (
    <section className="relative w-full bg-slate-50 py-20 md:py-32 overflow-hidden font-sans">
      
      {/* --- Ambient Background Effects --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        {/* Glows - Adjusted for Light Theme */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-rose-100/40 rounded-full blur-[120px] mix-blend-multiply" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[120px] mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* --- Section Header --- */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-medium text-slate-500 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            The Reality Check
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight"
          >
            Customers are everywhere. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-600 to-slate-800">
              Is your time?
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500"
          >
            Stop trading sleep for support. Upgrade from manual chaos to automated precision.
          </motion.p>
        </div>

        {/* --- Comparison Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start relative">
          
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-lg text-slate-400">
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>

          {/* Connector (Mobile) */}
          <div className="lg:hidden flex justify-center -my-4 z-20 relative">
            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-lg text-slate-400">
              <ArrowDown className="w-5 h-5" />
            </div>
          </div>

          {/* --- LEFT: The Problem (The Old Way) --- */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative"
          >
            {/* Background Layer - Adjusted for Light Theme */}
            <div className="absolute inset-0 bg-gradient-to-b from-rose-50 to-transparent rounded-3xl blur-xl transition-opacity opacity-40 group-hover:opacity-60" />
            
            <div className="relative h-full bg-white/60 backdrop-blur-xl border border-rose-100 rounded-3xl p-6 sm:p-8 md:p-10 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              {/* Header */}
              <div className="flex items-center gap-4 mb-8 border-b border-rose-100 pb-6">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center border border-rose-100 text-rose-500">
                  <X className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">The Old Way</h3>
                  <p className="text-sm text-slate-500 font-medium">Manual & Overwhelming</p>
                </div>
              </div>

              {/* List */}
              <div className="space-y-6">
                {problems.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`mt-1 p-1.5 rounded-lg ${item.bgColor} ${item.borderColor} border shrink-0`}>
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <div>
                      <h4 className="text-slate-800 font-semibold text-sm sm:text-base mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* --- RIGHT: The Solution (TopEdge Way) --- */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative"
          >
            {/* Animated Glow Border - Adjusted for Light Theme */}
            <div className="absolute -inset-[1px] bg-gradient-to-b from-emerald-100 to-indigo-100 rounded-[25px] opacity-40 group-hover:opacity-80 blur-sm transition-opacity duration-500" />
            
            <div className="relative h-full bg-white/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 md:p-10 border border-emerald-100 shadow-xl shadow-emerald-900/5">
              
              {/* Header */}
              <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6 relative">
                 {/* Shine effect on header */}
                <div className="absolute top-0 right-0 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                  Recommended
                </div>
                
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-50 to-indigo-50 flex items-center justify-center border border-white shadow-sm">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">TopEdge AI</h3>
                  <p className="text-sm text-indigo-600 font-medium">Automated & Intelligent</p>
                </div>
              </div>

              {/* List */}
              <div className="space-y-6">
                {solutions.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className={`mt-1 p-1.5 rounded-lg ${item.bgColor} ${item.borderColor} border shrink-0 shadow-sm`}>
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-semibold text-sm sm:text-base mb-1">{item.title}</h4>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative Shine */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-200 to-transparent opacity-50" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ProblemsSolutionsSection;