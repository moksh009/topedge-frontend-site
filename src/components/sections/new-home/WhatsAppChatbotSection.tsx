import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { MessageCircle, Check, ArrowRight, Play, Mic, Plus, Camera, Phone, Video } from 'lucide-react';

const WhatsAppChatbotSection = () => {
  return (
    <section className="py-24 md:py-32 bg-[#0B1121] overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-emerald-900/20 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#075E54]/20 rounded-full blur-[100px]" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Content */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              WhatsApp Business API
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]"
            >
              Meet your customers <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#25D366] to-emerald-400">
                where they live.
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-400 mb-10 leading-relaxed max-w-lg"
            >
              Automate 90% of support and sales on the world's most popular messaging app. No apps to download, just instant connection.
            </motion.p>
            
            <ul className="space-y-5 mb-12">
              {[
                { label: "Zero Wait Time", desc: "Instant AI responses 24/7" },
                { label: "High Open Rates", desc: "98% vs 20% for email" },
                { label: "Rich Media", desc: "Send PDFs, images, & videos" },
                { label: "Seamless Handoff", desc: "Smart escalation to humans" }
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                     <h4 className="text-white font-bold text-lg leading-none mb-1">{item.label}</h4>
                     <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-[#25D366] text-white hover:bg-[#128C7E] px-8 py-4 rounded-full text-lg font-bold shadow-[0_0_30px_-5px_rgba(37,211,102,0.4)] flex items-center gap-3 transition-all"
            >
              <MessageCircle className="w-6 h-6 fill-current" />
              <span>Start WhatsApp Demo</span>
              <ArrowRight className="w-5 h-5 opacity-60 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          {/* Right Content - Ultra Realistic Phone */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end perspective-1000">
             <PhoneSimulation />
          </div>

        </div>
      </div>
    </section>
  );
};

const PhoneSimulation = () => {
   const containerRef = useRef(null);
   const isInView = useInView(containerRef, { margin: "-20% 0px -20% 0px" });
   const [step, setStep] = useState(0);

   useEffect(() => {
      if (isInView) {
         const interval = setInterval(() => {
            setStep(prev => prev < 4 ? prev + 1 : prev); // Stop at 4
         }, 1500);
         return () => clearInterval(interval);
      } else {
         setStep(0); // Reset when out of view
      }
   }, [isInView]);

   return (
      <motion.div 
         ref={containerRef}
         initial={{ rotateY: 15, rotateX: 5 }}
         whileHover={{ rotateY: 0, rotateX: 0 }}
         transition={{ duration: 0.8, ease: "easeOut" }}
         className="relative w-[380px] h-[780px] bg-[#1c1c1e] rounded-[3.5rem] p-3 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-[6px] border-[#2d2d2f] ring-1 ring-white/10"
      >
         {/* Dynamic Island */}
         <div className="absolute top-7 left-1/2 -translate-x-1/2 w-32 h-9 bg-black rounded-full z-50 flex items-center justify-center gap-2 px-3">
            <div className="w-2 h-2 rounded-full bg-[#075E54]/50 animate-pulse" />
         </div>

         {/* Screen */}
         <div className="w-full h-full bg-[#EFE7DE] rounded-[3rem] overflow-hidden relative flex flex-col">
            
            {/* WhatsApp Header */}
            <div className="bg-[#F6F6F6] bg-opacity-90 backdrop-blur-xl pt-14 pb-3 px-4 border-b border-slate-200 flex items-center justify-between z-20 sticky top-0">
               <div className="flex items-center gap-3">
                  <div className="text-blue-500 flex items-center gap-1 -ml-2">
                     <ArrowRight className="w-6 h-6 rotate-180" />
                     <span className="text-lg">95</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden relative border border-slate-300">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#25D366] to-emerald-400 flex items-center justify-center text-white font-bold text-lg">
                           TE
                        </div>
                     </div>
                     <div>
                        <div className="font-bold text-black text-sm flex items-center gap-1">
                           TopEdge AI <Check className="w-3 h-3 text-blue-500 fill-current" />
                        </div>
                        <div className="text-[10px] text-slate-500">Official Business Account</div>
                     </div>
                  </div>
               </div>
               <div className="flex gap-4 text-blue-500">
                  <Video className="w-6 h-6" />
                  <Phone className="w-6 h-6" />
               </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto relative">
               {/* Wallpaper Pattern */}
               <div className="absolute inset-0 opacity-[0.06] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] pointer-events-none" />

               {/* Date Badge */}
               <div className="flex justify-center mb-6 relative z-10">
                  <span className="bg-[#E1F3FB] text-slate-600 text-[10px] font-medium px-3 py-1 rounded-lg shadow-sm uppercase tracking-wide">Today</span>
               </div>

               <AnimatePresence>
                  {step >= 1 && (
                     <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className="bg-white p-3 rounded-xl rounded-tl-none shadow-sm max-w-[80%] self-start relative z-10"
                     >
                        <p className="text-[15px] text-black leading-snug">
                           Hi! 👋 Welcome to TopEdge AI. Looking to automate your business?
                        </p>
                        <div className="text-[10px] text-gray-400 text-right mt-1">10:41 AM</div>
                     </motion.div>
                  )}

                  {step >= 2 && (
                     <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-[#DCF8C6] p-3 rounded-xl rounded-tr-none shadow-sm max-w-[80%] ml-auto relative z-10"
                     >
                        <p className="text-[15px] text-black leading-snug">
                           Yes! I need a chatbot for my real estate agency. 🏠
                        </p>
                        <div className="text-[10px] text-[#559C78] text-right mt-1 flex items-center justify-end gap-1">
                           10:42 AM <Check className="w-3 h-3 text-blue-500" />
                        </div>
                     </motion.div>
                  )}

                  {step >= 3 && (
                     <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 1 }}
                        className="bg-white p-3 rounded-xl rounded-tl-none shadow-sm max-w-[85%] self-start relative z-10"
                     >
                        <p className="text-[15px] text-black leading-snug mb-2">
                           Great! 🚀 Our Real Estate Bot can qualify leads and book viewings 24/7. Here is a quick audio demo:
                        </p>
                        
                        {/* Audio Player UI */}
                        <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg border border-slate-100">
                           <div className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center border border-slate-200">
                              <Play className="w-4 h-4 text-slate-500 fill-current ml-0.5" />
                           </div>
                           <div className="flex-1">
                              <div className="h-8 flex items-center gap-0.5 opacity-50">
                                 {[...Array(20)].map((_, i) => (
                                    <motion.div 
                                       key={i}
                                       animate={{ height: [8, 16, 8] }}
                                       transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.05 }}
                                       className="w-1 bg-slate-400 rounded-full"
                                       style={{ height: Math.random() * 20 + 5 }}
                                    />
                                 ))}
                              </div>
                           </div>
                           <div className="text-[10px] text-slate-400 font-mono">0:14</div>
                        </div>
                        <div className="text-[10px] text-gray-400 text-right mt-1">10:42 AM</div>
                     </motion.div>
                  )}

                  {step >= 4 && (
                     <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                        className="flex justify-center pt-4"
                     >
                        <div className="bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm text-blue-500 font-medium text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-50 transition-colors">
                           <MessageCircle className="w-4 h-4" /> Start Live Demo
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>

            {/* Footer Input Area */}
            <div className="bg-[#F6F6F6] px-4 py-3 pb-8 border-t border-slate-200 flex items-center gap-3 relative z-20">
               <Plus className="w-6 h-6 text-blue-500" />
               <div className="flex-1 bg-white border border-slate-200 rounded-full h-9 px-4 text-[15px] flex items-center text-slate-400 shadow-sm">
                  Type a message...
               </div>
               <Camera className="w-6 h-6 text-blue-500" />
               <Mic className="w-6 h-6 text-blue-500" />
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/20 rounded-full z-50" />
         </div>
      </motion.div>
   );
}

export default WhatsAppChatbotSection;