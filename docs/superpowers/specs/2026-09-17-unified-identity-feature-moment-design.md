# Unified Customer Identity Feature Moment

**Date:** 2026-09-17  
**Status:** Approved design — pending implementation  
**Surface:** Homepage (`HomeStickyStories` + `HomeCrmSurface`)

## Goal

Promote **Unified Customer Identity** from a CRM bento tile into a full feature moment that matches the other homepage showcases: centered title + body, media below. Use a static image (`leaadd.png`) instead of video. Remove the duplicate identity tile from the CRM bento.

## Placement

- Insert as the **last** sticky feature moment (after Website Opt-in Popup).
- Remains **before** the Identity & CRM bento section.

## Copy (locked)

- **Title lead:** Unified Customer  
- **Title accent:** Identity  
- **Body:** Primary + secondary numbers and multiple emails collapse into one lead — so every chat and order stays on the same shopper.

## Media

- Asset: `public/leaadd.png` (served as `/leaadd.png`). Optionally move under `public/marketing/features/` for consistency; either path is fine if referenced correctly.
- Render with existing `DemoProductImageFrame` (same glow chrome as `DemoProductVideoFrame`).
- Glow: `violet`.

## Sticky stories changes

Extend `HomeStickyStories` so each story is either video or image:

- Video stories keep current `DemoProductVideoFrame` behavior.
- Image story uses `DemoProductImageFrame` with `src` + `alt`.
- No new section layout or CSS required beyond existing `.home-sticky*` styles.

## CRM bento changes

- Remove `CRM_BENTO.identity` from data and stop rendering that tile.
- Reflow remaining tiles:
  - **Row 1:** profiles — full width (12 cols)
  - **Row 2:** segments (7 cols) + warranty (5 cols)
- Update `home.css` grid rules; remove identity-specific selectors.
- Keep section header “Identity & CRM” (still accurate for remaining tiles).

## Out of scope

- New video recording
- Changing other feature moments or CRM tile copy/images
- Compressing `leaadd.png` (optional follow-up if load weight matters)

## Success criteria

1. Homepage shows Unified Customer Identity as a centered feature moment with the lead image in the same frame style as video demos.
2. Identity no longer appears as a bento card.
3. CRM bento with 3 tiles has no empty grid hole on desktop or mobile.
4. Mobile stacks like other sticky moments and bento tiles.
