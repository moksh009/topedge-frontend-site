import { motion } from 'framer-motion';
import { MessageSquare, Database, Bot, Code } from 'lucide-react';

export const ChatbotProcess = () => {
  const steps = [
    {
      number: "01",
      title: "Design",
      description: "Design conversational flows and user interactions",
      color: "from-theme-glow-primary to-theme-glow-accent"
    },
    {
      number: "02",
      title: "Train",
      description: "Train the chatbot with your business knowledge",
      color: "from-theme-glow-secondary to-theme-glow-primary"
    },
    {
      number: "03",
      title: "Test",
      description: "Rigorous testing and continuous improvement",
      color: "from-theme-glow-accent to-theme-glow-secondary"
    },
    {
      number: "04",
      title: "Deploy",
      description: "Seamless integration with your platforms",
      color: "from-theme-glow-primary to-theme-glow-secondary"
    }
  ];

  return (
    <section className="relative min-h-screen py-24 overflow-hidden bg-theme-bg-primary">
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute left-10 top-32"
          animate={{ y: [-25, 10, -25], rotate: [0, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Bot className="w-16 h-16 text-purple-400/15" />
        </motion.div>
        <motion.div
          className="absolute right-20 top-1/2"
          animate={{ y: [20, -20, 20], rotate: [360, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        >
          <MessageSquare className="w-20 h-20 text-blue-400/15" />
        </motion.div>
        <motion.div
          className="absolute left-1/2 bottom-20 -translate-x-1/2"
          animate={{ y: [15, -15, 15], rotate: [0, 360] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Database className="w-16 h-16 text-theme-glow-accent/15" />
        </motion.div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-24">
          <h2 className="text-6xl md:text-8xl font-bold tracking-tight bg-gradient-to-r from-theme-text-primary via-theme-glow-accent to-theme-text-primary bg-clip-text text-transparent">
            Chatbot Process
          </h2>
        </div>

        {/* Process Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-theme-glow-primary via-theme-glow-accent to-theme-glow-secondary transform -translate-y-1/2 opacity-20" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-25 sm:gap-12 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative mt-24 sm:mt-0">
                {/* Step Number */}
                <div className="absolute -top-16 left-0 right-0 flex justify-center sm:justify-start">
                  <div className={`text-8xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent text-center sm:text-left`}>
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 rounded-2xl bg-theme-bg-secondary/50 backdrop-blur-xl border border-theme-border-primary">
                  <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-theme-text-primary to-theme-text-secondary bg-clip-text text-transparent text-center sm:text-left">
                    {step.title}
                  </h3>
                  <p className="text-theme-text-secondary/90 text-center sm:text-left">
                    {step.description}
                  </p>

                  {/* Interactive Elements */}
                  <div className="mt-6 flex items-center justify-center sm:justify-start space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-theme-glow-primary to-theme-glow-accent" />
                    <div className="text-sm text-theme-text-secondary">Learn more</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
