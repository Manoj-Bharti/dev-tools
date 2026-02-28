"use client"
import React, { useState } from 'react'
import { RotateCcw, AlertCircle } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Textarea } from '../../../components/ui/Textarea'
import { CopyButton } from '../../../components/shared/CopyButton'
import { ToolLayout } from '../../../components/shared/ToolLayout'
import { formatJson, minifyJson, validateJson } from '../../../lib/utils/json'
import { CodeEditor } from '../../../components/shared/CodeEditor'

export default function JSONTool() {
  const [input, setInput] = useState('')
  const [formatted, setFormatted] = useState('')
  const [error, setError] = useState('')

  function handleFormat() {
    try {
      validateJson(input)
      const f = formatJson(input)
      setFormatted(f)
      setError('')
    } catch (e) {
      setError((e as Error).message)
      setFormatted('')
    }
  }

  function handleMinify() {
    try {
      validateJson(input)
      const m = minifyJson(input)
      setFormatted(m)
      setError('')
    } catch (e) {
      setError((e as Error).message)
      setFormatted('')
    }
  }

  function handleClear() {
    setInput('')
    setFormatted('')
    setError('')
  }

  return (
    <ToolLayout 
      title="JSON Formatter / Validator" 
      description="Prettify, minify and validate JSON locally in your browser."
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
            placeholder="Paste raw JSON here..."
            className="tool-input font-mono"
            rows={8}
          />
          {input && (
            <div className="mt-2 text-sm text-gray-400">
              {input.length} characters
            </div>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2">
          <Button onClick={handleFormat} size="lg" className="flex-1">
            Format
          </Button>
          <Button onClick={handleMinify} variant="outline" size="lg" className="flex-1">
            Minify
          </Button>
        </div>

        {/* ERROR DISPLAY */}
        {error && (
          <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-400 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* OUTPUT SECTION */}
        {formatted && (
          <div className="tool-section">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Output</h3>
              <CopyButton text={formatted} />
            </div>
            <CodeEditor value={formatted} />
            {formatted && (
              <div className="mt-2 text-sm text-gray-400">
                {formatted.length} characters
              </div>
            )}
          </div>
        )}

        {/* INFO SECTION */}
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="mb-2 font-semibold text-white">About This Tool</h3>
          <p className="text-sm text-gray-400">
            JSON (JavaScript Object Notation) is a lightweight data format. This tool helps validate syntax, format for readability, and minify for compression.
          </p>
        </div>
      </div>
    </ToolLayout>
  )
}
