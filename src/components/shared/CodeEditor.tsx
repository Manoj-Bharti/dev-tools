"use client"
import React, { useEffect, useRef } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-json'

export function CodeEditor({ value }: { value: string }) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = value
      Prism.highlightElement(ref.current)
    }
  }, [value])

  return <pre className="rounded bg-slate-900 p-3 overflow-auto"><code ref={ref} className="language-json" /></pre>
}
