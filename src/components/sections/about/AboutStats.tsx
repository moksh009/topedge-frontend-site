import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import CountUp from 'react-countup';

interface StatCardProps {
  number: number;
  label: string;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ number, label, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, margin: "-100px" });

  const variants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.9,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        delay: index * 0.15
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative group"
    >
      <div className="relative">
        {/* Glass Card */}
        <div className="relative backdrop-blur-xl bg-gradient-to-br from-black/40 to-black/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/[0.08] overflow-hidden">
          {/* Animated Highlight */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            animate={{
              background: [
                "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 0% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)"
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Content */}
          <div className="relative z-10 text-center">
            <motion.div
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={isInView ? {
                scale: 1,
                opacity: 1,
                transition: {
                  type: "spring",
                  damping: 20,
                  stiffness: 100,
                  delay: index * 0.2
                }
              } : {
                scale: 0.5,
                opacity: 0
              }}
            >
              <span className="text-white">
                {isInView && (
                  <CountUp
                    end={number}
                    duration={2.5}
                    separator=","
                    useEasing={true}
                    start={number * 0.5}
                  />
                )}
                {label === "%" && "%"}
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? {
                opacity: 1,
                y: 0,
                transition: {
                  delay: index * 0.3,
                  duration: 0.5
                }
              } : {
                opacity: 0,
                y: 10
              }}
              className="text-lg text-white/60 font-light"
              style={{ fontFamily: "SF Pro Text, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              {label !== "%" && label}
            </motion.p>
          </div>

          {/* Animated Border */}
          <motion.div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
            }}
            animate={{
              x: ["100%", "-100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const AboutStats = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const stats = [
    { number: 20, label: "+ meetings" },
    { number: 100, label: "% Client satisfaction" },
    { number: 98.9, label: "% Accuracy Rate" },
    { number: 100, label: "% customization" }
  ];

  return (
    <section ref={containerRef} className="relative py-32 bg-black overflow-hidden">
      {/* Background Effects */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 70%)`,
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.8, 0])
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.02) 50%, transparent 100%)`,
          rotate: useTransform(scrollYProgress, [0, 1], [0, 360])
        }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-px w-12 bg-[#0A84FF]/50" />
            <p className="text-[#0A84FF] text-lg font-medium tracking-wide px-4">BY THE NUMBERS</p>
            <div className="h-px w-12 bg-[#0A84FF]/50" />
          </div>
          <h2 className="text-5xl sm:text-6xl font-semibold tracking-tight text-white mb-6">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-[#86868B] max-w-3xl mx-auto font-light leading-relaxed">
            Measurable results that demonstrate our commitment to excellence and innovation
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              number={stat.number}
              label={stat.label}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
