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
import { readGist, writeGist, getCredentials, hasCredentials } from './gist'

// ── Context types ─────────────────────────────────────────────────────────

interface StoreState {
  data: AppData
  loading: boolean
  syncing: boolean
  error: string | null
  isSetup: boolean
  refresh: () => Promise<void>
  update: (partial: Partial<AppData>) => Promise<void>
}

const StoreContext = createContext<StoreState>({
  data:     DEFAULT_DATA,
  loading:  true,
  syncing:  false,
  error:    null,
  isSetup:  false,
  refresh:  async () => {},
  update:   async () => {},
})

// ── Provider ──────────────────────────────────────────────────────────────

export function StoreProvider({ children }: { children: ReactNode }) {
  const [data,    setData]    = useState<AppData>(DEFAULT_DATA)
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [error,   setError]   = useState<string | null>(null)
  const [isSetup, setIsSetup] = useState(false)

  const refresh = useCallback(async () => {
    if (!hasCredentials()) {
      setIsSetup(false)
      setLoading(false)
      return
    }

    const creds = getCredentials()!
    setLoading(true)
    setError(null)

    try {
      const raw = await readGist(creds)

      setData({
        todos:        (raw['todos.json']        as AppData['todos'])        ?? DEFAULT_DATA.todos,
        transactions: (raw['transactions.json'] as AppData['transactions']) ?? DEFAULT_DATA.transactions,
        links:        (raw['links.json']        as AppData['links'])        ?? DEFAULT_DATA.links,
        notes:        (raw['notes.json']        as AppData['notes'])        ?? DEFAULT_DATA.notes,
        settings:     (raw['settings.json']     as AppData['settings'])     ?? DEFAULT_DATA.settings,
      })

      setIsSetup(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }, [])

  const update = useCallback(async (partial: Partial<AppData>) => {
    const creds = getCredentials()
    if (!creds) return

    const next = { ...data, ...partial }
    setData(next)   // optimistic update
    setSyncing(true)

    try {
      const gistUpdate: Record<string, unknown> = {}
      for (const key of Object.keys(partial) as Array<keyof AppData>) {
        gistUpdate[`${key}.json`] = next[key]
      }
      await writeGist(creds, gistUpdate)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sync error')
      // revert on failure
      setData(data)
    } finally {
      setSyncing(false)
    }
  }, [data])

  useEffect(() => {
    refresh()
  }, [refresh])

  return (
    <StoreContext.Provider value={{ data, loading, syncing, error, isSetup, refresh, update }}>
      {children}
    </StoreContext.Provider>
  )
}

// ── Hook ──────────────────────────────────────────────────────────────────

export function useStore() {
  return useContext(StoreContext)
}
