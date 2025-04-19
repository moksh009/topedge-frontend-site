import { motion } from 'framer-motion';

const ScrollingText = () => {
  return (
    <section className="relative bg-black min-h-[30vh] sm:min-h-[50vh] md:min-h-[40vh] flex flex-col items-center justify-center py-4 sm:py-6 md:py-8 overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" 
        style={{
          backgroundSize: '1.5rem 1.5rem',
          willChange: 'transform'
        }}
      />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
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
              duration: 25,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }}
          >
            {Array(4).fill(null).map((_, index) => (
              <div key={`row1-${index}`} className="flex items-center gap-4 sm:gap-8">
                <h2 className="text-[min(6vw,4rem)] sm:text-[min(8vw,5rem)] md:text-[3.5vw] font-bold whitespace-nowrap">
                  <span className="bg-gradient-to-r from-blue-400 via-blue-200 to-white bg-clip-text text-transparent drop-shadow-lg">
                    Save Upto $10K Within 45 Days
                  </span>
                </h2>
                <div className="relative h-[3rem] sm:h-[4rem] md:h-[5rem] flex items-center justify-center">
                  <div className="w-[1px] sm:w-[2px] h-full bg-gradient-to-b from-transparent via-blue-500/50 to-transparent rounded-full blur-[1px]" />
                  <div className="absolute w-[1px] sm:w-[2px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent rounded-full" />
                </div>
                <h2 className="text-[min(6vw,4rem)] sm:text-[min(8vw,5rem)] md:text-[3.5vw] font-bold whitespace-nowrap">
                  <span className="bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-200 bg-clip-text text-transparent drop-shadow-lg">
                    Scale Your Business 3x Faster
                  </span>
                </h2>
                <div className="relative h-[3rem] sm:h-[4rem] md:h-[5rem] flex items-center justify-center">
                  <div className="w-[1px] sm:w-[2px] h-full bg-gradient-to-b from-transparent via-purple-500/50 to-transparent rounded-full blur-[1px]" />
                  <div className="absolute w-[1px] sm:w-[2px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent rounded-full" />
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
              duration: 25,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop"
            }}
          >
            {Array(4).fill(null).map((_, index) => (
              <div key={`row2-${index}`} className="flex items-center gap-4 sm:gap-8">
                <h2 className="text-[min(6vw,4rem)] sm:text-[min(8vw,5rem)] md:text-[3.5vw] font-bold whitespace-nowrap">
                  <span className="bg-gradient-to-r from-rose-300 via-pink-200 to-white bg-clip-text text-transparent drop-shadow-lg">
                    Never Miss Any Call Again
                  </span>
                </h2>
                <div className="relative h-[3rem] sm:h-[4rem] md:h-[5rem] flex items-center justify-center">
                  <div className="w-[1px] sm:w-[2px] h-full bg-gradient-to-b from-transparent via-rose-500/50 to-transparent rounded-full blur-[1px]" />
                  <div className="absolute w-[1px] sm:w-[2px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent rounded-full" />
                </div>
                <h2 className="text-[min(6vw,4rem)] sm:text-[min(8vw,5rem)] md:text-[3.5vw] font-bold whitespace-nowrap">
                  <span className="bg-gradient-to-r from-amber-200 via-orange-200 to-rose-200 bg-clip-text text-transparent drop-shadow-lg">
                    24/7 AI-Powered Support Squad
                  </span>
                </h2>
                <div className="relative h-[3rem] sm:h-[4rem] md:h-[5rem] flex items-center justify-center">
                  <div className="w-[1px] sm:w-[2px] h-full bg-gradient-to-b from-transparent via-amber-500/50 to-transparent rounded-full blur-[1px]" />
                  <div className="absolute w-[1px] sm:w-[2px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent rounded-full" />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Enhanced gradient overlays for smooth fade at edges */}
        <div className="absolute inset-y-0 left-0 w-20 sm:w-32 md:w-64 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-20 sm:w-32 md:w-64 bg-gradient-to-l from-black via-black/80 to-transparent z-10" />
      </div>
    </section>
  );
};

export default ScrollingText; 