import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Timestamp Converter | Unix Epoch Time Converter Online',
  description: 'Convert between Unix timestamps, ISO dates, and human-readable formats. Support for UTC, local time zones, and custom formats.',
  keywords: ['timestamp converter', 'unix timestamp', 'epoch time', 'date converter', 'time converter'],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}