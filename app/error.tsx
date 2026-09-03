'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Uncaught application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4 text-center">
      <div className="bg-surface-card border border-surface-border p-6 rounded-2xl max-w-md w-full shadow-glow">
        <h2 className="text-xl font-bold text-white mb-2">Something went wrong!</h2>
        <p className="text-sm text-red-400 mb-6 bg-red-500/10 p-3 rounded-lg text-left overflow-auto">
          {error.message || 'Unknown error'}
        </p>
        <button
          className="btn-primary w-full py-2"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </div>
  )
}
