# Sticky Feature Films Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace homepage sticky demo videos with five short UI films that reuse the hero desktop/camera/phone language, without changing `HeroJourneyStage` behavior.

**Architecture:** New `feature-films/` kit (`FilmStage`, `useFilmTimeline`, `FilmPhone`, per-film components). `HomeStickyStories` mounts `<FeatureFilm id=… />`. Hero file untouched. Only one film timeline runs at a time via IntersectionObserver.

**Tech Stack:** React + TypeScript, existing marketing CSS patterns (`.hero-duo` camera vars mirrored as `.film-stage`), no GSAP, `setTimeout` beat runner.

**Spec:** `docs/superpowers/specs/2026-09-08-sticky-feature-films-design.md`

## Global Constraints

- Do not modify `HeroJourneyStage.tsx` timeline, beats, or camera behavior.
- No Instagram marks or copy in sticky stories/films.
- Brand continuity: Glow Skin Co · Vitamin C Serum · `#TE-1042` · ₹1,899.
- Sticky films only on homepage v1; feature pages keep videos.
- Prefer-reduced-motion: static final beat, no looping timeouts.
- Camera easing: `transform 1.15s cubic-bezier(0.33, 0.12, 0.22, 1)`.
- Phone starts hidden and slides in only where the film script says so.

---

## File map

| Path | Responsibility |
|------|----------------|
| `src/marketing/components/home/feature-films/types.ts` | `FeatureFilmId`, `FilmBeat`, cam unions |
| `src/marketing/components/home/feature-films/useFilmTimeline.ts` | Beat runner + reduced motion |
| `src/marketing/components/home/feature-films/FilmStage.tsx` | Desktop chrome + lens + phone slot |
| `src/marketing/components/home/feature-films/FilmPhone.tsx` | WhatsApp phone shell |
| `src/marketing/components/home/feature-films/FeatureFilm.tsx` | id → film + in-view gate |
| `src/marketing/components/home/feature-films/films/*.tsx` | Five film UIs + timelines |
| `src/marketing/styles/feature-films.css` | Stage, cams, phone enter, sticky fit |
| `src/marketing/components/home/HomeStickyStories.tsx` | New STORIES + FeatureFilm |
| Marketing CSS entry (existing import site) | Import `feature-films.css` |

---

### Task 1: Types + timeline hook

**Files:**
- Create: `src/marketing/components/home/feature-films/types.ts`
- Create: `src/marketing/components/home/feature-films/useFilmTimeline.ts`

**Interfaces:**
- Produces: `FeatureFilmId`, `FilmBeat`, `useFilmTimeline({ beats, active, reducedMotion }) → { beat, cam, flags }`

- [ ] **Step 1: Add types**

```ts
// types.ts
export type FeatureFilmId =
  | 'cart-recovery'
  | 'journey-cod'
  | 'pixel-insights'
  | 'stock-monitor'
  | 'warranty';

export type PhonePresence = 'hidden' | 'enter' | 'visible';

export type FilmBeat = {
  ms: number;
  cam: string;
  phone?: PhonePresence;
  /** Arbitrary flags read by film UI, e.g. published: true */
  flags?: Record<string, boolean | number | string>;
};
```

- [ ] **Step 2: Implement `useFilmTimeline`**

Behavior:
- If `!active` or `reducedMotion`: stay on last beat (or beat 0 if never started — use last when reducedMotion).
- If `active`: start at 0, advance with `setTimeout(beat.ms)`, loop to 0 after last.
- Clear timeouts on unmount / when `active` flips false.
- Return `{ beatIndex, beat, cam: beat.cam, phone: beat.phone ?? 'hidden', flags: beat.flags ?? {} }`.

- [ ] **Step 3: Sanity-check in isolation**

Temporarily verify: active true advances; active false stops; reducedMotion sticks on last.

- [ ] **Step 4: Commit**

```bash
git add src/marketing/components/home/feature-films/types.ts \
  src/marketing/components/home/feature-films/useFilmTimeline.ts
git commit -m "feat(films): add feature film timeline types and hook"
```

---

### Task 2: FilmStage + FilmPhone + CSS shell

**Files:**
- Create: `src/marketing/components/home/feature-films/FilmStage.tsx`
- Create: `src/marketing/components/home/feature-films/FilmPhone.tsx`
- Create: `src/marketing/styles/feature-films.css`
- Modify: whichever file already imports `home.css` (add `feature-films.css` import beside it)

**Interfaces:**
- Consumes: `cam: string`, `phone: PhonePresence`, `url?: string`, `children` (desktop body), `phoneChildren`
- Produces: visual stage matching hero desktop chrome; phone slide states

- [ ] **Step 1: Write CSS**

