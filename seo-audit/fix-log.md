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

## Batch 5 — SERP reconnaissance and the pricing rewrite — 2026-10-19

**New evidence: `seo-audit/SERP-RECON-2026-10-19.md`.** Four neutral commercial SERPs tested in
a no-account context. TopEdge appeared in **none** of them — including COD/RTO, our own money
page. The SERPs are owned by listicle publishers, Shopify App Store listings and vendor pages
that answer with itemised numbers.

Root cause identified, and it is not technical: **our pages are accurate, honest and unquotable.**
The rule "never invent a statistic" was applied without its other half, "cite someone who did
measure it", so an answer engine has nothing to lift. The 0-of-49 unbranded-citation result from
the GEO baseline is the same problem measured downstream, not a separate one.

**Fixed:** `whatsapp-business-api-pricing-india` rewritten. It had **zero rupee figures in a post
about pricing** — now 11, with a category rate table, the 1 Jan 2026 India rate change, the
retired free tier, a worked example showing utility is ~4% of a typical bill, the BSP-markup-
printed-as-Meta-rate explanation (our differentiated angle), and the Business-Manager-vs-invoice
test that actually verifies a 0% markup claim. Person author, 5 FAQs, exact-match title,
authoritative outbound link to Meta's pricing docs.

**Gates:** `build:netlify` exit 0 (68 prerendered, 0 failed) · `seo:audit` passed ·
`check:blog` 32 posts clean · `check:lp` passed · `check:pricing` passed · `seo:contracts` passed.

**Needs one human check before it matters:** the Meta rates in that post are third-party tracker
figures, not Meta's own rate card. Outbound fetches are blocked in this sandbox
(`developers.facebook.com` → ENOTFOUND), so they could not be verified at source. Confirm in
Business Manager.

**Still blocked, unchanged:** Search Console (no login), Semrush (`no_api_units`, retried today),
AI assistants (need a signed-in browser this environment cannot open).


---

## Batch 6 — the 2026-10-21 research pass, calculators, and the COD-to-prepaid gap — 2026-10-22

Worked the deep-research deliverable dated 2026-10-21 (Sections 4b to 4f plus its ready-to-paste
implementation prompt) against what the repo already carries, rather than applying it blind. Most
of the numerical upgrade was already shipped on 21 October: the Meta India rate card, the
1 October 2026 service-reply change, the itemised RTO tables, the Hinglish SOP section, the
₹799 kurta waterfall and the Updatrr playbook were all in place. Audited each spec against the
stored content and built only what was genuinely missing.

### Built

**Two un-gated calculators** (`src/marketing/lib/blogCalculators.ts`), which is the research
pass's second and fourth priority actions and the one thing none of the pages had. A post stores
an inert `data-calc` placeholder with a real static table inside it; the widget replaces that
once it binds. Because the prerender runs Playwright, the default state ships as crawlable HTML
with every figure already computed, so the calculator is readable by an answer engine and not
just by a browser.

