# Hero Dual-Device Continuous Film — Full Spec

**Product:** TopEdge marketing homepage hero (`HomeHero` → `HeroJourneyStage`)  
**Format:** Option **A — Continuous film** (one smooth sequence, then loop)  
**Source of truth:** `src/marketing/components/home/HeroJourneyStage.tsx` + `src/marketing/styles/home.css` (`.hero-duo*`)  
**Loop length:** **32 beats** (indices `0`–`31`) · **~37.6 seconds** per loop  
**Devices:** Desktop dashboard frame (left) + iPhone WhatsApp (right, slight overlap)  
**Product image:** `/marketing/products/vitamin-c-serum.jpg`  
**Customer:** Moksh Patel · **Order:** `#TE-1042` · **Store:** Glow Skin Co. · **SKU:** Vitamin C Serum  

---

## 1. What you see on screen (layout chrome)

### Desktop frame
- Full-bleed **app UI only** — no browser traffic lights, no `dash.topedge` URL bar, no TopEdge logo header, no Live Chat / Journey toggle tabs.
- Rounded white window with soft shadow.
- Inside: a **lens** layer (`.hero-duo__lens`) that can zoom/pan **only the dashboard content**. The outer frame size does **not** grow/shrink.

### Phone frame
- Black iPhone bezel + Dynamic Island.
- WhatsApp dark UI: header (back · avatar · **Glow Skin Co.** · online), dotted wallpaper, input bar (`+` · Message), home indicator.
- Phone is positioned on the **right**, fills stage height, and **never scales/zooms** with the desktop lens.

### Scene transitions
- Desktop scenes crossfade via `.hero-duo__view.is-show` / `.is-hide` (~0.75s opacity + slight rise).
- New scene content also uses `hero-duo-scene-in` fade/slide.
- Messages use `.hero-duo__fade` (pop in from below).

---

## 2. Camera / zoom system (how zoom in & zoom out works)

### Mechanism
- CSS variables on `.hero-duo__stage`: `--cam-scale`, `--cam-ox`, `--cam-oy`, `--cam-tx`, `--cam-ty`.
- Applied to `.hero-duo__lens` with ~**1.15s** smooth easing.
- Hook `useSmoothCam(beat)`:
  1. On beat start → apply that beat’s `cam` class (zoom **in** toward a region).
  2. Unless `hold: true` or cam is already “rest” (`is-cam-wide` / `is-cam-phone` / `is-cam-journey`) → after ~**58%** of the beat duration, force **`is-cam-wide`** (zoom **out** back to normal).
  3. Next beat therefore usually starts from a settled, full view.

### Camera presets (soft focus — not extreme)

| Class | Scale (approx) | Focus region | Used for |
|---|---|---|---|
| `is-cam-wide` | **1.0** (normal) | Center | Default / settle / phone moments |
| `is-cam-chat` | ~1.12 | Chat pane / order chip | COD order chip reveal |
| `is-cam-drag` | ~1.16 | Canvas + Steps drag | Dragging COD→prepaid step |
| `is-cam-canvas` | ~1.10 | Journey nodes | Node connections |
| `is-cam-publish` | ~1.22 | Publish button (top-right) | Aim + click Publish |
| `is-cam-order` | ~1.14 | Top center toast | New COD order toast |
| `is-cam-sent` | ~1.12 | Action node ports | “Message Sent” highlight |
| `is-cam-paid` | ~1.14 | Center modal | Desktop Payment Received |
| `is-cam-support` | ~1.10 | Chat support pane | Address-change agent reply |
| `is-cam-analytics` | ~1.12 | KPI / chart area | Analytics tick-up |

**Rule of thumb:** Zoom in on the thing that just happened → ease back to normal → next action.

---

## 3. Film structure (5 acts)

| Act | Beats | Scene | Story |
|---|---|---|---|
| **1** | 0–4 | `chat` | Live Chat support (COD question) |
| **2** | 5–17 | `journey` | Build COD→prepaid journey → publish → order → WA pay → payment success |
| **3** | 18–20 | `analytics` | Platform Analytics numbers tick up from the conversion |
| **4** | 21–26 | `address` | Live Chat: change delivery address + WA confirm |
| **5** | 27–31 | `delivered` | Order delivered journey + delivered WhatsApp template |
| *loop* | →0 | — | Restarts Act 1 |

---

## 4. Beat-by-beat bible

Durations are how long the beat **holds** before advancing. Cumulative time is approximate from loop start.

