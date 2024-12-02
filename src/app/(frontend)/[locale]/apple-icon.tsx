import { ImageResponse } from 'next/og'
import React from 'react'

export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#04080B',
          borderRadius: '8px',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width={180} fill="#fff" viewBox="0 0 274 164">
          <path d="M184 164H94L0 0h90l94 164Zm-47-82 47-82h90l-47 82h-90Z" />
        </svg>
      </div>
    ),
    {
      ...size,
    },
  )
}
