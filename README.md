# LifeOS — Personal Life Dashboard

A premium, modular personal dashboard built with **Next.js 14**, styled with **Tailwind CSS**, data stored in **GitHub Gist**, and deployed to **GitHub Pages**.

## ✨ Features (v1 Scaffold)

- 🏠 **Dashboard** — Overview widgets: todo summary, monthly money, saved links, quick stats, live clock
- ✅ **To-Do List** — Priority-based tasks with due dates *(coming soon)*
- 💰 **Money Tracker** — Income, expense, net savings *(coming soon)*
- 📈 **Compound Calculator** — Investment growth visualizer *(coming soon)*
- 📊 **Wealth Chart** — Embedded Google Sheets chart *(coming soon)*
- 🔖 **Saved Links** — Personal bookmarks manager *(coming soon)*
- 📝 **Notes** — Markdown note-taking *(coming soon)*

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router, Static Export) |
| Styling | Tailwind CSS |
| Data | GitHub Gist via REST API |
| Auth | GitHub PAT in localStorage |
| Icons | Lucide React |
| Charts | Recharts |
| Deploy | GitHub Pages |

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- A GitHub account

### Install

```bash
cd life-dashboard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### First Run — Connect GitHub Gist

1. Go to [github.com/settings/tokens/new](https://github.com/settings/tokens/new?scopes=gist&description=LifeDashboard) and create a PAT with **gist** scope.
2. On first launch the app shows a **Connect GitHub Gist** modal.
3. Choose **"Create new Gist"** and paste your PAT → click **Create & Connect**.
4. All your data is now stored in a private Gist under your GitHub account.

## 📦 Deploy to GitHub Pages

### 1. Create a GitHub repo

Create a repo named `life-dashboard` (or `username.github.io` for root domain).

### 2. Set the base path

If deploying to `username.github.io/life-dashboard`, set in your shell before building:

```bash
export NEXT_PUBLIC_BASE_PATH=/life-dashboard
```

Or edit `next.config.js` directly.

### 3. Deploy

```bash
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/life-dashboard.git

# Install gh-pages if not already
npm install

# Deploy
npm run deploy
```

This runs `next build` (static export to `out/`) then pushes to the `gh-pages` branch.

### 4. Enable GitHub Pages

In your repo Settings → Pages → Source: **Deploy from branch** → `gh-pages` → `/ (root)`.

Your app will be live at `https://YOUR_USERNAME.github.io/life-dashboard/`.

## 📁 Project Structure

```
life-dashboard/
├── app/
│   ├── layout.tsx          # Root layout (sidebar, topbar, store)
│   ├── page.tsx            # Redirect → /dashboard
│   ├── dashboard/page.tsx  # Main dashboard
│   ├── todos/page.tsx
│   ├── transactions/page.tsx
│   ├── calculator/page.tsx
│   ├── sheets/page.tsx
│   ├── links/page.tsx
│   ├── notes/page.tsx
│   └── settings/page.tsx
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx     # Collapsible sidebar
│   │   └── TopBar.tsx      # Top bar with clock & sync status
│   ├── ui/
│   │   ├── GistSetup.tsx   # First-run modal
│   │   ├── GistSetupGate.tsx
│   │   └── ComingSoon.tsx  # Stub page placeholder
│   └── widgets/
│       ├── WidgetCard.tsx  # Reusable card
│       └── DashboardWidgets.tsx
├── lib/
│   ├── gist.ts             # GitHub Gist API helpers
│   ├── store.tsx           # React Context data store
│   ├── types.ts            # TypeScript types
│   └── utils.ts            # Helper functions
└── next.config.js          # Static export config
```

## 🔐 Data & Privacy

- All data is stored in **your own private GitHub Gist**.
- The GitHub PAT is stored only in **your browser's localStorage**.
- No third-party servers are involved — the app is purely client-side.

## 🗺️ Roadmap

- [ ] Full To-Do List with CRUD
- [ ] Money Tracker with charts
- [ ] Compound Interest Calculator with Recharts visualization
- [ ] Google Sheets embed
- [ ] Bookmarks manager
- [ ] Markdown Notes editor
- [ ] Settings page (name, currency, Gist reconnect)
- [ ] PWA / offline support
- [ ] Mobile-responsive sidebar (drawer)
