import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'
import { draftMode } from 'next/headers'

export async function Header() {
  const header: Header = await getCachedGlobal('header', 1)()
  const { isEnabled } = await draftMode()

  return <HeaderClient header={header} previewEnabled={isEnabled} />
}
