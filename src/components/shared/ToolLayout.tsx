"use client"
import { Container, Box, Flex, Heading, Text } from '@radix-ui/themes'
import { ReactNode } from 'react'

interface ToolLayoutProps {
  title: string
  description: string
  children: ReactNode
}

export function ToolLayout({ title, description, children }: ToolLayoutProps) {
  return (
    <Container size="3" py="6">
      <Flex direction="column" gap="6">
        <Box>
          <Heading size="8" mb="2" weight="bold">
            <Text
              style={{
                background: 'linear-gradient(to right, var(--cyan-9), var(--purple-9))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {title}
            </Text>
          </Heading>
          <Text size="4" color="gray">
            {description}
          </Text>
        </Box>
        {children}
      </Flex>
    </Container>
  )
}
