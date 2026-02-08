import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://arvo.team'

  return [
    {
      url: baseUrl,
      lastModified: '2026-01-25',
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: '2026-01-25',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: '2026-01-25',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: '2026-01-25',
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: '2026-01-25',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/members`,
      lastModified: '2026-01-25',
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]
}