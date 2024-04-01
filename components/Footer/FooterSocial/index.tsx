'use client'

import React from 'react'
import { Icon } from '@iconify/react'

export default function FooterSocial() {
  return (
    <div className="flex flex-row items-center space-x-4">
      <Icon icon="mingcute:facebook-line" className="text-white text-2xl" />
      <Icon icon="ci:instagram" className="text-white text-2xl" />
    </div>
  )
}
