## Lights Out – F1 Explorer

Browse Formula 1 seasons, races, results, driver and constructor standings with a fast, modern React UI. Data is fetched from an Ergast-compatible API with built‑in client caching for snappy navigation.

### Features
- Modern React (19) + Vite dev experience
- Client‑side routing with React Router v7
- Ergast‑compatible API client with 24h sessionStorage cache and Jolpi mirror fallback
- Beautiful translucent tables over a blurred background
- Animated hero sections with Framer Motion
- Tailwind CSS 4 utility styling

### Tech Stack
- React 19, React Router 7
- Vite 7
- Tailwind CSS 4
- Framer Motion
- Recharts (reserved for future charts)

---

## Quick Start

### Requirements
- Node.js 18+ (LTS recommended)
- pnpm, npm, or yarn

### Install & Run
```bash
# install deps
npm install

# start dev server
npm run dev

# build for production
npm run build

# locally preview the production build
npm run preview

# lint (ESLint)
npm run lint
```

Vite will start the dev server and print a local URL (typically `http://localhost:5173`).

---

## Environment Variables
Create a `.env` (or `.env.local`) in the project root if you want to customize API behavior.

```
# Optional: use a Jolpi mirror (default already points to Jolpi)
VITE_JOLPICA_BASE=https://api.jolpi.ca/ergast/f1

# Optional: enable OpenF1 (stubbed for now)
VITE_ENABLE_OPENF1=false
```

Notes:
- When `VITE_ENABLE_OPENF1 !== 'true'`, OpenF1 functions return empty arrays by design.
- The Jolpica client will automatically fall back to Ergast if the mirror is unavailable.

---

## Project Structure
```
Lights-Out/
  components/            # Reusable UI building blocks
  lib/api/               # API clients (Ergast-compatible + OpenF1 stub)
  pages/                 # Route pages
  public/                # Static assets (Netlify redirects)
  src/                   # App entry + router + global styles
```

Key files:
- `src/main.jsx`: Vite entry, mounts `<RouterProvider />`
- `src/router.jsx`: Route definitions and root layout (Navbar → App → Footer)
- `components/Table.jsx`: Shared data table with translucent/blur styling
- `lib/api/jolpica.js`: Ergast‑compatible client with 24h sessionStorage cache
- `lib/api/openf1.js`: Feature‑flagged OpenF1 stub, off by default
- `public/_redirects`: SPA redirect rule for Netlify

---

## Routing
- `/` – Home (hero, quick nav)
- `/seasons` – Seasons list (2010+)
- `/seasons/:year` – Races for the selected season
- `/seasons/:year/races/:round` – Results table for a race
- `/drivers` – Current season driver standings
- `/constructors` – Current season constructor standings

Implementation: `src/router.jsx` uses `createBrowserRouter` with a `RootLayout` that renders `Navbar`, the route `<Outlet />` (inside `App`), and `Footer`.

---

## Data & Caching

The Jolpica client (`lib/api/jolpica.js`):
- Primary base: `VITE_JOLPICA_BASE` or `https://api.jolpi.ca/ergast/f1`
- Fallback base: `https://ergast.com/api/f1`
- Caching: responses are stored in `sessionStorage` for 24 hours, keyed by full URL

Available helpers:
- `getSeasons()`
- `getSeasonRaces(year)`
- `getRaceResults(year, round)`
- `getDriverStandings(year = 'current')`
- `getConstructorStandings(year = 'current')`

OpenF1 (`lib/api/openf1.js`) is scaffolded and disabled by default.

---

## UI & Styling

- Tailwind CSS 4 is enabled in `src/index.css` with additional utility classes (e.g., `glass-btn`).
- `PageBackground` renders a full‑bleed image with a configurable overlay and centers the page content.
- `Table` renders a translucent, blurred table surface so the background subtly shows through.
- `Navbar` is fixed, full‑width, and layered above all content for reliable navigation.

Accessibility:
- Semantic headings, focusable nav links, and clear hit targets
- Consider keyboard focus styles when adding new interactive components

---

## Deployment

### Netlify
This repository includes a Netlify SPA redirect rule:

```
public/_redirects
/*  /index.html  200
```

This ensures client‑side routes work on page refresh and direct deep‑links.

### Other hosts
- Vercel: add a rewrite to `index.html` for all unmatched paths
- GitHub Pages: use a 404.html fallback strategy or a router base

---

## Troubleshooting

- Links don’t navigate in dev:
  - Ensure nothing overlays the navbar; the project sets `z-index` high on the nav and disables pointer events on the image background.
  - Check the browser console for routing errors.

- API requests fail:
  - The client will fall back to Ergast when Jolpi is down; verify network requests in DevTools.
  - If you override `VITE_JOLPICA_BASE`, confirm the URL is reachable and CORS‑enabled.

- Styling doesn’t apply:
  - Make sure Tailwind content paths in `tailwind.config.js` include `components/`, `pages/`, `src/`, and `lib/`.

---

## Contributing

1. Fork the repo and create a feature branch
2. Run `npm run dev` and implement your changes
3. Ensure `npm run lint` passes
4. Open a pull request with a clear description and screenshots if UI changes

---

## Acknowledgements
- Data: Ergast Developer API and the Jolpi mirror
- Icons: Lucide




