import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://patrikvadura.cz',
      lastModified: new Date(),
      alternates: {
        languages: {
          cs: 'https://patrikvadura.cz/cs',
          en: 'https://patrikvadura.cz/en',
        },
      },
    },
  ]
}
