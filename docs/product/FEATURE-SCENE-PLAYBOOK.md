# TopEdge Feature Scene Playbook

**Purpose:** Instantly-style marketing visuals and crisp copy for TopEdge.

**Copy rules (must follow):** see `.cursor/rules/marketing-copy.mdc`

- No em dashes (`—`)
- No filler eyebrows / trust-pill strips / duplicate brand under nav
- Homepage shows only what matters; detail lives on `/features/*`
- Wider subheads, shorter height

**Status:** Homepage curated to 5 Instantly blocks + connect rail (Jul 2026 visual pass).


**Related files today:**
- `src/marketing/components/foundation/FeatureScene.tsx`
- `src/marketing/components/foundation/ExtraFeatureScenes.tsx`
- `src/marketing/components/foundation/ScenePrimitives.tsx`
- `src/marketing/styles/feature-scenes.css`
- Consumed by `HomeHero.tsx`, `HomeFeatureShowcase.tsx`

---

## 1. The core idea (how to think)

Instantly does **not** show full product screenshots. They show a **story of one feature**:

| Bad (what we killed) | Good (what Instantly does / what we do) |
|---|---|
| Browser chrome + URL + sidebar letters | No browser frame |
| Full dashboard screenshot / PNG | HTML/CSS distilled UI cards |
| Same layout for every section | Unique composition per feature job |
| Dense admin UI | 1 job, 2–4 floating pieces, lots of air |
| Flat white page behind UI | Soft brand gradient “stage” |
| Looks like a cropped SS | Looks like a marketing hero graphic |

**One sentence rule:**  
*If removing the nav still looks like a random admin panel, it failed. If a stranger can name the feature from the graphic alone, it passed.*

**Brand test for TopEdge scenes:**
- Violet `#7C3AED`, soft wash `#efeaf8` / lilac gradients
- Titles **medium (500)**, never heavy bold display fonts
- India-real copy: ₹, COD, Meta utility, Shopify events
- Rounded, soft shadows, slight tilt / float — Apple-adjacent, not neon AI kitsch

---

## 2. What we actually used (tech)

| Layer | Choice | Why |
|---|---|---|
| Markup | React TSX (`FeatureScene` + variants) | Real UI, not PNGs — sharp at any size, easy to tweak copy |
| Layout | Absolute / overlapping cards inside a relative canvas | Instantly’s “floating stack” depth |
| Stage | CSS multi-stop gradients + radial washes | Atmosphere without photo stock |
| Motion | CSS `@keyframes` float (subtle Y + 1–2° rotate) | Presence, not noise; `prefers-reduced-motion` off |
| Icons | `lucide-react` thin stroke (~1.75) | Clean, not emoji / not heavy fill icons |
| Type | Inter / system UI stack, `font-medium` | Matches product; no Outfit |
| No images required | Optional product thumb = CSS gradient square | Faster, consistent brand |
| Shared primitives | `.fs-stage`, `.fs-card`, `.fs-btn`, `.fs-chip`, `.fs-bubble`, `.fs-srow`, `.fs-cflow` / `.fs-cnode`, `.fs-stepper` | Same language, different layouts |

**We do not use:** generated dashboard PNGs, `ProductFrame` browser chrome, inset media cards, pill-stat strips in the hero, dark-mode glow stacks.

### Card-interior primitives (Jul 2026 visual pass)

| Primitive | Classes / components | Use when |
|---|---|---|
| **Structured row** | `.fs-srow` + `FsSRow` | Label + value (or status) instead of paragraph body text inside a card |
| **Connected node** | `.fs-cflow` / `.fs-cnode` / `.fs-cflow__link` + `FsCFlow` | Sequential or branching flow with a thin line + junction dots |
| **Sequence stepper** | `.fs-stepper` + `FsStepper` | “Step N of M” as segments (e.g. follow-up 2 of 3) |

**Note:** `.fs-glass-node` is icon + label only. It does **not** include connector lines. Hero previously used a separate `.fs-hero__wire`; prefer `FsCFlow` for new flows.

---

## 3. Anatomy of one scene (always)

Every scene has the same **system**, different **composition**:

