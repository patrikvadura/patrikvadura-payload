'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  header: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 280)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className={`fixed w-full z-20 transition-all duration-300 ease-in-out ${isScrolled ? 'opacity-100 scale-y-100 bg-black' : 'opacity-0 scale-y-0'}`}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div
        className={`px-12 border-b border-border flex justify-between transition-all duration-300 ease-in-out ${
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
