import { useRef, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
      className="relative min-h-screen bg-black py-12 sm:py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Content Container */}
      <div className="relative container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          className="text-center mb-12 sm:mb-20"
          style={{ opacity, willChange: 'opacity' }}
        >
          <motion.h2
            className="text-3xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
            style={{
              background: 'linear-gradient(to right, #fff 20%, #3B82F6 50%, #fff 80%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shine 8s linear infinite',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            Never Miss Another <br />Business Opportunity
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed px-4 sm:px-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
          <span className="text-red-400">72% of customers</span> choose another business when <br /> their call goes unanswered? & Slow replies <br />
          ⁠Let our 24/7 AI-Powered Support Squad handle every call, even instagram inquiry, ensuring you never lose another lead.

          </motion.p>
          
          {/* Pain Points Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-16 max-w-5xl mx-auto px-4 sm:px-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/50 transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">Lost Opportunities</h3>
              <p className="text-gray-400 text-sm sm:text-base">Every missed call is a potential customer choosing your competitor. Don't let revenue slip away.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/50 transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">24/7 Availability</h3>
              <p className="text-gray-400 text-sm sm:text-base">Business happens around the clock. Our AI ensures you're always available to capture leads.</p>
            </div>
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-blue-500/50 transition-all duration-300 sm:col-span-2 md:col-span-1 mx-auto w-full">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">Instant Response</h3>
              <p className="text-gray-400 text-sm sm:text-base">No more callback lists. Convert inquiries into appointments instantly with AI automation.</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Infinite Scroll Container - Optimized */}
        <div 
          ref={scrollRef}
          className="relative overflow-x-hidden"
          style={{ 
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          <motion.div 
            className="flex gap-4 sm:gap-8 py-6 sm:py-10"
            style={{ 
              x: baseX,
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            {memoizedExtendedApps.map((app, index) => (
              <motion.div
                key={index}
                className="relative flex-none w-[280px] sm:w-[400px]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: isMobile ? 30 : 50,
                    damping: isMobile ? 15 : 20,
                    duration: isMobile ? 0.5 : 0.8
                  }
                }}
                viewport={{ 
                  once: true, 
                  margin: isMobile ? "-50px" : "-100px",
                  amount: isMobile ? 0.3 : 0.5
                }}
                whileHover={isMobile ? undefined : { 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                style={{
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
              >
                <div className="relative h-[180px] sm:h-[200px] rounded-2xl overflow-hidden backdrop-blur-lg bg-white/5 border border-white/10">
                  {/* App Content */}
                  <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between">
                    {/* App Logo */}
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 relative">
                          <img
                            src={app.image}
                            alt={app.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white">{app.name}</h3>
                          <p className="text-sm sm:text-base text-gray-400">{app.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 sm:px-3 py-1 rounded-full bg-white/10 text-white text-xs sm:text-sm">
                          Connect Now
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/60" />
                    </div>
                  </div>

                  {/* Gradient Overlay */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      background: `linear-gradient(45deg, ${app.color}40, transparent)`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default React.memo(AutomationAppsShowcase); 