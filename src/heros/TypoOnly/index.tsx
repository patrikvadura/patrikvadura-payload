'use client'
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
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

gsap.registerPlugin(ScrollTrigger)

type TypoOnlyProps = Page['hero'] & { locale: string }

export const TypoOnly: React.FC<TypoOnlyProps> = ({ richText, locale }) => {
  const titleRef = useRef<SVGSVGElement>(null)
  const borderSectionRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

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
        <AnimatedTitle target="#smooth-wrapper" locale={locale} />

        <div className="flex flex-col md:flex-row py-8 md:py-16 gap-12 flex-grow flex-1">
          <div className="md:basis-1/3 flex flex-row items-start space-x-6">
            <div
              ref={logoRef}
              className="border-r border-black dark:border-white border-opacity-50 pr-4 md:pr-6 translate-y-1.5"
            >
              <Link href="/" target="_self">
                <Logo />
              </Link>
            </div>

            <AnimatedHeading as="h2" delay={0.25}>
              <div className="flex flex-row space-x-1">
                <ThemeSelector />
                <LanguageSwitcher />
              </div>
            </AnimatedHeading>
          </div>

          <div
            ref={borderSectionRef}
            className="relative md:basis-2/3 border-t-[.5px] md:border-t-0 md:border-l-[.5px] border-black dark:border-white border-opacity-50 flex flex-col items-start justify-between space-y-16 pt-8 md:pt-4 md:pl-12"
          >
            <Link href="#block-portfolio">
              <AnimatedHeading
                as="h3"
                delay={0.5}
                className="group flex text-black dark:text-white text-4xl md:text-3xl lg:text-3xl"
              >
                Projekty{' '}
                <IconArrowDown className="ml-3 translate-y-0 group-hover:translate-y-4 text-black dark:text-white transition-all duration-300 ease-in-out" />
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
                  className="prose-p:text-xl md:prose-p:text-4xl prose-p:text-black dark:prose-p:text-white mb-6"
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
