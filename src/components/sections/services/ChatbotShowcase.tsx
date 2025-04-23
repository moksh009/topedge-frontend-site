import { motion, AnimatePresence } from 'framer-motion';
import ChatbotStatusBar from './ChatbotStatusBar';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Bot, User, Send, MessageSquare, ChevronDown, MoreVertical } from 'lucide-react';
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
  // Animated Lucide icons background
  const iconsBg = (
    <div className="absolute inset-0 pointer-events-none z-0">
      <motion.div
        className="absolute left-10 top-28"
        animate={{ y: [-25, 15, -25], rotate: [0, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Bot className="w-16 h-16 text-purple-400/15" />
      </motion.div>
      <motion.div
        className="absolute right-20 top-1/2"
        animate={{ y: [20, -20, 20], rotate: [360, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        <MessageSquare className="w-20 h-20 text-blue-400/15" />
      </motion.div>
      <motion.div
        className="absolute left-1/2 bottom-16 -translate-x-1/2"
        animate={{ y: [15, -15, 15], rotate: [0, 360] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      >
        <User className="w-16 h-16 text-theme-glow-accent/15" />
      </motion.div>
    </div>
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPrefilled, setCurrentPrefilled] = useState<PrefilledMessage>(prefilledMessages[0]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [prefilledIndex, setPrefilledIndex] = useState(0);
  const [shouldShowScrollButton, setShouldShowScrollButton] = useState(false);
  const prevScrollHeightRef = useRef<number>(0);
  
  // Create audio context and sounds
  const audioContextRef = useRef<AudioContext | null>(null);
const sendAudioRef = useRef<HTMLAudioElement | null>(null);

  // Function to create a beep sound
  const createBeep = useCallback(async (frequency: number, duration: number) => {
  if (!audioContextRef.current) {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  // Ensure AudioContext is running
  if (audioContextRef.current.state === 'suspended') {
    await audioContextRef.current.resume();
  }

  const oscillator = audioContextRef.current.createOscillator();
  const gainNode = audioContextRef.current.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContextRef.current.destination);

  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;
  gainNode.gain.value = 1; // Louder beep

  oscillator.start();
  gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContextRef.current.currentTime + duration);
  oscillator.stop(audioContextRef.current.currentTime + duration);
}, []);

  // Replace audio file playback with beep sounds
  const playSendSound = useCallback(() => {
  try {
    createBeep(800, 0.18); // Short, loud beep for send
  } catch (error) {
    console.log('Audio playback not available');
  }
}, [createBeep]);

const playReceiveSound = useCallback(() => {
    try {
      createBeep(600, 0.1);
    } catch (error) {
      console.log('Audio playback not available');
    }
  }, [createBeep]);

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
    <div className="min-h-screen bg-theme-bg-primary py-16 font-sans relative">
      {iconsBg}
      <div className="text-center mb-16">
        <h2 className="text-6xl md:text-7xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-theme-text-primary via-theme-glow-accent to-theme-text-primary">
            Interactive AI Chatbot
          </span>
        </h2>
        <p className="mt-6 text-2xl md:text-3xl text-theme-text-secondary max-w-3xl mx-auto">
          Experience real-time conversations with our advanced AI.<br/>
          <span className="text-theme-glow-accent hover:text-theme-glow-accent/90 transition-colors">
            Click the send button to see AI in action →
          </span>
        </p>
        <motion.p 
          className="mt-4 text-lg text-theme-text-secondary"
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
          <div className="relative w-full max-w-[340px] mx-auto">
            {/* Instructions Container */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute right-[-180px] bottom-[30px] flex items-center z-50"
            >
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ x: [-4, 4, -4] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="flex items-center"
                  >
                    <div className="flex items-center">
                      <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-r-[5px] border-r-theme-glow-primary" />
                      <div className="h-[1.5px] w-12 bg-gradient-to-l from-theme-glow-primary to-theme-glow-primary/30" />
                    </div>
                  </motion.div>
                  <div className="flex flex-col items-start">
                    <motion.div
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ delay: 0.5 }}
                       className="bg-gradient-to-r from-black via-theme-purple to-theme-glow-accent px-2 py-2 rounded-xl border border-theme-glow-accent"
                     >
                       <span className="text-white text-base font-semibold whitespace-nowrap flex items-center gap-1">
            Click to send
            <Send className="inline w-4 h-4 text-white" />
          </span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* iPhone Frame */}
            <div className="relative w-full h-[700px] sm:h-[740px] bg-theme-bg-primary rounded-[40px] shadow-xl overflow-hidden">
  {/* Glow Effect */}
  <div className="absolute inset-0 -m-2 bg-gradient-to-r from-theme-glow-primary/40 via-theme-glow-accent/60 to-theme-glow-secondary/40 rounded-[48px] blur-[70px] animate-pulse z-0" />
  <div className="absolute inset-0 -m-2 bg-gradient-to-b from-theme-glow-primary/40 via-theme-glow-accent/60 to-theme-glow-secondary/40 rounded-[48px] blur-[70px] animate-pulse z-0" />
  <div className="absolute inset-0 rounded-[48px] pointer-events-none" style={{boxShadow: '0 0 100px 16px rgba(124,58,237,0.25), 0 0 0 32px rgba(124,58,237,0.13)'}} />
  {/* Stronger Glow effect */}
  <div className="absolute inset-0 z-0 rounded-[40px] pointer-events-none" style={{boxShadow: '0 0 64px 0 rgba(124,58,237,0.23), 0 0 0 16px rgba(124,58,237,0.11)'}} />
  {/* Chat UI starts here, no status bar or notch */}
  {/* Screen Content */}
              <div className="relative h-full rounded-[35px] overflow-hidden bg-theme-bg-primary">
                {/* Chat Header */}
                <div className="bg-theme-bg-primary py-2 px-4 border-b border-theme-border-primary flex items-center min-h-[54px] relative rounded-t-[40px]">
  <div className="flex items-center gap-2">
    <motion.div
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="w-9 h-9 rounded-full bg-white border border-black flex items-center justify-center"
    >
      <img src="/logo.png" alt="TopEdge Logo" className="w-7 h-7 object-contain rounded-full" />
    </motion.div>
                    <div>
                      <h3 className="text-theme-text-primary font-semibold text-lg">AI Assistant</h3>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-theme-glow-accent rounded-full" />
                        <span className="text-[13px] text-theme-glow-accent font-medium">Active Now</span>
                      </div>
                    </div>
  <MoreVertical className="w-5 h-5 text-theme-text-secondary absolute right-0 top-1/2 -translate-y-1/2 mr-2" />
  </div>
</div>

                {/* Messages Container */}
                <div 
                  ref={chatContainerRef}
                  className="h-[calc(100%-140px)] sm:h-[calc(100%-180px)] overflow-y-auto px-3 sm:px-4 py-3 sm:py-4 space-y-3 sm:space-y-4 scroll-smooth pb-24"
                  style={{
                    overscrollBehavior: 'contain',
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(var(--theme-text-secondary-rgb), 0.2) transparent',
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
                          <div className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 rounded-full flex items-center justify-center ${
  message.type === 'user' 
    ? 'bg-gradient-to-r from-theme-text-primary via-theme-glow-accent to-theme-text-primary' 
    : 'bg-white border border-black shadow-[0_0_8px_2px_rgba(124,58,237,0.13)]'}
`}>
  {message.type === 'user' ? (
    <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
  ) : (
    <img 
      src="/logo.png" 
      alt="TopEdge" 
      className="w-3 h-3 sm:w-4 sm:h-4 object-contain rounded-full" 
    />
  )}
</div>
                          <motion.div
                            layout
                            className={`rounded-[16px] sm:rounded-[20px] px-3 sm:px-4 py-2 sm:py-3 flex flex-col ${
  message.type === 'user'
    ? 'bg-gradient-to-r from-theme-text-primary via-theme-glow-accent to-theme-text-primary text-white rounded-tr-[4px] shadow-md'
    : 'bg-theme-bg-secondary text-theme-text-primary rounded-tl-[4px] shadow-sm border border-theme-border-primary'
}`}
                          >
                            <p className="text-[13px] sm:text-[15px] leading-tight whitespace-pre-wrap">{message.content}</p>
                            <div className="flex justify-end w-full">
                              <span className="text-[10px] sm:text-[11px] opacity-60 mt-1 text-right block">
                                {message.timestamp.toLocaleTimeString()}
                              </span>
                            </div>
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
                        <div className="w-6 h-6 sm:w-8 sm:h-8 shrink-0 rounded-full bg-white border-2 border-theme-glow-accent shadow-[0_0_12px_2px_rgba(124,58,237,0.18)] flex items-center justify-center">
                          <img 
                            src="/logo.png" 
                            alt="TopEdge" 
                            className="w-4 h-4 sm:w-5 sm:h-5 p-0.5 object-contain rounded-full" 
                          />
                        </div>
                        <div className="bg-theme-bg-secondary rounded-[16px] sm:rounded-[20px] rounded-tl-[4px] px-3 sm:px-4 py-2 sm:py-3">
                          <div className="flex gap-1">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity }}
                              className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-theme-text-secondary rounded-full"
                            />
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                              className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-theme-text-secondary rounded-full"
                            />
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                              className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-theme-text-secondary rounded-full"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Input Area */}
                <div className="sticky bottom-0 left-0 right-0 px-3 sm:px-4 pb-3 pt-8 bg-theme-bg-primary/90 backdrop-blur-sm z-10 border-t border-theme-border-primary flex flex-row items-center gap-2">

                  <div className="flex flex-row items-center w-full gap-2">
                    <div className="flex-1 bg-theme-bg-secondary rounded-full px-3 sm:px-4 py-2.5 sm:py-3">
  <p className="text-[13px] sm:text-[15px] text-theme-text-secondary">{currentPrefilled}</p>
</div>
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  onClick={handleSendMessage}
  className="p-2.5 sm:p-3 rounded-full bg-white border-2 border-theme-glow-accent shadow-[0_0_12px_2px_rgba(124,58,237,0.18)] text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-theme-glow-accent/60 transition-all relative group"
>
  <Send className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
</motion.button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/* Notification sound for send/receive */}
<audio ref={sendAudioRef} src="/whatsapp.mp3" preload="auto" />
        </motion.section>
      </div>
    </div>
  );
};

export default memo(ChatbotShowcase);
