# Unified Customer Identity Feature Moment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Unified Customer Identity as a centered sticky feature moment with `leaadd.png`, and remove it from the CRM bento.

**Architecture:** Extend `HomeStickyStories` to support image or video media per story; reuse `DemoProductImageFrame`. Drop `CRM_BENTO.identity` and reflow the remaining three tiles in CSS.

**Tech Stack:** React + TypeScript, existing marketing CSS (`home.css`, `demo-video.css`)

## Global Constraints

- Copy locked from spec (title + body verbatim).
- Placement: last sticky moment, after Opt-in Popup.
- Glow: `violet`.
- Asset path: `/leaadd.png` (already in `public/`).
- Do not commit unless the user asks.

---

### Task 1: Media data — feature image + drop identity bento

**Files:**
- Modify: `src/marketing/data/homeFeatureMedia.ts`

**Interfaces:**
- Produces: `FEATURE_IMAGES.unifiedIdentity` as `{ src: string }` with `src: '/leaadd.png'`
- Produces: `CRM_BENTO` without `identity` key (only `profiles`, `segments`, `warranty`)

- [ ] **Step 1: Add FEATURE_IMAGES and remove identity from CRM_BENTO**

```ts
export const FEATURE_IMAGES = {
  unifiedIdentity: {
    src: '/leaadd.png',
  },
} as const;

export const CRM_BENTO = {
  profiles: { /* unchanged */ },
  segments: { /* unchanged */ },
  warranty: { /* unchanged */ },
} as const;
```

- [ ] **Step 2: Verify TypeScript still typechecks consumers**

Run: check that `HomeCrmSurface` will be updated in Task 3 to stop destructuring `identity`.

---

### Task 2: Sticky story — image moment after Opt-in

**Files:**
- Modify: `src/marketing/components/home/HomeStickyStories.tsx`
- Uses: `src/marketing/components/home/demo/DemoProductImageFrame.tsx` (already exists)

**Interfaces:**
- Consumes: `FEATURE_VIDEOS`, `FEATURE_IMAGES`, `DemoVideo`
- Story media union:
  - `{ kind: 'video'; video: DemoVideo }`
  - `{ kind: 'image'; image: { src: string } }`

- [ ] **Step 1: Extend Story type and render path**

```tsx
import DemoProductImageFrame from './demo/DemoProductImageFrame';
import { FEATURE_VIDEOS, FEATURE_IMAGES, type DemoVideo } from '../../data/homeFeatureMedia';

type Story = {
  id: string;
  titleLead: string;
  titleAccent: string;
  body: string;
  glow: Glow;
} & (
  | { kind: 'video'; video: DemoVideo }
  | { kind: 'image'; image: { src: string } }
);
```

Existing stories get `kind: 'video'`. Append:

```ts
{
  id: 'unified-identity',
  titleLead: 'Unified Customer',
  titleAccent: 'Identity',
  body: 'Primary + secondary numbers and multiple emails collapse into one lead — so every chat and order stays on the same shopper.',
  glow: 'violet',
  kind: 'image',
  image: FEATURE_IMAGES.unifiedIdentity,
},
```

In `FeatureMoment`, branch: video → `DemoProductVideoFrame`; image → `DemoProductImageFrame` with `alt={`${story.titleLead} ${story.titleAccent}`}`.

- [ ] **Step 2: Visual check in browser** — scroll past Opt-in; identity moment shows centered title + image glow frame.

---

### Task 3: CRM bento — remove identity + reflow

**Files:**
- Modify: `src/marketing/components/home/HomeCrmSurface.tsx`
- Modify: `src/marketing/styles/home.css` (`.home-crm__*` grid rules)

**Interfaces:**
- Consumes: `CRM_BENTO` with only `profiles | segments | warranty`
- CSS:
  - `.home-crm__tile--profiles` → `grid-column: 1 / span 12; grid-row: 1;`
  - segments / warranty unchanged on row 2
  - Delete `.home-crm__tile--identity` rules and mobile identity selectors
  - Drop identity from identity+warranty shared img rule (keep warranty-only)

- [ ] **Step 1: Update HomeCrmSurface** — destructure `{ profiles, segments, warranty }`; render three tiles only.

- [ ] **Step 2: Update home.css grid** as above.

- [ ] **Step 3: Visual check** — CRM section has no empty hole; mobile stacks three tiles.

---

### Task 4: End-to-end verify

- [ ] Confirm homepage: six video moments + identity image moment + 3-tile CRM.
- [ ] No TS/lint errors on touched files.
- [ ] No leftover references to `CRM_BENTO.identity` or `home-crm__tile--identity` in components (CSS cleanup complete).
