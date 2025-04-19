import { ArrowRight, Bot } from 'lucide-react';
import { motion } from 'framer-motion';

export const ServiceCTA = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
      </div>

      <motion.div 
        className="relative container mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-block bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-400 text-transparent bg-clip-text">
              Ready to Transform
            </span>
            <br />
            <span className="inline-block bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text">
              Your Business?
            </span>
          </motion.h2>

          <motion.p 
            className="text-xl text-gray-400 mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Experience the power of AI-driven solutions. Start your journey with us today.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <a
              href="/contact"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white font-semibold text-lg hover:from-blue-500 hover:to-cyan-500 transition-all duration-300"
            >
              Get Started
              <motion.div 
                className="relative"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/20 to-cyan-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>

            <a
              href="/demo"
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-blue-500/30 rounded-full text-blue-300 font-semibold text-lg hover:bg-blue-500/10 transition-all duration-300"
            >
              Try Demo
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Bot className="w-5 h-5" />
              </motion.div>
            </a>
          </motion.div>
        </div>

        {/* Subtle background effects */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
      </motion.div>
    </section>
  );
};
