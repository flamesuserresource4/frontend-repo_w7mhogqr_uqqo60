import React from 'react'

export default function Nav() {
  return (
    <header className="sticky top-0 z-20">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <a href="#" className="text-lg font-medium tracking-tight">Lens</a>
        <nav className="flex items-center gap-6 text-sm text-white/70">
          <a href="#presets" className="hover:text-white">Presets</a>
          <a href="#chat" className="hover:text-white">Chat</a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
        </nav>
      </div>
    </header>
  )
}
