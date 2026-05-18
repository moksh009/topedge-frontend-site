import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { platformTabs } from '../../data/home';
import FeatureMockupBySlug from '../FeatureMockupBySlug';
import { PrimaryButton } from '../ui';
import { cn } from '@/lib/utils';

/** Bitespeed-style platform section — one focus area per tab, single product visual */
export default function HomePlatformTabs() {
  const [active, setActive] = useState(0);
  const tab = platformTabs[active];

  return (
    <section className="bg-white py-20 md:py-28" id="platform">
      <div className="marketing-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#7C3AED]/80">
            Platform
          </p>
          <h2 className="mt-4 text-[1.875rem] leading-[1.1] tracking-[-0.035em] text-[#0c1222] md:text-[2.75rem]">
            One OS for WhatsApp revenue, support, and growth
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-500 md:text-lg">
            Shopify data, Meta templates, and your team — connected. Deep dives live on each module page.
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <div
            className="inline-flex rounded-full border border-slate-200/80 bg-slate-50/80 p-1"
            role="tablist"
            aria-label="Platform areas"
          >
            {platformTabs.map((t, i) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={cn(
                  'rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200',
                  active === i
                    ? 'bg-white text-[#0c1222] shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#7C3AED]">{tab.hub}</p>
            <h3 className="mt-3 text-2xl font-medium tracking-tight text-[#0c1222] md:text-3xl">{tab.title}</h3>
            <p className="mt-4 text-base leading-relaxed text-slate-500">{tab.description}</p>
            <ul className="mt-6 space-y-3">
              {tab.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[15px] text-slate-600">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#7C3AED]" strokeWidth={2.5} />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <PrimaryButton to={`/features/${tab.slug}`}>{tab.cta}</PrimaryButton>
              <Link
                to="/features"
                className="inline-flex items-center gap-1 text-sm font-medium text-[#7C3AED] hover:underline"
              >
                All 12 modules
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="marketing-mockup-stage overflow-hidden rounded-2xl bg-white">
            <FeatureMockupBySlug key={tab.slug} slug={tab.slug} compact stage />
          </div>
        </div>
      </div>
    </section>
  );
}
