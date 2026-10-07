# Fix log

Branch: `seo-audit-oct-2026`, off `update-pricing` @ `f57842a`.
**Merged to `update-pricing` as `c63b0eb` and pushed on 2026-10-07.** Live
verification is recorded in "Batch 2" below.

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


---

## Batch 2 — hero launch film, and the merge — 2026-10-07

### The merge

`origin/update-pricing` had moved on while this branch was open: `4dd6c10`
("broaden COD confirmation ad page beyond one feature, add hero motion video hook")
touched four of the same five landing-page files. One conflict, in
`scripts/generate-landing-pages.mjs`:

```
<<<<<<< HEAD
    PLATFORM_CARDS: platformHtml,
    PHONE_HERO: phone('hero-phone'),
=======
    HERO_MEDIA: heroVideo(),
>>>>>>> seo-audit-oct-2026
```

Resolved by keeping **both** live tokens and dropping `PHONE_HERO`, which nothing
references any more now that the body's `hero-vis` slot is `{{HERO_MEDIA}}`.
`phone()` is still used for `PHONE_HOW`.

The two hero-video changes turned out **not** to collide:

| | `4dd6c10` | this branch |
|---|---|---|
| What | decorative `aria-hidden` background layer behind the whole hero | the launch film, in the `hero-vis` column |
| Element | `#hero-video`, injected by `createElement` after `load` | `<video id="lv">` in the markup |
| Asset | `/videos/cod-hero-motion.mp4` — **does not exist, 404** | real, compressed, committed |
| Behaviour | `autoplay`, `muted`, `loop`, `preload="auto"`, desktop-only | click-to-play, `preload="none"` |

Both kept. `4dd6c10`'s layer is left exactly as written — its own comment says
"Replace later when the asset is ready", and its error handler removes the element,
so it is inert until someone uploads that file. **Logged as TE-023, not deleted:**
it is another contributor's work, and whether to upload or remove it is the owner's call.

One thing worth knowing if that asset does get uploaded: it is created with
`autoplay` and `preload="auto"`, so unlike the hero film it **will** download on load
for every qualifying desktop visitor, on a page whose entire design goal is instant paint.

### The hero film

Source `topedge_launch_v2_1080p60_web.mp4`: 1920x1080, 60fps, 70s, 137.05 MB, 15.4 Mbps.

| File | Encode | Size | vs source |
|---|---|---|---|
| `topedge-launch.mp4` | 1080p60 H.264 CRF 23 preset slow, AAC 128k, faststart | 21.47 MB | **-84.3%** |
| `topedge-launch-mobile.mp4` | 1280x720 lanczos, CRF 23, AAC 112k | 8.87 MB | **-93.5%** |
| `topedge-launch-poster.webp` | frame at 50s, 1280px, q82 | 36.5 KB | — |

Quality measured against the source, not asserted:

| Encode | SSIM (all) | PSNR-Y |
|---|---|---|
| CRF 20, 1080p60 (43.82 MB) | 0.999139 | 58.05 dB |
| **CRF 23, 1080p60 (21.47 MB) — shipped** | **0.998996** | **57.37 dB** |
| CRF 23, 720p vs 720p reference (8.87 MB) | 0.998797 | — |

CRF 20 costs twice the bytes for 0.00014 SSIM and 0.68 dB. Both sit far above the
~45 dB visually-lossless mark. VMAF was attempted — `libvmaf` is present and both runs
completed, but neither emitted a parseable score, so **no VMAF number is claimed here.**

### Verified in a real browser, before deploy

| Check | Result |
|---|---|
| Video bytes before play | **0** — `readyState: 0`, no `.mp4` in resource timing |
| Whole page transferred | **46 KB** (37 KB of it the poster) |
| After pressing play | 70.00s, 1920x1080, `readyState: 4`, playing |
| Source at 1235px viewport | `topedge-launch.mp4` |
| Source at 375px viewport | `topedge-launch-mobile.mp4` — **one file, never both** |
| `autoplay` / hardcoded `src` | neither |

### Gate output (merged tree)

```
check:docs       ✓ 36 pages, budgets, anchors and links clean
check:blog       ✓ 26 posts, budgets and internal links clean
check:pricing    ✓ catalog drift + llms.txt pricing match the live billing API
check:lp         ✅ landing page check passed
seo:contracts    ✅ seo-contracts.selftest passed
build:netlify    ✅ 100 prerendered, 0 failed (exit 0)
seo:audit        ✅ seo:audit passed (100 prerendered + legal)
tsc              no error in any file this merge touches; all remaining errors are
                 the pre-existing "@/" alias problem in community/, admin/ and ui/
```

### Guards changed, not removed

The page contract banned `<video>` outright and the spec listed the hero video as out
of scope, because this page is static HTML precisely to avoid the 4-7s mobile LCP that
React routes here measure. The owner pulled it into scope on 2026-10-07. Both the
generator and `check:lp` now allow at most one video and require `preload="none"`, a
poster, `playsinline`, `controls`, a descriptive `aria-label`, no `autoplay` and no
hardcoded `src`. Both also now strip inline `<script>` bodies before applying
markup-shape rules — JS source is not markup, and a tag name inside a comment is not an
element. Spec revision 3 records the decision and the numbers.
