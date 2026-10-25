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

---

## Batch 9 — real mobile crops, a button that is a button, and a type scale — 2026-10-22

### Crops, generated rather than guessed

Batch 8 cropped the product stills with CSS: a 4:3 frame and `object-fit: cover`, which can
only guess where the content is. `scripts/make-mobile-crops.mjs` now cuts them from the real
image. It finds the white UI panel inside the decorative frame (column and row coverage of
near-white pixels), then takes the left 4:3 of it at full height for a wide dashboard, or the
middle 4:3 for the handful that are illustrations rather than screenshots and have no sidebar
worth keeping. Output is 960px WebP at q82, 23 to 56 KB each.

Eight crops, served below 768px through `<picture>`. `npm run check:crops` fails the build when
one is missing or older than its source, and it runs in all three build scripts, so a replaced
screenshot cannot ship with last month's crop beside it.

One real bug fell out of this. `.demo-video-glow__still` carries `aspect-ratio: 16/9` below
640px, and its `height: 100%` is a percentage of a box whose own height comes from an
aspect-ratio, which the engine treats as indefinite. The declared ratio won, so the image sat
16:9 inside a 4:3 frame with white under it: measured 349x196 in a 349x262 box. That is what
the white band under the P&L still was, not the asset. `aspect-ratio: auto` in the crop block
fixes it, and the image now fills the frame to the pixel.

### The CTA

The home showcase CTA Batch 8 added was a violet text link with an arrow. A text link is a
"learn more"; these are the page's nine chances to send someone into the product. It is a
filled pill now, the same one the hero uses: 3rem tall, violet, shadowed, with the arrow
nudging on hover.

### Type scale and rhythm

Section heads capped at 1.5rem and showcase heads at 1.35rem, which is body copy doing a
heading's job. On a 1440px screen "Automation with store context" was barely larger than the
sentence under it and the page read as one column with no hierarchy. Heads now run to 2.25rem
and showcase titles to 1.85rem, both fluid, with tile titles, step titles and body sizes moved
with them.

Sections sat 2.75rem apart, which is a paragraph break rather than a section break, so a heading
looked attached to the block above it instead of the one it introduces. Now `clamp(3.75rem, 7vw,
6rem)`, and the head's own bottom margin grew with it. Scale and spacing moved together: a
bigger heading in the same gap is just a bigger crowd.

### Gates

70 prerendered, 0 failed · `check:dist`, `check:llms`, `check:crops`, `check:blog`, `check:lp`,
`seo:contracts` all passed · `eslint` 0 errors · `tsc` clean apart from the pre-existing unused
variable in `MarketingNavbar.tsx` · no horizontal scroll on home or a feature page at 390px.

---

## Batch 10 — Ahrefs crawl of 22 Oct 2026, every finding worked — 2026-10-23

Full write-up: `seo-audit/AUDIT-2026-10-22-RESPONSE.md`. Reported 45 errors,
81 warnings, 174 notices; they resolve to eight root causes.

| Finding | Count | Fix |
|---|---|---|
| Image file size too large (**error**) | 44 | 83 stills re-encoded, 85.2 MB → 4.6 MB |
| Page has links to redirect | 68 | One stale footer URL |
| schema.org validation error | 68 | `priceRange` + `openingHoursSpecification` off `Organization` |
| Links to robots-blocked URLs | 275 | `/signup`, `/login` un-disallowed; they already serve `noindex` |
| Article page missing Article schema | 15 | `articleJsonLd()` on 13 URLs, `Blog`+`CollectionPage` on `/blog` |
| Meta description too long / short | 3 | Rewritten; budget tightened to 110–160 |
| Pages with no JSON-LD | 2 | `/privacy`, `/terms` |
| Indexable page not in sitemap | 1 | Already in it; crawl predated the deploy |

Left alone with reasons recorded in the response: the `http://www.` two-hop
(Netlify upgrades HTTPS before `_redirects`), the Unicommerce and Trustpilot
403s (bot blocks; Unicommerce resolves 200 in a browser), the `interakt.shop`
geo-redirect, and Article markup on pricing/feature/legal pages, which would be
wrong.

Not fixable here: six `dash.topedgeai.com` URLs account for every "H1 missing",
"Low word count" and "Page has no outgoing links" finding. Different codebase;
see `DASHBOARD-SUBDOMAIN-SPEC.md`.

### New build guards

