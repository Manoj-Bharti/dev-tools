"use client"
import React, { useState } from 'react'
import { RotateCcw, AlertCircle } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Textarea } from '../../../components/ui/Textarea'
import { CopyButton } from '../../../components/shared/CopyButton'
import { ToolLayout } from '../../../components/shared/ToolLayout'
import { decodeJwt, verifyJwtHS } from '../../../lib/utils/jwt'
import { CodeEditor } from '../../../components/shared/CodeEditor'

export default function JWTTool() {
  const [token, setToken] = useState('')
  const [secret, setSecret] = useState('')
  const [header, setHeader] = useState('')
  const [payload, setPayload] = useState('')
  const [validity, setValidity] = useState('')
  const [error, setError] = useState('')

  async function handleProcess() {
    try {
      setError('')
      const dec = decodeJwt(token)
      setHeader(JSON.stringify(dec.header, null, 2))
      setPayload(JSON.stringify(dec.payload, null, 2))
      if (secret) {
        const v = await verifyJwtHS(token, secret)
        setValidity(v ? 'Signature valid (HS family)' : 'Signature INVALID')
      } else {
        setValidity('')
      }
    } catch (e) {
      setError((e as Error).message)
      setHeader('')
      setPayload('')
      setValidity('')
    }
  }

  function handleClear() {
    setToken('')
    setSecret('')
    setHeader('')
    setPayload('')
    setValidity('')
    setError('')
  }

  return (
    <ToolLayout 
      title="JWT Decoder & Validator" 
      description="Decode header and payload; optionally verify HS signatures using a secret key."
    >
      <div className="space-y-6">
        {/* TOKEN INPUT SECTION */}
        <div className="tool-section">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">JWT Token</h3>
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
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste JWT token here..."
            className="tool-input font-mono text-xs"
            rows={3}
          />
        </div>

        {/* SECRET INPUT SECTION */}
        <div className="tool-section">
          <label className="text-sm font-medium text-white">HMAC Secret (optional)</label>
          <input 
            type="password"
            value={secret} 
            onChange={(e) => setSecret(e.target.value)} 
            placeholder="Enter secret for signature verification..." 
            className="w-full mt-2 px-3 py-2 rounded-md border border-gray-800 bg-gray-900 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        {/* ACTION BUTTON */}
        <Button onClick={handleProcess} size="lg" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
          Decode & Verify
        </Button>

        {/* ERROR DISPLAY */}
        {error && (
          <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-400 flex items-start gap-2">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* VALIDITY FEEDBACK */}
        {validity && (
          <div className={`rounded-lg border p-4 text-sm flex items-start gap-2 ${
            validity.includes('INVALID') 
              ? 'border-red-500/50 bg-red-500/10 text-red-400' 
              : 'border-green-500/50 bg-green-500/10 text-green-400'
          }`}>
            <span>{validity}</span>
          </div>
        )}

        {/* HEADER OUTPUT */}
        {header && (
          <div className="tool-section">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Header</h3>
              <CopyButton text={header} />
            </div>
            <CodeEditor value={header} />
          </div>
        )}

        {/* PAYLOAD OUTPUT */}
        {payload && (
          <div className="tool-section">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Payload</h3>
              <CopyButton text={payload} />
            </div>
            <CodeEditor value={payload} />
          </div>
        )}

        {/* INFO SECTION */}
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="mb-2 font-semibold text-white">About This Tool</h3>
          <p className="text-sm text-gray-400">
            JWT (JSON Web Token) is a standard for secure token transmission. This tool decodes the header and payload from any JWT. To verify signatures, provide the HMAC secret used to sign the token.
          </p>
        </div>
      </div>

      {/* SEO Content Section */}
      <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto mt-16">
        <section className="mb-12">
          <h2>What is JWT (JSON Web Token)?</h2>
          <p>
            JWT (JSON Web Token) is an open standard (RFC 7519) for securely transmitting information between parties 
            as a JSON object. JWTs are commonly used for authentication and information exchange in modern web 
            applications, APIs, and microservices architectures.
          </p>
          <p>
            A JWT consists of three parts separated by dots (.): <code>header.payload.signature</code>
          </p>
          <ul>
            <li><strong>Header:</strong> Contains the token type (JWT) and signing algorithm (e.g., HS256, RS256)</li>
            <li><strong>Payload:</strong> Contains the claims (user data, permissions, expiration time, etc.)</li>
            <li><strong>Signature:</strong> Verifies the token hasn't been tampered with</li>
          </ul>
          <p>
            JWTs are Base64URL encoded, making them URL-safe and easy to transmit in HTTP headers, cookies, or 
            query parameters.
          </p>
        </section>

        <section className="mb-12">
          <h2>How to Use This JWT Decoder</h2>
          <ol className="space-y-2">
            <li>Copy your JWT token from your application, API response, or browser storage</li>
            <li>Paste the token into the input field</li>
            <li>The tool instantly decodes and displays the header and payload in formatted JSON</li>
            <li>View token expiration time and check if it's still valid</li>
            <li>Optionally provide a secret key to verify the signature (HS256 tokens only)</li>
          </ol>
          <p className="mt-4">
            <strong>Note:</strong> This decoder only validates structure and signature. It doesn't verify claims 
            like issuer, audience, or custom validation rules - that's your application's job.
          </p>
        </section>

        <section className="mb-12">
          <h2>Common Use Cases</h2>
          <ul className="space-y-3">
            <li>
              <strong>Debugging Authentication Issues:</strong> Quickly inspect JWT tokens to see what claims and 
              permissions are included, helping debug authorization problems.
            </li>
            <li>
              <strong>Checking Token Expiration:</strong> View the 'exp' (expiration) claim to see when a token 
              will expire and if it's still valid.
            </li>
            <li>
              <strong>API Development:</strong> Verify that your API is generating tokens with the correct claims, 
              structure, and signing algorithm.
            </li>
            <li>
              <strong>Security Audits:</strong> Review JWTs from third-party services to ensure they don't contain 
              sensitive information that shouldn't be in a client-visible token.
            </li>
            <li>
              <strong>Learning & Education:</strong> Understand how JWTs work by examining real tokens from 
              applications you use.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Understanding JWT Claims</h2>
          <p>Common standard claims you'll see in JWT payloads:</p>
          <ul className="space-y-2">
            <li><code>iss</code> (Issuer): Who created the token</li>
            <li><code>sub</code> (Subject): Who the token is about (usually user ID)</li>
            <li><code>aud</code> (Audience): Who the token is intended for</li>
            <li><code>exp</code> (Expiration): When the token expires (Unix timestamp)</li>
            <li><code>iat</code> (Issued At): When the token was created</li>
            <li><code>nbf</code> (Not Before): Token isn't valid before this time</li>
            <li><code>jti</code> (JWT ID): Unique identifier for this token</li>
          </ul>
          <p className="mt-4">
            Plus any custom claims your application adds, like user roles, permissions, email, etc.
          </p>
        </section>

        <section className="mb-12">
          <h2>Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Is JWT decoding secure? Can you see my tokens?</h3>
              <p>
                All decoding happens in your browser using JavaScript. Your JWT tokens NEVER leave your device - 
                nothing is sent to our servers. You can verify this in your browser's network tab or use this tool 
                offline. Your tokens are completely private.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Can I decode a JWT without the secret key?</h3>
              <p>
                Yes! JWTs are Base64URL encoded, not encrypted. You can always decode the header and payload to 
                view the data inside. However, you need the secret key (for HS256) or public key (for RS256) to 
                verify the signature and ensure the token hasn't been tampered with.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Why does my JWT show as expired but still works?</h3>
              <p>
                Some applications don't enforce expiration strictly, or they use a grace period. However, relying 
                on expired tokens is a security risk. The 'exp' claim is there for a reason - expired tokens 
                should be refreshed.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: What's the difference between HS256 and RS256?</h3>
              <p>
                HS256 (HMAC with SHA-256) uses a shared secret key for both signing and verification. RS256 
                (RSA with SHA-256) uses a private key to sign and a public key to verify. RS256 is more secure 
                for public APIs because you can distribute the public key without compromising security.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Q: Can I modify a JWT and re-sign it?</h3>
              <p>
                This tool is for decoding only. To modify and re-sign JWTs, you'd need the secret key and 
                server-side tools. Never try to forge JWTs - the signature will be invalid and servers will 
                reject them.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2>Security Best Practices</h2>
          <ul className="space-y-2">
            <li><strong>Always use HTTPS:</strong> JWTs should only be transmitted over secure connections</li>
            <li><strong>Keep tokens short-lived:</strong> Use expiration times (exp claim) and refresh tokens</li>
            <li><strong>Don't store sensitive data:</strong> JWTs are not encrypted - anyone can decode them</li>
            <li><strong>Use strong secrets:</strong> For HS256, use cryptographically random keys of sufficient length</li>
            <li><strong>Validate all claims:</strong> Always verify iss, aud, exp, and other claims server-side</li>
            <li><strong>Use httpOnly cookies:</strong> Store JWTs in httpOnly cookies to prevent XSS attacks</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2>Related Tools</h2>
          <ul className="space-y-2">
            <li><a href="/tools/base64" className="text-blue-600 dark:text-blue-400 hover:underline">Base64 Encoder/Decoder</a> - Decode the Base64URL encoding used in JWTs</li>
            <li><a href="/tools/json" className="text-blue-600 dark:text-blue-400 hover:underline">JSON Formatter</a> - Format and validate JWT payload JSON</li>
            <li><a href="/tools/timestamp" className="text-blue-600 dark:text-blue-400 hover:underline">Timestamp Converter</a> - Convert JWT exp/iat timestamps to readable dates</li>
          </ul>
        </section>
      </article>
    </ToolLayout>
  )
}
