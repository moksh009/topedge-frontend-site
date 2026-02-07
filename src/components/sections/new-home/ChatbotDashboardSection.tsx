import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, MessageSquare, Users, Zap, Globe, ArrowRight, 
  Bot, Sparkles, PieChart, Activity, CheckCircle2, 
  Calendar, UploadCloud, FileSpreadsheet, Send, User, 
  MousePointer2, Clock, AlertCircle, X, Database, Link as LinkIcon 
} from 'lucide-react';

const ChatbotDashboardSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive Check
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile Auto-Play Logic
  useEffect(() => {
    if (!isMobile) return;
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        setActiveFeature((prev) => (prev + 1) % features.length);
      }, 5000); // 5 Seconds
    };
    startAutoPlay();
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [isMobile]);

  return (
    <section className="py-24 md:py-32 bg-black relative overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[10%] w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md"
          >
            <Activity className="w-3 h-3" />
            Live Command Center
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white mb-6 tracking-tight"
          >
            Total Control Over <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-emerald-400">
              Customer Conversations
            </span>
          </motion.h2>
        </div>

        {/* --- MOBILE LAYOUT (Auto-Play Vertical Stack) --- */}
        <div className="lg:hidden flex flex-col items-center">
           
           {/* 1. Animated Title Section */}
           <div className="w-full text-center mb-8 h-24 relative">
              <AnimatePresence mode="wait">
                 <motion.div
                   key={activeFeature}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   transition={{ duration: 0.3 }}
                   className="absolute inset-0 flex flex-col items-center"
                 >
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 mb-3 border border-white/5">
                       {React.createElement(features[activeFeature].icon, { className: "w-5 h-5" })}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">
                       {features[activeFeature].title}
                    </h3>
                    <p className="text-sm text-zinc-400 max-w-xs mx-auto line-clamp-2">
                       {features[activeFeature].description}
                    </p>
                 </motion.div>
              </AnimatePresence>
           </div>

           {/* 2. The Dashboard Card */}
           <div className="w-full max-w-md aspect-[4/5] bg-[#09090B] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl relative flex flex-col">
              <div className="h-10 bg-black/40 border-b border-white/5 flex items-center px-4 gap-2 shrink-0">
                 <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-zinc-700" /><div className="w-2 h-2 rounded-full bg-zinc-700" /></div>
                 <div className="ml-auto flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /><span className="text-[9px] text-zinc-500">Live</span></div>
              </div>
              
              <div className="flex-1 p-4 relative overflow-hidden">
                 <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFeature}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full"
                    >
                      {features[activeFeature].component}
                    </motion.div>
                 </AnimatePresence>
              </div>
           </div>

           {/* 3. Progress Dots */}
           <div className="flex gap-2 mt-8">
              {features.map((_, i) => (
                 <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                       activeFeature === i ? 'w-8 bg-emerald-500' : 'w-1.5 bg-zinc-800'
                    }`} 
                 />
              ))}
           </div>
        </div>

        {/* --- DESKTOP LAYOUT (Grid + Hover) --- */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch h-[650px]">
          
          {/* Left: Navigation Grid (2 Columns x 3 Rows) */}
          <div className="col-span-4 grid grid-cols-1 gap-3 content-start">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setActiveFeature(index)}
                className={`group cursor-pointer p-4 rounded-xl transition-all duration-300 border relative overflow-hidden ${
                  activeFeature === index 
                    ? 'bg-white/10 border-emerald-500/50 shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)]' 
                    : 'bg-zinc-900/50 border-white/5 hover:bg-white/5 hover:border-white/10'
                }`}
              >
                {activeFeature === index && (
                  <motion.div 
                    layoutId="activeGlow"
                    className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent"
                  />
                )}
                <div className="relative z-10 flex items-center gap-3">
                  <div className={`p-2 rounded-lg transition-colors duration-300 ${
                    activeFeature === index ? 'bg-emerald-500 text-white shadow-lg' : 'bg-zinc-800 text-zinc-500 group-hover:text-zinc-300'
                  }`}>
                    <feature.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold mb-0.5 transition-colors ${
                      activeFeature === index ? 'text-white' : 'text-zinc-400 group-hover:text-white'
                    }`}>
                      {feature.title}
                    </h3>
                    <p className={`text-[10px] transition-colors line-clamp-1 ${
                       activeFeature === index ? 'text-emerald-200' : 'text-zinc-600 group-hover:text-zinc-500'
                    }`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Feature Preview Window */}
          <div className="col-span-8 relative">
            <div className="relative h-full bg-[#09090B] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl shadow-black ring-1 ring-white/5 flex flex-col">
              
              {/* Fake Window Controls */}
              <div className="h-12 bg-black/40 backdrop-blur-xl border-b border-white/5 flex items-center px-6 gap-2 z-20 shrink-0">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                </div>
                <div className="ml-auto px-3 py-1 rounded-full bg-white/5 border border-white/5 flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[10px] font-mono text-zinc-400">System Online</span>
                </div>
              </div>

              {/* Content Container */}
              <div className="flex-1 p-8 overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-900 via-[#09090B] to-[#09090B] relative">
                 <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFeature}
                      initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                      transition={{ duration: 0.3 }}
                      className="h-full w-full"
                    >
                      {features[activeFeature].component}
                    </motion.div>
                 </AnimatePresence>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- FEATURE COMPONENTS ---

