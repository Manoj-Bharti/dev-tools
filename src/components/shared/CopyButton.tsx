"use client"

import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { CopyIcon, CheckIcon } from '@radix-ui/react-icons'

interface CopyButtonProps {
  text: string
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  return (
    <Button variant="soft" size="2" onClick={handleCopy}>
      {copied ? (
        <>
          <CheckIcon /> Copied!
        </>
      ) : (
        <>
          <CopyIcon /> Copy
        </>
      )}
    </Button>
  )
}
