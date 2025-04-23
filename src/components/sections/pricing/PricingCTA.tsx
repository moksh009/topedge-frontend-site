import { motion, useInView } from 'framer-motion';
import { DollarSign, Sparkles, Gem } from 'lucide-react';
import { useRef } from 'react';
import PricingCTAButtons from './PricingCTAButtons';

const PricingCTA = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden bg-theme-bg-primary"
    >
      {/* Background removed for a clean look */}
      <div className="absolute inset-0 bg-theme-bg-primary" />

      <div className="relative container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-emerald-500 to-green-700">
              Choose the Perfect
            </span>
            <br />
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-emerald-500 to-green-700">
              Plan for You
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-theme-text-secondary mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Flexible pricing options to match your business needs. Start with our free trial today.
          </motion.p>

          {/* Unified CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <PricingCTAButtons />
          </motion.div>
        </motion.div>

        {/* Animated Floating Icons */}
        <div className="pointer-events-none absolute inset-0 z-0">
          {/* DollarSign - top left */}
          <motion.div
            className="absolute left-8 top-10 text-green-400/30"
            animate={{ y: [-15, 15, -15], rotate: [0, 360, 0] }}
            transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
          >
            <DollarSign className="w-14 h-14" />
          </motion.div>
          {/* Sparkles - right center */}
          <motion.div
            className="absolute right-10 top-1/3 text-blue-400/20"
            animate={{ y: [-12, 12, -12], rotate: [0, 360, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-12 h-12" />
          </motion.div>
          {/* Gem - bottom left */}
          <motion.div
            className="absolute left-20 bottom-16 text-purple-400/20"
            animate={{ x: [0, 12, 0], rotate: [0, 180, 0] }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          >
            <Gem className="w-12 h-12" />
          </motion.div>
        </div>

        {/* Decorative elements */}
        <motion.div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </section>
  );
};

export default PricingCTA;
