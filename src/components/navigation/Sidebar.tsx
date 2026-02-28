"use client"
import React from 'react'
import Link from 'next/link'
import { TOOLS } from '../../lib/constants'

export function Sidebar() {
  return (
    <aside className="hidden md:block w-64 bg-[#0a0e1a] border-r border-gray-800">
      <nav className="p-4 space-y-6">
        <div className="text-sm text-gray-400 uppercase tracking-wider">Tools</div>
        <div className="space-y-1">
          {TOOLS.map((t) => (
            <Link key={t.id} href={t.path} className="group flex items-center gap-3 rounded-md px-3 py-2 text-gray-300 hover:bg-gray-900 hover:text-white">
              <span className="h-4 w-4 text-gray-400 group-hover:text-white">•</span>
              <span className="flex-1">{t.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  )
}
