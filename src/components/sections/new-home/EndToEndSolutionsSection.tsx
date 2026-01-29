import React from 'react';
import { motion } from 'framer-motion';
import { Server, Zap, Lock, Settings, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

const EndToEndSolutionsSection = () => {
  return (
    <section className="py-32 bg-[#F5F5F7] relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-blue-100/60 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-100/60 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-600 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm"
          >
            <Settings className="w-3 h-3" />
            Infrastructure & Scale
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-semibold text-[#1d1d1f] mb-6 tracking-tight"
          >
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Production.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-[#86868b] leading-relaxed"
          >
            Whether you need a quick deployment or a fully custom infrastructure, we architect systems that handle millions of calls with zero latency.
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: The Migration (Wide Card) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="group lg:col-span-2 bg-white border border-gray-200 rounded-[2rem] p-8 md:p-10 overflow-hidden relative shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500"
          >
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 border border-blue-100">
                   <Server className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-3">Vapi/Retell Migration</h3>
                <p className="text-[#86868b] mb-8 text-lg max-w-md leading-relaxed">
                  Moving from managed APIs? We migrate you to custom Pipecat or LiveKit stacks. Own your infrastructure, cut costs by 80%, and eliminate rate limits.
                </p>
              </div>
              
              {/* Visualizing Cost Reduction */}
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4 text-sm font-medium">
                  <span className="text-gray-500">Managed Service Cost</span>
                  <span className="text-gray-500">Self-Hosted Cost</span>
                </div>
                <div className="relative h-12 w-full bg-white rounded-lg overflow-hidden flex items-center px-4 border border-gray-200 shadow-inner">
                   <div className="absolute top-0 left-0 h-full bg-red-50 w-full" /> {/* High Cost Bar */}
                   <span className="relative z-10 text-red-600/70 text-xs font-semibold">$0.15 / min</span>
                   
                   {/* The "Savings" Highlight */}
                   <motion.div 
                     initial={{ width: 0 }}
                     whileInView={{ width: '80%' }}
                     transition={{ duration: 1.5, ease: "circOut" }}
                     className="absolute top-0 right-0 h-full bg-green-50 border-l border-green-100"
                   />
                </div>
                <div className="mt-3 relative h-12 w-[20%] bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center shadow-sm">
                    <span className="text-blue-600 font-bold text-xs">$0.03 / min</span>
                </div>
              </div>
            </div>
            
            {/* Glow Effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </motion.div>

          {/* Card 2: Enterprise Security (Vertical Card) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="group bg-white border border-gray-200 rounded-[2rem] p-8 md:p-10 overflow-hidden relative shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-green-900/5 transition-all duration-500"
          >
             <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center text-green-600 mb-6 border border-green-100">
                <ShieldCheck className="w-6 h-6" />
             </div>
             <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-3">Enterprise Grade</h3>
             <p className="text-[#86868b] mb-6 text-lg leading-relaxed">
                SOC2 Compliant architecture. We deploy within your VPC so customer data never leaves your controlled environment.
             </p>
             
             <ul className="space-y-4 mt-auto">
                {['Private Cloud Deployment', 'End-to-End Encryption', 'Custom Retention Policy'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[#1d1d1f] text-sm font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        {item}
                    </li>
                ))}
             </ul>

             {/* Glow Effect */}
             <div className="absolute bottom-0 right-0 w-48 h-48 bg-green-50/50 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </motion.div>

          {/* Card 3: The Custom Pipeline (Full Width Bottom) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="lg:col-span-3 bg-white border border-gray-200 rounded-[2rem] p-8 md:p-12 overflow-hidden relative group shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-purple-900/5 transition-all duration-500"
          >
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="inline-flex items-center gap-2 text-purple-600 font-medium mb-4 bg-purple-50 px-3 py-1 rounded-full text-xs uppercase tracking-wide">
                        <Cpu className="w-4 h-4" />
                        <span>Orchestration Layer</span>
                    </div>
                    <h3 className="text-3xl font-semibold text-[#1d1d1f] mb-4">Agnostic AI Pipeline</h3>
                    <p className="text-[#86868b] text-lg mb-8 leading-relaxed">
                        We don't lock you into one provider. We utilize a "Router" architecture that dynamically selects the best model for the task.
                    </p>
                    <button className="group flex items-center gap-2 text-[#1d1d1f] font-semibold border-b border-gray-200 pb-1 hover:border-black transition-colors">
                        View Architecture Diagram <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* The Pipeline Visualizer */}
                <div className="relative">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent -translate-y-1/2" />
                    
                    <div className="flex justify-between items-center relative z-10">
                        {/* STT Node */}
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-20 h-20 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-lg relative group-hover:scale-110 transition-transform duration-500 z-10">
                                <span className="text-[10px] font-bold text-gray-400 absolute top-2 right-2">IN</span>
                                <Server className="w-8 h-8 text-blue-500" />
                            </div>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Deepgram</span>
                        </div>

                        {/* LLM Node (Center) */}
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-xl shadow-purple-500/20 relative z-20 group-hover:scale-110 transition-transform duration-500">
                                <Zap className="w-10 h-10 text-white fill-white" />
                                {/* Pulse Effect */}
                                <div className="absolute inset-0 bg-white/20 rounded-3xl animate-ping" />
                            </div>
                            <span className="text-xs font-bold text-purple-600 uppercase tracking-wide">Llama/GPT-4o</span>
                        </div>

                        {/* TTS Node */}
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-20 h-20 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shadow-lg relative group-hover:scale-110 transition-transform duration-500 z-10">
                                <span className="text-[10px] font-bold text-gray-400 absolute top-2 right-2">OUT</span>
                                <Lock className="w-8 h-8 text-green-500" />
                            </div>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">ElevenLabs</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Background Gradient Mesh */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-50/50 to-transparent pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default EndToEndSolutionsSection;