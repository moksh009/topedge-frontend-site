/** Paths that use community/admin chrome (not marketing site shell). */
const NON_MARKETING = ['/community', '/admin'];

/**
 * Marketing chrome for every public URL, including unknown paths / 404s.
 * Only community & admin stay off the marketing shell.
 */
export function isMarketingRoute(pathname: string): boolean {
  if (NON_MARKETING.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return false;
  }
  return true;
}

export { DASH_SIGNUP, DASH_LOGIN, DASH_ORIGIN } from './lib/billingCatalog';
export const DASH_DOCS = 'https://dash.topedgeai.com/docs';
