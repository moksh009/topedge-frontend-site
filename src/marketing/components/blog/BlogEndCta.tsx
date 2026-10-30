import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DASH_SIGNUP } from '../../routes';
import { TRUSTPILOT, TRUSTPILOT_QUOTES } from '../../data/socialProof';
import '../../styles/blog-endcta.css';

const TP_GREEN = '#00b67a';
const TP_GREY = '#dcdce6';
const STAR_PATH = 'M12 1.6l3.1 7.2 7.8.6-5.9 5.1 1.8 7.6L12 18l-6.8 4.1 1.8-7.6L1.1 9.4l7.8-.6z';

/**
 * Trustpilot's star on its own tile, the same drawing the rest of the site
 * uses. A bare green glyph is somebody else's rating widget.
 */
function Star({ fill }: { fill: 'full' | 'half' | 'empty' }) {
  return (
    <svg className="mkt-bend__star" viewBox="0 0 24 24" width="15" height="15" aria-hidden>
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
 * Which published review this post shows.
 *
 * Picked from the slug rather than at random, so the same post always shows
 * the same review: the pages are prerendered, and a random pick would mean
 * the built HTML and the hydrated page disagree.
 */
function reviewForSlug(slug: string) {
  if (!TRUSTPILOT_QUOTES.length) return null;
  let h = 0;
  for (let i = 0; i < slug.length; i += 1) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return TRUSTPILOT_QUOTES[h % TRUSTPILOT_QUOTES.length];
}

const SHARE_ICONS = {
  x: (
    <path d="M17.5 3h3l-6.6 7.5L21.8 21h-6l-4.7-6.1L5.6 21H2.5l7-8L2.2 3h6.2l4.3 5.6zm-1 16h1.7L7.6 4.8H5.8z" />
  ),
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM9.5 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.6c0-1.34-.03-3.06-1.9-3.06-1.9 0-2.2 1.46-2.2 2.96V21h-4z" />
  ),
  facebook: (
    <path d="M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0022 12z" />
  ),
  whatsapp: (
    <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.17-1.35a9.93 9.93 0 004.87 1.25h.01c5.5 0 9.96-4.46 9.96-9.96 0-2.66-1.04-5.16-2.92-7.04A9.9 9.9 0 0012.04 2zm5.83 14.23c-.25.69-1.44 1.32-1.99 1.37-.53.05-1.02.24-3.44-.72-2.9-1.14-4.74-4.1-4.88-4.29-.14-.19-1.16-1.55-1.16-2.95s.73-2.09.99-2.38c.26-.29.57-.36.76-.36l.54.01c.17 0 .41-.07.64.49.24.58.8 2 .87 2.14.07.14.12.31.02.5-.1.19-.14.31-.29.48-.14.17-.3.37-.43.5-.14.14-.29.29-.12.57.17.29.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.3 1.41.29.14.45.12.62-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.64-.14.26.09 1.66.78 1.95.93.29.14.48.21.55.33.07.12.07.69-.18 1.38z" />
  ),
} as const;

type ShareKey = keyof typeof SHARE_ICONS;

const SHARE_LABELS: Record<ShareKey, string> = {
  x: 'Share on X',
  linkedin: 'Share on LinkedIn',
  facebook: 'Share on Facebook',
  whatsapp: 'Share on WhatsApp',
};

function shareHref(key: ShareKey, url: string, title: string) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  switch (key) {
    case 'x':
      return `https://twitter.com/intent/tweet?url=${u}&text=${t}`;
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${u}`;
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${u}`;
    case 'whatsapp':
      return `https://wa.me/?text=${t}%20${u}`;
    default:
      return url;
  }
}

/**
 * The end of every article: one conversion panel with a real review beside
 * it, then the share row.
 *
 * The panel used to be a pale bordered box with a heading and two buttons,
 * which is the shape a reader's eye has learned to skip. Pairing the offer
 * with somebody else's words is the thing that makes an end-of-post CTA
 * convert, and the words have to be real: the quote comes verbatim from
 * socialProof.json and the star row is the published aggregate TrustScore,
 * labelled as the aggregate. No per-review rating is invented, because
 * Trustpilot publishes one score and we did not collect the rest.
 */
export default function BlogEndCta({
  url,
  title,
  slug,
}: {
  url: string;
  title: string;
  slug: string;
}) {
  const [copied, setCopied] = useState(false);
  const review = reviewForSlug(slug);
  const stars = starRow(Number(TRUSTPILOT.score));

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard is blocked in some contexts. The share links still work, so
      // there is nothing useful to tell the reader here.
    }
  }

  return (
    <>
      <aside className="mkt-bend" aria-label="Start free">
        <div className="mkt-bend__glow" aria-hidden />

        <div className="mkt-bend__pitch">
          <h2 className="mkt-bend__title">
            Run cart recovery on your <span className="mkt-bend__hl">Shopify store</span>
          </h2>
          <p className="mkt-bend__sub">
            Connect Shopify and WhatsApp Cloud API, approve your Meta templates, and publish the
            first journey. Free for 14 days, no card.
          </p>
          <div className="mkt-bend__actions">
            <a href={DASH_SIGNUP} className="mkt-bend__btn mkt-bend__btn--primary">
              Start free
            </a>
            <Link to="/pricing" className="mkt-bend__btn mkt-bend__btn--ghost">
              See pricing
            </Link>
          </div>
        </div>

        {review ? (
          <figure className="mkt-bend__review">
            <div className="mkt-bend__stars" aria-hidden>
              {stars.map((fill, i) => (
                <Star key={i} fill={fill} />
              ))}
            </div>
            <p className="mkt-bend__score">
              {TRUSTPILOT.score} out of 5 on Trustpilot, from {TRUSTPILOT.reviews} reviews
            </p>
            <blockquote className="mkt-bend__quote">
              <p>{review.text}</p>
            </blockquote>
            <figcaption className="mkt-bend__by">
              <span className="mkt-bend__avatar" aria-hidden>
                {review.author.trim().charAt(0)}
              </span>
              <span className="mkt-bend__by-text">
                <b>{review.author}</b>
                <span>Verified review on Trustpilot</span>
              </span>
            </figcaption>
          </figure>
        ) : null}
      </aside>

      <section className="mkt-bshare" aria-label="Share this article">
        <p className="mkt-bshare__label">Share this article</p>
        <ul className="mkt-bshare__list">
          {(Object.keys(SHARE_ICONS) as ShareKey[]).map((key) => (
            <li key={key}>
              <a
                className={`mkt-bshare__btn mkt-bshare__btn--${key}`}
                href={shareHref(key, url, title)}
                target="_blank"
                rel="noopener noreferrer"
                title={SHARE_LABELS[key]}
              >
                <span className="sr-only">{SHARE_LABELS[key]}</span>
                <svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden>
                  {SHARE_ICONS[key]}
                </svg>
              </a>
            </li>
          ))}
          <li>
            <button
              type="button"
              className={`mkt-bshare__btn mkt-bshare__btn--copy${copied ? ' is-copied' : ''}`}
              onClick={copyLink}
              title="Copy link"
            >
              <span className="sr-only">Copy link to this article</span>
              {copied ? (
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M10 13a5 5 0 007.07 0l2.83-2.83a5 5 0 00-7.07-7.07L11.5 4.4" />
                  <path d="M14 11a5 5 0 00-7.07 0L4.1 13.83a5 5 0 007.07 7.07l1.3-1.3" />
                </svg>
              )}
            </button>
          </li>
        </ul>
        <p className="mkt-bshare__url" aria-hidden>
          {url.replace(/^https?:\/\//, '')}
        </p>
      </section>
    </>
  );
}
