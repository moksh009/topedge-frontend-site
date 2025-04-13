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
  const [isTyping, setIsTyping] = useState(false);
  const [typedText, setTypedText] = useState('');
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
      const currentMessage = messages[activeMessageIndex];
      setIsTyping(true);
      setTypedText('');

      let currentText = '';
      const totalDuration = currentMessage.typingDuration || 1000;
      const intervalTime = totalDuration / currentMessage.content.length;
      
      const typingInterval = setInterval(() => {
        if (currentText.length < currentMessage.content.length) {
          currentText = currentMessage.content.slice(0, currentText.length + 1);
          setTypedText(currentText);
      } else {
          clearInterval(typingInterval);
        setIsTyping(false);
        setTimeout(() => {
          setActiveMessageIndex(prev => prev + 1);
      }, 1000);
    }
      }, intervalTime);

      return () => clearInterval(typingInterval);
    }
  }, [activeMessageIndex]);

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black font-sans"
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {/* Dynamic background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 30% 30%, rgba(56, 189, 248, 0.1) 0%, transparent 70%)',
              'radial-gradient(circle at 70% 70%, rgba(56, 189, 248, 0.1) 0%, transparent 70%)',
              'radial-gradient(circle at 30% 30%, rgba(56, 189, 248, 0.1) 0%, transparent 70%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.div 
          className="text-center mb-16"
          variants={messageVariants}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-fuchsia-500 to-purple-400 text-transparent bg-clip-text animate-gradient">
            Traditional vs TopEdge
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience how TopEdge transforms traditional development challenges
          </p>
        </motion.div>

        {/* Messages Container - Fixed Height */}
        <div className="relative max-w-4xl mx-auto min-h-[500px]">
          {/* Messages */}
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
          >
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                variants={messageVariants}
                initial="hidden"
                animate={index <= activeMessageIndex ? "visible" : "hidden"}
                className={`flex items-start gap-4 ${
                  message.type === 'topedge' ? 'justify-end' : 'justify-start'
                }`}
              >
                {/* Avatar */}
                <div className={`order-${message.type === 'topedge' ? '2' : '1'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      message.type === 'topedge' 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600' 
                      : 'bg-gradient-to-r from-gray-700 to-gray-600'
                    }`}>
                    {message.type === 'topedge' ? (
                      <Bot className="w-6 h-6 text-white" />
                    ) : (
                      <User className="w-6 h-6 text-white" />
                    )}
                    </div>
                </div>

                {/* Message Bubble */}
                <motion.div
                  className={`relative max-w-xl px-6 py-4 rounded-2xl ${
                    message.type === 'topedge'
                      ? 'bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/20'
                      : 'bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50'
                  }`}
                  style={{
                    order: message.type === 'topedge' ? 1 : 2,
                    boxShadow: message.type === 'topedge' 
                      ? '0 4px 20px rgba(124, 58, 237, 0.1)'
                      : '0 4px 20px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <div className={`text-lg ${
                    message.type === 'topedge' ? 'text-blue-100' : 'text-gray-300'
                  }`}>
                    {index === activeMessageIndex ? typedText : message.content}
                    {index === activeMessageIndex && isTyping && (
                      <motion.span
                        className="inline-block w-2 h-4 ml-1 bg-current"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      />
                    )}
                  </div>

                  {/* topedge Badge */}
                  {message.type === 'topedge' && (
                    <div className="absolute -top-3 right-4 px-2 py-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-white" />
                      <span className="text-xs font-semibold text-white">TopEdge</span>
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
