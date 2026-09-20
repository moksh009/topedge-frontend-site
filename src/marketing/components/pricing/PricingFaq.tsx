import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const PRICING_FAQS = [
  {
    q: 'Is GST included?',
    a: 'No, prices are exclusive. +18% GST (SAC 998314). Invoices included on every plan.',
  },
  {
    q: 'What’s in the free trial?',
    a: '14 days, 20 orders, 200 campaign + email sends. No card on this site. Pick Launch, Growth, or Scale after signup.',
  },
  {
    q: 'Why can’t I pay here?',
    a: 'Checkout needs a dashboard account first. Start free → signup → confirm & pay in billing (Razorpay).',
  },
  {
    q: 'Are Meta fees included?',
    a: 'No. Meta Cloud API is pass-through only (marketing ~₹0.88, utility ~₹0.125, service free). We don’t markup conversations.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel in the dashboard at period end. Access continues until the cycle finishes.',
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

/** Answers stay in the DOM for crawlers (same pattern as CompareFaq). */
export default function PricingFaq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="mkt-faq">
      {PRICING_FAQS.map((item, index) => {
        const isOpen = open === index;

        return (
          <motion.div
            key={item.q}
            className={cn('mkt-faq__item', isOpen && 'is-open')}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: index * 0.05, ease }}
          >
            <button
              type="button"
              className="mkt-faq__trigger"
              aria-expanded={isOpen}
              aria-controls={`mkt-faq-panel-${index}`}
              id={`mkt-faq-trigger-${index}`}
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <span className="mkt-faq__q">{item.q}</span>
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
              <p className="mkt-faq__a">{item.a}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
