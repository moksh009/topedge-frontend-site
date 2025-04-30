import { useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Bot, Sparkles, ArrowRight, MessageCircle, User } from 'lucide-react';

const features = [
  {
    icon: <Bot className="w-7 h-7 text-theme-text-accent" />,
    title: "Instant Support",
    description: "Respond to customers in seconds across all channels"
  },
  {
    icon: <MessageSquare className="w-7 h-7 text-theme-text-accent" />,
    title: "24/7 Lead Generation",
    description: "Convert visitors into qualified leads while you sleep"
  },
  {
    icon: <Sparkles className="w-7 h-7 text-theme-text-accent" />,
    title: "Smart Follow-ups",
    description: "Automated nurturing increases conversion by 40%"
  }
];

const AdvancedChatbotSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-theme-bg-primary py-20 overflow-hidden"
    >
      {/* Simplified Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, var(--glow-accent) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, var(--glow-accent) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 100%, var(--glow-accent) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 0%, var(--glow-accent) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, var(--glow-accent) 0%, transparent 50%)',
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute left-80 top-24 text-blue-400/40"
          animate={{ y: [-10, 10, -10], rotate: [0, 360, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <MessageSquare className="w-20 h-20" />
        </motion.div>
        <motion.div
          className="absolute right-24 top-1/2 text-yellow-400/50"
          animate={{ x: [8, -8, 8], rotate: [0, -180, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute right-1/4 bottom-40 text-emerald-400/50"
          animate={{ y: [12, -12, 12], rotate: [0, 180, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          <User className="w-16 h-16" />
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="relative container mx-auto px-4 sm:px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16">
          {/* Left Content - Image/Demo Section */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0 min-h-[360px] sm:min-h-[600px] relative">
            <div className="relative w-full max-w-[500px] mx-auto lg:mx-0">
              {/* WhatsApp Image */}
              <motion.div 
                className="absolute w-[200px] lg:w-[320px] left-2 sm:left-1/2 lg:left-0 -translate-x-0 sm:-translate-x-[60%] lg:translate-x-0 top-0 lg:top-20"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="relative overflow-hidden transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-theme-glow-primary/10 via-theme-glow-accent/10 to-theme-glow-secondary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img 
                    src="whatsapp , insta/1.png" 
                    alt="WhatsApp Interface" 
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </motion.div>

              {/* Instagram Image */}
              <motion.div 
                className="absolute w-[220px] lg:w-[340px] left-1/2 lg:right-[-10%] -translate-x-[40%] lg:translate-x-0 top-[150px] lg:top-[280px]"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="relative overflow-hidden transform rotate-6 hover:rotate-0 transition-transform duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-theme-glow-primary/10 via-theme-glow-accent/10 to-theme-glow-secondary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <img 
                    src="whatsapp , insta/2.png" 
                    alt="Instagram Interface" 
                    className="w-full h-auto"
                    loading="lazy"
                  />
                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-theme-bg-primary/5 to-theme-bg-primary/10" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            {/* Enhanced Label */}
            <motion.div
              className="inline-block mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="relative px-6 py-3 rounded-full overflow-hidden bg-white/5">
                {/* Premium border design */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-theme-glow-primary/20 via-theme-glow-accent/20 to-theme-glow-secondary/20 animate-gradient-xy" />
                  <div className="absolute inset-0 backdrop-blur-xl" />
                  <div className="absolute inset-0 border-[1.5px] border-white/10 rounded-full" />
                  <div className="absolute inset-0 bg-white/5" />
                </div>

                {/* Content */}
                <div className="relative flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-medium text-black/90">
                    AI Chat Support
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.h2 
              className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-theme-text-primary via-theme-text-accent to-theme-text-primary bg-clip-text text-transparent"
            >
              AI-Powered Support
            </motion.h2>
            <motion.p 
              className="text-theme-text-secondary text-lg sm:text-xl mb-12 max-w-[35ch] whitespace-pre-line"
            >
              At least 42% of chats in your inbox go unanswered.
              Your slow replies?
              Those inquiries have already gone to your competitors.
            </motion.p>

            {/* Features List */}
            <div className="space-y-6 mb-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="p-3 rounded-xl bg-theme-bg-surface/5 backdrop-blur-sm border border-theme-border-primary/10">
                    {feature.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-theme-text-primary font-semibold mb-1">{feature.title}</h3>
                    <p className="text-theme-text-secondary text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover="hover"
              whileTap="tap"
              variants={{
                hover: { scale: 1.05 },
                tap: { scale: 0.95 }
              }}
              className="group relative rounded-full"
            >
              <div className="relative px-8 py-4 rounded-full">
                {/* Outer Glow */}
                <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full bg-gradient-to-r from-theme-glow-accent/30 via-theme-glow-primary/30 to-theme-glow-accent/30" />
                
                {/* Moving Particles Background */}
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-theme-glow-accent"
                      animate={{
                        x: [Math.random() * 200, Math.random() * -200, Math.random() * 200],
                        y: [Math.random() * 100, Math.random() * -100, Math.random() * 100],
                        scale: [0, 1.5, 0],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`
                      }}
                    />
                  ))}
                </div>

                {/* Button Background */}
                <div className="absolute inset-0 bg-theme-bg-surface border rounded-full border-theme-border-accent/50 group-hover:border-theme-border-accent" />
                
                {/* Button Content */}
                <div className="relative flex items-center gap-3">
                  <span className="text-base font-medium bg-gradient-to-r from-theme-text-primary via-theme-text-accent to-theme-text-primary bg-clip-text text-transparent">
                    Transform My Business With TopEdge AI
                  </span>
                  <ArrowRight className="w-5 h-5 text-theme-text-accent group-hover:text-theme-text-primary transition-colors duration-300" />
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdvancedChatbotSection; 