type BlogPost = {
  slug: string;
  title: string;
  description?: string;
  category?: string;
  date?: string;
  readTime?: string;
  image?: string;
  hiddenFromMarketing?: boolean;
  keywords?: string[];
};

export function filterMarketingBlogPosts<T extends BlogPost>(posts: T[]): T[] {
  return posts.filter((p) => !p.hiddenFromMarketing);
}

export function isMarketingBlogPost(post: BlogPost): boolean {
  return !post.hiddenFromMarketing;
}

/** Terms on nearly every post; they say nothing about topical closeness. */
const GENERIC_TERMS = new Set(['shopify', 'whatsapp', 'india', 'indian', 'for', 'the', 'and', 'with', 'vs', 'to', 'of', 'a', 'in', 'on', 'how', '2026', 'automation', 'ecommerce', 'store', 'stores', 'app', 'apps']);

function topicTerms(post: BlogPost): Set<string> {
  const text = [post.title, ...(post.keywords ?? [])].join(' ').toLowerCase();
  return new Set(text.split(/[^a-z0-9]+/).filter((t) => t.length > 1 && !GENERIC_TERMS.has(t)));
}

/**
 * Related posts by topic (same category, then shared title/keyword terms).
 * Taking the first N of the list gave every post the same three links, so a
 * few posts collected most internal links and newer ones got almost none.
 */
export function relatedBlogPosts<T extends BlogPost>(post: T, all: T[], count = 3): T[] {
  const terms = topicTerms(post);
  const self = Math.max(0, all.findIndex((p) => p.slug === post.slug));
  return all
    .map((p, index) => ({ p, index }))
    .filter(({ p }) => p.slug !== post.slug && isMarketingBlogPost(p))
    .map(({ p, index }) => {
      const other = topicTerms(p);
      let shared = 0;
      for (const t of other) if (terms.has(t)) shared += 1;
      // Normalised so posts with long keyword lists don't match everything.
      const similarity = shared / Math.sqrt(Math.max(1, terms.size * other.size));
      const score = (p.category && p.category === post.category ? 1 : 0) + similarity;
      // Ties rotate from this post's position so fillers spread across posts.
      const rotation = (index - self + all.length) % all.length;
      return { p, score, rotation };
    })
    .sort((a, b) => b.score - a.score || a.rotation - b.rotation)
    .slice(0, count)
    .map(({ p }) => p);
}
