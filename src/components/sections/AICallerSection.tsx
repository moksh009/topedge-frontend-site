import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Phone, Bot, Shield, ArrowRight, PhoneOutgoing, Waves } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const features = [
  {
    icon: <Bot className="w-7 h-7 text-theme-text-accent" />,
    title: "Smart Call Handling",
    description: "Ready to serve 24/7, Qualifies leads, Books appointments\n100% accurate scheduling — no missed opportunities."
  },
  {
    icon: <Waves className="w-7 h-7 text-theme-text-accent" />,
    title: "Multi Language",
    description: "Break language barriers and expand your global reach. Multiple Languages"
  },
  {
    icon: <PhoneOutgoing className="w-7 h-7 text-theme-text-accent" />,
    title: "Outgoing Calls",
    description: "Upload a contact list — the AI Agent calls them one by one.\nPerfect for: Cold Calls, Appointment Reminders, Sales Calls, Promotional Campaigns."
  },
  {
    icon: <Shield className="w-7 h-7 text-theme-text-accent" />,
    title: "Lead Prioritization",
    description: "Route high-value prospects to your team automatically"
  }
];

const AICallerSection = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDemoClick = () => {
    navigate('/services');
  };

  return (
    <section
      ref={containerRef}
      id="ai-caller-demo"
      className="relative min-h-screen bg-theme-bg-primary py-20 overflow-hidden"
    >
      {/* Simplified Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, var(--glow-primary) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, var(--glow-primary) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 100%, var(--glow-primary) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 0%, var(--glow-primary) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, var(--glow-primary) 0%, transparent 50%)',
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
          className="absolute left-80 top-26 text-blue-400/30"
          animate={{ y: [-10, 10, -10], rotate: [0, 360, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <Phone className="w-20 h-20" />
        </motion.div>
        <motion.div
          className="absolute right-32 top-1/3 text-yellow-400/40"
          animate={{ x: [8, -8, 8], rotate: [0, -180, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <Waves className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute left-1/3 bottom-20 text-emerald-400/40"
          animate={{ y: [12, -12, 12], rotate: [0, 180, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          <Bot className="w-16 h-16" />
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="relative container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
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
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-medium text-black/90">
                    AI Phone Agent
                  </span>
                </div>
              </div>
            </motion.div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-theme-text-primary via-theme-text-accent to-theme-text-primary bg-clip-text text-transparent">
              Never Miss a <br/>Single call
            </h2>
            <p className="text-theme-text-secondary text-lg sm:text-xl mb-12 max-w-[35ch]">
              AI voice agent handles unlimited calls 24/7, turning inquiries into revenue
            </p>

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
                    <p className="text-theme-text-secondary text-sm whitespace-pre-line">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced CTA Button */}
            <motion.button
              onClick={handleDemoClick}
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
                <div className="absolute inset-0 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 rounded-full bg-gradient-to-r from-theme-glow-primary/30 via-theme-glow-secondary/30 to-theme-glow-primary/30" />
                
                {/* Moving Particles Background */}
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-theme-glow-primary"
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
                    See how AI works
                  </span>
                  <ArrowRight className="w-5 h-5 text-theme-text-accent group-hover:text-theme-text-primary transition-colors duration-300" />
                </div>
              </div>
            </motion.button>
          </div>

          {/* Right Content - EVE Image */}
          <div className="w-full lg:w-1/2">
            <motion.div 
              className="relative w-full h-[500px] sm:h-[700px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Enhanced glow effects with reduced intensity */}
              <div className="absolute inset-0 blur-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-theme-glow-primary/10 via-theme-glow-accent/10 to-theme-glow-secondary/10 rounded-xl opacity-50" />
                <motion.div
                  className="absolute inset-0 bg-gradient-radial from-theme-glow-primary/15 via-transparent to-transparent"
                  animate={{
                    opacity: [0.15, 0.05, 0.05]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              <img
                src="whatsapp , insta/eev.png"
                alt="EVE AI Assistant"
                className="w-full h-full object-contain relative z-10"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AICallerSection; 
