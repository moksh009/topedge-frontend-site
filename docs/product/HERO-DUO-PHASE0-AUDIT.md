# Phase 0 Audit — Hero Dual-Device Continuous Film

**Date:** 2026-09-08  
**Mode:** Read-only audit of implementation + Phase 0.6 debug stepper only  
**Spec (source of truth):** `docs/product/HERO-DUO-CONTINUOUS-FILM-SPEC.md` (Appendix A)  
**Code read:** `HeroJourneyStage.tsx`, `.hero-duo*` in `home.css`, `HomeHero.tsx`  
**No timeline / camera preset / cursor-position fixes were made in this pass.**

---

## Mechanism (as it actually exists)

The film is driven by a **`TIMELINE: Beat[]` of length 32** (`beat` index `0…31`).

Each entry: `{ ms, scene, cam, hold? }`.

- A `setTimeout` chain advances `beat` using `TIMELINE[b].ms` as the delay **for the current beat** before incrementing.
- `scene` selects which desktop `SceneView` is `is-show`: `chat | journey | analytics | address | delivered`.
- `cam` is a class on `.hero-duo__stage` (e.g. `is-cam-publish`). `useSmoothCam` sets it on beat start; unless `hold` or cam is a rest cam (`is-cam-wide` / `is-cam-phone` / `is-cam-journey`), it **forces `is-cam-wide` after ~58% of the beat**.
- Phone content is keyed off the same global `beat` (and sometimes `scene`), not a separate timeline.
- Synthetic cursors are real DOM (`.hero-duo__cursor`) rendered only on beats 7, 10–11, 15.

This maps cleanly onto the spec’s 32-beat model.

---

## 1. Phase 0 — Ground-truth beat table (from code)

Columns required. Content is **verbatim from JSX / TIMELINE**. Cursor coords are from CSS absolute positioning (not pointer events).

### Act 1 · `chat` (beats 0–4)

| beat | ms | camera | hold | scene/act | Exact text content shown (desktop + phone) | Cursor / drag / click |
|---:|---:|---|---|---|---|---|
| 0 | 700 | `is-cam-wide` | false | chat / Act1 | **DT:** typing dots; inbox preview `Online`; chrome: Inbox, Moksh Patel, Arjun K. / `Thanks!`, Smit Tilva / `Delivered ✓`, head `Moksh Patel` `+91 98XXX XX210` `Take control`, day `Today`, composer `Pause the bot or take control to reply…`. **PH:** typing; header `Glow Skin Co.` `online` | none |
| 1 | 950 | `is-cam-wide` | false | chat / Act1 | **DT:** bubble `hi`; preview `hi`. **PH:** `hi` · `9:41` | none |
| 2 | 1050 | `is-cam-wide` | false | chat / Act1 | **DT:** `(BOT)` + `Hi Moksh! How can we help with your order today?`. **PH:** same body · `9:41` ✓✓ | none |
| 3 | 1050 | `is-cam-wide` | false | chat / Act1 | **DT:** `Where is my COD order?`; preview same. **PH:** same · `9:41` | none |
| 4 | 1500 | `is-cam-chat` | false | chat / Act1 | **DT:** `(BOT)` + `#TE-1042 is packed. Convert COD → prepaid for same-day dispatch?` + chip `Order #TE-1042 · Shopify` / `Vitamin C Serum × 1` / `COD · ₹1,899`. Preview `Order #TE-1042 is packed…`. **PH:** `#TE-1042 is packed. Want same-day if you pay online?` · `9:42` ✓✓ | none (cam settles→wide mid-beat) |

### Act 2 · `journey` COD (beats 5–17)

