# Analytics Growth Loop — Design Spec

**Date:** 2026-09-08  
**Status:** Approved (Hybrid C · Hero payoff C · Sticky B · Approach 2 soft-extend)  
**Scope:** Hero Act 3 (beats 18–20) camera + story rewrite; Pixel Insights sticky upgrade; new Audience & Broadcast sticky film.

---

## 1. Goal

Make Act 3 tell the **capture → monitor → retarget → broadcast** growth loop (not a generic Shopify KPI dashboard), fix harsh analytics camera motion, and deepen the same story in sticky films without renumbering address/delivered beats.

## 2. Decisions (locked)

| Decision | Choice |
|----------|--------|
| Placement | Hybrid: hero soft rewrite + sticky depth |
| Hero payoff | Both: journey retarget then audience/broadcast |
| Sticky depth | Upgrade Pixel Insights **and** add Audience/Broadcast film |
| Beat indices | Keep **18 / 19 / 20** (no renumber of 21+) |
| Timing | Soft-lengthen 18–20 (~3000ms each) |
| Brand continuity | Glow Skin Co · Vitamin C Serum · known shopper Priya · ₹1,899 / COD win context |

## 3. Hero Act 3 — beat map

| Beat | ms | Cam | Desktop | Phone |
|------|----|-----|---------|-------|
| 18 | 3000 | `is-cam-wide` (chapter) then story feel via content | Chapter *Capture the loop* · Pixel live / one-click install · 5 opt-in tools light up · phones captured count | Hold paid COD thread |
| 19 | 3000 | `is-cam-an-mid` | Return-visit monitor (scroll / ATC / cart) · known number · Retarget via Journey | Journey template lands |
| 20 | 3000 | `is-cam-an-bot` | Audience import / segment / select · Broadcast compose → send · sales lift | Campaign delivery tick |

### Chapter card copy

- Eyebrow: `Act 3`
- Title: `Capture the loop`
- Sub: `Pixel → opt-ins → retarget → broadcast`

### Camera (fix awkward zoom)

| Class | scale | tx | ty | Role |
|-------|------:|----|----|------|
| `is-cam-wide` | 1.0 | 0% | 0% | Chapter |
| `is-cam-an-mid` | 1.10 | 0% | +3% | Monitor / mid board |
| `is-cam-an-bot` | 1.10 | 0% | −3% | Audience / broadcast |
| `is-cam-an-kpi` | alias mid or unused | — | — | Do not use harsh +10% |

No 1.0→1.16 whip + 18pp vertical pan.

## 4. Sticky films

### 4.1 Pixel Insights (upgrade)

Expand timeline: install confirm → live storefront events → **5 opt-in tools** → scroll/cart monitor → journey handoff chip. Update sticky copy to match.

### 4.2 Audience & Broadcast (new)

New `FeatureFilmId`: `audience-broadcast`.  
Beats: import leads → segment (opt-in / recharge) → select all → compose broadcast → send → replies/sales lift.  
Insert in `STORIES` after pixel-insights (before stock-monitor).

## 5. Hard rules

1. Do **not** renumber beats ≥ 21 or delivered drag indices (28+).  
2. Prefer existing `.hero-duo__an-*` / dead `.hero-duo__aud` / `__camp` CSS shells when reusable; extend rather than invent parallel systems.  
3. Phone never scales with lens.  
4. Prefer-reduced-motion: land on final success state.  
5. No Instagram marks.  
6. Marketing hero left-column copy width unchanged.

## 6. Out of scope

- Real API / pixel SDK wiring  
- New marketing feature route pages  
- Changing COD journey (Act 2) narrative  
- Committing unless user asks  

## 7. Success criteria

- Act 3 reads as growth loop in ~9s without camera whip  
- Phone participates on beats 19–20  
- Sticky Pixel film shows opt-ins + monitor  
- New Audience/Broadcast sticky film plays in-view  
- `?heroDebug=1` still steps 0…LAST with analytics cams soft  
---

## Spec self-review

- No placeholders.  
- Indices 18–20 only for hero story change.  
- Sticky additions match FeatureFilm kit patterns.  
- Camera values concrete.  
