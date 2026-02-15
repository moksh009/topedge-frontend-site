import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Calendar, MessageSquare, Gift, CheckCircle2, Bot, Clock, Sparkles, Zap, X, ArrowRight } from 'lucide-react';

// --- STORY DATA ---
const steps = [
  {
    id: 0,
    title: "2:00 AM The Inquiry",
    description: "Moksh calls late at night. Usually, this lead is lost. But not tonight.",
    icon: Phone,
    color: "bg-blue-600",
    badge: "Inbound"
  },
  {
    id: 1,
    title: "Instant AI Response",
    description: "TopEdge answers in 0.2s. 'Hi Moksh! I see you're interested in the Enterprise Plan.'",
    icon: Bot,
    color: "bg-indigo-600",
    badge: "Intelligence"
  },
  {
    id: 2,
    title: "Smart Negotiation",
    description: "Moksh asks for 10 AM. 'That's booked, but 11:30 AM is open.' The AI negotiates like a pro.",
    icon: Calendar,
    color: "bg-violet-600",
    badge: "Scheduling"
  },
  {
    id: 3,
    title: "Instant Confirmation",
    description: "Deal closed. Calendar synced. Confirmation SMS sent. All while you sleep.",
    icon: CheckCircle2,
    color: "bg-emerald-600",
    badge: "Conversion"
  },
  {
    id: 4,
    title: "The \"Busy\" Scenario",
    description: "If he hangs up? We mark him as 'Hot Lead' and auto-schedule a callback for tomorrow.",
    icon: Clock,
    color: "bg-amber-600",
    badge: "Retention"
  },
  {
    id: 5,
    title: "Marketing Engine",
    description: "30 days later: 'Hey Moksh, it's been a month! Here is 20% off your next visit.'",
    icon: Zap,
    color: "bg-rose-600",
    badge: "LTV Growth"
  }
];

const HowAICallerWorksSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play Logic (4 Seconds)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="py-16 md:py-32 bg-slate-50 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent" />
         <div className="absolute top-1/2 right-[-10%] w-[800px] h-[800px] bg-indigo-100/40 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-indigo-600 text-xs font-semibold uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-3 h-3 text-indigo-600" />
            The Automated Journey
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-7xl font-semibold text-slate-900 mb-6 tracking-tight leading-[1.1]"
          >
            From "Missed Call" <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-400 to-indigo-600">
              to Loyal Customer.
            </span>
          </motion.h2>
        </div>

        {/* --- MOBILE LAYOUT (Unified View) --- */}
        <div className="lg:hidden flex flex-col items-center relative pb-10">
           
           {/* Background Glow for Mobile */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[350px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />

           {/* The Phone - Centered & Scaled */}
           <div className="relative z-10 scale-[0.75] sm:scale-90 origin-top mb-[-100px] sm:mb-[-60px]">
              <PhoneSimulation activeStep={activeStep} />
           </div>

           {/* Premium Floating Card (iOS 26 Style) */}
           <div className="relative z-20 w-full max-w-[360px] px-4 -mt-16 sm:-mt-20">
              <div className="bg-white/70 backdrop-blur-2xl border border-white/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] rounded-[2rem] p-5 sm:p-6 overflow-hidden relative ring-1 ring-white/40">
                 
                 {/* Animated Progress Line */}
                 <div className="absolute top-0 left-0 w-full h-[3px] bg-slate-100/50">
                    <motion.div
                       key={activeStep}
                       initial={{ width: "0%" }}
                       animate={{ width: "100%" }}
                       transition={{ duration: 4, ease: "linear" }}
                       className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                    />
                 </div>

                 <AnimatePresence mode="wait">
                    <motion.div
                       key={activeStep}
                       initial={{ opacity: 0, y: 15, filter: "blur(8px)" }}
                       animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                       exit={{ opacity: 0, y: -15, filter: "blur(8px)" }}
                       transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }} // iOS ease
                       className="flex flex-col gap-3 sm:gap-4"
                    >
                       <div className="flex items-center justify-between">
                          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold text-white shadow-lg shadow-indigo-500/20 ${steps[activeStep].color}`}>
                             {React.createElement(steps[activeStep].icon, { className: "w-3.5 h-3.5" })}
                             {steps[activeStep].badge}
                          </div>
                          <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase font-mono">
                            0{activeStep + 1} / 0{steps.length}
                          </span>
                       </div>

                       <div className="space-y-1 sm:space-y-2">
                          <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight tracking-tight">
                             {steps[activeStep].title}
                          </h3>
                          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-medium">
                             {steps[activeStep].description}
                          </p>
                       </div>
                    </motion.div>
                 </AnimatePresence>
              </div>
              
              {/* Interactive Navigation Dots */}
              <div className="flex justify-center gap-3 mt-8">
                 {steps.map((_, i) => (
                    <button 
                       key={i} 
                       onClick={() => { setIsPaused(true); setActiveStep(i); }}
                       className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                          activeStep === i ? 'w-10 bg-slate-900 shadow-md scale-100' : 'w-2 bg-slate-300 hover:bg-slate-400 scale-90'
                       }`} 
                       aria-label={`Go to step ${i + 1}`}
                    />
                 ))}
              </div>
           </div>
        </div>

        {/* --- DESKTOP LAYOUT (Split View) --- */}
        <div className="hidden lg:flex gap-24 items-start">
          
          {/* LEFT: Auto-Play Timeline */}
          <div className="w-5/12 relative pl-4" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
             <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-slate-200" />
             
             <div className="space-y-4">
               {steps.map((step, index) => (
                 <motion.div
                   key={index}
                   onClick={() => setActiveStep(index)}
                   className={`relative cursor-pointer pl-10 py-2 transition-all duration-500 ${activeStep === index ? 'opacity-100' : 'opacity-50 hover:opacity-80'}`}
                 >
                   {/* Timeline Progress Bar (Vertical) */}
                   <div className={`absolute left-0 top-3 w-3 h-3 rounded-full border-2 transition-all duration-300 z-10 bg-white ${
                      activeStep === index ? 'border-indigo-600 scale-125' : 'border-slate-300'
                   }`}>
                      {activeStep === index && (
                         <motion.div 
                           layoutId="desktopDot"
                           className="w-full h-full bg-indigo-600 rounded-full"
                         />
                      )}
                   </div>

                   <h3 className={`text-xl font-bold mb-1 ${activeStep === index ? 'text-slate-900' : 'text-slate-500'}`}>
                      {step.title}
                   </h3>
                   
                   <AnimatePresence>
                      {activeStep === index && (
                         <motion.div 
                           initial={{ height: 0, opacity: 0 }}
                           animate={{ height: "auto", opacity: 1 }}
                           exit={{ height: 0, opacity: 0 }}
                           className="overflow-hidden"
                         >
                            <p className="text-slate-600 text-base leading-relaxed mt-2">
                               {step.description}
                            </p>
                         </motion.div>
                      )}
                   </AnimatePresence>
                 </motion.div>
               ))}
             </div>
          </div>

          {/* RIGHT: Floating Phone */}
          <div className="w-7/12 flex justify-center sticky top-24">
             <PhoneSimulation activeStep={activeStep} />
          </div>

        </div>
      </div>
    </section>
  );
};

