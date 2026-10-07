# Fix log

Branch: `seo-audit-oct-2026`, off `update-pricing` @ `f57842a`.
Nothing merged to a deploy branch. Nothing deployed. **All three fixes below are
"fixed, awaiting deploy" — verified in `dist/`, not yet verified on a live URL.**

---

## Batch 1 — 2026-10-07

### Commits

| Commit | What |
|---|---|
| `4256d16` | `seo-audit/`: Day 1 report, 21 findings, access blockers, evidence (audit only, no site code) |
| `245618f` | `seo-audit/`: Lighthouse summary CSV + evidence index |
| *(see `git log`)* | **TE-001 / TE-002 / TE-003** + `query-set.csv` — the only commit that touches site code |

Source files changed, in total, across the whole batch:

```
src/marketing/components/pricing/PlanGrid.tsx  |  8 +++-
src/marketing/components/pricing/PriceRoll.tsx | 21 +++++++++-
src/marketing/data/pageSeo.ts                  | 30 +++++----------
src/pages/Home.tsx                             |  2 +-
```

Deliberately **not** committed: regenerated `src/marketing/data/generated/contentDates.*`
and `public/sitemap.xml`. The date generator falls back to file mtime for dirty files, so
building against an uncommitted tree stamps today onto pages whose content did not change —
it wanted to mark the homepage "modified 2026-10-07" because `pageSeo.ts` was dirty. CI
regenerates both from commit dates. This is logged as its own finding, **TE-022**.

### Gate output

Run on the full batch before committing. Rule 8.

```
$ npx tsc --noEmit -p tsconfig.app.json
  20 pre-existing errors, all in src/pages/community/* and src/services/firebase.ts
  (missing "@/" path alias). ZERO in any file this batch touches.

$ npm run check:docs
  ✓ docs content check passed — 36 pages, budgets, anchors and links clean

$ npm run check:blog
  ✓ blog content check passed — 26 posts, budgets and internal links clean

$ npm run check:pricing
  ✓ catalog drift check passed — FALLBACK_CATALOG prices, limits, plan names and
    feature flags all match https://api.topedgeai.com/api/billing/catalog
  ✓ llms.txt pricing check passed — every value matches the billing catalog

$ npm run seo:contracts
  ✅ seo-contracts.selftest passed

$ npm run build:netlify
  ✅ Prerender done: 100 ok, 0 failed
  ✅ Wrote 36 docs Markdown mirrors + dist/docs/index.md
  exit 0

$ npm run seo:audit
  ✅ seo-static-head-audit passed
  ✅ seo:audit passed (100 prerendered + legal)
```

### Verification in the build output

Not "the build passed", but the actual assertions:

**TE-001 — `dist/index.html`**

| Check | Before | After |
|---|---|---|
| `reviewBody` occurrences | 4 | **0** |
| `"@type":"Review"` occurrences | 4 | **0** |
| `Steven Mugabe` anywhere in the file | 1 (JSON-LD only) | **0** |
| JSON-LD blocks | 4 | **4** — `FAQPage`, `Organization`, `SoftwareApplication+Product`, `WebSite`, all still parsing |
| Visible testimonials still rendered | yes | **yes** — Ved Patel ×2, Shubhash Bhai ×2, Delitech Smart Home ×6 |

**TE-002 / TE-003 — `dist/pricing.html`**

| Check | Before | After |
|---|---|---|
| Extracted visible text | `Launch Plan ₹ 1 , 5 9 9 per month` | **`Launch Plan ₹ 1,599 per month, billed yearly`** |
| `per month, billed yearly` | 0 | **3** (one per plan) |
| bare `per month</span>` | 3 | **0** |
| `mkt-price__ch--digit` spans | 21 (counted on the live page) | **0** |
| Month-to-month price still stated | yes | **yes** — `₹1,999/mo month-to-month` |

Confirmed the plan grid renders on `/pricing` only — `dist/index.html` has no
`mkt-plan__period` and no digit spans — so the change is fully scoped.

### Live re-verification — NOT DONE

Requires merge to `update-pricing` and a Netlify deploy, which needs your approval
(rule 4). When you approve I will: merge, wait for the deploy, re-fetch `/` and `/pricing`
with `curl`, and re-assert every row in the two tables above against the live HTML.

### Indexing actions — NOT DONE

No GSC "Request Indexing", no sitemap resubmission, no IndexNow run. GSC is blocked
(`ACCESS-NEEDED.md`), and there is no point submitting before the fixes are live.
`indexing-log.csv` will be created when the first submission actually happens.
