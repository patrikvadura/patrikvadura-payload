import type { Metadata } from 'next'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import type { Page as PageType } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { setRequestLocale } from 'next-intl/server'
import { getLocale } from 'next-intl/server'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    select: {
      slug: true,
    },
  })

  const locales = ['en', 'cs']

  return pages.docs.flatMap(({ slug }) => {
    return locales.map((locale) => ({
      slug: slug === 'home' ? undefined : slug,
      locale,
    }))
  })
}

type Args = {
  params: {
    slug?: string
    locale?: any
  }
}

export default async function Page({ params }: Args) {
  const locale = params.locale || (await getLocale()) || 'cs'
  const { slug = 'home' } = params

  setRequestLocale(locale)

  let page: PageType | null

  page = await queryPageBySlug({
    slug,
    locale,
  })

  // Fallback pro seedovanou domovskou stránku
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={`/${locale}`} />
  }

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      <PayloadRedirects disableNotFound url={`/${locale}`} />
      <RenderHero {...hero} locale={locale} />
      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug = 'home', locale = 'cs' } = params
  const page = await queryPageBySlug({
    slug,
    locale,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(
  async ({ slug, locale = 'cs' }: { slug: string; locale: 'cs' | 'en' | undefined }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      where: {
        slug: {
          equals: slug,
        },
      },
      locale,
    })

    return result.docs?.[0] || null
  },
)
