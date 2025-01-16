import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  OrderedListFeature,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    label: 'Velikost',
    defaultValue: 'oneThird',
    options: [
      {
        label: '1/3',
        value: 'oneThird',
      },
      {
        label: '1/2',
        value: 'half',
      },
      {
        label: '2/3',
        value: 'twoThirds',
      },
      {
        label: 'Na celou šířku',
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          UnorderedListFeature(),
          OrderedListFeature(),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
    localized: true,
  },
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      label: 'Sloupce',
      fields: columnFields,
    },
  ],
  labels: {
    singular: 'Sloupec',
    plural: 'Sloupce',
  },
}