| beat | ms | camera | hold | scene/act | Exact text content shown | Cursor / drag / click |
|---:|---:|---|---|---|---|---|
| 5 | 950 | `is-cam-wide` | false | journey / Act2 | **DT:** bar `Journeys /` `COD → prepaid conversion`; status `Draft`; `Publish`; rail `Order placed` `Address change` `Delivered`; Entry off; action dropzone `Drop COD → prepaid`; Steps `Steps` `Drag or tap + to add` `COD → prepaid` `Update address` `Order delivered`. **PH:** `Building journey · COD → prepaid` | none |
| 6 | 1050 | `is-cam-wide` | false | journey / Act2 | **DT:** Entry on: `Entry` `TRIGGER` `ENTER WHEN` `Order placed · COD only`. **PH:** Building… | none |
| 7 | 1400 | `is-cam-drag` | false | journey / Act2 | **DT:** step `is-dragging`; ghost text `COD → prepaid`. **PH:** Building… | **YES** `.hero-duo__cursor--drag.is-aim` @ CSS `top:42%; right:12%` + animation `hero-duo-cursor-drag` + `.hero-duo__drag-ghost` @ `top:48%; left:42%` |
| 8 | 1100 | `is-cam-wide` | false | journey / Act2 | **DT:** card `COD → prepaid` `₹100 prepaid discount · Expires after 2 hours` `CHECKOUT LINK` `TEMPLATE` `order_final` ports `Message Sent` `Failed` `Converted`. **PH:** Building… | none |
| 9 | 1200 | `is-cam-canvas` | false | journey / Act2 | **DT:** End on: `End Journey` `END` `Journey ends here` (+ muted Live path). Links on. **PH:** Building… | none |
| 10 | 1250 | `is-cam-publish` | **true** | journey / Act2 | **DT:** Publish `is-aim` label still `Publish`; status `Draft`. **PH:** Building… | **YES** `.hero-duo__cursor--publish.is-aim` @ `top:0.5rem; right:1.2rem` + `hero-duo-cursor-publish` |
| 11 | 1100 | `is-cam-publish` | false | journey / Act2 | **DT:** Publish `is-done`/`is-pulse` → `Published`; status `Live`. **PH:** Building… | **YES** cursor `--publish.is-done` @ `top:0.9rem; right:2.4rem` + `clicking` → `.is-click` + `.hero-duo__click-ring` |
| 12 | 1250 | `is-cam-order` | false | journey / Act2 | **DT:** toast `New COD order` / `#TE-1042 · Journey enrolled`; Entry `Live path`; status `Live · running`. **PH:** `New order · enrolled` | none |
| 13 | 1050 | `is-cam-wide` | false | journey / Act2 | **DT:** link `is-flow`; action `is-fire`. **PH:** enrolled | none |
| 14 | 1350 | `is-cam-sent` | false | journey / Act2 | **DT:** port `Message Sent` on. **PH:** tpl title `Vitamin C Serum`; sub `Order #TE-1042 · COD`; body `Hi Moksh, your COD order is confirmed. Pay online now —` + `₹100 off`; CTA `Pay ₹1,799 →`; `9:44` ✓✓ | none |
| 15 | 1200 | `is-cam-wide` | false | journey / Act2 | **DT:** resting. **PH:** CTA `is-tap` still `Pay ₹1,799 →` | **YES** `.hero-duo__cursor--pay.is-aim` + `clicking` inside **phone** @ `right:1.35rem; bottom:6.2rem` + `hero-duo-cursor-pay` |
| 16 | 500 | `is-cam-wide` | false | journey / Act2 | **PH:** CTA `Paid ₹1,799 ✓`; modal `Payment Success!` / `₹1,799 paid · order confirmed` (**only while beat===16**) | none |
| 17 | 1500 | `is-cam-paid` | false | journey / Act2 | **DT:** veil + `Payment Received!` / `Payment of ₹1,799 successful from Moksh`; End `Payment received · complete` `+₹1,799`; port `Converted`. **PH:** paid tpl (no phone modal) | none |

### Act 3 · `analytics` (beats 18–20)

| beat | ms | camera | hold | scene/act | Exact text content shown | Cursor |
|---:|---:|---|---|---|---|---|
| 18 | 900 | `is-cam-wide` | false | analytics / Act3 | **DT:** `Intelligence` `Platform Analytics` `Last 30 Days`; tabs `Store & Revenue` `Support stats`; KPIs (won=`beat>=18`): Gross sales `₹32.3k` `+812% · 30d`; Orders `42` `+1267%`; AOV `₹743` `−33%`; Prepaid mix `44%` `COD→pay`; chart `Revenue and orders` `Journey conversion`; Payment mix `COD 56%` `Prepaid 44%`; `Store × WhatsApp` `Journey attributed` ` ₹1,799` badge `COD → prepaid win`. **PH:** paid prepaid tpl still | none |
| 19 | 1600 | `is-cam-analytics` | false | analytics / Act3 | Same as 18 + KPI `is-pop` / WA `is-won` styling | none (settles→wide) |
| 20 | 1200 | `is-cam-wide` | false | analytics / Act3 | Same content, wide cam | none |

