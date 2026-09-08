import { ArrowRight } from 'lucide-react';
import { PrimaryButton } from '../ui';
import HeroRippleBackground from '../effects/HeroRippleBackground';
import HomeTrust from './HomeTrust';
import HeroJourneyStage from './HeroJourneyStage';

/**
 * Homepage hero — left copy + CTA, right dual-device motion graphic, trust logos below.
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
                <span className="home-hero__title-line">Recover revenue with</span>
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
              </h1>
              <p className="home-hero__sub">
                Abandoned carts, COD confirms, and Live Chat with Shopify order context. On
                WhatsApp, live in about fifteen minutes.
              </p>
              <div className="home-hero__actions">
                <PrimaryButton to="/signup">
                  Start free
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              </div>
            </div>

            <div className="home-hero__visual">
              <HeroJourneyStage />
            </div>
          </div>

          <div className="home-hero__trust">
            <HomeTrust onStage />
          </div>
        </div>
      </div>
    </section>
  );
}
