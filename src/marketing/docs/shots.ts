import shots from 'virtual:docs-shots';

/**
 * Screenshot manifest: public/docs/img/shots.json, `{ "<id>": { "w": 2880, "h": 1600 } }`.
 *
 * Read at build time through the `docs-shots` plugin in vite.config.ts, so the
 * width and height are in the prerendered HTML (no layout shift) and a missing
 * manifest is simply an empty one. An id that is not listed renders nothing.
 */
export type ShotSize = { w: number; h: number };

const MANIFEST = shots as Record<string, ShotSize>;

export function shotFor(id: string): ShotSize | null {
  const s = MANIFEST[id];
  return s && s.w > 0 && s.h > 0 ? s : null;
}

export function shotSrc(id: string): string {
  return `/docs/img/${id}.webp`;
}
