import React, { useState, useRef, useEffect } from 'react'
import ModernButton from './components/ModernButton'

function SparklesIcon({ className = 'h-4 w-4' }) {
  // Simple sparkles icon
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3l1.6 3.4L17 8l-3.4 1.6L12 13l-1.6-3.4L7 8l3.4-1.6L12 3z" fill="currentColor"/>
      <path d="M6 14l.8 1.6L8.5 17l-1.7.8L6 19.5l-.8-1.7L3.5 17l1.7-.8L6 14z" fill="currentColor" opacity="0.7"/>
      <circle cx="18.5" cy="6" r="1.1" fill="currentColor" opacity="0.9"/>
    </svg>
  )
}

function RotateIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 12a8 8 0 1113.856 5.032" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 12V7m0 5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function SearchIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function CheckIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm your creative copilot. Tell me what you're making today.", ts: Date.now() }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const listRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    setError(false)
    const userMsg = { role: 'user', content: input.trim(), ts: Date.now() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      // Simulate network + success
      await new Promise(r => setTimeout(r, 700))
      const assistantMsg = {
        role: 'assistant',
        content: "Here's a refined take: keep it minimal, let the typography breathe, and use one accent color. Want me to draft copy, layout, or color tokens?",
        ts: Date.now()
      }
      setMessages(prev => [...prev, assistantMsg])
      setSuccess(true)
      setTimeout(() => setSuccess(false), 1000)
    } catch (e) {
      setError(true)
      setTimeout(() => setError(false), 500)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault()
      sendMessage()
    }
  }

  const isDisabled = loading || input.trim().length === 0

  return (
    <div className="min-h-screen relative text-white">
      {/* Grid + gradient identity */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-purple-600 opacity-[0.12]" />
        <div className="pointer-events-none absolute inset-0 [background:radial-gradient(700px_300px_at_50%_-10%,rgba(168,85,247,0.25),transparent_60%),radial-gradient(600px_320px_at_110%_30%,rgba(236,72,153,0.18),transparent_60%)]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 py-10">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl border border-white/10 backdrop-blur-xl bg-white/5 shadow-[0_10px_30px_rgba(168,85,247,0.25)]" />
            <div>
              <h1 className="text-xl font-semibold tracking-tight">C-BRAIN Creative Chat</h1>
              <p className="text-xs text-white/70">Premium. Minimal. Intentional.</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <ModernButton variant="ghost" size="sm" leftIcon={<SearchIcon />}>
              Quick Search Tools
            </ModernButton>
            <ModernButton
              variant="ghost"
              size="md"
              className="group"
              leftIcon={<RotateIcon className="h-4 w-4" />}
              onClick={() => window.location.reload()}
            >
              <span className="group-hover:text-rose-300">Reset</span>
            </ModernButton>
          </div>
        </header>

        {/* Chat card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
          {/* Messages */}
          <div ref={listRef} className="max-h-[60vh] overflow-y-auto p-6 space-y-4">
            {messages.map((m, idx) => (
              <div key={idx} className={[ 'flex w-full', m.role === 'user' ? 'justify-end' : 'justify-start' ].join(' ')}>
                <div className={[
                  'group relative max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                  'border border-white/10 backdrop-blur-xl shadow-sm',
                  m.role === 'user'
                    ? 'bg-gradient-to-br from-purple-600/70 via-pink-500/70 to-purple-600/70 text-white shadow-[0_6px_24px_rgba(236,72,153,0.18)]'
                    : 'bg-white/5 text-white/90'
                ].join(' ')}>
                  <div className="animate-[fadeIn_150ms_ease-out]">{m.content}</div>
                  <div className="absolute -bottom-5 text-[10px] text-white/40 opacity-0 group-hover:opacity-100 transition-opacity">{new Date(m.ts).toLocaleTimeString()}</div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 backdrop-blur-xl">
                  <span className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-pink-400 animate-bounce" />
                    <span className="h-2 w-2 rounded-full bg-purple-400 animate-bounce [animation-delay:120ms]" />
                    <span className="h-2 w-2 rounded-full bg-pink-400 animate-bounce [animation-delay:240ms]" />
                  </span>
                  Typing...
                </div>
              </div>
            )}
          </div>

          {/* Composer */}
          <div className="border-t border-white/10 p-4">
            <div className="group/composer flex items-end gap-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Write a prompt… (Ctrl/⌘ + Enter to send)"
                rows={1}
                className="min-h-[44px] w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/50 outline-none ring-0 focus:border-pink-400/50 focus:shadow-[0_0_0_4px_rgba(236,72,153,0.08)]"
              />

              <div className="flex items-center gap-2 opacity-100 md:opacity-0 md:group-hover/composer:opacity-100 transition-opacity">
                <ModernButton variant="ghost" size="sm" leftIcon={<RotateIcon />} className="hidden md:inline-flex">
                  Suggest Workflow
                </ModernButton>
                <ModernButton
                  onClick={sendMessage}
                  loading={loading}
                  disabled={isDisabled}
                  size="md"
                  leftIcon={success ? <CheckIcon className="h-4 w-4 text-emerald-400" /> : <SparklesIcon className="h-4 w-4" />}
                  showSuccess={success}
                  showError={error}
                  className="whitespace-nowrap"
                >
                  {success ? 'Sent' : 'Send'}
                </ModernButton>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between text-xs text-white/70">
          <p>Powered by C-BRAIN Intelligence • Claude Sonnet 4.5</p>
          <p>Future of creative tools — Prototype mode</p>
        </div>
      </div>

      {/* Local keyframes for message fade-in */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(2px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  )
}

export default App
