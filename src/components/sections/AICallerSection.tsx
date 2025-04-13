import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Phone, Play, Mic, Waves, Bot, Shield, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: <Bot className="w-7 h-7 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" />,
    title: "Smart Call Handling",
    description: "AI answers calls 24/7, qualifies leads, and books meetings instantly"
  },
  {
    icon: <Waves className="w-7 h-7 text-violet-400 group-hover:text-violet-300 transition-colors duration-300" />,
    title: "50+ Languages",
    description: "Break language barriers and expand your global reach"
  },
  {
    icon: <Shield className="w-7 h-7 text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors duration-300" />,
    title: "Lead Prioritization",
    description: "Route high-value prospects to your team automatically"
  }
];

const AICallerSection = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const handleDemoClick = () => {
    navigate('/services');
  };

  return (
    <motion.section
      ref={containerRef}
      id="ai-caller-demo"
      className="relative min-h-screen bg-[#000000] py-12 sm:py-20 overflow-hidden"
      style={{
        opacity,
        scale
      }}
    >
      {/* Premium Background Effects */}
      <motion.div 
        className="absolute inset-0"
        style={{
          y: useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#050505] to-[#000000]" />
        
        {/* Neural Network Grid */}
        <motion.div 
          className="absolute inset-0"
          style={{
            scale: useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 0.9])
          }}
        >
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `radial-gradient(circle at center, rgba(32, 33, 60, 0.1) 0%, transparent 70%)`,
              transform: 'scale(1.5)',
            }}
          />
          
          {/* Animated Lines */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-full"
              style={{
                top: `${(i + 1) * 10}%`,
                background: 'linear-gradient(90deg, transparent, rgba(32, 33, 60, 0.2), transparent)',
                transform: 'translateZ(0)',
              }}
              animate={{
                x: [-1000, 1000],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "linear",
              }}
            />
          ))}

          {/* Floating Particles */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#20213C]/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
                y: [0, -30, 0],
              }}
              transition={{
                duration: Math.random() * 2 + 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Content Container */}
      <div className="relative container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left Content */}
          <motion.div
            className="w-full lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2
              className="text-4xl sm:text-5xl md:text-8xl font-bold mb-4 sm:mb-6 mx-auto lg:mx-0 max-w-[15ch]"
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
              Never Miss a <br/>Single call
            </motion.h2>
            <motion.p
              className="text-gray-400 text-lg sm:text-xl mb-8 sm:mb-12 mx-auto lg:mx-0 max-w-[35ch]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              AI voice agent handles unlimited calls 24/7, turning inquiries into revenue
            </motion.p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 gap-6 sm:gap-8 mb-8 sm:mb-12 max-w-lg mx-auto lg:mx-0">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.15,
                    ease: "easeOut"
                  }}
                >
                  <div className="p-3 sm:p-4 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 backdrop-blur-sm border border-indigo-500/30 shadow-xl group hover:from-indigo-500/30 hover:to-violet-500/30 transition-all duration-300 shrink-0">
                    {feature.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-white font-semibold mb-1 sm:mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm sm:text-base">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Single CTA Button */}
            <div className="flex justify-center lg:justify-start">
              <motion.button
                onClick={handleDemoClick}
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

          {/* Right Content - EVE Image */}
          <motion.div
            className="w-full lg:w-1/2 mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative w-full h-[700px] mx-auto">
              {/* EVE Image */}
              <motion.div
                className="relative w-full h-full"
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src="whatsapp , insta/eev.png"
                  alt="EVE AI Assistant"
                  className="w-full h-full object-contain"
                />
              </motion.div>

              {/* Enhanced Glow Effect */}
                <motion.div
                className="absolute inset-0 blur-3xl"
                  style={{
                    background: 'linear-gradient(45deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2))',
                  }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AICallerSection; 
