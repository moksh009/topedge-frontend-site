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
import { ParticleField } from '@/components/ui/ParticleField';

const Home = () => {
  const { scrollYProgress } = useScroll();
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform origin-left z-50"
        style={{ scaleX: progressBarWidth }}
      />

      {/* Grid Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Lines */}
        <div className="absolute inset-0">
          {/* Vertical Lines */}
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `repeating-linear-gradient(to right, rgb(255 255 255 / 0.02) 0px, rgb(255 255 255 / 0.02) 1px, transparent 1px, transparent calc(100% / 40))`,
              backgroundSize: '100% 100%'
            }}
          />
          
          {/* Horizontal Lines */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(to bottom, rgb(255 255 255 / 0.02) 0px, rgb(255 255 255 / 0.02) 1px, transparent 1px, transparent calc(100% / 40))`,
              backgroundSize: '100% 100%'
            }}
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />
        
        {/* Animated Glow Effects */}
        <motion.div
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-violet-500/30 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl"
          animate={{
            y: [-50, 50, -50],
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
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
      <div className="fixed inset-0 pointer-events-none">
        <ParticleField />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <div className="relative bg-black">
          <div className="-mt-12 sm:mt-0">
            <ScrollingText />
          </div>
          {/* <div className="-mt-16 sm:mt-8 md:mt-16">
            <AIAgentSection />
          </div> */}
           {/* New Benefits Section */}
           <div className="mt-0 sm:mt-8 md:mt-16">
            <AIBenefitsShowcase />
          </div>
          
          {/* <div className="-mt-16 sm:mt-0">
            <InvisibleApproachSection />
          </div> */}
          
         
          
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
          <div className="mt-0 sm:mt-8 md:mt-16">
            <InfiniteIconsSection />
          </div>
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
          <div className="mt-8 sm:mt-16 md:mt-24 mb-16 sm:mb-24">
            <TestimonialsSection />
          </div>
          
          <div className="mt-0 sm:mt-8 md:mt-16">
            <CTASection />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;