### Act 1 — Live Chat (support)

#### Shared desktop UI (entire Act 1)
- **Inbox** (left): Moksh Patel (active), Arjun K., Smit Tilva.
- **Chat head:** Moksh Patel · WhatsApp · `+91 98XXX XX210` · **Take control**.
- **Wall:** WhatsApp-like beige dotted background · “Today” pill.
- **Composer:** “Pause the bot or take control to reply…”

#### Shared phone UI (Act 1)
- Header: Glow Skin Co. · online.
- Mirrors the same conversation as desktop (customer vs store bubbles).

---

| Beat | ms | ~t | Cam | Desktop | Phone |
|---|---:|---:|---|---|---|
| **0** | 700 | 0.0s | wide | Typing dots (incoming). Inbox preview: Online | Typing dots (user) |
| **1** | 950 | 0.7s | wide | Bubble **in:** `hi`. Preview: `hi` | User bubble: `hi` · 9:41 |
| **2** | 1050 | 1.7s | wide | Bubble **bot:** `(BOT) Hi Moksh! How can we help with your order today?` | Store: same greeting · ✓✓ |
| **3** | 1050 | 2.7s | wide | Bubble **in:** `Where is my COD order?` | User: same ask |
| **4** | 1500 | 3.8s | **chat → settle wide** | Bubble **bot** with order chip: `#TE-1042 is packed…` + product image + `Vitamin C Serum × 1` · `COD · ₹1,899`. Soft zoom on chip, then out | Store: `#TE-1042 is packed. Want same-day if you pay online?` |

**Messages sent in Act 1**
1. Customer: `hi`
2. Bot: greeting
3. Customer: `Where is my COD order?`
4. Bot: packed + COD→prepaid offer + Shopify order chip

---

### Act 2 — Journey: COD → prepaid

#### Desktop journey chrome
- Title: `Journeys /` **COD → prepaid conversion**
- Status pill: Draft → Live → Live · running → Live
- **Publish** button (becomes green **Published**)
- Rail chips: **Order placed** (active) · Address change · Delivered
- Canvas nodes (horizontal): **Entry** → **COD → prepaid** → **End Journey**
- Right **Steps** panel: COD → prepaid, Update address, Order delivered

#### Phone during build
- System pills: `Building journey · COD → prepaid` then `New order · enrolled`
- Then product-image **WhatsApp template** with Pay CTA

---

| Beat | ms | ~t | Cam | Desktop | Phone | Cursors / overlays |
|---|---:|---:|---|---|---|---|
| **5** | 950 | 5.3s | wide | Fade from chat → journey canvas (empty-ish / Entry preparing) | System: Building journey… | Scene fade |
| **6** | 1050 | 6.2s | wide | **Entry** node on: TRIGGER · `Order placed · COD only` | Building… | — |
| **7** | 1400 | 7.3s | **drag → settle** | Drag ghost + Steps “COD → prepaid” dragging; Mac cursor animates drag | Building… | Cursor drag + drag ghost |
| **8** | 1100 | 8.7s | wide | Drop complete: **COD → prepaid** card appears (discount, CHECKOUT LINK, template `order_final`, ports Message Sent / Failed / Converted) | Building… | — |
| **9** | 1200 | 9.8s | **canvas → settle** | **End Journey** node on; links light purple | Building… | Soft node focus |
| **10** | 1250 | 11.0s | **publish (HOLD)** | Cursor aims at **Publish**; Publish gets aim ring. Status still Draft until click | Building… | Publish cursor aim |
| **11** | 1100 | 12.2s | publish → **settle** | Click pulse → **Published** (green). Status → Live | Building… | Cursor click + ring |
| **12** | 1250 | 13.3s | **order → settle** | Toast: **New COD order** · `#TE-1042 · Journey enrolled`. Entry node **Live path** fires | System: New order · enrolled | Order toast |
| **13** | 1050 | 14.6s | wide | Path flowing toward action node | Enrolled | — |
| **14** | 1350 | 15.6s | **sent → settle** | Port **Message Sent** highlights green; action node fires | **WA product template appears** (image + Vitamin C Serum + Pay ₹1,799 →) | Template send moment |
| **15** | 1200 | 17.0s | wide | Desktop rests (normal zoom) while phone is hero | Cursor taps **Pay ₹1,799 →**; CTA `is-tap` | Phone pay cursor |
| **16** | 500 | 18.2s | wide | Still resting | CTA → **Paid ₹1,799 ✓** + phone modal **Payment Success!** · `₹1,799 paid · order confirmed` | Phone success (~0.5s before dash) |
| **17** | 1500 | 18.7s | **paid → settle** | Veil + modal **Payment Received!** · `Payment of ₹1,799 successful from Moksh`. End node **+₹1,799**, Converted port on | Template stays paid | Desktop payment modal |

