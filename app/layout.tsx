import type { Metadata, Viewport } from 'next'
import './globals.css'
import { StoreProvider } from '@/lib/store'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopBar } from '@/components/layout/TopBar'
import { GistSetupGate } from '@/components/ui/GistSetupGate'

export const metadata: Metadata = {
  title: {
    default: 'LifeOS — Personal Dashboard',
    template: '%s | LifeOS',
  },
  description:
    'Your all-in-one personal life dashboard: to-dos, finances, saved links, notes, and more.',
  keywords: ['personal dashboard', 'life os', 'productivity', 'finance tracker', 'todo list'],
  authors: [{ name: 'LifeOS' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f1117',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <StoreProvider>
          {/* First-run gate: shows GistSetup modal if not configured */}
          <GistSetupGate />

          {/* Shell */}
          <Sidebar />

          <div className="flex flex-col min-h-screen" style={{ marginLeft: 'var(--sidebar-width, 240px)' }}>
            <TopBar />
            <main className="flex-1 pt-16 p-6 overflow-x-hidden">
              {children}
            </main>
          </div>
        </StoreProvider>
      </body>
    </html>
  )
}
