import '../marketing/styles/home.css';
import '../marketing/styles/feature-films.css';
import MarketingSEO from '../marketing/components/MarketingSEO';
import { OG_IMAGES } from '../marketing/data/marketingSeo';
import { faqs } from '../marketing/data/home';
import {
  organizationJsonLd,
  PAGE_SEO,
  softwareApplicationJsonLd,
  websiteJsonLd,
} from '../marketing/data/pageSeo';
import MarketingPage from '../marketing/components/MarketingPage';
import HomeHero from '../marketing/components/home/HomeHero';
import HomeStickyStories from '../marketing/components/home/HomeStickyStories';
import HomeChaosZoom from '../marketing/components/home/HomeChaosZoom';
import HomePricingTeaser from '../marketing/components/home/HomePricingTeaser';
import HomeTestimonials from '../marketing/components/home/HomeTestimonials';
import HomeClose from '../marketing/components/home/HomeClose';

/**
 * Homepage: normal scrollable sections (sticky overlap / chaos zoom removed).
 */
export default function Home() {
  const seo = PAGE_SEO.home;

  return (
    <>
      <MarketingSEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        image={OG_IMAGES.home}
        path={seo.path}
        noSuffix
        faqSchema={faqs}
        jsonLd={[organizationJsonLd(), softwareApplicationJsonLd(), websiteJsonLd()]}
      />

      <MarketingPage className="home-page !bg-white">
        <div className="home-hero-stage">
          <HomeHero />
        </div>
        <HomeStickyStories />
        <HomeChaosZoom />
        <HomePricingTeaser />
        <HomeTestimonials />
        <HomeClose />
      </MarketingPage>
    </>
  );
}
