"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Box, Flex, Theme } from '@radix-ui/themes'
import { Header } from '../components/navigation/Header'
import { Sidebar } from '../components/navigation/Sidebar'
import { RegisterSW } from '../components/PWA/RegisterSW'

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const [appearance, setAppearance] = useState<'dark' | 'light'>(() => {
    try {
      const v = localStorage.getItem('appearance')
      return (v as 'dark' | 'light') || 'dark'
    } catch {
      return 'dark'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('appearance', appearance)
    } catch {}
  }, [appearance])

  const toggleTheme = () => setAppearance(a => (a === 'dark' ? 'light' : 'dark'))

  // search removed — no modal or handlers required

  return (
    <Theme appearance={appearance} accentColor="cyan" grayColor="slate" radius="medium" scaling="100%">
      <Box>
        <Header onMenuClick={() => {}} onThemeToggle={toggleTheme} isDark={appearance === 'dark'} />

        <Flex gap="4" style={{ minHeight: 'calc(100vh - 64px)' }}>
          <Sidebar />
          <main style={{ flex: 1, padding: '2rem' }}>
            {children}
          </main>
        </Flex>

        <footer style={{ borderTop: '1px solid var(--gray-6)', backgroundColor: 'var(--gray-2)', padding: '1rem' }}>
          <div style={{ maxWidth: 1120, margin: '0 auto', textAlign: 'center', color: 'var(--gray-11)', fontSize: 14 }}>
            Built with care — all processing happens in your browser.
          </div>
        </footer>

        <RegisterSW />

        {/* search removed */}
      </Box>
    </Theme>
  )
}
