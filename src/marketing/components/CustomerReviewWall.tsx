import { TRUSTPILOT, TRUSTPILOT_QUOTES, TRUSTPILOT_RETRIEVED } from '../data/socialProof';
import { PRODUCT_HUNT, hasProductHuntRating } from '../data/socialProof';
import { ProductHuntMark } from './ProductHuntProof';
import '../styles/review-wall.css';

const TP_GREEN = '#00b67a';
const TP_GREY = '#dcdce6';
const STAR_PATH = 'M12 1.6l3.1 7.2 7.8.6-5.9 5.1 1.8 7.6L12 18l-6.8 4.1 1.8-7.6L1.1 9.4l7.8-.6z';

/**
 * Trustpilot's star on its coloured tile, at whatever size the row needs.
 *
 * Same drawing as TrustpilotProof uses, because a bare green glyph is
 * somebody else's rating widget rather than Trustpilot's mark.
 */
function Star({ fill, size = 18 }: { fill: 'full' | 'half' | 'empty'; size?: number }) {
  return (
    <svg className="mkt-rw__star" viewBox="0 0 24 24" width={size} height={size} aria-hidden>
      {fill === 'half' ? (
        <>
          <rect x="0" y="0" width="12" height="24" fill={TP_GREEN} />
          <rect x="12" y="0" width="12" height="24" fill={TP_GREY} />
        </>
      ) : (
        <rect x="0" y="0" width="24" height="24" fill={fill === 'full' ? TP_GREEN : TP_GREY} />
      )}
      <path d={STAR_PATH} fill="#fff" />
    </svg>
  );
}

function starRow(score: number) {
  const whole = Math.floor(score);
  const hasHalf = score % 1 >= 0.25 && score % 1 < 0.75;
  return Array.from({ length: 5 }, (_, i) => {
    if (i < whole) return 'full' as const;
    if (i === whole && hasHalf) return 'half' as const;
    return 'empty' as const;
  });
}

/**
 * The published reviews, with the aggregate score standing beside them.
 *
 * Two rules hold this section together, and both are about what we are
 * entitled to claim. The quotes are reproduced exactly as they were published
 * on Trustpilot under those people's names, so no tidy-up and no shortening.
 * And no review carries a star row of its own: Trustpilot publishes one
 * aggregate score, we did not collect per-review ratings, so drawing five
 * stars over each card would be an invented number sitting next to a real one.
 */
export default function CustomerReviewWall() {
  const score = Number(TRUSTPILOT.score);
  const stars = starRow(score);

  return (
    <section className="mkt-rw" aria-labelledby="mkt-rw-head">
      <header className="mkt-rw__head">
        <h2 className="mkt-rw__title" id="mkt-rw-head">
          Reviews from the <span className="mkt-hl">people who pay for it</span>
        </h2>
        <p className="mkt-rw__sub">
          Published under their own names on Trustpilot and Product Hunt, quoted here exactly as
          they were written.
        </p>
      </header>

      <div className="mkt-rw__grid">
        <aside className="mkt-rw__score">
          <span className="mkt-rw__score-mark" aria-hidden>
            <svg viewBox="0 0 24 24" width="17" height="17">
              <path d={STAR_PATH} fill={TP_GREEN} />
            </svg>
            Trustpilot
          </span>
          <p className="mkt-rw__score-value">
            {TRUSTPILOT.score}
            <span>/5</span>
          </p>
          <span className="mkt-rw__score-stars" aria-hidden>
            {stars.map((fill, i) => (
              <Star key={i} fill={fill} />
            ))}
          </span>
          <p className="mkt-rw__score-meta">
            TrustScore from {TRUSTPILOT.reviews} reviews, read on {TRUSTPILOT.asOf}.
          </p>

          {hasProductHuntRating() ? (
            <p className="mkt-rw__score-alt">
              <ProductHuntMark size={15} />
              <span>
                <b>{PRODUCT_HUNT.rating}/5</b> on Product Hunt, from {PRODUCT_HUNT.reviews} reviews
              </span>
            </p>
          ) : null}

          <a
            className="mkt-rw__score-link"
            href={TRUSTPILOT.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read every review
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </aside>

        <ul className="mkt-rw__list">
          {TRUSTPILOT_QUOTES.map((q) => (
            <li className="mkt-rw__item" key={q.author}>
              <span className="mkt-rw__quotemark" aria-hidden>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M9.6 5.2c-3.3 1.5-5.4 4.3-5.4 7.9 0 3.3 2 5.7 4.8 5.7 2.3 0 4-1.7 4-3.9 0-2.1-1.5-3.7-3.5-3.7-.4 0-.9.1-1 .1.3-1.6 1.9-3.4 3.6-4.3zm9.1 0c-3.3 1.5-5.4 4.3-5.4 7.9 0 3.3 2 5.7 4.8 5.7 2.3 0 4-1.7 4-3.9 0-2.1-1.5-3.7-3.5-3.7-.4 0-.9.1-1 .1.3-1.6 1.9-3.4 3.6-4.3z" />
                </svg>
              </span>
              <blockquote className="mkt-rw__quote">
                <p>{q.text}</p>
              </blockquote>
              <footer className="mkt-rw__by">
                <span className="mkt-rw__avatar" aria-hidden>
                  {q.author.trim().charAt(0)}
                </span>
                <span className="mkt-rw__by-text">
                  <b>{q.author}</b>
                  <span>Verified review on Trustpilot</span>
                </span>
              </footer>
            </li>
          ))}
        </ul>
      </div>

      <p className="mkt-rw__note">
        Quoted as published, retrieved {TRUSTPILOT_RETRIEVED}.{' '}
        <a href={TRUSTPILOT.reviewUrl} target="_blank" rel="noopener noreferrer">
          Check them on Trustpilot
        </a>
        .
      </p>
    </section>
  );
}
