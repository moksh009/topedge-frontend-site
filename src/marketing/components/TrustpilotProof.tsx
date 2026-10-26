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
        {/* No "out of 5": the star row already says it, and spelling it out
            twice in one strip left no room for the review count. */}
        <b>{TRUSTPILOT.score}</b> on{' '}
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
 * The three published reviews.
 *
 * They were set as bare type with a hairline between them, on the argument
 * that a boxed quote reads as the designed testimonial nobody believes. On a
 * page that is otherwise all cards, what it actually read as was three loose
 * paragraphs the layout had forgotten. These are cards now, but the restraint
 * stays where it mattered: no stock portraits, no five-star row invented per
 * review (the score is an aggregate, and Trustpilot publishes it, not us),
 * and the retrieval date under them so a reader can go and check.
 */
export default function TrustpilotProof({
  eyebrow = 'TRUSTPILOT',
  heading = 'What merchants say',
  intro,
}: {
  eyebrow?: string;
  heading?: string;
  intro?: string;
}) {
  return (
    <section className="mkt-tp" aria-labelledby="mkt-tp-head">
      <header className="mkt-tp__head">
        {eyebrow ? <p className="mkt-tp__eyebrow">{eyebrow}</p> : null}
        <h2 className="mkt-tp__title" id="mkt-tp-head">
          {heading}
        </h2>
        {intro ? <p className="mkt-tp__intro">{intro}</p> : null}
        <div className="mkt-tp__score-wrap">
          <TrustpilotScore />
        </div>
      </header>

      <ul className="mkt-tp__list">
        {TRUSTPILOT_QUOTES.map((q) => (
          <li className="mkt-tp__item" key={q.author}>
            <span className="mkt-tp__mark" aria-hidden>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M9.6 5.2c-3.3 1.5-5.4 4.3-5.4 7.9 0 3.3 2 5.7 4.8 5.7 2.3 0 4-1.7 4-3.9 0-2.1-1.5-3.7-3.5-3.7-.4 0-.9.1-1 .1.3-1.6 1.9-3.4 3.6-4.3zm9.1 0c-3.3 1.5-5.4 4.3-5.4 7.9 0 3.3 2 5.7 4.8 5.7 2.3 0 4-1.7 4-3.9 0-2.1-1.5-3.7-3.5-3.7-.4 0-.9.1-1 .1.3-1.6 1.9-3.4 3.6-4.3z" />
              </svg>
            </span>
            <blockquote className="mkt-tp__quote">
              <p>{q.text}</p>
            </blockquote>
            <footer className="mkt-tp__by">
              <span className="mkt-tp__avatar" aria-hidden>
                {q.author.trim().charAt(0)}
              </span>
              <span className="mkt-tp__by-text">
                <b className="mkt-tp__author">{q.author}</b>
                <span className="mkt-tp__by-src">Published on Trustpilot</span>
              </span>
            </footer>
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
