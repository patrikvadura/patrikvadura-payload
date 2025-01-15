'use client'

import React, { useEffect, useRef, ElementType } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type AnimatedHeadingProps = {
  children?: React.ReactNode
  target?: string | undefined
  className?: string
  as?: ElementType
  dangerouslySetInnerHTML?: { __html: string }
  delay?: number
}

export default function AnimatedImage({
  children,
  target,
  className,
  as: Component = 'div',
  dangerouslySetInnerHTML,
  delay,
}: AnimatedHeadingProps) {
  const imageRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: delay ? delay : 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: target ? target : imageRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      )
    }
  }, [target, delay])

  return (
    <Component
      ref={imageRef}
      className={className}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    >
      {!dangerouslySetInnerHTML ? children : null}
    </Component>
  )
}