// 1. Marketing Campaigns (CSV Blast)
const MarketingView = () => (
  <div className="h-full flex flex-col justify-center">
     <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/20">
           <FileSpreadsheet className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Bulk Offers</h3>
        <p className="text-zinc-500 text-xs max-w-sm mx-auto">Upload a CSV. Our AI blasts personalized offers.</p>
     </div>

     <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group mb-6">
        <UploadCloud className="w-8 h-8 text-zinc-600 group-hover:text-emerald-400 transition-colors mb-2" />
        <span className="text-xs font-bold text-white">Drop CSV here</span>
     </div>

     <div className="bg-white/5 rounded-xl border border-white/5 p-4 flex items-center gap-4">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
           <Send className="w-4 h-4" />
        </div>
        <div className="flex-1">
           <div className="flex justify-between mb-1">
              <span className="text-xs font-bold text-white">Summer Sale Blast</span>
              <span className="text-[10px] text-emerald-400 font-mono">Sending...</span>
           </div>
           <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div 
                 initial={{ width: "0%" }} animate={{ width: "65%" }} transition={{ duration: 2, ease: "easeInOut" }}
                 className="h-full bg-emerald-500" 
              />
           </div>
        </div>
        <div className="text-right">
           <div className="text-sm font-bold text-white">842</div>
           <div className="text-[10px] text-zinc-500">Sent</div>
        </div>
     </div>
  </div>
);

// 2. Appointment Manager
const AppointmentsView = () => (
  <div className="h-full flex flex-col">
     <div className="flex justify-between items-center mb-6">
        <div><h3 className="text-lg font-bold text-white">Bookings</h3><p className="text-[10px] text-zinc-500">Today, Oct 24</p></div>
        <button className="text-[10px] bg-white text-black px-3 py-1.5 rounded-lg font-bold">Sync Calendar</button>
     </div>
     <div className="space-y-2 overflow-y-auto pr-2 custom-scrollbar">
        {[
           { time: '09:00', name: 'Sarah Miller', type: 'Demo', status: 'Confirmed', color: 'text-emerald-400 bg-emerald-500/10' },
           { time: '11:30', name: 'Moksh Patel', type: 'Consult', status: 'Confirmed', color: 'text-emerald-400 bg-emerald-500/10' },
           { time: '14:00', name: 'Alex Chen', type: 'Follow-up', status: 'Pending', color: 'text-amber-400 bg-amber-500/10' },
        ].map((booking, i) => (
           <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="flex flex-col items-center justify-center w-10 h-10 bg-zinc-900 rounded-lg border border-white/5 text-[10px] font-bold text-zinc-400">
                 {booking.time}
              </div>
              <div className="flex-1"><h4 className="text-xs font-bold text-white">{booking.name}</h4><p className="text-[10px] text-zinc-500">{booking.type}</p></div>
              <span className={`px-2 py-0.5 rounded text-[9px] font-bold border border-white/5 uppercase ${booking.color}`}>{booking.status}</span>
           </div>
        ))}
     </div>
  </div>
);

