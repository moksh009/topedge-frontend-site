import React, { useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Star, Quote, Play, ArrowRight, Building2, Stethoscope, BarChart3, CheckCircle2, TrendingUp, Users } from 'lucide-react';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/Footer';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  image?: string;
  content: string;
  rating: number;
  highlight: string;
  industry: 'realtor' | 'dentist' | 'business';
  company: {
    logo: string;
    name: string;
  };
  video?: {
    vimeoId: string;
    duration: string;
  };
}

const testimonials: Testimonial[] = [
  {
    id: '3',
    name: "Dr. Steven Mugabe",
    role: "Lead Dentist at Code Clinic",
    video: {
      vimeoId: "1074178390",
      duration: "2:15"
    },
    content: "TopEdge's AI solutions transformed our dental practice. Patient scheduling is automated, response times dropped by 90%, and patient satisfaction increased by 55%. It's like having an extra team member.",
    highlight: "90% FASTER RESPONSE",
    rating: 5,
    industry: 'dentist',
    company: {
      logo: "/images/logos/code-clinic.png",
      name: "Code Clinic"
    }
  },
  // Realtor Testimonials
  {
    id: '1',
    name: "Jake Miller",
    role: "CEO at Mapquest Realty",
    image: "/testi 1.jpeg",
    content: "TopEdge AI has revolutionized how we handle customer interactions. The intelligent automation has brought amazing results. Our property viewings have increased by 300% and client satisfaction is at an all-time high.",
    highlight: "7+ More Properties Visits in One Week",
    rating: 5,
    industry: 'realtor',
    company: {
      logo: "/images/logos/techsolutions.png",
      name: "TechSolutions Inc."
    }
  },
  {
    id: '2',
    name: "Michael Chen",
    role: "Operations Director",
    content: "The AI voice agent from TopEdge has revolutionized our real estate operations. We're handling 3x more property inquiries with better conversion rates. Our agents can focus on high-value activities.",
    highlight: "300+ QUALIFIED LEADS",
    rating: 5,
    industry: 'realtor',
    company: {
      logo: "/images/logos/global-retail.png",
      name: "Global Retail"
    }
  },
  // Dental Practice Testimonials
  
  {
    id: '4',
    name: "Dr. Emma Thompson",
    role: "Dental Practice Owner",
    content: "The AI-powered patient management system has given us insights we never thought possible. Our appointment efficiency has improved dramatically and patients love the instant responses.",
    highlight: "150% MORE APPOINTMENTS",
    rating: 5,
    industry: 'dentist',
    company: {
      logo: "/images/logos/global-marketing.png",
      name: "Thompson Dental"
    }
  },
  // Business Testimonials
  {
    id: '5',
    name: "David Rodriguez",
    role: "Sales Manager",
    content: "Implementation was smooth and the results were immediate. Our team's productivity has doubled since using TopEdge. The AI insights have helped us optimize our entire sales process.",
    highlight: "2X PRODUCTIVITY",
    rating: 5,
    industry: 'business',
    company: {
      logo: "/images/logos/sales-pro.png",
      name: "Sales Pro"
    }
  }
];

const StatCard = ({ number, label }: { number: string; label: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-900/20 to-purple-800/10 rounded-2xl border border-purple-500/20"
  >
    <span className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent mb-2">
      {number}
    </span>
    <span className="text-sm sm:text-base text-gray-400">{label}</span>
  </motion.div>
);

const TrustIndicator = ({ icon: Icon, text }: { icon: any; text: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="flex items-center gap-3"
  >
    <div className="flex-shrink-0">
      <Icon className="w-5 h-5 text-purple-400" />
    </div>
    <span className="text-sm text-gray-400">{text}</span>
  </motion.div>
);

const IndustrySection = ({ title, icon: Icon, description }: { title: string; icon: any; description: string }) => {
  const isMobile = window.innerWidth < 768;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: isMobile ? 0.5 : 0.8 }}
      viewport={{ once: true, margin: "-50px" }}
      className="text-center mb-12 sm:mb-16"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 mb-6 sm:mb-8">
        <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-purple-400" />
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">{title}</h2>
      <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4 leading-relaxed">{description}</p>
    </motion.div>
  );
};

