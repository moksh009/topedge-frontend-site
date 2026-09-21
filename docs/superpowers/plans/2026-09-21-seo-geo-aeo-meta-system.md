# SEO / GEO / AEO Meta System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every indexable marketing URL emit a complete, unique, self-consistent SEO/GEO/AEO head (meta + Open Graph + Twitter + JSON-LD + visible answer content) from one source of truth, with a build gate so regressions cannot ship.

**Architecture:** Do **not** hand-author `<meta>` tags inside each page JSX or static HTML for marketing routes. All marketing pages already go through `MarketingSEO` (`src/marketing/components/MarketingSEO.tsx`). Copy and schema live in typed data (`pageSeo.ts`, `productPages.ts`, `compareCompetitors.ts`, `blogPosts.ts`). Prerender (`scripts/prerender-marketing.mjs`) owns the “one title / one description / one self-canonical / one h1” gate. This plan hardens that contract, fills remaining gaps, and adds length + schema-type checks.

**Tech Stack:** React, `react-helmet-async`, Vite + Netlify prerender (Playwright), `scripts/marketing-urls.mjs` sitemap/prerender list, IndexNow (`scripts/indexnow.mjs`), `public/llms.txt` + `public/robots.txt`

## Global Constraints

- **SSOT:** Marketing routes use `MarketingSEO` only. Never reintroduce homepage canonical/description into `index.html`.
- **One of each:** Exactly 1 `<title>`, 1 `meta[name=description]`, 1 `link[rel=canonical]`, 1 `<h1>` per prerendered URL.
- **Self-canonical:** Canonical = page URL (`/` → `https://topedgeai.com/`; all other paths slashless).
- **Snippet budgets:** Title ≤ 60 chars preferred (hard fail > 65). Description 120–160 chars preferred (hard fail < 70 or > 165).
- **Locale:** `html lang="en-IN"`, `og:locale=en_IN`.
- **Images:** Open Graph / Twitter images must be absolute HTTPS **PNG or JPEG** (not SVG). Default: `https://topedgeai.com/og-image.png`.
- **FAQ rule:** Emit `FAQPage` JSON-LD only when the same Q&A is visible in HTML (never schema-only FAQs).
- **Lean compare pages:** `wati`, `aisensy`, `bitespeed`, `interakt` stay lean (no invented FAQ). Non-lean: `zoko`, `getgabs`, `kanal`, `dondy`, 3-way, alternatives as appropriate.
- **Footer:** Do not add Zoko / Getgabs / Kanal / Dondy / alternatives to the site footer.
- **Sourcing:** Compare/blog numbers must stay verify-live against competitor pricing / Shopify listings.
- **Do not commit** unless the user asks.
- **After deploys that change URLs/meta:** `npm run indexnow -- --changed` (or `--sitemap` only when many URLs truly changed).

---

## Current state (2026-09-21 live audit — do not re-fix)

| Layer | Status |
|---|---|
| Duplicate homepage canonical on every page | **Fixed** (shell stripped; prerender sanitize + assert) |
| Self-canonical + single description | **Live** on sampled marketing URLs |
| `en-IN` + PNG OG default | **Live** |
| Organization / WebPage / BreadcrumbList | Present on most marketing pages |
| BlogPosting | All 17 blog posts |
| FAQPage | Home + pricing FAQs + non-lean compares + some blogs; **3-way now has FAQ** |
| IndexNow key + submit script | Live |
| `llms.txt` / AI bots in `robots.txt` | Live |

**Remaining gaps this plan closes:**

1. No automated **title/description length** gate (only uniqueness + self-canonical today).
2. Missing **OG/Twitter image width/height/alt** and article-specific meta on blogs.
3. **Page-type schema contract** not encoded as a checklist in code (easy to miss WebPage on a new page).
4. Legal HTML is static (fine) but outside prerender assert — needs a tiny static-head check.
5. Optional GEO polish: `llms.txt` last-updated discipline + optional visual breadcrumbs (layout change — gated).
6. Keywords meta is low-value for Google but kept for consistency; do not treat as ranking lever.

---

## Best approach (decision — lock this)

### Do this

1. **One component** (`MarketingSEO`) emits the head for every marketing route.
2. **Page data owns the strings** (title, description, keywords, image, faqs, jsonLd extras).
3. **Page-type presets** define required schema bundles (home vs feature vs compare vs blog).
4. **Prerender fail-closed** if uniqueness / self-canonical / length / required schema fails.
5. **IndexNow + GSC** for discovery; IndexNow does not replace Google URL Inspection.

### Do not do this

- Paste unique `<Helmet>` meta blocks into every page component by hand.
- Put marketing SEO back into `index.html`.
- Invent FAQPage / stats for lean compare pages.
- Add dozens of low-value meta tags (`revisit-after`, stuffed keywords, fake `geo.position`, etc.).
- Ship SVG as the primary `og:image`.

---

## File map

