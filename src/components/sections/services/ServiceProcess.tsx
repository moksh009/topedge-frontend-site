import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FileSearch, Code, Zap, Rocket, Bot, Phone } from 'lucide-react';

export const ServiceProcess = () => {
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
      title: "System Design",
      description: "Design natural voice interactions and conversation flows",
      color: "from-theme-glow-accent to-theme-glow-accent"
    },
    {
      number: "02",
      title: "Agent Training",
      description: "Train the AI Agent with domain knowledge and responses",
      color: "from-theme-glow-secondary to-theme-glow-primary"
    },
    {
      number: "03",
      title: "Integration",
      description: "Integrate voice capabilities and real-time processing",
      color: "from-theme-glow-accent to-theme-glow-secondary"
    },
    {
      number: "04",
      title: "Launch",
      description: "Deploy your AI agent for seamless voice interactions",
      color: "from-theme-glow-primary to purple"
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 overflow-hidden bg-theme-bg-primary"
    >
      <motion.div
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Title */}
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold tracking-tight bg-gradient-to-r from-theme-text-primary via-theme-glow-accent to-theme-text-primary bg-clip-text text-transparent"
          >
            Voice Agent Process
          </motion.h2>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-theme-glow-primary via-theme-glow-accent to-theme-glow-secondary transform -translate-y-1/2 opacity-20" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-25 sm:gap-12 relative">
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
                  className="absolute -top-16 left-0 right-0 flex justify-center sm:block sm:left-0"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={`text-8xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent text-center sm:text-left`}>
                    {step.number}
                  </div>
                </motion.div>

                {/* Content */}
                <div className="relative z-10 p-8 rounded-2xl bg-theme-bg-secondary/50 backdrop-blur-xl border border-theme-border-primary">
                  <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-theme-text-primary to-theme-text-secondary bg-clip-text text-transparent">
                    {step.title}
                  </h3>
                  <p className="text-theme-text-secondary/90">
                    {step.description}
                  </p>

                  {/* Interactive Elements */}
                  <motion.div
                    className="mt-6 flex items-center space-x-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-theme-glow-primary to-theme-glow-accent" />
                    <div className="text-sm text-theme-text-secondary">Learn more</div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
