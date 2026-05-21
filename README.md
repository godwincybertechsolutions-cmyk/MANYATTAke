# New Manyatta Kenya

Luxury hospitality web app for mountain villas, safari experiences, and urban apartments in Kenya. Built with React, Vite, TypeScript, and Supabase.

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- A [Supabase](https://supabase.com/) project (auth, properties, bookings)

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy environment variables:

   ```bash
   cp .env.example .env.local
   ```

   Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from your Supabase project settings.

3. Start the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Development server       |
| `npm run build`   | Production build         |
| `npm run preview` | Preview production build |

## Database setup

Run the SQL schema in the Supabase SQL editor (see `supabase/fix-user-profiles.sql` for profile/booking fixes after the initial schema).

## Project structure

- `pages/` — Route pages (Home, villas, safaris, booking, auth, profile)
- `components/` — UI components
- `services/` — Supabase client, auth, bookings, properties
- `src/auth/` — Auth context provider
