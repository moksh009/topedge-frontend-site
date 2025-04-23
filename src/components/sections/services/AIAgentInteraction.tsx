import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Battery, Bot, Contact, Mic, MicOff, Phone, Sparkles, Video, Volume2, X, PhoneCall, PhoneOff, PhoneIncoming } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  text: string;
  audioFile: string;
  isUser: boolean;
}

const conversation: Message[] = [
  {
    text: "Hello. Welcome to Top Edge. I'm your virtual assistant. How can I help you today?",
    audioFile: "/sounds/ai1.mp3",
    isUser: false
  },
  {
    text: "I wanted to ask about your services, like what exactly you build for businesses and how it helps.",
    audioFile: "sounds/user1.mp3",
    isUser: true
  },
  {
    text: "We build conversational AI agents that can handle customer calls, respond to inquiries,",
    audioFile: "sounds/ai2.mp3",
    isUser: false
  },
  {
    text: "book appointments, follow-up with leads, and even upsell services,",
    audioFile: "sounds/ai3.mp3",
    isUser: false
  },
  {
    text: "all with human like communication. You can't tell the difference if it's a human talking or AI.",
    audioFile: "sounds/ai4.mp3",
    isUser: false
  },
  {
    text: "So it basically replaces a customer support specialist or a sales representative?",
    audioFile: "sounds/user2.mp3",
    isUser: true
  },
  {
    text: "Exactly. But with superpowers. It never misses a call, works twenty four seven, and always gives a professional response. Whether it's a dental clinic, salon, agency, or repair service,",
    audioFile: "sounds/ai5.mp3",
    isUser: false
  },
  {
    text: "our assistant adapts to your business and talks like it's part of your team. We believe in adaptation, not replacement.",
    audioFile: "sounds/ai6.mp3",
    isUser: false
  },
  {
    text: "Is it as good as staff? I mean, does it help my staff from managing calls and inquiries by completely managing them on autopilot?",
    audioFile: "sounds/user3.mp3",
    isUser: true
  },
  {
    text: "Yes. It speaks in a natural voice, answers customer questions, follows business logic, sets appointments, and even remembers previous calls from customers.",
    audioFile: "sounds/ai7.mp3",
    isUser: false
  },
  {
    text: "Wanna hear a quick example? You'll be amazed!",
    audioFile: "sounds/ai8.mp3",
    isUser: true
  },
  {
    text: "It's a good idea. I would like to get a live demo to test it out.",
    audioFile: "sounds/user4.mp3",
    isUser: true
  },
   
  {
    text: "Perfect. Scroll down and try the demo.",
    audioFile: "sounds/ai9.mp3",
    isUser: false
  }
];

