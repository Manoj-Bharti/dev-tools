import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Online Base64 Encoder & Decoder | Encode Text, Files, Images',
  description: 'Free Base64 encoder and decoder tool. Encode/decode text, images, PDFs instantly in your browser. 100% client-side processing - fast, secure, and private. No file size limits.',
  keywords: ['base64 encoder', 'base64 decoder', 'base64 converter', 'encode base64', 'decode base64', 'base64 online', 'base64 tool'],
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}