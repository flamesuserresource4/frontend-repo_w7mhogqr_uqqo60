import React from 'react'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Presets from './components/Presets'
import Chat from './components/Chat'

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <Hero />
      <Presets />
      <Chat />
      <footer className="mx-auto max-w-6xl px-6 py-12 text-sm text-white/40">
        Built with care for creative minds. © {new Date().getFullYear()}
      </footer>
    </div>
  )
}
