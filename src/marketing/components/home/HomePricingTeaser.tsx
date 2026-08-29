import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/pricing.css';
import CycleToggle from '../pricing/CycleToggle';
import PlanGrid from '../pricing/PlanGrid';
import {
  BillingCatalog,
  BillingCycle,
  FALLBACK_CATALOG,
  GST_FOOTNOTE,
  fetchBillingCatalog,
} from '../../lib/billingCatalog';

/**
 * Homepage teaser: three compact Launch / Growth / Scale cards → /pricing.
 */
export default function HomePricingTeaser() {
  const [catalog, setCatalog] = useState<BillingCatalog>(FALLBACK_CATALOG);
  const [cycle, setCycle] = useState<BillingCycle>('yearly');

  useEffect(() => {
    let alive = true;
    fetchBillingCatalog().then((live) => {
      if (!alive) return;
      setCatalog(live);
      setCycle(live.defaultCycle || 'yearly');
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="mkt-teaser" id="home-pricing" aria-label="Pricing">
      <div className="mkt-teaser__inner">
        <div className="mkt-teaser__head">
          <div>
            <p className="mkt-pricing__eyebrow">Pricing</p>
            <h2 className="mkt-teaser__title">Start free. Scale when WhatsApp pays for itself.</h2>
          </div>
          <Link to="/pricing" className="mkt-pricing__cta mkt-pricing__cta--ghost">
            See yearly
          </Link>
        </div>
        <CycleToggle value={cycle} onChange={setCycle} />
        <PlanGrid plans={catalog.plans} cycle={cycle} compact />
        <p className="mkt-gst">{GST_FOOTNOTE}</p>
        {catalog.source === 'fallback' ? <p className="mkt-fallback">Prices as of Aug 2026.</p> : null}
      </div>
    </section>
  );
}
