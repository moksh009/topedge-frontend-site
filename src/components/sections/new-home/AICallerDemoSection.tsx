import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mic, X, Activity, Globe, Shield, Zap, Volume2, User, FileText, Smile, Clock } from 'lucide-react';
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
    <section id="ai-caller-demo" className="py-32 bg-[#F5F5F7] relative overflow-hidden">
      {/* Premium Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-purple-100/40 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        <div className="text-center mb-20">
           <motion.div 
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wide mb-6 shadow-sm"
            >
              <Mic className="w-3 h-3" />
              Live Interactive Demo
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1d1d1f] mb-6 tracking-tight leading-tight"
            >
              Experience the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Future of Voice</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-[#86868b] max-w-2xl mx-auto leading-relaxed"
            >
              Try our AI voice agent right now. See real-time analytics, sentiment tracking, and instant transcription as you speak.
            </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Phone UI (Call Interface) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 lg:col-start-2"
          >
            <div className="relative bg-white rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden mx-auto h-[640px] flex flex-col transform transition-transform hover:scale-[1.01] group ring-8 ring-gray-50">
              {/* Dynamic Header */}
              <div className={`p-8 text-center transition-colors duration-500 ${isCallActive ? 'bg-blue-50/50' : 'bg-gray-50/50'} border-b border-gray-100`}>
                <div className="w-16 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
                <h3 className="text-xl font-semibold text-[#1d1d1f] mb-1">{isCallActive ? 'Maya (AI Agent)' : 'Ready to Call'}</h3>
                <p className={`text-sm font-medium ${isCallActive ? 'text-green-600' : 'text-gray-400'}`}>
                  {isCallActive ? formatTime(callDuration) : 'Tap to start'}
                </p>
              </div>

              {/* Visualizer / Avatar Area */}
              <div className="flex-1 bg-white relative flex items-center justify-center overflow-hidden">
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
                          className="absolute w-48 h-48 rounded-full border border-blue-500/20 bg-blue-500/5"
                        />
                      ))}
                      
                      {/* Avatar */}
                      <div className="relative z-10 w-36 h-36 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 p-1 shadow-2xl shadow-blue-500/20">
                         <img 
                          src="https://ui-avatars.com/api/?name=Maya+AI&background=0D8ABC&color=fff&size=128" 
                          alt="Maya" 
                          className="w-full h-full rounded-full object-cover border-4 border-white"
                        />
                      </div>
                  </div>
                ) : (
                  // Idle State
                  <div className="relative z-10 w-36 h-36 rounded-full bg-gray-50 p-1 shadow-xl border border-gray-100">
                    <img 
                      src="https://ui-avatars.com/api/?name=Maya+AI&background=random&color=fff&size=128" 
                      alt="Maya" 
                      className="w-full h-full rounded-full object-cover border-4 border-white grayscale opacity-50"
                    />
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="p-10 bg-white pb-14 border-t border-gray-100">
                <div className="flex items-center justify-center gap-10">
                  <button className="p-5 rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors border border-gray-100 shadow-sm">
                    <Volume2 className="w-6 h-6" />
                  </button>
                  
                  {isCallActive ? (
                     <button
                      onClick={handleEndCall}
                      className="p-7 rounded-full bg-red-50 text-red-500 shadow-lg shadow-red-500/20 border border-red-100 hover:bg-red-500 hover:text-white hover:scale-105 transition-all"
                    >
                      <Phone className="w-8 h-8 rotate-[135deg]" />
                    </button>
                  ) : (
                    <button
                      onClick={handleStartCall}
                      disabled={isConnecting}
                      className="p-7 rounded-full bg-[#1d1d1f] text-white shadow-xl shadow-black/20 hover:bg-black hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Phone className="w-8 h-8" />
                    </button>
                  )}
                  
                  <button className="p-5 rounded-full bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors border border-gray-100 shadow-sm">
                    <Mic className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Live Dashboard Panel */}
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="lg:col-span-6 bg-white rounded-[2.5rem] p-8 h-[640px] border border-gray-200 shadow-2xl shadow-blue-900/5 flex flex-col group hover:border-blue-100 transition-all duration-500 relative overflow-hidden"
          >
            {/* Glass effect gradient */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-full blur-3xl opacity-50 pointer-events-none" />

            <div className="flex items-center justify-between mb-8 relative z-10">
              <h3 className="text-xl font-semibold text-[#1d1d1f] flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600 shadow-sm border border-blue-100">
                  <Activity className="w-5 h-5" />
                </div>
                Live Call Analytics
              </h3>
              <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-100">
                <span className={`w-2 h-2 rounded-full ${isCallActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">{isCallActive ? 'Connected' : 'Offline'}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-[#F5F5F7] p-6 rounded-2xl border border-transparent hover:border-gray-200 transition-colors">
                <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-2 flex items-center gap-2">
                  <Smile className="w-4 h-4" /> Sentiment
                </div>
                <div className={`text-2xl font-bold ${
                  sentiment === 'Positive' ? 'text-green-600' : sentiment === 'Engaged' ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  {isCallActive ? sentiment : '--'}
                </div>
              </div>
              <div className="bg-[#F5F5F7] p-6 rounded-2xl border border-transparent hover:border-gray-200 transition-colors">
                 <div className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Duration
                </div>
                <div className="text-2xl font-bold text-[#1d1d1f]">
                  {formatTime(callDuration)}
                </div>
              </div>
            </div>

            {/* Live Transcript */}
            <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-6 overflow-hidden flex flex-col relative shadow-inner">
              <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-4 flex items-center gap-2 sticky top-0 bg-white z-10 pb-2 border-b border-gray-50">
                <FileText className="w-3 h-3" /> Live Transcript
              </div>
              <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {isCallActive ? (
                  transcript.length > 0 ? (
                    transcript.map((line, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-2xl text-sm leading-relaxed ${
                          line.startsWith("AI:") 
                            ? "bg-blue-50 text-blue-800 ml-8 rounded-tr-sm" 
                            : "bg-gray-50 text-gray-700 mr-8 rounded-tl-sm"
                        }`}
                      >
                        <span className="block text-xs font-bold mb-1 opacity-60 uppercase">{line.split(":")[0]}</span>
                        {line.split(":")[1]}
                      </motion.div>
                    ))
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400 text-sm italic">
                      Listening for conversation...
                    </div>
                  )
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 text-sm">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                        <Mic className="w-6 h-6 opacity-40" />
                    </div>
                    <p>Start the call to see live transcription</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AICallerDemoSection;
