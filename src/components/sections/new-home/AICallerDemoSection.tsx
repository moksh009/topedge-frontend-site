import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Volume2, Phone, X, Activity, MessageSquare, Clock, Users, Zap, Loader2, ArrowDown } from 'lucide-react';
import { vapiService } from '../../../services/vapiService';

// Types for our chat messages
interface ChatMessage {
  role: 'assistant' | 'user';
  text: string;
  timestamp: Date;
  isFinal: boolean;
}

const AICallerDemoSection = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [callStatus, setCallStatus] = useState("Ready"); 
  const [duration, setDuration] = useState(0);
  const [volumeLevel, setVolumeLevel] = useState(0);
  
  // Chat State
  const [transcript, setTranscript] = useState<ChatMessage[]>([]);
  const [currentLine, setCurrentLine] = useState<ChatMessage | null>(null); // For streaming text
  
  const [activeSpeaker, setActiveSpeaker] = useState<'assistant' | 'user' | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  
  // Sentiment Analysis State
  const [sentiment, setSentiment] = useState<'Interested' | 'Neutral' | 'Skeptical' | 'Happy'>('Neutral');

  const analyzeSentiment = (text: string) => {
    const positiveWords = ['great', 'good', 'interested', 'amazing', 'love', 'yes', 'sure', 'okay', 'pricing', 'cost', 'buy', 'sign up'];
    const negativeWords = ['no', 'bad', 'expensive', 'cancel', 'stop', 'hate', 'wrong', 'error'];
    const skepticalWords = ['maybe', 'unsure', 'doubt', 'question', 'why', 'how'];

    const lowerText = text.toLowerCase();
    
    if (positiveWords.some(w => lowerText.includes(w))) return 'Interested';
    if (negativeWords.some(w => lowerText.includes(w))) return 'Skeptical'; // or Negative
    if (skepticalWords.some(w => lowerText.includes(w))) return 'Skeptical';
    return 'Neutral';
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever transcript or current line updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript, currentLine]);

  // --- VAPI EVENT HANDLING ---
  useEffect(() => {
    const onCallStart = () => {
      setIsCallActive(true);
      setCallStatus("Active");
      setDuration(0);
      setTranscript([]); // Clear previous chat on new call
      setCurrentLine(null);
      setSentiment('Neutral');
    };

    const onCallEnd = () => {
      setIsCallActive(false);
      setCallStatus("Ended");
      setVolumeLevel(0);
      setActiveSpeaker(null);
      setCurrentLine(null);
      setTimeout(() => setCallStatus("Ready"), 2000);
    };

    const onVolumeLevel = (level: number) => {
      setVolumeLevel(level * 100); 
    };

    const onMessage = (message: any) => {
      // Handle Transcripts (Real-time & Final)
      if (message.type === 'transcript') {
        const newMessage: ChatMessage = {
          role: message.role,
          text: message.transcript,
          timestamp: new Date(),
          isFinal: message.transcriptType === 'final'
        };

        // Update sentiment based on user's input
        if (message.role === 'user') {
            const newSentiment = analyzeSentiment(message.transcript);
            if (newSentiment !== 'Neutral') setSentiment(newSentiment);
        }

        if (message.transcriptType === 'partial') {
          // Update the "ghost" line while speaking
          setCurrentLine(newMessage);
          setActiveSpeaker(message.role);
        } else {
          // Final sentence received - commit to history
          // Prevent duplicates: Check if the last message is identical
          setTranscript(prev => {
            const lastMsg = prev[prev.length - 1];
            if (lastMsg && lastMsg.text === newMessage.text && lastMsg.role === newMessage.role) {
                return prev;
            }
            return [...prev, newMessage];
          });
          setCurrentLine(null); // Clear ghost line
        }
      }
      
      // Fallback for speaker detection if transcript lags
      if (message.type === 'speech-start') setActiveSpeaker(message.role);
      if (message.type === 'speech-end') {
         // Don't clear immediately to prevent flickering visuals
         setTimeout(() => {
            // Only clear if we aren't currently receiving a partial transcript
            // We can't easily check state here due to closure, so we use a safe timeout
            // or rely on transcript updates to set active speaker
         }, 500);
      }
    };

    const onError = (error: any) => {
      console.error("Vapi Error", error);
      setCallStatus("Error");
      setIsCallActive(false);
    };

    // Attach Listeners
    vapiService.on('call-start', onCallStart);
    vapiService.on('call-end', onCallEnd);
    vapiService.on('volume-level', onVolumeLevel);
    vapiService.on('message', onMessage);
    vapiService.on('error', onError);

    // Cleanup: Remove listeners to prevent duplicates
    return () => {
        vapiService.off('call-start', onCallStart);
        vapiService.off('call-end', onCallEnd);
        vapiService.off('volume-level', onVolumeLevel);
        vapiService.off('message', onMessage);
        vapiService.off('error', onError);
    };
  }, []);

  // Duration Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  // Actions
  const handleCallToggle = async () => {
    if (isCallActive) {
      await vapiService.close();
    } else {
      setCallStatus("Connecting...");
      try {
        await vapiService.start();
      } catch (e) {
        setCallStatus("Failed");
        setTimeout(() => setCallStatus("Ready"), 2000);
      }
    }
  };

  const handleMuteToggle = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    vapiService.toggleMute(newState);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <section className="py-24 md:py-32 bg-white relative overflow-hidden" id="voice-demo">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <motion.div
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-indigo-600 text-xs font-semibold uppercase tracking-widest mb-6"
          >
            <Mic className="w-3 h-3 text-indigo-500" />
            Live Experience
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-7xl font-semibold text-slate-900 mb-6 tracking-tight leading-[1.1]"
          >
            Don't just chat. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-400 to-indigo-600">
              Make it sell to you.
            </span>
          </motion.h2>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Experience our sales-trained AI. Start the demo call below to talk to Maya in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start lg:items-center">
          
          {/* LEFT: PHONE INTERFACE */}
          <div className="lg:col-span-5 flex justify-center">
             {/* Phone Container - Responsive Width & Aspect Ratio */}
             <div className="relative w-full max-w-[360px] aspect-[9/19] bg-[#0B1121] rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(50,50,93,0.25)] border-[8px] border-[#1f2937] ring-1 ring-slate-900/10 overflow-hidden flex flex-col">
                
                {/* Dynamic Island */}
                <div className="absolute top-0 inset-x-0 h-8 bg-[#0B1121] z-20 flex justify-center">
                   <div className="w-24 h-6 bg-black rounded-b-xl flex items-center justify-center gap-2">
                      {isCallActive && <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />}
                   </div>
                </div>

                {/* Call Screen Content */}
                <div className="flex-1 flex flex-col items-center pt-20 pb-12 px-6 relative bg-gradient-to-b from-[#0f172a] to-[#0B1121]">
                   
                   {/* Contact Info */}
                   <div className="text-center space-y-3 z-10 w-full">
                      <div className="relative mx-auto w-28 h-28">
                         {/* Pulse Rings */}
                         {isCallActive && (
                            <>
                               <motion.div 
                                 animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                 transition={{ repeat: Infinity, duration: 2 }}
                                 className="absolute inset-0 rounded-full border border-indigo-500/30" 
                               />
                               <motion.div 
                                 animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
                                 transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                                 className="absolute inset-[-10px] rounded-full border border-indigo-500/10" 
                               />
                            </>
                         )}
                         
                         <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-500/20 relative z-10">
                            <span className="text-4xl font-bold text-white">MA</span>
                         </div>
                      </div>
                      
                      <div>
                         <h3 className="text-2xl font-bold text-white tracking-tight">
                            {isCallActive ? "Maya (AI Agent)" : "Ready to Call"}
                         </h3>
                         <p className={`text-sm font-medium mt-1 ${isCallActive ? 'text-emerald-400' : 'text-slate-500'}`}>
                            {isCallActive ? formatTime(duration) : callStatus}
                         </p>
                      </div>
                   </div>

                   {/* Active Visualizer (Reacts to Volume) */}
                   <div className="flex-1 flex items-center justify-center w-full my-8">
                      {isCallActive ? (
                         <div className="flex items-center gap-1.5 h-16">
                            {[...Array(8)].map((_, i) => (
                               <motion.div 
                                  key={i}
                                  animate={{ 
                                     height: Math.max(8, volumeLevel * Math.random() * 2),
                                     backgroundColor: activeSpeaker === 'assistant' ? '#818cf8' : activeSpeaker === 'user' ? '#34d399' : '#334155'
                                  }}
                                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                  className="w-1.5 rounded-full"
                               />
                            ))}
                         </div>
                      ) : (
                         <div className="text-slate-700 text-xs font-mono uppercase tracking-widest">
                            System Idle
                         </div>
                      )}
                   </div>

                   {/* Controls */}
                   <div className="w-full grid grid-cols-3 items-center gap-4">
                      <button className="w-14 h-14 rounded-full bg-slate-800/50 backdrop-blur-md flex items-center justify-center text-slate-400 hover:bg-slate-800 transition-colors">
                         <Volume2 size={20} />
                      </button>
                      
                      <div className="flex justify-center">
                         <button 
                            onClick={handleCallToggle}
                            disabled={callStatus === "Connecting..."}
                            className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 ${
                               isCallActive 
                                  ? 'bg-rose-500 shadow-rose-500/40' 
                                  : 'bg-emerald-500 shadow-emerald-500/40'
                            }`}
                         >
                            {callStatus === "Connecting..." ? (
                               <Loader2 className="w-8 h-8 animate-spin" />
                            ) : isCallActive ? (
                               <Phone size={32} className="rotate-[135deg]" fill="currentColor" />
                            ) : (
                               <Phone size={32} fill="currentColor" />
                            )}
                         </button>
                      </div>

                      <button 
                        onClick={handleMuteToggle}
                        className={`w-14 h-14 rounded-full backdrop-blur-md flex items-center justify-center transition-colors ${
                           isMuted ? 'bg-white text-slate-900' : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800'
                        }`}
                      >
                         {isMuted ? <Mic size={20} className="off" /> : <Mic size={20} />}
                      </button>
                   </div>

                </div>
             </div>
          </div>

          {/* RIGHT: LIVE ANALYTICS DASHBOARD */}
          <div className="lg:col-span-7 h-full flex flex-col justify-center">
             <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden flex flex-col h-[600px]">
                
                {/* Dashboard Header */}
                <div className="h-20 border-b border-slate-100 flex items-center justify-between px-8 bg-slate-50/50">
                   <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-white border border-slate-200 rounded-xl text-indigo-600 shadow-sm">
                         <Activity size={20} />
                      </div>
                      <div>
                         <span className="block font-bold text-slate-900 text-sm">Call Analytics</span>
                         <span className="block text-xs text-slate-500 font-medium">Session ID: #{Math.floor(Math.random()*10000)}</span>
                      </div>
                   </div>
                   <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${
                      isCallActive 
                         ? 'bg-emerald-50 border-emerald-100 text-emerald-600' 
                         : 'bg-slate-100 border-slate-200 text-slate-500'
                   }`}>
                      <div className={`w-2 h-2 rounded-full ${isCallActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                      {isCallActive ? 'Live Connection' : 'Offline'}
                   </div>
                </div>

                <div className="flex-1 p-8 overflow-hidden flex flex-col">
                   {/* Metrics Row */}
                   <div className="grid grid-cols-2 gap-4 mb-8 shrink-0">
                      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm group hover:border-slate-200 transition-colors">
                         <div className="flex items-center gap-2 mb-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                            <Clock size={12} /> Call Duration
                         </div>
                         <div className="text-3xl font-black text-slate-900 font-mono tracking-tight">
                            {formatTime(duration)}
                         </div>
                      </div>
                      <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm group hover:border-slate-200 transition-colors">
                         <div className="flex items-center gap-2 mb-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
                           <Zap size={12} /> User Sentiment
                        </div>
                        <div className={`text-3xl font-black ${
                            sentiment === 'Interested' || sentiment === 'Happy' ? 'text-emerald-500' :
                            sentiment === 'Skeptical' ? 'text-amber-500' : 'text-slate-900'
                        }`}>
                           {sentiment}
                        </div>
                     </div>
                  </div>

                   {/* Live Transcript Area */}
                   <div className="flex-1 border border-slate-100 rounded-3xl bg-slate-50/50 relative overflow-hidden flex flex-col">
                      <div className="absolute top-0 left-0 right-0 h-12 bg-white/50 backdrop-blur-sm border-b border-slate-100 flex items-center px-6 z-10">
                         <MessageSquare size={14} className="text-slate-400 mr-2" />
                         <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Real-time Transcript</span>
                      </div>
                      
                      <div 
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-6 pt-16 space-y-4 custom-scrollbar scroll-smooth"
                      >
                         {transcript.length === 0 && !currentLine ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
                               <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                                  <Mic size={24} className="text-slate-300" />
                               </div>
                               <p className="text-sm font-medium">Waiting for call to start...</p>
                            </div>
                         ) : (
                            <>
                              {transcript.map((msg, i) => {
                                // Simple visual grouping: Check if prev msg is same role to hide avatar
                                const isSameSpeaker = i > 0 && transcript[i-1].role === msg.role;
                                
                                return (
                                  <motion.div 
                                      key={i}
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      className={`flex gap-4 ${msg.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'}`}
                                  >
                                      {/* Avatar (Hidden if grouped) */}
                                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 border transition-opacity ${
                                        isSameSpeaker ? 'opacity-0' : 'opacity-100'
                                      } ${
                                        msg.role === 'assistant' 
                                            ? 'bg-indigo-50 border-indigo-100 text-indigo-600' 
                                            : 'bg-slate-100 border-slate-200 text-slate-600'
                                      }`}>
                                        {msg.role === 'assistant' ? 'AI' : 'YOU'}
                                      </div>

                                      <div className={`p-4 rounded-2xl text-sm max-w-[80%] leading-relaxed shadow-sm ${
                                        msg.role === 'assistant' 
                                            ? 'bg-white text-slate-700 rounded-tl-none border border-slate-100' 
                                            : 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-500/20'
                                      }`}>
                                        {msg.text}
                                        {/* Only show time on last message of group or if not grouped */}
                                        {!isSameSpeaker && (
                                           <div className={`text-[10px] mt-2 opacity-60 font-medium ${msg.role === 'user' ? 'text-indigo-100' : 'text-slate-400'}`}>
                                              {formatMessageTime(msg.timestamp)}
                                           </div>
                                        )}
                                      </div>
                                  </motion.div>
                                );
                              })}

                              {/* LIVE TYPING BUBBLE (Partial Transcript) */}
                              {currentLine && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-4 ${currentLine.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 border ${
                                      currentLine.role === 'assistant' 
                                          ? 'bg-indigo-50 border-indigo-100 text-indigo-600' 
                                          : 'bg-slate-100 border-slate-200 text-slate-600'
                                    }`}>
                                      {currentLine.role === 'assistant' ? 'AI' : 'YOU'}
                                    </div>
                                    <div className={`p-4 rounded-2xl text-sm max-w-[80%] leading-relaxed shadow-sm opacity-80 ${
                                      currentLine.role === 'assistant' 
                                          ? 'bg-white text-slate-700 rounded-tl-none border border-slate-100' 
                                          : 'bg-indigo-600 text-white rounded-tr-none'
                                    }`}>
                                      {currentLine.text}
                                      <span className="inline-block w-1.5 h-3 ml-1 bg-current animate-pulse align-middle" />
                                    </div>
                                </motion.div>
                              )}
                            </>
                         )}
                      </div>
                   </div>
                </div>

             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AICallerDemoSection;