# Deep research prompt: TopEdge AI organic growth

Paste everything below the line into a browser-based research agent (ChatGPT with
search, Gemini Deep Research, Perplexity, Claude with web access). It is written to
be self-contained: the agent should not have to guess anything about the business.

Generated 2026-10-21. Re-check the "already done" section before reusing it, or the
agent will recommend work that is finished.

---

You are a senior SEO, AEO and GEO strategist. Your client is an Indian B2B SaaS
company. I want a research-backed action plan, not a summary of best practice.
Use live web search throughout. Open pages and read them; do not answer from
training memory. Every factual claim, statistic, price and ranking observation
must carry a working link to the primary source and the date you read it.

## 1. The business

**TopEdge AI** (topedgeai.com) sells WhatsApp automation for Shopify stores in
India. It is a partnership registered in Ahmedabad, Gujarat. Founders Moksh Patel
and Smit Tilva.

What it does: abandoned cart recovery on WhatsApp, COD order confirmation before
dispatch, COD-to-prepaid conversion, a shared inbox carrying Shopify order
context, Meta-approved message template management, campaigns, opt-in capture
tools, a visual journey builder, a flow builder, bring-your-own-key AI replies,
intent routing, warranty tracking, and an India-aware P&L view (COGS, packaging,
payment fees, COD/RTO leakage, ads).

Pricing, INR, plus 18% GST, published openly:
- Launch ₹1,999/mo (₹1,599/mo billed yearly), 100 orders/mo, 3,000 sends
- Growth ₹3,999/mo (₹3,199/mo billed yearly), 800 orders/mo, 15,000 sends
- Scale ₹6,499/mo (₹5,199/mo billed yearly), 1,500 orders/mo, 30,000 sends
- 14-day free trial, no card required
- Meta WhatsApp Cloud API messaging billed separately by Meta, passed through at
  0% markup. This is the core commercial differentiator: several competitors
  publish rate tables above Meta's own rates.

Proof assets that exist today: Trustpilot 4.0 from 5 reviews; a live Shopify App
Store listing with **0 reviews**; named customers Delitech Smart Home and Apex
Light; Meta Business Partner and Shopify App Store badges.

Direct competitors, each with a dedicated comparison page on the site: WATI,
AiSensy, Interakt, Bitespeed, Zoko, Getgabs, Kanal, Dondy, Gupshup, Updatrr.

Site size: 69 indexable URLs. 32 blog posts, 13 feature pages, 12 comparison
pages, 12 top-level pages.

## 2. What is already done (do not recommend these again)

A technical and content audit ran on 2026-10-07 and remediation shipped through
2026-10-21. The following are complete and verified:

- All 69 URLs return 200, are prerendered with content and JSON-LD in the initial
  HTML, carry `index, follow` and a self-referencing absolute canonical.
- robots.txt is correct, including RFC 9309 group precedence. Sitemap is
  referenced and submitted.
- Titles and meta descriptions: all 25 page templates pass a 15–65 character
  title and 70–165 character description budget.
- Every blog post has a keyword set and an FAQ block with FAQPage schema.
- Internal linking: every post has at least 3 inbound and 3 outbound internal
  links. Median 7 inbound, 8 outbound.
- Outbound citations: every post now links at least one primary source. Meta's
  pricing docs and template guidelines, the WhatsApp Business Messaging Policy,
  Shopify's abandoned checkout docs, Baymard's cart abandonment list, and
  Unicommerce's India D2C Report 2026.
- Sitemap `lastmod` is accurate per page rather than inherited from shared
  modules.
- Organization JSON-LD is consolidated under a single `@id` with `sameAs`
  covering LinkedIn, Instagram, YouTube, the Shopify App Store listing and
  Trustpilot.
- Homepage FAQ was removed deliberately, with its FAQPage schema.
- IndexNow is wired for Bing, Yandex, Seznam and Naver.

**Do not propose llms.txt as a ranking lever.** Google's own guide to generative
AI features states explicitly that llms.txt, content chunking, text rewritten for
AI, and artificial mentions are unnecessary and sometimes violate spam policies.
Read it and reflect what it actually says:
https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

## 3. The diagnosed problem. Start from here, verify it, then go deeper

A live SERP reconnaissance on 2026-10-19 found **TopEdge appeared in zero of the
commercial SERPs tested**, including queries the site has dedicated pages for.

| Query tested | Present? | Who owns the SERP |
|---|---|---|
| best whatsapp automation app for shopify india 2026 | No | controlf5.in, growave.io, sumtracker.com, easysellapp.com, zoko.io |
| whatsapp COD confirmation shopify reduce RTO india | No | fast2sms.com, hillteck.com, campaignhq.co, interakt.shop, three Shopify App Store listings |
| "how much does RTO cost" shopify india | No | hillteck.com, shipping.amazon.in, edesy.in, echai.ventures |
| wati alternative india shopify cart recovery | No | dealism.ai, instantdm.com, hillteck.com, zoko.io, bitespeed.co |

