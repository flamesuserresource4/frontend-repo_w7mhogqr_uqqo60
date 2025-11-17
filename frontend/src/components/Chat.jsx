import React, { useEffect, useRef, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Chat() {
  const [conversationId, setConversationId] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  async function send() {
    if (!input.trim()) return
    setLoading(true)
    try {
      const res = await fetch(`${API}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation_id: conversationId, message: input })
      })
      const data = await res.json()
      setConversationId(data.conversation_id)
      setMessages(m => [...m, { role: 'user', content: input }, { role: 'assistant', content: data.reply }])
      setInput('')
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="chat" className="mx-auto max-w-3xl px-6 pb-24">
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="font-medium">Conversation</h3>
            <p className="text-xs text-white/50">A quiet space to explore ideas.</p>
          </div>
          <button onClick={() => { setConversationId(null); setMessages([]) }} className="text-sm text-white/70 hover:text-white/90">Reset</button>
        </div>
        <div className="p-4 space-y-4 max-h-[45vh] overflow-y-auto">
          {messages.length === 0 && (
            <p className="text-sm text-white/60">Say hello and describe what you want to create.</p>
          )}
          {messages.map((m, i) => (
            <div key={i} className="flex gap-3">
              <div className={`h-6 w-6 rounded-full ${m.role === 'user' ? 'bg-white/90' : 'bg-fuchsia-400'}`} />
              <p className="text-sm leading-relaxed text-white/90">{m.content}</p>
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Type your idea…"
              className="flex-1 bg-transparent outline-none placeholder:text-white/40 text-white px-3 py-2 rounded-lg border border-white/10 focus:border-white/30"
            />
            <button onClick={send} disabled={loading} className="rounded-lg bg-white text-black px-4 py-2 text-sm font-medium disabled:opacity-50">
              {loading ? 'Thinking…' : 'Send'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
