import React from 'react';
import { motion } from 'framer-motion';
import { Play, Mic, FileText, Shield, Code, Zap, Globe, Cpu, Layers, Server, Activity, Volume2 } from 'lucide-react';

const BenefitsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-transparent to-slate-50 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm"
          >
            <Cpu className="w-3 h-3" />
            Core Infrastructure
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-slate-900 mb-6 tracking-tight"
          >
            Built on the World's <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Most Advanced Audio AI.</span>
          </motion.h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            We provide the building blocks for the next generation of voice applications. Robust, scalable, and indistinguishable from human.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
          
          {/* Card 1: TTS (Interactive Visualizer) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group bg-white border border-slate-200 rounded-[2.5rem] p-8 flex flex-col shadow-sm hover:shadow-2xl hover:shadow-indigo-900/5 transition-all duration-500 relative overflow-hidden"
          >
            <div className="relative z-10">
               <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 border border-indigo-100 shadow-sm">
                  <Volume2 className="w-7 h-7" />
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-3">Text to Speech</h3>
               <p className="text-slate-500 mb-8 leading-relaxed">
                 Generate ultra-realistic speech with <span className="text-indigo-600 font-semibold">75ms latency</span>. Emotionally intelligent and context-aware.
               </p>
               
               {/* UI Simulation */}
               <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 relative overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Generating</span>
                     </div>
                     <span className="text-xs font-mono text-slate-400">Model: Turbo v2.5</span>
                  </div>
                  <div className="space-y-2">
                     <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <motion.div 
                           animate={{ width: ["0%", "100%"] }} 
                           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                           className="h-full bg-gradient-to-r from-indigo-500 to-violet-500" 
                        />
                     </div>
                     <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                        <span>00:00</span>
                        <span>00:12</span>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Card 2: STT (Transcription Log) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="group bg-white border border-slate-200 rounded-[2.5rem] p-8 flex flex-col shadow-sm hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500 relative overflow-hidden"
          >
            <div className="relative z-10">
               <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 border border-emerald-100 shadow-sm">
                  <FileText className="w-7 h-7" />
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-3">Speech to Text</h3>
               <p className="text-slate-500 mb-8 leading-relaxed">
                 Industry-leading accuracy (<span className="text-emerald-600 font-semibold">99.8% WER</span>). Includes speaker diarization and timestamping.
               </p>
               
               {/* UI Simulation */}
               <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 relative h-[100px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent z-10" />
                  <div className="space-y-3">
                     <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500">A</div>
                        <div className="bg-white p-2 rounded-lg rounded-tl-none border border-slate-100 text-xs text-slate-600 shadow-sm w-3/4">
                           We can deploy this by Tuesday.
                        </div>
                     </div>
                     <div className="flex gap-3 flex-row-reverse">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-600">B</div>
                        <div className="bg-emerald-50 p-2 rounded-lg rounded-tr-none border border-emerald-100 text-xs text-emerald-800 shadow-sm w-3/4">
                           Perfect, let's schedule it.
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Card 3: Voice Cloning (Waveform) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="group bg-white border border-slate-200 rounded-[2.5rem] p-8 flex flex-col shadow-sm hover:shadow-2xl hover:shadow-rose-900/5 transition-all duration-500 relative overflow-hidden"
          >
            <div className="relative z-10 h-full flex flex-col">
               <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 mb-6 border border-rose-100 shadow-sm">
                  <Layers className="w-7 h-7" />
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-3">Instant Cloning</h3>
               <p className="text-slate-500 mb-auto leading-relaxed">
                 Clone any voice with just <span className="text-rose-600 font-semibold">30 seconds</span> of audio. Preserve accent, tone, and emotional range.
               </p>
               
               {/* UI Simulation */}
               <div className="mt-8 flex items-center gap-4">
                  <button className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-rose-600/20 hover:scale-105 transition-transform">
                     <Play className="w-5 h-5 ml-1 fill-current" />
                  </button>
                  <div className="flex-1 h-12 flex items-center gap-1">
                     {[...Array(12)].map((_, i) => (
                        <motion.div 
                           key={i}
                           animate={{ height: [12, 32, 12] }}
                           transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                           className="w-1.5 bg-rose-200 rounded-full"
                           style={{ height: Math.random() * 24 + 8 }}
                        />
                     ))}
                  </div>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Wide Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
            
            {/* Card 4: Enterprise Agents (Wide) */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="lg:col-span-3 bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center overflow-hidden relative shadow-sm hover:shadow-2xl hover:shadow-teal-900/5 transition-all duration-500 group"
            >
                <div className="flex-1 z-10 relative">
                    <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 mb-6 border border-teal-100 shadow-sm">
                        <Zap className="w-7 h-7" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">Enterprise Agents</h3>
                    <p className="text-slate-500 mb-8 max-w-sm leading-relaxed text-lg">
                        Deploy conversational AI agents on phone, web, or mobile. Handles interruptions, turn-taking, and function calling natively.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {['< 500ms Latency', 'SIP Trunking', 'Custom Functions'].map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 uppercase tracking-wide">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                
                {/* Circular Visual */}
                <div className="flex-1 flex justify-center mt-10 md:mt-0 relative">
                    <div className="w-64 h-64 relative flex items-center justify-center">
                        <div className="absolute inset-0 border border-slate-100 rounded-full" />
                        <div className="absolute inset-4 border border-slate-100 rounded-full opacity-50" />
                        <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
                           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-teal-500 rounded-full shadow-lg" />
                        </div>
                        <div className="w-24 h-24 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full shadow-2xl shadow-teal-500/30 flex items-center justify-center text-white z-10">
                           <Activity className="w-10 h-10" />
                        </div>
                        {/* Orbiting Badge */}
                        <div className="absolute -right-4 top-1/2 bg-white px-3 py-1 rounded-full shadow-lg border border-slate-100 text-xs font-bold text-slate-600 animate-bounce">
                           Agent Active
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Card 5: Developer API (Dark Mode) */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -5 }}
                className="lg:col-span-2 bg-[#0B1121] border border-slate-800 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="relative z-10">
                   <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 border border-indigo-500/30">
                       <Code className="w-7 h-7" />
                   </div>
                   <h3 className="text-3xl font-bold text-white mb-4">Developer First</h3>
                   <p className="text-slate-400 mb-8 leading-relaxed">
                       Designed for builders. Clean SDKs, type-safe APIs, and comprehensive documentation to get you to production fast.
                   </p>
                   
                   <div className="space-y-4 font-mono text-sm">
                      <div className="flex items-center gap-3 text-slate-300">
                         <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                         <span>npm install @topedge/sdk</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-300">
                         <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                         <span>pip install topedge-ai</span>
                      </div>
                   </div>
                </div>

                <button className="mt-10 w-full bg-white text-[#0B1121] font-bold py-4 px-6 rounded-xl hover:bg-slate-200 transition-colors shadow-lg shadow-white/10 flex items-center justify-center gap-2 group/btn">
                    Read the Docs <Server className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;