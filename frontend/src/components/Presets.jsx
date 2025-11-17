import React, { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Presets() {
  const [presets, setPresets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API}/presets`).then(r => r.json()).then(setPresets).finally(() => setLoading(false))
  }, [])

  return (
    <section id="presets" className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl sm:text-3xl font-semibold">Creative presets</h2>
        <span className="text-sm text-white/50">{loading ? 'Loading…' : `${presets.length} presets`}</span>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {presets.map((p, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{p.name}</h3>
              <span className="text-xs text-white/60">temp {Math.round(p.temperature*100)}%</span>
            </div>
            <p className="mt-2 text-sm text-white/70 min-h-[40px]">{p.system_prompt}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
