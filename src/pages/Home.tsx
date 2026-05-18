import '../marketing/styles/home.css';
import SEO from '../components/SEO';
import MarketingPage from '../marketing/components/MarketingPage';
import HomeHero from '../marketing/components/home/HomeHero';
import HomeFeatureGallery from '../marketing/components/home/HomeFeatureGallery';
import HomeTrust from '../marketing/components/home/HomeTrust';
import HomeHowItWorks from '../marketing/components/home/HomeHowItWorks';
import HomeTestimonials from '../marketing/components/home/HomeTestimonials';
import HomePricingPreview from '../marketing/components/home/HomePricingPreview';
import HomeClose from '../marketing/components/home/HomeClose';

/** Minimal Instantly-style homepage — hero, feature gallery with graphics, proof, pricing, FAQ */
export default function Home() {
  return (
    <>
      <SEO
        title="TopEdge | WhatsApp growth OS for Shopify India"
        description="Connect Shopify to WhatsApp. Approve Meta templates, automate cart recovery & orders, run campaigns, and manage one inbox — built for Indian D2C."
        type="website"
      />

      <MarketingPage className="home-page !bg-white">
        <HomeHero />
        <HomeFeatureGallery />
        <HomeTrust />
        <HomeHowItWorks />
        <HomeTestimonials />
        <HomePricingPreview />
        <HomeClose />
      </MarketingPage>
    </>
  );
}
