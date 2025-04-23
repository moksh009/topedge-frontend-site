import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calculator, ArrowRight, LucideIcon, BarChart2, DollarSign } from 'lucide-react';
import React from 'react';

interface PremiumButtonProps {
  icon: LucideIcon;
  text: string;
  onClick?: () => void;
}

const PremiumButton: React.FC<PremiumButtonProps & { isPricingPage?: boolean }> = ({ 
  icon: Icon, 
  text, 
  onClick,
  isPricingPage = false
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
      {/* Outer Glow */}
      <div className={isPricingPage
        ? "absolute inset-0 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 rounded-full bg-gradient-to-r from-green-400/30 via-emerald-500/30 to-green-700/30"
        : "absolute inset-0 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 rounded-full bg-gradient-to-r from-theme-glow-primary/30 via-theme-glow-secondary/30 to-theme-glow-primary/30"
      } />
      
     

      {/* Main Button Background */}
      <div className={isPricingPage
        ? "absolute inset-0 bg-white border border-green-400/60 group-hover:border-green-600 rounded-full"
        : "absolute inset-0 bg-theme-bg-surface border border-theme-border-accent/50 group-hover:border-theme-border-accent rounded-full"
      } />
      
      {/* Button Content */}
      <div className="relative flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
        <div className="relative flex items-center gap-2 sm:gap-3">
          <Icon className={isPricingPage
            ? "w-4 h-4 sm:w-5 sm:h-5 text-green-600 group-hover:text-green-700 transition-colors duration-300"
            : "w-4 h-4 sm:w-5 sm:h-5 text-theme-text-accent group-hover:text-theme-text-primary transition-colors duration-300"
          } />
          <span className={isPricingPage
            ? "text-sm sm:text-base font-medium text-green-700 group-hover:text-green-800 transition-colors duration-300"
            : "text-sm sm:text-base font-medium bg-gradient-to-r from-theme-text-primary via-theme-text-accent to-theme-text-primary bg-clip-text text-transparent"
          }>
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
          <span className={isPricingPage ? "text-green-600 group-hover:text-green-800 transition-colors duration-300" : "text-theme-text-accent group-hover:text-theme-text-primary transition-colors duration-300"}>→</span>
        </motion.div>
      </div>
    </div>
  </motion.button>
);

interface ROICalculatorProps {
  isPricingPage?: boolean;
}

const ROICalculator = ({ isPricingPage = false }: ROICalculatorProps) => {
  const navigate = useNavigate();

  return (
    <motion.section
      id="roi-calculator"
      className="relative py-16 sm:py-24 md:py-32 overflow-hidden bg-theme-bg-primary"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute left-10 top-20 text-blue-400/50"
          animate={{ y: [-15, 15, -15], rotate: [0, 360, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
        >
          <Calculator className="w-20 h-20" />
        </motion.div>
        <motion.div
          className="absolute right-40 bottom-40 text-yellow-400/50"
          animate={{ y: [10, -10, 10], rotate: [0, -360, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
        >
          <BarChart2 className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute left-1/2 top-80 text-emerald-400/50"
          animate={{ x: [-10, 10, -10], rotate: [0, 180, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <DollarSign className="w-16 h-16" />
        </motion.div>
      </div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-gradient-to-b from-theme-bg-primary via-theme-bg-accent/5 to-theme-bg-primary" />
        <motion.div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at 50% 50%, var(--glow-primary) 0%, transparent 50%)"
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white/5 px-6 py-3 relative overflow-hidden"
          >
            {/* Premium border design */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-theme-glow-primary/20 via-theme-glow-accent/20 to-theme-glow-secondary/20 animate-gradient-xy" />
              <div className="absolute inset-0 backdrop-blur-xl" />
              <div className="absolute inset-0 border-[1.5px] border-white/10 rounded-full" />
              <div className="absolute inset-0 bg-white/5" />
            </div>

            {/* Content */}
            <Calculator className={isPricingPage ? "relative w-4 sm:w-5 h-4 sm:h-5 text-green-500" : "relative w-4 sm:w-5 h-4 sm:h-5 text-blue-400"} />
            <span className="relative text-sm font-medium text-black/90">ROI Calculator</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 px-4"
          >
            <span className={isPricingPage
              ? "bg-gradient-to-r from-green-500 via-black to-green-700 bg-clip-text text-transparent leading-tight"
              : "bg-gradient-to-r from-theme-text-primary via-theme-text-accent to-theme-text-primary bg-clip-text text-transparent leading-tight"
            }>
              Calculate Your Growth
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-theme-text-secondary max-w-3xl mx-auto mb-8 sm:mb-12 px-4"
          >
            Get a personalized analysis of how AI can transform your business metrics and accelerate growth
          </motion.p>

          <PremiumButton 
            icon={Calculator}
            text="Calculate Your ROI Now"
            onClick={() => navigate('/roi')}
            isPricingPage={isPricingPage}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default ROICalculator;