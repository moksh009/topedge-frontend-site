import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ArrowRight, Star, Zap, Sparkles, MessageSquare, User, Mail, Phone, Clock, Calculator, Gem, Orbit, DollarSign, ChevronRight } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { maintenanceService } from '../../../services/maintenanceService';
import { toast } from 'react-hot-toast';
import ROICalculator from './ROICalculator';
import PremiumButton from './PricingPremiumButton';

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
    name: "Core (V1)",
    price: "",
    description: "",
    monthlyFee: "$249/month",
    managementText: "management fees",
    operationalText: "+ OPERATIONAL COST",
    icon: Gem, // Use text-green-500 or text-emerald-400 for icon color,
    gradient: "from-purple-500 via-indigo-500 to-purple-900", // Premium purple-indigo
    shadow: "shadow-purple-500/20",
    features: [
      "Professional Support Agent",
      "Ticket Creation/Leave Note - pass any message of user to business",
      "Dedicated Dashboard"
    ],
    addOns: ""
  },
  {
    name: "Edge (V2)",
    price: "",
    description: "",
    monthlyFee: "$529/month",
    managementText: "management fees",
    operationalText: "+ OPERATIONAL COST",
    icon: Orbit, // Use text-green-500 or text-emerald-400 for icon color,
    gradient: "from-green-600 via-black to-green-700",
    shadow: "shadow-emerald-500/20",
    popular: true,
    features: [
      "Everything in Core (V1) +",
      "Appointment setting to calendar",
      "Updates customer records in real time",
      "Customized AI Models",
      "Human Hand-off",
      "Past Call Memory"
    ]
  },
  {
    name: "Edge (V3)",
    price: "",
    description: "",
    monthlyFee: "$987/month",
    managementText: "management fees",
    operationalText: "+ OPERATIONAL COST",
    icon: Sparkles, // Use text-green-500 or text-emerald-400 for icon color,
    gradient: "from-red-400 via-red-600 to-red-900", // Premium red gradient
    shadow: "shadow-red-500/20", // Red shadow
    features: [
      "All in Edge (V2) +",
      "Meeting management",
      "Multi Channel agent",
      "Outbound Calls",
      "Multi Language Support",
      "Lead Nurturing, Backed by Pro-Level Sales Training"
    ]
  }
];