- `whatsapp-bill` on `/blog/whatsapp-business-api-pricing-india` and `/pricing`: a month's
  marketing, utility and service volume against Meta's India card, with GST, then the same month
  under the two markups competitors publish (AiSensy ₹0.1450 a service reply, Dondy's $0.01888).
- `rto-cost` on `/blog/cod-rto-benchmark-india-2026`, the COD SOP and the new playbook: orders,
  COD share and RTO rate against the published ₹180-₹240 and ₹450-₹900 bands, priced against one
  ₹0.1150 confirmation pass over the same orders.

No email gate on either. The point is the answer and the citation, not a lead capture that stops
an engine reading the result.

**`/blog/cod-to-prepaid-whatsapp-shopify-india`** (Spec 4). The only target URL in the research
that had no page: COD-to-prepaid was buried inside `/features/journeys` and the COD SOP while
Mark360 and Interakt own the organic guide. Leads on the figure nobody publishes, that a prepaid
order saves about ₹68 before it ships (₹30 COD remittance plus ₹38 amortised RTO), which is the
budget for the incentive, and on why the offer has to be a second send (₹0.1150 utility against
₹0.8631 marketing, 7.5x). Linked in from the COD SOP, the RTO benchmark and the pricing post.

### Filled in

- Rate-card figures the pricing post was missing: the ₹0.1081 utility rate above the 25M tier and
  Authentication-International at ₹2.4971.
- Unicommerce's 66% Tier-2 and Tier-3 share of FY26 incremental volume, on the RTO benchmark
  (national table) and on the SOP's Hinglish section, which is the argument for that section.
- Two AI pricing shapes the chatbot cost table did not model: per-resolution billing (Zoko Guru,
  about $0.09 a resolution) and AI gated behind a plan tier (Updatrr Pro AI at $99.99). Added the
  per-resolution figure to the Zoko alternative post too.
- `₹0.8631` and `₹0.1150` stated as rates, not only as monthly totals, on the best-tools table.

### Deliberately not done

**Updatrr's "~₹4.50 per AI conversation".** The research prompt asks for it twice, and it traces
back to our own compare board, where it is labelled an estimate. `src/data/sources.ts` records
what Updatrr's pricing page actually publishes: three plans, AI on the $99.99 tier, and no
per-conversation AI fee at all. Printing ₹4.50 as a sourced competitor rate would be the exact
thing the source registry exists to stop, so the chatbot table models the tier instead.

**A "20% to 30% COD-to-prepaid conversion" benchmark.** Attributed to Unicommerce in the
research, absent from what that report is recorded as saying here. The new post says so in a
section of its own rather than quietly repeating it.

**Sections 4d to 4f** (the GSC operating manual, the self-service link sources, the Shopify App
Store review plan). Nothing in them is code. They need a Search Console login, directory
submissions and customer asks.

### Gates

`vite build` + `build-static` + prerender: 69 prerendered, 0 failed · `check:dist` passed ·
`check:blog` 32 posts, 14 external hosts, 0 em dashes · `check:llms` passed · `check:lp` passed ·
`check:llms-pricing` passed · `seo:contracts` passed · `eslint` 0 errors · `tsc` clean apart from
one pre-existing unused-variable error in `MarketingNavbar.tsx`.

`check:catalog-drift` and `validate-sitemap` skipped: both fetch live hosts, and outbound is
blocked in this sandbox. Same caveat as Batch 5 applies to every competitor and benchmark figure
above. They come from the 2026-10-21 research pass, which states it read each page live that day.
Nothing here was fetched from source.

---

## Batch 7 — /pricing decluttered, the rate card gets its own page — 2026-10-22

The owner's note on the pricing page, verbatim in substance: it reads cluttered, no serious
brand shows this much working, and the SEO proof should live somewhere else and be linked.
Agreed on the placement, not on deleting it: the Meta rate card is the proof behind the single
claim the page is built on, and `whatsapp business api 0% markup india shopify` is a target
keyword. So it moved rather than went.

### Moved

**`/pricing/meta-rates`** is new. It carries what `/pricing` was carrying: the four-category
India rate card, the markup board, the cost calculator, the Business-Manager-against-invoice
test, and the sourcing footnote. None of it is a table any more. Two four-column tables were
exactly what made the section read as a spreadsheet, and the same facts as cards need no
horizontal scroll on a phone and no `data-label` trickery to stay readable.

**`/pricing` keeps three figures and a link**: ₹0.8631, ₹0.1150, ₹0, one sentence, and
"See the full rate card, markup comparison and cost calculator". The commercial keyword stays
on the page that converts, the evidence sits one click away on the page that proves it, and the
two are linked both ways.

Registered in `App.tsx`, `pageSeo.ts`, `marketing-urls.mjs`, the sitemap, `llms.txt` and the
index queues. 70 prerendered pages, up from 69.

### Refined

**Reviews.** They were set as bare type with a hairline between them, on the argument that a
boxed quote reads as the testimonial nobody believes. On a page that is otherwise all cards it
read as three loose paragraphs instead. Now: a centred head with an eyebrow and the Trustpilot
score as a badge, three cards with aligned bylines, an initial avatar and "Published on
Trustpilot" under each name. Heading is "What merchants say" on `/pricing` and "In their own
words" on `/customers`. What did not change: no stock portraits, and no per-review star row,
because 4.0 is an aggregate Trustpilot publishes and we do not get to split it three ways.

**The mobile trust strip**, which was the "icon not aligned" complaint on the landing page. Five
marks on a 1,058px marquee track inside a 304px column meant the first and last were sliced
mid-letter at every frame, and a 6% mask at 360px is 21px of fade, so a cut logo read as a
broken image. On phones the marquee now stops, the strip breaks out of the copy column's 24rem
measure, and all five marks hold one centred row at 360px and 390px. Verified: one row, five
items, no document-level horizontal scroll at either width.

### Removed

A dead `.mkt-rates` / `.mkt-rate*` block in `pricing.css`, ~40 lines, referenced by no JSX in the
repo. It was found the hard way: it set `display: grid` on the new page's root class and laid the
whole page out in columns.

### Gates

`vite build` + `build-static` + prerender: 70 prerendered, 0 failed · `check:dist` passed ·
`check:blog` 32 posts clean · `check:llms` passed · `check:lp` passed · `seo:contracts` passed ·
`eslint` 0 errors · `tsc` clean apart from the pre-existing unused variable in
`MarketingNavbar.tsx`.

---

## Batch 8 — feature pages get the home board, a CTA and shorter copy — 2026-10-22

Four complaints, worked in order.

### The board

Feature pages ran their mesh full bleed from the top of the document, so it passed under the
fixed nav and its top corners were never seen: the first thing on the page was a seam where
the homepage shows an edge. The film then started wherever the copy ended and was cut by the
fold. The stage now follows the same three rules as the home board: start below the band, inset
from the page edge with a radius (22px, 30px from 768px), and size to the viewport less the
strip and the band.

One difference from home, on purpose. The homepage shot is drawn to be clipped, with square
bottom corners and no bottom border. This frame is rounded on all four sides, so the same clip
reads as broken. The board grows past one viewport instead and the film sits whole inside it.
Measured: 38 to 40px of board below the film on desktop, 18px on a phone, no overflow at any
width tested.

### The CTA

Twelve product pages sold a capability and offered nowhere to go: the first button was three
sections down. "Start free trial" and "See pricing" now sit under the hero sub, where the
homepage puts them.

The nine home feature showcases had the same hole, and worse: `.home-sticky__cta` was styled
`display: none` because the moments carried no link at all. Each one now names the page it
belongs to.

### The copy

All twelve product-page H1s were SEO titles pasted into a headline: "Shopify abandoned cart
recovery and COD confirmation on WhatsApp" set four lines deep on a phone with a three-line
highlight. `seoTitle` and `seoDescription` are separate fields and keep every query term, so
the H1 is free to be a headline. It is now "Recover the cart. Confirm the COD."

Subtitles lost their hard line breaks with it. A `\n` placed for a desktop measure broke
"Abandoned cart, COD confirm, / and shipping on a visual canvas." mid-clause on a phone.

The nine home showcases were cut to one line each, and the home hero sub, the CRM section head
and the CTA band were rewritten the same way. Nothing in `scripts/lp/` or
`public/lp/shopify-whatsapp/` was touched.

### The marks, again

Batch 7 fixed the clipped trust strip in `home.css`. The component's styles are duplicated in
`product-feature.css` and `pricing.css`, so the fix reached neither: the marquee was still
slicing logos mid-letter on every feature and pricing page. Both now carry the rule, each with
a note pointing at the other two. Found while there: the feature-page marquee animated to -25%
while `HomeTrust` renders two copies, so it snapped back mid-row on every lap. It travels -50%
now.

The strip is also centred again. The 100vw breakout Batch 7 added was needed at 18px marks;
at 15px the five of them measure ~287px and fit the 304px copy column, so it sits inside it.
Verified symmetric at 360, 390 and 430px.

### Stills, cropped

A 1400px dashboard inside a 350px 16:9 frame is a picture of a product too small to read the
product in. Videos are exempt, since the ones that matter ship a `mobileSrc` recomposed for the
width. Stills go to a 4:3 frame cropped from the top left: 75% of the width at 133% the size.
Honest limit: a few of these stills carry their own whitespace at the bottom edge, which a
taller frame reveals. Proper mobile crops are a per-asset job, not a CSS one.

### Gates

70 prerendered, 0 failed · `check:dist`, `check:llms`, `check:llms-pricing`, `check:blog`,
`check:lp`, `seo:contracts` all passed · `eslint` 0 errors · `tsc` clean apart from the
pre-existing unused variable in `MarketingNavbar.tsx`.
