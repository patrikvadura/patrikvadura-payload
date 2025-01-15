import React from 'react'

import type { Post } from '@/payload-types'
import { Media } from '@/components/Media'

import {
  AnimatedHeading,
  AnimatedImage,
  AnimatedParagraph,
  AnimatedSlidingText,
} from '@/components/ui/Animations'

export const PostHero: React.FC<{
  post: Post
  locale: 'cs' | 'en'
}> = ({ post }) => {
  const { categories, client, meta: { image: metaImage } = {}, title } = post

  return (
    <div className="relative -mt-[4rem] flex items-end">
      <div className="z-10 relative text-white pb-16 md:pb-24 w-full">
        <div className="flex flex-col space-y-4">
          <AnimatedHeading as="div" target="body" delay={1}>
            <AnimatedSlidingText classNameTitle="text-7xl md:text-9xl lg:text-[10rem] font-bold">
              {title}
            </AnimatedSlidingText>
          </AnimatedHeading>

          <div className="container flex flex-col space-y-4 mt-12">
            <AnimatedParagraph
              as="div"
              delay={1.5}
              target="body"
              className="text-foreground text-2xl"
            >
              {client}
            </AnimatedParagraph>

            <AnimatedParagraph as="div" delay={1.5} target="body" className="text-foreground">
              {categories?.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  const { title: categoryTitle } = category

                  const titleToUse = categoryTitle || 'Untitled category'

                  const isLast = index === categories.length - 1

                  return (
                    <React.Fragment key={index}>
                      {'#' + titleToUse}
                      {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                    </React.Fragment>
                  )
                }
                return null
              })}
            </AnimatedParagraph>
          </div>
        </div>
      </div>

      <div className="min-h-[100vh] select-none">
        {metaImage && typeof metaImage !== 'string' && (
          <AnimatedImage target="body">
            <Media
              fill
              priority={false}
              loading="lazy"
              imgClassName="-z-10 object-cover"
              resource={metaImage}
            />
          </AnimatedImage>
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-full bg-gradient-to-t from-background to-transparent" />
      </div>
    </div>
  )
}
