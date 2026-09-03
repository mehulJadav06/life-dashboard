// ── Types ──────────────────────────────────────────────────────────────────

export interface GistCredentials {
  pat: string   // GitHub Personal Access Token
  gistId: string // Gist ID to read/write data from
}

export interface GistFiles {
  [filename: string]: {
    content: string
  }
}

const GIST_API = 'https://api.github.com/gists'

// ── Credential helpers ────────────────────────────────────────────────────

export function getCredentials(): GistCredentials | null {
  if (typeof window === 'undefined') return null
  const pat    = localStorage.getItem('ld_pat')
  const gistId = localStorage.getItem('ld_gist_id')
  if (!pat || !gistId) return null
  return { pat, gistId }
}

export function saveCredentials(creds: GistCredentials): void {
  localStorage.setItem('ld_pat', creds.pat)
  localStorage.setItem('ld_gist_id', creds.gistId)
}

export function clearCredentials(): void {
  localStorage.removeItem('ld_pat')
  localStorage.removeItem('ld_gist_id')
}

export function hasCredentials(): boolean {
  return getCredentials() !== null
}

// ── Gist API helpers ──────────────────────────────────────────────────────

/**
 * Read all files from the Gist and return parsed JSON for each known file.
 */
export async function readGist(creds: GistCredentials): Promise<Record<string, unknown>> {
  const res = await fetch(`${GIST_API}/${creds.gistId}`, {
    headers: {
      Authorization: `Bearer ${creds.pat}`,
      Accept: 'application/vnd.github+json',
    },
  })

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  const result: Record<string, unknown> = {}

  for (const [filename, file] of Object.entries(data.files as Record<string, { content: string }>)) {
    try {
      result[filename] = JSON.parse(file.content)
    } catch {
      result[filename] = file.content
    }
  }

  return result
}

/**
 * Write / update one or more files in the Gist.
 * Pass an object where keys are filenames and values are JSON-serialisable data.
 */
export async function writeGist(
  creds: GistCredentials,
  updates: Record<string, unknown>
): Promise<void> {
  const files: GistFiles = {}

  for (const [filename, value] of Object.entries(updates)) {
    files[filename] = {
      content: JSON.stringify(value, null, 2),
    }
  }

  const res = await fetch(`${GIST_API}/${creds.gistId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${creds.pat}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ files }),
  })

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`)
  }
}

/**
 * Create a brand-new Gist pre-populated with all app data files.
 * Returns the new Gist ID.
 */
export async function createGist(pat: string): Promise<string> {
  const initialFiles: GistFiles = {
    'todos.json':        { content: JSON.stringify([], null, 2) },
    'transactions.json': { content: JSON.stringify([], null, 2) },
    'links.json':        { content: JSON.stringify([], null, 2) },
    'notes.json':        { content: JSON.stringify([], null, 2) },
    'settings.json':     { content: JSON.stringify({ theme: 'dark', name: 'User', sheetsUrl: '' }, null, 2) },
  }

  const res = await fetch(GIST_API, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${pat}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      description: 'Life Dashboard Data',
      public: false,
      files: initialFiles,
    }),
  })

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  return data.id as string
}
