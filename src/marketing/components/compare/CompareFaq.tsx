import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

type FaqItem = { question: string; answer: string };

const ease = [0.22, 1, 0.36, 1] as const;

/** Same interaction/visual language as PricingFaq. */
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
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <span className="mkt-cmp-faq__q">{item.question}</span>
              <span className="mkt-cmp-faq__chev-wrap" aria-hidden>
                <ChevronDown className="mkt-cmp-faq__chev" size={15} strokeWidth={2.25} />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="panel"
                  className="mkt-cmp-faq__panel"
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={reduceMotion ? undefined : { height: 'auto', opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease }}
                >
                  <p className="mkt-cmp-faq__a">{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
