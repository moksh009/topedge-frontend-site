# Search Console "Page indexing" remediation — 2026-10-29

Every row in the Page indexing report as of 2026-10-29, the root cause, what
changed, and what to do in Search Console. Live verification was not possible
from the session that wrote this (egress to topedgeai.com was blocked), so every
claim below is evidenced from the repo and from a full `npm run build:static`
whose `dist/` was inspected directly. Re-run the live smoke in
`measurement.md` after deploy before pressing **Validate Fix**.

**Headline:** of the 23 affected URLs, 4 needed code changes. The other 19 are
either correct-by-design (host canonicalisation, deliberate 301s, a noindex app
shell) or stale verdicts Google formed before the page existed in its current
form. The work was to fix the 4, and to make the other 19 impossible to
re-introduce by hand.

---

## 1. Alternative page with proper canonical tag (2) — no code change

| URL | Verdict |
| --- | --- |
| `https://dash.topedgeai.com/login` | Not this repo |
| `https://topedgeai.com/features/ai-brain/` | Correct already |

`/features/ai-brain/` is the trailing-slash form of a real page. Netlify serves
flat `.html` (`dist/features/ai-brain.html`), so the slashed URL returns 200 and
carries the slashless canonical. Verified in the build:

```
features/ai-brain.html:  rel="canonical" href="https://topedgeai.com/features/ai-brain"
```

"Alternative page with proper canonical tag" is Google reporting that it found
the canonical and honoured it. That is the intended end state, not a defect.

`dash.topedgeai.com/login` belongs to the dashboard app. Nothing in this repo
controls its head. If it should drop out of the report entirely, the dashboard
must serve `noindex` on `/login`; this site already serves its own `/login` as a
`noindex, follow` shell (see `build-static.js`).

### Why there is no trailing-slash 301, and do not add one

The obvious fix — `/features/ai-brain/ → /features/ai-brain 301` — is banned, and
`scripts/generate-redirects.mjs` fails the build if the shape is written in any
spelling. It was tried on 2026-10-08 and took the marketing site down with
`ERR_TOO_MANY_REDIRECTS`. Netlify's Pretty URLs 301s the slashless form *back* to
the slashed one, so the rule is one half of a loop that is not visible in
`_redirects`. The outage hit leaf URLs (`/blog/*`) as well as hubs, so "only
redirect the leaves" is not a way around it either.

The canonical tag is therefore the whole defence, and it is correct on all 90
prerendered pages (`scripts/seo-head-audit.mjs` fails the build otherwise).
Re-opening this needs Pretty URLs switched off on the Netlify site first, then
`curl -sI https://topedgeai.com/compare` showing `200` and not a `301` to
`/compare/`.

**Search Console:** mark as fixed / ignore. No validation needed for a row that
says the canonical works.

---

## 2. Excluded by 'noindex' (1) — already resolved upstream

`https://topedgeai.com/docs/platform/conversation-pricing`, last crawled
2026-10-10.

The marketing copy of the docs was removed on 2026-10-09 because the same pages
were served from both `topedgeai.com/docs` and `dash.topedgeai.com/docs`. Google
crawled this URL during that changeover and saw the noindex it was serving on the
way out. Since then `_redirects` has:

```
/docs/*  https://dash.topedgeai.com/docs/:splat  301!
```

so the URL now 301s and will be re-classified as "Page with redirect" on the next
crawl. **Validate Fix** — the redirect is the fix and it is already live.

---

## 3. Page with redirect (11) — 1 fixed, 10 correct by design

`/services` was the only row here that was wrong.

### `/services` — fixed

It 301'd to `/features`, which left the
`whatsapp automation services india` / `whatsapp api service provider` query
family with no landing page while the URL sat in this report. It is now a real
page:

- `src/marketing/pages/ServicesPage.tsx`, content in `src/marketing/data/services.ts`
- route in `src/App.tsx`, metadata in `PAGE_SEO.services`
- prerendered to `dist/services.html`, in `sitemap.xml` (91 URLs) and `llms.txt`
- site-wide footer link in the Company column
- `WebPage` + `BreadcrumbList` + `ItemList` + `FAQPage` JSON-LD
- the `/services → /features 301!` line is gone from `public/_redirects`

It is deliberately organised by **outcome**, while `/features` is organised by
**capability**, so the two do not compete for the same queries. Everything it
claims is already true elsewhere in the repo — it describes shipped product and
guided onboarding, not an agency retainer, managed tier or SLA. Do not add a
service line that no feature page backs.

### The other 10 — leave them

| URL | Target | Why it stays |
| --- | --- | --- |
| `http://www.topedgeai.com/` | apex | Host canonicalisation |
| `https://www.topedgeai.com/` | apex | Host canonicalisation |
| `http://topedgeai.com/` | HTTPS | Scheme canonicalisation |
| `/security` | `/features` | No separate security page exists |
| `/solutions/beauty` | `/features` | Retired vertical landing pages |
| `/testimonials` | `/customers` | Consolidated |
| `/privacy-policy` | `/privacy` | Consolidated |
| `/compare/topedge-vs-wati-vs-aisensy` | — | **Stale.** A real 200 page since; it is in `COMPARE_MULTIWAY_SLUGS` and the sitemap |
| `/blog/ai-whatsapp-chatbot-for-shopify-india` | — | **Stale.** A real 200 page and the target of several consolidations |

Four of these are the http/www variants, which every site reports and no site can
remove. The two marked stale are live 200 pages whose last crawl predates their
current form.

"Page with redirect" on a URL you intend to redirect is Google confirming the 301
was read. **Validate Fix** and expect the nine genuine redirects to keep
appearing — that is correct.

---

