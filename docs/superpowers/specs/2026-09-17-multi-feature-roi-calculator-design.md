# Multi-Feature ROI Calculator Design

**Date:** 2026-09-17  
**Status:** Approved — implementing

## Goal

Replace cart-only ROI wizard with a live, multi-module operator ROI calculator covering Cart Recovery, COD/RTO, Campaigns, and Support/Flow savings.

## Architecture

- `src/marketing/data/roiCalc.ts` — pure formulas + defaults + plan recommend
- `src/marketing/components/pricing/RoiWizard.tsx` — live UI (baseline + toggles + results)
- `src/marketing/styles/roi.css` — redesigned layout
- `RoiPage.tsx` — updated hero/SEO framing

## Modules

1. Cart recovery  
2. COD → prepaid / RTO avoided  
3. Audience campaigns (net of Meta)  
4. Support / flow deflection  

## UI

Hero → two-column shell: controls left, live total + stack + 6-mo chart + plan right.
