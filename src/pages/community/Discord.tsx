import React from 'react';
import CommunityLayout from '@/components/community/layout/CommunityLayout';
import CommunitySEO from '@/components/community/CommunitySEO';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight, Hash, Mic, Cpu, Globe } from 'lucide-react';

const Discord = () => {
  return (
    <CommunityLayout>
      <CommunitySEO 
        title="Join Our Discord Community - TopEdge AI"
        description="Join 5,000+ AI engineers and founders. Real-time discussions, code reviews, and alpha access."
        url="/community/discord"
      />
      <div className="min-h-screen bg-[#F8F9FB] text-slate-900 font-sans selection:bg-[#5865F2] selection:text-white flex flex-col relative overflow-hidden">
        
        {/* Background Pattern */}

        
        {/* Ambient Glows - Adjusted for Mobile */}


        <div className="container relative z-10 mx-auto px-4 sm:px-6 py-8 md:py-20 flex-grow flex flex-col justify-center items-center">
          
          {/* ================= HERO CARD ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-5xl"
          >
            <div className="relative bg-white/80 backdrop-blur-xl rounded-[2rem] md:rounded-[3rem] border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden">
              
              {/* Decorative Header Bar */}
              <div className="h-1.5 md:h-2 w-full bg-gradient-to-r from-[#5865F2] via-[#7289da] to-indigo-400" />
              
              <div className="grid grid-cols-1 lg:grid-cols-2">
                
                {/* Left: Content */}
                <div className="p-6 sm:p-10 md:p-16 flex flex-col justify-center text-center lg:text-left">
                  
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5865F2]/10 text-[#5865F2] text-[10px] md:text-xs font-bold uppercase tracking-wider mb-6 md:mb-8 w-fit mx-auto lg:mx-0">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5865F2] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5865F2]"></span>
                    </span>
                    Live Community
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-4 md:mb-6 leading-[1.1]">
                    Where the real <br/>
                    <span className="text-[#5865F2]">building happens.</span>
                  </h1>
                  
                  <p className="text-sm sm:text-base md:text-lg text-slate-500 mb-8 md:mb-10 leading-relaxed max-w-md mx-auto lg:mx-0">
                    Stop coding in isolation. Join a high-signal environment of 5,000+ AI engineers, founders, and automation experts sharing alpha daily.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start">
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      href="https://discord.gg/topedgeai" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 md:px-8 py-3.5 md:py-4 bg-[#5865F2] text-white font-bold rounded-xl md:rounded-2xl hover:bg-[#4752C4] transition-all shadow-lg shadow-[#5865F2]/25 group text-sm md:text-base"
                    >
                      <MessageCircle className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                      <span>Join Server</span>
                      <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all" />
                    </motion.a>
                    
                    <div className="w-full sm:w-auto flex items-center justify-center gap-3 px-5 py-3.5 md:py-4 rounded-xl md:rounded-2xl border border-slate-100 bg-slate-50/50 backdrop-blur-sm">
                       <div className="flex -space-x-2.5">
                          {[1,2,3,4].map((i) => (
                             <div key={i} className="w-6 h-6 md:w-7 md:h-7 rounded-full border-[1.5px] border-white bg-slate-200" />
                          ))}
                       </div>
                       <div className="text-[10px] md:text-xs font-semibold text-slate-600">
                          <span className="text-slate-900 font-bold">450+</span> Online
                       </div>
                    </div>
                  </div>
                </div>

                {/* Right: Visual / Grid */}
                <div className="bg-[#F8F9FB] border-t lg:border-t-0 lg:border-l border-slate-100 p-6 sm:p-10 md:p-16 flex flex-col justify-center">
                   <div className="grid grid-cols-1 gap-3 md:gap-4">
                      
                      {/* Feature 1 */}
                      <FeatureCard 
                        icon={Hash} 
                        color="text-[#5865F2]" 
                        bgColor="bg-indigo-50" 
                        title="Code Reviews" 
                        desc="Get feedback on your agents and workflows from senior devs." 
                      />

                      {/* Feature 2 */}
                      <FeatureCard 
                        icon={Cpu} 
                        color="text-purple-600" 
                        bgColor="bg-purple-50" 
                        title="Alpha & Tools" 
                        desc="Exclusive access to unreleased scrapers and LLM templates." 
                      />

                      {/* Feature 3 */}
                      <FeatureCard 
                        icon={Mic} 
                        color="text-emerald-600" 
                        bgColor="bg-emerald-50" 
                        title="Live Workshops" 
                        desc="Weekly voice chats breaking down the latest AI papers." 
                      />

                   </div>
                </div>

              </div>
            </div>
            
            

          </motion.div>
        </div>
      </div>
    </CommunityLayout>
  );
};

// Helper Component for the Feature Cards
const FeatureCard = ({ icon: Icon, color, bgColor, title, desc }: any) => (
  <motion.div 
    whileHover={{ x: 4 }}
    className="bg-white p-4 md:p-6 rounded-xl md:rounded-2xl border border-slate-200 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] hover:shadow-md transition-all flex items-start gap-3 md:gap-4 group cursor-default"
  >
     <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl ${bgColor} flex items-center justify-center ${color} group-hover:scale-110 transition-transform shrink-0`}>
        <Icon className="w-5 h-5 md:w-6 md:h-6" />
     </div>
     <div>
        <h3 className="text-sm md:text-base font-bold text-slate-900">{title}</h3>
        <p className="text-[11px] md:text-sm text-slate-500 mt-0.5 md:mt-1 leading-snug">{desc}</p>
     </div>
  </motion.div>
);

export default Discord;