import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import PricingSectionHead from './PricingSectionHead';

const ease = [0.22, 1, 0.36, 1] as const;

const ROI_SCENE = '/marketing/pricing/roi-recovery-scene.png?v=2';

export default function PricingRoiStrip() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="mkt-roi-card" id="roi-calculator" aria-labelledby="mkt-roi-card-title">
      <motion.div
        className="mkt-roi-card__panel"
        {...(reduceMotion
          ? {}
          : {
              initial: { y: 14, opacity: 1 },
              whileInView: { y: 0, opacity: 1 },
              viewport: { once: true, amount: 0.25 },
              transition: { duration: 0.5, ease },
            })}
      >
        <div className="mkt-roi-card__texture" aria-hidden />
        <div className="mkt-roi-card__mesh" aria-hidden />

        <div className="mkt-roi-card__art" aria-hidden>
          <img
            className="mkt-roi-card__art-scene"
            src={ROI_SCENE}
            alt=""
            width={640}
            height={360}
            loading="eager"
            decoding="async"
          />
          <div className="mkt-roi-card__art-fade" />
        </div>

        <div className="mkt-roi-card__content">
          <PricingSectionHead
            as="h2"
            id="mkt-roi-card-title"
            align="center"
            eyebrow="ROI"
            title="Estimate"
            highlight="cart recovery"
            sub="Abandoned carts × AOV × reach — see recovered ₹ vs plan cost."
            className="mkt-roi-card__head"
          />

          <Link className="mkt-roi-card__cta" to="/roi">
            Open calculator
            <ArrowRight size={15} strokeWidth={2.25} aria-hidden />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
