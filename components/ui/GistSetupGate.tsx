'use client'

import { useStore } from '@/lib/store'
import { GistSetup } from './GistSetup'

/**
 * Renders the GistSetup modal when the app hasn't been configured yet.
 * Once credentials are saved and data loads, it disappears automatically.
 */
export function GistSetupGate() {
  const { isSetup, loading } = useStore()

  // Don't flash during initial load
  if (loading) return null

  // Show setup modal when not configured
  if (!isSetup) return <GistSetup />

  return null
}
