# Response to the Ahrefs Site Audit crawl of 22 Oct 2026

Source: `all findings` export, 19 CSVs, crawled 22 Oct 2026, exported 23 Oct.
226 internal URLs, 76 of them HTML. Reported totals: **45 errors, 81 warnings,
174 notices** — Health Score 80, AI Discoverability 99 (Bot access 100,
Machine readability 89).

Every finding below was reproduced against the repo and against the build
output before anything was changed, and re-checked against a clean
`npm run build:netlify` afterwards. The CSVs are UTF-16LE TSV; the re-check
script compares the new `dist/` against each finding directly.

---

## What the 300 issues actually were

The dashboard's counts resolve to a handful of root causes, not 300 problems.

| Count | Issue | Root cause |
|---|---|---|
| 44 | Image file size too large (**error**) | Product stills shipped at export size |
| 68 | Page has links to redirect | One footer link, on every page |
| 68 | Structured data schema.org validation error | Two properties on one shared JSON-LD node |
| 275 | Links to URLs blocked by robots.txt | `/signup` + `/login` disallowed but linked site-wide |
| 15 | Article page missing Article schema | Compare boards carried `WebPage` only |
| 6 | H1 missing / low word count / no outgoing links | All on `dash.topedgeai.com`, a different codebase |
| 3 | Meta description too long / too short | Three strings |
| 10 | Links to 4xx URLs | Two hosts that 403 crawlers; both resolve 200 in a browser |

---

## Fixed

### Image file size too large — 44 errors, the only error-level issues on the site

Every error-level finding in the crawl was an oversized image. The cause was
not the host: the product stills were being served at their export resolution.
83 referenced files came to **85.2 MB** — 6000×3375 PNGs weighing 2–3 MB each,
rendered by `DemoProductImageFrame` into a 1400×780 frame.

Re-encoded with the longest edge at 1600px:

- **Content stills → WebP.** `DemoProductImageFrame` already documented itself
  as "WebP-only (all evergreen browsers)"; the data simply still pointed at
  PNGs.
- **Stills that double as an `og:image` or sit in JSON-LD → JPEG.** X/Twitter
  and LinkedIn still will not render a WebP share card, so those 16 files are
  JPEG rather than WebP.

83 files, **85.2 MB → 4.6 MB**, largest now 98 KB. 235 references rewritten
across 10 source files; the superseded PNGs are deleted, so `public/` drops
from 191 MB to 111 MB. `scripts/make-mobile-crops.mjs` and
`src/marketing/data/mobileCrops.ts` point at the new sources and the eight 4:3
phone crops were regenerated from them.

The evidence files under `seo-audit/` and the plans under `docs/` quote the old
paths on purpose and were left alone.

### Page has links to redirect — 68 warnings, one link

`https://business.whatsapp.com/products/business-platform` in `MarketingFooter`
301s to `https://whatsappbusiness.com/products/business-platform/`. The footer
is site-wide, so one stale URL spent a redirect hop on all 68 crawlable pages.
Now links the destination, which is the host the repo already cites for
`whatsappbusiness.com/policy/`.

### Structured data schema.org validation error — 68 notices, two properties

`organizationJsonLd()` carried `priceRange` and `openingHoursSpecification`.
schema.org defines both on `LocalBusiness`/`Place`, not on `Organization`, and
that node is emitted on every page — hence exactly one error on each of 68
pages.

Both facts were worth publishing and both were in the wrong place. Rather than
retyping the company as a `LocalBusiness`, which it is not, they moved to
shapes `Organization` accepts:

- `priceRange: '₹1,599-₹6,499 per month'` → `makesOffer.priceSpecification`
  with `minPrice` / `maxPrice` / `priceCurrency` / `valueAddedTaxIncluded`.
- `openingHoursSpecification` → `contactPoint.hoursAvailable`, which is also
  more accurate: they are sales-desk hours, not shop hours.

Validated against the published schema.org vocabulary: **0 problems across 76
pages and 307 JSON-LD blocks**, where the old build had 2 problems on 69 pages.

### Links to URLs blocked by robots.txt — 275

`robots.txt` disallowed `/signup` and `/login`, which the navbar and footer link
from every page. Both shells already serve `noindex, follow`, so the disallow
achieved nothing except stopping crawlers reading that `noindex` — the one
thing that actually removes a URL from an index.