- `scripts/check-image-weight.mjs` (`npm run check:images`) — fails on a
  referenced image missing from `dist/` or over 100 KB, read from the
  prerendered HTML so it sees what a crawler sees.
- `scripts/check-structured-data.mjs` (`npm run check:schema`) — validates
  every JSON-LD block against the schema.org vocabulary vendored at
  `scripts/data/schemaorg-vocabulary.json`.

Both wired into `build:netlify` / `build:firebase` / `build:static` after
`check-dist`.

### Gate output

```
$ npm run build:netlify                exit 0, prerender 70 ok / 0 failed
  ✓ image weight check passed — 133 referenced images, 6.2 MB, none over 100 KB
  ✓ structured data check passed — 307 JSON-LD blocks on 76 pages
$ npm run seo:contracts                ✅ passed
$ npm run seo:audit                    ✅ passed (70 prerendered + legal)
$ npm run sitemap:validate             ✅ All clear (71 URLs, all 200)
$ npm run check:lp                     ✅ passed
$ npx tsc --noEmit -p tsconfig.app.json
    no new errors (one pre-existing TS6133 in MarketingNavbar, untouched)
```

Deliberately not committed, as in Batch 1 (TE-022): regenerated
`contentDates.*`, `sitemap.xml`, `llms.txt`, `llms-full.txt`.

---

## Batch 11 — re-baseline, and the diagnosis moves off technical — 2026-10-25

Full write-up: `seo-audit/BASELINE-2026-10-25.md`. No site code changed in this
batch; it is a measurement and strategy pass.

Re-crawled all 71 live sitemap URLs. **Technical is done.** Zero metadata
contract breaches, zero images missing alt, zero pages without JSON-LD, all 71
canonicals self-referencing. Verified Batch 10 is live and correct: `Organization`
carries `@id`, `makesOffer` replaced the invalid `priceRange`, and
`OpeningHoursSpecification` sits correctly under `contactPoint.hoursAvailable`.
Named `Person` authors (TE-008) are live on blog posts.

Two things I had wrong and corrected in the same session:

- I first reported three metadata breaches. My crawler counted raw HTML, where
  `&amp;` is five characters. Decoded they are 64, 58 and 157 against budgets of
  65/65/160 — all pass. Retracted in the baseline and removed from the roadmap.
- I opened by suspecting the SEO work was not deployed, because HEAD is 109
  commits ahead of `origin/main`. It is deployed: live `robots.txt` byte-matches
  the Batch 10 repo file, so Netlify serves `update-pricing`. Worth knowing —
  `main` is not the deploy branch.

The 101 → 71 sitemap drop is the 9 Oct docs migration, not a loss.
`/docs/*` 301s to `dash.topedgeai.com/docs/:splat` keeping the slug, and the
destination is indexable: 200, `index,follow`, one H1, 885 words, two JSON-LD
blocks, own `docs-sitemap.xml`. Legacy URLs all handled —
`/community/promote-profile` returns **410** plus `noindex,nofollow`, which is
the right signal, and `/solutions`, `/solutions/agencies` 301.

**The finding that matters.** The commercial pages are the thinnest pages on the
site and the blog is the thickest. `/compare/alternatives` 446 words,
`/compare` 471, `/shopify-whatsapp-integration` 474, `/integrations` 541, home
628, all 14 `/features/*` between 593 and 697 — against a site median of 991 and
a WhatsApp-pricing post at 3,504 words with 86 rupee figures. Every money page is
below the median; every one carries zero or near-zero rupee figures. The
19 Oct "accurate, honest and unquotable" diagnosis is now fixed on the blog and
untouched on the pages that have to convert.

Citations did improve: 22 unique external hosts across 71 pages, against TE-014's
12 across 101. Strip the seven sitewide footer/social links and the real
editorial set is `developers.facebook.com` (23 pages), `help.shopify.com` (8),
`unicommerce.com` (7), `shipping.amazon.in` (6), then Trustpilot, AiSensy,
Interakt, Updatrr, Baymard, Zoko, Dondy, shopify.dev. Only 1 of 71 pages has no
external citation.

**Authority is unchanged and it is the bottleneck.** `apps.shopify.com/topedge-ai`
verified today at **0.0, 0 reviews**, 18 days after TE-009. Meanwhile `/customers`
says 4.0 from 5 Trustpilot reviews, and three merchants are named on the site with
live stores linked sitewide — Delitech Smart Home (Ved Patel), Apex Light, First
Resort. Five public reviews exist on the platform that does not rank and none on
the one that does. Drafts prepared, unsent, in
`seo-audit/outreach/shopify-review-requests-2026-10-25.md`.

