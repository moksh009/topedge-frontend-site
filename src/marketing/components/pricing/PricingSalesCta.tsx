import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { SALES_WHATSAPP_URL } from '../../lib/billingCatalog';
import PricingSectionHead from './PricingSectionHead';

const ease = [0.22, 1, 0.36, 1] as const;

export default function PricingSalesCta() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="mkt-sales" aria-labelledby="mkt-sales-title">
      <motion.div
        className="mkt-sales__card"
        {...(reduceMotion
          ? {}
          : {
              initial: { opacity: 0, y: 14 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, amount: 0.35 },
              transition: { duration: 0.48, ease },
            })}
      >
        <div className="mkt-sales__body">
          <PricingSectionHead
            as="h2"
            id="mkt-sales-title"
            align="left"
            eyebrow="Help"
            title="Still deciding?"
            highlight="We're here"
            sub="Tell us your order volume on WhatsApp, we'll recommend a plan and help you launch your first recovery flow."
            className="mkt-sales__head"
          />

          <a
            className="mkt-sales__cta"
            href={SALES_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Talk to sales on WhatsApp
            <ArrowUpRight size={15} strokeWidth={2.25} aria-hidden />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
