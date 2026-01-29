import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, MessageSquare, Users, Zap, Globe, ArrowRight, Bot, Sparkles, PieChart, Activity } from 'lucide-react';

const ChatbotDashboardSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      id: 'analytics',
      title: 'Advanced Analytics',
      description: 'Track conversation trends, sentiment, and resolution rates in real-time.',
      icon: PieChart,
      component: <AnalyticsView />
    },
    {
      id: 'live-monitor',
      title: 'Live Monitoring',
      description: 'Watch AI conversations as they happen and intervene if necessary.',
      icon: Activity,
      component: <LiveMonitorView />
    },
    {
      id: 'knowledge',
      title: 'Knowledge Base',
      description: 'Instantly update your AI\'s knowledge with documents and URLs.',
      icon: Bot,
      component: <KnowledgeBaseView />
    },
    {
      id: 'integrations',
      title: 'Integrations',
      description: 'Connect seamlessly with WhatsApp, Messenger, and your CRM.',
      icon: Globe,
      component: <IntegrationsView />
    }
  ];

  return (
    <section className="py-32 bg-[#F5F5F7] relative overflow-hidden border-t border-gray-200">
      {/* Background Gradients/Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[100px]" />
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
            <BarChart3 className="w-3 h-3" />
            Chatbot Dashboard
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1d1d1f] mb-6 tracking-tight"
          >
            Complete control over <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">every conversation.</span>
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
                    layoutId="activeGlowChat"
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
                   <span className="text-xs text-gray-500 font-medium">dashboard.topedge.ai</span>
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

const AnalyticsView = () => (
  <div className="h-full flex flex-col gap-6">
    <div className="grid grid-cols-3 gap-4">
      {[
        { label: 'Total Conversations', value: '12,450', change: '+12%', color: 'blue' },
        { label: 'Avg Response Time', value: '1.2s', change: '-5%', color: 'green' },
        { label: 'Resolution Rate', value: '94.2%', change: '+2%', color: 'purple' },
      ].map((stat, i) => (
        <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <p className="text-xs text-gray-500 uppercase mb-1 font-semibold">{stat.label}</p>
          <div className="flex items-end justify-between">
            <h4 className="text-2xl font-bold text-[#1d1d1f]">{stat.value}</h4>
            <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${
              stat.color === 'green' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
            }`}>{stat.change}</span>
          </div>
        </div>
      ))}
    </div>
    <div className="flex-1 bg-gray-50/50 rounded-2xl border border-gray-100 p-6 relative overflow-hidden flex items-end justify-between gap-2">
       {/* Fake Chart */}
       <div className="absolute top-6 left-6 text-sm text-[#1d1d1f] font-medium">Weekly Conversation Volume</div>
       {[40, 65, 50, 80, 55, 90, 70, 85, 60, 75, 95, 80, 60, 70].map((h, i) => (
         <motion.div 
           key={i}
           initial={{ height: 0 }}
           animate={{ height: `${h}%` }}
           transition={{ duration: 1, delay: i * 0.05 }}
           className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg opacity-80 hover:opacity-100 transition-opacity shadow-sm"
         />
       ))}
    </div>
  </div>
);

