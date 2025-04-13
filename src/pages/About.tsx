import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Code2, Brain, Cpu, Globe, Shield, Zap, Users, Trophy } from 'lucide-react';
import AboutHero from '../components/sections/about/AboutHero';
import AboutMission from '../components/sections/about/AboutMission';
import AboutValues from '../components/sections/about/AboutValues';
import AboutTimeline from '../components/sections/about/AboutTimeline';
import AboutStats from '../components/sections/about/AboutStats';
import AboutTeam from '../components/sections/about/AboutTeam';

// Premium CTA Component
const AboutCTA: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0A84FF]/5 to-black" />
        
        {/* Animated Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#0A84FF] rounded-full"
            animate={{
              y: [0, -100],
              x: [0, Math.random() * 50 - 25],
              scale: [0, 1, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '0%',
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="relative container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Glowing Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
            className="h-px w-24 bg-gradient-to-r from-transparent via-[#0A84FF] to-transparent mx-auto mb-8"
          />

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-[#0A84FF] to-white bg-clip-text text-transparent"
          >
            Ready to Transform Your Business?
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-300 mb-12"
          >
            Join the businesses that are already saving time and maximizing opportunities with our AI solutions.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link to="/book-appointment">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-[#0A84FF] to-[#5E5CE6] rounded-full overflow-hidden"
              >
                {/* Button Background Glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#0A84FF] to-[#5E5CE6] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                
                {/* Button Content */}
                <span className="relative text-lg font-semibold text-white">
                  Let's Transform My Business
                </span>
                <Sparkles className="relative w-5 h-5 text-white animate-pulse" />
                <ArrowRight className="relative w-5 h-5 text-white group-hover:translate-x-1 transition-transform duration-300" />

                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

// Developer Showcase Component
const DeveloperShowcase: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const expertiseAreas = [
    {
      icon: Code2,
      title: "Elite Development",
      description: "Fortune 500 veterans crafting enterprise solutions",
      stats: "100K+ Production Code"
    },
    {
      icon: Brain,
      title: "AI Innovation",
      description: "Next-gen AI solutions with enterprise scalability",
      stats: "25+ AI Models"
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Bank-grade encryption and data protection",
      stats: "Zero Breaches"
    },
    {
      icon: Users,
      title: "Client Success",
      description: "Instant support and dedicated assistance 24/7",
      stats: "100% Satisfaction Rate"
    }
  ];

  const offerings = [
    {
      icon: Code2,
      value: "Free",
      title: "Initial Setup"
    },
    {
      icon: Cpu,
      value: "Included",
      title: "Deployment"
    },
    {
      icon: Zap,
      value: "24/7",
      title: "Support"
    },
    {
      icon: Users,
      value: "Lifetime",
      title: "Updates"
    }
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-black">
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0A84FF]/5 to-black" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0" style={{ opacity: 0.03 }}>
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute h-[1px] w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent transform"
              style={{ top: `${i * 5}%` }}
            />
          ))}
        </div>

        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            <span className="text-blue-400 font-medium tracking-wider text-sm uppercase">Elite Development Team</span>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          </div>
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-blue-400 to-white bg-clip-text text-transparent">
              Crafting Digital Excellence
            </span>
          </h2>
        </motion.div>

        {/* Enhanced Expertise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative p-6 rounded-xl bg-gradient-to-b from-blue-500/10 to-transparent backdrop-blur-sm border border-blue-500/10 hover:border-blue-500/30 transition-all duration-500">
                {/* Card Glow Effect */}
                <div className="absolute inset-0 rounded-xl bg-blue-500/5 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500" />
                
                <div className="relative space-y-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-blue-500/20 to-transparent">
                    <area.icon className="w-7 h-7 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {area.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {area.description}
                  </p>
                  <div className="pt-4 border-t border-blue-500/10">
                    <div className="text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors duration-300">
                      {area.stats}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Offerings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Decorative Line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8">
            {offerings.map((offering, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group text-center p-6"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-transparent mb-4 group-hover:from-blue-500/30 transition-all duration-300">
                  <offering.icon className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                  {offering.value}
                </h4>
                <p className="text-gray-400 text-sm font-medium">
                  {offering.title}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About: React.FC = () => {
  useEffect(() => {
    // Add scroll animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px'
      }
    );

    // Observe all elements with animation classes
    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll();
  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <main className="bg-black min-h-screen relative">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0A84FF] to-[#5E5CE6] transform origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section - Fade and Scale */}
      <div className="animate-on-scroll scale-in">
        <AboutHero />
      </div>

      {/* Mission Section - Slide from Left */}
      <div className="animate-on-scroll slide-from-left">
        <AboutMission />
      </div>

      {/* Values Section - Rotate In */}
      <div className="animate-on-scroll rotate-in">
        <AboutValues />
      </div>

      {/* Stats Section - Bounce In */}
      <div className="animate-on-scroll bounce-in">
        <AboutStats />
      </div>
      
      {/* Timeline Section - Clip Path */}
      <div className="animate-on-scroll clip-path-in">
        <AboutTimeline />
      </div>

      {/* Developer Showcase - Fade Up */}
      <div className="animate-on-scroll fade-up">
        <DeveloperShowcase />
      </div>

      {/* CTA Section - Fade Up */}
      <div className="animate-on-scroll fade-up">
        <AboutCTA />
      </div>

      {/* Team Section - Blur In
      <div className="animate-on-scroll blur-in">
        <AboutTeam />
      </div> */}
    </main>
  );
};

export default About;