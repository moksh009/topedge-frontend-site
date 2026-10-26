import {
  PRODUCT_HUNT,
  PRODUCT_HUNT_QUOTES,
  hasProductHuntEmbed,
  hasProductHuntRating,
  productHuntEmbedSrc,
} from '../data/socialProof';
import '../styles/proof.css';

const PH_ORANGE = '#da552f';

/**
 * Product Hunt's mark: the "P" cut out of a filled circle.
 *
 * Drawn rather than loaded as an image so it inherits size and sits on the
 * same baseline as the Trustpilot star beside it. The orange is Product
 * Hunt's own, because a recoloured badge is somebody else's badge.
 */
export function ProductHuntMark({ size = 16 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      <circle cx="12" cy="12" r="12" fill={PH_ORANGE} />
      <path
        d="M13.4 6.6H8.9v10.8h2.7v-3.3h1.8a3.75 3.75 0 0 0 0-7.5zm0 5.1h-1.8V9h1.8a1.35 1.35 0 0 1 0 2.7z"
        fill="#fff"
      />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  const whole = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.25 && rating % 1 < 0.75;
  return (
    <span className="mkt-ph__stars" aria-hidden>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = i < whole ? 'full' : i === whole && hasHalf ? 'half' : 'empty';
        return (
          <svg key={i} viewBox="0 0 24 24" width="14" height="14" className="mkt-ph__star">
            {fill === 'half' ? (
              <>
                <defs>
                  <linearGradient id={`ph-half-${i}`}>
                    <stop offset="50%" stopColor={PH_ORANGE} />
                    <stop offset="50%" stopColor="#e2e2ea" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 1.6l3.1 7.2 7.8.6-5.9 5.1 1.8 7.6L12 18l-6.8 4.1 1.8-7.6L1.1 9.4l7.8-.6z"
                  fill={`url(#ph-half-${i})`}
                />
              </>
            ) : (
              <path
                d="M12 1.6l3.1 7.2 7.8.6-5.9 5.1 1.8 7.6L12 18l-6.8 4.1 1.8-7.6L1.1 9.4l7.8-.6z"
                fill={fill === 'full' ? PH_ORANGE : '#e2e2ea'}
              />
            )}
          </svg>
        );
      })}
    </span>
  );
}

/**
 * The Product Hunt badge, as a pill that matches TrustpilotScore beside it.
 *
 * Three shapes, chosen by the data rather than by a prop:
 *   1. Product Hunt's own review widget, which draws the live stars and count
 *      from their servers. Preferred, because nothing here can go stale.
 *   2. A rating a human read off the listing, drawn locally in the same shape
 *      as the Trustpilot score beside it.
 *   3. A plain "Find us on Product Hunt" link.
 *
 * The third is not a placeholder to be dressed up later — it is what the page
 * is entitled to claim before anybody has read the listing.
 */
export function ProductHuntBadge({ compact = false }: { compact?: boolean }) {
  const rated = hasProductHuntRating();
  const rating = Number(PRODUCT_HUNT.rating);

  if (hasProductHuntEmbed()) {
    return (
      <a
        className="mkt-ph__embed"
        href={PRODUCT_HUNT.reviewUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src={productHuntEmbedSrc()}
          alt="TopEdge AI reviews on Product Hunt"
          width={250}
          height={54}
          loading="lazy"
          decoding="async"
        />
      </a>
    );
  }

  return (
    <a
      className={`mkt-ph__badge${compact ? ' mkt-ph__badge--compact' : ''}`}
      href={rated ? PRODUCT_HUNT.reviewUrl : PRODUCT_HUNT.productUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ProductHuntMark size={compact ? 15 : 17} />
      {rated ? (
        <>
          <Stars rating={rating} />
          <span className="mkt-ph__text">
            <b>{PRODUCT_HUNT.rating}</b> on <span className="mkt-ph__word">Product Hunt</span>
          </span>
          <span className="sr-only">, from {PRODUCT_HUNT.reviews} reviews, read on {PRODUCT_HUNT.asOf}</span>
          <span className="mkt-ph__count" aria-hidden>
            {PRODUCT_HUNT.reviews} reviews
          </span>
        </>
      ) : (
        <span className="mkt-ph__text">
          Find us on <span className="mkt-ph__word">Product Hunt</span>
        </span>
      )}
    </a>
  );
}

/**
 * The published Product Hunt reviews.
 *
 * Renders nothing at all when the listing has not been read yet, which is the
 * point: an empty section is a smaller true claim than a filled-in guess.
 */
export default function ProductHuntProof({
  heading = 'Reviewed on Product Hunt',
  intro,
}: {
  heading?: string;
  intro?: string;
}) {
  if (!PRODUCT_HUNT_QUOTES.length) return null;

  return (
    <section className="mkt-ph" aria-labelledby="mkt-ph-head">
      <header className="mkt-ph__head">
        <h2 className="mkt-ph__title" id="mkt-ph-head">
          {heading}
        </h2>
        {intro ? <p className="mkt-ph__intro">{intro}</p> : null}
        <div className="mkt-ph__badge-wrap">
          <ProductHuntBadge />
        </div>
      </header>

      <ul className="mkt-ph__list">
        {PRODUCT_HUNT_QUOTES.map((q) => (
          <li className="mkt-ph__item" key={q.author}>
            {typeof q.rating === 'number' ? <Stars rating={q.rating} /> : null}
            <p className="mkt-ph__quote">{q.text}</p>
            <p className="mkt-ph__author">
              {q.author}
              {q.role ? <span className="mkt-ph__role">{q.role}</span> : null}
            </p>
          </li>
        ))}
      </ul>

      {PRODUCT_HUNT.retrieved ? (
        <p className="mkt-ph__retrieved">
          Read on Product Hunt on {PRODUCT_HUNT.retrieved}.{' '}
          <a href={PRODUCT_HUNT.reviewUrl} target="_blank" rel="noopener noreferrer">
            See every review
          </a>
        </p>
      ) : null}
    </section>
  );
}
