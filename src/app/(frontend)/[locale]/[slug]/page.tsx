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

  const locales: Array<'cs' | 'en'> = ['en', 'cs']

  return pages.docs.flatMap(({ slug }) => {
    return locales.map((locale) => ({
      slug: slug === 'home' ? undefined : slug,
      locale,
    }))
  })
}

type Params = {
  slug?: string
  locale?: 'cs' | 'en' | 'all'
}

type PageProps = {
  params: Promise<Params> // Oprava: params jako Promise
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params // Explicitní čekání na params
  const locale = validateLocale(resolvedParams.locale || (await getLocale())) || 'cs'
  const slug = resolvedParams.slug || 'home'

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params // Explicitní čekání na params
  const locale = validateLocale(resolvedParams.locale) || 'cs'
  const slug = resolvedParams.slug || 'home'

  const page = await queryPageBySlug({
    slug,
    locale,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(
  async ({ slug, locale = 'cs' }: { slug: string; locale: 'cs' | 'en' | 'all' }) => {
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

/**
 * Validuje locale a vrací jen povolené hodnoty.
 */
function validateLocale(locale: string | undefined): 'cs' | 'en' | undefined {
  const allowedLocales: Array<'cs' | 'en'> = ['cs', 'en']
  return allowedLocales.includes(locale as 'cs' | 'en') ? (locale as 'cs' | 'en') : undefined
}
