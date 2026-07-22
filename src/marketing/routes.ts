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
  '/compare',
  '/blog',
  '/privacy-policy',
  '/testimonials',
  '/services',
  '/booking',
];

const NON_MARKETING = ['/community', '/ecommerce', '/admin', '/ai-caller', '/ai-chatbot'];

export function isMarketingRoute(pathname: string): boolean {
  if (NON_MARKETING.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return false;
  }
  if (pathname === '/') return true;
  return MARKETING_PREFIXES.some(
    (p) => p !== '/' && (pathname === p || pathname.startsWith(`${p}/`))
  );
}

export const DASH_SIGNUP = 'https://dash.topedgeai.com/signup';
export const DASH_LOGIN = 'https://dash.topedgeai.com/login';
export const DASH_DOCS = 'https://dash.topedgeai.com/docs';
