import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X } from 'lucide-react';
import { vapiService } from '../services/vapiService';

// FloatingVoiceChat: ElevenLabs-style floating voice chat button for all pages
const FloatingVoiceChat: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Start call logic (copied from HeroSection)
  const handleStartCall = async () => {
    try {
      setIsConnecting(true);
      await vapiService.start();
      setIsCallActive(true);
    } catch (error) {
      // eslint-disable-next-line
      console.error('Failed to start call:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  // End call logic (copied from HeroSection)
  const handleEndCall = async () => {
    try {
      setIsConnecting(true);
      await vapiService.close();
      setIsCallActive(false);
    } catch (error) {
      // eslint-disable-next-line
      console.error('Failed to end call:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  // Responsive: tiny button on mobile, full button on desktop
  return (
    <div className="fixed z-50 bottom-5 right-5 w-auto h-auto floating-voice-chat-root pointer-events-none">
      {/* Floating Button (mobile: icon only, desktop: icon+label) */}
      {/* Powered by TopEdge AI caption (now fixed and always visible below the button/chat) */}
      
      {/* Floating Button (mobile: icon only, desktop: icon+label) */}
      {!expanded && (
        <div className="absolute bottom-0 right-0 w-auto flex-none pointer-events-auto">
          {/* Glow layer (blue/purple) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="w-full h-full rounded-full blur-2xl opacity-60 bg-gradient-to-r from-theme-glow-primary/60 via-theme-glow-accent/80 to-theme-glow-primary/60 animate-pulse" />
          </div>
          <button
            className="relative flex items-center justify-center rounded-full shadow-lg bg-theme-bg-surface text-theme-text-primary hover:bg-theme-bg-secondary transition-all duration-300 focus:outline-none border border-theme-border-primary w-14 h-14 sm:w-auto sm:h-auto px-0 sm:px-6 py-0 sm:py-3"
            style={{ minWidth: 56, zIndex: 1 }}
            onClick={() => setExpanded(true)}
            aria-label="Voice Chat"
          >
            <Phone className="w-6 h-6 mr-0 sm:mr-3 text-green-500" />
            <span className="hidden sm:inline font-semibold whitespace-nowrap">Voice Chat</span>
          </button>
        </div>
      )}
      {/* Expanded Chat UI */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.9 }}
            className="absolute bottom-0 right-0 mt-2 w-[320px] max-w-[90vw] rounded-3xl shadow-2xl bg-theme-bg-surface border border-theme-border-primary overflow-hidden pointer-events-auto"
            style={{ willChange: 'transform,opacity' }}
          >


            <div className="flex items-center justify-between px-5 py-4 border-b border-theme-border-primary bg-theme-bg-secondary">
              <div className="flex items-center gap-3">
              <Phone className="w-6 h-6 mr-0 sm:mr-3 text-green-500" />
              <span className="font-semibold text-theme-text-primary">TopEdge AI Live</span>
              </div>
              <button
                className="rounded-full hover:bg-theme-bg-primary p-2 transition-colors"
                onClick={() => setExpanded(false)}
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-5 py-6 flex flex-col items-center gap-6">
              <div className="text-theme-text-secondary text-center text-base">
              🚀 Need help? Chat with our AI agent or hop on a live call            </div>
              <AnimatePresence mode="wait">
                {isCallActive ? (
                  <div className="relative flex items-center justify-center w-full">
                    {/* Glow layer */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-full h-full rounded-full blur-lg opacity-30 bg-gradient-to-r from-red-400/40 via-red-500/50 to-red-400/40 animate-pulse" />
                    </div>
                    <motion.button
                      key="endcall"
                      onClick={handleEndCall}
                      disabled={isConnecting}
                      className="relative flex items-center gap-2 px-6 py-3 rounded-full bg-red-500 text-white font-semibold shadow-lg hover:bg-red-600 transition-all disabled:opacity-60"
                      style={{ zIndex: 1 }}
                    >
                      <X className="w-5 h-5" /> End Call
                    </motion.button>
                  </div>
                ) : (
                  <div className="relative flex items-center justify-center w-full">
                    {/* Glow layer */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-full h-full rounded-full blur-2xl opacity-60 bg-gradient-to-r from-theme-glow-primary/60 via-theme-glow-accent/80 to-theme-glow-primary/60 animate-pulse" />
                    </div>
                    <motion.button
                      key="startcall"
                      onClick={handleStartCall}
                      disabled={isConnecting}
                      className="relative flex items-center gap-2 px-6 py-3 rounded-full bg-theme-bg-accent text-theme-text-accent font-semibold shadow-lg hover:bg-theme-bg-secondary transition-all disabled:opacity-60"
                      style={{ zIndex: 1 }}
                    >
                      <Phone className="w-5 h-5" /> Talk to TopEdge AI
                    </motion.button>
                  </div>
                )}
              </AnimatePresence>
              <div className="w-full flex justify-center mt-0">
                <span className="text-xs text-theme-text-secondary/80 font-medium tracking-wide bg-white/80 backdrop-blur rounded-full px-4 py-1 shadow border border-theme-border-primary/10" style={{letterSpacing:'0.04em'}}>
                  Powered by <span className="font-semibold text-theme-glow-accent">TopEdge AI</span>
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingVoiceChat;
