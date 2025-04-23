import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mic, MicOff, X } from 'lucide-react';
import { vapiService } from '../../services/vapiService';

interface VapiCallProps {
  isOpen: boolean;
  onClose: () => void;
}

const VapiCall: React.FC<VapiCallProps> = ({ isOpen, onClose }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [transcript, setTranscript] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);
  const audioVisualizerRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (isOpen && !isCallActive) {
      startCall();
    }
    return () => {
      if (isCallActive) {
        endCall();
      }
    };
  }, [isOpen]);

  const startCall = async () => {
    try {
      await vapiService.start();
      setIsCallActive(true);
      initializeAudioVisualizer();
    } catch (error) {
      console.error('Failed to start call:', error);
    }
  };

  const endCall = () => {
    vapiService.close();
    setIsCallActive(false);
    setTranscript('');
    onClose();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    vapiService.setMuted(!isMuted);
  };

  const initializeAudioVisualizer = () => {
    const canvas = audioVisualizerRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const bars = 50;
    const barWidth = width / bars;
    let animationFrameId: number;

    const animate = () => {
      if (!isCallActive) return;

      ctx.clearRect(0, 0, width, height);
      
      // Create premium gradient
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#4F46E5');
      gradient.addColorStop(0.3, '#7C3AED');
      gradient.addColorStop(0.6, '#9333EA');
      gradient.addColorStop(1, '#C026D3');

      for (let i = 0; i < bars; i++) {
        const barHeight = Math.random() * (height / 2) + 10;
        const x = i * barWidth;
        const y = height / 2 - barHeight / 2;
        
        // Add glow effect
        ctx.shadowColor = '#4F46E5';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth - 2, barHeight);
        
        // Reset shadow
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Original blur backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={endCall}
          />

          {/* Premium modal */}
          <motion.div
            className="relative w-full max-w-lg mx-4 bg-[#0A0A0A] rounded-2xl shadow-2xl overflow-hidden border border-white/10"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            {/* Header */}
            <div className="relative p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center ring-1 ring-white/20">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white">AI Assistant</h3>
                    <p className="text-white/60 text-sm">Active Call</p>
                  </div>
                </div>
                <button
                  onClick={endCall}
                  className="p-2 rounded-full hover:bg-white/5 transition-colors"
                >
                  <X className="w-6 h-6 text-white/60" />
                </button>
              </div>
            </div>

            {/* Audio visualizer */}
            <div className="p-6">
              <canvas
                ref={audioVisualizerRef}
                width={400}
                height={100}
                className="w-full rounded-lg bg-black/40 ring-1 ring-white/10"
              />
            </div>

            {/* Transcript */}
            <div className="px-6 pb-6">
              <div className="h-32 overflow-y-auto rounded-lg bg-black/40 p-4 text-white/80 ring-1 ring-white/10">
                {transcript || (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-white/40">
                      <div className="animate-pulse">Initializing call...</div>
                      <div className="mt-2 text-sm text-white/30">Please allow microphone access when prompted</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="p-6 border-t border-white/10 bg-black/40">
              <div className="flex justify-center space-x-4">
                <motion.button
                  onClick={toggleMute}
                  className={`p-4 rounded-full ${
                    isMuted ? 'bg-red-500/10 ring-1 ring-red-500/20' : 'bg-black ring-1 ring-white/20'
                  } hover:bg-white/5 transition-all`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isMuted ? (
                    <MicOff className="w-6 h-6 text-red-500" />
                  ) : (
                    <Mic className="w-6 h-6 text-white" />
                  )}
                </motion.button>
                <motion.button
                  onClick={endCall}
                  className="p-4 rounded-full bg-red-500/10 ring-1 ring-red-500/20 hover:bg-red-500/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-6 h-6 text-red-500" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VapiCall; 