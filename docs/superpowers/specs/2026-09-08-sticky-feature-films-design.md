# Sticky Feature Films — Design Spec

**Date:** 2026-09-08  
**Status:** Approved in conversation (Approach 1, scope C×B×C×B)  
**Scope:** Homepage sticky stories only (v1). Feature pages reuse later via same API.

---

## 1. Goal

Replace the five homepage sticky **video** demos (`ProductDemoVideo` → `/mmjnm.mp4`) with short **UI films** that reuse the hero’s desktop + camera + phone language — without changing `HeroJourneyStage` behavior.

## 2. Decisions (locked)

| Decision | Choice |
|----------|--------|
| Story mix | Keep Cart Recovery + Journey Builder; drop IG inbox + lead scoring + shipping-alerts block |
| Section count | **5 lean films** |
| COD → prepaid | Lives **inside** Journey Builder sticky film (short cut of hero Act 2) |
| Pixel + Insights | **One combined** film |
| Where | Homepage sticky now; `FeatureFilm` API ready for `/features/:slug` later |
| Architecture | **Extract shared FeatureFilm kit**; hero stays untouched |
| Camera grammar | **By feature type** — nodes+phone where it fits; desktop-first elsewhere |
| Instagram | **Removed** from sticky copy and films |
| Brand continuity | Glow Skin Co · Vitamin C Serum · `#TE-1042` · ₹1,899 |

### Homepage STORIES (final)

1. Cart Recovery  
2. Journey Builder (COD → prepaid)  
3. Website pixel + Product insights  
4. Stock monitor (supplier alerts)  
5. Warranty  

### Explicitly removed from sticky

- Shared Team Inbox for WhatsApp & IG  
- Audience Segmentation & Lead Scoring  
- Automated Order & Shipping Alerts (as its own block; hero Delivered act already covers shipping/review)

---

## 3. Architecture

### 3.1 Hard rules

1. Do **not** change `HeroJourneyStage` timeline, beats, or camera behavior.  
2. Sticky layout stays: centered copy → demo stage below.  
3. Only **one** sticky film plays at a time (IntersectionObserver ≥ ~45% visible).  
4. Respect `prefers-reduced-motion`: jump to final success beat, no autoplay loop.  
5. No Instagram marks/copy in sticky films.  
6. Hero CSS classes (`.hero-duo*`) may be **reused via shared aliases** (`.film-stage` that composes same vars) — do not fork conflicting camera values on `.hero-duo__stage` that would alter the hero.

### 3.2 Shared kit

```
src/marketing/components/home/feature-films/
  FeatureFilm.tsx              # public API: id → mounts correct film
  FilmStage.tsx                # desktop chrome + lens + optional phone slot
  useFilmTimeline.ts           # beat runner + in-view gate
  FilmPhone.tsx                # WhatsApp phone chrome
  films/
    CartRecoveryFilm.tsx
    JourneyCodFilm.tsx
    PixelInsightsFilm.tsx
    StockMonitorFilm.tsx
    WarrantyFilm.tsx
  types.ts                     # FilmId, Beat, CamClass
```

Optional CSS: `src/marketing/styles/feature-films.css` (imported from marketing entry) — camera presets that **mirror** hero values; sticky-specific layout (height, phone slide-in).

### 3.3 Public API

```ts
type FeatureFilmId =
  | 'cart-recovery'
  | 'journey-cod'
  | 'pixel-insights'
  | 'stock-monitor'
  | 'warranty';

type FeatureFilmProps = {
  id: FeatureFilmId;
  /** When false, timeline paused (parent IO). Default: observe self. */
  active?: boolean;
};
```

`HomeStickyStories` swaps:

```tsx
<ProductDemoVideo ... />  →  <FeatureFilm id={story.filmId} />
```

### 3.4 Timeline runner

Same model as hero: `{ ms, cam, flags? }[]` + `setTimeout` chain.

```ts
type FilmBeat = {
  ms: number;
  cam: string;           // e.g. 'is-cam-wide' | 'is-cam-node-entry' | ...
  phone?: 'hidden' | 'enter' | 'visible';
  // film-specific boolean flags consumed by mock UI
  [key: string]: unknown;
};
```

- `phone: 'hidden'` — phone offstage / `opacity:0` / translated right  
- `phone: 'enter'` — slide-in transition (~700ms)  
- `phone: 'visible'` — parked beside desktop  

Camera transition: keep hero easing  
`transform 1.15s cubic-bezier(0.33, 0.12, 0.22, 1)`.

Scale language (match hero):

| Mode | Scale | Use |
|------|-------|-----|
| wide | 1.0 | Chapter / pair / phone outcomes |
| story | 1.16 | Node / row / panel pans |
| punch | ~1.18 | Publish / Send / Save |

### 3.5 Playback

- Mount films in sticky blocks; each uses IO.  
- When inactive: pause timeouts, freeze beat (or reset to 0 on re-enter — prefer **reset on re-enter** for clean loops).  
- When active: start from beat 0, loop.  
- Reduced motion: show last beat static.

