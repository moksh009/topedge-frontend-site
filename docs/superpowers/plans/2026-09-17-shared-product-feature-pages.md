# Shared Product Feature Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans or implement inline. Steps use checkbox syntax.

**Goal:** Remove nav mega-menu image hover animations and ship a shared enterprise product page for cart recovery, COD→prepaid, flow builder, campaigns, and audience CRM.

**Architecture:** Data-driven `productPages.ts` + `ProductFeaturePage` + `product-feature.css`. SEO landers for cart/COD upgrade to the new shell; priority `/features/:slug` routes render the same page.

**Tech Stack:** React, TypeScript, existing marketing CSS patterns (solutions/home), DemoProductVideoFrame / DemoProductImageFrame

## Global Constraints

- Operator copy (Shopify + WhatsApp India), not generic AI fluff
- Hero video or image per product; glow frame parity with home
- Audience CRM bento uses `/1.png`, `/2.png`, `/3.png`
- Nav COD href → `/cod-confirmation-whatsapp`
- Do not commit unless asked

---

### Task 1: Remove nav image hover animations
### Task 2: Add `productPages.ts` with 5 products
### Task 3: Build `ProductFeaturePage` + `product-feature.css`
### Task 4: Wire routes + FeatureDetailPage bridge + nav COD link
### Task 5: Visual QA all five pages
