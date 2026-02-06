import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, Volume2 } from 'lucide-react';
import { vapiService } from '../../../services/vapiService';

const AICallerDemoSection = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [sentiment, setSentiment] = useState('Neutral');
  const [transcript, setTranscript] = useState<string[]>([]);
  
  // Timer for call duration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
        // Simulate volume fluctuation and dashboard updates
        setVolumeLevel(Math.random() * 100);
        
        // Simulate dynamic dashboard data
        const sentiments = ['Positive', 'Neutral', 'Engaged'];
        if (Math.random() > 0.8) setSentiment(sentiments[Math.floor(Math.random() * sentiments.length)]);
        
        // Add fake transcript lines periodically
        if (Math.random() > 0.9) {
           const lines = [
             "User: How much does it cost?",
             "AI: Our pricing is flexible based on your needs.",
             "User: Can I integrate this with CRM?",
             "AI: Yes, we support Salesforce and HubSpot natively.",
             "User: That sounds great!",
             "AI: Would you like to schedule a demo?"
           ];
           setTranscript(prev => [...prev, lines[Math.floor(Math.random() * lines.length)]].slice(-5));
        }
      }, 1000);
    } else {
      setCallDuration(0);
      setVolumeLevel(0);
      setSentiment('Neutral');
      setTranscript([]);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  // Sync with Vapi Service state (polling as backup)
  useEffect(() => {
    const interval = setInterval(() => {
      // If vapiService has an isActive method, use it. Otherwise rely on local state management + events if available
      // Assuming vapiService.isActive() exists based on previous usage
      const active = vapiService.isActive();
      if (active !== isCallActive) {
        setIsCallActive(active);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isCallActive]);

  const handleStartCall = async () => {
    try {
      setIsConnecting(true);
      await vapiService.start();
      setIsCallActive(true);
    } catch (error) {
      console.error('Failed to start call:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleEndCall = async () => {
    try {
      setIsConnecting(true);
      await vapiService.close();
      setIsCallActive(false);
    } catch (error) {
      console.error('Failed to end call:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="ai-caller-demo" className="py-32 bg-white relative overflow-hidden">
      {/* Clean Premium Background - White Theme */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-50 via-white to-white pointer-events-none" />
      
      {/* Subtle Glow Effects - Adjusted for White */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        <div className="text-center mb-20">
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold uppercase tracking-wide mb-6 shadow-sm"
            >
              <Mic className="w-3 h-3 text-indigo-500" />
              Live Interactive Demo
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-6 tracking-tight leading-tight"
            >
              Experience the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600">Future of Voice</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal"
            >
              Try our AI voice agent right now. See real-time analytics, sentiment tracking, and instant transcription as you speak.
            </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Phone UI (Call Interface) - Keeping Dark for Contrast/Device Look */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 lg:col-start-2"
          >
            <div className="relative bg-slate-900 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-800 overflow-hidden mx-auto h-[640px] flex flex-col transform transition-transform hover:scale-[1.01] group ring-8 ring-slate-100">
              {/* Dynamic Header */}
              <div className={`p-8 text-center transition-colors duration-500 ${isCallActive ? 'bg-slate-800/90' : 'bg-slate-900'} border-b border-slate-800`}>
                <div className="w-16 h-1 bg-slate-700 rounded-full mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-white mb-1">{isCallActive ? 'Maya (AI Agent)' : 'Ready to Call'}</h3>
                <p className={`text-sm font-medium ${isCallActive ? 'text-emerald-400' : 'text-slate-400'}`}>
                  {isCallActive ? formatTime(callDuration) : 'Tap to start'}
                </p>
              </div>

              {/* Visualizer / Avatar Area */}
              <div className="flex-1 bg-slate-900 relative flex items-center justify-center overflow-hidden">
                {isCallActive ? (
                  // Active Call Visualizer
                  <div className="relative w-full h-full flex items-center justify-center">
                     {/* Ripples */}
                     {[1, 2, 3].map((i) => (
                        <motion.div
                          key={i}
                          animate={{
                            scale: [1, 2.5],
                            opacity: [0.3, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.6,
                            ease: "easeOut",
                          }}
                          className="absolute w-48 h-48 rounded-full border border-indigo-500/30 bg-indigo-500/10"
                        />
                      ))}
                      
                      {/* Avatar */}
                      <div className="relative z-10 w-36 h-36 rounded-full bg-slate-800 p-1 shadow-xl shadow-indigo-500/20">
                         <img 
                          src="https://ui-avatars.com/api/?name=Maya+AI&background=0f172a&color=fff&size=128" 
                          alt="Maya" 
                          className="w-full h-full rounded-full object-cover border-4 border-slate-700"
                        />
                      </div>
                  </div>
                ) : (
                  // Idle State
                  <div className="relative z-10 w-36 h-36 rounded-full bg-slate-800 p-1 shadow-lg border border-slate-700">
                    <img 
                      src="https://ui-avatars.com/api/?name=Maya+AI&background=1e293b&color=fff&size=128" 
                      alt="Maya" 
                      className="w-full h-full rounded-full object-cover border-4 border-slate-700 grayscale opacity-60"
                    />
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="p-10 bg-slate-900 pb-14 border-t border-slate-800">
                <div className="flex items-center justify-center gap-10">
                  <button className="p-5 rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700 shadow-sm">
                    <Volume2 className="w-6 h-6" />
                  </button>
                  
                  {!isCallActive ? (
                    <button 
                      onClick={handleStartCall}
                      disabled={isConnecting}
                      className="p-8 rounded-full bg-indigo-600 text-white shadow-xl shadow-indigo-500/40 hover:scale-105 transition-all active:scale-95 disabled:opacity-70 disabled:scale-100 hover:bg-indigo-500 ring-4 ring-indigo-500/20"
                    >
                      <Mic className={`w-8 h-8 ${isConnecting ? 'animate-pulse' : ''}`} />
                    </button>
                  ) : (
                    <button 
                      onClick={handleEndCall}
                      disabled={isConnecting}
                      className="p-8 rounded-full bg-rose-500 text-white shadow-xl shadow-rose-500/40 hover:bg-rose-600 hover:scale-105 transition-all active:scale-95 ring-4 ring-rose-500/20"
                    >
                      <Mic className="w-8 h-8 rotate-45" />
                    </button>
                  )}

                  <button className="p-5 rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700 shadow-sm">
                    <Volume2 className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Live Analytics Dashboard - Adapted for White Background */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 lg:col-start-7 space-y-6"
          >
             {/* Live Transcript Card */}
             <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 h-[400px] flex flex-col">
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-4">
                  <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Live Transcript
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">EN-US</span>
                </div>
                <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                  {transcript.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                      <Mic className="w-8 h-8 mb-2 opacity-20" />
                      <p className="text-sm">Waiting for conversation...</p>
                    </div>
                  ) : (
                    transcript.map((line, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-3 rounded-lg text-sm ${
                          line.startsWith('AI:') 
                            ? 'bg-slate-50 text-slate-700 ml-4 border border-slate-100' 
                            : 'bg-indigo-50 text-indigo-700 mr-4 border border-indigo-100'
                        }`}
                      >
                        <span className="font-bold mr-1 opacity-70">{line.split(':')[0]}:</span>
                        {line.split(':')[1]}
                      </motion.div>
                    ))
                  )}
                </div>
             </div>

             {/* Metrics Grid */}
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-lg shadow-slate-200/50">
                   <div className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Sentiment</div>
                   <div className={`text-2xl font-bold ${
                     sentiment === 'Positive' ? 'text-emerald-500' : 
                     sentiment === 'Engaged' ? 'text-indigo-500' : 'text-slate-600'
                   }`}>
                     {sentiment}
                   </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-lg shadow-slate-200/50">
                   <div className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Latency</div>
                   <div className="text-2xl font-bold text-slate-900">
                     ~75<span className="text-sm text-slate-500 font-normal ml-1">ms</span>
                   </div>
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AICallerDemoSection;
