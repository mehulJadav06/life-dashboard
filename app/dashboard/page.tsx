import type { Metadata } from 'next'
import { DashboardWidgets } from '@/components/widgets/DashboardWidgets'
import { Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your personal life dashboard overview',
}

export default function DashboardPage() {
  return (
    <div className="animate-in space-y-6 max-w-7xl mx-auto">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="glow-line" />
          </div>
          <h1 className="section-title text-2xl">Dashboard</h1>
          <p className="section-subtitle">Here's your life at a glance</p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-600/10 border border-brand-600/20 rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          <span className="text-xs text-brand-300 font-medium">Live</span>
        </div>
      </div>

      {/* Widgets grid */}
      <DashboardWidgets />
    </div>
  )
}
