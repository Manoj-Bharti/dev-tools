import React from 'react'
import Link from 'next/link'
import { Container, Box, Flex, Grid, Card, Heading, Text, Badge, Button } from '@radix-ui/themes'
import { ArrowRightIcon, StarIcon } from '@radix-ui/react-icons'
import { TOOLS } from '../lib/constants'

export default function HomePage() {
  const featuredTools = TOOLS.slice(0, 6)
  const categories = Array.from(new Set(TOOLS.map((t) => t.category)))

  return (
    <Box>
      {/* Hero Section */}
      <Box style={{ background: 'var(--gray-2)', borderBottom: '1px solid var(--gray-6)' }}>
        <Container size="3" py="9">
          <Flex direction="column" align="center" gap="6">
            <Badge color="cyan" size="2" radius="full">
              <StarIcon /> Privacy-First Tools
            </Badge>
            
            <Heading size="9" align="center" weight="bold">
              Developer Tools That
              <br />
              <Text
                size="9"
                weight="bold"
                style={{
                  background: 'linear-gradient(to right, var(--cyan-9), var(--purple-9))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Respect Your Privacy
              </Text>
            </Heading>
            
            <Text size="5" color="gray" align="center" style={{ maxWidth: 600 }}>
              Free, fast, and secure. All tools run in your browser - no data ever leaves your device.
            </Text>
            
            <Flex gap="3">
              <Button size="3" asChild>
                <Link href="/tools/base64">Try Base64 Tool</Link>
              </Button>
              <Button size="3" variant="outline" asChild>
                <Link href="#tools">Browse All Tools</Link>
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Featured Tools */}
      <Container size="4" py="9" id="tools">
        <Flex direction="column" gap="6">
          <Box>
            <Heading size="7" mb="2">Popular Tools</Heading>
            <Text color="gray">Most used developer utilities</Text>
          </Box>
          
          <Grid columns={{ initial: '1', sm: '2', lg: '3' }} gap="4">
            {featuredTools.map((tool) => {
              return (
                <Card key={tool.id} asChild>
                  <Link href={tool.path} style={{ textDecoration: 'none' }}>
                    <Flex direction="column" gap="3" style={{ height: '100%' }}>
                      <Box
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 'var(--radius-3)',
                          background: 'var(--cyan-3)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <span style={{ color: 'var(--cyan-11)', fontFamily: 'var(--font-mono)' }}>{tool.icon?.slice(0, 1) ?? '•'}</span>
                      </Box>
                      
                      <Heading size="4">{tool.name}</Heading>
                      <Text size="2" color="gray">{tool.description}</Text>
                      
                      <Flex align="center" gap="2" style={{ marginTop: 'auto' }}>
                        <Text size="2" weight="medium" color="cyan">
                          Open tool
                        </Text>
                        <ArrowRightIcon color="var(--cyan-11)" />
                      </Flex>
                    </Flex>
                  </Link>
                </Card>
              )
            })}
          </Grid>
        </Flex>
      </Container>

      {/* All Tools by Category */}
      <Box style={{ background: 'var(--gray-2)', borderTop: '1px solid var(--gray-6)' }}>
        <Container size="4" py="9">
          <Flex direction="column" gap="8">
            {categories.map((category) => {
              const tools = TOOLS.filter((tool) => tool.category === category)
              return (
                <Box key={category}>
                  <Text size="1" weight="medium" color="gray" mb="3" style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {category}
                  </Text>
                  <Grid columns={{ initial: '1', sm: '2', lg: '3' }} gap="3">
                    {tools.map((tool) => {
                      return (
                        <Card key={tool.id} asChild>
                          <Link href={tool.path} style={{ textDecoration: 'none' }}>
                            <Flex align="center" gap="3">
                              <Box
                                style={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: 'var(--radius-2)',
                                  background: 'var(--cyan-3)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0,
                                }}
                              >
                                <span style={{ color: 'var(--cyan-11)', fontFamily: 'var(--font-mono)' }}>{tool.icon?.slice(0, 1) ?? '•'}</span>
                              </Box>
                              <Text size="3" weight="medium">{tool.name}</Text>
                            </Flex>
                          </Link>
                        </Card>
                      )
                    })}
                  </Grid>
                </Box>
              )
            })}
          </Flex>
        </Container>
      </Box>

      {/* Privacy Notice */}
      <Container size="3" py="9">
        <Card size="3">
          <Flex direction="column" align="center" gap="2" py="4">
            <Heading size="5">Your Privacy Matters</Heading>
            <Text color="gray" align="center">
              All tools run entirely in your browser. We never send your data to our servers.
              <br />
              Open source and transparent.
            </Text>
          </Flex>
        </Card>
      </Container>
    </Box>
  )
}
