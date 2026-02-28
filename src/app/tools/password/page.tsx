"use client"
import React, { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { CopyButton } from '../../../components/shared/CopyButton'
import { ToolLayout } from '../../../components/shared/ToolLayout'
import { generatePassword } from '../../../lib/utils/password'

export default function PasswordTool() {
  const [len, setLen] = useState(16)
  const [upper, setUpper] = useState(true)
  const [lower, setLower] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(false)
  const [out, setOut] = useState('')

  function handleGenerate() {
    try {
      setOut(generatePassword({ length: len, upper, lower, numbers, symbols }))
    } catch (e) {
      setOut((e as Error).message)
    }
  }

  function handleClear() {
    setLen(16)
    setUpper(true)
    setLower(true)
    setNumbers(true)
    setSymbols(false)
    setOut('')
  }

  return (
    <ToolLayout 
      title="Password Generator" 
      description="Generate secure random passwords with customizable options."
    >
      <div className="space-y-6">
        {/* OPTIONS SECTION */}
        <div className="tool-section space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-white">Password Length</label>
              <span className="text-lg font-semibold text-cyan-400">{len}</span>
            </div>
            <input 
              type="range" 
              min={8} 
              max={128} 
              value={len} 
              onChange={(e) => setLen(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium block text-white">Character Types</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={upper} 
                  onChange={(e) => setUpper(e.target.checked)}
                  className="rounded"
                />
                  <span className="text-sm">Uppercase (A-Z)</span>
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={lower} 
                  onChange={(e) => setLower(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Lowercase (a-z)</span>
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={numbers} 
                  onChange={(e) => setNumbers(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Numbers (0-9)</span>
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={symbols} 
                  onChange={(e) => setSymbols(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Symbols (!@#$%^...)</span>
              </label>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2">
          <Button onClick={handleGenerate} size="lg" className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white">
            Generate Password
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleClear}
            aria-label="Reset options"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* OUTPUT SECTION */}
        {out && (
          <div className="tool-section">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Generated Password</h3>
              <CopyButton text={out} />
            </div>
            <div className="tool-output font-mono break-all select-all">
              {out}
            </div>
          </div>
        )}

        {/* INFO SECTION */}
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="mb-2 font-semibold text-white">About This Tool</h3>
          <p className="text-sm text-gray-400">
            A strong password typically includes uppercase and lowercase letters, numbers, and symbols. Aiming for 12+ characters provides good security for most purposes.
          </p>
        </div>
      </div>
    </ToolLayout>
  )
}
