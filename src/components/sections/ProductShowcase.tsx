import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bot, User, Zap, Clock, Globe, Shield, Brain, Sparkles, Cpu, Users, DollarSign, Scale } from 'lucide-react';

// Premium AI vs Human visuals
const aiVisual = "https://media.licdn.com/dms/image/v2/D5612AQGTYdPfsL3afw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1721838400002?e=2147483647&v=beta&t=WW-Tw2KnU4PXsxpnDqOXg1ZIACs6BiqgDx8FfwNJAPM";
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
        value: "6hrs",
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
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen py-12 sm:py-24 overflow-hidden bg-[#030014]"
      style={{
        backgroundImage: `url(${aiBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Optimized Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030014] via-purple-900/10 to-[#030014]" />
        
        {/* Single gradient line for better performance */}
        <motion.div
          className="absolute h-px w-full top-1/2 -translate-y-1/2"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.2), transparent)'
          }}
          animate={{
            x: [-1000, 1000],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Content Container with improved mobile layout */}
      <motion.div 
        className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* Premium Header with mobile optimization */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-4 sm:mb-6"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Future of Customer Service
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
            <span className="block bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              AI vs Human
            </span>
            <span className="block text-lg sm:text-2xl md:text-3xl mt-2 sm:mt-3 text-gray-400 font-light">
              The Evolution of Customer Experience
            </span>
          </h2>
        </div>

        {/* Optimized Comparison Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 max-w-[1000px] mx-auto">
          {Object.entries(comparisonData).map(([key, data], index) => (
            <motion.div
              key={key}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/10 h-full transition-all duration-300 group-hover:border-purple-500/30">
                {/* Visual Section */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={data.visual}
                    alt={data.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/50 to-transparent" />
                  
                  {/* Title on Image */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl bg-gradient-to-r ${data.gradient} bg-opacity-20 backdrop-blur-xl border border-white/20`}>
                        <data.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{data.title}</h3>
                        <p className="text-sm text-purple-400">{data.subtitle}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-6">
                  <p className="text-sm text-gray-400 mb-6">
                    {data.description}
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {data.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="group/item relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                        <div className="relative p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300 border border-white/5">
                          <feature.icon className="w-5 h-5 text-purple-400 mb-1.5" />
                          <div className="text-lg font-bold text-white mb-0.5">{feature.value}</div>
                          <div className="text-xs text-gray-400">{feature.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {data.stats.map((stat, idx) => (
                      <div
                        key={idx}
                        className="group/item relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                        <div className="relative p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-300 border border-white/5">
                          <stat.icon className="w-5 h-5 text-purple-400 mb-1.5" />
                          <div className="text-lg font-bold text-white mb-0.5">{stat.value}</div>
                          <div className="text-xs text-gray-400">{stat.description}</div>
                        </div>
                      </div>
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
