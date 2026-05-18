import { useState } from 'react';
import { platformTabs } from '../../data/home';
import FeatureMockupBySlug from '../FeatureMockupBySlug';
import { MockupDisplayProvider } from '../../mockups/shared/MockupDisplayContext';
import { PrimaryButton } from '../ui';
import { cn } from '@/lib/utils';

export default function HomeShowcase() {
  const [active, setActive] = useState(0);
  const tab = platformTabs[active];

  return (
    <section className="home-showcase py-20 md:py-28" id="platform">
      <div className="marketing-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="home-eyebrow text-violet-200/90">Platform</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-white md:text-4xl">
            Automate revenue, run support, and grow on WhatsApp
          </h2>
          <p className="mt-4 text-lg text-violet-100/80">
            Three jobs every Indian D2C team needs — inbox, flows, and campaigns — powered by live Shopify data.
          </p>
        </div>

        <nav
          className="mt-12 flex justify-center gap-6 overflow-x-auto border-b border-white/15 md:gap-10"
          aria-label="Platform areas"
        >
          {platformTabs.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(i)}
              className={cn('home-tab', active === i && 'home-tab--active')}
            >
              {t.label}
            </button>
          ))}
        </nav>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="home-showcase-panel p-8 md:p-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-violet-200">{tab.hub}</p>
            <h3 className="mt-3 text-2xl font-medium tracking-tight text-white md:text-3xl">{tab.title}</h3>
            <p className="mt-4 leading-relaxed text-violet-100/85">{tab.description}</p>
            <ul className="mt-6 space-y-3">
              {tab.bullets.map((b) => (
                <li key={b} className="home-bullet">
                  <span className="home-bullet-dot" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <PrimaryButton to={`/features/${tab.slug}`}>{tab.cta}</PrimaryButton>
            </div>
          </div>

          <MockupDisplayProvider float={false} glow={false}>
            <div className="home-showcase-mockup">
              <FeatureMockupBySlug key={tab.slug} slug={tab.slug} compact />
            </div>
          </MockupDisplayProvider>
        </div>
      </div>
    </section>
  );
}
