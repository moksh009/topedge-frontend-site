import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, FileText, Zap, Cpu, Layers, Code, Shield, Play, Pause, Activity, Volume2, Terminal, Check, Lock, Globe, Smartphone, Phone, Link as LinkIcon, CheckCircle2, ArrowRightLeft, Database } from 'lucide-react';

const BenefitsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-[#FDFDFD] relative overflow-hidden font-sans">
      
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(241,245,249,0.9)_0%,_transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <motion.div
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-8"
          >
            <Cpu className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest">Core Infrastructure</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-semibold text-slate-900 mb-8 tracking-tight leading-[1.1]"
          >
            Build with the World's <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 animate-gradient-x">
              Most Advanced Audio AI
            </span>
          </motion.h2>
        </div>

        {/* --- TOP ROW (3 CARDS) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Card 1: Text to Speech (Voiceprint Visualizer) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[2.5rem] p-8 flex flex-col border border-slate-100 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.1)] transition-all duration-500 relative overflow-hidden group"
          >
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-8 border border-indigo-100/50">
               <Volume2 className="w-7 h-7" />
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Text to Speech API</h3>
            <p className="text-slate-500 text-base leading-relaxed mb-10">
              Generate lifelike speech in real-time. Choose from our high-fidelity models for consistent, emotionally rich audio.
            </p>
            
            {/* Voiceprint Visualizer */}
            <div className="mt-auto bg-slate-50/50 border border-slate-100 rounded-2xl p-5 relative overflow-hidden">
                <div className="flex justify-between items-center mb-3">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Generating</span>
                   </div>
                   <span className="text-[10px] font-mono text-slate-400">0.075s</span>
                </div>
                
                <div className="flex items-center justify-center gap-1 h-12">
                   {[...Array(20)].map((_, i) => (
                      <motion.div 
                        key={i}
                        animate={{ 
                           height: [10, Math.random() * 40 + 10, 10],
                           backgroundColor: ["#a5b4fc", "#6366f1", "#8b5cf6", "#a5b4fc"]
                        }}
                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.05, ease: "easeInOut" }}
                        className="w-1 rounded-full"
                      />
                   ))}
                </div>
            </div>
          </motion.div>

          {/* Card 2: Speech to Text (Processing Bar) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[2.5rem] p-8 flex flex-col border border-slate-100 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.1)] transition-all duration-500 relative overflow-hidden group"
          >
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-8 border border-indigo-100/50">
               <FileText className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Speech to Text API</h3>
            <p className="text-slate-500 text-base leading-relaxed mb-8">
              The <span className="font-semibold text-indigo-600">most accurate ASR model</span>. Supports speaker diarization and timestamps.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8 border-t border-slate-100 pt-6">
              <div>
                <span className="text-3xl font-bold text-slate-900 tracking-tight">99.8%</span>
                <span className="block text-slate-400 text-[10px] uppercase tracking-widest font-bold mt-1">Accuracy</span>
              </div>
              <div>
                <span className="text-3xl font-bold text-slate-900 tracking-tight">$0.003</span>
                <span className="block text-slate-400 text-[10px] uppercase tracking-widest font-bold mt-1">/ min</span>
              </div>
            </div>
            
            {/* Visualizer */}
            <div className="mt-auto bg-slate-50 rounded-2xl p-5 border border-slate-200/60 relative overflow-hidden">
                <div className="flex justify-between items-center mb-3 z-10 relative">
                    <span className="text-xs font-semibold text-slate-600">Nova-2 Model</span>
                    <div className="flex items-center gap-1.5">
                       <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                       <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Active</span>
                    </div>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                   <motion.div 
                     animate={{ width: ["0%", "100%"] }} 
                     transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                     className="h-full w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" 
                   />
                </div>
            </div>
          </motion.div>

          {/* Card 3: Voice Isolation (Toggle Simulation) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[2.5rem] p-8 flex flex-col border border-slate-100 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.1)] transition-all duration-500 relative overflow-hidden group"
          >
            <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 mb-8 border border-rose-100/50">
               <Layers className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Voice Isolation</h3>
            <p className="text-slate-500 text-base leading-relaxed mb-8">
              Give your users full control over their audio environment. Isolate voices from background noise instantly.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8 border-t border-slate-100 pt-6">
              <div>
                <span className="text-3xl font-bold text-slate-900 tracking-tight">1000+</span>
                <span className="block text-slate-400 text-[10px] uppercase tracking-widest font-bold mt-1">Voices</span>
              </div>
              <div>
                <span className="text-3xl font-bold text-slate-900 tracking-tight">29+</span>
                <span className="block text-slate-400 text-[10px] uppercase tracking-widest font-bold mt-1">Locales</span>
              </div>
            </div>
            
            <div className="mt-auto flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/60 shadow-sm">
                <button className="w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center pl-1 hover:scale-105 hover:border-rose-300 hover:shadow-md transition-all text-slate-900 shrink-0">
                    <Play className="w-5 h-5 fill-slate-900" />
                </button>
                <div className="flex-1 flex items-center justify-center gap-1 h-8">
                   {[...Array(12)].map((_, i) => (
                      <motion.div 
                        key={i}
                        animate={{ height: [12, 28, 12] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.1 }}
                        className={`w-1 rounded-full ${i % 2 === 0 ? 'bg-rose-400' : 'bg-rose-200'}`}
                      />
                   ))}
                </div>
            </div>
          </motion.div>
        </div>

        {/* --- BOTTOM ROW (2 WIDE CARDS) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            
            {/* Card 4: Enterprise Agents (3 Cols) - 3D ORBIT VISUAL */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="lg:col-span-3 bg-white rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center border border-slate-100 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-25px_rgba(0,0,0,0.1)] transition-all duration-500 group overflow-hidden"
            >
                <div className="flex-1 z-10 relative pr-4">
                    <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 mb-8 border border-teal-100/50">
                        <Zap className="w-7 h-7" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">Enterprise Agents</h3>
                    <p className="text-slate-500 mb-8 leading-relaxed text-lg">
                        Build and deploy <span className="font-semibold text-teal-600">AI voice agents</span> on web, mobile, or telephony in minutes. Fully configurable.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        {['Low Latency', 'Turn Taking', 'Func Calling', 'SIP Support'].map((item, i) => (
                            <div key={i} className="flex items-center gap-2.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.6)]" />
                                <span className="text-sm font-medium text-slate-700">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Orbiting Network Visual */}
                <div className="flex-1 w-full max-w-[320px] aspect-square relative flex items-center justify-center mt-12 md:mt-0">
                    <div className="absolute inset-0 border border-slate-100 rounded-full opacity-60" />
                    <div className="absolute inset-16 border border-slate-100 rounded-full opacity-60" />
                    
                    <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full shadow-[0_0_40px_rgba(20,184,166,0.3)] flex items-center justify-center text-white z-20 relative">
                       <Activity className="w-10 h-10" />
                       <div className="absolute inset-0 bg-white/30 rounded-full animate-ping" />
                    </div>

                    <motion.div 
                       animate={{ rotate: 360 }}
                       transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                       className="absolute inset-0 z-10"
                    >
                       <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-0">
                          <Globe className="w-5 h-5 text-teal-600" />
                       </div>
                       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-180">
                          <Smartphone className="w-5 h-5 text-teal-600" />
                       </div>
                       <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-lg transform -rotate-90">
                          <Phone className="w-5 h-5 text-teal-600" />
                       </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Card 5: Connect Your Stack (REPLACES DEVELOPER FIRST) */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -5 }}
                className="lg:col-span-2 bg-[#0B1121] rounded-[2.5rem] p-10 flex flex-col shadow-2xl relative overflow-hidden group h-full justify-between"
            >
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
                
                <div className="relative z-10">
                   <div className="flex items-center justify-between mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white border border-white/10 backdrop-blur-sm">
                          <LinkIcon className="w-7 h-7" />
                      </div>
                      <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                         <Zap className="w-3 h-3 fill-current" /> Instant Setup
                      </div>
                   </div>
                   
                   <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Connect Your Stack</h3>
                   <p className="text-slate-400 mb-8 leading-relaxed text-sm">
                       No coding required. Instantly sync calls, transcripts, and actions with your favorite tools.
                   </p>
                </div>

                {/* INTEGRATIONS LIVE SYNC UI */}
                <div className="relative z-10 mt-auto w-full space-y-3">
                   
                   {/* Item 1: Salesforce (Connecting -> Active) */}
                   <div className="bg-[#1e293b]/50 rounded-xl p-3 border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-[#00A1E0] flex items-center justify-center text-white text-xs font-bold">SF</div>
                         <span className="text-sm font-semibold text-slate-200">Salesforce</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <motion.div 
                           animate={{ opacity: [0.5, 1, 0.5] }}
                           transition={{ duration: 2, repeat: Infinity }}
                           className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
                         />
                         <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Active</span>
                      </div>
                   </div>

                   {/* Item 2: HubSpot (Syncing Animation) */}
                   <div className="bg-[#1e293b]/50 rounded-xl p-3 border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-[#FF7A59] flex items-center justify-center text-white text-xs font-bold">HS</div>
                         <span className="text-sm font-semibold text-slate-200">HubSpot</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="w-16 h-1 bg-slate-700 rounded-full overflow-hidden">
                            <motion.div 
                               animate={{ width: ["0%", "100%"] }}
                               transition={{ duration: 1.5, repeat: Infinity }}
                               className="h-full bg-blue-500"
                            />
                         </div>
                         <span className="text-[10px] text-blue-400 font-bold uppercase">Syncing</span>
                      </div>
                   </div>

                   {/* Item 3: Zapier (Connected) */}
                   <div className="bg-[#1e293b]/50 rounded-xl p-3 border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-[#FF4F00] flex items-center justify-center text-white text-xs font-bold">Z</div>
                         <span className="text-sm font-semibold text-slate-200">Zapier</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                         <span className="text-[10px] text-slate-400 font-bold uppercase">Ready</span>
                      </div>
                   </div>

                </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;