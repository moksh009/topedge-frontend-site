import SEO from '../components/SEO';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSection from '../components/sections/HeroSection';
import ScrollingText from '../components/sections/ScrollingText';
// import AIAgentSection from '../components/sections/AIAgentSection';
// import InvisibleApproachSection from '../components/sections/InvisibleApproachSection';    
import { ComparisonSection } from '../components/sections/ComparisonSection';
import InfiniteIconsSection from '../components/sections/InfiniteIconsSection';
import ProductShowcase from '../components/sections/ProductShowcase';
import DevelopmentProcess from '../components/sections/DevelopmentProcess';
import { StatsSection } from '../components/sections/StatsSection';
import { CTASection } from '../components/sections/CTASection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import AutomationAppsShowcase from '../components/sections/AutomationAppsShowcase';
import AICallerSection from '../components/sections/AICallerSection';
import AdvancedChatbotSection from '../components/sections/AdvancedChatbotSection';
import AIBenefitsShowcase from '../components/sections/AIBenefitsShowcase';

import ROICalculator from '../components/sections/pricing/ROICalculator';

const Home = () => {
  // Home page SEO metadata
  const seoTitle = 'TopEdge AI | AI Voice & Chatbot Automation for Business';
  const seoDescription = 'Automate your business with advanced AI voice agents, WhatsApp automation, and chatbots. Improve efficiency, boost leads, and enhance customer experience with TopEdge AI.';
  const { scrollYProgress } = useScroll();
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <SEO
        title="TopEdge AI | Intelligent Automation for Modern Business"
        description="Empower your business with TopEdge AI’s intelligent automation solutions. Streamline operations, boost productivity, and deliver outstanding customer experiences with cutting-edge AI voice agents and chat automation—trusted by forward-thinking companies."
        keywords="AI automation, TopEdge AI, voice agents, chat automation, business efficiency, digital transformation, customer experience, workflow automation, AI technology"
        type="website"
        url="https://topedge.ai/"
        image="/logo.png"
        canonical="https://topedge.ai/"
        ogTitle="TopEdge AI | Intelligent Automation for Modern Business"
        ogDescription="Reimagine your business with TopEdge AI—seamless automation, smarter workflows, and next-level customer engagement. Discover the future of business efficiency."
        ogImage="/logo.png"
        ogUrl="https://topedge.ai/"
        twitterTitle="TopEdge AI | Intelligent Automation for Modern Business"
        twitterDescription="Experience the power of AI-driven automation. TopEdge AI helps you work smarter, serve customers better, and stay ahead in a digital world."
        twitterImage="/logo.png"
        twitterCard="summary_large_image"
      />
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
              }
            ]
          })
        }}
      />
      {/* Organization Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'name': 'TopEdge AI',
            'url': 'https://topedge.ai/',
            'logo': {
              '@type': 'ImageObject',
              'url': 'https://topedge.ai/logo.png'
            },
            'sameAs': [
              'https://www.linkedin.com/company/topedge-ai/',
              'https://twitter.com/topedgeai'
            ]
          })
        }}
      />
      {/* Website Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            'name': 'TopEdge AI',
            'url': 'https://topedge.ai/'
          })
        }}
      />
      <div className="relative min-h-screen bg-theme-bg-primary overflow-hidden">
        {/* Internal Links for SEO */}
        <nav className="hidden">
          <a href="/" title="TopEdge AI Home">TopEdge AI</a>
          <a href="/blog" title="TopEdge AI Blog">TopEdge AI Blog</a>
          <a href="/services" title="TopEdge AI Services">TopEdge AI Services</a>
        </nav>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-theme-glow-primary via-theme-glow-secondary to-theme-glow-accent transform origin-left z-50"
        style={{ scaleX: progressBarWidth }}
      />

      {/* Subtle Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Very light grid lines - preserving the existing structure but lightening them */}
        <div className="absolute inset-0">
          {/* Vertical Lines */}
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `repeating-linear-gradient(to right, rgb(var(--text-primary) / 0.02) 0px, rgb(var(--text-primary) / 0.02) 1px, transparent 1px, transparent calc(100% / 40))`,
              backgroundSize: '100% 100%'
            }}
          />
          
          {/* Horizontal Lines */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(to bottom, rgb(var(--text-primary) / 0.02) 0px, rgb(var(--text-primary) / 0.02) 1px, transparent 1px, transparent calc(100% / 40))`,
              backgroundSize: '100% 100%'
            }}
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-theme-bg-primary via-theme-bg-primary/50 to-theme-bg-primary" />
        
        {/* Animated Glow Effects - Using lighter theme colors */}
        <motion.div
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-theme-glow-primary/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-1/4 right-1/4 w-96 h-96 bg-theme-glow-secondary/20 rounded-full blur-3xl"
          animate={{
            y: [-50, 50, -50],
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Particle Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h1 className="sr-only">TopEdge AI</h1>
      <HeroSection />
        <div className="relative bg-theme-bg-primary">
          
          {/* <div className="-mt-16 sm:mt-8 md:mt-16">
            <AIAgentSection />
          </div> */}
           {/* New Benefits Section */}
           <div className="mt-0 sm:mt-8 md:mt-16">
            <AIBenefitsShowcase />
          </div>
          
          {/* ROI Calculator Section */}
          <div className="mt-0 sm:mt-8 md:mt-16">
            <ROICalculator />
          </div>
          
          {/* <div className="-mt-16 sm:mt-0">
            <InvisibleApproachSection />
          </div> */}
          
          <div className="-mt-12 sm:mt-0">
            <ScrollingText />
          </div>
          
          {/* Existing Sections */}
          <div className="mt-0 sm:mt-8 md:mt-16">
            <AutomationAppsShowcase />
          </div>
          <div className="mt-0 sm:mt-8 md:mt-16">
            <AICallerSection />
          </div>
          
        
          
          <div className="mt-0 sm:mt-8 md:mt-16">
            <AdvancedChatbotSection />
          </div>
          
          {/* Existing Sections */}
          <div className="mt-0 sm:mt-8 md:mt-16">
            <ComparisonSection />
          </div>
          {/* <div className="mt-0 sm:mt-8 md:mt-16">
            <InfiniteIconsSection />
          </div> */}
          <div className="mt-0 sm:mt-8 md:mt-16">
            <ProductShowcase />
          </div>
          <div className="mt-0 sm:mt-8 md:mt-16">
            <DevelopmentProcess />
          </div>
          <div className="-mt-16 sm:mt-8 md:mt-16">
            <StatsSection />
          </div>
          
          {/* Testimonials strategically placed before CTA */}
          {/* <div className="mt-8 sm:mt-16 md:mt-24 mb-16 sm:mb-24">
            <TestimonialsSection />
          </div> */}
          
          <div className="mt-0 sm:mt-8 md:mt-16">
            <CTASection />
          </div>
        </div>
      </div>

    </div>
    </>
  );
};

export default Home;