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

      {/* SEO Content Section */}
      <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto mt-16">
        <section className="mb-12">
          <h2>What is a Diff?</h2>
          <p>
            A diff (difference) shows the changes between two versions of text. It's a fundamental tool in 
            software development, used for code review, version control, and document comparison. Diffs help 
            developers understand what changed between versions, making collaboration and debugging much easier.
          </p>
          <p>
            The term "diff" comes from the Unix <code>diff</code> command, which compares files line by line. 
            Modern diff tools show additions, deletions, and context to make changes clear and actionable.
          </p>
        </section>

        <section className="mb-12">
          <h2>How to Use This Diff Checker</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Basic Comparison:</h3>
          <ol className="space-y-2">
            <li>Paste your original text in the left panel</li>
            <li>Paste the modified text in the right panel</li>
            <li>Click "Compare" to generate the diff</li>
            <li>Review the highlighted changes below</li>
          </ol>

          <h3 className="text-xl font-semibold mt-6 mb-3">Understanding the Output:</h3>
          <ul className="space-y-2">
            <li><strong>Green (+):</strong> Lines added in the new version</li>
            <li><strong>Red (-):</strong> Lines removed from the original</li>
            <li><strong>Gray/Context:</strong> Unchanged lines showing surrounding context</li>
            <li><strong>Line Numbers:</strong> Reference points for locating changes</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Common Use Cases</h2>
          <ul className="space-y-3">
            <li>
              <strong>Code Review:</strong> Review changes before merging pull requests or commits
            </li>
            <li>
              <strong>Version Control:</strong> Understand what changed between file versions
            </li>
            <li>
              <strong>Documentation:</strong> Compare document versions to track changes over time
            </li>
            <li>
              <strong>Configuration Files:</strong> Identify differences in config files between environments
            </li>
            <li>
              <strong>Debugging:</strong> Compare expected vs actual output to find discrepancies
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Types of Diff Output</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Unified Diff</h3>
              <p>
                Shows changes in a compact format with context lines. Used by Git and most version control systems. 
                Lines starting with + are additions, - are deletions, space are context.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Side-by-Side</h3>
              <p>
                Shows original and modified text in parallel columns. Easier to read for small changes but takes 
                more space. This tool shows a visual side-by-side comparison.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Context Diff</h3>
              <p>
                Similar to unified but uses different markers (*** and ---) to separate file sections. Less common 
                but still used in some legacy systems.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Diff Algorithms</h2>
          <p>
            Different algorithms produce different diff outputs. This tool uses a line-based comparison that 
            works well for most text:
          </p>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Myers Algorithm</h3>
              <p>
                Efficient algorithm that finds the minimum number of changes. Used by Git and most modern tools.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Longest Common Subsequence</h3>
              <p>
                Finds the longest sequence of unchanged lines, then shows differences around them.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Why do diffs show context lines?</h3>
              <p>
                Context lines help you understand where changes occurred. Without context, it would be hard to 
                know which part of a large file was modified. Most diffs show 3-5 lines of unchanged context around each change.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Can I diff binary files?</h3>
              <p>
                This tool is designed for text files. Binary files (images, executables) can't be meaningfully 
                diffed line by line. Use specialized binary diff tools for those file types.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: What's the difference between diff and patch?</h3>
              <p>
                A diff shows the differences between files. A patch is a diff formatted in a way that can be 
                applied to recreate the changes. The <code>patch</code> command can apply diff output to files.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Why are some lines marked as changed when they look the same?</h3>
              <p>
                This usually happens when whitespace changed (spaces vs tabs, trailing spaces) or when the 
                diff algorithm detects a more complex change pattern. Check for invisible characters.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Command Line Diff Tools</h2>
          <p>For power users, command-line diff tools offer more options:</p>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Git Diff</h3>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`git diff file1.txt file2.txt
git diff --word-diff  # Show word-level changes
git diff --stat       # Show summary statistics`}
              </pre>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Unix Diff</h3>
              <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`diff -u file1.txt file2.txt  # Unified format
diff -c file1.txt file2.txt  # Context format
diff -y file1.txt file2.txt  # Side by side`}
              </pre>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Related Tools</h2>
          <ul className="space-y-2">
            <li><a href="/tools/json" className="text-blue-600 dark:text-blue-400 hover:underline">JSON Formatter</a> - Format and compare JSON structures</li>
            <li><a href="/tools/regex" className="text-blue-600 dark:text-blue-400 hover:underline">Regex Tester</a> - Test patterns for text matching</li>
            <li><a href="/tools/url" className="text-blue-600 dark:text-blue-400 hover:underline">URL Encoder</a> - Encode URLs for comparison</li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  )
}
