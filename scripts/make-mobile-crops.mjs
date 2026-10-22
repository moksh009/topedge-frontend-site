#!/usr/bin/env node
/**
 * Mobile crops for the product-page stills.
 *
 * Why these exist: a 1400px dashboard inside a 350px frame is a picture of a
 * product too small to read the product in, and a CSS `object-fit` crop can
 * only guess where the content is. These are cut from the real panel bounds
 * to 4:3 and served to phones through <picture>.
 *
 * The crop is deliberate, not clever: find the white UI panel inside the
 * decorative frame, then take the left 4:3 of it at full height (a wide
 * dashboard) or the top 4:3 at full width (a square one). On every screen in
 * this set the sidebar, the heading and the first rows live there.
 *
 * Usage: node scripts/make-mobile-crops.mjs [--check]
 * --check fails when a crop is missing or older than its source, so the build
 * can tell you the source moved without regenerating binaries behind your back.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const check = process.argv.includes('--check');

/**
 * Stills rendered by DemoProductImageFrame on /features/*, with where to cut.
 *
 * 'panel' is the default and the one the note above describes: find the UI
 * panel, take its top left. 'center' is for the handful that are illustrations
 * rather than screenshots, where there is no sidebar to keep and cutting the
 * top left just beheads the drawing.
 */
export const MOBILE_CROP_SOURCES = [
  { src: '/aiii/ai-brain-hero.png', focus: 'center' },
  { src: '/audience-crm-hero.png', focus: 'panel' },
  { src: '/campaignn.png', focus: 'panel' },
  { src: '/marketing/customers/customers-outcome-template.png', focus: 'center' },
  { src: '/marketing/solutions/sol-fashion-inbox.png', focus: 'center' },
  { src: '/pnl/39.png', focus: 'panel' },
  { src: '/warranty-sub-feature/manual-assign.png', focus: 'panel' },
  { src: '/website-pixel.png', focus: 'panel' },
];

export function mobileSrcFor(src) {
  const clean = src.split('?')[0];
  return clean.replace(/\.(png|jpe?g|webp)$/i, '-mobile.webp');
}

const script = `
import sys, json
from PIL import Image
import numpy as np

def panel_box(im):
    small = im.copy(); small.thumbnail((900, 900))
    a = np.asarray(small.convert('RGB')).astype(np.int16)
    near_white = (a.min(axis=2) > 225)
    W, H = small.size
    cols = np.where(near_white.mean(axis=0) > 0.35)[0]
    rows = np.where(near_white.mean(axis=1) > 0.35)[0]
    if len(cols) == 0 or len(rows) == 0:
        return (0, 0, im.size[0], im.size[1])
    sx, sy = im.size[0] / W, im.size[1] / H
    return (int(cols[0]*sx), int(rows[0]*sy), int((cols[-1]+1)*sx), int((rows[-1]+1)*sy))

TARGET = 4 / 3
OUT_W = 960

for src, dst, focus in json.loads(sys.argv[1]):
    im = Image.open(src).convert('RGB')
    W, H = im.size
    if focus == 'center':
        # An illustration: keep all of it and take the middle band.
        if W / H > TARGET:
            ch = H; cw = int(round(H * TARGET))
        else:
            cw = W; ch = int(round(W / TARGET))
        l = (W - cw) // 2; t = (H - ch) // 2
    else:
        l, t, r, b = panel_box(im)
        pw, ph = r - l, b - t
        if pw / ph > TARGET:
            # Wide dashboard: full panel height, left 4:3 of it.
            cw = int(round(ph * TARGET)); ch = ph
        else:
            # Square or tall: full panel width, top 4:3 of it.
            cw = pw; ch = int(round(pw / TARGET))
    cw = min(cw, W - l); ch = min(ch, H - t)
    crop = im.crop((l, t, l + cw, t + ch))
    if crop.size[0] > OUT_W:
        crop = crop.resize((OUT_W, int(round(OUT_W * crop.size[1] / crop.size[0]))), Image.LANCZOS)
    crop.save(dst, 'WEBP', quality=82, method=6)
    print(dst, crop.size)
`;

const jobs = [];
const stale = [];
for (const { src, focus } of MOBILE_CROP_SOURCES) {
  const from = path.join(root, 'public', src.replace(/^\//, ''));
  const to = path.join(root, 'public', mobileSrcFor(src).replace(/^\//, ''));
  if (!fs.existsSync(from)) {
    console.error(`✖ source missing: ${src}`);
    process.exit(1);
  }
  const fresh =
    fs.existsSync(to) && fs.statSync(to).mtimeMs >= fs.statSync(from).mtimeMs;
  if (!fresh) stale.push(src);
  jobs.push([from, to, focus]);
}

if (check) {
  if (stale.length) {
    console.error(`\n✖ mobile crops are stale or missing (${stale.length})\n`);
    for (const s of stale) console.error(`  - ${s} → ${mobileSrcFor(s)}`);
    console.error('\nRun: node scripts/make-mobile-crops.mjs\n');
    process.exit(1);
  }
  console.log(`✓ mobile crop check passed — ${jobs.length} crops present and current`);
  process.exit(0);
}

const run = spawnSync('python3', ['-c', script, JSON.stringify(jobs)], {
  encoding: 'utf8',
});
if (run.status !== 0) {
  console.error(run.stderr || run.stdout);
  process.exit(1);
}
process.stdout.write(run.stdout);
console.log(`✅ ${jobs.length} mobile crops written`);
