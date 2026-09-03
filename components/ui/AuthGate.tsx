'use client'

import { useStore } from '@/lib/store'
import { AuthScreen } from './AuthScreen'

/**
 * Shows the AuthScreen when the user is not logged in.
 * Disappears automatically when Firebase auth state changes to logged-in.
 */
export function AuthGate() {
  const { user, loading } = useStore()

  // Don't flash during initial Firebase auth check
  if (loading) return null

  if (!user) return <AuthScreen />

  return null
}
