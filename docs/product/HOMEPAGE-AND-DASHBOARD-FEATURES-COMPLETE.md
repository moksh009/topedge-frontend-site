# TopEdge Homepage + Dashboard Features — Complete Detail Doc

**Date:** 2026-07-22  
**Repo:** `topedge-frontend-site-update-pricing/` (marketing site)  
**Product SSOT for dashboard hubs:** `docs/TOPEDGE-SYSTEM-REFERENCE.md`  
**Scene method:** Instantly.ai–style distilled UI (HTML/CSS cards on gradient stages, not dashboard screenshots)

This file documents:

1. Everything on the **marketing homepage** (copy, UI structure, how feature “images” / scenes are built)
2. **All product features** shown on the marketing site
3. **All dashboard / product hubs** in the live TopEdge app

---

## 1. Homepage — page structure (top → bottom)

**File:** `src/pages/Home.tsx`  
**Styles:** `src/marketing/styles/home.css`, `src/marketing/styles/feature-scenes.css`  
**Copy data:** `src/marketing/data/home.ts`

| # | Section | Component | Purpose |
|---|---------|-----------|---------|
| 1 | Hero | `HomeHero.tsx` | Brand headline, CTAs, trust logos, hero scene |
| 2 | Feature stories (×4) | `HomeFeatureShowcase.tsx` | Instantly-style blocks: title + body + CTA + unique scene |
| 3 | Connect your stack | same file | Integration rail (Shopify, Meta, IG, Analytics) |
| 4 | How it works | `HomeHowItWorks.tsx` | 4-step connect → sell |
| 5 | Pricing preview | `HomePricingPreview.tsx` | DIY plans teaser |
| 6 | Testimonials | `HomeTestimonials.tsx` | 3 merchant quotes |
| 7 | FAQ | `HomeFaq.tsx` | Accordion from `faqs` |
| 8 | Close CTA | `HomeClose.tsx` | Final band |

**SEO**

- Title: `TopEdge | WhatsApp for Shopify India`
- Description: `Connect Shopify to WhatsApp. Recover carts, run Live Chat with order context, and automate journeys. Built for Indian D2C.`

**Design rules (copy + UI)**

- Brand violet `#7C3AED`
- Titles medium weight (500), Inter / system UI (no Outfit)
- No filler eyebrows, no “trust pill” strips of buzzwords
- No em dashes in marketing copy
- Homepage shows **only what matters**; deep hubs live on `/features/*`
- Cards must stay **elevated** (multi-layer shadows) — never flat

---

## 2. Homepage — all copywriting (verbatim)

### 2.1 Hero

| Element | Copy |
|---------|------|
| **H1** | Sell and support on WhatsApp, powered by Shopify |
| **Subhead** | Connect your store. Recover abandoned carts. Reply with order context. Live in about fifteen minutes. |
| **Primary CTA** | Start free → `/signup` |
| **Secondary CTA** | See product → `/features` |
| **Trust label** | Trusted by |

**Trusted logos (B&W marquee, right → left)**

| Brand | Asset | Source |
|-------|--------|--------|
| Go To Internet | `/public/trust/gotointernet.svg` | Minimal wordmark (public logo not found online) |
| Apex Light | `/public/trust/apex.png` | Official logo from apexlight.in |
| Delitech Smart Home | `/public/trust/delitech.png` | Official logo from delitechsmarthome.in |

UI: small grayscale logos (~22px height), soft fade edges, CSS marquee `home-trust-marquee` 28s linear infinite.

### 2.2 Feature story blocks (homepage only)

| ID | Title | Body | CTA | Detail link |
|----|-------|------|-----|-------------|
| `cart-recovery` | Recover carts on WhatsApp | Shopify abandon starts a 3-message sequence. Timed nudges with COD copy and Meta templates. | Start free | `/features/journeys` |
| `inbox` | Support beside the order | Pick a thread, reply on WhatsApp, and see the Shopify order (COD, status, LTV) beside it. | Start free | `/features/live-chat` |
| `journey` | Automate the journey | Shopify abandon starts a canvas: wait, branch on COD, then send WhatsApp or skip. | Start free | `/features/journeys` |
| `flow-builder` | AI form to Flow Builder | Fill niche and goals once. Get an editable WhatsApp flow, pick a trigger, publish. | Start free | `/features/flow-builder` |

Under each scene: **See product details** → feature page.

### 2.3 Connect your stack

