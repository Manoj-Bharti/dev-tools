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
    </ToolLayout>
  )
}
