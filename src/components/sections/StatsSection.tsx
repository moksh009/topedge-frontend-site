import React, { useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


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

  const statNumberGradients = [
    'from-red-400 to-red-600',
    'from-purple-400 to-purple-600',
    'from-blue-400 to-blue-600',
    'from-yellow-400 to-yellow-500',
  ];

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
      className="relative min-h-[50vh] sm:min-h-[70vh] md:min-h-[80vh] py-8 sm:py-16 md:py-24 overflow-hidden bg-theme-bg-primary"
    >
      {/* Optimized Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-theme-glow-primary/10 via-theme-bg-primary to-theme-bg-primary" />

      </div>

      {/* Simplified gradient line */}
      {!isMobile && (
        <motion.div
          className="absolute w-full h-[1px] top-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-theme-glow-accent/50 to-transparent"
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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-theme-glow-primary to-theme-glow-accent">
              Transforming Numbers
            </span>
            <br />
            <span className="text-theme-text-primary">Into Impact</span>
          </motion.h2>
          <motion.div
            className="h-1 w-16 sm:w-24 mx-auto bg-gradient-to-r from-theme-glow-primary to-theme-glow-accent"
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
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-theme-bg-secondary/30 to-theme-bg-surface/20 border-[1.5px] border-theme-border-accent/20 p-4 sm:p-6 lg:p-8 backdrop-blur-xl transition-all duration-300 text-center h-full">
                {/* Premium Number Color */}
                <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r ${statNumberGradients[index]} bg-clip-text text-transparent mb-3 sm:mb-4 transition-all duration-300`}>{stat.value}</div>
                <h3 className="text-sm sm:text-base lg:text-xl font-semibold text-theme-text-primary mb-2 sm:mb-3">{stat.label}</h3>
                <p className="text-xs sm:text-sm lg:text-base text-theme-text-secondary/80">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default StatsSection;
