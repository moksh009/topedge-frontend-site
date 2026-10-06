# COD Confirmation Landing Page: Design

Date: 2026-10-06
Source: "TopEdge COD Landing Page, Conversion Plan" (6 Oct 2026). This spec records the decisions and the repo-specific adaptations. Copy and visual intent come from that plan.

## Goal

A standalone Google Ads landing page at `/lp/cod-confirmation` that maximises "Start free trial" signups for Indian Shopify D2C brands running COD. "Install on Shopify" is the secondary path. Proof stays honest: a live Trustpilot widget, three real client logos, verifiable claims only.

## Decisions (confirmed with the owner)

| Topic | Decision |
|---|---|
| Route and shell | `/lp/cod-confirmation`, own slim nav and footer, `noindex`, not in sitemap |
| Copy rules | The plan's copy wins over `.cursor/rules/marketing-copy.mdc` for this page (eyebrow and hero microcopy stay). Em dashes are still replaced with commas or periods. |
| Hero visual | Static phone-frame WhatsApp mockup built as live UI. A `HeroMedia` slot accepts an MP4/WebM later with no layout change. |
| Approach | Dedicated page composed from small section components, reusing existing marketing primitives and the billing catalog |

## Out of scope

- Producing the hero video (spec in plan section 9 stays valid for later).
- Creating the Trustpilot TrustBox template ID (needs the owner's Trustpilot business account; see Open items).
- A generic landing-page framework.
- Additional pages for other features.

## Repo findings that shape the design

1. `App.tsx` renders `MarketingNavbar` and `MarketingFooter` around every route (`RouteOutlet`, and the navbar near the top of the app). `/lp/*` must opt out of both.
2. Pricing comes from `src/marketing/lib/billingCatalog.ts` (`fetchBillingCatalog`, `FALLBACK_CATALOG`, `TRIAL = {days: 14, orders: 20}`), guarded by `check:pricing`. The page renders prices from the catalog and does not hardcode them. Yearly shows `effectiveMonthlyLabel` (₹1,599 / ₹3,199 / ₹5,199), matching the plan.
3. In the catalog only Growth and Scale have `journeyCodPrepaid: true`. This matches the plan ("COD to prepaid on Growth and Scale"). Launch plan copy must not imply prepaid links.
4. There is no analytics layer in `index.html` or `src` (no gtag, GTM or `dataLayer`).
5. `MarketingSEO` already supports `noIndex`. Signup handoff uses `dashSignupUrl()` and `DASH_SIGNUP`.
6. Prerender and sitemap path lists live in `scripts/marketing-urls.mjs`.

## Architecture

New files under `src/marketing/pages/lp/` and `src/marketing/components/lp/`:

- `CodLandingPage.tsx`: page composition. Reads `utm_content` (and `utm_campaign`) and picks the hero variant.
- `codHeroVariants.ts`: three variants (`loss`, `speed`, `rto`), each with `h1` and `sub`. Mapping from `utm_content` is a plain lookup table; unknown or missing falls back to `loss` (the recommended headline). The data file is the only place copy variants live.
- Sections: `LpNav`, `LpHero` (`PhoneMockup`, `HeroMedia`, `TrustStrip`), `CostSection`, `HowItWorks`, `ProofSection`, `WhyCards`, `LpPricing`, `LpFaq`, `FinalCta`, `LpFooter`, `StickyMobileCta`, `ConsentBar`.
- `lib/lpTracking.ts`: `trackCta(kind, location)` and UTM helpers.
- `styles/lp.css`: page-scoped styles using the existing tokens (violet `#7C3AED`, pill buttons, shared card radius and shadow).

Registration:
- `App.tsx`: lazy route `/lp/cod-confirmation`; the global navbar and footer are skipped when the pathname starts with `/lp/`. This is done by extending the route check in one place (a helper next to `isMarketingRoute` in `marketing/routes.ts`), not by scattering path checks.
- `scripts/marketing-urls.mjs`: add the path to the prerender list, exclude it from the sitemap. `noindex, nofollow` via `MarketingSEO noIndex`.
- `robots.txt`: no change needed (noindex is page-level; blocking in robots would stop crawlers seeing the noindex).

Below-the-fold sections (`ProofSection` onward) are `React.lazy` split and mounted with an `IntersectionObserver` so LCP is the hero only.

## Sections and data flow

Order and copy follow plan sections 1 to 10, with the adjustments below.

**Hero.** H1, sub, primary "Start free trial →", secondary outlined "Install on Shopify" with bag icon, microcopy line (14 days, 20 orders, no credit card, ~15 minutes). The numbers 14 and 20 come from `TRIAL`, not literals. `PhoneMockup` is static markup with fixed dimensions (no layout shift), WhatsApp green only inside the chat. Aria-label on the mockup describes the confirm/cancel flow in words. `HeroMedia` renders the mockup now; when a video asset is supplied it renders `<video muted autoplay loop playsinline poster>` over the same fixed box.

**Trust strip.** "TRUSTED BY" plus three logos (Choice Salon, Delitech, Apex Light), taken from the existing homepage assets. The Trustpilot badge is the official TrustBox. No Meta badge, counters or invented stats.

**Cost section.** Three cards with amber undertone, closing line bold. SVG icons.

**How it works.** Three steps plus the WhatsApp mockup. Scroll-linked emphasis uses a single `IntersectionObserver` setting an `activeStep` state (1: order number pulse, 2: button highlight, 3: checkmark). Under `prefers-reduced-motion`, all three states render statically.

**Proof.** Trustpilot widget, three verbatim quotes with attribution as in the plan, logo row, "Launched on the Shopify App Store · 30 September 2026". Quotes live in a typed data array with `source` and `date` fields so every quote is traceable.

**Why TopEdge.** Four cards (0% markup, one customer record, COD to prepaid, no usage ceiling), no competitor names, line icons.

**Pricing.** Cycle toggle reuses `CycleToggle` and catalog helpers (`planPricing`, `cycleKey`), yearly preselected. Growth is emphasised, and on mobile it is ordered first. The 0% markup and GST line sits under the table. CTA repeats the hero button and microcopy.

**FAQ.** Seven items per plan section 7, single-open accordion, first open on load. Implemented with native `<details name>` semantics or a small controlled component, whichever the existing `PricingFaq` supports; FAQ content is a data array. FAQPage JSON-LD is not emitted, because the page is noindex.

**Final CTA and footer.** Gradient section mirrors the hero. The footer uses `companyIdentity` for company info, plus a compliance line and links to privacy and terms.

**Sticky mobile bar.** Visible below 768px once the hero CTA row has left the viewport (observer on the hero CTA). `padding-bottom: env(safe-area-inset-bottom)`. Hidden while any input, textarea or select has focus (focusin/focusout on `document`). Adds bottom padding to the page so it never covers the footer.

## Tracking and consent

No analytics exists today, so this page introduces the minimum:

- `trackCta('trial' | 'shopify', location)` pushes `{event: 'cta_click', cta, location, utm_*}` onto `window.dataLayer` (created if absent). It never throws and is a no-op if blocked.
- The tag manager or Google Ads tag itself is not installed by this work; the owner wires it to `dataLayer` (GTM) separately. Events are the contract.
- UTM passthrough: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` (and `gclid` if present) are read once from `location.search`, stored in `sessionStorage` (wrapped in try/catch), and appended to the signup URL built from `dashSignupUrl()`. The "Install on Shopify" link goes to the real Shopify App Store listing URL already used on the site (`bf81691` linked it); the implementation reuses that constant.
- `ConsentBar`: minimal bottom bar with Accept and Decline. The choice is stored in `localStorage` (try/catch). `dataLayer` events are queued but flagged `consent: 'granted' | 'denied' | 'pending'` and the bar does not block interaction. It can be hidden entirely with a single constant while no tag is installed.

## Performance and accessibility

- Hero is the LCP element: static markup, no webfont dependency beyond what the site already loads, fixed dimensions, no layout shift.
- Trustpilot script is loaded `defer`, injected only after the hero is painted (`requestIdleCallback` with timeout fallback). Self-hosting the vendor script is not done; the plan's "self-host" note conflicts with Trustpilot's terms for TrustBox, so the official loader is used instead (flagged in Open items).
- SVG icons and logos only. All tap targets are at least 48px on mobile. Body text is at least 16px. Motion is limited to section fade-up (120 to 200ms), the How-it-works emphasis, and the sticky bar, all disabled under reduced motion.
- Semantic landmarks, one H1, labelled accordion and toggle controls, visible focus states.

## Error handling

- Catalog fetch failure or slow response: the page renders `FALLBACK_CATALOG` immediately (it is the seed) and swaps in live data on success, same as `PricingPage`. No loading spinner in the pricing section.
- Trustpilot script blocked or failed: the container shows a plain text link "See our reviews on Trustpilot" to the profile URL, so the section never renders empty.
- Unknown `utm_content`: default variant. Storage or `dataLayer` failures are swallowed.

## Testing

- Unit (Vitest or the repo's existing runner, to be confirmed in planning): `codHeroVariants` lookup and fallback; UTM parse, store and append (including storage-unavailable); `trackCta` payload and no-throw behaviour; pricing display picks catalog yearly effective labels and orders Growth first on mobile.
- Build checks: `npm run check:pricing`, TypeScript build, and `scripts/seo-audit.mjs` expectations for a noindex route (page is excluded from sitemap, robots meta is `noindex, nofollow`).
- Manual and browser: 360px and 1280px widths for H1 line count (3 lines max on mobile) and mockup legibility; sticky bar show/hide on scroll and on input focus; accordion single-open; reduced-motion; Lighthouse mobile LCP target under 2.5s on a production build.

## Open items

1. **Trustpilot TrustBox template ID and business unit ID** are needed from the owner's Trustpilot account. Until supplied, the fallback text link renders and the placeholder is a single clearly named constant.
2. **Shopify App Store URL constant:** confirm which existing constant to reuse during planning.
3. **Self-hosting the Trustpilot script** is skipped (see above). Owner can overrule.
4. **"No usage ceiling" claim:** the catalog has per-plan order allowances (100, 800 and 1,500 orders per cycle). The plan's card says flow automations are unlimited and not metered, which is about flow runs, not order allowances. Owner should confirm that the wording is accurate before launch, since the plan requires every claim to be verifiable.
5. **Tag installation:** Google Ads or GTM is not installed. This work only emits `dataLayer` events and a consent flag.
