/**
 * Load the TypeScript docs registry from plain Node.
 *
 * Same trick as load-billing-catalog.mjs: bundle with esbuild so Node can read
 * `.ts` content modules. The registry itself is React-free by design (see
 * src/marketing/docs/types.ts), which is what makes this possible — the
 * Markdown mirrors, the sitemap and the content checks all read the same
 * modules the site renders.
 */
import { build } from 'esbuild';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

export async function loadDocsRegistry() {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'topedge-docs-'));
  const outfile = path.join(outDir, 'docsRegistry.mjs');
  try {
    await build({
      entryPoints: [path.join(root, 'src/marketing/docs/registry.ts')],
      bundle: true,
      format: 'esm',
      platform: 'node',
      outfile,
      logLevel: 'error',
    });
    return await import(pathToFileURL(outfile).href);
  } finally {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
}

/**
 * Bundle a single content module, so a group can be validated before its
 * siblings exist. `registry.ts` refuses to load while the manifest lists a slug
 * with no article, which is correct for the build but unhelpful while writing.
 */
export async function loadDocsModule(relPath) {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'topedge-docmod-'));
  const outfile = path.join(outDir, 'module.mjs');
  try {
    await build({
      entryPoints: [path.resolve(root, relPath)],
      bundle: true,
      format: 'esm',
      platform: 'node',
      outfile,
      logLevel: 'error',
    });
    return await import(pathToFileURL(outfile).href);
  } finally {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
}