Removed both `Disallow:` lines, for the same reason the file already gives for
not disallowing `/community/*`. `/admin/`, `/private/`, `/api/` and `/dev/`
stay blocked; nothing links to them.

### Article page missing Article schema — 15

The compare boards read as articles to a crawler — dated kicker, standfirst,
900–1,400 words of prose and tables — but carried `WebPage` only.

- New `articleJsonLd()` in `pageSeo.ts`, emitted by `ComparePage` (10 boards)
  and `CompareMultiWayPage` (the 3-way and 4-way boards) — **12 URLs**.
- `/pricing/meta-rates` is a dated explainer of Meta's published rate card, so
  it carries `Article` too — **13 URLs**.
- `/blog` is a listing, not an article: it now carries `Blog` +
  `CollectionPage` with every post as a `BlogPosting`, so an answer engine can
  enumerate the corpus from one fetch instead of a link at a time.

The boards are maintained continuously rather than published once, so
`datePublished` and `dateModified` are both the content date the page already
shows in its kicker. It is the only date about the board that is true.

### Pages carrying no structured data at all

`/privacy` and `/terms` are hand-maintained static HTML in `public/` (served
that way deliberately, for the Meta crawlers) and had no JSON-LD. Both now
carry `Organization` + `WebPage` + `BreadcrumbList`, with the same
`#organization` `@id` the React routes use, which is what makes the two
descriptions one entity rather than two.

### Meta description length — 3

Ahrefs cuts at 160 and 110; the repo's own contract allowed 70–165, so three
strings were inside the repo budget and outside the crawler's.

| Page | Before | After |
|---|---|---|
| `/features/chat-rules` | 162 | 151 |
| `/features/meta-manager` | 162 | 157 |
| `/terms` | 85 | 152 |
| `/privacy` | 108 | 146 |

`DESC_MIN`/`DESC_MAX` moved from 70/165 to **110/160** in both
`seoContracts.ts` and `scripts/seo-contracts.mjs`, so the build now fails on a
description the crawler would flag. `/privacy` at 108 only surfaced because of
that tightening.

### Indexable page not in sitemap — 1

`/pricing/meta-rates` is in `sitemap.xml` and was simply newer than the crawl.
Verified: every indexable page's canonical is in the sitemap and every sitemap
URL is an indexable page, both directions, 71 URLs.

---

## Left alone, deliberately

### `http://www.topedgeai.com/` → 2 hops (1 redirect chain, 2 HTTP→HTTPS notices)

`http://www.` → `https://www.` → `https://topedgeai.com/`. Netlify forces the
HTTPS upgrade at the edge *before* `_redirects` is consulted, so the first hop
cannot be collapsed from this repo. The only way to express it in `_redirects`
would be a scheme-matching rule on the apex, and the file already carries a
warning about exactly that class of rule 301-looping every path onto itself.

Two hops on a host variant nothing links to is not worth risking
`ERR_TOO_MANY_REDIRECTS` on the live apex.

### External 4xx — 10 links, 2 hosts

Both are bot blocks, not dead pages. Verified with a browser User-Agent:

| URL | Ahrefs | Browser UA |
|---|---|---|
| `unicommerce.com/india-d2c-report-2026-april/` | 403 | **200** |
| `trustpilot.com/review/topedgeai.com` | 403 | 403 (blocks datacenter IPs) |

The Unicommerce report is the primary source for every RTO benchmark on the
site and Trustpilot is our own review profile, named in `sameAs`. Removing
either to satisfy a crawler would make the pages worse.

### External 3XX — `interakt.shop/pricing/`

A geo-redirect: `/pricing/` serves India pricing to Indian traffic and 302s US
traffic to `/pricing-us/`. The citations quote the India figures, so linking
the US page would misattribute them. There is no URL that does not redirect for
somebody.

### Article schema on `/pricing`, `/features/*`, `/privacy`, `/terms`

These are long enough to trip a word-count heuristic but they are a pricing
page, product pages and legal pages. They carry the correct types already
(`SoftwareApplication`+`Product`+`Offer`, `SoftwareApplication`, `WebPage`).
Adding `Article` would be incorrect markup, which is worse than a notice.

---

