'use client'

import { useState } from 'react'
import { X, KeyRound, Hash, Plus, ExternalLink, Loader2 } from 'lucide-react'
import { saveCredentials, createGist } from '@/lib/gist'
import { useStore } from '@/lib/store'

export function GistSetup() {
  const { refresh } = useStore()

  const [tab,      setTab]      = useState<'existing' | 'new'>('existing')
  const [pat,      setPat]      = useState('')
  const [gistId,   setGistId]   = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  async function handleConnect() {
    if (!pat.trim()) return setError('Please enter your Personal Access Token')
    if (tab === 'existing' && !gistId.trim()) return setError('Please enter a Gist ID')

    setError('')
    setLoading(true)

    try {
      let resolvedGistId = gistId.trim()

      if (tab === 'new') {
        resolvedGistId = await createGist(pat.trim())
      }

      saveCredentials({ pat: pat.trim(), gistId: resolvedGistId })
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md card animate-in">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-brand-600/20 border border-brand-600/30 flex items-center justify-center">
              <KeyRound className="w-5 h-5 text-brand-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Connect GitHub Gist</h2>
              <p className="text-xs text-gray-400">Your data is stored in your own private Gist</p>
            </div>
          </div>

          <a
            href="https://github.com/settings/tokens/new?scopes=gist&description=LifeDashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-300 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            Create a GitHub PAT with Gist scope
          </a>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-surface rounded-xl p-1 mb-5">
          {(['existing', 'new'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                tab === t
                  ? 'bg-brand-600 text-white shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t === 'existing' ? 'Use existing Gist' : 'Create new Gist'}
            </button>
          ))}
        </div>

        {/* Fields */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">
              Personal Access Token (PAT)
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                id="gist-setup-pat"
                type="password"
                value={pat}
                onChange={e => setPat(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                className="input pl-9"
              />
            </div>
          </div>

          {tab === 'existing' && (
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5">
                Gist ID
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  id="gist-setup-gist-id"
                  type="text"
                  value={gistId}
                  onChange={e => setGistId(e.target.value)}
                  placeholder="e.g. a1b2c3d4e5f6..."
                  className="input pl-9"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Found in the URL: github.com/gist/username/<strong>GIST_ID</strong>
              </p>
            </div>
          )}

          {tab === 'new' && (
            <div className="flex items-start gap-2 p-3 bg-brand-600/10 border border-brand-600/20 rounded-xl">
              <Plus className="w-4 h-4 text-brand-400 mt-0.5 shrink-0" />
              <p className="text-xs text-brand-300">
                A new private Gist named <strong>Life Dashboard Data</strong> will be created automatically with all required files.
              </p>
            </div>
          )}

          {error && (
            <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-3 py-2">
              {error}
            </p>
          )}
        </div>

        {/* Action */}
        <button
          id="gist-setup-connect"
          onClick={handleConnect}
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Connecting…</>
          ) : (
            tab === 'new' ? 'Create & Connect' : 'Connect'
          )}
        </button>

        <p className="text-xs text-gray-600 text-center mt-4">
          Your PAT is stored only in your browser's localStorage — never sent to any third party.
        </p>
      </div>
    </div>
  )
}
