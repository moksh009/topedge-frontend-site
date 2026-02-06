import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Clock, Zap, Globe, ShieldCheck, 
  MessageSquare, BarChart3, User, 
  Bot, ArrowRight, Check, Sparkles,
  Command, Cpu, Search
} from 'lucide-react';

// --- DATA & COPYWRITING ---
const features = [
  {
    id: 'availability',
    tag: "Always On",
    title: "The Sales Rep That Never Sleeps",
    description: "Capture leads at 2 AM as effectively as 2 PM. While your competitors sleep, your AI agent engages visitors, qualifies prospects, and books meetings directly into your calendar.",
    highlight: "Zero downtime. 100% Opportunity capture.",
    color: "emerald",
    icon: Clock,
  },
  {
    id: 'speed',
    tag: "Instant Gratification",
    title: "Zero-Latency Customer Delight",
    description: "Modern customers leave if they wait more than 10 seconds. Your bot delivers instant, accurate answers to common queries, slashing bounce rates and keeping engagement high.",
    highlight: "Response time: < 0.2 seconds",
    color: "blue",
    icon: Zap,
  },
  {
    id: 'global',
    tag: "Borderless Growth",
    title: "Native Fluency in 95+ Languages",
    description: "Don't let language be a barrier to revenue. The AI instantly detects and adapts to the user's native tongue, allowing you to scale into global markets without hiring local support teams.",
    highlight: "Real-time semantic translation",
    color: "violet",
    icon: Globe,
  },
  {
    id: 'trust',
    tag: "Brand Guardian",
    title: "On-Brand, Every Single Time",
    description: "Train the AI on your specific brand voice, knowledge base, and guidelines. It never goes off-script, never has a bad day, and always represents your company perfectly.",
    highlight: "99.9% Accuracy Rate",
    color: "rose",
    icon: ShieldCheck,
  }
];

// --- VISUAL SCREENS (Right Side Content) ---

const AvailabilityVisual = () => (
  <div className="relative w-full h-full flex flex-col bg-slate-950 rounded-2xl overflow-hidden">
    {/* Header */}
    <div className="h-12 border-b border-white/10 flex items-center px-4 justify-between bg-slate-900/50">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">System Status: Online</span>
      </div>
      <div className="text-[10px] font-mono text-slate-500">03:42:15 AM</div>
    </div>
    
    {/* Body */}
    <div className="flex-1 p-6 relative">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      <div className="space-y-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-start gap-3"
        >
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
            <User size={14} className="text-slate-400" />
          </div>
          <div className="bg-slate-800 border border-white/5 p-3 rounded-2xl rounded-tl-none max-w-[80%]">
            <p className="text-sm text-slate-300">Is anyone available to give me a quote? It's urgent.</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-start gap-3 flex-row-reverse"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
            <Bot size={14} className="text-emerald-400" />
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-2xl rounded-tr-none max-w-[80%]">
            <p className="text-sm text-emerald-100">
              <span className="font-bold block text-xs text-emerald-400 mb-1 uppercase tracking-wider">TopEdge AI • 0.1s</span>
              Absolutely! We are online 24/7. Based on your previous inputs, your estimated quote is ready. Shall I send it?
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-8 p-4 bg-slate-900 border border-white/10 rounded-xl flex items-center justify-between"
        >
           <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg">
                 <Check size={16} className="text-emerald-400" />
              </div>
              <div>
                 <div className="text-sm font-bold text-white">Lead Captured</div>
                 <div className="text-xs text-slate-500">Synced to CRM</div>
              </div>
           </div>
           <div className="text-xs font-mono text-emerald-500">+ $4,200 Potential</div>
        </motion.div>
      </div>
    </div>
  </div>
);

const SpeedVisual = () => (
  <div className="relative w-full h-full flex flex-col bg-slate-950 rounded-2xl overflow-hidden">
     <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
        {/* Speedometer Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950" />
        
        <div className="relative z-10 w-full">
           <div className="flex justify-between items-end mb-2">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">Processing Speed</span>
              <span className="text-blue-400 text-2xl font-mono font-bold">120ms</span>
           </div>
           
           {/* Progress Bar Container */}
           <div className="h-4 w-full bg-slate-900 rounded-full border border-white/5 overflow-hidden p-0.5">
              <motion.div 
                 initial={{ width: "0%" }}
                 animate={{ width: "92%" }}
                 transition={{ duration: 1.5, ease: "circOut" }}
                 className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.5)] relative"
              >
                 <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50 animate-pulse" />
              </motion.div>
           </div>

           <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                 { label: "Parsing", time: "12ms", color: "text-blue-400" },
                 { label: "Logic", time: "45ms", color: "text-indigo-400" },
                 { label: "Generation", time: "63ms", color: "text-cyan-400" }
              ].map((stat, i) => (
                 <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    className="bg-slate-900 border border-white/5 p-3 rounded-xl text-center"
                 >
                    <div className={`text-lg font-bold ${stat.color}`}>{stat.time}</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">{stat.label}</div>
                 </motion.div>
              ))}
           </div>
        </div>
     </div>
  </div>
);

