import React from 'react'
import { Icon } from '@/lib/types'

export default function IconArrowDown({ size = '32', color = 'currentColor', className }: Icon) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path stroke={color} d="M12 4v16m0 0l6-6m-6 6l-6-6" />
    </svg>
  )
}
