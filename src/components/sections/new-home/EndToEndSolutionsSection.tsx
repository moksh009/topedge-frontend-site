import React from 'react';
import { motion } from 'framer-motion';
import { Server, Zap, Lock, Settings, ArrowRight, ShieldCheck, Cpu, Code2, Cloud } from 'lucide-react';

const EndToEndSolutionsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-slate-50 relative overflow-hidden border-t border-slate-200">
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-transparent to-slate-50 pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm"
          >
            <Cloud className="w-3 h-3 text-indigo-500" />
            Infrastructure & Scale
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-6 tracking-tight"
          >
            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Production.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Whether you need a quick deployment or a fully custom infrastructure, we architect systems that handle millions of calls with zero latency.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Cost Optimization (Migration) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="lg:col-span-2 group bg-white border border-slate-200 rounded-[2rem] p-8 md:p-10 relative overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-500"
          >
            <div className="relative z-10 flex flex-col md:flex-row gap-8 md:items-center">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-6 border border-indigo-100">
                   <Server className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Vapi/Retell Migration</h3>
                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  Ready to graduate from managed APIs? We migrate you to custom Pipecat or LiveKit stacks. Own your IP, cut costs by 80%, and eliminate rate limits.
                </p>
                <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
                   <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> No Rate Limits</span>
                   <span className="flex items-center gap-1.5"><Settings className="w-4 h-4 text-emerald-500" /> Full Control</span>
                </div>
              </div>
              
              {/* Cost Visualizer */}
              <div className="flex-1 bg-slate-50 rounded-2xl p-6 border border-slate-100 relative overflow-hidden">
                 <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:16px_16px] opacity-50" />
                 
                 <div className="relative z-10 space-y-4">
                    <div>
                       <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                          <span>Managed API</span>
                          <span className="text-rose-500">$0.15 / min</span>
                       </div>
                       <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-rose-400 w-full" />
                       </div>
                    </div>
                    <div>
                       <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                          <span>Self-Hosted</span>
                          <span className="text-emerald-600">$0.03 / min</span>
                       </div>
                       <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 w-[20%]" />
                       </div>
                    </div>
                    <div className="pt-2">
                       <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-md">
                          80% Savings
                       </span>
                    </div>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Enterprise Security */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="group bg-white border border-slate-200 rounded-[2rem] p-8 overflow-hidden relative shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-500 flex flex-col"
          >
             <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 border border-emerald-100">
                <Lock className="w-6 h-6" />
             </div>
             <h3 className="text-2xl font-bold text-slate-900 mb-3">Enterprise Grade</h3>
             <p className="text-slate-600 text-base leading-relaxed mb-8 flex-1">
                SOC2 Compliant architecture. We deploy within your private VPC so customer data never leaves your controlled environment.
             </p>
             
             <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <ul className="space-y-3">
                   {['Private Cloud Deployment', 'End-to-End Encryption', 'Role-Based Access'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-700 text-sm font-medium">
                          <div className="w-5 h-5 rounded-full bg-white border border-emerald-200 flex items-center justify-center text-emerald-500 shadow-sm">
                             <ShieldCheck className="w-3 h-3" />
                          </div>
                          {item}
                      </li>
                   ))}
                </ul>
             </div>
          </motion.div>

          {/* Card 3: The Custom Pipeline (Full Width) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="lg:col-span-3 bg-[#0B1121] border border-slate-800 rounded-[2rem] p-8 md:p-12 overflow-hidden relative group shadow-2xl"
          >
            {/* Dark Mode Background for Contrast */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <div className="inline-flex items-center gap-2 text-indigo-400 font-bold mb-6 bg-indigo-500/10 px-3 py-1 rounded-full text-xs uppercase tracking-wide border border-indigo-500/20">
                        <Cpu className="w-4 h-4" />
                        <span>Orchestration Layer</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                        Agnostic AI Pipeline
                    </h3>
                    <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-md">
                        We don't lock you into one provider. Our "Router" architecture dynamically switches between models (Deepgram, OpenAI, ElevenLabs) based on latency and cost.
                    </p>
                    <button className="group flex items-center gap-2 text-white font-semibold border-b border-white/20 pb-1 hover:border-white transition-colors">
                        View Architecture Diagram <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Pipeline Diagram */}
                <div className="relative flex items-center justify-between w-full max-w-lg mx-auto">
                    {/* Connector Line */}
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-slate-800 -translate-y-1/2 z-0">
                       <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent w-1/2 animate-shimmer" />
                    </div>
                    
                    {/* Node 1: Input */}
                    <div className="relative z-10 flex flex-col items-center gap-4 group/node">
                        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 shadow-lg group-hover/node:border-indigo-500 group-hover/node:text-indigo-400 transition-all duration-300">
                            <Code2 className="w-8 h-8" />
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider group-hover/node:text-indigo-400 transition-colors">Input</span>
                    </div>

                    {/* Node 2: The Brain (Center) */}
                    <div className="relative z-20 flex flex-col items-center gap-4">
                        <div className="w-24 h-24 rounded-3xl bg-indigo-600 flex items-center justify-center text-white shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] relative">
                            <div className="absolute inset-0 bg-white/20 rounded-3xl animate-pulse" />
                            <Zap className="w-10 h-10 fill-current" />
                        </div>
                        <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">TopEdge Core</span>
                    </div>

                    {/* Node 3: Output */}
                    <div className="relative z-10 flex flex-col items-center gap-4 group/node">
                        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 shadow-lg group-hover/node:border-emerald-500 group-hover/node:text-emerald-400 transition-all duration-300">
                            <Server className="w-8 h-8" />
                        </div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider group-hover/node:text-emerald-400 transition-colors">Action</span>
                    </div>
                </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default EndToEndSolutionsSection;