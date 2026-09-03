import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { db } from './firebase'
import { AppData, DEFAULT_DATA } from './types'

// ── Helpers ───────────────────────────────────────────────────────────────

function userDoc(uid: string) {
  return doc(db, 'users', uid)
}

// ── Read ──────────────────────────────────────────────────────────────────

/**
 * Load all app data for a given user.
 * If the document doesn't exist yet, return default data.
 */
export async function loadUserData(uid: string): Promise<AppData> {
  const snap = await getDoc(userDoc(uid))

  if (!snap.exists()) {
    // First login — bootstrap with defaults
    await setDoc(userDoc(uid), DEFAULT_DATA)
    return { ...DEFAULT_DATA }
  }

  const raw = snap.data() as Partial<AppData>

  return {
    todos:        raw.todos        ?? DEFAULT_DATA.todos,
    transactions: raw.transactions ?? DEFAULT_DATA.transactions,
    links:        raw.links        ?? DEFAULT_DATA.links,
    notes:        raw.notes        ?? DEFAULT_DATA.notes,
    settings:     raw.settings     ?? DEFAULT_DATA.settings,
  }
}

// ── Write ─────────────────────────────────────────────────────────────────

/**
 * Save a partial update (one or more top-level keys) to Firestore.
 * Uses merge so other fields are not overwritten.
 */
export async function saveUserData(uid: string, partial: Partial<AppData>): Promise<void> {
  const ref = userDoc(uid)
  const snap = await getDoc(ref)

  if (snap.exists()) {
    await updateDoc(ref, partial as Record<string, unknown>)
  } else {
    await setDoc(ref, { ...DEFAULT_DATA, ...partial })
  }
}