Three structural causes were identified. Your job is to verify each against the
live SERP today and then tell me what to do about it:

1. **The content carries no numbers, so nothing can cite it.** Pages that outrank
   us answer with specifics: itemised RTO cost (forward ₹60–80, reverse ₹60–80,
   wasted CAC ₹150–400), Amazon Shipping's ₹180–240 per returned COD order,
   per-message rate tables with dates. TopEdge pages describe concepts. The post
   at `/blog/whatsapp-business-api-pricing-india` contains no rupee figures at
   all, for a query that is literally the word "pricing".
2. **Shopify App Store listings rank organically for the money queries**, and the
   TopEdge listing has 0 reviews.
3. **Meta changed India rates on 1 Jan 2026.** Reported marketing rates disagree
   by up to 40% (₹0.78 to ₹1.10 per message) because BSP markups get quoted as if
   they were Meta's base rate. Nobody is explaining this clearly. That confusion
   is exactly the 0%-markup argument.

## 4. Research tasks

### 4a. Technique research: find the best current material

Find and read the highest-quality current material on SEO, AEO and GEO. Tell me
what is actually load-bearing in 2026 and what is cargo cult. For each source,
give the link, the author, the date, and the single most actionable thing in it.

Cover at minimum:
- Google's own documentation: Search Central, the AI features optimization guide,
  the spam policies, the E-E-A-T and helpful content guidance.
- The original Generative Engine Optimization research (Aggarwal et al.) and any
  peer-reviewed follow-ups. I want the measured effect sizes, not blog summaries
  of them. Reported figures include quotations raising share of an AI answer by
  roughly 41%, statistics by about 31%, and citations by about 28%. Verify these
  against the paper and tell me the methodology and its limits.
- Practitioner sources with a track record: Aleyda Solis (Crawling Mondays),
  Kevin Indig (Growth Memo), Ahrefs, Semrush, Screaming Frog, Search Engine Land,
  Search Engine Roundtable, Google Search Central's own channel. Name specific
  videos and posts from the last 12 months, with links, not channel homepages.
- Anything credible and India-specific on D2C, COD and RTO.

Flag explicitly where the sources contradict each other.

### 4b. High commercial intent keyword research (the main deliverable)

**This is the priority.** I do not want informational traffic from people
learning what WhatsApp automation is. I want people who are about to buy.

Build a keyword map for India, English and Hinglish, segmented strictly by intent:

- **Transactional.** "whatsapp automation app for shopify", "cod confirmation
  app shopify india", "whatsapp cart recovery app", pricing queries, free trial
  queries, "buy", "app", "tool", "software", "platform" modifiers.
- **Commercial investigation.** "best X", "top X", "X alternatives", "X vs Y",
  "X review", "X pricing", "cheapest X". Competitor-alternative queries for all
  ten named competitors.
- **Problem-aware with buying intent.** "how to reduce RTO on COD orders",
  "how to confirm COD orders before shipping", "cod to prepaid conversion",
  "reduce fake COD orders". People with this problem are shopping for a fix.
- **Hinglish.** Indian merchants search in Hinglish. "COD confirm karne ka
  WhatsApp automation", "RTO kaise kam kare Shopify", "Shopify ke liye best
  WhatsApp tool". Find real Hinglish query patterns with evidence, not
  transliterations you invented.

For every keyword give me: estimated monthly volume in India with the source and
date, difficulty with the source, the current top 10 with a one-line note on why
each ranks, whether an AI Overview or featured snippet fires and who it cites,
whether a Shopify App Store listing ranks, and the single TopEdge URL that should
win it. Where no TopEdge URL fits, say what page needs to exist.

Then rank every keyword by **(commercial intent × winnability), not by volume.**
A 90-volume query a 69-page site can win beats a 9,000-volume query owned by
Shopify's own docs.

Explicitly flag where the existing TopEdge page is targeting the wrong intent.

### 4c. Content specification for the top 20 keywords

For each of the top 20, give me a build spec I can hand to a writer:
- Target URL (existing or new), exact title tag under 60 characters, meta
  description under 155 characters.
- H1 and the full H2/H3 outline.
- The specific numbers, benchmarks and rupee figures the page must contain to
  compete, each with the primary source to cite. This is the single biggest gap
  in the current content.
- The question-and-answer blocks most likely to be lifted into an AI Overview,
  written as a 40–60 word direct answer followed by detail.
- Schema types to emit.
- Internal links in and out.
- What the pages currently ranking do that TopEdge does not.

Writing constraints that apply to every spec: no em dashes, no invented
statistics, every figure sourced and dated, plain British-Indian business
English, no marketing filler.

