import { useRef, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Rocket, Info, Phone, X, Calculator, CalculatorIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../styles/animations.css';
import '../../styles/breathe.css';
import { Bot, Brain, Cpu, TrendingUp, Zap, User, User2, TrendingUpIcon } from 'lucide-react';
import { vapiService } from '../../services/vapiService';
import React from 'react';
import { LucideIcon } from 'lucide-react';


// Add this new component for the end call icon
const EndCallIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-135">
    <path d="M22 3L2 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M21.3536 20.3536L15.3536 14.3536C15.1583 14.1583 15.1583 13.8417 15.3536 13.6464L17.6464 11.3536C17.8417 11.1583 18.1583 11.1583 18.3536 11.3536L24.3536 17.3536C24.5488 17.5488 24.5488 17.8654 24.3536 18.0607L22.0607 20.3536C21.8654 20.5488 21.5488 20.5488 21.3536 20.3536Z" fill="currentColor"/>
  </svg>
);

interface PremiumButtonProps {
  icon: LucideIcon;
  text: string;
  to?: string;
  onClick?: () => void;
  isLoading?: boolean;
  variant?: 'default' | 'danger';
}

const PremiumButton: React.FC<PremiumButtonProps> = React.memo(({ 
  icon: Icon, 
  text, 
  to,
  onClick,
  isLoading,
  variant = 'default'
}) => (
  <motion.button
    whileHover="hover"
    whileTap="tap"
    variants={{
      hover: { scale: 1.05 },
      tap: { scale: 0.95 }
    }}
    onClick={onClick}
    className="group relative rounded-full w-full sm:w-auto"
  >
    <div className="relative px-4 sm:px-8 py-3 sm:py-4 rounded-full">
      {/* Base Glow Layer */}
      <div className={`absolute inset-0 rounded-full ${
        variant === 'danger'
          ? 'bg-gradient-to-r from-red-500/20 via-red-500/30 to-red-500/20'
          : 'bg-gradient-to-r from-theme-glow-primary/20 via-theme-glow-accent/30 to-theme-glow-primary/20'
      }`} />

      {/* Outer Glow */}
      <div className={`absolute inset-0 blur-xl opacity-40 group-hover:opacity-100 transition-opacity duration-500 rounded-full ${
        variant === 'danger' 
          ? 'bg-gradient-to-r from-red-500/30 via-red-500/40 to-red-500/30 opacity-50 group-hover:opacity-100'
          : 'bg-gradient-to-r from-theme-glow-primary/30 via-theme-glow-accent/40 to-theme-glow-primary/30 opacity-50 group-hover:opacity-100'
      } transition-all duration-500 rounded-full`} />
      
      {/* Moving Particles Background */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 rounded-full ${
              variant === 'danger' ? 'bg-red-500' : 'bg-theme-glow-primary'
            }`}
            animate={{
              x: [
                Math.random() * 200,
                Math.random() * -200,
                Math.random() * 200
              ],
              y: [
                Math.random() * 100,
                Math.random() * -100,
                Math.random() * 100
              ],
              scale: [0, 1.5, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      {/* Main Button Background */}
      <div className={`absolute inset-0 bg-theme-bg-surface/80 backdrop-blur-sm border rounded-full ${
        variant === 'danger'
          ? 'border-red-500/50 group-hover:border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)] group-hover:shadow-[0_0_30px_rgba(239,68,68,0.5)]'
          : 'border-theme-border-accent/50 group-hover:border-theme-border-accent shadow-[0_0_20px_rgba(var(--theme-glow-primary-rgb),0.3)] group-hover:shadow-[0_0_30px_rgba(var(--theme-glow-primary-rgb),0.5)]'
      } transition-all duration-300`} />
      
      {/* Button Content */}
      <div className="relative flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
        <div className="relative flex items-center gap-2 sm:gap-3">
          {isLoading ? (
            <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 ${
              variant === 'danger'
                ? 'border-red-400 border-t-red-600'
                : 'border-theme-text-secondary border-t-theme-text-accent'
            } animate-spin`} />
          ) : (
            <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${
              variant === 'danger'
                ? 'text-red-500'
                : 'text-theme-text-accent group-hover:text-theme-text-primary'
            } transition-colors duration-300`} />
          )}
          <span className={`text-sm sm:text-base font-medium ${
            variant === 'danger'
              ? 'text-red-500'
              : 'bg-gradient-to-r from-theme-text-primary via-theme-text-accent to-theme-text-primary bg-clip-text text-transparent'
          }`}>
            {text}
          </span>
        </div>
        <motion.div
          animate={{
            x: [0, 5, 0],
            y: [0, -2, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className={`${
            variant === 'danger'
              ? 'text-red-500'
              : 'text-theme-text-accent group-hover:text-theme-text-primary'
          } transition-colors duration-300`}>→</span>
        </motion.div>
      </div>
    </div>
  </motion.button>
));

interface OrbConfig {
  id: number;
  color: string;
  x: number;
  y: number;
  scale: number;
  duration: number;
}

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isMobile = window.innerWidth < 768;
  const [isCallActive, setIsCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // Check if there's an active call on component mount
    setIsCallActive(vapiService.isActive());

    // Cleanup on unmount
    return () => {
      if (vapiService.isActive()) {
        vapiService.close();
      }
    };
  }, []);

  const handleStartCall = async () => {
    try {
      setIsConnecting(true);
      await vapiService.start();
      setIsCallActive(true);
    } catch (error) {
      console.error('Failed to start call:', error);
      setIsCallActive(false);
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


  return (
    <motion.section 
      ref={sectionRef} 
      className="relative min-h-screen bg-theme-bg-primary overflow-hidden flex items-center perspective-1000 py-8 sm:py-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ position: 'relative' }}
    >
      {/* Dynamic Background - Enhanced */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
      

        {/* Floating icons with colorful variants */}
        <motion.div
          className="absolute left-10 top-1/4 text-blue-500/40"
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 360],
          }}
          transition={{
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <Bot className="w-16 h-16" />
        </motion.div>

        <motion.div
          className="absolute right-10 top-1/3 text-yellow-400/40"
          animate={{
            y: [20, -20, 20],
            rotate: [360, 0],
          }}
          transition={{
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <Brain className="w-16 h-16" />
        </motion.div>

        <motion.div
          className="absolute left-40 top-1/2 text-purple-400/40"
          animate={{
            y: [10, -10, 10],
            rotate: [360, 0],
          }}
          transition={{
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <User2 className="w-16 h-16" />
        </motion.div>

        <motion.div
          className="absolute right-40 top-1/4 text-blue-400/40"
          animate={{
            y: [20, -20, 20],
            rotate: [360, 0],
          }}
          transition={{
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <CalculatorIcon className="w-16 h-16" />
        </motion.div>


        <motion.div
          className="absolute right-10 bottom-1/4 text-orange-400/40"
          animate={{
            y: [20, -20, 20],
            rotate: [360, 0],
          }}
          transition={{
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <Bot className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute left-1/4 bottom-1/4 text-purple-500/40"
          animate={{
            y: [-30, 30, -30],
            x: [-20, 20, -20],
            rotate: [0, -360],
          }}
          transition={{
            y: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            },
            x: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <Cpu className="w-12 h-12" />
        </motion.div>

        <motion.div
          className="absolute right-1/4 top-1/2 text-emerald-500/40"
          animate={{
            y: [20, -20, 20],
            x: [20, -20, 20],
            rotate: [360, 0],
          }}
          transition={{
            y: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            },
            x: {
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <TrendingUp className="w-12 h-12" />
        </motion.div>

        <motion.div
          className="absolute left-1/3 top-1/4 text-rose-500/40"
          animate={{
            y: [-25, 25, -25],
            x: [-15, 15, -15],
            rotate: [180, -180],
          }}
          transition={{
            y: {
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            },
            x: {
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <Zap className="w-10 h-10" />
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 flex flex-col justify-center items-center text-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-5xl"
        >
          {/* Title with theme-aware gradients */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center justify-center gap-2 sm:gap-4 relative"
            >
              <motion.span
                className="text-[3.0rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center leading-tight bg-gradient-to-r from-theme-text-primary via-theme-text-accent to-theme-text-primary bg-clip-text text-transparent"
                style={{
                  backgroundSize: '200% auto',
                  animation: 'shine 8s linear infinite',
                }}
              >
                Within 45 Days
              </motion.span>
              
              <motion.span
                className="text-[2.3rem] sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center leading-tight mt-2 bg-gradient-to-r from-theme-text-primary via-theme-text-accent to-theme-text-primary bg-clip-text text-transparent"
                style={{
                  backgroundSize: '200% auto',
                  animation: 'shine 8s linear infinite',
                }}
              >
                Recover upto $10k in Lost Revenue
              </motion.span>
            </motion.div>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-theme-text-secondary text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-8 md:mb-10 leading-relaxed px-4 sm:px-0"
          >
            By converting dead-end engagements into qualified leads with our fully automated Voice AI and Advanced Chatbot systems.
          </motion.p>

          {/* Call to Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-6 sm:px-0"
          >
            {/* Voice Chat Button with loading/call states */}
            <AnimatePresence mode="wait">
              {isCallActive ? (
                <PremiumButton 
                  icon={X}
                  text="End Call" 
                  onClick={handleEndCall}
                  isLoading={isConnecting}
                  variant="danger"
                />
              ) : (
                <PremiumButton 
                  icon={Phone}
                  text="Talk to TopEdge AI Live" 
                  onClick={handleStartCall}
                  isLoading={isConnecting}
                />
              )}
            </AnimatePresence>

            {/* ROI Button */}
            <Link to="/roi">
              <PremiumButton 
                icon={Rocket}
                text="Calculate ROI" 
                to="/pricing"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          @keyframes shine {
            to {
              background-position: 200% center;
            }
          }
        `}
      </style>
    </motion.section>
  );
};

export default HeroSection;
