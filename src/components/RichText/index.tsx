import { cn } from '@/utilities/cn'
import React from 'react'

import { serializeLexical } from './serialize'

type Props = {
  className?: string
  content: Record<string, any>
  enableGutter?: boolean
  enableProse?: boolean
}

const RichText: React.FC<Props> = ({
  className,
  content,
  enableGutter = true,
  enableProse = true,
}) => {
  if (!content) {
    return null
  }

  return (
    <div
      className={cn(
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose dark:prose-invert': enableProse,
        },
        'prose-h2:!leading-[1.4] prose-h3:!leading-[1.3] prose-h4:!leading-[1.3]',
        'prose-h2:font-normal prose-h3:font-normal prose-h4:font-bold',
        'prose-h2:text-5xl md:prose-h2:text-6xl prose-h3:text-4xl md:prose-h3:text-5xl prose-h4:text-xl',
        className,
      )}
    >
      {content &&
        !Array.isArray(content) &&
        typeof content === 'object' &&
        'root' in content &&
        serializeLexical({ nodes: content?.root?.children })}
    </div>
  )
}

export default RichText
