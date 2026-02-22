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

   // Auto-play Logic (3 Seconds)
   useEffect(() => {
      let interval: NodeJS.Timeout;
      if (!isPaused) {
         interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
         }, 3000);
      }
      return () => clearInterval(interval);
   }, [isPaused]);

   return (
      <section className="py-12 md:py-20 bg-slate-50 relative overflow-hidden">

         {/* Background Decor */}
         <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent" />
            <div className="absolute top-1/2 right-[-10%] w-[800px] h-[800px] bg-indigo-100/40 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px]" />
         </div>

         <div className="container mx-auto px-4 max-w-7xl relative z-10">



            {/* --- MOBILE LAYOUT (Unified View) --- */}
            <div className="lg:hidden flex flex-col items-center relative pb-10">

               {/* Background Glow for Mobile */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[350px] h-[500px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />

               {/* The Phone - Centered & Scaled */}
               <div className="relative z-10 scale-[0.7] sm:scale-80 origin-top mb-[-140px] sm:mb-[-100px]">
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
                           transition={{ duration: 3, ease: "linear" }}
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
                           className={`h-1.5 rounded-full transition-all duration-500 ease-out ${activeStep === i ? 'w-10 bg-slate-900 shadow-md scale-100' : 'w-2 bg-slate-300 hover:bg-slate-400 scale-90'
                              }`}
                           aria-label={`Go to step ${i + 1}`}
                        />
                     ))}
                  </div>
               </div>
            </div>

            {/* --- DESKTOP LAYOUT (Split Screen Style) --- */}
            <div className="hidden lg:flex flex-row gap-8 lg:gap-24 items-center">

               {/* LEFT COLUMN: Header + Text Content */}
               <div className="w-full lg:w-1/2 flex flex-col justify-center">

                  {/* Header Section */}
                  <div className="mb-6 lg:mb-10 text-left">
                     <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm"
                     >
                        <Sparkles className="w-3 h-3 text-indigo-600" />
                        AI Voice Engine
                     </motion.div>
                     <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 tracking-tight leading-tight">
                        How <span className="text-indigo-600">AI Caller</span> works.
                     </h2>
                  </div>

                  {/* Dynamic Step Content */}
                  <div className="relative min-h-[220px]">
                     <AnimatePresence mode="wait">
                        <motion.div
                           key={activeStep}
                           initial={{ opacity: 0, x: -20 }}
                           animate={{ opacity: 1, x: 0 }}
                           exit={{ opacity: 0, x: 20 }}
                           transition={{ duration: 0.5, ease: "circOut" }}
                           className="space-y-4 lg:space-y-6 text-left"
                        >
                           <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold uppercase tracking-wider shadow-sm border ${getBadgeColor(steps[activeStep].color.replace('bg-', ''))}`}>
                              {React.createElement(steps[activeStep].icon, { className: "w-4 h-4" })}
                              {steps[activeStep].badge}
                           </div>

                           <h3 className="text-2xl md:text-4xl font-semibold text-slate-900 leading-tight">
                              {steps[activeStep].title}
                           </h3>

                           <p className="text-base md:text-lg text-slate-500 leading-relaxed max-w-lg font-medium">
                              {steps[activeStep].description}
                           </p>

                           <div className="pt-2 flex justify-start">
                              <button className="flex items-center gap-2 text-sm font-bold text-slate-900 hover:gap-3 transition-all group">
                                 Explore Feature <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:text-indigo-700" />
                              </button>
                           </div>
                        </motion.div>
                     </AnimatePresence>
                  </div>

                  {/* Progress Indicators (Desktop Only) */}
                  <div className="hidden lg:grid grid-cols-6 gap-3 mt-12">
                     {steps.map((step, index) => (
                        <div
                           key={index}
                           onClick={() => { setIsPaused(true); setActiveStep(index); }}
                           className="cursor-pointer group"
                        >
                           <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-4 relative ring-1 ring-slate-900/5">
                              <div className="absolute inset-0 bg-slate-100" />

                              {activeStep === index && (
                                 <motion.div
                                    key={activeStep}
                                    className={`absolute inset-0 bg-gradient-to-r ${getGradientColor(step.color.replace('bg-', ''))}`}
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 3, ease: "linear" }}
                                 />
                              )}

                              {activeStep > index && (
                                 <div className={`absolute inset-0 bg-gradient-to-r ${getGradientColor(step.color.replace('bg-', ''))}`} />
                              )}
                           </div>

                           <span className={`text-[9px] font-bold transition-colors duration-300 uppercase tracking-wide block text-left ${activeStep === index ? 'text-slate-900' : 'text-slate-400 group-hover:text-slate-600'
                              }`}>
                              {step.badge}
                           </span>
                        </div>
                     ))}
                  </div>
               </div>

               {/* RIGHT COLUMN: Visual Phone Mockup */}
               <div className="w-full lg:w-1/2 flex items-center justify-center">
                  <div className="relative">
                     {/* Decorative Back Glow */}
                     <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[100%] rounded-full blur-[100px] opacity-30 transition-colors duration-1000 ${getGlowColor(steps[activeStep].color.replace('bg-', ''))}`} />

                     <PhoneSimulation activeStep={activeStep} />
                  </div>
               </div>

            </div>
         </div>
      </section>
   );
};

