# TopEdge AI Blog Content Rules — apply to every blog post task

CONTEXT: TopEdge is a WhatsApp-first e-commerce SaaS for Indian D2C brands
on Shopify. ICP: founders/ops people running COD-heavy Shopify stores,
searching in problem-aware, solution-aware, comparison, or how-to mode.

ALWAYS, before writing any post:
1. Read the existing blog post files first to match exact frontmatter,
   JSON-LD schema pattern, and component structure — never invent a new
   template.
2. Search the blog directory for topic/keyword overlap with what's being
   requested. If a close match exists, stop and report it instead of
   writing a duplicate.

STYLE (reject and rewrite anything that violates this):
- Open every post with a blunt "Quick verdict"
- Name at least one honest tradeoff/limitation per major claim or tactic
- Vary sentence length; second person, founder-to-founder voice
- Cite numbers with source/date; mark anything uncertain as an estimate
- Banned phrases: "in today's fast-paced world," "unlock the power of,"
  "let's dive in," "in conclusion," "it's important to note," "whether
  you're a beginner or an expert," "at the end of the day," "In the
  ever-evolving landscape of..."
- Comparisons go in tables, not prose
- Never fabricate a statistic. Mark unknowns as [NEEDS REAL DATA] and stop
  to ask rather than inventing a plausible number.

TECHNICAL, every post:
- Article/BlogPosting + FAQPage + BreadcrumbList JSON-LD
- Meta title ≤60 chars, meta description ≤155 chars, target keyword in
  both
- Natural keyword placement (title, one H2, 3-5x body) — never stuffed
- Every post links to at least 2 existing posts/product pages with
  descriptive anchor text, and gets added to their "related" footers too

PROCESS, every post:
- Discovery → outline → draft → self-check with actual evidence shown →
  STOP for human review. Never commit, publish, or deploy without
  explicit approval.
- When self-checking, quote the actual sentence/code/output as proof —
  never just state "requirement met" without evidence.