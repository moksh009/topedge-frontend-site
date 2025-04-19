import { useRef, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Rocket, Info, Phone, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../../styles/animations.css';
import '../../styles/breathe.css';
import { Bot, Brain, Cpu, TrendingUp, Zap } from 'lucide-react';
import { vapiService } from '../../services/vapiService';

// Add this new component for the end call icon
const EndCallIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-135">
    <path d="M22 3L2 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M21.3536 20.3536L15.3536 14.3536C15.1583 14.1583 15.1583 13.8417 15.3536 13.6464L17.6464 11.3536C17.8417 11.1583 18.1583 11.1583 18.3536 11.3536L24.3536 17.3536C24.5488 17.5488 24.5488 17.8654 24.3536 18.0607L22.0607 20.3536C21.8654 20.5488 21.5488 20.5488 21.3536 20.3536Z" fill="currentColor"/>
  </svg>
);

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

  // Optimize floating orbs by reducing count on mobile
  const floatingOrbs = useMemo(() => {
    const orbCount = isMobile ? 4 : 8;
    return [...Array(orbCount)].map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 3 + (isMobile ? 10 : 15)
    }));
  }, []);

  // Reduce particle count for mobile
  const particleCount = isMobile ? 5 : 10;

  return (
    <motion.section 
      ref={sectionRef} 
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden font-sf-pro-display"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Optimized Background Effects */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.95), rgba(0,0,0,0.98))',
          willChange: 'transform'
        }}
      >
        {/* Optimized breathing circle - reduced animation complexity for mobile */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] will-change-transform"
          animate={{
            scale: isMobile ? [1, 1.02, 1] : [1, 1.05, 1],
            opacity: isMobile ? [0.1, 0.12, 0.1] : [0.15, 0.18, 0.15],
          }}
          transition={{
            duration: isMobile ? 4 : 6,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-white/2"
            style={{ filter: isMobile ? 'blur(30px)' : 'blur(50px)' }}
          />
        </motion.div>

        {/* Optimized floating orbs - reduced count and simpler animations for mobile */}
        {!isMobile && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {floatingOrbs.map((orb) => (
              <motion.div
                key={orb.id}
                className="absolute w-2 h-2 bg-purple-500/30 rounded-full"
                initial={{
                  opacity: 0.1,
                  scale: orb.scale,
                  x: orb.x,
                  y: orb.y,
                }}
                animate={{
                  y: [orb.y, orb.y + 30, orb.y],
                  opacity: [0.1, 0.12, 0.1],
                }}
                transition={{
                  duration: orb.duration,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  filter: 'blur(1px)',
                }}
              />
            ))}
          </div>
        )}

        {/* Optimized particles - reduced count and simpler animations for mobile */}
        {[...Array(particleCount)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(0.5px)',
            }}
            animate={{
              y: [0, -40],
              opacity: [0.2, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 1,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 1,
            }}
          />
        ))}
      </motion.div>

      {/* Simplified animated background for mobile */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="absolute inset-0">
          {[...Array(isMobile ? 20 : 50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-300/40 rounded-full"
              animate={{
                y: [Math.random() * 1000, -10],
                opacity: [0, 0.5, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                delay: Math.random() * 1
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(0.5px)'
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating icons */}
      <motion.div
        className="absolute left-10 top-1/4 text-purple-500/20"
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
        className="absolute right-10 top-1/3 text-yellow-500/20"
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
        className="absolute left-1/4 bottom-1/4 text-blue-500/20"
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
        className="absolute right-1/4 top-1/2 text-green-500/20"
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
        className="absolute left-1/3 top-1/4 text-red-500/20"
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

      {/* Main Content */}
      <div className="relative container mx-auto px-4 flex flex-col justify-center items-center text-center min-h-screen">
        {/* Text Animation Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-5xl"
        >
          {/* Title text with consistent gradients */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col items-center justify-center gap-2 sm:gap-4 relative"
            >
              {/* Breathing glowing ball behind text */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <motion.div
                  className="w-[200px] sm:w-[500px] md:w-[600px] h-[120px] sm:h-[160px] md:h-[200px] rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    background: 'radial-gradient(circle at center, rgba(139,92,246,0.3) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                  }}
                />
              </motion.div>

              <div className="flex flex-col items-center gap-2 sm:gap-3">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: [1, 1.03, 1],
                  }}
                  transition={{ 
                    opacity: { duration: 0.8, delay: 0.3 },
                    scale: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                  className="text-[3.0rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center leading-tight"
                  style={{
                    background: 'linear-gradient(to right, #FFFFFF 20%, #8B5CF6 50%, #FFFFFF 80%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'shine 8s linear infinite',
                  }}
                >
                  Within 45 Days
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: [1, 1.03, 1],
                  }}
                  transition={{ 
                    opacity: { duration: 0.8, delay: 0.6 },
                    scale: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.2
                    }
                  }}
                  className="text-[2.3rem] sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-center leading-tight mt-2"
                  style={{
                    background: 'linear-gradient(to right, #FFFFFF 20%, #8B5CF6 50%, #FFFFFF 80%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'shine 8s linear infinite',
                  }}
                >
                  Recover upto $10k in Lost Revenue
                </motion.span>
              </div>
            </motion.div>
          </motion.h1>

          {/* Description with tech animation */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[1.2rem] sm:text-xl md:text-2xl text-white/90 max-w-[1200px] mx-auto leading-relaxed mb-8 sm:mb-8 md:mb-12 px-4"
            style={{
              textShadow: '0 0 20px rgba(255,255,255,0.2)',
            }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="relative z-10 text-white/100 flex items-center justify-center text-center"
            >
              Just by Fixing Missed Calls, Late Customer Response, No-Shows, & Slow Follow-Ups.
            </motion.span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex flex-col sm:flex-row gap-5 sm:gap-4 md:gap-6 justify-center items-stretch w-full max-w-md mx-auto px-4 mt-4 sm:mt-0"
          >
            {/* Voice Chat Button */}
            <motion.button
              onClick={isCallActive ? handleEndCall : handleStartCall}
              disabled={isConnecting}
              whileHover="hover"
              whileTap="tap"
              variants={{
                hover: { scale: 1.02 },
                tap: { scale: 0.98 }
              }}
              className="group relative rounded-full min-w-[300px] mb-3 sm:mb-0"
            >
              <div className="relative px-6 sm:px-8 py-3 sm:py-4 rounded-full w-full">
                {/* Button Background with dynamic border color */}
                <div 
                  className={`absolute inset-0 bg-black rounded-full transition-all duration-300 ${
                    isCallActive 
                      ? 'border border-red-500/50 group-hover:border-red-400' 
                      : 'border border-green-500/50 group-hover:border-green-400'
                  }`}
                />

                {/* Active Call Wave Effect */}
                {isCallActive && (
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-red-500/5" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/10 to-transparent"
                      animate={{
                        x: ['-100%', '100%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-l from-transparent via-red-500/10 to-transparent"
                      animate={{
                        x: ['100%', '-100%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 1
                      }}
                    />
                  </div>
                )}
                
                {/* Button Content */}
                <div className="relative flex items-center justify-center h-7 overflow-hidden">
                  <AnimatePresence mode="wait">
                    {isConnecting ? (
                      <motion.div 
                        key="loading"
                        className="flex items-center justify-center gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="relative w-6 h-6">
                          <div className="absolute inset-0 border-2 border-green-400/30 rounded-full" />
                          <div className="absolute inset-0 border-2 border-t-green-400 rounded-full animate-[spin_0.6s_linear_infinite]" />
                        </div>
                        <span className="text-[17px] font-medium text-white/90">
                          {isCallActive ? 'Ending Call...' : 'Connecting...'}
                        </span>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="content"
                        className="flex items-center justify-center gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        {isCallActive ? (
                          <>
                            {/* End Call Icons */}
                            <div className="flex items-center gap-3">
                              <svg 
                                width="24" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="text-red-400 group-hover:text-white transition-colors duration-300"
                              >
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M5 19L19 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                              </svg>
                            </div>
                            <span className="text-[17px] font-medium text-red-400 group-hover:text-white transition-colors duration-300">
                              End Call
                            </span>
                          </>
                        ) : (
                          <>
                            <Phone className="w-6 h-6 text-green-400 group-hover:text-white transition-colors duration-300" />
                            <span className="text-[17px] font-medium text-white">
                              Talk to TopEdge AI Live
                            </span>
                          </>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.button>

            {/* Second Button - Check ROI in 3 Sec */}
            <Link
              to="/roi"
              className="group relative rounded-full w-full"
            >
              <motion.div
                whileHover="hover"
                whileTap="tap"
                variants={{
                  hover: { scale: 1.02 },
                  tap: { scale: 0.98 }
                }}
                className="relative px-6 sm:px-8 py-3 sm:py-4 rounded-full w-full"
              >
                {/* Button Background */}
                <div className="absolute inset-0 bg-black border border-purple-500/50 group-hover:border-purple-400 rounded-full" />
                
                {/* Button Content */}
                <div className="relative flex items-center justify-center h-7 overflow-hidden">
                  <div className="flex items-center justify-center gap-3">
                    <Info className="w-6 h-6 text-purple-400 group-hover:text-white transition-colors duration-300" />
                    <span className="text-[17px] font-medium text-white whitespace-nowrap">
                      Check ROI in 3 Sec
                    </span>
                    <ArrowRight className="w-6 h-6 text-purple-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
              </motion.div>
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
        `}
      </style>
    </motion.section>
  );
};

export default HeroSection;
