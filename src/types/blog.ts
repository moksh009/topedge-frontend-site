export interface BlogPost {
  id: number;
  title: string;
  description: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content?: string;
}