```
┌─────────────────────────────────────────────┐
│  STAGE (gradient + radius 28px + soft shadow) │
│                                             │
│     ┌──────────┐        ┌────────────────┐  │
│     │ PIECE A  │  overlap│   PIECE B      │  │
│     │ (support)│         │   (hero focus) │  │
│     └──────────┘         └────────────────┘  │
│              ○ chip / node / line (optional) │
└─────────────────────────────────────────────┘
```

### 3.1 Stage
- Soft brand gradient (violet / lilac / deep violet variants)
- `border-radius: ~28px`, generous padding
- Soft outer shadow so it floats on the marketing page
- `overflow: hidden` on stage; cards clip cleanly inside

### 3.2 Pieces (2–4 max)
Pick pieces from this **palette** — mix differently per feature:

1. **Focus card** — main claim + one interactive-looking control (search, send, continue)
2. **Support list / filter card** — steps, threads, filters, sequence
3. **Connected node chain** — workflow story via `FsCFlow` (Shopify → wait → WA); junction dots required
4. **Message bubble** — WhatsApp-shaped preview; advice / list content stays **inside** the bubble (`.fs-bubble__rows` + `.fs-srow`)
5. **Status chip** — Active / Live / Delivered · Meta utility (inside a card corner, not randomly overlapping buttons)
6. **Form / setup panel** — rows + stepper (not dense paragraphs)

### 3.3 Layout rules that fixed our UI bugs
- Action rows: `flex` + `min-width: 0` on input + `flex-shrink: 0` on button — **never** let Send escape the card
- Chips that belong to a card live **inside** that card (e.g. top-right), not floating over the CTA
- Cards: radius **~28px**; inputs/buttons: **pill / 9999** or **18–20px**
- Cards: `overflow: hidden` + `box-sizing: border-box`
- Mobile: stack pieces vertically; kill absolute overlap under ~640px

### 3.4 Motion budget
- 2–3 motions max per scene (float A, float B, optional chip)
- Amplitude small (4–8px). No bounce spam.

### 3.5 Copy rules
- One headline job per focus card
- Real TopEdge language (templates, Meta, COD, ₹)
- No “Coming soon” on marketing scenes
- Illustrative names (Priya, Vitamin C serum) OK if labeled sample where needed

---

## 4. Design process for a NEW feature (do this every time)

Do **not** start in Figma cloning cart-recovery. Follow this order:

### Step A — Name the job
Write one line: *“This graphic must prove that TopEdge does X.”*  
Example: Cart recovery → *timed 3-message Shopify→WA sequence with Meta template.*

### Step B — Pick the story shape
Choose **one** composition family (see §5). Different features must pick different families when possible.

### Step C — Distill to 3 truths
Only three facts survive into UI. Everything else is noise.

### Step D — Sketch pieces
List 2–4 pieces + where they sit (left tilt / right focus / bottom chain).

### Step E — Build in HTML/CSS
Use shared `.fs-*` primitives; add a **new layout class** (`fs-flow__*`, `fs-camp__*`, etc.) — do not reuse `fs-cart__*` for unrelated features.

### Step F — Pass the Instantly checks
- [ ] No browser chrome / sidebar letters
- [ ] Feature readable without page copy
- [ ] Buttons stay inside cards
- [ ] Rounded consistently
- [ ] Looks different from the last section’s scene
- [ ] Mobile stacks cleanly

---

## 5. Composition families (reuse families, not layouts)

Use these **shapes** across the site. Same family can appear twice only if content and arrangement clearly differ.

| Family | Instantly analogue | Best for |
|---|---|---|
| **A · Sequence + preview** | Leads Finder filters + search | Cart recovery, campaigns, sequences |
| **B · List + detail** | Dual cards | Inbox, audience, analytics drill-in |
| **C · Chat + workflow nodes** | AI chat + glass nodes + setup | Flow Builder, order messages, AI Brain |
| **D · Canvas / nodes** | Automation graph snippet | Flow Builder hero, journey map |
| **E · Broadcast frame** | Campaign composer | Campaigns, Meta Manager templates |
| **F · Catalog / commerce** | Product grid + action | Store engine, catalog sync |
| **G · Insight strip** | Metric focus + sparkline card | Analytics, dashboard KPI |
| **H · Connect / setup** | OAuth + continue | Settings, Meta Manager QR |

**Anti-pattern:** Family A for every homepage section. That’s what felt “same everywhere.”

---

