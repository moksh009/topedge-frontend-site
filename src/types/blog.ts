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
}
