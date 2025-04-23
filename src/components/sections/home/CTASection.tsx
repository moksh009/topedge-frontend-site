import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

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
              Claim Your Extra $10K Revenue This Month
            </span>
          </motion.div>

          <motion.h2
            className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="inline-block text-theme-text-primary">
              Transform Your Business
            </span>
            <br className="hidden sm:block" />
            <span className="inline-block text-theme-text-accent mt-2 sm:mt-0">
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
            <Link
              to="/contact"
              className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full w-full sm:w-auto overflow-hidden"
            >
              {/* Always-visible Glow Effect */}
              <div className="absolute inset-0 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 rounded-full bg-gradient-to-r from-theme-glow-primary/30 via-theme-glow-accent/40 to-theme-glow-primary/30" />
              {/* Button Background */}
              <div className="absolute inset-0 bg-theme-bg-surface border-[1.5px] rounded-full border-theme-border-accent/50 group-hover:border-theme-border-accent transition-all duration-300" />
              {/* Button Content */}
              <div className="relative flex items-center gap-3">
                <span className="text-base font-medium text-theme-text-primary">
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
            </Link>

            <Link
              to="/services"
              className="group relative inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full w-full sm:w-auto overflow-hidden"
            >
              {/* Always-visible Glow Effect */}
              <div className="absolute inset-0 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 rounded-full bg-gradient-to-r from-theme-glow-primary/30 via-theme-glow-accent/40 to-theme-glow-primary/30" />
              {/* Button Background */}
              <div className="absolute inset-0 bg-theme-bg-surface/80 border-[1.5px] rounded-full border-theme-border-accent/50 group-hover:border-theme-border-accent transition-all duration-300 backdrop-blur-sm" />
              {/* Button Content */}
              <div className="relative flex items-center gap-3">
                <span className="text-base font-medium text-theme-text-primary/90 group-hover:text-theme-text-primary transition-colors duration-300">
                  Explore Services
                </span>
                <motion.div
                  className="relative"
                  animate={{ rotate: [0, 360], }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <ArrowRight className="w-5 h-5 text-theme-text-accent group-hover:text-theme-text-primary transition-colors duration-300" />
                </motion.div>
              </div>
            </Link>
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