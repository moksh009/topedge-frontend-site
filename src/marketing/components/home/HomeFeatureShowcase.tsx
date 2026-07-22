import { Link } from 'react-router-dom';
import FeatureScene from '../foundation/FeatureScene';
import { homeStories, homeIntegrations, type FeatureStoryId } from '../../data/home';
import { PrimaryButton } from '../ui';
import { stickyStoryIds } from './HomeStickyStories';

const stickyIdSet = new Set<string>(stickyStoryIds);
const showcaseStories = homeStories.filter((item) => !stickyIdSet.has(item.id));

/**
 * Instantly-style blocks: centered headline, short body, CTA, unique stage.
 * Sticky scroll covers cart-recovery, inbox, journey; this keeps the rest.
 * Deep hubs live on /features.
 */
export default function HomeFeatureShowcase() {
  return (
    <>
      {showcaseStories.map((item) => (
        <section key={item.id} className="home-block">
          <div className="home-block__copy">
            <h2 className="mkt-display home-block__title">{item.title}</h2>
            <p className="home-block__body">{item.body}</p>
            <div className="home-block__cta">
              <PrimaryButton to="/signup">{item.cta}</PrimaryButton>
            </div>
          </div>
          <div className="home-block__stage">
            <FeatureScene variant={item.id as FeatureStoryId} />
          </div>
          <p className="home-block__more">
            <Link to={item.href}>See product details</Link>
          </p>
        </section>
      ))}

      <section className="home-block home-block--tools">
        <div className="home-block__copy">
          <h2 className="mkt-display home-block__title">Connect your stack</h2>
          <p className="home-block__body">
            Shopify, Meta, and Instagram. Edit live data in your dashboard.
          </p>
          <div className="home-block__cta">
            <PrimaryButton to="/signup">Start free</PrimaryButton>
          </div>
        </div>
        <div className="home-tools">
          <div className="home-tools__rail">
            {homeIntegrations.map((tool) => (
              <Link key={tool.name} to={tool.href} className="home-tools__card">
                <p className="text-[15px] font-medium text-[#0c1222]">{tool.name}</p>
                <div className="mt-3 flex-1 space-y-1.5">
                  {tool.rows.map((row) => (
                    <div key={row.label} className="fs-srow !min-h-0 !py-1.5 !px-2">
                      <div className="fs-srow__body">
                        <span className="fs-srow__label">{row.label}</span>
                        <span className="fs-srow__value">{row.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <span className="mt-5 inline-flex h-9 items-center justify-center rounded-full bg-[#7C3AED] px-4 text-xs font-medium text-white">
                  {tool.action}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <p className="home-block__more">
          <Link to="/features">All product hubs</Link>
        </p>
      </section>
    </>
  );
}
