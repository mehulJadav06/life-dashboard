import type { Metadata } from 'next'
import { FileText } from 'lucide-react'
import { ComingSoon } from '@/components/ui/ComingSoon'

export const metadata: Metadata = { title: 'Notes' }

export default function NotesPage() {
  return (
    <ComingSoon
      title="Notes"
      description="A clean, distraction-free space for your thoughts, ideas, and reference modules."
      icon={FileText}
      accent="blue"
      features={[
        'Rich text / Markdown editor',
        'Tag-based organization',
        'Full-text search across notes',
        'Pin important notes to top',
        'Word count & reading time',
        'Auto-save to Gist',
      ]}
    />
  )
}
