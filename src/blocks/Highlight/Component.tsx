import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { HighlightBlock as HighlightBlockProps } from '@/payload-types'
import { CMSLink } from '@/components/Link'

export const HighlightBlock: React.FC<HighlightBlockProps> = (props) => {
  const { richText, links } = props

  return (
    <div className="container py-16">
      <div className="group flex flex-col items-start justify-center gap-8 md:gap-16 py-16">
        <RichText
          data={richText}
          enableGutter={false}
          className="text-left !text-foreground/30 group-hover:!text-foreground text-h4 md:text-h3 leading-[1.4] prose-strong:font-bold prose-strong:text-foreground group-hover:prose-strong:!text-foreground/30"
        />

        <div className="flex flex-col md:flex-row items-center gap-8">
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
