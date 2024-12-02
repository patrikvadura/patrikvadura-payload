import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'
import { getLocale } from 'next-intl/server'

export async function Header() {
  const currentLocale = await getLocale()

  const header: Header = await getCachedGlobal('header', 1, currentLocale as 'en' | 'cs')()

  return <HeaderClient header={header} />
}
