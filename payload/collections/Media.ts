import type { CollectionConfig } from 'payload/types';

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: '/tmp',
    formatOptions: {
      format: 'webp',
    },
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        formatOptions: {
          format: 'webp',
        },
        position: 'centre',
      },
      {
        name: 'square',
        width: 1000,
        height: 1000,
        formatOptions: {
          format: 'webp',
        },
        position: 'centre',
      },
      {
        name: 'squareSmall',
        width: 300,
        height: 300,
        formatOptions: {
          format: 'webp',
        },
        position: 'centre',
      },
      {
        name: 'card',
        width: 1024,
        height: 768,
        formatOptions: {
          format: 'webp',
        },
        position: 'centre',
      },
      {
        name: 'cardVertical',
        width: 768,
        height: 1024,
        formatOptions: {
          format: 'webp',
        },
        position: 'centre',
      },
      {
        name: 'desktop',
        width: 1920,
        height: undefined,
        formatOptions: {
          format: 'webp',
        },
        position: 'centre',
      },
      {
        name: 'desktopCropped',
        width: 1920,
        height: 1080,
        formatOptions: {
          format: 'webp',
        },
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        formatOptions: {
          format: 'webp',
        },
        position: 'centre',
      },
      {
        name: 'tabletCropped',
        width: 1024,
        height: 700,
        formatOptions: {
          format: 'webp',
        },
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    resizeOptions: {},
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ]
}
