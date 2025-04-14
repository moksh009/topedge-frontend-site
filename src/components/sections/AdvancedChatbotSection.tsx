import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageSquare, MessagesSquare, Send, Bot, Sparkles, ArrowRight, Zap, Play } from 'lucide-react';

interface Platform {
  name: string;
  icon: string;
  color: string;
  messages: string[];
  features: string[];
}


const features = [
  {
    icon: <Bot className="w-7 h-7 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" />,
    title: "Instant Support",
    description: "Respond to customers in seconds across all channels"
  },
  {
    icon: <MessageSquare className="w-7 h-7 text-violet-400 group-hover:text-violet-300 transition-colors duration-300" />,
    title: "24/7 Lead Generation",
    description: "Convert visitors into qualified leads while you sleep"
  },
  {
    icon: <Sparkles className="w-7 h-7 text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors duration-300" />,
    title: "Smart Follow-ups",
    description: "Automated nurturing increases conversion by 40%"
  }
];

const AdvancedChatbotSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Enhanced scroll animations
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 0.9]);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-[120vh] sm:min-h-screen bg-[#000000] py-8 sm:py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ willChange: 'transform' }}
    >
      {/* Enhanced Background Effects - Optimized for performance */}
      <motion.div 
        className="absolute inset-0"
        style={{ 
          y: backgroundY,
          willChange: 'transform'
        }}
      >
        {/* Simplified Glowing Orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-500/10 rounded-full blur-[80px] sm:blur-[128px]"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ willChange: 'transform' }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-violet-500/10 rounded-full blur-[80px] sm:blur-[128px]"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
            delay: 2.5
          }}
          style={{ willChange: 'transform' }}
        />
      </motion.div>

      {/* Content Container - Improved mobile spacing */}
      <div className="relative container mx-auto px-4 sm:px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-4 sm:gap-8 lg:gap-12">
          {/* Left Content - Image/Demo Section */}
          <motion.div
            className="w-full lg:w-1/2 mt-6 lg:mt-0 min-h-[400px] sm:min-h-[600px] relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ willChange: 'transform' }}
          >
            <div className="relative w-full max-w-[500px] mx-auto lg:mx-0">
              {/* WhatsApp Image */}
              <motion.div
                className="absolute w-[220px] sm:w-[380px] -left-0 sm:-left-20 top-0 sm:top-20"
                initial={{ opacity: 0, y: 50, rotate: -5 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate: -5,
                  transition: {
                    type: "spring",
                    stiffness: 50,
                    damping: 15,
                  }
                }}
                viewport={{ margin: "-50px" }}
                style={{ willChange: 'transform' }}
              >
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg">
                  <img 
                    src="whatsapp , insta/1.png" 
                    alt="WhatsApp Interface" 
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </motion.div>

              {/* Instagram Image */}
              <motion.div
                className="absolute w-[240px] sm:w-[380px] right-4 sm:right-0 top-[280px] sm:top-[220px]"
                initial={{ opacity: 0, y: 50, rotate: 5 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotate: 5,
                  transition: {
                    type: "spring",
                    stiffness: 50,
                    damping: 15,
                    delay: 0.1,
                  }
                }}
                viewport={{ margin: "-50px" }}
                style={{ willChange: 'transform' }}
              >
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg">
                  <img 
                    src="whatsapp , insta/2.png" 
                    alt="Instagram Interface" 
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </motion.div>

              {/* Reduced number of particles for better performance */}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    background: i % 2 === 0 
                      ? "linear-gradient(45deg, rgba(37, 211, 102, 0.3), rgba(37, 211, 102, 0.1))"
                      : "linear-gradient(45deg, rgba(193, 53, 132, 0.3), rgba(193, 53, 132, 0.1))",
                    filter: "blur(1px)",
                    willChange: 'transform'
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                    y: [0, -15, 0],
                    x: [0, Math.random() * 10 - 5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Right Content - Adjusted for mobile */}
          <motion.div
            className="w-full lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.h2
              className="text-5xl sm:text-5xl md:text-8xl font-bold mb-4 sm:mb-6 mx-auto lg:mx-0 max-w-[15ch]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                background: 'linear-gradient(to right, #fff, #6366F1, #fff)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'shine 8s linear infinite',
              }}
            >
              AI-Powered Support
            </motion.h2>
            <motion.p
              className="text-gray-400 text-lg sm:text-xl mb-8 sm:mb-12 mx-auto lg:mx-0 max-w-[35ch]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Engage customers instantly on WhatsApp, Instagram, and Facebook
            </motion.p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 gap-6 sm:gap-8 mb-8 sm:mb-12 max-w-lg mx-auto lg:mx-0">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.15,
                    ease: "easeOut"
                  }}
                >
                  <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 backdrop-blur-sm border border-indigo-500/20 shadow-xl group hover:from-indigo-500/20 hover:to-violet-500/20 transition-all duration-300 shrink-0">
                    {feature.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-semibold mb-1 sm:mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm sm:text-base">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button - centered on mobile, left-aligned on desktop */}
            <div className="flex justify-center lg:justify-start">
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={{
                  hover: { scale: 1.05 },
                  tap: { scale: 0.95 }
                }}
                className="group relative rounded-full"
              >
                {/* Button Container */}
                <div className="relative px-8 py-4 rounded-full">
                  {/* Outer Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-fuchsia-500/30 to-purple-600/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                  
                  {/* Moving Particles Background */}
                  <div className="absolute inset-0 overflow-hidden rounded-full">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-purple-400 rounded-full"
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
                  <div className="absolute inset-0 bg-black border border-purple-500/50 group-hover:border-purple-400 rounded-full" />
                  
                  {/* Animated Border Lines */}
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent"
                      animate={{
                        x: [-100, 100, -100],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent"
                      animate={{
                        x: [100, -100, 100],
                        opacity: [0.3, 1, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  </div>

                  {/* Button Content */}
                  <div className="relative flex items-center gap-3">
                    <div className="relative">
                      <span className="text-base sm:text-lg font-medium bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                        See how AI works
                      </span>
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent"
                        animate={{
                          scaleX: [0, 1, 0],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </div>
                    <motion.div
                      animate={{
                        x: [0, 5, 0],
                        y: [0, -2, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 group-hover:text-white transition-colors duration-300" />
                    </motion.div>
                  </div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AdvancedChatbotSection; 