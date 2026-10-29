# Competitor link gap — WATI, AiSensy, Interakt, Bitespeed, Updatrr, Zoko

> Researched 2026-10-29. Builds on `backlink-top3-2026-10-28.md` (which picked
> the three to chase) and the 2026-10-09 gap tables in
> `backlink-opportunities.md`. This pass adds **Updatrr**, verifies competitor
> presence by search, and turns it into `backlink-targets.csv`.
>
> **Nothing here has been submitted.** Every row is a prospect.

## What could not be measured, and why that matters

Two hard limits on this research. Both are stated so nothing below gets read as
more certain than it is.

1. **Semrush returned `no_api_units`.** So there is still no referring-domain
   export for any competitor, and no measured Authority Score. Every authority
   figure below is a third-party vendor estimate, in the right order of
   magnitude and no better. Top up at <https://www.semrush.com/mcp-access> and
   the real gap analysis — *their* referring domains minus ours — becomes a
   five-minute job instead of a search-by-search reconstruction.

2. **Raw HTML of the target pages is unreachable from this environment** (the
   egress policy blocks them, and search tooling returns prose, not markup). So
   **no dofollow claim below is verified.** I searched for it specifically; every
   answer came from SEO vendor blogs that contradict each other — Capterra is
   called dofollow by one and nofollow by another, G2 "mixed", Product Hunt
   mostly nofollow but not unanimously.

   **The check takes 30 seconds per site and you can do it today.** Open a live
   competitor profile, right-click the vendor's website link → Inspect, and read
   the `rel` attribute. Or in the console:

   ```js
   [...document.querySelectorAll('a[href*="wati.io"]')].map(a => [a.href, a.rel])
   ```

   Do that before any paid plan is bought on the strength of a link.

**Do not treat dofollow as the deciding factor here.** The two best targets below
are worth it for reasons that survive a `nofollow`: G2 for the comparison pages
it generates, Meta's directory for buyer trust.

---

## Verified competitor presence

Confirmed by search this pass. "Absent" means TopEdge was not found, not that it
is barred.

| Target | Who is there | TopEdge |
| --- | --- | --- |
| G2 | WATI ~460 reviews · AiSensy ~104 · Interakt ~63 | absent |
| Capterra (`.in` and US) | AiSensy `software/1022328` · Interakt `software/1023144` · WATI `p/204314` | absent |
| AlternativeTo | WATI (page lists 50+ alternatives) · AiSensy (10+) | absent |
| Techjockey (India) | **Updatrr 5/5 from 3 verified reviews** · AiSensy ~4.4 | absent |
| Indie Hackers | **Updatrr product profile** (claims 2,000+ clients — their figure) | absent |
| CB Insights | WATI · AiSensy · Zoko · Interakt · DelightChat | absent |
| Latka / Dealroom | AiSensy (Latka lists 101 employees; Dealroom has the entity) | absent |
| Shopify App Store | Updatrr ~27–30 reviews at 4.9 · Zoko ~368 | **listed, 0 reviews** |
| TrustRadius | Zoko | absent |

Not found on AlternativeTo for Interakt or Bitespeed — so that page is a gap for
them too, not just us.

### The one pattern worth acting on

Updatrr is the smallest competitor in this set and it is on **Techjockey, Indie
Hackers and the Shopify App Store with 29 reviews at 4.9**. It did not earn that
with authority; it earned it by filling in self-serve forms and asking customers
for reviews. That is the entire gap at the bottom of this market, and it is
unblocked by anything except someone sitting down to do it.

