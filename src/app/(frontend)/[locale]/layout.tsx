import type { Metadata } from 'next'

import localFont from 'next/font/local'
import React from 'react'

import { Footer } from '@/Footer/Component'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'
import { AdminBar } from '@/components/AdminBar'
import { draftMode } from 'next/headers'

const defaultFont = localFont({
  src: [
    {
      path: './fonts/PPMori/Book.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/PPTelegraf/Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/PPMori/SemiBold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/PPMori/ExtraBold.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={`${defaultFont.className} antialiased scroll-smooth`}
      lang="cs-CZ"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="bg-white dark:bg-black">
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          <LivePreviewListener />

          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@patrikvadura',
  },
}
