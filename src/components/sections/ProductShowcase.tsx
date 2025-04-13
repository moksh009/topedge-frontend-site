import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bot, User, Zap, Clock, Globe, Shield, Brain, Sparkles, Cpu, Users, DollarSign, Scale } from 'lucide-react';

// Premium AI vs Human visuals
const aiVisual = "https://biglysales.com/wp-content/uploads/2024/06/AI-cold-calling-AI-in-call-centers-AI-in-contact-centers-AI-for-calls-An-AI-robo-call-center-agent-at-work-Bigly-Sales.webp";
const humanVisual = "https://www.shutterstock.com/image-photo/tired-angry-stress-business-man-600nw-2193338535.jpg";
const aiBackground = "https://t3.ftcdn.net/jpg/05/60/23/88/360_F_560238887_dv42qBzyHomI5FHKWsiO6CfOFpEUUQx1.jpg";

const comparisonData = {
  ai: {
    icon: Bot,
    title: "AI Assistant",
    subtitle: "Next Generation",
    description: "Experience superhuman efficiency with our AI-powered solution",
    features: [
      {
        icon: Zap,
        title: "Lightning Fast",
        value: "0.3s",
        description: "Average response time"
      },
      {
        icon: Globe,
        title: "Multilingual",
        value: "50+",
        description: "Languages supported"
      },
      {
        icon: Brain,
        title: "Self-Learning",
        value: "24/7",
        description: "Available to respond"
      },
      {
        icon: Cpu,
        title: "Processing",
        value: "97%",
        description: "Accuracy rate"
      }
    ],
    stats: [
      {
        icon: DollarSign,
        title: "Cost Reduction",
        value: "90%",
        description: "Savings on operations"
      },
      {
        icon: Scale,
        title: "Scalability",
        value: "Well Trained",
        description: "Unlimited potential"
      }
    ],
    cta: "Experience AI",
    visual: aiVisual,
    gradient: "from-violet-600 to-indigo-600",
    link: "/services/AIAgentInteraction"
  },
  human: {
    icon: User,
    title: "Human Agent",
    subtitle: "Traditional Approach",
    description: "Conventional customer service with a personal touch",
    features: [
      {
        icon: Clock,
        title: "Response Time",
        value: "6min",
        description: "Average wait time"
      },
      {
        icon: Globe,
        title: "Capacity",
        value: "2+",
        description: "Max 3-4 language only"
      },
      {
        icon: Brain,
        title: "Languages",
        value: "8hrs",
        description: "only Available to respond"
      },
      {
        icon: Cpu,
        title: "CPU",
        value: "65%",
        description: "Accuracy rate"
      }
    ],
    stats: [
      {
        icon: DollarSign,
        title: "Cost",
        value: "High",
        description: "Operational expenses"
      },
      {
        icon: Scale,
        title: "Scale",
        value: "Biases & Human Error",
        description: "Not Experienced"
      }
    ],
    cta: "Compare Now",
    visual: humanVisual,
    gradient: "from-blue-600 to-cyan-600",
    link: "/services/ChatbotShowcase"
  }
};

const ProductShowcase = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-24 overflow-hidden bg-[#030014]"
      style={{
        backgroundImage: `url(${aiBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030014] via-purple-900/10 to-[#030014]" />
        
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Neural Network Effect */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px"
              style={{
                width: '100%',
                top: `${20 * (i + 1)}%`,
                background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.3), transparent)',
                transform: 'translateZ(0)',
              }}
              animate={{
                x: [-1000, 1000],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content Container */}
      <motion.div 
        className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"
        style={{ opacity, y }}
      >
        {/* Premium Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-6"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Future of Customer Service
            </span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            <motion.span
              className="block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: '200% auto' }}
            >
              AI vs Human
            </motion.span>
            <span className="block text-xl sm:text-2xl md:text-3xl mt-3 text-gray-400 font-light">
              The Evolution of Customer Experience
            </span>
          </h2>
        </div>

        {/* Premium Comparison Cards */}
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 max-w-[1000px] mx-auto">
          {Object.entries(comparisonData).map(([key, data], index) => (
            <motion.div
              key={key}
              className="group relative"
              initial={{ 
                opacity: 0, 
                x: index === 0 ? -200 : 200,
                rotateY: index === 0 ? -10 : 10
              }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                rotateY: 0
              }}
              viewport={{ once: true }}
              transition={{ 
                type: "spring",
                damping: 20,
                stiffness: 100,
                duration: 0.8,
                delay: index * 0.2 
              }}
              whileHover={{ 
                scale: 1.02,
                rotateY: index === 0 ? 2 : -2,
                transition: { duration: 0.3 }
              }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 h-full transition-all duration-500 group-hover:border-purple-500/30 group-hover:shadow-2xl group-hover:shadow-purple-500/20">
                {/* Visual Section */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <motion.img
                    src={data.visual}
                    alt={data.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.2 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/50 to-transparent"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                  
                  {/* Floating Title on Image */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl bg-gradient-to-r ${data.gradient} bg-opacity-20 backdrop-blur-xl border border-white/20`}>
                        <data.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{data.title}</h3>
                        <p className="text-sm text-purple-400">{data.subtitle}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="relative p-4 sm:p-6">
                  <motion.p 
                    className="text-sm text-gray-400 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                  >
                    {data.description}
                  </motion.p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {data.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1 + idx * 0.1 }}
                        className="group/item relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                        <div className="relative p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300 border border-white/5">
                          <feature.icon className="w-5 h-5 text-purple-400 mb-1.5" />
                          <div className="text-lg font-bold text-white mb-0.5">{feature.value}</div>
                          <div className="text-xs text-gray-400">{feature.description}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {data.stats.map((stat, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1.4 + idx * 0.1 }}
                        className="group/item relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                        <div className="relative p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300 border border-white/5">
                          <stat.icon className="w-5 h-5 text-purple-400 mb-1.5" />
                          <div className="text-lg font-bold text-white mb-0.5">{stat.value}</div>
                          <div className="text-xs text-gray-400">{stat.description}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProductShowcase;
