import SEO from '../components/SEO';
import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, Bot, Cpu, Brain, Sparkles, MessageSquare, TrendingUp, Zap, User2, BadgeDollarSign } from 'lucide-react';
import { ServiceProcess } from '../components/sections/services/ServiceProcess';
import ChatbotShowcase from '../components/sections/services/ChatbotShowcase';
import { AIAgentInteraction } from '../components/sections/services/AIAgentInteraction';
import { ServiceCTA } from '../components/sections/services/ServiceCTA';
import { ChatbotProcess } from '../components/sections/services/ChatbotProcess';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { LucideIcon } from 'lucide-react';

interface PremiumButtonProps {
  icon: LucideIcon;
  text: string;
  to: string;
  gradient?: string;
}

const PremiumButton: React.FC<PremiumButtonProps & { onClick?: () => void }> = ({ 
  icon: Icon, 
  text, 
  to, 
  onClick
}) => (
  <Link to={to} className="w-full sm:w-auto" onClick={e => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  }}>
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
        
        {/* Floating orbs/particles removed for clean background */}

        {/* Main Button Background */}
        <div className="absolute inset-0 bg-theme-bg-surface/80 backdrop-blur-sm border border-theme-border-primary group-hover:border-theme-border-accent transition-all duration-300 rounded-full" />
        
        {/* Button Content */}
        <div className="relative flex items-center justify-center gap-3">
          <div className="flex items-center justify-center gap-3">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 group-hover:text-purple-600 transition-colors duration-300" />
            <span className="text-base sm:text-lg font-medium bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600 bg-clip-text text-transparent">
              {text}
            </span>
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
            <span className="text-purple-500 group-hover:text-purple-600 transition-colors duration-300">→</span>
          </motion.div>
        </div>
      </div>
    </motion.button>
  </Link>
);