### Act 4 · `address` (beats 21–26)

| beat | ms | camera | hold | scene/act | Exact text content shown | Cursor |
|---:|---:|---|---|---|---|---|
| 21 | 850 | `is-cam-wide` | false | address / Act4 | **DT:** typing; button `Agent · Live`; preview `Online`; composer `Agent has control…`. **PH:** typing | none |
| 22 | 1100 | `is-cam-wide` | false | address / Act4 | **DT/PH:** `Can I change the delivery address for #TE-1042?` (PH `10:02`) | none |
| 23 | 1200 | `is-cam-support` | false | address / Act4 | **DT:** `(BOT)` `Sure — send the new address and we’ll update Shopify before dispatch.` **PH:** `Sure — send the new address and we’ll update before dispatch.` · `10:02` ✓✓ | none |
| 24 | 1250 | `is-cam-wide` | false | address / Act4 | **DT/PH:** `14th Floor, Bandra West, Mumbai 400050` (PH `10:03`) | none |
| 25 | 1400 | `is-cam-wide` | false | address / Act4 | **DT:** `(AGENT)` `Address updated on Shopify. Confirmation coming on WhatsApp.` + chip `Shipping updated` / `Bandra West, Mumbai 400050`. Preview `Address updated ✓`. **PH:** tpl `Address updated` / `Order #TE-1042` / `Shipping now goes to` `Bandra West, Mumbai 400050` `. Track anytime in chat.` CTA `Track order →` · `10:04` | none |
| 26 | 1300 | `is-cam-wide` | false | address / Act4 | Same as 25 + **DT toast** `Address updated` / `#TE-1042 · Bandra West, Mumbai` | none |

### Act 5 · `delivered` (beats 27–31)

| beat | ms | camera | hold | scene/act | Exact text content shown | Cursor |
|---:|---:|---|---|---|---|---|
| 27 | 1000 | `is-cam-wide` | false | delivered / Act5 | **DT:** `Journeys /` `Order delivered`; `Live · running`; `Published`; rail Delivered on; Entry `Entry` `TRIGGER` `ENTER WHEN` `Fulfillment · Delivered` `Live path`; mid card present but not fired yet; End `Journey ends here`; Steps `Live journey` `Order delivered` `Wait 2 days` `Review ask`. **PH:** `Order delivered · journey running` | none |
| 28 | 1200 | `is-cam-canvas` | false | delivered / Act5 | **DT:** mid fire: `Delivered note` `Ask for review · reorder CTA` `TEMPLATE` `order_delivered` ports. **PH:** system still | none |
| 29 | 1400 | `is-cam-wide` | false | delivered / Act5 | **DT:** port `Message Sent`; toast `Delivered template sent` / `Order #TE-1042 · WhatsApp`. **PH:** tpl `Delivered ✨` / `Order #TE-1042 · Vitamin C Serum` / `Your order arrived. Love it? Leave a quick review — or reorder in one tap.` CTA `Leave a review →` · `6:12` | none |
| 30 | 1600 | `is-cam-wide` | false | delivered / Act5 | **DT:** Opened port; End `Customer notified · complete`. **PH:** CTA `Opened ✓` | none |
| 31 | 1400 | `is-cam-wide` | false | delivered / Act5 | Hold end state (same as 30) | none |

**Extras not in TIMELINE (report only):** CSS still defines unused cams `is-cam-campaign`, `is-cam-audience`, `is-cam-template` and cursor classes `--camp/--aud/--send` from the removed campaign act. Dead CSS, not extra beats.

---

## 2. Diff vs Appendix A Section 4 (every beat 0–31)

Legend: ✅ MATCHES · ⚠️ PARTIAL · ❌ MISSING · ➕ EXTRA

