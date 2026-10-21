#!/usr/bin/env node
/**
 * One-time Google Search Console authorisation.
 *
 * Run this once. It opens a consent screen, catches the redirect on a local
 * port, swaps the code for a refresh token, and prints the line to paste into
 * .env. After that, scripts/submit-index.mjs can resubmit the sitemap to
 * Google on every deploy without anyone logging in again.
 *
 * Requirements in Google Cloud Console, for the OAuth client in GOOGLE_CLIENT_ID:
 *   - "Search Console API" enabled on the project
 *   - http://127.0.0.1:53682/callback listed under Authorised redirect URIs
 *     (a Desktop-app client type gets loopback automatically)
 *   - the Google account you consent with must already be a verified owner or
 *     full user of the topedgeai.com property in Search Console
 *
 * Usage: node scripts/gsc-auth.mjs
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const PORT = 53682;
const REDIRECT = `http://127.0.0.1:${PORT}/callback`;
// Read/write: submitting a sitemap is a write. Read-only cannot do it.
const SCOPE = 'https://www.googleapis.com/auth/webmasters';

function readEnv() {
  const file = path.join(root, '.env');
  if (!fs.existsSync(file)) return {};
  const out = {};
  for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (m) out[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
  }
  return out;
}

const env = { ...readEnv(), ...process.env };
const CLIENT_ID = env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = env.GOOGLE_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('\n✖ GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET missing from .env\n');
  process.exit(1);
}

const authUrl =
  'https://accounts.google.com/o/oauth2/v2/auth?' +
  new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT,
    response_type: 'code',
    scope: SCOPE,
    access_type: 'offline',
    // Without this an account that has consented before is handed an access
    // token and no refresh token, and the whole point of this script is the
    // refresh token.
    prompt: 'consent',
  });

console.log('\nOpen this URL, sign in as a Search Console owner of topedgeai.com,');
console.log('and approve the request:\n');
console.log(authUrl);
console.log(`\nWaiting for the redirect on ${REDIRECT} …\n`);

const code = await new Promise((resolve, reject) => {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
    if (url.pathname !== '/callback') {
      res.writeHead(404).end('not here');
      return;
    }
    const err = url.searchParams.get('error');
    const got = url.searchParams.get('code');
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(
      `<!doctype html><meta charset="utf-8"><title>TopEdge</title>` +
        `<body style="font:16px/1.5 system-ui;padding:3rem;max-width:34rem">` +
        (got
          ? '<h1>Authorised</h1><p>You can close this tab and go back to the terminal.</p>'
          : `<h1>Not authorised</h1><p>${err || 'No code returned.'}</p>`) +
        '</body>',
    );
    server.close();
    if (got) resolve(got);
    else reject(new Error(err || 'no code returned'));
  });
  server.on('error', reject);
  server.listen(PORT, '127.0.0.1');
  setTimeout(() => {
    server.close();
    reject(new Error('timed out after 5 minutes'));
  }, 300_000);
});

const res = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT,
    grant_type: 'authorization_code',
  }),
});
const body = await res.json();

if (!res.ok || !body.refresh_token) {
  console.error('\n✖ Token exchange failed:', JSON.stringify(body, null, 2));
  if (res.ok && !body.refresh_token) {
    console.error('\nGoogle returned an access token but no refresh token.');
    console.error('Revoke the app at https://myaccount.google.com/permissions and run this again.');
  }
  process.exit(1);
}

console.log('\n✅ Got a refresh token. Add this line to .env:\n');
console.log(`GSC_REFRESH_TOKEN=${body.refresh_token}\n`);
console.log('Then: npm run index:submit\n');
