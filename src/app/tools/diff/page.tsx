"use client"
import React, { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Textarea } from '../../../components/ui/Textarea'
import { ToolLayout } from '../../../components/shared/ToolLayout'
import { simpleLineDiff, DiffLine } from '../../../lib/utils/diff'

export default function DiffTool() {
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [result, setResult] = useState<DiffLine[]>([])

  function handleCompare() {
    setResult(simpleLineDiff(a, b))
  }

  function handleClear() {
    setA('')
    setB('')
    setResult([])
  }

  const addedCount = result.filter(r => r.type === 'added').length
  const removedCount = result.filter(r => r.type === 'removed').length
  const unchangedCount = result.filter(r => r.type === 'unchanged').length

  return (
    <ToolLayout 
      title="Diff Checker" 
      description="Compare two text documents and see the differences line by line."
    >
      <div className="space-y-6">
        {/* INPUT SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="tool-section">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Original</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClear}
                aria-label="Clear both inputs"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
            <Textarea
              value={a}
              onChange={(e) => setA(e.target.value)}
              placeholder="Enter original text..."
              className="tool-input font-mono"
              rows={10}
            />
            {a && (
              <div className="mt-2 text-sm text-gray-400">
                {a.split('\n').length} lines
              </div>
            )}
          </div>

          <div className="tool-section">
            <h3 className="text-lg font-semibold text-white mb-4">Modified</h3>
            <Textarea
              value={b}
              onChange={(e) => setB(e.target.value)}
              placeholder="Enter modified text..."
              className="tool-input font-mono"
              rows={10}
            />
            {b && (
              <div className="mt-2 text-sm text-gray-400">
                {b.split('\n').length} lines
              </div>
            )}
          </div>
        </div>

        {/* ACTION BUTTON */}
        <Button onClick={handleCompare} size="lg" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
          Compare Texts
        </Button>

        {/* STATISTICS */}
        {result.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4 text-center">
              <div className="text-2xl font-bold text-white">{unchangedCount}</div>
              <div className="text-sm text-gray-400">Unchanged</div>
            </div>
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-center">
              <div className="text-2xl font-bold text-red-400">{removedCount}</div>
              <div className="text-sm text-gray-400">Removed</div>
            </div>
            <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{addedCount}</div>
              <div className="text-sm text-gray-400">Added</div>
            </div>
          </div>
        )}

        {/* DIFF OUTPUT */}
        {result.length > 0 && (
          <div className="tool-section">
            <h3 className="text-lg font-semibold text-white mb-4">Diff Results</h3>
            <div className="space-y-1 max-h-96 overflow-y-auto font-mono text-sm">
              {result.map((r, i) => (
                <div
                  key={i}
                  className={`p-2 rounded whitespace-pre-wrap break-all ${
                    r.type === 'added'
                      ? 'bg-green-50/20 text-green-700 border-l-4 border-green-500'
                      : r.type === 'removed'
                      ? 'bg-red-50/20 text-red-700 border-l-4 border-red-500'
                      : 'bg-gray-900 text-gray-100 border-l-4 border-gray-800'
                  }`}
                >
                  <span className="select-none font-bold mr-2">
                    {r.type === 'added' ? '+' : r.type === 'removed' ? '−' : ' '}
                  </span>
                  {r.text}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INFO SECTION */}
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="mb-2 font-semibold text-white">About This Tool</h3>
          <p className="text-sm text-gray-400 mb-2">
            This diff tool compares two texts line by line and shows:
          </p>
          <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
            <li><span className="text-green-400">+</span> Lines added in the modified version</li>
            <li><span className="text-red-400">−</span> Lines removed from the original</li>
            <li><span className="text-white">•</span> Lines that remain unchanged</li>
          </ul>
        </div>
      </div>
    </ToolLayout>
  )
}
