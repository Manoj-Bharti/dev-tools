import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import '@radix-ui/themes/styles.css'
import '../styles/globals.css'
import { RootLayoutClient } from './layout-client'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'DevToolkit - Free Privacy-First Developer Tools',
    template: '%s | DevToolkit',
  },
  description: 'Free, privacy-first developer utilities. All tools run in your browser - no data collection, no tracking, completely client-side.',
  keywords: [
    'developer tools',
    'base64 encoder',
    'jwt decoder',
    'json formatter',
    'privacy tools',
    'client-side tools',
    'free developer utilities'
  ],
  authors: [{ name: 'DevToolkit Contributors' }],
  creator: 'DevToolkit Contributors',
  publisher: 'DevToolkit',
  metadataBase: new URL('https://common-dev-tools.netlify.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://common-dev-tools.netlify.app',
    title: 'DevToolkit - Free Privacy-First Developer Tools',
    description: 'Free, privacy-first developer utilities. All tools run in your browser.',
    siteName: 'DevToolkit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevToolkit - Free Privacy-First Developer Tools',
    description: 'Free, privacy-first developer utilities. All tools run in your browser.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'TSR1TLOtv71FtG6WNJUy_hV3SuLTAhaL7qpZl2J4d9A',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetbrainsMono.variable}`}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  )
}
