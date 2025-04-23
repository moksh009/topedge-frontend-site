import { useRef, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowRight, Workflow, Zap, Cloud } from 'lucide-react';
import React from 'react';

interface AutomationApp {
  name: string;
  image: string;
  color: string;
  description: string;
}

const automationApps: AutomationApp[] = [
  {
    name: "WhatsApp",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
    color: "#25D366",
    description: "Business messaging"
  },
  {
    name: "Instagram",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
    color: "#E4405F",
    description: "Social engagement"
  },
  {
    name: "Facebook",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    color: "#1877F2",
    description: "Community building"
  },
  {
    name: "Telegram",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg",
    color: "#0088CC",
    description: "Instant messaging"
  }
];

// Duplicate the array for infinite scroll effect
const extendedApps = [...automationApps, ...automationApps, ...automationApps];

const AutomationAppsShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMobile = window.innerWidth < 768;

  // Memoize scroll values and view state
  const isInView = useInView(containerRef, {
    amount: isMobile ? 0.3 : 0.5,
    once: false
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Optimize transforms with useSpring for smoother animations
  const springConfig = { mass: 0.1, stiffness: 100, damping: 30 };
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [100, -100]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
    springConfig
  );

  // Optimize horizontal scroll animation
  const baseX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    { stiffness: 50, damping: 20 }
  );

  // Memoize apps array to prevent unnecessary re-renders
  const memoizedExtendedApps = useMemo(() => extendedApps, []);

  // Optimize scroll speed based on device
  const SCROLL_SPEED = useMemo(() => isMobile ? 0.15 : 0.2, [isMobile]);

  useEffect(() => {
    if (isInView && scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth;
      let animationFrameId: number;
      let lastTime = 0;

      const animate = (currentTime: number) => {
        if (!scrollRef.current || !isInView) return;

        if (lastTime === 0) {
          lastTime = currentTime;
        }
        const deltaTime = currentTime - lastTime;
        
        scrollRef.current.scrollLeft += SCROLL_SPEED * deltaTime;
        if (scrollRef.current.scrollLeft >= scrollWidth / 3) {
          scrollRef.current.scrollLeft = 0;
        }
        
        lastTime = currentTime;
        animationFrameId = requestAnimationFrame(animate);
      };

      animationFrameId = requestAnimationFrame(animate);
      return () => {
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    }
  }, [isInView, SCROLL_SPEED]);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen bg-theme-bg-primary py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Simplified Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, var(--glow-secondary) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, var(--glow-secondary) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 100%, var(--glow-secondary) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 0%, var(--glow-secondary) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, var(--glow-secondary) 0%, transparent 50%)',
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Add floating icons as background decorations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute left-40 top-10 text-blue-400/20"
          animate={{ y: [-15, 15, -15], rotate: [0, 360, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
        >
          <Workflow className="w-20 h-20" />
        </motion.div>
        <motion.div
          className="absolute right-40 bottom-80 text-yellow-400/20"
          animate={{ y: [10, -10, 10], rotate: [0, -360, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
        >
          <Zap className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute right-1/4 top-1/4 text-emerald-400/20"
          animate={{ x: [-10, 10, -10], rotate: [0, 180, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <Cloud className="w-16 h-16" />
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="relative container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          className="text-center mb-20"
          style={{ opacity }}
        >
          <motion.h2
            className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-theme-text-primary via-theme-text-accent to-theme-text-primary bg-clip-text text-transparent"
          >
            Never Miss Another <br />Business Opportunity
          </motion.h2>
          <motion.p
            className="text-theme-text-secondary text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed mb-16"
          >
            <span className="text-red-400">72% of customers</span> choose another business when <br /> their call goes unanswered? & Slow replies <br />
            ⁠Let our 24/7 AI-Powered Support Squad handle every call, even instagram inquiry, ensuring you never lose another lead.
          </motion.p>

          {/* Pain Points Grid - Enhanced with glowing effects */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 rounded-2xl bg-theme-bg-surface/5 backdrop-blur-xl border border-theme-border-primary/10 hover:border-theme-border-accent/20 transition-all duration-300">
                <h3 className="text-xl font-semibold text-theme-text-primary mb-3">Lost Opportunities</h3>
                <p className="text-theme-text-secondary">Every missed call is a potential customer choosing your competitor. Don't let revenue slip away.</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 rounded-2xl bg-theme-bg-surface/5 backdrop-blur-xl border border-theme-border-primary/10 hover:border-theme-border-accent/20 transition-all duration-300">
                <h3 className="text-xl font-semibold text-theme-text-primary mb-3">24/7 Availability</h3>
                <p className="text-theme-text-secondary">Business happens around the clock. Our AI ensures you're always available to capture leads.</p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative p-8 rounded-2xl bg-theme-bg-surface/5 backdrop-blur-xl border border-theme-border-primary/10 hover:border-theme-border-accent/20 transition-all duration-300">
                <h3 className="text-xl font-semibold text-theme-text-primary mb-3">Instant Response</h3>
                <p className="text-theme-text-secondary">No more callback lists. Convert inquiries into appointments instantly with AI automation.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Infinite Scroll Container */}
        <div 
          ref={scrollRef}
          className="relative overflow-x-hidden mt-20"
          style={{ 
            maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
          }}
        >
          <motion.div 
            className="flex gap-8 py-10"
            style={{ x: baseX }}
          >
            {memoizedExtendedApps.map((app, index) => (
              <motion.div
                key={index}
                layout
                className="relative flex-none w-[240px] sm:w-[400px] group"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {/* Reduced heavy blur/opacity for performance */}
                <div className="absolute inset-0 bg-gradient-to-r from-theme-glow-primary/10 via-theme-glow-secondary/10 to-theme-glow-accent/10 rounded-2xl opacity-20 group-hover:opacity-60 transition-opacity duration-200" />
                <motion.div
                  layout
                  className="relative p-6 rounded-2xl overflow-hidden bg-theme-bg-surface/10 border border-theme-border-primary/10 hover:border-theme-border-accent/20 transition-all duration-200"
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  {/* App Content */}
                  <div className="flex flex-col justify-between h-full">
                    {/* App Logo */}
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 relative">
                        <img
                          src={app.image}
                          alt={app.name}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-theme-text-primary">{app.name}</h3>
                        <p className="text-sm text-theme-text-secondary">{app.description}</p>
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="flex items-center justify-between">
                      <motion.span 
                        className="px-4 py-2 rounded-full bg-theme-bg-surface/10 text-theme-text-primary text-sm border border-theme-border-primary/10 hover:border-theme-border-accent/20 transition-all duration-200"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                      >
                        Connect Now
                      </motion.span>
                      <motion.div
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                      >
                        <ArrowRight className="w-5 h-5 text-theme-text-accent" />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default React.memo(AutomationAppsShowcase); 