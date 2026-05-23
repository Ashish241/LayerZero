# LayerZero DevOps Dashboard

A React + Vite website showcasing a LayerZero-themed cross-chain DevOps dashboard. The app provides a polished interface for exploring ecosystem metrics, tooling catalogs, protocol docs, and community governance features.

## Key Features

- **Ecosystem View**: live-style telemetry panels, router health state, latency metrics, and simulated operational logs.
- **Tooling Catalog**: searchable registry of LayerZero tooling, SDKs, security agents, and proposed utilities.
- **Docs & Architecture**: interactive documentation tabs with endpoint, relayer, and gas optimization guidance.
- **Community Hub**: RFC voting, event RSVP interactions, and grant application workflows.
- **Theme Toggle**: switch between dark and light UI modes.
- **Modal flows**: onboarding, deployment, and funding modals accessible from the dashboard.

## Tech Stack

- React 19
- Vite 6
- TypeScript
- Tailwind CSS
- Lucide Icons
- Motion for animated UI states

## Run Locally

### Prerequisites

- Node.js installed

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

The app will be available at `http://localhost:3000` by default.

## Build for Production

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

- `src/App.tsx` — main app shell and view routing
- `src/components/TopNavBar.tsx` — navigation, theme toggle, and core controls
- `src/components/EcosystemView.tsx` — telemetry dashboard and node health visuals
- `src/components/ToolingView.tsx` — search/filter toolkit catalog
- `src/components/DocsView.tsx` — protocol docs and simulator panels
- `src/components/CommunityView.tsx` — community RFC + event interactions

## Notes

This repository is a static Vite app designed as a UI prototype for a LayerZero-style developer operations portal. It does not currently connect to live blockchain or LayerZero backend services.
