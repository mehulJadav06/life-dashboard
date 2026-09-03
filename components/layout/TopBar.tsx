'use client'

import { useEffect, useState } from 'react'
import { Settings, RefreshCw, Wifi, WifiOff } from 'lucide-react'
import { useStore } from '@/lib/store'
import { getGreeting } from '@/lib/utils'
import Link from 'next/link'

export function TopBar() {
  const { data, syncing, error, refresh } = useStore()
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(t)
  }, [])

  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <header className="fixed top-0 right-0 left-[240px] h-16 z-30 flex items-center justify-between px-6
                       bg-surface/80 backdrop-blur-md border-b border-surface-border
                       transition-all duration-300">
      {/* Greeting */}
      <div>
        <p className="text-white font-semibold text-sm leading-none">
          {getGreeting()}, {data.settings.name} 👋
        </p>
        <p className="text-gray-500 text-xs mt-1">{dateStr}</p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Time */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-surface-card border border-surface-border rounded-lg">
          <span className="text-white text-sm font-mono font-medium">{timeStr}</span>
        </div>

        {/* Sync status */}
        {syncing ? (
          <div className="flex items-center gap-1.5 text-brand-400 text-xs">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span className="hidden sm:inline">Syncing…</span>
          </div>
        ) : error ? (
          <div className="flex items-center gap-1.5 text-red-400 text-xs" title={error}>
            <WifiOff className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sync error</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs">
            <Wifi className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Synced</span>
          </div>
        )}

        {/* Refresh */}
        <button
          onClick={refresh}
          className="btn-ghost p-2 rounded-lg"
          title="Refresh data"
          id="topbar-refresh"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        {/* Settings (placeholder) */}
        <Link href="/settings" className="btn-ghost p-2 rounded-lg" id="topbar-settings">
          <Settings className="w-4 h-4" />
        </Link>
      </div>
    </header>
  )
}
