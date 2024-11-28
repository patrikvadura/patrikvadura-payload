import React from 'react'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  posts: CardPostData[]
  wrap?: boolean
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { posts, wrap = false } = props

  return (
    <div
      className={`flex gap-y-4 w-full overflow-hidden ${wrap ? 'flex-wrap' : 'flex-wrap lg:flex-nowrap'}`}
    >
      {posts?.map((result, index) => {
        if (typeof result === 'object' && result !== null) {
          return (
            <Card
              key={index}
              className="h-full"
              doc={result}
              relationTo="posts"
              showCategories
              wrap={wrap}
            />
          )
        }

        return null
      })}
    </div>
  )
}
