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

export default function AnimatedHeading({
  children,
  target,
  className,
  as: Component = 'h1',
  dangerouslySetInnerHTML,
  delay,
}: AnimatedHeadingProps) {
  const headingRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: delay ? delay : 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: target ? target : headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      )
    }
  }, [target, delay])

  return (
    <Component
      ref={headingRef}
      className={className}
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    >
      {!dangerouslySetInnerHTML ? children : null}
    </Component>
  )
}
