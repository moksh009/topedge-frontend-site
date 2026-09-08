# Analytics Growth Loop Implementation Plan

> **For agentic workers:** Implement task-by-task. Visual QA via `?heroDebug=1` and sticky in-view playback.

**Goal:** Soft-fix hero Act 3 camera + rewrite analytics UI as capture→retarget→broadcast; upgrade Pixel sticky film; add Audience & Broadcast sticky film.

**Architecture:** Keep beat indices 18–20. Replace `AnalyticsDesktop` panels and phone flags for 19–20. Soften `is-cam-an-*` CSS. Extend `PixelInsightsFilm` flags. Register new `audience-broadcast` FeatureFilm + STORIES entry.

**Tech Stack:** React + existing HeroJourneyStage / FeatureFilm kit + `home.css` / `feature-films.css`.

## Global Constraints

- Do not renumber beats ≥ 21
- Phone never scales with lens
- No Instagram marks
- Prefer-reduced-motion: final success state
- Do not commit unless user asks

---

### Task 1: Soft analytics cameras + timeline durations

**Files:**
- Modify: `src/marketing/components/home/HeroJourneyStage.tsx` (TIMELINE beats 18–20)
- Modify: `src/marketing/styles/home.css` (`is-cam-an-kpi|mid|bot`)

- [ ] Set beats 18/19/20 to ~3000ms; beat 19 cam → `is-cam-an-mid`; beat 20 → `is-cam-an-bot`
- [ ] CSS: mid `scale 1.10 / ty +3%`; bot `scale 1.10 / ty −3%`; kpi alias mid (no +10%)
- [ ] Update SCENE_CARD.analytics copy to Capture the loop

### Task 2: Rewrite AnalyticsDesktop + phone Act 3

**Files:**
- Modify: `HeroJourneyStage.tsx` (`AnalyticsDesktop`, `PhonePanel`, SCENE_CARD)
- Modify: `home.css` (analytics growth panels; reuse aud/camp shells if useful)

- [ ] Beat 18 UI: pixel install + 5 opt-ins + phones captured
- [ ] Beat 19 UI: visit monitor + retarget CTA; phone journey template
- [ ] Beat 20 UI: audience select + broadcast send + lift chip; phone delivery tick

### Task 3: Upgrade PixelInsightsFilm + sticky copy

**Files:**
- Modify: `films/PixelInsightsFilm.tsx`
- Modify: `feature-films.css` as needed
- Modify: `HomeStickyStories.tsx` pixel story body/title

### Task 4: New AudienceBroadcastFilm

**Files:**
- Create: `films/AudienceBroadcastFilm.tsx`
- Modify: `types.ts`, `FeatureFilm.tsx`, `HomeStickyStories.tsx`, `feature-films.css`

### Task 5: Visual QA

- [ ] Debug step beats 18–20: soft cams, readable sequence
- [ ] Sticky pixel + new audience film play in-view
- [ ] Confirm beats 21+ / delivered drag still correct
