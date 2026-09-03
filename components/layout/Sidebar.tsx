'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  CheckSquare,
  TrendingUp,
  DollarSign,
  Bookmark,
  BarChart2,
  FileText,
  Calculator,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/dashboard',    label: 'Dashboard',    icon: LayoutDashboard },
  { href: '/todos',        label: 'To-Do List',   icon: CheckSquare },
  { href: '/transactions', label: 'Money',         icon: DollarSign },
  { href: '/calculator',  label: 'Compound Calc', icon: Calculator },
  { href: '/sheets',      label: 'Wealth Chart',  icon: BarChart2 },
  { href: '/links',       label: 'Saved Links',   icon: Bookmark },
  { href: '/notes',       label: 'Notes',         icon: FileText },
]

export function Sidebar() {
  const pathname  = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-screen z-40 flex flex-col',
        'bg-surface-card border-r border-surface-border',
        'transition-all duration-300 ease-in-out',
        collapsed ? 'w-[68px]' : 'w-[240px]'
      )}
    >
      {/* Logo */}
      <div className={cn(
        'flex items-center gap-3 px-4 py-5 border-b border-surface-border',
        collapsed && 'justify-center px-2'
      )}>
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-600/20 border border-brand-600/30 shrink-0">
          <Zap className="w-5 h-5 text-brand-400" />
        </div>
        {!collapsed && (
          <div>
            <p className="text-sm font-bold text-white leading-none">LifeOS</p>
            <p className="text-xs text-gray-500 mt-0.5">Personal Dashboard</p>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        {!collapsed && (
          <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest px-3 mb-2">
            Menu
          </p>
        )}
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={cn('nav-item', active && 'active', collapsed && 'justify-center px-2')}
              title={collapsed ? label : undefined}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer — collapse toggle */}
      <div className="p-2 border-t border-surface-border">
        <button
          onClick={() => setCollapsed(c => !c)}
          className={cn('nav-item w-full', collapsed && 'justify-center px-2')}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed
            ? <ChevronRight className="w-4 h-4" />
            : <><ChevronLeft className="w-4 h-4" /><span className="text-xs">Collapse</span></>
          }
        </button>
      </div>
    </aside>
  )
}
