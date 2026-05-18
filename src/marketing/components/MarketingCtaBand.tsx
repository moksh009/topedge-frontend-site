import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';
import { GradientMesh, Reveal } from './motion';
import { PrimaryButton } from './ui';
import { cn } from '@/lib/utils';

type Props = {
  title: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  tertiaryLabel?: string;
  tertiaryTo?: string;
  className?: string;
  variant?: 'violet' | 'light';
};

/** Full-width conversion band — consistent across marketing pages */
export default function MarketingCtaBand({
  title,
  subtitle,
  primaryLabel = 'Create free account',
  primaryTo = '/signup',
  secondaryLabel,
  secondaryTo,
  tertiaryLabel,
  tertiaryTo,
  className,
  variant = 'violet',
}: Props) {
  if (variant === 'light') {
    return (
      <section className={cn('marketing-container pb-16 md:pb-20', className)}>
        <Reveal>
          <div className="rounded-3xl border border-violet-200/60 bg-gradient-to-br from-[#faf5ff] via-white to-violet-50/40 px-6 py-12 text-center md:px-12 md:py-14">
            <h2 className="text-xl font-medium tracking-tight text-[#0c1222] md:text-2xl">{title}</h2>
            {subtitle && <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-500">{subtitle}</p>}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <PrimaryButton to={primaryTo}>{primaryLabel}</PrimaryButton>
              {secondaryLabel && secondaryTo && (
                <Link
                  to={secondaryTo}
                  className="inline-flex h-11 items-center rounded-full border border-violet-200 bg-white px-6 text-sm font-medium text-[#7C3AED] transition hover:border-violet-300 hover:shadow-sm"
                >
                  {secondaryLabel}
                </Link>
              )}
              {tertiaryLabel && tertiaryTo && (
                <Link to={tertiaryTo} className="text-sm font-medium text-[#7C3AED] hover:underline">
                  {tertiaryLabel}
                </Link>
              )}
            </div>
          </div>
        </Reveal>
      </section>
    );
  }

  return (
    <section
      className={cn(
        'relative overflow-hidden border-t border-violet-200/40 bg-gradient-to-br from-[#7C3AED] via-[#6d28d9] to-[#5b21b6] py-20 md:py-24',
        className
      )}
    >
      <GradientMesh className="opacity-25 invert" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(255,255,255,0.12),transparent)]"
      />
      <Reveal className="marketing-container relative max-w-3xl text-center">
        <h2 className="text-[1.75rem] leading-[1.08] tracking-[-0.04em] text-white md:text-[2.5rem]">{title}</h2>
        {subtitle && <p className="mt-4 text-base text-violet-100/90 md:text-lg">{subtitle}</p>}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to={primaryTo}
            className="inline-flex h-12 items-center rounded-full bg-white px-8 text-sm font-semibold text-[#5b21b6] shadow-lg shadow-violet-900/25 transition hover:scale-[1.02] active:scale-[0.99]"
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryTo && (
            <Link
              to={secondaryTo}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              {secondaryTo === '/roi' && <Calculator className="h-4 w-4" />}
              {secondaryLabel}
            </Link>
          )}
          {tertiaryLabel && tertiaryTo && (
            <Link
              to={tertiaryTo}
              className="inline-flex h-12 items-center rounded-full border border-white/20 px-7 text-sm text-white/90 transition hover:bg-white/10"
            >
              {tertiaryLabel}
            </Link>
          )}
        </div>
      </Reveal>
    </section>
  );
}
