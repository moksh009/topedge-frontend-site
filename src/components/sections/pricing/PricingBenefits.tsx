import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, BarChart3, Settings2, Globe2, Sparkles, ArrowRight } from 'lucide-react';

const benefits = [
  {
    icon: MessageSquare,
    title: "Smarter AI Conversations",
    description: "Our AI doesn't just guess keywords; it understands context. It handles complex customer questions naturally, giving accurate answers every single time so your human team doesn't have to.",
    highlight: "99% Accuracy",
    colSpan: "md:col-span-2", // Full width on desktop
    theme: "dark",
  },
  {
    icon: BarChart3,
    title: "Live Tracking & Analytics",
    description: "See exactly what your AI is saying to customers in real-time. Track costs, monitor conversations, and seamlessly take over manually whenever you need to.",
    highlight: "Full Transparency",
    colSpan: "md:col-span-1", // Half width
    theme: "light",
  },
  {
    icon: Settings2,
    title: "Easy No-Code Setup",
    description: "You don't need a developer to make changes. Update your AI's behavior, add new rules, or change responses instantly with our visual builder.",
    highlight: "Zero Coding",
    colSpan: "md:col-span-1", // Half width
    theme: "light",
  },
  {
    icon: Globe2,
    title: "Speaks 30+ Languages",
    description: "Expand your business globally without hiring international teams. The AI automatically detects your customer's language and replies fluently, making every user feel at home.",
    highlight: "Global Reach",
    colSpan: "md:col-span-2", // Full width
    theme: "glass",
  }
];

const PricingBenefits = () => {
  return (
    // Natural layout: No fixed heights, no sticky positioning. It takes exactly the space it needs.
    <section className="relative bg-[#FAFAFC] z-20 py-24 md:py-32 border-t border-slate-200">

      {/* Subtle Premium Background Grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '64px 64px'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header Section - Centered and Clean */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-slate-600 text-[10px] font-bold uppercase tracking-widest mb-8">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Why Choose TopEdge AI?</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-[-0.03em] leading-[1.1] mb-6">
              Everything you need to <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">
                scale effortlessly.
              </span>
            </h2>

            <p className="text-slate-500 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
              Stop worrying about missed messages or paying for expensive support teams. Our AI handles the heavy lifting so you can focus on growing your business.
            </p>
          </motion.div>
        </div>

        {/* The Bento Grid - Bulletproof Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className={`
                relative overflow-hidden rounded-[2rem] p-8 md:p-12 group transition-all duration-500
                ${benefit.colSpan}
                ${benefit.theme === 'dark'
                  ? 'bg-slate-900 border border-slate-800 shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(79,70,229,0.3)] hover:-translate-y-1'
                  : benefit.theme === 'glass'
                    ? 'bg-white/60 backdrop-blur-xl border border-white shadow-xl hover:shadow-2xl hover:-translate-y-1'
                    : 'bg-white border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-1'}
              `}
            >
              {/* Animated Hover Backgrounds */}
              {benefit.theme === 'dark' && (
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full group-hover:bg-indigo-500/20 transition-colors duration-700 pointer-events-none" />
              )}
              {benefit.theme === 'glass' && (
                <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] bg-blue-400/10 blur-[80px] rounded-full group-hover:bg-blue-500/20 transition-colors duration-700 pointer-events-none" />
              )}
              {benefit.theme === 'light' && (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              )}

              <div className="relative z-10 flex flex-col h-full">

                {/* Card Header (Icon & Badge) */}
                <div className="flex items-start justify-between mb-10 md:mb-16">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3
                    ${benefit.theme === 'dark' ? 'bg-white/10 text-white' : 'bg-indigo-50 text-indigo-600'}
                  `}>
                    <benefit.icon className="w-6 h-6" />
                  </div>

                  <div className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest
                    ${benefit.theme === 'dark' ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/30' : 'bg-white text-indigo-600 border border-slate-100 shadow-sm'}
                  `}>
                    {benefit.highlight}
                  </div>
                </div>

                {/* Card Content */}
                <div className="mt-auto">
                  <h3 className={`text-2xl md:text-3xl font-bold tracking-tight mb-4
                    ${benefit.theme === 'dark' ? 'text-white' : 'text-slate-900'}
                  `}>
                    {benefit.title}
                  </h3>

                  <p className={`text-base md:text-lg font-light leading-relaxed max-w-2xl
                    ${benefit.theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}
                  `}>
                    {benefit.description}
                  </p>
                </div>

                {/* Arrow for the large cards to indicate action */}
                {(benefit.theme === 'dark' || benefit.theme === 'glass') && (
                  <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${benefit.theme === 'dark' ? 'bg-white/10 text-white' : 'bg-indigo-600 text-white shadow-lg'}`}>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PricingBenefits;