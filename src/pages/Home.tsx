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
const HomeFaq = lazy(() => import('../marketing/components/home/HomeFaq'));
const HomeClose = lazy(() => import('../marketing/components/home/HomeClose'));

/**
 * Homepage: hero is critical for LCP.
 * Below-fold mounts only after the first client paint. Prerender sets
 * window.__TOPEDGE_PRERENDER__ so the effect does not flip ready on its own;
 * the prerender script dispatches PRERENDER_BELOW_FOLD_EVENT after snapshotting
 * <head>, so crawlers get the full page while the below-fold CSS it pulls in
 * is written as non-blocking (see scripts/prerender-marketing.mjs).
 */
const PRERENDER_BELOW_FOLD_EVENT = 'topedge:prerender-below-fold';

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
    const isPrerender = Boolean(
      (window as Window & { __TOPEDGE_PRERENDER__?: boolean }).__TOPEDGE_PRERENDER__,
    );
    if (!isPrerender) {
      setBelowFoldReady(true);
      return undefined;
    }
    const reveal = () => setBelowFoldReady(true);
    window.addEventListener(PRERENDER_BELOW_FOLD_EVENT, reveal, { once: true });
    return () => window.removeEventListener(PRERENDER_BELOW_FOLD_EVENT, reveal);
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
            <HomeFaq />
            <HomeClose />
          </Suspense>
        ) : null}
      </MarketingPage>
    </>
  );
}
