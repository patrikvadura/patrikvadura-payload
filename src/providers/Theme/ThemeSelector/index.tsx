'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from '..'
import { themeLocalStorageKey } from './types'
import { IconThemeDark, IconThemeLight } from '@/components/ui/Icons'

export const ThemeSelector: React.FC = () => {
  const { setTheme } = useTheme()
  const [theme, setLocalTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    setLocalTheme(newTheme)
    window.localStorage.setItem(themeLocalStorageKey, newTheme)
  }

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(themeLocalStorageKey) as 'light' | 'dark'
    if (savedTheme) {
      setLocalTheme(savedTheme)
      setTheme(savedTheme)
    }
  }, [setTheme])

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      className="bg-transparent border-none p-2 cursor-pointer relative"
    >
      {theme === 'light' ? (
        <IconThemeDark size={20} className="text-black" />
      ) : (
        <IconThemeLight size={20} className="text-white" />
      )}
    </button>
  )
}
