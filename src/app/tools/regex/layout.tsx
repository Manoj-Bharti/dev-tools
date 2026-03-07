import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Regex Tester | Regular Expression Tester Online',
  description: 'Test and debug regular expressions instantly. Match patterns, extract groups, and validate regex syntax. Perfect for developers and data processing.',
  keywords: ['regex tester', 'regular expression', 'regex validator', 'pattern matching', 'regex debugger'],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}