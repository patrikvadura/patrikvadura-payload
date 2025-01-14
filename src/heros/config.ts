import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Typ',
      options: [
        {
          label: 'Žádny',
          value: 'none',
        },
        {
          label: 'Výrazný',
          value: 'highImpact',
        },
        {
          label: 'Běžný',
          value: 'mediumImpact',
        },
        {
          label: 'Jednoduchý',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
      localized: true,
    },
    linkGroup({
      overrides: {
        maxRows: 1,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      label: 'Obrázek',
      admin: {
        condition: (_, { type } = {}) => ['mediumImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'typoPath',
      type: 'code',
      label: 'SVG Path',
      required: true,
      admin: {
        condition: (_, { type } = {}) => ['highImpact'].includes(type),
        language: 'html',
        editorOptions: {
          padding: { top: 12 },
        },
      },
      localized: true,
    },
  ],
  label: false,
}
