import { motion, useScroll, useTransform } from 'framer-motion';
import { Clock, DollarSign, Database, Settings, Zap, Sparkles, Shield, Users, BarChart, Brain, Gem } from 'lucide-react';
import { useRef } from 'react';

const benefits = [
  {
    icon: Brain,
    title: "100% Custom-Built AI Agents",
    description: "Your brand's voice deserves its own voice. Your AI voice agent is fully customised, tailored to your industry, tone, and goals. No limitations. No compromises.",
    gradient: "from-theme-glow-primary to-theme-glow-accent",
    delay: 0,
    direction: "left"
  },
  {
    icon: DollarSign,
    title: "Free Development & Deployment",
    description: "We invest in you first — because your success is ours. While others charge thousands to get started, we handle everything strategy, build, training & deployment - all 100% free.",
    gradient: "from-theme-glow-accent to-theme-glow-secondary",
    delay: 0.1,
    direction: "right"
  },
  {
    icon: Database,
    title: "Live Dashboard Access",
    description: "Make script tweaks, monitor conversations, and track performance all from your own dashboard. Built with code, designed for clarity. Change what you want, when you want.",
    gradient: "from-theme-glow-secondary to-theme-glow-primary",
    delay: 0.2,
    direction: "left"
  },
  {
    icon: Settings,
    title: "Real-Time Customization Control",
    description: "Full control over your AI's behavior, responses, and personality. Adjust and optimize in real-time based on your business needs. No tech skills needed.",
    gradient: "from-theme-glow-accent to-theme-glow-primary",
    delay: 0.4,
    direction: "left"
  }
];

const PricingBenefits = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], ["5%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  return (
    <motion.section
      ref={containerRef}
      id="pricing-benefits"
      className="relative py-24 overflow-hidden bg-theme-bg-primary"
      style={{
        opacity,
        y,
        scale
      }}
    >
      {/* Animated Lucide Icons Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Brain - top left */}
        <motion.div
          className="absolute left-8 top-10 text-red-400/30"
          animate={{ y: [-15, 15, -15], rotate: [0, 360, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
        >
          <Brain className="w-14 h-14" />
        </motion.div>
        {/* DollarSign - left center */}
        <motion.div
          className="absolute left-6 top-1/2 text-emerald-400/25"
          animate={{ x: [-10, 10, -10], rotate: [0, -360, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <DollarSign className="w-12 h-12" />
        </motion.div>
        {/* Database - top right */}
        <motion.div
          className="absolute right-12 top-16 text-green-500/25"
          animate={{ y: [10, -10, 10], rotate: [0, 180, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: "linear" }}
        >
          <Database className="w-14 h-14" />
        </motion.div>
        {/* Sparkles - mid right */}
        <motion.div
          className="absolute right-10 top-1/3 text-blue-500/20"
          animate={{ y: [-12, 12, -12], rotate: [0, 360, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-12 h-12" />
        </motion.div>
        {/* Settings - bottom left */}
        <motion.div
          className="absolute left-20 bottom-16 text-purple-400/20"
          animate={{ x: [0, 12, 0], rotate: [0, 180, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        >
          <Settings className="w-12 h-12" />
        </motion.div>
        {/* Shield - bottom right */}
        <motion.div
          className="absolute right-16 bottom-20 text-black-600/15"
          animate={{ y: [10, -10, 10], rotate: [0, 360, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          <Shield className="w-16 h-16" />
        </motion.div>
        {/* Users - center bottom */}
        <motion.div
          className="absolute left-1/2 bottom-8 -translate-x-1/2 text-emerald-400/15"
          animate={{ y: [-10, 10, -10], rotate: [0, -180, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Users className="w-14 h-14" />
        </motion.div>
      </div>
      {/* Background with subtle gradient */}
      

      <div className="relative max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-16 sm:mb-24 px-4">
          <motion.div 
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-theme-glow-primary/10 border border-theme-glow-primary/20 mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
            <span className="text-xs sm:text-sm text-green-700">Why Choose Us</span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-emerald-500 to-green-700">
              Benefits That Set Us Apart
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-theme-text-secondary max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Experience the future of customer service with our AI-powered solutions
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-12 md:gap-16 px-4 sm:px-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="w-full"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: benefit.delay, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="relative p-6 sm:p-8 rounded-2xl backdrop-blur-xl border border-theme-border-primary bg-theme-bg-secondary/50 h-full overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {/* Icon */}
                <motion.div
                  className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r from-green-500 via-black to-green-700 p-0.5 mb-4 sm:mb-6"
                  whileHover={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-full h-full bg-theme-bg-primary rounded-xl flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                  </div>
                </motion.div>
                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
                  <span className="bg-gradient-to-r from-green-500 via-black to-green-700 bg-clip-text text-transparent">{benefit.title}</span>
                </h3>
                <p className="text-sm sm:text-base text-theme-text-secondary">{benefit.description}</p>
                {/* Hover Effects */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-600/10 to-green-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                  animate={{
                    background: [
                      "radial-gradient(600px circle at var(--x) var(--y), rgba(var(--theme-glow-primary-rgb), 0.1), transparent 40%)"
                    ],
                  }}
                  transition={{ duration: 0.2 }}
                  style={{
                    "--x": "50%",
                    "--y": "50%"
                  } as any}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default PricingBenefits;
