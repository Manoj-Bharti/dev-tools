import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Password Generator | Secure Password Generator Online',
  description: 'Generate strong, secure passwords with customizable options. Include uppercase, lowercase, numbers, symbols. Perfect for accounts and applications.',
  keywords: ['password generator', 'secure password', 'random password', 'strong password', 'password creator'],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}