| File | Responsibility |
|---|---|
| `src/marketing/components/MarketingSEO.tsx` | Emits title, description, canonical, robots, OG, Twitter, FAQPage, optional extras |
| `src/marketing/data/pageSeo.ts` | `PAGE_SEO`, JSON-LD helpers, length helpers |
| `src/marketing/data/productPages.ts` | Feature lander `seoTitle` / `seoDescription` |
| `src/marketing/data/compareCompetitors.ts` | Compare titles/descriptions/faqs |
| `src/data/blogPosts.ts` | Blog title/description/faqs |
| `scripts/prerender-marketing.mjs` | Sanitize shell tags + hard SEO asserts |
| `scripts/seo-head-audit.mjs` *(new)* | Reusable length + schema contract checks (callable from prerender) |
| `public/privacy.html`, `public/terms.html` | Static legal heads (no React) |
| `public/llms.txt`, `public/robots.txt` | GEO crawler discovery |
| `docs/seo/measurement.md` | Human QA notes after ship |

---

## Page-type SEO contracts

### A. Universal (every indexable marketing URL)

Required in HTML:

- [ ] `html[lang=en-IN]`
- [ ] Exactly one `<title>` (≤ 65 chars)
- [ ] Exactly one `meta[name=description]` (70–165 chars)
- [ ] Exactly one self-canonical
- [ ] `meta[name=robots]` indexable (or `noindex` only on 404/auth handoffs)
- [ ] `og:type`, `og:url`, `og:title`, `og:description`, `og:image` (PNG/JPEG absolute)
- [ ] `twitter:card=summary_large_image` + title/description/image/url
- [ ] Exactly one `<h1>` whose text matches the page intent (not the nav brand alone)

### B. Homepage `/`

- [ ] `SoftwareApplication` + `Organization` + `WebSite` (+ FAQPage if homepage FAQs exist)
- [ ] Answer-first hero subhead stays in HTML

### C. Pricing `/pricing`

- [ ] `SoftwareApplication` offers from `billingCatalog` / `catalogMonthlyOffersJsonLd` (SSOT — no third price list)
- [ ] Visible pricing FAQ + FAQPage

### D. Feature / product pages `/features/*`

- [ ] `Organization` + `WebPage` (`dateModified` from content-dates) + `BreadcrumbList`
- [ ] Title/description from `productPages` or `FEATURE_SEO` only (one path)

### E. Compare hub + pairwise + 3-way + alternatives

- [ ] `Organization` + `WebPage` + `BreadcrumbList`
- [ ] Real `<table>` for boards (not div grids)
- [ ] Non-lean pages: visible FAQ + FAQPage
- [ ] Product/Offer schema only when using catalog offers helper (already on compares)

### F. Blog posts `/blog/:slug`

- [ ] `BlogPosting` with `datePublished` / `dateModified` via content-dates helpers
- [ ] `og:type=article`
- [ ] Optional: `article:published_time` / `article:modified_time` meta (Task 3)
- [ ] FAQPage only when `post.faqs` exist **and** answers visible in HTML

### G. Legal `/privacy`, `/terms`

- [ ] Static HTML heads stay complete (canonical, description, OG, Twitter)
- [ ] Included in sitemap; checked by static audit script

---

### Task 1: Encode length + schema helpers (no page copy changes yet)

**Files:**
- Create: `src/marketing/data/seoContracts.ts`
- Modify: `src/marketing/data/pageSeo.ts` (re-export helpers if useful)

- [ ] Add `assertSnippetBudgets(title, description)` returning `{ ok, errors }` with limits: title 15–65, description 70–165.
- [ ] Add `PAGE_TYPE_SCHEMA` map documenting required `@type` strings per path pattern (`home`, `pricing`, `feature`, `compare`, `blog`, `legal`).
- [ ] Add unit-less Node test via `node --test` **or** a tiny `scripts/seo-contracts.selftest.mjs` that imports the helpers and asserts known good/bad strings.
- [ ] Run self-test: `node scripts/seo-contracts.selftest.mjs` (or equivalent) — must pass.

**Done when:** Helpers exist and self-test passes without changing live pages.

---

### Task 2: Wire budgets into prerender fail-closed gate

**Files:**
- Modify: `scripts/prerender-marketing.mjs`
- Create: `scripts/seo-head-audit.mjs` (shared parse of title/desc/canonical/h1/schema types)

- [ ] After `sanitizePrerenderHtml`, run audit:
  - uniqueness (title/desc/canonical/h1 counts)
  - self-canonical match
  - snippet budgets
  - required schema types for that route’s page type
- [ ] Fail the build (`exitCode = 1`) if any prerendered route fails (already fail-closed for uniqueness; extend for length + schema).
- [ ] Run locally: `npm run build:netlify` — expect either all green or a clear list of offending routes (fix copy in Task 4 if build fails).

**Done when:** A deliberately too-long title in a throwaway branch would fail prerender with a readable message.

---

### Task 3: Harden `MarketingSEO` head completeness (all pages inherit)

**Files:**
- Modify: `src/marketing/components/MarketingSEO.tsx`

