# TopEdge AI — Marketing Website Rebuild Master Guide

> **Last updated:** 2026-06-17

---

## Implementation status — COMPLETE

| Phase | Status |
|-------|--------|
| 0 — Tokens + foundation | **Done** |
| 1 — IA + routing shell | **Done** |
| 2 — Homepage | **Done** |
| 3 — Trust mechanics | **Done** |
| 4 — Hero feature pages | **Done** |
| 5 — Feature pages P1 | **Done** |
| 6 — Pricing alignment | **Done** |
| 7 — Secondary pages | **Done** |
| 8 — Polish & launch | **Done** |

---

## Routes

| Path | Page |
|------|------|
| `/` | Homepage + FAQ schema + recovery toasts |
| `/pricing` | Plans + `#roi-calculator` |
| `/features` | Filterable module index |
| `/features/:slug` | Feature detail (`FeaturePageLayout` + showcase band) |
| `/solutions/:vertical` | fashion, beauty, food, cod, agencies |
| `/agency` | Agency & reseller |
| `/customers` | Case studies |
| `/integrations` | Stack |
| `/security` | Security & compliance |
| `/terms` | Terms of Service |
| `/privacy-policy` | Privacy Policy (WhatsApp / Shopify) |
| `/compare` | Competitor comparisons |
| `/compare/:competitor` | vs Bitespeed, Wati, Interakt |
| `/blog` | Curated D2C playbooks |
| `/testimonials` | India D2C social proof |
| `/about` | Company |
| `/contact` | Contact form |
| `*` | On-brand 404 |

**301 redirects (Netlify):** `/features/order-messages` → `order-automations`, `/features/inbox` → `live-chat`, `/features/store-engine` → `shopify`, `/features/audience` → `audience-crm`, `/features/rules` → `chat-rules`, `/services` → `/features`, `/booking` → `/contact`, `/roi` → `/pricing#roi-calculator`, `/ai-caller` → `/features/ai-brain`, `/ai-chatbot` → `/features/live-chat`

**Signup:** `/signup?plan=diy_pro` forwards query to `dash.topedgeai.com/signup`

---

## Homepage section order (§8.1)

1. Hero + `MarketingWorkspaceFrame`
2. Trust band (Shopify + Meta + vertical chips)
3. Hero outcomes (3 blocks)
4. 12-module grid
5. Product stories scroll (`HomeProductStories`)
6. How it works (4 steps)
7. ROI teaser
8. Vertical chips
9. Testimonials
10. Pricing preview
11. FAQ (6 questions)
12. Final CTA + recovery toasts

---

## SEO & OG

- **`MarketingSEO`** — lean meta per page, canonical URLs, FAQ schema on homepage
- **OG images:** `public/og/*.svg` (1200×630) per hero route
- **Sitemap:** `public/sitemap.xml`
- **PWA:** `site.webmanifest` theme `#7C3AED`

---

## QA checklist

```
[x] All core routes
[x] Mobile sticky CTA (MarketingPage)
[x] CTAs → dash.topedgeai.com/signup (+ plan query on pricing)
[x] Pricing = planCatalog.ts
[x] ROI calculator — recovery slider 8–32%, formula shown
[x] No "Coming soon" on marketing feature pages
[x] BrowserFrame + SamplePill on mocks
[x] Recovery toasts (homepage, reduced-motion fallback)
[x] theme-color #7C3AED
[x] On-brand 404
[x] Per-page OG images
[x] FAQ structured data (homepage)
[x] Security page + footer link
[x] Privacy/Terms — WhatsApp India positioning
[x] Compare pages (Bitespeed, Wati, Interakt)
[x] Feature showcase band + walkthrough anchor
[x] Blog legacy posts filtered
[x] Legacy routes redirected
[x] Firebase/auth lazy on marketing routes
```

---

## Key files

| Asset | Path |
|-------|------|
| Marketing SEO | `src/marketing/components/MarketingSEO.tsx` |
| OG config | `src/marketing/data/marketingSeo.ts` |
| Plan catalog | `src/marketing/data/planCatalog.ts` |
| Feature layout | `src/marketing/components/foundation/FeaturePageLayout.tsx` |
| ROI calculator | `src/marketing/components/RoiCalculator.tsx` |
| Recovery toasts | `src/marketing/components/foundation/RecoveryToastStack.tsx` |

---

*Extend when scope changes; bump **Last updated** at top.*
