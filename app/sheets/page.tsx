import type { Metadata } from 'next'
import { BarChart2 } from 'lucide-react'
import { ComingSoon } from '@/components/ui/ComingSoon'

export const metadata: Metadata = { title: 'Wealth Chart' }

export default function SheetsPage() {
  return (
    <ComingSoon
      title="Wealth Chart"
      description="Embed your Google Sheets charts to track your wealth journey. Your financial story, visualized."
      icon={BarChart2}
      accent="green"
      features={[
        'Embed Google Sheets chart as iframe',
        'Paste your publish-to-web chart URL in Settings',
        'Full-screen chart view',
        'Multiple chart slots',
        'Last refreshed timestamp',
      ]}
    />
  )
}