Include at minimum:
- `.film-stage` height ~450px, overflow visible, cam CSS vars defaulted like hero
- `.film-stage__lens` transform contract (copy hero lens transition)
- Cam presets: reuse hero names (`is-cam-wide`, `is-cam-node-entry|mid|end`, `is-cam-drag`, `is-cam-publish`, `is-cam-order`, `is-cam-paid`) with **same numeric values as** `home.css` lines ~847–921
- New cams from spec: `is-cam-pixel`, `is-cam-insights`, `is-cam-insights-kpi`, `is-cam-stock-row`, `is-cam-draft`, `is-cam-supplier`, `is-cam-send`, `is-cam-warranty`, `is-cam-save`
- `.film-stage__phone` states: `[data-phone=hidden|enter|visible]`
- `@media (max-width: 640px)`: hide phone; stage still works

- [ ] **Step 2: Implement `FilmStage`**

Structure:

```
.film-stage.is-cam-*
  .film-stage__lens
    .film-stage__pair
      .film-stage__desktop (chrome dots + url + children)
      .film-stage__phone[data-phone] (FilmPhone or slot)
```

Apply `cam` as className on root. Pass `phone` to phone wrapper.

- [ ] **Step 3: Implement `FilmPhone`**

WhatsApp-looking chrome: notch, green header (prop `title`), scrollable body `children`. Keep visually close to `.hero-duo__phone` but under `.film-stage__phone` classes so hero CSS is untouched.

- [ ] **Step 4: Import CSS and visually check empty stage**

- [ ] **Step 5: Commit**

```bash
git add src/marketing/components/home/feature-films/FilmStage.tsx \
  src/marketing/components/home/feature-films/FilmPhone.tsx \
  src/marketing/styles/feature-films.css
git commit -m "feat(films): add FilmStage shell, phone, and camera CSS"
```

---

### Task 3: FeatureFilm router + in-view gate

**Files:**
- Create: `src/marketing/components/home/feature-films/FeatureFilm.tsx`
- Create: `src/marketing/components/home/feature-films/films/PlaceholderFilm.tsx` (temporary)

**Interfaces:**
- Consumes: `id: FeatureFilmId`
- Produces: only active when ≥45% visible; maps id → film component

- [ ] **Step 1: IO wrapper**

```tsx
export default function FeatureFilm({ id }: { id: FeatureFilmId }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setActive(e.isIntersecting && e.intersectionRatio >= 0.45),
      { threshold: [0, 0.45, 0.6, 1] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Film = FILM_MAP[id];
  return (
    <div ref={ref} className="film-stage-host">
      <Film active={active} />
    </div>
  );
}
```

- [ ] **Step 2: Placeholder film** uses `useFilmTimeline` + `FilmStage` with 2 beats so wiring is testable.

- [ ] **Step 3: Commit**

```bash
git add src/marketing/components/home/feature-films/FeatureFilm.tsx \
  src/marketing/components/home/feature-films/films/PlaceholderFilm.tsx
git commit -m "feat(films): add FeatureFilm in-view router"
```

---

### Task 4: Journey COD film (ship first real film)

**Files:**
- Create: `src/marketing/components/home/feature-films/films/JourneyCodFilm.tsx`
- Modify: `FeatureFilm.tsx` map `journey-cod` → `JourneyCodFilm`
- Reference (read only): `HeroJourneyStage.tsx` JourneyDesktop / PhonePanel prepaid visuals

**Interfaces:**
- Consumes: `active: boolean`
- Produces: ~22s COD→prepaid loop per spec §4.2

- [ ] **Step 1: Encode TIMELINE** exactly from spec beats (ms/cam/phone/flags: `dragging`, `midPlaced`, `published`, `enrolled`, `payShown`, `paid`).

- [ ] **Step 2: Desktop mock** — Entry / drop / mid / End / Steps / Publish. Animate mid node when drag completes; toast when `enrolled`.

- [ ] **Step 3: Phone mock** — building pill → prepaid template Pay ₹1,799 → paid modal when `paid`.

- [ ] **Step 4: Cursors** — publish click + pay tap (CSS/absolute). Optional drag flight; if skipped, auto-place mid node on drag beat.

- [ ] **Step 5: Manual test** — confirm hero homepage top still identical after wiring.

- [ ] **Step 6: Commit**

```bash
git add src/marketing/components/home/feature-films/films/JourneyCodFilm.tsx \
  src/marketing/components/home/feature-films/FeatureFilm.tsx
git commit -m "feat(films): add Journey COD prepaid sticky film"
```

---

### Task 5: Cart Recovery film

**Files:**
- Create: `src/marketing/components/home/feature-films/films/CartRecoveryFilm.tsx`
- Modify: `FeatureFilm.tsx` map

**Beats:** Spec §4.1 — abandoned cart 3-message journey → phone templates → Recovered toast.

- [ ] **Step 1: Timeline + journey nodes** (Cart abandoned → waits → nudges → End).

- [ ] **Step 2: Phone templates** with product image `/marketing/products/vitamin-c-serum.jpg`.

- [ ] **Step 3: Wire map + commit**

```bash
git commit -m "feat(films): add abandoned cart recovery sticky film"
```

---

### Task 6: Pixel + Insights film

**Files:**
- Create: `src/marketing/components/home/feature-films/films/PixelInsightsFilm.tsx`
- Modify: `FeatureFilm.tsx` map
- Modify: `feature-films.css` ensure pixel/insights cams exist