## 6. Unique scene recipes (per TopEdge feature)

Each recipe is **different on purpose**. Implement as separate variants in `FeatureScene` (or `scenes/*.tsx` if the file grows).

### Homepage stories (ship first — already partially live)

#### `hero` — Homepage first viewport (Instantly-style board, not Family C cards)
- **Job:** One composition — brand + promise + ask + proof. Feature scenes live in story blocks below.
- **Pieces:** Violet gradient board · TopEdge brand · Headline with real WhatsApp + Shopify marks · CTA · Ask field + 3 mode pills (Recover / Reply / Journey) · Mode-switched proof card · Trusted-by strip inside the board.
- **Not:** The old 3-card `FeatureScene variant="hero"` (still available on `/features` “How it feels”).
- **Status:** Live on `HomeHero`.

#### `cart-recovery` — Family A
- **Job:** Prove 3-message recovery with Meta template.
- **Pieces:** Trigger card (product + structured rows) · Sequence card (`FsStepper` + `FsCFlow` + three `FsSRow`s) · WhatsApp outcome bubble.
- **Stage:** Rose (`fs-stage--rose`).
- **Status:** Live as first homepage story.

#### `inbox` — Family B
- **Job:** Prove unified inbox + Shopify Customer 360.
- **Pieces:** Left thread list · Center live thread · Right order card with structured status rows.
- **Stage:** Mint (`fs-stage--mint`).
- **Differentiate:** No sequence list; conversation + order stats only. Light-touch in Jul 2026 pass.

#### `ai-brain` — Family C (homepage story #3)
- **Job:** Catalog + policy grounded replies and intent routing (capability the hero chat implies).
- **Pieces:** Chat with structured rows **inside** the AI bubble · Knowledge card (`FsSRow` sources) · compact `FsCFlow` (Ask → Route → Catalog).
- **Stage:** Orchid (`fs-stage--orchid`).
- **Why a 5th story (not connect-rail):** Needs visual proof of grounded chat; rail cards cannot show bubble + knowledge. Connect rail stays for Shopify / Meta / IG / Analytics.

#### `journey` — Family D (flow canvas)
- **Job:** Prove visual Journey builder (not order-message forms).
- **Pieces:** Trigger with structured event row · Canvas `FsCFlow` + COD branch row · WhatsApp outcome.
- **Stage:** Indigo (`fs-stage--indigo`).
- **Status:** Live — replaces Order messages on homepage.

#### `flow-builder` — Family D (+ light C)
- **Job:** AI form → editable flow → publish.
- **Pieces:** Form `FsSRow`s · Canvas `FsCFlow` · Publish trigger rows.
- **Stage:** Champagne (`fs-stage--champagne`).

#### `order-messages` — REMOVED from marketing
- Replaced by **Journey**. Keep route alias only if needed for old links.

---

### Feature pages & module index (unique — design before code)

#### `dashboard` — Family G
- **Job:** One glance: recovery ₹ + open chats.
- **Pieces:** Large KPI card (“₹1.2L recovered · 7d”) · Small sparkline / two mini metrics floating behind · chip “Live store”.
- **Do not:** Full sidebar dashboard SS.

#### `analytics` — Family G (recovery-first)
- **Job:** Recovery ₹, not vanity charts.
- **Pieces:** Funnel as structured rows + `FsCFlow` (Sent → Read → Clicked → Paid) · chip “Honest Meta costs”.
- **Differentiate from dashboard:** Funnel story, not multi-KPI grid.

#### `audience` — Family B
- **Job:** Segments + cart leads.
- **Pieces:** Left filter list (LTV, COD risk, Abandoned) · Right profile card (Priya · score · last cart).
- **Differentiate from inbox:** CRM filters + score, not live messages.

#### `campaigns` — Family E
- **Job:** Meta-safe broadcast.
- **Pieces:** Composer card (audience count + template name) · Preview bubble · chip “Marketing · ~₹0.88”.
- **Differentiate from cart-recovery:** Broadcast audience + category rate, not 3-step delay list.

#### `store-engine` / `shopify` — Family F / H
- **Job:** Products / carts / tracking from Shopify.
- **Pieces:** Connect card with structured OAuth rows · Live sync metrics as `FsSRow`s · chip “Source of truth: Shopify”.

