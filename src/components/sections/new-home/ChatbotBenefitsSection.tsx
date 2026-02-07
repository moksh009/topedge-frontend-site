import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Clock, Zap, Globe, ShieldCheck, 
  User, Bot, Check, Sparkles,
  Command, Cpu, Search, BarChart3,
  ArrowUp
} from 'lucide-react';

// --- VISUAL COMPONENTS (Universal) ---

const AvailabilityVisual = () => (
  <div className="relative w-full h-full flex flex-col bg-[#0B1121] rounded-2xl overflow-hidden font-sans">
    <div className="h-10 border-b border-white/10 flex items-center px-4 justify-between bg-slate-900/50 backdrop-blur-md z-10">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live</span>
      </div>
      <div className="text-[10px] font-mono text-slate-600">03:42 AM</div>
    </div>
    
    <div className="flex-1 p-5 relative flex flex-col justify-center">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      <div className="space-y-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.2 }}
          className="flex items-start gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/10 shrink-0">
            <User size={14} className="text-slate-400" />
          </div>
          <div className="bg-slate-800 border border-white/5 p-3 rounded-2xl rounded-tl-none max-w-[85%]">
            <p className="text-xs text-slate-300">I need a quote ASAP. Are you open?</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.8 }}
          className="flex items-start gap-3 flex-row-reverse"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 shrink-0">
            <Bot size={14} className="text-emerald-400" />
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-2xl rounded-tr-none max-w-[85%]">
            <p className="text-xs text-emerald-100">
              <span className="font-bold block text-[10px] text-emerald-500 mb-1 uppercase tracking-wider">Replied in 0.1s</span>
              Yes! We're online 24/7. I've generated your quote based on your profile. Sending it now! ⚡️
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
);

const SpeedVisual = () => (
  <div className="relative w-full h-full flex flex-col bg-[#0B1121] rounded-2xl overflow-hidden items-center justify-center">
     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.1)_0%,_transparent_70%)]" />
     
     <div className="relative z-10 w-full px-8 text-center">
        <div className="mb-6">
           <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">Latency</span>
           <span className="text-5xl font-black text-white tracking-tighter">120<span className="text-2xl text-blue-500">ms</span></span>
        </div>
        
        {/* Progress Bar Container */}
        <div className="h-3 w-full bg-slate-800/50 rounded-full overflow-hidden p-0.5 mb-6">
           <motion.div 
              initial={{ width: "0%" }}
              whileInView={{ width: "95%" }}
              viewport={{ once: false }}
              transition={{ duration: 1.2, ease: "circOut" }}
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"
           />
        </div>

        <div className="flex justify-between text-xs text-slate-400 font-mono">
           <span>Parsing</span>
           <span className="text-white">Thinking</span>
           <span>Reply</span>
        </div>
     </div>
  </div>
);

const GlobalVisual = () => (
  <div className="relative w-full h-full flex flex-col bg-[#0B1121] rounded-2xl overflow-hidden p-6 justify-center">
     <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-[50px]" />
     
     <div className="relative z-10 space-y-3">
        {/* Message 1 */}
        <motion.div 
           initial={{ x: -20, opacity: 0 }}
           whileInView={{ x: 0, opacity: 1 }}
           viewport={{ once: false }}
           className="bg-slate-900 border border-white/5 p-3 rounded-xl"
        >
           <div className="flex justify-between mb-1">
              <span className="text-[9px] font-bold text-slate-500 uppercase">User • Spanish</span>
           </div>
           <p className="text-slate-300 text-sm">"Necesito ayuda con mi pedido."</p>
        </motion.div>

        {/* Translation Icon */}
        <div className="flex justify-center">
           <div className="p-2 bg-violet-500/20 rounded-full text-violet-400">
              <Globe size={16} />
           </div>
        </div>

        {/* Message 2 */}
        <motion.div 
           initial={{ x: 20, opacity: 0 }}
           whileInView={{ x: 0, opacity: 1 }}
           viewport={{ once: false }}
           transition={{ delay: 0.4 }}
           className="bg-violet-500/10 border border-violet-500/20 p-3 rounded-xl"
        >
           <div className="flex justify-between mb-1">
              <span className="text-[9px] font-bold text-violet-300 uppercase">AI • English Context</span>
           </div>
           <p className="text-white text-sm">"I need help with my order."</p>
        </motion.div>
     </div>
  </div>
);

const TrustVisual = () => (
  <div className="relative w-full h-full flex flex-col bg-[#0B1121] rounded-2xl overflow-hidden p-6 justify-center">
     <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500 mb-3 border border-rose-500/20 shadow-[0_0_20px_rgba(244,63,94,0.2)]">
           <ShieldCheck size={24} />
        </div>
        <h4 className="text-white font-bold text-lg">Safety Guard</h4>
        <p className="text-slate-500 text-xs">100% Brand Compliant</p>
     </div>

     <div className="space-y-2">
        {[
           { label: "PII Redaction", icon: Check },
           { label: "Tone Check", icon: BarChart3 },
           { label: "Fact Verification", icon: Search }
        ].map((item, i) => (
           <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.3 + (i * 0.15) }}
              className="flex items-center justify-between p-2.5 bg-slate-900/50 border border-white/5 rounded-lg"
           >
              <div className="flex items-center gap-3">
                 <div className="text-rose-500"><item.icon size={14} /></div>
                 <span className="text-xs text-slate-300 font-medium">{item.label}</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]" />
           </motion.div>
        ))}
     </div>
  </div>
);

