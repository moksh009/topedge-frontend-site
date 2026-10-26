import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import '../../styles/faq.css';

/**
 * The interactive FAQ accordion, generalised off PricingFaq so every page
 * gets the same open/close behaviour instead of a flat, always-expanded
 * `<dl>`. The CSS it leans on (`.mkt-faq*`) already lived in pricing.css;
 * this just gives every other page access to it.
 *
 * Answers stay in the DOM when collapsed (`hidden`, not unmounted), so a
 * crawler reading the rendered HTML sees the same text an FAQPage JSON-LD
 * block already carries.
 */

export type FaqItem = { question: string; answer: string };

const ease = [0.22, 1, 0.36, 1] as const;

export default function FaqAccordion({
  items,
  defaultOpen = 0,
}: {
  items: FaqItem[];
  /** Index to start expanded, or null for all collapsed. */
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const reduceMotion = useReducedMotion();

  return (
    <div className="mkt-faq">
      {items.map((item, index) => {
        const isOpen = open === index;

        return (
          <motion.div
            key={item.question}
            className={cn('mkt-faq__item', isOpen && 'is-open')}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.04, ease }}
          >
            <button
              type="button"
              className="mkt-faq__trigger"
              aria-expanded={isOpen}
              aria-controls={`mkt-faq-panel-${index}`}
              id={`mkt-faq-trigger-${index}`}
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <span className="mkt-faq__q">{item.question}</span>
              <span className="mkt-faq__chev-wrap" aria-hidden>
                <ChevronDown className="mkt-faq__chev" size={15} strokeWidth={2.25} />
              </span>
            </button>

            <div
              id={`mkt-faq-panel-${index}`}
              role="region"
              aria-labelledby={`mkt-faq-trigger-${index}`}
              className="mkt-faq__panel"
              hidden={!isOpen}
            >
              <p className="mkt-faq__a">{item.answer}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
