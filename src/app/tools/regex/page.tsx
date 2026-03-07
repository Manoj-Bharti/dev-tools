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

      {/* SEO Content Section */}
      <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto mt-16">
        <section className="mb-12">
          <h2>What are Regular Expressions?</h2>
          <p>
            Regular expressions (regex or regexp) are powerful patterns used to match, search, and manipulate 
            text. They provide a concise way to describe complex text patterns, making them invaluable for 
            text processing, validation, parsing, and data extraction.
          </p>
          <p>
            Regex patterns consist of literal characters and special metacharacters that define rules for 
            matching text. They're supported in most programming languages and are essential for tasks like 
            email validation, data parsing, and text transformation.
          </p>
        </section>

        <section className="mb-12">
          <h2>How to Use This Regex Tester</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Basic Testing:</h3>
          <ol className="space-y-2">
            <li>Enter your regular expression pattern in the regex field</li>
            <li>Input test text in the text area below</li>
            <li>Choose matching options (global, case-insensitive, multiline)</li>
            <li>View matches highlighted in the text with capture groups</li>
          </ol>

          <h3 className="text-xl font-semibold mt-6 mb-3">Understanding Results:</h3>
          <ul className="space-y-2">
            <li><strong>Match Count:</strong> Total number of matches found</li>
            <li><strong>Highlighted Text:</strong> Matched portions are highlighted</li>
            <li><strong>Capture Groups:</strong> Extracted subgroups shown below</li>
            <li><strong>Match Details:</strong> Position and content of each match</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Common Use Cases</h2>
          <ul className="space-y-3">
            <li>
              <strong>Email Validation:</strong> Verify email address formats with complex patterns
            </li>
            <li>
              <strong>Data Extraction:</strong> Pull specific information from unstructured text
            </li>
            <li>
              <strong>Input Validation:</strong> Ensure user input matches expected formats
            </li>
            <li>
              <strong>Text Processing:</strong> Find and replace patterns in large text files
            </li>
            <li>
              <strong>Log Analysis:</strong> Extract information from server logs and error messages
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Basic Regex Syntax</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Literal Characters</h3>
              <p>Most characters match themselves: <code>abc</code> matches "abc"</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Character Classes</h3>
              <p>
                <code>[abc]</code> - Match any single character in brackets<br/>
                <code>[^abc]</code> - Match any character NOT in brackets<br/>
                <code>[a-z]</code> - Match range of characters
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Quantifiers</h3>
              <p>
                <code>*</code> - Zero or more<br/>
                <code>+</code> - One or more<br/>
                <code>?</code> - Zero or one<br/>
                <code>{'{n}'}</code> - Exactly n times
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Anchors</h3>
              <p>
                <code>^</code> - Start of line/string<br/>
                <code>$</code> - End of line/string<br/>
                <code>\b</code> - Word boundary
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Why isn't my regex working?</h3>
              <p>
                Common issues: missing escape characters for special regex symbols, incorrect quantifier 
                placement, or forgetting that some characters have special meaning. Test with simple patterns 
                first and build complexity gradually.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: What's the difference between greedy and lazy matching?</h3>
              <p>
                Greedy quantifiers (*, +, {'{n,}'}) match as much as possible. Lazy versions (*?, +?, {'{n,}?'} ) 
                match as little as possible. Use lazy matching when you want the shortest possible match.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: How do I match special characters literally?</h3>
              <p>
                Escape special characters with backslashes: <code>\.</code> for literal dot, <code>\*</code> for 
                literal asterisk, <code>\?</code> for literal question mark. Characters like ., *, +, ?, ^, $, 
                (, ), [, ], {, }, | need escaping.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: What's a capture group?</h3>
              <p>
                Parentheses create capture groups: <code>(abc)</code> captures "abc". You can reference captured 
                groups in replacements or access them programmatically. Non-capturing groups <code>(?:abc)</code> 
                group without capturing.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Regex Flags</h2>
          <p>This tool supports common regex flags:</p>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Global (g)</h3>
              <p>Find all matches, not just the first one</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Case Insensitive (i)</h3>
              <p>Ignore case differences (A matches a)</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Multiline (m)</h3>
              <p>^ and $ match line beginnings/endings, not just string start/end</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Related Tools</h2>
          <ul className="space-y-2">
            <li><a href="/tools/json" className="text-blue-600 dark:text-blue-400 hover:underline">JSON Formatter</a> - Validate and format JSON data</li>
            <li><a href="/tools/url" className="text-blue-600 dark:text-blue-400 hover:underline">URL Encoder</a> - Encode URLs for web use</li>
            <li><a href="/tools/diff" className="text-blue-600 dark:text-blue-400 hover:underline">Diff Checker</a> - Compare text differences</li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  )
}