**Grammar:** desktop-only (`phone` always hidden / omit phone slot).

- [ ] **Step 1: Dual panel UI** — pixel events ticker + insights table; count-ups on insights-kpi beat.

- [ ] **Step 2: Timeline per spec §4.3**.

- [ ] **Step 3: Commit**

```bash
git commit -m "feat(films): add website pixel and product insights film"
```

---

### Task 7: Stock monitor film

**Files:**
- Create: `src/marketing/components/home/feature-films/films/StockMonitorFilm.tsx`
- Modify: `FeatureFilm.tsx` map

**Beats:** Spec §4.4 — low stock → draft → supplier → send → phone.

Draft copy verbatim:

> Hi Raj, Vitamin C Serum is at 8 units. Please send **50 units** by Friday.

- [ ] **Step 1: Inventory + drawer + phone supplier thread**.

- [ ] **Step 2: Commit**

```bash
git commit -m "feat(films): add low-stock supplier alert film"
```

---

### Task 8: Warranty film

**Files:**
- Create: `src/marketing/components/home/feature-films/films/WarrantyFilm.tsx`
- Modify: `FeatureFilm.tsx` map; remove Placeholder if unused

**Beats:** Spec §4.5 — assign warranty → phone claim note.

- [ ] **Step 1: Product panel + toggle/fields/badge + phone message**.

- [ ] **Step 2: Commit**

```bash
git commit -m "feat(films): add product warranty assignment film"
```

---

### Task 9: Wire HomeStickyStories (replace videos + drop IG stories)

**Files:**
- Modify: `src/marketing/components/home/HomeStickyStories.tsx`

- [ ] **Step 1: Replace STORIES** with five entries matching spec copy; each has `filmId: FeatureFilmId`.

```ts
const STORIES = [
  {
    filmId: 'cart-recovery',
    titleLead: 'WhatsApp Abandoned',
    titleAccent: 'Cart Recovery',
    body: 'Recover checkouts with timed WhatsApp nudges the moment a shopper leaves items behind.',
    cta: 'Start free',
  },
  {
    filmId: 'journey-cod',
    titleLead: 'Drag-and-Drop',
    titleAccent: 'Journey Builder',
    body: 'Build COD → prepaid recovery on a visual canvas—wait, branch, and message from one place. Convert before it ships.',
    cta: 'Start free',
  },
  {
    filmId: 'pixel-insights',
    titleLead: 'Website Pixel &',
    titleAccent: 'Product Insights',
    body: 'See which products drive WhatsApp revenue—pixel on your storefront, insights in one dashboard.',
    cta: 'Start free',
  },
  {
    filmId: 'stock-monitor',
    titleLead: 'Low-Stock',
    titleAccent: 'Supplier Alerts',
    body: 'When inventory nears empty, TopEdge drafts the restock message, lets you add a supplier, and sends exactly how many units you need.',
    cta: 'Start free',
  },
  {
    filmId: 'warranty',
    titleLead: 'Assign Product',
    titleAccent: 'Warranty',
    body: 'Attach warranty terms to products you sell—duration, coverage, and a WhatsApp claim path customers actually use.',
    cta: 'Start free',
  },
] as const;
```

- [ ] **Step 2: Render `<FeatureFilm id={story.filmId} />` instead of `ProductDemoVideo`.**

- [ ] **Step 3: Remove unused `PRODUCT_DEMO_VIDEOS` / `ProductDemoVideo` imports from this file only (leave data file for other pages).

- [ ] **Step 4: Manual QA checklist**
  - [ ] Hero duo film unchanged (full loop)
  - [ ] Five sticky films; no IG / lead scoring / shipping-only block
  - [ ] One film plays at a time while scrolling
  - [ ] Mobile: no broken overflow; phone hidden OK
  - [ ] `prefers-reduced-motion`: static end states

- [ ] **Step 5: Commit**

```bash
git commit -m "feat(home): replace sticky videos with feature UI films"
```

---

### Task 10: Polish pass

**Files:**
- Modify: `feature-films.css`, individual films as needed

- [ ] **Step 1: Align sticky stage width/height with `.home-sticky__static-scene`.**
- [ ] **Step 2: Ensure phone enter animation does not clip (`overflow: visible` on host).**
- [ ] **Step 3: Remove any leftover PlaceholderFilm.**
- [ ] **Step 4: Final visual pass all five loops.**
- [ ] **Step 5: Commit**

```bash
git commit -m "polish(films): sticky stage sizing, phone enter, motion prefs"
```

---

## Self-review (plan vs spec)

| Spec requirement | Task |
|------------------|------|
| Shared kit, hero untouched | 1–3 |
| Cart Recovery film | 5 |
| Journey COD film | 4 |
| Pixel + Insights | 6 |
| Stock monitor | 7 |
| Warranty | 8 |
| Wire sticky + remove IG stories | 9 |
| Camera/phone grammar | 2 + per-film |
| Feature pages later | API in FeatureFilm; no page work |

No TBD placeholders. Beat tables live in the spec; implementers copy ms/cam/phone into each film’s `TIMELINE` constant.
