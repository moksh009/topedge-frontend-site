const MARKETING_PREFIXES = [
  '/',
  '/about',
  '/contact',
  '/pricing',
  '/features',
  '/integrations',
  '/customers',
  '/solutions',
  '/agency',
  '/security',
  '/signup',
  '/login',
  '/docs',
  '/roi',
  '/terms',
  '/terms-of-service',
  '/compare',
  '/blog',
  '/privacy',
  '/privacy-policy',
  '/testimonials',
  '/services',
  '/booking',
  '/whatsapp-cart-recovery',
  '/cod-confirmation-whatsapp',
  '/shopify-whatsapp-integration',
];

const NON_MARKETING = ['/community', '/admin', '/ai-caller', '/ai-chatbot'];

export function isMarketingRoute(pathname: string): boolean {
  if (NON_MARKETING.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return false;
  }
  if (pathname === '/') return true;
  return MARKETING_PREFIXES.some(
    (p) => p !== '/' && (pathname === p || pathname.startsWith(`${p}/`))
  );
}

export { DASH_SIGNUP, DASH_LOGIN, DASH_ORIGIN } from './lib/billingCatalog';
export const DASH_DOCS = 'https://dash.topedgeai.com/docs';
