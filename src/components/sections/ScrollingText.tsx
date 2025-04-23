import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const ScrollingText = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const scrollDuration = isMobile ? 35 : 25; // Slower speed on mobile

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative bg-theme-bg-primary min-h-[25vh] sm:min-h-[50vh] md:min-h-[40vh] flex flex-col items-center justify-center py-4 sm:py-6 md:py-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, var(--glow-primary) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, var(--glow-primary) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 100%, var(--glow-primary) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 0%, var(--glow-primary) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, var(--glow-primary) 0%, transparent 50%)',
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 bg-grid-white/5 pointer-events-none"
          style={{
            backgroundSize: '1.5rem 1.5rem',
            maskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)',
          }}
        />
      </div>
      
      <div className="max-w-[100vw] w-full mx-auto relative">
        {/* First row */}
        <div className="relative overflow-hidden mb-2 sm:mb-3">
          <motion.div
            className="flex gap-4 sm:gap-8 items-center"
            animate={{
              x: [-2400, 0],
            }}
            transition={{
              duration: scrollDuration,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }}
          >
            {Array(4).fill(null).map((_, index) => (
              <div key={`row1-${index}`} className="flex items-center gap-4 sm:gap-8">
                <h2 className="text-[min(5vw,4rem)] sm:text-[min(8vw,5rem)] md:text-[3.5vw] font-bold whitespace-nowrap">
                  <motion.span
                    className="bg-gradient-to-r from-theme-text-accent via-theme-text-primary to-theme-text-accent bg-clip-text text-transparent drop-shadow-lg inline-block"
                    animate={{
                      filter: ['drop-shadow(0 0 10px var(--glow-primary))', 'drop-shadow(0 0 20px var(--glow-primary))', 'drop-shadow(0 0 10px var(--glow-primary))']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    Save Upto $10K Within 45 Days
                  </motion.span>
                </h2>
                <div className="relative h-[2.5rem] sm:h-[4rem] md:h-[5rem] flex items-center justify-center">
                  <motion.div
                    className="w-[1px] sm:w-[2px] h-full bg-gradient-to-b from-transparent via-theme-text-accent/50 to-transparent rounded-full"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      height: ['80%', '100%', '80%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                <h2 className="text-[min(5vw,4rem)] sm:text-[min(8vw,5rem)] md:text-[3.5vw] font-bold whitespace-nowrap">
                  <motion.span
                    className="bg-gradient-to-r from-theme-text-primary via-theme-text-accent to-theme-text-primary bg-clip-text text-transparent drop-shadow-lg inline-block"
                    animate={{
                      filter: ['drop-shadow(0 0 10px var(--glow-accent))', 'drop-shadow(0 0 20px var(--glow-accent))', 'drop-shadow(0 0 10px var(--glow-accent))']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  >
                    Scale Your Business 3x Faster
                  </motion.span>
                </h2>
                <div className="relative h-[2.5rem] sm:h-[4rem] md:h-[5rem] flex items-center justify-center">
                  <motion.div
                    className="w-[1px] sm:w-[2px] h-full bg-gradient-to-b from-transparent via-theme-text-accent/50 to-transparent rounded-full"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      height: ['80%', '100%', '80%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second row */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-4 sm:gap-8 items-center"
            animate={{
              x: [0, -2400],
            }}
            transition={{
              duration: scrollDuration,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }}
          >
            {Array(4).fill(null).map((_, index) => (
              <div key={`row2-${index}`} className="flex items-center gap-4 sm:gap-8">
                <h2 className="text-[min(5vw,4rem)] sm:text-[min(8vw,5rem)] md:text-[3.5vw] font-bold whitespace-nowrap">
                  <motion.span
                    className="bg-gradient-to-r from-theme-text-accent via-theme-text-primary to-theme-text-accent bg-clip-text text-transparent drop-shadow-lg inline-block"
                    animate={{
                      filter: ['drop-shadow(0 0 10px var(--glow-primary))', 'drop-shadow(0 0 20px var(--glow-primary))', 'drop-shadow(0 0 10px var(--glow-primary))']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  >
                    Never Miss Any Call Again
                  </motion.span>
                </h2>
                <div className="relative h-[2.5rem] sm:h-[4rem] md:h-[5rem] flex items-center justify-center">
                  <motion.div
                    className="w-[1px] sm:w-[2px] h-full bg-gradient-to-b from-transparent via-theme-text-accent/50 to-transparent rounded-full"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      height: ['80%', '100%', '80%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                <h2 className="text-[min(5vw,4rem)] sm:text-[min(8vw,5rem)] md:text-[3.5vw] font-bold whitespace-nowrap">
                  <motion.span
                    className="bg-gradient-to-r from-theme-text-primary via-theme-text-accent to-theme-text-primary bg-clip-text text-transparent drop-shadow-lg inline-block"
                    animate={{
                      filter: ['drop-shadow(0 0 10px var(--glow-accent))', 'drop-shadow(0 0 20px var(--glow-accent))', 'drop-shadow(0 0 10px var(--glow-accent))']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5
                    }}
                  >
                    24/7 AI-Powered Support Squad
                  </motion.span>
                </h2>
                <div className="relative h-[2.5rem] sm:h-[4rem] md:h-[5rem] flex items-center justify-center">
                  <motion.div
                    className="w-[1px] sm:w-[2px] h-full bg-gradient-to-b from-transparent via-theme-text-accent/50 to-transparent rounded-full"
                    animate={{
                      opacity: [0.3, 1, 0.3],
                      height: ['80%', '100%', '80%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ScrollingText; 