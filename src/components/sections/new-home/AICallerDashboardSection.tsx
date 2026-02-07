import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, Mic, BarChart3, Settings, Users, FileText, 
  Globe, Play, Pause, ChevronRight, Search, Filter, 
  Database, Sliders, ToggleLeft, ToggleRight, Edit3, Save, 
  Clock,
  CheckCircle2
} from 'lucide-react';

const AICallerDashboardSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile Auto-Play
  useEffect(() => {
    if (!isMobile) return;
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        setActiveFeature((prev) => (prev + 1) % features.length);
      }, 4000);
    };
    startAutoPlay();
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [isMobile]);

  // Sync Mobile Scroll
  useEffect(() => {
    if (isMobile && scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * activeFeature;
      scrollRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
  }, [activeFeature, isMobile]);

  return (
    <section className="py-24 md:py-32 bg-black relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-violet-900/10 rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-md"
          >
            <Settings className="w-3 h-3" />
            Voice AI Dashboard
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white mb-6 tracking-tight"
          >
            Manage your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-indigo-400">
              Ai workforce at scale.
            </span>
          </motion.h2>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch h-[650px]">
          
          {/* Left: Navigation (Flex to fill height) */}
          <div className="col-span-4 flex flex-col justify-between h-full">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setActiveFeature(index)}
                className={`group cursor-pointer p-4 rounded-xl transition-all duration-300 border relative overflow-hidden flex-1 flex flex-col justify-center ${
                  activeFeature === index 
                    ? 'bg-white/10 border-white/10 shadow-[0_0_30px_-10px_rgba(99,102,241,0.3)]' 
                    : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/5'
                }`}
                style={{ marginBottom: index === features.length - 1 ? 0 : '12px' }} // Spacing between items
              >
                {activeFeature === index && (
                  <motion.div 
                    layoutId="activeGlowVoice"
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent"
                  />
                )}
                <div className="relative z-10 flex items-center gap-4">
                  <div className={`p-2.5 rounded-lg transition-colors duration-300 ${
                    activeFeature === index ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-zinc-900 border border-zinc-800 text-zinc-500 group-hover:text-zinc-300'
                  }`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`text-sm font-semibold mb-0.5 transition-colors ${
                      activeFeature === index ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'
                    }`}>
                      {feature.title}
                    </h3>
                    <p className={`text-[10px] transition-colors ${
                       activeFeature === index ? 'text-indigo-200' : 'text-zinc-600 group-hover:text-zinc-500'
                    }`}>
                      {feature.description}
                    </p>
                  </div>
                  {activeFeature === index && (
                     <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="ml-auto"
                     >
                        <ChevronRight className="w-4 h-4 text-indigo-400" />
                     </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Preview Window */}
          <div className="col-span-8 relative h-full">
             <div className="relative h-full bg-[#09090B] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl shadow-black ring-1 ring-white/5 flex flex-col">
                {/* Window Header */}
                <div className="h-12 bg-black/40 backdrop-blur-xl border-b border-white/5 flex items-center px-5 gap-2 z-20 shrink-0">
                   <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                   </div>
                   <div className="ml-auto px-3 py-1 rounded-md bg-white/5 border border-white/5 flex items-center gap-2">
                      <Globe className="w-3 h-3 text-zinc-500" />
                      <span className="text-[10px] font-mono text-zinc-500">app.topedge.ai/dashboard</span>
                   </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-900 via-[#09090B] to-[#09090B]">
                   <AnimatePresence mode="wait">
                      <motion.div
                        key={activeFeature}
                        initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                      >
                        {features[activeFeature].component}
                      </motion.div>
                   </AnimatePresence>
                </div>
             </div>
          </div>
        </div>

        {/* MOBILE LAYOUT (Clean Carousel) */}
        <div className="lg:hidden relative">
           <div 
              ref={scrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory pb-8 gap-4 no-scrollbar scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
           >
              {features.map((feature, index) => (
                 <div key={feature.id} className="min-w-[100vw] sm:min-w-[90vw] snap-center px-4">
                    <div className="bg-[#09090B] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl relative h-[550px] flex flex-col">
                       <div className="p-5 border-b border-white/5 bg-black/40 backdrop-blur-md z-10 flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                             <feature.icon className="w-5 h-5" />
                          </div>
                          <div>
                             <h3 className="text-lg font-semibold text-white leading-tight">{feature.title}</h3>
                             <p className="text-xs text-zinc-500 mt-0.5">{feature.description}</p>
                          </div>
                       </div>
                       <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-[#09090B] to-black">
                          {feature.component}
                       </div>
                    </div>
                 </div>
              ))}
           </div>
           <div className="flex justify-center gap-2 mt-4">
              {features.map((_, index) => (
                 <div 
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${
                       activeFeature === index ? 'w-8 bg-indigo-500' : 'w-1.5 bg-zinc-800'
                    }`}
                 />
              ))}
           </div>
        </div>

      </div>
    </section>
  );
};

// --- FEATURE COMPONENTS ---

const CallLogsView = () => (
  <div className="h-full flex flex-col gap-4">
    <div className="flex items-center justify-between mb-2">
       <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1 border border-white/5">
          <button className="px-3 py-1 bg-zinc-800 rounded-md text-[10px] text-white shadow-sm">All Calls</button>
          <button className="px-3 py-1 text-[10px] text-zinc-500 hover:text-white transition-colors">Missed</button>
       </div>
       <div className="flex items-center gap-2 text-zinc-500">
          <Search className="w-4 h-4" />
          <Filter className="w-4 h-4" />
       </div>
    </div>
    <div className="space-y-3 overflow-y-auto pr-1 pb-2 custom-scrollbar flex-1">
      {[
        { name: 'Alex Rivera', number: '+1 (555) 012-3456', duration: '2m 14s', status: 'Converted', sentiment: 'Positive' },
        { name: 'Sarah Chen', number: '+1 (555) 987-6543', duration: '45s', status: 'Voicemail', sentiment: 'Neutral' },
        { name: 'Jordan Lee', number: '+1 (555) 246-8135', duration: '5m 32s', status: 'Converted', sentiment: 'Positive' },
        { name: 'Unknown', number: '+1 (555) 135-7924', duration: '12s', status: 'Failed', sentiment: 'N/A' },
      ].map((call, i) => (
        <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-colors group cursor-pointer">
           <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 border border-white/5">
                    <Phone className="w-3.5 h-3.5" />
                 </div>
                 <div>
                    <div className="text-white font-semibold text-sm">{call.name}</div>
                    <div className="text-zinc-600 text-[10px] font-mono">{call.number}</div>
                 </div>
              </div>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border uppercase tracking-wider ${
                 call.status === 'Converted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                 call.status === 'Voicemail' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                 'bg-rose-500/10 text-rose-400 border-rose-500/20'
              }`}>
                 {call.status}
              </span>
           </div>
           <div className="flex items-center justify-between pl-11">
              <div className="flex items-center gap-4 text-xs text-zinc-500">
                 <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {call.duration}</span>
                 <span className={call.sentiment === 'Positive' ? 'text-emerald-500' : 'text-zinc-500'}>{call.sentiment}</span>
              </div>
              <button className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
                 <Play className="w-3 h-3 fill-current ml-0.5" />
              </button>
           </div>
        </div>
      ))}
    </div>
  </div>
);

const VoiceSettingsView = () => (
  <div className="h-full flex flex-col gap-6">
     <div className="grid grid-cols-2 gap-4">
       {[
         { name: 'Rachel', accent: 'US • Prof.', active: true, gradient: 'from-pink-500 via-rose-500 to-red-500' },
         { name: 'Drew', accent: 'UK • News', active: false, gradient: 'from-cyan-500 via-blue-500 to-indigo-500' },
         { name: 'Marcus', accent: 'US • Deep', active: false, gradient: 'from-amber-500 via-orange-500 to-red-500' },
         { name: 'Mimi', accent: 'AU • Casual', active: false, gradient: 'from-emerald-500 via-teal-500 to-cyan-500' },
       ].map((voice, i) => (
         <div key={i} className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
           voice.active 
             ? 'bg-white/10 border-indigo-500/50' 
             : 'bg-white/5 border-white/5 hover:bg-white/10'
         }`}>
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${voice.gradient} opacity-20 blur-2xl rounded-full -mr-8 -mt-8 group-hover:opacity-30 transition-opacity`} />
            <div className="flex items-center gap-3 mb-4 relative z-10">
               <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${voice.gradient} flex items-center justify-center text-white font-semibold shadow-lg ring-2 ring-black`}>
                  {voice.name.charAt(0)}
               </div>
               <div>
                  <div className="text-white font-semibold text-sm">{voice.name}</div>
                  <div className="text-zinc-500 text-[10px] uppercase tracking-wider">{voice.accent}</div>
               </div>
            </div>
            <div className="flex gap-2 relative z-10">
               <button className="flex-1 py-1.5 bg-black/40 rounded-lg text-[10px] font-semibold text-zinc-300 hover:text-white transition-colors flex items-center justify-center gap-1 border border-white/10 backdrop-blur-sm">
                  <Play className="w-2.5 h-2.5 fill-current" /> Sample
               </button>
               {voice.active && (
                  <div className="px-2 py-1 bg-indigo-500/20 border border-indigo-500/30 rounded-lg text-indigo-300 text-[10px] font-bold flex items-center">
                     Active
                  </div>
               )}
            </div>
         </div>
       ))}
     </div>
     <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
        <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-6 flex items-center gap-2">
           <Settings className="w-3 h-3 text-indigo-400" /> Configuration
        </h4>
        <div className="space-y-6">
           {[{ label: 'Speed', val: '1.0x', progress: '50%' }, { label: 'Stability', val: '0.80', progress: '80%' }].map((setting, i) => (
              <div key={i}>
                 <div className="flex justify-between text-xs font-medium text-zinc-400 mb-2">
                    <span>{setting.label}</span>
                    <span className="text-white">{setting.val}</span>
                 </div>
                 <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full" style={{ width: setting.progress }} />
                 </div>
              </div>
           ))}
        </div>
     </div>
  </div>
);

const CampaignsView = () => (
  <div className="h-full flex flex-col items-center justify-center text-center p-4">
     <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center mb-6 rotate-3 shadow-2xl group hover:rotate-0 transition-transform duration-500">
        <FileText className="w-8 h-8 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
     </div>
     <h3 className="text-2xl font-bold text-white mb-2">Bulk Outreach</h3>
     <p className="text-zinc-500 mb-8 max-w-xs text-sm leading-relaxed">
        Upload a CSV. Configure the script. Let our AI dial thousands of contacts simultaneously.
     </p>
     <button className="w-full max-w-xs py-3 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2 mb-8">
        <Users className="w-4 h-4" /> Import Contacts
     </button>
     <div className="w-full bg-white/5 rounded-2xl border border-white/5 p-4 text-left relative overflow-hidden">
        <div className="absolute top-0 left-0 h-1 w-full bg-indigo-500/20" />
        <div className="flex justify-between items-center mb-3">
           <div>
              <div className="text-white font-bold text-sm">Q1 Outreach</div>
              <div className="text-zinc-600 text-[10px] uppercase tracking-wide">Started 2h ago</div>
           </div>
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_#10b981]" />
        </div>
        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden mb-2">
           <motion.div initial={{ width: 0 }} animate={{ width: "42%" }} transition={{ duration: 1.5, ease: "circOut" }} className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
        </div>
        <div className="flex justify-between text-[10px] font-bold text-zinc-500">
           <span>452 / 1,200</span>
           <span className="text-indigo-400">42% Done</span>
        </div>
     </div>
  </div>
);

const PerformanceView = () => (
  <div className="h-full flex flex-col gap-6">
     <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
           <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-2">Connect Rate</div>
           <div className="text-3xl font-black text-white">68%</div>
           <div className="text-[10px] text-emerald-400 mt-1 font-bold flex items-center gap-1"><span className="bg-emerald-500/20 rounded px-1">+4%</span> vs avg</div>
        </div>
        <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
           <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-2">Cost / Lead</div>
           <div className="text-3xl font-black text-white">$0.12</div>
           <div className="text-[10px] text-zinc-500 mt-1 font-mono">Avg 1m 45s</div>
        </div>
     </div>
     <div className="flex-1 bg-white/5 rounded-2xl border border-white/5 p-6 relative overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-6">
           <div className="text-sm text-white font-bold">Call Volume</div>
           <div className="flex gap-3">
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /><span className="text-[10px] text-zinc-400">Inbound</span></div>
              <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-zinc-700" /><span className="text-[10px] text-zinc-400">Outbound</span></div>
           </div>
        </div>
        <div className="flex-1 flex items-end justify-between gap-2">
           {[30, 45, 35, 60, 50, 75, 65, 80, 70, 90, 85, 95].map((h, i) => (
              <div key={i} className="w-full h-full flex items-end gap-1 group">
                 <motion.div initial={{ height: 0 }} animate={{ height: `${h * 0.6}%` }} transition={{ duration: 1, delay: i * 0.05 }} className="w-full bg-indigo-500/80 rounded-t-sm group-hover:bg-indigo-400 transition-colors shadow-[0_0_15px_-5px_rgba(99,102,241,0.5)]" />
                 <motion.div initial={{ height: 0 }} animate={{ height: `${h * 0.4}%` }} transition={{ duration: 1, delay: i * 0.05 + 0.2 }} className="w-full bg-zinc-700/50 rounded-t-sm group-hover:bg-zinc-600 transition-colors" />
              </div>
           ))}
        </div>
     </div>
  </div>
);

const AgentBehaviorView = () => (
   <div className="h-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
         <h4 className="text-white font-bold text-sm">Agent Settings</h4>
         <button className="text-[10px] bg-indigo-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-indigo-500 transition-colors">
            <Save className="w-3 h-3" /> Save Changes
         </button>
      </div>

      <div className="bg-white/5 rounded-2xl p-5 border border-white/5 space-y-4">
         <div>
            <div className="flex justify-between items-center mb-2">
               <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">System Prompt</label>
               <span className="text-[10px] text-zinc-600">v2.1</span>
            </div>
            <div className="bg-black/40 rounded-xl border border-white/5 p-3 text-xs text-zinc-300 font-mono leading-relaxed h-20 resize-none outline-none focus:border-indigo-500/50 transition-colors">
               You are a helpful assistant for TopEdge AI. Your goal is to qualify leads and book demos. Be concise, professional, and friendly.
            </div>
         </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
         <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center justify-between mb-4">
               <span className="text-xs font-bold text-zinc-400">Interruptibility</span>
               <ToggleRight className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-2">
               <div className="h-full w-[70%] bg-indigo-500" />
            </div>
            <div className="flex justify-between text-[10px] text-zinc-500">
               <span>Strict</span>
               <span>Sensitive</span>
            </div>
         </div>
         <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
            <div className="flex items-center justify-between mb-4">
               <span className="text-xs font-bold text-zinc-400">Filler Words</span>
               <ToggleLeft className="w-5 h-5 text-zinc-600" />
            </div>
            <p className="text-[10px] text-zinc-500 leading-snug">
               Agent will not use "um", "uh" to sound more robotic/precise.
            </p>
         </div>
      </div>

      <div className="flex-1 bg-white/5 rounded-2xl p-5 border border-white/5 flex flex-col justify-center gap-4">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <Play className="w-4 h-4 fill-current" />
               </div>
               <div>
                  <div className="text-sm font-bold text-white">Test Configuration</div>
                  <div className="text-[10px] text-zinc-500">Simulate call with current settings</div>
               </div>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-600" />
         </div>
      </div>
   </div>
);

const KnowledgeBaseView = () => (
   <div className="h-full flex flex-col">
      <div className="text-center mb-8">
         <div className="w-16 h-16 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center mx-auto mb-4">
            <Database className="w-8 h-8 text-indigo-400" />
         </div>
         <h3 className="text-lg font-bold text-white">Knowledge Base</h3>
         <p className="text-xs text-zinc-500 mt-1 max-w-xs mx-auto">Upload documents or crawl websites to train your AI agent instantly.</p>
      </div>
      <div className="flex-1 space-y-3">
         <div className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-center gap-4">
            <div className="p-2 bg-rose-500/10 rounded-lg text-rose-400"><FileText className="w-5 h-5" /></div>
            <div className="flex-1"><div className="text-sm font-bold text-white">Pricing_Guide_2024.pdf</div><div className="text-[10px] text-zinc-500">Processed • 12 pages</div></div>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
         </div>
         <div className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-center gap-4">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400"><Globe className="w-5 h-5" /></div>
            <div className="flex-1"><div className="text-sm font-bold text-white">topedge.ai/docs</div><div className="text-[10px] text-zinc-500">Crawled • 45 pages</div></div>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
         </div>
      </div>
   </div>
);

// --- DATA ---
const features = [
  {
    id: 'call-logs',
    title: 'Call Logs & Recs',
    description: 'Listen to recordings, read transcripts, and analyze outcomes.',
    icon: Phone,
    component: <CallLogsView />
  },
  {
    id: 'agent-behavior',
    title: 'Agent Behavior',
    description: 'Tweak prompts, adjust tone, and configure interruption sensitivity.',
    icon: Sliders,
    component: <AgentBehaviorView />
  },
  {
    id: 'voice-settings',
    title: 'Voice Studio',
    description: 'Choose from ultra-realistic voices or clone your own instantly.',
    icon: Mic,
    component: <VoiceSettingsView />
  },
  {
    id: 'campaigns',
    title: 'Auto-Dialer',
    description: 'Upload contacts and let AI handle the outbound dialing.',
    icon: Users,
    component: <CampaignsView />
  },
  {
    id: 'performance',
    title: 'Live Metrics',
    description: 'Track connection rates, duration, and cost in real-time.',
    icon: BarChart3,
    component: <PerformanceView />
  },
  {
    id: 'knowledge',
    title: 'Knowledge Base',
    description: 'Train your AI instantly with PDFs, docs, and websites.',
    icon: Database,
    component: <KnowledgeBaseView />
  }
];

export default AICallerDashboardSection;