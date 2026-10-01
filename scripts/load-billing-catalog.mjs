/**
 * Load the TypeScript billing catalog from plain Node.
 *
 * billingCatalog.ts reads `import.meta.env`, which only exists under Vite, so the
 * module is bundled with esbuild and that expression is replaced with the SAME
 * env Vite would have resolved — via Vite's own loadEnv, reading the same .env
 * files and process.env prefixes. Substituting an empty object here instead
 * would silently pin CATALOG_URL to its hardcoded default, so a staging
 * VITE_BILLING_CATALOG_URL would be ignored and the drift check would validate
 * FALLBACK_CATALOG against production while the site built against staging.
 *
 * Used by the pricing drift checks in this directory.
 */
import { build } from 'esbuild';
import { loadEnv } from 'vite';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

/** The env Vite itself would expose to the client bundle, for this mode. */
export function resolveViteEnv(mode = process.env.NODE_ENV || 'production') {
  return loadEnv(mode, root, ['VITE_', 'NEXT_PUBLIC_']);
}

export async function loadBillingCatalog() {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'topedge-catalog-'));
  const outfile = path.join(outDir, 'billingCatalog.mjs');
  try {
    await build({
      entryPoints: [path.join(root, 'src/marketing/lib/billingCatalog.ts')],
      bundle: true,
      format: 'esm',
      platform: 'node',
      outfile,
      logLevel: 'error',
      define: { 'import.meta.env': '__VITE_ENV__' },
      banner: { js: `const __VITE_ENV__ = ${JSON.stringify(resolveViteEnv())};` },
    });
    return await import(pathToFileURL(outfile).href);
  } finally {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
}
