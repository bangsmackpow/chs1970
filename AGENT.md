# Agent Handoff — CHS 1970 Digital Time Capsule

## What This Project Is

A Next.js 16 (App Router) web app deployed on Cloudflare Pages for the Creston Community High School Class of 1970. Features: class directory with In Memoriam, digital yearbook masonry gallery, 1970 timeline, and external archive resource links. Theme: "Vintage Panther" (Creston Red #C41E3A + Black + Parchment).

## Current State

**All code is written.** The app structure, components, API routes, database schema, and seed data are complete. The only blocker is **npm install timing out** on Cloudflare dependencies.

## Where to Pick Up

### 1. Install Dependencies (BLOCKER)

```bash
cd C:\Users\curtis\Desktop\dev\chs1970\chs1970-app
npm install
```

If it times out again, try:
```bash
npm install --legacy-peer-deps
# Or install one at a time:
npm i @cloudflare/workers-types --save-dev
npm i wrangler --save-dev
npm i @opennextjs/cloudflare --save-dev
```

### 2. Create Cloudflare Resources

```bash
# From project root (C:\Users\curtis\Desktop\dev\chs1970)
wrangler d1 create chs1970-classmates
# Copy the database_id into wrangler.toml

wrangler r2 bucket create chs1970-yearbook-scans
```

### 3. Apply Schema & Seed

```bash
wrangler d1 execute chs1970-classmates --local --file=./schema.sql
wrangler d1 execute chs1970-classmates --local --file=./seed-data.sql
```

### 4. Verify Dev Server

```bash
cd chs1970-app
npm run dev
```

Expected: All 4 sections render (Hero, Directory, Yearbook, Timeline, Resources Footer). API routes return JSON.

### 5. Upload Images to R2

The gallery references R2 keys like `yearbook/senior-class-1970.jpg`. Upload actual scans:
```bash
wrangler r2 object put chs1970-yearbook-scans/yearbook/senior-class-1970.jpg --file=./path/to/scan.jpg
```

### 6. Deploy

```bash
cd chs1970-app
npm run build
wrangler pages deploy .next --project-name=chs1970-time-capsule
```

## File Map

```
chs1970/
├── README.md              # Full documentation
├── STATUS.md              # Current status + checklist
├── AGENT.md               # This file
├── wrangler.toml          # Cloudflare config (needs database_id update)
├── schema.sql             # D1 schema (4 tables + indexes)
├── seed-data.sql          # Sample data (20 classmates, 5 memorials, 15 gallery, 10 events)
└── chs1970-app/           # Next.js app
    ├── src/app/           # Pages + API routes
    ├── src/components/    # React components
    └── src/lib/           # Types + services
```

## Key Decisions Made

- **Next.js 16 App Router** over Remix (better Cloudflare Pages Functions support)
- **Edge runtime** for all API routes (`export const runtime = 'edge'`)
- **D1 direct queries** (no ORM — lightweight for this scale)
- **R2 direct serving** via `/api/r2?key=` endpoint
- **Default timeline events** hardcoded as fallback if D1 is empty
- **Tailwind v4** with `@theme` directive for custom colors
- **No auth** — this is a read-only public tribute site

## Gotchas

1. `wrangler.toml` has `YOUR_D1_DATABASE_ID` placeholder — must update after `wrangler d1 create`
2. Gallery images will be broken until R2 uploads happen
3. Classmate data is placeholder — needs real roster
4. Windows PowerShell doesn't support `&&` — use `;` or separate commands
5. `@opennextjs/cloudflare` install may timeout — be patient or install deps individually
