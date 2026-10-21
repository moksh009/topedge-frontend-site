# dash.topedgeai.com: what is wrong and the exact fixes

The dashboard is a separate repo and is not in this workspace, so none of this
could be changed from here. Everything below was measured live on 21 Oct 2026
with a Googlebot user agent.

The audit called this an indexation black hole and said external crawlers were
being blocked. Blocking is not what is happening. The pages answer 200 to every
agent. The problem is what they answer with.

## 1. Every docs URL serves an empty shell that canonicalises to the sign-in page

    GET https://dash.topedgeai.com/docs                  200   4,072 bytes
    GET https://dash.topedgeai.com/docs/connect-whatsapp 200   4,072 bytes

Both return the identical 4,072-byte client-side shell. Rendered text: **0
characters**. And both carry:

    <title>TopEdge AI | Automated Intelligence Hub</title>
    <link rel="canonical" href="https://dash.topedgeai.com/" />

So all 36 documentation URLs tell Google, in a canonical tag, that they are
duplicates of the sign-in page. That is why zero are indexed, and it is why
ChatGPT Search, Perplexity and Claude cannot read them: there is nothing in the
HTML to read, and the page disavows itself.

This is also why the 9 Oct move cost the four URLs that used to rank on
topedgeai.com. They did not move. They were pointed at a page with no content.

**Fix, in the dashboard repo**
- Prerender or server-render `/docs/*` so the HTML contains the guide text before
  JavaScript runs. An empty shell with a 301 pointing at it is worse than no
  page, because the 301 spends the marketing domain's authority on nothing.
- Make the canonical self-referencing: `/docs/connect-whatsapp` must canonical to
  `https://dash.topedgeai.com/docs/connect-whatsapp`, never to `/`.
- Give each page its own `<title>` and `<meta name="description">`.
- Add `TechArticle` JSON-LD on every page, plus `HowTo` on the 5 Get started and
  10 task guides.
- Publish `https://dash.topedgeai.com/docs-sitemap.xml` listing all 36 docs URLs
  with real `lastmod` dates, and reference it from the dashboard `robots.txt`.

## 2. The dashboard sitemap submits the sign-in page and nothing else

    https://dash.topedgeai.com/sitemap.xml

contains exactly three URLs:

| URL | priority | lastmod |
|---|---|---|
| `/login` | 1.0 | 2024-04-03 |
| `/signup` | 0.8 | 2024-04-03 |
| `/` | 0.5 | 2024-04-03 |

Zero docs URLs. The sign-in page is submitted at priority 1.0 with a lastmod
from April 2024. Those three URLs are precisely the ones Google indexed, which
is not a coincidence: they are the only ones it was asked to index.

**Fix:** remove `/login`, `/signup` and `/` from the sitemap entirely. An
authenticated app shell has nothing to rank for. Replace the file with the docs
sitemap, or drop it and keep only `docs-sitemap.xml`.

## 3. robots.txt invites the auth pages in, and its Disallow misses the query form

Current dashboard `robots.txt`:

    User-agent: *
    Allow: /
    Allow: /login
    Allow: /signup
    Disallow: /admin/*
    Disallow: /settings/*
    Disallow: /conversations/*
    Disallow: /analytics/*
    Disallow: /api/*

Two defects:

- `Allow: /login` and `Allow: /signup` do not merely permit crawling, they
  single those paths out as wanted. Combined with the sitemap above, that is the
  whole explanation for "TopEdge AI: Sign in" ranking.
- **`Disallow: /settings/*` does not match `/settings?tab=billing`.** The pattern
  requires a `/` after `settings`; the live URL has `?` there. The same gap
  applies to `/analytics`, `/conversations` and `/admin` without a trailing
  slash. This is exactly why `/settings?tab=billing` is indexed while the rule
  looks like it should have stopped it.

**Fix:**

    User-agent: *
    Allow: /
    Disallow: /admin
    Disallow: /settings
    Disallow: /conversations
    Disallow: /analytics
    Disallow: /api
    Disallow: /login
    Disallow: /signup

    Sitemap: https://dash.topedgeai.com/docs-sitemap.xml

Dropping the trailing `/*` makes each rule a prefix match, which covers
`/settings`, `/settings/`, `/settings?tab=billing` and `/settings/anything`.

Note that `robots.txt` only stops crawling, not indexing of a URL discovered
elsewhere. The three URLs already in the index also need the next fix.

## 4. Authenticated routes need a robots meta tag, not just a Disallow

`/`, `/login`, `/settings` and `/settings?tab=billing` all return 200 with no
`<meta name="robots">` at all.

**Fix:** output `<meta name="robots" content="noindex, nofollow" />` on every
authenticated and auth-entry route. For the three URLs already indexed, keep
them crawlable for a few weeks so Googlebot can actually see the noindex, then
add the Disallow. A Disallow applied first will freeze them in the index,
because Google cannot read a noindex on a page it is not allowed to fetch.

## 5. Legal pages exist twice, on both hosts

    https://dash.topedgeai.com/privacy  200  canonical → https://dash.topedgeai.com/privacy
    https://dash.topedgeai.com/terms    200  canonical → https://dash.topedgeai.com/terms

Both self-canonicalise, so each competes with `https://topedgeai.com/privacy`
and `/terms`. The marketing copies are the ones Meta and Shopify review and the
ones with the authority.

**Fix, either one:**
- 301 `dash/privacy` and `dash/terms` to the marketing URLs, or
- keep them for in-app linking and set
  `<link rel="canonical" href="https://topedgeai.com/privacy" />` (and `/terms`).

A 301 is cleaner. Use the canonical only if the app needs to render them inside
its own chrome.

## 6. Where the docs live: decided

**Decision (21 Oct 2026, owner): the docs stay at `dash.topedgeai.com/docs`.**

They were split across two domains once and that was the duplication the 9 Oct
move removed. There is one copy, it lives with the product, and it is not coming
back to the marketing domain. So this spec is the whole job: option B below, and
sections 1 to 5 all apply.

What changed on the marketing side to match: `/docs/*` now redirects with
`:splat` instead of collapsing onto the docs index, so an old inbound link to
`/docs/connect-whatsapp` lands on that page rather than the root. The dashboard
serves the deep paths (checked 21 Oct 2026, all 200).

Nothing else on topedgeai.com claims to own documentation: `llms.txt` names
`dash.topedgeai.com/docs`, the footer links there, and `check-llms.mjs` fails the
build if any generated file ever references `topedgeai.com/docs` again.

---

The two options as they stood, for the record:

**A. Bring `/docs/*` back to topedgeai.com.** The source was deleted in commit
`eed4afc` and is recoverable from git: 36 pages, a sidebar, a TOC, schema
helpers, `docs.css`. This puts the docs on the domain that has the authority and
the prerender pipeline that already produces 67 clean pages. Cost: it re-creates
the duplication the 9 Oct move removed, unless the dashboard then stops serving
its own copy or canonicalises it here.

**B. Fix the dashboard copy in place,** per sections 1 to 5 above. The docs keep
living with the product, which is why they were moved. Cost: prerendering has to
be built in the dashboard repo, and a brand-new subdomain starts with no
authority, so these pages will rank more slowly than they did on the main
domain.

Either way sections 2 to 5 must happen in the dashboard repo. They are defects
regardless of where the documentation ends up.
