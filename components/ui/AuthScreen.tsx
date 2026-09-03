'use client'

import { useState } from 'react'
import { Zap, Mail, Lock, User as UserIcon, Eye, EyeOff, Chrome, Loader2, AlertCircle } from 'lucide-react'
import { signIn, signUp, signInWithGoogle } from '@/lib/auth'

type Mode = 'signin' | 'signup'

export function AuthScreen() {
  const [mode,     setMode]     = useState<Mode>('signin')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [name,     setName]     = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) return
    setError('')
    setLoading(true)

    try {
      if (mode === 'signup') {
        await signUp(email, password, name || undefined)
      } else {
        await signIn(email, password)
      }
      // Auth state listener in store will handle the rest
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong'
      setError(friendlyError(msg))
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    setError('')
    setLoading(true)
    try {
      await signInWithGoogle()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google sign-in failed'
      setError(friendlyError(msg))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface p-4"
         style={{ background: 'radial-gradient(ellipse at 30% 20%, rgba(59,110,246,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(96,144,250,0.07) 0%, transparent 60%), #0f1117' }}>

      <div className="w-full max-w-sm animate-in">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-brand-600/20 border border-brand-600/30 flex items-center justify-center mb-4 shadow-glow">
            <Zap className="w-7 h-7 text-brand-400" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">LifeOS</h1>
          <p className="text-gray-400 text-sm mt-1">
            {mode === 'signin' ? 'Welcome back' : 'Create your account'}
          </p>
        </div>

        {/* Card */}
        <div className="card">
          {/* Google Sign-In */}
          <button
            id="auth-google"
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 mb-4
                       bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20
                       rounded-xl text-sm font-medium text-white transition-all duration-200 active:scale-95"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-surface-border" />
            <span className="text-xs text-gray-600">or</span>
            <div className="flex-1 h-px bg-surface-border" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Name — signup only */}
            {mode === 'signup' && (
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                <input
                  id="auth-name"
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Your name (optional)"
                  className="input pl-9"
                  autoComplete="name"
                />
              </div>
            )}

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email address"
                className="input pl-9"
                autoComplete={mode === 'signup' ? 'email' : 'username'}
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              <input
                id="auth-password"
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder={mode === 'signup' ? 'Create password (min 6 chars)' : 'Password'}
                className="input pl-9 pr-10"
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                tabIndex={-1}
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400">
                <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              id="auth-submit"
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-1"
            >
              {loading
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Please wait…</>
                : mode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>

        {/* Toggle mode */}
        <p className="text-center text-sm text-gray-500 mt-5">
          {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
          <button
            id="auth-toggle-mode"
            onClick={() => { setMode(m => m === 'signin' ? 'signup' : 'signin'); setError('') }}
            className="text-brand-400 hover:text-brand-300 font-medium transition-colors"
          >
            {mode === 'signin' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}

// ── Error message friendlifier ────────────────────────────────────────────
function friendlyError(msg: string): string {
  if (msg.includes('user-not-found') || msg.includes('invalid-credential') || msg.includes('wrong-password'))
    return 'Incorrect email or password. Please try again.'
  if (msg.includes('email-already-in-use'))
    return 'An account with this email already exists. Sign in instead.'
  if (msg.includes('weak-password'))
    return 'Password must be at least 6 characters.'
  if (msg.includes('invalid-email'))
    return 'Please enter a valid email address.'
  if (msg.includes('too-many-requests'))
    return 'Too many attempts. Please wait a moment and try again.'
  if (msg.includes('popup-closed-by-user'))
    return 'Google sign-in was cancelled.'
  if (msg.includes('network-request-failed'))
    return 'Network error. Check your connection and try again.'
  return msg
}
