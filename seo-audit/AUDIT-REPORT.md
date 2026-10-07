# TopEdge AI — SEO / GEO audit
**Day 1 checkpoint. Dated 2026-10-07, ~11:00 IST. Branch: `seo-audit-oct-2026`.**

Status key: **fixed & verified** · **fixed, awaiting deploy** · **recommended** · **flagged (your decision)** · **blocked**

---

## Read this first: what Sunday can and cannot deliver

You asked me to be honest about the 11 Oct deadline. Here it is.

**The P0 bucket is empty.** I crawled all 101 live sitemap URLs and tested 21 bot
user-agents against the live site. There is no indexation blocker: no 404s, no redirect
chains, no stray `noindex`, no robots block, no CDN bot-blocking, every canonical
self-referencing and absolute, every page prerendered with its content and JSON-LD in the
initial HTML. **The thing I was most expecting to find — a technical reason the Oct 2026
docs and blog posts cannot be indexed — is not there.** Whatever is holding indexation back
is not on the site's side, which means I cannot confirm it without Search Console.

So the honest framing for Sunday:

- **What we can move by Sunday:** structured-data correctness, the pricing misquote that
  five separate AI runs made, entity consolidation, author/E-E-A-T signals, mobile page
  weight, and getting the 36 markdown mirrors discoverable. All of these are
  citation-readiness and correctness work.
- **What we cannot move by Sunday:** rankings. The four new blog posts went live 2026-10-04.
  Three days is not enough time for anything to rank, and no technical fix changes that.
- **What I cannot even measure right now:** whether those pages are indexed at all. See
  `ACCESS-NEEDED.md`. This is the single biggest hole in this audit and it is a login, not
  an analysis problem.

I will not be reporting a ranking win on Sunday, because there will not be one to report.

---

## The 10 things that matter most

1. **The homepage has a review in its structured data that is not on the page.** Four
   `Review` nodes; the one attributed to "Steven Mugabe" (code CLINIC) exists only inside
   the JSON-LD. Google's review-snippet docs require marked-up review content to be
   "readily available to users from the marked-up page". Separately, all four are
   self-serving reviews of TopEdge on TopEdge's own page, which can never earn stars. This
   is the only finding in the audit with manual-action exposure. → **TE-001**
2. **AI assistants are quoting ₹1,599/mo as the monthly price, and the page is why.** The
   pricing toggle defaults to Yearly, so the big number reads "₹1,599 **per month**" with
   the real month-to-month price (₹1,999) demoted to a small note. Five of the 28 recorded
   accuracy failures from 2026-09-30 are this exact error, across Perplexity, Gemini and
   Claude. → **TE-002**
3. **The price is also unreadable as text.** It is rendered one `<span>` per character for
   an animation, so plain-text extraction gets `₹ 1 , 5 9 9`. There is an `aria-label`, but
   LLM crawlers generally read text, not ARIA. → **TE-003**
4. **The Organization entity is fragmented seven ways with no `@id`.** Name alternates
   between "TopEdge" and "TopEdge AI"; logo between three different files; URL between with
   and without a trailing slash. The *good* variant — the one with `sameAs` and
   `disambiguatingDescription` — is on 37 of 101 pages. The 36 docs pages and 26 blog posts
   get a stub. → **TE-004**
5. **Three different engines confuse TopEdge with something else**, and it is documented:
   Copilot splits its answer with trytopedge.com (an unrelated AI-visibility product),
   Google AI Overview priced *edge-AI hardware*, Claude confused it with BrightEdge/EdgeTier.
   The `disambiguatingDescription` that addresses this is on a third of the site. → **TE-005**
6. **`/features/journeys` ships 10.5 MB to a phone** — because both the desktop (4.4 MB)
   and the mobile (1.8 MB) video download in the same mobile session, plus four ~1 MB PNGs.
   That is a bug, not a trade-off. → **TE-006**
7. **Mobile LCP is above Google's 2.5s threshold on every page I measured** (blog 4.7s,
   docs 4.1s, home 4.0s, journeys 3.6s, pricing 3.2s). CLS and TBT are genuinely good.
   These are *lab* numbers — field data needs GSC. → **TE-007**
8. **All 26 blog posts are authored by a logo.** `author` is the Organization on every one.
   No named author, byline, bio or `sameAs` anywhere. → **TE-008**
9. **The Shopify App Store listing has 0.0 stars and 0 reviews**, launched 2026-09-30. This
   is why multiple engines correctly said no independent reviews exist. It is also the
   highest-leverage thing on this list that I cannot do for you. → **TE-009**
