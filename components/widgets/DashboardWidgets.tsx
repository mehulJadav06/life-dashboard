'use client'

import { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { WidgetCard } from '@/components/widgets/WidgetCard'
import {
  CheckSquare, DollarSign, Bookmark,
  TrendingUp, AlertCircle, Clock, Target, Wallet,
} from 'lucide-react'
import { formatCurrency, daysUntil } from '@/lib/utils'
import { Priority } from '@/lib/types'

const priorityOrder: Record<Priority, number> = {
  urgent: 0, high: 1, medium: 2, low: 3,
}
const priorityColor: Record<Priority, string> = {
  urgent: 'text-red-400',
  high:   'text-yellow-400',
  medium: 'text-blue-400',
  low:    'text-gray-400',
}

// ── Live Clock ─────────────────────────────────────────────────────────────
function LiveClock() {
  const [now, setNow] = useState(new Date())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const time = mounted ? now.toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  }) : '--:--:-- --'
  const date = mounted ? now.toLocaleDateString('en-IN', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  }) : ''

  return (
    <div className="text-center py-2">
      <p className="text-3xl font-mono font-bold text-white tracking-widest">{time}</p>
      <p className="text-sm text-gray-400 mt-2">{date}</p>
    </div>
  )
}

// ── Dashboard Widgets ───────────────────────────────────────────────────────
export function DashboardWidgets() {
  const { data } = useStore()
  const { todos, transactions, links, settings } = data

  // Computed stats
  const pending  = todos.filter(t => !t.completed)
  const overdue  = pending.filter(t => t.dueDate && daysUntil(t.dueDate) < 0)
  const topTodos = [...pending]
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
    .slice(0, 5)

  const now          = new Date()
  const thisMonthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const income  = transactions
    .filter(t => t.type === 'income'  && t.date.startsWith(thisMonthStr))
    .reduce((s, t) => s + t.amount, 0)
  const expense = transactions
    .filter(t => t.type === 'expense' && t.date.startsWith(thisMonthStr))
    .reduce((s, t) => s + t.amount, 0)
  const net = income - expense

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

      {/* To-Do Summary */}
      <WidgetCard
        title="To-Do Summary"
        icon={CheckSquare}
        href="/todos"
        accent="blue"
        badge={`${pending.length} pending`}
      >
        {pending.length === 0 ? (
          <p className="text-sm text-gray-500 py-2">No pending tasks 🎉</p>
        ) : (
          <ul className="space-y-2.5">
            {topTodos.map(todo => (
              <li key={todo.id} className="flex items-center gap-2.5">
                <span className={`text-[10px] font-bold uppercase shrink-0 ${priorityColor[todo.priority]}`}>
                  {todo.priority.slice(0, 3)}
                </span>
                <span className="text-sm text-gray-300 truncate flex-1">{todo.title}</span>
                {todo.dueDate && (
                  <span className={`text-[10px] shrink-0 ${
                    daysUntil(todo.dueDate) < 0 ? 'text-red-400' : 'text-gray-500'
                  }`}>
                    {daysUntil(todo.dueDate) < 0
                      ? `${Math.abs(daysUntil(todo.dueDate))}d late`
                      : `${daysUntil(todo.dueDate)}d left`}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
        {overdue.length > 0 && (
          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-surface-border text-red-400 text-xs">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {overdue.length} task{overdue.length > 1 ? 's' : ''} overdue
          </div>
        )}
      </WidgetCard>

      {/* Money This Month */}
      <WidgetCard
        title="Money · This Month"
        icon={DollarSign}
        href="/transactions"
        accent={net >= 0 ? 'green' : 'red'}
        badge={settings.currency}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              Income
            </div>
            <span className="text-sm font-semibold text-emerald-400">
              {formatCurrency(income, settings.currency)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Wallet className="w-3.5 h-3.5 text-red-400" />
              Expenses
            </div>
            <span className="text-sm font-semibold text-red-400">
              {formatCurrency(expense, settings.currency)}
            </span>
          </div>
          <div className="pt-2 border-t border-surface-border flex items-center justify-between">
            <span className="text-sm font-bold text-white">Net</span>
            <span className={`text-base font-bold ${net >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {formatCurrency(Math.abs(net), settings.currency)}
              <span className="text-xs ml-1">{net >= 0 ? 'saved' : 'deficit'}</span>
            </span>
          </div>
        </div>
      </WidgetCard>

      {/* Saved Links */}
      <WidgetCard
        title="Saved Links"
        icon={Bookmark}
        href="/links"
        accent="purple"
        badge={`${links.length} saved`}
      >
        {links.length === 0 ? (
          <p className="text-sm text-gray-500 py-2">No links saved yet</p>
        ) : (
          <ul className="space-y-2">
            {links.slice(0, 5).map(link => (
              <li key={link.id}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-gray-300 hover:text-brand-300 transition-colors truncate"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </WidgetCard>

      {/* Quick Stats */}
      <WidgetCard title="Quick Stats" icon={Target} accent="yellow">
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Total Tasks',   value: todos.length,                       color: 'text-brand-400'   },
            { label: 'Completed',     value: todos.filter(t => t.completed).length, color: 'text-emerald-400' },
            { label: 'Transactions',  value: transactions.length,                color: 'text-yellow-400'  },
            { label: 'Links Saved',   value: links.length,                       color: 'text-purple-400'  },
          ].map(stat => (
            <div key={stat.label} className="bg-surface rounded-xl p-3 text-center">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-[11px] text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>
      </WidgetCard>

      {/* Live Clock */}
      <WidgetCard title="Date & Time" icon={Clock} accent="green">
        <LiveClock />
      </WidgetCard>

    </div>
  )
}
