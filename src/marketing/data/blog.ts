type BlogPost = {
  slug: string;
  title: string;
  description?: string;
  category?: string;
  date?: string;
  readTime?: string;
  image?: string;
  hiddenFromMarketing?: boolean;
};

export function filterMarketingBlogPosts<T extends BlogPost>(posts: T[]): T[] {
  return posts.filter((p) => !p.hiddenFromMarketing);
}

export function isMarketingBlogPost(post: BlogPost): boolean {
  return !post.hiddenFromMarketing;
}
