import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Code, Zap, Rocket, FileSearch, Database, Bot, Gauge, Workflow, Settings, TrendingUp } from 'lucide-react';

const DevelopmentProcess = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  const steps = [
    {
      number: "01",
      title: "AI Strategy Planning",
      description: "Define your AI agent's capabilities and objectives",
      color: "from-theme-glow-primary/80 to-theme-text-accent/80",
      icon: Brain,
      features: [
        "Requirements Analysis",
        "AI Capability Planning",
        "Architecture Design",
        "Technology Selection"
      ]
    },
    {
      number: "02",
      title: "Data & Model Design",
      description: "Design the perfect AI model architecture",
      color: "from-theme-glow-secondary/80 to-theme-glow-accent/80",
      icon: Database,
      features: [
        "Data Strategy",
        "Model Architecture",
        "Training Pipeline",
        "Testing Framework"
      ]
    },
    {
      number: "03",
      title: "AI Development",
      description: "Build and train your intelligent agent",
      color: "from-orange-400/80 to-red-400/80",
      icon: Bot,
      features: [
        "Model Training",
        "Fine-tuning",
        "Integration Testing",
        "Performance Optimization"
      ]
    },
    {
      number: "04",
      title: "Deployment & Scale",
      description: "Launch and optimize your AI solution",
      color: "from-emerald-400/80 to-teal-400/80",
      icon: Gauge,
      features: [
        "Production Deployment",
        "Performance Monitoring",
        "Continuous Learning",
        "Scale Optimization"
      ]
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-16 sm:py-24 overflow-hidden bg-theme-bg-primary"
      style={{ willChange: 'transform' }}
    >
      <motion.div
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Title */}
        <div className="text-center mb-16 sm:mb-24">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-bg-secondary/20 border border-theme-border-accent/20 mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Bot className="w-4 sm:w-5 h-4 sm:h-5 text-theme-text-accent" />
            <span className="text-xs sm:text-sm font-medium text-theme-text-accent">AI Development Process</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight bg-gradient-to-r from-theme-text-primary via-theme-text-accent to-theme-text-primary text-transparent bg-clip-text text-center px-4"
          >
            Building Your AI Agent
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-xl text-theme-text-secondary max-w-3xl mx-auto px-4 text-center"
          >
            A systematic approach to developing powerful AI solutions
          </motion.p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-theme-glow-primary via-theme-glow-secondary to-theme-glow-accent transform -translate-y-1/2 opacity-20" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative mt-16 sm:mt-0"
              >
                {/* Step Number */}
                <motion.div 
                  className="absolute -top-12 sm:-top-16 left-0 right-0 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className={`text-6xl sm:text-8xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent inline-block mx-auto`}>
                    {step.number}
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div 
                  className="relative z-10 p-6 sm:p-8 rounded-2xl bg-theme-bg-secondary/20 backdrop-blur-xl border border-theme-border-primary/30 group text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  style={{ willChange: 'transform' }}
                >
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <step.icon className={`w-5 sm:w-6 h-5 sm:h-6 bg-gradient-to-r ${step.color} bg-clip-text text-transparent`} />
                    <h3 className="text-xl sm:text-2xl font-semibold bg-gradient-to-r from-theme-text-primary to-theme-text-accent bg-clip-text text-transparent">
                      {step.title}
                    </h3>
                  </div>
                  
                  <p className="text-theme-text-secondary mb-6 text-sm sm:text-base">
                    {step.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 sm:space-y-3">
                    {step.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="flex items-center justify-center gap-2 text-theme-text-secondary text-sm sm:text-base"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.color}`} />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Hover Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, rgba(var(--glow-primary), 0.1) 0%, transparent 70%)`
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Add floating icons as background decorations */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <motion.div
            className="absolute left-32 top-14 text-blue-400/40"
            animate={{ y: [-10, 10, -10], rotate: [0, 360, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Workflow className="w-20 h-20" />
          </motion.div>
          <motion.div
            className="absolute right-36 bottom-24 text-yellow-400/50"
            animate={{ x: [8, -8, 8], rotate: [0, -180, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <Settings className="w-16 h-16" />
          </motion.div>
          <motion.div
            className="absolute left-1/3 bottom-36 text-emerald-400/50"
            animate={{ y: [12, -12, 12], rotate: [0, 180, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          >
            <TrendingUp className="w-16 h-16" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default DevelopmentProcess;
