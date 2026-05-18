import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

type Stat = {
  label: string;
  value: string;
};

type MarketingPageTemplateProps = {
  eyebrow: string;
  title: string;
  description: string;
  stats?: Stat[];
  primaryCta?: { label: string; to: string };
  secondaryCta?: { label: string; to: string };
  children?: React.ReactNode;
};

export default function MarketingPageTemplate({
  eyebrow,
  title,
  description,
  stats = [],
  primaryCta = { label: 'Get Started', to: '/booking' },
  secondaryCta = { label: 'See Pricing', to: '/pricing' },
  children
}: MarketingPageTemplateProps) {
  return (
    <div className="bg-[#f8f7ff] text-slate-900">
      <section className="mx-auto max-w-6xl px-4 pt-32 pb-16 text-center sm:px-6 lg:px-8">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-violet-600">{eyebrow}</p>
        <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base text-slate-600 sm:text-lg">{description}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to={primaryCta.to}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {primaryCta.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to={secondaryCta.to}
            className="inline-flex items-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-white"
          >
            {secondaryCta.label}
          </Link>
        </div>
      </section>

      {!!stats.length && (
        <section className="mx-auto grid max-w-6xl gap-4 px-4 pb-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-violet-100 bg-white p-6 text-center shadow-sm">
              <p className="text-sm text-slate-500">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold text-violet-700">{stat.value}</p>
            </div>
          ))}
        </section>
      )}

      {children}
    </div>
  );
}
