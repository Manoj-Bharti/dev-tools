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

      {/* SEO Content Section */}
      <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto mt-16">
        <section className="mb-12">
          <h2>What is a UUID?</h2>
          <p>
            A UUID (Universally Unique Identifier), also known as a GUID (Globally Unique Identifier), is a 
            128-bit number used to uniquely identify information in computer systems. UUIDs are designed to 
            be unique across space and time, making them ideal for distributed systems where central coordination 
            isn't possible.
          </p>
          <p>
            The format is 8-4-4-4-12 hexadecimal digits separated by hyphens, like: 
            <code>550e8400-e29b-41d4-a716-446655440000</code>
          </p>
        </section>

        <section className="mb-12">
          <h2>How to Use This UUID Generator</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Basic Generation:</h3>
          <ol className="space-y-2">
            <li>Set the number of UUIDs you want to generate (1-100)</li>
            <li>Choose your formatting options (uppercase, hyphens)</li>
            <li>Click "Generate" to create random UUIDs</li>
            <li>Copy individual UUIDs or the entire list</li>
          </ol>

          <h3 className="text-xl font-semibold mt-6 mb-3">Formatting Options:</h3>
          <ul className="space-y-2">
            <li><strong>Uppercase:</strong> Convert to uppercase letters (A-F instead of a-f)</li>
            <li><strong>Include Hyphens:</strong> Toggle the standard hyphen separators</li>
            <li><strong>Compact Format:</strong> Remove hyphens for a continuous 32-character string</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Common Use Cases</h2>
          <ul className="space-y-3">
            <li>
              <strong>Database Primary Keys:</strong> Generate unique IDs for database records without 
              auto-increment conflicts
            </li>
            <li>
              <strong>API Resource IDs:</strong> Create unique identifiers for REST API resources
            </li>
            <li>
              <strong>Session Tokens:</strong> Generate unique session identifiers for user authentication
            </li>
            <li>
              <strong>File Names:</strong> Create unique filenames to avoid conflicts in file systems
            </li>
            <li>
              <strong>Distributed Systems:</strong> Generate IDs that are unique across multiple servers 
              and databases
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>UUID Versions</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">UUID v1 (Time-based)</h3>
              <p>
                Based on timestamp and MAC address. Includes time information but reveals hardware details.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">UUID v3 (Name-based, MD5)</h3>
              <p>
                Generated from a namespace and name using MD5 hash. Deterministic - same input always 
                produces same UUID.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">UUID v4 (Random)</h3>
              <p>
                <strong>This tool generates v4 UUIDs.</strong> Completely random, highest entropy. Most 
                commonly used for general-purpose unique identifiers.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">UUID v5 (Name-based, SHA-1)</h3>
              <p>
                Similar to v3 but uses SHA-1 instead of MD5. More secure but still deterministic.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Q: How unique are UUIDs?</h3>
              <p>
                Extremely unique. With 128 bits of randomness, there are 2^128 possible UUIDs 
                (approximately 3.4 × 10^38). The probability of collision is so low that you could 
                generate billions per second for centuries without collision.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Are UUIDs random?</h3>
              <p>
                v4 UUIDs are randomly generated using cryptographically secure random number generators. 
                They're not truly random in a mathematical sense but have sufficient entropy for practical 
                uniqueness guarantees.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Should I use UUIDs as database primary keys?</h3>
              <p>
                It depends. UUIDs are great for distributed systems and avoiding ID conflicts, but they're 
                larger than auto-increment integers and can impact database performance. Consider your 
                specific use case and performance requirements.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Can I generate UUIDs offline?</h3>
              <p>
                Yes! This tool works completely offline. Once the page loads, all generation happens in 
                your browser using the Web Crypto API. No internet connection required after initial load.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Programming Examples</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">JavaScript</h3>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`// Generate a single UUID
const { v4: uuidv4 } = require('uuid');
const id = uuidv4();

// Generate multiple UUIDs
const ids = Array.from({length: 10}, () => uuidv4());`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Python</h3>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`import uuid

# Generate a single UUID
id = uuid.uuid4()

# Generate multiple UUIDs
ids = [uuid.uuid4() for _ in range(10)]`}
              </pre>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Related Tools</h2>
          <ul className="space-y-2">
            <li><a href="/tools/hash" className="text-blue-600 dark:text-blue-400 hover:underline">Hash Generator</a> - Generate cryptographic hashes</li>
            <li><a href="/tools/password" className="text-blue-600 dark:text-blue-400 hover:underline">Password Generator</a> - Generate secure passwords</li>
            <li><a href="/tools/timestamp" className="text-blue-600 dark:text-blue-400 hover:underline">Timestamp Converter</a> - Work with time-based identifiers</li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  )
}
