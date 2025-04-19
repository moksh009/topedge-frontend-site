import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ArrowRight, Star, Zap, Sparkles, MessageSquare, User, Mail, Phone, Clock, Calculator } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { maintenanceService } from '../../../services/maintenanceService';
import { toast } from 'react-hot-toast';
import ROICalculator from './ROICalculator';

interface Plan {
  name: string;
  price: string;
  description: string;
  monthlyFee: string;
  managementText: string;
  operationalText: string;
  icon: LucideIcon;
  gradient: string;
  shadow: string;
  features: string[];
  addOns?: string;
  popular?: boolean;
  isOperationalCost?: boolean;
  footer?: string;
}

const plans: Plan[] = [
  {
    name: "Starter",
    price: "0",
    description: "FREE SETUP + DEV.",
    monthlyFee: "$249/month",
    managementText: "management fees",
    operationalText: "+ OPERATIONAL COST",
    icon: Star,
    gradient: "from-blue-500 to-cyan-500",
    shadow: "shadow-blue-500/20",
    features: [
      "FAQ",
      "Ticket Creation/Leave Note - pass any message of user to business",
      "Dedicated Dashboard"
    ],
    addOns: "$187 for appointment setting"
  },
  {
    name: "Pro",
    price: "0",
    description: "FREE SETUP + DEV.",
    monthlyFee: "$529/month",
    managementText: "management fees",
    operationalText: "+ OPERATIONAL COST",
    icon: Star,
    gradient: "from-purple-500 to-pink-500",
    shadow: "shadow-purple-500/20",
    popular: true,
    features: [
      "Everything in Starter +",
      "Appointment setting to calendar",
      "updates customer records in real time",
      "Customized AI Models",
      "Human Hand-off",
      "Past Call Memory"
    ]
  },
  {
    name: "Premium",
    price: "0",
    description: "FREE SETUP + DEV.",
    monthlyFee: "$987/month",
    managementText: "management fees",
    operationalText: "+ OPERATIONAL COST",
    icon: Star,
    gradient: "from-orange-500 to-red-500",
    shadow: "shadow-orange-500/20",
    features: [
      "All in Pro +",
      "Meeting management",
      "Multi Channel agent",
      "outbound marketing",
      "Multi Language Support",
      "Nurture Leads"
    ]
  }
];

const chatbotPlans: Plan[] = [
  {
    name: "Starter",
    price: "0",
    description: "FREE SETUP + DEV.",
    monthlyFee: "$249/month",
    managementText: "management fees",
    operationalText: "+ OPERATIONAL COST",
    icon: Star,
    gradient: "from-[#4D07E3] to-[#7A0BC0]",
    shadow: "shadow-[#4D07E3]/20",
    features: [
      "FAQ",
      "Ticket Creation/Leave Note - pass any message of user to business",
      "Single Channel",
      "Birthday Remainder"
    ],
    addOns: "Extra for additional channel eg. Whatsapp, Instagram....."
  },
  {
    name: "Advanced",
    price: "0",
    description: "FREE SETUP + DEV.",
    monthlyFee: "$549/month",
    managementText: "management fees",
    operationalText: "+ OPERATIONAL COST",
    icon: Star,
    gradient: "from-[#7A0BC0] to-[#4D07E3]",
    shadow: "shadow-[#7A0BC0]/20",
    popular: true,
    features: [
      "All in Pro +",
      "Appointment Setting",
      "Multi-channel",
      "outbound marketing",
      "Advanced Ai Models - ++customer support experience than Pro Plan Setup",
      "Multi Language Support",
      "Human Hand-off",
      "Appointment Remainder"
    ]
  }
];

interface MaintenanceFormData {
  name: string;
  email: string;
  phone: string;
  plan: string;
  section: 'voice' | 'chatbot';
  emailTemplate?: string;
}

interface CalculatorState {
  callsPerDay: number;
  minutesPerCall: number;
  totalMinutes: number;
  totalCost: number;
  isCalculated: boolean;
}