const TestimonialCard = ({ testimonial, isFirst }: { testimonial: Testimonial; isFirst: boolean }) => {
  const cardRef = useRef(null);
  const isMobile = window.innerWidth < 768;
  const isInView = useInView(cardRef, { 
    once: false, 
    margin: isMobile ? "-50px" : "-100px",
    amount: isFirst ? 0.1 : (isMobile ? 0.2 : 0.3)
  });

  // Memoize animation variants for better performance
  const cardVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: isMobile ? 30 : 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: isMobile ? 0.5 : 0.8,
        ease: "easeOut"
      }
    }
  }), [isMobile]);

  // Memoize star animation variants
  const starVariants = useMemo(() => ({
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * (isMobile ? 0.05 : 0.1),
        duration: isMobile ? 0.3 : 0.5
      }
    })
  }), [isMobile]);

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`relative w-full ${testimonial.video || testimonial.image ? 'max-w-3xl' : 'max-w-4xl'} mx-auto`}
    >
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#1a103d] to-[#0d0926] backdrop-blur-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-500/10">
        {testimonial.image || testimonial.video ? (
          <div className="relative w-full">
            {testimonial.video ? (
              <div className="relative pb-[56.25%]">
                <iframe
                  src={`https://player.vimeo.com/video/${testimonial.video.vimeoId}?h=c31f795c7d&autoplay=0&title=0&byline=0&portrait=0`}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={`${testimonial.name} Testimonial`}
                  loading="lazy"
                />
              </div>
            ) : testimonial.image && (
              <div className="relative w-full">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )}
            <div className="absolute -bottom-4 left-4 sm:left-8">
              <div className="px-4 sm:px-6 py-1.5 sm:py-2 bg-[#8B5CF6] rounded-full shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                <p className="text-sm sm:text-base font-bold text-white tracking-wide whitespace-nowrap">{testimonial.highlight}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute top-4 sm:top-6 right-4 sm:right-6 text-purple-500/20 transform rotate-180">
            <Quote size={isMobile ? 80 : 100} />
          </div>
        )}

        <div className={`relative p-6 sm:p-8 md:p-10 ${testimonial.video || testimonial.image ? 'max-w-2xl mx-auto' : ''}`}>
          <div className="flex items-center justify-center gap-1 sm:gap-1.5 mb-4 sm:mb-6">
            {[...Array(testimonial.rating)].map((_, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={starVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <Star className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400 fill-yellow-400" />
              </motion.div>
            ))}
          </div>

          <motion.p 
            className="text-base sm:text-lg md:text-xl text-center text-gray-200 font-light leading-relaxed mb-6 sm:mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.2, duration: isMobile ? 0.3 : 0.5 }}
          >
            "{testimonial.content}"
          </motion.p>

          <motion.div 
            className="flex flex-col items-center justify-center gap-1 sm:gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: isMobile ? 0.3 : 0.5 }}
          >
            {!testimonial.image && !testimonial.video && (
              <div className="mb-3 sm:mb-4">
                <div className="px-4 sm:px-6 py-1.5 sm:py-2 bg-[#8B5CF6] rounded-full shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                  <p className="text-sm sm:text-base font-bold text-white tracking-wide whitespace-nowrap">{testimonial.highlight}</p>
                </div>
              </div>
            )}
            <h4 className="text-xl sm:text-2xl text-white font-semibold">{testimonial.name}</h4>
            <p className="text-base sm:text-lg text-purple-400 font-medium">{testimonial.role}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<'all' | 'realtor' | 'dentist' | 'business'>('all');
  const isMobile = window.innerWidth < 768;

  // Memoize filtered testimonials
  const filteredTestimonials = useMemo(() => 
    selectedIndustry === 'all' 
      ? testimonials 
      : testimonials.filter(t => t.industry === selectedIndustry),
    [selectedIndustry]
  );

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <section className="relative py-8 sm:py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-[#030014] to-black" />
          <motion.div 
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                'radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                'radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 70%)'
              ]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 md:mb-20 pt-8 sm:pt-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-purple-300">Trusted by Industry Leaders</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 sm:mb-8">
              <motion.span
                className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: '200% auto' }}
              >
                Real Results,
              </motion.span>
              <motion.span
                className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-600"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: '200% auto' }}
              >
                Real Impact
              </motion.span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto px-4 leading-relaxed">
              Discover how businesses are achieving extraordinary results with our AI solutions
            </p>

            {/* Trust Indicators */}
            <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
              <StatCard number="95%" label="Client Satisfaction" />
              <StatCard number="2.5x" label="Average ROI" />
              <StatCard number="500+" label="Active Users" />
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <TrustIndicator icon={CheckCircle2} text="Enterprise-grade security" />
              <TrustIndicator icon={TrendingUp} text="Proven track record" />
              <TrustIndicator icon={Users} text="24/7 dedicated support" />
            </div>
          </motion.div>

          {/* Industry Filter */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-2 sm:px-0">
            {['all', 'realtor', 'dentist', 'business'].map((industry) => (
              <motion.button
                key={industry}
                onClick={() => setSelectedIndustry(industry as any)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-medium transition-all duration-300 ${
                  selectedIndustry === industry 
                    ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg shadow-purple-500/25' 
                    : 'bg-purple-500/10 text-purple-300 hover:bg-purple-500/20'
                }`}
              >
                {industry === 'all' ? 'All Industries' : 
                 industry === 'realtor' ? 'Real Estate' :
                 industry === 'dentist' ? 'Dental Practices' : 'Businesses'}
              </motion.button>
            ))}
          </div>

          {/* Industry Sections */}
          {selectedIndustry !== 'all' && (
            <div className="mb-12 sm:mb-16">
              {selectedIndustry === 'realtor' && (
                <IndustrySection 
                  title="Real Estate Excellence"
                  icon={Building2}
                  description="Discover how leading real estate agencies are revolutionizing their operations, automating client interactions, and achieving record-breaking sales with our AI solutions."
                />
              )}

              {selectedIndustry === 'dentist' && (
                <IndustrySection 
                  title="Healthcare Innovation"
                  icon={Stethoscope}
                  description="See how modern dental practices are enhancing patient care, streamlining scheduling, and growing their practice with AI-powered automation."
                />
              )}

              {selectedIndustry === 'business' && (
                <IndustrySection 
                  title="Business Transformation"
                  icon={BarChart3}
                  description="Learn how forward-thinking businesses are scaling operations, boosting productivity, and achieving unprecedented growth with our AI solutions."
                />
              )}
            </div>
          )}

          {/* Testimonial Cards */}
          <div className="space-y-8 sm:space-y-12">
            {filteredTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={index === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8,
                  delay: index * 0.2
                }}
              >
                <TestimonialCard testimonial={testimonial} isFirst={index === 0} />
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 sm:mt-20 md:mt-24 text-center pb-12 sm:pb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join hundreds of successful businesses that have already elevated their operations with our AI solutions.
            </p>
            <motion.a
              href="/booking"
              className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-xl bg-gradient-to-r from-purple-600 to-purple-800 text-white text-lg font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule a Demo
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.a>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Testimonials; 