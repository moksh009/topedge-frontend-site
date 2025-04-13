import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Code, Zap, Rocket, FileSearch, Database, Bot, Gauge } from 'lucide-react';

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
      color: "from-blue-500/80 to-cyan-500/80",
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
      color: "from-purple-500/80 to-pink-500/80",
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
      color: "from-orange-500/80 to-red-500/80",
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
      color: "from-emerald-500/80 to-teal-500/80",
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
      className="relative min-h-screen py-24 overflow-hidden sf-pro-display bg-black"
    >
      <motion.div
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Title */}
        <div className="text-center mb-24">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-950/40 border border-indigo-500/30 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Bot className="w-5 h-5 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-300">AI Development Process</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 via-blue-500 to-indigo-400 text-transparent bg-clip-text"
          >
            Building Your AI Agent
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-xl text-gray-400 max-w-3xl mx-auto"
          >
            A systematic approach to developing powerful AI solutions
          </motion.p>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-500 transform -translate-y-1/2 opacity-20" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative mt-24 sm:mt-0"
              >
                {/* Step Number */}
                <motion.div 
                  className="absolute -top-16 left-0 right-0 text-center"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={`text-8xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent inline-block mx-auto`}>
                    {step.number}
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div 
                  className="relative z-10 p-8 rounded-2xl bg-gray-900/50 backdrop-blur-xl border border-gray-800 group"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(79, 70, 229, 0.2)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <step.icon className={`w-6 h-6 bg-gradient-to-r ${step.color} bg-clip-text text-transparent`} />
                    <h3 className="text-2xl font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                      {step.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-400/90 mb-6">
                    {step.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3">
                    {step.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="flex items-center gap-2 text-gray-400/80"
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
                      background: `radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.1) 0%, transparent 70%)`
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default DevelopmentProcess;