| Element | Copy |
|---------|------|
| **Title** | Connect your stack |
| **Body** | Shopify, Meta, and Instagram. Edit live data in your dashboard. |
| **CTA** | Start free |
| **Footer link** | All product hubs → `/features` |

| Tool | Body | Action | Href |
|------|------|--------|------|
| Shopify | OAuth sync for products, carts, and orders. Edit catalog in your dashboard. | Connect | `/features/shopify` |
| Meta WhatsApp | Templates you approve. Clear utility and marketing rates. No markup. | Manage | `/features/meta-manager` |
| Instagram | Comment or story to DM, then continue in Live Chat. | Add | `/features/instagram` |
| Analytics | Sent, read, clicked, paid. Recovery rupees, not vanity charts. | Open | `/features/analytics` |

### 2.4 How it works

| Element | Copy |
|---------|------|
| **Title** | Connect. Approve. Publish. Sell. |
| **Subtitle** | Shopify data, Meta approvals, and operator control in four steps. |
| **Footer** | Explore product → `/features` |

| Step | Title | Description |
|------|-------|-------------|
| 01 | Connect Shopify and WhatsApp | OAuth your store and add WhatsApp credentials. About fifteen minutes. |
| 02 | Approve Meta templates | Create templates in Meta Manager. Nothing sends until Meta approves. |
| 03 | Build journeys and flows | Recovery on Journey canvas, or AI form into Flow Builder for chatbots. |
| 04 | Sell and support | Recover carts, run campaigns, and reply from Live Chat with honest metrics. |

### 2.5 Pricing preview (homepage)

| Element | Copy |
|---------|------|
| **Eyebrow** | Pricing |
| **Title** | Start free. Scale when WhatsApp pays for itself. |
| **Subtitle** | Clear DIY plans on the homepage. Full DFY and Meta rates live on the pricing page. |
| **Button** | Full pricing → |

**DIY plans shown**

| Plan | Price | Period feel | Description |
|------|-------|-------------|-------------|
| Lite | ₹799 | /mo | For stores testing WhatsApp as a recovery channel. |
| Pro | ₹1,999 | /mo | Full automation stack for growing D2C brands. (Most popular) |
| Scale | ₹4,499 | /mo | High-volume stores with advanced analytics. |

(DFY Launch / Growth / Enterprise exist on full pricing page, not homepage cards.)

### 2.6 Testimonials

| Quote (summary) | Who | Metric |
|-----------------|-----|--------|
| Cart recovery WA sequence: recovery 4% → 11% first month | Priya M., Founder, D2C skincare Mumbai | +7pp recovery |
| Support was 3 tabs → one inbox with order # and COD | Arjun K., Head of Ops, Fashion Bengaluru | 3 tabs → 1 |
| AI form built first Flow Builder bot in minutes | Neha S., Growth lead, F&B Delhi NCR | Minutes to first flow |

### 2.7 FAQ

| Question | Answer (summary) |
|----------|------------------|
| How long does setup take? | ~15 min connect; Meta template approval 24–48h; nothing sends until you approve |
| Do I need a developer? | No — OAuth Shopify, WA credentials, AI form flows, journeys without code |
| What about COD and Indian shipping? | COD status, ₹ totals, RTO-aware copy; India checkout patterns |
| How does Meta billing work? | Meta category rates; TopEdge passes through, no markup |
| Can my team reply manually? | Yes — Live Chat WA+IG with Shopify context; takeover pauses AI |
| Where do I change store data? | Shopify is source of truth; edit in dashboard |
| Is there a free trial? | 14-day trial, 250 contacts, 6,000 messages |

### 2.8 Close CTA band

| Element | Copy |
|---------|------|
| **Title** | Make WhatsApp part of your Shopify store |
| **Subtitle** | Connect Shopify, approve templates, and ship your first recovery workflow. |
| **Primary** | Start free → `/signup` |
| **Secondary** | See pricing → `/pricing` |

---

## 3. How homepage “images” / scenes are made (UI method)

### 3.1 Core idea

We do **not** use real dashboard screenshots or browser chrome.

We build **Instantly-style feature scenes**:

- Soft **gradient stage** (rounded ~28px)
- **2–4 floating white cards** with deep multi-layer shadows
- Distilled product UI (chat, sequence, canvas, order panel)
- Subtle float animations (`fs-float-a` / `fs-float-b`)
- One feature job readable **without** reading page copy

**Code**

| Layer | Path |
|-------|------|
| Scene router | `src/marketing/components/foundation/FeatureScene.tsx` |
| Extra scenes | `src/marketing/components/foundation/ExtraFeatureScenes.tsx` |
| Scene CSS | `src/marketing/styles/feature-scenes.css` |
| Playbook | `docs/product/FEATURE-SCENE-PLAYBOOK.md` |