The gap at the *top* (G2, Capterra, Meta's directory) is different in kind: it is
gated on **review volume**, which is gated on the Shopify App Store listing
sitting at 0 reviews. **That single number is the critical path for most of this
document.**

---

## The five worth your time

Ranked on relevance × achievability × authority, not on authority alone.

### 1. AlternativeTo — do this first

**Est. DR 78–81. Self-serve. No gatekeeper. Most sources say dofollow.**

Best ratio in the list. WATI's page already carries 50+ alternatives and AiSensy's
10+; an app can be added and nominated as an alternative to each without anyone's
approval. It maps exactly onto the cluster already built — `/compare/wati`,
`/compare/aisensy`, `/blog/wati-alternative-shopify-india` and the other eight
"X alternative" posts. The query it answers ("WATI alternative") is the one
TopEdge already competes for.

Submit against: `/compare/alternatives`.

### 2. G2 — highest ceiling, blocked on reviews

**Est. DR 91. Free profile. Dofollow status genuinely uncertain.**

The reason this outranks every guest post is unchanged from yesterday's doc and
worth restating: G2 **auto-generates a comparison URL for every pair of profiles
in a category**. One TopEdge profile spawns `topedge-vs-wati`,
`topedge-vs-interakt`, `topedge-vs-aisensy` — each a page on a DR 91 domain
aimed at the exact queries `/compare/*` chases, and **no competitor can opt
out**. That value does not depend on the `rel` attribute at all.

New this pass: **G2 has acquired Capterra**, and GetApp and Software Advice sit
in the same group. Reporting says the listings and review pools stay separate,
so treat it as one relationship covering four properties rather than one
submission — but it does mean the vendor onboarding you do once goes further
than it used to.

Paid tiers are reported at $299/mo ($2,999 first year) for review responses,
badges and analytics. **None of that is needed for the link or the comparison
pages.** Do not buy it for SEO.

Blocker: 0 reviews on the Shopify listing. Directory profiles with no reviews
convert badly and editors check the rating first.

### 3. Meta WhatsApp Business Partner directory — the most relevant link in the industry

**Meta-owned (`whatsappbusiness.com/partners`). Gated on performance, not outreach.**

No software directory can match this for topical trust: it is the platform the
product is built on, listing the providers it certifies. It also changes the
reception of every other pitch on this list.

What I could confirm: directory listing is tied to **Tech Partner** status —
Tech Providers who are, or become, Meta Business Partners. It is earned against
eligibility and performance criteria and **cannot be bought**.

What I could not confirm: the thresholds. Vendor blogs report "10+ onboarded
customers and ~2,500 conversations/day", and separately "≥2,500 avg daily
messages over 7 days, or ≥200 avg daily calls". **Neither matched current
official Meta documentation**, so read the Meta for Developers partner pages
before planning against a number. Note too that only *Solution* Partners can
extend a line of credit — a Tech Provider bills through another party.

Treat as a 2–4 quarter goal with a real prize, not a task for this week.

### 4. Inc42 — the editorial play

**Est. DR 72. India D2C trade press. Earned, not placed.**

Unchanged from yesterday's doc and still correct. Their rules, from their own
submission page: .docx, 1000×700 image, 500+ words, **max two links**,
data-backed, **explicitly no promotional pieces**. Address is `editor@inc42.com`
per their contact page, but two of their pages disagree — confirm before sending.

The angle is the only reason this gets accepted: the **2026 COD/RTO benchmark**
at `/blog/cod-rto-benchmark-india-2026` (39.2% festive peak vs 21.0% verified
across 410M+ shipments, with the ₹180–₹240 per-order loss math). That is sector
analysis with original numbers, which is their brief. The two permitted links go
to the benchmark and the homepage.

### 5. The India/SaaS profile cluster — Techjockey, Indie Hackers, Latka, Dealroom, CB Insights

**Est. DR 70–85 each. All self-serve. Individually modest, collectively the Updatrr playbook.**

This is where the smallest competitor beat you, and none of it needs permission.
Techjockey matters disproportionately because it is India-specific and the market
is India. Do these in one sitting.

**Plus, from yesterday's doc and still the best non-permission play: ship a small
MIT-licensed tool on GitHub (DR 100).** A WhatsApp template-approval linter that
checks copy against Meta's guidelines before submission, or a standalone RTO
calculator, with a README link. It is gated on engineering room, not on anyone's
editor, and a genuinely useful repo gets picked up by `awesome-shopify` style
lists — each of which is another link.

---

## Asked and answered: Notion

**Notion is not a link play.** This was researched yesterday and the answer has
not changed: a `notion.site` page sits on a subdomain you do not control, with no
topical authority of its own, and self-published content on free hosting passes
essentially nothing. I could not find a statement from Notion or Google on
whether those outbound links carry `rel="nofollow"` — and that absence is itself
the answer. If `notion.site` were a known-good link source, it would be
documented everywhere.

Use Notion for internal docs if the team likes it. Do not count it as SEO.

The same applies to the broader category the request gestures at — "70 free
backlink sites", profile-creation lists, paid insertions. One of the sources that
surfaced while researching dofollow status states Google's own position plainly:
mass profile creation is named as link spam. **eCommerce Fastlane** is the
concrete example already caught in yesterday's pass: it looks like a clean
Shopify-ecosystem guest post until you read its own page advertising **paid link
insertions**. A domain that sells placements carries a footprint.

A manual action on a site with this much correct technical work would cost more
than these links return, and recovery is slow and uncertain. The five above are
the aggressive version that survives review.

---

## Order of work

1. **Get Shopify App Store reviews.** Drafts exist in `seo-audit/outreach/`. This
   is the critical path — it unblocks G2, Capterra and every roundup pitch, and
   it is the one thing no amount of SEO work substitutes for.
2. **AlternativeTo**, today. No dependency on anything.
3. **The profile cluster** (Techjockey, Indie Hackers, Latka, Dealroom, CB
   Insights), one sitting. Check `rel` on each while you are in there.
4. **G2 + Capterra.in** once reviews exist.
5. **Inc42** with the benchmark.
6. **Top up Semrush**, export referring domains for all six competitors, and
   only then decide on a disavow. A disavow built from guesswork is worse than
   none, because disavowing a good link discards equity already earned.
7. **Meta Tech Partner** as the standing goal.

Add each live profile URL to `ORG.sameAs` in `src/marketing/data/pageSeo.ts`
**once it exists** — never before. A `sameAs` pointing at a 404 is worse than no
`sameAs`.

---

## "Where can we upload content and rank?" — three tiers, only one of which is SEO

Added 2026-10-29 in answer to a direct question. The honest split matters,
because two of these three tiers do not pass meaningful equity and one of them
can actively cost you a ranking.

### Tier 1 — Get into roundups that ALREADY rank. Do this first.

This is the real answer. You are not uploading anything; you are being added to
a page Google already trusts and already ranks for your money queries. Nine new
targets were found this pass and are in the discovery backlog in
`backlink-opportunities.md`, with the five best in `backlink-targets.csv`.

The standout is **ClickPost's "10 Best RTO Reduction Tools for D2C Brands in
India (2026)"**. RTO reduction in India is the exact subject of
`/blog/cod-rto-benchmark-india-2026` and `/features/cod-confirmation`, ClickPost
is an independent India logistics SaaS rather than a WhatsApp competitor, and
TopEdge is absent. Nothing else found ranks that close to the product.

Then **The D2C Pulse** (Interakt currently holds the WhatsApp slot in its Indian
D2C stack list), **The Seller Kit**, **DM Daddy** (pricing-led, so 0% Meta markup
is the hook) and **Project Supply** (educational, so pitch co-citation on the
benchmark data, not list inclusion).

Logged as `pass`: the roundups authored by AiSensy, Zoko, WATI and TailorTalk.
They rank for our queries and will never add us. The counter to those is the
`/compare/*` and "X alternative" cluster that already exists — not a pitch.

### Tier 2 — Contributed editorial. Real links, editor-gated.

Inc42 (est. DR 72) is the one already researched; rules and angle are above. This
is the only tier that reliably produces a dofollow editorial link, and it costs a
written piece plus an editor saying yes. The COD/RTO benchmark is the asset that
makes it possible, because it is original sector data rather than product copy.

### Tier 3 — Self-publishing platforms. Distribution, NOT link equity.

Medium, LinkedIn, Substack, dev.to, Notion. Treat every one of these as audience
reach, never as a backlink, and understand the specific trap:

**If you republish a post on Medium without a canonical, Google may rank the
Medium copy instead of yours.** You would be competing with yourself on a domain
you do not own, using content you already paid to write.

The safe mechanic, if you want Medium's reach: use **Medium's import tool** (or
its publishing API / RSS syndication), which sets `rel=canonical` back to the
original URL. Confirm it worked by viewing source on the Medium post and finding
your topedgeai.com URL in the canonical tag — the import is reported to fail
silently on some embeds, so check rather than assume. LinkedIn has no equivalent
canonical mechanism that I could confirm, so post **summaries that link back**
there, never the full article.

Reddit and Quora rank extremely well and are worth a founder's time for
visibility, but their outbound links are `nofollow ugc` and worth nothing as
equity — the same as Shopify Community, which was already checked and carries
`rel="noopener nofollow ugc"`. There is a table in `backlink-opportunities.md`
for logging those threads; answer as the founder, disclose the affiliation, and
only where the answer is genuinely useful.

**Notion remains a non-starter** for the reasons above: a subdomain you do not
control, no topical authority, and no documented `rel` behaviour.

### The ordering that follows from this

Tier 1 is where the next ten hours should go. Tier 2 is worth one good pitch.
Tier 3 is a distribution habit, not an SEO project — and it is the only tier with
a way to lose something, so if Medium is used at all, use the import tool.
