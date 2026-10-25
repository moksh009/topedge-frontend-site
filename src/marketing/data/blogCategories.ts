/**
 * Display taxonomy for the blog index, category archives and the strip under
 * each post's hero.
 *
 * The 32 posts carry 14 different `category` strings between them, several of
 * which say the same thing in different words ("Meta" and "Meta & templates",
 * "Guides" and "Basics", "Strategy" and "Growth"). Fourteen tabs is not a
 * navigation bar, it is a list, and renaming the stored categories would
 * change the pill on published posts and the `articleSection` already in their
 * schema.
 *
 * So the raw string stays as the post's own label and this maps it into one of
 * six groups for navigation. Add a new raw category to a group here rather
 * than inventing a seventh group, unless there is genuinely a new subject.
 */
export type BlogCategory = {
  slug: string;
  label: string;
  /** One line under the heading on the category archive. */
  blurb: string;
  /** Raw `category` values from blogPosts.ts that belong to this group. */
  matches: string[];
};

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    slug: 'comparisons',
    label: 'Comparisons',
    blurb:
      'Platform by platform, on published pricing: what each WhatsApp tool charges an Indian Shopify store, and what it adds on top of Meta’s own fees.',
    matches: ['Comparisons'],
  },
  {
    slug: 'automation',
    label: 'Automation',
    blurb:
      'What to automate on Shopify WhatsApp, in what order, and how to get the first cart recovery journey live without breaking anything.',
    matches: ['Ecommerce automation', 'Cart recovery', 'Checklist', 'Basics'],
  },
  {
    slug: 'cod-rto',
    label: 'COD & RTO',
    blurb:
      'Cash on Delivery confirmation, the prepaid switch, and the published Indian RTO figures the whole argument rests on.',
    matches: ['COD'],
  },
  {
    slug: 'meta-templates',
    label: 'Meta & templates',
    blurb:
      'Message categories, template approval, opt-in and quality rating: Meta’s rules, and what they cost you per delivered message in India.',
    matches: ['Meta', 'Meta & templates', 'Compliance'],
  },
  {
    slug: 'ai-and-inbox',
    label: 'AI & inbox',
    blurb:
      'AI that reads the order rather than guessing at it, and a shared inbox that carries Shopify context into every thread.',
    matches: ['AI', 'Inbox'],
  },
  {
    slug: 'growth',
    label: 'Growth',
    blurb:
      'Organic against paid, what a profitable Indian D2C store actually looks like, and where short-form video fits.',
    matches: ['Strategy', 'Growth', 'Guides'],
  },
];

export function categoryBySlug(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((c) => c.slug === slug);
}

/** The group a stored category string belongs to, if any. */
export function groupForCategory(category: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((c) => c.matches.includes(category));
}

/** Posts per page on /blog and /blog/page/N. */
export const BLOG_PAGE_SIZE = 12;