**WhatsApp prepaid template (beats 14–20 on phone)**
- Media: product image
- Title: Vitamin C Serum
- Sub: Order #TE-1042 · COD
- Body: `Hi Moksh, your COD order is confirmed. Pay online now — ₹100 off.`
- CTA: `Pay ₹1,799 →` → `Paid ₹1,799 ✓`
- Time: 9:44 ✓✓

**Journey nodes (COD mode) — order of appearance**
1. **Entry** (TRIGGER) — Order placed · COD only  
2. Link connects  
3. **COD → prepaid** action — ₹100 discount · checkout · template `order_final` · ports  
4. Link connects  
5. **End Journey** (END) — completes with +₹1,799 when paid  

---

### Act 3 — Analytics tick-up

Desktop fades to **Platform Analytics** (matches dashboard language: Store & Revenue / Support stats tab label).

| Beat | ms | ~t | Cam | Desktop UI | Phone |
|---|---:|---:|---|---|---|
| **18** | 900 | 20.2s | wide | Analytics enters; KPIs already in “won” state from payment | Prepaid template still showing paid |
| **19** | 1600 | 21.1s | **analytics → settle** | Soft zoom on KPIs/chart; cards **pop**: Gross sales **₹32.3k**, Orders **42**, Prepaid mix **44%**, Journey attributed **₹1,799**, chart spike dot, “COD → prepaid win” badge | Paid template |
| **20** | 1200 | 22.7s | wide | Settle full analytics view before next act | Paid template |

**KPI story**
- Before win (conceptual): ₹30.5k / 41 orders / 42% prepaid / ₹0 WA  
- After win (shown): ₹32.3k / 42 / 44% / ₹1,799 journey attributed  

**Other analytics UI**
- Revenue + orders line chart (purple revenue, green orders)
- Payment mix donut (COD vs Prepaid)
- Store × WhatsApp card with win badge

---

### Act 4 — Address change (support)

Desktop returns to **Live Chat** in address mode. Button: **Agent · Live**.

| Beat | ms | ~t | Cam | Desktop | Phone |
|---|---:|---:|---|---|---|
| **21** | 850 | 23.9s | wide | Typing (customer). Preview Online | Typing |
| **22** | 1100 | 24.7s | wide | In: `Can I change the delivery address for #TE-1042?` | Same user message · 10:02 |
| **23** | 1200 | 25.8s | **support → settle** | Bot: `Sure — send the new address…` (zoom on support reply) | Store same · ✓✓ |
| **24** | 1250 | 27.0s | wide | In: `14th Floor, Bandra West, Mumbai 400050` | Same address message |
| **25** | 1400 | 28.3s | wide | Agent: address updated + **Shipping updated** chip (MapPin · Bandra West…) | **Address updated** WA template (no product image; solo body) · CTA `Track order →` |
| **26** | 1300 | 29.7s | wide | Inbox preview: `Address updated ✓` | Same confirm template | Desktop toast: **Address updated** · `#TE-1042 · Bandra West, Mumbai` |

**Address WA template copy**
- Title: Address updated  
- Sub: Order #TE-1042  
- Body: Shipping now goes to **Bandra West, Mumbai 400050**…  
- CTA: Track order → · 10:04 ✓✓  

---

### Act 5 — Order delivered journey + template

Desktop fades to **Journeys / Order delivered** (published, Live · running).  
Rail highlight moves to **Delivered**.

| Beat | ms | ~t | Cam | Desktop nodes | Phone |
|---|---:|---:|---|---|---|
| **27** | 1000 | 31.0s | wide | **Entry** on: Fulfillment · Delivered · Live path | System: `Order delivered · journey running` |
| **28** | 1200 | 32.0s | **canvas → settle** | **Delivered note** node fires: template `order_delivered`, review/reorder copy | Still system / preparing |
| **29** | 1400 | 33.2s | wide | Port **Message Sent**; toast **Delivered template sent** | **Delivered ✨** product template appears · CTA `Leave a review →` |
| **30** | 1600 | 34.6s | wide | End path flowing; Opened port | CTA → **Opened ✓**; template `is-paid` style |
| **31** | 1400 | 36.2s | wide | Hold end state · End Journey “Customer notified · complete” | Delivered template holds |
| *loop* | — | ~37.6s | — | Crossfade back to Act 1 Live Chat | Restart |

