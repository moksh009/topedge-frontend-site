import SEO from '../components/SEO';
import React, { useRef, useState, useMemo, useEffect } from 'react';
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
    url: string;
    poster?: string;
  };
}

const testimonials: Testimonial[] = [
  {
    id: '3',
    name: "Dr. Steven Mugabe",
    role: "Lead Dentist at Code Clinic",
    video: {
      url: "/steeven.mp4",
      poster: "/images/testimonials/steven-mugabe-poster.jpg"
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
    image: "/testi 2.jpeg",
    content: "The AI voice agent from TopEdge has revolutionized our real estate operations. We're handling 3x more property inquiries with better conversion rates. Our agents can focus on high-value activities.",
    highlight: "300+ QUALIFIED LEADS",
    rating: 5,
    industry: 'realtor',
    company: {
      logo: "/images/logos/global-retail.png",
      name: "Global Retail"
    }
  },
  {
    id: '4',
    name: "Dr. Emma Thompson",
    role: "Dental Practice Owner",
    image: "/testi 3.jpeg",
    content: "The AI-powered patient management system has given us insights we never thought possible. Our appointment efficiency has improved dramatically and patients love the instant responses.",
    highlight: "150% MORE APPOINTMENTS",
    rating: 5,
    industry: 'dentist',
    company: {
      logo: "/images/logos/global-marketing.png",
      name: "Thompson Dental"
    }
  },
  {
    id: '5',
    name: "David Rodriguez",
    role: "Sales Director at TechPro",
    content: "Implementation was smooth and the results were immediate. Our team's productivity has doubled since using TopEdge. The AI insights have helped us optimize our entire sales process.",
    highlight: "2X PRODUCTIVITY",
    rating: 5,
    industry: 'business',
    company: {
      logo: "/images/logos/sales-pro.png",
      name: "Sales Pro"
    }
  },
  {
    id: '6',
    name: "Sarah Williams",
    role: "Customer Success Manager",
    content: "The AI chatbot has transformed our customer support. We're now able to handle inquiries 24/7, and our response time has decreased by 80%. Customer satisfaction scores have never been higher.",
    highlight: "80% FASTER SUPPORT",
    rating: 5,
    industry: 'business',
    company: {
      logo: "/images/logos/tech-innovate.png",
      name: "Tech Innovate"
    }
  },
  {
    id: '7',
    name: "Alex Thompson",
    role: "Operations Head at CloudTech",
    content: "TopEdge AI has streamlined our entire workflow. The automation capabilities have reduced manual tasks by 70%, allowing our team to focus on strategic initiatives.",
    highlight: "70% LESS MANUAL WORK",
    rating: 5,
    industry: 'business',
    company: {
      logo: "/images/logos/cloudtech.png",
      name: "CloudTech"
    }
  }
];

const StatCard = ({ number, label }: { number: string; label: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="flex flex-col items-center justify-center p-6 bg-gradient-to-br from-theme-glow-primary/20 to-theme-glow-secondary/10 rounded-2xl shadow-xl shadow-theme-glow border border-theme-glow-primary/20"
  >
    <span className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-theme-glow-primary to-theme-glow-secondary bg-clip-text text-transparent mb-2">
      {number}
    </span>
    <span className="text-sm sm:text-base text-theme-text-secondary">{label}</span>
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
      <Icon className="w-5 h-5 text-theme-glow-primary" />
    </div>
    <span className="text-sm text-theme-text-secondary">{text}</span>
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
      <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shadow-xl shadow-theme-glow bg-gradient-to-br from-theme-glow-primary/20 to-theme-glow-primary/5 border border-theme-glow-primary/20 mb-6 sm:mb-8">
        <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-theme-glow-primary" />
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-theme-text-primary mb-4 sm:mb-6">{title}</h2>
      <p className="text-lg sm:text-xl text-theme-text-secondary max-w-3xl mx-auto px-4 leading-relaxed">{description}</p>
    </motion.div>
  );
};

const TestimonialCard = ({ testimonial, isFirst }: { testimonial: Testimonial; isFirst: boolean }) => {
  const cardRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [firstClick, setFirstClick] = useState(true);
  const isInView = useInView(cardRef, { once: true });

  // Handle initial autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (video && isInView) {
      video.muted = true;
      video.play().catch(() => {
        console.log('Autoplay prevented');
      });
    }
  }, [isInView]);

  const handlePlayClick = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      if (firstClick) {
        // First click after autoplay: restart from beginning and unmute
        video.currentTime = 0;
        video.muted = false;
        video.play();
        setFirstClick(false);
      } else {
        // Subsequent clicks: just toggle play/pause
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      }
    }
  };

  // Handle video events
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handlePlay = () => {
        setIsPlaying(true);
      };
      const handlePause = () => {
        setIsPlaying(false);
      };
      const handleEnded = () => {
        // When video ends during autoplay, loop it
        if (video.muted) {
          video.play();
        } else {
          setIsPlaying(false);
        }
      };

      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
      video.addEventListener('ended', handleEnded);

      return () => {
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  return (
    <div className={`relative w-full ${
      testimonial.video 
        ? 'max-w-2xl' 
        : testimonial.image 
          ? 'max-w-2xl'
          : 'max-w-2xl'
    } mx-auto`}>
      <div className="relative overflow-hidden rounded-2xl shadow-xl shadow-theme-glow sm:rounded-3xl bg-gradient-to-br from-theme-bg-surface to-theme-bg-surface/80 backdrop-blur-xl border border-theme-glow-primary/20 hover:border-theme-glow-primary/40 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-theme-glow-primary/10">
        {testimonial.image || testimonial.video ? (
          <div className="relative w-full">
            {testimonial.video ? (
              <div className="relative w-full bg-theme-bg-surface">
                <div className="relative w-full" style={{ paddingTop: '125%' }}> {/* Shorter height for video */}
                  <video
                    ref={videoRef}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    playsInline
                    muted
                    autoPlay
                    controls
                    poster={testimonial.video.poster}
                  >
                    <source src={testimonial.video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  {/* Play button overlay */}
                  <div 
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                      isPlaying && !firstClick ? 'opacity-0 pointer-events-none' : 'bg-theme-bg-primary/40 cursor-pointer hover:bg-theme-bg-primary/50'
                    }`}
                    onClick={handlePlayClick}
                  >
                    <div className="transform transition-transform hover:scale-110">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-theme-glow-primary/90 backdrop-blur-xl border border-theme-glow-secondary/50 shadow-lg shadow-theme-glow-primary/30 flex items-center justify-center">
                        <svg 
                          className="w-8 h-8 sm:w-10 sm:h-10 text-theme-text-inverse" 
                          viewBox="0 0 24 24" 
                          fill="currentColor"
                        >
                          {firstClick ? (
                            <path d="M8 5v14l11-7z" />
                          ) : !isPlaying ? (
                            <path d="M8 5v14l11-7z" />
                          ) : (
                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                          )}
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : testimonial.image && (
              <div className="relative w-full" style={{ maxHeight: '800px', overflow: 'hidden' }}>
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )}
            {/* Only show highlight if not video, or if video is unmuted (after first click) */}
            {(!testimonial.video || (!firstClick && isPlaying)) && (
              <div className="absolute -bottom-4 left-4 sm:left-8 z-10">
                <div className="px-4 sm:px-6 py-1.5 sm:py-2 bg-theme-glow-primary rounded-full shadow-[0_0_20px_rgba(var(--glow-primary),0.3)]">
                  <p className="text-sm sm:text-base font-bold text-theme-text-inverse tracking-wide whitespace-nowrap">{testimonial.highlight}</p>
                </div>
              </div>
            )}

          </div>
        ) : (
          <div className="absolute top-6 right-8 text-theme-glow-primary/20 transform rotate-180">
            <Quote size={80} />
          </div>
        )}

        {/* Always show testimonial details below video or image */}
        <div className={`relative p-6 sm:p-8 md:p-10 ${testimonial.video ? 'max-w-none' : testimonial.image ? 'max-w-2xl mx-auto' : ''}`}>
          <div className="flex items-center justify-center gap-1 sm:gap-1.5 mb-4 sm:mb-6">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-400 fill-yellow-400" />
            ))}
          </div>

          <p className="text-base sm:text-lg md:text-xl text-center text-theme-text-primary font-light leading-relaxed mb-6 sm:mb-8">
            "{testimonial.content}"
          </p>

          <div className="flex flex-col items-center justify-center gap-1 sm:gap-2">
            {!testimonial.image && !testimonial.video && (
              <div className="mb-3 sm:mb-4">
                <div className="px-4 sm:px-6 py-1.5 sm:py-2 bg-theme-glow-primary rounded-full shadow-[0_0_20px_rgba(var(--glow-primary),0.3)]">
                  <p className="text-sm sm:text-base font-bold text-theme-text-inverse tracking-wide whitespace-nowrap">{testimonial.highlight}</p>
                </div>
              </div>
            )}
            <h4 className="text-xl sm:text-2xl text-theme-text-primary font-semibold">{testimonial.name}</h4>
            <p className="text-base sm:text-lg text-theme-glow-primary font-medium">{testimonial.role}</p>
          
          </div>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  // Testimonials page SEO metadata
  const seoTitle = 'Client Testimonials';
  const seoDescription = 'Read real success stories and testimonials from TopEdge AI clients. See how our AI solutions deliver results across industries and drive business growth.';
  const isMobile = window.innerWidth < 768;

  return (
    <>
      <SEO title="Testimonials | TopEdge AI" description="Hear from businesses and clients who have transformed their operations with TopEdge AI's advanced voice agents, chatbots, and automation solutions." />
      {/* BreadcrumbList Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://topedge.ai/'
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Testimonials',
                'item': 'https://topedge.ai/testimonials'
              }
            ]
          })
        }}
      />
      <div className="min-h-screen bg-theme-bg-primary">
      <Navbar />
      <section className="relative py-8 sm:py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-theme-bg-primary via-theme-bg-surface to-theme-bg-primary" />
          <motion.div 
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 20%, rgba(var(--glow-primary), 0.15) 0%, transparent 70%)',
                'radial-gradient(circle at 80% 80%, rgba(var(--glow-primary), 0.15) 0%, transparent 70%)',
                'radial-gradient(circle at 20% 20%, rgba(var(--glow-primary), 0.15) 0%, transparent 70%)'
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-glow-primary/10 border border-theme-glow-primary/20 mb-6">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm text-theme-glow-secondary">Trusted by Industry Leaders</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 sm:mb-8">
              <motion.span
                className="block bg-clip-text text-transparent bg-gradient-to-r from-theme-text-primary via-theme-glow-secondary to-theme-text-primary"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: '200% auto' }}
              >
                Real Results,
              </motion.span>
              <motion.span
                className="block bg-clip-text text-transparent bg-gradient-to-r from-theme-glow-primary to-theme-glow-secondary"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: '200% auto' }}
              >
                Real Impact
              </motion.span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-theme-text-secondary max-w-3xl mx-auto px-4 leading-relaxed">
              Discover how businesses are Growing <br/>with our Super AI - Support Squad
            </p>

            {/* Trust Indicators */}
            <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
              <StatCard number="98%" label="Success Rate" />
              <StatCard number="10x" label="Faster Response" />
              <StatCard number="60%" label="Cost Reduction" />
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <TrustIndicator icon={CheckCircle2} text="Enterprise-grade security" />
              <TrustIndicator icon={TrendingUp} text="Proven track record" />
              <TrustIndicator icon={Users} text="24/7 dedicated support" />
            </div>
          </motion.div>

          {/* Video and Image Testimonials */}
          <div className="space-y-8 mb-16">
            {testimonials.filter(t => t.video || t.image).map((testimonial) => (
              <div key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} isFirst={false} />
              </div>
            ))}
          </div>

          {/* Text Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.filter(t => !t.video && !t.image).map((testimonial) => (
              <div key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} isFirst={false} />
              </div>
            ))}
          </div>

          {/* Updated ROI-focused CTA Section */}
          <div className="mt-16 sm:mt-20 md:mt-24 text-center pb-12 sm:pb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-theme-text-primary mb-6 sm:mb-8">
              Calculate Your Potential ROI
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-theme-text-secondary mb-4">
                Our clients see an average of:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-theme-glow-primary/10 border border-theme-glow-primary/20">
                  <div className="text-3xl font-bold text-theme-glow-primary mb-2">60%</div>
                  <div className="text-sm text-theme-text-secondary">Cost Reduction</div>
                </div>
                <div className="p-4 rounded-xl bg-theme-glow-primary/10 border border-theme-glow-primary/20">
                  <div className="text-3xl font-bold text-theme-glow-primary mb-2">85%</div>
                  <div className="text-sm text-theme-text-secondary">Faster Response Time</div>
                </div>
                <div className="p-4 rounded-xl bg-theme-glow-primary/10 border border-theme-glow-primary/20">
                  <div className="text-3xl font-bold text-theme-glow-primary mb-2">3.5x</div>
                  <div className="text-sm text-theme-text-secondary">Revenue Growth</div>
                </div>
              </div>
              <p className="text-lg text-theme-text-secondary mb-8">
                Discover how much your business could save and grow with our AI solutions.
              </p>
              <a
                href="/roi"
                className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-xl bg-gradient-to-r from-theme-glow-primary to-theme-glow-secondary text-theme-text-inverse text-lg font-medium hover:shadow-lg hover:shadow-theme-glow-primary/30 transition-all duration-300"
              >
                Calculate Your ROI
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
};

export default Testimonials;