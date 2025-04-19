import { MetadataRoute } from 'next'
import { blogPosts2 } from '../data/blogPosts2'
import { blogPosts3 } from '../data/blogPosts3'
import { blogPosts4 } from '../data/blogPosts4'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://topedgeai.com'
  
  // Combine all blog posts
  const allBlogPosts = [...blogPosts2, ...blogPosts3, ...blogPosts4]

  // Main pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 1.0
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as const,
      priority: 0.9
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.7
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly' as const,
      priority: 0.7
    }
  ]

  // Blog posts
  const blogUrls = allBlogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.6
  }))

  return [...mainPages, ...blogUrls]
} 