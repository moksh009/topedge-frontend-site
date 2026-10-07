# Blocked workstreams — what I need from you

Dated 2026-10-07, ~11:00 IST. Everything else is proceeding.

## 1. Google Search Console — BLOCKS §1 entirely (the biggest gap)

**What happened:** The Claude-in-Chrome extension is not connected to this session, so I
cannot use your signed-in Chrome. I tried the in-app browser instead; it has no Google
session (`accounts.google.com/v3/signin` — screenshot path in evidence notes). I will not
enter your password, so I cannot sign in myself.

**What I need, in order of preference:**

1. **Open Chrome, install/sign in to the Claude in Chrome extension**
   (https://chromewebstore.google.com/detail/fcoeoabgfenejglbffodgkkbkcdhcgfn), open the
   Claude side panel and sign in with the same account as this app. Then tell me and I will
   drive GSC myself. This is the fastest path and unblocks GSC + Bing + GA4 + Netlify at once.
2. **Or** export these yourself and drop the CSVs into `seo-audit/gsc-snapshot/`:
   - Performance → last 3 months, and last 28 days; for each: Queries, Pages, Countries,
     Devices (use the "Export" button, choose CSV/Excel). Do it once with no filter and once
     with Country = India.
   - Pages (indexing) report → "Export" the full table, then click into each non-indexed
     reason bucket and export the URL list.
   - Sitemaps → screenshot of submitted vs discovered, last read date.
   - Links report → Export.
   - Experience → Core Web Vitals (mobile + desktop) → screenshot.
   - Settings → Crawl stats → screenshot (requests/day, by response, by purpose).
3. **Or** add me as a user — not possible, I am not a Google account. Ignore this option.

**Also tell me:** is the property a **Domain** property (`sc-domain:topedgeai.com`) or a
**URL-prefix** property (`https://topedgeai.com/`)? It changes what the coverage data covers.

## 2. Bing Webmaster Tools — BLOCKS the Bing/Copilot half of §1
Same cause. Bing matters disproportionately here because Bing's index feeds ChatGPT search
and Microsoft Copilot. I need: index coverage, sitemap status, IndexNow submission history,
crawl errors, Site Scan.

## 3. GA4 — blocks nothing critical, but I cannot confirm whether GA4 is even installed
The repo has an "optional GA4" commit. Tell me the measurement ID, or confirm it is off.

## 4. Netlify dashboard (read-only) — partially worked around
I confirmed the deploy is current by diffing live bytes against the repo (see AUDIT-REPORT
§0), so this is no longer blocking. I still cannot see the deploy log, build time, or
which commit is live. Nice to have, not urgent.

## 5. Real Google SERP positions — BLOCKED, and I will not fake them
`site:topedgeai.com` and normal searches from the in-app browser return Google's
"unusual traffic" CAPTCHA page (IP-level bot detection, logged 2026-10-07T05:26:46Z).
Bypassing a CAPTCHA is off-limits, so **§5 produces no rank data until either the Chrome
extension is connected or you give me access to a rank tracker** (Ahrefs / Semrush /
SerpApi key / Search Atlas — anything you already pay for).

Until then every "current rank" cell in `keyword-map.csv` says `unavailable`. I am not
going to estimate them.

## 6. AI assistants needing a login — partially blocked
- **Perplexity: WORKING** without a login. §6 is running there.
- **ChatGPT, Gemini, Copilot, Claude.ai, Google AI Mode: need a signed-in session.**
  The Chrome extension fix in item 1 unblocks all of these too.

Note: there is already a baseline in `geo/rows.json` dated **2026-09-30**, covering 25
queries × 6 assistants. It is **1 run per query/assistant, not 3**, so by your own rule #6
it is directional, not conclusive. I am treating it as prior art and re-running what I can.
