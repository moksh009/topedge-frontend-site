import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Zap, Sparkles, Gem, Orbit, ArrowRight, Calculator, Cpu } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface Plan {
  name: string;
  monthlyFee: string;
  icon: LucideIcon;
  gradient: string;
  features: string[];
  popular?: boolean;
}

const plans: Plan[] = [
  {
    name: "Core (V1)",
    monthlyFee: "$149/month",
    icon: Gem,
    gradient: "from-blue-500 to-indigo-600",
    features: [
      "Professional Support Agent",
      "Ticket Creation & Note Leaving",
      "Dedicated Client Dashboard",
      "24/7 Always-On Availability"
    ]
  },
  {
    name: "Edge (V2)",
    monthlyFee: "$229/month",
    icon: Orbit,
    gradient: "from-indigo-400 to-blue-500",
    popular: true,
    features: [
      "Everything in Core (V1) +",
      "Calendar Appointment Setting",
      "Real-time CRM Updating",
      "Customized AI Base Models",
      "Seamless Human Hand-off",
      "Contextual Past Call Memory"
    ]
  },
  {
    name: "Edge (V3)",
    monthlyFee: "$387/month",
    icon: Sparkles,
    gradient: "from-purple-600 to-pink-600",
    features: [
      "Everything in Edge (V2) +",
      "Complex Meeting Management",
      "Multi-Channel Agent Deployment",
      "Automated Outbound Calling",
      "Native Multi-Language Support",
      "Lead Nurturing & Sales Prep"
    ]
  }
];

const chatbotPlans: Plan[] = [
  {
    name: "CX Agent (V1)",
    monthlyFee: "$149/month",
    icon: Gem,
    gradient: "from-blue-500 to-indigo-600",
    features: [
      "Professional Support Agent",
      "Ticket Creation & Routing",
      "Single Channel Deployment",
      "2x Custom Feature Integrations"
    ]
  },
  {
    name: "CX Agent (V2)",
    monthlyFee: "$249/month",
    icon: Cpu,
    gradient: "from-indigo-400 to-blue-500",
    popular: true,
    features: [
      "Everything in CX Agent (V1) +",
      "Calendar Appointment Setting",
      "Multi-channel Deployment",
      "Automated Outbound Messages",
      "Full AI Model Customization",
      "Seamless Human Hand-off"
    ]
  },
  {
    name: "Enterprise",
    monthlyFee: "Custom",
    icon: Zap,
    gradient: "from-slate-700 to-slate-900",
    features: [
      "Full Custom API Integration",
      "Complex Workflow Automation",
      "Dedicated Solution Architect",
      "Priority 24/7 Slack Support",
      "99.99% Uptime SLA Guarantees"
    ]
  }
];

