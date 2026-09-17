# Shared Product Feature Pages + Nav Hover Cleanup

**Date:** 2026-09-17  
**Status:** Approved design — pending implementation  
**Scope:** Nav mega-menu hover fix + shared enterprise product layout for 5 priority products

## Goals

1. Remove Product mega-menu **image** hover animations (scale / pulse / nudge / bob / spin). Keep quiet row background hover only.
2. Ship a shared, enterprise-quality product page layout (aligned titles, hero media, bento, outcomes, steps) for five priority products.
3. Hero shows **video or still** based on what exists for that product — same glow chrome language as homepage moments.
4. Copy stays operator-grade (Shopify + WhatsApp India), not generic “AI platform” fluff.
5. Remaining `/features/*` pages keep the current thinner layout until a later pass.

## Non-goals

- Redesigning all 11 feature pages in this pass
- Recording new demo videos
- Changing homepage sticky stories / CRM bento
- Replacing SEO topic FAQ content wholesale (cart SEO lander may be upgraded to the new shell while preserving path + SEO fields)

---

## Part A — Nav image hover removal

**Files**
- `src/marketing/styles/marketing.css`

**Remove**
- `.mkt-nav__mega-item:hover .mkt-nav__mega-thumb` transform
- `.mkt-nav__mega-item:hover .mkt-nav__clay-img` scale
- Per-tone hover animations (`is-wa|violet|amber|sky`)
- Related `@keyframes mkt-nav-icon-pulse|nudge|bob|spin`
- Optional: `transition` on thumb/clay that only existed for those animations

**Keep**
- `.mkt-nav__mega-item:hover { background: #faf8ff; }`

---

## Part B — Shared product page system

### Architecture

| Piece | Responsibility |
|-------|----------------|
| `src/marketing/data/productPages.ts` | Rich content per priority product (hero, outcomes, bento, steps, related, SEO) |
| `src/marketing/pages/ProductFeaturePage.tsx` | Shared renderer (like `SolutionPage`) |
| `src/marketing/styles/product-feature.css` | Dedicated layout (`.mkt-pf*`) — visual kinship with solutions/home, not Tailwind card soup |
| Routing | Priority slugs render `ProductFeaturePage`; others stay on `FeatureDetailPage` |

**Hero media union**
```ts
type HeroMedia =
  | { kind: 'video'; src: string; poster: string; label: string }
  | { kind: 'image'; src: string; alt: string };
```

Video uses existing glow/demo frame (`DemoProductVideoFrame` or `ProductDemoVideo` — prefer glow frame for parity with home). Image uses `DemoProductImageFrame`.

### Section stack (fixed order)

1. **Hero** — eyebrow, title + accent pill, one subtitle, hero media below (full-bleed within content max-width, centered)
2. **Outcomes** — 3 concrete operator metrics (metric + label + detail)
3. **Capability bento** — 2–3 tiles with product stills (home CRM style: image on top, title/body under)
4. **How it works** — 3–4 numbered steps (trigger → system → result)
5. **Works with** — 3 related product links
6. **CTA band** — reuse `MarketingCtaBand` with product-specific title/sub when useful

### Visual rules

- Title treatment matches home/solutions: accent word in soft pill
- White page, soft section washes — no purple-glow “AI SaaS” hero overlays, no floating badge stickers on media
- Bento: rounded tiles, real product screenshots, accent pill on key word when useful
- One job per section; no stat strips or icon-row fluff in hero
- Mobile: stack hero → outcomes → bento → steps → related → CTA

---

## Part C — Priority products (v1)

Routes map to nav / existing URLs where possible.

| ID | Route | Hero media | Bento stills (placeholders OK until custom art) |
|----|-------|------------|--------------------------------------------------|
| `cart-recovery` | `/whatsapp-cart-recovery` | `cart-recovery.mp4` + poster | cart / abandoned assets under `marketing/features/` |
| `cod-prepaid` | `/features/journeys` **or** dedicated COD route if we prefer `/cod-confirmation-whatsapp` | `cod-prepaid.mp4` | COD stills |
| `flow-builder` | `/features/flow-builder` | `flow-builder.mp4` | flow stills + Shopify tools imagery |
| `campaigns` | `/features/campaigns` | Best available: campaigns still or cart video until campaigns recording ships | `audience-campaigns.png` etc. |
| `audience-crm` | `/features/audience-crm` | `unified-identity-lead.png` (or `leaadd.png`) | Home CRM trio: `/1.png`, `/2.png`, `/3.png` |

**Route decisions (locked)**
- Cart recovery upgrades the existing SEO lander path `/whatsapp-cart-recovery` to the new shell (preserve SEO title/description/keywords from `seoTopics` / pageSeo).
- COD uses `/cod-confirmation-whatsapp` for the rich product page (nav “COD” currently points at `/features/journeys` — update nav COD item to `/cod-confirmation-whatsapp` so the new page is reachable).
- Journeys feature page can remain thinner or later point into COD/cart narratives; not required in v1 beyond not breaking aliases.
- Flow Builder, Campaigns, Audience CRM upgrade their `/features/:slug` entries when slug is in the priority set.

### Copy direction (per page)

Concrete, India D2C operator voice. Examples of tone (final copy written in implementation from this brief):

**Cart recovery**
- Title: Recover abandoned carts on WhatsApp  
- Accent: before they forget you  
- Outcomes e.g. timed nudges, Meta-safe templates, attributed recovery  
- Steps: Abandon event → wait/branch → approved send → reopen checkout

**COD → Prepaid**
- Confirm COD, nudge prepaid, cut RTO before the bag leaves  
- Outcomes: confirm rate, prepaid convert, fewer fake COD

**Flow Builder**
- WhatsApp flows that already know the cart and SKU  
- Shopify tool nodes, handoff to Live Chat

**Campaigns**
- Pixel / recharge audiences → Meta-safe broadcast → attributed revenue

**Audience CRM**
- One shopper across numbers, emails, orders, segments, care  
- Bento: Orders & care / Customer profiles / Live stock (home `1–3.png`)

---

## Implementation outline

1. Remove nav image hover CSS  
2. Add `productPages.ts` with all five product definitions + media helpers  
3. Build `ProductFeaturePage` + `product-feature.css`  
4. Wire routes:
   - `/whatsapp-cart-recovery` → ProductFeaturePage (`cart-recovery`)
   - `/cod-confirmation-whatsapp` → ProductFeaturePage (`cod-prepaid`)
   - `/features/flow-builder|campaigns|audience-crm` → ProductFeaturePage when slug matches
   - Other feature slugs → existing `FeatureDetailPage`
5. Update nav COD href to `/cod-confirmation-whatsapp`  
6. SEO: carry over existing titles/descriptions; add JSON-LD breadcrumbs consistent with today  
7. Visual QA on desktop + mobile for all five

## Success criteria

- [ ] Mega-menu images do not animate on hover  
- [ ] Five priority pages share one layout and look aligned  
- [ ] Each hero correctly shows video or image for that product  
- [ ] Audience CRM bento uses `/1.png`, `/2.png`, `/3.png`  
- [ ] Copy reads specific to WhatsApp + Shopify ops, not generic AI  
- [ ] Non-priority feature pages still work unchanged  

## Out of scope follow-ups

- Pixel / Opt-in dedicated product pages  
- Replacing placeholder campaign video when recording ships  
- Unifying remaining feature slugs onto this shell  
