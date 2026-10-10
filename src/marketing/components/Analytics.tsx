import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics, trackPageView } from '../lib/analytics';
import { initPostHog, phPageView } from '../lib/posthog';

/**
 * Mounts the measurement tags that are configured, and reports each SPA route change.
 *
 * Two tools on purpose, because they answer different questions: GA4 and the Google
 * Ads tag for aggregates and for feeding the ad auction, PostHog for the per-person
 * journey. Each is inert unless its own id is set.
 */
export default function Analytics() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    initAnalytics();
    initPostHog();
  }, []);

  useEffect(() => {
    // Let react-helmet-async apply the new <title> before it is reported.
    const t = window.setTimeout(() => {
      trackPageView(pathname + search);
      phPageView(pathname + search);
    }, 300);
    return () => window.clearTimeout(t);
  }, [pathname, search]);

  return null;
}
