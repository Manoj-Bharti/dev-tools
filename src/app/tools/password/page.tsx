"use client"
import React, { useState } from 'react'
import { RotateCcw } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { CopyButton } from '../../../components/shared/CopyButton'
import { ToolLayout } from '../../../components/shared/ToolLayout'
import { generatePassword } from '../../../lib/utils/password'

export default function PasswordTool() {
  const [len, setLen] = useState(16)
  const [upper, setUpper] = useState(true)
  const [lower, setLower] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(false)
  const [out, setOut] = useState('')

  function handleGenerate() {
    try {
      setOut(generatePassword({ length: len, upper, lower, numbers, symbols }))
    } catch (e) {
      setOut((e as Error).message)
    }
  }

  function handleClear() {
    setLen(16)
    setUpper(true)
    setLower(true)
    setNumbers(true)
    setSymbols(false)
    setOut('')
  }

  return (
    <ToolLayout 
      title="Password Generator" 
      description="Generate secure random passwords with customizable options."
    >
      <div className="space-y-6">
        {/* OPTIONS SECTION */}
        <div className="tool-section space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-white">Password Length</label>
              <span className="text-lg font-semibold text-cyan-400">{len}</span>
            </div>
            <input 
              type="range" 
              min={8} 
              max={128} 
              value={len} 
              onChange={(e) => setLen(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium block text-white">Character Types</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={upper} 
                  onChange={(e) => setUpper(e.target.checked)}
                  className="rounded"
                />
                  <span className="text-sm">Uppercase (A-Z)</span>
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={lower} 
                  onChange={(e) => setLower(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Lowercase (a-z)</span>
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={numbers} 
                  onChange={(e) => setNumbers(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Numbers (0-9)</span>
              </label>
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={symbols} 
                  onChange={(e) => setSymbols(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm">Symbols (!@#$%^...)</span>
              </label>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-2">
          <Button onClick={handleGenerate} size="lg" className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white">
            Generate Password
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
        {out && (
          <div className="tool-section">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Generated Password</h3>
              <CopyButton text={out} />
            </div>
            <div className="tool-output font-mono break-all select-all">
              {out}
            </div>
          </div>
        )}

        {/* INFO SECTION */}
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="mb-2 font-semibold text-white">About This Tool</h3>
          <p className="text-sm text-gray-400">
            A strong password typically includes uppercase and lowercase letters, numbers, and symbols. Aiming for 12+ characters provides good security for most purposes.
          </p>
        </div>
      </div>

      {/* SEO Content Section */}
      <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto mt-16">
        <section className="mb-12">
          <h2>What Makes a Strong Password?</h2>
          <p>
            A strong password is one that's difficult for attackers to guess or crack using automated tools. 
            Modern password security focuses on length and complexity rather than complex patterns that are 
            hard to remember. The best passwords are long, random, and unique to each account.
          </p>
          <p>
            Password strength is measured by entropy - the amount of uncertainty in each character. More 
            character types and longer lengths exponentially increase the difficulty of brute-force attacks.
          </p>
        </section>

        <section className="mb-12">
          <h2>How to Use This Password Generator</h2>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Basic Generation:</h3>
          <ol className="space-y-2">
            <li>Set your desired password length (8-128 characters)</li>
            <li>Choose character types to include (uppercase, lowercase, numbers, symbols)</li>
            <li>Click "Generate Password" to create a random password</li>
            <li>Copy the password and use it for your accounts</li>
          </ol>

          <h3 className="text-xl font-semibold mt-6 mb-3">Advanced Options:</h3>
          <ul className="space-y-2">
            <li><strong>Exclude Similar Characters:</strong> Remove confusing characters like 0/O, 1/I/l</li>
            <li><strong>Exclude Ambiguous:</strong> Remove characters that might cause issues in URLs or code</li>
            <li><strong>Multiple Passwords:</strong> Generate several options at once</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Password Security Best Practices</h2>
          <ul className="space-y-3">
            <li>
              <strong>Use Long Passwords:</strong> Aim for 12+ characters. Length is more important than complexity
            </li>
            <li>
              <strong>Use Unique Passwords:</strong> Never reuse passwords across different accounts
            </li>
            <li>
              <strong>Use Password Managers:</strong> Store complex passwords securely instead of remembering them
            </li>
            <li>
              <strong>Enable Two-Factor Authentication:</strong> Add an extra layer of security beyond passwords
            </li>
            <li>
              <strong>Avoid Common Patterns:</strong> Don't use personal information, dictionary words, or simple patterns
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Password Strength Guidelines</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Weak (8-11 characters)</h3>
              <p>
                Suitable only for low-risk accounts. Can be cracked quickly with modern hardware.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Medium (12-15 characters)</h3>
              <p>
                Good for most personal accounts. Provides reasonable protection against casual attacks.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Strong (16+ characters)</h3>
              <p>
                Excellent security for sensitive accounts, financial services, and administrative access.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Q: How long should my password be?</h3>
              <p>
                At minimum 12 characters for personal accounts, 16+ for sensitive accounts. Length provides 
                much better security than complexity alone. A 12-character random password is stronger than 
                an 8-character complex one.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Should I use special characters?</h3>
              <p>
                Yes, including special characters increases password strength. However, some systems have 
                restrictions on special characters. When possible, include them for maximum security.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Is this password generator secure?</h3>
              <p>
                Yes, completely secure. Passwords are generated client-side using cryptographically secure 
                random number generators. No passwords are stored, logged, or transmitted. Your generated 
                passwords never leave your browser.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Can I use this for production systems?</h3>
              <p>
                This tool is great for generating passwords for development, testing, and personal use. For 
                production systems, consider using dedicated password management solutions or server-side 
                generation with proper entropy sources.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Password Cracking Methods</h2>
          <p>Understanding how passwords are attacked helps you create stronger ones:</p>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Brute Force</h3>
              <p>
                Trying every possible combination. Long passwords with many character types make this 
                computationally infeasible.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Dictionary Attacks</h3>
              <p>
                Trying common words and phrases. Avoid dictionary words, even with substitutions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Rainbow Tables</h3>
              <p>
                Pre-computed hash tables. Unique salts prevent rainbow table attacks.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Related Tools</h2>
          <ul className="space-y-2">
            <li><a href="/tools/hash" className="text-blue-600 dark:text-blue-400 hover:underline">Hash Generator</a> - Hash passwords for storage</li>
            <li><a href="/tools/uuid" className="text-blue-600 dark:text-blue-400 hover:underline">UUID Generator</a> - Generate unique identifiers</li>
            <li><a href="/tools/jwt" className="text-blue-600 dark:text-blue-400 hover:underline">JWT Decoder</a> - Work with authentication tokens</li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  )
}
