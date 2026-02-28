"use client"
import React, { useState } from 'react'
import { RotateCcw, AlertCircle } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { CopyButton } from '../../../components/shared/CopyButton'
import { ToolLayout } from '../../../components/shared/ToolLayout'

function toUnixSeconds(d: Date, ms = false) {
  return ms ? d.getTime() : Math.floor(d.getTime() / 1000)
}

export default function TimestampTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [ms, setMs] = useState(false)
  const [error, setError] = useState('')

  function handleNow() {
    const d = new Date()
    setInput(d.toISOString())
  }

  function handleProcess() {
    try {
      setError('')
      if (/^\d+$/.test(input.trim())) {
        const n = Number(input)
        const date = ms ? new Date(n) : new Date(n * 1000)
        setOutput(date.toString())
      } else {
        const date = new Date(input)
        if (isNaN(date.getTime())) throw new Error('Invalid date format')
        setOutput(String(toUnixSeconds(date, ms)))
      }
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
      title="Timestamp Converter" 
      description="Convert between Unix timestamps and human-readable dates."
    >
      <div className="space-y-6">
        {/* OPTIONS */}
        <div className="flex gap-2">
          <label className="flex items-center gap-2">
            <input 
              type="checkbox" 
              checked={ms} 
              onChange={(e) => setMs(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm">Milliseconds</span>
          </label>
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
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            className="w-full px-3 py-2 rounded-md border border-gray-800 bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder="Unix timestamp or date string (e.g., 2024-01-15)..." 
          />
          <p className="text-xs text-gray-400 mt-2">Enter a Unix timestamp or ISO date string</p>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2">
          <Button onClick={handleProcess} size="lg" className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white">
            Convert
          </Button>
          <Button onClick={handleNow} variant="outline" size="lg" className="flex-1">
            Current Time
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
        {output && (
          <div className="tool-section">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Output</h3>
              <CopyButton text={output} />
            </div>
            <div className="tool-output font-mono break-words">
              {output}
            </div>
          </div>
        )}

        {/* INFO SECTION */}
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="mb-2 font-semibold text-white">About This Tool</h3>
          <p className="text-sm text-gray-400">
            Unix timestamps represent time as a single number (seconds or milliseconds since January 1, 1970). This tool converts between timestamps and readable date/time formats.
          </p>
        </div>
      </div>
    </ToolLayout>
  )
}
