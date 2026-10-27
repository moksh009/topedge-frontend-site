import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import FeatureMeshStage, { type MeshKey, type MeshTint } from '../effects/FeatureMeshStage';
import '../../styles/product-feature.css';

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('mkt-eyebrow', className)}>{children}</p>;
}

export function PrimaryButton({
  to,
  href,
  children,
  className,
  onClick,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const cls = cn('mkt-btn-primary', className);
  if (href) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} onClick={onClick}>
      {children}
    </button>
  );
}

export function GhostButton({
  to,
  href,
  children,
  className,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
}) {
  const cls = cn('mkt-btn-ghost', className);
  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to ?? '#'} className={cls}>
      {children}
    </Link>
  );
}

export function MarketingCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn('mkt-card', className)}>{children}</div>;
}

export function Section({
  children,
  className,
  subtle,
  wash,
  id,
}: {
  children: ReactNode;
  className?: string;
  subtle?: boolean;
  wash?: 'soft' | 'deep' | true;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        // Was py-20/py-28. At 112px a side, four sections of short copy filled
        // three screens with mostly air; the reference sites run about 80.
        'px-5 py-14 md:px-8 md:py-20',
        subtle && 'bg-[#faf9ff]',
        wash === true && 'mkt-wash',
        wash === 'soft' && 'mkt-wash-soft',
        wash === 'deep' && 'mkt-wash-deep',
        className
      )}
    >
      <div className="mx-auto max-w-[var(--mkt-max-wide)]">{children}</div>
    </section>
  );
}

/**
 * Splits `title` on `accent` so one phrase carries the lilac highlight the
 * homepage h2s use. Falls back to the plain title when the phrase is not
 * found, rather than rendering a half-matched span.
 */
function withAccent(title: string, accent?: string) {
  if (!accent) return title;
  const i = title.indexOf(accent);
  if (i < 0) return title;
  return (
    <>
      {title.slice(0, i)}
      <span className="mkt-hl">{accent}</span>
      {title.slice(i + accent.length)}
    </>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  subtitle,
  center = true,
  className,
}: {
  eyebrow?: string;
  title: string;
  /** Phrase inside `title` to highlight, as on the homepage section heads. */
  accent?: string;
  subtitle?: string;
  /**
   * Centred by default. Every section on these pages centres its heading and
   * the cards below it are centred too, so a left-set h2 over a centred grid
   * read as a mistake on the pages that forgot to pass it.
   */
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('mb-8 max-w-3xl', center && 'mx-auto text-center', className)}>
      {eyebrow && <Eyebrow className={center ? 'text-center' : undefined}>{eyebrow}</Eyebrow>}
      <h2 className="mkt-display mt-2.5 text-[1.6rem] font-normal tracking-tight text-[#0c1222] md:text-[2rem]">
        {withAccent(title, accent)}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 max-w-3xl text-base leading-snug text-[#5a6474] md:text-lg',
            center && 'mx-auto',
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  className,
  atmosphere = 'wash',
  tint = 'violet',
  mesh = 'features-index',
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
  /** wash = soft violet fade; mesh = unique generated mesh image */
  atmosphere?: 'wash' | 'mesh';
  tint?: MeshTint;
  mesh?: MeshKey;
}) {
  const body = (
    <div className={cn(atmosphere === 'mesh' ? 'px-5 pt-32 pb-16 md:px-8 md:pt-40 md:pb-20' : undefined)}>
      <div className="mx-auto max-w-[var(--mkt-max-text)]">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1
          className={cn(
            'mkt-display font-normal tracking-[-0.034em] leading-[1.15] text-[#0c1222]',
            'text-[clamp(1.45rem,2.8vw,2.35rem)]',
            'max-[640px]:text-[clamp(1.35rem,5.5vw,1.75rem)]',
            eyebrow ? 'mt-4' : 'mt-0',
          )}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-3xl text-[clamp(0.9rem,1.5vw,1.05rem)] leading-snug text-[#5a6474] max-[640px]:text-[0.875rem]">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </div>
  );

  if (atmosphere === 'mesh') {
    return (
      <FeatureMeshStage tint={tint} mesh={mesh} fillViewport={false} className={className}>
        {body}
      </FeatureMeshStage>
    );
  }

  return (
    <section className={cn('mkt-wash px-5 pt-24 pb-14 md:px-8 md:pt-28 md:pb-16', className)}>
      <div className="mx-auto max-w-[var(--mkt-max-text)]">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1
          className={cn(
            'mkt-display font-normal tracking-[-0.034em] leading-[1.15] text-[#0c1222]',
            'text-[clamp(1.45rem,2.8vw,2.35rem)]',
            'max-[640px]:text-[clamp(1.35rem,5.5vw,1.75rem)]',
            eyebrow ? 'mt-4' : 'mt-0',
          )}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-3xl text-[clamp(0.9rem,1.5vw,1.05rem)] leading-snug text-[#5a6474] max-[640px]:text-[0.875rem]">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

export function SamplePill({ className }: { className?: string }) {
  return <span className={cn('mkt-sample-pill', className)}>Sample preview</span>;
}

export { Eyebrow as default };
