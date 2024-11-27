'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { AdminBar } from '@/components/AdminBar'

interface HeaderClientProps {
  header: Header
  previewEnabled: boolean
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ header, previewEnabled }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
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
      className={`w-full z-20 transition-all duration-300 ease-in-out ${isScrolled ? 'fixed bg-black' : 'relative'}`}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <AdminBar
        adminBarProps={{
          preview: previewEnabled,
        }}
      />
      <div
        className={`container border-b border-border flex justify-between transition-all duration-300 ease-in-out ${
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
