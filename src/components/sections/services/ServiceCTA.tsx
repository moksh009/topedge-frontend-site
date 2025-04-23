import { ArrowRight, Bot, Brain, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const ServiceCTA = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-theme-bg-primary">
      {/* Premium Lucide icons background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute left-10 top-16"
          animate={{ y: [-40, 20, -40], rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Bot className="w-20 h-20 text-purple-400" />
        </motion.div>
        <motion.div
          className="absolute right-16 top-32"
          animate={{ y: [40, -40, 40], rotate: [360, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Brain className="w-24 h-24 text-yellow-400" />
        </motion.div>
        <motion.div
          className="absolute left-1/4 top-80 -translate-x-1/2"
          animate={{ y: [40, -40, 40], rotate: [360, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Zap className="w-16 h-16 text-red-500 bg-gradient-to-br from-red-400 to-red-600 bg-clip-text text-transparent" />
        </motion.div>
      </div>

      <motion.div 
        className="relative container mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-6xl md:text-8xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-theme-text-primary via-theme-glow-accent to-theme-text-primary">
              Ready to Transform Your Business?
            </span>
          </motion.h2>

          <motion.p 
            className="text-xl text-theme-text-secondary mb-10 leading-relaxed"
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
            <a href="/contact" className="w-full sm:w-auto">
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={{
                  hover: { scale: 1.05 },
                  tap: { scale: 0.95 }
                }}
                className="group relative rounded-full w-full"
              >
                {/* Button Container */}
                <div className="relative px-6 sm:px-8 py-4 rounded-full w-full">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 via-purple-400/50 to-purple-500/50 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                  {/* Moving Particles Background */}
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-theme-glow-primary rounded-full"
                        animate={{
                          x: [
                            Math.random() * 200,
                            Math.random() * -200,
                            Math.random() * 200
                          ],
                          y: [
                            Math.random() * 100,
                            Math.random() * -100,
                            Math.random() * 100
                          ],
                          scale: [0, 1.5, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: Math.random() * 3 + 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`
                        }}
                      />
                    ))}
                  </div>
                  {/* Main Button Background */}
                  <div className="absolute inset-0 bg-theme-bg-surface/80 backdrop-blur-sm border border-theme-border-primary group-hover:border-theme-border-accent transition-all duration-300 rounded-full" />
                  {/* Button Content */}
                  <div className="relative flex items-center justify-center gap-3">
                    <div className="flex items-center justify-center gap-3">
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 group-hover:text-purple-600 transition-colors duration-300" />
                      <span className="text-base sm:text-lg font-medium bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600 bg-clip-text text-transparent">
                        Get Started
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            </a>

            <a href="/" className="w-full sm:w-auto">
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={{
                  hover: { scale: 1.05 },
                  tap: { scale: 0.95 }
                }}
                className="group relative rounded-full w-full"
              >
                {/* Button Container */}
                <div className="relative px-6 sm:px-8 py-4 rounded-full w-full">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/50 via-purple-400/50 to-purple-500/50 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                  {/* Moving Particles Background */}
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-theme-glow-primary rounded-full"
                        animate={{
                          x: [
                            Math.random() * 200,
                            Math.random() * -200,
                            Math.random() * 200
                          ],
                          y: [
                            Math.random() * 100,
                            Math.random() * -100,
                            Math.random() * 100
                          ],
                          scale: [0, 1.5, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: Math.random() * 3 + 2,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`
                        }}
                      />
                    ))}
                  </div>
                  {/* Main Button Background */}
                  <div className="absolute inset-0 bg-theme-bg-surface/80 backdrop-blur-sm border border-theme-border-primary group-hover:border-theme-border-accent transition-all duration-300 rounded-full" />
                  {/* Button Content */}
                  <div className="relative flex items-center justify-center gap-3">
                    <div className="flex items-center justify-center gap-3">
                      <motion.span
                        animate={{ rotate: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 group-hover:text-purple-600 transition-colors duration-300" />
                      </motion.span>
                      <span className="text-base sm:text-lg font-medium bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600 bg-clip-text text-transparent">
                        Try Demo
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            </a>
          </motion.div>
        </div>

        {/* Subtle background effects */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-theme-glow-primary/5 rounded-full blur-3xl" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-theme-glow-accent/5 rounded-full blur-3xl" />
      </motion.div>
    </section>
  );
};
