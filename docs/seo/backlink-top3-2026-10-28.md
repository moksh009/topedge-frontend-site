# The three backlinks worth chasing — researched 2026-10-28

> Researched by reading the publishers' own submission pages and third-party
> authority estimates. Every number below says where it came from and how far
> to trust it. Nothing here has been sent, submitted or published.

## First, what the audit found about the existing links

**No backlink has ever been placed from this repository.** Every row in
`backlink-opportunities.md` carries status `todo` or `drafted`; `sent` and
`won` are both empty, and `outreach-drafts-week1.md` opens with "do not send".
The site's own outbound links were also checked: 42 distinct external hosts,
all of them either our own properties, Meta/Shopify/Schema.org documentation,
cited research (Baymard, Unicommerce, Amazon India, firstresort.in), or named
competitors in comparison tables. **There is no spam domain and no Chinese
domain anywhere in the codebase.**

So if low-quality links to topedgeai.com exist in the wild, they were not
created from here. They cannot be removed from here either — a backlink lives
on someone else's server. The only remedies are: ask the site to remove it, or
file a Search Console disavow. **A disavow must be built from a real referring
domain export** (Semrush or Ahrefs). `backlink-opportunities.md` records that
the Semrush account is out of API units, which is why no export exists yet.
Guessing at a disavow list is worse than having none, because disavowing a good
link throws away equity you already earned.

What *was* junk, and is now gone: the Tier C prospect table had grown to 15
rows of scraped directories and thin "N best alternatives" listicles found by
search and never opened. Those are purged. They were prospects, not links.

---

## 1. G2 vendor profile — the single highest-leverage row

**Authority:** third-party directory trackers put G2 at DR 91. That figure
comes from marketing sites rather than G2 or a tool we ran, so treat it as an
estimate in the right order of magnitude, not a measurement.

**Why this one first, above any guest post.** G2 auto-generates a comparison
URL for every pair of profiles in a category — `g2.com/compare/aisensy-vs-wati`
exists without either vendor asking for it. One TopEdge profile therefore
spawns `topedge-vs-wati`, `topedge-vs-interakt`, `topedge-vs-aisensy` and so
on: each is a page on a high-authority domain targeting exactly the comparison
queries our own `/compare/*` pages chase, and no competitor can opt out of
them. WATI (~460 reviews), AiSensy (~104) and Interakt (~63) are all there and
we are not.

**Cost:** claiming a basic profile is free. Responding to reviews, badges and
analytics sit behind a paid plan (reported at $299/mo, $2,999 first year) —
none of which is needed for the link or the comparison pages.

**The honest caveat:** sources disagree on whether the profile's website link
is dofollow. One guide says the product-profile website link is dofollow;
another says it is mixed and may be nofollow; the most careful one notes G2
does not market the free profile as a guaranteed dofollow link. **Check the
`rel` attribute on a live competitor profile before counting on equity.** Even
nofollow, the branded-search visibility and the auto-spawned comparison pages
justify it.

**Blocker:** the Shopify App Store listing shows 0 reviews. Directory profiles
with no reviews convert badly and most editors check the rating first.

---

## 2. Inc42 guest column — India D2C press, editorially earned

**Authority:** a third-party directory tracker puts Inc42 at DR 72. Same
caveat: estimate, not a measurement we took.

**Why it fits.** Inc42 is India's startup and D2C trade press. It is the
audience that buys this product, writing about the market this product is
built for, and a link from it is topically relevant in a way no software
directory is. Its guest-post page accepts founder advice and sector analysis.

**Their rules, from their own submission page:** .docx, a 1000×700 image, more
than 500 words, **no more than two links**, data-backed, and explicitly **no
promotional pieces**. Guest columns go to `editor@inc42.com` per their contact
page — note their two pages disagree on the address, so confirm before sending.

**The angle that gets accepted.** Not "TopEdge is the best WhatsApp app." We
already hold data nobody else is publishing: the 2026 COD and RTO benchmark
(39.2% festive peak against 21.0% verified, across 410M+ shipments, with the
₹180–₹240 per-order loss math) sitting at
`/blog/cod-rto-benchmark-india-2026`. That is a sector analysis with original
numbers — exactly the "data-backed, not promotional" brief — and the two
permitted links go to the benchmark post and the company.

---

## 3. An open-source tool on GitHub — DR 100, no permission needed

**Authority:** github.com is DR 100 and needs nobody's approval.

**Why it is real and not a trick.** Tiers A and B of the tracker are gated on
other people: reviews before directories convert, an editor before a column
runs. This one is gated on us shipping something. A small, genuinely useful
MIT-licensed tool in our exact problem space — a WhatsApp template-approval
linter that checks copy against Meta's template guidelines before submission,
or a standalone RTO cost calculator — carries a README link to topedgeai.com,
and a repo that solves a real problem gets picked up by `awesome-shopify` and
`awesome-whatsapp` style lists, each of which is another link.

**Why this one over a Notion page.** Notion came up as an option. It is not a
link play: a `notion.site` page is on a subdomain we do not control, with no
topical authority of its own, and self-published content on free hosting passes
essentially nothing. I could not find a statement from Notion or Google on
whether those outbound links carry `rel="nofollow"`, which is itself the
answer — if it were a known-good link source, that would be documented. Use
Notion for docs if it is useful to the team; do not count it as SEO.

**Also why not eCommerce Fastlane**, which looks attractive on first search:
its own pages advertise **paid link insertions** alongside guest posts. Paid
links are a link scheme under Google's spam policies. The guest-post route can
be legitimate, but a domain that sells placements carries a footprint, and that
is the exact category of link this cleanup is removing.

---

## What is explicitly not recommended

- **Forum signatures, including Shopify Community.** Checked: outbound links
  there carry `rel="noopener nofollow ugc"`. Worth answering for visibility,
  worth nothing as a link.
- **Any directory that charges for placement**, or any "70 free backlink
  sites" list. That is the same category of link this pass just purged.
- **A disavow file built from guesswork.** Get the referring-domain export
  first.

## Order of work

1. Collect ~10 honest Shopify App Store reviews (drafts already written in
   `seo-audit/outreach/`). This unblocks G2 and every roundup pitch.
2. Claim the free G2 profile; check the `rel` attribute while you are there.
3. Pitch Inc42 with the COD/RTO benchmark as sector analysis.
4. Ship the open-source tool when there is engineering room.
5. Top up Semrush, export referring domains, and only then decide on a disavow.

Add each live profile URL to `ORG.sameAs` in `src/marketing/data/pageSeo.ts`
once it exists — never before, because a `sameAs` pointing at a 404 is worse
than no `sameAs`.
