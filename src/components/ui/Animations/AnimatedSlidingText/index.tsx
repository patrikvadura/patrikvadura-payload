import React, { ElementType } from 'react'

import classes from './index.module.scss'

interface SlidingTextProps {
  as?: ElementType
  outline?: boolean
  className?: string | undefined
  classNameTitle?: string | undefined
  children?: React.ReactNode
}

export default function SlidingText({
  as: Component = 'div',
  outline = false,
  className,
  classNameTitle,
  children,
}: SlidingTextProps) {
  const outlineClass = outline ? classes.outline : ''

  return (
    <Component className={`${className} ${classes.slidingText}`}>
      <div className={[classes.slidingTextContent, outlineClass, classNameTitle].join(' ')}>
        {children}
      </div>
      <div className={[classes.slidingTextContent, outlineClass, classNameTitle].join(' ')}>
        {children}
      </div>
    </Component>
  )
}
