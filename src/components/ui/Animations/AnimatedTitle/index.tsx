'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AnimatedTitle({ target, typoPath }: { target?: string; typoPath: any }) {
  const titleRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: -300, opacity: 0, stroke: 'transparent' },
        {
          y: 0,
          stroke: 'white',
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: target ? target : titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      )
    }
  }, [titleRef, pathRef, target])

  return (
    <svg
      ref={titleRef}
      width="95vw"
      className="stroke-2 md:dark:stroke-1 stroke-black dark:stroke-white transition-all duration-1000 ease-in-out"
      viewBox="0 0 1799 282"
      onMouseEnter={(e) => {
        const paths = e.currentTarget.querySelectorAll('path')
        paths.forEach((path) => (path.style.fill = 'currentColor'))
      }}
      onMouseLeave={(e) => {
        const paths = e.currentTarget.querySelectorAll('path')
        paths.forEach((path) => (path.style.fill = 'transparent'))
      }}
    >
      <path
        ref={pathRef}
        stroke="currentColor"
        fill="transparent"
        d={typoPath}
        style={{ transition: 'all 1s ease-in-out' }}
      />
    </svg>
  )
}
