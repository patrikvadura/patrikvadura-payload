'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import gsap from 'gsap'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'
import { AnimatedTitle, AnimatedHeading, AnimatedParagraph } from '@/components/ui/Animations'
import { IconArrowDown } from '@/components/ui/Icons'
import Link from 'next/link'
import { Logo } from '@/components/Logo/Logo'
import LanguageSwitcher from '@/components/LanguageSwitcher'

gsap.registerPlugin(ScrollTrigger)

export const TypoOnly: React.FC<Page['hero']> = ({ richText }) => {
  const { setHeaderTheme } = useHeaderTheme()
  const titleRef = useRef<SVGSVGElement>(null)
  const borderSectionRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setHeaderTheme('dark')
  })

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: -200, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      )
    }
    if (borderSectionRef.current) {
      gsap.fromTo(
        borderSectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: 'body',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      )
    }
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          delay: 0.25,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: 'body',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      )
    }
  }, [titleRef, borderSectionRef, logoRef])

  return (
    <div className="-mt-16 flex flex-col items-center w-full h-full min-h-screen">
      <div className="flex flex-col justify-center py-12 md:py-8 px-12 flex-grow">
        <AnimatedTitle target="#smooth-wrapper" />

        <div className="flex flex-col md:flex-row py-8 md:py-16 gap-12 flex-grow flex-1">
          <div className="md:basis-1/3 flex flex-row items-start space-x-6">
            <div
              ref={logoRef}
              className="border-r border-white border-opacity-50 pr-6 translate-y-1.5"
            >
              <Logo />
            </div>

            <AnimatedHeading as="h2" delay={0.25}>
              <LanguageSwitcher />
            </AnimatedHeading>
          </div>

          <div
            ref={borderSectionRef}
            className="relative md:basis-2/3 border-l-[.5px] border-white border-opacity-50 flex flex-col items-start justify-between md:pl-12"
          >
            <Link href="#portfolioItems">
              <AnimatedHeading
                as="h3"
                delay={0.5}
                className="group flex text-white text-4xl md:text-3xl lg:text-3xl"
              >
                Projekty{' '}
                <IconArrowDown
                  color="#ffffff"
                  className="ml-3 translate-y-0 group-hover:translate-y-4 transition-all duration-300 ease-in-out"
                />
              </AnimatedHeading>
            </Link>

            {richText && (
              <AnimatedParagraph
                as="div"
                delay={1}
                target="body"
                className="mt-auto mb-0 max-w-screen-md opacity-75"
              >
                <RichText
                  className="prose-p:text-2xl md:prose-p:text-4xl prose-p:text-white mb-6"
                  content={richText}
                  enableGutter={false}
                />
              </AnimatedParagraph>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