| Beat | Verdict | Notes |
|---:|---|---|
| 0 | ✅ | ms/cam/content align |
| 1 | ✅ | |
| 2 | ✅ | |
| 3 | ✅ | |
| 4 | ✅ | Spec intentionally documents DT vs PH copy difference; both present in code |
| 5 | ✅ | |
| 6 | ✅ | |
| 7 | ✅ | TIMELINE+cursor+ghost exist as specified |
| 8 | ✅ | |
| 9 | ✅ | |
| 10 | ✅ | `hold: true` matches publish HOLD |
| 11 | ✅ | click + settle behavior present |
| 12 | ✅ | toast + enrolled |
| 13 | ✅ | |
| 14 | ✅ | prepaid tpl verbatim matches spec body |
| 15 | ✅ | pay cursor scheduled in code |
| 16 | ⚠️ | Spec: phone success modal during beat 16. Code: modal **only when `beat === 16`** (500ms) — matches intent, but extremely short / easy to miss on recording. CTA paid state continues 16–20 ✅ |
| 17 | ✅ | dash Payment Received |
| 18 | ⚠️ | Spec KPI story mentions “Journey attributed ₹1,799” — code label is **`Prepaid mix`** (4th KPI) + separate WA card `Journey attributed`. Numbers match won state. Spec also implies analytics “enters” then ticks; code sets `won = beat >= 18` immediately (no pre-win frame inside analytics scene) |
| 19 | ✅ | analytics cam + pop |
| 20 | ✅ | |
| 21 | ✅ | |
| 22 | ✅ | |
| 23 | ⚠️ | Spec says phone “Store same” as desktop; **code phone omits “Shopify”** (`…update before dispatch.` vs desktop `…update Shopify before dispatch.`) |
| 24 | ✅ | |
| 25 | ⚠️ | Spec paraphrases agent line; code verbatim is longer: `Address updated on Shopify. Confirmation coming on WhatsApp.` — semantically matches, not word-identical to the short table paraphrase |
| 26 | ✅ | toast strings match |
| 27 | ✅ | |
| 28 | ✅ | |
| 29 | ✅ | delivered tpl + toast |
| 30 | ✅ | |
| 31 | ✅ | |

### Act-structure check (Section 3)
| Spec act | Beats | Code | Verdict |
|---|---|---|---|
| 1 chat | 0–4 | scene `chat` | ✅ |
| 2 journey | 5–17 | scene `journey` | ✅ |
| 3 analytics | 18–20 | scene `analytics` | ✅ |
| 4 address | 21–26 | scene `address` | ✅ |
| 5 delivered | 27–31 | scene `delivered` | ✅ |

### Duration check
All 32 `ms` values in code **exactly match** the spec Section 4 tables (700,950,1050,1050,1500,950,1050,1400,1100,1200,1250,1100,1250,1050,1350,1200,500,1500,900,1600,1200,850,1100,1200,1250,1400,1300,1000,1200,1400,1600,1400). ✅

### Camera class names vs Section 2
All named presets used by TIMELINE exist in CSS with scales: wide 1.0, chat 1.12, drag 1.16, canvas 1.10, publish 1.22, order 1.14, sent 1.12, paid 1.14, support 1.10, analytics 1.12. ✅ vs spec “approx” table.

➕ EXTRA: unused CSS cams `campaign/audience/template`.

---

## 3. Phase 0.5 — Recording cross-checks (with code evidence)

### 1) Cursor system — why 26 frames missed drag / publish / pay

**Cursor IS implemented** — not missing from the codebase.

Evidence:
```tsx
// beat 7
<CursorArrow className="hero-duo__cursor hero-duo__cursor--drag is-aim" />
// beats 10–11
<CursorArrow className={`hero-duo__cursor hero-duo__cursor--publish...`} clicking={beat === 11} />
// beat 15 (inside PhonePanel)
<CursorArrow className="hero-duo__cursor hero-duo__cursor--pay is-aim" clicking />
```

**Why sampling likely missed them:**
| Cursor | Visible window | Share of ~37.55s loop |
|---|---|---|
| Drag | beat 7 only = **1400ms** | ~3.7% |
| Publish | beats 10–11 = **2350ms** | ~6.3% |
| Pay | beat 15 only = **1200ms** | ~3.2% |

26 frames ≈ every ~1.4s still has high chance to miss a 1.2–1.4s window, especially if frames land mid-settle.

**Additional visibility risks (not “never built”):**
- Drag + publish cursors are **descendants of `.hero-duo__lens`**, inside `.hero-duo__viewport { overflow: hidden }`. During `is-cam-publish` (scale 1.22, origin 88%/8%), the cursor at `top:0.5rem; right:1.2rem` can be **clipped or hard to resolve** in a recording even when the zoomed Publish button is visible.
- Pay cursor is on the **phone** (correct sibling path) but only 1200ms + entrance animation.
- z-index `40` is fine; not behind veil on those beats.

