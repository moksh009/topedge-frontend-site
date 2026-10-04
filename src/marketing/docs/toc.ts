import type { DocBlock } from './types';

export type TocEntry = { id: string; text: string; level: 2 | 3 };

/**
 * Headings read from the content blocks rather than scraped from the DOM, so the
 * contents list is present in the prerendered HTML instead of appearing only
 * after hydration.
 */
export function tocFromBlocks(blocks: DocBlock[]): TocEntry[] {
  const entries: TocEntry[] = [];
  for (const block of blocks) {
    if (block.kind === 'h2') entries.push({ id: block.id, text: block.text, level: 2 });
    if (block.kind === 'h3') entries.push({ id: block.id, text: block.text, level: 3 });
  }
  return entries;
}
