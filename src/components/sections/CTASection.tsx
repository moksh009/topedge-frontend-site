import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles, Rocket } from 'lucide-react';
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
      <div className="absolute inset-0 bg-gradient-to-b from-theme-bg-primary via-theme-glow-primary/5 to-theme-bg-primary">
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-theme-glow-primary/20 rounded-full"
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

      {/* Add floating icons as background decorations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute left-32 top-10 text-blue-400/40"
          animate={{ y: [-10, 10, -10], rotate: [0, 360, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <Rocket className="w-20 h-20" />
        </motion.div>
        <motion.div
          className="absolute right-40 bottom-24 text-yellow-400/50"
          animate={{ x: [8, -8, 8], rotate: [0, -180, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute left-1/4 bottom-32 text-emerald-400/50"
          animate={{ y: [12, -12, 12], rotate: [0, 180, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          <ArrowRight className="w-16 h-16" />
        </motion.div>
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
            className="relative inline-flex items-center gap-2 rounded-full bg-white/5 px-6 py-3 overflow-hidden mb-4 sm:mb-6"
          >
            {/* Premium border design */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-theme-glow-primary/20 via-theme-glow-accent/20 to-theme-glow-secondary/20 animate-gradient-xy" />
              <div className="absolute inset-0 backdrop-blur-xl" />
              <div className="absolute inset-0 border-[1.5px] border-white/10 rounded-full" />
              <div className="absolute inset-0 bg-white/5" />
            </div>

            {/* Content */}
            <Sparkles className="relative w-4 h-4 text-blue-400" />
            <span className="relative text-sm font-medium text-black/90">
            Ready to take the next step to add extra revenue within the next 45 days?
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block bg-gradient-to-r from-theme-text-primary via-theme-glow-accent to-theme-text-primary text-transparent bg-clip-text">
              Transform Your Business
            </span>
            <br className="hidden sm:block" />
            <span className="inline-block bg-gradient-to-r from-theme-glow-primary via-theme-text-accent to-theme-glow-secondary text-transparent bg-clip-text mt-2 sm:mt-0">
              With TopEdge AI
            </span>
          </motion.h2>

          <motion.p
            className="text-base sm:text-xl text-theme-text-secondary mb-8 sm:mb-12 leading-relaxed px-4"
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
              className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full w-full sm:w-auto overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Premium Glow Effect */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-theme-glow-primary/20 via-theme-glow-accent/20 to-theme-glow-secondary/20 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute -inset-[1px] bg-gradient-to-r from-theme-glow-primary/30 via-theme-glow-accent/30 to-theme-glow-secondary/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              </div>

              {/* Button Background */}
              <div className="absolute inset-0 bg-theme-bg-surface border-[1.5px] rounded-full border-theme-border-accent/50 group-hover:border-theme-border-accent transition-all duration-300" />
              
              {/* Button Content */}
              <div className="relative flex items-center gap-3">
                <span className="text-base font-medium bg-gradient-to-r from-theme-text-primary via-theme-text-accent to-theme-text-primary bg-clip-text text-transparent">
                  Tell me more
                </span>
                <motion.div
                  animate={{
                    x: [0, 5, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ArrowRight className="w-5 h-5 text-theme-text-accent group-hover:text-theme-text-primary transition-colors duration-300" />
                </motion.div>
              </div>
            </motion.a>

            <motion.a
              href="/services"
              className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full w-full sm:w-auto overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Premium Glow Effect */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-theme-glow-primary/10 via-theme-glow-accent/10 to-theme-glow-secondary/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute -inset-[1px] bg-gradient-to-r from-theme-glow-primary/20 via-theme-glow-accent/20 to-theme-glow-secondary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              </div>

              {/* Button Background */}
              <div className="absolute inset-0 bg-theme-bg-surface/80 border-[1.5px] rounded-full border-theme-border-accent/50 group-hover:border-theme-border-accent transition-all duration-300 backdrop-blur-sm" />
              
              {/* Button Content */}
              <div className="relative flex items-center gap-3">
                <span className="text-base font-medium text-theme-text-primary/90 group-hover:text-theme-text-primary transition-colors duration-300">
                  Explore Services
                </span>
                <motion.div
                  className="relative"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                >
                  <Sparkles className="w-5 h-5 text-theme-text-accent group-hover:text-theme-text-primary transition-colors duration-300" />
                  <div className="absolute inset-0 blur-lg bg-theme-glow-accent/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </div>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Optimized decorative elements */}
        <motion.div
          className="absolute -left-32 top-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-theme-glow-primary/5 rounded-full blur-2xl pointer-events-none"
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
          className="absolute -right-32 top-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-theme-glow-secondary/5 rounded-full blur-2xl pointer-events-none"
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
