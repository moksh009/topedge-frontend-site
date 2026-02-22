import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
   Clock, Zap, Globe, ShieldCheck,
   User, Bot, Check, Sparkles,
   Command, Search, BarChart3,
   ArrowUp
} from 'lucide-react';

// --- VISUAL COMPONENTS (Right Side UI) ---

const AvailabilityVisual = () => (
   <div className="relative w-full h-full flex flex-col bg-[#0B1121] rounded-2xl overflow-hidden font-sans border border-white/10 shadow-2xl">
      {/* Header */}
      <div className="h-12 border-b border-white/10 flex items-center px-6 justify-between bg-slate-900/80 backdrop-blur-md z-10">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">System Live</span>
         </div>
         <div className="text-[11px] font-mono text-slate-600">03:42 AM</div>
      </div>

      <div className="flex-1 p-6 relative flex flex-col justify-center">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px]"></div>

         <div className="space-y-6 relative z-10">
            <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="flex items-start gap-3"
            >
               <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/10 shrink-0">
                  <User size={14} className="text-slate-400" />
               </div>
               <div className="bg-slate-800 border border-white/5 p-4 rounded-2xl rounded-tl-none max-w-[85%]">
                  <p className="text-sm text-slate-300">I need a quote ASAP. Are you open?</p>
               </div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.8 }}
               className="flex items-start gap-3 flex-row-reverse"
            >
               <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 shrink-0">
                  <Bot size={14} className="text-emerald-400" />
               </div>
               <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl rounded-tr-none max-w-[85%]">
                  <p className="text-sm text-emerald-100">
                     <span className="font-bold block text-[10px] text-emerald-500 mb-2 uppercase tracking-wider">Replied in 0.1s</span>
                     Yes! We're online 24/7. I've generated your quote based on your profile. Sending it now! ⚡️
                  </p>
               </div>
            </motion.div>
         </div>
      </div>
   </div>
);

const SpeedVisual = () => (
   <div className="relative w-full h-full flex flex-col bg-[#0B1121] rounded-2xl overflow-hidden items-center justify-center border border-white/10 shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.1)_0%,_transparent_70%)]" />

      <div className="relative z-10 w-full px-10 text-center">
         <div className="mb-8">
            <span className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.3em] mb-4 block">Total Latency</span>
            <span className="text-7xl font-black text-white tracking-tighter">120<span className="text-3xl text-blue-500">ms</span></span>
         </div>

         {/* Progress Bar Container */}
         <div className="h-4 w-full bg-slate-800/50 rounded-full overflow-hidden p-1 mb-8 border border-white/5">
            <motion.div
               initial={{ width: "0%" }}
               animate={{ width: "95%" }}
               transition={{ duration: 1.2, ease: "circOut" }}
               className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)]"
            />
         </div>

         <div className="flex justify-between text-xs text-slate-400 font-mono uppercase tracking-wide">
            <span>Parsing</span>
            <span className="text-white font-bold">Thinking</span>
            <span>Reply</span>
         </div>
      </div>
   </div>
);

const GlobalVisual = () => (
   <div className="relative w-full h-full flex flex-col bg-[#0B1121] rounded-2xl overflow-hidden p-8 justify-center border border-white/10 shadow-2xl">
      <div className="absolute top-0 right-0 w-40 h-40 bg-violet-500/10 rounded-full blur-[60px]" />

      <div className="relative z-10 space-y-6">
         {/* Message 1 */}
         <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-slate-900 border border-white/5 p-4 rounded-xl"
         >
            <div className="flex justify-between mb-2">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">User • Spanish</span>
            </div>
            <p className="text-slate-300 text-base">"Necesito ayuda con mi pedido."</p>
         </motion.div>

         {/* Translation Icon */}
         <div className="flex justify-center py-2">
            <div className="p-3 bg-violet-500/20 rounded-full text-violet-400 border border-violet-500/30">
               <Globe size={20} />
            </div>
         </div>

         {/* Message 2 */}
         <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-violet-500/10 border border-violet-500/20 p-4 rounded-xl"
         >
            <div className="flex justify-between mb-2">
               <span className="text-[10px] font-bold text-violet-300 uppercase tracking-wider">AI • English Context</span>
            </div>
            <p className="text-white text-base">"I need help with my order."</p>
         </motion.div>
      </div>
   </div>
);

