import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://common-dev-tools.netlify.app'
  
  // List of all tools
  const tools = [
    'base64',
    'jwt',
    'json',
    'url',
    'hash',
    'timestamp',
    'uuid',
    'password',
    'regex',
    'diff'
  ]
  
  // Homepage
  const homepage = {
    url: baseUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  }
  
  // Tool pages (highest priority after homepage)
  const toolPages = tools.map(tool => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))
  
  // Legal/info pages
  const staticPages = [
    { slug: 'privacy', priority: 0.5 },
    { slug: 'terms', priority: 0.5 },
    { slug: 'about', priority: 0.6 },
    { slug: 'contact', priority: 0.6 },
  ].map(page => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: page.priority,
  }))
  
  return [homepage, ...toolPages, ...staticPages]
}