## 4. Blocked due to access forbidden (403) (1) — not fixable from this repo

`https://api.topedgeai.com/`, last crawled 2026-08-05.

The API host returns 403 at its root, which is right for an API and wrong only in
that Googlebot is asking. Nothing on this site links to the API root — the only
`api.topedgeai.com` references are deep endpoints Meta and Shopify require to be
reachable (`/api/meta/data-deletion`, `/api/shopify/compliance`) and the billing
catalog the build reads server-side. Verified: no `href` to the bare host exists
in `src/`, `index.html` or `public/*.html`.

**The fix belongs on the API host, not here.** Serve a `robots.txt` from
`api.topedgeai.com` with:

```
User-agent: *
Disallow: /
```

A 403 root with no robots.txt is what keeps the URL in the report; an explicit
`Disallow` moves it to "Excluded by robots.txt", which is the correct resting
state for an API host. Adding `Disallow: /api/` to *this* site's robots.txt does
nothing for it — that rule governs `topedgeai.com/api/`, a different origin.

**Search Console:** cannot be validated from this property until the API host
serves robots.txt.

---

## 5. Duplicate without user-selected canonical (1) — stale verdict

`https://topedgeai.com/features/campaigns/`, last crawled 2026-09-20.

The same trailing-slash form as §1, but Google recorded it as having *no*
canonical rather than a proper one. The page does emit one, verified in the build:

```
features/campaigns.html:  rel="canonical" href="https://topedgeai.com/features/campaigns"
```

Both flagged URLs resolve to the same file and the same correct canonical, so the
difference between the two verdicts is crawl date, not page behaviour. The signal
Google needs is present.

**Validate Fix.** It should settle as "Alternative page with proper canonical
tag" like `/features/ai-brain/`.

---

## 6. Crawled – currently not indexed (7) — 2 fixed, 5 need no code

### Fixed: two retired posts with no redirect rule

These had no entry in `_redirects` at all, so they fell through to the
`/*  /404.html  404` catch-all. Retired content that 404s with inbound links
throws that equity away; the repo's established pattern is a 301 to the closest
live page, which they now have:

```
/blog/ai-voice-agents-vs-human-receptionists-medical-roi-2025  /features/ai-brain  301!
/blog/ai-automation-revolutionizing-business-operations-2025   /blog/how-to-automate-ecommerce-store-india  301!
```

(plus the trailing-slash form of each, as an explicit per-URL rule — which is
allowed; what is banned is a rule whose target is its own source minus the slash.)

### Already handled: three stale rows

| URL | State |
| --- | --- |
| `/features/instagram` | 301s to `/integrations` since 2026-10-09 |
| `/blog/topedge-ai-banking-solutions-automation-security-2024` | 301s to `/blog` |
| `/blog/evolution-of-ai-business-communication` | 301s to `/blog/ai-whatsapp-chatbot-for-shopify-india` |

### No defect: two live pages

**`/blog/profitable-ecommerce-business-india`** — published 2026-10-21, crawled
2026-10-24. Three days. "Crawled – currently not indexed" on a post that recent
is ordinary latency, and it already carries ~10 contextual inbound links from
other posts. Nothing to fix; it needs time, not links.

**`/features/warranty`** — this one is worth understanding properly, because the
intuitive fix is the wrong one. It is **not** under-linked: it is in the navbar
*and* the site-wide footer, plus `home.ts`, `JourneyExamplesIndexPage` and a blog
body. More internal links will not move it.

What it actually is: the thinnest page (6,248 chars of page data) in a cluster of
twelve structurally near-identical feature pages spanning 6,248–10,342. Google
indexed the other eleven and judged this one the least worth storing. The lever
is unique substance and a distinct query target on the page itself — warranty
registration, claims queue, assignment — not more links into it. The new
`/services` page gives it one contextual link from a fresh hub
(`#post-purchase`), which helps crawl priority but is not a substitute for
deepening the page. **Tracked as content work, not an indexing bug.**

---

## New build guard

`scripts/check-internal-links.mjs`, wired into `check:links` and all three build
pipelines. It fails the build on:

1. an internal link whose path matches a 301/302/308/410 rule in `_redirects` —
   the thing that keeps "Page with redirect" alive;
2. an internal link ending in a trailing slash — the thing that creates
   "Duplicate without user-selected canonical", and which cannot be cleaned up
   with a redirect afterwards (§1).

200 rewrites (`/privacy → privacy.html`) and the `/*` soft-404 catch-all are not
flagged; they are rewrites, not hops. Current state: **599 internal links
checked, 0 offenders.** Both branches were tested against deliberate violations
before the guard was committed.

The sibling guards already existed and still run: `seo-head-audit.mjs` (one
canonical per page, slashless, matching the route) and `validate-sitemap.mjs`
(every `loc` returns 200 with no hop).

---

## Order of operations

1. Deploy.
2. Live smoke per `measurement.md`, plus specifically:

```bash
curl -sI https://topedgeai.com/services                       # 200, not 301
curl -sI https://topedgeai.com/compare                        # 200, NOT 301 to /compare/
curl -sI https://topedgeai.com/blog/ai-automation-revolutionizing-business-operations-2025   # 301
curl -s  https://topedgeai.com/features/campaigns/ | grep canonical                          # slashless
```

3. Submit `/services` for indexing (`npm run index:changed`).
4. In Search Console, **Validate Fix** on: Excluded by noindex, Page with
   redirect, Duplicate without user-selected canonical, Crawled – currently not
   indexed.
5. Leave 403 alone until `api.topedgeai.com/robots.txt` exists.
6. Expect the http/www rows and the nine deliberate 301s to keep reporting. They
   are correct.
