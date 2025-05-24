import { useState, useRef, useEffect } from 'react';
import SEO from '../components/SEO';
import { FaUserMd, FaRegClock, FaCalendarCheck, FaShieldAlt, FaStar, FaQuoteLeft, FaCheckCircle, FaPhoneAlt, FaArrowRight, FaPlay, FaCalculator, FaMoneyBillWave, FaClock } from 'react-icons/fa';
import { MdVerified, MdOutlineLocalHospital, MdWarning, MdPlayArrow } from 'react-icons/md';
import { BsCalculator, BsHeadset, BsGraphUp, BsCalendarCheck, BsClock } from 'react-icons/bs';
import { Rocket, Calendar, Shield, Clock, DollarSign, CheckCircle } from 'lucide-react';
import { HiOutlineLightBulb, HiCurrencyDollar } from 'react-icons/hi';
import { trackLead, trackSchedule } from '../utils/metaPixelEvents';
import Link from 'next/link';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import CountUp from 'react-countup';
import { InlineWidget } from 'react-calendly';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Calendly URL is used for the embedded widget
const calendlyUrl = "https://calendly.com/topedge/meeting-on-google-meet";

// Key statistics that drive urgency
const keyStats = [
  { value: "72%", label: "Patients go to competitors when calls are missed", icon: <MdWarning className="text-red-500 w-8 h-8" /> },
  { value: "45%", label: "Increase in appointment bookings", icon: <BsGraphUp className="text-green-500 w-8 h-8" /> },
  { value: "24/7", label: "Availability - never miss a call again", icon: <FaPhoneAlt className="text-blue-500 w-8 h-8" /> }
];

// Primary benefits for medical practices
const benefits = [
  {
    icon: <FaRegClock className="w-10 h-10 text-blue-400" />, 
    title: "Save 40+ Staff Hours Monthly", 
    description: "Your team stops chasing voicemails and playing phone tag. Our AI handles all appointment scheduling, reminders, and follow-ups automatically."
  },
  {
    icon: <FaCalendarCheck className="w-10 h-10 text-green-400" />, 
    title: "Recover $10K+ in Lost Revenue", 
    description: "Convert missed calls into confirmed appointments instantly, 24/7, even after hours and on weekends when your competitors are closed."
  },
  {
    icon: <FaShieldAlt className="w-10 h-10 text-purple-400" />, 
    title: "100% HIPAA Compliant", 
    description: "Enterprise-grade security protects all patient data with full encryption and compliance certification you can trust."
  },
  {
    icon: <FaUserMd className="w-10 h-10 text-blue-300" />, 
    title: "Built Specifically for Medical Practices", 
    description: "Designed by healthcare professionals for healthcare professionals. Seamlessly integrates with your existing systems."
  },
];

// How it works - simplified customer journey
const steps = [
  { 
    icon: <MdOutlineLocalHospital className="w-12 h-12 text-blue-600" />, 
    title: "Quick 15-Minute Setup", 
    desc: "We connect to your phone system with zero disruption to your practice operations." 
  },
  { 
    icon: <FaUserMd className="w-12 h-12 text-green-600" />, 
    title: "AI Answers Every Call", 
    desc: "Our AI receptionist handles patient inquiries, books appointments, and sends confirmations 24/7." 
  },
  { 
    icon: <FaCalendarCheck className="w-12 h-12 text-purple-600" />, 
    title: "Watch Your Schedule Fill Up", 
    desc: "See immediate results with more appointments and dramatically fewer missed opportunities." 
  },
];

// Video testimonials with specific results
const videoTestimonials = [
  {
    name: "Steven Mugabe",
    role: "Doctor at Code Clinic",
    image: "/images/testimonials/dr-steven.jpeg",
    content: "TopEdge's AI solutions transformed our customer service. Response times dropped by 90% while satisfaction increased by 55%. It's like having a superhuman team that never sleeps.",
    rating: 5,
    company: {
      logo: "/images/logos/code-clinic.png",
      name: "Code Clinic"
    },
    video: {
      url: "/images/testimonials/steeven.mp4",
      poster: "/images/testimonials/dr-steven.jpeg"
    }
  },
  {
    name: "Shubham Patel",
    role: "Realtor",
    image: "/images/testimonials/jake-miller.jpeg",
    content: "TopEdge AI has completely changed how I manage inbound leads. As a realtor running ads across platforms, I get a lot of inquiries—and my Inbound Voice Agent handles them all. It answers questions, shares property info, and even sends brochures automatically.",
    rating: 5,
    company: {
      logo: "/images/logos/your-realty-logo.png",
      name: "Patel Realty"
    },
    video: {
      url: "/images/testimonials/shubham.mp4",
      poster: "/images/testimonials/jake-miller.jpeg"
    }
  }
];

// Image testimonials with specific results
const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Medical Director",
    clinic: "Family Practice Clinic",
    avatar: "/testimonial-avatar.jpg",
    quote: "We were missing 32 calls per week before TopEdge. Now we've increased bookings by 45% and recovered over $12,000 in monthly revenue that was walking out the door.",
    rating: 5
  },
  {
    name: "Dr. Michael Lee",
    role: "Lead Physician",
    clinic: "Downtown Pediatrics",
    avatar: "/doctor2.jpg",
    quote: "My front desk staff was overwhelmed with calls. Now they focus on patients in the office while the AI handles all incoming calls. Our stress levels dropped and patient satisfaction is up 28%.",
    rating: 5
  },
  {
    name: "Dr. Priya Patel",
    role: "Practice Owner",
    clinic: "Sunrise Health Center",
    avatar: "/doctor3.jpg",
    quote: "Setup took exactly 14 minutes and we were capturing appointments that same day. We've added 15 new patients weekly that we would have otherwise missed. The ROI is undeniable.",
    rating: 5
  },
];