const TrustVisual = () => (
   <div className="relative w-full h-full flex flex-col bg-[#0B1121] rounded-2xl overflow-hidden p-8 justify-center border border-white/10 shadow-2xl">
      <div className="flex flex-col items-center mb-8">
         <div className="w-16 h-16 rounded-3xl bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4 border border-rose-500/20 shadow-[0_0_30px_rgba(244,63,94,0.15)]">
            <ShieldCheck size={32} />
         </div>
         <h4 className="text-white font-bold text-xl mb-1">Brand Guardian</h4>
         <p className="text-slate-500 text-sm">100% Policy Compliance</p>
      </div>

      <div className="space-y-3">
         {[
            { label: "PII Redaction", icon: Check },
            { label: "Tone Check", icon: BarChart3 },
            { label: "Fact Verification", icon: Search }
         ].map((item, i) => (
            <motion.div
               key={i}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 + (i * 0.15) }}
               className="flex items-center justify-between p-3.5 bg-slate-900/50 border border-white/5 rounded-xl"
            >
               <div className="flex items-center gap-4">
                  <div className="text-rose-500"><item.icon size={16} /></div>
                  <span className="text-sm text-slate-300 font-medium">{item.label}</span>
               </div>
               <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-500 uppercase">Passed</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
               </div>
            </motion.div>
         ))}
      </div>
   </div>
);

// --- DATA ---
const features = [
   {
      id: 'availability',
      tag: "Instant",
      title: "Zero Latency",
      description: "Answers in < 0.2s. Keeps customers engaged and happy.",
      stat: "120ms Reply",
      color: "blue",
      visual: <SpeedVisual />,
      icon: Zap
   },
   {
      id: 'speed',
      tag: "Always On",
      title: "24/7 Lead Capture",
      description: "Capture opportunities at 3 AM. While competitors sleep, TopEdge engages visitors instantly.",
      stat: "100% Uptime",
      color: "emerald",
      visual: <AvailabilityVisual />,
      icon: Clock
   },
   {
      id: 'global',
      tag: "Global",
      title: "95+ Languages",
      description: "Auto-detects and speaks your customer's native language with native fluency.",
      stat: "Native Fluency",
      color: "violet",
      visual: <GlobalVisual />,
      icon: Globe
   },
   {
      id: 'trust',
      tag: "Secure",
      title: "Brand Guardian",
      description: "Never goes off-script. Perfectly adheres to your brand guidelines and safety policies.",
      stat: "99.9% Safe",
      color: "rose",
      visual: <TrustVisual />,
      icon: ShieldCheck
   }
];