export const AIAgentInteraction = () => {
  // State management
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [conversationStep, setConversationStep] = useState(0);
  const [currentTime, setCurrentTime] = useState('9:41');
  const [currentCaption, setCurrentCaption] = useState('');
  const [callDuration, setCallDuration] = useState(0);

  // Audio refs
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentAudioSrc = useRef<string | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.addEventListener('ended', () => {
      setIsPlaying(false);
      currentAudioSrc.current = null;
    });
    audioRef.current.addEventListener('play', () => setIsPlaying(true));
    audioRef.current.addEventListener('pause', () => setIsPlaying(false));
    audioRef.current.addEventListener('error', (e) => {
      console.log('Audio playback not available - continuing without sound');
      setIsPlaying(false);
      currentAudioSrc.current = null;
      // Continue the conversation even if audio fails
      setConversationStep(prev => prev + 1);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current.remove();
        audioRef.current = null;
      }
    };
  }, []);

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      setCurrentTime(`${hours}:${minutes.toString().padStart(2, '0')}`);
    };

    updateTime(); // Initial update
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Add call duration timer
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (isCallActive) {
      setCallDuration(0);
      intervalId = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isCallActive]);

  // Format duration to mm:ss
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Modify playAudio function to handle errors gracefully
  const playAudio = useCallback(async (audioFile: string): Promise<void> => {
    return new Promise((resolve) => {
      if (!audioRef.current) {
        console.log('Audio not initialized - continuing without sound');
        resolve();
        return;
      }

      // Find and set the current caption
      const currentMessage = conversation[conversationStep];
      if (currentMessage) {
        setCurrentCaption(currentMessage.text);
      }

      // If same audio is already playing, don't restart it
      if (currentAudioSrc.current === audioFile && !audioRef.current.ended) {
        resolve();
        return;
      }

      // Stop current audio if playing
      audioRef.current.pause();
      
      try {
        // Continue conversation even if audio fails
        audioRef.current.src = audioFile;
        audioRef.current.volume = isMuted ? 0 : 1;
        currentAudioSrc.current = audioFile;
        
        const playPromise = audioRef.current.play();
        if (playPromise) {
          playPromise.catch((error) => {
            console.log('Audio playback not available - continuing without sound');
            // Don't throw error, just continue conversation
            resolve();
          });
        }

        audioRef.current.onended = () => {
          setCurrentCaption('');
          resolve();
        };
      } catch (error) {
        console.log('Audio setup error - continuing without sound');
        resolve();
      }
    });
  }, [isMuted, conversationStep]);

  // Progress conversation
  const progressConversation = useCallback(async () => {
    if (!isCallActive || isProcessing || conversationStep >= conversation.length) {
      if (conversationStep >= conversation.length) {
        setIsCallActive(false);
        setConversationStep(0);
      }
      return;
    }

    setIsProcessing(true);
    try {
      const currentMessage = conversation[conversationStep];
      console.log('Processing message:', currentMessage.text);

      await playAudio(currentMessage.audioFile);
      
      setConversationStep(prev => prev + 1);
    } catch (error) {
      console.error('Conversation error:', error);
      setConversationStep(prev => prev + 1);
    } finally {
      setIsProcessing(false);
    }
  }, [isCallActive, isProcessing, conversationStep, playAudio]);

  // Auto progress conversation
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isCallActive && !isProcessing && !isPlaying) {
      timeoutId = setTimeout(progressConversation, 500);
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isCallActive, isProcessing, conversationStep, progressConversation, isPlaying]);

  // Handle call toggle
  const handleCallToggle = useCallback(() => {
    if (!isCallActive) {
      setIsCallActive(true);
      setConversationStep(0);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsCallActive(false);
      setConversationStep(0);
      setIsPlaying(false);
      setIsProcessing(false);
    }
  }, [isCallActive]);

  // Handle mute toggle
  const handleMuteToggle = useCallback(() => {
    setIsMuted(prev => {
      if (audioRef.current) {
        audioRef.current.volume = prev ? 1 : 0;
      }
      return !prev;
    });
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[140vh] bg-theme-bg-primary">
      {/* Premium Animated Background Lines and Lucide Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute left-12 top-24"
          animate={{ y: [-30, 15, -30], rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Bot className="w-16 h-16 text-purple-400/20" />
        </motion.div>
        <motion.div
          className="absolute right-20 top-1/2"
          animate={{ y: [25, -25, 25], rotate: [360, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Phone className="w-20 h-20 text-yellow-400/15" />
        </motion.div>
        <motion.div
          className="absolute left-1/2 bottom-16 -translate-x-1/2"
          animate={{ y: [20, -20, 20], rotate: [0, 360] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sparkles className="w-16 h-16 text-theme-glow-accent/15" />
        </motion.div>

        
        
        {/* Animated gradient lines */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-theme-glow-primary/50 to-transparent"
            style={{ top: "30%" }}
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
            className="absolute w-[1px] h-full bg-gradient-to-b from-transparent via-theme-glow-accent/50 to-transparent"
            style={{ left: "30%" }}
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
            className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-theme-glow-accent/30 to-transparent"
            style={{ top: "70%" }}
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
      
      {/* Title Section */}
      <div className="text-center mb-16">
        <h2 className="text-6xl md:text-8xl font-bold tracking-tight">
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-theme-text-primary via-theme-glow-accent to-theme-text-primary">
    AI Voice Assistant
  </span>
</h2>
<p className="mt-6 text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-theme-text-primary via-theme-glow-accent to-theme-text-primary max-w-3xl mx-auto">
  This is just a demo showcase. For live working demo,{' '}
  <Link to="/" className="bg-clip-text text-transparent bg-gradient-to-r from-theme-glow-accent via-theme-glow-accent to-theme-text-primary hover:from-theme-glow-accent/80 hover:to-theme-text-primary/80 transition-colors">
    go to homepage
  </Link>{' '}
  and click on the "Talk to AI Agent" button.
</p>
      </div>

      {/* Phone Section */}
      <div className="relative w-full max-w-[300px] mx-auto">
        {/* Glow Effect */}
        <div className="absolute inset-0 -m-1 bg-gradient-to-r from-theme-glow-primary/20 via-theme-glow-accent/20 to-theme-glow-secondary/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute inset-0 -m-1 bg-gradient-to-b from-theme-glow-primary/20 via-theme-glow-accent/20 to-theme-glow-secondary/20 rounded-full blur-2xl animate-pulse" />
        
        {/* Instructions - Adjusted position to align with green button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: !isCallActive ? 1 : 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute right-[-360px] bottom-[140px] flex items-center"
        >
          <div className="flex flex-col items-start gap-2">
            {/* Text and Arrow Container */}
            <div className="flex items-center gap-3">
              {/* Arrow pointing left */}
              <motion.div
                animate={{
                  x: [0, -8, 0],
                  opacity: !isCallActive ? 1 : 0,
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="flex items-center"
              >
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[8px] border-r-theme-glow-accent" />
                <div className="h-[2px] w-12 bg-gradient-to-l from-theme-glow-accent to-theme-glow-accent/30" />
              </motion.div>

              {/* Main Text */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: !isCallActive ? 1 : 0 }}
                transition={{ delay: 0.7 }}
                className="text-theme-glow-accent text-lg font-medium whitespace-nowrap bg-theme-bg-primary/50 px-30 py-2 rounded-full backdrop-blur-sm border border-theme-glow-accent/20"
              >
                Click to Experience TopEdge AI
              </motion.span>
            </div>
          </div>

          {/* Subtle glow effect */}
          <motion.div
            className="absolute -z-10 inset-0 -m-4 bg-gradient-to-r from-theme-glow-accent/5 to-transparent rounded-lg blur-lg"
            animate={{
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        <div className="relative aspect-[9/19.5] w-full">
          {/* Phone Border */}
          <div className="absolute inset-0 rounded-[45px] bg-theme-bg-primary shadow-[0_0_25px_rgba(0,0,0,0.3)] overflow-hidden border border-theme-border-primary">
            {/* Status Bar with Real Time */}
            <div className="relative h-12 flex items-center justify-between px-6 bg-theme-bg-primary">
              <div className="text-theme-text-primary text-[14px] font-medium">{currentTime}</div>
              <div className="absolute top-0 left-0 right-0 h-7">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[25px] bg-theme-bg-primary flex items-center justify-center">
                  <div className="w-16 h-[3px] rounded-full bg-theme-bg-secondary" />
                </div>
              </div>
              <div>
                <Battery className="w-6 h-6 text-theme-text-primary" />
              </div>
            </div>

            {/* Main Content */}
            {!isCallActive ? (
              // Incoming Call Screen
              <div className="flex flex-col h-[calc(100%-3rem)] bg-theme-bg-primary">
                <div className="flex-1 flex flex-col items-center">
                  {/* Title */}
                  <div className="w-full text-center mt-12 mb-20">
                    <h2 className="text-theme-text-primary text-[32px] font-medium mb-2">TopEdge AI</h2>
                    <p className="text-theme-text-secondary text-lg">Incoming Call From TopEdge</p>
                  </div>

                  {/* Logo Avatar with Enhanced Green Glow Effects */}
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="mb-auto relative"
                  >
                    <div className="relative w-24 h-24">
                      {/* Enhanced Glow Effects */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-theme-glow-accent/20 blur-xl"
                        animate={{
                          opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      
                      {/* Ripple Effects */}
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-theme-glow-accent/30"
                        animate={{
                          scale: [1, 1.5],
                          opacity: [0.5, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-theme-glow-accent/20"
                        animate={{
                          scale: [1, 2],
                          opacity: [0.3, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                          delay: 0.5
                        }}
                      />

                      {/* Logo Container with Green Border */}
                      <div className="absolute inset-0 rounded-full bg-theme-bg-primary flex items-center justify-center overflow-hidden border-2 border-theme-glow-accent">
                        <img src="/logo.png" alt="TopEdge Logo" className="w-20 h-20 object-contain" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Call Controls */}
                  <div className="mb-32 w-full flex items-center justify-center space-x-20 relative">
                    <motion.button 
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setIsCallActive(false)}
                      className="w-[70px] h-[70px] rounded-full bg-red-600 flex items-center justify-center shadow-2xl border-4 border-white hover:bg-red-700 hover:border-red-300 transition-all duration-200"
                    >
                      <X className="w-8 h-8 text-white" />
                    </motion.button>
                    
                    {/* Enhanced Green Button */}
                    <div className="relative">
                      <motion.button 
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={handleCallToggle}
                        className="w-[70px] h-[70px] rounded-full bg-green-500 flex items-center justify-center shadow-2xl border-4 border-white hover:bg-green-600 hover:border-green-300 transition-all duration-200 group"
                      >
                        {/* Enhanced Glow Effect */}
                        <div className="absolute inset-0 rounded-full bg-theme-glow-accent/30 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Enhanced Ripple Effects */}
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-theme-glow-accent/30"
                          animate={{
                            scale: [1, 1.5],
                            opacity: [0.5, 0]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                        
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-theme-glow-accent/20"
                          animate={{
                            scale: [1, 2],
                            opacity: [0.3, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: 0.5
                          }}
                        />
                        
                        <Phone className="w-8 h-8 text-white relative z-10" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Active Call Screen
              <div className="flex flex-col h-[calc(100%-3rem)] bg-theme-bg-primary">
                <div className="flex-1 flex flex-col items-center pt-8">
                  {/* Active Call Header with Enhanced Logo */}
                  <div className="flex flex-col items-center mb-8">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16">
                        {/* Enhanced Glow Effects */}
                        <motion.div
                          className="absolute inset-0 rounded-full bg-theme-glow-accent/20 blur-lg"
                          animate={{
                            opacity: [0.3, 0.6, 0.3]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        
                        {/* Ripple Effects */}
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-theme-glow-accent/30"
                          animate={{
                            scale: [1, 1.5],
                            opacity: [0.5, 0]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-theme-glow-accent/20"
                          animate={{
                            scale: [1, 2],
                            opacity: [0.3, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: 0.5
                          }}
                        />
                        
                        {/* Logo Container with Green Border */}
                        <div className="absolute inset-0 rounded-full bg-theme-bg-primary flex items-center justify-center overflow-hidden border-2 border-theme-glow-accent">
                          <img src="/logo.png" alt="TopEdge Logo" className="w-12 h-12 object-contain" />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <h2 className="text-theme-text-primary text-2xl font-medium">TopEdge AI</h2>
                        <span className="text-theme-text-secondary text-sm">{formatDuration(callDuration)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Repositioned Caption Display */}
                  <div className="w-full px-4 mb-6">
                    {currentCaption && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                      >
                        <div className="bg-theme-bg-secondary/90 rounded-lg p-4 backdrop-blur-md border border-theme-glow-accent/20 shadow-lg">
                          <p className="text-theme-text-primary text-sm leading-relaxed">
                            {currentCaption}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Call Controls - Adjusted spacing */}
                  <div className="w-full mt-auto">
                    <motion.div 
                      className="grid grid-cols-3 gap-6 px-8 mb-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {/* Top Row */}
                      <motion.button 
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.96 }}
                        className="flex flex-col items-center space-y-2"
                      >
                        <div className="w-14 h-14 rounded-full bg-theme-bg-secondary flex items-center justify-center">
                          <Phone className="w-6 h-6 text-theme-text-primary" />
                        </div>
                        <span className="text-theme-text-secondary text-sm">Add Call</span>
                      </motion.button>

                      <motion.button 
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.96 }}
                        className="flex flex-col items-center space-y-2"
                      >
                        <div className="w-14 h-14 rounded-full bg-theme-bg-secondary flex items-center justify-center">
                          <Video className="w-6 h-6 text-theme-text-primary" />
                        </div>
                        <span className="text-theme-text-secondary text-sm">FaceTime</span>
                      </motion.button>

                      <motion.button 
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.96 }}
                        className="flex flex-col items-center space-y-2"
                      >
                        <div className="w-14 h-14 rounded-full bg-theme-bg-secondary flex items-center justify-center">
                          <Contact className="w-6 h-6 text-theme-text-primary" />
                        </div>
                        <span className="text-theme-text-secondary text-sm">Contacts</span>
                      </motion.button>

                      {/* Bottom Row */}
                      <motion.button 
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.96 }}
                        className="flex flex-col items-center space-y-2"
                      >
                        <div className="w-14 h-14 rounded-full bg-theme-bg-secondary flex items-center justify-center">
                          <Volume2 className="w-6 h-6 text-theme-text-primary" />
                        </div>
                        <span className="text-theme-text-secondary text-sm">Speaker</span>
                      </motion.button>

                      <motion.button 
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.96 }}
                        className="flex flex-col items-center space-y-2"
                      >
                        <div className="w-14 h-14 rounded-full bg-theme-bg-secondary flex items-center justify-center">
                          <Sparkles className="w-6 h-6 text-theme-text-primary" />
                        </div>
                        <span className="text-theme-text-secondary text-sm">Effects</span>
                      </motion.button>

                      <motion.button 
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={handleMuteToggle}
                        className="flex flex-col items-center space-y-2"
                      >
                        <div className={`w-14 h-14 rounded-full ${isMuted ? 'bg-theme-text-primary' : 'bg-theme-bg-secondary'} flex items-center justify-center`}>
                          {isMuted ? <MicOff className="w-6 h-6 text-theme-bg-primary" /> : <Mic className="w-6 h-6 text-theme-text-primary" />}
                        </div>
                        <span className="text-theme-text-secondary text-sm">Mute</span>
                      </motion.button>
                    </motion.div>

                    {/* Enhanced End Call Button */}
                    <div className="relative px-8 mb-20">
                      <motion.div 
                        className="flex justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {/* Button Container with Enhanced Effects */}
                        <div className="relative">
                          <motion.button 
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={handleCallToggle}
                            className="w-[70px] h-[70px] rounded-full bg-red-600 flex items-center justify-center shadow-2xl border-4 border-white hover:bg-red-700 hover:border-red-300 transition-all duration-200 group"
                          >
                            {/* Enhanced Glow Effect */}
                            <div className="absolute inset-0 rounded-full bg-red-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            {/* Ripple Effects */}
                            <motion.div
                              className="absolute inset-0 rounded-full border-2 border-red-500/30"
                              animate={{
                                scale: [1, 1.5],
                                opacity: [0.5, 0]
                              }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "linear"
                              }}
                            />
                            
                            {/* Inner Glow */}
                            <motion.div
                              className="absolute inset-0 rounded-full bg-gradient-to-b from-red-500/20 to-red-600/20"
                              animate={{
                                opacity: [0.5, 0.8, 0.5]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            />
                            
                            {/* Icon - Made Larger and More Visible */}
                            <PhoneOff className="w-8 h-8 text-white relative z-10" />
                          </motion.button>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Bottom Bar - Increased margin */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-36 h-1 bg-theme-border-primary rounded-full" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