**Primitives:** `.fs-stage`, `.fs-card`, `.fs-card--raised`, `.fs-bubble`, `.fs-btn`, `.fs-chip`, `.fs-product`, `.fs-glass-node`, etc.

### 3.2 Stage gradient palette (unique per scene)

| Class | Look | Used for |
|-------|------|----------|
| `fs-stage--hero` | White → brand violet | Homepage hero |
| `fs-stage--rose` | White → rose/red | Cart recovery |
| `fs-stage--mint` | White → teal/mint | Live Chat |
| `fs-stage--indigo` | White → indigo | Journey |
| `fs-stage--champagne` | White → amber/champagne | Flow Builder |
| `fs-stage--shopify` | White → green | Shopify scene |
| `fs-stage--orchid` | White → magenta orchid | AI Brain |
| `fs-stage--coral` | White → coral | Campaigns |
| `fs-stage--magenta` | White → pink/magenta | Instagram |
| `fs-stage--sky` | White → sky blue | Dashboard scene |
| `fs-stage--cyan` | White → cyan | Analytics |
| `fs-stage--azure` | White → azure blue | Meta Manager |
| `fs-stage--slate` | White → slate | Audience |

### 3.3 Homepage scene recipes (what each visual shows)

#### Hero (`variant="hero"`)

**Story:** Chat → flow nodes → WhatsApp outcome  

1. Left raised card: TopEdge assistant (“Help finish my cart recovery”) + warm sequence bullets + Ask input  
2. Center column: glass nodes Shopify cart → Wait 4h → WhatsApp (connected wires)  
3. Right raised card: Cart reminder to Priya, Vitamin C serum ₹2,840 COD, recovered today ₹18,420  

**Layout:** 3-column CSS grid (no overlap). Cards use `fs-card--raised` elevation.

#### Cart recovery (`cart-recovery`)

**Story:** Abandon → timed sequence → WhatsApp  

1. **Trigger** — Shopify cart abandoned (product + COD)  
2. **Recovery sequence** — Msg 1 Sent → Msg 2 Sending → Msg 3 Queued  
3. **To Priya** — live WA message + if checkout +₹2,840  

**Stage:** rose. Arrows between columns.

#### Live Chat (`inbox`)

**Story:** Inbox → thread → order beside chat  

1. **Inbox** — WA + IG threads (Priya open)  
2. **Thread** — real chat bubbles + Reply  
3. **Order #TE-1042** — Shopify panel (Packed, COD pending, LTV) + Send tracking  

**Stage:** mint. Green-tinted agent bubbles.

#### Journey (`journey`)

**Story:** Trigger → canvas → WhatsApp send  

1. **Trigger** — Shopify · Cart abandoned  
2. **COD recovery journey canvas** (inside raised card) — Wait 4h → COD available? → Send WhatsApp / Tag skip  
3. **WhatsApp send** — cart_reminder_v2 preview + branch taken Yes · COD  

**Stage:** indigo.

#### Flow Builder (`flow-builder`)

**Story:** AI form → generated flow → publish  

1. **AI form** — Niche + Goals → Generate flow  
2. **Flow Builder canvas** — Welcome → Catalog / FAQ → Agent handoff  
3. **Publish** — trigger chips (WhatsApp selected) → Publish flow  

**Stage:** champagne.

### 3.4 What we intentionally do **not** show on homepage

- Full product catalog of every hub (those live on `/features`)
- Browser chrome / fake dashboard screenshots
- Dense admin UI, sidebar letters, URL bars
- Flat white cards without shadow depth
- Same purple stage for every section

---

## 4. Marketing site — all features listed

### 4.1 On homepage (stories + connect rail)

1. Cart recovery (story)  
2. Live Chat / inbox (story)  
3. Journey (story)  
4. Flow Builder (story)  
5. Shopify (connect rail)  
6. Meta WhatsApp / Meta Manager (connect rail)  
7. Instagram automation (connect rail)  
8. Analytics (connect rail)  

### 4.2 Full marketing feature catalog (`MARKETING_FEATURES`)

Canonical pages under `/features/:slug`:

