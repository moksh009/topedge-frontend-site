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

### Weekly habit (pick a fixed weekday)

1. Open GSC → Performance → filter or scan the [tracked query list](./geo-citation-log.md#tracked-query-list).
2. Note: impressions, clicks, average position for any query that moved ± meaningfully.
3. Check Indexing: is “Discovered — not indexed” still clearing after the Phase 1 sitemap / redirect fix?
4. Repeat the same query glance in Bing Webmaster Tools.
5. **Impressions for queries a page was not built for** → add a row to [`content-backlog.md`](./content-backlog.md) (new post or new compare), do not leave them in chat memory.

### Organic check log (brief)

| Week of | GSC note (1–2 lines) | Bing note | Indexing / discovered-not-indexed | Fed backlog? |
|---|---|---|---|---|
| 2026-09-21 | Phase A+B meta gate live | Deployed fail-closed prerender budgets + schema; OG image alt/dims; blog article times; soft-404; CCBot + GoogleOther in robots; `npm run seo:audit`. Topic clusters + question bank docs. IndexNow `--changed`. **Manual still owed:** Bing/GSC Request indexing for Dondy URLs. | Confirm Live URL green for Dondy; start citation baseline Oct 1 | Phase C3 AEO rewrites next |
| | | | | |

---

## 2. GEO/AEO citation tracking (manual)

Full process + log tables live in [`geo-citation-log.md`](./geo-citation-log.md).

**Summary rules:**

1. Fresh / **incognito** sessions only (ChatGPT, Perplexity, Claude, Gemini).
2. Run **every** query in the tracked list, one at a time.
3. Log: TopEdge cited? (Y/N/partial), what was cited instead, notes (incl. competitor facts without formal citation).
4. **Monthly**, same day of month. Consistent monthly > sporadic weekly that dies after six weeks.
5. Keep “nothing changed” rows — flat trendlines are decisions, not nulls.

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

---

## 5. Roadmap status after Phase 6

| Phase | Status |
|---|---|
| 1 Technical SEO / indexing | Built — ongoing GSC/Bing watch |
| 2 Sitemap expansion (compares + alternatives + pillar) | Built |
| 3 Content engine | Built — **ongoing cadence** |
| 4 GEO/AEO content layer | Built |
| 5 Backlinks / digital PR | Week 1 trackers live — **ongoing human-gated** |
| 6 Measurement | **This hub + citation log** — ongoing |

Ongoing forever: Phase 3 cadence + Phase 6 measurement (+ Phase 5 outreach as capacity allows).
