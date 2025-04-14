import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Brain, Bot, Database, Cloud, LineChart, Lock } from 'lucide-react';

interface TechnologyCard {
  icon: JSX.Element;
  title: string;
  description: string;
  color: string;
  features: string[];
}

const technologies: TechnologyCard[] = [
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Advanced AI Solutions",
    description: "State-of-the-art artificial intelligence solutions powered by deep learning",
    color: "from-violet-600 to-purple-600",
    features: ["Neural Networks", "Deep Learning", "Computer Vision"]
  },
  {
    icon: <Bot className="w-8 h-8" />,
    title: "Intelligent Automation",
    description: "Smart automation systems that learn and adapt to your needs",
    color: "from-blue-600 to-cyan-600",
    features: ["Process Automation", "Smart Workflows", "Adaptive Systems"]
  },
  {
    icon: <Database className="w-8 h-8" />,
    title: "Big Data Analytics",
    description: "Transform raw data into actionable intelligence with AI",
    color: "from-emerald-600 to-teal-600",
    features: ["Predictive Analytics", "Real-time Processing", "Data Mining"]
  },
  {
    icon: <Cloud className="w-8 h-8" />,
    title: "Cloud AI Platform",
    description: "Scalable cloud infrastructure for AI/ML workloads",
    color: "from-orange-600 to-amber-600",
    features: ["Auto-scaling", "GPU Acceleration", "Model Deployment"]
  },
  {
    icon: <LineChart className="w-8 h-8" />,
    title: "Predictive Intelligence",
    description: "Forecast trends and make data-driven decisions",
    color: "from-pink-600 to-rose-600",
    features: ["Time Series Analysis", "Pattern Recognition", "Risk Assessment"]
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: "Secure AI Systems",
    description: "Enterprise-grade security for AI applications",
    color: "from-indigo-600 to-violet-600",
    features: ["Encryption", "Access Control", "Compliance"]
  }
];

const TechnologyShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const springConfig = { stiffness: 100, damping: 30 };
  const mouseX = useSpring(useMotionValue(0), springConfig);
  const mouseY = useSpring(useMotionValue(0), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen bg-black py-20 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Innovative Background */}
      <div className="absolute inset-0">
        {/* Hexagonal Grid */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill-opacity='0.02' fill='%23ffffff'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Dynamic Neural Connections */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px"
            style={{
              width: Math.random() * 300 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `linear-gradient(90deg, transparent, rgba(${Math.random() * 255},${Math.random() * 255},255,${Math.random() * 0.5}), transparent)`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.5, 0],
              x: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Interactive Glow Effect */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139,92,246,0.1), transparent)`,
            mixBlendMode: 'plus-lighter',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4">
        {/* Title Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
            style={{
              background: 'linear-gradient(to right, #fff 20%, #a855f7 50%, #fff 80%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shine 8s linear infinite',
            }}
          >
            AI Innovation Hub
          </motion.h2>
        </motion.div>

        {/* 3D Floating Cards */}
        <div className="relative perspective-1000">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  rotateX: 5,
                  rotateY: 5,
                  z: 50
                }}
              >
                {/* Card Container */}
                <div className="relative rounded-2xl overflow-hidden transform-gpu transition-all duration-300 group-hover:shadow-2xl">
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(45deg, ${tech.color.split(' ')[0].replace('from-', '')}33, ${tech.color.split(' ')[1].replace('to-', '')}33)`,
                    }}
                    animate={{
                      background: [
                        `linear-gradient(45deg, ${tech.color.split(' ')[0].replace('from-', '')}33, ${tech.color.split(' ')[1].replace('to-', '')}33)`,
                        `linear-gradient(225deg, ${tech.color.split(' ')[0].replace('from-', '')}33, ${tech.color.split(' ')[1].replace('to-', '')}33)`,
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />

                  {/* Content */}
                  <div className="relative p-8 backdrop-blur-sm">
                    {/* Icon */}
                    <motion.div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${tech.color} p-4 mb-6`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="text-white">{tech.icon}</div>
                    </motion.div>

                    {/* Title & Description */}
                    <h3 className="text-2xl font-bold text-white mb-4">{tech.title}</h3>
                    <p className="text-gray-300 mb-6">{tech.description}</p>

                    {/* Features */}
                    <div className="space-y-1">
                      {tech.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center space-x-2"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                        >
                          <motion.div
                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${tech.color}`}
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 1, 0.5],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: i * 0.1,
                            }}
                          />
                          <span className="text-gray-400">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Hover Border Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        border: '2px solid transparent',
                        background: `linear-gradient(45deg, ${tech.color.split(' ')[0].replace('from-', '')}, ${tech.color.split(' ')[1].replace('to-', '')}) border-box`,
                        WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                        WebkitMaskComposite: 'destination-out',
                        maskComposite: 'exclude',
                      }}
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Interactive Mouse Glow */}
      <motion.div
        className="fixed w-[800px] h-[800px] pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
          mixBlendMode: 'plus-lighter',
        }}
      />
    </motion.section>
  );
};

export default TechnologyShowcase; 