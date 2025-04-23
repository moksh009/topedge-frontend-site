import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building2, Users2, Bot, Brain, Cpu, TrendingUp, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface PremiumButtonProps {
  icon: LucideIcon;
  text: string;
  to: string;
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
      <div className="relative px-6 sm:px-8 py-4 rounded-full">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 via-blue-400/50 to-blue-500/50 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
        
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-500 rounded-full"
              animate={{
                x: [Math.random() * 200, Math.random() * -200, Math.random() * 200],
                y: [Math.random() * 100, Math.random() * -100, Math.random() * 100],
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

        <div className="absolute inset-0 bg-theme-bg-surface/80 backdrop-blur-sm border border-theme-border-primary group-hover:border-blue-400 transition-all duration-300 rounded-full" />
        
        <div className="relative flex items-center justify-center gap-3">
          <div className="flex items-center justify-center gap-3">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-theme-text-accent group-hover:text-theme-text-primary transition-colors duration-300" />
            <span className="text-base sm:text-lg font-medium text-theme-text-primary">
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
            <span className="text-blue-500 group-hover:text-theme-text-primary transition-colors duration-300">→</span>
          </motion.div>
        </div>
      </div>
    </motion.button>
  </Link>
);

const AboutHero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);



  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-theme-bg-primary py-16 sm:py-32"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(var(--theme-text-primary), 0.05) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Floating orbs removed, only grid and icons remain */}

        <div className="absolute inset-0 pointer-events-none">
          {[
            { Icon: Bot, color: 'text-blue-500/30', delay: 0, top: '20%', left: '15%' },
            { Icon: Brain, color: 'text-yellow-400/30', delay: 1, top: '40%', left: '70%' },
            { Icon: Cpu, color: 'text-purple-500/30', delay: 0, top: '85%', left: '30%' },
            { Icon: TrendingUp, color: 'text-emerald-500/30', delay: 1, top: '55%', left: '80%' },
            { Icon: Zap, color: 'text-rose-500/30', delay: 0, top: '75%', left: '55%' },
            { Icon: Building2, color: 'text-rose-500/30', delay: 0, top: '45%', left: '15%' },
            { Icon: Users2, color: 'text-purple-500/30', delay: 1, top: '15%', left: '85%' }
          ].map(({ Icon, color, delay, top, left }, index) => (
            <motion.div
              key={index}
              className={`absolute ${color}`}
              style={{ top, left }}
              animate={{
                y: [-20, 20, -20],
                rotate: [0, 360, 0]
              }}
              transition={{
                delay: delay,
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Icon className="w-12 h-12" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative container mx-auto px-4 z-10">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Pre-title */}
          <motion.p
            className="text-lg md:text-xl tracking-[0.6em] uppercase font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="animate-gradient-text bg-gradient-to-r from-theme-glow-primary via-theme-glow-accent to-theme-glow-primary bg-clip-text text-transparent bg-300% font-medium">
              Welcome to TopEdge
            </span>
          </motion.p>

          {/* Main Title */}
          <motion.h1 
            className="text-7xl sm:text-8xl md:text-9xl font-bold tracking-tight mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="animate-gradient-text bg-gradient-to-r from-blue-600 via-black to-blue-600 bg-clip-text text-transparent bg-300% font-bold">
              Our Story
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            className="text-2xl sm:text-3xl md:text-4xl font-light max-w-4xl mx-auto leading-relaxed mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <span className="animate-gradient-text bg-gradient-to-r from-blue-600 via-black to-blue-600 bg-clip-text text-transparent bg-300% font-light">
              Building the future of business automation <br/>with Practical AI solutions.
            </span>
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <PremiumButton 
              icon={Building2} 
              text="Get Started" 
              to="/contact"
            />
            <PremiumButton 
              icon={Users2} 
              text="Innovate My Business" 
              to="/services"
            />
          </motion.div>
        </motion.div>
      </div>

      <style>
        {`
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

export default AboutHero;
