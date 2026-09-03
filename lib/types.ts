// ── Data types ────────────────────────────────────────────────────────────

export type Priority = 'urgent' | 'high' | 'medium' | 'low'

export interface Todo {
  id: string
  title: string
  description?: string
  priority: Priority
  dueDate?: string          // ISO date string
  completed: boolean
  tags?: string[]
  createdAt: string
  updatedAt: string
}

export interface Transaction {
  id: string
  type: 'income' | 'expense'
  amount: number
  category: string
  description: string
  date: string              // ISO date string
  tags?: string[]
  createdAt: string
}

export interface SavedLink {
  id: string
  title: string
  url: string
  description?: string
  tags?: string[]
  favicon?: string
  createdAt: string
}

export interface Note {
  id: string
  title: string
  content: string
  tags?: string[]
  createdAt: string
  updatedAt: string
}

export interface AppSettings {
  theme: 'dark' | 'light'
  name: string
  sheetsUrl: string         // Google Sheets embed URL for wealth chart
  currency: string          // e.g. 'INR', 'USD'
  avatar?: string
}

export interface AppData {
  todos: Todo[]
  transactions: Transaction[]
  links: SavedLink[]
  notes: Note[]
  settings: AppSettings
}

export const DEFAULT_DATA: AppData = {
  todos:        [],
  transactions: [],
  links:        [],
  notes:        [],
  settings: {
    theme:     'dark',
    name:      'User',
    sheetsUrl: '',
    currency:  'INR',
  },
}
