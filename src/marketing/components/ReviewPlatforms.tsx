import { TRUSTPILOT, TRUSTPILOT_QUOTES, PRODUCT_HUNT, hasProductHuntRating } from '../data/socialProof';
import { TrustpilotScore } from './TrustpilotProof';
import { ProductHuntBadge, ProductHuntMark } from './ProductHuntProof';
import './../styles/proof.css';

const TP_STAR = 'M12 1.6l3.1 7.2 7.8.6-5.9 5.1 1.8 7.6L12 18l-6.8 4.1 1.8-7.6L1.1 9.4l7.8-.6z';

/**
 * Where TopEdge is reviewed, with the score each platform publishes.
 *
 * On a comparison page the reader is weighing vendors, so "here is every
 * place you can check us, and the number each one shows" is the claim worth
 * making — more than a single badge, and more honest than a wall of quotes
 * we chose. Each card links to the platform so the figure can be checked.
 *
 * Nothing here is computed or rounded: the scores come from socialProof.json,
 * which only holds what somebody read off the live page on a stated date.
 */
export default function ReviewPlatforms({
  heading = 'Where merchants review us',
  intro = 'Every score below is published by the platform, not by us. The dates are when each was last read.',
}: {
  heading?: string;
  intro?: string;
}) {
  const phRated = hasProductHuntRating();

  return (
    <section className="mkt-rp" aria-labelledby="mkt-rp-head">
      <header className="mkt-rp__head">
        <h2 className="mkt-rp__title" id="mkt-rp-head">
          {heading}
        </h2>
        {intro ? <p className="mkt-rp__intro">{intro}</p> : null}
      </header>

      <ul className="mkt-rp__grid">
        <li className="mkt-rp__card">
          <a
            className="mkt-rp__link"
            href={TRUSTPILOT.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="mkt-rp__brand">
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
                <path d={TP_STAR} fill="#00b67a" />
              </svg>
              Trustpilot
            </span>
            <span className="mkt-rp__score">{TRUSTPILOT.score}</span>
            <span className="mkt-rp__meta">
              {TRUSTPILOT.reviews} reviews · read {TRUSTPILOT.asOf}
            </span>
            <TrustpilotScore compact />
          </a>
        </li>

        <li className="mkt-rp__card">
          <a
            className="mkt-rp__link"
            href={phRated ? PRODUCT_HUNT.reviewUrl : PRODUCT_HUNT.productUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="mkt-rp__brand">
              <ProductHuntMark size={16} />
              Product Hunt
            </span>
            {phRated ? (
              <>
                <span className="mkt-rp__score">{PRODUCT_HUNT.rating}</span>
                <span className="mkt-rp__meta">
                  {PRODUCT_HUNT.reviews} reviews · read {PRODUCT_HUNT.asOf}
                </span>
              </>
            ) : (
              <span className="mkt-rp__meta">Read the listing</span>
            )}
            <ProductHuntBadge compact />
          </a>
        </li>

        <li className="mkt-rp__card mkt-rp__card--partner">
          <span className="mkt-rp__brand">Verified by</span>
          <ul className="mkt-rp__partners">
            <li>
              <img
                src="/badges/meta-business-partner.webp?v=5"
                alt="Meta Business Partner"
                width={104}
                height={34}
                loading="lazy"
                decoding="async"
              />
            </li>
            <li>
              <img
                src="/badges/shopify-app-store.webp?v=5"
                alt="Available on the Shopify App Store"
                width={104}
                height={34}
                loading="lazy"
                decoding="async"
              />
            </li>
            <li>
              <img
                src="/badges/whatsapp-cloud-api.webp?v=6"
                alt="WhatsApp Business Platform"
                width={104}
                height={34}
                loading="lazy"
                decoding="async"
              />
            </li>
          </ul>
          <span className="mkt-rp__meta">
            Messages go through Meta&rsquo;s own WhatsApp Business Platform.
          </span>
        </li>
      </ul>

      {TRUSTPILOT_QUOTES.length ? (
        <ul className="mkt-rp__quotes">
          {TRUSTPILOT_QUOTES.slice(0, 3).map((q) => (
            <li className="mkt-rp__quote" key={q.author}>
              <p>{q.text}</p>
              <cite>{q.author}</cite>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
