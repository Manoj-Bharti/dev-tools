import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free JWT Decoder & Validator | Decode JSON Web Tokens Online',
  description: 'Decode and validate JWT tokens instantly. View header, payload, and signature. Verify token expiration. 100% client-side - your tokens never leave your browser.',
  keywords: ['jwt decoder', 'jwt validator', 'json web token', 'decode jwt', 'jwt debugger', 'jwt parser'],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}