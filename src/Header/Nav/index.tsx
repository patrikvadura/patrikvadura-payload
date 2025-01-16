'use client'

import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { usePathname } from 'next/navigation'
import { IconClose, IconHamburger } from '@/components/ui/Icons'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const pathname = usePathname()

  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <nav className="flex flex-row items-center space-x-4">
      <div className="hidden sm:flex gap-y-2 sm:gap-y-0">
        {navItems.map(({ link }, i) => {
          const isActive = pathname === link.url

          return (
            <CMSLink
              key={i}
              {...link}
              className={`group relative flex items-center px-4 py-2 text-sm text-foreground hover:brightness-90 font-semibold ${
                isActive ? 'underline' : ''
              }`}
              appearance="inline"
            />
          )
        })}

        <ThemeSelector />
        <LanguageSwitcher />
      </div>

      <div className="sm:hidden">
        <button
          onClick={toggleMenu}
          aria-label="Mobilní navigace"
          className="text-primary bg-transparent block no-underline cursor-pointer z-[999]"
        >
          {isOpen ? <IconClose /> : <IconHamburger />}
        </button>

        {isOpen && (
          <div className="absolute top-full right-0 w-full h-[90vh] pb-[25vh] flex flex-col items-center justify-end space-y-3 bg-white dark:bg-black">
            {navItems.map(({ link }, i) => {
              const isActive = pathname === link.url

              return (
                <CMSLink
                  key={i}
                  {...link}
                  onClick={closeMenu}
                  className={`group relative flex items-center px-4 py-2 text-sm text-black dark:text-white hover:brightness-90 font-semibold ${
                    isActive ? 'h-1 bg-opacity-100' : 'group-hover:h-1 group-hover:bg-opacity-100'
                  }`}
                  appearance="link"
                />
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}
