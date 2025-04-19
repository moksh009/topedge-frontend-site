import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GlowingOrbs } from '../ui/GlowingOrbs';

export const StatsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = window.innerWidth < 768;

  const { ref, inView } = useInView({
    threshold: isMobile ? 0.1 : 0.2,
    triggerOnce: true,
    rootMargin: isMobile ? "-20px" : "-50px",
  });

  const stats = useMemo(() => [
    { value: "97%", label: "Accuracy Rate", description: "In AI-powered solutions" },
    { value: "24/7", label: "Availability", description: "Round-the-clock service" },
    { value: "0.1s", label: "Response Time", description: "Lightning-fast interactions" },
    { value: "Multi", label: "Languages", description: "Global communication" },
  ], []);

  // Optimized animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        duration: 0.2,
        ease: "easeOut"
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.2,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[50vh] sm:min-h-[70vh] md:min-h-[80vh] py-8 sm:py-16 md:py-24 overflow-hidden bg-black"
    >
      {/* Optimized Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
        {!isMobile && <GlowingOrbs count={3} intensity="medium" color="rgba(139,92,246,0.15)" />}
      </div>

      {/* Simplified gradient line */}
      {!isMobile && (
        <motion.div
          className="absolute w-full h-[1px] top-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}

      <motion.div
        ref={ref}
        className="relative container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Section Title - Optimized for mobile */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-4"
            variants={itemVariants}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Transforming Numbers
            </span>
            <br />
            <span className="text-white">Into Impact</span>
          </motion.h2>
          <motion.div
            className="h-1 w-16 sm:w-24 mx-auto bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Stats Grid - Mobile optimized */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/20 p-2 sm:p-4 lg:p-6 backdrop-blur-xl transition-all duration-200 hover:border-purple-500/40 text-center h-full">
                {!isMobile && (
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                )}
                
                <div className="relative z-10 flex flex-col items-center justify-center h-full py-2 sm:py-3">
                  <motion.div
                    className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-1 sm:mb-2"
                    variants={itemVariants}
                  >
                    {stat.value}
                  </motion.div>
                  <h3 className="text-xs sm:text-sm lg:text-xl font-semibold text-white mb-0.5 sm:mb-1">{stat.label}</h3>
                  <p className="text-[10px] sm:text-xs lg:text-base text-gray-400">{stat.description}</p>
                </div>

                {!isMobile && (
                  <div className="absolute -top-8 -right-8 w-24 h-24 sm:w-32 sm:h-32 bg-purple-500/5 rounded-full blur-xl group-hover:bg-purple-500/10 transition-all duration-200" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default StatsSection;