10. **The 36 markdown mirrors are perfect and completely unreachable.** Correct
    `text/markdown` content type, correct `Canonical:` line — and zero inbound links, zero
    sitemap entries, no explicit listing in `llms.txt`. Built, served, invisible. → **TE-011**

---

## §0 Recon — done

| Check | Result |
|---|---|
| Deployed branch | `update-pricing`, clean, up to date with `origin/update-pricing` |
| Latest commit | `f57842a` "feat: full COD confirmation landing page on the static ad-page generator" |
| Oct 2026 changes live? | **Yes.** Verified by byte-identical checksums, not by inspection |
| `robots.txt` | live SHA256 == `public/robots.txt` SHA256 (1,058 b). `/docs` no longer disallowed — confirmed live |
| `llms.txt` | live SHA256 == `public/llms.txt` SHA256 (16,788 b) |
| `sitemap.xml` | 101 URLs. URL set identical to repo; **only `lastmod` differs** (build regenerates it; the committed copy is stale) → TE-019 |
| 36 docs pages | live, HTTP 200, `TechArticle` + `BreadcrumbList` in raw HTML |
| 4 new blog posts | live, HTTP 200, `BlogPosting` + `BreadcrumbList` + `FAQPage` in raw HTML |
| `/features/instagram` | live |

**Suspect #1 is dead.** There is no root `llms.txt` in this checkout, and `public/llms.txt`
is 16,788 bytes (not 7.8 KB). The served copy matches the repo exactly. No stale duplicate.

**Suspect #9 is resolved benignly** — see `lastmod` row above and TE-019.

---

## §1 Google Search Console — BLOCKED

Chrome extension not connected; in-app browser has no Google session; I will not enter your
password. **See `ACCESS-NEEDED.md` for exactly what to do.** This blocks:
every indexing-reason bucket and the "which of the 101 are not indexed and why" question,
all query/impression/CTR/position data, the striking-distance list, cannibalisation
evidence, field Core Web Vitals, the Links report, and crawl stats.

I also could not substitute `site:topedgeai.com` — Google served a CAPTCHA
("unusual traffic", logged `2026-10-07T05:26:46Z`) and bypassing it is off-limits.

**Consequence: there are no rank numbers and no impression numbers anywhere in this audit,
and there will not be until that login works.** Every such cell reads `unavailable`.

---

## §2 Technical crawl — done (live site, 101/101 URLs)

Method: `seo-audit/evidence/crawler.mjs`, raw HTML only, no JS execution — i.e. what
GPTBot/ClaudeBot/PerplexityBot see. Full output: `evidence/live-crawl-2026-10-07.json`.

**Clean, verified:**

- 101/101 HTTP 200. Zero redirects from any sitemap URL. Zero redirect chains.
- Zero duplicate titles, descriptions or H1s across 101 pages.
- Exactly one `<h1>` on all 101 pages.
- All 101 canonicals self-referencing and absolute. Zero relative. `og:url` matches on all.
- `lang="en-IN"` on all 101.
- Title lengths all within 15–65; descriptions all within 70–165. Zero contract violations.
- `<img>` elements: 1,241 total, **zero missing an `alt` attribute** (307 are `alt=""`,
  which is correct for decorative images — not individually spot-checked).
- Zero JSON-LD parse errors across all 101 pages.
- Required per-page-type schema present on every page; no page-type violations.
- HSTS on all 101 responses. No stray `X-Robots-Tag`.
- Zero orphans: every sitemap URL has inbound internal links.
- Real 404s return **404** with `noindex, nofollow`. `/404` itself is `noindex, nofollow`
  and is not in the sitemap. No soft 404s found.
- Trailing-slash and `/index.html` variants return 200 but serve the **correct canonical**,
  so they consolidate — crawl waste only (TE-016).

**Weakest internal linking** (contextual links, excluding nothing — nav/footer inflates all
counts, so read these as relative): `/features/instagram` and `/compare/gupshup` at 3
inbound, and two of the four new posts — `organic-ecommerce-leads-short-form-video` and
`trending-products-to-sell-online-india-2026` — also at 3. The new posts being the least
linked pages on the site is worth fixing while they are still being discovered.

**Lighthouse** (2026-10-07, `--preset=desktop` and mobile simulated; raw in `evidence/`):

