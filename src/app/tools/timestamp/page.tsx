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

      {/* SEO Content Section */}
      <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto mt-16">
        <section className="mb-12">
          <h2>What is a Unix Timestamp?</h2>
          <p>
            A Unix timestamp is a way to represent time as a single number. It counts the number of seconds 
            (or milliseconds) that have elapsed since January 1, 1970, at 00:00:00 UTC. This date is known 
            as the "Unix epoch" and serves as the reference point for all Unix timestamps.
          </p>
          <p>
            Unix timestamps are widely used in programming because they're simple, compact, and easy to 
            work with programmatically. They're language-agnostic and don't suffer from timezone or 
            localization issues that plague human-readable date formats.
          </p>
        </section>

        <section className="mb-12">
          <h2>How to Use This Timestamp Converter</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Converting Timestamps to Dates:</h3>
          <ol className="space-y-2">
            <li>Enter a Unix timestamp (like 1704067200) in the input field</li>
            <li>Check "Milliseconds" if your timestamp is in milliseconds</li>
            <li>Click "Convert" to see the human-readable date</li>
            <li>Get results in your local timezone and UTC</li>
          </ol>

          <h3 className="text-xl font-semibold mt-6 mb-3">Converting Dates to Timestamps:</h3>
          <ol className="space-y-2">
            <li>Enter a date string (like "2024-01-01" or "2024-01-01T12:00:00Z")</li>
            <li>Check "Milliseconds" if you want millisecond precision</li>
            <li>Click "Convert" to get the Unix timestamp</li>
            <li>Use the timestamp in your applications or APIs</li>
          </ol>

          <h3 className="text-xl font-semibold mt-6 mb-3">Getting Current Time:</h3>
          <ol className="space-y-2">
            <li>Click "Current Time" to populate the input with the current timestamp</li>
            <li>Convert it to see the current date and time</li>
            <li>Perfect for testing and development</li>
          </ol>
        </section>

        <section className="mb-12">
          <h2>Common Use Cases</h2>
          <ul className="space-y-3">
            <li>
              <strong>API Development:</strong> Convert between timestamps and readable dates for API requests 
              and responses
            </li>
            <li>
              <strong>Database Storage:</strong> Store dates as timestamps for efficient querying and sorting
            </li>
            <li>
              <strong>JWT Tokens:</strong> Check expiration times (exp claims) in JWT tokens
            </li>
            <li>
              <strong>Logging:</strong> Use timestamps for consistent, sortable log entries across timezones
            </li>
            <li>
              <strong>Data Analysis:</strong> Convert timestamps for data visualization and reporting
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Timestamp Formats</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Seconds (Standard)</h3>
              <p>
                Most common format, counts seconds since Unix epoch. Example: 1704067200 (January 1, 2024)
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Milliseconds</h3>
              <p>
                Higher precision, counts milliseconds since Unix epoch. Example: 1704067200000
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">ISO 8601</h3>
              <p>
                Human-readable format: 2024-01-01T00:00:00.000Z (with timezone information)
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Why do timestamps start from 1970?</h3>
              <p>
                January 1, 1970, is the date when Unix was first released. This date was chosen as the epoch 
                because it was a recent date at the time and avoided issues with different calendar systems.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Are timestamps affected by leap seconds?</h3>
              <p>
                Unix timestamps don't account for leap seconds. They count SI seconds continuously. This can 
                cause small discrepancies with UTC time, but it's rarely a practical concern.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: What's the difference between local time and UTC?</h3>
              <p>
                UTC is Coordinated Universal Time, the primary time standard. Local time is UTC adjusted for 
                your timezone offset. Timestamps are always stored as UTC to avoid timezone confusion.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Can timestamps represent dates before 1970?</h3>
              <p>
                Yes, negative timestamps represent dates before 1970. For example, -1 represents December 31, 
                1969, at 11:59:59 PM UTC.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Programming Language Examples</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">JavaScript</h3>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`// Get current timestamp
const now = Date.now(); // milliseconds
const nowSeconds = Math.floor(Date.now() / 1000); // seconds

// Convert timestamp to date
const date = new Date(timestamp * 1000);

// Convert date to timestamp
const timestamp = Math.floor(date.getTime() / 1000);`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Python</h3>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`import time
import datetime

# Get current timestamp
now = time.time()  # seconds with decimals

# Convert timestamp to date
date = datetime.datetime.fromtimestamp(timestamp)

# Convert date to timestamp
timestamp = date.timestamp()`}
              </pre>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Related Tools</h2>
          <ul className="space-y-2">
            <li><a href="/tools/jwt" className="text-blue-600 dark:text-blue-400 hover:underline">JWT Decoder</a> - Check token expiration times</li>
            <li><a href="/tools/json" className="text-blue-600 dark:text-blue-400 hover:underline">JSON Formatter</a> - Format timestamp data</li>
            <li><a href="/tools/hash" className="text-blue-600 dark:text-blue-400 hover:underline">Hash Generator</a> - Generate unique identifiers</li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  )
}
