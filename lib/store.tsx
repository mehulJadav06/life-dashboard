'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'
import { AppData, DEFAULT_DATA } from './types'
import { loadUserData, saveUserData } from './firestore'
import { onAuth, User } from './auth'

// ── Context types ─────────────────────────────────────────────────────────

interface StoreState {
  data:    AppData
  loading: boolean
  syncing: boolean
  error:   string | null
  user:    User | null
  refresh: () => Promise<void>
  update:  (partial: Partial<AppData>) => Promise<void>
}

const StoreContext = createContext<StoreState>({
  data:    DEFAULT_DATA,
  loading: true,
  syncing: false,
  error:   null,
  user:    null,
  refresh: async () => {},
  update:  async () => {},
})

// ── Provider ──────────────────────────────────────────────────────────────

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data,    setData]    = useState<AppData>(DEFAULT_DATA)
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [error,   setError]   = useState<string | null>(null)
  const [user,    setUser]    = useState<User | null>(null)

  const refresh = useCallback(async (uid?: string) => {
    const id = uid ?? user?.uid
    if (!id) return

    setLoading(true)
    setError(null)
    try {
      const loaded = await loadUserData(id)
      setData(loaded)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }, [user])

  const update = useCallback(async (partial: Partial<AppData>) => {
    if (!user) return

    const next = { ...data, ...partial }
    setData(next)       // optimistic update
    setSyncing(true)

    try {
      await saveUserData(user.uid, partial)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sync error')
      setData(data)     // revert on failure
    } finally {
      setSyncing(false)
    }
  }, [data, user])

  // Listen to Firebase auth state
  useEffect(() => {
    const unsub = onAuth(async (firebaseUser) => {
      setUser(firebaseUser)
      if (firebaseUser) {
        await refresh(firebaseUser.uid)
      } else {
        setData(DEFAULT_DATA)
        setLoading(false)
      }
    })
    return unsub
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <StoreContext.Provider value={{ data, loading, syncing, error, user, refresh, update }}>
      {children}
    </StoreContext.Provider>
  )
}

// ── Hook ──────────────────────────────────────────────────────────────────

export function useStore() {
  return useContext(StoreContext)
}
