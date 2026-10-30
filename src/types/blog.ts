export interface BlogPost {
  id: number;
  title: string;
  description: string;
  slug: string;
  date: string;
  /** Optional ISO date when the post was last substantively edited. */
  updated?: string;
  readTime: string;
  category: string;
  author: string;
  /** PNG/JPG: also used for og:image and schema, where WebP support is uneven. */
  image: string;
  /** Lighter WebP rendition of `image` for on-page display. */
  imageWebp?: string;
  imageAlt?: string;
  content?: string;
  keywords?: string[];
  /** Visible FAQ answers + FAQPage schema (pillar / GEO pages). */
  faqs?: { question: string; answer: string }[];
  /**
   * Three or four lines answering the question in the title before the reader
   * scrolls. Rendered as the "Read this first" card above the contents list.
   *
   * This is the single highest-value block on a long post: it is what a reader
   * in a hurry takes away, and it is the passage an answer engine is most
   * likely to lift, because it states the conclusion in plain sentences
   * instead of building to it. Keep each line a complete claim with its own
   * figure where one exists. No summary renders no card, so a post without
   * one still looks finished.
   */
  summary?: string[];
  /**
   * Ranked picks on a listicle post, in the order they are argued on the page.
   *
   * This exists for the schema, not the layout: the body already renders the
   * list as H2 sections, and repeating it in a second component would give a
   * reader the same ranking twice. What the page could not say before is that
   * the H2s *are* a ranking. Competing "best X apps" pages carry ItemList and
   * win the list treatments in AI answers and rich results with it; a post
   * that only carries BlogPosting reads to a machine as prose that happens to
   * mention products.
   *
   * `url` is the thing being ranked, not the section: an app's Shopify App
   * Store listing or its own site, so the entry resolves to an entity outside
   * this page. Leave it off rather than pointing at an anchor.
   */
  itemList?: { name: string; url?: string; description?: string }[];

  /**
   * Images placed between sections, keyed by the heading they follow.
   *
   * `afterHeading` is matched against the slug of an H2 (see slugifyHeading),
   * or its visible text, whichever is easier to keep stable. Posts shipped
   * with zero body images, which is the main reason a 3,500-word post read as
   * a wall; an image every few sections gives the eye somewhere to rest and
   * breaks the scroll into chapters.
   *
   * Only real assets. Never a mocked screenshot, an invented dashboard or a
   * chart built from numbers nobody measured.
   */
  inlineImages?: {
    afterHeading: string;
    src: string;
    webp?: string;
    alt: string;
    caption?: string;
  }[];
}
