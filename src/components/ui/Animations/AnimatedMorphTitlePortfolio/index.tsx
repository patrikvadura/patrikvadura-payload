'use client'

import React, { useEffect, useRef } from 'react'
// import gsap from 'gsap'
import { gsap } from 'gsap-trial'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DrawSVGPlugin } from 'gsap-trial/DrawSVGPlugin'
import { MorphSVGPlugin } from 'gsap-trial/MorphSVGPlugin'

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MorphSVGPlugin)

export default function AnimatedMorphTitlePortfolio({ target }: { target?: string }) {
  const titleRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const logoRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (titleRef.current) {
      gsap.to(logoRef.current, {
        duration: 0.5,
        delay: 0.5,
        morphSVG: '#logo',
      })
    }
  }, [titleRef, pathRef, logoRef, target])

  return (
    <div>
      <svg
        ref={titleRef}
        width="95vw"
        className="stroke-2 dark:stroke-1 stroke-black dark:stroke-white transition-all duration-[1s] ease-in-out"
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
          id="logo"
          stroke="currentColor"
          fill="transparent"
          d="M72 148c-17.3 0-28.8-6.6-36-17.5V186H.4V41.7h35.4v13.8c7.3-10.7 18.8-17 36.1-17 34 0 47.4 25.3 47.4 55C119.4 122 106 148 72 148ZM36 93.2c0 18.4 6.1 27.2 24.3 27.2 17.5 0 23.4-8 23.4-27.2 0-19.1-6-27.2-23.4-27.2C42 66 35.9 75 35.9 93.2ZM188.1 148c-43.9 0-59.1-27-59.1-54.8 0-27.6 15.2-54.8 59.1-54.8 43.7 0 59 27.2 59 54.8 0 27.6-15.3 54.8-59 54.8Zm-23.7-54.8c0 20.6 6.8 27.2 23.7 27.2 16.7 0 23.5-6.6 23.5-27.2S205 66 188.2 66c-16.9 0-23.7 6.6-23.7 27.2Zm96.5 51.5v-103h34.4v20.6c4-14.2 12.5-22.2 29-22.2h8.7v34.4h-12.6c-16.9 0-24.1 8.2-24.1 29v41.2H261Zm136.4 0c-31.6 0-41.5-14-41.5-40.6V68.3h-18V51.8l21-9.3 14.6-25.7h17.9v25h28v26.5h-28v48.4H416v28h-18.7Zm48.4 0V68.3H427V51.8l18.8-10.3v-6.8c0-20.6 10.5-34.2 36.5-34.2h28.2v25.6h-34.6v15.6h29.4v26.6h-24v76.4h-35.5ZM570 148c-43.9 0-59.1-27-59.1-54.8 0-27.6 15.3-54.8 59.1-54.8 43.7 0 59 27.2 59 54.8 0 27.6-15.3 54.8-59 54.8Zm-23.7-54.8c0 20.6 6.8 27.2 23.7 27.2 16.7 0 23.5-6.6 23.5-27.2S586.7 66 570 66c-16.9 0-23.7 6.6-23.7 27.2Zm97.7 51.5V.5h35.5v144.2H644Zm55.9 0v-103h35.4v103h-35.4Zm-.7-115.6V7.7h37v21.4h-37Zm109.7 119c-44 0-59.2-27-59.2-54.9 0-27.6 15.3-54.8 59.2-54.8 43.6 0 58.9 27.2 58.9 54.8 0 27.6-15.3 54.8-59 54.8Zm-23.7-54.9c0 20.6 6.8 27.2 23.7 27.2 16.6 0 23.4-6.6 23.4-27.2S825.5 66 809 66c-17 0-23.7 6.6-23.7 27.2Z"
          style={{ visibility: 'hidden' }}
        />

        <path
          ref={logoRef}
          stroke="currentColor"
          fill="transparent"
          d="m75.1 140.5-26-35.8L35 118.5v22H.5V.5h34.4v85c3.4-5 7.2-9.8 10.6-14l27.6-31h40.6v.8L71 83.3l44.8 57.2H75.1Zm50 0v-100h33.4v20c4-13.8 12.2-21.6 28.3-21.6h8.4v33.4H183c-16.5 0-23.5 8-23.5 28.2v40h-34.4Zm132.7 3.2c-40.6 0-55.2-26-55.2-53.4 0-29 16.8-53 55.2-53 40.8 0 53.8 25.8 53.8 53.6a50 50 0 0 1-.6 8.4h-75c2 16 10 21.4 22.6 21.4 10.2 0 16.4-4.4 19.2-10.4h33.4c-3.2 17.2-17 33.4-53.4 33.4Zm-21.4-64.4H279c-1.2-12.6-7.4-19.4-20.6-19.4-12.6 0-19.8 5-22 19.4Zm117.8 63.8c-20 0-33.2-11.4-33.2-29 0-16 6.6-26.6 34.2-31.2l22.8-4c9-1.6 11.6-4 11.6-9.2 0-6-3.6-9.6-15.2-9.6-12 0-17.8 4.8-18 13.6H323c1-21.2 19.6-36.4 51-36.4 31.8 0 47.2 13 47.2 35.8V113c0 10.6.8 19.4 1.8 27.6h-29.6c-1-5.8-1.6-12.6-1.6-20.8-5 14.6-17.4 23.4-37.6 23.4Zm.6-33c0 7 5.6 10.6 12.4 10.6 13 0 22.4-9.2 22.4-27.2v-3.8c-5 3.6-9.4 4.8-15.8 6.4l-5.6 1.4c-9.8 2.4-13.4 5.8-13.4 12.6ZM488 140.5c-30.6 0-40.2-13.6-40.2-39.4V66.3h-17.6v-16l20.4-9 14.2-25h17.4v24.2h27.2v25.8h-27.2v47h24v27.2H488Zm36.2 0v-100h34.5v100h-34.5Zm-.6-112.2V7.5h35.9v20.8h-35.9Zm44.5 12.2h35l24 74 24-74h32.6l-33.2 100h-49.2L568 40.5Zm124.4 100v-100h34.4v18.6a37.5 37.5 0 0 1 36-21.8c26 0 37.6 16.2 37.6 42.4v60.8h-34.4v-55c0-13.2-5.4-20.4-17.4-20.4C735 65.1 727 74 727 93.5v47h-34.4Zm124.4 0v-100h34.4v100H817ZM804 21.3l54.8-16.8 6 20.8-58.6 4.2-2.2-8.2Z"
          style={{ transition: 'all 1s ease-in-out' }}
        />
      </svg>
    </div>
  )
}
