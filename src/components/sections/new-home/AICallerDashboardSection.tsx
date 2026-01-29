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
    <section className="py-32 bg-[#F5F5F7] relative overflow-hidden border-t border-gray-200">
      {/* Background Gradients/Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-20%] right-[10%] w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-blue-600 text-xs font-semibold uppercase tracking-wide mb-6 shadow-sm"
          >
            <Settings className="w-3 h-3" />
            Voice AI Management
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1d1d1f] mb-6 tracking-tight"
          >
            Manage your AI workforce <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">at scale.</span>
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
                    ? 'bg-white border-blue-100 shadow-xl shadow-blue-900/5' 
                    : 'bg-white/50 border-transparent hover:bg-white hover:border-gray-200 hover:shadow-lg'
                }`}
              >
                {activeFeature === index && (
                  <motion.div 
                    layoutId="activeGlowVoice"
                    className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 opacity-100"
                  />
                )}
                <div className="relative z-10 flex items-start gap-4">
                  <div className={`p-3 rounded-xl transition-colors ${
                    activeFeature === index ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600'
                  }`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold mb-2 transition-colors ${
                      activeFeature === index ? 'text-[#1d1d1f]' : 'text-gray-600 group-hover:text-[#1d1d1f]'
                    }`}>
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Dynamic Preview */}
          <div className="lg:col-span-8">
            <div className="relative h-[600px] bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-2xl shadow-black/5">
              {/* Window Controls */}
              <div className="absolute top-0 left-0 w-full h-12 bg-gray-50/80 backdrop-blur-sm border-b border-gray-100 flex items-center px-4 gap-2 z-20">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D89E24]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1AAB29]" />
                <div className="ml-auto flex items-center gap-2 px-3 py-1 rounded-md bg-white border border-gray-200 shadow-sm">
                   <Globe className="w-3 h-3 text-gray-400" />
                   <span className="text-xs text-gray-500 font-medium">voice.topedge.ai</span>
                </div>
              </div>

              <div className="p-8 pt-20 h-full overflow-hidden relative bg-white">
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
       <h4 className="text-[#1d1d1f] font-semibold">Recent Calls</h4>
       <div className="flex gap-2 text-xs">
          <span className="px-2 py-1 bg-gray-100 rounded-md text-gray-600 border border-gray-200">Filter: All</span>
          <span className="px-2 py-1 bg-gray-100 rounded-md text-gray-600 border border-gray-200">Date: Today</span>
       </div>
    </div>
    <div className="space-y-3">
      {[
        { name: '+1 (555) 012-3456', duration: '2m 14s', status: 'Completed', sentiment: 'Positive' },
        { name: '+1 (555) 987-6543', duration: '45s', status: 'Voicemail', sentiment: 'Neutral' },
        { name: '+1 (555) 246-8135', duration: '5m 32s', status: 'Completed', sentiment: 'Very Positive' },
        { name: '+1 (555) 135-7924', duration: '12s', status: 'Failed', sentiment: 'N/A' },
      ].map((call, i) => (
        <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between hover:border-blue-200 hover:shadow-md transition-all">
           <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                 <Phone className="w-5 h-5" />
              </div>
              <div>
                 <div className="text-[#1d1d1f] font-medium text-sm">{call.name}</div>
                 <div className="text-gray-500 text-xs flex items-center gap-2">
                    <Clock className="w-3 h-3" /> {call.duration} • {call.status}
                 </div>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                call.sentiment === 'Positive' || call.sentiment === 'Very Positive' ? 'bg-green-50 text-green-600 border border-green-100' :
                call.sentiment === 'Neutral' ? 'bg-gray-50 text-gray-600 border border-gray-100' : 'bg-red-50 text-red-600 border border-red-100'
              }`}>
                {call.sentiment}
              </span>
              <button className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors text-gray-400">
                 <Play className="w-4 h-4 fill-current" />
              </button>
           </div>
        </div>
      ))}
    </div>
    
    {/* Audio Player Visualization */}
    <div className="mt-auto bg-gray-50 p-4 rounded-xl border border-gray-200">
       <div className="flex items-center gap-4 mb-2">
          <button className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
             <Pause className="w-4 h-4 fill-current" />
          </button>
          <div className="flex-1">
             <div className="text-[#1d1d1f] text-sm font-medium">Recording: +1 (555) 246-8135</div>
             <div className="text-gray-500 text-xs">01:12 / 05:32</div>
          </div>
       </div>
       <div className="h-8 flex items-center gap-1">
          {[...Array(40)].map((_, i) => (
             <div 
               key={i} 
               className={`w-1 rounded-full ${i < 15 ? 'bg-blue-600' : 'bg-gray-200'}`}
               style={{ height: `${Math.random() * 100}%` }}
             />
          ))}
       </div>
    </div>
  </div>
);

const VoiceSettingsView = () => (
  <div className="h-full grid grid-cols-2 gap-4">
     <div className="col-span-2 text-[#1d1d1f] font-semibold mb-2">Select AI Voice</div>
     {[
       { name: 'Rachel', accent: 'American', style: 'Professional', active: true },
       { name: 'Drew', accent: 'British', style: 'News', active: false },
       { name: 'Clyde', accent: 'American', style: 'Deep', active: false },
       { name: 'Mimi', accent: 'Australian', style: 'Child', active: false },
     ].map((voice, i) => (
       <div key={i} className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
         voice.active 
           ? 'bg-blue-50 border-blue-200 shadow-sm' 
           : 'bg-white border-gray-100 hover:border-blue-100 hover:shadow-md'
       }`}>
          {voice.active && <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />}
          <div className="flex items-center gap-3 mb-3">
             <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 flex items-center justify-center text-lg text-gray-700 font-bold">
                {voice.name.charAt(0)}
             </div>
             <div>
                <div className="text-[#1d1d1f] font-medium">{voice.name}</div>
                <div className="text-gray-500 text-xs">{voice.accent}</div>
             </div>
          </div>
          <div className="flex items-center gap-2">
             <button className="flex-1 py-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 text-xs text-gray-700 flex items-center justify-center gap-1 transition-colors">
                <Play className="w-3 h-3" /> Sample
             </button>
             <button className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors ${
               voice.active ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'bg-gray-100 text-gray-500'
             }`}>
                {voice.active ? 'Selected' : 'Select'}
             </button>
          </div>
       </div>
     ))}
     
     <div className="col-span-2 mt-4">
        <div className="text-[#1d1d1f] font-semibold mb-4">Voice Settings</div>
        <div className="space-y-4">
           <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                 <span>Speed</span>
                 <span>1.0x</span>
              </div>
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                 <div className="w-1/2 h-full bg-blue-600" />
              </div>
           </div>
           <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                 <span>Stability</span>
                 <span>0.75</span>
              </div>
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                 <div className="w-3/4 h-full bg-purple-600" />
              </div>
           </div>
        </div>
     </div>
  </div>
);

const CampaignsView = () => (
  <div className="h-full flex flex-col items-center justify-center text-center p-6">
     <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 flex items-center justify-center mb-6 rotate-3 shadow-lg shadow-gray-200">
        <FileText className="w-10 h-10 text-gray-400" />
     </div>
     <h3 className="text-2xl font-bold text-[#1d1d1f] mb-2">Import Contacts</h3>
     <p className="text-gray-500 mb-8 max-w-sm">Upload a CSV file to start an outbound calling campaign. Our AI will handle the rest.</p>
     
     <button className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 flex items-center gap-2">
        <Users className="w-4 h-4" /> Upload CSV
     </button>
     
     <div className="mt-8 w-full max-w-md">
        <div className="text-left text-xs text-gray-500 mb-2 uppercase font-medium">Active Campaigns</div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
           <div className="flex justify-between items-start mb-2">
              <div>
                 <div className="text-[#1d1d1f] text-sm font-medium">Q1 Sales Outreach</div>
                 <div className="text-gray-500 text-xs">Started 2h ago</div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-green-50 text-green-600 border border-green-100 font-medium">RUNNING</span>
           </div>
           <div className="flex items-end gap-2 mb-1">
              <span className="text-2xl font-bold text-[#1d1d1f]">452</span>
              <span className="text-xs text-gray-500 mb-1">/ 1,200 dialed</span>
           </div>
           <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="w-[37%] h-full bg-green-500" />
           </div>
        </div>
     </div>
  </div>
);

const PerformanceView = () => (
  <div className="h-full flex flex-col gap-6">
     <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
           <div className="text-xs text-gray-500 uppercase mb-1">Connection Rate</div>
           <div className="text-3xl font-bold text-[#1d1d1f]">68%</div>
           <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
             <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[4px] border-b-green-600"></div>
             +4% vs last week
           </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
           <div className="text-xs text-gray-500 uppercase mb-1">Cost Per Call</div>
           <div className="text-3xl font-bold text-[#1d1d1f]">$0.12</div>
           <div className="text-xs text-gray-500 mt-1">Avg duration: 1m 45s</div>
        </div>
     </div>
     
     <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-6 relative overflow-hidden flex flex-col shadow-sm">
        <div className="flex justify-between items-center mb-6">
           <div className="text-sm text-[#1d1d1f] font-medium">Call Volume Trends</div>
           <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <div className="text-xs text-gray-500">Inbound</div>
              <div className="w-2 h-2 rounded-full bg-purple-500 ml-2" />
              <div className="text-xs text-gray-500">Outbound</div>
           </div>
        </div>
        
        <div className="flex-1 flex items-end justify-between gap-3">
           {[30, 45, 35, 60, 50, 75, 65, 80, 70, 90, 85, 95].map((h, i) => (
              <div key={i} className="w-full h-full flex items-end gap-1">
                 <motion.div 
                   initial={{ height: 0 }}
                   animate={{ height: `${h * 0.6}%` }}
                   transition={{ duration: 1, delay: i * 0.05 }}
                   className="w-full bg-blue-500 rounded-t-sm opacity-80"
                 />
                 <motion.div 
                   initial={{ height: 0 }}
                   animate={{ height: `${h * 0.4}%` }}
                   transition={{ duration: 1, delay: i * 0.05 + 0.2 }}
                   className="w-full bg-purple-500 rounded-t-sm opacity-80"
                 />
              </div>
           ))}
        </div>
     </div>
  </div>
);

export default AICallerDashboardSection;
