import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import '@radix-ui/themes/styles.css'
import '../styles/globals.css'
import { Theme } from '@radix-ui/themes'
import { RootLayoutClient } from './layout-client'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'DevToolkit - Free Online Developer Tools',
    template: '%s | DevToolkit',
  },
  description: 'Free online developer tools. All processing happens in your browser.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetbrainsMono.variable}`}>
        <Theme
          appearance="dark"
          accentColor="cyan"
          grayColor="slate"
          radius="medium"
          scaling="100%"
        >
          <RootLayoutClient>{children}</RootLayoutClient>
        </Theme>
      </body>
    </html>
  )
}
