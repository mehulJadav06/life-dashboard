import type { Metadata } from 'next'
import { Bookmark } from 'lucide-react'
import { ComingSoon } from '@/components/ui/ComingSoon'

export const metadata: Metadata = { title: 'Saved Links' }

export default function LinksPage() {
  return (
    <ComingSoon
      title="Saved Links"
      description="Your personal bookmarks manager. Save, tag, and quickly find the links that matter to you."
      icon={Bookmark}
      accent="purple"
      features={[
        'Save URLs with title & description',
        'Tag-based organization',
        'Search & filter links',
        'Auto-fetch page title & favicon',
        'Quick copy URL button',
        'Import from browser bookmarks (JSON)',
      ]}
    />
  )
}
