import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { PrimaryButton, GhostButton } from './ui';

export default function MarketingCtaBand({
  eyebrow,
  title,
  subtitle,
  primaryLabel = 'Start free',
  primaryTo = '/signup',
  primaryHref,
  secondaryLabel,
  secondaryTo,
  secondaryHref,
  titleOneLine = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  primaryLabel?: string;
  primaryTo?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  secondaryHref?: string;
  /** Keep the title on a single row; font scales with viewport */
  titleOneLine?: boolean;
}) {
  return (
    <section
      className={['mkt-cta', titleOneLine ? 'mkt-cta--oneline' : ''].filter(Boolean).join(' ')}
      aria-label="Start free"
    >
      <div className="mkt-cta__glow" aria-hidden />
      <div className="mkt-cta__inner">
        {eyebrow ? <p className="mkt-cta__eyebrow">{eyebrow}</p> : null}
        <h2 className="mkt-cta__title">{title}</h2>
        {subtitle ? <p className="mkt-cta__sub">{subtitle}</p> : null}
        <div className="mkt-cta__actions">
          {primaryHref ? (
            <PrimaryButton href={primaryHref} className="mkt-cta__primary">
              {primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </PrimaryButton>
          ) : (
            <PrimaryButton to={primaryTo} className="mkt-cta__primary">
              {primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </PrimaryButton>
          )}
          {secondaryLabel && (secondaryHref || secondaryTo) ? (
            secondaryHref ? (
              <GhostButton href={secondaryHref} className="mkt-cta__secondary">
                {secondaryLabel}
              </GhostButton>
            ) : (
              <GhostButton to={secondaryTo!} className="mkt-cta__secondary">
                {secondaryLabel}
              </GhostButton>
            )
          ) : null}
        </div>
      </div>
    </section>
  );
}
