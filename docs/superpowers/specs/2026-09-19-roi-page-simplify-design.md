# ROI page simplify — design

**Date:** 2026-09-19  
**Status:** Approved — implementing  
**Route:** `/roi`  
**Repo:** topedge-frontend-site-update-pricing

## Goal

One-screen ROI calculator that a Shopify D2C founder understands in ~20 seconds. Payback-first psychology; no Quick/Full split; progressive disclosure for power knobs.

## Primary trigger (locked)

1. **Hero:** “Pays for {Plan} in ~**N days**”  
2. **Support:** “~₹Y / month estimated value”  
3. **Proof:** thin module stack (cart / COD / campaigns / support)  
4. **CTA:** Start free  

## UX

| Zone | Content |
|------|---------|
| Hero | Short H1 + one line sub — no mode tabs |
| Left | 3 knobs: Orders · AOV · COD %. “More” → abandon rate. Module chips (toggle). Expand chip → fine-tune fields |
| Right (sticky) | Payback → monthly ₹ → stack → plan tip → Start free · Compare plans |
| Collapse | Formulas, 12-mo ramp, share link behind “How we calculated” |

## Math (unchanged formulas)

Reuse `roiCalc.ts`. Add `paybackDays = ceil(planPrice / (totalMonthly / 30))` when plan + totalMonthly > 0; else null.

## Out of scope

Feature pages, homepage ROI band (unless it already links here), pricing page strip rewrite.