const Services: React.FC = () => {
  // Services page SEO metadata
  const seoTitle = 'AI Services';
  const seoDescription = 'Discover TopEdge AI’s full suite of AI services, including voice agents, chatbots, automation, and consulting. Accelerate your business with our tailored AI solutions.';
  
  const containerRef = useRef(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 30]);

  // Define floating icons before using them
  const floatingIcons = useMemo(() => [
    {
      Icon: Bot,
      position: { left: '15', top: '20' },
      color: 'text-purple-400',
      animation: {
        y: [-40, 20, -40],
        rotate: [0, 360],
      },
      duration: { y: 4, rotate: 8 }
    },
    {
      Icon: Brain,
      position: { right: '15', top: '85' },
      color: 'text-yellow-400',
      animation: {
        y: [40, -40, 40],
        rotate: [360, 0],
      },
      duration: { y: 4, rotate: 8 }
    },
    {
      Icon: User2,
      position: { right: '15', top: '45' },
      color: 'text-red-500 bg-gradient-to-br from-red-400 to-red-600 bg-clip-text text-transparent',
      animation: {
        y: [40, -40, 40],
        rotate: [360, 0],
      },
      duration: { y: 4, rotate: 8 }
    },
    {
      Icon: BadgeDollarSign,
      position: { right: '45', top: '85' },
      color: 'text-green-500 bg-gradient-to-br from-green-400 to-green-600 bg-clip-text text-transparent',
      animation: {
        y: [40, -40, 40],
        rotate: [360, 0],
      },
      duration: { y: 4, rotate: 8 }
    },
    {
      Icon: Cpu,
      position: { left: '40', bottom: '80' },
      color: 'text-purple-500',
      animation: {
        y: [-30, 30, -30],
        x: [-20, 20, -20],
        rotate: [0, -360],
      },
      duration: { y: 5, x: 6, rotate: 10 }
    },
    {
      Icon: TrendingUp,
      position: { right: '40', bottom: '80' },
      color: 'text-emerald-500',
      animation: {
        y: [20, -20, 20],
        x: [20, -20, 20],
        rotate: [360, 0],
      },
      duration: { y: 6, x: 5, rotate: 10 }
    },
    {
      Icon: Zap,
      position: { left: '10', top: '80' },
      color: 'text-rose-500',
      animation: {
        y: [-15, 15, -15],
        x: [-25, 25, -25],
        rotate: [180, -180],
      },
      duration: { y: 7, x: 8, rotate: 12 }
    }
  ], []);

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords="AI services, TopEdge AI, voice agents, chatbots, automation, AI consulting, business automation"
        type="website"
      />
      {/* BreadcrumbList Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://topedge.ai/'
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Services',
                'item': 'https://topedge.ai/services'
              }
            ]
          })
        }}
      />
      <div className="bg-theme-bg-primary text-theme-text-primary font-sans overflow-x-hidden w-full relative pt-20 sm:pt-0">
      <motion.section 
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-theme-bg-primary py-16 sm:py-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Background */}
        <div className="absolute inset-0">
          {/* Primary gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-theme-bg-primary via-theme-bg-primary to-theme-bg-primary opacity-90" />
          
          {/* Grid pattern */}
          <div className="absolute inset-0" 
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(var(--text-primary), 0.05) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        {/* Floating icons */}
        {floatingIcons.map(({ Icon, position, color, animation, duration }, index) => (
          <motion.div
            key={index}
            className={`absolute ${color}/40`}
            style={{
              left: position.left ? `${position.left}%` : undefined,
              right: position.right ? `${position.right}%` : undefined,
              top: position.top ? `${position.top}%` : undefined,
              bottom: position.bottom ? `${position.bottom}%` : undefined,
            }}
            animate={animation}
            transition={{
              y: {
                duration: duration.y,
                repeat: Infinity,
                ease: "easeInOut",
              },
              x: duration.x ? {
                duration: duration.x,
                repeat: Infinity,
                ease: "easeInOut",
              } : undefined,
              rotate: {
                duration: duration.rotate,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            <Icon className={index < 2 ? "w-16 h-16" : index < 4 ? "w-12 h-12" : "w-10 h-10"} />
          </motion.div>
        ))}

        {/* Content */}
        <motion.div 
          ref={ref}
          className="relative container mx-auto px-4 z-10"
          style={{
            scale,
            opacity,
            y
          }}
        >
          <motion.div
            className="max-w-7xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Pre-title with enhanced styling */}
            <motion.p
              className="text-lg md:text-xl tracking-[0.6em] uppercase font-medium mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                background: "linear-gradient(to right, #18181b, #a21caf, #c084fc)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundSize: "200% auto",
                animation: "shine 8s linear infinite",
                textShadow: "0 0 20px #a21caf33"
              }}
            >
              Welcome to TopEdge
            </motion.p>

            {/* Main Title with enhanced animation */}
            <motion.h1 
              className="text-7xl sm:text-8xl md:text-9xl font-bold tracking-tight mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.span
                className="inline-block relative"
                style={{
                  backgroundImage: "linear-gradient(to right, rgb(var(--text-primary)), rgb(147, 51, 234), rgb(var(--text-primary)))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "200% auto",
                  animation: "shine 8s linear infinite",
                }}
              >
                <motion.span
                  className="absolute inset-0 blur-lg opacity-50"
                  style={{
                    backgroundImage: "linear-gradient(to right, rgb(var(--text-primary)), rgb(147, 51, 234), rgb(var(--text-primary)))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundSize: "200% auto",
                    animation: "shine 8s linear infinite",
                  }}
                >
                  Our Services
                </motion.span>
                Our Services
              </motion.span>
            </motion.h1>

            {/* Description with subtle animation */}
            <motion.p 
              className="text-2xl sm:text-3xl md:text-4xl text-theme-text-primary/90 font-light max-w-4xl mx-auto leading-relaxed mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              style={{
                textShadow: "0 0 20px rgba(var(--glow-primary), 0.1)"
              }}
            >
              Unlock the power of AI with innovative solutions designed for efficiency, automation, and growth.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <PremiumButton 
  icon={Bot} 
  text="AI Caller" 
  to="#ai-agent-interaction"
  onClick={() => {
    const section = document.getElementById('ai-agent-interaction');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }}
/>
<PremiumButton 
  icon={MessageSquare} 
  text="Chatbot" 
  to="#chatbot-showcase"
  onClick={() => {
    const section = document.getElementById('chatbot-showcase');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }}
/>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Rest of the sections */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ 
          willChange: 'transform',
          transform: 'translate3d(0,0,0)',
          backfaceVisibility: 'hidden'
        }}
      >
        <ServiceProcess />
        <div className="relative z-10" id="ai-agent-interaction">
          <AIAgentInteraction />
        </div>
        <div className="relative z-10">
          <ChatbotShowcase />
        </div>
        <ChatbotProcess/>
        <ServiceCTA />
      </motion.div>
    </div>
    </>
  );
};

export default Services;
