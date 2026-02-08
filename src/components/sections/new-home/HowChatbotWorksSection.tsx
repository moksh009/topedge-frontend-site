import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, Calendar, Gift, Database, 
  CheckCircle2, Bot, ArrowRight,
  ChevronRight, Zap
} from 'lucide-react';

const CYCLE_DURATION = 5000;

// --- VISUAL COMPONENTS (Phone Screen Content) ---

const CaptureVisual = () => (
  <div className="flex flex-col h-full justify-end pb-3 md:pb-4 px-3 md:px-4 space-y-3 md:space-y-4">
     <div className="flex justify-center mb-3 md:mb-4">
        <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full border border-slate-200 shadow-sm">
           Today, 2:14 AM
        </span>
     </div>
     
     <motion.div 
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="self-end bg-blue-600 text-white p-2.5 md:p-3 rounded-2xl rounded-tr-sm shadow-lg shadow-blue-600/20 max-w-[85%]"
     >
        <p className="text-xs md:text-sm font-medium leading-snug">Hi, I'm browsing your site. Can I get a quote?</p>
     </motion.div>

     <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="self-start bg-white border border-slate-100 p-3 md:p-4 rounded-2xl rounded-tl-sm shadow-xl max-w-[90%]"
     >
        <div className="flex items-center gap-2 mb-2">
           <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Instantly</span>
        </div>
        <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
           Hey! 👋 We are 24/7. I can generate that quote for you right now. 
        </p>
        <div className="mt-3">
           <span className="px-3 py-1.5 bg-blue-50 text-blue-600 text-[10px] md:text-xs font-bold rounded-lg border border-blue-100 block text-center cursor-pointer hover:bg-blue-100 transition-colors">Start Quote</span>
        </div>
     </motion.div>
  </div>
);

const ScheduleVisual = () => (
  <div className="flex flex-col h-full justify-center space-y-3 md:space-y-4 px-3 md:px-4">
     <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white border border-slate-100 p-3 md:p-4 rounded-2xl shadow-xl"
     >
        <div className="flex items-center gap-2 mb-3 md:mb-4 border-b border-slate-50 pb-2 md:pb-3">
           <div className="p-1.5 bg-emerald-100 rounded-md">
              <Calendar size={12} className="text-emerald-600" />
           </div>
           <span className="text-[10px] md:text-xs font-bold text-slate-700 uppercase tracking-wider">Live Availability</span>
        </div>
        
        <p className="text-xs md:text-sm text-slate-600 mb-3 md:mb-4 font-medium">
           Best slots for tomorrow:
        </p>

        <div className="space-y-2">
           {['10:00 AM', '02:00 PM', '04:30 PM'].map((time, i) => (
              <motion.div 
                 key={time}
                 initial={{ opacity: 0, x: -10 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.4 + (i * 0.2) }}
                 className="flex items-center justify-between p-2 md:p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-emerald-500/50 hover:bg-emerald-50/50 cursor-pointer transition-all group"
              >
                 <span className="text-xs md:text-sm font-bold text-slate-600 group-hover:text-emerald-700">{time}</span>
                 <ChevronRight size={14} className="text-slate-300 group-hover:text-emerald-500" />
              </motion.div>
           ))}
        </div>
     </motion.div>

     <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        className="mx-auto bg-emerald-500 text-white px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold shadow-lg shadow-emerald-500/30 flex items-center gap-2"
     >
        <CheckCircle2 size={14} /> Booking Confirmed
     </motion.div>
  </div>
);

