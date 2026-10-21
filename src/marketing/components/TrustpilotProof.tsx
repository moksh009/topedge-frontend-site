import { TRUSTPILOT, TRUSTPILOT_QUOTES, TRUSTPILOT_RETRIEVED } from '../data/socialProof';
import '../styles/trustpilot.css';

const TP_GREEN = '#00b67a';
const TP_GREY = '#dcdce6';
const STAR_PATH = 'M12 1.6l3.1 7.2 7.8.6-5.9 5.1 1.8 7.6L12 18l-6.8 4.1 1.8-7.6L1.1 9.4l7.8-.6z';

/**
 * Trustpilot's star, drawn once.
 *
 * Trustpilot sets each star on its own coloured tile with the star knocked out
 * in white, and that tile is how the mark is recognised — a bare green star
 * glyph is somebody else's rating widget. A half score paints the tile green
 * to the midpoint and grey after it.
 */
function Star({ fill }: { fill: 'full' | 'half' | 'empty' }) {
  return (
    <svg className="mkt-tp__star" viewBox="0 0 24 24" width="15" height="15" aria-hidden>
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

/**
 * The sourced TrustScore as a star row.
 *
 * Nothing here is computed from a number we chose: `score` is read off the
 * live profile by a human on the date in `asOf`, and the row draws exactly
 * that. A half tile appears only when the score has a fractional part.
 */
export function TrustpilotScore({ compact = false }: { compact?: boolean }) {
  const score = Number(TRUSTPILOT.score);
  const whole = Math.floor(score);
  const hasHalf = score % 1 >= 0.25 && score % 1 < 0.75;
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < whole) return 'full' as const;
    if (i === whole && hasHalf) return 'half' as const;
    return 'empty' as const;
  });

  return (
    <a
      className={`mkt-tp__score${compact ? ' mkt-tp__score--compact' : ''}`}
      href={TRUSTPILOT.reviewUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="mkt-tp__stars" aria-hidden>
        {stars.map((fill, i) => (
          <Star key={i} fill={fill} />
        ))}
      </span>
      <span className="mkt-tp__score-text">
        <b>{TRUSTPILOT.score}</b> out of 5 on{' '}
        <span className="mkt-tp__word">
          <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden>
            <path d={STAR_PATH} fill={TP_GREEN} />
          </svg>
          Trustpilot
        </span>
      </span>
      <span className="sr-only">
        , from {TRUSTPILOT.reviews} reviews, read on {TRUSTPILOT.asOf}
      </span>
      <span className="mkt-tp__count" aria-hidden>
        {TRUSTPILOT.reviews} reviews
      </span>
    </a>
  );
}

/**
 * The three published reviews, set as type rather than as cards.
 *
 * Boxing a quote makes it read as a designed testimonial — the thing every
 * pricing page has and nobody believes. These sit in the page's own column
 * rhythm, separated by a hairline, with the author and the retrieval date
 * under them so a reader can go and check the claim.
 */
export default function TrustpilotProof({
  heading = 'What merchants wrote on Trustpilot',
  intro,
}: {
  heading?: string;
  intro?: string;
}) {
  return (
    <section className="mkt-tp" aria-labelledby="mkt-tp-head">
      <div className="mkt-tp__head">
        <div>
          <h2 className="mkt-tp__title" id="mkt-tp-head">
            {heading}
          </h2>
          {intro ? <p className="mkt-tp__intro">{intro}</p> : null}
        </div>
        <TrustpilotScore />
      </div>

      <ul className="mkt-tp__list">
        {TRUSTPILOT_QUOTES.map((q) => (
          <li className="mkt-tp__item" key={q.author}>
            <blockquote className="mkt-tp__quote">
              <p>{q.text}</p>
            </blockquote>
            <p className="mkt-tp__author">{q.author}</p>
          </li>
        ))}
      </ul>

      <p className="mkt-tp__note">
        Quoted as published, retrieved {TRUSTPILOT_RETRIEVED}.{' '}
        <a href={TRUSTPILOT.reviewUrl} target="_blank" rel="noopener noreferrer">
          Read every review on Trustpilot
        </a>
        .
      </p>
    </section>
  );
}
