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

  const locales = ['en', 'cs'] // Podporované jazyky

  // Generujeme všechny kombinace `slug` a `locale`, včetně `home`
  const params = pages.docs.flatMap(({ slug }) => {
    return locales.map((locale) => ({
      slug: slug === 'home' ? undefined : slug, // Prázdný slug pro `/[locale]`
      locale,
    }))
  })

  return params
}

type Args = {
  params: {
    slug?: string
    locale?: string
  }
}

export default async function Page({ params }: Args) {
  const { slug = 'home', locale = 'cs' } = params // Získáme jazyk a slug z parametrů

  let page: PageType | null

  page = await queryPageBySlug({
    slug,
    locale, // Předáme jazyk do dotazu
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
      <RenderHero {...hero} />
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

const queryPageBySlug = cache(async ({ slug, locale = 'cs' }: { slug: string; locale: string }) => {
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
    locale, // Jazyk pro dotaz
  })

  return result.docs?.[0] || null
})
