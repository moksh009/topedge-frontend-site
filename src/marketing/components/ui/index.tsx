import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

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
        'px-5 py-20 md:px-8 md:py-28',
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

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn('mb-12 max-w-3xl', center && 'mx-auto text-center', className)}>
      {eyebrow && <Eyebrow className={center ? 'text-center' : undefined}>{eyebrow}</Eyebrow>}
      <h2 className="mkt-display mt-3 text-3xl font-medium tracking-tight text-[#0c1222] md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-3xl text-base leading-snug text-slate-500 md:text-lg">{subtitle}</p>
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
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('mkt-wash px-5 pt-32 pb-20 md:px-8 md:pt-40 md:pb-24', className)}>
      <div className="mx-auto max-w-[var(--mkt-max-text)]">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="mkt-display mt-4 text-4xl font-medium tracking-tight text-[#0c1222] md:text-5xl md:leading-[1.1]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-3xl text-lg leading-snug text-slate-500">{subtitle}</p>
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