const LiveMonitorView = () => (
  <div className="h-full flex flex-col gap-4">
    <div className="flex items-center justify-between mb-2">
       <h4 className="text-[#1d1d1f] font-semibold flex items-center gap-2">
         <span className="relative flex h-2.5 w-2.5">
           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
           <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
         </span>
         Live Now
       </h4>
       <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full">4 Active Chats</span>
    </div>
    <div className="space-y-3">
      {[
        { user: 'Sarah M.', msg: 'I need help with pricing...', time: 'Now', status: 'active' },
        { user: 'John D.', msg: 'How do I integrate this?', time: '2m ago', status: 'bot' },
        { user: 'Guest #492', msg: 'Is there a free trial?', time: '5m ago', status: 'bot' },
      ].map((chat, i) => (
        <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between group hover:border-blue-200 hover:shadow-md transition-all cursor-pointer">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-sm text-gray-700 font-bold border border-gray-200 shadow-inner">
               {chat.user.charAt(0)}
             </div>
             <div>
               <h5 className="text-[#1d1d1f] font-medium text-sm">{chat.user}</h5>
               <p className="text-gray-500 text-xs truncate max-w-[200px]">{chat.msg}</p>
             </div>
          </div>
          <div className="flex items-center gap-3">
             <span className={`px-2 py-1 rounded text-[10px] font-medium uppercase ${chat.status === 'active' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
               {chat.status === 'active' ? 'User Typing' : 'Bot Replying'}
             </span>
             <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
        </div>
      ))}
    </div>
    {/* Chat Preview Area */}
    <div className="flex-1 bg-gray-50 rounded-xl border border-gray-200 p-4 mt-2 flex flex-col justify-end">
       <div className="space-y-3">
          <div className="flex gap-3">
             <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0 border border-gray-300" />
             <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none text-xs text-gray-600 max-w-[80%] shadow-sm">
               Hi, I'm looking for an enterprise plan. Can you help?
             </div>
          </div>
          <div className="flex gap-3 flex-row-reverse">
             <div className="w-6 h-6 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center shadow-md shadow-blue-600/20"><Sparkles className="w-3 h-3 text-white" /></div>
             <div className="bg-blue-600 p-3 rounded-2xl rounded-tr-none text-xs text-white max-w-[80%] shadow-md shadow-blue-600/10">
               Absolutely! Our enterprise plans offer dedicated support and custom integrations. Would you like to schedule a demo?
             </div>
          </div>
       </div>
    </div>
  </div>
);

const KnowledgeBaseView = () => (
  <div className="h-full flex flex-col items-center justify-center text-center p-6">
    <div className="w-24 h-24 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center mb-6 relative shadow-inner">
       <Bot className="w-10 h-10 text-gray-400" />
       <div className="absolute -right-2 -top-2 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg animate-bounce border-2 border-white">
         <ArrowRight className="w-4 h-4 rotate-90" />
       </div>
    </div>
    <h3 className="text-2xl font-bold text-[#1d1d1f] mb-2">Train your AI in seconds</h3>
    <p className="text-gray-500 mb-8 max-w-sm">Upload PDFs, crawl websites, or paste text to instantly update your chatbot's knowledge base.</p>
    
    <div className="w-full max-w-md space-y-3">
      <div className="bg-white border border-gray-200 p-3 rounded-xl flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
         <div className="w-8 h-8 rounded bg-red-50 flex items-center justify-center text-red-500 font-bold text-xs border border-red-100">PDF</div>
         <div className="text-left flex-1">
           <div className="text-[#1d1d1f] text-sm font-medium">Pricing_Guide_2024.pdf</div>
           <div className="text-gray-500 text-xs">Processed • 12 pages</div>
         </div>
         <CheckCircle2 className="w-5 h-5 text-green-500" />
      </div>
      <div className="bg-white border border-gray-200 p-3 rounded-xl flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow">
         <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-blue-500 font-bold text-xs border border-blue-100">WEB</div>
         <div className="text-left flex-1">
           <div className="text-[#1d1d1f] text-sm font-medium">topedge.ai/docs</div>
           <div className="text-gray-500 text-xs">Crawled • 45 pages</div>
         </div>
         <CheckCircle2 className="w-5 h-5 text-green-500" />
      </div>
    </div>
  </div>
);

const IntegrationsView = () => (
  <div className="h-full flex flex-col justify-center">
    <div className="grid grid-cols-2 gap-4">
      {[
        { name: 'WhatsApp', desc: 'Automate replies', color: 'bg-green-500', iconColor: 'text-white' },
        { name: 'Messenger', desc: 'Facebook support', color: 'bg-blue-600', iconColor: 'text-white' },
        { name: 'Slack', desc: 'Internal alerts', color: 'bg-purple-600', iconColor: 'text-white' },
        { name: 'Salesforce', desc: 'Sync leads', color: 'bg-blue-400', iconColor: 'text-white' },
        { name: 'HubSpot', desc: 'CRM integration', color: 'bg-orange-500', iconColor: 'text-white' },
        { name: 'Zapier', desc: 'Connect anything', color: 'bg-orange-600', iconColor: 'text-white' },
      ].map((app, i) => (
        <div key={i} className="bg-white border border-gray-200 p-4 rounded-xl flex items-center gap-4 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer group">
           <div className={`w-10 h-10 rounded-lg ${app.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
              <Globe className={`w-5 h-5 ${app.iconColor}`} />
           </div>
           <div>
             <h4 className="text-[#1d1d1f] font-medium text-sm group-hover:text-blue-600 transition-colors">{app.name}</h4>
             <p className="text-gray-500 text-xs">{app.desc}</p>
           </div>
           <div className="ml-auto w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
        </div>
      ))}
    </div>
  </div>
);

// Helper Icon
import { CheckCircle2 } from 'lucide-react';

export default ChatbotDashboardSection;
