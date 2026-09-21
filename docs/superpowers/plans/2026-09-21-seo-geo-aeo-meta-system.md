# TopEdge SEO / AEO / GEO / LLM Optimization Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Execute one phase at a time.** Do not skip ahead. Mark checkboxes as you finish. Do not commit unless the user asks.

**Goal:** Make TopEdge the trusted, extractable knowledge source for Shopify WhatsApp automation in India across Google/Bing **and** AI answer engines (ChatGPT, Perplexity, Gemini, Copilot) — with a fail-closed meta/schema system, answer-first content, topic clusters, entity signals, and a repeatable measurement cadence.

**Architecture:** One marketing SEO SSOT (`MarketingSEO` + typed page data + prerender asserts). Content follows Q&A / extractable blocks (AEO + GEO). Crawler access + `llms.txt` + IndexNow (LLM/GEO discovery). Measurement stays in `docs/seo/` (organic ≠ citation). External playbook reference: [ThatWare SEO/AEO/GEO/LLM guide](https://thatware.co/seo-aeo-geo-llm-optimization-ultimate-guide-deliverables-checklist/).

**Tech Stack:** React, `react-helmet-async`, Vite + Netlify prerender (Playwright), `scripts/marketing-urls.mjs`, IndexNow, `public/llms.txt` + `public/robots.txt`, `docs/seo/*` trackers.

## Global Constraints

- **SSOT head:** Marketing routes use `MarketingSEO` only. Never put homepage canonical/description back into `index.html`.
- **One of each:** Exactly 1 `<title>`, 1 description, 1 self-canonical, 1 `<h1>` per prerendered URL.
- **Self-canonical:** `/` → `https://topedgeai.com/`; all other paths **slashless**.
- **Snippet budgets:** Title ≤ 60 preferred (hard fail > 65). Description 120–160 preferred (hard fail < 70 or > 165).
- **Locale:** `html lang="en-IN"`, `og:locale=en_IN`. No fake `hreflang` (no Hindi pages).
- **Images:** OG/Twitter absolute HTTPS **PNG/JPEG** (not SVG). Default `https://topedgeai.com/og-image.png`.
- **FAQ rule:** `FAQPage` JSON-LD only when the same Q&A is **visible in HTML**.
- **Lean compares:** `wati`, `aisensy`, `bitespeed`, `interakt` stay lean (no invented FAQ). Non-lean: `zoko`, `getgabs`, `kanal`, `dondy`, 3-way, alternatives as appropriate.
- **Footer:** Do **not** add Zoko / Getgabs / Kanal / Dondy / alternatives to the site footer.
- **Sourcing:** Compare/blog numbers must stay verify-live. No fake reports, invented stats, or schema-only claims.
- **Netlify redirects:** Never add catch-all trailing-slash force `301!` (self-loops with Pretty URLs). Soft-404 = `/* → /404.html 404` only.
- **IndexNow ≠ Google:** After meta/URL deploys, `npm run indexnow -- --changed`. Google still needs GSC URL Inspection.
- **Do not commit** unless the user asks.
- **Do not buy** paid GEO tools until ≥3 months of manual citation logging.

---

## Four pillars (ThatWare → TopEdge mapping)

| Pillar | Meaning | TopEdge application |
|---|---|---|
| **SEO** | Crawl, index, rank, technical health | Prerender HTML, sitemap, soft-404, CWV, internal links, GSC/Bing |
| **AEO** | Win direct answers / snippets / PAA | Answer-first blocks, FAQ in HTML, question H2s, concise definitions |
| **GEO** | Be extractable & citable by generative engines | Topic clusters, tables, quotable facts, entity clarity, citation log |
| **LLM** | Let models access & trust the site | AI bots in `robots.txt`, `llms.txt`, IndexNow, no soft-404 homepage hijack |

**Common ThatWare mistakes we explicitly avoid**

1. Treating GEO as “more keywords” — we optimize extractable knowledge, not stuffing.
2. Poor structure — every key page needs modular sections + direct answers.
3. Blocking AI crawlers — keep Allow rules; expand missing bots carefully.
4. Missing entity signals — TopEdge / founders / Shopify / Meta Cloud API named clearly + Organization `sameAs`.

---

## Live baseline (2026-09-21) — do not re-fix unless regression

### Done (shipped)

| Area | Evidence |
|---|---|
| Duplicate homepage canonical on all pages | Fixed (shell stripped; prerender sanitize + assert) |
| Soft-404 | Junk URLs → **HTTP 404** + `noindex` (`404.html`), not homepage |
| Self-canonical + single description | Live on marketing URLs |
| `en-IN` + PNG OG default | Live |
| Schema baseline | Organization / WebPage / BreadcrumbList; BlogPosting on blogs; FAQPage on home/pricing/non-lean compares/some blogs; Product/Offer where catalog helper used |
| IndexNow | Key live; `npm run indexnow` |
| `llms.txt` | Product, keywords, key URLs, citation guidance, contact |
| AI bots in `robots.txt` | GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, Googlebot, Bingbot, Applebot-Extended |
| Compare + blog GEO set | 8 pairwise + alternatives + 3-way; 17 blogs incl. Dondy; pillar table includes Dondy |
| Truthful sitemap `lastmod` | From content-dates + blog `updated` |
| Measurement ops | `docs/seo/measurement.md`, `geo-citation-log.md`, `content-backlog.md`, `backlink-opportunities.md` |

### Partial / remaining

| Gap | Why it matters (ThatWare) | Plan phase |
|---|---|---|
| No automated title/desc **length** gate | CTR + SERP truncation; build regressions | Phase A |
| No page-type **schema contract** in code | Easy to ship a page without WebPage/BlogPosting | Phase A |
| Missing `og:image` width/height/alt; blog `article:*` times | Richer previews; article freshness signals | Phase A |
| Legal static pages outside prerender assert | Soft gaps on `/privacy` `/terms` | Phase A |
| `robots.txt` missing **CCBot** / **GoogleOther** (guide lists them) | Broader LLM training/crawl access | Phase B |
| Organization `sameAs` / entity directory completeness | Knowledge-graph / entity recognition | Phase B |
| Answer-first / Q&A structure uneven across feature pages | AEO extraction | Phase C |
| Topic-cluster map not explicit as ops artifact | GEO topical authority | Phase C |
| GA4 “AI Search” channel not confirmed in this repo | Attribution of AI referrals | Phase D |
| First full citation baseline still owed (Oct 2026) | GEO measurement | Phase D |
| Bing “Discovered but not crawled” on new URLs | Queue — needs Live URL + Request indexing | Phase D (manual) |

### Explicitly out of scope (unless user reopens)

- Visual breadcrumb UI redesign (schema already present).
- Per-URL unique OG artwork.
- FAQ invention on lean WATI/AiSensy/Bitespeed/Interakt pages.
- Reddit spam / review-farming / paid link schemes.
- WordPress-style `/products` `/wp-admin` checklist items (not this stack).
- Trailing-slash force `301!` sitewide (Netlify self-loop).
- Hindi locale / fake multilingual.

---

## File map

| File | Responsibility |
|---|---|
| `src/marketing/components/MarketingSEO.tsx` | Head + optional FAQPage + article metas |
| `src/marketing/data/pageSeo.ts` | `PAGE_SEO`, JSON-LD helpers |
| `src/marketing/data/seoContracts.ts` *(new)* | Length helpers + page-type schema map |
| `src/marketing/data/productPages.ts` | Feature lander SEO strings |
| `src/marketing/data/compareCompetitors.ts` | Compare SEO + FAQs + related links |
| `src/data/blogPosts.ts` | Blog SEO + FAQs + answer-first content |
| `scripts/prerender-marketing.mjs` | Sanitize + fail-closed head QA |
| `scripts/seo-head-audit.mjs` *(new)* | Parse title/desc/canonical/h1/schema |
| `scripts/seo-static-head-audit.mjs` *(new)* | Legal HTML heads |
| `scripts/generate-redirects.mjs` | SPA shells + soft-404 footer only |
| `scripts/generate-sitemap.mjs` | Truthful lastmod |
| `scripts/indexnow.mjs` | Bing/Yandex/etc URL ping |
| `public/robots.txt`, `public/llms.txt` | LLM crawl + machine site map |
| `docs/seo/measurement.md` | Weekly organic + deploy notes |
| `docs/seo/geo-citation-log.md` | Monthly AI citation tests |
| `docs/seo/content-backlog.md` | Topic cluster / post queue |
| `docs/seo/topic-clusters.md` *(new)* | Pillar ↔ cluster map (Phase C) |

---

## Phase A — Meta / schema system (fail-closed)

> Closes the original meta-system plan. **Do this before content rewrites.**

### Task A1: Encode length + schema helpers

**Files:** Create `src/marketing/data/seoContracts.ts`; optional re-export from `pageSeo.ts`; create `scripts/seo-contracts.selftest.mjs`.

- [x] Add `assertSnippetBudgets(title, description)` → `{ ok, errors }` (title 15–65, description 70–165).
- [x] Add `PAGE_TYPE_SCHEMA` required `@type` sets: `home`, `pricing`, `feature`, `compare`, `blog`, `legal`, `notFound`.
- [x] Self-test with known good/bad strings: `node scripts/seo-contracts.selftest.mjs`.

**Done when:** Self-test passes; no live page copy changed yet.

### Task A2: Wire budgets into prerender fail-closed gate

**Files:** `scripts/seo-head-audit.mjs`, `scripts/prerender-marketing.mjs`.

- [x] After sanitize: uniqueness, self-canonical, snippet budgets, required schema types for route.
- [x] Fail build on any offending prerendered route (clear path + reason).
- [x] `/404` must require `noindex` (already asserted); must **not** require indexable schema bundle.

**Done when:** Intentionally overlong title would fail prerender with a readable message.

### Task A3: Harden `MarketingSEO` head completeness

**Files:** `MarketingSEO.tsx`.

- [x] `og:image:alt` (default India WhatsApp line; override prop).
- [x] `og:image:width` / `height` only after measuring real `og-image.png` (do not invent).
- [x] For `type === 'article'`: optional `article:published_time` / `article:modified_time` props.

**Done when:** Homepage shows image alt; blog can receive article times (wired in A5).

### Task A4: Bring every data-owned title/description into budget

**Files:** `pageSeo.ts`, `productPages.ts`, `compareCompetitors.ts`, `blogPosts.ts`, compare page SEO if inline.

- [x] Print offenders; shorten meaning-preserving only; no invented competitor claims.
- [x] `npm run build:netlify` green with length gate on.

**Done when:** Spot-check `/compare/dondy`, `/about`, `/features/ai-brain`, longest blog title.

### Task A5: Blog article meta + BlogPosting parity

**Files:** `BlogPost.tsx`, `MarketingSEO.tsx`.

- [x] Pass published/modified ISO into `MarketingSEO`.
- [x] `BlogPosting.url` / `mainEntityOfPage.@id` use `canonicalUrlForPath`.
- [x] FAQ answers remain visible when `faqs` set.

**Done when:** Curl one post → `og:type=article`, article times, single canonical, BlogPosting ± FAQPage.

### Task A6: Static legal audit + `seo:audit` script

**Files:** `privacy.html` / `terms.html` if needed; `scripts/seo-static-head-audit.mjs`; `package.json` `"seo:audit"`.

- [x] Assert legal: 1 title, 1 description, 1 canonical, twitter/og PNG, `lang=en-IN`.
- [x] Wire `npm run seo:audit` for dist/public checks.
- [x] Note in `measurement.md`: run after meta deploys.

**Done when:** `npm run seo:audit` passes post-build.

### Task A7: Ship Phase A + re-signal

- [x] Deploy prod (`netlify deploy --prod --dir=dist --no-build` after local `build:netlify`, or full deploy with Node 22).
- [x] Curl: `/`, `/pricing`, `/compare/dondy`, `/blog/dondy-alternative-shopify-india`, `/privacy`, junk URL (expect 404+noindex).
- [x] `npm run indexnow -- --sitemap` (or `--changed`).
- [ ] Manual: Bing + GSC URL Inspection for Dondy URLs + homepage if still misclassified.

**Done when:** Live samples pass; IndexNow 200/202; measurement note updated.

---

## Phase B — LLM / crawler / entity foundation

> ThatWare Steps 1.1–1.3 adapted to Netlify/Vite (not WordPress).

### Task B1: Expand AI crawler Allow list (careful)

**Files:** `public/robots.txt` (sync root `robots.txt` copy).

- [x] Add explicit Allow for **CCBot** and **GoogleOther** (guide checklist).
- [x] Keep all existing Disallows for `/admin`, `/login`, `/signup`, `/docs`, community private paths.
- [x] Verify live `https://topedgeai.com/robots.txt` 200; no accidental Disallow of `/blog` `/compare` `/features`.

**Done when:** View-source/curl shows new UA blocks; marketing paths still Allow.

### Task B2: Organization entity + `sameAs`

**Files:** Organization JSON-LD helper (likely `pageSeo.ts` / home schema), `/about` content if needed.

- [x] Inventory official profiles (LinkedIn company, Product Hunt, Shopify App Store listing if live, Crunchbase if exists — **only real URLs**).
- [x] Add `Organization.sameAs` array; logo absolute HTTPS.
- [x] Ensure founders named on `/about` match any Person mentions (E-E-A-T).

**Done when:** Homepage Organization JSON-LD validates mentally against live URLs; no invented profiles.

### Task B3: `llms.txt` discipline

**Files:** `public/llms.txt`.

- [x] Keep `Last updated:` accurate on each meaningful content ship.
- [x] Ensure every sitemap compare + Phase 3/4 alternative blogs remain listed.
- [x] Optional: short “Knowledge domains” section (Shopify WhatsApp, COD/RTO, Meta Cloud API, India D2C) — factual, not fluff.

**Done when:** `llms.txt` matches live URL inventory.

### Task B4: Soft-404 + redirect regression guard

**Files:** `scripts/generate-redirects.mjs`, optional CI check.

- [ ] Document in script header: never emit trailing-slash force 301s.
- [ ] Optional smoke: after deploy, curl junk URL expect 404; curl `/pricing` expect 200 (not 301 loop).

**Done when:** Smoke documented in `measurement.md` QA checklist.

---

## Phase C — AEO content + GEO topic clusters

> ThatWare Steps 2–3 + content architecture. Use `content-backlog.md`; one page at a time.

### Task C1: Write topic-cluster map

**Files:** Create `docs/seo/topic-clusters.md`.

- [x] Define pillars (suggested):
  1. WhatsApp cart recovery / journeys
  2. COD confirmation / RTO
  3. Meta Cloud API / templates / pricing India
  4. Shared inbox / Live Chat
  5. Alternatives / comparisons (WATI…Dondy)
  6. Choosing a Shopify WhatsApp app
- [x] Map each existing `/features/*`, `/blog/*`, `/compare/*` URL into a cluster.
- [x] Flag orphan pages (<3 inbound internal links) for Phase C3.

**Done when:** Map reviewed once; backlog IDs reference cluster IDs.

### Task C2: Customer-question bank (30 → top 10)

**Files:** `docs/seo/content-backlog.md` or new `docs/seo/question-bank.md`.

- [x] Seed from: GSC queries (export), sales objections, support themes, existing FAQs, geo-citation query list.
- [x] Tag funnel (TOFU/MOFU/BOFU) + business impact.
- [x] Select top 10 for AEO optimization this quarter.

**Done when:** Top 10 approved in the doc (status column).

### Task C3: AEO rewrite pattern (apply to 3 quick-win pages first)

**Pattern (lock this):**

1. H1 = topic (SEO-clear).
2. Opening **30–50 word direct answer**.
3. H2s as questions where natural.
4. 2–3 sentence direct answer under each H2, then supporting context.
5. Real `<table>` for comparisons; bullets for steps.
6. Visible FAQ (3–5) only if truthful; then FAQPage schema.
7. 2–4 contextual internal links into the cluster (not footer dumps).

**First three URLs (suggested — adjust if analytics says otherwise):**

- [ ] `/` or `/features/journeys` (cart recovery)
- [ ] `/blog/cod-confirmation-whatsapp-reduce-rto-shopify` or COD feature path
- [ ] `/blog/best-whatsapp-automation-tools-shopify-india` (pillar refresh if needed)

**Done when:** Each of the three has extractable answer blocks live + IndexNow pinged.

### Task C4: Ongoing monthly content rhythm

**Ops (not a code dump):**

- [ ] Week 1: pick 1–2 questions from bank / backlog.
- [ ] Weeks 2–3: draft 1000–1500 words **or** deepen an existing URL (prefer deepen if thin).
- [ ] Week 4: SME fact-check, schema, internal links from ≥3 existing pages, publish, `llms.txt` + sitemap + IndexNow.
- [ ] Log in `content-backlog.md` cadence table.

**Done when:** Cadence row exists for the current month with a real slug.

### Task C5: Product/feature page AEO pass (batch)

**Files:** `productPages.ts` + feature page components as needed.

- [ ] For each feature lander: intro answers “What is it and who is it for?”
- [ ] Feature → benefit bullets; optional specs table.
- [ ] Keep CTAs; no invented pricing on feature pages (point to `/pricing`).

**Done when:** At least Journeys, Live Chat, Meta Manager, AI Brain pass the intro-answer test.

---

## Phase D — Measurement, citations, competitive GEO

> ThatWare reporting framework — already sketched in `measurement.md`; make it operational.

### Task D1: Confirm GA4 AI Search channel

- [ ] In GA4: custom channel / explore for referrers ChatGPT, Perplexity, Gemini, Copilot (and known AI domains).
- [ ] Document the filter definition in `measurement.md` § analytics.
- [ ] Do **not** invent traffic numbers in repo docs.

**Done when:** Filter steps written; one screenshot/link optional for the team.

### Task D2: First full monthly citation baseline

**Files:** `geo-citation-log.md`.

- [ ] Run **every** tracked query in ChatGPT, Perplexity, Claude, Gemini (incognito).
- [ ] Log Y / P / N + what was cited instead.
- [ ] Include Dondy queries (B8).
- [ ] Target calendar: **2026-10-01** (or next available day — do not skip).

**Done when:** October row filled for all queries × platforms.

### Task D3: Weekly organic dashboard habit

- [ ] Fixed weekday: GSC + Bing impressions/clicks; indexing anomalies; feed unexpected queries into backlog.
- [ ] After any crawl fix: confirm junk URLs still 404; Dondy still 200 self-canonical.

**Done when:** Two consecutive weeks logged in `measurement.md` organic table.

### Task D4: Competitive AEO glance (quarterly)

- [ ] Pick 3 competitors appearing in AI answers for shared queries.
- [ ] Note their structure (tables, FAQ, pricing transparency) — steal **patterns**, not claims.
- [ ] Add ≤5 backlog actions.

**Done when:** One quarterly note exists under measurement or citation log.

### Task D5: Manual indexing queue (ongoing)

Whenever a high-value URL is new or recovered:

- [ ] Bing: URL Inspection → **Live URL** → **Request indexing**.
- [ ] GSC: URL Inspection → Request indexing.
- [ ] Remember: “Discovered but not crawled” with Live URL green = queue, not a code bug.

---

## Phase E — Technical SEO maintenance (recurring)

> ThatWare Step 5 adapted; do not boil the ocean.

### Task E1: Internal link hygiene

- [ ] From topic-cluster map: ensure each key URL has ≥3 inbound contextual links.
- [ ] New posts: within 2 weeks, link from ≥3 existing pages.
- [ ] Fix broken internal links found in crawl (manual or Screaming Frog if available).

### Task E2: CWV spot-check

- [ ] Monthly: PageSpeed/CrUX on `/`, `/pricing`, `/features/journeys`, `/compare/dondy`.
- [ ] Only schedule engineering work if LCP/INP/CLS clearly regress.

### Task E3: Index / redirect health

- [ ] Confirm soft-404 still 404 (not 200 homepage).
- [ ] No new `/*/ → /:splat 301!` or slash-force rules.
- [ ] Sitemap only canonical 200 URLs; resubmit in GSC/Bing when URL set changes.

### Task E4: Backlinks / PR (human-gated)

- [ ] Use `backlink-opportunities.md` only — white-hat roundups, partner mentions.
- [ ] No PBNs, paid spam, or fake reviews.

---

## Execution order (lock)

```
A1 → A2 → A3 → A4 → A5 → A6 → A7
        ↓
       B1 → B2 → B3 → B4
        ↓
       C1 → C2 → C3 → C4 (ongoing) → C5
        ↓
       D1 → D2 → D3 (ongoing) → D4 (quarterly) → D5 (as needed)
        ↓
       E1–E4 (recurring, parallel after C starts)
```

**Rule:** Finish Phase A ship (A7) before large content rewrites in C3, so length/schema gates catch regressions.

---

## Verification matrix (program acceptance)

| Check | How | Pillar |
|---|---|---|
| No duplicate canonical/description | Prerender assert + live curl | SEO |
| Self-canonical | Assert href | SEO |
| Soft-404 | Junk URL → 404 + noindex | SEO/LLM |
| Snippet budgets | Prerender length gate | SEO |
| Schema by page type | Prerender required `@type` | SEO/AEO |
| FAQ visible if FAQPage | Grep question text in HTML | AEO |
| Compare real `<table>` | Grep on `/compare/*` | GEO |
| AI bots + llms.txt | Curl robots + llms | LLM |
| IndexNow | Script 200 after deploys | LLM |
| Citation baseline | `geo-citation-log.md` filled | GEO |
| Organic weekly | `measurement.md` rows | SEO |
| Manual Bing/GSC request | Human after high-value ships | SEO |

---

## Sources

- Playbook: [ThatWare — Ultimate Guide to LLM SEO, AEO, GEO](https://thatware.co/seo-aeo-geo-llm-optimization-ultimate-guide-deliverables-checklist/) (full guide + deliverables checklist; adapt WP items to this Netlify stack).
- Bing: [Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a), [URL Inspection](https://www.bing.com/webmasters/help/url-inspection-55a30305).
- Google: [Page indexing report](https://support.google.com/webmasters/answer/7440203).
- TopEdge ops: `docs/seo/measurement.md`, `geo-citation-log.md`, `content-backlog.md`.
