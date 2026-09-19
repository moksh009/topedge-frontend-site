# ROI page — chart-led redesign (Approach B)

**Date:** 2026-09-19  
**Status:** Shipped 2026-09-19  
**Route:** `/roi`  
**Repo:** topedge-frontend-site-update-pricing

## Goal

Premium one-screen ROI calculator: light type (no bold), no leading-zero input bugs, proper charts instead of thin progress bars.

## Locked decisions

- **Charts:** Donut (module mix) + always-visible 12-month area chart
- **Typography:** Max font-weight 400 on `/roi`; hierarchy via size/color only
- **Inputs:** Draft string while focused; strip leading zeros; commit number on blur
- **Hours copy:** `28 agent-hours` not `28.0`
- **Left column:** Same structure; quieter chrome
- **Math:** Unchanged (`roiCalc.ts` formulas / plan suggestion)

## Results panel order

1. Payback eyebrow + line  
2. Monthly ₹  
3. Donut + legend rows (₹ + detail)  
4. 12-month area (always on) + year total  
5. CTAs  
6. “How we calculated” → formulas + share only  

## Files

- `src/marketing/components/pricing/RoiWizard.tsx`
- `src/marketing/styles/roi.css`
- `src/marketing/data/roiCalc.ts` (hours format helper only)
