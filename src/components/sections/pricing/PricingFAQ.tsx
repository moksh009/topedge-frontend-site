import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, Plus, Minus, HelpCircle } from 'lucide-react';

export const faqs = [
  {
    question: "What exactly does TopEdge offer?",
    answer: "TopEdge is an AI architecture agency. We build, deploy, and manage 24/7 AI-driven voice and chat systems that handle everything from basic queries to complex multi-step conversions. You get a fully-managed ecosystem with a dedicated performance dashboard."
  },
  {
    question: "How can your AI agent help my scaling business?",
    answer: "Our agents eliminate the bottleneck of human intervention for repetitive tasks. They qualify leads, book calendar slots, and update your CRM in real-time, ensuring zero lead abandonment and 100% conversation coverage."
  },
  {
    question: "Is integration complex for my current team?",
    answer: "No. We handle the entire deployment lifecycle. Our 'Concierge Integration' model means we connect to your existing phone systems, CRMs, and APIs. Your team just receives the qualified meetings."
  },
  {
    question: "How do you handle accents and diverse languages?",
    answer: "Our voice agents utilize proprietary neural speech synthesis, allowing for perfect regional accents and native-level fluency in over 30 languages. It feels less like a bot and more like a professional representative."
  },
  {
    question: "Explain the transparency in your pricing model.",
    answer: "We believe in outcome-based costs. You pay a foundation fee for management and continuous evolution, plus a transparent pay-per-minute or pay-per-message operational cost. No surprises, just scale."
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="mb-6"
    >
      <button
        onClick={onToggle}
        className={`w-full text-left p-6 rounded-[1.5rem] border transition-all duration-500 flex items-center justify-between gap-4 group ${isOpen
          ? 'bg-white border-indigo-100 shadow-[0_20px_40px_-10px_rgba(99,102,241,0.08)]'
          : 'bg-slate-50/50 border-slate-100 hover:border-indigo-100 hover:bg-white'
          }`}
      >
        <span className={`text-lg font-bold tracking-tight transition-colors duration-300 ${isOpen ? 'text-indigo-600' : 'text-slate-900 group-hover:text-indigo-500'}`}>
          {question}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${isOpen ? 'bg-indigo-600 text-white rotate-180' : 'bg-white text-slate-400 group-hover:text-indigo-400'}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-3 text-slate-500 text-base font-light leading-relaxed max-w-3xl">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const PricingFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white overflow-hidde">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-6"
          >
            <div className="p-3 rounded-2xl bg-slate-50 -mt-28">
              <HelpCircle className="w-6 h-6 text-indigo-600" />
            </div>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tighter mb-4 -mt-20">Clarifications.</h2>
          <p className="text-slate-400 text-lg font-light">Direct answers to the foundations of our AI logic.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              {...faq}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingFAQ;
