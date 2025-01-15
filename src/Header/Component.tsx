import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'
import { getLocale } from 'next-intl/server'

interface HeaderProps {
  noScroll?: boolean
}

export async function Header({ noScroll }: HeaderProps) {
  const currentLocale = await getLocale()

  const header: Header = await getCachedGlobal('header', 1, currentLocale as 'en' | 'cs')()

  return <HeaderClient header={header} noScroll={noScroll} />
}
