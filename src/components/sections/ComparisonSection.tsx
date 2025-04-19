import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Bot, User, Sparkles } from 'lucide-react';

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
      content: "I\’m stuck with a fixed-cost subscription, even if I barely use the service…",
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
      content: "We offer full customization at zero extra cost. Need a feature? We\’ll build it for you!",
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
      className="relative py-8 sm:py-24 overflow-hidden bg-gradient-to-b from-black via-[#0A0118] to-black font-sans"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {/* Enhanced Premium Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-violet-900/30 via-transparent to-indigo-900/30" />
        
        {/* Animated gradient lines - Reduced for better performance */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] w-full"
            style={{
              top: `${40 * (i + 1)}%`,
              background: 'linear-gradient(90deg, transparent, rgba(139, 92, 246, 0.2), transparent)',
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

      {/* Content Container */}
      <div className="relative container mx-auto px-3 sm:px-4">
        {/* Premium Title */}
        <motion.div 
          className="text-center mb-6 sm:mb-16"
          variants={messageVariants}
          custom={0}
        >
          <h2 className="text-2xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-6">
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text">
              Traditional vs TopEdge
            </span>
          </h2>
          <p className="text-purple-300/80 text-sm sm:text-lg max-w-2xl mx-auto px-3 sm:px-4">
            Experience how TopEdge transforms traditional development challenges
          </p>
        </motion.div>

        {/* Messages Container with Premium Styling */}
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
                {/* Avatar/Logo Container */}
                <div className={`order-${message.type === 'topedge' ? '2' : '1'}`}>
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center ${
                    message.type === 'topedge' 
                      ? 'bg-gradient-to-br from-violet-600/30 to-indigo-600/30 backdrop-blur-xl border border-violet-500/30' 
                      : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50'
                  }`}>
                    {message.type === 'topedge' ? (
                      <img src="logo.png" alt="TopEdge" className="w-6 h-6 sm:w-7 sm:h-7" />
                    ) : (
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Enhanced Message Bubble */}
                <motion.div
                  className={`relative max-w-[calc(100%-3rem)] sm:max-w-xl px-4 sm:px-6 py-3 sm:py-4 rounded-xl ${
                    message.type === 'topedge'
                      ? 'bg-gradient-to-br from-violet-600/20 to-indigo-600/20 backdrop-blur-xl border border-violet-500/30'
                      : 'bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl border border-gray-700/30'
                  }`}
                  style={{
                    order: message.type === 'topedge' ? 1 : 2,
                    boxShadow: message.type === 'topedge' 
                      ? '0 4px 20px rgba(139, 92, 246, 0.15)'
                      : '0 4px 20px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <div className={`text-sm sm:text-base ${
                    message.type === 'topedge' ? 'text-purple-100' : 'text-gray-300'
                  }`}>
                    {message.content}
                  </div>

                  {/* Premium Badge for TopEdge */}
                  {message.type === 'topedge' && (
                    <div className="absolute -top-2 sm:-top-3 right-3 sm:right-4 px-2 sm:px-3 py-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full flex items-center gap-1.5 border border-violet-400/30">
                      <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                      <span className="text-[10px] sm:text-xs font-medium text-white">TopEdge AI</span>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
