import React from 'react'
import { Icon } from '@/lib/types'

export default function IconHamburger({ size = '32', color = 'currentColor', className }: Icon) {
  return (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24">
      <path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 17h14M5 12h14M5 7h14"
      />
    </svg>
  )
}
