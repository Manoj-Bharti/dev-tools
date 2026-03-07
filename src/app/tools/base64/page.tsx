"use client"
import React, { useState } from 'react'
import { RotateCcw, AlertCircle } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Textarea } from '../../../components/ui/Textarea'
import { CopyButton } from '../../../components/shared/CopyButton'
import { ToolLayout } from '../../../components/shared/ToolLayout'

// Inline base64 helpers to avoid cross-module resolution during smoke tests
function encodeBase64(input: string) {
  try {
    return btoa(unescape(encodeURIComponent(input)))
  } catch {
    return btoa(input)
  }
}

function decodeBase64(input: string) {
  try {
    return decodeURIComponent(escape(atob(input)))
  } catch {
    return atob(input)
  }
}

export default function Base64Tool() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  function handleProcess() {
    try {
      setError('')
      if (mode === 'encode') setOutput(encodeBase64(input))
      else setOutput(decodeBase64(input))
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
      title="Base64 Encoder / Decoder" 
      description="Encode and decode text to/from Base64 format."
    >
      <div className="space-y-6">
        {/* MODE TOGGLE */}
        <div className="flex gap-2">
          <Button 
            variant={mode === 'encode' ? 'default' : 'outline'}
            onClick={() => setMode('encode')}
          >
            Encode
          </Button>
          <Button 
            variant={mode === 'decode' ? 'default' : 'outline'}
            onClick={() => setMode('decode')}
          >
            Decode
          </Button>
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
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to encode or decode..."
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
          {mode === 'encode' ? 'Encode' : 'Decode'}
        </Button>

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
            <div className="tool-output font-mono whitespace-pre-wrap break-all">
              {output}
            </div>
            {output && (
              <div className="mt-2 text-sm text-gray-400">
                {output.length} characters
              </div>
            )}
          </div>
        )}

        {/* INFO SECTION */}
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="mb-2 font-semibold text-white">About This Tool</h3>
          <p className="text-sm text-gray-400">
            Base64 is a binary-to-text encoding scheme that uses 64 printable ASCII characters to represent binary data. It's commonly used in email, data URLs, and APIs.
          </p>
        </div>
      </div>

      {/* SEO Content Section */}
      <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto mt-16">
        <section className="mb-12">
          <h2>What is Base64 Encoding?</h2>
          <p>
            Base64 is a binary-to-text encoding scheme that converts binary data into a sequence of printable ASCII 
            characters. It uses 64 different characters (A-Z, a-z, 0-9, +, /) to represent binary data, making it 
            safe to transmit over text-based protocols that don't support binary data.
          </p>
          <p>
            Originally developed for encoding email attachments (MIME), Base64 is now widely used in web development, 
            APIs, data URIs, and anywhere binary data needs to be represented as text. It's especially common for 
            embedding images directly in HTML/CSS, sending file data in JSON, and storing binary data in databases.
          </p>
          <p>
            <strong>Important Note:</strong> Base64 is NOT encryption or security. It's simply an encoding method. 
            Anyone can decode Base64 strings instantly - never use it to protect sensitive information without proper encryption.
          </p>
        </section>

        <section className="mb-12">
          <h2>How to Use This Base64 Tool</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Encoding Text to Base64:</h3>
          <ol className="space-y-2">
            <li>Type or paste your text in the input field</li>
            <li>Click the "Encode" button</li>
            <li>Your Base64-encoded result appears instantly</li>
            <li>Click "Copy" to copy the result to your clipboard</li>
          </ol>

          <h3 className="text-xl font-semibold mt-6 mb-3">Decoding Base64 to Text:</h3>
          <ol className="space-y-2">
            <li>Switch to "Decode" mode</li>
            <li>Paste your Base64 string in the input field</li>
            <li>Click "Decode" to see the original text</li>
            <li>Copy the decoded result if needed</li>
          </ol>

          <h3 className="text-xl font-semibold mt-6 mb-3">Encoding Files to Base64:</h3>
          <ol className="space-y-2">
            <li>Switch to "File to Base64" mode</li>
            <li>Upload any file (images, PDFs, documents, etc.)</li>
            <li>The tool converts it to a Base64 string</li>
            <li>Use this string in data URIs, APIs, or databases</li>
          </ol>

          <h3 className="text-xl font-semibold mt-6 mb-3">Decoding Base64 to Files:</h3>
          <ol className="space-y-2">
            <li>Switch to "Base64 to File" mode</li>
            <li>Paste your Base64 string</li>
            <li>Specify the output filename and extension</li>
            <li>Click "Download" to save the decoded file</li>
          </ol>
        </section>

        <section className="mb-12">
          <h2>Common Use Cases for Base64</h2>
          <ul className="space-y-3">
            <li>
              <strong>Email Attachments:</strong> MIME protocol uses Base64 to encode file attachments in emails, 
              ensuring they can be transmitted safely over email servers that only support text.
            </li>
            <li>
              <strong>Data URIs in HTML/CSS:</strong> Embed small images directly in your HTML or CSS using Base64 
              data URIs: <code>data:image/png;base64,iVBORw0KG...</code> This reduces HTTP requests and improves 
              performance for small assets.
            </li>
            <li>
              <strong>API Communication:</strong> Send binary files (images, documents) in JSON payloads by encoding 
              them as Base64 strings. This is common in RESTful APIs that need to handle file uploads.
            </li>
            <li>
              <strong>Storing Images in Databases:</strong> Some developers store small images as Base64 strings in 
              text database fields, though this isn't always recommended for large files due to size increase.
            </li>
            <li>
              <strong>Authentication Tokens:</strong> JWT tokens and many authentication systems use Base64 encoding 
              for token headers and payloads (though they're not encrypted - use HTTPS for security).
            </li>
            <li>
              <strong>CSS Font Embedding:</strong> Web fonts can be embedded in CSS files using Base64 to reduce 
              external file requests and improve page load times.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Why Does Base64 Increase File Size?</h2>
          <p>
            Base64 encoding increases data size by approximately 33%. This happens because Base64 uses 6 bits per 
            character to represent 8 bits of original data. Every 3 bytes (24 bits) of binary data becomes 4 
            characters (24 bits) in Base64.
          </p>
          <p>
            <strong>Example:</strong> A 100KB image becomes approximately 133KB when Base64 encoded. For this reason, 
            Base64 is best used for small files or when the benefits (fewer HTTP requests, embedding in JSON/HTML) 
            outweigh the size increase.
          </p>
        </section>

        <section className="mb-12">
          <h2>Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Is Base64 encoding secure?</h3>
              <p>
                No, Base64 is NOT encryption or security. It's simply a way to represent binary data as text. 
                Anyone can decode Base64 strings instantly using any decoder tool. Never use Base64 alone to 
                protect passwords, API keys, or sensitive data. Always use proper encryption (AES, RSA) and 
                HTTPS for security.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: What's the maximum file size I can encode?</h3>
              <p>
                Our tool runs entirely in your browser, so the limit depends on your device's memory. Modern 
                browsers can typically handle files up to 50-100MB, but very large files may slow down or freeze 
                your browser. For files over 10MB, we recommend using command-line tools or server-side processing.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Is my data safe? Do you upload files to your server?</h3>
              <p>
                Absolutely safe! All encoding and decoding happens entirely in your browser using JavaScript. 
                Your files and data NEVER leave your device - nothing is uploaded to our servers. You can even 
                use this tool offline after the page loads. Check our <a href="/privacy">Privacy Policy</a> for details.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Can I encode images to Base64?</h3>
              <p>
                Yes! Upload any image format (PNG, JPG, GIF, SVG, WebP, etc.) and convert it to a Base64 data URI. 
                This is perfect for embedding small images in HTML, CSS, or JSON. The output will look like: 
                <code>data:image/png;base64,iVBORw0KG...</code>
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: What's the difference between Base64 and Base64URL?</h3>
              <p>
                Base64URL is a URL-safe variant that replaces + with - and / with _ to avoid issues in URLs and 
                filenames. It's commonly used in JWT tokens. Our standard Base64 encoder uses the traditional 
                alphabet, but the output can be manually converted if needed.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Why do I see "=" characters at the end of Base64 strings?</h3>
              <p>
                The "=" character is padding used when the input length isn't divisible by 3. It ensures the 
                Base64 output length is always divisible by 4. This padding is optional in some contexts but 
                required by strict Base64 standards.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Privacy & Security</h2>
          <p>
            Your privacy is our priority. This Base64 encoder/decoder operates entirely client-side in your browser. 
            No data is transmitted to our servers, no files are uploaded, and nothing is logged or stored. You can 
            verify this by checking your browser's network tab - you'll see zero requests when using the tool.
          </p>
          <p>
            The tool works offline once the page loads, and the source code is open source on GitHub for complete 
            transparency. Feel confident encoding sensitive documents, API tokens, or any data - it stays on your device.
          </p>
        </section>

        <section className="mb-12">
          <h2>Related Tools</h2>
          <ul className="space-y-2">
            <li><a href="/tools/hash" className="text-blue-600 dark:text-blue-400 hover:underline">Hash Generator</a> - Generate MD5, SHA-1, SHA-256 hashes</li>
            <li><a href="/tools/url" className="text-blue-600 dark:text-blue-400 hover:underline">URL Encoder/Decoder</a> - Encode and decode URL parameters</li>
            <li><a href="/tools/jwt" className="text-blue-600 dark:text-blue-400 hover:underline">JWT Decoder</a> - Decode JSON Web Tokens</li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  )
}
