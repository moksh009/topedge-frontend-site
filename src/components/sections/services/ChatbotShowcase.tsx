import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Bot, User, Send, MessageSquare, ChevronDown } from 'lucide-react';
import { memo } from 'react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

// Memoize prefilledMessages to prevent unnecessary re-renders
const prefilledMessages = [
  "What services do you offer?",
  "Can I get 100% customization?",
  "Why should I choose you?",
  "Who is TopEdge?",
  "Do your voice agents sound robotic?",
  "Can I monitor the performance?",
  "What kind of businesses use TopEdge?",
  "Is this a chatbot or a voice solution?",
  "Can I try it before I buy?"
] as const;

type PrefilledMessage = typeof prefilledMessages[number];

const ChatbotShowcase = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPrefilled, setCurrentPrefilled] = useState<PrefilledMessage>(prefilledMessages[0]);
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

  // Optimize audio handling with useCallback
  const playSendSound = useCallback(async () => {
    if (sendAudioRef.current) {
      try {
        sendAudioRef.current.currentTime = 0;
        await sendAudioRef.current.play();
      } catch (error) {
        console.log('Error playing send sound:', error);
      }
    }
  }, []);

  const playReceiveSound = useCallback(async () => {
    if (receiveAudioRef.current) {
      try {
        receiveAudioRef.current.currentTime = 0;
        await receiveAudioRef.current.play();
      } catch (error) {
        console.log('Error playing receive sound:', error);
      }
    }
  }, []);

  // Optimize scroll behavior with useCallback
  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior
      });
    }
  }, []);

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
      services: "We build AI-powered voice agents that handle customer calls 24/7—bookings, inquiries, support, and more. Fully automated. Fully human-like.",
      customization: "Absolutely! From the voice, tone, script, to integrations—we tailor everything to fit your brand and workflow.",
      choose: "We don't just sell tech—we craft experiences. With real-time dashboards, human-like voice agents, and top-tier support, we make AI work for your business.",
      who: "We're an AI agency helping businesses scale smarter with voice automation. Think of us as your intelligent 24/7 team member.",
      robotic: "Not at all! Our agents sound natural, confident, and human—trained to build trust with your callers.",
      monitor: "Yes! You'll get a live dashboard with call logs, transcripts, summaries, analytics—everything you need to stay in control.",
      businesses: "Clinics, real estate teams, service providers—any business that wants to automate calls without compromising on customer experience.",
      solution: "It's a voice solution! Our AI agents talk with your customers over the phone—just like a real person would.",
      demo: "100%! We can set up a quick demo for your use-case. You'll hear it in action before making any decision.",
      default: "I'd be happy to help you learn more about our AI solutions. What specific aspect would you like to know about?"
    };

    const message = userMessage.toLowerCase();
    if (message.includes('service')) return responses.services;
    if (message.includes('custom')) return responses.customization;
    if (message.includes('choose')) return responses.choose;
    if (message.includes('who')) return responses.who;
    if (message.includes('robot')) return responses.robotic;
    if (message.includes('monitor')) return responses.monitor;
    if (message.includes('business')) return responses.businesses;
    if (message.includes('chatbot') || message.includes('solution')) return responses.solution;
    if (message.includes('try') || message.includes('demo')) return responses.demo;
    return responses.default;
  };

  // Optimize message handling
  const handleSendMessage = useCallback(async () => {
    const userMessage = {
      id: Date.now().toString(),
      type: 'user' as const,
      content: currentPrefilled,
      timestamp: new Date()
    };

    await playSendSound();
    setMessages(prev => [...prev, userMessage]);

    // Generate response immediately but delay display
    const response = generateBotResponse(currentPrefilled);
    setIsTyping(true);

    // Use RAF for smoother animation timing
    requestAnimationFrame(() => {
      setTimeout(async () => {
        await playReceiveSound();
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          type: 'bot',
          content: response,
          timestamp: new Date()
        }]);

        // Update prefilled message after a short delay
        requestAnimationFrame(() => {
          setTimeout(() => {
            setPrefilledIndex(prev => (prev + 1) % prefilledMessages.length);
            setCurrentPrefilled(prefilledMessages[(prefilledIndex + 1) % prefilledMessages.length]);
          }, 100);
        });
      }, 1000);
    });
  }, [currentPrefilled, prefilledIndex, playSendSound, playReceiveSound]);

  // Optimize animation variants with useMemo
  const messageAnimationVariants = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  }), []);

  return (
    <div className="min-h-screen bg-black py-16">
      <div className="text-center mb-16">
        <h2 className="text-6xl md:text-7xl font-bold tracking-tight">
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
          transition={{ delay: 0.3 }}
        >
          Watch as our AI instantly responds with helpful information about our services
        </motion.p>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <motion.section
          id="chatbot-showcase"
          className="relative py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative w-full sm:max-w-[380px] md:max-w-[380px] mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative mx-auto"
            >
              {/* Instructions Container */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="absolute right-[-160px] bottom-[50px] flex items-center z-50"
              >
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{
                        x: [-4, 4, -4],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="flex items-center"
                    >
                      <div className="flex items-center">
                        <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[5px] border-r-[#0A84FF]" />
                        <div className="h-[1.5px] w-12 bg-[#0A84FF]" />
                      </div>
                    </motion.div>
                    <div className="flex flex-col items-start">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="bg-[#0A0A0A] px-2 py-2 rounded-xl border border-[#0A84FF]/20"
                      >
                        <span className="text-[#0A84FF] text-base font-medium whitespace-nowrap">
                          Click to send
                        </span>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* iPhone Frame - Made smaller */}
              <div className="relative w-full h-[700px] sm:h-[740px] bg-[#0A0A0A] rounded-[40px] border-[10px] border-[#1A1A1A] shadow-xl overflow-hidden">
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

                  {/* Messages Container */}
                  <div 
                    ref={chatContainerRef}
                    className="h-[calc(100%-140px)] sm:h-[calc(100%-180px)] overflow-y-auto px-3 sm:px-4 py-3 sm:py-4 space-y-3 sm:space-y-4 scroll-smooth"
                    style={{
                      overscrollBehavior: 'contain',
                      scrollbarWidth: 'thin',
                      scrollbarColor: 'rgba(255,255,255,0.2) transparent',
                      paddingBottom: '100px',
                      WebkitOverflowScrolling: 'touch'
                    }}
                  >
                    <AnimatePresence mode="popLayout">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={messageAnimationVariants.initial}
                          animate={messageAnimationVariants.animate}
                          exit={messageAnimationVariants.exit}
                          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex items-start gap-1.5 sm:gap-2 max-w-[90%] ${
                            message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                          }`}>
                            <div className={`w-6 h-6 sm:w-8 sm:h-8 shrink-0 rounded-full flex items-center justify-center ${
                              message.type === 'user' ? 'bg-blue-500' : 'bg-gradient-to-br from-violet-500 to-violet-600'
                            }`}>
                              {message.type === 'user' ? (
                                <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                              ) : (
                                <img 
                                  src="/logo.png" 
                                  alt="TopEdge" 
                                  className="w-4 h-4 sm:w-5 sm:h-5 p-0.5 object-contain"
                                />
                              )}
                            </div>
                            <motion.div
                              layout
                              className={`rounded-[16px] sm:rounded-[20px] px-3 sm:px-4 py-2 sm:py-3 ${
                                message.type === 'user'
                                  ? 'bg-[#0A84FF] text-white rounded-tr-[4px]'
                                  : 'bg-[#1C1C1E] text-white rounded-tl-[4px]'
                              }`}
                            >
                              <p className="text-[13px] sm:text-[15px] leading-tight whitespace-pre-wrap">{message.content}</p>
                              <p className="text-[10px] sm:text-[11px] opacity-60 mt-1">
                                {message.timestamp.toLocaleTimeString()}
                              </p>
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}

                      {/* Typing Indicator */}
                      {isTyping && (
                        <motion.div
                          initial={messageAnimationVariants.initial}
                          animate={messageAnimationVariants.animate}
                          exit={messageAnimationVariants.exit}
                          className="flex items-start gap-1.5 sm:gap-2"
                        >
                          <div className="w-6 h-6 sm:w-8 sm:h-8 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-violet-600 flex items-center justify-center">
                            <img 
                              src="/logo.png" 
                              alt="TopEdge" 
                              className="w-4 h-4 sm:w-5 sm:h-5 p-0.5 object-contain"
                            />
                          </div>
                          <div className="bg-[#1C1C1E] rounded-[16px] sm:rounded-[20px] rounded-tl-[4px] px-3 sm:px-4 py-2 sm:py-3">
                            <div className="flex gap-1">
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity }}
                                className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full"
                              />
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full"
                              />
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Input Area */}
                  <div className="absolute bottom-4 sm:bottom-8 inset-x-3 sm:inset-x-4 bg-[#0A0A0A]/80 backdrop-blur-sm z-10">
                    <div className="flex items-center gap-1.5 sm:gap-2 relative">
                      <div className="flex-1 bg-[#1C1C1E] rounded-full px-3 sm:px-4 py-2.5 sm:py-3">
                        <p className="text-[13px] sm:text-[15px] text-gray-400">{currentPrefilled}</p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleSendMessage}
                        className="p-2.5 sm:p-3 rounded-full bg-[#0A84FF] text-white relative group"
                      >
                        <Send className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default memo(ChatbotShowcase);

