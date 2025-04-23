import { motion } from 'framer-motion';
import { Bot, Brain, Code, MessageSquare, Zap, Settings } from 'lucide-react';
import React from 'react';

const features = [
  {
    icon: <Bot className="w-6 h-6" />,
    title: "AI-Powered Chatbots",
    description: "Custom chatbots that understand context and provide human-like interactions across WhatsApp, Instagram, and web platforms.",
    benefits: ["24/7 Customer Support", "Multi-platform Integration", "Natural Language Processing"]
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Machine Learning Solutions",
    description: "Advanced ML models that learn from your data to automate processes and make intelligent decisions.",
    benefits: ["Predictive Analytics", "Pattern Recognition", "Automated Learning"]
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "Custom AI Development",
    description: "Tailored AI solutions designed to meet your specific business needs and challenges.",
    benefits: ["Scalable Architecture", "Custom Algorithms", "Performance Optimization"]
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Conversational AI",
    description: "Natural language processing systems that enable meaningful conversations with users.",
    benefits: ["Context Awareness", "Multi-language Support", "Sentiment Analysis"]
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "AI Integration Services",
    description: "Seamless integration of AI capabilities into your existing systems and workflows.",
    benefits: ["API Integration", "System Compatibility", "Real-time Processing"]
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "AI Consultation",
    description: "Expert guidance on implementing AI solutions that align with your business goals.",
    benefits: ["Strategy Development", "Technical Planning", "ROI Analysis"]
  }
];

export const ServiceFeatures = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Cutting-Edge AI Solutions
          </h2>
          <p className="text-xl text-gray-400">
            Transform your business with our advanced AI technologies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-blue-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <div className="text-blue-400">
                  {feature.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 mb-4">
                {feature.description}
              </p>
              
              <ul className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <li
                    key={benefitIndex}
                    className="flex items-center text-sm text-gray-300"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
