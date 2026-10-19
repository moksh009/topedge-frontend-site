# SERP reconnaissance — why we rank nowhere

**Run 2026-10-19. Neutral search context (no TopEdge account, no personalisation).**
Method: live search on the queries an Indian Shopify merchant actually types. This is *not*
Search Console data — see "What this is not" at the bottom.

---

## The finding

**TopEdge did not appear in a single one of the commercial SERPs tested.** Not in the
"best apps" lists, not for COD/RTO — our own money page — and not for competitor-alternative
queries we have dedicated pages for.

| Query tested | TopEdge present? | Who owns the SERP instead |
|---|---|---|
| best whatsapp automation app for shopify india 2026 | **No** | controlf5.in · growave.io · sumtracker.com · easysellapp.com · zoko.io — naming Interakt, Dondy, Getgabs, LimeChat, AiTrillion |
| whatsapp COD confirmation shopify reduce RTO india | **No** | fast2sms.com · hillteck.com · campaignhq.co · interakt.shop · **three Shopify App Store listings** · a Shopify Community thread |
| "how much does RTO cost" shopify india | **No** | hillteck.com · shipping.amazon.in · edesy.in · echai.ventures · base.com · shipprime.live |
| wati alternative india shopify cart recovery | **No** | dealism.ai · instantdm.com · hillteck.com · zoko.io · bitespeed.co · echai.ventures |

We have a page targeting every one of those four. None of them surface.

---

## Why — three structural causes, in order of how fixable they are

### 1. Our content carries no numbers, so nothing can cite it

Every page that beat us answers with specifics. We answer with concepts.

| | What ranks | What we publish |
|---|---|---|
| RTO cost | Itemised: forward ₹60–80, reverse ₹60–80, wasted CAC ₹150–400; Amazon Shipping's ₹180–240 per returned COD order; edesy's ₹630 worked model | No rupee figure anywhere in the COD/RTO posts |
| WhatsApp API price | A rate table — marketing vs utility vs authentication, per message, with a date | **`whatsapp-business-api-pricing-india` contains zero rupee figures.** For a query that *is* the word "pricing" |
| COD→prepaid | Switch-rate ranges (5–15% conservative, 15–30% for WhatsApp-specific), flat-₹ beats %, send within 20–30 min | Feature described, no benchmarks |

This is a side effect of a good rule (never invent a statistic) applied without the other half:
**cite someone who did measure it.** The result is pages that are accurate, honest, and
unquotable. An answer engine has nothing to lift.

### 2. Our one page with real numbers has no links on it

`cod-rto-benchmark-india-2026` does carry the Unicommerce / Shipway 39% and 21% figures — and
has **zero external links**. The sources are named in prose only. That is the whole corpus
behaving this way: audit TE-014 counted just 12 unique external link hosts across 101 pages.
Linked, dated citations are what make a page a citable node rather than a dead end.

### 3. Shopify App Store listings rank organically for our queries — and ours has 0 reviews

Three App Store listings (Verify COD, Level, Cashfree CODFIRM) rank on page one for the COD/RTO
query. That is a surface we already own and cannot currently compete on, because the listing has
no reviews. Re-confirms audit TE-009.

---

## What this means for AI answers

Perplexity, ChatGPT search and Google's AI Overviews answer by citing what ranks. The sources
above *are* the answer set for these questions today. So the 0-of-49 unbranded-citation result
in the earlier GEO baseline is not a separate problem from the ranking problem — **it is the same
problem, measured downstream.** Fixing citability fixes both.

---

## Live openings found while testing

- **Meta changed India rates on 1 Jan 2026.** Multiple sources report the marketing rate rising
  roughly 10% (about ₹0.78 → ₹0.86 per message, ex GST), with utility and authentication flat
  near ₹0.115, service replies free inside the 24-hour window, and the universal 1,000-free-
  conversation tier retired in mid-2025. **Reported figures disagree by up to ~40%** (₹0.78 to
  ₹1.10) because BSP markups get quoted as if they were Meta's base rate.
  That disagreement is precisely our 0%-markup argument, and nobody is explaining it clearly.
  → Highest-value content fix on the site. **Rates must be checked against Meta's own Business
  Manager rate card before publishing any figure** (see below).
- **"I didn't find a native Shopify app that computes RTO cost."** A real unmet need, surfaced by
  the search itself.
- **COD→prepaid** has no authoritative Indian benchmark; every number is a vendor claim.

---

## What this is not

- **Not Search Console.** No impressions, no positions, no CTR, no indexation state. GSC is still
  blocked — see `ACCESS-NEEDED.md`. Everything above is what a neutral searcher sees, which is a
  different (and complementary) thing to what Google reports we rank for.
- **Not rank-tracked.** Single observation per query, one day, one locale. Directional.
- **Not source-verified page by page.** This sandbox's egress proxy blocks outbound page fetches
  (`WebFetch` → ENOTFOUND on every host, including `developers.facebook.com`), so these are search
  summaries, not pages I opened. **Any third-party figure above needs one human check before it is
  published on the site.**
- **Not from Semrush.** The account has no API units (`no_api_units`, retried 2026-10-19), so
  there is no volume, difficulty or crawled-backlink data behind this.
- **AI assistants were not queried.** ChatGPT, Perplexity, Gemini and Copilot need a signed-in
  browser session, which this environment cannot open — the query set and manual protocol live in
  `docs/seo/geo-citation-log.md`.
