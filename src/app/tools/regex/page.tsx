"use client"
import React, { useState } from 'react'
import { RotateCcw, AlertCircle } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Textarea } from '../../../components/ui/Textarea'
import { CopyButton } from '../../../components/shared/CopyButton'
import { ToolLayout } from '../../../components/shared/ToolLayout'

export default function RegexTool() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [text, setText] = useState('')
  const [matches, setMatches] = useState<string[]>([])
  const [error, setError] = useState('')

  function handleProcess() {
    try {
      setError('')
      const re = new RegExp(pattern, flags)
      const m = Array.from(text.matchAll(re)).map(a => a[0])
      setMatches(m)
    } catch (e) {
      setError((e as Error).message)
      setMatches([])
    }
  }

  function handleClear() {
    setPattern('')
    setFlags('g')
    setText('')
    setMatches([])
    setError('')
  }

  const matchesText = matches.length > 0 ? matches.join('\n') : ''

  return (
    <ToolLayout 
      title="Regex Tester" 
      description="Test regular expressions and see matches and capture groups."
    >
      <div className="space-y-6">
        {/* PATTERN INPUT */}
        <div className="tool-section">
          <label className="text-sm font-medium block mb-2 text-white">Pattern</label>
          <input 
            value={pattern} 
            onChange={(e) => setPattern(e.target.value)} 
            placeholder="/pattern/" 
            className="w-full px-3 py-2 rounded-md border border-gray-800 bg-gray-900 text-gray-100 font-mono placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* FLAGS INPUT */}
        <div className="tool-section">
          <label className="text-sm font-medium block mb-2 text-white">Flags</label>
          <input 
            value={flags} 
            onChange={(e) => setFlags(e.target.value)} 
            placeholder="g, i, m, etc." 
            className="w-full px-3 py-2 rounded-md border border-gray-800 bg-gray-900 text-gray-100 font-mono placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <p className="text-xs text-gray-400 mt-2">g = global, i = case-insensitive, m = multiline</p>
        </div>

        {/* TEXT INPUT */}
        <div className="tool-section">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Test String</h3>
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
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to test against..."
            className="tool-input font-mono"
            rows={8}
          />
          {text && (
            <div className="mt-2 text-sm text-gray-400">
              {text.length} characters
            </div>
          )}
        </div>

        {/* ACTION BUTTON */}
        <Button onClick={handleProcess} size="lg" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
          Test Regex
        </Button>

        {/* ERROR DISPLAY */}
        {error && (
          <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-400 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* MATCHES OUTPUT */}
        {matches.length > 0 && (
          <div className="tool-section">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Matches ({matches.length})</h3>
              {matchesText && <CopyButton text={matchesText} />}
            </div>
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {matches.map((m, i) => (
                <div key={i} className="tool-output font-mono text-sm whitespace-pre-wrap break-all">
                  {m}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INFO SECTION */}
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="mb-2 font-semibold text-white">About This Tool</h3>
          <p className="text-sm text-gray-400">
            Regular expressions are patterns used to match, find, and replace text. This tool uses JavaScript's RegExp engine. Test your patterns efficiently against sample text.
          </p>
        </div>
      </div>
    </ToolLayout>
  )
}
