'use client'
import { cn } from '@/utilities/cn'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { useEffect, useRef, Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { IconArrowDown } from '@/components/ui/Icons'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'client'>

gsap.registerPlugin(ScrollTrigger)

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
  wrap?: boolean
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps, wrap } = props

  const { slug, categories, meta, title, client } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ')
  const href = `/${relationTo}/${slug}`

  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (itemRef.current) {
      gsap.fromTo(
        card.ref,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: itemRef.current,
            start: '20% 80%',
            toggleActions: 'play none none none',
          },
        },
      )
    }
  }, [itemRef])

  return (
    <article
      className={cn(
        `basis-full px-2 transition-all duration-[1s] ease-in-out ${wrap ? 'md:basis-1/2 lg:basis-1/4 2xl:basis-1/5' : 'md:basis-1/3 lg:basis-1/5 2xl:basis-1/6 md:hover:basis-2/3 lg:hover:basis-2/5 2xl:hover:basis-2/6'}`,
        className,
      )}
      ref={card.ref}
    >
      <Link className="not-prose" href={href} ref={link.ref} suppressHydrationWarning>
        <div className="group w-full h-[340px] md:h-[440px] rounded-2xl relative overflow-hidden transition-all duration-[1s] ease-in-out">
          {!metaImage && <div className="">No image</div>}
          {metaImage && typeof metaImage !== 'string' && (
            <Media
              resource={metaImage}
              size="33vw"
              className="w-full h-full object-cover"
              imgClassName="w-full h-full object-cover opacity-90 scale-100 object-center group-hover:scale-110 transition-all duration-300 ease-in-out"
            />
          )}

          <div
            className="py-4 px-6 absolute lg:opacity-0 rounded-xl bottom-4 left-4 right-4 flex flex-col space-y-3 lg:-translate-y-12 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0"
            style={{ background: 'rgba(0, 0, 0, .1)', backdropFilter: 'blur(30px)' }}
          >
            <span>
              {showCategories && hasCategories && (
                <div className="uppercase text-sm mb-4">
                  {showCategories && hasCategories && (
                    <div>
                      {categories?.map((category, index) => {
                        if (typeof category === 'object') {
                          const { title: titleFromCategory } = category

                          const categoryTitle = titleFromCategory || 'Untitled category'

                          const isLast = index === categories.length - 1

                          return (
                            <Fragment key={index}>
                              {categoryTitle}
                              {!isLast && <Fragment>, &nbsp;</Fragment>}
                            </Fragment>
                          )
                        }

                        return null
                      })}
                    </div>
                  )}
                </div>
              )}
              {titleToUse && (
                <div className="prose">
                  <h3 className="text-white text-xl font-semibold">{titleToUse}</h3>
                </div>
              )}

              {client && <p className="text-white text-opacity-50 text-base">{client}</p>}
            </span>
          </div>

          <div
            className="absolute top-4 right-4 flex justify-center items-center bg-white rounded-full size-12 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out z-10"
            style={{ background: 'rgba(0, 0, 0, .1)', backdropFilter: 'blur(30px)' }}
          >
            <IconArrowDown
              size={24}
              color="#ffffff"
              className="-rotate-45 transition-all duration-300 ease-in-out"
            />
          </div>
        </div>
      </Link>
    </article>
  )
}
