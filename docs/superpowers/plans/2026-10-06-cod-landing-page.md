# COD Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the static `/lp/cod-confirmation` ad page into the conversion plan's full 11-section page without losing instant paint.

**Architecture:** Plain-HTML page assembled by `scripts/generate-landing-pages.mjs` from `scripts/lp/cod-confirmation.body.html`, `scripts/lp/base.css`, `scripts/lp/attribution.js` and `FALLBACK_CATALOG`. A new node check script asserts the generated output against the spec. Small inline vanilla JS handles nav, hero variant, scroll emphasis, pricing toggle and sticky bar.

**Tech Stack:** Node ESM scripts, esbuild catalog loader (existing), vanilla HTML/CSS/JS, Playwright for browser verification.

**Spec:** `docs/superpowers/specs/2026-10-06-cod-landing-page-design.md` (revision 2)

## Global Constraints

- Output file `public/lp/cod-confirmation/index.html`: at most 61440 bytes, contains `<meta name="robots" content="noindex,nofollow">`.
- No `<script src=`, `<link rel="stylesheet"`, `fonts.googleapis`, `<video`, `<iframe` in the output.
- No `{{PLACEHOLDER}}` left in the output.
- No em dash character (U+2014) anywhere in the output.
- No competitor names: WATI, AiSensy, Interakt, Releasit, EasySell, Dondy, KwikEngage, WASP, Zoko.
- Prices, trial numbers and COD-to-prepaid gating come from `FALLBACK_CATALOG` and `TRIAL`, never literals in the template.
- Primary CTA text "Start free trial"; microcopy "14-day free trial · 20 free order confirmations · No credit card · Live in about 15 minutes" (numbers from `TRIAL`).
- Tap targets at least 48px on mobile; body text at least 16px on mobile.
- WhatsApp green only inside the chat mockup, never on buttons.
- Never state a Trustpilot score or a Shopify rating or review count.

## Review Focus

- Visitor with JS disabled: page must still show default H1, yearly pricing, open first FAQ, and all CTAs.
- `?utm_content=` unknown or empty: default headline, no console error.
- Storage blocked (`localStorage`/`sessionStorage` throws): CTAs still link to `/signup?lp=cod-confirmation`.
- 360px width: H1 wraps to at most 3 lines, no horizontal scroll, sticky bar does not cover footer text.
- Focus inside an input: sticky bar hidden (page has none today; behaviour must still be wired for later forms).
- Catalog change (price edit): regenerated page shows new price with no template edit; checker fails if page and catalog disagree.

---

### Task 1: Checker and generator plumbing

**Files:**
- Create: `scripts/check-landing-pages.mjs`
- Modify: `package.json` (add `"check:lp": "node scripts/check-landing-pages.mjs"`)
- Modify: `scripts/generate-landing-pages.mjs`

**Interfaces:**
- Produces: `check:lp` exits non-zero with a list of failures; generator exposes template tokens `{{PLAN_CARDS}}`, `{{FAQS}}`, `{{SLUG}}`, plus new `{{SHOPIFY_URL}}`, `{{TRIAL_MICRO}}`, `{{HERO_VARIANTS_JSON}}`.

