import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Check, ArrowRight } from 'lucide-react';

const WhatsAppChatbotSection = () => {
  return (
    <section className="py-32 bg-[#F5F5F7] overflow-hidden relative">
      {/* Premium Background Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-100/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* Left Content */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-green-600 text-xs font-semibold uppercase tracking-wide mb-6 shadow-sm"
            >
              <MessageCircle className="w-3 h-3" />
              WhatsApp Automation
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1d1d1f] mb-6 tracking-tight leading-tight"
            >
              Convert Leads on <br />
              <span className="text-[#25D366]">WhatsApp</span> 24/7
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-[#86868b] mb-10 leading-relaxed"
            >
              Don't let customers wait. Our AI chatbot instantly responds, qualifies leads, and books appointments directly on WhatsApp.
            </motion.p>
            
            <ul className="space-y-4 mb-10">
              {[
                "Instant Replies: 0 second wait time",
                "Lead Qualification: Filter high-intent buyers",
                "Automated Booking: Syncs with your calendar",
                "Human Handoff: Seamlessly transfer complex queries"
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 text-[#1d1d1f] font-medium"
                >
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  {item}
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
              className="group bg-[#25D366] text-white hover:bg-[#128C7E] px-8 py-4 rounded-full text-lg font-semibold shadow-xl shadow-green-500/30 flex items-center gap-2 transition-all"
            >
              Try WhatsApp Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          {/* Right Content - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20, rotateY: 10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="lg:w-1/2 relative perspective-1000"
          >
             {/* Glow behind phone */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-green-200/50 blur-[80px] rounded-full -z-10" />

            <div className="relative w-[340px] mx-auto transform hover:rotate-y-[-5deg] transition-transform duration-500 preserve-3d">
              {/* Phone Frame */}
              <div className="bg-[#1d1d1f] rounded-[3.5rem] p-3 shadow-2xl border-[6px] border-[#3a3a3c] ring-1 ring-black/50 relative z-20">
                <div className="bg-white rounded-[2.8rem] overflow-hidden h-[680px] relative">
                  {/* WhatsApp Header */}
                  <div className="bg-[#075E54] p-4 pt-14 flex items-center gap-3 text-white shadow-md z-10 relative">
                    <ArrowRight className="w-5 h-5 rotate-180 opacity-80" />
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border border-white/20">
                       <img src="https://ui-avatars.com/api/?name=AI&background=25D366&color=fff" alt="Bot" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-semibold text-base flex items-center gap-1">
                          TopEdge AI 
                          <span className="w-3 h-3 bg-green-400 rounded-full border border-[#075E54]" />
                      </div>
                      <div className="text-xs opacity-80">Business Account</div>
                    </div>
                  </div>

                  {/* Chat Area */}
                  <div className="bg-[#ECE5DD] h-full p-4 space-y-4 overflow-y-auto pb-24 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat opacity-90">
                    <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] text-sm text-[#1d1d1f] self-start animate-fade-in relative group">
                      Hello! 👋 Welcome to TopEdge AI. How can I help you automate your business today?
                      <div className="text-[10px] text-gray-400 text-right mt-1 flex items-center justify-end gap-1">10:00 AM</div>
                    </div>

                    <div className="bg-[#DCF8C6] p-3 rounded-lg rounded-tr-none shadow-sm max-w-[85%] text-sm text-[#1d1d1f] ml-auto self-end animate-fade-in delay-2 relative">
                      I'm interested in AI Voice Agents.
                      <div className="text-[10px] text-gray-400 text-right mt-1 flex items-center justify-end gap-1">
                          10:01 AM <span className="text-blue-400">✓✓</span>
                      </div>
                    </div>

                     <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] text-sm text-[#1d1d1f] self-start animate-fade-in delay-4">
                      Great choice! Our Voice Agents can handle inbound/outbound calls 24/7. Would you like to hear a demo or see pricing?
                      <div className="text-[10px] text-gray-400 text-right mt-1">10:01 AM</div>
                    </div>
                     <div className="bg-[#DCF8C6] p-3 rounded-lg rounded-tr-none shadow-sm max-w-[85%] text-sm text-[#1d1d1f] ml-auto self-end animate-fade-in delay-5">
                      Hear a demo please.
                      <div className="text-[10px] text-gray-400 text-right mt-1 flex items-center justify-end gap-1">
                          10:02 AM <span className="text-blue-400">✓✓</span>
                      </div>
                    </div>
                     <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] text-sm text-[#1d1d1f] self-start animate-fade-in delay-7">
                      Sure! 🎧 Here is a sample of our AI handling a customer support call:
                      <div className="mt-2 h-12 bg-gray-50 rounded-lg flex items-center px-3 gap-3 border border-gray-100">
                         <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors">
                             <span className="text-[10px] text-gray-600 font-bold">▶</span>
                         </div>
                         <div className="flex-1 flex flex-col justify-center gap-1">
                             <div className="h-1 bg-gray-300 w-full rounded-full relative overflow-hidden">
                               <div className="absolute inset-0 bg-[#25D366] w-1/3 animate-pulse" />
                             </div>
                             <div className="flex justify-between text-[8px] text-gray-400">
                                 <span>0:15</span>
                                 <span>1:45</span>
                             </div>
                         </div>
                      </div>
                      <div className="text-[10px] text-gray-400 text-right mt-1">10:02 AM</div>
                    </div>
                  </div>

                   {/* Input Area */}
                   <div className="absolute bottom-0 left-0 right-0 bg-white p-3 pb-8 flex items-center gap-2 border-t border-gray-100 z-20">
                     <div className="w-8 h-8 text-blue-500 rounded-full flex items-center justify-center text-2xl pb-1 cursor-pointer hover:bg-gray-50 transition-colors">+</div>
                     <div className="flex-1 bg-gray-100 rounded-full h-10 px-4 text-sm flex items-center text-gray-500 cursor-text">Type a message...</div>
                     <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#25D366] cursor-pointer hover:scale-110 transition-transform">
                       <MessageCircle className="w-6 h-6 fill-current" />
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppChatbotSection;
