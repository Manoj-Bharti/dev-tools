"use client"
import React, { useState } from 'react'
import { RotateCcw, AlertCircle } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Textarea } from '../../../components/ui/Textarea'
import { CopyButton } from '../../../components/shared/CopyButton'
import { ToolLayout } from '../../../components/shared/ToolLayout'

export default function URLTool() {
  const [input, setInput] = useState('')
  const [encoded, setEncoded] = useState('')
  const [encodedComp, setEncodedComp] = useState('')
  const [error, setError] = useState('')

  function handleEncode() {
    try {
      setError('')
      setEncoded(encodeURI(input))
      setEncodedComp(encodeURIComponent(input))
    } catch (e) {
      setError((e as Error).message)
      setEncoded('')
      setEncodedComp('')
    }
  }

  function handleDecode() {
    try {
      setError('')
      setInput(decodeURIComponent(input))
    } catch (e) {
      try { 
        setInput(decodeURI(input)) 
      } catch { 
        setError((e as Error).message)
      }
    }
  }

  function handleClear() {
    setInput('')
    setEncoded('')
    setEncodedComp('')
    setError('')
  }

  return (
    <ToolLayout 
      title="URL Encoder / Decoder" 
      description="Encode and decode URLs and URL components."
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
            placeholder="Enter URL or text to encode/decode..."
            className="tool-input font-mono"
            rows={4}
          />
          {input && (
            <div className="mt-2 text-sm text-gray-400">
              {input.length} characters
            </div>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2">
          <Button onClick={handleEncode} size="lg" className="flex-1">
            Encode
          </Button>
          <Button onClick={handleDecode} variant="outline" size="lg" className="flex-1">
            Decode
          </Button>
        </div>

        {/* ERROR DISPLAY */}
        {error && (
          <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-400 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* ENCODE URI OUTPUT */}
        {encoded && (
          <div className="tool-section">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">encodeURI</h3>
              <CopyButton text={encoded} />
            </div>
            <div className="tool-output font-mono whitespace-pre-wrap break-all text-sm">
              {encoded}
            </div>
            <div className="mt-2 text-sm text-gray-400">
              {encoded.length} characters
            </div>
          </div>
        )}

        {/* ENCODE URI COMPONENT OUTPUT */}
        {encodedComp && (
          <div className="tool-section">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">encodeURIComponent</h3>
              <CopyButton text={encodedComp} />
            </div>
            <div className="tool-output font-mono whitespace-pre-wrap break-all text-sm">
              {encodedComp}
            </div>
            <div className="mt-2 text-sm text-gray-400">
              {encodedComp.length} characters
            </div>
          </div>
        )}

        {/* INFO SECTION */}
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="mb-2 font-semibold text-white">About This Tool</h3>
          <p className="text-sm text-gray-400 mb-2">
            URL encoding converts special characters to a format safe for URLs. This tool provides two methods:
          </p>
          <ul className="text-sm text-gray-400 space-y-1 list-disc list-inside">
            <li><strong>encodeURI</strong> - Encodes full URLs, preserves special characters like /</li>
            <li><strong>encodeURIComponent</strong> - Encodes all special characters, safe for URL parameters</li>
          </ul>
        </div>
      </div>

      {/* SEO Content Section */}
      <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto mt-16">
        <section className="mb-12">
          <h2>What is URL Encoding?</h2>
          <p>
            URL encoding, also known as percent-encoding, is a mechanism for converting characters that are not 
            allowed in a URL into a format that can be transmitted over the internet. It replaces unsafe ASCII 
            characters with a "%" followed by two hexadecimal digits representing the character's ASCII value.
          </p>
          <p>
            For example, a space character (ASCII 32) becomes %20, and the plus sign (+) becomes %2B. This ensures 
            that URLs can contain special characters, spaces, and non-ASCII characters without breaking web 
            standards or causing parsing errors.
          </p>
        </section>

        <section className="mb-12">
          <h2>How to Use This URL Encoder/Decoder</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Encoding URLs:</h3>
          <ol className="space-y-2">
            <li>Choose between "Encode URI" or "Encode URI Component" mode</li>
            <li>Paste your text or URL containing special characters</li>
            <li>Click "Encode" to convert unsafe characters to percent-encoded format</li>
            <li>Copy the encoded result for use in URLs, APIs, or web applications</li>
          </ol>

          <h3 className="text-xl font-semibold mt-6 mb-3">Decoding URLs:</h3>
          <ol className="space-y-2">
            <li>Switch to "Decode" mode</li>
            <li>Paste your percent-encoded URL or text</li>
            <li>Click "Decode" to convert back to readable text</li>
            <li>Get the original text with all special characters restored</li>
          </ol>
        </section>

        <section className="mb-12">
          <h2>Common Use Cases</h2>
          <ul className="space-y-3">
            <li>
              <strong>API Development:</strong> Encode query parameters and form data before sending HTTP requests
            </li>
            <li>
              <strong>Web Development:</strong> Safely include user input in URLs without breaking navigation
            </li>
            <li>
              <strong>Data Transmission:</strong> Ensure special characters in data don't interfere with URL parsing
            </li>
            <li>
              <strong>SEO Optimization:</strong> Encode URLs for better search engine compatibility
            </li>
            <li>
              <strong>Debugging:</strong> Decode encoded URLs to understand what data is being transmitted
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>encodeURI vs encodeURIComponent</h2>
          <p>
            JavaScript provides two URL encoding functions with different purposes:
          </p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">encodeURI</h3>
          <p>
            Designed for encoding complete URIs. It preserves characters that have special meaning in URLs 
            like :, /, ;, and ?. Use this when you want to encode an entire URL.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">encodeURIComponent</h3>
          <p>
            Encodes all characters that could cause parsing problems in URL components. It encodes everything 
            including :, /, ;, and ?. Use this for individual URL components like query parameters.
          </p>
        </section>

        <section className="mb-12">
          <h2>Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Q: When should I use URL encoding?</h3>
              <p>
                Use URL encoding whenever you need to include special characters, spaces, or non-ASCII characters 
                in URLs. This includes query parameters, form data, and any user input that becomes part of a URL.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Is URL encoding the same as Base64?</h3>
              <p>
                No, they're different. URL encoding replaces individual characters with %XX sequences, while 
                Base64 converts binary data to a text representation using 64 different characters. URL encoding 
                is specifically for making text URL-safe.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Do I need to decode URLs before using them?</h3>
              <p>
                Most modern browsers and HTTP libraries automatically decode URLs. However, if you're processing 
                URL data manually or debugging, you may need to decode them to see the original content.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Related Tools</h2>
          <ul className="space-y-2">
            <li><a href="/tools/base64" className="text-blue-600 dark:text-blue-400 hover:underline">Base64 Encoder</a> - Alternative encoding method</li>
            <li><a href="/tools/json" className="text-blue-600 dark:text-blue-400 hover:underline">JSON Formatter</a> - Format API responses</li>
            <li><a href="/tools/jwt" className="text-blue-600 dark:text-blue-400 hover:underline">JWT Decoder</a> - Decode authentication tokens</li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  )
}