// --- REUSABLE PHONE COMPONENT ---
const PhoneSimulation = ({ activeStep }: { activeStep: number }) => {
   return (
      <div className="relative w-[300px] md:w-[320px] h-[600px] md:h-[650px] bg-[#0f172a] rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(50,50,93,0.3)] border-[8px] border-[#1f2937] ring-1 ring-white/10 overflow-hidden flex flex-col transform transition-transform hover:scale-[1.01]">
                
         {/* Dynamic Island */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-b-2xl z-50 flex items-center justify-center gap-2">
            {activeStep === 0 && <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />}
            {activeStep > 0 && <div className="w-1.5 h-1.5 rounded-full bg-green-500" />}
         </div>

         {/* Screen Content - Dynamic Changing */}
         <AnimatePresence mode="wait">
            <motion.div
               key={activeStep}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 1.05 }}
               transition={{ duration: 0.4 }}
               className="w-full h-full bg-slate-50 relative overflow-hidden"
            >
               {/* STEP 0: INCOMING CALL */}
               {activeStep === 0 && (
                  <div className="w-full h-full bg-black/90 relative flex flex-col items-center pt-24 pb-16">
                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop')] bg-cover opacity-30 blur-md" />
                     
                     <div className="relative z-10 text-center flex-1 flex flex-col justify-start">
                        <div className="w-24 h-24 rounded-full bg-slate-200 overflow-hidden mx-auto mb-6 border-4 border-white/10 shadow-2xl">
                           <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop" alt="Moksh" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-3xl font-light text-white mb-2">Moksh</h3>
                        <p className="text-slate-400 text-sm font-medium tracking-wide">mobile</p>
                     </div>

                     <div className="w-full px-10 relative z-10">
                        <div className="flex justify-between items-center">
                           <div className="flex flex-col items-center gap-3">
                              <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/20">
                                 <Phone className="w-8 h-8 text-white rotate-[135deg]" />
                              </div>
                              <span className="text-white text-xs font-medium">Decline</span>
                           </div>
                           <div className="flex flex-col items-center gap-3">
                              <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/20 animate-pulse">
                                 <Phone className="w-8 h-8 text-white" />
                              </div>
                              <span className="text-white text-xs font-medium">Accept</span>
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {/* STEP 1: VOICE INTELLIGENCE */}
               {activeStep === 1 && (
                  <div className="w-full h-full bg-black flex flex-col justify-end pb-12 relative overflow-hidden">
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/30 rounded-full blur-[80px] animate-pulse" />
                     <div className="relative z-10 px-6 text-center space-y-8">
                        <div className="text-white text-lg font-medium leading-relaxed">
                           "Hi Moksh! I see you're interested in the <span className="text-indigo-400 font-bold">Enterprise Plan</span>. How can I help?"
                        </div>
                        <div className="flex justify-center items-center gap-1 h-10">
                           {[...Array(12)].map((_, i) => (
                              <motion.div 
                                 key={i}
                                 animate={{ height: [10, 40, 10] }}
                                 transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                                 className="w-1.5 rounded-full bg-gradient-to-t from-indigo-500 to-purple-500"
                              />
                           ))}
                        </div>
                        <div className="flex justify-center">
                           <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                              <Bot className="w-6 h-6 text-white" />
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {/* STEP 2: NEGOTIATION */}
               {activeStep === 2 && (
                  <div className="w-full h-full bg-[#f2f2f7] flex flex-col relative pt-12">
                     <div className="bg-white/80 backdrop-blur-md p-4 border-b border-slate-200 flex items-center gap-3 sticky top-0 z-10">
                        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs">AI</div>
                        <div>
                           <div className="text-xs text-slate-500">To:</div>
                           <div className="text-sm font-bold text-slate-900">Moksh</div>
                        </div>
                     </div>
                     <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                        <div className="flex justify-end"><div className="bg-blue-500 text-white p-3 rounded-2xl rounded-tr-sm text-sm max-w-[85%] shadow-sm">Can we do 10 AM tomorrow?</div></div>
                        <div className="flex justify-start"><div className="bg-white p-3 rounded-2xl rounded-tl-sm text-sm text-slate-600 shadow-sm flex items-center gap-2"><Sparkles className="w-3 h-3 text-indigo-500 animate-spin-slow" /> Checking Calendar...</div></div>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start"><div className="bg-white p-3 rounded-2xl rounded-tl-sm text-sm text-slate-800 shadow-sm border border-slate-100">10 AM is booked. How about <span className="font-bold text-indigo-600">11:30 AM</span>?</div></motion.div>
                     </div>
                  </div>
               )}

               {/* STEP 3: CONFIRMATION */}
               {activeStep === 3 && (
                  <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop')] bg-cover flex flex-col relative">
                     <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
                     <div className="relative z-10 pt-20 text-center text-white">
                        <div className="text-6xl font-thin tracking-tight">9:41</div>
                        <div className="text-lg font-medium opacity-80">Wednesday, Oct 24</div>
                     </div>
                     <div className="mt-8 px-4 space-y-2 relative z-10">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white/90 backdrop-blur-xl rounded-2xl p-4 shadow-lg">
                           <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center gap-2"><div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center"><MessageSquare className="w-3 h-3 text-white fill-current" /></div><span className="text-xs font-bold text-slate-700">MESSAGES</span></div>
                              <span className="text-[10px] text-slate-500">Now</span>
                           </div>
                           <div className="text-sm font-bold text-slate-900">TopEdge AI</div>
                           <p className="text-xs text-slate-600 mt-0.5">Confirmed! 📅 Appointment set for Tomorrow 11:30 AM.</p>
                        </motion.div>
                     </div>
                  </div>
               )}

               {/* STEP 4: CALL BACK */}
               {activeStep === 4 && (
                  <div className="w-full h-full bg-slate-50 flex flex-col pt-14 px-6 justify-center">
                     <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-amber-500" />
                        <div className="flex items-center gap-4 mb-6">
                           <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-lg">M</div>
                           <div><div className="font-bold text-slate-900 text-lg">Moksh P.</div><div className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded-full inline-block mt-1">Request: Call Later</div></div>
                        </div>
                        <div className="space-y-4">
                           <div className="flex items-center gap-3 text-slate-600 text-sm"><X className="w-4 h-4 text-red-400" /><span>Customer hung up (Busy)</span></div>
                           <div className="flex items-center gap-3 text-sm font-medium text-slate-900 bg-indigo-50 p-3 rounded-xl border border-indigo-100"><div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center"><Clock className="w-4 h-4 text-indigo-600" /></div><span>Auto-scheduled callback: Tomorrow 10 AM</span></div>
                        </div>
                     </div>
                  </div>
               )}

               {/* STEP 5: MARKETING */}
               {activeStep === 5 && (
                  <div className="w-full h-full bg-white flex flex-col justify-center items-center p-6 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -mr-16 -mt-16" />
                     <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 relative z-10">
                        <div className="flex justify-center mb-6"><div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center animate-bounce"><Gift className="w-8 h-8 text-rose-500" /></div></div>
                        <h3 className="text-xl font-bold text-center text-slate-900 mb-2">30 Day Check-in</h3>
                        <p className="text-center text-slate-500 text-sm mb-6">Re-engaging inactive lead...</p>
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-4"><p className="text-xs text-slate-400 font-bold uppercase mb-2">AI Outbound Script</p><p className="text-sm text-slate-700 italic">"Hey Moksh, it's been a while! We'd love to see you again. Here is a 20% discount code."</p></div>
                        <button className="w-full py-3 bg-rose-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2"><Zap className="w-4 h-4 fill-current" /> Launch Campaign</button>
                     </motion.div>
                  </div>
               )}
            </motion.div>
         </AnimatePresence>

         {/* Frame Gloss */}
         <div className="absolute inset-0 pointer-events-none rounded-[3rem] ring-1 ring-inset ring-white/20 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]" />
      </div>
   );
}

export default HowAICallerWorksSection;