import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Diff Checker | Text Comparison Tool Online',
  description: 'Compare two texts and highlight differences. Perfect for code review, document comparison, and version control. Side-by-side and unified diff views.',
  keywords: ['diff checker', 'text comparison', 'file comparison', 'diff tool', 'text diff', 'compare text'],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}