---

## 4. Films (end-to-end)

### 4.1 Cart Recovery

**Copy**

- Lead: `WhatsApp Abandoned` · Accent: `Cart Recovery`  
- Body: Recover checkouts with timed WhatsApp nudges the moment a shopper leaves items behind.  
- CTA: Start free  

**Grammar:** desktop → nodes → phone  

**Desktop:** Journey canvas “Abandoned cart · 3-message”  
Nodes: `Cart abandoned` → `Wait 15m` → `WA nudge #1` → `Wait 2h` → `WA nudge #2` → `End`  
Product chip: Vitamin C Serum · ₹1,899  

**Phone:** Glow Skin Co. cart template → second nudge → recovered toast on desktop  

**Beats (~20s)**

| # | ms | cam | phone | Action |
|---|----|-----|-------|--------|
| 0 | 2200 | wide | hidden | Full canvas; abandoned badge pulse |
| 1 | 1400 | node-entry | hidden | Focus Entry |
| 2 | 1600 | node-mid | hidden | Wait → Message #1 lights |
| 3 | 1500 | node-end | hidden | End connects |
| 4 | 1300 | publish | hidden | Publish |
| 5 | 900 | wide | enter | Phone slides in |
| 6 | 1800 | wide | visible | First cart template |
| 7 | 1600 | wide | visible | CTA highlight; Recovered toast |
| 8 | 1400 | wide | visible | Hold → loop |

---

### 4.2 Journey Builder (COD → prepaid)

**Copy**

- Lead: `Drag-and-Drop` · Accent: `Journey Builder`  
- Body: Build COD → prepaid recovery on a visual canvas—wait, branch, and message from one place. Convert before it ships.  
- CTA: Start free  

**Grammar:** desktop → drag nodes → phone (hero Act 2 short cut)  

**Desktop:** Entry (COD order) → drag `COD → prepaid` → mid note (₹100 off, 2h) → End → Publish → enroll `#TE-1042`  

**Phone:** Building pill → Pay ₹1,799 template → paid success  

**Beats (~22s)**

| # | ms | cam | phone | Action |
|---|----|-----|-------|--------|
| 0 | 2400 | wide | hidden | Canvas + Steps |
| 1 | 1400 | node-entry | hidden | Focus Entry |
| 2 | 1800 | drag | hidden | Drag COD→prepaid onto canvas |
| 3 | 1400 | node-mid | hidden | Mid active |
| 4 | 1300 | node-end | hidden | End connects |
| 5 | 1400 | publish | hidden | Publish |
| 6 | 1000 | wide | enter | Phone enters |
| 7 | 1300 | order | visible | Enroll toast + send |
| 8 | 1500 | wide | visible | Pay CTA on phone |
| 9 | 1600 | paid | visible | Success → loop |

**Reuse:** Parameterize existing journey/phone prepaid UI patterns; do not call into hero’s beat indices.

---

### 4.3 Website pixel + Product insights

**Copy**

- Lead: `Website Pixel &` · Accent: `Product Insights`  
- Body: See which products drive WhatsApp revenue—pixel on your storefront, insights in one dashboard.  
- CTA: Start free  

**Grammar:** desktop-only (no phone, no nodes)  

**Desktop:** Pixel panel (live events) + Product Insights table (Serum ranks up; Recovered ₹ ticks)  

**Beats (~17s)**

| # | ms | cam | Action |
|---|----|-----|--------|
| 0 | 2200 | wide | Full dual panel |
| 1 | 1600 | pixel | Pixel live; Viewed product |
| 2 | 1400 | pixel | ATC → Checkout started |
| 3 | 1600 | insights | Pan to table; Serum pulse |
| 4 | 1500 | insights-kpi | WA clicks + ₹ count up |
| 5 | 1800 | wide | Attribution “Store × WhatsApp · +₹1,799” → loop |

**New cams (sticky CSS only):**

- `is-cam-pixel`: scale 1.16, tx +8%, ty +4%  
- `is-cam-insights`: scale 1.16, tx −6%, ty +2%  
- `is-cam-insights-kpi`: scale 1.18, tx −4%, ty +6%  

---

### 4.4 Stock monitor

**Copy**

- Lead: `Low-Stock` · Accent: `Supplier Alerts`  
- Body: When inventory nears empty, TopEdge drafts the restock message, lets you add a supplier, and sends exactly how many units you need.  
- CTA: Start free  

**Grammar:** desktop ops desk → phone (supplier WhatsApp)  

**Desktop:** Inventory row Serum **8 left** / threshold 20 → draft drawer → supplier Raj Traders → units 50 → Send  

**Phone:** Chat with Raj Traders; same message; optional OK reply  

**Beats (~20s)**

