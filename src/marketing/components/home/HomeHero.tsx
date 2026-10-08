import { ArrowRight } from 'lucide-react';
import { PrimaryButton } from '../ui';
import HeroRippleBackground from '../effects/HeroRippleBackground';
import HomeTrust from './HomeTrust';
import HomeHeroVideo from './HomeHeroVideo';
import BrandMark from '../BrandMark';

import { COMPANY_SHOPIFY_APP_URL } from '../../legal/companyIdentity';

const SHOPIFY_APP_URL = COMPANY_SHOPIFY_APP_URL;

/**
 * Homepage hero, headline + CTAs + trusted-by, product shot flush to section bottom.
 */
export default function HomeHero() {
  return (
    <section className="home-hero">
      <div className="home-hero__inner">
        <div className="home-hero__board">
          <div className="home-hero__mesh-fill" aria-hidden>
            <picture>
              <source
                type="image/webp"
                srcSet="/hero-mesh-640.webp 640w, /hero-mesh-960.webp 960w, /hero-mesh-1280.webp 1280w"
                sizes="100vw"
              />
              <img
                className="home-hero__mesh-img"
                src="/hero-mesh.png"
                alt=""
                width={1280}
                height={720}
                decoding="async"
                fetchPriority="low"
                aria-hidden
              />
            </picture>
          </div>
          <HeroRippleBackground />
          <div className="home-hero__edge-glow" aria-hidden />

          <div className="home-hero__layout">
            <div className="home-hero__copy">
              {/*
                Three short beats instead of one 76-character sentence, and the
                brand lockup moved to the end: the first thing read is what the
                product does, not who makes it. Keeps the three terms the page
                ranks on — COD, abandoned carts, WhatsApp.
              */}
              <h1 className="home-hero__title home-hero__title--job">
                <span className="home-hero__title-text home-hero__title-text--job">
                  Confirm COD orders. Recover abandoned carts. On WhatsApp.
                </span>{' '}
                <span className="home-hero__title-brand">
                  <BrandMark
                    className="home-hero__title-mark"
                    width={28}
                    height={28}
                    size="sm"
                  />
                  <span className="home-hero__title-name">
                    TopEdge <span>AI</span>
                  </span>
                </span>
              </h1>
              <p className="home-hero__sub">
                Live Chat with Shopify order context, Meta-approved journeys, and a 14-day free
                trial—typically live in about fifteen minutes.
              </p>
              <div className="home-hero__actions">
                <PrimaryButton to="/signup">
                  Start free trial
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
                <a
                  className="home-hero__shopify-btn"
                  href={SHOPIFY_APP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Install on Shopify
                  <img
                    src="/platforms/shopify.svg"
                    alt="Shopify"
                    width={18}
                    height={18}
                    className="home-hero__shopify-logo"
                    decoding="async"
                    fetchPriority="low"
                  />
                </a>
              </div>

              <div className="home-hero__trust">
                <HomeTrust onStage />
              </div>
            </div>

            <div className="home-hero__shot home-hero__shot--film">
              <HomeHeroVideo />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