**Competitor footprint, captured today** (`COMPETITOR_MATRIX.csv`): DelightChat
7,150 URLs, Zoko 1,501, Wati 1,437, Interakt 1,053, AiSensy 718, LimeChat 270,
Gallabox 183, TopEdge 71, DoubleTick 62. respond.io's 14,053 is eight locales of
the same ~1,081 pages. Bitespeed and Gupshup publish no discoverable sitemap.

I sampled pages rather than trusting counts, which cut both ways. AiSensy's 74
`/whatsapp-chatbot-template/*` pages are 1,863–2,130 words with real
per-template substance — that is the pattern to copy, and Meta-approved templates
are something we actually ship. DelightChat's 4,936 `/apps/*` pages are 523–526
words with H1 = app name and one H2 = developer name, which is the thin
programmatic content the brief forbids; it inflates their count by 69%. Wati's
111 `/whatsapp-template` URLs are mostly consolidated — two different slugs serve
the same 4,744-word page with an identical title and H1. And every competitor has
case studies as their own URLs (Interakt 71, AiSensy 65, Gallabox 62, LimeChat 47,
DoubleTick 34, Zoko 21); we have zero.

Still blocked, and I produced no numbers for any of it: Search Console (so no
impressions, clicks, CTR, position or coverage), Google ranks (CAPTCHA retried
today), and any backlink data at all — no Ahrefs, no Semrush units, no GSC Links
report, so there is no backlink audit table in this batch by design. Bing's
`site:` count came back as "39 results" through the in-app browser, which is
Bing's own approximate figure, not a census. `ACCESS-NEEDED.md` now carries a
dated status table and the one-command GSC path via `scripts/gsc-auth.mjs`.

### New artifacts

`BASELINE-2026-10-25.md` · `SITE_URL_INVENTORY.csv` (71 rows, 15 columns) ·
`COMPETITOR_MATRIX.csv` · `CONTENT_ROADMAP.csv` (12 rows, 3 marked BLOCKED) ·
`outreach/shopify-review-requests-2026-10-25.md`

### Gates

None run — no source file changed in this batch.

---

## Batch 12 — a block model for commercial pages, and the first two rebuilt — 2026-10-25

Plan: `seo-audit/PLAN-2026-10-25-ORGANIC-FIRST.md`. Google Ads is paused and the
next channel is Meta ads plus influencer reels after Diwali, so organic is the
only acquisition channel right now and the money pages carry the whole load.

### The actual root cause of the thin money pages

Not thin copy. A thin type. `SeoTopic` accepted `answerFirst`, `sections` of
`{ h2, body }`, `bullets` and `faqs`, and nothing else. A `section` is one
heading and one paragraph, so the page could not render a table, a step, a
figure or a callout even if someone wrote one. Adding words to that shape builds
a longer wall. `/compare/alternatives` had the mirror problem:
`AlternativeEntry` carried `{ name, logo, oneLiner }`, so the page could only
ever be a logo directory.

### New: structured content blocks

`src/marketing/components/topic/TopicBlocks.tsx` and
`src/marketing/styles/topic-blocks.css`. Six block kinds, each chosen because it
makes content scannable, keyword-dense and quotable at once: `specTable`,
`steps`, `figures`, `checklist`, `callout`, `prose`, plus a table of contents
derived from the block headings. `SeoTopic.blocks` is optional, so the two
topics still on `sections` render exactly as before.

Built entirely from the tokens already in `marketing.css`. No new colours, radii
or fonts. A `figures` block cannot display a number that is not registered in
`src/data/sources.ts`; it renders the publisher and the date a human read the
claim beside the value, which is the citability fix `SERP-RECON-2026-10-19`
asked for.

**Mobile is the point, not a courtesy.** Reel traffic is phone traffic. Below
768px every table drops its head row and restacks each row into a card with the
column name printed above each value, from a `data-col` attribute. Verified at
375px: no horizontal overflow, `scrollWidth` 375 against a 375 viewport.

### `/shopify-whatsapp-integration`: 474 to 2,270 words

The page with the best demand evidence we have. Now carries what it connects,
what syncs from Shopify as a three-column table, a five-step connection
sequence with honest waiting times, Meta's India rate card as cited figures, the
COD case, a do/avoid checklist, a template-approval warning, and a
native-vs-glue-code comparison. FAQ went from 2 to 8. Ten ₹ figures where there
were none.

