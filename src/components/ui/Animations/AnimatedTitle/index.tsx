'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap-trial'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DrawSVGPlugin } from 'gsap-trial/DrawSVGPlugin'

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin)

export default function AnimatedTitle({ target, locale }: { target?: string; locale: string }) {
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
      {(locale = 'cs') ? (
        <path
          ref={pathRef}
          stroke="currentColor"
          fill="transparent"
          d="m147 276-51-71-28 27v44H0V0h68v167c6-10 14-19 21-27l54-61h80v1l-84 83 88 113h-80Zm98 0V79h66v39c8-27 24-42 56-42h16v65h-24c-32 0-46 16-46 56v79h-68Zm261 6c-80 0-108-51-108-105 0-57 33-105 108-105 81 0 106 51 106 106l-1 16H463c4 32 20 43 45 43 20 0 32-9 38-21h65c-6 34-33 66-105 66Zm-42-127h84c-2-25-15-38-40-38s-39 10-44 38Zm232 126c-39 0-65-23-65-57 0-32 13-53 67-62l45-8c18-3 23-8 23-18 0-12-7-19-30-19-24 0-35 10-36 27h-65c2-42 38-72 100-72 63 0 93 26 93 71v78c0 21 2 38 4 55h-59c-2-12-3-25-3-41-10 28-34 46-74 46Zm1-65c0 14 11 21 25 21 25 0 44-18 44-54v-7c-10 7-19 9-31 12l-11 3c-20 5-27 11-27 25Zm262 60c-60 0-79-27-79-78v-68h-34V98l40-18 28-49h34v48h54v51h-54v92h47v54h-36Zm72 0V79h67v197h-67Zm-1-221V14h70v41h-70Zm87 24h69l47 145 47-145h65l-66 197h-97l-65-197Zm338 203c-80 0-108-51-108-105 0-57 33-105 108-105 80 0 106 51 106 106l-1 16h-148c4 32 20 43 45 43 20 0 32-9 38-21h65c-6 34-33 66-105 66Zm-42-127h84c-2-25-15-38-41-38-24 0-39 10-43 38Zm165 22c0-53 30-105 112-105 71 0 106 41 107 90h-66c-2-23-14-37-40-37-28 0-45 13-45 52 0 40 15 52 44 52 28 0 40-15 42-37h66c-1 47-34 90-107 90-81 0-113-52-113-105Z"
          style={{ transition: 'all 1s ease-in-out' }}
        />
      ) : (
        <path
          ref={pathRef}
          stroke="currentColor"
          fill="transparent"
          d="m147 276-51-71-28 27v44H0V0h68v167c6-10 14-19 21-27l54-61h80v1l-84 83 88 113h-80Zm98 0V79h66v39c8-27 24-42 56-42h16v65h-24c-32 0-46 16-46 56v79h-68Zm261 6c-80 0-108-51-108-105 0-57 33-105 108-105 81 0 106 51 106 106l-1 16H463c4 32 20 43 45 43 20 0 32-9 38-21h65c-6 34-33 66-105 66Zm-42-127h84c-2-25-15-38-40-38s-39 10-44 38Zm232 126c-39 0-65-23-65-57 0-32 13-53 67-62l45-8c18-3 23-8 23-18 0-12-7-19-30-19-24 0-35 10-36 27h-65c2-42 38-72 100-72 63 0 93 26 93 71v78c0 21 2 38 4 55h-59c-2-12-3-25-3-41-10 28-34 46-74 46Zm1-65c0 14 11 21 25 21 25 0 44-18 44-54v-7c-10 7-19 9-31 12l-11 3c-20 5-27 11-27 25Zm262 60c-60 0-79-27-79-78v-68h-34V98l40-18 28-49h34v48h54v51h-54v92h47v54h-36Zm72 0V79h67v197h-67Zm-1-221V14h70v41h-70Zm87 24h69l47 145 47-145h65l-66 197h-97l-65-197Zm338 203c-80 0-108-51-108-105 0-57 33-105 108-105 80 0 106 51 106 106l-1 16h-148c4 32 20 43 45 43 20 0 32-9 38-21h65c-6 34-33 66-105 66Zm-42-127h84c-2-25-15-38-41-38-24 0-39 10-43 38Zm165 22c0-53 30-105 112-105 71 0 106 41 107 90h-66c-2-23-14-37-40-37-28 0-45 13-45 52 0 40 15 52 44 52 28 0 40-15 42-37h66c-1 47-34 90-107 90-81 0-113-52-113-105Z"
          style={{ transition: 'all 1s ease-in-out' }}
        />
      )}
    </svg>
  )
}
