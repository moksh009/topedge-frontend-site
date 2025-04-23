import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Bot, User, Sparkles, Scale, BarChart2, CheckCircle2 } from 'lucide-react';

interface Message {
  id: number;
  type: 'traditional' | 'topedge';
  content: string;
  typingDuration?: number;
}

export const ComparisonSection = () => {
  const [activeMessageIndex, setActiveMessageIndex] = useState(-1);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  const messages: Message[] = [
    {
      id: 1,
      type: 'traditional',
      content: "I\'m stuck with a fixed-cost subscription, even if I barely use the service…",
      typingDuration: 1000
    },
    {
      id: 2,
      type: 'topedge',
      content: "Pay only for what you use! no hidden charges—just pure efficiency.",
      typingDuration: 1500
    },
    {
      id: 3,
      type: 'traditional',
      content: "They charge extra for after-hours calls. Why should I pay more for better availability?",
      typingDuration: 2000
    },
    {
      id: 4,
      type: 'topedge',
      content: "We operate 24/7—handling inquiries, scheduling appointments, and even forwarding calls at no extra cost!",
      typingDuration: 2500
    },
    {
      id: 5,
      type: 'traditional',
      content: "I need specific features, but customization costs a fortune.",
      typingDuration: 1000
    },
    {
      id: 6,
      type: 'topedge',
      content: "We offer full customization at zero extra cost. Need a feature? We\'ll build it for you!",
      typingDuration: 2500
    },
    {
      id: 7,
      type: 'traditional',
      content: "We lose valuable customer information because our system has no memory of past conversations.",
      typingDuration: 1000
    },
    {
      id: 8,
      type: 'topedge',
      content: "Our AI remembers every call, building a customer database that helps you deliver personalized experiences effortlessly.",
      typingDuration: 2500
    }
  ];

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      startMessageSequence();
    }
  }, [isInView, controls]);

  const startMessageSequence = () => {
    setActiveMessageIndex(0);
  };

  useEffect(() => {
    if (activeMessageIndex >= 0 && activeMessageIndex < messages.length) {
      const timer = setTimeout(() => {
        setActiveMessageIndex(prev => prev + 1);
      }, 2000); // Show next message after 2 seconds

      return () => clearTimeout(timer);
    }
  }, [activeMessageIndex]);

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15, // Faster delay between messages
        duration: 0.3,   // Faster animation
        ease: "easeOut"
      }
    })
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 // Faster stagger
      }
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="relative py-8 sm:py-24 overflow-hidden bg-theme-bg-primary font-sans"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-theme-glow-primary/30 via-transparent to-theme-glow-secondary/30" />
        
        {/* Animated gradient lines */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] w-full"
            style={{
              top: `${40 * (i + 1)}%`,
              background: 'linear-gradient(90deg, transparent, rgba(var(--text-accent), 0.2), transparent)',
              willChange: 'transform'
            }}
            animate={{
              x: [-1000, 1000],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Add floating icons as background decorations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute left-32 top-16 text-blue-400/40"
          animate={{ y: [-10, 10, -10], rotate: [0, 360, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <Scale className="w-20 h-20" />
        </motion.div>
        <motion.div
          className="absolute right-40 bottom-32 text-yellow-400/50"
          animate={{ x: [8, -8, 8], rotate: [0, -180, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <BarChart2 className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute left-1/4 bottom-24 text-emerald-400/50"
          animate={{ y: [12, -12, 12], rotate: [0, 180, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          <CheckCircle2 className="w-16 h-16" />
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="relative container mx-auto px-3 sm:px-4">
        {/* Title */}
        <motion.div 
          className="text-center mb-6 sm:mb-16"
          variants={messageVariants}
          custom={0}
        >
          <h2 className="text-2xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-6">
            <span className="bg-gradient-to-r from-theme-text-primary via-theme-text-accent to-theme-text-primary bg-clip-text text-transparent">
              Traditional vs TopEdge
            </span>
          </h2>
          <p className="text-theme-text-secondary text-sm sm:text-lg max-w-2xl mx-auto px-3 sm:px-4">
            Experience how TopEdge transforms traditional development challenges
          </p>
        </motion.div>

        {/* Messages Container */}
        <div className="relative max-w-4xl mx-auto min-h-[350px] sm:min-h-[500px]">
          <motion.div 
            className="space-y-4 sm:space-y-6"
            variants={containerVariants}
          >
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                variants={messageVariants}
                custom={index + 1}
                className={`flex items-start gap-3 sm:gap-4 ${
                  message.type === 'topedge' ? 'justify-end' : 'justify-start'
                }`}
              >
                {/* Enhanced Message Bubble */}
                <motion.div
                  className={`relative max-w-[calc(100%-3rem)] sm:max-w-xl px-4 sm:px-6 py-3 sm:py-4 rounded-2xl ${
                    message.type === 'topedge'
                      ? 'bg-gradient-to-br from-theme-glow-primary/15 to-theme-glow-secondary/15 backdrop-blur-xl border-[1.5px] border-theme-border-accent/30'
                      : 'bg-gradient-to-br from-white/80 to-white/90 backdrop-blur-xl border-[1.5px] border-gray-200/80 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]'
                  }`}
                  style={{
                    order: message.type === 'topedge' ? 1 : 2,
                    boxShadow: message.type === 'topedge' 
                      ? '0 8px 32px -4px rgba(var(--glow-primary), 0.15), 0 4px 8px -2px rgba(var(--glow-secondary), 0.1)'
                      : '0 8px 32px -4px rgba(0, 0, 0, 0.05), 0 4px 8px -2px rgba(0, 0, 0, 0.03)',
                  }}
                >
                  <div className={`text-sm sm:text-base font-medium ${
                    message.type === 'topedge' ? 'text-theme-text-primary' : 'text-gray-700'
                  }`}>
                    {message.content}
                  </div>

                  {/* Enhanced Badge for TopEdge */}
                  {message.type === 'topedge' && (
                    <div className="absolute -top-2.5 sm:-top-3 right-3 sm:right-4 px-2.5 sm:px-3.5 py-1 bg-gradient-to-r from-theme-glow-primary/90 to-theme-glow-secondary/90 rounded-full flex items-center gap-1.5 border-[1.5px] border-theme-border-accent/40 shadow-lg">
                      <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-theme-text-inverse" />
                      <span className="text-[10px] sm:text-xs font-semibold text-theme-text-inverse">TopEdge AI</span>
                    </div>
                  )}

                  {/* Add subtle hover effect */}
                  <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                    message.type === 'topedge'
                      ? 'bg-gradient-to-r from-theme-glow-primary/5 to-theme-glow-secondary/5 opacity-0 group-hover:opacity-100'
                      : 'bg-gradient-to-r from-gray-50/50 to-white/50 opacity-0 group-hover:opacity-100'
                  }`} />
                </motion.div>

                {/* Avatar/Logo Container */}
                <div className={`order-${message.type === 'topedge' ? '2' : '1'}`}>
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    message.type === 'topedge' 
                      ? 'bg-gradient-to-br from-theme-glow-primary/20 to-theme-glow-secondary/20 backdrop-blur-xl border-[1.5px] border-theme-border-accent/30 group-hover:border-theme-border-accent/50' 
                      : 'bg-gradient-to-br from-white/90 to-white/95 border-[1.5px] border-gray-200/80 shadow-md group-hover:shadow-lg'
                  }`}>
                    {message.type === 'topedge' ? (
                      <img src="logo.png" alt="TopEdge" className="w-6 h-6 sm:w-7 sm:h-7" />
                    ) : (
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
