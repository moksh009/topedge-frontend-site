import React from 'react';
import { motion } from 'framer-motion';

export const TimelineContent = ({
  children,
  as = 'div',
  animationNum,
  timelineRef,
  customVariants,
  className,
}: {
  children: React.ReactNode;
  as?: any;
  animationNum: number;
  timelineRef: React.RefObject<HTMLDivElement>;
  customVariants: any;
  className?: string;
}) => {
  const Component = (motion as any)[as] || motion.div;

  return (
    <Component
      variants={customVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={animationNum}
      className={className}
    >
      {children}
    </Component>
  );
};
