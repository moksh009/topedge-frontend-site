/**
 * SEO / AEO snippet budgets + page-type schema contracts (SSOT constants for React).
 * Node prerender uses scripts/seo-contracts.mjs — keep limits in sync.
 */

export const TITLE_MIN = 15;
export const TITLE_MAX = 65;
export const DESC_MIN = 70;
export const DESC_MAX = 165;

/** Default OG image dimensions for public/og-image.png (measured 2026-09-21). */
export const OG_IMAGE_WIDTH = 1024;
export const OG_IMAGE_HEIGHT = 1024;
export const OG_IMAGE_ALT_DEFAULT = 'TopEdge — WhatsApp automation for Shopify India';

export type SnippetBudgetResult = {
  ok: boolean;
  errors: string[];
  titleLen: number;
  descriptionLen: number;
};

export function assertSnippetBudgets(
  title: string,
  description: string,
): SnippetBudgetResult {
  const titleLen = [...title].length;
  const descriptionLen = [...description].length;
  const errors: string[] = [];

  if (titleLen < TITLE_MIN) errors.push(`title too short (${titleLen}<${TITLE_MIN})`);
  if (titleLen > TITLE_MAX) errors.push(`title too long (${titleLen}>${TITLE_MAX})`);
  if (descriptionLen < DESC_MIN) errors.push(`description too short (${descriptionLen}<${DESC_MIN})`);
  if (descriptionLen > DESC_MAX) errors.push(`description too long (${descriptionLen}>${DESC_MAX})`);

  return { ok: errors.length === 0, errors, titleLen, descriptionLen };
}