## Not in this repo: `dash.topedgeai.com`

Six of the HTML URLs in the crawl are the dashboard SPA, a different codebase.
Every "H1 missing or empty", "Low word count" and "Page has no outgoing links"
finding is one of them:

| URL | Indexable | Words | H1 |
|---|---|---|---|
| `dash.topedgeai.com/` | **yes** | 6 | none |
| `dash.topedgeai.com/docs` | no | 6 | none |
| `dash.topedgeai.com/signup` | no | 6 | none |
| `dash.topedgeai.com/login` | no | 6 | none |
| `dash.topedgeai.com/deletion-status` | no | 6 | none |
| `dash.topedgeai.com/settings?tab=...` | no | 6 | none |

The marketing site cannot fix these. See **What is left to do** in the handover
note; `seo-audit/DASHBOARD-SUBDOMAIN-SPEC.md` already covers the shape of the
work.

---

## New build guards

Both run in `build:netlify`, `build:firebase` and `build:static`, after
`check-dist`, and are also available standalone.

### `scripts/check-image-weight.mjs` (`npm run check:images`)

Reads the prerendered HTML rather than the source, so it sees what a crawler
fetches: `src`, `srcset`/`imagesrcset`, `og:image`/`twitter:image`, preload
`href`, and `url()` in inline CSS. Fails on any referenced image missing from
`dist/` or heavier than 100 KB.

```
✓ image weight check passed — 133 referenced images, 6.2 MB total, none over 100 KB
```

### `scripts/check-structured-data.mjs` (`npm run check:schema`)

Validates every JSON-LD block in `dist/` against the schema.org vocabulary,
vendored at `scripts/data/schemaorg-vocabulary.json` so the build never depends
on schema.org being reachable. Checks that every `@type` is a defined class and
every property is in the domain of at least one type on its node, walking up
`rdfs:subClassOf`. It does not check Google's rich-result rules — those are
Google's, not schema.org's, and they move.

```
✓ structured data check passed — 307 JSON-LD blocks on 76 pages, every type and property defined by schema.org
```

---

## Verification

Full `npm run build:netlify`, exit 0:

```
✓ catalog drift check passed
✓ llms.txt pricing check passed
✓ blog content check passed — 32 posts
✓ blog source check passed — 32 posts, 14 external hosts
✓ mobile crop check passed — 8 crops present and current
✅ Prerender done: 70 ok, 0 failed
✅ dist check passed — 70 prerendered pages, 404 document and every redirect target present
✓ image weight check passed — 133 referenced images, 6.2 MB total, none over 100 KB
✓ structured data check passed — 307 JSON-LD blocks on 76 pages
✓ llms check passed
```

Plus `npm run seo:contracts`, `npm run seo:audit` (70 prerendered + legal),
`npm run sitemap:validate` (71 URLs, all 200), `npm run check:lp`, and
`npx tsc --noEmit -p tsconfig.app.json` (no new errors; the one pre-existing
`MarketingNavbar` TS6133 is untouched).

Re-check of the new `dist/` against each crawl finding:

| Finding | Was | Now |
|---|---|---|
| Image file size too large | 44 | **0** |
| Image reference missing from dist | — | 0 |
| Image without alt attribute | 0 | 0 |
| Page has no outgoing internal links | 1 + 5 | **0** on topedgeai.com |
| H1 missing or empty | 1 + 5 | **0** on topedgeai.com |
| Low word count | 1 + 5 | **0** on topedgeai.com |
| Meta description too long / too short | 2 / 1 | **0 / 0** |
| Title length outside 15–65 | 0 | 0 |
| Duplicate titles | 0 | 0 |
| Links to a URL known to 301 | 68 | **0** |
| Internal links to robots-blocked URLs | 275 | **0** |
| Indexable page with no JSON-LD | 2 | **0** |
| schema.org validation errors | 68 pages | **0 pages** |
| Indexable page not in sitemap | 1 | 0 |

Deliberately **not** committed, per TE-022: regenerated
`src/marketing/data/generated/contentDates.*`, `public/sitemap.xml`,
`public/llms.txt` and `public/llms-full.txt`. The date generator falls back to
file mtime for a dirty tree, so building against uncommitted edits stamps today
onto pages whose content did not change. CI regenerates all four from commit
dates.
