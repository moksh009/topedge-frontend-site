import '../marketing/styles/home.css';
import '../marketing/styles/feature-scenes.css';
import MarketingSEO from '../marketing/components/MarketingSEO';
import { OG_IMAGES } from '../marketing/data/marketingSeo';
import { faqs } from '../marketing/data/home';
import MarketingPage from '../marketing/components/MarketingPage';
import HomeHero from '../marketing/components/home/HomeHero';
import HomeStickyStories from '../marketing/components/home/HomeStickyStories';
import HomeChaosZoom from '../marketing/components/home/HomeChaosZoom';
import HomePricingStage from '../marketing/components/home/HomePricingStage';
import HomeTestimonials from '../marketing/components/home/HomeTestimonials';
import HomeFaq from '../marketing/components/home/HomeFaq';
import HomeClose from '../marketing/components/home/HomeClose';

/**
 * Homepage: Instantly-style stages, crisp copy, no filler eyebrows/trust pills.
 */
export default function Home() {
  return (
    <>
      <MarketingSEO
        title="TopEdge | WhatsApp for Shopify India"
        description="Connect Shopify to WhatsApp. Recover carts, run Live Chat with order context, and automate journeys. Built for Indian D2C."
        image={OG_IMAGES.home}
        path="/"
        noSuffix
        faqSchema={faqs}
      />

      <MarketingPage className="home-page !bg-white">
        <div className="home-hero-stage">
          <HomeHero />
        </div>
        <HomeStickyStories />
        <HomeChaosZoom />
        <HomePricingStage />
        <HomeTestimonials />
        <HomeFaq />
        <HomeClose />
      </MarketingPage>
    </>
  );
}
