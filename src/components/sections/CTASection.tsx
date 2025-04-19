import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useRef } from 'react';

export const CTASection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <motion.section
      ref={sectionRef}
      className="relative py-16 sm:py-32 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ willChange: 'transform' }}
    >
      {/* Optimized background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-300/20 rounded-full"
              animate={{
                y: [Math.random() * 500, -10],
                opacity: [0, 0.5, 0],
                scale: [0, 1.2, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
                delay: Math.random() * 2
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                willChange: 'transform'
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-4 sm:mb-6"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Claim Your Extra $10K Revenue This Month
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-400 text-transparent bg-clip-text">
              Transform Your Business
            </span>
            <br className="hidden sm:block" />
            <span className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 text-transparent bg-clip-text mt-2 sm:mt-0">
              With TopEdge AI
            </span>
          </motion.h2>

          <motion.p
            className="text-base sm:text-xl text-gray-400 mb-8 sm:mb-12 leading-relaxed px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
Ready to take the next step and add up to an extra $10K in revenue within the next 45 days?
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-stretch sm:items-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.a
              href="/contact"
              className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-full text-white font-semibold text-base sm:text-lg hover:from-purple-500 hover:to-fuchsia-500 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 w-full sm:w-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ willChange: 'transform' }}
            >
              "Tell me more"
              <motion.div
                className="relative"
                animate={{
                  x: [0, 3, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
              </motion.div>
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/30 to-fuchsia-600/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ willChange: 'transform' }}
              />
            </motion.a>

            <motion.a
              href="/services"
              className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-transparent border border-purple-500/30 rounded-full text-purple-300 font-semibold text-base sm:text-lg hover:bg-purple-500/10 transition-all duration-300 active:scale-95 w-full sm:w-auto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ willChange: 'transform' }}
            >
              Explore Services
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Sparkles className="w-4 sm:w-5 h-4 sm:h-5" />
              </motion.div>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Optimized decorative elements */}
        <motion.div
          className="absolute -left-32 top-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-purple-500/5 rounded-full blur-2xl pointer-events-none"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ willChange: 'transform' }}
        />
        <motion.div
          className="absolute -right-32 top-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-fuchsia-500/5 rounded-full blur-2xl pointer-events-none"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ willChange: 'transform' }}
        />
      </div>
    </motion.section>
  );
};
