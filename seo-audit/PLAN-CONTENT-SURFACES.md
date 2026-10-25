# Build plan: the content surfaces we are missing

Written 2026-10-25. Companion to `PLAN-2026-10-25-ORGANIC-FIRST.md`, which sets
the channel context (Google Ads paused, Meta plus influencer reels after
Diwali, organic is the only channel until then).

This plan covers the **page types** competitors have and we do not. One surface
at a time, each finished and verified before the next starts.

---

## 1. What the competitors actually have

Captured 2026-10-25 by fetching each page and reading its structure. Counts are
headings and link families on the live page, not estimates.

| Surface | Wati | What it is | We have |
|---|---|---|---|
| Glossary | `/watipedia/` | **42 term entries** under one H1, each its own page | nothing |
| Template library | `/whatsapp-templates/` | H1 "Festive Messaging Made Easier", 41 internal template links, heavy i18n | nothing |
| Case studies | `/case-studies/` | Hub with ~50 study links, "Over 16,000+ customers" | `/customers`, one page |
| Chatbot examples | `/chatbot-examples/` | 13 example links, "Launch your chatbot quickly with pre-designed templates" | nothing |
| Head-to-head LP | `/wati-vs-interakt/` | A sales page, separate from a spec board | `/compare/*`, 14 boards |
| Help centre | `support.wati.io` | Separate subdomain | `dash.topedgeai.com/docs` |
| Course | Udemy | Third-party distribution | nothing |

Updatrr's homepage is worth noting because it is the closest positioning to
ours: "Recover Carts. Confirm COD. Sell on WhatsApp. All Automated.", eight H2s,
1,504 words, 23 images. They say the same things we do, more plainly.

**The structural lesson from `/wati-vs-interakt/`**, which is the page I would
steal the shape of: it is not a spec table. It runs *why customers switch* →
*at a glance* → *what their customers are unhappy about* → *the advantage* →
*success stories* → *third-party ratings*. Our `/compare/*` boards are all
table and no argument. That is a rewrite, not a new page, and it is cheap.

### What we will not copy

- **i18n.** Wati runs 8+ locales. We sell to Indian Shopify merchants in
  English and Hindi. Locale pages would be pure URL inflation for us.
- **Volume for its own sake.** Watipedia's 42 entries work because each one is
  a real definition. DelightChat's 4,936 `/apps/*` pages at 523 words each are
  the counter-example and the brief forbids that shape.
- **"16,000+ customers" style proof.** We cannot write a number we do not have.

---

## 2. What we can build honestly, today

Everything below is grounded in what the product actually ships. Source:
`shared/template-catalog.json` and `chatbot-backend-main/constants/` in the
dashboard repo, read 2026-10-25.

**Four shipped automations** (`featureAutomations`):

| Automation | Templates it uses | Configure route |
|---|---|---|
| Order status messages | `order_status_confirmed_v1`, `order_status_shipped_v1`, `order_status_delivered_v1`, `cod_confirmation_v1` | `/journeys` |
| Cart leads recovery | `cart_recovery_1`, `_2`, `_3` | `/journeys` |
| COD → prepaid nudge | `eco_cod_prepaid_switch` | `/journeys` |
| Warranty certificate | `warranty_registration_v1` | `/warranty-hub` |

**Eleven template slots** in three groups:

- `order_messages`: order confirm, COD confirm, COD confirm v2, shipped (image
  header + track URL), delivered, cancelled
- `cart_recovery`: three steps, product image, Buy now link, contact support
- `audience_programs`: warranty certificate, COD prepaid incentive

That is a real library. We do not have to invent a single template to publish a
template page, and we must not add one that is not in that catalogue.

---

## 3. The surfaces, in build order

Ordered by (demand evidence × how much of it we can honestly fill) ÷ effort.

### Phase 1 — `/whatsapp-journey-examples` (our answer to chatbot-examples) — DONE 2026-10-25

**Why first.** It is the only one of these where the product *is* the content.
Four shipped automations with real trigger/step/outcome structure, and it feeds
straight into the trial.

**Shape.** Index page plus one page per automation (4 children).

- Index: what a journey is, the four automations as cards, when to use which.
- Child: the trigger, the steps in order, which Meta template category each
  step uses and therefore what it costs, the branch points, what to measure.

**Reuse.** The `TopicBlocks` system built in Batch 12 already has `steps`,
`specTable`, `figures` and `callout`. No new components needed.

**Checklist**
- [x] `journeyExamples.ts` with the 4 automations, from the catalogue
- [x] index at `/whatsapp-journey-examples`, route + prerender + sitemap
- [x] 4 child routes under `/whatsapp-journey-examples/`
- [x] Per step: Meta category and the ₹ rate, on the badge
- [x] Cross-linked to siblings, `/features/journeys`, blog posts, pricing
- [x] `BreadcrumbList` + `FAQPage` + `WebPage`, no HowTo claimed
- [x] Mobile verified at 375px, no overflow
- [x] Gates all green, 83 prerendered / 0 failed