| Slug | Label | One-line job |
|------|-------|--------------|
| `shopify` | Shopify connection | OAuth store sync; products, carts, orders, COD |
| `journeys` | Journey | Visual trigger → wait → branch → WA send; COD conditions |
| `live-chat` | Live Chat | WA + IG inbox beside Shopify order context |
| `flow-builder` | Flow Builder | AI form → editable WhatsApp flow canvas |
| `ai-brain` | AI Brain | Catalog + policy grounded replies; intent routing |
| `campaigns` | Campaigns | Meta-safe broadcasts; honest ₹ rates |
| `instagram` | IG Automation | Comment/story → DM → Live Chat |
| `analytics` | Analytics | Sent → read → clicked → paid recovery funnel |
| `meta-manager` | Meta Manager | Templates, approval, QR; merchant-owned sends |
| `audience-crm` | Audience | Segments, scores, abandoned cart leads |
| `chat-rules` | Chat rules | Keyword/intent routing, assignment |

**Module index shorthand** (`modules` in `home.ts`): Dashboard, Shopify/Store, Live Chat, AI Brain, Analytics, Audience, Campaigns, Flow Builder, Journey, Meta Manager, IG Automation, Cart recovery.

---

## 5. Dashboard features — full product hubs

Source of truth: `docs/TOPEDGE-SYSTEM-REFERENCE.md` (merchant app at `dash.topedgeai.com`).

Below is the **operator-facing hub map**: what each area does, primary routes, and key capabilities.

### 5.1 Dashboard home — Part A

| | |
|--|--|
| **Route** | `/` (`EcommerceDashboard.jsx`) |
| **Job** | Store + Support KPIs at a glance |
| **Key UI** | Store / Support tabs, date filters, recovery ₹, charts, onboarding overlays |
| **Key data** | Workspace bundle, recovered revenue summary, Shopify recent orders, connection gates |

Includes: activation hints, connection banners, trial/setup banners, command palette (Cmd/Ctrl+K), LivePulse drawer.

### 5.2 Live Chat — Part B

| | |
|--|--|
| **Route** | `/conversations` (legacy `/live-chat`) |
| **Job** | Unified inbox for WhatsApp (+ website chat; IG when shipped) |
| **Key UI** | Thread list, conversation, CRM / Customer 360 sidebar, composer, assign, templates |
| **Key capabilities** | Order context beside chat, agent takeover, smart replies, export, summarize, channel tabs |

### 5.3 Intents hub (AI Brain) — Part C

| | |
|--|--|
| **Route** | `/intelligence-hub` (alias `/intents`) |
| **Job** | Intent engine + catalog-grounded AI routing |
| **Key UI** | Intent table/KPIs, Test intent modal (WA phone preview) |
| **Related settings** | `/settings?tab=ai` (keys + AI support), `persona`, `knowledge` |

### 5.4 Analytics / Insights Hub — Part D

| | |
|--|--|
| **Route** | `/insights-hub` (`?tab=analytics|agent-performance|delivery-rto`) |
| **Job** | Honest performance: recovery, agents, delivery/RTO |
| **Key UI** | Analytics tab, Agent performance, Delivery/RTO (flagged) |
| **Key metrics** | Cart recovery, channel performance, funnel-style views (not vanity-only) |

### 5.5 Audience Hub — Part E

| | |
|--|--|
| **Route** | `/audience-hub/*` (customers, consent, import, etc.) |
| **Job** | CRM: contacts, segments, scores, marketing consent |
| **Key capabilities** | All Contacts, Smart Import / Upload History, Marketing Consent (opt-in/out), interest/waterfall scores, filter drawer, Customer 360 |

**Also under Store ops (related):**

- **Warranty Hub** — `/warranty-hub` (Store → Warranty)  
- **Store Growth Hub** — Part E2 (abandoned carts tied to Journeys SSOT, Product Insights, website tracking cohorts)

### 5.6 Marketing Hub — Part F

| | |
|--|--|
| **Route** | `/marketing-hub` |
| **Tabs** | **Campaigns**, **Email** only |
| **Job** | Broadcasts + email marketing |
| **Campaigns** | Audience picker, message builder, review/launch; Meta marketing-template preflight |
| **Email** | Activity / audience / templates |

**Journeys are NOT a Marketing tab** — they are standalone (next).

### 5.7 Journeys (standalone) — Part F § journeys

| | |
|--|--|
| **Routes** | `/journeys` hub · `/journey-builder/:journeyId` studio |
| **Job** | Canvas automations: triggers, waits, branches, WhatsApp/email steps |
| **Cart recovery SSOT** | Live cart recovery = **published `cart_abandoned` journey** (not legacy 3-message SAC ladder) |

### 5.8 Automation Hub + Flow Builder — Part G

