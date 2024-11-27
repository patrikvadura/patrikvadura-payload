'use client'

import React, { useEffect, useRef } from 'react'
// import gsap from 'gsap'
import { gsap } from 'gsap-trial'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DrawSVGPlugin } from 'gsap-trial/DrawSVGPlugin'
import { MorphSVGPlugin } from 'gsap-trial/MorphSVGPlugin'

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MorphSVGPlugin)

export default function AnimatedMorphTitle({ target }: { target?: string }) {
  const titleRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const logoRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    if (titleRef.current) {
      gsap.to(logoRef.current, {
        duration: 0.5,
        morphSVG: '#logo',
        scrollTrigger: {
          trigger: target ? target : logoRef.current,
          start: '-top 10%',
          end: 'bottom 60%',
          toggleActions: 'play none none none',
          scrub: true,
        },
      })
    }
  }, [titleRef, pathRef, logoRef, target])

  return (
    <div>
      <svg
        ref={titleRef}
        width="95vw"
        className="fill-white transition-all duration-300 ease-in-out"
        viewBox="0 0 1807 390"
      >
        <path
          ref={pathRef}
          style={{ visibility: 'hidden' }}
          id="logo"
          d="M99 80C30 80 3 133 3 192c0 60 27 112 96 112 36 0 60-13 74-35v29h73V3h-73v113c-14-22-38-36-74-36ZM75 192c0-39 13-55 49-55 37 0 49 18 49 55 0 38-12 56-49 56-36 0-49-17-49-56ZM393 304c77 0 106-34 113-70h-71c-6 13-19 22-40 22-27 0-44-11-48-45h158l1-18c0-58-27-113-113-113-81 0-116 51-116 112 0 58 30 112 116 112Zm-45-135c5-31 20-41 46-41 28 0 41 14 44 41h-90ZM588 230h-66c2 39 30 74 108 74s103-31 103-71c0-41-21-61-70-66l-44-4c-20-2-25-10-25-19 0-12 9-21 34-21 23 0 35 10 37 26h65c-4-49-44-69-103-69-56 0-99 20-99 71 0 36 22 58 63 63l45 5c24 3 28 12 28 22 0 12-10 20-33 20-27 0-41-14-43-31ZM763 298h73V87h-73v211Zm-1-237h76V17h-76v44ZM986 387c89 0 123-34 123-102V87h-73v25c-14-20-37-31-72-31-69 0-98 48-98 105 0 56 29 105 98 105 35 0 58-11 72-32v38c0 28-15 40-47 40-31 0-44-13-46-31h-71c3 45 38 81 114 81Zm-47-200c0-36 14-50 50-50s47 16 47 50-11 51-47 51-50-14-50-51ZM1147 298h72v-99c0-42 17-60 46-60 25 0 37 15 37 43v116h72V170c0-56-24-90-79-90-38 0-62 18-76 46V87h-72v211ZM1515 304c77 0 106-34 112-70h-70c-6 13-19 22-41 22-26 0-43-11-47-45h158l1-18c0-58-27-113-113-113-81 0-117 51-117 112 0 58 31 112 117 112Zm-66-258 5 18 124-9-13-44-116 35Zm21 123c4-31 20-41 46-41 28 0 41 14 44 41h-90ZM1656 298h73v-85c0-42 14-59 49-59h26V83h-18c-34 0-51 17-59 46V87h-71v211Z"
        />

        <path
          ref={logoRef}
          d="M44 251h82l29-112 30 112h81l42-170h-54l-28 125-37-125h-62L89 206 62 81H2l42 170ZM407 256c62 0 85-28 91-57h-57c-5 10-15 18-33 18-21 0-35-9-38-36h127l1-15c0-47-22-91-91-91-65 0-94 41-94 90 0 47 25 91 94 91Zm-37-109c4-25 16-33 38-33s33 11 35 33h-73ZM641 75c-29 0-48 11-60 29V13h-58v238h58v-24c12 18 31 29 60 29 56 0 78-42 78-91 0-47-22-90-78-90Zm-60 91c0-31 10-45 40-45 29 0 39 13 39 45 0 31-10 44-39 44-30 0-40-14-40-44ZM824 251h31v-47h-41v-80h46V81h-46V40h-29l-24 42-35 15v27h30v60c0 43 16 67 68 67ZM869 81l57 170h83l57-170h-56l-40 125-41-125h-60ZM1142 256c30 0 49-14 60-36v31h59V81h-59v80c0 32-14 48-36 48-21 0-30-12-30-35V81h-59v103c0 44 21 72 65 72Zm-4-223c0 17 11 31 31 31s32-14 32-31c0-16-12-30-32-30s-31 14-31 30Zm20 0c0-7 6-11 11-11 6 0 11 4 11 11 0 8-5 12-11 12-5 0-11-4-11-12ZM1291 251h59v-68c0-35 12-48 40-48h20V78h-14c-27 0-41 13-48 37V81h-57v170ZM1423 166c0 45 27 90 97 90 63 0 91-37 92-77h-57c-2 18-12 31-36 31s-38-10-38-44 15-45 39-45c22 0 33 11 34 31h58c-1-42-31-77-93-77-70 0-96 45-96 91ZM1720 256c62 0 85-28 91-57h-57c-5 10-15 18-33 18-21 0-34-9-38-36h128l1-15c0-47-23-91-92-91-65 0-94 41-94 90 0 47 25 91 94 91Zm-36-109c4-25 16-33 37-33 23 0 33 11 35 33h-72Z"
        />
      </svg>
    </div>
  )
}