Citations went from the seven sitewide footer links to those plus
`developers.facebook.com`, `baymard.com`, `unicommerce.com` and
`shipping.amazon.in`.

Two real bugs fell out, both caught by looking rather than by a gate:

- The mobile table rendered its column names as a card at the top of every
  table. `.mkt-spec__row--head { display: none }` sat *before*
  `.mkt-spec__row { display: block }` in the same media query, and both
  selectors are one class, so source order decided and `block` won.
- The page shipped two `related` links both pointing at `/integrations`, which
  React reported as a duplicate key and a reader would have seen as two links to
  the same place. Replaced with eight distinct destinations. While fixing it I
  also caught `/meta-rates` in two of my own new links; the route is
  `/pricing/meta-rates`, so both would have 404'd.

### `/compare/alternatives`: 446 to 1,096 words

A logo directory became a decision table across eleven platforms: entry price as
published, what each adds on top of Meta's fees, and what it bills in. **Every
cell is condensed from the `subscription` and markup rows already researched per
competitor in `compareFeatureMatrix.ts`,** so the table makes no claim the child
board does not already carry and date. No new vendor research, no new numbers.

The currency column is the part that earns its place: four of the ten bill an
Indian merchant in USD or EUR, so the real monthly cost moves with the exchange
rate. Nobody puts that in a pricing table.

Then four questions that catch most of the difference between these platforms:
the markup, the currency, the onboarding minimum, and whether the tool can read
a Shopify order at all. The table reuses `.mkt-spec` rather than growing a
second table implementation.

### Deliberately not done

No programmatic page farm. DelightChat's 4,936 `/apps/*` pages run 523 to 526
words with H1 = app name and one H2 = developer name. `/lp/*` untouched: they
are `noindex` and were written for a channel that is now off.

### Gate output

```
$ CI=1 npm run build:static        exit 0, prerender 70 ok / 0 failed
  ✓ catalog drift, llms pricing, blog links, blog sources (0 em dashes)
  ✓ image weight — 133 images, 6.2 MB, none over 100 KB
  ✓ structured data — 307 JSON-LD blocks on 76 pages
  ✓ llms check — every URL canonical, every ₹ figure from the catalog
$ npm run seo:contracts            ✅ passed
$ npm run seo:audit                ✅ passed (70 prerendered + legal)
$ npm run check:lp                 ✅ passed
$ npx eslint <changed files>       0 errors, 0 warnings
$ npx tsc --noEmit                 no new errors (pre-existing TS6133 in
                                   MarketingNavbar, untouched)
```

`check:crops` reports 5 stale crops locally and did so before this batch too:
it compares mtimes, the crops and their sources all carry 2026-10-23 15:22, and
the check only requires existence when `CI` or `NETLIFY` is set. Netlify sets
`NETLIFY`, so the deploy passes. No image was touched in this batch.

Not committed, as in earlier batches: regenerated `contentDates.*`,
`sitemap.xml`, `llms.txt`, `llms-full.txt`.

---

## Batch 13 — buttons, the mobile menu, and a blog template worth reading — 2026-10-25

Four jobs from the owner, all verified in a browser at 375px and at desktop width.

### Arrows off every button

Buttons carry their label only now. The trailing chevron was decoration on a
pill that already reads as a button, and on a narrow phone it pushed the label
off centre. Removed from 13 call sites: the CTA band (both buttons), the home
hero, the nine home showcase CTAs in `HomeStickyStories`, the navbar on desktop
and in the mobile sheet, About, the blog CTA, the convert prompt, the compare
duel CTA, and the feature, product, integrations, features-index and COD pages.
Ten now-unused `ArrowRight` imports went with them.

**Arrows stay on card and list affordances** (`mkt-cmp-alt__cta`,
`mkt-int-card__link`, `mkt-int-guide__arrow`, `mkt-cmpx-feat__cta`), where the
arrow is the only signal the row is clickable. Verified in `dist`: zero
`.mkt-btn-primary` or `.mkt-btn-ghost` anywhere on the site still contains an
`<svg>`.

### Smaller buttons on phones

`html .mkt-btn-primary` set `min-height: 3rem` with `1.6rem` of side padding and
the `html` prefix beat every per-section override in `home.css`, so the hero CTA
was a desktop button on a 375px screen. A `max-width: 640px` block at the same
specificity takes it to `2.6rem` with `1.25rem` padding and a `0.875rem` label.
Measured on the phone viewport: navbar 40px, hero 38px, showcase CTAs 42px, all
above the 40px comfortable tap target or within a pixel of it, and no horizontal
overflow.

