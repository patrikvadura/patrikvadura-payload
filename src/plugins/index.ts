import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}

const generateURL: GenerateURL<Post | Page> = ({ doc, req: { locale } }) => {
  const url = getServerSideURL()

  // return doc?.slug ? `${url}/${doc.slug}` : url

  return doc?.slug
    ? `${process.env.NEXT_PUBLIC_SERVER_URL!}/${locale}`
    : process.env.NEXT_PUBLIC_SERVER_URL!
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      labels: {
        singular: {
          cs: 'Přesměrování',
          en: 'Redirect',
        },
        plural: {
          cs: 'Přesměrování',
          en: 'Redirects',
        },
      },
      // @ts-expect-error
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      admin: {
        hidden: true,
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    defaultToEmail: 'dev@vadura.dev',
    fields: {
      payment: false,
    },
    formOverrides: {
      labels: {
        singular: {
          cs: 'Formulář',
          en: 'Form',
        },
        plural: {
          cs: 'Formuláře',
          en: 'Forms',
        },
      },
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
  }),
  // searchPlugin({
  //   collections: ['pages', 'posts'],
  //   beforeSync: beforeSyncWithSearch,
  //   searchOverrides: {
  //     labels: {
  //       singular: {
  //         cs: 'Výsledky vyhledávání',
  //         en: 'Search Results',
  //       },
  //       plural: {
  //         cs: 'Výsledky vyhledávání',
  //         en: 'Search Results',
  //       },
  //     },
  //     fields: ({ defaultFields }) => {
  //       return [...defaultFields, ...searchFields]
  //     },
  //   },
  // }),
  payloadCloudPlugin(),
]
