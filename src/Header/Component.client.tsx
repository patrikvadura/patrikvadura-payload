'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  header: Header
  noScroll?: boolean
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header, noScroll }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [theme, setTheme] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 280)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [noScroll])

  if (!noScroll)
    return (
      <header
        className={`fixed w-full z-20 transition-all duration-300 ease-in-out ${isScrolled ? 'opacity-100 scale-y-100 bg-white dark:bg-black' : 'opacity-0 scale-y-0'}`}
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div
          className={`px-4 md:px-12 border-b border-border flex justify-between transition-all duration-300 ease-in-out ${
            isScrolled ? 'py-4' : 'py-6 md:py-8'
          }`}
        >
          <Link href="/">
            <Logo />
          </Link>
          <HeaderNav header={header} />
        </div>
      </header>
    )

  return (
    <header
      className={`fixed w-full z-20 transition-all duration-300 ease-in-out opacity-100 ${isScrolled ? 'bg-background' : 'bg-background dark:bg-transparent'}`}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div
        className={`px-4 md:px-12 flex justify-between transition-all duration-300 ease-in-out ${
          isScrolled ? 'py-4' : 'py-6 md:py-8'
        }`}
      >
        <Link href="/">
          <Logo />
        </Link>
        <HeaderNav header={header} />
      </div>
    </header>
  )
}
