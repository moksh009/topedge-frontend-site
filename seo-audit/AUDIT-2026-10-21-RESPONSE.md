# Response to the external SEO/AEO audit (31 pages, dated 21 Oct 2026)

Worked through every finding in `topedgeai_seo_aeo_complete_audit_2026.pdf` and the
implementation prompt built from it. Three groups below: fixed, already true before
the audit, and deliberately not done.

The audit was crawled against Google's index and against a crawler that the site
answered differently from Googlebot. A lot of what it reports as broken was fixed in
the deploys of 9 to 21 October, or was a deliberate decision. Checked each claim
against the repo and against a live Googlebot-UA fetch rather than taking it on trust.

## Fixed

### Entity and pricing contradictions
- `~₹1,800` on the Interakt, Bitespeed, Updatrr and Gupshup boards. All four now read
  the real catalog figure: 14-day trial, then ₹1,999/month (₹1,599 billed yearly) + 18% GST.
- BYOK AI cost was `₹0.2-₹0.3` on the legacy and Zoko boards and `₹0.10-₹0.30` on the
  other six. Aligned on `~₹0.10-₹0.30`.
- `/blog/interakt-alternative-shopify-india` FAQ 1 claimed COD-to-prepaid "on every
  plan" directly above a table saying Growth and Scale. Rewritten: cart recovery is on
  every plan, COD-to-prepaid is on Growth and Scale.
- All 12 COD-to-prepaid rows across the boards now carry the plan gate, so every board
  agrees with `/pricing` and with the billing catalog.
- Added a **Subscription Model** row to the six boards that had none (WATI, AiSensy,
  Zoko, Getgabs, Kanal, Dondy). Competitor figures come from each board's own
  `matrixNote`, which records the date it was checked. Nothing estimated.

### Leaked editorial and duplicated crawlable text
- `Add dashboard screenshot` was an instruction to us that shipped into the text of
  every product page whose screenshot was missing or failed to load. Removed, with the
  orphaned CSS rule.
- `TopEdge AI TopEdge AI` opened the text of every page: the brand mark was described
  next to a visible wordmark. Fixed in the navbar, the footer, the four compare H1s,
  `/about`, `/blog`, `/integrations` and the home testimonials. `alt=""` is paired with
  `aria-hidden` on the `<img>` itself, which is what the repo's own head audit requires.
- The trust marquee read every customer name twice because the CSS loop needs a second
  copy. The clone is now `aria-hidden` with an empty alt.

### Redirects
- `/roi` now lands on `/pricing` (was `/features/journeys`).
- `/blog/topedge-ai-voice-agents-vs-human-agents-2024` 404'd while staying in Google's
  index. Now 301s to the AI WhatsApp chatbot playbook, which is the page that replaced it.

### Cannibalisation, consolidated
Each pair targeted one query with two URLs, so Google indexed neither well. The unique
sections of the retired post were merged into the survivor **before** the slug was
redirected, so nothing was thrown away.

