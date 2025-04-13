import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Bot, User, Send, MessageSquare, ChevronDown } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const prefilledMessages = [
  "What services do you offer?",
  "How much does it cost?",
  "Can I see a demo?",
  "Do you provide support?",
  "How long does implementation take?"
];

const ChatbotShowcase = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPrefilled, setCurrentPrefilled] = useState(prefilledMessages[0]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [prefilledIndex, setPrefilledIndex] = useState(0);
  const [shouldShowScrollButton, setShouldShowScrollButton] = useState(false);
  const prevScrollHeightRef = useRef<number>(0);
  
  // Add audio refs
  const sendAudioRef = useRef<HTMLAudioElement>(null);
  const receiveAudioRef = useRef<HTMLAudioElement>(null);

  // Set initial volume for audio elements
  useEffect(() => {
    if (sendAudioRef.current) {
      sendAudioRef.current.volume = 0.5;
      sendAudioRef.current.preload = "auto";
    }
    if (receiveAudioRef.current) {
      receiveAudioRef.current.volume = 0.5;
      receiveAudioRef.current.preload = "auto";
    }

    // Pre-load audio files
    const preloadAudio = async () => {
      try {
        if (sendAudioRef.current) {
          await sendAudioRef.current.load();
        }
        if (receiveAudioRef.current) {
          await receiveAudioRef.current.load();
        }
      } catch (error) {
        console.log('Error preloading audio:', error);
      }
    };

    preloadAudio();
  }, []);

  // Function to play send sound with retry
  const playSendSound = async () => {
    if (sendAudioRef.current) {
      try {
        sendAudioRef.current.currentTime = 0;
        const playPromise = sendAudioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
      } catch (error) {
        console.log('Error playing send sound:', error);
        // Retry once
        try {
          await sendAudioRef.current.play();
        } catch (retryError) {
          console.log('Retry failed:', retryError);
        }
      }
    }
  };

  // Function to play receive sound with retry
  const playReceiveSound = async () => {
    if (receiveAudioRef.current) {
      try {
        receiveAudioRef.current.currentTime = 0;
        const playPromise = receiveAudioRef.current.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
      } catch (error) {
        console.log('Error playing receive sound:', error);
        // Retry once
        try {
          await receiveAudioRef.current.play();
        } catch (retryError) {
          console.log('Retry failed:', retryError);
        }
      }
    }
  };

  // Enhanced scroll behavior
  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (chatContainerRef.current) {
      const scrollHeight = chatContainerRef.current.scrollHeight;
      const height = chatContainerRef.current.clientHeight;
      const maxScroll = scrollHeight - height;
      
      chatContainerRef.current.scrollTo({
        top: maxScroll,
        behavior
      });
    }
  };

  // Check if user is near bottom
  const isNearBottom = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      return scrollHeight - scrollTop - clientHeight < 100; // Within 100px of bottom
    }
    return false;
  };

  // Handle scroll event
  const handleScroll = useCallback(() => {
    if (chatContainerRef.current) {
      setShouldShowScrollButton(!isNearBottom());
    }
  }, []);

  // Add scroll listener
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener('scroll', handleScroll);
      return () => chatContainer.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  // Auto-scroll on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      const wasAtBottom = isNearBottom();
      const { scrollHeight } = chatContainerRef.current;
      
      if (wasAtBottom || scrollHeight !== prevScrollHeightRef.current) {
        scrollToBottom();
      } else {
        setShouldShowScrollButton(true);
      }
      
      prevScrollHeightRef.current = scrollHeight;
    }
  }, [messages, isTyping]);

  // Initial scroll
  useEffect(() => {
    scrollToBottom('auto');
  }, []);

  const generateBotResponse = (userMessage: string): string => {
    const responses = {
      services: "We offer AI-powered solutions including chatbots, automation tools, and data analytics. Our services are customized to meet your specific needs.",
      cost: "Our pricing is flexible and depends on your requirements. Basic plans start at $99/month. Would you like to schedule a consultation for a detailed quote?",
      demo: "I'd be happy to show you a live demo! We can schedule a demo call at your convenience.",
      support: "We provide 24/7 support with dedicated account managers and technical experts to ensure smooth operation.",
      implementation: "Implementation typically takes 2-4 weeks, depending on your requirements and system complexity.",
      default: "I'd be happy to help you learn more about our AI solutions. What specific aspect would you like to know about?"
    };

    const message = userMessage.toLowerCase();
    if (message.includes('service')) return responses.services;
    if (message.includes('cost') || message.includes('price')) return responses.cost;
    if (message.includes('demo')) return responses.demo;
    if (message.includes('support')) return responses.support;
    if (message.includes('implementation') || message.includes('long')) return responses.implementation;
    return responses.default;
  };

  const simulateTyping = async (response: string) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsTyping(false);
    
    // Play receive sound and add bot message
    await playReceiveSound();
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      type: 'bot',
      content: response,
      timestamp: new Date()
    }]);

    setTimeout(() => {
      const nextIndex = (prefilledIndex + 1) % prefilledMessages.length;
      setPrefilledIndex(nextIndex);
      setCurrentPrefilled(prefilledMessages[nextIndex]);
    }, 300);
  };

  const handleSendMessage = async () => {
    // Create and add user message
    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: currentPrefilled,
      timestamp: new Date()
    };

    // Play send sound and add message
    await playSendSound();
    setMessages(prev => [...prev, userMessage]);
    scrollToBottom();

    // Generate and simulate bot response
    const response = generateBotResponse(currentPrefilled);
    await simulateTyping(response);
    scrollToBottom();
  };

  // Add animation complete handler
  const handleAnimationComplete = () => {
    scrollToBottom('smooth');
  };

  return (
    <div className="relative mt-32 mb-20 bg-black">
      {/* Premium Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />
        
        {/* Animated gradient lines */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
            style={{ top: "25%" }}
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-violet-500/50 to-transparent"
            style={{ right: "35%" }}
            animate={{
              y: ["-100%", "100%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"
            style={{ top: "75%" }}
            animate={{
              x: ["100%", "-100%"],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </div>

      {/* Audio elements */}
      <audio 
        ref={sendAudioRef} 
        src="message sound/send.mp3" 
        preload="auto"
      />
      <audio 
        ref={receiveAudioRef} 
        src="message sound/receive.mp3" 
        preload="auto"
      />
      
      <div className="text-center mb-16">
        <h2 className="text-6xl md:text-8xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-white">
            Interactive AI Chatbot
          </span>
        </h2>
        <p className="mt-6 text-2xl md:text-3xl text-slate-300 max-w-3xl mx-auto">
          Experience real-time conversations with our advanced AI.<br/>
          <span className="text-blue-400">Click the send button to see AI in action →</span>
        </p>
        <motion.p 
          className="mt-4 text-lg text-slate-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Watch as our AI instantly responds with helpful information about our services
        </motion.p>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <motion.section
          id="chatbot-showcase"
          className="relative min-h-screen bg-black py-20 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* External Information Display */}
          <motion.div
            className="absolute left-[-360px] top-1/2 -translate-y-1/2 w-[300px]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-gray-900/80 rounded-lg p-6 backdrop-blur-md border border-gray-700/50">
              <h3 className="text-white text-xl font-medium mb-4">AI Assistant Features</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                  24/7 Availability
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                  Natural Language Processing
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                  Instant Responses
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2" />
                  Context Awareness
                </li>
              </ul>
            </div>
          </motion.div>

          <div className="relative w-full sm:max-w-[360px] mx-auto px-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative mx-auto"
            >
              {/* Instructions Container - Added */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute right-[-180px] bottom-[60px] flex items-center z-50"
              >
                <div className="flex flex-col items-start">
                  {/* Text and Arrow Container */}
                  <div className="flex items-center gap-2">
                    {/* Combined Arrow */}
                    <motion.div
                      animate={{
                        x: [-4, 4, -4],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="flex items-center"
                    >
                      {/* Arrow head and line combined */}
                      <div className="flex items-center">
                        <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[5px] border-r-[#0A84FF]" />
                        <div className="h-[1.5px] w-12 bg-[#0A84FF]" />
                      </div>
                    </motion.div>
                    {/* Text Container */}
                    <div className="flex flex-col items-start">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="bg-[#0A0A0A]/90 backdrop-blur-sm px-4 py-2 rounded-xl border border-[#0A84FF]/20 shadow-lg shadow-[#0A84FF]/10"
                      >
                        <span className="text-[#0A84FF] text-base font-medium whitespace-nowrap flex items-center gap-1.5">
                          Click to send
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="absolute inset-0 -m-1 bg-gradient-to-r from-yellow-500/20 via-pink-500/20 to-maroon-500/20 rounded-full blur-2xl animate-pulse" />
              <div className="absolute inset-0 -m-1 bg-gradient-to-b from-yellow-500/20 via-pink-500/20 to-maroon-500/20 rounded-full blur-2xl animate-pulse" />

              {/* iPhone Frame */}
              <div className="relative w-full h-[860px] sm:h-[700px] bg-[#0A0A0A] rounded-[45px] border-[12px] border-[#1A1A1A] shadow-2xl overflow-hidden">
                {/* Phone Notch */}
                <div className="absolute top-0 inset-x-0 h-6 bg-[#1A1A1A] rounded-b-3xl" />
                
                {/* Screen Content */}
                <div className="relative h-full rounded-[35px] overflow-hidden bg-[#0A0A0A]">
                  {/* Chat Header */}
                  <div className="bg-[#0A0A0A] pt-14 pb-4 px-4 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center"
                      >
                        <MessageSquare className="w-6 h-6 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">AI Assistant</h3>
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 bg-green-400 rounded-full" />
                          <span className="text-[13px] text-green-400 font-medium">Active Now</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Messages Container with Enhanced Scroll */}
                  <div 
                    ref={chatContainerRef}
                    className="h-[calc(100%-180px)] overflow-y-auto px-4 py-4 space-y-4 scroll-smooth"
                    style={{
                      overscrollBehavior: 'contain',
                      scrollbarWidth: 'thin',
                      scrollbarColor: 'rgba(255,255,255,0.2) transparent',
                      paddingBottom: '140px',
                      WebkitOverflowScrolling: 'touch'
                    }}
                  >
                    <AnimatePresence mode="popLayout">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          onAnimationComplete={handleAnimationComplete}
                          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex items-start gap-2 max-w-[85%] ${
                            message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                          }`}>
                            <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center ${
                              message.type === 'user' ? 'bg-blue-500' : 'bg-violet-500'
                            }`}>
                              {message.type === 'user' ? (
                                <User className="w-4 h-4 text-white" />
                              ) : (
                                <Bot className="w-4 h-4 text-white" />
                              )}
                            </div>
                            <motion.div
                              layout
                              className={`rounded-[20px] px-4 py-3 ${
                                message.type === 'user'
                                  ? 'bg-[#0A84FF] text-white rounded-tr-[4px]'
                                  : 'bg-[#1C1C1E] text-white rounded-tl-[4px]'
                              }`}
                            >
                              <p className="text-[15px] leading-tight whitespace-pre-wrap">{message.content}</p>
                              <p className="text-[11px] opacity-60 mt-1">
                                {message.timestamp.toLocaleTimeString()}
                              </p>
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}

                      {/* Typing Indicator */}
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          onAnimationComplete={handleAnimationComplete}
                          transition={{ duration: 0.2 }}
                          className="flex items-start gap-2"
                        >
                          <div className="w-8 h-8 shrink-0 rounded-full bg-violet-500 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                          <div className="bg-[#1C1C1E] rounded-[20px] rounded-tl-[4px] px-4 py-3">
                            <div className="flex gap-1">
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity }}
                                className="w-2 h-2 bg-gray-400 rounded-full"
                              />
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                className="w-2 h-2 bg-gray-400 rounded-full"
                              />
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                className="w-2 h-2 bg-gray-400 rounded-full"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Scroll to Bottom Button */}
                  {shouldShowScrollButton && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      onClick={() => scrollToBottom()}
                      className="absolute bottom-24 right-8 p-2 bg-blue-500 rounded-full shadow-lg z-20 hover:bg-blue-600 transition-colors"
                    >
                      <motion.div
                        animate={{ y: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ChevronDown className="w-5 h-5 text-white" />
                      </motion.div>
                    </motion.button>
                  )}

                  {/* Input Area with Instructions */}
                  <div className="absolute bottom-8 inset-x-4 bg-[#0A0A0A]/80 backdrop-blur-sm z-10">
                    <div className="flex items-center gap-2 relative">
                      <div className="flex-1 bg-[#1C1C1E] rounded-full px-4 py-3">
                        <p className="text-[15px] text-gray-400">{currentPrefilled}</p>
                      </div>

                      {/* Send Button with Instructions */}
                      <div className="relative">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleSendMessage}
                          className="p-3 rounded-full bg-[#0A84FF] text-white relative group"
                        >
                          {/* Button Glow Effect */}
                          <motion.div
                            className="absolute inset-0 rounded-full bg-[#0A84FF]/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          />
                          <Send className="w-5 h-5 relative z-10" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone Glow Effects */}
              <div className="absolute -inset-4 z-[-1]">
                <div className="absolute inset-0 bg-gradient-to-t from-violet-600/20 to-transparent blur-2xl transform-gpu" />
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/20 via-transparent to-purple-500/20 blur-2xl transform-gpu" />
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ChatbotShowcase;

