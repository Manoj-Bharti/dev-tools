"use client"
import React, { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { CopyButton } from '../../../components/shared/CopyButton'
import { ToolLayout } from '../../../components/shared/ToolLayout'
import { generateUUIDv4 } from '../../../lib/utils/uuid'

export default function UUIDTool() {
  const [count, setCount] = useState(1)
  const [uppercase, setUppercase] = useState(false)
  const [hyphens, setHyphens] = useState(true)
  const [list, setList] = useState<string[]>([])

  function handleGenerate() {
    const res = [] as string[]
    for (let i = 0; i < Math.min(100, Math.max(1, count)); i++) {
      let u = generateUUIDv4()
      if (!hyphens) u = u.replace(/-/g, '')
      if (uppercase) u = u.toUpperCase()
      res.push(u)
    }
    setList(res)
  }

  function handleClear() {
    setCount(1)
    setUppercase(false)
    setHyphens(true)
    setList([])
  }

  const allUUIDs = list.join('\n')

  return (
    <ToolLayout 
      title="UUID v4 Generator" 
      description="Generate UUID v4 values client-side."
    >
      <div className="space-y-6">
        {/* OPTIONS SECTION */}
        <div className="tool-section space-y-4">
          <div>
            <label className="text-sm font-medium block mb-2 text-white">Number of UUIDs</label>
            <input 
              type="number" 
              min={1} 
              max={100} 
              value={count} 
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-md border border-gray-800 bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={uppercase} 
                onChange={(e) => setUppercase(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Uppercase</span>
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={hyphens} 
                onChange={(e) => setHyphens(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Include Hyphens</span>
            </label>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2">
          <Button onClick={handleGenerate} size="lg" className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white">
            Generate
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
        {list.length > 0 && (
          <div className="tool-section">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Generated UUIDs ({list.length})</h3>
              {allUUIDs && <CopyButton text={allUUIDs} />}
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {list.map((u, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-900 rounded-md">
                  <code className="font-mono text-sm break-all flex-1 text-gray-100">{u}</code>
                  <CopyButton text={u} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INFO SECTION */}
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="mb-2 font-semibold text-white">About This Tool</h3>
          <p className="text-sm text-gray-400">
            UUID v4 is a universally unique identifier generated randomly. It's widely used for unique identifiers in databases, APIs, and distributed systems. This tool generates them locally in your browser.
          </p>
        </div>
      </div>
    </ToolLayout>
  )
}
