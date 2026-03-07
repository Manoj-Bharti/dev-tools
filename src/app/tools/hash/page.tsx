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

      {/* SEO Content Section */}
      <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto mt-16">
        <section className="mb-12">
          <h2>What is a Hash Function?</h2>
          <p>
            A hash function is a mathematical algorithm that converts input data of any size into a fixed-size 
            string of characters, typically represented as a hexadecimal number. Hash functions are designed to 
            be one-way operations - you can generate a hash from input, but you cannot reverse the process to 
            recover the original data.
          </p>
          <p>
            Hash functions are fundamental to modern cryptography and data integrity. They ensure data hasn't 
            been tampered with, enable efficient data lookup, and form the basis of digital signatures and 
            blockchain technology.
          </p>
        </section>

        <section className="mb-12">
          <h2>How to Use This Hash Generator</h2>
          <ol className="space-y-2">
            <li>Enter any text, password, or data in the input field</li>
            <li>Click "Generate Hashes" to compute multiple hash algorithms simultaneously</li>
            <li>View results for MD5, SHA-1, SHA-256, and SHA-512</li>
            <li>Copy any hash value using the copy button next to each result</li>
          </ol>
          <p className="mt-4">
            All hashing is performed client-side in your browser using the Web Crypto API for maximum security 
            and performance.
          </p>
        </section>

        <section className="mb-12">
          <h2>Common Use Cases</h2>
          <ul className="space-y-3">
            <li>
              <strong>Password Storage:</strong> Hash passwords before storing them in databases (never store 
              plain text passwords)
            </li>
            <li>
              <strong>File Integrity:</strong> Generate checksums to verify files haven't been corrupted during 
              download or transfer
            </li>
            <li>
              <strong>Digital Signatures:</strong> Create unique identifiers for documents and data
            </li>
            <li>
              <strong>Blockchain:</strong> Cryptographic hashes form the foundation of blockchain technology
            </li>
            <li>
              <strong>Data Deduplication:</strong> Quickly identify duplicate files or data without comparing 
              entire contents
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Hash Algorithm Comparison</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">MD5 (Legacy)</h3>
              <p>
                128-bit hash, fast but cryptographically broken. Should not be used for security purposes. 
                Still useful for checksums and non-cryptographic applications.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">SHA-1 (Deprecated)</h3>
              <p>
                160-bit hash, widely used but considered weak for cryptographic purposes. Still found in 
                legacy systems but should be replaced with SHA-256 or higher.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">SHA-256 (Recommended)</h3>
              <p>
                256-bit hash, part of the SHA-2 family. Excellent security for most applications including 
                password hashing, digital signatures, and blockchain.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">SHA-512 (High Security)</h3>
              <p>
                512-bit hash, provides maximum security but slower than SHA-256. Used for highly sensitive 
                applications where performance is less critical than security.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Can I reverse a hash to get the original data?</h3>
              <p>
                No, hash functions are one-way operations by design. You cannot recover the original input from 
                a hash. This is what makes them secure for password storage.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Are hash collisions possible?</h3>
              <p>
                Yes, but extremely rare with modern algorithms. A collision occurs when two different inputs 
                produce the same hash. Strong algorithms like SHA-256 make collisions computationally infeasible.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Should I use MD5 for passwords?</h3>
              <p>
                Absolutely not. MD5 is cryptographically broken and can be cracked quickly. Use SHA-256 with 
                salt and key stretching (like bcrypt, scrypt, or Argon2) for password hashing.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Is my data safe using this tool?</h3>
              <p>
                Yes, completely safe. All hashing happens in your browser using the Web Crypto API. Your input 
                data never leaves your device or gets sent to any server.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Security Best Practices</h2>
          <ul className="space-y-2">
            <li><strong>Use salt:</strong> Always add random salt to passwords before hashing</li>
            <li><strong>Use key stretching:</strong> Apply the hash function multiple times (PBKDF2, bcrypt)</li>
            <li><strong>Choose appropriate algorithms:</strong> SHA-256 for most use cases, SHA-512 for high security</li>
            <li><strong>Avoid weak algorithms:</strong> Don't use MD5 or SHA-1 for security</li>
            <li><strong>Use HMAC:</strong> For message authentication, use HMAC instead of plain hashes</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Related Tools</h2>
          <ul className="space-y-2">
            <li><a href="/tools/base64" className="text-blue-600 dark:text-blue-400 hover:underline">Base64 Encoder</a> - Alternative encoding method</li>
            <li><a href="/tools/jwt" className="text-blue-600 dark:text-blue-400 hover:underline">JWT Decoder</a> - Decode tokens with hash signatures</li>
            <li><a href="/tools/password" className="text-blue-600 dark:text-blue-400 hover:underline">Password Generator</a> - Generate secure passwords</li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  )
}
