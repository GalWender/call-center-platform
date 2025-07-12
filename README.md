# Call-Center Platform

A full-stack, **TypeScript-first** demo platform for managing call-center workflows. The project showcases a modern React front-end with a lightweight Express + MongoDB back-end, wrapped in a developer-friendly experience (hot-reloading, strict linting, and nested PostCSS styles).

## Tech Stack

| Layer     | Technology                                      |
| --------- | ----------------------------------------------- |
| Front-end | React 18, TypeScript, Vite, TanStack Query v5   |
| Styling   | PostCSS & CSS Nesting Plugin, CSS variables     |
| Back-end  | Node 18, Express, TypeScript (ESM), tsx watcher |
| Database  | MongoDB (>= 6) with native driver               |
| Dev Tools | ESLint v9, Prettier, ts-node/tsx, concurrently  |

## Design Decisions

### State Management: Why not Redux?

- **TanStack Query** already handles server data fetching, caching, and mutations, removing much of the boilerplate that Redux would solve.
- Remaining UI-only state is lightweight and comfortably managed with native React hooks (`useState`, `useReducer`).
- Skipping Redux keeps bundle size down and avoids extra setup complexity, aligning with the scope of this simple demo.

### Infinite Scroll vs Simplicity

- Infinite or cursor-based pagination is valuable for very large datasets, reducing initial load time and memory.
- For this assignment the entity lists are small, so a normal scrollable list is perfectly responsive while keeping the codebase lean.
- The API and UI are structured so pagination could be added later with minimal changes if data volume grows.

## Running Locally

1. **Install dependencies**
   ```bash
   git clone <repo-url>
   cd call-center-platform
   npm install
   ```
2. **Configure environment variables**

   **Frontend (`frontend/.env`)**

   ```env
   VITE_API_BASE_URL=http://localhost:3030/api/
   ```

   **Backend (`backend/.env`)**

   ```env
   NODE_ENV=development
   PORT=3030
   DB_NAME=call_center_platform
   DB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
   ```

3. **Start both servers**

   ```bash
   npm run dev
   ```

   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3030/api/
