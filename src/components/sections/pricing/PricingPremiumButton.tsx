import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import React from 'react';

interface PremiumButtonProps {
  icon: LucideIcon;
  text: string;
  onClick?: () => void;
  isPricingPage?: boolean;
  disabled?: boolean;
  variant?: 'green' | 'red' | 'purple';
  type?: 'button' | 'submit' | 'reset';
}

const PremiumButton: React.FC<PremiumButtonProps> = ({
  icon: Icon,
  text,
  onClick,
  isPricingPage = true,
  disabled = false,
  variant = 'green',
  type = 'button',
}) => {
  // Color maps for different variants
  const colorMap = {
    green: {
      glow: 'from-blue-400/30 via-indigo-500/30 to-blue-700/30',
      border: 'border-blue-500/30 group-hover:border-blue-400',
      icon: 'text-blue-400 group-hover:text-white',
      text: 'text-blue-100 group-hover:text-white',
      arrow: 'text-blue-400 group-hover:text-white',
      bg: 'bg-indigo-600/10 backdrop-blur-md',
    },
    red: {
      glow: 'from-rose-400/30 via-red-500/30 to-rose-700/30',
      border: 'border-red-500/30 group-hover:border-red-400',
      icon: 'text-red-400 group-hover:text-white',
      text: 'text-red-100 group-hover:text-white',
      arrow: 'text-red-400 group-hover:text-white',
      bg: 'bg-red-600/10 backdrop-blur-md',
    },
    purple: {
      glow: 'from-indigo-400/30 via-purple-500/30 to-indigo-900/30',
      border: 'border-indigo-500/30 group-hover:border-indigo-400',
      icon: 'text-indigo-400 group-hover:text-white',
      text: 'text-indigo-100 group-hover:text-white',
      arrow: 'text-indigo-400 group-hover:text-white',
      bg: 'bg-indigo-600/10 backdrop-blur-md',
    },
  };
  const colors = colorMap[variant];

  return (
    <motion.button
      whileHover={disabled ? undefined : "hover"}
      whileTap={disabled ? undefined : "tap"}
      variants={{
        hover: { scale: 1.05 },
        tap: { scale: 0.95 },
      }}
      onClick={disabled ? undefined : onClick}
      aria-disabled={disabled}
      disabled={disabled}
      className={`group relative rounded-full w-full sm:w-auto ${disabled ? 'opacity-60 pointer-events-none' : ''}`}
      type={type}
    >
      <div className="relative px-6 sm:px-10 py-3 sm:py-4 rounded-full overflow-hidden">
        {/* Outer Glow */}
        <div className={`absolute inset-0 blur-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-500 rounded-full bg-gradient-to-r ${colors.glow}`} />

        {/* Main Button Background */}
        <div className={`absolute inset-0 ${colors.bg} border ${colors.border} rounded-full transition-all duration-300 group-hover:bg-indigo-600/20`} />

        {/* Animated Shine */}
        <motion.div
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
          animate={{
            translateX: ['-100%', '200%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 2
          }}
        />

        {/* Button Content */}
        <div className="relative flex items-center justify-center gap-3">
          <span className={`text-sm sm:text-base font-bold ${colors.text} transition-colors duration-300 tracking-wide uppercase`}>
            {text}
          </span>
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${colors.icon} transition-colors duration-300`} />
        </div>
      </div>
    </motion.button>
  );
}
export default PremiumButton;