// ROI Calculator configuration
const roiCalculatorConfig = {
  defaultMissedCalls: 30,
  defaultAppointmentValue: 150,
  conversionRate: 0.65,
  monthlySubscription: 99,
  weeklyLeadIncrease: 0.28, // 28% increase
  staffHoursSaved: 40
};

// Common questions addressed directly
const faqs = [
  { 
    q: "Is this truly HIPAA compliant?", 
    a: "Absolutely. We maintain comprehensive HIPAA compliance with BAA agreements, end-to-end encryption, and regular security audits. Your patient data is fully protected and secure." 
  },
  { 
    q: "How quickly can my practice be up and running?", 
    a: "Most clinics are fully operational within 24 hours. Our team handles the entire implementation process, with most setups completed in under 15 minutes." 
  },
  { 
    q: "Do I need to change my existing phone system?", 
    a: "No changes required. We seamlessly integrate with your current phone system without any disruption to your practice operations." 
  },
  { 
    q: "What's the ROI for a typical practice?", 
    a: "Our average client recovers $10,000+ in previously lost monthly revenue from missed calls and adds 40+ new appointments monthly, with an ROI of 10x or greater." 
  },
  {
    q: "Is there a contract or commitment required?",
    a: "No long-term contracts. Start with our 7-day free trial with no credit card required, then continue month-to-month and cancel anytime with no penalties."
  }
];

// Real-world use cases with results
const useCases = [
  {
    title: "Never Miss a Patient Call Again",
    desc: "Your virtual AI receptionist answers every single call within 2 seconds, 24/7/365—even during lunch, after hours, and on weekends when competitors send callers to voicemail.",
    icon: <FaCheckCircle className="w-8 h-8 text-blue-400" />
  },
  {
    title: "Eliminate No-Shows & Last-Minute Cancellations",
    desc: "Automated confirmation calls, texts, and emails reduce no-shows by 35%, filling your schedule with paying patients instead of empty slots.",
    icon: <FaCheckCircle className="w-8 h-8 text-green-400" />
  },
  {
    title: "Free Your Staff From Phone Burnout",
    desc: "Your team stops playing phone tag and instead focuses on in-office patient care. Front desk satisfaction scores increase by an average of 42%.",
    icon: <FaCheckCircle className="w-8 h-8 text-purple-400" />
  },
];

// ROI calculator configuration
const calculatorParams = {
  defaultMissedCalls: 30,
  defaultAppointmentValue: 150,
  conversionRate: 0.65,
};

