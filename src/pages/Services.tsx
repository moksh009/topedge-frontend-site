import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, Bot, Cpu, Brain, Sparkles, MessageSquare } from 'lucide-react';
import { ServiceProcess } from '../components/sections/services/ServiceProcess';
import ChatbotShowcase from '../components/sections/services/ChatbotShowcase';
import { AIAgentInteraction } from '../components/sections/services/AIAgentInteraction';
import { ServiceCTA } from '../components/sections/services/ServiceCTA';
import { ChatbotProcess } from '../components/sections/services/ChatbotProcess';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { LucideIcon } from 'lucide-react';

interface PremiumButtonProps {
  icon: LucideIcon;
  text: string;
  to: string;
  gradient?: string;
}

const PremiumButton: React.FC<PremiumButtonProps> = ({ 
  icon: Icon, 
  text, 
  to 
}) => (
  <Link to={to} className="w-full sm:w-auto">
    <motion.button
      whileHover="hover"
      whileTap="tap"
      variants={{
        hover: { scale: 1.05 },
        tap: { scale: 0.95 }
      }}
      className="group relative rounded-full w-full"
    >
      {/* Button Container */}
      <div className="relative px-6 sm:px-8 py-4 rounded-full w-full">
        {/* Outer Glow */}
        <div className="absolute inset-0 bg-[#7A0BC0]/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
        
        {/* Moving Particles Background */}
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-[#7A0BC0] rounded-full"
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
        <div className="absolute inset-0 bg-black border border-[#7A0BC0]/50 group-hover:border-[#7A0BC0] rounded-full" />
        
        {/* Animated Border Lines */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#7A0BC0] to-transparent"
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
            className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#7A0BC0] to-transparent"
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
        <div className="relative flex items-center justify-center gap-3">
          <div className="flex items-center justify-center gap-3">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-colors duration-300" />
            <span className="text-base sm:text-lg font-medium text-white transition-colors duration-300">
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
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            <span className="text-white transition-colors duration-300">→</span>
          </motion.div>
        </div>
      </div>
    </motion.button>
  </Link>
);

const Services: React.FC = () => {
  const containerRef = useRef(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 30]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const floatingIconProps = {
    animate: {
      y: [-10, 10],
      rotate: [0, 10],
      scale: [1, 1.05],
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeInOut"
    }
  };

  return (
    <div className="bg-black text-white font-sans overflow-x-hidden w-full relative">
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative min-h-screen flex items-center justify-center overflow-hidden w-full" 
        ref={containerRef}
        style={{
          marginTop: '0px',
          paddingTop: '64px'
        }}
      >
        {/* Simplified Background */}
        <div className="absolute inset-0 w-full">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-violet-950/5 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/10 via-transparent to-transparent" />
          
          {/* Reduced number of particles for better performance */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-violet-400 to-indigo-400 rounded-full"
                animate={{
                  y: [Math.random() * 500, -10],
                  opacity: [0, 0.5, 0],
                  scale: [0, 1, 0]
                }}
                transition={{
                  duration: Math.random() * 2 + 2,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                  delay: Math.random() * 2
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
              />
            ))}
          </div>

          {/* Optimized gradient animations */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[100px]"
            animate={{
              scale: [1, 1.1],
              opacity: [0.2, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px]"
            animate={{
              scale: [1.1, 1],
              opacity: [0.2, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        {/* Optimized floating icons */}
        {[
          { Icon: Bot, className: "absolute left-10 top-1/4 text-purple-500/20" },
          { Icon: Cpu, className: "absolute right-10 top-1/3 text-fuchsia-500/20" },
          { Icon: Database, className: "absolute middle top-1/4 text-yellow-500/20" },
          { Icon: Brain, className: "absolute left-1/4 bottom-1/4 text-blue-500/20" },
          { Icon: MessageSquare, className: "absolute right-1/4 top-1/3 text-purple-500/20" },
          { Icon: Sparkles, className: "absolute left-1/3 top-1/4 text-fuchsia-500/20" }
        ].map(({ Icon, className }, index) => (
          <motion.div
            key={index}
            className={className}
            {...floatingIconProps}
          >
            <Icon className="w-12 h-12 md:w-16 md:h-16" />
          </motion.div>
        ))}

        {/* Content with optimized animations */}
        <motion.div 
          variants={itemVariants}
          className="relative container mx-auto px-4 z-10 w-full"
          ref={ref}
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0.8]),
            y: useTransform(scrollYProgress, [0, 1], [0, 30]),
          }}
        >
          <motion.div
            variants={itemVariants}
            className="max-w-7xl mx-auto text-center w-full"
          >
            <motion.div
              variants={itemVariants}
              className="space-y-8"
            >
              {/* Enhanced Title */}
              <div className="space-y-2 pt-0 sm:pt-1">
                <motion.p
                  variants={itemVariants}
                  className="text-[#4D07E3] text-base md:text-lg tracking-[0.6em] uppercase font-medium bg-clip-text text-white -mt-16 sm:mt-0"
                  style={{
                    textShadow: "0 0 20px rgba(122, 11, 192, 0.5)"
                  }}
                >
                  Welcome to TopEdge
                </motion.p>
                <motion.h1 
                  variants={itemVariants}
                  className="text-7xl sm:text-8xl md:text-9xl 2xl:text-[12rem] font-bold tracking-tight mt-1"
                  style={{ 
                    fontFamily: "'SF Pro Display', system-ui, sans-serif",
                    fontVariationSettings: '"wght" 800',
                    lineHeight: "0.9"
                  }}
                >
                  <motion.span 
                    className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-white via-[#7A0BC0] to-white"
                    animate={{
                      backgroundPosition: ['0% center', '100% center', '0% center'],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{
                      textShadow: "0 0 40px rgba(255, 255, 255, 0.2)"
                    }}
                  >
                    Our Services
                  </motion.span>
                </motion.h1>
              </div>
              
              {/* Enhanced Description */}
              <motion.div 
                variants={itemVariants}
                className="space-y-2 mt-2 mb-8"
              >
                <motion.p 
                  variants={itemVariants}
                  className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl text-white/90 font-light max-w-4xl mx-auto leading-relaxed px-4"
                  style={{ 
                    fontFamily: "'SF Pro Text', system-ui, sans-serif",
                    fontVariationSettings: '"wght" 300',
                    background: "linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.75))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Unlock the power of AI with innovative solutions designed for efficiency, automation, and growth.
                </motion.p>
              </motion.div>

              {/* Enhanced CTA Buttons */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-6 justify-center items-center px-4 sm:px-0"
              >
                <PremiumButton 
                  icon={Bot} 
                  text="AI Caller" 
                  to="#ai-agent-interaction"
                />
                <PremiumButton 
                  icon={MessageSquare} 
                  text="Chatbot" 
                  to="#chatbot-showcase"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Optimized scroll animations for sections */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ 
          opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0.9, 0.8]),
          y: useTransform(scrollYProgress, [0, 1], [0, 30]),
          scale: useTransform(scrollYProgress, [0, 1], [1, 0.99])
        }}
        className="w-full overflow-x-hidden"
      >
        <ServiceProcess />
        <AIAgentInteraction />
        <ChatbotShowcase />
        <ChatbotProcess/>
        <ServiceCTA />
      </motion.div>
    </div>
  );
};

export default Services;