| | |
|--|--|
| **Routes** | `/automation-hub` (chat rules) · `/flow-builder` · `/flow-builder/flow/:flowId` · wizard |
| **Job** | Conversational WhatsApp flows + routing rules |
| **Flow Builder** | Visual nodes (triggers, menus, conditions, Shopify calls, templates, handoff), publish pipeline, simulator |
| **Chat rules** | Assignment / keyword / escalation routing; works with AI takeover pause |
| **Note** | AI form → flow generation is the marketing story; hub CTA for AI builder may be gated by product version |

### 5.9 Orders + Commerce Hub — Part H

| | |
|--|--|
| **Routes** | `/orders` · `/commerce-hub/*` |
| **Job** | Store operations: orders, fulfillment, inventory-related commerce panels |
| **Orders** | Shopify-parity payment/fulfillment badges, COD chips, batch dock, detail drawer, address lock after ship |
| **Commerce hub** | Embedded Shopify panels, product insights sections, inventory/forecast surfaces (per nav policy) |

### 5.10 Order Messages / SAC — Part I (RETIRED)

| | |
|--|--|
| **Status** | Retired 2026-07-04 |
| **Replacement** | Journey canvas + Meta Manager templates |

Marketing site no longer promotes “Order messages” as a primary feature; old URLs redirect to journeys.

### 5.11 Meta Manager — Part J

| | |
|--|--|
| **Route** | `/meta-manager/*` (library, QR, etc.) |
| **Job** | WhatsApp templates you approve; QR / deep links |
| **Key UI** | Template library + status sync (Pending/Approved), QR codes, Meta Ads (coming soon overlay) |
| **Catalog** | Product catalog setup moved toward Settings → WhatsApp shop |

### 5.12 Settings — Part K

| | |
|--|--|
| **Route** | `/settings` (footer / account menu — not main sidebar) |
| **Job** | Workspace connections, AI, persona, knowledge, widget, WhatsApp shop, merchant payment gateways |
| **Billing note** | SaaS subscription gating removed (2026-06-25); Meta pass-through cost estimates remain |

### 5.13 Admin Dashboard — Part M

| | |
|--|--|
| **Route** | `/admin/*` |
| **Job** | Super-admin / internal ops (not merchant marketing homepage) |

### 5.14 Shared platform (Parts L, N, O)

| Area | Role |
|------|------|
| Backend infra (L) | APIs, crons, workers, webhooks |
| Cross-hub sync (N) | Shared leads, orders, templates, sockets across hubs |
| Providers (O) | Auth, connection, socket, workspace contexts |

---

## 6. Mapping: homepage story → dashboard hub

| Homepage visual | Primary dashboard place |
|-----------------|-------------------------|
| Hero / Cart recovery story | Journeys (`/journeys`, cart_abandoned) + Live sends via Meta templates |
| Support beside the order | Live Chat `/conversations` + order CRM panel |
| Automate the journey | Journey Builder studio |
| AI form to Flow Builder | Flow Builder `/flow-builder` |
| Connect Shopify | Settings connections + Commerce/Shopify sync |
| Meta WhatsApp | Meta Manager `/meta-manager` |
| Instagram | IG automation + Live Chat (IG channel when shipped) |
| Analytics | Insights Hub `/insights-hub` |

---

## 7. Key files checklist (for editors)

### Marketing homepage

- `src/pages/Home.tsx`
- `src/marketing/data/home.ts` — all homepage copy arrays
- `src/marketing/data/features.ts` — full feature catalog
- `src/marketing/data/planCatalog.ts` — pricing cards
- `src/marketing/components/home/*`
- `src/marketing/components/foundation/FeatureScene.tsx`
- `src/marketing/components/foundation/ExtraFeatureScenes.tsx`
- `src/marketing/styles/home.css`
- `src/marketing/styles/feature-scenes.css`
- `public/trust/*` — logo assets
- `docs/product/FEATURE-SCENE-PLAYBOOK.md`

### Dashboard / product

- `docs/TOPEDGE-SYSTEM-REFERENCE.md` — Parts A–P (authoritative hub inventory)
- Merchant app: `chatbot-dashboard-frontend-main/` (referenced from system reference)

---

## 8. One-sentence product summary

**TopEdge** is a WhatsApp revenue + support OS for Shopify India: connect the store, approve Meta templates, recover carts and run journeys, chat with order context, and automate flows — with honest ₹ Meta costs and merchant control over every send.

---

*End of document. Update this file when homepage copy, scene recipes, or dashboard hub routes change.*