### Phase 2 — `/whatsapp-templates` (festival + transactional library) — DONE 2026-10-25

**Why second.** Wati's page is explicitly festival-led, we sell into a market
where Diwali is the peak, and the owner has asked for it. AiSensy's equivalent
pages run 1,863 to 2,130 words each, which is the depth bar.

**Honesty constraint, and it is the whole risk on this page.** We publish the
**11 slots that exist**. A festival variant is a *copy variant of an existing
approved slot*, not a new capability. Every sample must be labelled with its
Meta category, because that is what decides the price, and no sample may imply
approval we do not have.

**Checklist**
- [x] What a template is, why category decides cost, approval flow
- [x] The 11 slots grouped as shipped
- [x] Per slot: purpose, category, rate, trigger, Meta name, phone preview
- [x] Festival section: 3 Diwali variants, labelled as rewrites
- [x] Linked to the rejection post, rate card, opt-in post, journeys
- [ ] Hindi/Hinglish variants where the RTO post already has them
- [x] Mobile verified at 375px, all gates green

### Phase 3 — `/customers/<slug>` case studies

**Blocked on merchants, not on us.** Competitors run 21 to 71; we have one
`/customers` page. Three named merchants already on the site: Delitech Smart
Home (Ved Patel), Apex Light, First Resort. Drafts to ask them are in
`seo-audit/outreach/`.

**Checklist**
- [ ] Send the outreach drafts (owner)
- [ ] Get written approval for every figure quoted
- [ ] Hub at `/customers` listing children
- [ ] 3 children, each: the problem, what was set up, what changed, in their words
- [ ] No number without merchant sign-off, in writing

### Phase 4 — rewrite `/compare/*` around the argument

Our 14 boards are all table. Wati's head-to-head page runs an argument and puts
the table in the middle of it. Same data, better order, no new URLs.

**Checklist**
- [ ] Opening: why a merchant is on this page at all
- [ ] Keep the existing matrix as the "at a glance" block
- [ ] A "what you give up either way" section, because a comparison that says we win everything is not believed
- [ ] Close on the switch test already written for the alternative posts

### Phase 5 — glossary, only if Phases 1 to 4 land

Watipedia is 42 definitions. Ours would be maybe 25 that matter: RTO, COD,
WABA, utility template, opt-in, quality rating, conversation window, BSP.
Strong for answer engines, which like definitions. **Lowest priority**, because
a glossary earns nothing on its own if the money pages are still thin, and it
is the easiest of these to turn into filler.

---

## 4. Images

Gemini image generation is **confirmed working** in the in-app browser,
signed in, as of 2026-10-25.

**Rules for generated images.** They illustrate concepts: a journey branching,
a cost comparison, a festival banner. They must never depict a product UI we do
not have, a merchant result, a dashboard screenshot or a chat transcript that
could be mistaken for a real one. Anything showing the product comes from a real
screenshot. Anything showing a number comes from `src/data/sources.ts`. Every
in-article image keeps the "Sample preview" caption convention where it depicts
a composition rather than a photograph.

**Prompt recipe**, matched to the existing brand (violet `#7C3AED`, white, soft
shadow, Inter Tight / Plus Jakarta Sans, generous whitespace):

> A clean flat vector illustration for a B2B SaaS blog header, 1200x675, violet
> `#7C3AED` and white, soft long shadows, plenty of negative space, no text, no
> logos, no human faces, subject: `<the concept>`, modern Indian ecommerce
> context, minimal, premium, light background.

**Checklist**
- [ ] Generate one header, confirm it matches the palette, land it on one post
- [ ] Only then batch the rest, 4 at a time
- [ ] Re-encode to WebP under 100 KB (`check:images` fails the build above that)
- [ ] Descriptive filename, real alt text written after looking at the result
- [ ] Never ship a generated image as a product screenshot

---

## 5. Standing rules for every phase

Copied here so no phase has to go looking for them.

- **No em dashes.** Build-enforced on blog posts.
- Every figure traces to `src/data/sources.ts`, rendered with publisher and date.
- Use the `TopicBlocks` system. Do not write more paragraphs into a page that
  needs a table.
- New URL means: route in `App.tsx`, entry in `scripts/marketing-urls.mjs`,
  prerender, sitemap, self-canonical, one H1, title 15-65, description 110-160.
- Mobile first, verified at 375px with zero horizontal overflow. Next traffic is
  reel traffic, which is phone traffic.
- Gates before "done": `CI=1 npm run build:static`, `seo:contracts`, `seo:audit`,
  `check:lp`, eslint, tsc.
- Nothing is "done" because it was written. It is done when it was checked.

## 6. Order of work

1. **Phase 1** `/journeys/examples` — the product is the content, nothing blocks it
2. **Phase 2** `/whatsapp-templates` — festival timing, and the catalogue is real
3. **Phase 4** `/compare/*` rewrite — no new URLs, pure uplift
4. **Phase 3** case studies — starts the day a merchant replies
5. **Phase 5** glossary — only after the money pages are no longer the thinnest

Images run alongside whichever phase is live, one batch at a time.
