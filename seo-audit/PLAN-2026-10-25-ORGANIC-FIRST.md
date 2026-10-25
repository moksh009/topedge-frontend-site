# Plan: organic-first build, Google Ads off, Meta after Diwali

Written 2026-10-25. Supersedes the channel assumptions in
`BASELINE-2026-10-25.md` §5, which read the content priority off the Google Ads
account. That account is now paused.

## What changed, and what it means

| Before | Now |
|---|---|
| Google Ads Search, India, ₹325/day live | **Paused** |
| Paid search gave a demand signal organic could follow | **No demand signal from paid at all** |
| Traffic was high-intent, keyword-typed, desktop-weighted by bid | Next traffic is **Meta ads + influencer reels**, after Diwali |

Three consequences, in the order they bite:

**1. Organic is the only acquisition channel for the next two weeks.** There is
no paid floor under the funnel. Whatever the money pages do is what the business
gets. That raises the commercial pages from "important" to "the whole job".

**2. The demand evidence is now historical, and I should say so.** The finding
that `shopify apps` carries 1k-10k searches at Low competition, and that ad group
AG13 posted the account's best CTR at 14.29%, came from a live account between
11 and 18 October. It is still the best evidence we have about what Indian
Shopify merchants type, and it is the reason `/shopify-whatsapp-integration` is
first in this plan. But it is now a dated observation, not a live signal, and
nothing new will arrive to confirm it while the account is off.

**3. Meta reel traffic is cold and mobile, which is almost the opposite of
search traffic.** A reel viewer did not type a problem into a box. They need to
be told what this is, shown it works, and given a path that completes on the
phone they are holding. Two things follow, and the second is a warning:

- Brand search will rise, because reels make people look you up. The brand SERP,
  the homepage, and anything that answers "is this real" (reviews, case studies)
  matter more than they did last week. The Shopify listing sitting at **0
  reviews** therefore costs more now than it did on 7 October.
- **The signup path has a mobile cliff.** Project memory records that
  `Dashboard.jsx` and `FlowBuilder.jsx` carry zero responsive classes, and that
  `MobileDesktopGate` shows an active-trial merchant on a narrow viewport a
  "finish this on a laptop" screen. Signup itself is responsive, verified at
  375px. For keyword-typed desktop-weighted search traffic that was a tolerable
  trade. **For reel traffic, which is overwhelmingly phone traffic, it is the
  funnel.** This is not a content problem and it is not in this repo, but it
  will decide whether the Meta spend converts, so it belongs in the plan.

## The real reason the money pages are thin

I expected to find thin copy. What is actually there is a **thin data model.**

`SeoTopic` in `src/marketing/data/seoTopics.ts` accepts exactly this:

```
answerFirst: string
sections:    { h2: string; body: string }[]
bullets:     string[]
faqs:        { question, answer }[]
```

A `section` is one heading and one paragraph. There is no table, no step list,
no figure, no callout. **The page cannot render anything except paragraph after
paragraph, because the type will not carry anything else.** Writing more words
into that shape produces exactly the wall of text we do not want.

`/compare/alternatives` has the same problem from the other direction:
`AlternativeEntry` carries `{ name, logo, oneLiner }`, so the page can only ever
be a logo directory with one line each. For a query like "wati alternative" the
reader wants a decision table, and a directory cannot be one.

So the first job is not writing. It is giving the content model somewhere to put
structure.

## Phases

### Phase 1 — a block model for topic pages (engineering, no copy)

Extend `SeoTopic` with an optional `blocks` array and render it with the
existing `mkt-` design vocabulary. New block kinds, each chosen because it makes
content **scannable, keyword-dense and quotable at the same time**:

| Block | Why it earns its place |
|---|---|
| `specTable` | What a comparison query actually wants. Dense in entities and attributes, which is also what an answer engine lifts |
| `steps` | "How to connect X to Y" intent, as discrete steps rather than a paragraph describing steps |
| `figures` | **The citability fix.** A rupee figure, its publisher, and a link to the page it came from. `SERP-RECON-2026-10-19` found that everything outranking us answers with specifics |
| `checklist` | Do / do not pairs. Reads in two seconds, carries real operational advice |
| `callout` | A policy constraint or a warning, visually separated so it is not lost mid-paragraph |
| `toc` | Derived from block headings. The brief asks for it on longer pages |

Rules this phase must hold to:
- Reuse existing tokens and components (`Section`, `SectionHeading`,
  `MarketingCard`, `mkt-card`, `--mkt-max-text`, `#7C3AED`). No new look.
- **Mobile first, and this is not decoration.** Tables restack or scroll
  horizontally below 768px. The next traffic is phone traffic.
- Every figure cites `src/data/sources.ts` by id, so the publisher and the
  verified date render with the number and the build can check the host.
- **No em dashes.** House rule, build-enforced on blog posts, owner's call.

### Phase 2 — `/shopify-whatsapp-integration` (P0)

474 words today, and the strongest keyword evidence we have points at it. Rebuild
on Phase 1 blocks: the answer up front, what syncs as a spec table, a real setup
sequence, Meta's India rate card as cited figures, a COD section, and an
expanded FAQ. Structured, not longer for its own sake.

### Phase 3 — `/compare/alternatives` (P0)

Turn the directory into a decision table across the ten platforms: pricing
basis, Shopify-native or not, COD to prepaid, markup on Meta fees, trial terms.
Every competitor price links to that competitor's own published pricing page,
which is already permitted in `ALLOWED_EXTERNAL_HOSTS`. Verdict line per row.

### Phase 4 — `/integrations` and the 14 `/features/*` pages

541 words and 593 to 697 words respectively, all below the 991-word median. Add
spec blocks and cited figures. Mechanical once Phase 1 exists.

### Phase 5 — three case studies (blocked, not by me)

Delitech Smart Home, Apex Light, First Resort. Competitors run 21 to 71
case-study URLs; we have zero. **Needs written merchant approval for any
figure.** I will not estimate a number on a merchant's behalf.

### Phase 6 — Meta and reel readiness, before the ads go live

The mobile cliff above, the Shopify reviews, and landing pages built for reel
traffic rather than for search traffic. The existing `/lp/*` pages were written
for Google Ads keywords and are `noindex`, so they are not part of the organic
work, and they should be revisited before Meta spend starts rather than now.

## Order of work, and why this order

1. **Phase 1 first**, because Phases 2, 3 and 4 are all blocked on it and all
   three produce paragraph soup without it.
2. **Phase 2 next**, because it is the page with the best demand evidence.
3. Phase 3, then Phase 4.
4. Phase 5 starts the day a merchant replies.
5. Phase 6 has a real deadline, Diwali, and is mostly not in this repo.

## What I am not doing, deliberately

- Not building a programmatic page farm. DelightChat's 4,936 `/apps/*` pages run
  523 to 526 words with H1 = app name and one H2 = developer name. It is thin
  content, the brief forbids it, and it inflates their URL count by 69%.
- Not chasing competitor URL counts. Wati's 111 "template" URLs are largely
  consolidated: two different slugs serve the same 4,744-word page.
- Not touching `/lp/*` yet. They are `noindex` and built for a channel that is
  now off.
- Not inventing a single figure. Every number comes from
  `src/data/sources.ts`, with publisher and verified date rendered beside it.