- `ai-chatbot-for-shopify` (21 Sep, never indexed) into
  `ai-whatsapp-chatbot-for-shopify-india` (ranks #3). Moved in: handover triggers,
  guardrails against invented answers, tool evaluation criteria.
- `cod-confirmation-whatsapp-reduce-rto-shopify` (3 Sep primer) into
  `how-to-reduce-rto-with-whatsapp-cod-confirmation` (the SOP). Moved in: template
  wording rules, the buyer-reply to ops-action to Shopify-sync table, escalation triggers.

Both 301'd, every internal link repointed, both dropped from the sitemap and the
prerender list. 32 posts to 30; 69 URLs to 67.

### Metadata
Rewritten to the audit's intent but sized to the repo's own contracts (title 15-65
including the brand suffix, description 70-165). Several of the audit's strings were
67 to 69 characters and would have failed the build.

- 9 core pages. The home title carried neither "Shopify" nor "India", which is the
  whole query; `/pricing` carried neither "0% markup" nor "India".
- 3 product pages: journeys (added India), the tracking pixel (the slug is
  `/features/analytics` but the page is entirely the pixel), profit and costs (added RTO).
- 12 compare pages. Every title now carries the market and the specific wedge; every
  description carries a figure.
- 22 blog posts. Buyer-intent modifiers ("Best X Alternative"), India, and figures.

**Left alone on purpose:** the titles of the three posts that actually rank, namely
`whatsapp-shared-inbox-shopify-order-context` (#1), `best-whatsapp-automation-tools-shopify-india`
(#5) and `ai-whatsapp-chatbot-for-shopify-india` (#3). Rewriting a title that ranks is
how you lose the only rankings you have.

### H1s
Home, pricing, features, customers, about, `/compare`, `/compare/alternatives` and
`/blog` now carry Shopify, India, or both. The pairwise boards keep their logo-arena H1;
their subtitles gained the market and the year instead.

### E-E-A-T and schema
- All 30 posts moved from `author: 'TopEdge'` to a named founder, which resolves to a
  Person node with a `/about` URL. Moksh on product, platform and COD/RTO mechanics;
  Smit on growth, strategy and category pieces.
- Organization gained `legalName`, `taxID` (the GSTIN, the strongest identifier an
  Indian entity can hand a knowledge graph), `priceRange` and opening hours.
- FAQPage now ships on all ten pairwise boards. They had none, so ten commercial pages
  had nothing an AI answer could quote. The five questions are about our own product
  only and every number is read from the billing catalog, so no competitor claim is
  paraphrased and nothing can drift from `/pricing`.

### Content
Added a sourced five-row comparison table to the three September alternative posts
(Zoko, Getgabs, Kanal) that had none.

## Already true before the audit

| Audit finding | Reality |
|---|---|
| `/roi` live with a corrupted heading | Route removed; `/roi` has 301'd for weeks |
| `[TOPEDGE RATE: Moksh to supply]` live | Already replaced |
| 36 `/docs` pages unindexed, crawler-blocked | Docs moved to `dash.topedgeai.com/docs` on 9 Oct, on purpose: the same pages existed twice. `/docs/*` 301s there |
| `robots.txt` and `sitemap.xml` unreachable | Both return 200 to a Googlebot UA, verified by direct fetch |
| No `llms.txt` | Exists, and its pricing is verified against the billing catalog at build time |
| Six Oct 7-8 posts orphaned from `/blog` | In the index; `/blog` renders from one array |
| Three header/footer templates (A, B, C) | One navbar and one footer component for every route. The audit saw three deploy eras in Google's cache |
| `{{1}}` stripped from the rejection table | Renders correctly in the built HTML |
| No Meta India rate card table | Present, and better: it explains why published rates disagree by up to 40% |
| Gupshup missing from `/compare/alternatives` | Present |
| 11 features lack dedicated URLs | 13 feature pages exist, including `/features/cod-confirmation` |
| Footer Shopify badge not linked to the canonical listing | Links to `apps.shopify.com/topedge-ai` |
| No FAQPage / Article / BreadcrumbList | All present. FAQ markup is also rendered visibly, which the audit did not check and which Google requires |
| Trailing-slash URLs need 301 rules | Netlify Pretty URLs handles it. Force rules self-loop here; `_redirects` carries that warning |

## Deliberately not done

**The audit's `robots.txt`.** It gives each AI crawler its own `User-agent` group with
`Allow: /` and no `Disallow` lines. Under RFC 9309 a crawler obeys only the group that
names it, so that file would have silently dropped every `Disallow` for GPTBot,
ClaudeBot, PerplexityBot and the rest, exposing `/api/`, `/admin/` and the login shells.
The current file keeps one group for all agents for exactly this reason.

**The audit's `llms.txt`.** The current one is shorter and its pricing is checked
against the live billing catalog on every build. More to the point, Google's own AI
optimization guide says `llms.txt` is not a ranking lever and that content rewritten for
AI can breach spam policies. Harmless to keep, not worth expanding.

**Replicating the five-section `/compare/dondy` layout across all ten boards.** All ten
are in `VERBATIM_ONLY`, added deliberately in September: "no paraphrased extras". The
verdict and scorecard sections paraphrased competitor claims, and that was removed on
purpose. Reversing it is your call, not a technical fix. Added the own-product FAQ
instead, which gets the schema without paraphrasing anyone.

**Five new feature landing pages.** Four already exist at other slugs
(`/features/cod-confirmation`, `/features/ai-brain`, `/features/opt-in-tools`,
`/features/warranty`). The fifth, `/features/abandoned-cart-recovery`, would compete
with `/features/journeys`, which already owns cart recovery and which
`/features/cart-recovery` 301s to. Building it would re-create the cannibalisation this
release just removed.

**Docs metadata, TechArticle and HowTo schema.** The docs are not on this domain.

## Needs you, not the repo

1. **Trustpilot phone number** reads +91 6353306984; the site says +91 93130 45439.
   Fix it on the Trustpilot business profile.
2. **Shopify App Store** surfaces the `?locale=zh-CN` partner page for "TopEdge AI".
   Shopify-side; the canonical English listing is what we link and mark up.
3. **Shopify listing has 0 reviews.** App Store listings rank organically. This is the
   single highest-leverage off-site item and it needs customer asks, not code.
4. **Deploy, then** `npm run index:after-deploy`. The queues are regenerated: 67 URLs in
   `seo-audit/bing-urls.txt` for one Bing paste, 65 changed URLs in 7 daily batches in
   `seo-audit/gsc-manual-queue.md`.

## Build state

`npm run build:netlify`: 66 prerendered pages, 0 failures, dist check green.
`check:pricing`, `check:blog`, `check:blog-sources` all pass, including the em dash rule.
Sitemap: 67 URLs, 65 honestly dated today, 2 honestly unchanged.

---

# Phase 2 hardening pass (same day)

Phase 1 is deployed: the live home page carries its title and H1, and all three
consolidation redirects answer 301 in production. Everything below is pending
deploy.

## 1. llms.txt and llms-full.txt are generated now

The question was fair and the answer was no, I had not updated it. It was worse
than stale: `public/llms.txt` was hand-written, and after the two consolidations
it still listed `/blog/ai-chatbot-for-shopify` and
`/blog/cod-confirmation-whatsapp-reduce-rto-shopify`, both of which 301. A file
whose entire purpose is to be read literally by a model had two dead URLs in it
and nothing in the build could notice. It also carried a
`<!-- BEGIN GENERATED DOCS - scripts/generate-llms-docs.mjs -->` marker naming a
script that does not exist in the repo.

`scripts/generate-llms.mjs` now builds both files from the sources the pages use:
the billing catalog, `getSitemapPaths()`, `blogPosts`, `COMPARE_COMPETITORS`,
`PRODUCT_PAGES` and `companyIdentity`. It throws if any path it is about to emit
is not in the canonical set, so a retired slug fails the build rather than
shipping.

- `public/llms.txt`, 19.3 KB: entity with GSTIN and SAC, catalog pricing table
  now including a COD-to-prepaid column, 12 feature pages, 12 compare boards, 30
  playbooks, and the full 68-URL canonical directory.
- `public/llms-full.txt`, 86.9 KB: every feature page with its answer-first block
  and FAQs, every board with its dated sourcing note and published entry prices,
  and every playbook with its direct answer and FAQs.

`scripts/check-llms.mjs` asserts both exist in `public/` and in `dist/`, that
every `topedgeai.com` URL in them is canonical, no trailing slashes except the
root, no `/roi`, no `topedgeai.com/docs`, and that llms.txt carries the GSTIN,
the GST line, the 0% markup statement and the trial length. Wired into
`build:netlify` as `check:llms`, plus `npm run llms` to regenerate.

Two scoping decisions worth recording. The ₹-figure check runs only on
`llms.txt` and only above `## Product`, because everything below that line quotes
other people's numbers on purpose: competitor entry tiers, Meta per-message
rates, and the ₹80 to ₹300 courier cost of one RTO. `llms-full.txt` is almost
entirely made of those. The same applies to the pre-existing no-paise rule in
`check-llms-pricing.mjs`, which previously scanned the whole file and now scans
only the part that speaks for us. That checker also gained the COD-to-prepaid
column, so the gate the Interakt FAQ and four compare boards all got wrong is
now asserted against the catalog on every build.

`robots.txt` gained the pointer, and `netlify.toml` gained explicit
`Content-Type` and one-hour `Cache-Control` rules for `llms-full.txt`,
`robots.txt` and `sitemap.xml`, which had none at all.

On value: Google's own AI-optimization guidance says llms.txt is not a ranking
signal. This is kept because it is cheap, because some answer engines do fetch
it, and because being generated means it can no longer be wrong. It is not a
ranking lever and should not be treated as one.

## 2. The dashboard subdomain: diagnosed, specified, not fixable from here

Full detail in `seo-audit/DASHBOARD-SUBDOMAIN-SPEC.md`. The dashboard is a
separate repo and is not in this workspace or any sibling directory.

The audit said external crawlers were blocked. They are not. Every URL answers
200 to every agent. Measured live:

- `/docs` and `/docs/connect-whatsapp` both return the **identical 4,072-byte
  client-side shell**, 0 characters of rendered text, the same generic title, and
  `<link rel="canonical" href="https://dash.topedgeai.com/" />`. All 36
  documentation URLs are telling Google in a canonical tag that they are
  duplicates of the sign-in page. That is why zero are indexed.
- `dash.topedgeai.com/sitemap.xml` contains exactly three URLs: `/login` at
  priority 1.0, `/signup` at 0.8 and `/` at 0.5, all with a 2024-04-03 lastmod.
  Zero docs URLs. Those three are precisely the three Google indexed.
- `Disallow: /settings/*` **cannot match** `/settings?tab=billing`: the pattern
  needs a `/` after `settings` and the live URL has `?` there. That is the exact
  reason that URL is indexed. `Allow: /login` and `Allow: /signup` make it worse
  by singling those paths out as wanted.
- No `<meta name="robots">` on any authenticated route.
- `dash/privacy` and `dash/terms` return 200 with self-referencing canonicals, so
  both compete with the marketing originals.

**Decided: the docs stay on `dash.topedgeai.com/docs`.** They were split across
two domains once and that duplication is what the 9 Oct move removed. So the
spec is the whole job and all five sections apply in the dashboard repo.

One change made here to match: `/docs/*` now redirects with `:splat` rather than
collapsing every deep path onto the docs index, so an old link to
`/docs/connect-whatsapp` lands on that page. The dashboard serves the deep paths
(all 200, checked 21 Oct). Nothing on this domain claims to own documentation any
more, and `check-llms.mjs` fails the build if a generated file ever references
`topedgeai.com/docs` again.

## 3. All 13 feature pages audited

Correcting the premise: all 13 are prerendered, in `sitemap.xml`, and were
already inside the character contract with FAQPage, Organization, WebPage and
BreadcrumbList. Only 3 changed in Phase 1 because only those 3 were named in the
audit; the other 10 already carried India in the title.

The real gap was the H1s and the FAQ depth.

- **12 H1s rewritten.** They were product slogans that read well and carried none
  of the terms a merchant types: "WhatsApp AI on your own API keys", "Website
  intent, matched to WhatsApp", "Digital warranty workspace". Each now leads with
  the job and the platform.
- **FAQs raised to 4 or more on all 13** (from 2 on eight pages and 3 on two).
  Every addition is about our own product and the plan gates on `/pricing`, with
  no competitor named and no number invented.
- **`SoftwareApplication` added to all 13**, via `featureSoftwareJsonLd()`, which
  points every feature page at one `@id`. Deliberately unpriced: a priced
  `SoftwareApplication` on 13 pages would enter 13 competing merchant listings for
  one product, which is why `PAGE_TYPE_SCHEMA.feature` never asked for it. It
  grounds the entity and leaves the offers on the page that sells.
- **COD page**: title now carries "Cut RTO", H1 now carries confirmation, RTO and
  prepaid conversion in one line.

One thing deliberately not done. The brief asked for a page targeting "WhatsApp
Shared Inbox with Shopify Order Context" in a title and H1. The blog post that
ranks **#1 in Google** for that exact query already owns it, and `/features/live-chat`
301s to the hub. Building a feature page on that phrase would split the only #1
the site has. `chat-rules` was given routing language instead.

## 4. The four-way board exists

`/compare/topedge-vs-wati-vs-interakt-vs-aisensy`

The suggestion was right and it cost no new competitor claims. All 13 row ids on
the approved three-way board have a verbatim Interakt cell already published on
`/compare/interakt`, so `FOUR_WAY_FEATURE_MATRIX` is derived by joining them on
id at module load, and throws if a cell is ever missing. It cannot say anything
about Interakt that the pairwise board does not already say, and editing the
pairwise cell edits this one. That is what keeps a four-way board inside
`VERBATIM_ONLY`.

`CompareThreeWayPage` held its 200 lines of markup inline, so a four-way board
would have been a copy that drifts. Both boards now render through
`CompareMultiWayPage`, with the peer list as data.

- Title leads with the query: "WATI vs Interakt vs AiSensy vs TopEdge AI (2026)".
- 13 rows, 4 columns, 5 FAQs, FAQPage + WebPage + BreadcrumbList.
- Cross-linked from the compare hub (as the first featured card), the footer, the
  three-way board, and the WATI, AiSensy and Interakt pairwise boards. Interakt
  had no multi-way link at all before, which was the gap.

68 URLs now, up from 67.

## 5. There is no user-agent branching, and now it is proven per deploy

Inspected `netlify.toml`, `public/_redirects`, `public/_headers` (absent),
`vite.config`, `build-static.js` and the prerender server. No UA branching, no
bot challenge, no edge function or middleware of any kind. `vercel.json` does not
exist; this deploys on Netlify.

`npm run verify:live-aeo` (`scripts/verify-live-aeo.mjs`) proves it rather than
asserting it. For 14 pages and 4 text surfaces it fetches as Googlebot,
OAI-SearchBot, PerplexityBot and ClaudeBot, then requires 200 from all four and
**byte-identical bodies**, checks that the strings this release removed are gone,
and checks the four consolidated slugs 301 rather than 200.

Run against production before deploying Phase 2:

    13 pages, all 200, all byte-identical across the four agents
    robots.txt, sitemap.xml, llms.txt all 200 as text
    /roi, /blog/ai-chatbot-for-shopify, /blog/cod-confirmation-whatsapp-reduce-rto-shopify
      and /blog/topedge-ai-voice-agents-vs-human-agents-2024 all 301 correctly
    2 expected failures: the four-way board and llms-full.txt are 404 until deploy

So the audit's "crawlers blocked" finding was its own crawler. The two 404s are
the script working as intended: it fails until the new build is live.

## Build state after Phase 2

`npm run build:netlify`: 67 prerendered pages, 0 failures, dist check green.
`check:pricing`, `check:blog`, `check:llms`, `check:lp`, `seo:contracts`,
`sitemap:validate` all pass. `tsc --noEmit` clean. `eslint`: 0 errors, 5
pre-existing react-refresh warnings in files untouched by this work.
Sitemap: 68 URLs.