const SpotlightCard = ({ plan, index, type }: { plan: Plan; index: number; type: 'voice' | 'chatbot' }) => {
  const navigate = useNavigate();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const springConfig = { stiffness: 100, damping: 30, bounce: 0 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-300, 300], [8, -8]);
  const rotateY = useTransform(smoothX, [-300, 300], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleBookCall = () => {
    navigate('/booking');
  };

  const isDark = plan.popular;

  return (
    <div className="relative perspective-[2000px] w-full group/wrapper">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: index * 0.1, ease: "easeOut" }}
        className={`relative w-full rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-8 md:p-10 transition-shadow duration-500 flex flex-col h-full
          ${isDark
            ? 'bg-slate-950 border border-slate-800 shadow-[0_20px_40px_-10px_rgba(79,70,229,0.3)]'
            : 'bg-white border border-slate-200/60 shadow-lg md:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]'
          }`}
      >
        {isDark && (
          <div className="absolute inset-0 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden pointer-events-none">
            <motion.div
              animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 blur-[50px]"
            />
          </div>
        )}

        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[2rem] md:rounded-[2.5rem] opacity-0 group-hover/wrapper:opacity-100 transition-opacity duration-500 z-10 hidden md:block"
          style={{
            background: useTransform(
              [smoothX, smoothY],
              ([x, y]) => `radial-gradient(400px circle at ${Number(x) + (cardRef.current?.offsetWidth || 0) / 2}px ${Number(y) + (cardRef.current?.offsetHeight || 0) / 2}px, ${isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(99, 102, 241, 0.06)'}, transparent 50%)`
            )
          }}
        />

        {plan.popular && (
          <motion.div
            style={{ transform: "translateZ(40px)" }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 z-30"
          >
            <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] px-4 md:px-6 py-1.5 md:py-2 rounded-full shadow-xl shadow-indigo-500/30 border border-white/20 whitespace-nowrap">
              Scaling Choice
            </div>
          </motion.div>
        )}

        <motion.div
          style={{ transform: "translateZ(30px)" }}
          className="relative z-20 flex flex-col h-full"
        >
          <div className="flex items-start justify-between mb-6 md:mb-8">
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl p-[1px] shadow-lg flex items-center justify-center bg-gradient-to-br ${plan.gradient}`}>
              <div className={`w-full h-full rounded-[11px] md:rounded-[15px] flex items-center justify-center ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
                <plan.icon className={`w-5 h-5 md:w-6 md:h-6 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
              </div>
            </div>
            <div className="text-right">
              <h3 className={`text-lg md:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {plan.name}
              </h3>
              <p className={`text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] mt-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                Tier Level
              </p>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-baseline gap-1">
              <span className={`text-4xl md:text-5xl font-extrabold tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>
                {plan.monthlyFee.split('/')[0]}
              </span>
              <span className={`font-medium text-xs md:text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                {plan.monthlyFee.includes('/') ? '/mo' : ''}
              </span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 mt-3">
              <div className={`h-[1px] w-6 md:w-8 ${isDark ? 'bg-indigo-500/30' : 'bg-indigo-100'}`} />
              <p className={`text-[8px] md:text-[9px] font-bold tracking-[0.1em] uppercase ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                Excl. Operational Credits
              </p>
            </div>
          </div>

          <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10 flex-grow">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 group/feature">
                <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-300 ${isDark ? 'bg-indigo-500/20 group-hover/feature:bg-indigo-500/40' : 'bg-indigo-50 group-hover/feature:bg-indigo-100'
                  }`}>
                  <Check className={`w-2.5 h-2.5 md:w-3 md:h-3 ${isDark ? 'text-indigo-300' : 'text-indigo-600'}`} />
                </div>
                <span className={`text-xs md:text-sm leading-relaxed font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <motion.div style={{ transform: "translateZ(15px)" }} className="mt-auto">
            <button
              onClick={handleBookCall}
              className={`w-full py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-2 md:gap-3 transition-all duration-300 relative overflow-hidden group/btn ${isDark
                ? 'bg-white text-slate-900 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-1'
                : 'bg-slate-50 border border-slate-200 text-slate-900 hover:bg-slate-900 hover:text-white hover:-translate-y-1'
                }`}
            >
              <span className="relative z-10">Book Coffee Call</span>
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const PricingPlans = () => {
  const [activeTab, setActiveTab] = useState<'voice' | 'chatbot'>('voice');
  const navigate = useNavigate();

  return (
    <div id="pricing-plans" className="relative bg-[#FAFAFC] pt-16 md:pt-32 pb-8 md:pb-12 px-4 overflow-hidden">

      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* MOBILE FIXED SEGMENTED CONTROL */}
        <div className="flex justify-center mb-12 md:mb-20 px-2">
          {/* Changed to flex and max-w-[340px] to force side-by-side fit on all phones */}
          <div className="relative flex w-full max-w-[340px] md:max-w-md p-1.5 bg-white border border-slate-200/60 rounded-full shadow-sm">
            <motion.div
              className="absolute inset-y-1.5 bg-slate-900 rounded-full shadow-md"
              style={{ width: 'calc(50% - 6px)' }}
              animate={{ left: activeTab === 'voice' ? '6px' : 'calc(50%)' }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
            <button
              onClick={() => setActiveTab('voice')}
              className={`flex-1 relative z-10 py-3 md:py-3.5 rounded-full text-[10px] md:text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-colors duration-300 ${activeTab === 'voice' ? 'text-white' : 'text-slate-500 hover:text-slate-900'}`}
            >
              Voice Agents
            </button>
            <button
              onClick={() => setActiveTab('chatbot')}
              className={`flex-1 relative z-10 py-3 md:py-3.5 rounded-full text-[10px] md:text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-colors duration-300 ${activeTab === 'chatbot' ? 'text-white' : 'text-slate-500 hover:text-slate-900'}`}
            >
              ChatBots
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Adjusted header fonts for mobile */}
            <div className="text-center mb-12 md:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-slate-900 tracking-[-0.03em] mb-4 md:mb-6">
                {activeTab === 'voice' ? 'Voice Excellence' : 'Chat Intelligence'}
              </h2>
              <p className="text-slate-500 text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed px-4">
                {activeTab === 'voice'
                  ? 'High-fidelity voice agents that handle calls with human-like reasoning, saving you hundreds of hours.'
                  : 'Multi-channel chat solutions that engage customers across your entire ecosystem natively.'}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12 lg:px-4 md:py-8">
              {(activeTab === 'voice' ? plans : chatbotPlans).map((plan, i) => (
                <SpotlightCard key={i} plan={plan} index={i} type={activeTab} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ROI Banner - Responsive Padding & Fonts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="bg-slate-950 rounded-[2rem] md:rounded-[3rem] p-8 sm:p-12 md:p-24 text-center relative overflow-hidden shadow-2xl border border-slate-800"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-slate-900 to-blue-500/10 mix-blend-overlay pointer-events-none" />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-indigo-500/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl mb-6 md:mb-8 shadow-inner">
              <Calculator className="w-6 h-6 md:w-8 md:h-8 text-indigo-400" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 md:mb-6 tracking-tight">Calculate Your Exact ROI.</h2>
            <p className="text-slate-400 text-sm md:text-lg lg:text-xl max-w-3xl mx-auto mb-8 md:mb-12 font-light leading-relaxed">
              Stop guessing. Plug your current support volume and operational costs into our interactive calculator to see exactly how much time and money TopEdge AI will save your business every month.
            </p>

            <button
              onClick={() => navigate('/roi')}
              className="group w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 rounded-xl md:rounded-full bg-white text-slate-900 font-bold text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:-translate-y-1 transition-all duration-300"
            >
              <span>Launch ROI Calculator</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPlans;