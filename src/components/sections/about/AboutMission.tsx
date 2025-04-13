import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutMission = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: false,
    rootMargin: "-100px"
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.25, 0.1, 0.25, 1],
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      filter: "blur(10px)",
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  };

  return (
    <motion.section 
      ref={containerRef} 
      className="relative min-h-[100vh] w-full py-16 sm:py-32 md:py-40 bg-black overflow-hidden"
      style={{ opacity, scale, y }}
      initial="hidden"
      animate="visible"
      exit="exit"
      id="mission"
    >
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[800px] h-[300px] sm:h-[500px] bg-[#0A84FF]/5 rounded-full blur-[80px] sm:blur-[120px]" />
      </div>

      {/* Content Container */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-20">
        <div ref={ref} className="max-w-6xl mx-auto">
          {/* Enhanced Section Header */}
          <motion.div
            className="text-center"
            variants={titleVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div
              className="inline-flex items-center justify-center mb-4 sm:mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.3,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            >
              <motion.div 
                className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent via-[#0A84FF] to-transparent"
                animate={{
                  scaleX: inView ? [0, 1] : 0
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              />
              <p className="text-[#0A84FF] text-xs sm:text-sm md:text-base font-medium tracking-[0.2em] px-3 sm:px-6 uppercase">Our Mission</p>
              <motion.div 
                className="h-px w-8 sm:w-16 bg-gradient-to-r from-transparent via-[#0A84FF] to-transparent"
                animate={{
                  scaleX: inView ? [0, 1] : 0
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0.25, 0.1, 0.25, 1]
                }}
              />
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 sm:mb-6 px-4 sm:px-0"
              variants={{
                hidden: { 
                  opacity: 0, 
                  y: 50,
                  filter: "blur(10px)"
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: {
                    duration: 1,
                    delay: 0.4,
                    ease: [0.25, 0.1, 0.25, 1]
                  }
                }
              }}
            >
              <span className="text-white relative">
                Pioneering the Future of
                <br className="hidden sm:block" />
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 bg-gradient-to-r from-[#0A84FF] via-white to-[#0A84FF] text-transparent bg-clip-text animate-gradient-x">
                    Intelligent Technology
                  </span>
                  <motion.div
                    className="absolute -inset-2 bg-[#0A84FF]/10 blur-xl rounded-full z-0"
                    animate={{
                      opacity: [0.3, 0.5, 0.3],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </span>
              </span>
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg md:text-2xl lg:text-3xl text-[#A1A1A6] max-w-3xl mx-auto font-light leading-relaxed px-4 sm:px-0"
              variants={{
                hidden: { 
                  opacity: 0, 
                  y: 30,
                  filter: "blur(5px)"
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: {
                    duration: 1,
                    delay: 0.6,
                    ease: [0.25, 0.1, 0.25, 1]
                  }
                }
              }}
            >
              At TopEdge, we're revolutionizing how businesses harness AI technology. 
              Our intelligent solutions adapt, learn, and evolve, ensuring your business 
              stays ahead in an ever-changing digital landscape.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutMission;