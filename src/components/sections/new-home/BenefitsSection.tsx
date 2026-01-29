import React from 'react';
import { motion } from 'framer-motion';
import { Play, Mic, FileText, Shield, Code, Zap, Globe, Cpu, Layers, Server } from 'lucide-react';

const BenefitsSection = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-blue-50/60 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-50/60 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wide mb-6 shadow-sm"
          >
            <Code className="w-3 h-3" />
            For Developers
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-semibold text-[#1d1d1f] mb-6 tracking-tight"
          >
            Build with the World's <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Most Advanced Audio AI</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[#86868b] leading-relaxed"
          >
            Integrate human-quality speech synthesis, recognition, and voice cloning into your apps with our robust APIs and SDKs.
          </motion.p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          {/* Card 1: Text to Speech API */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-white border border-gray-200 rounded-[2rem] p-8 flex flex-col shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 border border-blue-100">
               <Mic className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-3">Text to Speech API</h3>
            <p className="text-[#86868b] mb-8 flex-grow leading-relaxed">
              Generate lifelike speech in real-time. Choose from our high-fidelity models for consistent, emotionally rich, or ultra-low latency audio.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                <div>
                  <strong className="block text-[#1d1d1f] text-sm">Turbo v2.5</strong>
                  <span className="text-[#86868b] text-xs">75ms latency for real-time AI</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                <div>
                  <strong className="block text-[#1d1d1f] text-sm">Multilingual v2</strong>
                  <span className="text-[#86868b] text-xs">Support for 29+ languages</span>
                </div>
              </li>
            </ul>
             {/* Glow Effect */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/80 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </motion.div>

          {/* Card 2: Speech to Text API */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white border border-gray-200 rounded-[2rem] p-8 flex flex-col shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-purple-900/5 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 mb-6 border border-purple-100">
               <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-3">Speech to Text API</h3>
            <p className="text-[#86868b] mb-6 leading-relaxed">
              The <span className="font-semibold text-purple-600">most accurate ASR model</span>. Supports speaker diarization and character-level timestamps.
            </p>
            
            <div className="flex gap-8 mb-8 border-t border-b border-gray-100 py-4">
              <div>
                <span className="text-2xl font-bold text-[#1d1d1f]">99.8%</span>
                <span className="block text-[#86868b] text-xs uppercase tracking-wide mt-1">Accuracy</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-[#1d1d1f]">$0.003</span>
                <span className="block text-[#86868b] text-xs uppercase tracking-wide mt-1">/ min</span>
              </div>
            </div>
            
            {/* Visualizer Block */}
            <div className="mt-auto bg-[#F5F5F7] p-4 rounded-xl border border-gray-200 relative overflow-hidden">
                <div className="flex justify-between items-center mb-3 z-10 relative">
                    <div className="h-1.5 w-3/4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Processing</span>
                </div>
                <div className="space-y-2 z-10 relative">
                    <div className="flex justify-between text-xs font-medium text-gray-500">
                        <span>Nova-2 Model</span>
                        <span className="text-green-600">Active</span>
                    </div>
                </div>
            </div>
          </motion.div>

          {/* Card 3: Voice Changer API */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-white border border-gray-200 rounded-[2rem] p-8 flex flex-col shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-pink-900/5 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-600 mb-6 border border-pink-100">
               <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-3">Voice Isolation</h3>
            <p className="text-[#86868b] mb-6 leading-relaxed">
              Give your users full control over their audio environment. Isolate voices from background noise instantly.
            </p>
            
            <div className="flex gap-8 mb-8 border-t border-b border-gray-100 py-4">
              <div>
                <span className="text-2xl font-bold text-[#1d1d1f]">1000+</span>
                <span className="block text-[#86868b] text-xs uppercase tracking-wide mt-1">Voices</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-[#1d1d1f]">29+</span>
                <span className="block text-[#86868b] text-xs uppercase tracking-wide mt-1">Locales</span>
              </div>
            </div>
            
            {/* Player Controls */}
            <div className="mt-auto flex items-center justify-between bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <button className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center pl-0.5 hover:scale-105 hover:border-blue-200 hover:shadow-md transition-all">
                    <Play className="w-4 h-4 text-[#1d1d1f] fill-current" />
                </button>
                <div className="flex gap-2">
                   <div className="h-8 w-1 bg-blue-500 rounded-full animate-pulse" />
                   <div className="h-8 w-1 bg-purple-500 rounded-full animate-pulse delay-75" />
                   <div className="h-8 w-1 bg-pink-500 rounded-full animate-pulse delay-150" />
                </div>
                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                  <Mic className="w-4 h-4 text-pink-500" />
                </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Card 4: Agents (Spans 3 columns) */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="lg:col-span-3 bg-white border border-gray-200 rounded-[2rem] p-8 md:p-10 flex flex-col lg:flex-row items-center overflow-hidden relative shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-green-900/5 transition-all duration-500 group"
            >
                <div className="flex-1 z-10">
                    <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 mb-6 border border-green-100">
                        <Zap className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-4">Enterprise Agents</h3>
                    <p className="text-[#86868b] mb-8 max-w-md leading-relaxed text-lg">
                        Build and deploy <span className="font-semibold text-green-600">AI voice agents</span> on web, mobile, or telephony in minutes. Fully configurable and secure.
                    </p>
                    <ul className="grid grid-cols-2 gap-3">
                        {['Low Latency (<500ms)', 'Advanced Turn Taking', 'Function Calling', 'SIP / Telephony Support'].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-[#1d1d1f] font-medium">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Circular Visualizer */}
                <div className="flex-1 h-64 lg:h-auto w-full lg:w-auto flex items-center justify-center relative mt-8 lg:mt-0">
                    <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 animate-[spin_10s_linear_infinite] relative flex items-center justify-center shadow-inner border border-gray-100">
                        <div className="absolute inset-2 rounded-full bg-white z-10 shadow-sm"></div>
                         <div className="w-16 h-16 bg-gradient-to-br from-[#1d1d1f] to-gray-800 rounded-full flex items-center justify-center z-20 shadow-xl shadow-black/20">
                            <div className="flex items-end gap-1 h-6">
                                <div className="w-1 bg-white h-full animate-pulse"></div>
                                <div className="w-1 bg-white h-2/3 animate-pulse delay-75"></div>
                                <div className="w-1 bg-white h-full animate-pulse delay-150"></div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Glow Effect */}
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-50/50 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>

            {/* Card 5: Easy to use APIs (Spans 2 columns) */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -5 }}
                className="lg:col-span-2 bg-[#1d1d1f] border border-gray-900 rounded-[2rem] p-8 md:p-10 flex flex-col shadow-xl shadow-black/20 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group"
            >
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-gray-800/50 to-transparent pointer-events-none" />
                
                <h3 className="text-2xl font-semibold text-white mb-4 relative z-10">Developer First</h3>
                <p className="text-gray-400 mb-8 relative z-10 leading-relaxed">
                    Designed for developers, by developers. Clean SDKs, comprehensive docs, and instant support.
                </p>
                <ul className="space-y-6 mb-8 flex-grow relative z-10">
                    <li className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-blue-400 border border-gray-700">
                             <Code className="w-4 h-4" />
                        </div>
                        <div>
                            <strong className="block text-white text-lg">Python & TS SDKs</strong>
                            <span className="text-gray-500 text-sm">Type-safe and production ready</span>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-green-400 border border-gray-700">
                             <Shield className="w-4 h-4" />
                        </div>
                        <div>
                            <strong className="block text-white text-lg">SOC II Compliant</strong>
                            <span className="text-gray-500 text-sm">Enterprise-grade security</span>
                        </div>
                    </li>
                </ul>
                <button className="bg-white text-black font-bold py-4 px-8 rounded-full w-full hover:bg-gray-200 transition-colors relative z-10 shadow-lg shadow-white/10">
                    View Documentation
                </button>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;