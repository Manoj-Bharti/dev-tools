"use client"
import React, { useState } from 'react'
import { RotateCcw, AlertCircle } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Textarea } from '../../../components/ui/Textarea'
import { CopyButton } from '../../../components/shared/CopyButton'
import { ToolLayout } from '../../../components/shared/ToolLayout'
import { formatJson, minifyJson, validateJson } from '../../../lib/utils/json'
import { CodeEditor } from '../../../components/shared/CodeEditor'

export default function JSONTool() {
  const [input, setInput] = useState('')
  const [formatted, setFormatted] = useState('')
  const [error, setError] = useState('')

  function handleFormat() {
    try {
      validateJson(input)
      const f = formatJson(input)
      setFormatted(f)
      setError('')
    } catch (e) {
      setError((e as Error).message)
      setFormatted('')
    }
  }

  function handleMinify() {
    try {
      validateJson(input)
      const m = minifyJson(input)
      setFormatted(m)
      setError('')
    } catch (e) {
      setError((e as Error).message)
      setFormatted('')
    }
  }

  function handleClear() {
    setInput('')
    setFormatted('')
    setError('')
  }

  return (
    <ToolLayout 
      title="JSON Formatter / Validator" 
      description="Prettify, minify and validate JSON locally in your browser."
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
            placeholder="Paste raw JSON here..."
            className="tool-input font-mono"
            rows={8}
          />
          {input && (
            <div className="mt-2 text-sm text-gray-400">
              {input.length} characters
            </div>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2">
          <Button onClick={handleFormat} size="lg" className="flex-1">
            Format
          </Button>
          <Button onClick={handleMinify} variant="outline" size="lg" className="flex-1">
            Minify
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
        {formatted && (
          <div className="tool-section">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Output</h3>
              <CopyButton text={formatted} />
            </div>
            <CodeEditor value={formatted} />
            {formatted && (
              <div className="mt-2 text-sm text-gray-400">
                {formatted.length} characters
              </div>
            )}
          </div>
        )}

        {/* INFO SECTION */}
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="mb-2 font-semibold text-white">About This Tool</h3>
          <p className="text-sm text-gray-400">
            JSON (JavaScript Object Notation) is a lightweight data format. This tool helps validate syntax, format for readability, and minify for compression.
          </p>
        </div>
      </div>

      {/* SEO Content Section */}
      <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto mt-16">
        <section className="mb-12">
          <h2>What is JSON?</h2>
          <p>
            JSON (JavaScript Object Notation) is a lightweight data-interchange format that's easy for humans to 
            read and write, and easy for machines to parse and generate. It's the most popular format for APIs, 
            configuration files, and data storage in modern web development.
          </p>
          <p>
            JSON is language-independent but uses conventions familiar to programmers of C-family languages 
            (C, C++, C#, Java, JavaScript, Python, etc.). This makes it an ideal format for exchanging data 
            between different systems and programming languages.
          </p>
        </section>

        <section className="mb-12">
          <h2>How to Use This JSON Formatter</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Formatting (Beautifying) JSON:</h3>
          <ol className="space-y-2">
            <li>Paste your minified or messy JSON into the input field</li>
            <li>Click "Format" or "Beautify"</li>
            <li>Get properly indented, readable JSON with syntax highlighting</li>
            <li>Copy the formatted output</li>
          </ol>

          <h3 className="text-xl font-semibold mt-6 mb-3">Validating JSON:</h3>
          <ol className="space-y-2">
            <li>Paste any JSON string</li>
            <li>The tool automatically validates syntax</li>
            <li>If invalid, you'll see the exact error and line number</li>
            <li>Fix the error and validate again</li>
          </ol>

          <h3 className="text-xl font-semibold mt-6 mb-3">Minifying JSON:</h3>
          <ol className="space-y-2">
            <li>Paste formatted JSON</li>
            <li>Click "Minify" or "Compress"</li>
            <li>Get compact JSON with no whitespace</li>
            <li>Perfect for reducing file size or API payloads</li>
          </ol>
        </section>

        <section className="mb-12">
          <h2>Common Use Cases</h2>
          <ul className="space-y-3">
            <li>
              <strong>API Development & Testing:</strong> Format API responses to make them readable, or minify 
              request payloads to reduce bandwidth.
            </li>
            <li>
              <strong>Debugging:</strong> Quickly identify syntax errors in JSON configuration files, API responses, 
              or database exports.
            </li>
            <li>
              <strong>Code Review:</strong> Beautify JSON before committing to version control so it's readable 
              for reviewers.
            </li>
            <li>
              <strong>Data Migration:</strong> Validate JSON exports before importing into databases or other systems.
            </li>
            <li>
              <strong>Configuration Files:</strong> Format package.json, tsconfig.json, or any config file for 
              better readability.
            </li>
            <li>
              <strong>Learning JSON:</strong> Understand JSON structure by formatting and validating example data.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Common JSON Errors & How to Fix Them</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Trailing Commas</h3>
              <p>
                ❌ <code>{`{"name": "John", "age": 30,}`}</code><br/>
                ✅ <code>{`{"name": "John", "age": 30}`}</code><br/>
                JSON doesn't allow commas after the last item in objects or arrays.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Unquoted Keys</h3>
              <p>
                ❌ <code>{`{name: "John"}`}</code><br/>
                ✅ <code>{`{"name": "John"}`}</code><br/>
                All object keys must be in double quotes.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Single Quotes</h3>
              <p>
                ❌ <code>{`{'name': 'John'}`}</code><br/>
                ✅ <code>{`{"name": "John"}`}</code><br/>
                JSON only allows double quotes, never single quotes.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Comments</h3>
              <p>
                ❌ <code>{`{"name": "John" // this is a name}`}</code><br/>
                ✅ <code>{`{"name": "John"}`}</code><br/>
                JSON doesn't support comments. Remove them before parsing.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Undefined Values</h3>
              <p>
                ❌ <code>{`{"name": undefined}`}</code><br/>
                ✅ <code>{`{"name": null}`}</code><br/>
                Use <code>null</code> instead of <code>undefined</code>.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>JSON vs. Other Formats</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">JSON vs. XML</h3>
          <p>
            JSON is more lightweight and easier to parse than XML. Most modern APIs use JSON instead of XML 
            because it's simpler, less verbose, and directly maps to JavaScript objects.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">JSON vs. YAML</h3>
          <p>
            YAML is more human-readable and supports features like comments and anchors, but JSON is stricter 
            and safer for data interchange. JSON is also faster to parse in most languages.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">JSON vs. CSV</h3>
          <p>
            CSV is simpler for tabular data, but JSON handles nested objects and arrays better. For complex 
            data structures, JSON is the better choice.
          </p>
        </section>

        <section className="mb-12">
          <h2>Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Is my data safe? Do you store my JSON?</h3>
              <p>
                All formatting and validation happens entirely in your browser. Your JSON never leaves your device - 
                nothing is uploaded to our servers. You can even use this tool offline after the page loads.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: What's the maximum JSON size I can format?</h3>
              <p>
                The tool runs in your browser, so limits depend on your device's memory. Most browsers handle JSON 
                files up to 10-50MB without issues. For larger files, consider using command-line tools like 
                <code>jq</code> or <code>python -m json.tool</code>.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Why does my valid JavaScript object fail JSON validation?</h3>
              <p>
                JSON is stricter than JavaScript. Common issues: unquoted keys, single quotes, trailing commas, 
                functions, undefined values, or comments. JavaScript objects are not always valid JSON.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Can I convert JSON to other formats?</h3>
              <p>
                This tool focuses on formatting and validating JSON. For conversions to CSV, YAML, XML, or other 
                formats, you'll need specialized conversion tools (which we may add in the future!).
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Related Tools</h2>
          <ul className="space-y-2">
            <li><a href="/tools/jwt" className="text-blue-600 dark:text-blue-400 hover:underline">JWT Decoder</a> - JWT payloads are JSON objects</li>
            <li><a href="/tools/base64" className="text-blue-600 dark:text-blue-400 hover:underline">Base64 Encoder</a> - Encode JSON for data URIs</li>
            <li><a href="/tools/diff" className="text-blue-600 dark:text-blue-400 hover:underline">Diff Checker</a> - Compare two JSON objects</li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  )
}
