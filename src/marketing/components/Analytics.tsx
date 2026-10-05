import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics, trackPageView } from '../lib/analytics';

/** Mounts GA4 (when configured) and reports each SPA route change as a page view. */
export default function Analytics() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    // Let react-helmet-async apply the new <title> before it is reported.
    const t = window.setTimeout(() => trackPageView(pathname + search), 300);
    return () => window.clearTimeout(t);
  }, [pathname, search]);

  return null;
}
