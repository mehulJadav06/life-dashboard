'use client'

import { LucideIcon, Rocket } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ComingSoonProps {
  title: string
  description: string
  icon: LucideIcon
  accent?: 'blue' | 'green' | 'red' | 'yellow' | 'purple'
  features?: string[]
}

const accentMap = {
  blue:   { border: 'border-brand-500/30',  bg: 'bg-brand-600/10',   icon: 'text-brand-400',   dot: 'bg-brand-400'   },
  green:  { border: 'border-emerald-500/30', bg: 'bg-emerald-600/10', icon: 'text-emerald-400', dot: 'bg-emerald-400' },
  red:    { border: 'border-red-500/30',     bg: 'bg-red-600/10',     icon: 'text-red-400',     dot: 'bg-red-400'     },
  yellow: { border: 'border-yellow-500/30',  bg: 'bg-yellow-600/10',  icon: 'text-yellow-400',  dot: 'bg-yellow-400'  },
  purple: { border: 'border-purple-500/30',  bg: 'bg-purple-600/10',  icon: 'text-purple-400',  dot: 'bg-purple-400'  },
}

export function ComingSoon({
  title, description, icon: Icon, accent = 'blue', features = [],
}: ComingSoonProps) {
  const a = accentMap[accent]

  return (
    <div className="animate-in flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      {/* Icon */}
      <div className={cn(
        'w-20 h-20 rounded-2xl flex items-center justify-center mb-6 border',
        a.bg, a.border
      )}>
        <Icon className={cn('w-9 h-9', a.icon)} />
      </div>

      {/* Text */}
      <h1 className="text-3xl font-bold text-white mb-3">{title}</h1>
      <p className="text-gray-400 text-base max-w-md mb-8 leading-relaxed">{description}</p>

      {/* Features list */}
      {features.length > 0 && (
        <div className="bg-surface-card border border-surface-border rounded-2xl p-6 max-w-md w-full text-left mb-8">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Planned features</p>
          <ul className="space-y-2.5">
            {features.map(f => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', a.dot)} />
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Badge */}
      <div className="flex items-center gap-2 px-4 py-2 bg-surface-card border border-surface-border rounded-full">
        <Rocket className="w-3.5 h-3.5 text-gray-500" />
        <span className="text-xs text-gray-500">Coming soon — check back later</span>
      </div>
    </div>
  )
}
