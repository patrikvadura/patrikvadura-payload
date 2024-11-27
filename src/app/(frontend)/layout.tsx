import type { Metadata } from 'next'

import localFont from 'next/font/local'
import React from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
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
  const { isEnabled } = await draftMode()

  return (
    <html
      className={`${defaultFont.className} antialiased scroll-smooth`}
      lang="cs-CZ"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
      </head>
      <body className="bg-black">
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
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
    creator: '@patrikvadura',
  },
  icons: {
    icon: [
      {
        url: `/icon?<generated>`,
        sizes: '32x32',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: `/apple-icon?<generated>`,
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
}
