import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ year, title, description, index }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
    rootMargin: "-100px 0px"
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 0.8,
        delay: index * 0.3,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className="relative group"
    >
      {/* Timeline Line */}
      <div className="absolute left-0 sm:left-0 top-0 bottom-0 w-[2px] sm:w-[3px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A84FF]/50 via-[#0A84FF]/20 to-transparent" />
        
        {/* Animated Line */}
        <motion.div
          className="absolute top-0 w-full bg-[#0A84FF]"
          initial={{ height: "0%" }}
          animate={inView ? { height: "100%" } : { height: "0%" }}
          transition={{ 
            duration: 1.2,
            delay: index * 0.2,
            ease: "easeOut"
          }}
        >
          {/* Glowing Effect */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#0A84FF] via-[#0A84FF]/50 to-transparent"
            animate={{
              y: ["0%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
              delay: index * 0.2
            }}
          />
        </motion.div>
      </div>
      
      {/* Timeline Dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ 
          duration: 0.5,
          delay: index * 0.2,
          type: "spring",
          stiffness: 200,
          damping: 20
        }}
        className="absolute left-0 sm:left-0 top-0 w-4 h-4 sm:w-5 sm:h-5 -translate-x-1/2 rounded-full bg-[#0A84FF] border-2 border-[#0A84FF]/30 group-hover:scale-150 transition-transform duration-300"
      >
        <div className="absolute inset-0 rounded-full bg-[#0A84FF] animate-ping opacity-20" />
        <motion.div
          className="absolute inset-0 rounded-full bg-[#0A84FF]/20"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="pl-8 sm:pl-12 pb-16 sm:pb-20">
        {/* Year */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.3 }}
          className="inline-flex items-center space-x-2 mb-3 sm:mb-4"
        >
          <div className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-full bg-[#1C1C1E] border border-[#0A84FF]/20 backdrop-blur-xl group-hover:border-[#0A84FF]/40 transition-colors duration-300">
            <span className="text-sm sm:text-base text-[#0A84FF] font-medium tracking-wider"
              style={{ fontFamily: "SF Pro Text, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
              {year}
            </span>
          </div>
          <div className="h-px w-12 sm:w-24 bg-gradient-to-r from-[#0A84FF]/50 to-transparent" />
        </motion.div>

        {/* Title & Description Container */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.4 }}
          className="relative bg-[#1C1C1E]/40 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/5 group-hover:border-[#0A84FF]/20 transition-all duration-300"
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4 group-hover:text-[#0A84FF] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-base sm:text-lg text-[#86868B] font-light leading-relaxed group-hover:text-white/80 transition-colors duration-300"
            style={{ fontFamily: "SF Pro Text, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
            {description}
          </p>
          
          {/* Hover Glow Effect */}
          <motion.div
            className="absolute inset-0 -m-2 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(10,132,255,0.1) 0%, transparent 70%)'
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

const AboutTimeline: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0.3, 1, 1, 0.3]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [50, 0, 0, 50]
  );

  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  const timeline = [
    {
      year: "Aug 2024",
      title: "The Vision Takes Shape",
      description: "TopEdge was founded with a clear vision: to help businesses break free from mundane tasks through intelligent automation, allowing them to focus on what truly matters - innovation and growth.",
    },
    {
      year: "Nov 2024",
      title: "Building the Future",
      description: "Development of our core services and products begins, focusing on creating intelligent solutions that adapt to each business's unique needs and challenges.",
    },
    {
      year: "Jan 2025",
      title: "First Success Story",
      description: "Milestone achievement as we sign our first client and successfully integrate our automation services into their system, marking the beginning of our journey to transform businesses.",
    }
  ];

  return (
    <section 
      ref={containerRef} 
      className="relative py-16 sm:py-32 bg-black overflow-hidden" 
      id="timeline"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,132,255,0.05),transparent_50%)]" />
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 70% 30%, rgba(10, 132, 255, 0.08) 0%, transparent 60%)',
            y: useTransform(scrollYProgress, [0, 1], [0, 100])
          }}
          animate={sectionInView ? { opacity: [0, 1] } : { opacity: 0 }}
          transition={{ duration: 1 }}
        />
        
        {/* Animated Lines */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-[#0A84FF]/20 to-transparent"
              style={{ top: `${20 * (i + 1)}%` }}
              animate={sectionInView ? {
                x: ['-100%', '100%'],
                opacity: [0, 0.5, 0]
              } : {
                x: '-100%',
                opacity: 0
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                delay: i * 2,
                ease: 'linear'
              }}
            />
          ))}
        </div>
      </div>

      <motion.div
        ref={sectionRef}
        style={{ 
          opacity,
          y,
          transition: "0.8s"
        }}
        className="relative container mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-32"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-px w-8 sm:w-12 bg-[#0A84FF]/50" />
            <p className="text-[#0A84FF] text-base sm:text-lg font-medium tracking-wide px-3 sm:px-4">OUR JOURNEY</p>
            <div className="h-px w-8 sm:w-12 bg-[#0A84FF]/50" />
          </div>
          <h2 className="text-4xl sm:text-5xl sm:text-6xl font-semibold tracking-tight text-white mb-4 sm:mb-6 px-4 sm:px-0">
            Our Story So Far
          </h2>
          <p className="text-lg sm:text-xl text-[#86868B] max-w-3xl mx-auto font-light leading-relaxed px-4 sm:px-0"
            style={{ fontFamily: "SF Pro Text, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
            From vision to reality: Transforming the future of business automation
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {timeline.map((item, index) => (
            <TimelineItem
              key={item.year}
              year={item.year}
              title={item.title}
              description={item.description}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AboutTimeline;