const Landing = () => {
  const [faqOpen, setFaqOpen] = useState(null);

  // Handler to scroll to Calendly section
  const handleScrollToCalendly = () => {
    const calendlySection = document.getElementById('calendly-section');
    if (calendlySection) {
      calendlySection.scrollIntoView({ behavior: 'smooth' });
      // Track scheduling event when user clicks to schedule
      trackSchedule('demo');
    }
  };

  // Function to trigger a test event for Meta Pixel
  const triggerMetaPixelTestEvent = () => {
    trackLead('landing_page_test');
    alert('Meta Pixel test event "Lead" triggered. Check Facebook Pixel Helper for confirmation.');
  };

  // Function to scroll to a specific section by ID
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // We'll use the react-calendly InlineWidget component instead of custom implementation
  // This is the recommended way to integrate Calendly in React applications
  const [calendarLoaded, setCalendarLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  // Listen for Calendly events to detect when the widget is loaded
  useEffect(() => {
    // Function to handle Calendly events
    const handleCalendlyEvent = (e: any) => {
      if (e.data && e.data.event && typeof e.data.event === 'string' && e.data.event.includes('calendly')) {
        console.log('Calendly widget loaded and active');
        setCalendarLoaded(true);
      }
    };
    
    // Add event listener for messages from Calendly iframe
    window.addEventListener('message', handleCalendlyEvent);
    
    // Set a timeout to check if Calendly loaded via DOM
    const loadCheckTimeout = setTimeout(() => {
      const calendlyFrame = document.querySelector('iframe[src*="calendly.com"]');
      if (calendlyFrame) {
        setCalendarLoaded(true);
      }
    }, 2000);
    
    // Set a timeout to show fallback UI if Calendly doesn't load within 8 seconds
    const fallbackTimeout = setTimeout(() => {
      if (!calendarLoaded) {
        console.log('Calendly widget load timeout - showing fallback UI');
        setShowFallback(true);
      }
    }, 8000);

    return () => {
      window.removeEventListener('message', handleCalendlyEvent);
      clearTimeout(loadCheckTimeout);
      clearTimeout(fallbackTimeout);
    };
  }, [calendarLoaded]);

  // All booking/demo buttons now use handleScrollToCalendly to direct users to the embedded calendar section

  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  
  // ROI Calculator state
  const [missedCalls, setMissedCalls] = useState(roiCalculatorConfig.defaultMissedCalls);
  const [appointmentValue, setAppointmentValue] = useState(roiCalculatorConfig.defaultAppointmentValue);
  const [calculatedROI, setCalculatedROI] = useState<any>(null);
  
  // Calculate potential ROI
  const calculateROI = () => {
    const monthlyRecoveredRevenue = missedCalls * roiCalculatorConfig.conversionRate * appointmentValue * 4.3; // 4.3 weeks per month
    const monthlyInvestment = roiCalculatorConfig.monthlySubscription; 
    const roi = (monthlyRecoveredRevenue / monthlyInvestment).toFixed(1);
    
    setCalculatedROI({
      monthlyRevenue: monthlyRecoveredRevenue.toFixed(0),
      yearlyRevenue: (monthlyRecoveredRevenue * 12).toFixed(0),
      roi: roi
    });
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Handle video click to unmute
  const [videoMuted, setVideoMuted] = useState<boolean[]>([true, true]);
  
  const handleVideoClick = (index: number) => {
    if (videoRefs.current[index]) {
      const video = videoRefs.current[index];
      if (video) {
        const newMutedState = !video.muted;
        video.muted = newMutedState;
        
        // Update the muted state array
        const newMutedArray = [...videoMuted];
        newMutedArray[index] = newMutedState;
        setVideoMuted(newMutedArray);
      }
    }
  };

  // Revenue Projection Chart Data
  const revenueChartData = {
    labels: ['Current', 'With TopEdge AI'],
    datasets: [
      {
        type: 'bar' as const,
        label: 'Monthly Revenue',
        data: [
          appointmentValue * missedCalls * 0.2, // Current conversion rate (20%)
          appointmentValue * missedCalls * roiCalculatorConfig.conversionRate // With AI (65%)
        ],
        backgroundColor: [
          'rgba(239, 68, 68, 0.7)', // red
          'rgba(16, 185, 129, 0.7)'  // green
        ],
        borderColor: [
          'rgb(239, 68, 68)', 
          'rgb(16, 185, 129)'
        ],
        borderWidth: 2
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => '$' + value.toLocaleString()
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += '$' + context.parsed.y.toLocaleString();
            }
            return label;
          }
        }
      }
    }
  };

  return (
    <>
      <SEO
        title="TopEdge AI | Recover $10k & Save 40+ Hours Weekly With AI"
        description="Recover up to $10,000 in revenue and save 40+ staff hours weekly within 45 days with TopEdge AI. Our AI receptionist books appointments 24/7, increases bookings by 45%, and pays for itself in days."
        keywords="AI receptionist, business automation, appointment scheduling, revenue recovery, time-saving AI, customer service automation"
        type="website"
        url="https://topedge.ai/landing"
        image="/logo.png"
        canonical="https://topedge.ai/landing"
      />
      
      {/* HERO SECTION */}
      {/* HERO SECTION - with video that straddles into section below */}
      <section className="relative flex flex-col justify-center bg-white text-gray-900 overflow-visible pt-16 sm:pt-16 pb-24 sm:pb-32 min-h-[100vh] sm:min-h-[50vh] lg:flex lg:items-center">
        {/* Full-width background image - desktop */}
        <div className="absolute inset-0 w-[100vw] h-[100vh] bg-cover bg-center hidden sm:block rounded-b-xl" style={{ backgroundImage: "url('/hero-background.png')", filter: 'none', opacity: 1 }}></div>
        {/* Mobile-specific background image */}
        <div className="absolute inset-0 w-full h-full bg-cover bg-center block sm:hidden rounded-b-3xl" style={{ backgroundImage: "url('/hero-background-mobile.png')", filter: 'none', opacity: 1 }}></div>
        
        <div className="container mx-auto mt-12 sm:mt-20 px-3 sm:px-6 lg:px-8 relative z-10">
          {/* Trust Badges */}
          <div className="flex flex-wrap gap-1 sm:gap-3 justify-center mb-4 sm:mb-6 mt-6 sm:mt-0">
            <span className="bg-white/90 px-2 sm:px-4 py-1 sm:py-2 rounded-full text-[10px] sm:text-sm font-medium flex items-center gap-1 sm:gap-2 border border-blue-100 shadow-sm">
              <MdVerified className="text-blue-600 text-xs sm:text-base" /> Trusted by 120+ Businesses
            </span>
            <span className="bg-white/90 px-2 sm:px-4 py-1 sm:py-2 rounded-full text-[10px] sm:text-sm font-medium flex items-center gap-1 sm:gap-2 border border-blue-100 shadow-sm">
              <BsHeadset className="text-blue-600 text-xs sm:text-base" /> 24/7 Customer Support
            </span>
            <span className="bg-white/90 px-2 sm:px-4 py-1 sm:py-2 rounded-full text-[10px] sm:text-sm font-medium flex items-center gap-1 sm:gap-2 border border-blue-100 shadow-sm">
              <FaShieldAlt className="text-blue-600 text-xs sm:text-base" /> Enterprise-Grade Security
            </span>
          </div>
          
          {/* Headline & Subheadline */}
          <div className="flex flex-col items-center justify-center text-center max-w-4xl mt-0 mx-auto">
            <h1 className="text-3xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight mb-3 sm:mb-5 text-black">
              <span className="relative inline-block"><span className="absolute -right-2 -top-2 w-[120px] h-[80px] sm:w-[140px] sm:h-[90px] md:opacity-0 rounded-[50%] border-[8px] border-red-500 opacity-100"></span><span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-[2.5rem] sm:text-4xl md:text-5xl lg:text-6xl relative">Recover up to $10k</span></span> and Save <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 text-[2.5rem] sm:text-4xl md:text-5xl lg:text-6xl">40+ Hours Weekly</span> Within 45 Days with AI
            </h1>
            <p className="text-lg sm:text-lg md:text-xl text-gray-800 font-medium max-w-3xl mb-0 px-2">
            72% of customers choose another business when they don’t get a fast reply.<br/>

That’s where our AI Support Squad (Voice + Chat Agent) comes in. It handles bookings, call transfers, file uploads, and more — instantly. <br/>
No lost leads. No wasted time. <br/>

Watch this quick video for details 👇

            </p>
          </div>
          
          {/* Video container with fixed width */}
          <div className="w-full max-w-[850px] mx-auto px-2 sm:px-4">
            {/* Larger video that straddles hero section and below - positioned with higher z-index */}
            <div className="relative z-30 transform translate-y-8 sm:translate-y-14 mb-0">
              <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl blur-lg opacity-40 animate-pulse"></div>
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border-2 border-white/50 bg-gradient-to-br from-gray-900 to-black">
                {/* YouTube embed with poster image fallback */}
                <div className="relative w-full aspect-video">
                  <iframe 
                    className="w-full h-full absolute inset-0"
                    src="https://www.youtube.com/embed/L2DP3iTrbsE?si=635I9oFIf-Lc8Qk9&autoplay=1&mute=1&enablejsapi=1&origin=https://topedgeai.com"
                    title="TopEdge AI Demo Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                  
                  {/* Fallback poster image that shows if iframe fails to load */}
                  <div className="absolute inset-0 bg-cover bg-center z-[-1]" style={{ backgroundImage: "url('/demo-thumbnail.jpg')" }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-blue-600/90 rounded-full p-4 shadow-lg">
                        <FaPlay className="text-white w-8 h-8" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
             
              
              {/* Rotating Badge - Bottom Left - behind video */}
             
            </div>
            
          </div>
        </div>
        
      </section>
      
      {/* Client Success Stories */}
      <section className="py-6 sm:py-20 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Title */}
            <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fade-in">
              <span className="text-blue-600 font-semibold text-base sm:text-lg mb-2 sm:mb-4 block tracking-wide font-heading">TRUSTED BY INDUSTRY LEADERS</span>
              <h2 className="text-3xl sm:text-4xl lg:text-7xl font-heading font-extrabold text-gray-900 mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 bg-clip-text text-transparent">
                Client Success Stories
              </h2>
              <div className="w-24 sm:w-32 h-2 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4 sm:mb-6 rounded-full animate-pulse-glow"></div>
            </div>
{/* Testimonials Section */}


            
            {/* Testimonial Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-12 mb-0 px-0 sm:px-0">
              
              {/* First Testimonial - Steven */}
              <div className="w-full max-w-[450px] mx-auto rounded-2xl overflow-hidden shadow-xl border border-blue-200 hover:shadow-2xl transition-shadow duration-300 group animate-fade-in" style={{animationDelay: '100ms'}}>
                {/* Video Container */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 -z-10"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-xl -z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <video
                    ref={(el) => { if (el) videoRefs.current[0] = el }}
                    className="w-full mx-auto"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/images/testimonials/dr-steven.jpeg"
                    onClick={() => handleVideoClick(0)}
                    style={{ height: '500px', objectFit: 'contain', maxWidth: '100%' }}
                    onError={(e) => {
                      console.error('Video failed to load:', e);
                      // Add fallback behavior if needed
                      const target = e.target as HTMLVideoElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const fallbackImg = document.createElement('img');
                        fallbackImg.src = '/images/testimonials/dr-steven.jpeg';
                        fallbackImg.alt = 'Testimonial';
                        fallbackImg.className = 'w-full h-full object-cover';
                        parent.appendChild(fallbackImg);
                      }
                    }}
                  >
                    <source src="/images/testimonials/steeven.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Play/Unmute Overlay */}
                  {videoMuted[0] && (
                    <div className="absolute inset-0 flex items-center justify-center cursor-pointer z-10" onClick={() => handleVideoClick(0)}>
                      <div className="bg-white/30 backdrop-blur-sm p-5 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300">
                        <FaPlay className="text-white w-8 h-8 drop-shadow-md" />
                      </div>
                      <div className="absolute bottom-4 right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs px-4 py-1.5 rounded-full shadow-md">
                        Tap to unmute
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Testimonial Content */}
                <div className="p-6 bg-gradient-to-br from-white to-blue-50/30">
                  <blockquote className="text-gray-700 text-lg mb-5 leading-relaxed text-center font-heading">
                    "TopEdge's AI solutions transformed our customer service. Response times dropped by <span className="font-semibold text-blue-600">90%</span> while satisfaction increased by <span className="font-semibold text-green-600">55%</span>."
                  </blockquote>
                  
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-3 text-center border border-blue-100 shadow-sm">
                      <p className="text-xs text-gray-600 mb-1 font-medium">Hours Saved Weekly</p>
                      <p className="text-2xl font-bold text-blue-600 font-heading">40+</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-3 text-center border border-green-100 shadow-sm">
                      <p className="text-xs text-gray-600 mb-1 font-medium">Monthly Revenue Gain+</p>
                      <p className="text-2xl font-bold text-green-600 font-heading">$9,800</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Second Testimonial - Shubham */}
              <div className="w-full max-w-[450px] mx-auto rounded-2xl overflow-hidden shadow-xl border border-purple-200 hover:shadow-2xl transition-shadow duration-300 group animate-fade-in" style={{animationDelay: '300ms'}}>
                {/* Video Container */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 -z-10"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl -z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <video
                    ref={(el) => { if (el) videoRefs.current[1] = el }}
                    className="w-full mx-auto"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/images/testimonials/jake-miller.jpeg"
                    onClick={() => handleVideoClick(1)}
                    style={{ height: '480px', objectFit: 'contain', maxWidth: '100%' }}
                    onError={(e) => {
                      console.error('Video failed to load:', e);
                      // Add fallback behavior if needed
                      const target = e.target as HTMLVideoElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const fallbackImg = document.createElement('img');
                        fallbackImg.src = '/images/testimonials/jake-miller.jpeg';
                        fallbackImg.alt = 'Testimonial';
                        fallbackImg.className = 'w-full h-full object-cover';
                        parent.appendChild(fallbackImg);
                      }
                    }}
                  >
                    <source src="/images/testimonials/shubham.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Play/Unmute Overlay */}
                  {videoMuted[1] && (
                    <div className="absolute inset-0 flex items-center justify-center cursor-pointer z-10" onClick={() => handleVideoClick(1)}>
                      <div className="bg-white/30 backdrop-blur-sm p-5 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-300">
                        <FaPlay className="text-white w-8 h-8 drop-shadow-md" />
                      </div>
                      <div className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-4 py-1.5 rounded-full shadow-md">
                        Tap to unmute
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Testimonial Content */}
                <div className="p-6 bg-gradient-to-br from-white to-purple-50/30">
                  <blockquote className="text-gray-700 text-lg mb-5 leading-relaxed text-center font-heading">
                    "TopEdge AI has completely changed how I manage inbound leads. As a realtor running ads across platforms, <span className="font-semibold text-blue-600">I get a lot of inquiries</span> and my <span className="font-semibold text-green-600">Inbound Voice Agent</span> handles them all."
                  </blockquote>
                  
                  <div className="grid grid-cols-2 gap-4 mb-2">
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-3 text-center border border-purple-100 shadow-sm">
                      <p className="text-xs text-gray-600 mb-1 font-medium">Hours Saved Weekly</p>
                      <p className="text-2xl font-bold text-purple-600 font-heading">35+</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-3 text-center border border-green-100 shadow-sm">
                      <p className="text-xs text-gray-600 mb-1 font-medium">Monthly Revenue Gain+</p>
                      <p className="text-2xl font-bold text-green-600 font-heading">$12,400</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
      </section>
      
     

       {/* ROI Calculator Section - Real Time */}
       <section className="py-20 bg-gradient-to-b from-white to-blue-50/30 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 -left-24 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 right-1/4 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium tracking-wide mb-4">MAXIMIZE YOUR INVESTMENT</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 bg-clip-text text-transparent leading-tight">Calculate Your Potential ROI</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">See exactly how TopEdge AI can transform your business metrics with our interactive calculator</p>
          </div>

          <RealTimeROICalculator />
          
          {/* Trust badges */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 md:gap-10">
            <div className="flex items-center gap-2 text-gray-500">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>100% Accurate Calculations</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Real-Time Results</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Industry-Specific Metrics</span>
            </div>
          </div>
        </div>
      </section>
       {/* VIDEO EXTENSION SECTION - Premium design with benefits */}
       <section className="bg-gradient-to-b from-white to-gray-50 pt-16 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Content below video with premium styling */}
          <div className="max-w-6xl mx-auto mt-0">
            {/* Premium header with decorative elements */}

              
            
            {/* Benefits cards with premium design */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Benefit Card 1 */}
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl overflow-hidden border border-blue-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group animate-slide-up" style={{animationDelay: '0ms'}}>
                <div className="p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:rotate-6 transition-transform duration-300 mx-auto sm:mx-0">
                    <FaMoneyBillWave className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300 text-center sm:text-left">Recover $10k+ Monthly</h3>
                  <p className="text-gray-600 font-sans leading-relaxed text-center sm:text-left">
                    Our AI system captures leads that would otherwise be lost, directly impacting your bottom line.
                  </p>
                  <div className="mt-6 pt-4 border-t border-blue-100">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-blue-600 font-semibold">
                      <FaCheckCircle className="w-5 h-5" />
                      <span>Revenue Boosting</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Benefit Card 2 */}
              <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-xl overflow-hidden border border-purple-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group animate-slide-up" style={{animationDelay: '150ms'}}>
                <div className="p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-indigo-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:rotate-6 transition-transform duration-300 mx-auto sm:mx-0">
                    <FaClock className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300 text-center sm:text-left">Save 40+ Hours Weekly</h3>
                  <p className="text-gray-600 font-sans leading-relaxed text-center sm:text-left">
                    Automate repetitive customer interactions, freeing your team to focus on high-value activities.
                  </p>
                  <div className="mt-6 pt-4 border-t border-purple-100">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-purple-600 font-semibold">
                      <FaCheckCircle className="w-5 h-5" />
                      <span>Time Efficient</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Benefit Card 3 */}
              <div className="bg-gradient-to-br from-white to-green-50 rounded-2xl shadow-xl overflow-hidden border border-green-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group animate-slide-up" style={{animationDelay: '300ms'}}>
                <div className="p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-teal-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform group-hover:rotate-6 transition-transform duration-300 mx-auto sm:mx-0">
                    <FaShieldAlt className="text-white w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300 text-center sm:text-left">100% HIPAA Compliant</h3>
                  <p className="text-gray-600 font-sans leading-relaxed text-center sm:text-left">
                    Enterprise-grade security protects all patient data with full encryption and compliance certification you can trust.
                  </p>
                  <div className="mt-6 pt-4 border-t border-green-100">
                    <div className="flex items-center justify-center sm:justify-start gap-2 text-green-600 font-semibold">
                      <FaCheckCircle className="w-5 h-5" />
                      <span>Secure & Reliable</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Ultra Premium CTA Button */}
            <div className="text-center">
              <div className="relative inline-block">
                {/* Static subtle glow */}
                <div className="absolute -inset-1 rounded-full bg-blue-500/10 blur-md opacity-70"></div>
                
                <button
                  onClick={handleScrollToCalendly}
                  className="relative z-10 flex items-center gap-3 px-10 py-5 rounded-full font-bold text-lg bg-gradient-to-r from-blue-700 to-blue-800 text-white transition-colors duration-300 overflow-hidden shadow-lg border border-blue-600/20 hover:from-blue-800 hover:to-blue-900"
                >
                  {/* Subtle top highlight */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20 rounded-t-full"></div>
                  
                  {/* Button content */}
                  <span className="relative flex items-center justify-center gap-3 z-10">
                    {/* Premium rocket icon */}
                    <Rocket className="w-6 h-6 text-blue-200 stroke-current" strokeWidth={2} />
                    <span className="text-xl tracking-wide font-medium">Start Free Trial</span>
                  </span>
                </button>
              </div>
              
              {/* Trust indicator */}
              <p className="mt-4 text-gray-500 flex items-center justify-center gap-2">
                <Shield className="text-gray-400 w-4 h-4" strokeWidth={2} />
                <span>No credit card required • 7-day free trial</span>
              </p>
            </div>
          </div>
        </div>
      </section>
  {/* Calendly Section - Embedded directly in the page */}
  <section id="calendly-section" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-blue-600 font-medium mb-2">Take Action Now...</p>
            <h2 className="text-4xl font-bold mb-4">Book Your Discovery Call Now! We Have Limited Seats Available</h2>
          </div>
          
          <div className="max-w-5xl mx-auto">
            {!showFallback ? (
              <div className="relative">
                {/* Loading spinner shown until Calendly loads */}
                {!calendarLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-gray-600">Loading calendar...</p>
                  </div>
                )}
                
                {/* Official react-calendly component */}
                <InlineWidget 
                  url="https://calendly.com/topedge/meeting-on-google-meet"
                  styles={{ height: '750px', minWidth: '320px' }}
                  prefill={{
                    email: '',
                    firstName: '',
                    lastName: '',
                    name: ''
                  }}
                  pageSettings={{
                    backgroundColor: 'ffffff',
                    hideEventTypeDetails: false,
                    hideLandingPageDetails: false,
                    primaryColor: '0445af',
                    textColor: '333333'
                  }}
                />
                
                {/* The Calendly widget is now loaded and managed by the useEffect at the top of the component */}
              </div>
            ) : (
              // Fallback UI when Calendly fails to load
              <div className="text-center p-8 bg-white rounded-lg shadow-lg border border-blue-100">
                <h3 className="text-2xl font-semibold mb-6 text-blue-900">Schedule Your Free Consultation</h3>
                <p className="mb-6 text-gray-700">Book a 30-minute call with our team to see how TopEdge AI can help your business recover lost revenue and save staff time.</p>
                <a 
                  href={calendlyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-700 hover:to-blue-800"
                >
                  <span className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Book Your Free Consultation
                  </span>
                </a>
                <p className="mt-4 text-sm text-gray-500">No credit card required. Cancel anytime.</p>
              </div>
            )}
          </div>
        </div>
      </section>
     
      {/* Client Success Stories */}
      <section className="py-0 bg-gradient-to-b from-gray-50 to-white">
     
            {/* Section Title */}
            <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-fade-in">
              <span className="text-blue-600 font-semibold text-base sm:text-lg mb-2 sm:mb-4 block tracking-wide font-heading">Happy Client</span>
              <h2 className="text-3xl sm:text-4xl lg:text-7xl font-heading font-extrabold text-gray-900 mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 bg-clip-text text-transparent">
                Real Results...
              </h2>
              <div className="w-24 sm:w-32 h-2 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4 sm:mb-6 rounded-full animate-pulse-glow"></div>
            </div>
            {/* Premium Testimonial Images - Vertical Stack */}
  <div className="flex flex-col items-center gap-0 mt-10 sm:mt-20 mb-8 sm:mb-16 w-full overflow-hidden">
    {/* 1st image - Dr. Steven */}
    <div className="relative rounded-2xl md:rounded-3xl w-full max-w-5xl mx-auto mb-8 sm:mb-16 px-4 sm:px-0 overflow-hidden">
      <img
        src="/images/testimonials/dr-steven.jpeg"
        alt="Dr. Steven Testimonial"
        className="mx-auto object-contain rounded-2xl md:rounded-3xl shadow-xl w-full max-w-full"
        style={{ height: 'auto', maxHeight: '520px' }}
        sizes="(min-width: 768px) 600px, 320px"
      />
    </div>
    {/* 2nd & 3rd images side by side - stack on mobile */}
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 w-full max-w-5xl mx-auto px-4 sm:px-6 my-8 sm:my-16 md:my-20">
      {/* Harold */}
      <div className="relative rounded-xl overflow-hidden w-full max-w-xs sm:max-w-sm md:max-w-md flex justify-center md:mr-20 lg:mr-20">
        <img
          src="/images/testimonials/harold.jpeg"
          alt="Harold Testimonial"
          className="object-contain rounded-xl shadow-lg"
          style={{ height: 'auto', maxHeight: '1050px', objectFit: 'scale-down', width: '100%' }}
          sizes="(min-width: 768px) 350px, 280px"
        />
      </div>
      {/* Jake Miller */}
      <div className="relative rounded-xl overflow-hidden w-full max-w-xs sm:max-w-sm md:max-w-md flex justify-center mt-6 md:mt-16">
        <img
          src="/images/testimonials/jake-miller.jpeg"
          alt="Jake Miller Testimonial"
          className="object-contain rounded-xl shadow-lg"
          style={{ height: 'auto', maxHeight: '600px', objectFit: 'scale-down', width: '100%' }}
          sizes="(min-width: 768px) 320px, 260px"
        />
      </div>
    </div>
  </div>
  {/* Premium Image Testimonials Grid */}
  <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 overflow-hidden">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group animate-fade-in" 
                  style={{animationDelay: `${index * 150}ms`}}
                >
                 
                  
                  <div className="flex items-center mb-6 relative">
                    <div className="w-1.5 h-12 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full mr-4"></div>
                    <div>
                      <h3 className="font-heading font-bold text-gray-900 text-xl">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500 font-medium">{testimonial.role}, {testimonial.clinic}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4 relative">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 w-5 h-5" />
                    ))}
                  </div>
                  
                  <div className="relative">
                    <FaQuoteLeft className="text-blue-100 w-12 h-12 absolute -left-2 -top-2 opacity-50" />
                    <p className="text-gray-700 text-lg leading-relaxed font-medium pl-4 relative z-10">"{testimonial.quote}"</p>
                  </div>
                  
    
                </div>
              ))}
            </div>
          </div>

          
        
      </section>
      
      {/* Bottom GIF Section with scroll message */}
      <section className="py-16 bg-gray-50 relative overflow-hidden mt-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/30 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">

            {/* Top message */}
            <div className="p-8 text-black">
              <h3 className="text-4xl font-bold mb-2">You don't have to scroll this far... <br />👁️👁️</h3>

            </div>
            
            {/* GIF container */}
            <div className="p-0">
              <div className="rounded-xl overflow-hidden shadow-lg border rounded-2xl border-gray-100 mb-6">
                <img 
                  src="https://i.gifer.com/JkLv.gif" 
                  alt="Business transformation" 
                  className="w-full h-auto"
                  
                />
              </div>
              
              {/* CTA Button */}
              <button 
                onClick={() => {
                  const calendlySection = document.getElementById('calendly-section');
                  if (calendlySection) {
                    calendlySection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium py-3 px-8 rounded-full shadow-md hover:shadow-xl transition-all duration-300 border border-blue-500/30"
              >
                <span>Book Your Demo Now</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        
      </section>
      
      {/* Test Meta Pixel Button (for development only) */}
      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">Meta Pixel Testing</h3>
            <button 
              onClick={triggerMetaPixelTestEvent}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Test Meta Pixel Event
            </button>
            <p className="text-sm text-gray-500 mt-2">Click to trigger a test "Lead" event for Meta Pixel</p>
          </div>
        </div>
      </section>
    </>
  );
};


function RealTimeROICalculator() {
  // Default values (can be changed as needed)
  const [monthlyInquiries, setMonthlyInquiries] = useState(200);
  const [appointmentValue, setAppointmentValue] = useState(150);
  const [closeRate, setCloseRate] = useState(35);

  // Calculated values
  const [results, setResults] = useState({
    extraLeads: 0,
    newTotalLeads: 0,
    currentCustomers: 0,
    newCustomers: 0,
    extraCustomers: 0,
    currentRevenue: 0,
    newRevenue: 0,
    revenueGain: 0,
    hoursSaved: 0,
  });

  useEffect(() => {
    // Calculations based on ROI.tsx logic
    const totalLeads = monthlyInquiries; // already monthly
    const extraLeads = Math.round(totalLeads * 0.28); // 28% uplift
    const newTotalLeads = totalLeads + extraLeads;
    const currentCloseRate = closeRate;
    const currentCustomers = Math.round(totalLeads * (currentCloseRate / 100));
    const newCustomersFromGainOnly = Math.round(extraLeads * (currentCloseRate / 100));
    const totalCustomers = currentCustomers + newCustomersFromGainOnly;
    const extraCustomers = newCustomersFromGainOnly;
    const aov = appointmentValue;
    const currentRevenue = Math.round(currentCustomers * aov);
    const newRevenue = Math.round(totalCustomers * aov);
    const revenueGain = newRevenue - currentRevenue;
    const hoursSaved = Math.round(monthlyInquiries * 0.35); // Example: 0.35 hours saved per inquiry
    setResults({
      extraLeads,
      newTotalLeads,
      currentCustomers,
      newCustomers: totalCustomers,
      extraCustomers,
      currentRevenue,
      newRevenue,
      revenueGain,
      hoursSaved,
    });
  }, [monthlyInquiries, appointmentValue, closeRate]);

  // Chart data with improved styling
  const chartData = {
    labels: ['Current Revenue', 'Projected Revenue'],
    datasets: [
      {
        label: 'Monthly Revenue',
        data: [results.currentRevenue, results.newRevenue],
        backgroundColor: ['rgba(59, 130, 246, 0.8)', 'rgba(16, 185, 129, 0.8)'],
        borderWidth: 0,
        borderRadius: 12,
        hoverBackgroundColor: ['rgba(59, 130, 246, 1)', 'rgba(16, 185, 129, 1)'],
        barThickness: 50,
      },
    ],
  };
  
  const chartOptions = {
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleFont: { size: 14, weight: 'bold' as const },
        bodyFont: { size: 13 },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `$${context.raw.toLocaleString()}`;
          }
        }
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { 
        beginAtZero: true, 
        grid: { display: false, drawBorder: false },
        ticks: { 
          callback: (value: string | number) => `$${value.toLocaleString()}`,
          font: { size: 12 },
          color: '#6B7280',
        }
      },
      x: {
        grid: { display: false, drawBorder: false },
        ticks: { 
          font: { size: 12, weight: 'bold' as const },
          color: '#374151',
        }
      }
    },
    animation: {
      duration: 2000,
      easing: 'easeOutQuart' as const
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="rounded-3xl shadow-2xl overflow-hidden border border-blue-100 bg-white backdrop-blur-sm bg-white/90">
        <div className="relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-100 rounded-full opacity-50 blur-3xl"></div>
          
          <div className="relative p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Inputs Section */}
              <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-blue-100/50">
                <div className="flex flex-col items-center text-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="bg-blue-600 rounded-lg p-1.5 sm:p-2 shadow-lg">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Your Business Metrics</h3>
                </div>
                
                <div className="space-y-6 sm:space-y-8">
                  <div className="bg-white p-3 sm:p-5 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2 sm:gap-0">
                      <label className="text-gray-700 font-medium text-sm sm:text-base">Total Monthly Inquiries</label>
                      <span className="text-base sm:text-lg font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">{monthlyInquiries}</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="2000"
                      step="50"
                      value={monthlyInquiries}
                      onChange={(e) => setMonthlyInquiries(parseInt(e.target.value))}
                      className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between mt-2 text-xs text-gray-500 font-medium">
                      <span>50 inquiries</span>
                      <span>2000 inquiries</span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 sm:p-5 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2 sm:gap-0">
                      <label className="text-gray-700 font-medium text-sm sm:text-base">Average Value Per Conversion</label>
                      <span className="text-base sm:text-lg font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">${appointmentValue}</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="5000"
                      step="10"
                      value={appointmentValue}
                      onChange={(e) => setAppointmentValue(parseInt(e.target.value))}
                      className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between mt-2 text-xs text-gray-500 font-medium">
                      <span>$50</span>
                      <span>$5000+</span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 sm:p-5 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2 sm:gap-0">
                      <label className="text-gray-700 font-medium text-sm sm:text-base">Close Rate</label>
                      <span className="text-base sm:text-lg font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">{closeRate}%</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="80"
                      step="1"
                      value={closeRate}
                      onChange={(e) => setCloseRate(parseInt(e.target.value))}
                      className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between mt-2 text-xs text-gray-500 font-medium">
                      <span>1%</span>
                      <span>80%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Results & Chart Section */}
              <div className="bg-gradient-to-br from-white to-blue-50/30 rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-blue-100/50">
                <div className="flex flex-col items-center text-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="bg-green-600 rounded-lg p-1.5 sm:p-2 shadow-lg">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">Your Projected Results</h3>
                </div>
                
                {/* Key Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 mb-4 sm:mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100/30 rounded-xl p-3 sm:p-4 text-center border border-blue-200 shadow-md">
                    <div className="flex flex-col h-full justify-between">
                      <p className="text-xs text-gray-600 font-medium">Hours Saved</p>
                      <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mt-1 sm:mt-2">
                        <CountUp end={results.hoursSaved} duration={1.5} separator="," />+
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 sm:mt-1">per month</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100/30 rounded-xl p-3 sm:p-4 text-center border border-green-200 shadow-md">
                    <div className="flex flex-col h-full justify-between">
                      <p className="text-xs text-gray-600 font-medium">Revenue Gain</p>
                      <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mt-1 sm:mt-2">
                        $<CountUp end={results.revenueGain} duration={1.5} separator="," />
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 sm:mt-1">per month</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100/30 rounded-xl p-3 sm:p-4 text-center border border-purple-200 shadow-md col-span-2 sm:col-span-1">
                    <div className="flex flex-col h-full justify-between">
                      <p className="text-xs text-gray-600 font-medium">Extra Leads</p>
                      <p className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600 mt-1 sm:mt-2">
                        <CountUp end={results.extraLeads} duration={1.5} separator="," />
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5 sm:mt-1">per month</p>
                    </div>
                  </div>
                </div>
                
                {/* Chart */}
                <div className="bg-white rounded-xl shadow-md p-2 sm:p-4 border border-gray-100 h-56 sm:h-64 md:h-72">
                  <Bar data={chartData} options={{
                    ...chartOptions,
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                      ...chartOptions.plugins,
                      legend: {
                        display: chartOptions.plugins?.legend?.display !== false,
                        position: 'top' as const
                      },
                      tooltip: {
                        titleFont: {
                          size: window.innerWidth < 640 ? 10 : 12
                        },
                        bodyFont: {
                          size: window.innerWidth < 640 ? 10 : 12
                        }
                      }
                    },
                    scales: {
                      ...chartOptions.scales,
                      x: {
                        ...chartOptions.scales?.x,
                        ticks: {
                          ...chartOptions.scales?.x?.ticks,
                          font: {
                            size: window.innerWidth < 640 ? 10 : 12
                          }
                        }
                      },
                      y: {
                        ...chartOptions.scales?.y,
                        ticks: {
                          ...chartOptions.scales?.y?.ticks,
                          font: {
                            size: window.innerWidth < 640 ? 10 : 12
                          }
                        }
                      }
                    }
                  }} />
                </div>
              </div>
            </div>
            
            {/* Call-to-action */}
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">Ready to see these results in your business?</p>
              <button 
                onClick={() => {
                  const calendlySection = document.getElementById('calendly-section');
                  if (calendlySection) {
                    calendlySection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-500/30"
              >
                <span>Get Started Today</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- PremiumButton Component (from HeroSection.tsx) ---
import { motion } from 'framer-motion';
import React from 'react';

interface PremiumButtonProps {
  icon: React.ElementType;
  text: string;
  to?: string;
  onClick?: () => void;
  isLoading?: boolean;
  variant?: 'default' | 'danger';
}

const PremiumButton: React.FC<PremiumButtonProps> = React.memo(({ 
  icon: Icon, 
  text, 
  to,
  onClick,
  isLoading,
  variant = 'default'
}) => (
  <button
    onClick={onClick}
    className="group relative rounded-full w-full sm:w-auto transition-all duration-300"
  >
    {/* Premium button with elegant design */}
    <div className="relative px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-blue-700 to-blue-800 shadow-md border border-blue-600/20 hover:from-blue-800 hover:to-blue-900 transition-all duration-300">
      {/* Subtle top highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20 rounded-t-full"></div>
      
      {/* Button content */}
      <div className="relative flex items-center justify-center gap-2 z-10">
        {/* Calendar icon */}
        <Calendar className="w-5 h-5 text-blue-200 stroke-current" strokeWidth={2} />
        
        {/* Button text */}
        <span className="font-medium text-base sm:text-lg text-white tracking-wide">
          {isLoading ? 'Loading...' : text}
        </span>
      </div>
    </div>
  </button>
));

// --- CalendlySection Component ---
// (Removed as we now embed the calendar directly in the Landing component)

export default Landing;