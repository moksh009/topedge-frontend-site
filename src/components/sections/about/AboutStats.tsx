import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { Trophy, TrendingUp, Shield } from 'lucide-react';

interface StatCardProps {
  number: number;
  label: string;
  index: number;
  prefix?: string;
  suffix?: string;
}

const numberGradients = [
  'from-blue-500 via-blue-400 to-cyan-400',    // 1st stat
  'from-purple-500 via-pink-400 to-rose-400', // 2nd stat
  'from-emerald-400 via-green-400 to-teal-300', // 3rd stat
  'from-yellow-400 via-orange-400 to-pink-400', // 4th stat
];

const StatCard: React.FC<StatCardProps> = ({ number, label, index, prefix, suffix }) => {
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
        {/* Premium Glass Card with rounded border */}
        <div className="relative backdrop-blur-xl bg-gradient-to-br from-theme-bg-surface/60 to-theme-bg-surface/20 rounded-3xl p-8 border-2 border-blue-400/30 shadow-xl hover:shadow-2xl transition-all duration-500">
          {/* Animated Highlight */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            animate={{
              background: [
                "radial-gradient(circle at 0% 0%, rgba(var(--text-primary), 0.05) 0%, transparent 50%)",
                "radial-gradient(circle at 100% 100%, rgba(var(--text-primary), 0.05) 0%, transparent 50%)",
                "radial-gradient(circle at 0% 0%, rgba(var(--text-primary), 0.05) 0%, transparent 50%)"
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
              className={`text-4xl sm:text-5xl lg:text-6xl font-semibold mb-4 flex items-center justify-center gap-1 bg-gradient-to-r ${numberGradients[index]} bg-clip-text text-transparent`}
            >
              <span className="text-theme-text-primary/50">{prefix}</span>
              <span>
                {suffix && suffix === "$" && suffix}
                {isInView && (
                  <CountUp
                    end={number}
                    duration={1.5}
                    separator="," 
                    decimals={label.includes("Success") ? 1 : 0}
                    useEasing={true}
                    start={number * 0.7}
                  />
                )}
                {suffix && suffix !== "$" && suffix}
              </span>
            </motion.div>
            <div className="text-base sm:text-lg text-theme-text-secondary font-medium">{label}</div>
          </div>
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
    { 
      number: 85, 
      label: "Revenue Saved",
      prefix:"$",
      suffix: "k"
    },
    { 
      number: 100, 
      label: "Success Rate",
      suffix: "%"
    },
    { 
      number: 99, 
      label: "uptime",
      suffix: "%"
    },
    { 
      number: 75, 
      label: "Cost Reduction",
      suffix: "%"
    }
  ];

  return (
    <section ref={containerRef} className="relative py-32 bg-theme-bg-primary overflow-hidden">
      {/* Background Effects */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(var(--text-primary), 0.05) 0%, transparent 70%)`,
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 0.5]),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.8, 0])
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(45deg, transparent 0%, rgba(var(--text-primary), 0.02) 50%, transparent 100%)`,
          rotate: useTransform(scrollYProgress, [0, 1], [0, 360])
        }}
      />
      {/* Add floating icons as background decorations for stats section */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute left-10 top-10 text-blue-400/20"
          animate={{ y: [-15, 15, -15], rotate: [0, 360, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <Trophy className="w-20 h-20" />
        </motion.div>
        <motion.div
          className="absolute right-10 bottom-10 text-yellow-400/20"
          animate={{ y: [10, -10, 10], rotate: [0, -360, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <TrendingUp className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute left-1/2 top-1/4 text-emerald-400/20"
          animate={{ x: [-10, 10, -10], rotate: [0, 180, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          <Shield className="w-16 h-16" />
        </motion.div>
      </div>
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
            <div className="h-px w-12 bg-theme-glow-primary/50" />
            <p className="text-theme-text-accent text-lg font-medium tracking-wide px-4">BY THE NUMBERS</p>
            <div className="h-px w-12 bg-theme-glow-primary/50" />
          </div>
          <h2 className="text-5xl sm:text-6xl font-semibold tracking-tight text-theme-text-primary mb-6">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-theme-text-secondary max-w-3xl mx-auto font-light leading-relaxed">
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
              prefix={stat.prefix}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
