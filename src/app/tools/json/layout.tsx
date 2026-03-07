import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free JSON Formatter & Validator | Format, Minify, Validate JSON Online',
  description: 'Format, validate, and minify JSON instantly. Syntax highlighting, error detection, and beautification. 100% client-side processing - your data stays private.',
  keywords: ['json formatter', 'json validator', 'json beautifier', 'format json', 'minify json', 'json syntax checker'],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}