import React from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import { motion } from 'framer-motion';
import { MessageCircle, Users, Zap, Shield, ArrowRight, Hash, Mic, Globe, Cpu } from 'lucide-react';

const Discord = () => {
  return (
    <CommunityLayout>
      <div className="min-h-screen bg-[#F8F9FB] text-slate-900 font-sans selection:bg-[#5865F2] selection:text-white flex flex-col relative overflow-hidden">
        
        {/* Background Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#5865F2]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container relative z-10 mx-auto px-6 py-20 flex-grow flex flex-col justify-center items-center">
          
          {/* ================= HERO CARD ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-5xl"
          >
            <div className="relative bg-white rounded-[3rem] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden">
              
              {/* Decorative Header Bar */}
              <div className="h-2 w-full bg-gradient-to-r from-[#5865F2] via-[#5865F2] to-indigo-400" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2">
                
                {/* Left: Content */}
                <div className="p-10 md:p-16 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5865F2]/10 text-[#5865F2] text-xs font-bold uppercase tracking-wider mb-8 w-fit">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5865F2] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5865F2]"></span>
                    </span>
                    Live Community
                  </div>

                  <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
                    Where the real <br/>
                    <span className="text-[#5865F2]">building happens.</span>
                  </h1>
                  
                  <p className="text-lg text-slate-500 mb-10 leading-relaxed">
                    Stop coding in isolation. Join a high-signal environment of 5,000+ AI engineers, founders, and automation experts sharing alpha daily.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href="https://discord.gg/topedgeai" // Replace with actual link
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#5865F2] text-white font-bold rounded-2xl hover:bg-[#4752C4] transition-all shadow-lg shadow-[#5865F2]/30 group"
                    >
                      <MessageCircle className="w-5 h-5 fill-current" />
                      <span>Join Server</span>
                      <ArrowRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
                    </motion.a>
                    
                    <div className="flex items-center gap-4 px-6 py-4 rounded-2xl border border-slate-100 bg-slate-50">
                       <div className="flex -space-x-3">
                          {[1,2,3,4].map((i) => (
                             <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                          ))}
                       </div>
                       <div className="text-xs font-semibold text-slate-600">
                          <span className="text-slate-900 font-bold">450+</span> Online
                       </div>
                    </div>
                  </div>
                </div>

                {/* Right: Visual / Grid */}
                <div className="bg-[#F8F9FB] border-l border-slate-100 p-10 md:p-16 flex flex-col justify-center">
                   <div className="grid grid-cols-1 gap-4">
                      
                      {/* Feature 1 */}
                      <motion.div 
                        whileHover={{ x: 5 }}
                        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 group cursor-default"
                      >
                         <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-[#5865F2] group-hover:scale-110 transition-transform">
                            <Hash className="w-6 h-6" />
                         </div>
                         <div>
                            <h3 className="font-bold text-slate-900">Code Reviews</h3>
                            <p className="text-sm text-slate-500 mt-1">Get feedback on your agents and workflows from senior devs.</p>
                         </div>
                      </motion.div>

                      {/* Feature 2 */}
                      <motion.div 
                        whileHover={{ x: 5 }}
                        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 group cursor-default"
                      >
                         <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                            <Cpu className="w-6 h-6" />
                         </div>
                         <div>
                            <h3 className="font-bold text-slate-900">Alpha & Tools</h3>
                            <p className="text-sm text-slate-500 mt-1">Exclusive access to unreleased scrapers and LLM templates.</p>
                         </div>
                      </motion.div>

                      {/* Feature 3 */}
                      <motion.div 
                        whileHover={{ x: 5 }}
                        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 group cursor-default"
                      >
                         <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                            <Mic className="w-6 h-6" />
                         </div>
                         <div>
                            <h3 className="font-bold text-slate-900">Live Workshops</h3>
                            <p className="text-sm text-slate-500 mt-1">Weekly voice chats breaking down the latest AI papers.</p>
                         </div>
                      </motion.div>

                   </div>
                </div>

              </div>
            </div>
            
            {/* Footer Text */}
            <div className="text-center mt-12">
               <p className="text-sm text-slate-400 font-medium flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4" />
                  Strictly moderated • No spam allowed • Builders only
               </p>
            </div>
          </motion.div>
        </div>
      </div>
    </CommunityLayout>
  );
};

export default Discord;