/** Every public URL uses the marketing shell, including unknown paths / 404s. */
export function isMarketingRoute(_pathname: string): boolean {
  return true;
}

export { DASH_SIGNUP, DASH_LOGIN, DASH_ORIGIN } from './lib/billingCatalog';
