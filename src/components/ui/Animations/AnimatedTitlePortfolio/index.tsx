'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap-trial'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DrawSVGPlugin } from 'gsap-trial/DrawSVGPlugin'

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin)

export default function AnimatedTitlePortfolio({ target }: { target?: string }) {
  const titleRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: -200, opacity: 0, stroke: 'transparent' },
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
      gsap.from(pathRef.current, { duration: 1, drawSVG: 0 })
    }
  }, [titleRef, pathRef, target])

  return (
    <svg
      ref={titleRef}
      width="95vw"
      className="stroke-2 dark:stroke-1 stroke-black dark:stroke-white transition-all duration-1000 ease-in-out"
      viewBox="0 0 869 187"
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
        d="M72 148c-17.3 0-28.8-6.6-36-17.5V186H.4V41.7h35.4v13.8c7.3-10.7 18.8-17 36.1-17 34 0 47.4 25.3 47.4 55C119.4 122 106 148 72 148ZM36 93.2c0 18.4 6.1 27.2 24.3 27.2 17.5 0 23.4-8 23.4-27.2 0-19.1-6-27.2-23.4-27.2C42 66 35.9 75 35.9 93.2ZM188.1 148c-43.9 0-59.1-27-59.1-54.8 0-27.6 15.2-54.8 59.1-54.8 43.7 0 59 27.2 59 54.8 0 27.6-15.3 54.8-59 54.8Zm-23.7-54.8c0 20.6 6.8 27.2 23.7 27.2 16.7 0 23.5-6.6 23.5-27.2S205 66 188.2 66c-16.9 0-23.7 6.6-23.7 27.2Zm96.5 51.5v-103h34.4v20.6c4-14.2 12.5-22.2 29-22.2h8.7v34.4h-12.6c-16.9 0-24.1 8.2-24.1 29v41.2H261Zm136.4 0c-31.6 0-41.5-14-41.5-40.6V68.3h-18V51.8l21-9.3 14.6-25.7h17.9v25h28v26.5h-28v48.4H416v28h-18.7Zm48.4 0V68.3H427V51.8l18.8-10.3v-6.8c0-20.6 10.5-34.2 36.5-34.2h28.2v25.6h-34.6v15.6h29.4v26.6h-24v76.4h-35.5ZM570 148c-43.9 0-59.1-27-59.1-54.8 0-27.6 15.3-54.8 59.1-54.8 43.7 0 59 27.2 59 54.8 0 27.6-15.3 54.8-59 54.8Zm-23.7-54.8c0 20.6 6.8 27.2 23.7 27.2 16.7 0 23.5-6.6 23.5-27.2S586.7 66 570 66c-16.9 0-23.7 6.6-23.7 27.2Zm97.7 51.5V.5h35.5v144.2H644Zm55.9 0v-103h35.4v103h-35.4Zm-.7-115.6V7.7h37v21.4h-37Zm109.7 119c-44 0-59.2-27-59.2-54.9 0-27.6 15.3-54.8 59.2-54.8 43.6 0 58.9 27.2 58.9 54.8 0 27.6-15.3 54.8-59 54.8Zm-23.7-54.9c0 20.6 6.8 27.2 23.7 27.2 16.6 0 23.4-6.6 23.4-27.2S825.5 66 809 66c-17 0-23.7 6.6-23.7 27.2Z"
        style={{ transition: 'all 1s ease-in-out' }}
      />
    </svg>
  )
}