### The mobile menu now opens all the way

The sheet is `position: fixed; inset: 0`, so it starts at the top of the
viewport. A later rule set `max-height: calc(100dvh - var(--mkt-ann-h))` to
account for the announcement strip, but subtracting the strip's height without
also offsetting `top` **shortened the wrong end**: the sheet ran 0 to 752px in
an 812px viewport, leaving a 60px band at the bottom where the page showed
through under the Log in / Start free row, while the strip stayed covered at the
top anyway. Measured before the fix: `top 0, bottom 752, gapAtBottom 60`.

The sheet carries its own bar with the wordmark and a close button, so it covers
the strip and runs `top: 0; height: 100dvh`. Measured after: `top 0, bottom 812,
gap 0`, with the CTA row fully on screen and the Product list scrolling inside
the full height.

### The blog, rebuilt around the structure a long post needs

Reference: `wati.io/en/blog`, which opens with a short summary, carries a
contents list, and puts images between sections. Ours had none of the three. The
measure was already right at about 68 characters a line, so nothing here widens
the text; what was missing was structure.

**Contents list, on all 32 posts.** 164 of the 181 H2s across the posts had no
`id`, so there was nothing to link to. `addHeadingIds` now slugs every H2 and H3
during the same enhancement pass that builds the tables, keeping hand-written
ids where they exist, and `extractToc` reads the list back off the enhanced
HTML so the links and the ids cannot drift. On desktop the list sticks in the
right-hand column, which a single centred prose column had been leaving empty;
on mobile it stacks.

**"Read this first", on the 20 posts that lacked one.** Twelve posts already
ship an inline verdict box, so they were left alone and no post now carries
both. Every line of the 20 new summaries is drawn from that post's own figures.

**Images between sections, on six posts.** Posts shipped with **zero** body
images, which is the main reason a 3,500-word post read as a wall.
`inlineImages` places a figure after a named heading, inserted into the HTML
during enhancement rather than after mount, so the crawler sees it and the
reserved dimensions stop it shifting the paragraph below. Only real product
assets, each one opened and described before its alt text was written, each
captioned "Sample preview" because they are illustrative compositions and not
merchant data.

Two bugs caught by checking rather than by a gate:

- On mobile the contents list rendered **above** the summary, because DOM order
  is mobile order and I had put the list first. A reader on a phone met eleven
  links before the three lines that answer the question. Summary, contents and
  article are now siblings in that order, and the desktop grid moves the
  contents to column two across both rows.
- `cod-rto-benchmark-india-2026` and `organic-vs-paid-ecommerce-marketing-2026`
  ship their own hand-written "Table of contents" using the same class, so they
  briefly rendered two. Guarded with the same content test the FAQ block uses.
  Verified: all 32 posts carry exactly one.

### SEO sweep, all 75 built pages

Checked title length, description length, H1 count, H2 presence, canonical,
`og:image` and JSON-LD on every page in `dist`. **Four pages carry an issue and
all four are deliberately `noindex`**: `/dev`, `/login` and `/signup` are app
shells, and `/lp/shopify-whatsapp` is an ad landing page. Every one of the 71
indexable pages passes all seven checks. Blog schema intact: all 32 posts carry
`BlogPosting`, a `Person` author and `BreadcrumbList`.

### Gate output

```
$ CI=1 npm run build:static      exit 0, prerender 70 ok / 0 failed
  ✓ catalog drift · llms pricing · blog links · blog sources (0 em dashes)
  ✓ image weight — 133 referenced images, 6.2 MB, none over 100 KB
  ✓ structured data — 307 JSON-LD blocks on 76 pages
$ npm run seo:contracts          ✅ passed
$ npm run seo:audit              ✅ passed (70 prerendered + legal)
$ npm run check:lp               ✅ passed
$ npm run sitemap:validate       ✅ All clear
$ npx eslint src                 0 errors (5 pre-existing warnings)
$ npx tsc --noEmit               no new errors (pre-existing TS6133 in
                                 MarketingNavbar, untouched)
```

Added `.claude/launch.json` so the dev server can be driven for visual checks.
Not committed, as in earlier batches: regenerated `contentDates.*`,
`sitemap.xml`, `llms.txt`, `llms-full.txt`.
