import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { MessageCircle, Check, ArrowRight, Play, Mic, Plus, Camera, Phone, Video, ArrowUpRight, ChevronLeft } from 'lucide-react';

const WhatsAppChatbotSection = () => {
  return (
    <section id="chatbot-start" className="py-24 md:py-32 bg-slate-50 overflow-hidden relative font-sans">
      
      {/* Background Ambience - Light Theme */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-emerald-100/50 rounded-full blur-[100px]" />
         <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-teal-50/60 rounded-full blur-[100px]" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Content */}
          <div className="lg:w-1/2 relative z-20 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-[11px] font-bold uppercase tracking-widest mb-6 shadow-sm"
            >
              <MessageCircle className="w-3 h-3 fill-current" />
              WhatsApp Automation
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-6 tracking-tight leading-[1.1]"
            >
              Convert Leads on <br />
              <span className="text-[#25D366]">
                WhatsApp 24/7
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-500 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              WhatsApp has a 98% open rate but Response time kills deals. Our WhatsApp agents respond instantly to qualify intent, handle objections, and book meetings before your competitor opens the app.
            </motion.p>
            
            <ul className="space-y-4 mb-10 text-left max-w-lg mx-auto lg:mx-0">
              {[
                "Engage every lead the second they message.",
                "Filter tire-kickers from serious buyers instantly.",
                "Syncs with your calendar to lock in bookings on the spot.",
                "Seamless handoff to humans for high-value deals with our own Dashboard"
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <span className="text-slate-600 text-base font-medium leading-snug">{item}</span>
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
              className="bg-[#25D366] text-white hover:bg-[#1faa53] px-8 py-4 rounded-full text-lg font-bold shadow-[0_10px_30px_-10px_rgba(37,211,102,0.4)] flex items-center gap-2 transition-all w-full sm:w-auto justify-center mx-auto lg:mx-0"
            >
              <span>Click me if interested</span>
              <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
            </motion.button>
          </div>

          {/* Right Content - Ultra Realistic Phone */}
          <div className="lg:w-1/2 w-full flex justify-center lg:justify-end relative z-20 perspective-1000">
             <PhoneSimulation />
          </div>

        </div>
      </div>
    </section>
  );
};

const PhoneSimulation = () => {
   const containerRef = useRef(null);
   const chatContainerRef = useRef<HTMLDivElement>(null);
   const isInView = useInView(containerRef, { margin: "-20% 0px -20% 0px" });
   
   const [messages, setMessages] = useState<any[]>([]);
   const [isTyping, setIsTyping] = useState(false);

   // Auto Scroll
   useEffect(() => {
      if (chatContainerRef.current) {
         chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
   }, [messages, isTyping]);

   // Chat Sequence (Exact Match to Image)
   useEffect(() => {
      let timeouts: NodeJS.Timeout[] = [];

      if (isInView) {
         const runSequence = async () => {
            setMessages([]);
            setIsTyping(false);

            // 1. Bot Welcome (Immediate)
            timeouts.push(setTimeout(() => {
                setMessages([{ 
                   id: 1, type: 'bot', 
                   text: "Hello! 👋 Welcome to TopEdge AI. How can I help you automate your business today?", 
                   time: "10:00 AM" 
                }]);
            }, 500));

            // 2. User Response
            timeouts.push(setTimeout(() => {
               setMessages(prev => [...prev, { 
                  id: 2, type: 'user', 
                  text: "I'm interested in AI Voice Agents.", 
                  time: "10:01 AM" 
               }]);
            }, 2000));

            // 3. Bot Typing -> Reply
            timeouts.push(setTimeout(() => setIsTyping(true), 2800));
            timeouts.push(setTimeout(() => {
               setIsTyping(false);
               setMessages(prev => [...prev, { 
                  id: 3, type: 'bot', 
                  text: "Great choice! Our Voice Agents can handle inbound/outbound calls 24/7. Would you like to hear a demo or see pricing?", 
                  time: "10:01 AM" 
               }]);
            }, 4500));

            // 4. User Response
            timeouts.push(setTimeout(() => {
               setMessages(prev => [...prev, { 
                  id: 4, type: 'user', 
                  text: "Hear a demo please.", 
                  time: "10:02 AM" 
               }]);
            }, 6500));

            // 5. Bot Typing -> Audio Reply
            timeouts.push(setTimeout(() => setIsTyping(true), 7200));
            timeouts.push(setTimeout(() => {
               setIsTyping(false);
               setMessages(prev => [...prev, { 
                  id: 5, type: 'bot', 
                  text: "Sure! 🎧 Here is a sample of our AI Agent in action:", 
                  isAudio: true,
                  time: "10:02 AM" 
               }]);
            }, 9000));
         };

         runSequence();
      } else {
         setMessages([]);
         setIsTyping(false);
         timeouts.forEach(clearTimeout);
      }

      return () => timeouts.forEach(clearTimeout);
   }, [isInView]);

   return (
      <div 
         ref={containerRef}
         className="relative w-full max-w-[360px] h-[720px] bg-[#2A2A2A] rounded-[3.5rem] p-3 shadow-2xl border-[6px] border-[#333333] ring-1 ring-black/10 transform transition-transform hover:scale-[1.01]"
      >
         {/* Dynamic Island / Notch */}
         <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-full z-50" />

         {/* Screen */}
         <div className="w-full h-full bg-[#E5DDD5] rounded-[3rem] overflow-hidden relative flex flex-col font-sans">
            
            {/* WhatsApp Business Header (Official Colors) */}
            <div className="bg-[#075E54] pt-12 pb-3 px-4 flex items-center gap-3 shadow-md z-20 sticky top-0 text-white">
               <ChevronLeft className="w-6 h-6 -ml-2" />
               <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center text-white font-bold text-sm border-2 border-white/20">
                  TE
               </div>
               <div className="flex-1 min-w-0">
                  <div className="font-bold text-base truncate flex items-center gap-1.5">
                     TopEdge AI <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center"><Check className="w-2 h-2 text-emerald-600 stroke-[4]" /></div>
                  </div>
                  <div className="text-[11px] opacity-80 truncate">Business Account</div>
               </div>
               <div className="flex gap-4 opacity-90">
                  <Video className="w-5 h-5" />
                  <Phone className="w-5 h-5" />
               </div>
            </div>

            {/* Chat Area */}
            <div 
               ref={chatContainerRef}
               className="flex-1 p-4 space-y-3 overflow-y-auto relative scroll-smooth"
            >
               {/* WhatsApp Wallpaper Pattern */}
               <div className="absolute inset-0 opacity-[0.4] bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] pointer-events-none" />

               <AnimatePresence mode='popLayout'>
                  {messages.map((msg) => (
                     <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} relative z-10`}
                     >
                        <div className={`${
                           msg.type === 'user' ? 'bg-[#DCF8C6]' : 'bg-white'
                        } px-3 py-2 rounded-lg shadow-[0_1px_1px_rgba(0,0,0,0.1)] max-w-[85%] text-[14px] text-slate-800 leading-snug relative`}
                        style={{
                           borderTopLeftRadius: msg.type === 'bot' ? '0' : '8px',
                           borderTopRightRadius: msg.type === 'user' ? '0' : '8px'
                        }}>
                           {/* Bubble Arrow Tail */}
                           <div className={`absolute top-0 w-3 h-3 ${msg.type === 'user' ? 'right-[-6px] bg-[#DCF8C6]' : 'left-[-6px] bg-white'}`} 
                                style={{ clipPath: msg.type === 'user' ? 'polygon(0 0, 100% 0, 0 100%)' : 'polygon(0 0, 100% 0, 100% 100%)' }} />

                           {msg.isAudio ? (
                              <div>
                                 <p className="mb-2">{msg.text}</p>
                                 <div className="flex items-center gap-3 bg-slate-50 p-2 rounded border border-slate-100 pr-4">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                                       <Play className="w-4 h-4 text-slate-500 ml-0.5 fill-current" />
                                    </div>
                                    <div className="h-6 flex items-center gap-0.5 flex-1 opacity-40">
                                       {[...Array(15)].map((_, i) => (
                                          <div key={i} className="w-0.5 bg-slate-800 rounded-full" style={{ height: Math.random() * 16 + 4 }} />
                                       ))}
                                    </div>
                                 </div>
                              </div>
                           ) : (
                              msg.text
                           )}
                           
                           <div className="text-[10px] text-slate-400 text-right mt-1 flex items-center justify-end gap-1 select-none">
                              {msg.time}
                              {msg.type === 'user' && <span className="text-blue-400">✓✓</span>}
                           </div>
                        </div>
                     </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        className="flex justify-start relative z-10"
                     >
                        <div className="bg-white px-4 py-3 rounded-lg rounded-tl-none shadow-sm flex items-center gap-1.5 ml-2">
                           <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                           <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                           <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>

            {/* Footer Input Area */}
            <div className="bg-[#F0F2F5] px-2 py-2 flex items-center gap-2 relative z-20 pb-6">
               <Plus className="w-6 h-6 text-slate-500 p-1" />
               <div className="flex-1 bg-white rounded-full h-10 px-4 text-[15px] flex items-center text-slate-400 shadow-sm">
                  Type a message...
               </div>
               <div className="w-10 h-10 bg-[#075E54] rounded-full flex items-center justify-center shadow-sm text-white shrink-0">
                  <Mic className="w-5 h-5" />
               </div>
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/20 rounded-full z-50" />
         </div>
      </div>
   );
}

export default WhatsAppChatbotSection;
