import { CONTENT_DATES } from './generated/contentDates';

/** Format YYYY-MM-DD for visible UI (en-IN, UTC calendar day). */
export function formatUpdatedLabel(isoDate: string): string {
  const d = new Date(`${isoDate}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** Visible kicker text, e.g. "Updated 20 Sep 2026". */
export function updatedKicker(isoDate: string): string {
  return `Updated ${formatUpdatedLabel(isoDate)}`;
}

export function compareTwoWayModifiedIso(): string {
  return CONTENT_DATES.compareTwoWay;
}

export function compareThreeWayModifiedIso(): string {
  return CONTENT_DATES.compareThreeWay;
}

export function blogCorpusModifiedIso(): string {
  return CONTENT_DATES.blogPosts;
}

export function featurePagesModifiedIso(): string {
  return CONTENT_DATES.featurePages;
}

export function pricingModifiedIso(): string {
  return CONTENT_DATES.pricing;
}

/**
 * Article dateModified: optional per-post `updated`, else blogPosts.ts file mtime
 * (build-generated). Never a hardcoded evergreen string.
 */
export function articleDateModifiedIso(opts: { updated?: string }): string {
  if (opts.updated) {
    const d = new Date(opts.updated.includes('T') ? opts.updated : `${opts.updated}T12:00:00Z`);
    if (!Number.isNaN(d.getTime())) return d.toISOString();
  }
  return new Date(`${blogCorpusModifiedIso()}T12:00:00Z`).toISOString();
}

export function articleDatePublishedIso(published: string): string {
  const d = new Date(published.includes('T') ? published : `${published}T12:00:00Z`);
  if (Number.isNaN(d.getTime())) return articleDateModifiedIso({});
  return d.toISOString();
}
