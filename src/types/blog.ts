export interface BlogPost {
  id: number;
  title: string;
  description: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  image: string;
  imageAlt?: string;
  content?: string;
  keywords?: string[];
}