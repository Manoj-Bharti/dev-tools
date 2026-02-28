"use client"
import React, { useState } from 'react'
import { RotateCcw, AlertCircle } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Textarea } from '../../../components/ui/Textarea'
import { CopyButton } from '../../../components/shared/CopyButton'
import { ToolLayout } from '../../../components/shared/ToolLayout'

export default function URLTool() {
  const [input, setInput] = useState('')
  const [encoded, setEncoded] = useState('')
  const [encodedComp, setEncodedComp] = useState('')
  const [error, setError] = useState('')

  function handleEncode() {
    try {
      setError('')
      setEncoded(encodeURI(input))
      setEncodedComp(encodeURIComponent(input))
    } catch (e) {
      setError((e as Error).message)
      setEncoded('')
      setEncodedComp('')
    }
  }

  function handleDecode() {
    try {
      setError('')
      setInput(decodeURIComponent(input))
    } catch (e) {
      try { 
        setInput(decodeURI(input)) 
      } catch { 
        setError((e as Error).message)
      }
    }
  }

  function handleClear() {
    setInput('')
    setEncoded('')
    setEncodedComp('')
    setError('')
  }

  return (
    <ToolLayout 
      title="URL Encoder / Decoder" 
      description="Encode and decode URLs and URL components."
    >
      <div className="space-y-6">
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
            placeholder="Enter URL or text to encode/decode..."
            className="tool-input font-mono"
            rows={4}
          />
          {input && (
            <div className="mt-2 text-sm text-gray-400">
              {input.length} characters
            </div>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2">
          <Button onClick={handleEncode} size="lg" className="flex-1">
            Encode
          </Button>
          <Button onClick={handleDecode} variant="outline" size="lg" className="flex-1">
            Decode
          </Button>
        </div>

        {/* ERROR DISPLAY */}
        {error && (
          <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-400 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* ENCODE URI OUTPUT */}
        {encoded && (
          <div className="tool-section">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">encodeURI</h3>
              <CopyButton text={encoded} />
            </div>
            <div className="tool-output font-mono whitespace-pre-wrap break-all text-sm">
              {encoded}
            </div>
            <div className="mt-2 text-sm text-gray-400">
              {encoded.length} characters
            </div>
          </div>
        )}

        {/* ENCODE URI COMPONENT OUTPUT */}
        {encodedComp && (
          <div className="tool-section">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">encodeURIComponent</h3>
              <CopyButton text={encodedComp} />
            </div>
            <div className="tool-output font-mono whitespace-pre-wrap break-all text-sm">
              {encodedComp}
            </div>
            <div className="mt-2 text-sm text-gray-400">
              {encodedComp.length} characters
            </div>
          </div>
        )}

        {/* INFO SECTION */}
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="mb-2 font-semibold text-white">About This Tool</h3>
          <p className="text-sm text-gray-400 mb-2">
            URL encoding converts special characters to a format safe for URLs. This tool provides two methods:
          </p>
          <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
            <li><strong>encodeURI</strong> - Encodes full URLs, preserves special characters like /</li>
            <li><strong>encodeURIComponent</strong> - Encodes all special characters, safe for URL parameters</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  )
}
