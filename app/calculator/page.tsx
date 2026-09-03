import type { Metadata } from 'next'
import { Calculator } from 'lucide-react'
import { ComingSoon } from '@/components/ui/ComingSoon'

export const metadata: Metadata = { title: 'Compound Calculator' }

export default function CalculatorPage() {
  return (
    <ComingSoon
      title="Compound Interest Calculator"
      description="Visualize how your investments grow over time with compound interest. Plan your financial future."
      icon={Calculator}
      accent="yellow"
      features={[
        'Principal, rate, time, frequency inputs',
        'Monthly & yearly growth chart (Recharts)',
        'SIP (Systematic Investment Plan) mode',
        'Inflation-adjusted returns',
        'Goal-based reverse calculation',
        'Export chart as image',
      ]}
    />
  )
}
