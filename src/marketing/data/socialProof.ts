import raw from './socialProof.json';

/**
 * Typed view over socialProof.json.
 *
 * The JSON is the single source: scripts/generate-landing-pages.mjs reads the
 * same file for the paid landing page, and scripts/check-landing-pages.mjs
 * asserts the review texts against its own second copy, so a reword that
 * nobody checked against Trustpilot fails the build.
 *
 * Nothing here may be written from memory — see the `_comment` block in the
 * JSON for what that means in practice.
 */

export type TrustpilotQuote = {
  text: string;
  author: string;
};

export type CustomerStory = {
  slug: string;
  name: string;
  logo: string;
  /** Full-colour mark, where one exists; `logo` is the flat mark. */
  logoColor?: string;
  href?: string;
  category: string;
  person: string;
  role: string;
  headline: string;
  quote: string;
  facts: string[];
  art: string;
};

export const TRUSTPILOT = raw.trustpilot;

/** The three published reviews, verbatim. Never reword these. */
export const TRUSTPILOT_QUOTES: TrustpilotQuote[] = raw.trustpilot.quotes;

/**
 * The reviews are quoted as published, so the date a human last read them off
 * the live page travels with them. A quote with no retrieval date is a claim
 * the reader cannot check.
 */
export const TRUSTPILOT_RETRIEVED = raw.trustpilot.retrieved;

/* ---------- Product Hunt ---------- */

export type ProductHuntQuote = {
  text: string;
  author: string;
  /** What Product Hunt shows under the name, where it shows one. */
  role?: string;
  /** 1-5, as that reviewer left it. Omitted when the review carries no score. */
  rating?: number;
};

export const PRODUCT_HUNT = raw.productHunt;

/**
 * Reviews published on the Product Hunt listing, verbatim.
 *
 * Empty until a human reads them off the live page. Callers must treat empty
 * as "render nothing", never as "write something plausible" — see the
 * `_comment` block in the JSON.
 */
export const PRODUCT_HUNT_QUOTES: ProductHuntQuote[] = raw.productHunt.quotes;

/** True once the listing's own rating has been read off the page. */
export function hasProductHuntRating() {
  return Boolean(raw.productHunt.rating && raw.productHunt.reviews);
}

export const CUSTOMER_STORIES: CustomerStory[] = raw.customers;

/** `4.0 out of 5 on Trustpilot, from 5 reviews` — the whole claim in one line. */
export function trustpilotSummary() {
  return `${TRUSTPILOT.score} out of 5 on Trustpilot, from ${TRUSTPILOT.reviews} reviews`;
}
