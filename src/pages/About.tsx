import React, { useEffect, Suspense } from 'react';
import SEO from '../components/SEO';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Code2, Brain, Cpu, Globe, Shield, Zap, Users, Trophy, Rocket, Star } from 'lucide-react';

// Lazy load components for better initial load time
const AboutHero = React.lazy(() => import('../components/sections/about/AboutHero'));
const AboutMission = React.lazy(() => import('../components/sections/about/AboutMission'));
const AboutValues = React.lazy(() => import('../components/sections/about/AboutValues'));
const AboutTimeline = React.lazy(() => import('../components/sections/about/AboutTimeline'));
const AboutStats = React.lazy(() => import('../components/sections/about/AboutStats'));
const AboutTeam = React.lazy(() => import('../components/sections/about/AboutTeam'));

// Loading fallback component
const SectionLoader = () => (
  <div className="min-h-screen bg-theme-bg-primary flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-theme-glow-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// Premium CTA Component
const AboutCTA: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Floating Icons as Background Decorations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute left-10 top-10 text-blue-400/20"
          animate={{ y: [-12, 12, -12], rotate: [0, 360, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-20 h-20" />
        </motion.div>
        <motion.div
          className="absolute right-20 bottom-16 text-yellow-400/20"
          animate={{ x: [10, -10, 10], rotate: [0, -180, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
        >
          <Rocket className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute left-1/3 bottom-12 text-emerald-400/20"
          animate={{ y: [8, -8, 8], rotate: [0, 180, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <Star className="w-16 h-16" />
        </motion.div>
      </div>

      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-theme-bg-primary via-theme-glow-primary/5 to-theme-bg-primary" />
        
        {/* Animated Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-theme-glow-primary rounded-full"
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
            className="h-px w-24 bg-gradient-to-r from-transparent via-theme-glow-primary to-transparent mx-auto mb-8"
          />

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-theme-text-primary via-theme-glow-primary to-theme-text-primary bg-clip-text text-transparent"
          >
            Ready to Transform Your Business?
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl text-theme-text-secondary mb-12"
          >
            Join the smart businesses already saving up to $10K in revenue each week/month with our super AI agents.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link
              to="/contact"
            >
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={{
                  hover: { scale: 1.05 },
                  tap: { scale: 0.95 }
                }}
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full w-full sm:w-auto overflow-hidden"
              >
                {/* Base Glow Layer */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-theme-glow-primary/20 via-theme-glow-accent/30 to-theme-glow-primary/20" />
                {/* Outer Glow */}
                <div className="absolute inset-0 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 rounded-full bg-gradient-to-r from-theme-glow-primary/30 via-theme-glow-accent/40 to-theme-glow-primary/30 opacity-50 group-hover:opacity-100 transition-all duration-500 rounded-full" />
                {/* Button Background */}
                <div className="absolute inset-0 bg-theme-bg-surface border-[1.5px] rounded-full border-theme-border-accent/50 group-hover:border-theme-border-accent transition-all duration-300" />
                {/* Button Content */}
                <div className="relative flex items-center gap-3">
                  <span className="text-base font-semibold text-theme-text-primary">
                    Transform My Business
                  </span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowRight className="w-5 h-5 text-theme-text-accent group-hover:text-theme-text-primary transition-colors duration-300" />
                  </motion.div>
                </div>
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
    <section className="relative py-32 overflow-hidden">
      {/* Add floating icons as background decorations */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute left-10 top-10 text-blue-400/20"
          animate={{ y: [-15, 15, -15], rotate: [0, 360, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        >
          <Code2 className="w-20 h-20" />
        </motion.div>
        <motion.div
          className="absolute right-10 bottom-10 text-yellow-400/20"
          animate={{ y: [10, -10, 10], rotate: [0, -360, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        >
          <Trophy className="w-16 h-16" />
        </motion.div>
        <motion.div
          className="absolute left-1/2 top-1/4 text-emerald-400/20"
          animate={{ x: [-10, 10, -10], rotate: [0, 180, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        >
          <Shield className="w-16 h-16" />
        </motion.div>
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
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-theme-border-accent/20 to-transparent" />
            <span className="text-theme-text-accent font-medium tracking-wider text-sm uppercase">Elite Development Team</span>
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-theme-border-accent/20 to-transparent" />
          </div>
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-theme-text-primary via-theme-text-accent to-theme-text-primary bg-clip-text text-transparent">
              Crafting Digital Excellence
            </span>
          </h2>
        </motion.div>

        {/* Enhanced Expertise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {expertiseAreas.map((area, index) => (
            <div
              key={index}
              className="relative group rounded-2xl p-0.5 bg-gradient-to-br from-blue-400/30 via-blue-200/10 to-blue-500/30 shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative p-6 rounded-2xl bg-theme-bg-surface/80 backdrop-blur-xl">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-gradient-to-br from-blue-400/20 to-transparent shadow-lg mb-4">
                  <area.icon className="w-7 h-7 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-blue-700 group-hover:text-blue-500 transition-colors duration-300 text-center">{area.title}</h3>
                <p className="text-theme-text-secondary text-sm leading-relaxed text-center">{area.description}</p>
                <div className="pt-4 border-t border-blue-200/30 mt-4">
                  <div className="text-blue-500 text-sm font-semibold group-hover:text-blue-700 transition-colors duration-300 text-center">{area.stats}</div>
                </div>
              </div>
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-400/20 via-transparent to-blue-500/20 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Enhanced Offerings */}
        <div className="relative">
          {/* Decorative Line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-theme-border-accent/20 to-transparent" />
          
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8">
            {offerings.map((offering, index) => (
              <div
                key={index}
                className="relative group rounded-2xl p-0.5 bg-gradient-to-br from-blue-400/30 via-blue-200/10 to-blue-500/30 shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative flex flex-col items-center justify-center rounded-2xl bg-theme-bg-surface/80 backdrop-blur-xl p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400/20 to-transparent mb-4 shadow-md">
                    <offering.icon className="w-8 h-8 text-blue-500 group-hover:text-blue-600 transition-colors duration-300" />
                  </div>
                  <h4 className="text-2xl font-bold text-blue-700 mb-2 group-hover:text-blue-500 transition-colors duration-300 text-center">{offering.value}</h4>
                  <p className="text-theme-text-secondary text-sm font-medium text-center">{offering.title}</p>
                </div>
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-blue-400/20 via-transparent to-blue-500/20 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const About: React.FC = () => {
  // About page SEO metadata
  const seoTitle = 'About Us';
  const seoDescription = 'Discover TopEdge AI’s mission, values, and the expert team behind our industry-leading AI voice and chatbot solutions. Learn how we deliver 300% ROI and transform business automation.';
  const { scrollYProgress } = useScroll();

  return (
    <>

      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords="About TopEdge AI, AI agency team, AI mission, business automation, AI chatbot experts, voice AI, company values, TopEdge leadership"
        type="website"
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
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'About',
                'item': 'https://topedge.ai/about'
              }
            ]
          })
        }}
      />
      <main className="bg-theme-bg-primary min-h-screen relative">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-theme-glow-primary to-theme-glow-secondary transform origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Sections */}
      <Suspense fallback={<SectionLoader />}>
        <AboutHero />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <AboutMission />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <AboutValues />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <AboutStats />
      </Suspense>

      <Suspense fallback={<SectionLoader />}>
        <AboutTimeline />
      </Suspense>

      {/* Developer Showcase - Adjusted spacing for mobile */}
      <div className="animate-on-scroll fade-up sm:py-0 py-0 -mt-8 sm:mt-0">
        <DeveloperShowcase />
      </div>

      {/* CTA Section - Adjusted spacing for mobile */}
      <div className="animate-on-scroll fade-up sm:py-0 py-0 -mt-8 sm:mt-0">
        <AboutCTA />
      </div>

      {/* Team Section - Commented out as in original */}
      {/* <div className="animate-on-scroll blur-in">
        <AboutTeam />
      </div> */}
    </main>
    </>
  );
};

export default About;