const AICallerCalculator = () => {
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({
    callsPerDay: 0,
    minutesPerCall: 0,
    totalMinutes: 0,
    totalCost: 0,
    isCalculated: false
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredInput, setHoveredInput] = useState<string | null>(null);

  const calculateCost = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnimating(true);
    
    const totalMinutes = calculatorState.callsPerDay * calculatorState.minutesPerCall * 30;
    const cost = totalMinutes * 0.01;
    
    setTimeout(() => {
      setCalculatorState(prev => ({
        ...prev,
        totalMinutes,
        totalCost: cost,
        isCalculated: true
      }));
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mt-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="text-center mb-12">
        <motion.div 
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 mb-3 sm:mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
          <span className="text-xs sm:text-sm text-emerald-300">Cost Estimator</span>
        </motion.div>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
          <span className="inline-block bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent">
            AI Caller Cost Calculator
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Estimate your monthly AI calling costs based on your usage requirements
        </p>
      </div>

      <motion.div
        className="relative p-8 rounded-2xl backdrop-blur-xl border border-white/10 bg-gradient-to-b from-black/80 to-emerald-950/20"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated gradient border */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          initial={{ background: 'linear-gradient(0deg, rgba(16,185,129,0), rgba(0,0,0,0))' }}
          animate={{
            background: [
              'linear-gradient(0deg, rgba(16,185,129,0.1), rgba(0,0,0,0))',
              'linear-gradient(90deg, rgba(16,185,129,0.1), rgba(0,0,0,0))',
              'linear-gradient(180deg, rgba(16,185,129,0.1), rgba(0,0,0,0))',
              'linear-gradient(270deg, rgba(16,185,129,0.1), rgba(0,0,0,0))'
            ]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <form onSubmit={calculateCost} className="relative space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Calls per day input */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-300">
                Number of Calls per Day
              </label>
              <div className="relative group">
                <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors w-5 h-5 ${
                  hoveredInput === 'calls' ? 'text-emerald-500' : 'text-gray-400'
                }`} />
                <input
                  type="number"
                  min="0"
                  required
                  value={calculatorState.callsPerDay || ''}
                  onChange={(e) => setCalculatorState(prev => ({
                    ...prev,
                    callsPerDay: parseInt(e.target.value) || 0,
                    isCalculated: false
                  }))}
                  onMouseEnter={() => setHoveredInput('calls')}
                  onMouseLeave={() => setHoveredInput(null)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter number of calls"
                />
              </div>
            </motion.div>

            {/* Minutes per call input */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-300">
                Average Minutes per Call
              </label>
              <div className="relative group">
                <Clock className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors w-5 h-5 ${
                  hoveredInput === 'minutes' ? 'text-emerald-500' : 'text-gray-400'
                }`} />
                <input
                  type="number"
                  min="0"
                  required
                  value={calculatorState.minutesPerCall || ''}
                  onChange={(e) => setCalculatorState(prev => ({
                    ...prev,
                    minutesPerCall: parseInt(e.target.value) || 0,
                    isCalculated: false
                  }))}
                  onMouseEnter={() => setHoveredInput('minutes')}
                  onMouseLeave={() => setHoveredInput(null)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter minutes per call"
                />
              </div>
            </motion.div>
          </div>

          {/* Calculate button */}
          <motion.button
            type="submit"
            disabled={isAnimating}
            className={`w-full py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium flex items-center justify-center gap-2 ${
              isAnimating 
                ? 'opacity-75 cursor-not-allowed' 
                : 'hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98]'
            } transition-all duration-300`}
          >
            {isAnimating ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                />
                <span>Calculating...</span>
              </>
            ) : (
              <>
                <span>Calculate Monthly Cost</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </form>

        {/* Results section */}
        <AnimatePresence>
          {calculatorState.isCalculated && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-emerald-400 text-sm">Total Monthly Minutes</p>
                  <motion.p
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="text-3xl font-bold text-white"
                  >
                    {calculatorState.totalMinutes.toLocaleString()} mins
                  </motion.p>
                </div>
                <div className="space-y-2">
                  <p className="text-emerald-400 text-sm">Estimated Monthly Cost</p>
                  <motion.p
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="text-3xl font-bold text-white"
                  >
                    ${calculatorState.totalCost.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2
                    })}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-xs text-gray-400 text-center"
        >
          * Pricing per minute may vary based on different APIs and features selected. Contact us for detailed pricing based on your specific requirements.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const PricingPlans = () => {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [showVoiceForm, setShowVoiceForm] = useState(false);
  const [showChatbotForm, setShowChatbotForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [formData, setFormData] = useState<MaintenanceFormData>({
    name: "",
    email: "",
    phone: "",
    plan: "",
    section: 'voice'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], ["5%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  const handleGetMaintenancePrice = (planName: string, section: 'voice' | 'chatbot') => {
    setSelectedPlan(planName);
    setFormData(prev => ({ ...prev, plan: planName, section: section }));
    if (section === 'voice') {
      setShowVoiceForm(true);
      setShowChatbotForm(false);
    } else {
      setShowChatbotForm(true);
      setShowVoiceForm(false);
    }
  };

  const handleCloseModal = () => {
    setShowVoiceForm(false);
    setShowChatbotForm(false);
    setSubmitStatus('idle');
  };

  const handleSubmitMaintenanceForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    // Validate phone number (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      toast.error('Please enter a valid 10-digit phone number');
      setIsSubmitting(false);
      return;
    }

    try {
      const emailTemplate = `
Hello ${formData.name},

Thank you for your interest in our ${formData.section === 'voice' ? 'AI Voice Agent' : 'Chatbot'} solution. We're excited to help transform your business operations!

Selected Plan: ${selectedPlan}
(Maintenance pricing will be discussed based on your specific feature requirements)

What You Can Achieve:
-------------------
• Recover up to $10,000 in missed opportunities within 45 days
• Increase appointment bookings by up to 2.5x
• Save 30+ hours per week in manual work
• Achieve 24/7 customer engagement
• Reduce response times by over 90%

Next Steps:
-------------------
• Our team will contact you within 24 hours
• We'll understand your specific requirements
• Provide customized solution recommendations
• Schedule a quick demo of your tailored solution

Want to fast-track your business transformation?
Reply "Tell me more" and we'll share success stories that will surprise you!

Best regards,
Team TopEdge AI

P.S. Most of our clients see positive ROI within the first month!`;

      await maintenanceService.submitInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        plan: formData.plan,
        emailTemplate: emailTemplate
      });
      
      setSubmitStatus('success');
      
      toast.success(`Thank you! We've sent detailed information to your email.`, {
        duration: 5000,
        position: 'bottom-right',
        style: {
          background: 'linear-gradient(to right, #10B981, #059669)',
          color: 'white',
          padding: '16px',
          borderRadius: '12px',
        }
      });
      
      // Remove the automatic modal closing
      // setTimeout(() => {
      //   handleCloseModal();
      // }, 2000);

    } catch (error) {
      setSubmitStatus('error');
      toast.error('Failed to submit inquiry. Please try again.', {
        position: 'bottom-right',
        style: {
          background: 'linear-gradient(to right, #EF4444, #DC2626)',
          color: 'white',
          padding: '16px',
          borderRadius: '12px',
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleButtonClick = () => {
    navigate('/booking');
    window.scrollTo(0, 0);
  };

  const renderPriceSection = (plan: Plan) => {
    return (
      <motion.div 
        className="backdrop-blur-lg bg-white/5 px-3 py-2 rounded-lg cursor-pointer"
        whileHover={{ scale: 1.02 }}
      >
        <p className="text-sm text-gray-400">Contact for pricing details</p>
      </motion.div>
    );
  };

  const OperationalCostCard = () => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
      <motion.div
        key="operational-cost"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative flex flex-col text-center"
      >
        {/* Floating sparkles */}
        <AnimatePresence mode="wait">
          {isHovered && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={`sparkle-${i}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    zIndex: 30,
                  }}
                >
                  <motion.div
                    animate={{
                      y: [-20, 0],
                      opacity: [1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: Math.random() * 0.5,
                    }}
                  >
                    <Sparkles className="w-3 h-3 text-blue-400" />
                  </motion.div>
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Card */}
        <motion.div
          className="relative flex-1 p-6 sm:p-8 rounded-2xl backdrop-blur-xl border border-white/10 bg-gradient-to-b from-black/80 to-blue-950/20 overflow-hidden"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{ scale: 1.02, y: -5 }}
        >
          {/* Animated gradient border */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            initial={{ background: 'linear-gradient(0deg, rgba(59,130,246,0), rgba(0,0,0,0))' }}
            animate={isHovered ? {
              background: [
                'linear-gradient(0deg, rgba(59,130,246,0.1), rgba(0,0,0,0))',
                'linear-gradient(90deg, rgba(59,130,246,0.1), rgba(0,0,0,0))',
                'linear-gradient(180deg, rgba(59,130,246,0.1), rgba(0,0,0,0))',
                'linear-gradient(270deg, rgba(59,130,246,0.1), rgba(0,0,0,0))'
              ]
            } : {
              background: 'linear-gradient(0deg, rgba(59,130,246,0), rgba(0,0,0,0))'
            }}
            transition={{
              duration: 2,
              repeat: isHovered ? Infinity : 0,
              ease: "linear"
            }}
          />

          {/* Plan Icon with enhanced animation */}
          <motion.div
            className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-0.5 mb-4 sm:mb-6 mx-auto"
            whileHover={{ rotate: -5, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <motion.div 
              className="w-full h-full bg-black rounded-xl flex items-center justify-center overflow-hidden"
            >
              <Calculator className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h3 
            className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-center"
          >
            Operational Cost
          </motion.h3>

          {/* Price Section */}
          <div className="mt-4 space-y-4">
            <div className="flex flex-col items-center justify-center">
              <div className="text-6xl font-bold text-white mb-2">$0</div>
              <div className="text-lg text-gray-400">Free Cost Calculation</div>
            </div>

            <motion.div
              className="backdrop-blur-lg bg-white/5 px-3 py-2 rounded-lg cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-sm text-gray-400">Get exact pricing based on your usage</p>
            </motion.div>
          </div>

          {/* Features list */}
          <ul className="space-y-3 mb-8 text-left px-2 sm:px-0 mt-6">
            <motion.li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span className="text-gray-300">Transparent pay-as-you-go pricing</span>
            </motion.li>
            <motion.li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span className="text-gray-300">No hidden fees or charges</span>
            </motion.li>
            <motion.li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span className="text-gray-300">Detailed cost breakdown</span>
            </motion.li>
            <motion.li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span className="text-gray-300">Volume-based discounts</span>
            </motion.li>
          </ul>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleGetMaintenancePrice("Operational", "voice")}
            className="w-full py-3 px-4 sm:px-6 rounded-xl overflow-hidden bg-gradient-to-r from-blue-600/20 to-blue-600/10 border border-blue-500/20 text-white font-semibold text-center relative group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/40 to-blue-600/0"
              initial={{ x: '-100%' }}
              animate={{ x: ['100%', '-100%'] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className="relative z-10 flex items-center justify-center gap-2"
            >
              Get Operational Cost
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </motion.button>
        </motion.div>
      </motion.div>
    );
  };

  const renderPlanButtons = (planName: string, type: 'voice' | 'chatbot') => (
    <div className="flex flex-col gap-4 mt-auto">
      <motion.button
        className={`relative w-full py-3 px-4 sm:px-6 rounded-xl overflow-hidden bg-gradient-to-r ${
          type === 'voice' 
            ? 'from-purple-600/20 to-purple-600/10 border-purple-500/20' 
            : 'from-blue-600/20 to-blue-600/10 border-blue-500/20'
        } border text-white font-semibold text-center`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => handleGetMaintenancePrice(planName, type)}
      >
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${
            type === 'voice'
              ? 'from-purple-600/0 via-purple-600/40 to-purple-600/0'
              : 'from-blue-600/0 via-blue-600/40 to-blue-600/0'
          }`}
          initial={{ x: '-100%' }}
          animate={{ x: ['100%', '-100%'] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="relative z-10 flex items-center justify-center gap-2"
        >
          Get Maintenance Price
          <ArrowRight className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </div>
  );

  return (
    <motion.section
      ref={containerRef}
      id="pricing-plans"
      className="relative py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden"
      style={{
        background: "radial-gradient(circle at center, rgba(124, 58, 237, 0.05) 0%, rgba(0,0,0,0) 70%)"
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/5 to-black" />
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(124, 58, 237, 0.05) 0%, transparent 70%)",
            y
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <motion.div 
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
            <span className="text-xs sm:text-sm text-purple-300">AI Voice Agent Pricing</span>
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-4">
            <span className="inline-block bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Choose Your AI Voice Plan
            </span>
          </h2>
        </motion.div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-sm md:max-w-none mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const isHovered = hoveredPlan === plan.name;

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative flex flex-col text-center"
              >
                {/* Most Popular Badge */}
                {plan.name === "Pro" && (
                  <motion.div
                    className="absolute -top-4 sm:-top-6 left-1/2 -translate-x-1/2 z-20"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1.2 }}
                  >
                    <div className="relative">
                      {/* Glow Effect */}
                      <motion.div 
                        className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-violet-600 rounded-full blur-sm"
                        animate={{
                          opacity: [0.5, 0.8, 0.5],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      
                      {/* Badge */}
                      <div className="relative px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full">
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <motion.span
                            animate={{
                              scale: [1, 1.2, 1],
                              rotate: [0, 10, -10, 0]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "reverse"
                            }}
                            className="text-sm sm:text-base"
                          >
                            ✨
                          </motion.span>
                          <span className="text-xs sm:text-sm font-semibold text-white">Most Popular</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Floating sparkles */}
                <AnimatePresence>
                  {isHovered && (
                    <>
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={`sparkle-${i}`}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            zIndex: 30,
                          }}
                        >
                          <motion.div
                            animate={{
                              y: [-20, 0],
                              opacity: [1, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: Math.random() * 0.5,
                            }}
                          >
                            <Sparkles className="w-3 h-3 text-purple-400" />
                          </motion.div>
                        </motion.div>
                      ))}
                    </>
                  )}
                </AnimatePresence>

                {/* Card */}
                <motion.div
                  className={`relative flex-1 p-6 sm:p-8 rounded-2xl backdrop-blur-xl border border-white/10 bg-gradient-to-b from-black/80 to-purple-950/20 overflow-hidden ${plan.popular ? 'md:scale-105' : ''}`}
                  onHoverStart={() => setHoveredPlan(plan.name)}
                  onHoverEnd={() => setHoveredPlan(null)}
                  whileHover={{ scale: 1.02, y: -5 }}
                  initial={false}
                >
                  {/* Animated gradient border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    initial={{ background: 'linear-gradient(0deg, rgba(139,92,246,0), rgba(0,0,0,0))' }}
                    animate={isHovered ? {
                      background: [
                        'linear-gradient(0deg, rgba(139,92,246,0.1), rgba(0,0,0,0))',
                        'linear-gradient(90deg, rgba(139,92,246,0.1), rgba(0,0,0,0))',
                        'linear-gradient(180deg, rgba(139,92,246,0.1), rgba(0,0,0,0))',
                        'linear-gradient(270deg, rgba(139,92,246,0.1), rgba(0,0,0,0))'
                      ]
                    } : {
                      background: 'linear-gradient(0deg, rgba(139,92,246,0), rgba(0,0,0,0))'
                    }}
                    transition={{
                      duration: 2,
                      repeat: isHovered ? Infinity : 0,
                      ease: "linear"
                    }}
                  />

                  {/* Plan Icon with enhanced animation */}
                  <motion.div
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-r ${plan.gradient} p-0.5 mb-4 sm:mb-6 mx-auto`}
                    whileHover={{ rotate: -5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <motion.div 
                      className="w-full h-full bg-black rounded-xl flex items-center justify-center overflow-hidden"
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </motion.div>
                  </motion.div>

                  {/* Plan Details with hover effects */}
                  <motion.h3 
                    className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-center"
                  >
                    {plan.name}
                  </motion.h3>
                  {/* <p className="text-sm text-gray-400 mb-4 sm:mb-6 text-center px-2 sm:px-0">{plan.description}</p> */}

                  {/* Price Section */}
                  <div className="mt-4 space-y-4">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-6xl font-bold text-white mb-2">$0</div>
                      <div className="text-lg text-gray-400">Free Development & Deployment</div>
                    </div>

                    {renderPriceSection(plan)}
                  </div>

                  {/* Features list */}
                  <ul className="space-y-3 mb-8 text-left px-2 sm:px-0 mt-6">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        className="flex items-start gap-2"
                      >
                        <motion.div>
                          <Check className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                        </motion.div>
                        <span className="text-gray-300">{feature}</span>
                      </motion.li>
                    ))}
                    {plan.addOns && (
                      <motion.li className="flex items-start gap-2 mt-4">
                        <span className="text-sm text-purple-400">{plan.addOns}</span>
                      </motion.li>
                    )}
                  </ul>

                  {/* Buttons */}
                  {renderPlanButtons(plan.name, 'voice')}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Chatbot Pricing Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 text-center mb-8 sm:mb-12 md:mb-16"
        >
          <motion.div 
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
            <span className="text-xs sm:text-sm text-blue-300">Advanced Chatbot Pricing</span>
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-4">
            <span className="inline-block bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent">
              Intelligent Chatbot Solutions
            </span>
          </h2>
        </motion.div>

        {/* Chatbot Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-sm md:max-w-none mx-auto">
          {chatbotPlans.map((plan, index) => {
            const Icon = plan.icon;
            const isHovered = hoveredPlan === plan.name;

            return (
              <motion.div
                key={`chatbot-${plan.name}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative flex flex-col text-center"
              >
                {/* Most Popular Badge */}
                {plan.popular && (
                  <motion.div
                    className="absolute -top-4 sm:-top-6 left-1/2 -translate-x-1/2 z-20"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1.2 }}
                  >
                    <div className="relative">
                      {/* Glow Effect */}
                      <motion.div 
                        className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-sm"
                        animate={{
                          opacity: [0.5, 0.8, 0.5],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      
                      {/* Badge */}
                      <div className="relative px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full">
                        <div className="flex items-center gap-1 sm:gap-1.5">
                          <motion.span
                            animate={{
                              scale: [1, 1.2, 1],
                              rotate: [0, 10, -10, 0]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "reverse"
                            }}
                            className="text-sm sm:text-base"
                          >
                            ✨
                          </motion.span>
                          <span className="text-xs sm:text-sm font-semibold text-white">Most Popular</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Floating sparkles */}
                <AnimatePresence>
                  {isHovered && (
                    <>
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={`sparkle-${i}`}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute"
                          style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            zIndex: 30,
                          }}
                        >
                          <motion.div
                            animate={{
                              y: [-20, 0],
                              opacity: [1, 0],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: Math.random() * 0.5,
                            }}
                          >
                            <Sparkles className="w-3 h-3 text-blue-400" />
                          </motion.div>
                        </motion.div>
                      ))}
                    </>
                  )}
                </AnimatePresence>

                {/* Card */}
                <motion.div
                  className={`relative flex-1 p-6 sm:p-8 rounded-2xl backdrop-blur-xl border border-white/10 bg-gradient-to-b from-black/80 to-blue-950/20 overflow-hidden ${plan.popular ? 'md:scale-105' : ''}`}
                  onHoverStart={() => setHoveredPlan(plan.name)}
                  onHoverEnd={() => setHoveredPlan(null)}
                  whileHover={{ scale: 1.02, y: -5 }}
                  initial={false}
                >
                  {/* Animated gradient border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    initial={{ background: 'linear-gradient(0deg, rgba(59,130,246,0), rgba(0,0,0,0))' }}
                    animate={isHovered ? {
                      background: [
                        'linear-gradient(0deg, rgba(59,130,246,0.1), rgba(0,0,0,0))',
                        'linear-gradient(90deg, rgba(59,130,246,0.1), rgba(0,0,0,0))',
                        'linear-gradient(180deg, rgba(59,130,246,0.1), rgba(0,0,0,0))',
                        'linear-gradient(270deg, rgba(59,130,246,0.1), rgba(0,0,0,0))'
                      ]
                    } : {
                      background: 'linear-gradient(0deg, rgba(59,130,246,0), rgba(0,0,0,0))'
                    }}
                    transition={{
                      duration: 2,
                      repeat: isHovered ? Infinity : 0,
                      ease: "linear"
                    }}
                  />

                  {/* Plan Icon with enhanced animation */}
                  <motion.div
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-r ${plan.gradient} p-0.5 mb-4 sm:mb-6 mx-auto`}
                    whileHover={{ rotate: -5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <motion.div 
                      className="w-full h-full bg-black rounded-xl flex items-center justify-center overflow-hidden"
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                    </motion.div>
                  </motion.div>

                  {/* Plan Details with hover effects */}
                  <motion.h3 
                    className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-center"
                  >
                    {plan.name}
                  </motion.h3>

                  {/* Price Section for Chatbot */}
                  <div className="mt-4 space-y-4">
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-6xl font-bold text-white mb-2">$0</div>
                      <div className="text-lg text-gray-400">Free Development & Deployment</div>
                    </div>

                    {renderPriceSection(plan)}
                  </div>

                  {/* Features list */}
                  <ul className="space-y-3 mb-8 text-left px-2 sm:px-0 mt-6">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        className="flex items-start gap-2"
                      >
                        <motion.div>
                          <Check className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                        </motion.div>
                        <span className="text-gray-300">{feature}</span>
                      </motion.li>
                    ))}
                    {plan.addOns && (
                      <motion.li className="flex items-start gap-2 mt-4">
                        <span className="text-sm text-blue-400">{plan.addOns}</span>
                      </motion.li>
                    )}
                  </ul>

                {/* Buttons */}
                  {renderPlanButtons(plan.name, 'chatbot')}
                </motion.div>
              </motion.div>
            );
          })}

          {/* Operational Cost Card */}
          <OperationalCostCard />
        </div>
      </div>

      {/* Voice Agent Maintenance Form Modal */}
      <AnimatePresence>
        {showVoiceForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]"
          >
            {/* Background overlay with purple tint and blur */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              style={{
                backgroundColor: 'rgba(88, 28, 135, 0.05)'
              }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0"
              onClick={handleCloseModal}
              aria-hidden="true"
            />

            {/* Center the modal */}
            <div className="min-h-screen flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative w-full max-w-lg mx-4 rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-b from-[#1a1a3a] to-black border border-purple-500/10"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Purple gradient animation */}
                <motion.div
                  className="absolute inset-0 opacity-30 rounded-2xl"
                  style={{
                    background: 'radial-gradient(circle at top right, rgba(139, 92, 246, 0.4), transparent 70%)'
                  }}
                />

                {/* Close Button */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10 backdrop-blur-sm z-10"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div className="relative p-6 sm:p-8">
                  <div className="text-center mb-8">
                    <motion.h3 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl sm:text-3xl font-bold text-white mb-3"
                    >
                      Get Maintenance Pricing
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-purple-300 text-sm sm:text-base"
                    >
                      Fill out the form below to receive detailed pricing for the {selectedPlan} plan
                    </motion.p>
                  </div>

                  {submitStatus === 'success' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-left py-4 px-2 sm:px-4"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 flex items-center justify-center"
                      >
                        <Check className="w-6 h-6 text-emerald-500" />
                      </motion.div>
                      <div className="space-y-4 text-center mb-4">
                        <h4 className="text-xl font-semibold text-white">Thank You!</h4>
                        <p className="text-gray-300 text-sm">We've sent the plan details to your email.</p>
                      </div>
                      
                      <div className="mt-6 bg-black/30 rounded-xl p-4 space-y-3 text-sm">
                        <h5 className="font-medium text-white">Email Preview:</h5>
                        <div className="space-y-4 text-gray-300">
                          <p>Hello ${formData.name},</p>
                          <p>Thank you for your interest in our ${selectedPlan} ${formData.section === 'voice' ? 'AI Voice Agent' : 'Chatbot'} solution.</p>
                          <div className="space-y-2">
                            <p className="text-emerald-400 font-medium">Next Steps:</p>
                            <p>• Our team will contact you within 24 hours</p>
                            <p>• We'll discuss your requirements and provide a customized solution</p>
                          </div>
                          <p className="text-sm text-gray-400">Check your email for complete details about the amazing impact our solution can have on your business.</p>
                        </div>
                      </div>

                      <div className="mt-6 flex justify-center">
                        <motion.button
                          onClick={handleCloseModal}
                          className="px-6 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Close
                        </motion.button>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmitMaintenanceForm} className="space-y-5">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-2"
                      >
                        <label className="block text-sm font-medium text-gray-300">Name</label>
                        <div className="relative group">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-500 transition-colors w-5 h-5" />
                          <input
                            type="text"
                            required
                            minLength={2}
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                            placeholder="Enter your full name *"
                          />
                        </div>
                        <span className="text-xs text-gray-400 mt-1">Minimum 2 characters required</span>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-2"
                      >
                        <label className="block text-sm font-medium text-gray-300">Email</label>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-500 transition-colors w-5 h-5" />
                          <input
                            type="email"
                            required
                            pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                            placeholder="Enter your email address *"
                          />
                        </div>
                        <span className="text-xs text-gray-400 mt-1">Must be a valid email address</span>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="space-y-2"
                      >
                        <label className="block text-sm font-medium text-gray-300">Phone</label>
                        <div className="relative group">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-500 transition-colors w-5 h-5" />
                          <input
                            type="tel"
                            required
                            pattern="[0-9]{10}"
                            value={formData.phone}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                              setFormData(prev => ({ ...prev, phone: value }));
                            }}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                            placeholder="Enter your phone number *"
                          />
                        </div>
                        <span className="text-xs text-gray-400 mt-1">10-digit phone number required</span>
                      </motion.div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className={`w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium flex items-center justify-center gap-2 ${
                          isSubmitting 
                            ? 'opacity-75 cursor-not-allowed' 
                            : 'hover:shadow-lg hover:shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                            <span>Submitting...</span>
                          </>
                        ) : (
                          <>
                            <span>Get Pricing</span>
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </motion.button>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot Maintenance Form Modal */}
      <AnimatePresence>
        {showChatbotForm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]"
          >
            {/* Background overlay with blue tint and blur */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
              exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              style={{
                backgroundColor: 'rgba(37, 99, 235, 0.05)'
              }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0"
              onClick={handleCloseModal}
                aria-hidden="true"
              />

            {/* Center the modal */}
            <div className="min-h-screen flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative w-full max-w-lg mx-4 rounded-2xl shadow-2xl overflow-hidden bg-gradient-to-b from-[#1a0445] to-black border border-[#4D07E3]/10"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Blue gradient animation */}
                <motion.div
                  className="absolute inset-0 opacity-30 rounded-2xl"
                  style={{
                    background: 'radial-gradient(circle at top right, rgba(77, 7, 227, 0.4), transparent 70%)'
                  }}
                />

                {/* Close Button with blue hover */}
                <button
                  onClick={handleCloseModal}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-[#4D07E3] transition-colors rounded-full hover:bg-white/10 backdrop-blur-sm z-10"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div className="relative p-6 sm:p-8">
                  <div className="text-center mb-8">
                    <motion.h3 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl sm:text-3xl font-bold text-white mb-3"
                    >
                      Get Chatbot Maintenance Pricing
                    </motion.h3>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-blue-300 text-sm sm:text-base"
                    >
                      Fill out the form below to receive detailed pricing for the {selectedPlan} plan
                    </motion.p>
                </div>

                {submitStatus === 'success' ? (
                  <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#4D07E3]/10 flex items-center justify-center"
                      >
                        <Check className="w-8 h-8 text-[#4D07E3]" />
                      </motion.div>
                      <h4 className="text-xl font-semibold text-white mb-2">Thank You!</h4>
                      <p className="text-blue-300">We'll send you the chatbot pricing details shortly.</p>
                  </motion.div>
                ) : (
                    <form onSubmit={handleSubmitMaintenanceForm} className="space-y-5">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-2"
                      >
                        <label className="block text-sm font-medium text-gray-300">Name</label>
                        <div className="relative group">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#4D07E3] transition-colors w-5 h-5" />
                        <input
                          type="text"
                          required
                          minLength={2}
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4D07E3]/50 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your full name *"
                        />
                      </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="space-y-2"
                      >
                        <label className="block text-sm font-medium text-gray-300">Email</label>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#4D07E3] transition-colors w-5 h-5" />
                        <input
                          type="email"
                          required
                          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4D07E3]/50 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your email address *"
                        />
                      </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="space-y-2"
                      >
                        <label className="block text-sm font-medium text-gray-300">Phone</label>
                        <div className="relative group">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-[#4D07E3] transition-colors w-5 h-5" />
                        <input
                          type="tel"
                          required
                          pattern="[0-9]{10}"
                          value={formData.phone}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setFormData(prev => ({ ...prev, phone: value }));
                          }}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4D07E3]/50 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your phone number *"
                        />
                      </div>
                      </motion.div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className={`w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#4D07E3] to-[#7A0BC0] text-white font-medium flex items-center justify-center gap-2 ${
                          isSubmitting 
                            ? 'opacity-75 cursor-not-allowed' 
                            : 'hover:shadow-lg hover:shadow-[#4D07E3]/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300'
                        }`}
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                            <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                            <span>Get Pricing</span>
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add the calculator component here, before the closing tag */}
      <AICallerCalculator />

      {/* Cost Transparency Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <div className="relative p-6 rounded-2xl backdrop-blur-xl border border-white/10 bg-gradient-to-b from-black/80 to-emerald-950/20">
          <div className="flex flex-col gap-3">
            <p className="text-emerald-400 font-medium">Cost Transparency</p>
            <p className="text-gray-300 text-sm sm:text-base">
              The calculated costs represent direct API and platform API fees for usage, TopEdge does not markup or profit from these operational costs - we charge only our management
            </p>
          </div>
        </div>
      </motion.div>

      {/* ROI Calculator Section */}
      <div className="mt-32">
        <ROICalculator />
      </div>

    </motion.section>
  );
};

export default PricingPlans;
