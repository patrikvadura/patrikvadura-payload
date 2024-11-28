import { cn } from 'src/utilities/cn'
import React from 'react'

import type { Post } from '@/payload-types'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  posts: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-y-4 w-full overflow-hidden">
      {posts?.map((result, index) => {
        if (typeof result === 'object' && result !== null) {
          return (
            <Card key={index} className="h-full" doc={result} relationTo="posts" showCategories />
          )
        }

        return null
      })}
    </div>
  )
}
