import type { Metadata } from 'next'
import { CheckSquare } from 'lucide-react'
import { ComingSoon } from '@/components/ui/ComingSoon'

export const metadata: Metadata = { title: 'To-Do List' }

export default function TodosPage() {
  return (
    <ComingSoon
      title="To-Do List"
      description="Manage your tasks with priority levels and due dates. Stay on top of what matters most."
      icon={CheckSquare}
      accent="blue"
      features={[
        'Priority levels: Urgent, High, Medium, Low',
        'Due dates with overdue alerts',
        'Tags and categories',
        'Filter & sort by priority / date',
        'Progress tracking with completion stats',
        'Bulk actions (complete, delete)',
      ]}
    />
  )
}