- [ ] Add `og:image:alt` (default `"TopEdge — WhatsApp automation for Shopify India"`; allow override prop).
- [ ] Add `og:image:width` / `og:image:height` only if we know real dimensions of `og-image.png` (measure once with `sips` / `file`; do not invent).
- [ ] For `type === 'article'`, emit:
  - `meta property="article:published_time"` and `article:modified_time` when caller passes ISO dates (new optional props).
- [ ] Keep `prioritizeSeoTags` and `canonicalUrlForPath` unchanged in behavior.
- [ ] Do **not** add `meta keywords` emphasis; leave optional as today.

**Done when:** Homepage and one blog post HTML show the new OG image alt; blog shows article times when wired in Task 5.

---

### Task 4: Bring every data-owned title/description into budget

**Files:**
- `src/marketing/data/pageSeo.ts`
- `src/marketing/data/productPages.ts` (`seoTitle` / `seoDescription`)
- `src/marketing/data/compareCompetitors.ts`
- `src/marketing/pages/CompareIndexPage.tsx` / `CompareAlternativesPage.tsx` / `CompareThreeWayPage.tsx` if titles live inline
- `src/data/blogPosts.ts` (titles must fit with `| TopEdge` suffix used in `BlogPost.tsx`)

- [ ] Run a one-off Node script (or extend self-test) that prints any string over budget.
- [ ] Shorten only the offenders — keep meaning and India/Shopify keywords; do not invent competitor claims.
- [ ] Re-run prerender / `npm run build:netlify` until 0 SEO head failures.

**Done when:** Build passes with length gate on; spot-check `/compare/dondy`, `/about`, `/features/ai-brain`, longest blog title.

---

### Task 5: Blog article meta + BlogPosting parity

**Files:**
- Modify: `src/pages/BlogPost.tsx`
- Modify: `MarketingSEO.tsx` (consume published/modified props from Task 3)

- [ ] Pass `articlePublished` / `articleModified` ISO from existing `articleDatePublishedIso` / `articleDateModifiedIso` into `MarketingSEO`.
- [ ] Ensure `BlogPosting.url` and `mainEntityOfPage.@id` use `canonicalUrlForPath`.
- [ ] Confirm FAQ answers remain in HTML when `faqs` set (existing `mkt-blog-faq` / fallback block).

**Done when:** Curl one post: `og:type=article`, article time metas present, single canonical, BlogPosting + optional FAQPage.

---

### Task 6: Static legal head audit + robots/llms hygiene

**Files:**
- Modify: `public/privacy.html`, `public/terms.html` only if audit finds gaps
- Create: `scripts/seo-static-head-audit.mjs`
- Modify: `package.json` (`"seo:audit": "node scripts/seo-head-audit.mjs && node scripts/seo-static-head-audit.mjs"`)
- Modify: `docs/seo/measurement.md` (one line: run `npm run seo:audit` after meta deploys)

- [ ] Assert privacy/terms: 1 title, 1 description, 1 canonical, twitter:url, og:image PNG, lang=en-IN.
- [ ] Confirm `robots.txt` still allows GPTBot / ClaudeBot / PerplexityBot / OAI-SearchBot / Google-Extended.
- [ ] Confirm `llms.txt` lists all compare boards + Phase 3/Dondy blogs and contact email `team@topedgeai.com`.

**Done when:** `npm run seo:audit` passes against `dist/` after build (or against `public/` for legal + live curl optional).

---

### Task 7: Ship + re-signal search engines

- [ ] `netlify deploy --prod` with message describing meta-system gate.
- [ ] Curl sample set: `/`, `/pricing`, `/compare/dondy`, `/blog/dondy-alternative-shopify-india`, `/privacy` — verify budgets + self-canonical + PNG OG.
- [ ] `npm run indexnow -- --sitemap` (meta changed site-wide).
- [ ] User action (cannot automate): Bing URL Inspection + GSC URL Inspection for `/compare/dondy` and homepage to clear prior “alternate of /” classification.

**Done when:** Live samples pass; IndexNow returns 200/202; measurement note updated.

---

## Explicitly out of scope (unless user reopens)

- Visual breadcrumb UI on every page (schema BreadcrumbList already exists; UI is a design change).
- Per-URL unique OG artwork (nice later; PNG default is enough for indexing).
- Adding FAQ blocks to lean WATI/AiSensy/Bitespeed/Interakt pages.
- Buying paid GEO tools.
- Hindi hreflang (no Hindi pages exist; do not fake `hreflang`).

---

## Verification matrix (final acceptance)

| Check | How |
|---|---|
| No duplicate canonical/description | Prerender assert + live curl |
| Self-canonical | Assert href equals expected URL |
| Snippet budgets | Prerender length gate |
| Schema by page type | Prerender required `@type` set |
| FAQ visible if FAQPage | Grep HTML for question text |
| Compare tables | Grep `<table` on `/compare/*` |
| GEO files | `llms.txt` 200; robots AI allows |
| Bing/Google | Manual re-inspect after deploy |

---

## Execution order

1 → 2 → 3 → 4 → 5 → 6 → 7

Tasks 3 and 4 can partially overlap after Task 2 exists, but do not deploy until Task 4 clears the length gate.
