import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Volume2, Phone, MessageSquare, Loader2, Signal, Wifi, Battery } from 'lucide-react';
import { vapiService } from '../../../services/vapiService';

// --- TYPES ---
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
  const [currentLine, setCurrentLine] = useState<ChatMessage | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // --- SCROLL TO BOTTOM ---
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript, currentLine]);

  // --- VAPI LISTENERS ---
  useEffect(() => {
    const onCallStart = () => {
      setIsCallActive(true);
      setCallStatus("Active");
      setDuration(0);
      setTranscript([]);
      setCurrentLine(null);
    };

    const onCallEnd = () => {
      setIsCallActive(false);
      setCallStatus("Ended");
      setVolumeLevel(0);
      setCurrentLine(null);
      setTimeout(() => setCallStatus("Ready"), 2000);
    };

    const onVolumeLevel = (level: number) => setVolumeLevel(level * 100);

    const onMessage = (message: any) => {
      if (message.type === 'transcript') {
        const newMessage: ChatMessage = {
          role: message.role,
          text: message.transcript,
          timestamp: new Date(),
          isFinal: message.transcriptType === 'final'
        };

        if (message.transcriptType === 'partial') {
          setCurrentLine(newMessage);
        } else {
          setTranscript(prev => {
            const lastMsg = prev[prev.length - 1];
            if (lastMsg && lastMsg.text === newMessage.text && lastMsg.role === newMessage.role) return prev;
            return [...prev, newMessage];
          });
          setCurrentLine(null);
        }
      }
    };

    vapiService.on('call-start', onCallStart);
    vapiService.on('call-end', onCallEnd);
    vapiService.on('volume-level', onVolumeLevel);
    vapiService.on('message', onMessage);

    return () => {
        vapiService.off('call-start', onCallStart);
        vapiService.off('call-end', onCallEnd);
        vapiService.off('volume-level', onVolumeLevel);
        vapiService.off('message', onMessage);
    };
  }, []);

  // --- TIMER ---
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => setDuration(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="py-20 bg-[#F5F5F7] relative overflow-hidden font-sans" id="voice-demo">
      {/* Background Ambience - Reduced opacity for cleaner look */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff_0%,_#e5e5e5_100%)] pointer-events-none opacity-60" />
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm"
          >
            <Mic className="w-3 h-3 text-indigo-500" />
            Live Demo
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-semibold text-slate-900 mb-6 tracking-tight">
            Meet Your New <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
              AI Sales Expert
            </span>
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Tap the button below to start a real-time conversation.
          </p>
        </div>

        {/* --- IPHONE UI CONTAINER --- */}
        <div className="flex justify-center perspective-1000 py-4">
             
             <motion.div 
               layout
               // Adjusted height for better desktop/mobile fit
               className="relative w-full max-w-[375px] sm:max-w-[400px] h-[750px] max-h-[85dvh] bg-black rounded-[3.5rem] shadow-[0_0_0_10px_#1f1f1f,0_0_0_12px_#000,0_50px_100px_-20px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col transform transition-all duration-700 ring-1 ring-white/20 z-20"
             >
                {/* 1. STATUS BAR */}
                <div className="absolute top-0 inset-x-0 h-14 z-50 flex justify-between items-start px-8 pt-5 text-white text-[14px] font-medium pointer-events-none">
                    <span className="w-12 text-center tracking-tight font-semibold">9:41</span>
                    
                    <div className="flex gap-1.5 items-center w-16 justify-end">
                        <Signal size={16} className="fill-current" />
                        <Wifi size={16} />
                        <Battery size={22} className="fill-current" />
                    </div>
                </div>

                {/* 2. DYNAMIC ISLAND */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-[60]">
                    <motion.div 
                        animate={{ 
                            width: isCallActive ? 120 : 120, 
                            height: 35
                        }}
                        className="bg-black rounded-[20px] flex items-center justify-center transition-all duration-500"
                    >
                        <div className="flex items-center gap-2">
                           <div className="w-3 h-3 rounded-full bg-[#1a1a1a]" />
                           {isCallActive && <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]" />}
                        </div>
                    </motion.div>
                </div>

                {/* --- 3. MAIN SCREEN CONTENT --- */}
                <div className="flex-1 flex flex-col relative bg-black overflow-hidden rounded-[3.5rem]">
                   
                   {/* Background Glow - Reduced Opacity */}
                   <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-indigo-900/20 via-purple-900/10 to-transparent pointer-events-none opacity-40" />

                   {/* Safe Area Spacer */}
                   <div className="w-full h-16 shrink-0" />

                   {/* A. HEADER AREA */}
                   <div className={`relative z-20 w-full transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)] px-6 ${isCallActive ? 'pt-6 pb-4' : 'flex-1 flex flex-col justify-start pt-12 items-center'}`}>
                      
                      <div className={`flex w-full items-center transition-all duration-700 ${isCallActive ? 'flex-row gap-4' : 'flex-col gap-8'}`}>
                         
                         {/* Premium Avatar Orb */}
                         <motion.div 
                           layout
                           className={`relative rounded-full flex items-center justify-center z-10 transition-all duration-700 ${isCallActive ? 'w-12 h-12' : 'w-28 h-28'}`}
                         >
                            {/* Core Gradient */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 blur-[1px]" />
                            
                            {/* Shine Effect */}
                            <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-b from-white/30 to-transparent opacity-80" />
                            
                            {/* Inner Shadow */}
                            <div className="absolute inset-[2px] rounded-full bg-black/20 backdrop-blur-sm" />

                            {/* Pulse Rings (Active) */}
                            <AnimatePresence>
                                {isCallActive && volumeLevel > 5 && (
                                   <motion.div 
                                     initial={{ opacity: 0, scale: 1 }}
                                     animate={{ opacity: 0.4, scale: 1.4 }}
                                     exit={{ opacity: 0, scale: 1 }}
                                     transition={{ duration: 0.8, repeat: Infinity }}
                                     className="absolute inset-0 rounded-full border border-cyan-400/50"
                                   />
                                )}
                            </AnimatePresence>

                            {/* Initials */}
                            <span className={`relative z-10 font-bold text-white tracking-wide transition-all duration-700 ${isCallActive ? 'text-xs' : 'text-2xl'}`}>
                                AI
                            </span>
                         </motion.div>

                         {/* Text Info */}
                         <motion.div layout className={`flex flex-col ${isCallActive ? 'items-start' : 'items-center text-center'}`}>
                            <motion.h3 layout className={`font-bold text-white tracking-tight leading-none ${isCallActive ? 'text-lg' : 'text-3xl'}`}>
                               TopEdge AI
                            </motion.h3>
                            
                            <motion.div layout className="flex items-center gap-2 mt-2">
                               {isCallActive ? (
                                 <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
                                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"/>
                                   <span className="text-xs font-medium text-emerald-100 font-mono">{formatTime(duration)}</span>
                                 </div>
                               ) : (
                                 <span className="text-slate-400 text-sm font-medium tracking-wide">Sales Agent • Ready</span>
                               )}
                            </motion.div>
                         </motion.div>
                      </div>
                   </div>

                   {/* B. TRANSCRIPT AREA */}
                   <div className="flex-1 relative w-full overflow-hidden flex flex-col min-h-0">
                       <AnimatePresence mode="wait">
                         {isCallActive ? (
                           <motion.div 
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             exit={{ opacity: 0 }}
                             className="flex-1 flex flex-col relative min-h-0"
                           >
                              <div 
                                ref={scrollRef}
                                className="flex-1 overflow-y-auto px-6 py-2 space-y-4 custom-scrollbar"
                                style={{ maskImage: 'linear-gradient(to bottom, transparent, black 20px, black 100%)' }}
                              >
                                 {transcript.length === 0 && !currentLine ? (
                                    <div className="h-full flex flex-col items-center justify-center text-white/20 pb-10">
                                       <MessageSquare size={24} className="mb-3 opacity-30" />
                                       <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Listening...</p>
                                    </div>
                                 ) : (
                                    <>
                                      <div className="h-4 shrink-0" /> 
                                      {transcript.map((msg, i) => (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            key={i} 
                                            className={`flex ${msg.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
                                        >
                                           <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                                              msg.role === 'assistant' 
                                                ? 'bg-[#1C1C1E] text-slate-200 rounded-tl-sm' 
                                                : 'bg-[#0A84FF] text-white rounded-tr-sm'
                                           }`}>
                                              {msg.text}
                                           </div>
                                        </motion.div>
                                      ))}
                                      
                                      {currentLine && (
                                        <div className={`flex ${currentLine.role === 'assistant' ? 'justify-start' : 'justify-end'}`}>
                                           <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-[13px] leading-relaxed opacity-70 ${
                                              currentLine.role === 'assistant' 
                                                ? 'bg-[#1C1C1E] text-slate-200 rounded-tl-sm' 
                                                : 'bg-[#0A84FF] text-white rounded-tr-sm'
                                           }`}>
                                              {currentLine.text}
                                              <span className="inline-block w-1 h-3 ml-1 bg-current animate-pulse align-middle" />
                                           </div>
                                        </div>
                                      )}
                                      <div className="h-4 shrink-0" />
                                    </>
                                 )}
                              </div>
                           </motion.div>
                         ) : (
                           <motion.div 
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             exit={{ opacity: 0 }}
                             className="absolute inset-0 flex flex-col items-center justify-end pb-20 pointer-events-none"
                           >
                              <div className="flex items-center gap-1.5 opacity-20">
                                 <span className="w-1 h-1 rounded-full bg-white animate-bounce" style={{ animationDelay: '0s' }} />
                                 <span className="w-1 h-1 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.2s' }} />
                                 <span className="w-1 h-1 rounded-full bg-white animate-bounce" style={{ animationDelay: '0.4s' }} />
                              </div>
                              <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest mt-4">System Online</p>
                           </motion.div>
                         )}
                       </AnimatePresence>
                   </div>

                   {/* 4. BOTTOM CONTROLS (Fixed Tray Issue & Alignment) */}
                   <div className="relative z-30 w-full px-12 pb-12 pt-6 bg-black">
                      <div className="flex items-center justify-between w-full max-w-[280px] mx-auto">
                          
                          {/* Speaker Button */}
                          <button className="w-12 h-12 rounded-full bg-[#1C1C1E] flex items-center justify-center text-slate-400 hover:bg-[#2C2C2E] transition-colors active:scale-95">
                             <Volume2 size={20} />
                          </button>
                          
                          {/* Main Call Button */}
                          <button 
                            onClick={handleCallToggle}
                            disabled={callStatus === "Connecting..."}
                            className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl transition-all transform hover:scale-105 active:scale-95 ${
                               isCallActive 
                                  ? 'bg-rose-500 shadow-rose-900/40' 
                                  : 'bg-green-500 shadow-green-900/40'
                            }`}
                         >
                            {callStatus === "Connecting..." ? (
                               <Loader2 className="w-8 h-8 animate-spin" />
                            ) : isCallActive ? (
                               <Phone size={28} className="fill-current rotate-[135deg]" />
                            ) : (
                               <Phone size={28} className="fill-current" />
                            )}
                         </button>

                          {/* Mute Button */}
                          <button 
                            onClick={() => { setIsMuted(!isMuted); vapiService.toggleMute(!isMuted); }}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors active:scale-95 ${
                               isMuted ? 'bg-white text-black' : 'bg-[#1C1C1E] text-slate-400 hover:bg-[#2C2C2E]'
                            }`}
                          >
                             <Mic size={20} className={isMuted ? "off" : ""} />
                          </button>
                      </div>
                      
                      {/* Home Indicator (Seamlessly on Black) */}
                      <div className="w-32 h-1 bg-white/20 rounded-full mx-auto mt-8" />
                   </div>

                </div>
             </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AICallerDemoSection;