| # | ms | cam | phone | Action |
|---|----|-----|-------|--------|
| 0 | 2000 | wide | hidden | Inventory table |
| 1 | 1400 | stock-row | hidden | Zoom low-stock row |
| 2 | 1600 | draft | hidden | Drawer + draft message |
| 3 | 1400 | supplier | hidden | Supplier + units 50 |
| 4 | 1200 | send | hidden | Send press |
| 5 | 900 | wide | enter | Phone enters |
| 6 | 1800 | wide | visible | WA message to supplier |
| 7 | 1400 | wide | visible | Toast “Sent · 50 units” → loop |

**New cams:**

- `is-cam-stock-row`: 1.16, ty +8%  
- `is-cam-draft`: 1.16, tx −4%, ty 0%  
- `is-cam-supplier`: 1.16, tx −2%, ty +4%  
- `is-cam-send`: 1.18, punch on Send  

Draft message copy:

> Hi Raj, Vitamin C Serum is at 8 units. Please send **50 units** by Friday.

---

### 4.5 Warranty

**Copy**

- Lead: `Assign Product` · Accent: `Warranty`  
- Body: Attach warranty terms to products you sell—duration, coverage, and a WhatsApp claim path customers actually use.  
- CTA: Start free  

**Grammar:** desktop-first → light phone  

**Desktop:** Product page → Warranty On → 12 months / Manufacturing defects / On delivery → Save → badge  

**Phone:** “Your Vitamin C Serum includes **12-month warranty**. Reply CLAIM anytime.”  

**Beats (~15s)**

| # | ms | cam | phone | Action |
|---|----|-----|-------|--------|
| 0 | 2000 | wide | hidden | Product + empty warranty |
| 1 | 1400 | warranty | hidden | Toggle On |
| 2 | 1600 | warranty | hidden | Fields fill |
| 3 | 1200 | save | hidden | Save + badge |
| 4 | 800 | wide | enter | Phone enters |
| 5 | 1800 | wide | visible | Customer WA note |
| 6 | 1400 | wide | visible | Hold → loop |

**New cams:**

- `is-cam-warranty`: 1.16, tx +4%, ty +2%  
- `is-cam-save`: 1.18  

---

## 5. Camera & motion system (§7)

### 5.1 Lens

Identical contract to hero:

```css
.film-stage__lens {
  transform-origin: var(--cam-ox, 50%) var(--cam-oy, 48%);
  transform: translate3d(var(--cam-tx), var(--cam-ty), 0) scale(var(--cam-scale));
  transition:
    transform 1.15s cubic-bezier(0.33, 0.12, 0.22, 1),
    transform-origin 1.15s cubic-bezier(0.22, 1, 0.36, 1);
}
```

Stage applies `is-cam-*` classes → CSS variables. Hold cam for full beat (no mid-beat settle) — match current hero `useSmoothCam` behavior.

### 5.2 Phone slide-in

Default for films that use phone: start `translateX(28%)` + `opacity: 0` (or off padding).  
On `enter`: 700ms ease-out to docked position overlapping desktop right edge (same visual idea as hero pair, but **animated entrance** unique to sticky films so the story reads “desktop first, then phone”).

Hero itself keeps phone always present — sticky films teach the product differently.

### 5.3 Cursors

Reuse patterns (thin copies under feature-films, not imported from hero file internals):

- Drag flight (Cart optional; Journey COD required)  
- Publish / Send / Save click pulse  
- Pay tap (Journey COD only)

### 5.4 Sticky stage size

- Target height ~420–470px to match hero presence inside sticky column.  
- Mobile: stack phone below or hide phone and extend desktop-only beats (same reduced story). Prefer hide phone under 640px and skip phone beats.

---

## 6. File / integration map

| File | Change |
|------|--------|
| `HomeStickyStories.tsx` | New STORIES copy + `FeatureFilm` |
| `productDemoVideos.ts` | Leave for other pages; sticky stops depending on it |
| `HeroJourneyStage.tsx` | **No behavior change** |
| `home.css` | Do not alter hero cam presets; add film CSS file or isolated section |
| Feature pages | Unchanged in v1 |

---

## 7. Build order (fast path)

1. Kit: `FilmStage` + `useFilmTimeline` + phone slide + IO  
2. Journey COD film (max reuse of known UI)  
3. Cart Recovery film (same journey chrome, different nodes)  
4. Pixel + Insights film  
5. Stock monitor film  
6. Warranty film  
7. Wire `HomeStickyStories` + remove IG/scoring/shipping stories  
8. Mobile / reduced-motion polish  

---

## 8. Success criteria

- Hero film looks and loops identical to pre-change.  
- Sticky section shows 5 UI films, zero Instagram claims.  
- Each film: desktop-first storytelling; phone only where specified.  
- Scroll performance: ≤1 active timeline.  
- Feature pages still work (videos) until a later pass.

---

## 9. Out of scope (v1)

- Replacing `/features` and solution-page videos  
- Extracting/refactoring `HeroJourneyStage` internals beyond optional shared primitives if strictly needed (prefer duplicate thin shells over risky hero edits)  
- Real dashboard data / live API  
- Instagram automation demos  
```
