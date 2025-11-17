import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[72vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/xzUirwcZB9SOxUWt/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="pointer-events-none gradient-ring absolute inset-0 opacity-60" />
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight leading-tight">
              Minimal tools for maximum imagination
            </h1>
            <p className="mt-4 text-zinc-300 text-lg">
              A calm space to think with an LLM—designed for photographers, filmmakers, and visual creatives.
            </p>
            <div className="mt-8 flex gap-3">
              <a href="#chat" className="inline-flex items-center rounded-full bg-white text-black px-5 py-2.5 text-sm font-medium hover:bg-zinc-100 transition">
                Start a conversation
              </a>
              <a href="#presets" className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white/90 hover:border-white/40 transition">
                Explore presets
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
