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
      glow: 'from-green-400/30 via-emerald-500/30 to-green-700/30',
      border: 'border-green-400/60 group-hover:border-green-600',
      icon: 'text-green-600 group-hover:text-green-700',
      text: 'text-green-700 group-hover:text-green-800',
      arrow: 'text-green-600 group-hover:text-green-800',
      bg: 'bg-white',
    },
    red: {
      glow: 'from-red-400/30 via-red-500/30 to-red-700/30',
      border: 'border-red-400/60 group-hover:border-red-600',
      icon: 'text-red-600 group-hover:text-red-700',
      text: 'text-red-700 group-hover:text-red-800',
      arrow: 'text-red-600 group-hover:text-red-800',
      bg: 'bg-white',
    },
    purple: {
      glow: 'from-purple-400/30 via-indigo-500/30 to-purple-900/30',
      border: 'border-purple-400/60 group-hover:border-purple-600',
      icon: 'text-purple-600 group-hover:text-purple-700',
      text: 'text-purple-700 group-hover:text-purple-800',
      arrow: 'text-purple-600 group-hover:text-purple-800',
      bg: 'bg-white',
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
    <div className="relative px-4 sm:px-8 py-3 sm:py-4 rounded-full">
      {/* Outer Glow */}
      <div className={`absolute inset-0 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 rounded-full bg-gradient-to-r ${colors.glow}`} />
      {/* Main Button Background */}
      <div className={`absolute inset-0 ${colors.bg} border ${colors.border} rounded-full`} />
      {/* Button Content */}
      <div className="relative flex items-center justify-center gap-2 sm:gap-3">
        <div className="relative flex items-center gap-2 sm:gap-3">
          <span className={`text-sm sm:text-base font-medium ${colors.text} transition-colors duration-300`}>
            {text}
          </span>
          <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${colors.icon} transition-colors duration-300`} />
        </div>
        {/* Only show the animated arrow if no icon is provided */}
        {Icon === undefined && (
          <motion.div
            animate={{
              x: [0, 5, 0],
              y: [0, -2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className={`${colors.arrow} transition-colors duration-300`}>→</span>
          </motion.div>
        )}
      </div>
    </div>
  </motion.button>
);
}
export default PremiumButton;