### 4d. Google Search Console: insight to action

The team has GSC access but has not been using it systematically. Give me a
concrete operating manual, not a feature tour:

- Which reports to open, in what order, and what a healthy versus unhealthy
  reading looks like for a 69-page site.
- How to find **striking distance** queries, positions 8 to 20, where a small
  content or internal-link change moves a page onto page one. Give me the exact
  filter steps and the export-and-sort method.
- How to find high-impression low-CTR pages and diagnose whether the fix is the
  title, the description, or the intent match.
- How to read the Pages report: the difference between Crawled currently not
  indexed, Discovered currently not indexed, and Duplicate without user-selected
  canonical, and what action each actually calls for.
- How to use the URL Inspection tool to confirm what Googlebot renders on a
  prerendered React site.
- How to detect cannibalisation across 12 comparison pages and 32 blog posts that
  cover overlapping ground.
- A weekly and a monthly checklist with the decision rule attached to each number,
  so a reading leads to an action rather than a note.
- Which metrics are vanity for a site this size and should be ignored.

Note: the Search Console API can read performance data and submit sitemaps, but
there is no API that requests indexing for ordinary pages. The Indexing API
covers JobPosting and BroadcastEvent only. Do not propose otherwise.

### 4e. Link acquisition that needs no outreach

Find every link source where **we create the link ourselves**, with no need to
ask another site owner. Give the exact signup URL, whether the link is dofollow
or nofollow, domain rating, whether it is free, what is needed to qualify, and
realistic time to live. Prioritise by value per hour of work.

Cover at least:
- Software review and directory listings: G2, Capterra, GetApp, Software Advice,
  TrustRadius, SourceForge, SaaSHub, AlternativeTo, Crozdesk, Product Hunt,
  BetaList, SaaSworthy, Startup Stash.
- Company and founder profiles: Crunchbase, LinkedIn company page, Wellfound,
  GitHub organisation, Startup India registry.
- India-specific business directories and startup listings that carry real
  authority rather than spam, with your reasoning for each.
- Platform-native surfaces: Shopify App Store listing optimisation, the Shopify
  Community forum, Meta's partner directory.
- Community participation where a genuine answer earns a link: Reddit
  (r/shopify, r/ecommerce, r/IndianStartups), Quora, Indie Hackers, Hacker News,
  Stack Overflow where relevant.
- Content syndication with correct canonical handling: Medium, Dev.to, Hashnode,
  LinkedIn articles, Substack. Explain the canonical or noindex handling needed
  so syndication does not create duplicate content problems.
- Journalist request services where we respond rather than pitch cold: Help a
  B2B Writer, Qwoted, Featured, SourceBottle, and current HARO successors.
- Digital PR we can originate: the Meta India rate confusion described above is
  an unclaimed story. So is an RTO cost calculator, since a real unmet need was
  found during the SERP work ("I didn't find a native Shopify app that computes
  RTO cost"). Tell me how to build and pitch a linkable asset around each.

**Exclude** private blog networks, purchased links, scaled link exchanges,
automated directory blasts, comment and forum signature spam, and expired domain
redirects. These breach Google's link spam policies, and a manual action would
cost exactly the rankings this exercise is meant to recover. Do not include them
even as options.

Separately: find every existing unlinked mention of TopEdge AI on the web, since
converting those is the cheapest real link there is.

### 4f. The Shopify App Store listing

A listing with 0 reviews ranks nowhere and signals nothing. Research how Shopify
App Store search ranking actually works, what the review solicitation rules
permit, how competitor listings with similar age got their first 20 reviews, and
give me a compliant 30-day plan to get the first reviews from existing paying
customers.

## 5. Output format

Deliver in this order:

1. **Executive summary.** The five things that will move organic traffic most in
   90 days, each with expected impact, effort, and why you believe it.
2. **Keyword map.** A table I can paste into a spreadsheet. Columns: keyword,
   intent, volume, source of volume, difficulty, current rank if any, target URL,
   AI Overview fires yes/no, who it cites, priority score, action.
3. **Content specs** for the top 20.
4. **GSC operating manual.**
5. **Link plan**, as a prioritised list with signup URLs and time estimates.
6. **90-day calendar**, week by week, with owner and acceptance criteria.
7. **Sources.** Every link used, with date read.

## 6. Rules

- Open and read pages. Do not answer from memory.
- Every number carries a link and a date. If you cannot source it, say so and
  leave it out rather than estimating.
- Where you are uncertain, say so explicitly and say what would resolve it.
- Mark clearly where you contradict the 2026-10-19 SERP recon above, and show the
  evidence.
- No em dashes anywhere in your output.
- Do not recommend anything already listed in section 2.
- Prefer specific and checkable over comprehensive and vague.
