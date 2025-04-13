import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

interface ValueCardProps {
  title: string;
  description: string;
  index: number;
}

const ValueCard: React.FC<ValueCardProps> = ({ title, description, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, margin: "-100px" });

  const variants = {
    hidden: { 
      opacity: 0,
      x: index % 2 === 0 ? -100 : 100,
      rotateY: index % 2 === 0 ? -45 : 45
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: index * 0.2
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative"
    >
      <div className="relative p-0.5 sm:p-1">
        {/* Card */}
        <div className="relative backdrop-blur-xl bg-gradient-to-br from-black/40 to-black/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/[0.08] overflow-hidden group">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.07] to-transparent" />
            <div 
              className="absolute inset-0" 
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 50%)`,
                backgroundSize: '100px 100px',
                backgroundRepeat: 'repeat',
                transform: 'rotate(30deg)'
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.3 }}
              className="mb-4 sm:mb-6"
            >
              <h3 className="text-xl sm:text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
                {title}
              </h3>
              <div className="h-0.5 w-12 sm:w-16 bg-gradient-to-r from-white/40 to-transparent rounded-full mt-2 sm:mt-3 
                transform origin-left transition-all duration-300 group-hover:w-20 sm:group-hover:w-24 group-hover:from-white/60" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.4 }}
              className="text-base sm:text-lg text-[#A1A1A6] font-light leading-relaxed group-hover:text-white/90 transition-colors duration-300"
              style={{ fontFamily: "SF Pro Text, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              {description}
            </motion.p>
          </div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute -top-8 -right-8 sm:-top-10 sm:-right-10 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-white/[0.05] to-transparent rounded-full blur-xl sm:blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute -bottom-8 -left-8 sm:-bottom-10 sm:-left-10 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-white/[0.05] to-transparent rounded-full blur-xl sm:blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const AboutValues: React.FC = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const values = [
    {
      title: "Innovation First",
      description: "We pioneer cutting-edge AI solutions by relentlessly exploring new technological frontiers and challenging conventional boundaries.",
    },
    {
      title: "Ethical Excellence",
      description: "Our commitment to ethical AI development ensures transparency, fairness, and responsible innovation in every solution we create.",
    },
    {
      title: "Client Priority",
      description: "Your success is our priority. We deliver tailored AI solutions that drive measurable business outcomes and exceed expectations.",
    },
    {
      title: "Continuous Improvement",
      description: "Through constant learning and adaptation, we evolve our AI capabilities to maintain industry leadership and deliver superior results.",
    }
  ];

  return (
    <section ref={containerRef} className="relative py-16 sm:py-32 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(10, 132, 255, 0.08) 0%, transparent 60%)',
            rotate: useTransform(scrollYProgress, [0, 1], [0, 45]),
            scale: useTransform(scrollYProgress, [0, 1], [1, 1.5]),
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 70% 70%, rgba(10, 132, 255, 0.08) 0%, transparent 60%)',
            rotate: useTransform(scrollYProgress, [0, 1], [0, -45]),
            scale: useTransform(scrollYProgress, [0, 1], [1, 1.5]),
          }}
        />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="text-center mb-12 sm:mb-20"
        >
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-px w-8 sm:w-12 bg-[#0A84FF]/50" />
            <p className="text-[#0A84FF] text-base sm:text-lg font-medium tracking-wide px-3 sm:px-4">OUR VALUES</p>
            <div className="h-px w-8 sm:w-12 bg-[#0A84FF]/50" />
          </div>
          <h2 className="text-4xl sm:text-5xl sm:text-6xl font-semibold tracking-tight text-white mb-4 sm:mb-6 px-4 sm:px-0">
            Principles That Drive Us
          </h2>
          <p className="text-lg sm:text-xl text-[#A1A1A6] max-w-3xl mx-auto font-light leading-relaxed px-4 sm:px-0"
            style={{ fontFamily: "SF Pro Text, system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}>
            The core values that shape our approach to innovation and excellence in AI technology
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          {values.map((value, index) => (
            <ValueCard
              key={value.title}
              title={value.title}
              description={value.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
