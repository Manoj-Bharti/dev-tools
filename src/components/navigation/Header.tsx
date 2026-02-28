"use client"

import Link from 'next/link'
import { Flex, Box, Button } from '@radix-ui/themes'
import { MagnifyingGlassIcon, HamburgerMenuIcon, MoonIcon } from '@radix-ui/react-icons'

interface HeaderProps {
  onMenuClick: () => void
  onSearchClick: () => void
}

export function Header({ onMenuClick, onSearchClick }: HeaderProps) {
  return (
    <Box
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid var(--gray-6)',
        backgroundColor: 'var(--color-background)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Flex
        justify="between"
        align="center"
        px="4"
        py="3"
        style={{ maxWidth: 1400, margin: '0 auto' }}
      >
        <Flex align="center" gap="4">
          <Button variant="ghost" onClick={onMenuClick} className="lg:hidden">
            <HamburgerMenuIcon />
          </Button>
          
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Flex align="center" gap="2">
              <Box
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 'var(--radius-2)',
                  background: 'linear-gradient(to bottom right, var(--cyan-9), var(--purple-9))',
                }}
              />
              <Box style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'var(--font-mono)' }}>
                DevToolkit
              </Box>
            </Flex>
          </Link>
        </Flex>

        <Flex gap="2" align="center">
          <Button variant="soft" onClick={onSearchClick}>
            <MagnifyingGlassIcon /> Search
          </Button>
          <Button variant="ghost">
            <MoonIcon />
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}
