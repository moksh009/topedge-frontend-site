import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import { Phone, MessageSquare, Calendar, Users, Clock, Zap, Bot, BrainCircuit, Sparkles, CheckCircle2, XCircle, Building2, Globe2, TrendingUp, ArrowRight, Star, PhoneCall, MessageCircle, CalendarCheck, PhoneIncoming, BellRing, CalendarRange, Calculator } from 'lucide-react';
import React from 'react';

interface Benefit {
  icon: React.ComponentType<{ className: string }>;
  title: string;
  subtitle: string;
  painPoints: string[];
  solutions: string[];
  stats: {
    value: string;
    label: string;
  }[];
  gradient: string;
  glowColor: string;
}

const benefits: Benefit[] = [
  {
    icon: ({ className }: { className: string }) => (
      // <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-3 flex items-center justify-center">
        <Sparkles className="w-10 h-10 text-white" />
      // </div>
    ),
    title: "AI Voice Agent",
    subtitle: "24/7 Intelligent Call Handling",
    painPoints: [
      "72% of customers choose competitors when calls go unanswered",
      "Missed calls during peak hours and after business hours",
      "High cost of hiring and training receptionists"
    ],
    solutions: [
      "Never miss a call with 24/7 intelligent call handling",
      "Handle unlimited concurrent calls without wait times",
      "Qualify leads and book meetings automatically"
    ],
    stats: [
      { value: "100%", label: "Call Answer Rate" },
      { value: "65%", label: "Cost Reduction" },
      { value: "3x", label: "Lead Conversion" }
    ],
    gradient: "from-[#3B82F6] via-[#6366F1] to-[#8B5CF6]",
    glowColor: "rgba(99, 102, 241, 0.15)"
  },
  {
    icon: ({ className }: { className: string }) => (

        <Bot className="w-10 h-10 text-white" />

    ),
    title: "Advanced Chatbot",
    subtitle: "Instant Multi-Channel Support",
    painPoints: [
      "90% of leads go cold without instant engagement",
      "Inconsistent customer support across channels",
      "Limited support hours causing customer frustration"
    ],
    solutions: [
      "Instant responses across all messaging platforms",
      "Consistent omni-channel customer experience",
      "24/7 lead qualification and nurturing"
    ],
    stats: [
      { value: "95%", label: "Faster Response" },
      { value: "45%", label: "Support Cost Reduction" },
      { value: "100%", label: "Customer Satisfaction" }
    ],
    gradient: "from-[#8B5CF6] via-[#A855F7] to-[#D946EF]",
    glowColor: "rgba(168, 85, 247, 0.15)"
  },
  {
    icon: ({ className }: { className: string }) => (

        <CalendarCheck className="w-full h-full text-white" />
      
    ),
    title: "Auto Scheduling",
    subtitle: "Global Booking System",
    painPoints: [
      "Lost opportunities due to timezone & availability gaps",
      "Manual scheduling taking up valuable time",
      "Double bookings and scheduling conflicts"
    ],
    solutions: [
      "Automated booking across all timezones",
      "Smart calendar management and conflict resolution",
      "Instant confirmation and reminders"
    ],
    stats: [
      { value: "3x", label: "More Meetings" },
      { value: "100%", label: "Scheduling Accuracy" },
      { value: "80%", label: "Time Saved" }
    ],
    gradient: "from-[#EC4899] via-[#F43F5E] to-[#FB7185]",
    glowColor: "rgba(236, 72, 153, 0.15)"
  }
];

const AIBenefitsShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedBenefit, setSelectedBenefit] = useState<number | null>(null);
  const isMobile = window.innerWidth < 768;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { mass: 0.1, stiffness: 100, damping: 30 };
  const backgroundY = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]),
    springConfig
  );

  const memoizedBenefits = useMemo(() => benefits, []);

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-screen bg-theme-bg-primary py-20 sm:py-32 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Background */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, var(--glow-primary) 0%, transparent 70%)',
            filter: 'blur(80px)',
            willChange: 'background',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        />

        {/* Animated Grid */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: 'var(--grid-white)',
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        />
      </div>

      {/* Floating icons as background decorations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute left-10 top-20 text-blue-400/20"
          animate={{ y: [-15, 15, -15], rotate: [0, 360, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
        >
          <Bot className="w-20 h-20" />
        </motion.div>
        <motion.div
          className="absolute right-40 bottom-20 text-yellow-400/20"
          animate={{ y: [10, -10, 10], rotate: [0, -360, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute left-1/2 top-1/8 text-emerald-400/20"
          animate={{ x: [-10, 10, -10], rotate: [0, 180, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <MessageCircle className="w-16 h-16" />
        </motion.div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6">
        {/* Premium Header */}
        <motion.div
          className="text-center mb-16 sm:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Premium Box UI for Revenue Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white/5 px-6 py-3 relative overflow-hidden"
          >
            {/* Premium border design */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-r from-theme-glow-primary/20 via-theme-glow-accent/20 to-theme-glow-secondary/20 animate-gradient-xy" />
              <div className="absolute inset-0 backdrop-blur-xl" />
              <div className="absolute inset-0 border-[1.5px] border-white/10 rounded-full" />
              <div className="absolute inset-0 bg-white/5" />
            </div>

            {/* Content */}
            <Calculator className="relative w-4 sm:w-5 h-4 sm:h-5 text-blue-400" />
            <span className="relative text-sm font-medium text-black/90">Add upto Extra $10k in Revenue</span>
          </motion.div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 sm:mb-8">
            <motion.span
              className="block bg-gradient-to-r from-theme-text-primary via-theme-text-accent to-theme-text-primary bg-clip-text text-transparent leading-tight"
            >
              Transform Your Business
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-theme-text-accent via-theme-text-primary to-theme-text-accent text-transparent bg-clip-text mt-2 sm:mt-4"
            >
              With TopEdge AI
            </motion.span>
          </h2>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-theme-text-secondary max-w-3xl mx-auto font-light px-4 mb-8"
          >
            Experience the future of business automation with TopEdge AI solutions
          </motion.p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 max-w-7xl mx-auto">
          {memoizedBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.21, 0.45, 0.15, 1.0],
              }}
              onClick={() => setSelectedBenefit(selectedBenefit === index ? null : index)}
              className="relative mb-6 sm:mb-0 cursor-pointer group"
            >
              {/* Premium Animated Border */}
              <motion.div
                initial={false}
                animate={selectedBenefit === index ? {
                  scale: 1.04,
                  boxShadow: '0 8px 40px 0 rgba(80,120,255,0.13)',
                } : {
                  scale: 1,
                  boxShadow: '0 2px 12px 0 rgba(80,120,255,0.06)',
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                className={`relative h-full rounded-3xl transition-all duration-300
                  before:content-[''] before:absolute before:inset-0 before:rounded-3xl
                  before:border-2
                  before:pointer-events-none
                  before:transition-all before:duration-300
                  before:bg-gradient-to-br
                  before:from-blue-400/70 before:via-pink-400/60 before:to-violet-500/70
                  before:opacity-${selectedBenefit === index ? '100' : '60'}
                  before:shadow-[0_0_40px_0_rgba(80,120,255,0.15)]
                  group-hover:before:opacity-100
                `}
                style={{ zIndex: selectedBenefit === index ? 2 : 1 }}
              >
                {/* Card Surface */}
                <div className={`relative p-6 sm:p-8 h-full rounded-3xl bg-white/90 dark:bg-theme-bg-surface/70 backdrop-blur-xl transition-all duration-300 ${selectedBenefit === index ? 'ring-2 ring-blue-400/30' : ''}`}>
                  {/* Icon */}
                  <div className="relative mb-6 sm:mb-8 flex justify-center lg:justify-start">
                    <motion.div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r ${benefit.gradient} p-3 sm:p-3 shadow-lg`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <benefit.icon className="w-full h-full text-theme-text-inverse" />
                    </motion.div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="mb-6 sm:mb-8 text-center lg:text-left">
                    <h3 className="text-2xl sm:text-2xl font-bold text-theme-text-primary mb-3 sm:mb-3 tracking-tight">
                      {benefit.title}
                    </h3>
                    <p className="text-base sm:text-base text-theme-text-secondary leading-relaxed tracking-wide">
                      {benefit.subtitle}
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-theme-border-primary/5">
                    {benefit.stats.map((stat, i) => (
                      <motion.div
                        key={i}
                        className="text-center relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <motion.p
                          className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-theme-text-primary via-theme-text-accent to-theme-text-primary bg-clip-text text-transparent mb-2"
                        >
                          {stat.value}
                        </motion.p>
                        <p className="text-xs sm:text-sm text-theme-text-secondary leading-tight">
                          {stat.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {selectedBenefit === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-8 pt-8 border-t border-theme-border-primary/5 space-y-8"
                      >
                        {/* Pain Points */}
                        <div className="space-y-4">
                          <h4 className="text-base font-semibold text-red-400/90 flex items-center gap-2 mb-4">
                            <XCircle className="w-5 h-5" />
                            Current Challenges
                          </h4>
                          <div className="grid gap-4 pl-2">
                            {benefit.painPoints.map((point, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-start gap-4"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-red-400/80 mt-2 flex-shrink-0" />
                                <p className="text-red-400/80 text-base leading-relaxed">{point}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Solutions */}
                        <div className="space-y-4">
                          <h4 className="text-base font-semibold text-emerald-400/90 flex items-center gap-2 mb-4">
                            <CheckCircle2 className="w-5 h-5" />
                            Our Solutions
                          </h4>
                          <div className="grid gap-4 pl-2">
                            {benefit.solutions.map((solution, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 + 0.3 }}
                                className="flex items-start gap-4"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 mt-2 flex-shrink-0" />
                                <p className="text-emerald-400/80 text-base leading-relaxed">{solution}</p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Premium CTA - Enhanced for mobile */}
        <motion.div
          className="text-center mt-16 sm:mt-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={{
              hover: { scale: 1.05 },
              tap: { scale: 0.95 }
            }}
            className="group relative rounded-full w-full sm:w-auto"
          >
            <div className="relative px-4 sm:px-8 py-3 sm:py-4 rounded-full">
              {/* Base Glow Layer */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-theme-glow-primary/20 via-theme-glow-accent/30 to-theme-glow-primary/20" />

              {/* Outer Glow */}
              <div className="absolute inset-0 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 rounded-full bg-gradient-to-r from-theme-glow-primary/30 via-theme-glow-accent/40 to-theme-glow-primary/30" />
              
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

              {/* Main Button Background */}
              <div className="absolute inset-0 bg-theme-bg-surface/80 backdrop-blur-sm border rounded-full border-theme-border-accent/50 group-hover:border-theme-border-accent shadow-[0_0_20px_rgba(var(--theme-glow-primary-rgb),0.3)] group-hover:shadow-[0_0_30px_rgba(var(--theme-glow-primary-rgb),0.5)] transition-all duration-300" />
              
              {/* Button Content */}
              <div className="relative flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
                <div className="relative flex items-center gap-2 sm:gap-3">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-theme-text-accent group-hover:text-theme-text-primary transition-colors duration-300" />
                  <span className="text-sm sm:text-base font-medium bg-gradient-to-r from-theme-text-primary via-theme-text-accent to-theme-text-primary bg-clip-text text-transparent">
                    Transform My Business
                  </span>
                </div>
                <motion.div
                  animate={{
                    x: [0, 5, 0],
                    y: [0, -2, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className="text-theme-text-accent group-hover:text-theme-text-primary transition-colors duration-300">→</span>
                </motion.div>
              </div>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default React.memo(AIBenefitsShowcase); 