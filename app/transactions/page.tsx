import type { Metadata } from 'next'
import { DollarSign } from 'lucide-react'
import { ComingSoon } from '@/components/ui/ComingSoon'

export const metadata: Metadata = { title: 'Money Tracker' }

export default function TransactionsPage() {
  return (
    <ComingSoon
      title="Money Tracker"
      description="Track your income and expenses. Understand your financial flow with beautiful charts."
      icon={DollarSign}
      accent="green"
      features={[
        'Log income & expense transactions',
        'Category-wise spending breakdown',
        'Monthly income vs. expense chart',
        'Filter by date range & category',
        'Export to CSV',
        'Net savings trend over time',
      ]}
    />
  )
}
