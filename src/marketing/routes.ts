/** Use marketing chrome everywhere except community, ecommerce, and admin. */
const NON_MARKETING_PREFIXES = ['/community', '/admin'];
const NON_MARKETING_EXACT = new Set(['/ecommerce']);

export function isMarketingRoute(pathname: string): boolean {
  if (NON_MARKETING_EXACT.has(pathname)) return false;
  if (NON_MARKETING_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return false;
  return true;
}