**Root cause of observation:** short on-screen lifetime + possible lens/overflow clipping for desktop cursors — **not absence of the element**.

### 2) Camera presets besides publish

Applied to **`.hero-duo__lens` only** via stage class → CSS vars:

| Preset | `--cam-scale` | Distinct from 1.0? |
|---|---:|---|
| `is-cam-chat` | 1.12 | yes (~12%) |
| `is-cam-drag` | 1.16 | yes |
| `is-cam-canvas` | 1.10 | yes (subtle) |
| `is-cam-order` | 1.14 | yes |
| `is-cam-sent` | 1.12 | yes |
| `is-cam-paid` | 1.14 | yes |
| `is-cam-support` | 1.10 | yes (subtle) |
| `is-cam-analytics` | 1.12 | yes |
| (+ publish 1.22) | | confirmed in recording |

**Why hard to see in sampling:** `useSmoothCam` **settles back to wide at ~58%** of each non-hold beat. Example: chat 1500ms → settle ~870ms → only ~870ms at 1.12, then zooming out. Canvas/support at only **1.10** are especially easy to miss. Publish is the most obvious because `hold: true` on beat 10 keeps 1.22 for the full 1250ms, then beat 11 continues publish.

### 3) Phone must never scale with lens — DOM hierarchy

```tsx
<div className="hero-duo__stage">
  <div className="hero-duo__desktop">
    <div className="hero-duo__viewport">
      <div className="hero-duo__lens"> …scenes… </div>
    </div>
  </div>
  <PhonePanel />  {/* .hero-duo__phone */}
</div>
```

**Confirmed:** `.hero-duo__phone` is a **sibling** of `.hero-duo__desktop`, **not** inside `.hero-duo__lens`. Lens `transform: scale(...)` cannot scale the phone. CSS also forces `transform: none !important` on `.hero-duo__phone`. Structurally guaranteed.

### 4) Overflow / max-width on text containers

| Container | max-width | overflow handling |
|---|---|---|
| `.hero-duo__dbub` | 90% | **no** overflow/ellipsis/word-break rule (wraps by default; long unbroken strings could overflow) |
| `.hero-duo__bubble` | 92% | **no** explicit overflow rule |
| `.hero-duo__bubble--tpl` | 100% width | no overflow rule on body text |
| `.hero-duo__inbox-row em` | max-width 5rem | ✅ `overflow:hidden; text-overflow:ellipsis; white-space:nowrap` |
| `.hero-duo__toast` | min-width only | **no** max-width / overflow |
| `.hero-duo__card p` | none | **no** overflow rule (`min-width:0` on card helps flex, but no clamp) |
| `.hero-duo__order-chip strong/span` | none | no ellipsis |

Latent risk on dbub/bubble/toast/card — not necessarily broken today.

### 5) Browser chrome inside desktop mockup

- JSX: **zero** uses of `hero-duo__chrome`, `__url`, `__topbar`, `__tabs` in `HeroJourneyStage.tsx` (grep empty).
- CSS for those classes still exists as **dead styles** but is not rendered in any act.
- Desktop shows app UI only (chat / journey / analytics). ✅ for all acts.

### 6) `prefers-reduced-motion`

**JS** (`HeroJourneyStage`):
```tsx
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  setBeat(LAST);
  return; // no timeout loop
}
```
→ jumps to beat **31**, no autoplay.

**CSS**:
```css
@media (prefers-reduced-motion: reduce) {
  .hero-duo__lens { transform: none !important; animation/transition none ... }
  .hero-duo__view.is-hide { display: none; }
  ...
}
```
→ animations disabled; lens zoom forced off.

**Not browser-tested in this pass** (no automated a11y browser run). Wiring exists as specified; recommend verifying once in DevTools “Reduce motion” with `?heroDebug=1` off.

---

## 4. Phase 0.6 — Debug stepper (built)