// --- DATA ---
const features = [
  {
    id: 'availability',
    tag: "Always On",
    title: "Never Miss a Lead",
    description: "Capture opportunities at 3 AM while your competitors sleep.",
    stat: "100% Uptime",
    color: "emerald",
    visual: <AvailabilityVisual />,
    icon: Clock
  },
  {
    id: 'speed',
    tag: "Instant",
    title: "Zero Latency",
    description: "Answers in < 0.2s. Keeps customers engaged and happy.",
    stat: "120ms Reply",
    color: "blue",
    visual: <SpeedVisual />,
    icon: Zap
  },
  {
    id: 'global',
    tag: "Global",
    title: "95+ Languages",
    description: "Auto-detects and speaks your customer's native language.",
    stat: "Native Fluency",
    color: "violet",
    visual: <GlobalVisual />,
    icon: Globe
  },
  {
    id: 'trust',
    tag: "Secure",
    title: "Brand Guardian",
    description: "Never goes off-script. Perfectly adheres to your brand guidelines.",
    stat: "99.9% Safe",
    color: "rose",
    visual: <TrustVisual />,
    icon: ShieldCheck
  }
];

const ChatbotBenefitsSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className="bg-black relative pt-20 pb-20 md:py-32">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
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
            className="text-4xl md:text-6xl font-semibold text-white mb-6 leading-tight tracking-tight"
          >
            Intelligence that <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-400">
               never sleeps.
            </span>
          </motion.h2>
          <p className="text-lg text-slate-400 max-w-lg mx-auto">
             An autonomous revenue engine designed to capture, qualify, and convert leads 24/7.
          </p>
        </div>

        {/* --- MOBILE LAYOUT (Center Aligned with Arrow) --- */}
        <div className="lg:hidden space-y-20">
           {features.map((feature, index) => (
              <motion.div 
                 key={index}
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.6 }}
                 className="flex flex-col gap-6 items-center text-center" // Center alignment applied here
              >
                 {/* Visual Container */}
                 <div className="w-full aspect-square bg-[#0B1121] rounded-[2rem] border border-white/10 shadow-2xl relative overflow-hidden ring-1 ring-white/5">
                    {/* Glossy Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-20" />
                    
                    {/* Render Visual */}
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
                    <ArrowUp size={20} />
                 </motion.div>

                 {/* Text Info */}
                 <div className="px-4 flex flex-col items-center">
                    <div className={`inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900/50 border border-white/10 ${getColorClass(feature.color)}`}>
                       <feature.icon size={12} />
                       {feature.tag}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xs">{feature.description}</p>
                    
                    <div className="flex items-center gap-2 pt-4 border-t border-white/5 w-full justify-center">
                       <div className={`p-1.5 rounded-full bg-slate-900 border border-white/5 ${getColorClass(feature.color)}`}>
                          <Sparkles size={12} />
                       </div>
                       <span className="text-xs font-mono text-slate-300 uppercase tracking-wide">{feature.stat}</span>
                    </div>
                 </div>
              </motion.div>
           ))}
        </div>

        {/* --- DESKTOP LAYOUT (Sticky Scroll) --- */}
        <div className="hidden lg:flex flex-row gap-20">
           
           {/* Left: Scrollable Text */}
           <div className="w-1/2 py-[15vh] pb-[40vh]"> 
              <div className="flex flex-col gap-[35vh]">
                 {features.map((feature, index) => (
                    <FeatureTextBlock 
                       key={index} 
                       feature={feature} 
                       index={index} 
                       setActiveFeature={setActiveFeature} 
                    />
                 ))}
              </div>
           </div>

           {/* Right: Sticky Visual */}
           <div className="w-1/2 relative">
              <div className="sticky top-0 h-screen flex items-center justify-center">
                 <div className="relative w-full max-w-md aspect-square bg-[#0B1121] rounded-[2.5rem] border border-white/10 shadow-2xl shadow-black/80 overflow-hidden ring-1 ring-white/5">
                    {/* Window Controls */}
                    <div className="absolute top-0 inset-x-0 h-12 bg-slate-900/50 backdrop-blur-xl border-b border-white/5 flex items-center px-6 gap-2 z-50">
                       <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                       </div>
                    </div>

                    {/* Desktop Content Area */}
                    <div className="absolute inset-0 pt-12">
                        <AnimatePresence mode="wait">
                            <motion.div 
                               key={activeFeature}
                               initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                               animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                               exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                               transition={{ duration: 0.4 }}
                               className="absolute inset-0 p-1"
                            >
                                {features[activeFeature].visual}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </section>
  );
};

// --- HELPER COMPONENTS & FUNCTIONS ---

const FeatureTextBlock = ({ feature, index, setActiveFeature }: any) => {
   const ref = useRef(null);
   const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

   useEffect(() => {
      if (isInView) setActiveFeature(index);
   }, [isInView, index, setActiveFeature]);

   return (
      <div 
         ref={ref}
         className={`transition-all duration-500 ${
            isInView ? 'opacity-100 translate-x-0' : 'opacity-20 -translate-x-4'
         }`}
      >
         <div className={`inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 border border-slate-800 ${getColorClass(feature.color)}`}>
            <feature.icon size={14} />
            {feature.tag}
         </div>
         <h3 className="text-4xl font-bold text-white mb-4">{feature.title}</h3>
         <p className="text-lg text-slate-400 leading-relaxed mb-6 max-w-md">{feature.description}</p>
         <div className="flex items-center gap-3">
            <Sparkles size={16} className={getColorClass(feature.color)} />
            <span className="text-sm font-mono text-slate-300">{feature.stat}</span>
         </div>
      </div>
   );
};

const getColorClass = (color: string) => {
    switch(color) {
        case 'emerald': return 'text-emerald-400';
        case 'blue': return 'text-blue-400';
        case 'violet': return 'text-violet-400';
        case 'rose': return 'text-rose-400';
        default: return 'text-slate-400';
    }
}

export default ChatbotBenefitsSection;