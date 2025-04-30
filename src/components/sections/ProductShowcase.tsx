import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bot, User, Zap, Clock, Globe, Shield, Brain, Sparkles, Cpu, Users, DollarSign, Scale, Package, Star, BadgeCheck } from 'lucide-react';

// Product comparison visuals
const aiVisual = "https://media.licdn.com/dms/image/v2/D5612AQGTYdPfsL3afw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1721838400002?e=2147483647&v=beta&t=WW-Tw2KnU4PXsxpnDqOXg1ZIACs6BiqgDx8FfwNJAPM";
const humanVisual = "https://www.shutterstock.com/image-photo/tired-angry-stress-business-man-600nw-2193338535.jpg";

const comparisonData = {
  ai: {
    title: "",
    subtitle: "",
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
        value: "100%",
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
    gradient: "from-theme-glow-primary to-theme-glow-secondary",
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
        value: "Limited",
        description: "Support Ticket Handling"
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
    gradient: "from-blue-400 to-cyan-400",
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
      className="relative min-h-screen py-12 sm:py-24 overflow-hidden bg-theme-bg-primary"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-theme-bg-primary via-theme-glow-primary/5 to-theme-bg-primary" />
        
        {/* Single gradient line */}
        <motion.div
          className="absolute h-px w-full top-1/2 -translate-y-1/2"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(var(--text-accent), 0.2), transparent)'
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

      {/* Add floating icons as background decorations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute left-40 top-24 text-blue-400/40"
          animate={{ y: [-10, 10, -10], rotate: [0, 360, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <Package className="w-20 h-20" />
        </motion.div>
        <motion.div
          className="absolute right-32 bottom-28 text-yellow-400/50"
          animate={{ x: [8, -8, 8], rotate: [0, -180, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <Star className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute left-1/4 bottom-32 text-emerald-400/50"
          animate={{ y: [12, -12, 12], rotate: [0, 180, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          <BadgeCheck className="w-16 h-16" />
        </motion.div>
      </div>

      {/* Content Container */}
      <motion.div 
        className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 rounded-full bg-white/5 px-6 py-3 relative overflow-hidden mb-4 sm:mb-6"
          >
            {/* Premium border design */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-theme-glow-primary/20 via-theme-glow-accent/20 to-theme-glow-secondary/20 animate-gradient-xy" />
              <div className="absolute inset-0 backdrop-blur-xl" />
              <div className="absolute inset-0 border-[1.5px] border-white/10 rounded-full" />
              <div className="absolute inset-0 bg-white/5" />
            </div>

            {/* Content */}
            <Sparkles className="relative w-4 h-4 text-blue-400" />
            <span className="relative text-sm font-medium text-black/90">
              Future of Customer Service
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
            <span className="block bg-gradient-to-r from-theme-text-primary via-theme-text-accent to-theme-text-primary bg-clip-text text-transparent">
              AI vs Human
            </span>
            <span className="block text-lg sm:text-2xl md:text-3xl mt-2 sm:mt-3 text-theme-text-secondary font-light">
              The Evolution of Customer Experience
            </span>
          </h2>
        </div>

        {/* Comparison Cards Grid */}
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 max-w-[1000px] mx-auto">
          {Object.entries(comparisonData).map(([key, data], index) => (
            <motion.div
              key={key}
              className="group relative"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-theme-bg-secondary/30 to-theme-bg-secondary/10 backdrop-blur-xl border-[1.5px] border-theme-border-primary/30 h-full transition-all duration-300 group-hover:border-theme-border-accent/40 shadow-lg hover:shadow-xl">
                {/* Visual Section */}
                <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl">
                  <picture>
                    <source srcSet={data.visual.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
                    <img
                      src={data.visual}
                      loading="lazy"
                      width={320}
                      height={180}
                      alt={data.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </picture>

                  
                  {/* Title on Image */}
                 
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <p className="text-sm text-theme-text-secondary mb-8">
                    {data.description}
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {data.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="group/item relative rounded-xl overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-theme-glow-primary/5 to-transparent opacity-70 group-hover/item:opacity-100 transition-opacity duration-300" />
                        <div className="relative p-4 rounded-xl bg-theme-bg-surface/30 transition-all duration-300 border-[1.5px] border-theme-border-accent/30 group-hover/item:border-theme-border-accent/40">
                          <feature.icon className="w-5 h-5 text-theme-text-accent mb-2" />
                          <div className="text-lg font-bold text-theme-text-primary mb-1">{feature.value}</div>
                          <div className="text-xs text-theme-text-secondary">{feature.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {data.stats.map((stat, idx) => (
                      <div
                        key={idx}
                        className="group/item relative rounded-xl overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-theme-glow-primary/5 to-transparent opacity-90 group-hover/item:opacity-100 transition-opacity duration-300" />
                        <div className="relative p-4 rounded-xl bg-theme-bg-surface/30 transition-all duration-300 border-[1.5px] border-theme-border-accent/30 group-hover/item:border-theme-border-accent/40">
                          <stat.icon className="w-5 h-5 text-theme-text-accent mb-2" />
                          <div className="text-lg font-bold text-theme-text-primary mb-1">{stat.value}</div>
                          <div className="text-xs text-theme-text-secondary">{stat.description}</div>
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
