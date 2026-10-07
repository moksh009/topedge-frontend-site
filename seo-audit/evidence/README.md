# Evidence index

All captured 2026-10-07 against the LIVE site (topedgeai.com), not the repo.

| File | What it is |
|---|---|
| `crawler.mjs` | The crawler. Raw HTML only, no JS execution — what GPTBot/ClaudeBot/PerplexityBot see. `node crawler.mjs` re-runs it. |
| `analyze.mjs`, `analyze2.mjs` | The analysis passes. Every count in AUDIT-REPORT.md comes from these. Run from a dir containing `crawl/pages.json`. |
| `live-crawl-2026-10-07.json` | Full crawl of all 101 sitemap URLs: status, redirect chain, headers, title/desc/H1, canonical, robots, OG/Twitter, JSON-LD, anchors, word counts, image alt. |
| `live-robots-2026-10-07.txt` | Live `robots.txt`. SHA256 matches `public/robots.txt`. |
| `live-sitemap-2026-10-07.xml` | Live `sitemap.xml`, 101 URLs. |
| `live-llms-2026-10-07.txt` | Live `llms.txt`. SHA256 matches `public/llms.txt`. |
| `lighthouse-summary-2026-10-07.csv` | Scores and Core Web Vitals for 5 pages × mobile/desktop. **Lab data, simulated throttling — not field CWV.** |

Raw Lighthouse JSON is excluded by `.gitignore` (`lighthouse-*.json`, an existing project
convention for local audit artifacts). The 10 raw runs stayed in the scratchpad at
`/private/tmp/claude-501/.../scratchpad/lh/`. Re-generate with:

    npx lighthouse <url> --preset=desktop --only-categories=performance --output=json
    npx lighthouse <url> --form-factor=mobile --screenEmulation.mobile --throttling-method=simulate \
      --only-categories=performance,accessibility,seo,best-practices --output=json

## Not in here, and why

- **Search Console / Bing / GA4 exports** — blocked on a browser login. See `../ACCESS-NEEDED.md`.
- **Field Core Web Vitals (CrUX)** — keyless PageSpeed Insights API quota was exhausted on
  this network. Needs GSC or a CrUX API key. Not estimated.
- **Google SERP positions** — Google returned its "unusual traffic" CAPTCHA
  (`2026-10-07T05:26:46Z`). Not estimated.
