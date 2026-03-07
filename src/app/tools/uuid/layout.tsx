import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free UUID Generator | Generate v4 UUIDs Online',
  description: 'Generate random UUIDs (Universally Unique Identifiers) instantly. Version 4 UUIDs for databases, APIs, and unique identifiers.',
  keywords: ['uuid generator', 'guid generator', 'unique identifier', 'random uuid', 'uuid v4'],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}