import React from 'react';
import { motion } from 'framer-motion';

interface GlowingOrbsProps {
  count?: number;
  intensity?: 'low' | 'medium' | 'high';
  color?: string;
}

export const GlowingOrbs: React.FC<GlowingOrbsProps> = ({
  count = 4,
  intensity = 'low',
  color = 'white'
}) => {
  const getOpacity = () => {
    switch (intensity) {
      case 'high': return { base: 0.15, hover: 0.25 };
      case 'medium': return { base: 0.1, hover: 0.2 };
      case 'low': return { base: 0.05, hover: 0.15 };
    }
  };

  const opacities = getOpacity();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 300 + 100,
            height: Math.random() * 300 + 100,
            background: `radial-gradient(circle at center, ${color}/${opacities.base} 0%, transparent 70%)`,
            filter: 'blur(40px)',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 50 - 25, 0],
            scale: [1, 1.2, 1],
            opacity: [opacities.base, opacities.hover, opacities.base],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};
