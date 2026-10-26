import { ReactNode } from 'react';
import ProofBadges from '../ProofBadges';
import '../../styles/journey-flow.css';

/**
 * Centred hero for the journey pages, with a real product composition under it.
 *
 * The first version of these pages used the shared left-aligned PageHero and
 * then went straight into prose and cards, so the page opened with no image at
 * all. A page about WhatsApp messages that never shows a WhatsApp message is
 * asking the reader to take the whole thing on trust.
 *
 * The visual is a real product composition from /marketing/solutions, not
 * generated art: these pages describe automations that exist, so the picture
 * should be of the thing that exists. The frame tints behind it rather than
 * boxing it, which keeps a screenshot from reading like a slide.
 */
/**
 * Splits the title on the accent phrase so one phrase can carry the violet
 * highlight. Falls back to the plain title when the phrase is not present,
 * rather than rendering a half-matched span.
 */
function renderAccent(title: string, accent?: string) {
  if (!accent) return title;
  const i = title.indexOf(accent);
  if (i < 0) return title;
  return (
    <>
      {title.slice(0, i)}
      <span className="mkt-jh__hl">{accent}</span>
      {title.slice(i + accent.length)}
    </>
  );
}

export default function JourneyHero({
  eyebrow,
  title,
  accent,
  subtitle,
  actions,
  trust,
  image,
  imageAlt,
  children,
}: {
  eyebrow: string;
  title: string;
  /** Phrase inside `title` to highlight in violet, as on the blog index. */
  accent?: string;
  subtitle: string;
  actions?: ReactNode;
  /** Shows the Trustpilot and Product Hunt badges under the actions. */
  trust?: boolean;
  image?: string;
  imageAlt?: string;
  /** Used instead of a single image, e.g. the index thumbnail strip. */
  children?: ReactNode;
}) {
  return (
    <header className="mkt-jh">
      <div className="mkt-jh__inner">
        <p className="mkt-jh__eyebrow">{eyebrow}</p>
        <h1 className="mkt-jh__title">{renderAccent(title, accent)}</h1>
        <p className="mkt-jh__sub">{subtitle}</p>
        {actions && <div className="mkt-jh__actions">{actions}</div>}
        {trust && (
          <div className="mkt-jh__trust">
            <ProofBadges compact />
          </div>
        )}
      </div>

      {image && (
        <figure className="mkt-jh__stage">
          <img
            src={image}
            alt={imageAlt ?? ''}
            width={1200}
            height={900}
            loading="eager"
            decoding="async"
          />
        </figure>
      )}

      {children}
    </header>
  );
}
