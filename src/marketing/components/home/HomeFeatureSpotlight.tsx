import { useState } from 'react';
import { Link } from 'react-router-dom';
import { productStories } from '../../data/home';
import FeatureMockupBySlug from '../FeatureMockupBySlug';
import { MockupDisplayProvider } from '../../mockups/shared/MockupDisplayContext';
import { PrimaryButton } from '../ui';
import { cn } from '@/lib/utils';

export default function HomeFeatureSpotlight() {
  const [active, setActive] = useState(0);
  const story = productStories[active];

  return (
    <section className="bg-white py-20 md:py-28" id="features">
      <div className="marketing-container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="home-eyebrow">What you get</p>
          <h2 className="home-section-title mt-3">Four outcomes Indian D2C teams care about</h2>
          <p className="home-section-lead">
            Cart recovery, unified inbox, catalog-trained AI, and Meta-safe campaigns — each powered by live Shopify
            data.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {productStories.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(i)}
              className={cn('home-spotlight-pill', active === i && 'home-spotlight-pill--active')}
            >
              {s.eyebrow}
            </button>
          ))}
        </div>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#7C3AED]">{story.eyebrow}</p>
            <h3 className="mt-3 text-2xl font-medium tracking-tight text-[#0c1222] md:text-3xl">{story.title}</h3>
            <p className="mt-4 leading-relaxed text-slate-500">{story.description}</p>
            <ul className="mt-6 space-y-3">
              {story.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-sm text-slate-600">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7C3AED]" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryButton to={`/features/${story.slug}`}>{story.cta}</PrimaryButton>
              <Link
                to="/features"
                className="inline-flex h-11 items-center text-sm font-semibold text-[#7C3AED] hover:underline"
              >
                All 12 modules →
              </Link>
            </div>
          </div>

          <MockupDisplayProvider float={false} glow={false}>
            <div className="home-spotlight-mockup order-1 lg:order-2">
              <FeatureMockupBySlug key={story.slug} slug={story.slug} compact />
            </div>
          </MockupDisplayProvider>
        </div>
      </div>
    </section>
  );
}
