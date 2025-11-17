import React from 'react'

// C-BRAIN Modern Button (Dark Mode Refined)
// Props:
// - variant: 'solid' | 'ghost'
// - size: 'sm' | 'md' | 'lg'
// - loading: boolean
// - disabled: boolean
// - showSuccess: boolean (brief green glow + checkmark)
// - showError: boolean (red glow + shake)
// - leftIcon: ReactNode (e.g., sparkles icon)
// - children: label text
function ModernButton({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = 'solid',
  size = 'md',
  showSuccess = false,
  showError = false,
  leftIcon = null,
  className = '',
}) {
  const sizeClasses = {
    sm: 'h-8 text-xs px-3 rounded-lg',       // 32px
    md: 'h-10 text-sm px-4 rounded-xl',      // 40px
    lg: 'h-12 text-base px-5 rounded-2xl',   // 48px
  }[size]

  const base = [
    'relative inline-flex items-center justify-center gap-2 select-none',
    'font-medium transition-all duration-200 ease-out',
    'disabled:opacity-40 disabled:cursor-not-allowed',
    'tracking-wide',
    sizeClasses,
  ]

  // Primary button with purple-pink gradient accent, stronger shadows for dark
  const solid = [
    'text-white border border-white/10 backdrop-blur-xl',
    'bg-gradient-to-br from-purple-600 via-pink-500 to-purple-600',
    'shadow-xl shadow-purple-500/20',
    // Glass veil so gradient feels embedded
    'before:absolute before:inset-0 before:rounded-[inherit] before:bg-white/5 before:opacity-10 before:pointer-events-none',
    // Aura glows on hover
    'hover:shadow-2xl hover:shadow-purple-500/30',
  ]

  // Ghost button tuned for dark surfaces
  const ghost = [
    'text-white/90 border border-white/10 bg-transparent backdrop-blur-xl',
    'hover:bg-white/5 hover:text-white',
    'shadow-xl',
    'hover:border-white/20',
  ]

  const stateGlow = showSuccess
    ? 'ring-2 ring-emerald-400/60 shadow-[0_0_24px_rgba(16,185,129,0.25)]'
    : showError
    ? 'ring-2 ring-rose-500/70 shadow-[0_0_28px_rgba(244,63,94,0.28)] animate-cb-shake'
    : ''

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={[
        ...base,
        ...(variant === 'ghost' ? ghost : solid),
        stateGlow,
        className,
      ].join(' ')}
    >
      {/* Status icons overlay */}
      <span className="relative z-10 inline-flex items-center gap-2">
        {/* Loading spinner */}
        {loading && (
          <svg className="h-4 w-4 animate-spin text-pink-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" className="opacity-90" />
          </svg>
        )}

        {/* Success checkmark */}
        {!loading && showSuccess && (
          <svg className="h-4 w-4 text-emerald-400 transition-opacity" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}

        {/* Error icon */}
        {!loading && !showSuccess && showError && (
          <svg className="h-4 w-4 text-rose-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 9v4m0 4h.01M10.29 3.86l-7.5 13A2 2 0 004.5 20h15a2 2 0 001.71-3.14l-7.5-13a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}

        {/* Left icon (e.g., sparkles) when not showing success/error */}
        {!loading && !showSuccess && !showError && leftIcon}

        {children}
      </span>

      {/* Inline keyframes for shake animation to avoid global CSS edits */}
      <style>{`
        @keyframes cb-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-2px); }
          40% { transform: translateX(2px); }
          60% { transform: translateX(-2px); }
          80% { transform: translateX(2px); }
        }
        .animate-cb-shake { animation: cb-shake 220ms ease-in-out; }
      `}</style>
    </button>
  )
}

export default ModernButton
