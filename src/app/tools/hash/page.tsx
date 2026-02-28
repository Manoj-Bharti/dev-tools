"use client"
import React, { useState } from 'react'
import { RotateCcw, AlertCircle } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Textarea } from '../../../components/ui/Textarea'
import { CopyButton } from '../../../components/shared/CopyButton'
import { ToolLayout } from '../../../components/shared/ToolLayout'
import { hashAll } from '../../../lib/utils/hash'

export default function HashTool() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<Record<string, string>>({})
  const [error, setError] = useState('')

  async function handleProcess() {
    try {
      setError('')
      const r = await hashAll(input)
      setResult(r)
    } catch (e) {
      setError((e as Error).message)
      setResult({})
    }
  }

  function handleClear() {
    setInput('')
    setResult({})
    setError('')
  }

  return (
    <ToolLayout 
      title="Hash Generator" 
      description="Generate SHA-1, SHA-256, SHA-512 (and MD5 if available) in your browser."
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
            placeholder="Enter text to hash..."
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
          Generate Hashes
        </Button>

        {/* ERROR DISPLAY */}
        {error && (
          <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-400 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* OUTPUT SECTION */}
        {Object.keys(result).length > 0 && (
          <div className="tool-section space-y-4">
            <h3 className="text-lg font-semibold text-white">Results</h3>
            {Object.entries(result).map(([algorithm, hash]) => (
              <div key={algorithm} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">{algorithm}</label>
                  <CopyButton text={hash} />
                </div>
                <div className="tool-output font-mono whitespace-pre-wrap break-all text-xs">
                  {hash}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* INFO SECTION */}
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="mb-2 font-semibold text-white">About This Tool</h3>
          <p className="text-sm text-gray-400">
            Hash functions generate fixed-size digital fingerprints of input data. Different algorithms offer different security levels and use cases - SHA-256 is commonly used for security, while MD5 is legacy.
          </p>
        </div>
      </div>
    </ToolLayout>
  )
}
