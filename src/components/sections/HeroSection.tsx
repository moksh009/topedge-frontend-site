import { useRef, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Rocket, Info } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';
import '../../styles/animations.css';
import '../../styles/breathe.css';
import { Bot, Brain, Cpu, TrendingUp, Zap } from 'lucide-react';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Optimize scroll handling
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  // Use lighter spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 15,
    restDelta: 0.001
  });

  // Reduce transform calculations
  const sectionScale = useTransform(smoothProgress, [0, 0.5], [1, 0.98]);
  const sectionOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0.5]);

  // Optimize floating orbs by reducing count and animation complexity
  const floatingOrbs = useMemo(() => {
    return [...Array(8)].map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      scale: Math.random() * 0.5 + 0.5,
      duration: Math.random() * 5 + 15
    }));
  }, []);

  // Reduced transform range
  const x1 = useTransform(smoothProgress, [0, 0.4], ["0%", "-15%"]);
  const x2 = useTransform(smoothProgress, [0, 0.4], ["0%", "15%"]);

  // Optimize background animations
  const bgOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0.5]);

  // Simplified variants with reduced animation properties
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  // Add new scroll-triggered animation for wizard
  const wizardRef = useRef<HTMLDivElement>(null);
  const wizardScrollProgress = useScroll({
    target: wizardRef,
    offset: ["start end", "end end"]
  }).scrollYProgress;

  const wizardOpacity = useTransform(wizardScrollProgress, 
    [0, 0.2], 
    [0, 1]
  );
  const wizardY = useTransform(wizardScrollProgress, 
    [0, 0.2], 
    ["100px", "0px"]
  );
  const wizardX = useTransform(wizardScrollProgress, 
    [0, 0.2], 
    ["-50px", "0px"]
  );

  return (
    <motion.section 
      ref={sectionRef} 
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden font-sf-pro-display will-change-transform"
      style={{
        scale: sectionScale,
        opacity: sectionOpacity
      }}
    >
      {/* Optimized Background Effects */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.95), rgba(0,0,0,0.98))',
          willChange: 'transform'
        }}
      >
        {/* Optimized breathing circle */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] will-change-transform"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.15, 0.18, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-white/2"
            style={{ filter: 'blur(50px)' }}
          />
        </motion.div>

        {/* Optimized floating orbs */}
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
                y: [orb.y, orb.y + 50, orb.y],
                opacity: [0.1, 0.15, 0.1],
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

        {/* Optimized particles - reduced count */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-white/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(0.5px)',
            }}
            animate={{
              y: [0, -60],
              opacity: [0.2, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-300/40 rounded-full"
              animate={{
                y: [Math.random() * 1000, -10],
                opacity: [0, 1, 0],
                scale: [0, 2, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                delay: Math.random() * 2
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

      {/* Wizard and Message UI */}
      <motion.div
        ref={wizardRef}
        className="absolute bottom-8 left-8 flex items-start gap-4 z-50"
        initial={{ opacity: 0, y: 100, x: -50 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 3 // This delay matches the sound timing
        }}
      >
        {/* Wizard Image with Subtle Glow */}
        <motion.div
          className="relative w-52 h-52"
          initial={{ rotate: 8, opacity: 0 }}
          animate={{
            rotate: [2, 9, 5],
            scale: [1, 1.02, 1],
            opacity: 1
          }}
          transition={{
            rotate: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4
            },
            scale: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5
            },
            opacity: {
              duration: 1,
              delay: 4
            }
          }}
        >
          {/* Refined glow effect */}
          <div className="absolute inset-[10%] -z-10">
            {/* Main glow */}
            <motion.div
              className="absolute inset-0 rounded-full bg-purple-500/15"
              animate={{
                scale: [0.95, 1.05, 0.95],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                filter: 'blur(20px)',
              }}
            />
            
            {/* Subtle accent glow */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at 30% 30%, rgba(167, 139, 250, 0.25), transparent 70%)',
                filter: 'blur(15px)',
              }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Subtle moving highlight */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(circle at 0% 0%, rgba(167, 139, 250, 0.2) 0%, transparent 50%)',
                  'radial-gradient(circle at 60% 60%, rgba(167, 139, 250, 0.2) 0%, transparent 50%)',
                  'radial-gradient(circle at 0% 0%, rgba(167, 139, 250, 0.2) 0%, transparent 50%)',
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                filter: 'blur(15px)',
              }}
            />
          </div>

          <img 
            src="/wizard.png" 
            alt="AI Wizard" 
            className="w-full h-full object-contain relative z-10"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(139,92,246,0.2))',
            }}
          />
        </motion.div>

        {/* Animated Dots and Message */}
        <div className="relative -ml-2">
          {/* First Dot */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 4.5 }}
            className="absolute -left-5 top-24 w-2 h-2 bg-purple-400 rounded-full"
          />

          {/* Second Dot */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 4.9 }}
            className="absolute left-0 top-28 w-3 h-3 bg-purple-400 rounded-full"
          />

          {/* Message Container */}
          <motion.div
            className="relative mt-20 ml-6"
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 5.5
            }}
          >
            <div className="relative overflow-hidden rounded-2xl">
              {/* Glass Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-purple-800/30 backdrop-blur-md" />
              
              {/* Animated Gradient Background */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    'linear-gradient(45deg, rgba(147,51,234,0.3) 0%, rgba(79,70,229,0.3) 100%)',
                    'linear-gradient(45deg, rgba(79,70,229,0.3) 0%, rgba(147,51,234,0.3) 100%)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                }}
              />

              {/* Content Container */}
              <div className="relative px-6 py-4 bg-black/20">
                {/* Glow Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                
                <motion.p
                  className="text-sm font-medium leading-relaxed"
                  style={{
                    background: 'linear-gradient(to right, #fff, #e0e0ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  72% of customers choose another business <br/>if their call or inquiry goes unanswered <br/>
                  You can't count how many opportunities <br/>you've lost—because you don't even know.
                </motion.p>
              </div>

              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                  background: [
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
                    'linear-gradient(90deg, transparent 100%, rgba(255,255,255,0.08) 150%, transparent 200%)',
                  ],
                  left: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>
        </div>
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
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 md:mb-12 relative z-10"
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
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center"
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
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-center"
                  style={{
                    background: 'linear-gradient(to right, #FFFFFF 20%, #8B5CF6 50%, #FFFFFF 80%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'shine 8s linear infinite',
                  }}
                >
                    <span>Recover upto $10k in Lost Revenue</span>
                    <span style={{ WebkitTextFillColor: 'initial' }}>💰</span>
                    
                </motion.span>
              </div>
            </motion.div>
          </motion.h1>

          {/* Description with tech animation */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-[1200px] mx-auto leading-relaxed mb-6 sm:mb-8 md:mb-12 whitespace-nowrap overflow-x-auto hide-scrollbar"
            style={{
              textShadow: '0 0 20px rgba(255,255,255,0.2)',
            }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="relative z-10 text-white/100 flex items-center justify-center"
            >
              Just by Fixing Missed Calls, Late Customer Response, No-Shows, & Slow Follow-Ups.
            </motion.span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center"
          >
            {/* First Button - See how AI works */}
            <Link to="/services">
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={{
                  hover: { scale: 1.05 },
                  tap: { scale: 0.95 }
                }}
                className="group relative rounded-full"
              >
                {/* Button Container */}
                <div className="relative px-8 py-4 rounded-full">
                  {/* Outer Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-fuchsia-500/30 to-purple-600/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                  
                  {/* Moving Particles Background */}
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-purple-400 rounded-full"
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
                  <div className="absolute inset-0 bg-black border border-purple-500/50 group-hover:border-purple-400 rounded-full" />
                  
                  {/* Animated Border Lines */}
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                      animate={{
                        x: [-100, 100, -100],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent"
                      animate={{
                        x: [100, -100, 100],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </div>

                  {/* Button Content */}
                  <div className="relative flex items-center gap-3">
                    <div className="relative flex items-center">
                      <div className="flex items-center gap-2">
                        <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 group-hover:text-white transition-colors duration-300" />
                        <span className="text-base sm:text-lg font-medium bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                          See how AI works
                        </span>
                      </div>
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                        animate={{
                          scaleX: [0, 1, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
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
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 group-hover:text-white transition-colors duration-300" />
                    </motion.div>
                  </div>
                </div>
              </motion.button>
            </Link>

            {/* Second Button - Explore Services */}
            <Link to="/book-appointment">
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={{
                  hover: { scale: 1.05 },
                  tap: { scale: 0.95 }
                }}
                className="group relative rounded-full"
              >
                {/* Button Container */}
                <div className="relative px-8 py-4">
                  {/* Outer Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-fuchsia-500/30 to-purple-600/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                  
                  {/* Moving Particles Background */}
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-purple-400 rounded-full"
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
                  <div className="absolute inset-0 bg-black border border-purple-500/50 group-hover:border-purple-400 rounded-full" />
                  
                  {/* Animated Border Lines */}
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                      animate={{
                        x: [-100, 100, -100],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent"
                      animate={{
                        x: [100, -100, 100],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </div>

                  {/* Button Content */}
                  <div className="relative flex items-center gap-3">
                    <div className="relative flex items-center">
                      <div className="flex items-center gap-2">
                        <Info className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 group-hover:text-white transition-colors duration-300" />
                        <span className="text-base sm:text-lg font-medium bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                          I Want Save Opportunities
                        </span>
                      </div>
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                        animate={{
                          scaleX: [0, 1, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
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
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 group-hover:text-white transition-colors duration-300" />
                    </motion.div>
                  </div>
                </div>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Add this CSS to your global styles or component styles */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.section>
  );
};

export default HeroSection;