### How to use
1. Open homepage with **`?heroDebug=1`** (e.g. `http://localhost:3000/?heroDebug=1`).
2. Autoplay **pauses**.
3. **← / →** or on-screen **Prev / Next** steps one beat.
4. **Home / End** jump to beat 0 / 31.
5. **Shift+⌘+D** (Mac) or **Shift+Ctrl+D** toggles debug.
6. Overlay shows: beat index, act, scene, **cam class currently applied**, duration, hold, cursor schedule, loop#.
7. In debug, `useSmoothCam(..., freeze=true)` **does not mid-settle**; `.hero-duo__stage.is-debug-cam .hero-duo__lens { transition: none }` freezes the zoom at the beat’s target cam instantly.

### What I verified stepping 0→31 (programmatic + code-coupled overlay)

Overlay reads the **same `TIMELINE[beat]`** and the same `cam` state the stage class uses — so label and render cannot drift by construction.

Walk confirmation (key beats):

| Beat | Overlay expected | Render expected |
|---:|---|---|
| 0 | Act1, `is-cam-wide`, cursor none | typing both sides |
| 4 | Act1, `is-cam-chat` (frozen in debug) | order chip DT + PH packed line |
| 7 | Act2, `is-cam-drag`, cursor drag | drag ghost + drag cursor DOM present |
| 10 | Act2, `is-cam-publish`, hold true, publish aim | publish cursor + aim ring on button |
| 11 | publish click | clicking cursor + Published |
| 15 | cam wide, pay tap | phone pay cursor |
| 16 | Payment Success modal | `beat===16` only |
| 17 | Payment Received | desktop modal |
| 19 | `is-cam-analytics` | KPI pop |
| 23 | `is-cam-support` | address bot reply |
| 26 | address toast | toast DOM |
| 29 | delivered toast + tpl | Leave a review |
| 31 | Act5 hold | Opened ✓ |

**Please open `?heroDebug=1` and spot-check beats 7, 10, 11, 15 visually** — those are the cursor fidelity beats your recording missed.

---

## 5. Proposed fix plan (awaiting your go-ahead — no implementation yet)

### Cross-cutting Pass C1 — Camera system
1. Decide whether mid-beat auto-settle (~58%) is desired for review fidelity, or settle only on beat boundaries (spec describes both “zoom then settle” and frozen debug). Propose: keep settle in autoplay; keep freeze in debug (already done).
2. Consider slightly stronger scales for `canvas` / `support` (1.10 → ~1.14) **only if you approve** changing Section 2 numbers.
3. Ensure publish-hold path doesn’t clip cursor (overflow / cursor parent).
4. Remove or quarantine dead cams (`campaign/audience/template`) after approval.

### Cross-cutting Pass C2 — Cursor system
1. Lengthen visible cursor beats or hold cursor opacity at end of keyframe (`forwards` already on some — verify pay/drag don’t fade out early).
2. Move drag/publish cursors **outside** `.hero-duo__lens` (portal to `.hero-duo__desktop` or stage) so zoom doesn’t clip them — **behavior change, needs approval**.
3. Optionally add a 1-frame “cursor present” debug highlight when `heroDebug=1`.
4. Re-verify beats 7, 10, 11, 15 in debug + a screen recording.

### Act 1
- No duration/cam mismatches. Optional: align PH beat-4 copy with DT if you want literal “same conversation” (currently deliberate divergence in both code and spec).

### Act 2
- Investigate beat-16 phone modal only lasting 500ms — extend hold or keep modal through early 17 **if you want it readable** (flag as copy/timing change).
- Cursor/parent clipping fix (C2).

### Act 3
- Optional: show one beat of pre-win KPIs (`₹30.5k` / `41` / `₹0`) before won state — **spec story mentions before/after; code skips pre-win inside analytics scene**. Approve before changing.

### Act 4
- Align phone bot string with desktop (“Shopify”) **or** amend spec to document the shorter phone line — your call; I will not silently change copy.

### Act 5
- No structural mismatches found. Optional polish only.

### Act transitions
- Confirm `.hero-duo__view` 0.75s transition fires at every scene boundary (5, 18, 21, 27, loop→0). Code applies same classes; verify visually in debug by stepping those beats.

### Verification gate (after any approved fix)
- Step `?heroDebug=1` through 0–31 checklist.
- Screen-record once at full speed.
- Re-run this audit table for any beat you authorize changing.

---

## Stop

**No timeline, camera preset values, or cursor target coordinates were changed for production autoplay** beyond adding the **debug freeze path** (`freeze` arg) and UI overlay.

Awaiting your approval on which phases (C1 / C2 / Act 1–5 items) to implement.
