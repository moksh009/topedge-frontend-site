import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Bot, CalendarCheck, 
  ArrowRight, Calculator, CheckCircle2 
} from 'lucide-react';

interface Benefit {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  painPoints: string[];
  solutions: string[];
  stats: {
    value: string;
    label: string;
  }[];
  theme: 'blue' | 'purple' | 'rose';
}

const benefits: Benefit[] = [
  {
    icon: Sparkles,
    title: "AI Voice Agent",
    subtitle: "24/7 Intelligent Call Handling",
    painPoints: ["Missed calls = lost revenue", "High staffing costs"],
    solutions: ["Handles unlimited calls", "Qualifies leads instantly"],
    stats: [
      { value: "100%", label: "Answer Rate" },
      { value: "65%", label: "Cost Savings" },
      { value: "3x", label: "Conversion" }
    ],
    theme: 'blue'
  },
  {
    icon: Bot,
    title: "Advanced Chatbot",
    subtitle: "Instant Multi-Channel Support",
    painPoints: ["Slow response times", "Inconsistent answers"],
    solutions: ["Instant 24/7 replies", "Omni-channel presence"],
    stats: [
      { value: "<2s", label: "Response Time" },
      { value: "45%", label: "Cost Reduction" },
      { value: "24/7", label: "Availability" }
    ],
    theme: 'purple'
  },
  {
    icon: CalendarCheck,
    title: "Auto Scheduling",
    subtitle: "Global Booking System",
    painPoints: ["Scheduling conflicts", "Timezone confusion"],
    solutions: ["Smart conflict resolution", "Automated reminders"],
    stats: [
      { value: "+40%", label: "Bookings" },
      { value: "0", label: "Conflicts" },
      { value: "Auto", label: "Sync" }
    ],
    theme: 'rose'
  }
];

const AIBenefitsShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Helper to get theme colors
  const getThemeStyles = (theme: string) => {
    switch (theme) {
      case 'blue': return { 
        bg: 'bg-blue-50/50', 
        text: 'text-blue-600', 
        border: 'border-blue-100',
        hoverBorder: 'group-hover:border-blue-300', 
        iconBg: 'bg-blue-100 text-blue-600',
        gradient: 'from-blue-50 to-white',
        statBg: 'bg-blue-50/80',
        statBorder: 'border-blue-100',
        shadow: 'shadow-blue-500/10'
      };
      case 'purple': return { 
        bg: 'bg-purple-50/50', 
        text: 'text-purple-600', 
        border: 'border-purple-100',
        hoverBorder: 'group-hover:border-purple-300', 
        iconBg: 'bg-purple-100 text-purple-600',
        gradient: 'from-purple-50 to-white',
        statBg: 'bg-purple-50/80',
        statBorder: 'border-purple-100',
        shadow: 'shadow-purple-500/10'
      };
      case 'rose': return { 
        bg: 'bg-rose-50/50', 
        text: 'text-rose-600', 
        border: 'border-rose-100',
        hoverBorder: 'group-hover:border-rose-300', 
        iconBg: 'bg-rose-100 text-rose-600',
        gradient: 'from-rose-50 to-white',
        statBg: 'bg-rose-50/80',
        statBorder: 'border-rose-100',
        shadow: 'shadow-rose-500/10'
      };
      default: return { 
        bg: 'bg-slate-50/50', 
        text: 'text-slate-600', 
        border: 'border-slate-100',
        hoverBorder: 'group-hover:border-slate-300', 
        iconBg: 'bg-slate-100 text-slate-600',
        gradient: 'from-slate-50 to-white',
        statBg: 'bg-slate-50',
        statBorder: 'border-slate-100',
        shadow: 'shadow-slate-500/10'
      };
    }
  };

  return (
    <section className="relative w-full bg-white py-24 sm:py-32 overflow-hidden font-sans">
      
      {/* --- Ambient Background --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-slate-50 to-transparent opacity-80" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* --- Header Section --- */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-semibold mb-8 shadow-sm hover:shadow-md transition-shadow cursor-default"
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-sm text-emerald-600">
              <Calculator className="w-3.5 h-3.5" />
            </span>
            Add up to $10k/mo in Revenue
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6"
          >
            Transform Your Business <br className="hidden sm:block" />
            <span className="text-slate-400">With TopEdge AI</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto"
          >
            Deploy enterprise-grade AI agents that work 24/7. Reduce costs, increase efficiency, and never miss an opportunity.
          </motion.p>
        </div>

        {/* --- Benefits Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => {
            const styles = getThemeStyles(benefit.theme);
            const isHovered = hoveredIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative flex flex-col h-full rounded-[2rem] border transition-all duration-500 ${styles.border} ${styles.hoverBorder} hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-2 overflow-hidden bg-white`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-b ${styles.gradient} opacity-40 transition-opacity duration-500 group-hover:opacity-100`} />
                
                <div className="relative p-8 flex flex-col h-full z-10">
                  {/* Icon Header */}
                  <div className="flex justify-between items-start mb-8">
                    <div className={`w-16 h-16 rounded-2xl ${styles.iconBg} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      <benefit.icon className="w-8 h-8" strokeWidth={1.5} />
                    </div>
                    {/* Visual Indicator */}
                    <div className={`p-2 rounded-full ${styles.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                      <ArrowRight className={`w-5 h-5 ${styles.text} -rotate-45 group-hover:rotate-0 transition-transform duration-500`} />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-black transition-colors">{benefit.title}</h3>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-6">{benefit.subtitle}</p>
                    
                    {/* Solutions List */}
                    <ul className="space-y-4">
                      {benefit.solutions.map((sol, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600 text-[15px] group-hover:text-slate-900 transition-colors">
                          <div className={`mt-0.5 p-0.5 rounded-full ${styles.bg}`}>
                            <CheckCircle2 className={`w-4 h-4 ${styles.text}`} />
                          </div>
                          {sol}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* PREMIUM STATS SECTION - Completely Redesigned */}
                  <div className="mt-auto">
                    <div className="grid grid-cols-3 gap-3">
                      {benefit.stats.map((stat, i) => (
                        <div 
                          key={i} 
                          className={`relative flex flex-col items-center justify-center p-3 rounded-2xl border transition-all duration-300 ${styles.statBg} ${styles.statBorder} hover:scale-105 hover:shadow-lg hover:bg-white group-hover:border-opacity-100 border-opacity-60`}
                        >
                          {/* Inner Content */}
                          <div className={`text-lg font-bold ${styles.text} tabular-nums tracking-tight leading-none mb-1`}>
                            {stat.value}
                          </div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center leading-tight">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* --- IMPROVED PREMIUM CTA BUTTON --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-24 text-center"
        >
          <button className="group relative inline-flex items-center justify-center p-[2px] overflow-hidden rounded-full transition-transform hover:-translate-y-1 active:scale-95">
            {/* Gradient Border Animation */}
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 animate-[spin_4s_linear_infinite]" />
            
            {/* Button Inner */}
            <span className="relative inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-10 py-5 text-lg font-bold text-white transition-all group-hover:bg-slate-900">
              <span className="mr-3">Start Your Transformation</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              
              {/* Glossy Overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </span>
            
            {/* Drop Shadow Glow */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500" />
          </button>
          
          <div className="mt-6 flex items-center justify-center gap-6 text-sm font-medium text-slate-500">
             <span className="flex items-center gap-1.5">
               <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free Consultation
             </span>
             <span className="w-1 h-1 rounded-full bg-slate-300" />
             <span className="flex items-center gap-1.5">
               <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No Credit Card
             </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default React.memo(AIBenefitsShowcase);