const GlobalVisual = () => (
  <div className="relative w-full h-full flex flex-col bg-slate-950 rounded-2xl overflow-hidden p-6">
     <div className="flex-1 flex flex-col justify-center relative z-10">
        
        {/* Input */}
        <motion.div 
           initial={{ x: -20, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           className="bg-slate-900 border border-white/5 p-4 rounded-xl mb-4"
        >
           <div className="flex justify-between mb-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Input • Spanish</span>
              <Globe size={12} className="text-violet-400" />
           </div>
           <p className="text-slate-300 text-lg">"Necesito ayuda con mi pedido."</p>
        </motion.div>

        {/* Processing Node */}
        <div className="flex justify-center my-2">
           <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center shadow-lg shadow-violet-500/20">
              <Cpu size={16} className="text-white" />
           </div>
        </div>

        {/* Output */}
        <motion.div 
           initial={{ x: 20, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ delay: 0.4 }}
           className="bg-violet-500/10 border border-violet-500/20 p-4 rounded-xl"
        >
           <div className="flex justify-between mb-2">
              <span className="text-[10px] font-bold text-violet-300 uppercase">Output • English (Internal)</span>
              <Bot size={12} className="text-violet-400" />
           </div>
           <p className="text-white text-lg">"I need help with my order."</p>
        </motion.div>

        {/* Active Languages Badge */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.8 }}
           className="mt-8 flex flex-wrap gap-2 justify-center"
        >
           {['🇪🇸 ES', '🇫🇷 FR', '🇩🇪 DE', '🇯🇵 JP', '🇮🇳 IN'].map((tag, i) => (
              <span key={i} className="px-2 py-1 rounded bg-slate-900 border border-white/10 text-xs text-slate-400 font-mono">
                 {tag}
              </span>
           ))}
        </motion.div>
     </div>
  </div>
);

const TrustVisual = () => (
  <div className="relative w-full h-full flex flex-col bg-slate-950 rounded-2xl overflow-hidden p-6">
     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-orange-500 to-rose-500" />
     
     <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-rose-500/10 rounded-lg border border-rose-500/20">
           <ShieldCheck size={20} className="text-rose-500" />
        </div>
        <div>
           <h4 className="text-white font-bold text-sm">Guardrails Active</h4>
           <p className="text-slate-500 text-xs">Monitoring all outputs</p>
        </div>
     </div>

     <div className="space-y-3">
        {[
           { label: "PII Redaction", status: "Active", icon: Check },
           { label: "Tone Consistency", status: "99.9%", icon: BarChart3 },
           { label: "Fact Checking", status: "Verified", icon: Search }
        ].map((item, i) => (
           <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
              className="flex items-center justify-between p-3 bg-slate-900 border border-white/5 rounded-xl group hover:border-rose-500/30 transition-colors"
           >
              <div className="flex items-center gap-3">
                 <item.icon size={16} className="text-slate-500 group-hover:text-rose-400 transition-colors" />
                 <span className="text-sm text-slate-300">{item.label}</span>
              </div>
              <span className="text-xs font-mono text-rose-400 bg-rose-500/10 px-2 py-1 rounded">
                 {item.status}
              </span>
           </motion.div>
        ))}
     </div>

     <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-auto bg-slate-900/50 border border-dashed border-slate-700 p-4 rounded-xl text-center"
     >
        <p className="text-xs text-slate-500 mb-1">Safety Score</p>
        <div className="text-3xl font-bold text-white">100<span className="text-rose-500 text-lg">/100</span></div>
     </motion.div>
  </div>
);

// --- MAIN COMPONENT ---

const ChatbotBenefitsSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    // Note: 'bg-black' helps blend the sticky container if overscrolled, but usually unnecessary with proper layout
    <section className="bg-[#020617] relative"> 
      
      {/* Container ensures max-width and centering */}
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
           
           {/* LEFT COLUMN (Scrollable Text) */}
           {/* Added explicit bottom padding to allow the last item to scroll fully into view */}
           <div className="lg:w-1/2 py-[20vh] pb-[50vh]"> 
              <div className="mb-20">
                 <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md"
                 >
                    <Command size={14} />
                    TopEdge AI Core
                 </motion.div>
                 <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
                    Intelligence that <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                       scales with you.
                    </span>
                 </h2>
                 <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
                    TopEdge isn't just a chatbot. It's a complete autonomous revenue engine designed to capture, qualify, and convert leads 24/7.
                 </p>
              </div>

              <div className="flex flex-col gap-[40vh]"> {/* Large gap for scroll breathing room */}
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

           {/* RIGHT COLUMN (Sticky Visual) */}
           {/* h-screen + sticky top-0 ensures it stays locked in view */}
           <div className="hidden lg:block lg:w-1/2 relative">
              <div className="sticky top-0 h-screen flex items-center justify-center py-20">
                 
                 {/* The "Device" Frame */}
                 <div className="relative w-full max-w-md aspect-square bg-[#0B1121] rounded-[2.5rem] border border-white/10 shadow-2xl shadow-black/80 overflow-hidden ring-1 ring-white/5">
                    
                    {/* Window Controls */}
                    <div className="absolute top-0 inset-x-0 h-14 bg-slate-900/50 backdrop-blur-xl border-b border-white/5 flex items-center px-6 gap-2 z-50">
                       <div className="flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                       </div>
                       <div className="mx-auto text-[10px] font-medium text-slate-500 tracking-widest uppercase opacity-50">
                          TopEdgeOS v2.0
                       </div>
                    </div>

                    {/* Content Area */}
                    <div className="absolute inset-0 pt-14 bg-gradient-to-br from-slate-900 to-[#020617]">
                        <AnimatePresence mode="wait">
                            {activeFeature === 0 && (
                                <motion.div key="vis-0" className="absolute inset-0 p-1" {...animProps}>
                                    <AvailabilityVisual />
                                </motion.div>
                            )}
                            {activeFeature === 1 && (
                                <motion.div key="vis-1" className="absolute inset-0 p-1" {...animProps}>
                                    <SpeedVisual />
                                </motion.div>
                            )}
                            {activeFeature === 2 && (
                                <motion.div key="vis-2" className="absolute inset-0 p-1" {...animProps}>
                                    <GlobalVisual />
                                </motion.div>
                            )}
                            {activeFeature === 3 && (
                                <motion.div key="vis-3" className="absolute inset-0 p-1" {...animProps}>
                                    <TrustVisual />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Glossy Overlay */}
                    <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none ring-1 ring-inset ring-white/10 bg-gradient-to-tr from-white/[0.03] to-transparent" />
                 </div>

                 {/* Decorative Ambient Glow */}
                 <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10 rounded-full blur-[100px] transition-colors duration-1000 opacity-40
                    ${activeFeature === 0 ? 'bg-emerald-600/30' : 
                      activeFeature === 1 ? 'bg-blue-600/30' :
                      activeFeature === 2 ? 'bg-violet-600/30' : 'bg-rose-600/30'}
                 `} />
              </div>
           </div>

        </div>
      </div>
    </section>
  );
};

// --- ANIMATION PROPS ---
const animProps = {
    initial: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 1.05, filter: "blur(10px)" },
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] } // Apple-style easing
};

const FeatureTextBlock = ({ feature, index, setActiveFeature }: { feature: any, index: number, setActiveFeature: (i: number) => void }) => {
   const ref = useRef(null);
   // Use margin to trigger state change when element is in the middle of viewport
   const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

   useEffect(() => {
      if (isInView) setActiveFeature(index);
   }, [isInView, index, setActiveFeature]);

   return (
      <div 
         ref={ref}
         className={`transition-all duration-700 ${
            isInView ? 'opacity-100 translate-x-0' : 'opacity-30 -translate-x-4'
         }`}
      >
         <div className={`inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 border border-slate-800 ${getColorClass(feature.color)}`}>
            <feature.icon className="w-3 h-3" />
            {feature.tag}
         </div>
         
         <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {feature.title}
         </h3>
         
         <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-md">
            {feature.description}
         </p>

         <div className="flex items-center gap-4 pt-6 border-t border-white/5">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-slate-900 border border-slate-800 ${getColorClass(feature.color)}`}>
                <Sparkles className="w-5 h-5" />
            </div>
            <div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Impact</div>
                <div className={`font-medium ${getColorClass(feature.color)}`}>
                    {feature.highlight}
                </div>
            </div>
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