import FeatureMarketingImage from '../FeatureMarketingImage';
import { PrimaryButton, SecondaryButton } from '../ui';
import { serviceTagline } from '../../data/home';

export default function HomeHero() {
  return (
    <section className="home-hero home-hero--minimal">
      <div className="home-hero-glow" aria-hidden />
      <div className="marketing-container relative pb-16 pt-[calc(var(--marketing-nav-h)+4rem)] md:pb-24 md:pt-[calc(var(--marketing-nav-h)+5rem)]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="home-eyebrow">WhatsApp growth OS · Shopify India</p>
          <h1 className="home-headline mt-5">
            Sell and support on WhatsApp,{' '}
            <span className="home-gradient-text">powered by your Shopify store</span>
          </h1>
          <p className="home-lead mx-auto mt-6 max-w-xl">{serviceTagline}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <PrimaryButton to="/signup">Start free</PrimaryButton>
            <SecondaryButton to="/pricing">See pricing</SecondaryButton>
          </div>
          <p className="mt-6 text-sm text-slate-500">
            No credit card · You approve every template · Live in ~15 minutes
          </p>
        </div>

        <div className="home-hero-visual mx-auto mt-14 w-full max-w-6xl md:mt-20">
          <FeatureMarketingImage imageId="hero-dashboard" preferGraphic priority bare />
        </div>
      </div>
    </section>
  );
}
