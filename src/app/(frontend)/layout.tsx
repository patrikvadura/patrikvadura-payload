import type { Metadata } from 'next'

import { cn } from 'src/utilities/cn'
import localFont from 'next/font/local'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const defaultFont = localFont({
  src: [
    {
      path: './fonts/PPTelegraf-Ultralight.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/PPTelegraf-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/PPTelegraf-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/PPTelegraf-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${defaultFont.className} antialiased`} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <LivePreviewListener />

          <Header />
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
    creator: '@payloadcms',
  },
}
