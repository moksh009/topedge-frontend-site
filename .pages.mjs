import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
for (const r of ['/', '/pricing', '/blog', '/blog/whatsapp-abandoned-cart-recovery-shopify', '/features/journeys', '/customers']) {
  for (const w of [1440, 390]) {
    const p = await b.newPage({ viewport: { width: w, height: 700 } });
    const errs = [];
    p.on('pageerror', (e) => errs.push(String(e).slice(0, 70)));
    await p.goto('http://127.0.0.1:5174' + r, { waitUntil: 'networkidle' });
    await p.waitForTimeout(800);
    const s = await p.evaluate(() => {
      const a = document.querySelector('.mkt-ann'), t = a?.querySelector('.mkt-ann__text');
      const cs = t ? getComputedStyle(t) : null;
      const strong = a?.querySelector('strong');
      const h1 = document.querySelector('h1'), nav = document.querySelector('.mkt-nav__capsule');
      const cta = document.querySelector('.mkt-nav__actions .mkt-nav__cta');
      const burger = document.querySelector('.mkt-nav__burger');
      const gap = cta && burger && getComputedStyle(burger).display !== 'none'
        ? Math.round(burger.getBoundingClientRect().left - cta.getBoundingClientRect().right) : null;
      return {
        bar: !!a,
        bg: a ? getComputedStyle(a).backgroundImage.slice(0, 24) : null,
        weight: cs?.fontWeight, strongW: strong ? getComputedStyle(strong).fontWeight : null,
        clear: h1 && nav ? Math.round(h1.getBoundingClientRect().top - nav.getBoundingClientRect().bottom) : null,
        ctaBurgerGap: gap,
      };
    });
    console.log(String(w).padEnd(5), r.padEnd(46), JSON.stringify(s), errs[0] || '');
    await p.close();
  }
}
await b.close();
