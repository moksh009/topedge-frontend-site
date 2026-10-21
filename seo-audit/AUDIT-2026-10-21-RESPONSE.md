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