const ChatbotBenefitsSection = () => {
   const [activeFeature, setActiveFeature] = useState(0);

   return (
      <section className="bg-black relative">

         {/* Background Ambience */}
         <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
         </div>

         <div className="container mx-auto px-4 md:px-6 relative z-10">

            {/* HEADER */}
            <div className="text-center max-w-4xl mx-auto py-16 md:py-32">
               {/* ... badge content ... */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md"
               >
                  <Command size={14} />
                  TopEdge AI Core
               </motion.div>
               <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight"
               >
                  Intelligence that <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-400">
                     never sleeps.
                  </span>
               </motion.h2>
               <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto">
                  An autonomous revenue engine designed to capture, qualify, and convert leads 24/7.
               </p>
            </div>

            {/* --- MOBILE LAYOUT (Vertical Cards) --- */}
            <div className="lg:hidden space-y-16 pb-16">
               {features.map((feature, index) => (
                  <motion.div
                     key={index}
                     initial={{ opacity: 0, y: 40 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-100px" }}
                     transition={{ duration: 0.6 }}
                     className="flex flex-col gap-8 items-center text-center"
                  >
                     {/* Visual Container */}
                     <div className="w-full aspect-square max-w-[360px] bg-[#0B1121] rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden ring-1 ring-white/5">
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-20" />
                        <div className="absolute inset-0 z-10">
                           {feature.visual}
                        </div>
                     </div>

                     {/* Connection Arrow */}
                     <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="text-slate-600 flex flex-col items-center gap-1"
                     >
                        <ArrowUp size={24} />
                     </motion.div>

                     {/* Text Info */}
                     <div className="px-4 flex flex-col items-center max-w-sm">
                        <div className={`inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900/50 border border-white/10 ${getColorClass(feature.color)}`}>
                           <feature.icon size={12} />
                           {feature.tag}
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-4">{feature.title}</h3>
                        <p className="text-base text-slate-400 leading-relaxed mb-6">{feature.description}</p>

                        <div className="flex items-center gap-2 pt-4 border-t border-white/5 w-full justify-center">
                           <div className={`p-1.5 rounded-full bg-slate-900 border border-white/5 ${getColorClass(feature.color)}`}>
                              <Sparkles size={14} />
                           </div>
                           <span className="text-sm font-mono text-slate-300 uppercase tracking-wide">{feature.stat}</span>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>

            {/* --- DESKTOP LAYOUT (Zig-Zag Alternating) --- */}
            <div className="hidden lg:flex flex-col gap-32 py-20">
               {features.map((feature, index) => (
                  <motion.div
                     key={index}
                     initial={{ opacity: 0, y: 40 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-100px" }}
                     transition={{ duration: 0.7, ease: "easeOut" }}
                     className={`flex items-center justify-between gap-20 ${index % 2 === 1 ? 'flex-row-reverse' : ''}`}
                  >

                     {/* Text Side */}
                     <div className="w-5/12">
                        <div className={`inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 border border-slate-800 w-fit ${getColorClass(feature.color)}`}>
                           <feature.icon size={14} />
                           {feature.tag}
                        </div>
                        <h3 className="text-5xl font-bold text-white mb-6 leading-tight">{feature.title}</h3>
                        <p className="text-lg text-slate-400 leading-relaxed mb-8">{feature.description}</p>

                        <div className="flex items-center gap-3">
                           <div className={`p-2.5 rounded-full bg-slate-900 border border-slate-800 ${getColorClass(feature.color)}`}>
                              <Sparkles size={18} />
                           </div>
                           <span className="text-sm font-mono text-slate-300 tracking-wide uppercase">{feature.stat}</span>
                        </div>
                     </div>

                     {/* Visual Side */}
                     <div className="w-6/12 relative group">
                        {/* Glow Effect */}
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 rounded-full blur-[100px] opacity-20 transition-opacity duration-500 group-hover:opacity-40
                       ${feature.color === 'blue' ? 'bg-blue-600' :
                              feature.color === 'emerald' ? 'bg-emerald-600' :
                                 feature.color === 'violet' ? 'bg-violet-600' : 'bg-rose-600'}
                    `} />

                        {/* Card Container */}
                        <div className="relative w-full aspect-square max-h-[500px] bg-[#0B1121] rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden ring-1 ring-white/5 transition-transform duration-500 hover:scale-[1.02]">

                           {/* Mac-style Window Controls */}
                           <div className="absolute top-0 inset-x-0 h-12 bg-slate-900/50 backdrop-blur-xl border-b border-white/5 flex items-center px-6 gap-2 z-50">
                              <div className="flex gap-2">
                                 <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                                 <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                                 <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                              </div>
                           </div>

                           {/* Visual Content */}
                           <div className="absolute inset-0 pt-12">
                              {feature.visual}
                           </div>
                        </div>
                     </div>

                  </motion.div>
               ))}
            </div>
         </div>
      </section>
   );
};

// --- HELPER COMPONENTS ---

const FeatureTextBlock = ({ feature, index, setActiveFeature }: any) => {
   const ref = useRef(null);
   // Trigger when item is in the vertical center (50% to 50% margin)
   const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

   useEffect(() => {
      if (isInView) setActiveFeature(index);
   }, [isInView, index, setActiveFeature]);

   return (
      <motion.div
         ref={ref}
         initial={{ opacity: 0.2 }}
         animate={{ opacity: isInView ? 1 : 0.2 }}
         transition={{ duration: 0.5 }}
         className="flex flex-col justify-center min-h-[40vh] px-8"
      >
         <div className={`inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 border border-slate-800 w-fit ${getColorClass(feature.color)}`}>
            <feature.icon size={14} />
            {feature.tag}
         </div>
         <h3 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">{feature.title}</h3>
         <p className="text-xl text-slate-400 leading-relaxed mb-8 max-w-lg">{feature.description}</p>
         <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-full bg-slate-900 border border-slate-800 ${getColorClass(feature.color)}`}>
               <Sparkles size={18} />
            </div>
            <span className="text-sm font-mono text-slate-300 tracking-wide uppercase">{feature.stat}</span>
         </div>
      </motion.div>
   );
};

const getColorClass = (color: string) => {
   switch (color) {
      case 'emerald': return 'text-emerald-400';
      case 'blue': return 'text-blue-400';
      case 'violet': return 'text-violet-400';
      case 'rose': return 'text-rose-400';
      default: return 'text-slate-400';
   }
}

export default ChatbotBenefitsSection;
