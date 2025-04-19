import { useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, MessagesSquare, Send, Bot, Sparkles, ArrowRight, Zap, Play } from 'lucide-react';

interface Platform {
  name: string;
  icon: string;
  color: string;
  messages: string[];
  features: string[];
}

const features = [
  {
    icon: <Bot className="w-7 h-7 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" />,
    title: "Instant Support",
    description: "Respond to customers in seconds across all channels"
  },
  {
    icon: <MessageSquare className="w-7 h-7 text-violet-400 group-hover:text-violet-300 transition-colors duration-300" />,
    title: "24/7 Lead Generation",
    description: "Convert visitors into qualified leads while you sleep"
  },
  {
    icon: <Sparkles className="w-7 h-7 text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors duration-300" />,
    title: "Smart Follow-ups",
    description: "Automated nurturing increases conversion by 40%"
  }
];

const AdvancedChatbotSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] sm:min-h-screen bg-[#000000] py-12 sm:py-20 mb-8 sm:mb-0 overflow-hidden"
    >
      {/* Enhanced Background Effects - Optimized for mobile */}
      <div className="absolute inset-0">
        {/* Simplified Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-indigo-500/10 rounded-full blur-[60px] sm:blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-violet-500/10 rounded-full blur-[60px] sm:blur-[128px]" />
      </div>

      {/* Content Container - Improved mobile spacing */}
      <div className="relative container mx-auto px-4 sm:px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16">
          {/* Left Content - Image/Demo Section */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 min-h-[360px] sm:min-h-[600px] relative">
            <div className="relative w-full max-w-[500px] mx-auto lg:mx-0">
              {/* WhatsApp Image */}
              <div className="absolute w-[200px] lg:w-[320px] left-1/2 lg:left-0 -translate-x-[60%] lg:translate-x-0 top-0 lg:top-20">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                  <img 
                    src="whatsapp , insta/1.png" 
                    alt="WhatsApp Interface" 
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Instagram Image */}
              <div className="absolute w-[220px] lg:w-[340px] left-1/2 lg:right-[-10%] -translate-x-[40%] lg:translate-x-0 top-[150px] lg:top-[280px]">
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-300">
                  <img 
                    src="whatsapp , insta/2.png" 
                    alt="Instagram Interface" 
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Adjusted for mobile */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            {/* Label */}
            <div className="mb-4 sm:mb-6">
              <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm font-medium bg-white/5 text-white/80 backdrop-blur-sm border border-white/10">
                AI Chat Support
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-8xl font-bold mb-3 sm:mb-6 mx-auto lg:mx-0 max-w-[15ch]"
              style={{
                background: 'linear-gradient(to right, #fff, #6366F1, #fff)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              AI-Powered Support
            </h2>
            <p className="text-gray-400 text-base sm:text-xl mb-6 sm:mb-12 mx-auto lg:mx-0 max-w-[35ch] whitespace-pre-line">
              At least 42% of chats in your inbox go unanswered.
              Your slow replies?
              Those inquiries have already gone to your competitors.
            </p>

            {/* Features Grid - Improved mobile spacing */}
            <div className="grid grid-cols-1 gap-4 sm:gap-8 mb-6 sm:mb-12 max-w-lg mx-auto lg:mx-0">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 sm:space-x-4"
                >
                  <div className="p-2.5 sm:p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 backdrop-blur-sm border border-indigo-500/20 shadow-xl group hover:from-indigo-500/20 hover:to-violet-500/20 transition-all duration-300 shrink-0">
                    {feature.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-white text-sm sm:text-base font-semibold mb-1 sm:mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-xs sm:text-base">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button - centered on mobile, left-aligned on desktop */}
            <div className="flex justify-center lg:justify-start">
              <motion.a
                href="/contact"
                className="group relative inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-10 py-2.5 sm:py-5 bg-white/5 rounded-full text-white font-semibold text-sm sm:text-lg transition-all duration-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Transform My Business With TopEdge AI</span>
                <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 text-white relative z-10" />
                
                {/* Main Button Background */}
                <div className="absolute inset-0 bg-black border border-purple-500/50 group-hover:border-purple-400 rounded-full" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedChatbotSection; 