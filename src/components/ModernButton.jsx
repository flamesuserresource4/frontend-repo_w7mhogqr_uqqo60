import React from 'react'

function ModernButton({ children, onClick, disabled = false, loading = false, className = '' }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={[
        'relative inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3',
        'font-medium text-sm transition-all duration-300 ease-out',
        'bg-slate-900/60 text-blue-100',
        'border border-slate-700/70',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_8px_30px_rgba(2,6,23,0.3)]',
        'hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_40px_rgba(2,6,23,0.4)]',
        'hover:border-blue-500/50 hover:text-white',
        'before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-blue-500/20 before:to-indigo-500/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity',
        'after:absolute after:-inset-px after:rounded-[14px] after:bg-[radial-gradient(120px_80px_at_0%_0%,rgba(59,130,246,0.15)_0,transparent_60%),radial-gradient(120px_80px_at_100%_100%,rgba(99,102,241,0.15)_0,transparent_60%)] after:opacity-0 hover:after:opacity-100 after:transition-opacity',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        className,
      ].join(' ')}
    >
      <span className="relative z-10 inline-flex items-center gap-2">
        {loading && (
          <svg className="h-4 w-4 animate-spin text-blue-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-90" />
          </svg>
        )}
        {children}
      </span>
    </button>
  )
}

export default ModernButton
