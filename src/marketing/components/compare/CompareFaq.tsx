import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

type FaqItem = { question: string; answer: string };

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Answers stay in the DOM (CSS collapse) so crawlers and AI engines can read
 * every Q&A — AnimatePresence unmount was hiding closed answers from HTML.
 */
export default function CompareFaq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="mkt-cmp-faq">
      {items.map((item, index) => {
        const isOpen = open === index;

        return (
          <motion.div
            key={item.question}
            className={cn('mkt-cmp-faq__item', isOpen && 'is-open')}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.05, ease }}
          >
            <button
              type="button"
              className="mkt-cmp-faq__trigger"
              aria-expanded={isOpen}
              aria-controls={`mkt-cmp-faq-panel-${index}`}
              id={`mkt-cmp-faq-trigger-${index}`}
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <span className="mkt-cmp-faq__q">{item.question}</span>
              <span className="mkt-cmp-faq__chev-wrap" aria-hidden>
                <ChevronDown className="mkt-cmp-faq__chev" size={15} strokeWidth={2.25} />
              </span>
            </button>

            <div
              id={`mkt-cmp-faq-panel-${index}`}
              role="region"
              aria-labelledby={`mkt-cmp-faq-trigger-${index}`}
              className="mkt-cmp-faq__panel"
              hidden={!isOpen}
            >
              <p className="mkt-cmp-faq__a">{item.answer}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
