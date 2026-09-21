# Content engine — topic backlog

> **Rule:** Log ideas here the moment they appear (research, sales calls, Phase 5 discovery, GSC queries). Nothing auto-publishes. One researched post every **1–2 weeks** beats a burst then silence.

Related: Phase 6 measurement hub — [`measurement.md`](./measurement.md) · citation log — [`geo-citation-log.md`](./geo-citation-log.md). Impressions for unexpected queries in GSC/Bing should land in the content backlog below, not only in Search Console screenshots.

Last refreshed: **2026-09-21**

Status: `idea` → `outlined` → `drafting` → `fact-check` → `published` → `refresh`

---

## Standing rules (every post)

1. **Sourcing** — same discipline as compare pages: real numbers with a source, or say “verify live.”
2. **No invented stats / quotes** — if you do not have the data, do not publish a “report.”
3. **Link out to compare boards** for tabular detail; keep narrative posts problem-first.
4. **Ship checklist** — update `BLOG_SLUGS` in `scripts/marketing-urls.mjs`, regenerate sitemap, add the URL to `public/llms.txt`.
5. **Cadence** — target **1 post / 1–2 weeks**. Skip a slot rather than pad with thin content.

---

## Cadence log

| Window | Planned slug | Status | Notes |
|---|---|---|---|
| 2026-09-20 | `zoko-alternative-shopify-india` | published | Phase 3 batch |
| 2026-09-20 | `getgabs-alternative-shopify-whatsapp` | published | Phase 3 batch |
| 2026-09-20 | `kanal-whatsapp-alternative-shopify` | published | Phase 3 batch |
| 2026-09-20 | `how-to-choose-whatsapp-app-shopify-app-store` | published | Phase 3 batch |
| 2026-09-20 | `whatsapp-business-api-pricing-india` | published | Phase 3 batch |
| 2026-09-21 | `dondy-alternative-shopify-india` | published | GEO baseline; links `/compare/dondy` |
| Next 1–2 weeks | _(pick from backlog)_ | idea | Prefer one refresh or one new gap, not five |

---

## Backlog

| ID | Working title / query | Type | Priority | Status | Source of idea | Notes |
|---|---|---|---|---|---|---|
| C1 | Zoko alternative (narrative) | alternative | P0 | published | Master audit Phase 3 | Links `/compare/zoko` |
| C2 | Getgabs alternative (narrative) | alternative | P0 | published | Master audit Phase 3 | Links `/compare/getgabs` |
| C3 | Kanal WhatsApp alternative | alternative | P0 | published | Master audit Phase 3 | Links `/compare/kanal` |
| C4 | How to choose a WhatsApp app (Shopify App Store) | buyer guide | P0 | published | Master audit Phase 3 | Funnel into `/compare/alternatives` |
| C5 | WhatsApp Business API / Meta Cloud API pricing India | pricing explainer | P0 | published | Master audit Phase 3 | Verify Meta rate card live before refresh |
| C13 | Dondy alternative (rate-card markup) | alternative | P0 | published | GEO baseline | Links `/compare/dondy`. Live 21 Sep 2026: 4.9★ / 821, India $0.01888 |
| C6 | **State of WhatsApp Commerce in India** (original data) | report | P1 | **blocked** | Master audit / GEO | Needs real aggregable store metrics — see below |
| C7 | Interakt alternative (narrative) | alternative | P2 | idea | Symmetry with Phase 2 compares | After C1–C5 settle |
| C8 | Bitespeed alternative for India D2C | alternative | P2 | idea | Roundup outreach | Pair with `/compare/bitespeed` |
| C9 | Conversation metering vs flat order pricing (explainer) | pricing | P2 | idea | Zoko compare angle | Evergreen; refresh when vendor models change |
| C10 | Free-to-install WhatsApp apps: what is still gated | buyer guide | P2 | idea | Getgabs price-gap theme | |
| C11 | COD → prepaid on WhatsApp: playbook refresh | playbook | P3 | idea | Existing COD posts | Only if product/docs changed |
| C12 | Warranty + WhatsApp post-purchase | feature | P3 | idea | Differentiator vs most apps | Wait for stronger case proof |

---

## C6 — State of WhatsApp Commerce (blocked)

**Do not ship** until we can cite real, anonymized aggregates from TopEdge-connected stores (or another first-party dataset we own).

Minimum data to scope a future quarter:

| Metric | Why it cites | Likely source |
|---|---|---|
| Cart recovery rate (recovered orders / abandoned eligible) | Highest GEO citation value | Journey analytics |
| Median time-to-first-WhatsApp after abandon | Ops realism | Journey timestamps |
| COD confirm rate + ship-of-confirmed rate | RTO story | COD journey + Shopify fulfillment |
| COD → prepaid conversion rate (where journey exists) | Differentiator | Journey + payment updates |
| Template reject / quality-rating incidents (anonymized) | Meta education | Meta Manager logs |

**Gate:** N stores ≥ threshold (agree with founder), date range fixed, methodology paragraph on the page, no “industry average” invented from blogs.

Until then status stays **`blocked`**.

---

## Intake (paste new ideas at the top of the table)

When Phase 5 discovery, GSC, sales, or support surfaces a query:

1. Add a row with `idea` status.
2. Note the verbatim query if known.
3. Do **not** start drafting until the next cadence slot is free.
