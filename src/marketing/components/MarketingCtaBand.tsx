import { PrimaryButton, GhostButton } from './ui';

export default function MarketingCtaBand({
  title,
  subtitle,
  primaryLabel = 'Start free',
  primaryTo = '/signup',
  secondaryLabel,
  secondaryTo,
}: {
  title: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}) {
  return (
    <section className="mkt-wash-cta px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mkt-display text-3xl font-medium tracking-tight text-[#0c1222] md:text-4xl md:leading-[1.15]">
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-slate-500">{subtitle}</p>
        )}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <PrimaryButton to={primaryTo}>{primaryLabel}</PrimaryButton>
          {secondaryLabel && secondaryTo && (
            <GhostButton to={secondaryTo}>{secondaryLabel}</GhostButton>
          )}
        </div>
      </div>
    </section>
  );
}
