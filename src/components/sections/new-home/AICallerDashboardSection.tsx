import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mic, BarChart3, Settings, Play, Pause, Users, FileText, CheckCircle2, Clock, Globe } from 'lucide-react';

const AICallerDashboardSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 'call-logs',
      title: 'Call Logs & Recordings',
      description: 'Access every call instantly. Listen to recordings, read transcripts, and analyze outcomes.',
      icon: Phone,
      component: <CallLogsView />
    },
    {
      id: 'voice-settings',
      title: 'Voice Customization',
      description: 'Choose from ultra-realistic voices or clone your own. Adjust speed, tone, and language.',
      icon: Mic,
      component: <VoiceSettingsView />
    },
    {
      id: 'campaigns',
      title: 'Outbound Campaigns',
      description: 'Upload thousands of contacts and let AI handle the dialing. Perfect for sales and surveys.',
      icon: Users,
      component: <CampaignsView />
    },
    {
      id: 'performance',
      title: 'Performance Metrics',
      description: 'Track connection rates, average call duration, and cost per lead in real-time.',
      icon: BarChart3,
      component: <PerformanceView />
    }
  ];

  return (
    <section className="py-32 bg-[#0B1120] relative overflow-hidden border-t border-slate-800">
      {/* Clean Premium Background - Deep Charcoal Theme */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1E293B] via-[#0B1120] to-[#0B1120] pointer-events-none" />
      
      {/* Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-900/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-teal-400 text-xs font-semibold uppercase tracking-wide mb-6 shadow-sm backdrop-blur-sm"
          >
            <Settings className="w-3 h-3 text-teal-400" />
            Voice AI Management
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 tracking-tight"
          >
            Manage your AI workforce <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-white to-teal-200">at scale.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Feature List */}
          <div className="lg:col-span-4 space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveFeature(index)}
                onMouseEnter={() => setActiveFeature(index)}
                className={`group cursor-pointer p-6 rounded-2xl transition-all duration-300 border relative overflow-hidden ${
                  activeFeature === index 
                    ? 'bg-slate-800 border-teal-500/30 shadow-xl shadow-teal-900/20' 
                    : 'bg-slate-900/50 border-transparent hover:bg-slate-800 hover:border-slate-700 hover:shadow-lg'
                }`}
              >
                {activeFeature === index && (
                  <motion.div 
                    layoutId="activeGlowVoice"
                    className="absolute inset-0 bg-teal-500/5 opacity-100"
                  />
                )}
                <div className="relative z-10 flex items-start gap-4">
                  <div className={`p-3 rounded-xl transition-colors ${
                    activeFeature === index ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'
                  }`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold mb-2 transition-colors ${
                      activeFeature === index ? 'text-white' : 'text-slate-400 group-hover:text-white'
                    }`}>
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Dynamic Preview */}
          <div className="lg:col-span-8">
            <div className="relative h-[600px] bg-slate-900 rounded-3xl border border-slate-700 overflow-hidden shadow-2xl shadow-black/50">
              {/* Window Controls */}
              <div className="absolute top-0 left-0 w-full h-12 bg-slate-800/80 backdrop-blur-sm border-b border-slate-700 flex items-center px-4 gap-2 z-20">
                <div className="w-3 h-3 rounded-full bg-slate-600" />
                <div className="w-3 h-3 rounded-full bg-slate-600" />
                <div className="w-3 h-3 rounded-full bg-slate-600" />
                <div className="ml-auto flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 border border-slate-700 shadow-sm">
                   <Globe className="w-3 h-3 text-slate-500" />
                   <span className="text-xs text-slate-400 font-medium">voice.topedge.ai</span>
                </div>
              </div>

              <div className="p-8 pt-20 h-full overflow-hidden relative bg-slate-900">
                 <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFeature}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 1.05 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="h-full w-full"
                    >
                      {features[activeFeature].component}
                    </motion.div>
                 </AnimatePresence>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- Sub-components for Previews ---

const CallLogsView = () => (
  <div className="h-full flex flex-col gap-4">
    <div className="flex items-center justify-between mb-2">
       <h4 className="text-white font-semibold">Recent Calls</h4>
       <div className="flex gap-2 text-xs">
          <span className="px-2 py-1 bg-slate-800 rounded-md text-slate-400 border border-slate-700">Filter: All</span>
          <span className="px-2 py-1 bg-slate-800 rounded-md text-slate-400 border border-slate-700">Date: Today</span>
       </div>
    </div>
    <div className="space-y-3">
      {[
        { name: '+1 (555) 012-3456', duration: '2m 14s', status: 'Completed', sentiment: 'Positive' },
        { name: '+1 (555) 987-6543', duration: '45s', status: 'Voicemail', sentiment: 'Neutral' },
        { name: '+1 (555) 246-8135', duration: '5m 32s', status: 'Completed', sentiment: 'Very Positive' },
        { name: '+1 (555) 135-7924', duration: '12s', status: 'Failed', sentiment: 'N/A' },
      ].map((call, i) => (
        <div key={i} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex items-center justify-between hover:border-slate-600 hover:bg-slate-800 transition-all">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-300">
                 <Phone className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-white font-medium text-sm">{call.name}</div>
                 <div className="text-slate-500 text-xs flex items-center gap-2">
                    <Clock className="w-3 h-3" /> {call.duration} • {call.status}
                 </div>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                call.sentiment === 'Positive' || call.sentiment === 'Very Positive' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                call.sentiment === 'Neutral' ? 'bg-slate-700 text-slate-400 border border-slate-600' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}>
                {call.sentiment}
              </span>
              <button className="w-8 h-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center hover:bg-teal-500 hover:text-white hover:border-teal-500 transition-colors text-slate-400">
                 <Play className="w-4 h-4 fill-current" />
              </button>
           </div>
        </div>
      ))}
    </div>
    
    {/* Audio Player Visualization */}
    <div className="mt-auto bg-slate-800 p-4 rounded-xl border border-slate-700">
       <div className="flex items-center gap-4 mb-2">
          <button className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/20 hover:bg-teal-400 transition-colors">
             <Pause className="w-4 h-4 fill-current" />
          </button>
          <div className="flex-1">
             <div className="text-white text-sm font-medium">Recording: +1 (555) 246-8135</div>
             <div className="text-slate-500 text-xs">01:12 / 05:32</div>
          </div>
       </div>
       <div className="h-8 flex items-center gap-1">
          {[...Array(40)].map((_, i) => (
             <div 
               key={i} 
               className={`w-1 rounded-full ${i < 15 ? 'bg-teal-500' : 'bg-slate-700'}`}
               style={{ height: `${Math.random() * 100}%` }}
             />
          ))}
       </div>
    </div>
  </div>
);

const VoiceSettingsView = () => (
  <div className="h-full grid grid-cols-2 gap-4">
     <div className="col-span-2 text-white font-semibold mb-2">Select AI Voice</div>
     {[
       { name: 'Rachel', accent: 'American', style: 'Professional', active: true },
       { name: 'Drew', accent: 'British', style: 'News', active: false },
       { name: 'Clyde', accent: 'American', style: 'Deep', active: false },
       { name: 'Mimi', accent: 'Australian', style: 'Child', active: false },
     ].map((voice, i) => (
       <div key={i} className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
         voice.active 
           ? 'bg-slate-800 border-teal-500/50 shadow-sm' 
           : 'bg-slate-900 border-slate-700 hover:border-slate-600 hover:bg-slate-800'
       }`}>
          {voice.active && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]" />}
          <div className="flex items-center gap-3 mb-3">
             <div className="w-12 h-12 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-lg text-slate-300 font-bold">
                {voice.name.charAt(0)}
             </div>
             <div>
                <div className="text-white font-medium">{voice.name}</div>
                <div className="text-slate-500 text-xs">{voice.accent}</div>
             </div>
          </div>
          <div className="flex items-center gap-2">
             <button className="flex-1 py-1.5 rounded-lg bg-slate-700 border border-slate-600 hover:bg-slate-600 text-xs text-slate-300 flex items-center justify-center gap-1 transition-colors">
                <Play className="w-3 h-3" /> Sample
             </button>
             <button className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
               voice.active ? 'bg-teal-600 text-white shadow-md shadow-teal-900/20' : 'bg-slate-700 text-slate-400'
             }`}>
                {voice.active ? 'Selected' : 'Select'}
             </button>
          </div>
       </div>
     ))}
     
     <div className="col-span-2 mt-4">
        <div className="text-white font-semibold mb-4">Voice Settings</div>
        <div className="space-y-4">
           <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                 <span>Speed</span>
                 <span>1.0x</span>
              </div>
              <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                 <div className="w-1/2 h-full bg-teal-500" />
              </div>
           </div>
           <div>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                 <span>Stability</span>
                 <span>0.75</span>
              </div>
              <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
                 <div className="w-3/4 h-full bg-slate-500" />
              </div>
           </div>
        </div>
     </div>
  </div>
);

const CampaignsView = () => (
  <div className="h-full flex flex-col items-center justify-center text-center p-6">
     <div className="w-20 h-20 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6 rotate-3 shadow-lg shadow-black/20">
        <FileText className="w-10 h-10 text-slate-500" />
     </div>
     <h3 className="text-2xl font-bold text-white mb-2">Import Contacts</h3>
     <p className="text-slate-400 mb-8 max-w-sm">Upload a CSV file to start an outbound calling campaign. Our AI will handle the rest.</p>
     
     <button className="px-6 py-3 rounded-full bg-teal-600 text-white font-medium hover:bg-teal-500 transition-colors shadow-lg shadow-teal-900/30 flex items-center gap-2">
        <Users className="w-4 h-4" /> Upload CSV
     </button>
     
     <div className="mt-8 w-full max-w-md">
        <div className="text-left text-xs text-slate-500 mb-2 uppercase font-medium">Active Campaigns</div>
        <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-4 shadow-sm">
           <div className="flex justify-between items-start mb-2">
              <div>
                 <div className="text-white text-sm font-medium">Q1 Sales Outreach</div>
                 <div className="text-slate-500 text-xs">Started 2h ago</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">RUNNING</span>
           </div>
           <div className="flex items-end gap-2 mb-1">
              <span className="text-2xl font-bold text-white">452</span>
              <span className="text-xs text-slate-500 mb-1">/ 1,200 dialed</span>
           </div>
           <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div className="w-[37%] h-full bg-emerald-500" />
           </div>
        </div>
     </div>
  </div>
);

const PerformanceView = () => (
  <div className="h-full flex flex-col gap-6">
     <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 shadow-sm">
           <div className="text-xs text-slate-500 uppercase mb-1">Connection Rate</div>
           <div className="text-3xl font-bold text-white">68%</div>
           <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
             <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[4px] border-b-emerald-400"></div>
             +4% vs last week
           </div>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 shadow-sm">
           <div className="text-xs text-slate-500 uppercase mb-1">Cost Per Call</div>
           <div className="text-3xl font-bold text-white">$0.12</div>
           <div className="text-xs text-slate-500 mt-1">Avg duration: 1m 45s</div>
        </div>
     </div>
     
     <div className="flex-1 bg-slate-800/50 rounded-2xl border border-slate-700 p-6 relative overflow-hidden flex flex-col shadow-sm">
        <div className="flex justify-between items-center mb-6">
           <div className="text-sm text-white font-medium">Call Volume Trends</div>
           <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-teal-500" />
              <div className="text-xs text-slate-500">Inbound</div>
              <div className="w-2 h-2 rounded-full bg-slate-600" />
              <div className="text-xs text-slate-500">Outbound</div>
           </div>
        </div>
        
        <div className="flex-1 flex items-end justify-between gap-3">
           {[30, 45, 35, 60, 50, 75, 65, 80, 70, 90, 85, 95].map((h, i) => (
              <div key={i} className="w-full h-full flex items-end gap-1">
                 <motion.div 
                   initial={{ height: 0 }}
                   animate={{ height: `${h * 0.6}%` }}
                   transition={{ duration: 1, delay: i * 0.05 }}
                   className="w-full bg-teal-500 rounded-t-sm opacity-90"
                />
                 <motion.div 
                   initial={{ height: 0 }}
                   animate={{ height: `${h * 0.4}%` }}
                   transition={{ duration: 1, delay: i * 0.05 + 0.2 }}
                   className="w-full bg-slate-600 rounded-t-sm opacity-90"
                 />
              </div>
           ))}
        </div>
     </div>
  </div>
);

export default AICallerDashboardSection;
