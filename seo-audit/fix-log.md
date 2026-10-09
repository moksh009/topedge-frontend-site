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

## Batch 3 - 2026-10-08

- **TE-004** One Organization node (`@id` `https://topedgeai.com/#organization`) emitted on every indexable page via `MarketingSEO`, deduped by `@id`; blog, docs, WebPage and WebSite now reference it instead of restating a stub. Name unified to "TopEdge AI", one logo.
- **TE-008** Blog and docs now use a Person author (founder) with `@id`, `worksFor` the organization; visible byline links to /about; `article:author`, `article:section` and `meta author` added.
- **TE-018** `robots.txt` rewritten as one group listing every crawler, so Disallow rules apply to AI bots too.
- Added hreflang `en-IN` + `x-default` self-references; `og:site_name` is "TopEdge AI".
- Six new posts (see `docs/seo/keyword-map-2026-10.md`), interlinked from 11 existing posts and 4 compare pages; `llms.txt` and `BLOG_SLUGS` updated; content-date generator reads the new data file.
- `tsconfig.app.json` now resolves the `@/` alias (the long-standing tsc noise).
- Gates: `build:netlify` exit 0 (106 prerendered, 0 failed), `seo:audit` passed, `sitemap:validate` all clear, `check:blog` 32 posts clean.
- **Not done:** legacy `/community` + old-site code removal (blocked, awaiting owner), live re-verification, GSC.

## Batch 4 — attribution end-to-end, TE-006, heading skips — 2026-10-09

### Site (`topedge-frontend-site`)

- **TE-006 fixed.** `DemoProductVideoFrame` attaches its src once the frame scrolls into
  view, so the prerender snapshot — taken at a desktop viewport — baked the DESKTOP encode
  into the markup with `preload="auto"`. A phone therefore started fetching
  `cod-prepaid11.mp4` (10.1 MB) / `flowwww1.mp4` (13.4 MB) / `opt-in.mp4` (11.7 MB) straight
  from the HTML and only swapped to the ~1.8–2.2 MB mobile cut after hydration, paying for
  both. `scripts/prerender-marketing.mjs` now strips the baked-in src for
  `demo-video-glow__el`, exactly as it already did for the home hero film.
  **Verified in a real browser:** `/features/journeys`, `/features/flow-builder` and
  `/features/opt-in-tools` each requested two `.mp4` files at 390px before and one after;
  desktop still receives the full-size encode. Video requests on `/features/journeys`
  mobile: 2 → 1.
- **Heading skips: 4 → 0.** `/customers`, `/pricing` and the product feature pages jumped
  h1 → h3 (card titles with no section heading between). Promoted to h2. Every one of those
  classes sets `margin`, `font-size`, `font-weight` and `line-height` explicitly, so the
  change is invisible — confirmed numerically: the `.mkt-customers__label` box computed
  13px / 5.6px margin-top / 121×35 both before and after, tag name the only difference.
  `public/privacy.html` jumped h2 → h4; those eight became h3 and the tag-coupled selector
  was widened to `h3, h4` so nothing lost styling.
- **hreflang on the static legal pages.** `/privacy` and `/terms` are plain HTML (Meta
  crawler-safe) so `MarketingSEO`'s hreflang never reached them; added the same
  self-referencing `en-IN` + `x-default` pair the React pages emit.
- Pricing subtitle had a space before its comma; now a colon.

### Attribution (all three repos)

Ad attribution now covers the three signup doors and both iPhone click types:

| Door | How it is attributed |
|---|---|
| Email signup | `attribution` on `POST /auth/register` |
| Google signup / first Google login | carried inside the signed OAuth state |
| **Shopify App Store install** | the `te_attr` cookie on the OAuth callback; cold installs carry it on `PendingShopifyInstall` until claimed |

- Shopify installs set `signupMethod: 'shopify'` and never overwrite an existing signup
  attribution.
- Shopify bills in USD, so the first paid event records `paidCurrency` + `paidValueMinor`
  alongside the existing INR `paidMrrExGstPaise`.
- The export writes one CSV per click-identifier type — `Google Click ID`, `GBRAID`,
  `WBRAID` — because Google requires exactly one per upload row. gclid is preferred, then
  gbraid, then wbraid.
- 36 backend tests, 6 dashboard tests. End-to-end re-verified in a browser on this build:
  `/lp/cod-confirmation?gclid=TEST123…` → signup redirect → dashboard register payload
  carried `{"gclid":"TEST123","utm_source":"google","utm_campaign":"test","lp":"cod-confirmation"}`.

### Gates

```
build:netlify   exit 0 — 68 prerendered, 0 failed
seo:audit       ✅ passed (68 prerendered + legal)
check:lp        ✅ landing page check passed
check:blog      ✓ 32 posts, budgets and internal links clean
check:pricing   ✓ catalog drift + llms.txt pricing match the live billing API
seo:contracts   ✅ selftest passed
full-page sweep 142 page-loads (69 URLs × 2 widths + /lp + /404): zero JS errors,
                zero broken images, zero horizontal overflow, exactly one h1 each
parity          sitemap 69 = built pages = llms.txt links; zero broken internal links
```

`sitemap:validate` could not run — it resolves `topedgeai.com`, which this sandbox's egress
proxy blocks (`ENOTFOUND`). Not a code failure; re-run it on a networked machine.

### Still open (unchanged by this batch)

- **Mobile LCP is still above 2.5s** on React routes (`/` 4.5s, `/pricing` 4.5s,
  `/features/cod-confirmation` 4.2s, `/compare/wati` 4.8s, `/blog/cod-rto…` 5.7s, measured at
  390px with 4× CPU throttling and ~1.6 Mbps). The cause is architectural, not asset weight:
  first paint waits on the ~590 KB JS bundle because the prerendered HTML is replaced by the
  SPA render. I tested serving the CSS before the scripts and marking the module preloads
  `fetchpriority="low"` — it moved LCP by ~100–250 ms, i.e. nothing. This needs the
  hydration work (TE-007), not head-tag reordering. CLS is 0.000 everywhere.
- `/contact` is 295 words (thin); `img` without explicit `width`/`height` on 14 pages —
  measured CLS is 0.000, so this is latent rather than active.
- GSC-blocked items (TE-009 reviews, indexation, rankings) are unchanged — see
  `ACCESS-NEEDED.md`.
- `/customers` renders its three proof cards as a fanned deck at 390px, where the side
  cards' text is clipped. Pre-existing and identical before this batch (verified against the
  prior build) — flagging it as a design call, not touched.