const ProactiveVisual = () => (
  <div className="flex flex-col h-full pt-8 px-4 relative">
     <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute top-2 left-2 right-2 bg-white/90 backdrop-blur-xl p-3 rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-slate-100 flex items-start gap-3 z-30"
     >
        <div className="w-9 h-9 bg-rose-100 rounded-full flex items-center justify-center shrink-0 border border-rose-200">
           <Gift size={16} className="text-rose-500" />
        </div>
        <div>
           <div className="text-xs font-bold text-slate-900">TopEdge Spa</div>
           <div className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">🎂 Happy Birthday! A gift is waiting...</div>
        </div>
     </motion.div>

     <div className="flex-1 flex flex-col justify-end pb-6">
        <motion.div 
           initial={{ scale: 0.9, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ delay: 0.6 }}
           className="bg-white p-1.5 rounded-3xl border border-rose-100 shadow-xl"
        >
           <div className="bg-gradient-to-br from-rose-500 to-orange-400 p-6 rounded-2xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full blur-2xl -mr-8 -mt-8" />
              <div className="relative z-10">
                 <div className="text-[10px] font-bold bg-white/20 inline-block px-2 py-0.5 rounded mb-2 border border-white/10">EXCLUSIVE OFFER</div>
                 <h4 className="text-2xl font-black mb-1">20% OFF</h4>
                 <p className="text-xs text-rose-50 mb-4 opacity-90 font-medium">Valid for your birthday week only!</p>
                 <button className="w-full bg-white text-rose-600 text-xs font-bold py-2.5 rounded-xl shadow-lg hover:bg-rose-50 transition-colors">Claim My Gift</button>
              </div>
           </div>
        </motion.div>
     </div>
  </div>
);

const CrmVisual = () => (
  <div className="flex flex-col h-full justify-center px-4">
     <div className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-white border-b border-slate-200 p-3 flex justify-between items-center">
           <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-violet-100 rounded-md flex items-center justify-center border border-violet-200">
                 <Database size={12} className="text-violet-600" />
              </div>
              <span className="text-xs font-bold text-slate-800">CRM Record</span>
           </div>
           <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <div className="w-2 h-2 rounded-full bg-slate-200" />
           </div>
        </div>
        
        <div className="p-4 space-y-3">
           {[
              { label: "Name", value: "Alex J.", delay: 0.2 },
              { label: "Email", value: "alex@gmail.com", delay: 0.4 },
              { label: "Intent", value: "Booking", color: "text-emerald-700 bg-emerald-100 border-emerald-200", delay: 0.6 }
           ].map((item, i) => (
              <motion.div 
                 key={i}
                 initial={{ x: -10, opacity: 0 }}
                 animate={{ x: 0, opacity: 1 }}
                 transition={{ delay: item.delay }}
                 className="flex justify-between items-center text-xs p-2 bg-white rounded-lg border border-slate-100 shadow-sm"
              >
                 <span className="text-slate-400 font-semibold">{item.label}</span>
                 <span className={`font-bold ${item.color || 'text-slate-700'} ${item.color ? 'px-2 py-0.5 rounded border' : ''}`}>
                    {item.value}
                 </span>
              </motion.div>
           ))}
        </div>
     </div>

     <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-6 flex justify-center"
     >
        <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1.5 uppercase tracking-wider bg-slate-100 px-3 py-1 rounded-full">
           <Zap size={10} className="text-violet-500 fill-violet-500" />
           Synced via API
        </span>
     </motion.div>
  </div>
);

const steps = [
  {
    id: 0,
    tag: "Capture",
    title: "24/7 Lead Capture",
    description: "Your bot never sleeps. It engages visitors instantly, answers queries, and stops lead leakage before it happens.",
    icon: Clock,
    color: "blue",
    visualComponent: <CaptureVisual />
  },
  {
    id: 1,
    tag: "Schedule",
    title: "Smart Scheduling",
    description: "Connects directly to your calendar. The AI checks availability and books appointments without back-and-forth emails.",
    icon: Calendar,
    color: "emerald",
    visualComponent: <ScheduleVisual />
  },
  {
    id: 2,
    tag: "Retain",
    title: "Proactive Growth",
    description: "The bot automatically sends birthday wishes, appointment reminders, and re-activation offers to keep clients loyal.",
    icon: Gift,
    color: "rose",
    visualComponent: <ProactiveVisual />
  },
  {
    id: 3,
    tag: "Sync",
    title: "Instant CRM Sync",
    description: "Zero data entry. Every conversation, contact detail, and user intent is automatically formatted and pushed to your CRM.",
    icon: Database,
    color: "violet",
    visualComponent: <CrmVisual />
  }
];

const HowChatbotWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, CYCLE_DURATION);

    return () => clearInterval(timer);
  }, []);

  const ActiveIcon = steps[activeStep].icon;

  return (
    <section className="py-12 md:py-32 bg-white relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
         <div className="absolute top-[-20%] right-[-10%] w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-blue-50/60 rounded-full blur-[80px] md:blur-[120px]" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-emerald-50/60 rounded-full blur-[80px] md:blur-[120px]" />
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:40px_40px] opacity-60"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Main Grid Container */}
        {/* Flex layout naturally places Left Column (Text) before Right Column (Phone) on all screens */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-center">
          
          {/* LEFT COLUMN: Header + Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
             
             {/* Header Section - Now Part of Flow to prevent overlap */}
             <div className="mb-6 lg:mb-10 text-center lg:text-left">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-widest mb-4 lg:mb-6 shadow-sm"
                >
                  <Bot className="w-3 h-3 text-blue-600" />
                  Workflow Engine
                </motion.div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-slate-900 tracking-tight leading-tight">
                  How <span className="text-[#25D366]">Chatbot</span> works.
                </h2>
             </div>

             {/* Dynamic Step Content */}
             <div className="relative min-h-[200px] md:min-h-[240px]">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={activeStep}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 20 }}
                   transition={{ duration: 0.5, ease: "circOut" }}
                   className="space-y-4 lg:space-y-6 text-center lg:text-left"
                 >
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold uppercase tracking-wider shadow-sm border mx-auto lg:mx-0 ${getBadgeColor(steps[activeStep].color)}`}>
                       <ActiveIcon className="w-4 h-4" />
                       {steps[activeStep].tag}
                    </div>
                    
                    <h3 className="text-2xl md:text-4xl font-semibold text-slate-900 leading-tight">
                       {steps[activeStep].title}
                    </h3>
                    
                    <p className="text-base md:text-lg text-slate-500 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
                       {steps[activeStep].description}
                    </p>

                    <div className="pt-2 hidden lg:flex justify-start">
                       <button className="flex items-center gap-2 text-sm font-bold text-slate-900 hover:gap-3 transition-all group">
                          Explore Feature <ArrowRight className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
                       </button>
                    </div>
                 </motion.div>
               </AnimatePresence>
             </div>

             {/* Progress Indicators (Desktop Only) */}
             <div className="hidden lg:grid grid-cols-4 gap-4 mt-12">
                {steps.map((step, index) => (
                   <div 
                      key={index}
                      onClick={() => setActiveStep(index)}
                      className="cursor-pointer group"
                   >
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-4 relative ring-1 ring-slate-900/5">
                         <div className="absolute inset-0 bg-slate-100" />
                         
                         {activeStep === index && (
                            <motion.div 
                               className={`absolute inset-0 bg-gradient-to-r ${getGradientColor(step.color)}`}
                               initial={{ width: "0%" }}
                               animate={{ width: "100%" }}
                               transition={{ duration: CYCLE_DURATION / 1000, ease: "linear" }}
                            />
                         )}
                         
                         {activeStep > index && (
                            <div className={`absolute inset-0 bg-gradient-to-r ${getGradientColor(step.color)}`} />
                         )}
                      </div>
                      
                      <span className={`text-[10px] md:text-xs font-bold transition-colors duration-300 uppercase tracking-wide block text-center lg:text-left ${
                         activeStep === index ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'
                      }`}>
                         {step.tag}
                      </span>
                   </div>
                ))}
             </div>
          </div>

          {/* RIGHT COLUMN: Visual Phone Mockup */}
          <div className="w-full lg:w-1/2 flex items-center justify-center mt-0 lg:mt-0">
             <div className="relative w-[85%] max-w-[280px] md:max-w-[320px] aspect-[9/18]">
                
                {/* Phone Frame */}
                <div className="absolute inset-0 bg-white rounded-[2.5rem] md:rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border-[6px] md:border-[8px] border-white ring-1 ring-slate-900/5 overflow-hidden z-10">
                   
                   {/* Phone Header */}
                   <div className="h-16 md:h-20 bg-white/90 backdrop-blur-md border-b border-slate-50 flex items-end px-4 md:px-6 pb-2 md:pb-3 z-20 relative">
                      <div className="flex items-center gap-3 w-full">
                         <div className="relative">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                               <Bot size={18} className="md:w-5 md:h-5" />
                            </div>
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 md:w-3 md:h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
                         </div>
                         <div className="flex-1">
                            <div className="text-xs md:text-sm font-bold text-slate-900 leading-none mb-1">TopEdge Assistant</div>
                            <div className="flex items-center gap-1">
                               <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                               <span className="text-[9px] md:text-[10px] text-emerald-600 font-medium">Online Now</span>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Phone Content Area */}
                   <div className="absolute inset-0 pt-16 md:pt-20 pb-16 md:pb-20 bg-slate-50/50">
                      <div className="h-full w-full relative">
                         <AnimatePresence mode="wait">
                            <motion.div 
                               key={activeStep}
                               initial={{ opacity: 0, scale: 0.95 }}
                               animate={{ opacity: 1, scale: 1 }}
                               exit={{ opacity: 0, scale: 1.05 }}
                               transition={{ duration: 0.4 }}
                               className="absolute inset-0 p-3 md:p-4 flex flex-col"
                            >
                               {steps[activeStep].visualComponent}
                            </motion.div>
                         </AnimatePresence>
                      </div>
                   </div>

                   {/* Phone Footer Input */}
                   <div className="absolute bottom-0 left-0 right-0 h-16 md:h-20 bg-white border-t border-slate-50 px-4 md:px-6 flex items-center">
                      <div className="flex-1 h-9 md:h-10 bg-slate-50 rounded-full flex items-center px-4 justify-between border border-slate-100">
                         <span className="text-slate-400 text-xs md:text-sm">Type a message...</span>
                         <div className="w-7 h-7 md:w-8 md:h-8 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md shadow-blue-600/20">
                            <ArrowRight size={14} className="md:w-4 md:h-4" />
                         </div>
                      </div>
                   </div>

                </div>

                {/* Decorative Back Glow */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] -z-10 rounded-full blur-[80px] opacity-40 transition-colors duration-1000 ${getGlowColor(steps[activeStep].color)}`} />
             </div>
          </div>

          {/* Progress Indicators (Mobile Only - Moved Below) */}
          <div className="lg:hidden w-full grid grid-cols-4 gap-2 mt-4">
             {steps.map((step, index) => (
                <div 
                   key={index}
                   onClick={() => setActiveStep(index)}
                   className="cursor-pointer group"
                >
                   <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-2 relative ring-1 ring-slate-900/5">
                      <div className="absolute inset-0 bg-slate-100" />
                      
                      {activeStep === index && (
                         <motion.div 
                            className={`absolute inset-0 bg-gradient-to-r ${getGradientColor(step.color)}`}
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: CYCLE_DURATION / 1000, ease: "linear" }}
                         />
                      )}
                      
                      {activeStep > index && (
                         <div className={`absolute inset-0 bg-gradient-to-r ${getGradientColor(step.color)}`} />
                      )}
                   </div>
                   
                   <span className={`text-[9px] font-bold transition-colors duration-300 uppercase tracking-wide block text-center ${
                      activeStep === index ? 'text-slate-900' : 'text-slate-400'
                   }`}>
                      {step.tag}
                   </span>
                </div>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
};

// --- HELPER FUNCTIONS ---

const getBadgeColor = (color: string) => {
   switch(color) {
      case 'blue': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'emerald': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'rose': return 'bg-rose-50 text-rose-600 border-rose-200';
      case 'violet': return 'bg-violet-50 text-violet-600 border-violet-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
   }
}

const getGradientColor = (color: string) => {
   switch(color) {
      case 'blue': return 'from-blue-500 to-indigo-500';
      case 'emerald': return 'from-emerald-400 to-teal-500';
      case 'rose': return 'from-rose-400 to-orange-500';
      case 'violet': return 'from-violet-500 to-purple-500';
      default: return 'from-slate-400 to-slate-600';
   }
}

const getGlowColor = (color: string) => {
   switch(color) {
      case 'blue': return 'bg-blue-500/30';
      case 'emerald': return 'bg-emerald-500/30';
      case 'rose': return 'bg-rose-500/30';
      case 'violet': return 'bg-violet-500/30';
      default: return 'bg-slate-500/20';
   }
}

export default HowChatbotWorksSection;