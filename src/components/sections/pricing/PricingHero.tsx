import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { ChevronRight, Coins, CreditCard, Gem, Crown, Wallet, Sparkles, Star, PhoneCall, Calculator, CheckCircle, DollarSign, DollarSignIcon } from 'lucide-react';

interface PremiumButtonProps {
  icon: React.ElementType;
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

const PremiumButton: React.FC<PremiumButtonProps> = ({ 
  icon: Icon, 
  text, 
  onClick,
  variant = 'primary'
}) => {
  const colors = {
    primary: {
      glow: 'from-green-400/70 via-emerald-500/70 to-green-400/70',
      glowHover: 'from-green-400/100 via-emerald-500/100 to-green-400/100',
      border: 'border-green-400/50 group-hover:border-green-400',
      text: 'from-white via-green-200 to-white',
      icon: 'text-green-400 group-hover:text-white',
      line: 'via-green-400'
    },
    secondary: {
      glow: 'from-green-400/70 via-emerald-500/70 to-green-400/70',
      glowHover: 'from-green-400/100 via-emerald-500/100 to-green-400/100',
      border: 'border-green-400/50 group-hover:border-green-400',
      text: 'from-white via-green-200 to-white',
      icon: 'text-green-400 group-hover:text-white',
      particle: 'bg-green-400',
      line: 'via-green-400'
    }
  };

  return (
    <motion.button
      onClick={onClick}
      whileHover="hover"
      whileTap="tap"
      variants={{
        hover: { scale: 1.05 },
        tap: { scale: 0.95 }
      }}
      className="group relative rounded-full"
    >
      <div className="relative px-8 py-4 rounded-full">
        {/* Outer Glow */}
        <div className={`absolute inset-0 bg-gradient-to-r ${colors[variant].glow} blur-xl opacity-40 group-hover:opacity-100 transition-opacity duration-500 rounded-full`} />
        
        {/* Moving Particles */}
        

        {/* Button Background */}
        <div className={`absolute inset-0 bg-transparent border ${colors[variant].border} transition-colors duration-300 rounded-full`} />
        
        {/* Animated Border */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <motion.div
            className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent ${colors[variant].line} to-transparent`}
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
            className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent ${colors[variant].line} to-transparent`}
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

        {/* Content */}
        <div className="relative flex items-center gap-3">
          <div className="relative flex items-center gap-3">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#006400] group-hover:text-[#111] transition-colors duration-300" />
            <span className={`text-base sm:text-lg font-medium ${colors[variant].text}`}>
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
            <ChevronRight className={`w-5 h-5 sm:w-6 sm:h-6 text-[#00000] transition-colors duration-300`} />
          </motion.div>
        </div>
      </div>
    </motion.button>
  );
};

const PricingHero = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Use spring physics for smoother animations
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y = useTransform(smoothProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(smoothProgress, [0, 0.5, 0.8], [1, 1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [1, 0.98, 0.95]);

  // Background icons configuration with optimized animations
  const backgroundIcons = [
    { 
      Icon: Crown, 
      size: 96, 
      brightness: 0.4, 
      color: '#FFD700', 
      position: { top: '5%', left: '8%' }, 
      rotation: 15,
      delay: 0.2,
      floatRange: 30,
      duration: 8,
      scale: 1
    },
    { 
      Icon: Gem, 
      size: 84, 
      brightness: 0.5, 
      color: '#9F7AEA', 
      position: { top: '15%', right: '12%' }, 
      rotation: -20,
      delay: 0.3,
      floatRange: 25,
      duration: 7.5,
      scale: 0.9
    },
    { 
      Icon: Coins, 
      size: 64, 
      brightness: 0.95, 
      color: '#F6E05E', 
      position: { bottom: '30%', left: '20%' }, 
      rotation: 25,
      delay: 0.4,
      floatRange: 20,
      duration: 7,
      scale: 1
    },
    { 
      Icon: Wallet, 
      size: 48, 
      brightness: 0.85, 
      color: '#B794F4', 
      position: { bottom: '20%', right: '25%' }, 
      rotation: -15,
      delay: 0.5,
      floatRange: 15,
      duration: 6.5,
      scale: 1
    },
    { 
      Icon: DollarSignIcon, 
      size: 60, 
      brightness: 0.8, 
      color: '#FBD38D', 
      position: { top: '60%', left: '15%' }, 
      rotation: 30,
      delay: 0.6,
      floatRange: 20,
      duration: 7.5,
      scale: 1
    },
    {
      Icon: CreditCard,
      size: 72,
      brightness: 0.85,
      color: '#38BDF8',
      position: { top: '40%', right: '10%' },
      rotation: -10,
      delay: 0.7,
      floatRange: 18,
      duration: 8,
      scale: 1
    },
    {
      Icon: DollarSign,
      size: 60,
      brightness: 0.9,
      color: '#22C55E',
      position: { bottom: '10%', left: '35%' },
      rotation: 12,
      delay: 0.8,
      floatRange: 22,
      duration: 7.2,
      scale: 1
    }
  ];

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-theme-bg-primary py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{ opacity, scale }}
    >

      {/* Animated grid background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(var(--glow-primary), 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(var(--glow-primary), 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
        }}
      />

      {/* Floating sparkles */}
     
        
  

      {/* Background Icons with enhanced animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {backgroundIcons.map((item, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              ...item.position,
              zIndex: 10 - i,
            }}
            initial={{ 
              opacity: 0, 
              scale: 0,
              y: 50,
              rotate: item.rotation - 10,
            }}
            animate={{ 
              opacity: item.brightness,
              scale: item.scale,
              y: 0,
              rotate: item.rotation,
            }}
            transition={{
              duration: 1.2,
              delay: item.delay,
              ease: "easeOut",
            }}
          >
            <motion.div
              animate={{
                y: [-item.floatRange/2, item.floatRange/2, -item.floatRange/2],
                rotate: [item.rotation - 5, item.rotation + 5, item.rotation - 5],
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.5, 1]
              }}
              style={{
                filter: `brightness(${item.brightness}) drop-shadow(0 0 30px ${item.color}40)`,
              }}
            >
              <item.Icon 
                style={{ 
                  width: item.size,
                  height: item.size,
                  color: item.color,
                }}
              />
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background: `radial-gradient(circle at center, ${item.color}20 0%, transparent 70%)`,
                  filter: 'blur(10px)',
                }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Pre-title */}
          <motion.p
            className="text-lg md:text-xl tracking-wider uppercase font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="animate-gradient-text bg-gradient-to-r from-green-400 via-black to-green-400 bg-clip-text text-transparent bg-300% font-bold">
              Pricing That Makes Sense
            </span>
          </motion.p>

          {/* Main Title */}
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8"
            style={{ y }}
          >
            <span className="animate-gradient-text bg-gradient-to-r from-green-400 via-black to-green-400 bg-clip-text text-transparent bg-300% font-bold">
              Optimal Pricing
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-theme-text-secondary max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Get every high-impact feature that drives results
            <br className="hidden sm:block" />
            Not just fancy, over-techy stuff at a price that makes sense.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <PremiumButton 
              icon={CreditCard}
              text="View Plans"
              onClick={() => {
                document.getElementById('pricing-plans')?.scrollIntoView({ behavior: 'smooth' });
              }}
              variant="primary"
            />
            <PremiumButton 
              icon={Calculator}
              text="Calculate ROI"
              onClick={() => navigate('/roi')}
              variant="secondary"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default PricingHero;