- [ ] **Step 1: Write the checker** (full assertions from the spec's Testing section). It loads `loadBillingCatalog()`, reads the generated HTML, and prints `✖ <reason>` per failure then exits 1.
- [ ] **Step 2: Run `node scripts/check-landing-pages.mjs`** against the current page. Expected: FAIL (no Shopify CTA, one FAQ open missing, fewer than 7 FAQs, quotes missing).
- [ ] **Step 3: Generator plumbing:** read `COMPANY_SHOPIFY_APP_URL` from `src/marketing/legal/companyIdentity.ts` by regex (throw if absent); build `{{TRIAL_MICRO}}` from `TRIAL`; add the em dash, competitor-name and unreplaced-token guardrails; serialise the three hero variants into `{{HERO_VARIANTS_JSON}}`.
- [ ] **Step 4: Commit** `build: add landing page checker and generator plumbing`.

### Task 2: Nav, hero, trust strip

**Files:** Modify `scripts/lp/cod-confirmation.body.html`, `scripts/lp/base.css`, `scripts/lp/attribution.js`.

**Interfaces:** Consumes `{{SHOPIFY_URL}}`, `{{TRIAL_MICRO}}`, `{{HERO_VARIANTS_JSON}}`. Produces ids `#hero`, `#hero-cta`, `#hero-h1`, `#hero-sub`, class `.nav.is-solid`.

- [ ] **Step 1:** Extend checker: assert `#hero-h1` text equals the default variant; assert nav contains `How it works`, `Log in`, and a `data-cta="trial"` link; assert `data-cta="shopify"` link has `href` starting `https://apps.shopify.com/`; assert the three logo `src`s are present with non-empty `alt`.
- [ ] **Step 2:** Run checker, expect FAIL.
- [ ] **Step 3:** Implement sticky nav (`position:sticky`, transparent then `.is-solid` after `scrollY>8`), split hero (copy left, phone right, stacked on mobile), dual CTAs, microcopy, dark trust strip. Inline script: pick variant from `utm_content` (`loss` default, `speed`, `rto`), set `#hero-h1`/`#hero-sub` text, inside try/catch.
- [ ] **Step 4:** Update `attribution.js`: `a[data-cta]` gets UTM-bearing href for `trial` only; `shopify` links keep the App Store URL and send `shopify_install_click`; trial sends `cta_click` with `cta:'trial'`.
- [ ] **Step 5:** `npm run lp && npm run check:lp`, expect Task 2 assertions PASS. Commit.

### Task 3: Problem and How it works

**Files:** Modify body HTML and base.css.

- [ ] **Step 1:** Checker asserts: three cost cards, closing line present, three `.step` items with `data-step="1|2|3"`, mockup has `aria-label` mentioning "Confirm" and "Cancel", caption text present.
- [ ] **Step 2:** Run, expect FAIL.
- [ ] **Step 3:** Implement amber-tinted cost cards (class `.cost` gets `background:#fff7ed`, border `#fed7aa`), closing line, steps with `data-step`, mockup with `data-hl` targets (`order`, `buttons`, `check`), `IntersectionObserver` setting `data-active` on the phone; under reduced motion all `data-hl` states render on.
- [ ] **Step 4:** Regenerate, run checker, PASS. Commit.

### Task 4: Proof and Why TopEdge

**Files:** Modify body HTML, base.css, generator (quotes and cards as data arrays).

- [ ] **Step 1:** Checker asserts the three quotes verbatim with attribution lines (`Tirth P.`, `Shubham P.`, `Robin`, each followed by `Trustpilot`), `trustpilot.com/review/topedgeai.com` link, the launch line, four cards with the exact headlines, and no `★`, no `5.0`, no `4.0`.
- [ ] **Step 2:** Run, expect FAIL.
- [ ] **Step 3:** Implement `{{QUOTES}}` and `{{WHY_CARDS}}` from generator data arrays (each quote has `text`, `author`, `source`, `date`), inline SVG line icons, 2x2 grid on desktop.
- [ ] **Step 4:** Regenerate, checker PASS. Commit.

### Task 5: Pricing, FAQ, final CTA, sticky bar

**Files:** Modify body HTML, base.css, generator, attribution.js.

- [ ] **Step 1:** Checker asserts: yearly and monthly price both present per plan and equal to catalog; Growth card has `Most popular`; Launch card lacks "payment links"; Growth and Scale have it; 7 `<details name="faq">` with exactly one `open`; each plan section contains the 0% markup line; `#sticky-cta` exists with `data-cta="trial"`.
- [ ] **Step 2:** Run, expect FAIL.
- [ ] **Step 3:** Implement: `.plans[data-cycle="yearly"]` toggle (buttons `role=tab`), CSS shows `.p-yearly` or `.p-monthly`; Growth `order:-1` below 760px; 7 FAQs; final CTA with gradient; `#sticky-cta` fixed bar below 760px with `padding-bottom:env(safe-area-inset-bottom)`, shown through an `IntersectionObserver` on `#hero-cta` (hidden when it is visible), hidden on `focusin` of input/textarea/select, shown again on `focusout`; `body` bottom padding.
- [ ] **Step 4:** Regenerate, checker PASS, size under budget. Commit.

### Task 6: Browser verification and ship

- [ ] **Step 1:** Serve `public/` with a local static server, drive Playwright at 360x800 and 1280x800: screenshot full page, assert H1 line count at most 3, no horizontal overflow, sticky bar appears after scroll and hides on focused input, toggle changes the Growth price text, `?utm_content=<speed variant key>` changes H1.
- [ ] **Step 2:** Run `npm run check:pricing && npm run check:lp`.
- [ ] **Step 3:** Fix anything found, regenerate, commit `feat: full COD confirmation landing page`.
