import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  User,
} from 'firebase/auth'
import { auth } from './firebase'

export type { User }

// ── Sign Up ───────────────────────────────────────────────────────────────
export async function signUp(email: string, password: string, displayName?: string): Promise<User> {
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  if (displayName) {
    await updateProfile(cred.user, { displayName })
  }
  return cred.user
}

// ── Sign In (email/password) ──────────────────────────────────────────────
export async function signIn(email: string, password: string): Promise<User> {
  const cred = await signInWithEmailAndPassword(auth, email, password)
  return cred.user
}

// ── Sign In with Google ───────────────────────────────────────────────────
export async function signInWithGoogle(): Promise<User> {
  const provider = new GoogleAuthProvider()
  const cred = await signInWithPopup(auth, provider)
  return cred.user
}

// ── Sign Out ──────────────────────────────────────────────────────────────
export async function signOut(): Promise<void> {
  await firebaseSignOut(auth)
}

// ── Auth State Observer ───────────────────────────────────────────────────
export function onAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback)
}
