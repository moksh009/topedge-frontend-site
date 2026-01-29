import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Globe, Shield, Zap, Smile, MessageCircle } from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Never miss a lead. Your AI chatbot works round the clock to engage visitors."
  },
  {
    icon: Zap,
    title: "Instant Responses",
    description: "Zero wait times. Provide immediate answers to common questions."
  },
  {
    icon: Globe,
    title: "Multilingual",
    description: "Break language barriers. Automatically converse in over 95 languages."
  },
  {
    icon: Shield,
    title: "Secure",
    description: "Bank-grade encryption and GDPR compliance ensure data safety."
  },
  {
    icon: Smile,
    title: "Natural",
    description: "Powered by advanced LLMs to understand context and intent."
  },
  {
    icon: MessageCircle,
    title: "Omnichannel",
    description: "Deploy once, run on Website, WhatsApp, and Instagram."
  }
];

const ChatbotBenefitsSection = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-50/50 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-50/50 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
             initial={{ opacity: 0, y: 10 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold uppercase tracking-wide mb-6 shadow-sm"
          >
            <Zap className="w-3 h-3" />
            Supercharge Support
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1d1d1f] mb-6 tracking-tight"
          >
            Why Choose Our <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI Chatbots</span>?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[#86868b] leading-relaxed"
          >
            Automate support, drive sales, and delight customers with an intelligent assistant that never sleeps.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group p-8 rounded-[2rem] bg-[#F5F5F7] hover:bg-white hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 border border-transparent hover:border-blue-100 relative overflow-hidden"
            >
              <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 relative z-10">
                <benefit.icon className="w-7 h-7 text-[#1d1d1f] group-hover:text-blue-600 transition-colors duration-500" />
              </div>
              <h3 className="text-xl font-semibold text-[#1d1d1f] mb-3 relative z-10 group-hover:text-blue-600 transition-colors">
                {benefit.title}
              </h3>
              <p className="text-[#86868b] leading-relaxed relative z-10 group-hover:text-gray-600 transition-colors">
                {benefit.description}
              </p>
              
              {/* Hover Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChatbotBenefitsSection;