**Delivered journey nodes**
1. **Entry** — TRIGGER · Fulfillment · Delivered  
2. **Delivered note** — Ask for review · reorder CTA · template `order_delivered` · ports Message Sent / Failed / Opened  
3. **End Journey** — END  

**Delivered WA template**
- Product image header  
- Title: Delivered ✨  
- Sub: Order #TE-1042 · Vitamin C Serum  
- Body: Your order arrived. Love it? Leave a quick review — or reorder in one tap.  
- CTA: `Leave a review →` → `Opened ✓`  
- Time: 6:12 ✓✓  

---

## 5. Animation inventory (what moves)

| Animation | Where | What it does |
|---|---|---|
| Scene fade in/out | Desktop views | Opacity + slight Y/scale when switching chat / journey / analytics / address / delivered |
| Message fade | Chat + phone bubbles | Each new bubble pops in |
| Typing dots | Both devices | Three bouncing dots before a reply |
| Lens zoom | Desktop content only | Scale + origin ease; auto settle to wide |
| Drag ghost | Journey COD | Floating “COD → prepaid” card follows drag beat |
| Mac cursor | Drag, Publish, Pay | Moves in, optional click scale + purple click ring |
| Publish pulse | Publish button | Scale + glow on click beat |
| Live path / is-fire | Journey cards | Green border/glow when path is active |
| Link dash flow | SVG connectors | Animated dashed purple stroke when flowing |
| Port highlight | Message Sent / Converted / Opened | Color + ring when that outcome hits |
| Toasts | Desktop overlay | Slide/fade from top center |
| Payment modal | Phone then desktop | Seal pop + modal scale-in; desktop has dim veil |
| CTA tap | Phone Pay / review | Scale down + highlight ring |
| Analytics KPI pop | KPI cards | Lift + purple border when “won” |
| Chart spike dot | Analytics SVG | Dot appears on revenue peak |
| Phone fill | iPhone wall | Template mode uses full-width product bubble (no phone zoom) |

---

## 6. Overlay checklist (desktop)

| Overlay | Beats | Content |
|---|---|---|
| Order toast | 12–13 | New COD order · #TE-1042 · Journey enrolled |
| Payment veil + modal | 17 | Payment Received! · ₹1,799 from Moksh |
| Address toast | 26 | Address updated · Bandra West |
| Delivered toast | 29 | Delivered template sent · WhatsApp |

---

## 7. Cursor checklist

| Cursor | Beats | Target |
|---|---|---|
| Drag | 7 | Steps → canvas drop |
| Publish | 10–11 | Publish button (aim then click) |
| Pay | 15 | Phone **Pay ₹1,799 →** |

---

## 8. WhatsApp templates summary

| # | When | Type | CTA |
|---|---|---|---|
| 1 | After journey Message Sent (beat 14+) | COD→prepaid product template | Pay ₹1,799 → |
| 2 | After address agent update (beat 25+) | Address updated (text template) | Track order → |
| 3 | After delivered Message Sent (beat 29+) | Delivered product template | Leave a review → |

---

## 9. Files & hooks

| Piece | Location |
|---|---|
| Timeline + UI | `src/marketing/components/home/HeroJourneyStage.tsx` |
| Styles / lens / phone | `src/marketing/styles/home.css` (`.hero-duo*`) |
| Hero mount | `src/marketing/components/home/HomeHero.tsx` |
| Product asset | `public/marketing/products/vitamin-c-serum.jpg` |
| Camera helper | `useSmoothCam(beat)` in `HeroJourneyStage.tsx` |
| Reduced motion | Jumps to last beat; animations disabled in CSS |

---

## 10. One-line story (for stakeholders)

> A shopper asks about a COD order in Live Chat → TopEdge builds and publishes a COD→prepaid journey → WhatsApp sends a product Pay template → customer pays on phone, dashboard shows Payment Received → Analytics ticks up revenue → later the shopper changes address in chat and gets a WA confirm → when the order is delivered, a delivered journey sends a review template — then the film loops.

---

*Generated from the implemented continuous-film timeline (Option A). If beats are retimed in code, update Section 4 to match `TIMELINE` in `HeroJourneyStage.tsx`.*
