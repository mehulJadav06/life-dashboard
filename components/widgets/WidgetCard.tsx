'use client'

import { ReactNode } from 'react'
import { LucideIcon, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface WidgetCardProps {
  title: string
  children: ReactNode
  icon?: LucideIcon
  href?: string
  className?: string
  accent?: 'blue' | 'green' | 'red' | 'yellow' | 'purple'
  badge?: string
}

const accentClasses = {
  blue:   'bg-brand-600/10 border-brand-600/20 text-brand-400',
  green:  'bg-emerald-600/10 border-emerald-600/20 text-emerald-400',
  red:    'bg-red-600/10 border-red-600/20 text-red-400',
  yellow: 'bg-yellow-600/10 border-yellow-600/20 text-yellow-400',
  purple: 'bg-purple-600/10 border-purple-600/20 text-purple-400',
}

const iconBg = {
  blue:   'bg-brand-600/20 border-brand-600/30 text-brand-400',
  green:  'bg-emerald-600/20 border-emerald-600/30 text-emerald-400',
  red:    'bg-red-600/20 border-red-600/30 text-red-400',
  yellow: 'bg-yellow-600/20 border-yellow-600/30 text-yellow-400',
  purple: 'bg-purple-600/20 border-purple-600/30 text-purple-400',
}

export function WidgetCard({
  title,
  children,
  icon: Icon,
  href,
  className,
  accent = 'blue',
  badge,
}: WidgetCardProps) {
  return (
    <div className={cn('card group relative overflow-hidden', className)}>
      {/* Subtle gradient accent bar */}
      <div className={cn(
        'absolute top-0 left-0 right-0 h-0.5',
        accent === 'blue'   && 'bg-gradient-to-r from-brand-500 to-brand-400',
        accent === 'green'  && 'bg-gradient-to-r from-emerald-500 to-emerald-400',
        accent === 'red'    && 'bg-gradient-to-r from-red-500 to-red-400',
        accent === 'yellow' && 'bg-gradient-to-r from-yellow-500 to-yellow-400',
        accent === 'purple' && 'bg-gradient-to-r from-purple-500 to-purple-400',
      )} />

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <div className={cn(
              'w-8 h-8 rounded-lg flex items-center justify-center border shrink-0',
              iconBg[accent]
            )}>
              <Icon className="w-4 h-4" />
            </div>
          )}
          <div>
            <h3 className="text-sm font-semibold text-gray-300">{title}</h3>
            {badge && (
              <span className={cn('badge text-[10px] mt-0.5', accentClasses[accent])}>
                {badge}
              </span>
            )}
          </div>
        </div>

        {href && (
          <Link
            href={href}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-surface-hover"
            title={`Go to ${title}`}
          >
            <ArrowUpRight className="w-4 h-4 text-gray-400" />
          </Link>
        )}
      </div>

      {/* Content */}
      <div>{children}</div>
    </div>
  )
}
