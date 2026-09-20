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
  image: string;
  imageAlt?: string;
  content?: string;
  keywords?: string[];
  /** Visible FAQ answers + FAQPage schema (pillar / GEO pages). */
  faqs?: { question: string; answer: string }[];
}
