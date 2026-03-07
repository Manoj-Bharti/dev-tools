import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free URL Encoder & Decoder | Encode/Decode URLs Online',
  description: 'URL encode and decode tool. Convert special characters to URL-safe format and back. Perfect for web development, APIs, and query parameters.',
  keywords: ['url encoder', 'url decoder', 'url encode', 'url decode', 'percent encoding', 'url escape'],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}