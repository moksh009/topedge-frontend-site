import React from 'react';
import { motion } from 'framer-motion';
import { Server, Zap, Lock, Settings, ArrowRight, ShieldCheck, Cpu, Code2, Cloud, Database, CheckCircle2, Activity } from 'lucide-react';

const EndToEndSolutionsSection = () => {
   return (
      <section className="py-16 md:py-24 lg:py-32 bg-[#F8FAFC] relative overflow-hidden">

         {/* Background Ambience */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

         <div className="container mx-auto px-4 max-w-7xl relative z-10">

            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
               <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-widest mb-6 shadow-sm"
               >
                  <Settings className="w-3 h-3 text-slate-500" />
                  Infrastructure & Scale
               </motion.div>
               <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight font-semibold"
               >
                  Built for <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-400 to-indigo-600">Heavy Volume.</span>
               </motion.h2>
               <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed"
               >
                  We architect systems that scale with you, not against you. Whether you need a quick deployment or a fully custom infrastructure. Handle heavy volume of interactions without lag or rate limits.
               </motion.p>
            </div>

            {/* Bento Grid - 12 Column System */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">

               {/* Card 1: Cost Saving (Full Width) */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="lg:col-span-12 bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-500 relative overflow-hidden"
               >
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                     <div className="relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 mb-6 border border-blue-100 shadow-sm">
                           <Server className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Cost Saving w/ TopEdge Ai</h3>
                        <div className="space-y-3 text-slate-600 text-base leading-relaxed">
                           <p>Most agencies build on expensive SaaS platforms that charge you for every single execution-step.</p>
                           <p>We don’t. We deploy your AI on our dedicated private infrastructure.</p>
                           <p>You pay for raw hosting, not inflated platform fees.</p>
                           <p className="font-bold text-slate-900 mt-2">Eliminate the "success tax" on your growth.</p>
                        </div>
                     </div>

                     {/* Custom Cost Visualizer */}
                     <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 relative overflow-hidden h-full flex flex-col justify-center">
                        {/* Competitor Bar */}
                        <div className="mb-6">
                           <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                              <span>Managed Service (Others)</span>
                              <span className="text-rose-500">Expensive</span>
                           </div>
                           <div className="relative h-12 w-full bg-white rounded-xl border border-rose-100 flex items-center px-4 overflow-hidden shadow-sm">
                              <span className="text-xs md:text-sm font-bold text-rose-600 relative z-10 w-full text-center flex items-center justify-center gap-2">
                                 <Activity className="w-4 h-4" /> upto $99/month <span className="hidden sm:inline">- spikes with scale</span>
                              </span>
                              <div className="absolute top-0 left-0 h-full w-[85%] bg-rose-50" />
                           </div>
                        </div>

                        {/* TopEdge Bar */}
                        <div>
                           <div className="flex justify-between text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">
                              <span>TopEdge Ai Private Infra</span>
                              <span className="text-emerald-600">Optimized</span>
                           </div>
                           <div className="flex flex-col md:flex-row md:items-center gap-3">
                              <div className="bg-blue-600 text-white px-5 py-3 rounded-xl text-sm font-bold shadow-lg shadow-blue-600/20 whitespace-nowrap flex items-center gap-2">
                                 <CheckCircle2 className="w-4 h-4" /> Less than $10/month
                              </div>
                              <span className="text-xs text-slate-400 font-medium">
                                 Max upto $30/mo, for heavy volume usage
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
               </motion.div>

               {/* Card 3: Pipeline (Full Width - 12 Cols) */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ y: -5 }}
                  className="lg:col-span-12 bg-white border border-slate-200 rounded-[2.5rem] p-6 md:p-12 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden"
               >
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50/50 via-white to-white pointer-events-none" />

                  <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                     {/* Text Content (4 Cols) */}
                     <div className="lg:col-span-4 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 text-indigo-600 font-bold mb-4 bg-indigo-50 px-3 py-1 rounded-full text-[10px] uppercase tracking-wide border border-indigo-100">
                           <Cpu className="w-3 h-3" />
                           <span>Orchestration Layer</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">
                           Agnostic AI Pipeline
                        </h3>
                        <div className="text-slate-600 text-base md:text-lg space-y-4 leading-relaxed">
                           <p>We don't lock you into one provider.</p>
                           <p>We utilize a "Router" architecture that dynamically selects the best model for the task.</p>
                        </div>
                     </div>

                     {/* Animated Pipeline Diagram (8 Cols) */}
                     <div className="lg:col-span-8 w-full">
                        <div className="relative flex items-center justify-between px-0 md:px-12 py-4 md:py-8">

                           {/* Connecting Line Track */}
                           <div className="absolute top-1/2 left-8 right-8 md:left-16 md:right-16 h-1 bg-slate-100 -translate-y-1/2 z-0 rounded-full overflow-hidden">
                              {/* Animated Pulse Beam */}
                              <motion.div
                                 animate={{ x: ["-100%", "100%"] }}
                                 transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                 className="w-1/3 h-full bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-50"
                              />
                           </div>

                           {/* Node 1: DEEPGRAM (Input) */}
                           <div className="relative z-10 flex flex-col items-center gap-2 md:gap-4 group">
                              <div className="w-14 h-14 md:w-20 md:h-20 bg-white rounded-2xl border-2 border-slate-100 shadow-lg flex items-center justify-center relative transition-all duration-300 group-hover:border-blue-400 group-hover:shadow-blue-500/20 group-hover:-translate-y-1">
                                 <span className="absolute -top-3 bg-slate-100 text-slate-500 text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-slate-200">IN</span>
                                 <Database className="w-5 h-5 md:w-8 md:h-8 text-blue-500" />
                              </div>
                              <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Deepgram</span>
                           </div>

                           {/* Node 2: LLAMA/GPT-4O (Processing) */}
                           <div className="relative z-20 flex flex-col items-center gap-2 md:gap-4 group">
                              <div className="w-16 h-16 md:w-24 md:h-24 bg-indigo-600 rounded-[16px] md:rounded-[20px] shadow-2xl shadow-indigo-600/30 flex items-center justify-center relative transition-all duration-300 group-hover:scale-110">
                                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-[16px] md:rounded-[20px]" />
                                 <Zap className="w-6 h-6 md:w-10 md:h-10 text-white relative z-10 fill-current animate-pulse" />
                                 {/* Orbit Ring */}
                                 <div className="absolute inset-[-6px] md:inset-[-8px] border border-indigo-200/50 rounded-[22px] md:rounded-[26px] opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                              <span className="text-[10px] md:text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2 py-1 md:px-3 rounded-full text-center max-w-[80px] md:max-w-none leading-tight">Llama/ GPT-4o</span>
                           </div>

                           {/* Node 3: ELEVENLABS (Output) */}
                           <div className="relative z-10 flex flex-col items-center gap-2 md:gap-4 group">
                              <div className="w-14 h-14 md:w-20 md:h-20 bg-white rounded-2xl border-2 border-slate-100 shadow-lg flex items-center justify-center relative transition-all duration-300 group-hover:border-emerald-400 group-hover:shadow-emerald-500/20 group-hover:-translate-y-1">
                                 <span className="absolute -top-3 bg-slate-100 text-slate-500 text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-slate-200">OUT</span>
                                 <Lock className="w-5 h-5 md:w-8 md:h-8 text-emerald-500" />
                              </div>
                              <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-emerald-600 transition-colors">ElevenLabs</span>
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

export default EndToEndSolutionsSection;