| Page | Mobile perf / LCP | Desktop perf / LCP | Mobile total |
|---|---|---|---|
| `/` | 80 / **4.0s** | 62 / 1.5s (TBT 680ms) | 3,576 KB |
| `/pricing` | 86 / **3.2s** | 89 / 1.4s | 673 KB |
| `/features/journeys` | 84 / **3.6s** | 88 / 1.2s | **10,727 KB** |
| `/docs/quickstart` | 77 / **4.1s** | 91 / 1.3s | 688 KB |
| `/blog/cod-rto-benchmark-india-2026` | 75 / **4.7s** | 95 / 1.2s | 1,306 KB |

Accessibility 92–100, SEO 100 on all mobile runs. CLS 0–0.001 everywhere. Note the docs JS
is 262 KB across 15 files, close to the ~250 KB `DocsPage` chunk you flagged — but it is
*not* what is hurting LCP; images and video are.

**Field CWV data is `unavailable`** — the keyless PageSpeed Insights API quota was already
exhausted on this network. It needs GSC or a CrUX API key. I am not estimating it.

---

## §3 Crawler and AI-bot access — done, and it passes

Tested with **real `curl -A` requests** against 5 live URLs each, not by reading
`robots.txt`. All 21 agents received **HTTP 200 with full page content** — no 403, no 429,
no challenge page, no Netlify/CDN bot blocking:

Googlebot · Googlebot-Image · Bingbot · GPTBot · OAI-SearchBot · ChatGPT-User · ClaudeBot ·
Claude-SearchBot · Claude-User · anthropic-ai · PerplexityBot · Perplexity-User ·
Google-Extended · Applebot · Applebot-Extended · CCBot · Bytespider · Meta-ExternalAgent ·
Amazonbot · DuckAssistBot

**On the training-vs-retrieval question you asked me not to decide silently:** the site
currently allows *everything*. Retrieval bots (OAI-SearchBot, Claude-SearchBot,
PerplexityBot, DuckAssistBot, Applebot) must stay allowed — they are what produce
citations. The training-only bots are the business call: `GPTBot`, `ClaudeBot`,
`anthropic-ai`, `CCBot`, `Google-Extended`, `Applebot-Extended`, `Bytespider`,
`Meta-ExternalAgent`, `Amazonbot`. Blocking them protects content from training corpora but
buys you nothing in citations and removes you from future model knowledge. **My
recommendation: leave all of them allowed** — you are a young brand that needs to be known,
not a publisher protecting a back catalogue. No change made.

`llms.txt`: valid, 164 lines, 7 sections, **102 links checked and all 102 return 200**, and
it covers **all 101 sitemap URLs** with zero omissions. Genuinely good. Per your own
note #6, no engine has confirmed using it — treat it as cheap hygiene, which is what it is.

`.md` mirrors: served correctly with `Content-Type: text/markdown; charset=utf-8` and a
`Canonical:` line (verified on 6). Undiscoverable — TE-011.

---

## §6 GEO / AEO — partial, and the prior baseline matters

`geo/rows.json` already holds a baseline dated **2026-09-30**: 25 queries × 6 assistants,
110 rows, with 28 accuracy notes. **It is 1 run per query/assistant, not 3**, so by your
rule #6 it is directional, not conclusive. I am treating it as prior art.

What it shows, and what I am acting on:

- **The pricing misquote dominates** — 5 of 28 notes, across 3 engines. Root cause now
  located on the page (TE-002/TE-003). This is the clearest cause-and-effect finding in the
  whole audit.
- **Entity confusion in 3 engines** (TE-005).
- **Claude could not find TopEdge at all** on 3 of 5 branded queries, and described stale
  positioning ("voice agents, Instagram chatbots") on a fourth — suggesting a stale index
  rather than an on-site problem.
- **One run I did myself today**, 2026-10-07, Perplexity, web search on, no login, India
  English: query *"best WhatsApp automation for Shopify India"* → **TopEdge not mentioned.**
  Recommended instead: Zoko, GetGabs, Nvecta, Ominiflow, The Convertway. Cited domains were
  the vendors' own sites. This is **1 of 1 runs** — I will not characterise it further until
  I have 3.

ChatGPT, Gemini, Copilot, Claude.ai and Google AI Mode all need a signed-in session and are
blocked. Perplexity works.

---

## Not yet started

§4 content audit (26 posts / 36 docs / features / compare), §5 SERP reality check
(blocked — CAPTCHA), §7 query set for your sign-off, §8 off-site and backlinks
(backlinks blocked — needs GSC).

---

## Files

`issues.csv` — 21 findings · `ACCESS-NEEDED.md` — the blockers ·
`evidence/` — crawl JSON, live robots/sitemap/llms snapshots, 10 Lighthouse runs, and the
crawler + analysis scripts so you can re-run any number in here.
