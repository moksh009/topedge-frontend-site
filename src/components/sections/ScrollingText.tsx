import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollingText = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [150, -500]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-500, 500]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

  return (
    <motion.section
      ref={containerRef}
      className="relative bg-black min-h-[80vh] sm:min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center py-8 sm:py-12 md:py-20"
      style={{ opacity }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:2rem_2rem] sm:bg-[size:3rem_3rem] md:bg-[size:5rem_5rem] pointer-events-none" />
      
      {/* Container for better text positioning */}
      <div className="max-w-[100vw] w-full mx-auto relative px-3 sm:px-4">
        {/* First text line */}
        <div className="overflow-hidden mb-3 sm:mb-4 md:mb-8">
          <motion.div
            className="flex items-center justify-start"
            style={{ x: x1, scale }}
          >
            <h2 
              className="text-[min(10vw,6rem)] sm:text-[min(12vw,8rem)] md:text-[8vw] font-semibold whitespace-nowrap"
              style={{
                fontFamily: "-apple-system, 'SF Pro Display', sans-serif",
                fontFeatureSettings: '"ss01" on, "ss02" on',
                background: 'linear-gradient(to right, #fff 40%, #666 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em'
              }}
            >
              Never Miss Any Call Again
            </h2>
          </motion.div>
        </div>

        {/* Second text line */}
        <div className="overflow-hidden">
          <motion.div
            className="flex items-center justify-end"
            style={{ x: x2, scale }}
          >
            <h2 
              className="text-[min(10vw,6rem)] sm:text-[min(12vw,8rem)] md:text-[8vw] font-semibold whitespace-nowrap"
              style={{
                fontFamily: "-apple-system, 'SF Pro Display', sans-serif",
                fontFeatureSettings: '"ss01" on, "ss02" on',
                background: 'linear-gradient(to right, #666 0%, #fff 60%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em'
              }}
            >
              With AI Receptionist 
            </h2>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ScrollingText; 