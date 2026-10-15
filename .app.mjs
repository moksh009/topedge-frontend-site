import { chromium } from 'playwright';
const route = process.argv[2] || '/', out = process.argv[3], w = Number(process.argv[4] || 1440), h = Number(process.argv[5] || 900);
const act = process.argv[6];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
await p.goto('http://127.0.0.1:5174' + route, { waitUntil: 'networkidle' });
await p.waitForTimeout(1100);
if (act === 'product') { await p.locator('.mkt-nav__link--btn').first().hover(); await p.waitForTimeout(600); }
if (act === 'burger') { await p.locator('.mkt-nav__burger').click(); await p.waitForTimeout(600); }
await p.screenshot({ path: out });
await b.close();
