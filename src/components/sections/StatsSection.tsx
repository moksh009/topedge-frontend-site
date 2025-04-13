import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GlowingOrbs } from '../ui/GlowingOrbs';

export const StatsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
    rootMargin: "-100px",
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const stats = [
    { value: "97%", label: "Accuracy Rate", description: "In AI-powered solutions" },
    { value: "24/7", label: "Availability", description: "Round-the-clock service" },
    { value: "0.1s", label: "Response Time", description: "Lightning-fast interactions" },
    { value: "50+", label: "Languages", description: "Global communication" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[80vh] py-24 overflow-hidden bg-black"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
        <GlowingOrbs count={5} intensity="medium" color="rgba(139,92,246,0.15)" />
      </div>

      {/* Animated gradient lines */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
          style={{ top: "30%" }}
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-purple-500/50 to-transparent"
          style={{ left: "30%" }}
          animate={{
            y: ["-100%", "100%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <motion.div
        ref={ref}
        className="relative container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{ opacity, y }}
      >
        {/* Section Title */}
        <div className="text-center mb-20">
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Transforming Numbers
            </span>
            <br />
            <span className="text-white">Into Impact</span>
          </motion.h2>
          <motion.div
            className="h-1 w-24 mx-auto bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/20 p-8 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/40 text-center">
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">
                  <motion.div
                    className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2 text-center">{stat.label}</h3>
                  <p className="text-gray-400 text-center">{stat.description}</p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default StatsSection;
