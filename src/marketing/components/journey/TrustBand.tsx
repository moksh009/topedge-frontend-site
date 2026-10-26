import { Link } from 'react-router-dom';
import { CUSTOMER_STORIES } from '../../data/socialProof';
import ProofBadges from '../ProofBadges';
import '../../styles/journey-flow.css';

const LOGOS = [
  { name: 'Delitech Smart Home', src: '/trust/delitech-white.png' },
  { name: 'Apex Light', src: '/trust/apex-white.png' },
  { name: 'ajeeb', src: '/trust/ajeeb-black.png' },
  { name: 'Ecom', src: '/trust/ecom-black.png' },
  { name: 'Oleez Online', src: '/trust/oleez-black.png' },
];

/**
 * Proof for the journey, template and integration pages: the brands running
 * TopEdge, and what two of them said. Quotes come from socialProof.json
 * verbatim; nothing here is written for this page.
 */
export default function TrustBand({
  title = 'Shopify brands already run this on WhatsApp',
}: {
  title?: string;
}) {
  return (
    <section className="mkt-trust" aria-labelledby="mkt-trust-title">
      <div className="mkt-trust__head">
        <h2 className="mkt-trust__title" id="mkt-trust-title">
          {title}
        </h2>
        <ProofBadges compact />
      </div>

      <ul className="mkt-trust__logos" aria-label="Brands using TopEdge">
        {LOGOS.map((l) => (
          <li key={l.name}>
            <img src={l.src} alt={l.name} loading="lazy" decoding="async" />
          </li>
        ))}
      </ul>

      <ul className="mkt-trust__stories">
        {CUSTOMER_STORIES.map((s) => (
          <li key={s.slug} className="mkt-trust__story">
            <p className="mkt-trust__headline">{s.headline}</p>
            <blockquote className="mkt-trust__quote">
              <p>“{s.quote}”</p>
            </blockquote>
            <footer className="mkt-trust__by">
              <span className="mkt-trust__avatar" aria-hidden>
                {s.person.trim().charAt(0)}
              </span>
              <span>
                <b>{s.person}</b>
                <span>{s.role}</span>
              </span>
            </footer>
          </li>
        ))}
      </ul>

      <p className="mkt-trust__more">
        <Link to="/customers">Read the customer stories →</Link>
      </p>
    </section>
  );
}