// 3. Live Monitor & Human Handoff
const HumanHandoffView = () => {
   const [isHumanMode, setIsHumanMode] = useState(false);
   return (
      <div className="h-full flex flex-col">
         <div className="flex justify-between items-center mb-4 p-3 bg-white/5 border border-white/5 rounded-xl">
            <div className="flex items-center gap-2">
               <div className={`w-2 h-2 rounded-full ${isHumanMode ? 'bg-amber-500' : 'bg-emerald-500'} animate-pulse`} />
               <div><h4 className="text-xs font-bold text-white">{isHumanMode ? 'Human Active' : 'AI Active'}</h4><p className="text-[9px] text-zinc-500">Session #8492</p></div>
            </div>
            <button 
               onClick={() => setIsHumanMode(!isHumanMode)}
               className={`text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${isHumanMode ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}
            >
               {isHumanMode ? <><Bot className="w-3 h-3" /> Resume AI</> : <><MousePointer2 className="w-3 h-3" /> Take Over</>}
            </button>
         </div>
         <div className="flex-1 bg-black/40 rounded-xl border border-white/5 p-3 overflow-y-auto mb-3 flex flex-col gap-2">
            <div className="self-start bg-zinc-800 rounded-lg rounded-tl-none p-2 max-w-[80%] text-[10px] text-zinc-300">Does your plan include SSO?</div>
            <div className="self-end bg-indigo-600 rounded-lg rounded-tr-none p-2 max-w-[80%] text-[10px] text-white">Yes! We support SAML and OIDC.</div>
            <div className="self-start bg-zinc-800 rounded-lg rounded-tl-none p-2 max-w-[80%] text-[10px] text-zinc-300">Can you offer a custom contract?</div>
            {!isHumanMode && <div className="self-center my-1 text-[9px] text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 flex items-center gap-1"><AlertCircle className="w-2.5 h-2.5" /> Low Confidence</div>}
            {isHumanMode && <div className="self-center my-1 text-[9px] text-zinc-500">-- Human Agent Joined --</div>}
         </div>
         <div className="relative">
            <input type="text" disabled={!isHumanMode} placeholder={isHumanMode ? "Type reply..." : "AI handling..."} className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-3 pr-10 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors" />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-indigo-600 rounded flex items-center justify-center text-white"><Send className="w-3 h-3" /></button>
         </div>
      </div>
   );
};

// 4. Analytics
const AnalyticsView = () => (
  <div className="h-full flex flex-col gap-4">
     <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 p-3 rounded-xl border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-start mb-1">
                <div className="p-1.5 bg-emerald-500/20 rounded-lg text-emerald-400">
                    <MessageSquare size={14} />
                </div>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center gap-1">
                    <ArrowRight className="w-2 h-2 -rotate-45" /> 12%
                </span>
            </div>
            <div className="text-2xl font-bold text-white mb-0.5">2,842</div>
            <div className="text-[10px] text-zinc-500 font-medium">Total Conversations</div>
        </div>
        <div className="bg-white/5 p-3 rounded-xl border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex justify-between items-start mb-1">
                <div className="p-1.5 bg-indigo-500/20 rounded-lg text-indigo-400">
                    <Zap size={14} />
                </div>
                <span className="text-[10px] text-indigo-400 font-bold bg-indigo-500/10 px-1.5 py-0.5 rounded flex items-center gap-1">
                    <ArrowRight className="w-2 h-2 rotate-45" /> 0.8s
                </span>
            </div>
            <div className="text-2xl font-bold text-white mb-0.5">98.2%</div>
            <div className="text-[10px] text-zinc-500 font-medium">Resolution Rate</div>
        </div>
     </div>

     <div className="flex-1 bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col relative overflow-hidden">
        <div className="flex justify-between items-center mb-4 z-10">
            <h4 className="text-xs font-bold text-white">Traffic Volume</h4>
            <select className="bg-black/40 border border-white/10 text-[10px] text-zinc-400 rounded px-2 py-1 outline-none">
                <option>Last 7 Days</option>
                <option>Last 24 Hours</option>
            </select>
        </div>
        
        <div className="flex-1 flex items-end gap-1.5 z-10">
           {[40, 65, 45, 80, 55, 90, 70, 95, 85, 60, 75, 50, 65, 85, 95, 80].map((h, i) => (
              <motion.div 
                key={i}
                initial={{ height: "0%" }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                className="flex-1 bg-gradient-to-t from-emerald-600 to-teal-400/50 rounded-t-sm hover:from-emerald-500 hover:to-teal-300 transition-colors cursor-pointer relative group"
              >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-1.5 py-0.5 bg-black text-[9px] text-white rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap border border-white/10">
                      {h * 12} Users
                  </div>
              </motion.div>
           ))}
        </div>

        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10">
            <div className="h-full w-full border-b border-white/20 flex flex-col justify-between p-4">
                <div className="w-full h-px bg-white/20" />
                <div className="w-full h-px bg-white/20" />
                <div className="w-full h-px bg-white/20" />
            </div>
        </div>
     </div>
  </div>
);

// 5. Knowledge Base
const KnowledgeBaseView = () => (
   <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
          <div>
              <h3 className="text-sm font-bold text-white">Training Sources</h3>
              <p className="text-[10px] text-zinc-500">2.4MB / 10MB Used</p>
          </div>
          <button className="p-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-colors border border-emerald-500/20">
              <UploadCloud size={14} />
          </button>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto pr-1 custom-scrollbar">
         {[
             { name: 'Pricing_Q3.pdf', type: 'PDF', size: '1.2MB', status: 'Indexed', date: 'Just now' },
             { name: 'support.topedge.ai', type: 'URL', size: '142 Pages', status: 'Indexed', date: '2h ago' },
             { name: 'Product_Manual_v2.docx', type: 'DOC', size: '840KB', status: 'Processing', date: 'Processing' },
             { name: 'FAQ_Export.csv', type: 'CSV', size: '24KB', status: 'Indexed', date: '1d ago' },
         ].map((file, i) => (
             <div key={i} className="bg-white/5 border border-white/5 p-3 rounded-xl flex items-center gap-3 group hover:border-emerald-500/30 transition-colors">
                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                     file.type === 'PDF' ? 'bg-rose-500/10 text-rose-400' :
                     file.type === 'URL' ? 'bg-blue-500/10 text-blue-400' :
                     file.type === 'CSV' ? 'bg-emerald-500/10 text-emerald-400' :
                     'bg-amber-500/10 text-amber-400'
                 }`}>
                     {file.type}
                 </div>
                 <div className="flex-1 min-w-0">
                     <div className="text-xs font-bold text-white truncate">{file.name}</div>
                     <div className="flex items-center gap-2 mt-0.5">
                         <span className="text-[9px] text-zinc-500">{file.size}</span>
                         {file.status === 'Processing' && (
                             <span className="text-[9px] text-amber-400 flex items-center gap-1">
                                 <span className="w-1 h-1 rounded-full bg-amber-400 animate-pulse" /> Syncing
                             </span>
                         )}
                     </div>
                 </div>
                 <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                     <div className="p-1.5 hover:bg-white/10 rounded-md cursor-pointer text-zinc-400 hover:text-white">
                         <Database size={12} />
                     </div>
                 </div>
             </div>
         ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-white/5">
          <div className="flex justify-between text-[10px] text-zinc-500 mb-1.5">
              <span>Knowledge Health</span>
              <span className="text-emerald-400 font-bold">98%</span>
          </div>
          <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full w-[98%] bg-emerald-500 rounded-full" />
          </div>
      </div>
   </div>
);

// 6. Lead Pipeline (Replaces Integrations)
const LeadPipelineView = () => (
   <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Lead Pipeline
          </h3>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
              +$12.4k This Week
          </span>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-3">
          {/* Column 1: New Leads */}
          <div className="bg-white/5 rounded-xl border border-white/5 p-2 flex flex-col gap-2">
              <div className="text-[10px] font-bold text-zinc-500 uppercase px-1 flex justify-between">
                  <span>New Leads</span>
                  <span className="bg-zinc-800 text-zinc-400 px-1.5 rounded">12</span>
              </div>
              
              <div className="space-y-2 overflow-y-auto max-h-[200px] custom-scrollbar pr-1">
                  {[
                      { name: "Acme Corp", value: "$2.5k", time: "2m ago" },
                      { name: "TechStart", value: "$5k", time: "15m ago" },
                      { name: "Global Systems", value: "$12k", time: "1h ago" },
                  ].map((lead, i) => (
                      <div key={i} className="bg-zinc-900/50 p-2 rounded-lg border border-white/5 hover:border-emerald-500/30 transition-colors cursor-pointer group">
                          <div className="flex justify-between mb-1">
                              <span className="text-xs font-bold text-white">{lead.name}</span>
                              <span className="text-[9px] text-zinc-500">{lead.time}</span>
                          </div>
                          <div className="flex justify-between items-center">
                              <span className="text-[10px] text-emerald-400 font-mono">{lead.value}</span>
                              <ArrowRight size={10} className="text-zinc-600 group-hover:text-emerald-500 transition-colors" />
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          {/* Column 2: Qualified/Closing */}
          <div className="bg-white/5 rounded-xl border border-white/5 p-2 flex flex-col gap-2">
              <div className="text-[10px] font-bold text-zinc-500 uppercase px-1 flex justify-between">
                  <span>Closing</span>
                  <span className="bg-emerald-500/20 text-emerald-400 px-1.5 rounded">5</span>
              </div>
              
               <div className="space-y-2 overflow-y-auto max-h-[200px] custom-scrollbar pr-1">
                  {[
                      { name: "Design Studio", value: "$8.2k", prob: "90%" },
                      { name: "NextLevel", value: "$3.4k", prob: "75%" },
                  ].map((lead, i) => (
                      <div key={i} className="bg-gradient-to-br from-emerald-900/20 to-zinc-900 p-2 rounded-lg border border-emerald-500/20 cursor-pointer">
                          <div className="flex justify-between mb-1">
                              <span className="text-xs font-bold text-white">{lead.name}</span>
                              <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1 rounded">{lead.prob}</span>
                          </div>
                           <div className="flex justify-between items-center">
                              <span className="text-[10px] text-white font-mono">{lead.value}</span>
                              <div className="flex gap-1">
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>
   </div>
);

// --- CONFIG ---
const features = [
  { id: 'analytics', title: 'Performance Analytics', description: 'Real-time ROI & sentiment tracking.', icon: PieChart, component: <AnalyticsView /> },
  { id: 'marketing', title: 'Bulk Marketing', description: 'Launch offers to 1000s of leads.', icon: Users, component: <MarketingView /> },
  { id: 'handoff', title: 'Live Monitor & Handoff', description: 'Watch & take over chats instantly.', icon: MousePointer2, component: <HumanHandoffView /> },
  { id: 'appointments', title: 'Appointment Manager', description: 'Manage AI-booked slots.', icon: Calendar, component: <AppointmentsView /> },
  { id: 'knowledge', title: 'Knowledge Base', description: 'Train AI with docs & URLs.', icon: Database, component: <KnowledgeBaseView /> },
  { id: 'pipeline', title: 'Lead Pipeline', description: 'Track captured revenue.', icon: BarChart3, component: <LeadPipelineView /> }
];

export default ChatbotDashboardSection;