/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BILLING_CATALOG_URL?: string;
  readonly NEXT_PUBLIC_BILLING_CATALOG_URL?: string;
  /** GA4 measurement id (G-XXXXXXXXXX). Analytics is off when unset. */
  readonly VITE_GA_MEASUREMENT_ID?: string;
}
