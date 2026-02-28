"use client"
import React, { useState } from 'react'
import { RotateCcw, AlertCircle } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Textarea } from '../../../components/ui/Textarea'
import { CopyButton } from '../../../components/shared/CopyButton'
import { ToolLayout } from '../../../components/shared/ToolLayout'

// Inline base64 helpers to avoid cross-module resolution during smoke tests
function encodeBase64(input: string) {
  try {
    return btoa(unescape(encodeURIComponent(input)))
  } catch {
    return btoa(input)
  }
}

function decodeBase64(input: string) {
  try {
    return decodeURIComponent(escape(atob(input)))
  } catch {
    return atob(input)
  }
}

export default function Base64Tool() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  function handleProcess() {
    try {
      setError('')
      if (mode === 'encode') setOutput(encodeBase64(input))
      else setOutput(decodeBase64(input))
    } catch (e) {
      setError((e as Error).message)
      setOutput('')
    }
  }

  function handleClear() {
    setInput('')
    setOutput('')
    setError('')
  }

  return (
    <ToolLayout 
      title="Base64 Encoder / Decoder" 
      description="Encode and decode text to/from Base64 format."
    >
      <div className="space-y-6">
        {/* MODE TOGGLE */}
        <div className="flex gap-2">
          <Button 
            variant={mode === 'encode' ? 'default' : 'outline'}
            onClick={() => setMode('encode')}
          >
            Encode
          </Button>
          <Button 
            variant={mode === 'decode' ? 'default' : 'outline'}
            onClick={() => setMode('decode')}
          >
            Decode
          </Button>
        </div>

        {/* INPUT SECTION */}
        <div className="tool-section">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Input</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleClear}
              aria-label="Clear input"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to encode or decode..."
            className="tool-input font-mono"
            rows={8}
          />
          {input && (
            <div className="mt-2 text-sm text-gray-400">
              {input.length} characters
            </div>
          )}
        </div>

        {/* ACTION BUTTON */}
        <Button onClick={handleProcess} size="lg" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
          {mode === 'encode' ? 'Encode' : 'Decode'}
        </Button>

        {/* ERROR DISPLAY */}
        {error && (
          <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-400 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* OUTPUT SECTION */}
        {output && (
          <div className="tool-section">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Output</h3>
              <CopyButton text={output} />
            </div>
            <div className="tool-output font-mono whitespace-pre-wrap break-all">
              {output}
            </div>
            {output && (
              <div className="mt-2 text-sm text-gray-400">
                {output.length} characters
              </div>
            )}
          </div>
        )}

        {/* INFO SECTION */}
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="mb-2 font-semibold text-white">About This Tool</h3>
          <p className="text-sm text-gray-400">
            Base64 is a binary-to-text encoding scheme that uses 64 printable ASCII characters to represent binary data. It's commonly used in email, data URLs, and APIs.
          </p>
        </div>
      </div>
    </ToolLayout>
  )
}
