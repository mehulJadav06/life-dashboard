import type { Metadata } from 'next'
import { Settings } from 'lucide-react'
import { ComingSoon } from '@/components/ui/ComingSoon'

export const metadata: Metadata = { title: 'Settings' }

export default function SettingsPage() {
  return (
    <ComingSoon
      title="Settings"
      description="Configure your dashboard preferences, Google Sheets URL, currency, and Gist credentials."
      icon={Settings}
      accent="blue"
      features={[
        'Update your display name',
        'Set preferred currency (INR, USD, EUR…)',
        'Paste Google Sheets embed URL',
        'View / reset Gist credentials',
        'Export all data as JSON',
        'Theme preferences',
      ]}
    />
  )
}
