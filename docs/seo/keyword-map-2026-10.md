# Keyword map and new-content log (2026-10-08)

Method: existing keyword/cluster docs, the compare matrices (our own sourced research), and live SERP checks for the
RTO, Meta pricing and Shopify WhatsApp app queries. **No search-volume numbers are claimed**: none were available without
Search Console or a paid tool. Volumes go in once GSC/Bing data is exported (see `seo-audit/ACCESS-NEEDED.md`).

## Posts added 2026-10-08

| Slug | Primary keyword | Intent | Links in | Links out |
|---|---|---|---|---|
| `wati-alternative-shopify-india` | WATI alternative India | Comparison | 8 existing posts, `/compare/wati` | `/compare/wati`, 3-way board, pricing |
| `aisensy-alternative-shopify-india` | AiSensy alternative | Comparison | same set, `/compare/aisensy` | `/compare/aisensy`, 3-way board |
| `interakt-alternative-shopify-india` | Interakt alternative Shopify | Comparison | same set, `/compare/interakt` | `/compare/interakt`, journeys |
| `bitespeed-alternative-shopify-india` | Bitespeed alternative | Comparison | same set, `/compare/bitespeed` | `/compare/bitespeed`, Live Chat |
| `whatsapp-template-rejected-meta-shopify-fix` | WhatsApp template rejected | Problem-aware how-to | Meta templates, API pricing, COD, automation guide | Meta Manager, pricing post |
| `whatsapp-opt-in-shopify-india` | WhatsApp opt-in Shopify | Problem-aware how-to | cart recovery, COD, automation guide | opt-in tools feature, cart recovery |

## Next in the queue (not written; each needs real data or product proof first)

- Interakt/Bitespeed price tables once re-verified live (figures above are Sep 2026 snapshots).
- "WhatsApp Click-to-WhatsApp ads for Shopify India" (needs product proof of the ad attribution path).
- C6 State of WhatsApp Commerce: still blocked on first-party data, see `content-backlog.md`.

## Backlinks: what can and cannot be done from the repo

Links cannot be created from code. The researched targets are in `backlink-opportunities.md` (R1-R7 roundups, with
drafts in `outreach-drafts-week1.md`). New asset worth pitching: the six posts above, especially the template-rejection
checklist (a genuinely linkable reference). Highest-leverage non-roundup items, all human actions:

1. Shopify App Store reviews (listing is at 0 reviews, audit TE-009).
2. Trustpilot profile (TrustBox already wired on the landing page).
3. LinkedIn company page and founder profiles linked from `sameAs` (add the founders' own profile URLs to `TEAM.sameAs` in `src/marketing/data/pageSeo.ts` when ready).
4. Founder answers (disclosed) on Reddit/Quora threads logged in `backlink-opportunities.md`.

## 2026-10-19 — SERP-evidenced rewrite

Full evidence: `seo-audit/SERP-RECON-2026-10-19.md`. Four neutral commercial SERPs tested;
**TopEdge appeared in none of them**, including queries we have dedicated pages for.

### Rewritten

| Slug | Target query | What was wrong | What changed |
|---|---|---|---|
| `whatsapp-business-api-pricing-india` | whatsapp business api pricing india | **Zero rupee figures in a post about pricing.** Searchers want the rate card; we published only the concept of "two bills" | Category rate table with 2026 reported India figures; the 1 Jan 2026 rate change as a freshness hook; the retired 1,000-free-conversation tier; a worked 1,000-order example showing utility is ~4% of a typical bill; "why every article quotes a different number" (BSP markup printed as Meta rate) as the differentiated angle; the Business-Manager-vs-invoice test that actually verifies a 0% markup claim; Person author; 5 FAQs; outbound link to Meta's pricing docs. Title now exact-match. 0 → 11 rupee figures |

### Open, evidence-backed, not yet done

- **Figures need one human check.** The 2026 rates in that post are what India BSP trackers
  published, not Meta's own rate card. The sandbox proxy blocks outbound fetches, so
  `developers.facebook.com` could not be opened. Verify in Meta Business Manager before this
  ranks on a wrong number — a wrong price is the TE-002 failure mode and the most damaging kind.
- **COD→prepaid** has no authoritative Indian benchmark; every published number is a vendor
  claim (5–15% conservative, 15–30% WhatsApp-specific). A sourced post here is open ground.
- **Citations generally.** `cod-rto-benchmark-india-2026` carries the Unicommerce/Shipway 39%
  and 21% figures with **no external links at all**. Linking them is cheap and makes the page a
  citable node (TE-014: 12 external hosts across the whole site).
