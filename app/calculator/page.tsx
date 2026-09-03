import type { Metadata } from 'next'
import { ComingSoon } from '@/components/ui/ComingSoon'
export const metadata: Metadata = { title: 'Compound Calculator' }
export default function CalculatorPage() {
  return (
    <ComingSoon
      title="Compound Interest Calculator"
      description="Visualize how your investments grow over time. Plan your financial future."
      icon="Calculator"
      accent="yellow"
      features={[
        'Principal, rate, time, frequency inputs',
        'Monthly & yearly growth chart',
        'SIP mode',
        'Inflation-adjusted returns',
        'Goal-based reverse calculation',
        'Export chart as image',
      ]}
    />
  )
}