#### `meta-manager` — Family E or H
- **Job:** Templates, catalog, QR.
- **Pieces:** Template rows (Approved / Pending) · QR card · chip “You approve every template”.

#### `instagram` — Family A/B hybrid
- **Job:** Comment / story → DM.
- **Pieces:** IG comment row · `FsCFlow` Comment → Auto DM → Live Chat · DM preview.
- **Differentiate:** IG chrome cues (gradient ring avatar), not Shopify order stats.

#### `settings` / connect — Family H
- **Job:** Shopify + Meta connect in ~15 min.
- **Pieces:** Two connect rows (Shopify Connected · WhatsApp Connect) · Continue CTA · progress “Step 1 of 3”.
- **Differentiate:** Setup checklist, not feature preview.

#### `meta-ads` — Family G
- **Job:** Attribution, not ad manager clone.
- **Pieces:** “WA purchase attributed” KPI · Campaign row · chip “Meta CAPI”.

#### `chat-rules` — Family C
- **Job:** Routing / smart rules.
- **Pieces:** Rule list (“If COD → assign Ops”) · Continue / Publish · small flow line.

#### `website-widget` — Family F-lite
- **Job:** Site chat widget.
- **Pieces:** Floating widget bubble on soft site mock · Open chat panel half-card.

---

## 7. Code organization (how to scale without sameness)

**Recommended structure when variants grow:**

```
src/marketing/components/foundation/scenes/
  CartRecoveryScene.tsx
  InboxScene.tsx
  OrderMessagesScene.tsx
  FlowBuilderScene.tsx
  CampaignsScene.tsx
  ...
  index.tsx          // FeatureScene(variant) switch
feature-scenes.css   // shared primitives + per-scene layout blocks
```

**Naming:**
- Shared: `.fs-stage`, `.fs-card`, `.fs-btn`, …
- Per scene layouts: `.fs-cart__*`, `.fs-inbox__*`, `.fs-flow__*`, `.fs-camp__*`, `.fs-brain__*`, …

**Variant enum** grows with features; homepage only imports the three it needs.

---

## 8. Where each scene appears

| Surface | Scenes |
|---|---|
| Home hero | Strongest P0 scene (`cart-recovery` or rotate later) |
| Home feature stories | All hubs in `featureStories` — unique scene each |
| Home module grid | Compact index + “edit in dashboard” reminder |
| `/features/[slug]` hero | That feature’s unique recipe only |
| Pricing | Optional one “value” scene — not a full product tour |

---

## 9. Do / Don’t checklist (paste into PRs)

**Do**
- Distill one feature job into 2–4 floating pieces
- Use TopEdge violet stages + medium type
- Keep CTAs inside cards; chips inside card corners
- Differ composition family from neighboring sections
- Stack on mobile

**Don’t**
- Paste cart-recovery HTML and change labels only
- Ship browser chrome / full sidebar dashboards
- Overflow buttons off card edges
- Crowdfill stats, schedules, or promo stickers on the stage
- Use Outfit / heavy geometric display fonts
- Generate PNG “screenshots” as the primary visual

---

## 10. Implementation order (suggested)

1. **Lock playbook** (this doc) ✓  
2. Differentiate homepage trio fully (cart / inbox / order) — tighten uniqueness  
3. Build P0 feature-page heroes: order-messages, inbox, flow-builder  
4. P1: campaigns, meta-manager, ai-brain, analytics, audience, instagram  
5. P2: store-engine, settings, meta-ads, chat-rules, website-widget  

Each item = new recipe from §6, not a restyle of cart-recovery.

---

## 11. Why this works (the thinking, short)

1. **Marketing ≠ product UI.** Product UI teaches operators; marketing UI sells one belief in one glance.  
2. **Depth beats density.** Overlap + gradient + soft shadow reads “premium”; more panels read “screenshot.”  
3. **Structure follows job.** A sequence feature needs a sequence list; a flow feature needs nodes; an inbox needs threads. Same primitives, different grammar.  
4. **Code > PNG.** Editable, Retina-sharp, brand-consistent, no regenerate loop.  
5. **Constraint creates quality.** Max 4 pieces, one job, Instantly checks — forces Instantly-level clarity.

---

*Owner: marketing frontend. Update this doc when a new scene family ships or a recipe changes.*
