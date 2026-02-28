"use client"
import React from 'react'

interface Props {
  onFile: (file: File) => void
}

export function FileUpload({ onFile }: Props) {
  function handle(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (f) onFile(f)
  }

  return (
    <div>
      <label className="inline-flex items-center gap-2 rounded-md border border-gray-800 bg-gray-900/50 px-3 py-2 text-sm text-gray-100 hover:bg-gray-900 cursor-pointer">
        <input type="file" onChange={handle} className="hidden" />
        <span>Upload file</span>
      </label>
    </div>
  )
}
