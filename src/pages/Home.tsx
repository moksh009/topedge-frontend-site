import { Suspense, lazy, useEffect, useState } from 'react';
import '../marketing/styles/home.css';
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

/** Below-fold sections — keep out of the critical homepage JS path for LCP. */
const HomeStickyStories = lazy(() => import('../marketing/components/home/HomeStickyStories'));
const HomeCrmSurface = lazy(() => import('../marketing/components/home/HomeCrmSurface'));
const HomeRoiPayoff = lazy(() => import('../marketing/components/home/HomeRoiPayoff'));
const HomeTestimonials = lazy(() => import('../marketing/components/home/HomeTestimonials'));
const HomeClose = lazy(() => import('../marketing/components/home/HomeClose'));

/**
 * Homepage: hero is critical for LCP.
 * Below-fold mounts only after client hydration so prerender HTML does not
 * inject StickyStories / demo-video CSS + modulepreloads into <head>
 * (PSI render-blocking on live /).
 */
export default function Home() {
  const seo = PAGE_SEO.home;
  const [belowFoldReady, setBelowFoldReady] = useState(false);

  // Land at top once on mount, do not re-run when Lenis attaches (that felt like scroll fighting).
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    try {
      window.history.scrollRestoration = 'manual';
    } catch {
      /* ignore */
    }
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setBelowFoldReady(true);
    return undefined;
  }, []);

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
        preloadLcpImage={{
          href: '/herooo-immage-800.webp?v=3',
          imagesrcset:
            '/herooo-immage-800.webp?v=3 800w, /herooo-immage-1200.webp?v=3 1200w, /herooo-immage-1600.webp?v=3 1600w, /herooo-immage-2400.webp?v=3 2398w',
          imagesizes: '(max-width: 960px) 92vw, min(1040px, 92vw)',
          type: 'image/webp',
        }}
      />

      <MarketingPage className="home-page !bg-white">
        <div className="home-hero-stage">
          <HomeHero />
        </div>
        {belowFoldReady ? (
          <Suspense fallback={null}>
            <HomeStickyStories />
            <HomeCrmSurface />
            <HomeRoiPayoff />
            <HomeTestimonials />
            <HomeClose />
          </Suspense>
        ) : null}
      </MarketingPage>
    </>
  );
}
