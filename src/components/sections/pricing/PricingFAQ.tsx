import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What exactly does TopEdge offer?",
    answer: "TopEdge is an AI agency that provides 24/7 AI caller systems to handle your client calls automatically — answering queries, booking appointments, and capturing leads. We also offer a real-time dashboard that shows how your AI agents are performing with detailed analytics like call count, costs, summaries, and transcripts."
  },
  {
    question: "How can your AI agent help my business?",
    answer: "Our AI agents take care of routine and repetitive calls like answering FAQs, scheduling appointments, and collecting information — freeing up your staff's time and ensuring no call is ever missed, even after business hours."
  },
  {
    question: "What type of businesses is this for?",
    answer: "TopEdge is ideal for businesses like:\n• Clinics & Dental Offices\n• Real Estate Agencies\n• Local Service Providers\n• Lead Generation Agencies\nBasically, anyone who receives client inquiries and appointments by phone."
  },
  {
    question: "Do I need to install anything or change my current system?",
    answer: "Nope. Our system works with your current phone setup. We handle the backend — you just need to provide us with the call flow or intent, and we'll do the rest."
  },
  {
    question: "Can your AI speak in different languages or accents?",
    answer: "Yes! Our AI callers can be customized with neutral or regional accents (like Indian/US) and support multiple languages based on your target audience."
  },
  {
    question: "Will clients know they're talking to an AI?",
    answer: "Not unless you tell them. Our AI sounds human-like, understands natural language, and responds intelligently — most clients assume it's a real agent."
  },
  {
    question: "How do I know the performance of my AI agent?",
    answer: "You'll get access to a personalized TopEdge Dashboard where you can track:\n• Number of calls made\n• End reasons (e.g., successful, rejected, voicemail)\n• Cost per call\n• Transcripts\n• Summaries & key metrics\nIt's all in real-time, no waiting."
  },
  {
    question: "Is this better than hiring a human caller or VA?",
    answer: "Definitely. Our AI agent is faster, doesn't sleep, never forgets scripts, doesn't require training, and is available 24/7 — all at a fraction of the cost of a full-time employee."
  },
  {
    question: "How do I get started with TopEdge?",
    answer: "Just click on \"Get Started\" or book a demo. We'll understand your business needs, customize the AI, and deploy your first agent within 1–2 days."
  },
  {
    question: "What's the pricing model?",
    answer: "We follow a pay-as-you-go model — meaning you only pay based on the actual AI call activity, not a fixed subscription. It's transparent, affordable, and scales with your business."
  },
  {
    question: "Can I integrate this with my CRM or calendar system?",
    answer: "Yes! We can integrate with most CRMs, Google Calendar, and booking systems to automatically log appointments, follow-ups, and leads."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use industry-standard encryption and data handling practices. Your call data, summaries, and analytics are stored securely and visible only to you."
  },
  {
    question: "Can I customize what the AI says?",
    answer: "Yes, you have full control over the script, tone, and flow of the conversation. Our team helps you craft the perfect conversation based on your business needs."
  },
  {
    question: "What if I need support or want to make changes later?",
    answer: "We offer dedicated customer support and a user-friendly settings manager where you can update preferences, change scripts, or request adjustments anytime."
  }
];

const FAQItem = ({ question, answer, isOpen, onToggle, index }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition duration-300 blur"
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0
        }}
      />
      
      <motion.div
        className="relative p-6 bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl cursor-pointer overflow-hidden hover:border-purple-500/30 transition-colors duration-300"
        onClick={onToggle}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex justify-between items-center gap-4">
          <h3 className="text-lg font-semibold text-white">{question}</h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0"
          >
            <ChevronDown className="w-5 h-5 text-purple-400" />
          </motion.div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <motion.p 
                className="mt-4 text-gray-400"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {answer}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const PricingFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.section
      className="relative py-24 overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(124, 58, 237, 0.1), transparent 70%)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-gray-400">Everything you need to know about our AI agents</p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default PricingFAQ;
