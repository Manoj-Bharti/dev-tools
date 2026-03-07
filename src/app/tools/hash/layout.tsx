import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Hash Generator | MD5, SHA-1, SHA-256, SHA-512 Online',
  description: 'Generate cryptographic hashes online. Support for MD5, SHA-1, SHA-256, SHA-512. Perfect for checksums, password hashing, and data integrity verification.',
  keywords: ['hash generator', 'md5 hash', 'sha256 hash', 'sha1 hash', 'cryptographic hash', 'checksum'],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}