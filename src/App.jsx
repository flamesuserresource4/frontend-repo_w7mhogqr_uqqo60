import React, { useState, useRef, useEffect } from 'react'
import ModernButton from './components/ModernButton'

function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I\'m your creative copilot. Tell me what you\'re making today.' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef(null)

  useEffect(() => {
    // Auto-scroll to bottom when messages change
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg = { role: 'user', content: input.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    // Mock assistant reply for now; can be wired to backend later
    await new Promise(r => setTimeout(r, 700))
    const assistantMsg = {
      role: 'assistant',
      content:
        "Here\'s a refined take: keep it minimal, let the typography breathe, and use one accent color. Want me to draft copy, layout, or color tokens?"
    }
    setMessages(prev => [...prev, assistantMsg])
    setLoading(false)
  }

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Glow backdrop */}
      <div className="pointer-events-none fixed inset-0 [background:radial-gradient(600px_300px_at_50%_-10%,rgba(59,130,246,0.15),transparent_60%),radial-gradient(500px_300px_at_110%_30%,rgba(99,102,241,0.12),transparent_60%)]" />

      <div className="relative mx-auto max-w-4xl px-6 py-12">
        {/* Top section */}
        <header className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 shadow-lg shadow-blue-900/30" />
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-white">Creative Chat</h1>
              <p className="text-xs text-blue-200/70">Minimal. Elegant. Purposeful.</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <ModernButton onClick={() => window.location.reload()} className="px-4 py-2">
              Reset
            </ModernButton>
          </div>
        </header>

        {/* Chat card */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl shadow-[0_10px_40px_rgba(2,6,23,0.6)]">
          {/* Messages */}
          <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-6 space-y-4">
            {messages.map((m, idx) => (
              <div key={idx} className={[
                'flex w-full',
                m.role === 'user' ? 'justify-end' : 'justify-start'
              ].join(' ')}>
                <div className={[
                  'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                  'border',
                  m.role === 'user'
                    ? 'bg-blue-500/15 border-blue-400/30 text-blue-100'
                    : 'bg-slate-800/60 border-slate-700 text-slate-100'
                ].join(' ')}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-800/60 px-4 py-3 text-sm text-slate-200">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
                  </span>
                  Thinking5
                </div>
              </div>
            )}
          </div>

          {/* Composer */}
          <div className="border-t border-slate-800/80 p-4">
            <div className="flex items-end gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Write a prompt… (Ctrl/⌘ + Enter to send)"
                rows={1}
                className="min-h-[44px] w-full resize-none rounded-xl border border-slate-800/80 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none ring-0 focus:border-blue-500/50 focus:bg-slate-900/60"
              />
              <ModernButton onClick={sendMessage} loading={loading} className="whitespace-nowrap">
                Send
              </ModernButton>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between text-xs text-blue-200/60">
          <p>Design-first chat interface for creatives</p>
          <p>Prototype mode • Local generation</p>
        </div>
      </div>
    </div>
  )
}

export default App
