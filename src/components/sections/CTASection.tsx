import { motion, useInView } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useRef } from 'react';

export const CTASection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <motion.section
      ref={sectionRef}
      className="relative py-24 sm:py-32 overflow-hidden bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Premium Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-b from-blue-50/50 to-purple-50/50 rounded-full blur-[120px] opacity-60" />
      </div>
          
      <div className="relative container mx-auto px-4 sm:px-6 z-10">
        <motion.div
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold uppercase tracking-wide mb-8 shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ready to scale?</span>
          </motion.div>

          <motion.h2
            className="text-4xl sm:text-6xl md:text-7xl font-bold mb-8 tracking-tight text-[#1d1d1f]"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Transform your business <br className="hidden sm:block" />
            with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">TopEdge AI</span> today.
          </motion.h2>

          <motion.p
            className="text-xl sm:text-2xl text-gray-500 mb-12 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Unlock extra revenue in just 45 days with our intelligent voice agents and chatbots.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.a
              href="/contact"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#1d1d1f] text-white font-medium text-lg overflow-hidden shadow-lg hover:shadow-xl transition-all hover:scale-105"
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Get Started Now</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>

            <motion.a
              href="/services"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-[#1d1d1f] font-medium text-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all hover:scale-105 hover:border-gray-300"
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">View Services</span>
              <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