// --- REUSABLE PHONE COMPONENT ---
const PhoneSimulation = ({ activeStep }: { activeStep: number }) => {
   return (
      <div className="relative w-[280px] md:w-[300px] h-[520px] md:h-[580px] bg-[#0f172a] rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(50,50,93,0.3)] border-[8px] border-[#1f2937] ring-1 ring-white/10 overflow-hidden flex flex-col transform transition-transform hover:scale-[1.01]">

         {/* Dynamic Island */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-50 flex items-center justify-center gap-2">
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
               {/* Progress Bar Inside Phone */}
               <div className="absolute top-0 left-0 w-full h-1 bg-black/10 z-[60]">
                  <motion.div
                     key={`phone-progress-${activeStep}`}
                     initial={{ width: "0%" }}
                     animate={{ width: "100%" }}
                     transition={{ duration: 3, ease: "linear" }}
                     className="h-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                  />
               </div>
               {/* STEP 0: INCOMING CALL */}
               {activeStep === 0 && (
                  <div className="w-full h-full bg-black/90 relative flex flex-col items-center pt-16 pb-12">
                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop')] bg-cover opacity-30 blur-md" />

                     <div className="relative z-10 text-center flex-1 flex flex-col justify-start">
                        <div className="w-20 h-20 rounded-full bg-slate-200 overflow-hidden mx-auto mb-4 border-4 border-white/10 shadow-2xl">
                           <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop" alt="Moksh" className="w-full h-full object-cover" />
                        </div>
                        <h3 className="text-2xl font-light text-white mb-1">Moksh</h3>
                        <p className="text-slate-400 text-xs font-medium tracking-wide">mobile</p>
                     </div>

                     <div className="w-full px-8 relative z-10 mt-auto">
                        <div className="flex justify-between items-center">
                           <div className="flex flex-col items-center gap-2">
                              <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/20">
                                 <Phone className="w-7 h-7 text-white rotate-[135deg]" />
                              </div>
                              <span className="text-white text-[10px] font-medium">Decline</span>
                           </div>
                           <div className="flex flex-col items-center gap-2">
                              <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/20 animate-pulse">
                                 <Phone className="w-7 h-7 text-white" />
                              </div>
                              <span className="text-white text-[10px] font-medium">Accept</span>
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {/* STEP 1: VOICE INTELLIGENCE */}
               {activeStep === 1 && (
                  <div className="w-full h-full bg-black flex flex-col justify-end pb-10 relative overflow-hidden">
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-indigo-500/30 rounded-full blur-[60px] animate-pulse" />
                     <div className="relative z-10 px-6 text-center space-y-6">
                        <div className="text-white text-base font-medium leading-relaxed">
                           "Hi Moksh! I see you're interested in the <span className="text-indigo-400 font-bold">Enterprise Plan</span>. How can I help?"
                        </div>
                        <div className="flex justify-center items-center gap-1 h-8">
                           {[...Array(10)].map((_, i) => (
                              <motion.div
                                 key={i}
                                 animate={{ height: [8, 30, 8] }}
                                 transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }}
                                 className="w-1 rounded-full bg-gradient-to-t from-indigo-500 to-purple-500"
                              />
                           ))}
                        </div>
                        <div className="flex justify-center">
                           <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                              <Bot className="w-5 h-5 text-white" />
                           </div>
                        </div>
                     </div>
                  </div>
               )}

               {/* STEP 2: NEGOTIATION */}
               {activeStep === 2 && (
                  <div className="w-full h-full bg-[#f2f2f7] flex flex-col relative pt-10">
                     <div className="bg-white/80 backdrop-blur-md p-3 border-b border-slate-200 flex items-center gap-3 sticky top-0 z-10">
                        <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-[10px]">AI</div>
                        <div>
                           <div className="text-[10px] text-slate-500">To:</div>
                           <div className="text-xs font-bold text-slate-900">Moksh</div>
                        </div>
                     </div>
                     <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                        <div className="flex justify-end"><div className="bg-blue-500 text-white p-2.5 rounded-2xl rounded-tr-sm text-xs max-w-[85%] shadow-sm">Can we do 10 AM tomorrow?</div></div>
                        <div className="flex justify-start"><div className="bg-white p-2.5 rounded-2xl rounded-tl-sm text-xs text-slate-600 shadow-sm flex items-center gap-2"><Sparkles className="w-3 h-3 text-indigo-500 animate-spin-slow" /> Checking Calendar...</div></div>
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start"><div className="bg-white p-2.5 rounded-2xl rounded-tl-sm text-xs text-slate-800 shadow-sm border border-slate-100">10 AM is booked. <br />How about <span className="font-bold text-indigo-600">11:30 AM</span>?</div></motion.div>
                     </div>
                  </div>
               )}

               {/* STEP 3: CONFIRMATION */}
               {activeStep === 3 && (
                  <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop')] bg-cover flex flex-col relative">
                     <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
                     <div className="relative z-10 pt-16 text-center text-white">
                        <div className="text-5xl font-thin tracking-tight">9:41</div>
                        <div className="text-base font-medium opacity-80">Wednesday, Oct 24</div>
                     </div>
                     <div className="mt-6 px-4 space-y-2 relative z-10">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white/90 backdrop-blur-xl rounded-2xl p-3.5 shadow-lg">
                           <div className="flex justify-between items-center mb-1.5">
                              <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-500 rounded flex items-center justify-center"><MessageSquare className="w-2.5 h-2.5 text-white fill-current" /></div><span className="text-[10px] font-bold text-slate-700">MESSAGES</span></div>
                              <span className="text-[9px] text-slate-500">Now</span>
                           </div>
                           <div className="text-xs font-bold text-slate-900">TopEdge AI</div>
                           <p className="text-[11px] text-slate-600 mt-0.5">Confirmed! 📅 Appointment set for Tomorrow 11:30 AM.</p>
                        </motion.div>
                     </div>
                  </div>
               )}

               {/* STEP 4: CALL BACK */}
               {activeStep === 4 && (
                  <div className="w-full h-full bg-slate-50 flex flex-col pt-10 px-5 justify-center">
                     <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-amber-500" />
                        <div className="flex items-center gap-3 mb-4">
                           <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-base">M</div>
                           <div><div className="font-bold text-slate-900 text-base">Moksh P.</div><div className="text-[10px] text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded-full inline-block mt-0.5">Request: Call Later</div></div>
                        </div>
                        <div className="space-y-3">
                           <div className="flex items-center gap-2.5 text-slate-600 text-xs"><X className="w-3.5 h-3.5 text-red-400" /><span>Customer hung up (Busy)</span></div>
                           <div className="flex items-center gap-2.5 text-xs font-medium text-slate-900 bg-indigo-50 p-2.5 rounded-xl border border-indigo-100"><div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center"><Clock className="w-3.5 h-3.5 text-indigo-600" /></div><span>Auto-callback: Tomorrow 10 AM</span></div>
                        </div>
                     </div>
                  </div>
               )}

               {/* STEP 5: MARKETING */}
               {activeStep === 5 && (
                  <div className="w-full h-full bg-white flex flex-col justify-center items-center p-5 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-56 h-56 bg-rose-50 rounded-full blur-3xl -mr-16 -mt-16" />
                     <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 relative z-10">
                        <div className="flex justify-center mb-4"><div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center animate-bounce"><Gift className="w-6 h-6 text-rose-500" /></div></div>
                        <h3 className="text-lg font-bold text-center text-slate-900 mb-1">30 Day Check-in</h3>
                        <p className="text-center text-slate-500 text-xs mb-4">Re-engaging inactive lead...</p>
                        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 mb-3"><p className="text-[10px] text-slate-400 font-bold uppercase mb-1.5">AI Outbound Script</p><p className="text-xs text-slate-700 italic">"Hey Moksh, it's been a while! We'd love to see you again. Here is a 20% discount code."</p></div>
                        <button className="w-full py-2.5 bg-rose-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-rose-500/30 flex items-center justify-center gap-2"><Zap className="w-3.5 h-3.5 fill-current" /> Launch Campaign</button>
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

// --- HELPER FUNCTIONS ---

const getBadgeColor = (color: string) => {
   switch (color) {
      case 'blue': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'indigo': return 'bg-indigo-50 text-indigo-600 border-indigo-200';
      case 'violet': return 'bg-violet-50 text-violet-600 border-violet-200';
      case 'emerald': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'amber': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'rose': return 'bg-rose-50 text-rose-600 border-rose-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
   }
}

const getGradientColor = (color: string) => {
   switch (color) {
      case 'blue': return 'from-blue-500 to-indigo-500';
      case 'indigo': return 'from-indigo-500 to-blue-600';
      case 'violet': return 'from-violet-500 to-purple-500';
      case 'emerald': return 'from-emerald-400 to-teal-500';
      case 'amber': return 'from-amber-400 to-orange-500';
      case 'rose': return 'from-rose-400 to-pink-500';
      default: return 'from-slate-400 to-slate-600';
   }
}

const getGlowColor = (color: string) => {
   switch (color) {
      case 'blue': return 'bg-blue-500/30';
      case 'indigo': return 'bg-indigo-500/30';
      case 'violet': return 'bg-violet-500/30';
      case 'emerald': return 'bg-emerald-500/30';
      case 'amber': return 'bg-amber-500/30';
      case 'rose': return 'bg-rose-500/30';
      default: return 'bg-slate-500/20';
   }
}

export default HowAICallerWorksSection;