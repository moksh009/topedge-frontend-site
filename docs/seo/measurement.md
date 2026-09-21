# Measurement — Phase 6 hub

> **Two systems, not one.** Organic SEO tooling (GSC / Bing) and GEO/AEO citation logging measure different things. A strong Google position does **not** mean ChatGPT/Perplexity cite you. Do not conflate them; do not let one substitute for the other.

Last refreshed: **2026-09-21**

Related trackers (same `docs/seo/` folder — do not invent a second tooling home):

| Tracker | File | Cadence |
|---|---|---|
| Organic SEO notes | this file §1 | Weekly |
| GEO/AEO citation log | [`geo-citation-log.md`](./geo-citation-log.md) | Monthly |
| Content backlog | [`content-backlog.md`](./content-backlog.md) | Ongoing (1 post / 1–2 weeks) |
| Backlink / PR | [`backlink-opportunities.md`](./backlink-opportunities.md) | Weekly discovery; human-gated outreach |

**Paid GEO platforms (Goose, Profound, Writer, etc.):** do **not** buy until the manual citation log has run ≥3 months and hours are genuinely the bottleneck.

---

## 1. Organic SEO (tooling)

### Tools (already connected from Phase 1)

- **Google Search Console** — Performance + Indexing / “Discovered — not indexed”
- **Bing Webmaster Tools** — same query watch; Bing also matters because it partially feeds ChatGPT/Copilot retrieval
- **IndexNow** (Bing / Yandex / Seznam / Naver) — ping when URLs are added or fixed. Key at `/db2d3b12e5f047e48445607a75862b1f.txt`. Submit after deploy: `npm run indexnow -- --dondy` or `--changed`. **Google does not use IndexNow** — still use GSC URL Inspection for Google. Setup: [Bing IndexNow get started](https://www.bing.com/indexnow/getstarted)

### Weekly habit (**fixed: Monday IST**)

Lock this weekday so the habit survives. Skip a Monday → do Tuesday; do not invent two weeks of silence.

1. Open GSC → Performance → filter or scan the [tracked query list](./geo-citation-log.md#tracked-query-list).
2. Note: impressions, clicks, average position for any query that moved ± meaningfully (**real GSC numbers only**).
3. Check Indexing: “Discovered — not indexed” / soft-404 regressions.
4. Repeat the same query glance in Bing Webmaster Tools.
5. Run soft-404 smoke (§4) after any crawl/redirect deploy.
6. **Impressions for queries a page was not built for** → add a row to [`content-backlog.md`](./content-backlog.md).
7. Glance GA4 AI referrals (§2b) — one line if non-zero.

### Organic check log (brief)

| Week of | GSC note (1–2 lines) | Bing note | Indexing / discovered-not-indexed | Fed backlog? |
|---|---|---|---|---|
| 2026-09-21 | Phase A+B meta gate live | Deployed fail-closed prerender budgets + schema; OG image alt/dims; blog article times; soft-404; CCBot + GoogleOther in robots; `npm run seo:audit`. Topic clusters + question bank docs. IndexNow `--changed`. **Manual still owed:** Bing/GSC Request indexing for Dondy URLs. | Confirm Live URL green for Dondy; start citation baseline Oct 1 | Phase C3 AEO rewrites next |
| 2026-09-21 (pm) | Phase B4+C ship | Soft-404/redirect smoke documented; compare Product→SoftwareApplication+image; AEO on journeys/COD/best-tools + Live Chat/Meta Manager/AI Brain answerFirst+FAQ; IndexNow after deploy | Re-request GSC for `/compare/dondy` (Merchant listings); Bing Live URL→Request indexing for Dondy pair | C4 cadence row logged |
| 2026-09-21 (Phase D ops) | _Fill real GSC impressions when you open Search Console (same Monday)_ | _Fill Bing glance_ | Live smoke: junk URL **404**; `/pricing` **200**; `/compare/dondy` **200** self-canonical + `SoftwareApplication`; `/features/journeys` **200**. IndexNow already pinged AEO set. | Phase D runbooks live; citation pass still Oct 1 |
| 2026-09-28 | _Second consecutive Monday — required for D3 done_ | | Soft-404 smoke again | |

---

## 2. GEO/AEO citation tracking (manual)

Full process + log tables live in [`geo-citation-log.md`](./geo-citation-log.md).

**Summary rules:**

1. Fresh / **incognito** sessions only (ChatGPT, Perplexity, Claude, Gemini).
2. Run **every** query in the tracked list, one at a time.
3. Log: TopEdge cited? (Y/N/partial), what was cited instead, notes (incl. competitor facts without formal citation).
4. **Monthly**, same day of month. Consistent monthly > sporadic weekly that dies after six weeks.
5. Keep “nothing changed” rows — flat trendlines are decisions, not nulls.

**What you do on Oct 1 (or next free day — do not skip):**

1. Open [`geo-citation-log.md`](./geo-citation-log.md) → section **2026-10 — baseline**.
2. Four private windows: ChatGPT, Perplexity, Claude, Gemini.
3. For each query ID (A1…E5), paste the query **verbatim** into each AI.
4. Fill the empty row: `Y` / `P` / `N`, who got cited instead, one-line note.
5. Expect mostly `N` on the first pass — that **is** the baseline, not a failure.
6. After the table is filled, update the monthly review row in §3 below.

Do **not** invent citation results in this repo. Code/AEO work does not replace this pass.

---

## 2b. GA4 — AI Search / AI chat referral filter

> Goal: see traffic that arrived from AI products (ChatGPT, Perplexity, etc.), separate from Google organic.  
> Do **not** invent session counts in this file — only document how to build the view.

### Domains to include (session source / referrer)

| Product | Typical hostname patterns (match contains) |
|---|---|
| ChatGPT | `chatgpt.com`, `chat.openai.com` |
| Perplexity | `perplexity.ai` |
| Gemini | `gemini.google.com`, `bard.google.com` |
| Copilot | `copilot.microsoft.com`, `bing.com` (optional — noisy; prefer Copilot host only) |
| Claude | `claude.ai` |

### Setup (GA4 UI)

1. Open **GA4** → **Admin** → **Data display** → **Channel groups** (or use an **Exploration** if you prefer not to edit the default channel group).
2. **Option A — Custom channel group (recommended)**  
   - Duplicate Default Channel Group → name it `TopEdge + AI referrals`.  
   - Add channel **AI Chat / Answer engines** with rule:  
     `Session source` **matches regex**  
     `chatgpt\.com|chat\.openai\.com|perplexity\.ai|gemini\.google\.com|bard\.google\.com|claude\.ai|copilot\.microsoft\.com`  
   - Place this channel **above** Referral so AI hosts are not lumped into generic Referral.
3. **Option B — Exploration (no channel edit)**  
   - Explore → Free form → dimension `Session source` + `Session medium`.  
   - Filter: Session source matches regex (same pattern as above).  
   - Metric: Sessions, Engaged sessions, Key events (trial / contact if configured).
4. Save a bookmark/note: “AI referrals — weekly glance with organic GSC.”
5. First time you see non-zero AI sessions, log the week in the organic table above (1 line only — real numbers from GA4, never guessed).

**Done when:** Someone on the team can open GA4 and show AI vs organic without rebuilding the filter from memory.

---

## 2c. Manual indexing queue (Phase D5)

Whenever a high-value URL is **new**, **recovered**, or **schema-fixed**:

1. **Bing** — URL Inspection → **Live URL** (confirm fetch OK) → **Request indexing**.
2. **GSC** — URL Inspection → Request indexing (Google ignores IndexNow).
3. If Bing Index tab says “Discovered but not crawled” but Live URL is green → **queue**, not a code bug. Re-request once; do not thrash.

### Current queue (request when you have 5 minutes)

| URL | Why | GSC | Bing Live→Request | IndexNow |
|---|---|---|---|---|
| `https://topedgeai.com/compare/dondy` | Merchant listings schema fix (Product→SoftwareApplication+image) | [ ] | [ ] | done |
| `https://topedgeai.com/blog/dondy-alternative-shopify-india` | New GEO URL; Bing crawl queue | [ ] | [ ] | done |
| `https://topedgeai.com/features/journeys` | AEO rewrite + Discovered-not-indexed | [ ] | [ ] | done |
| `https://topedgeai.com/pricing` | Discovered-not-indexed (Priority 1) | [ ] | [ ] | |
| `https://topedgeai.com/shopify-whatsapp-integration` | Discovered-not-indexed | [ ] | [ ] | |
| `https://topedgeai.com/features/live-chat` | GSC listed under redirect but live **200** — Inspect → Request indexing | [ ] | [ ] | done |
| `https://topedgeai.com/blog/whatsapp-abandoned-cart-recovery-shopify` | Same — live **200** self-canonical; Request indexing after deploy of rewrite | [ ] | [ ] | |
| `https://topedgeai.com/blog/cod-confirmation-whatsapp-reduce-rto-shopify` | AEO rewrite | [ ] | [ ] | done |
| `https://topedgeai.com/blog/best-whatsapp-automation-tools-shopify-india` | Pillar refresh | [ ] | [ ] | done |
| `https://topedgeai.com/features/ai-brain` | AEO answerFirst+FAQ | [ ] | [ ] | done |
| `https://topedgeai.com/features/meta-manager` | AEO answerFirst+FAQ | [ ] | [ ] | done |

### GSC bucket triage (2026-09-21)

| Bucket | Action |
|---|---|
| **403** `https://api.topedgeai.com/` | API root is not a marketing page. Add `robots.txt` Disallow `/` on **api** host (or `X-Robots-Tag: noindex` on `/`). Then GSC → Validate fix. Do **not** request indexing. |
| **Page with redirect** `http://…` / `www.` / `dash…/docs` | Expected host/docs redirects — leave. |
| **Page with redirect** `/blog/whatsapp-abandoned-cart-recovery-shopify`, `/features/live-chat` | Live now **200** + self-canonical. Stale GSC; Inspect Live URL → Request indexing. Validation already started. |
| **Crawled not indexed** old banking / evolution blogs | Were **404**; redirects added → `/blog` and `/blog/ai-whatsapp-chatbot-for-shopify-india`. Deploy `_redirects`, then Validate. |
| **Crawled not indexed** `/testimonials` | Already 301 → `/customers`. Leave; will leave this bucket after recrawl. |

---

## 2d. Competitive AEO glance — Q4 2026 (Phase D4)

> **Structural** glance from vendor-public pages + our verify-live compare research.  
> **Not** an AI citation claim — confirm who actually appears in answers on the Oct 1 citation pass, then revise this note.

| Competitor | Patterns worth stealing (structure only) | Patterns to avoid | TopEdge response |
|---|---|---|---|
| **Zoko** | Clear India commerce positioning; COD called out publicly | Conversation metering opacity in festival weeks | Keep flat INR + COD → prepaid journeys explicit on compare + pricing |
| **Dondy** | Transparent (if aggressive) rate table on marketing site | Published Meta markup ~60% above card | Keep “0% platform markup” + link Meta pricing blog; maintain `/compare/dondy` table |
| **Getgabs** | Aggressive entry / free-install framing | Depth gated by tier | Alternatives blog already covers; do not race sticker price in hero |

### Backlog actions from this glance (≤5)

| ID | Action | Priority | Status |
|---|---|---|---|
| D4-1 | After Oct 1 pass: replace this table’s “who appears in AI” column with real platforms | P0 | waiting citation |
| D4-2 | Deepen Meta pricing India blog if D1–D2 stay all-N after Oct | P1 | idea |
| D4-3 | Ensure `/compare/dondy` + alternative blog stay internally linked from pillar (≥3 inbound) | P1 | mostly live — verify E1 |
| D4-4 | Quarterly: re-check Zoko/Dondy/Getgabs pricing pages (verify-live) before any claim refresh | P1 | calendar Nov |
| D4-5 | If Getgabs dominates cheap-entry AI answers, refresh free-to-install buyer guide (C10) | P2 | idea |

Logged also in [`content-backlog.md`](./content-backlog.md) as D4-* notes where content work is needed.

---

## 3. Monthly review ritual (do not skip)

Each month, after the citation pass:

1. **Diff citations** vs last month — newly cited / lost / flat.
2. **Cross-ref GSC/Bing** for the same queries — climbing organic but uncited ≠ cited by Perplexity but invisible on Google (different fixes).
3. **Cross-ref** [`backlink-opportunities.md`](./backlink-opportunities.md) — citation appearing after a roundup adds TopEdge is outreach signal; note it explicitly.
4. **Decide:** any compare/blog with **zero citation movement after ~90 days** on a tracked query → revisit that URL against Phase 4 patterns (answer-first, real tables, FAQ in HTML, schema), do not assume “more time.”

### Monthly review log

| Month | Citation highlights | Organic cross-ref | Backlink cross-ref | Decisions |
|---|---|---|---|---|
| 2026-10 (first full) | _pending first pass_ | | | |
| 2026-11 | | | | |
| 2026-12 | | | | |

---

## 4. QA checklist (Phase 6)

- [ ] GSC + Bing checked on a real recurring weekly cadence (not “set up once”)
- [ ] After meta/URL deploys: `npm run seo:audit` locally post-build; `npm run indexnow -- --changed`
- [ ] Full query list run across ChatGPT, Perplexity, Claude, Gemini in fresh/incognito
- [ ] Monthly cadence holds for **≥3 months** before calling it established
- [ ] Citation log lives in [`geo-citation-log.md`](./geo-citation-log.md) (durable), not chat threads
- [ ] Monthly review cross-refs citation log + organic + Phase 5 backlink tracker
- [ ] Category E (branded) checked for **factual accuracy** once any citations appear
- [ ] No paid GEO tooling purchased before manual process has proven to be the bottleneck

### Redirect / soft-404 smoke (after every redirect or prerender deploy)

Run from any machine (expect **HTTP 404** on junk, **HTTP 200** on `/pricing`, never a 301 loop):

```bash
curl -sI "https://topedgeai.com/this-is-not-a-real-page-xyz" | tr -d '\r' | head -1
# → HTTP/2 404
curl -sI "https://topedgeai.com/pricing" | tr -d '\r' | head -5
# → HTTP/2 200 (Location must NOT bounce /pricing → /pricing)
curl -sI "https://topedgeai.com/compare/dondy" | tr -d '\r' | head -1
# → HTTP/2 200
```

**Never** add path catch-all slash-strip force 301s to `public/_redirects` — Netlify Pretty URLs self-loop. Guard lives in `scripts/generate-redirects.mjs`.

### CWV spot-check log (Phase E2)

| Date | URL | Tool | Perf / LCP / INP / CLS | Action |
|---|---|---|---|---|
| 2026-09-21 | `/`, `/pricing`, `/features/journeys`, `/compare/dondy` | PageSpeed API mobile | Quota exceeded (no API key) — **re-run with key or CrUX** next Monday | No eng work scheduled without numbers |
| | | | | |

**Rule:** Only open an engineering ticket if LCP/INP/CLS clearly regress vs prior month. Document real scores here—never invent.

### Index / redirect health (Phase E3)

| Date | Junk → 404 | `/pricing` 200 | Force slash-301 absent | Sitemap sample OK | Notes |
|---|---|---|---|---|---|
| 2026-09-21 | yes | yes | yes (script guard) | 53 URLs | Soft-404 + Dondy self-canonical verified live |

---

## 5. Roadmap status after Phase 6

| Phase | Status |
|---|---|
| 1 Technical SEO / indexing | Built — ongoing GSC/Bing watch |
| 2 Sitemap expansion (compares + alternatives + pillar) | Built |
| 3 Content engine | Built — **ongoing cadence** |
| 4 GEO/AEO content layer | Built |
| 5 Backlinks / digital PR | Week 1 trackers live — **ongoing human-gated** |
| 6 Measurement | **Phase D+E ops live** — all feature landers have `answerFirst`; inbound hygiene fixed; CWV re-run owed with PageSpeed key; citation baseline **2026-10-01** |

Ongoing forever: Phase 3 cadence + Phase 6 measurement (+ Phase 5 outreach as capacity allows).
