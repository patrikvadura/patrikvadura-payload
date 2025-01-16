import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { setRequestLocale } from 'next-intl/server'
import { getLocale } from 'next-intl/server'
import { Header } from '@/Header/Component'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    select: {
      slug: true,
    },
  })

  const locales: Array<'cs' | 'en'> = ['en', 'cs']

  return posts.docs.flatMap(({ slug }) => {
    return locales.map((locale) => ({
      slug,
      locale,
    }))
  })
}

type Params = {
  slug?: string
  locale?: 'cs' | 'en' | 'all'
}

type PostProps = {
  params: Promise<Params>
}

export default async function Post({ params: paramsPromise }: PostProps) {
  const resolvedParams = await paramsPromise
  const locale = validateLocale(resolvedParams.locale || (await getLocale())) || 'cs'
  const slug = resolvedParams.slug || ''

  setRequestLocale(locale)

  const url = `/${locale}/posts/${slug}`
  const post = await queryPostBySlug({ slug, locale })

  if (!post) return <PayloadRedirects url={url} />

  return (
    <>
      <Header noScroll />

      <article className="py-16 pb-16">
        <PageClient />
        <PayloadRedirects disableNotFound url={url} />
        <PostHero post={post} locale={locale} />

        <RenderBlocks blocks={post.layout} />

        <div className="flex flex-col items-center gap-4 pt-32">
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts
              className="mt-12"
              docs={post.relatedPosts.filter((post) => typeof post === 'object')}
            />
          )}
        </div>
      </article>
    </>
  )
}

export async function generateMetadata({ params: paramsPromise }: PostProps): Promise<Metadata> {
  const resolvedParams = await paramsPromise
  const locale = validateLocale(resolvedParams.locale) || 'cs'
  const slug = resolvedParams.slug || ''

  const post = await queryPostBySlug({ slug, locale })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(
  async ({ slug, locale = 'cs' }: { slug: string; locale: 'cs' | 'en' | 'all' }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'posts',
      draft,
      limit: 1,
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