const chatbotPlans: Plan[] = [
  {
    name: "CX Agent (V1)",
    price: "",
    description: "",
    monthlyFee: "$249/month",
    managementText: "management fees",
    operationalText: "+ OPERATIONAL COST",
    icon: Gem, // Use text-purple-500 or text-indigo-400 for icon color
    gradient: "from-purple-500 via-indigo-500 to-purple-900", // Premium purple-indigo
    shadow: "shadow-purple-500/20",
    features: [
      "Professional Support Agent",
      "Ticket Creation/Leave Note - pass any message of user to business",
      "Single Channel",
      "⁠2x Custom Feature - Automation Development"
    ],
    addOns: ""
  },
  {
    name: "CX Agent (V2)",
    price: "",
    description: "",
    monthlyFee: "$549/month",
    managementText: "management fees",
    operationalText: "+ OPERATIONAL COST",
    icon: Sparkles, // Use text-green-500 or text-emerald-400 for icon color
    gradient: "from-green-400 via-teal-600 to-black", // Premium emerald-teal-black
    shadow: "shadow-green-500/20",
    popular: true,
    features: [
      "All in CX Agent (V1) +",
      "Appointment Setting",
      "Multi-channel",
      "Outbound Messages",
"Full Customization of Agent Models",
      "Multi Language Support",
      "Human Hand-off",
      "Appointment Remainder"
    ]
  },
  {
    name: "Operational Cost",
    price: "",
    description: "",
    monthlyFee: "",
    managementText: "",
    operationalText: "",
    icon: Calculator, // Use text-red-500 for icon color
    gradient: "from-red-400 via-red-600 to-red-900", // Premium red gradient
    shadow: "shadow-red-500/20",
    isOperationalCost: true,
    features: [
      "Get exact pricing based on your usage",
      "Transparent pay-as-you-go pricing",
      "No hidden fees or charges",
      "Detailed cost breakdown"
    ],
    footer: "Get Operational Cost"
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
    const cost = totalMinutes * 0.10;
    
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
      className="mt-32 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 min-h-[540px]"
    >
      <div className="text-center mb-12">
        <motion.div 
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white border border-purple-500 mb-3 sm:mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
          <span className="text-xs sm:text-sm text-green-400">Cost Estimator</span>
        </motion.div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4 drop-shadow-lg">
          <span className="inline-block bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-900 bg-clip-text text-transparent leading-tight">
            AI Caller Cost Calculator
          </span>
        </h2>
        <p className="text-black max-w-2xl mx-auto">
          Estimate your monthly AI calling costs based on your usage requirements
        </p>
      </div>

      <motion.div
        className="relative pt-8 pb-6 px-8 rounded-3xl shadow-2xl border-2 border-purple-100 bg-white"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >

        <form onSubmit={calculateCost} className="relative space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Calls per day input */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-semibold text-black">
                Number of Calls per Day
              </label>
              <div className="relative group">
                <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors w-5 h-5 ${
                  hoveredInput === 'calls' ? 'text-purple-500' : 'text-gray-400'
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
                  className="w-full bg-white text-black border border-emerald-200 rounded-xl px-4 py-3 pl-10 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-200"
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
              <label className="block text-sm font-semibold text-black">
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
                  className="w-full bg-white text-black border border-emerald-200 rounded-xl px-4 py-3 pl-10 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-200"
                  placeholder="Enter minutes per call"
                />
              </div>
            </motion.div>
          </div>

          {/* Calculate button */}
          <div className="flex justify-center">
            <PremiumButton
              icon={ChevronRight}
              text={isAnimating ? 'Calculating...' : 'Calculate Monthly Cost'}
              disabled={isAnimating}
              variant="purple"
              type="submit"
            />
          </div>
        </form>

        {/* Results section */}
        <AnimatePresence>
          {calculatorState.isCalculated && (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 p-6 rounded-xl bg-emerald-50 border border-emerald-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-emerald-700 text-sm font-semibold">Total Monthly Minutes</p>
                    <motion.p
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      className="text-3xl font-bold text-black"
                    >
                      <span>{calculatorState.totalMinutes.toLocaleString()} mins</span>
                    </motion.p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-emerald-700 text-sm font-semibold">Estimated Monthly Cost</p>
                    <motion.p
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      className="text-3xl font-bold text-black"
                    >
                      <span>${calculatorState.totalCost.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}</span>
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
          className="mt-4 text-s text-black-400 text-center"
        >
          <span>* Pricing per minute may vary based on different APIs and features selected. Contact us for detailed pricing based on your specific requirements.</span>
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

  const isHovered = hoveredPlan === 'operational';

  const handleGetMaintenancePrice = (planName: string, section: 'voice' | 'chatbot') => {
    setSelectedPlan(prevPlan => {
      // If clicking the same plan, toggle the form visibility
      if (prevPlan === planName) {
        if (section === 'voice') {
          setShowVoiceForm(!showVoiceForm);
          setShowChatbotForm(false);
        } else {
          setShowChatbotForm(!showChatbotForm);
          setShowVoiceForm(false);
        }
        return '';
      } else {
        // If clicking a different plan, show the form for that plan
        if (section === 'voice') {
          setShowVoiceForm(true);
          setShowChatbotForm(false);
        } else {
          setShowChatbotForm(true);
          setShowVoiceForm(false);
        }
        return planName;
      }
    });
    setFormData(prev => ({ ...prev, plan: planName, section: section }));
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
      <div className="backdrop-blur-lg px-3 py-2 rounded-lg cursor-pointer bg-white/5">
  <p className="text-sm font-semibold">Contact for pricing details</p>
</div>
    );
  };

  

       

         


  const renderPlanButtons = (planName: string, type: 'voice' | 'chatbot', index: number) => (
    <div className="flex flex-col gap-4 mt-auto">
      <PremiumButton
        icon={ChevronRight}
        text="Get Details"
        onClick={() => handleGetMaintenancePrice(planName, type)}
        variant={index === 0 ? 'purple' : index === 1 ? 'green' : 'red'}
      />
    </div>
  );

  return (
    <motion.section
      ref={containerRef}
      id="pricing-plans"
      className="relative py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden bg-theme-bg-primary"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-theme-bg-primary via-theme-glow-primary/5 to-theme-bg-primary" />
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at center, rgba(var(--theme-glow-primary-rgb), 0.05) 0%, transparent 70%)",
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
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-green-100/60 border border-green-500/30 mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
            <span className="text-xs sm:text-sm text-purple-500 font-semibold">AI Voice Agent Pricing</span>
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-4">
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-emerald-500 to-green-700">
              Choose Your AI Voice Plan
            </span>
          </h2>
          <div className="mb-4">
            <p className="text-base sm:text-lg text-theme-text-secondary max-w-2xl mx-auto px-2 py-2 bg-green-50/70 border border-green-200 rounded-xl">
              Need a different voice agent setup or specific features? <br/><span className="font-semibold text-green-700">Contact us</span> for custom solutions and feature selection tailored to your business.
            </p>
          </div>
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
                {plan.popular && (
                  <motion.div
                    className="absolute -top-4 sm:-top-6 left-1/2 -translate-x-1/2 z-20"
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1.2 }}
                  >
                    <div className="bg-gradient-to-r from-green-200 via-green-400 to-green-700 px-3 py-1 rounded-full">
                      <p className="text-black text-xs">Most Popular</p>
                    </div>
                  </motion.div>
                )}

                <motion.div
                  className={`relative flex-1 p-6 sm:p-8 rounded-2xl backdrop-blur-xl border border-transparent bg-theme-bg-secondary/20 overflow-hidden ${plan.popular ? 'md:scale-105' : ''}`}
                  onHoverStart={() => setHoveredPlan(plan.name)}
                  onHoverEnd={() => setHoveredPlan(null)}
                  whileHover={{ scale: 1.02, y: -5 }}
                  initial={false}
                >
                  {/* Custom Glow Behind Card */}
                  {index === 0 && (
  <motion.div
    className="absolute inset-0 rounded-2xl pointer-events-none z-0"
    style={{
      background: 'radial-gradient(circle at 50% 40%, rgba(168,85,247,0.32) 0%, rgba(168,85,247,0.18) 60%, transparent 100%)' // purple
    }}
    aria-hidden={true}
  />
)}
{index === 1 && (
  <motion.div
    className="absolute inset-0 rounded-2xl pointer-events-none z-0"
    style={{
      background: 'radial-gradient(circle at 50% 40%, rgba(34,197,94,0.32) 0%, rgba(34,197,94,0.18) 60%, transparent 100%)' // green
    }}
    aria-hidden={true}
  />
)}
{index === 2 && (
  <motion.div
    className="absolute inset-0 rounded-2xl pointer-events-none z-0"
    style={{
      background: 'radial-gradient(circle at 50% 40%, rgba(239,68,68,0.32) 0%, rgba(239,68,68,0.18) 60%, transparent 100%)' // red
    }}
    aria-hidden={true}
  />
)}
                  {/* Plan Icon */}
                  <motion.div
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-r ${plan.gradient} p-0.5 mb-4 sm:mb-6 mx-auto`}
                    whileHover={{ rotate: -5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <motion.div 
                      className="w-full h-full bg-theme-bg-primary rounded-xl flex items-center justify-center"
                    >
                      {index === 0 ? (
  <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-500" />
) : index === 1 ? (
  <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-500" />
) : (
  <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-red-500" />
)}
                    </motion.div>
                  </motion.div>

                  {/* Plan Details */}
                  <motion.h3 
                    className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-center text-theme-text-primary"
                  >
                    {plan.name}
                  </motion.h3>

                  {/* Price Section */}
                  <div className="mt-4 space-y-4">
                    <div className="flex flex-col items-center justify-center">
                      {index === 0 ? (
  <div className="block text-6xl font-extrabold bg-gradient-to-r from-black via-red-500 to-red-700 bg-clip-text text-transparent mb-2"></div>
) : (
  <div className="block text-6xl font-extrabold bg-gradient-to-r from-black via-green-500 to-green-700 bg-clip-text text-transparent mb-2"></div>
)}
                      <div className="text-lg text-theme-text-secondary"></div>
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
                          <Check className="w-5 h-5 text-theme-success mt-0.5 shrink-0" />
                        </motion.div>
                        <span className="text-theme-text-secondary">{feature}</span>
                      </motion.li>
                    ))}
                    {plan.addOns && (
                      <motion.li className="flex items-start gap-2 mt-4">
                        <span className="text-sm text-red-500">{plan.addOns}</span>
                      </motion.li>
                    )}
                  </ul>

                  {/* Buttons */}
                  {renderPlanButtons(plan.name, 'voice', index)}

                  {/* Voice Agent Maintenance Form Modal */}
                  <AnimatePresence>
                    {showVoiceForm && selectedPlan === plan.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-6 p-4 rounded-xl bg-theme-bg-secondary/30 border border-green-500/30"
                      >
                        {submitStatus === 'success' ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-4"
                          >
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                              className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-theme-success/20 to-theme-success/20 flex items-center justify-center"
                            >
                              <Check className="w-6 h-6 text-theme-success" />
                            </motion.div>
                            <h4 className="text-xl font-semibold text-theme-text-primary mb-2">Thank You!</h4>
                            <p className="text-theme-text-secondary">We've sent the plan details to your email.</p>
                          </motion.div>
                        ) : (
                          <form onSubmit={handleSubmitMaintenanceForm} className="space-y-4">
                            <div className="space-y-2">
                              <input
                                type="text"
                                required
                                minLength={2}
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-theme-bg-secondary/50 border border-transparent rounded-xl px-4 py-3 text-theme-text-primary placeholder:text-theme-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-theme-glow-primary focus:border-transparent"
                                placeholder="Enter your full name *"
                              />
                            </div>
                            <div className="space-y-2">
                              <input
                                type="email"
                                required
                                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-theme-bg-secondary/50 border border-transparent rounded-xl px-4 py-3 text-theme-text-primary placeholder:text-theme-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-theme-glow-primary focus:border-transparent"
                                placeholder="Enter your email address *"
                              />
                            </div>
                            <div className="space-y-2">
                              <input
                                type="tel"
                                required
                                pattern="[0-9]{10}"
                                value={formData.phone}
                                onChange={(e) => {
                                  const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                  setFormData(prev => ({ ...prev, phone: value }));
                                }}
                                className="w-full bg-theme-bg-secondary/50 border border-transparent rounded-xl px-4 py-3 text-theme-text-primary placeholder:text-theme-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-theme-glow-primary focus:border-transparent"
                                placeholder="Enter your phone number *"
                              />
                            </div>
                            {isSubmitting ? (
                              <PremiumButton
                                icon={ChevronRight}
                                text="Submitting..."
                                disabled
                              />
                            ) : (
                              <PremiumButton
                                icon={ChevronRight}
                                text="Get Details"
                                type="submit" // submit handled by form
                                variant={index === 0 ? 'purple' : index === 1 ? 'green' : 'red'}
                              />
                            )}
                          </form>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Chatbot Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 text-center mb-8 sm:mb-12 md:mb-16"
        >
          <motion.div 
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-green-100/60 border border-green-500/30 mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
            <span className="text-xs sm:text-sm text-purple-500">Advanced Chatbot Pricing</span>
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-4">
            <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-emerald-500 to-green-700">
              Intelligent Chatbot Solutions
            </span>
          </h2>
        </motion.div>

        {/* Chatbot Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-sm md:max-w-none mx-auto">
          {chatbotPlans.map((plan, index) => {
            const Icon = plan.icon;
            const isHovered = hoveredPlan === plan.name;

            // Special UI for Operational Cost card
            if (plan.isOperationalCost) {
              return (
                <motion.div
                  key={`chatbot-${plan.name}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="relative flex flex-col text-center"
                >
                  <motion.div
                    className="relative flex-1 p-6 sm:p-8 rounded-2xl backdrop-blur-xl border-2 border-transparent bg-theme-bg-secondary/20 overflow-hidden"
                  >
                    {/* Purple Glow */}
                    {index === 0 && (
  <motion.div
    className="absolute inset-0 rounded-2xl pointer-events-none z-0"
    style={{
      background: 'radial-gradient(circle at 50% 40%, rgba(168,85,247,0.32) 0%, rgba(168,85,247,0.18) 60%, transparent 100%)' // purple
    }}
    aria-hidden={true}
  />
)}
{index === 1 && (
  <motion.div
    className="absolute inset-0 rounded-2xl pointer-events-none z-0"
    style={{
      background: 'radial-gradient(circle at 50% 40%, rgba(34,197,94,0.32) 0%, rgba(34,197,94,0.18) 60%, transparent 100%)' // green
    }}
    aria-hidden={true}
  />
)}
{index === 2 && (
  <motion.div
    className="absolute inset-0 rounded-2xl pointer-events-none z-0"
    style={{
      background: 'radial-gradient(circle at 50% 40%, rgba(239,68,68,0.32) 0%, rgba(239,68,68,0.18) 60%, transparent 100%)' // red
    }}
    aria-hidden={true}
  />
)}/
                    {/* Plan Icon */}
                    <motion.div
                      className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-r ${plan.gradient} p-0.5 mb-4 sm:mb-6 mx-auto`}
                      whileHover={{ rotate: -5, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <motion.div className="w-full h-full bg-theme-bg-primary rounded-xl flex items-center justify-center overflow-hidden">
                        {index === 0 ? (
  <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-500" />
) : index === 1 ? (
  <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-500" />
) : (
  <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-red-500" />
)}
                      </motion.div>
                    </motion.div>
                    {/* Plan Details */}
                    <motion.h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-center text-theme-text-primary">
                      {plan.name}
                    </motion.h3>
                    <div className="mt-4 space-y-4">
                      <div className="flex flex-col items-center justify-center">
                        <div className="block text-6xl font-extrabold bg-gradient-to-r from-black via-red-400 to-red-700 bg-clip-text text-transparent mb-2">??</div>
                        <div className="text-lg text-theme-text-secondary">Free Cost Calculation</div>
                        <div className="text-base text-theme-text-secondary mt-1">Get exact pricing based on your usage</div>
                      </div>
                    </div>
                    {/* Features list */}
                    <ul className="space-y-3 mb-8 text-left px-2 sm:px-0 mt-6">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.li
                          key={feature}
                          className="flex items-start gap-2"
                        >
                          <motion.div>
                            <Check className="w-5 h-5 text-purple-500 mt-0.5 shrink-0" />
                          </motion.div>
                          <span className="text-theme-text-secondary">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                    {/* Button */}
                    <PremiumButton
  icon={Calculator}
  text="Get Operational Cost"
  onClick={() => handleGetMaintenancePrice(plan.name, 'chatbot')}
  variant={index === 0 ? 'purple' : index === 1 ? 'green' : 'red'}
/>
                    {/* Chatbot Maintenance Form Modal */}
                    <AnimatePresence>
                      {showChatbotForm && selectedPlan === plan.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="mt-6 p-4 rounded-xl bg-theme-bg-secondary/30 border border-purple-500/30"
                        >
                          {submitStatus === 'success' ? (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="text-center py-4"
                            >
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-400/20 to-purple-700/20 flex items-center justify-center"
                              >
                                <Check className="w-6 h-6 text-purple-500" />
                              </motion.div>
                              <h4 className="text-xl font-semibold text-theme-text-primary mb-2">Thank You!</h4>
                              <p className="text-theme-text-secondary">We've sent the plan details to your email.</p>
                            </motion.div>
                          ) : (
                            <form onSubmit={handleSubmitMaintenanceForm} className="space-y-4">
                              <div className="space-y-2">
                                <input
                                  type="text"
                                  required
                                  minLength={2}
                                  value={formData.name}
                                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                  className="w-full bg-theme-bg-secondary/50 border border-transparent rounded-xl px-4 py-3 text-theme-text-primary placeholder:text-theme-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-theme-glow-primary focus:border-transparent"
                                  placeholder="Enter your full name *"
                                />
                              </div>
                              <div className="space-y-2">
                                <input
                                  type="email"
                                  required
                                  pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                                  value={formData.email}
                                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                  className="w-full bg-theme-bg-secondary/50 border border-transparent rounded-xl px-4 py-3 text-theme-text-primary placeholder:text-theme-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-theme-glow-primary focus:border-transparent"
                                  placeholder="Enter your email address *"
                                />
                              </div>
                              <div className="space-y-2">
                                <input
                                  type="tel"
                                  required
                                  pattern="[0-9]{10}"
                                  value={formData.phone}
                                  onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
                                    setFormData(prev => ({ ...prev, phone: value }));
                                  }}
                                  className="w-full bg-theme-bg-secondary/50 border border-transparent rounded-xl px-4 py-3 text-theme-text-primary placeholder:text-theme-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-theme-glow-primary focus:border-transparent"
                                  placeholder="Enter your phone number *"
                                />
                              </div>
                              {isSubmitting ? (
                                <PremiumButton
                                  icon={ChevronRight}
                                  text="Submitting..."
                                  disabled
                                />
                              ) : (
                                <PremiumButton
                                  icon={ChevronRight}
                                  text="Get Details"
                                  type="submit"
                                  variant={index === 0 ? 'purple' : index === 1 ? 'green' : 'red'}
                                />
                              )}
                            </form>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              );
            }

            // Default rendering for other chatbot plans
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
                    <div className="bg-gradient-to-r from-green-200 via-green-400 to-green-700 px-3 py-1 rounded-full">
                      <p className="text-black text-xs">Most Popular</p>
                    </div>
                  </motion.div>
                )}

                <motion.div
                  className={`relative flex-1 p-6 sm:p-8 rounded-2xl backdrop-blur-xl border-2 border-transparent bg-theme-bg-secondary/50 overflow-hidden ${plan.popular ? 'md:scale-105 border-theme-glow-primary' : ''}`}
                >
                  {/* Custom Glow Behind Card */}
                  {index === 0 && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none z-0"
                      style={{
                        background: 'radial-gradient(circle at 50% 40%, rgba(168,85,247,0.32) 0%, rgba(168,85,247,0.18) 60%, transparent 100%)'
                      }}
                      aria-hidden={true}
                    />
                  )}
                  {index === 1 && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none z-0"
                      style={{
                        background: 'radial-gradient(circle at 50% 40%, rgba(34,197,94, 0.22) 0%, rgba(34,197,94,0.10) 60%, transparent 100%)'
                      }}
                      aria-hidden={true}
                    />
                  )}
                  {index === 2 && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none z-0"
                      style={{
                        background: 'radial-gradient(circle at 50% 40%, rgba(168,85,247, 0.22) 0%, rgba(168,85,247,0.10) 60%, transparent 100%)'
                      }}
                      aria-hidden={true}
                    />
                  )}
                  {/* Plan Card Container (with hover logic) */}
<motion.div
  onHoverStart={() => setHoveredPlan(plan.name)}
  onHoverEnd={() => setHoveredPlan(null)}
  whileHover={{ scale: 1.02, y: -5 }}
  initial={false}
>
  {/* Plan Icon */}
                  <motion.div
                    className={`relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-r ${plan.gradient} p-0.5 mb-4 sm:mb-6 mx-auto`}
                    whileHover={{ rotate: -5, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <motion.div className="w-full h-full bg-theme-bg-primary rounded-xl flex items-center justify-center overflow-hidden">
                      {index === 0 ? (
  <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-red-500" />
) : index === 1 ? (
  <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-500" />
) : (
  <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-purple-500" />
)}
                    </motion.div>
                  </motion.div>

                  {/* Plan Details */}
                  <motion.h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-center text-theme-text-primary">
                    {plan.name}
                  </motion.h3>

                  <div className="mt-4 space-y-4">
                    <div className="flex flex-col items-center justify-center">
                      {index === 0 ? (
  <div className="block text-6xl font-extrabold bg-gradient-to-r from-black via-red-500 to-red-700 bg-clip-text text-transparent mb-2"></div>
) : (
  <div className="block text-6xl font-extrabold bg-gradient-to-r from-black via-green-500 to-green-700 bg-clip-text text-transparent mb-2"></div>
)}
                      <div className="text-lg text-theme-text-secondary"></div>
                    </div>

                    <div className="backdrop-blur-lg px-3 py-2 rounded-lg cursor-pointer bg-white/5">
  <p className="text-sm font-semibold">Contact for pricing details</p>
</div>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-3 mb-8 text-left px-2 sm:px-0 mt-6">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        className="flex items-start gap-2"
                      >
                        <motion.div>
                          <Check className="w-5 h-5 text-theme-success mt-0.5 shrink-0" />
                        </motion.div>
                        <span className="text-theme-text-secondary">{feature}</span>
                      </motion.li>
                    ))}
                    {plan.addOns && (
                      <motion.li className="flex items-start gap-2 mt-4">
                        <span className="text-sm text-red-500">{plan.addOns}</span>
                      </motion.li>
                    )}
                  </ul>

                  {/* Button */}
                  <div className="w-auto mx-auto">
  <PremiumButton
    icon={ChevronRight}
    text="Get Details"
    onClick={() => handleGetMaintenancePrice(plan.name, 'voice')}
    variant={index === 0 ? 'purple' : index === 1 ? 'green' : 'red'}
  />
</div>

                  {/* Form Modal */}
                  <AnimatePresence>
                    {showChatbotForm && selectedPlan === plan.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-6 p-4 rounded-xl bg-theme-bg-secondary/30 border border-green-500/30"
                      >
                        {submitStatus === 'success' ? (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-4"
                          >
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring", stiffness: 300, damping: 20 }}
                              className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-theme-success/20 to-theme-success/20 flex items-center justify-center"
                            >
                              <Check className="w-6 h-6 text-theme-success" />
                            </motion.div>
                            <h4 className="text-xl font-semibold text-theme-text-primary mb-2">Thank You!</h4>
                            <p className="text-theme-text-secondary">We've sent the plan details to your email.</p>
                          </motion.div>
                        ) : (
                          <form onSubmit={handleSubmitMaintenanceForm} className="space-y-4">
                            <div>
                              <input
                                type="text"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                                className="w-full px-4 py-2 bg-theme-bg-secondary/50 border border-transparent rounded-lg text-theme-text-primary placeholder:text-theme-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-theme-glow-primary focus:border-transparent"
                              />
                            </div>
                            <div>
                              <input
                                type="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="w-full px-4 py-2 bg-theme-bg-secondary/50 border border-transparent rounded-lg text-theme-text-primary placeholder:text-theme-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-theme-glow-primary focus:border-transparent"
                              />
                            </div>
                            <div>
                              <input
                                type="tel"
                                placeholder="Your Phone"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                required
                                className="w-full px-4 py-2 bg-theme-bg-secondary/50 border border-transparent rounded-lg text-theme-text-primary placeholder:text-theme-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-theme-glow-primary focus:border-transparent"
                              />
                            </div>
                            <div className="w-full flex">
  <PremiumButton
    icon={ChevronRight}
    text={isSubmitting ? 'Submitting...' : 'Get Pricing Details'}
    disabled={isSubmitting}
  />
</div>
                          </form>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
        </div>

        {/* Calculator Section */}
        <AICallerCalculator />
        <ROICalculator isPricingPage />


      </div>
    </motion.section>
  );
};

export default PricingPlans;
