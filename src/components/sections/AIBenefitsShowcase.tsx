import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';
import { Phone, MessageSquare, Calendar, Users, Clock, Zap, Bot, BrainCircuit, Sparkles, CheckCircle2, XCircle, Building2, Globe2, TrendingUp, ArrowRight, Star, PhoneCall, MessageCircle, CalendarCheck, PhoneIncoming, BellRing, CalendarRange } from 'lucide-react';
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
      <div className="relative w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-3">
        <PhoneCall className="w-full h-full text-white" />
      </div>
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
      <div className="relative w-full h-full bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl p-3">
        <MessageCircle className="w-full h-full text-white" />
      </div>
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
      <div className="relative w-full h-full bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-3">
        <CalendarCheck className="w-full h-full text-white" />
      </div>
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
      className="relative min-h-screen bg-[#020010] py-32 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Premium Background Effects - Optimized for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Gradient Background */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.08), rgba(0, 0, 0, 0) 70%)',
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
            backgroundImage: `
              linear-gradient(to right, rgba(99, 102, 241, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        />
      </div>

      <div className="relative container mx-auto px-4">
        {/* Premium Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 mb-8"
          >
            <Star className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Add upto Extra $10k in Revenue</span>
          </motion.div>

          <h2 className="relative text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8">
            <motion.span
              className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white"
            >
              Transform Your Business
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-[#3B82F6] via-[#8B5CF6] to-[#EC4899] text-transparent bg-clip-text mt-2"
            >
              With TopEdge AI
            </motion.span>
          </h2>

          <motion.p
            className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light"
          >
            Experience the future of business automation with TopEdge AI solutions
          </motion.p>
        </motion.div>

        {/* Premium Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {memoizedBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.21, 0.45, 0.15, 1.0],
              }}
              className="relative"
              onClick={() => setSelectedBenefit(selectedBenefit === index ? null : index)}
            >
              {/* Premium Card Container */}
              <div className="relative h-full rounded-3xl">
                {/* Glass Background */}
                <div className="absolute inset-0 rounded-3xl bg-white/[0.02] backdrop-blur-2xl" />
                
                {/* Content Container */}
                <div className="relative p-4 sm:p-8 h-full">
                  {/* Premium Icon */}
                  <div className="relative mb-4 sm:mb-8 flex justify-center lg:justify-start">
                    <motion.div
                      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r ${benefit.gradient} p-2 sm:p-3`}
                    >
                      <benefit.icon className="w-full h-full text-white" />
                    </motion.div>
                  </div>

                  {/* Premium Title & Subtitle */}
                  <div className="mb-4 sm:mb-8 text-center lg:text-left">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3 tracking-tight">
                      {benefit.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-400 leading-relaxed tracking-wide">
                      {benefit.subtitle}
                    </p>
                  </div>

                  {/* Premium Stats */}
                  <div className="grid grid-cols-3 gap-3 sm:gap-6 mt-4 sm:mt-8 pt-4 sm:pt-8 border-t border-white/5">
                    {benefit.stats.map((stat, i) => (
                      <motion.div
                        key={i}
                        className="text-center relative"
                      >
                        <motion.p
                          className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-white via-slate-200 to-white bg-clip-text text-transparent mb-1 sm:mb-2"
                        >
                          {stat.value}
                        </motion.p>
                        <p className="text-xs sm:text-sm text-slate-400 leading-tight">
                          {stat.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Premium Expandable Content */}
                  <AnimatePresence>
                    {selectedBenefit === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-8 pt-8 border-t border-white/5 space-y-8"
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
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premium CTA */}
        <motion.div
          className="text-center mt-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="/contact"
            className="group relative inline-flex items-center gap-3 px-10 py-5 bg-white/5 rounded-full text-white font-semibold text-lg transition-all duration-500"
          >
            <span className="relative z-10">Transform My Business With TopEdge AI</span>
            <motion.div
              className="relative z-10"
            >
              <ArrowRight className="w-6 h-6" />
            </motion.div>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default React.memo(AIBenefitsShowcase); 