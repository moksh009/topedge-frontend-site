import { ArrowRight } from 'lucide-react';
import { PrimaryButton } from '../ui';
import HeroRippleBackground from '../effects/HeroRippleBackground';
import HomeTrust from './HomeTrust';

const HERO_PRODUCT_SHOT = '/herooo-immage.png';
const SHOPIFY_APP_URL = 'https://apps.shopify.com/';

/**
 * Homepage hero — headline + CTAs + trusted-by, then product shot clipped ~20% at bottom.
 */
export default function HomeHero() {
  return (
    <section className="home-hero">
      <div className="home-hero__inner">
        <div className="home-hero__board">
          <div className="home-hero__mesh-fill" aria-hidden />
          <HeroRippleBackground />
          <div className="home-hero__edge-glow" aria-hidden />

          <div className="home-hero__layout">
            <div className="home-hero__copy">
              <h1 className="home-hero__title">
                <span className="home-hero__title-line">
                  Recover revenue with{' '}
                  <span className="home-hero__title-brand">
                    <img
                      src="/brand-mark.png"
                      alt=""
                      width={28}
                      height={28}
                      className="home-hero__title-mark"
                      decoding="async"
                    />
                    <span className="home-hero__title-name">
                      TopEdge <span>AI</span>
                    </span>
                  </span>
                </span>
              </h1>
              <p className="home-hero__sub">
                Abandoned carts, COD confirms, and Live Chat with Shopify order context. On
                WhatsApp, live in about fifteen minutes.
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
                    alt=""
                    width={18}
                    height={18}
                    className="home-hero__shopify-logo"
                    decoding="async"
                  />
                </a>
              </div>

              <div className="home-hero__trust">
                <HomeTrust onStage />
              </div>
            </div>

            <div className="home-hero__shot">
              <img
                src={HERO_PRODUCT_SHOT}
                alt="TopEdge dashboard — WhatsApp commerce workspace"
                width={1600}
                height={1000}
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
