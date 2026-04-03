# Creston CCHS Class of 1970 — Digital Time Capsule

A nostalgic web application preserving the memories, stories, and spirit of the Creston Community High School Panthers who graduated in 1970.

## 🐾 Project Overview

Built for the Creston Community High School Class of 1970, this Digital Time Capsule brings together:

- **Class Directory** — Searchable roster of all 1970 graduates with an *In Memoriam* section (🕯️) for classmates who have passed
- **Digital Yearbook** — Masonry-style gallery of yearbook scans and newspaper clippings, organized by Academics, Sports, Candid, Events, and Newspaper
- **1970 Timeline** — Vertical timeline of local Creston events from that historic year
- **Resources Footer** — Curated links to external archives (Archive.org, Creston News Advertiser, Gibson Memorial Library, State Historical Society of Iowa)

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│              Cloudflare Pages                    │
│  Next.js 16 (App Router) + Tailwind CSS v4       │
├────────────┬────────────┬───────────────────────┤
│  D1 (SQLite) │  R2 Storage  │  Pages Functions   │
│  - classmates │  - yearbook   │  /api/search      │
│  - memorials │  - clippings  │  /api/gallery      │
│  - gallery   │  - photos     │  /api/timeline     │
│  - timeline  │               │  /api/directory    │
│              │               │  /api/r2           │
└────────────┴────────────┴───────────────────────┘
```

### Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Hosting** | Cloudflare Pages |
| **Database** | Cloudflare D1 (SQLite) |
| **Storage** | Cloudflare R2 (yearbook scans, photos) |
| **API** | Next.js Route Handlers (edge runtime) |
| **Styling** | Tailwind CSS v4 |
| **Theme** | "Vintage Panther" — Creston Red (#C41E3A) + Black + Parchment |

## 📁 Project Structure

```
chs1970/
├── wrangler.toml              # Cloudflare config (D1 + R2 bindings)
├── schema.sql                 # D1 database schema
├── seed-data.sql              # Sample data for all tables
├── migrations/                # D1 migration files
│
└── chs1970-app/               # Next.js application
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx     # Root layout with metadata
    │   │   ├── page.tsx       # Home page (all sections)
    │   │   ├── globals.css    # Vintage Panther theme
    │   │   └── api/
    │   │       ├── search/    # Search classmates API
    │   │       ├── gallery/   # Gallery items API
    │   │       ├── timeline/  # Timeline events API
    │   │       ├── directory/ # Full directory API
    │   │       └── r2/        # R2 image serving API
    │   ├── components/
    │   │   ├── Header.tsx
    │   │   ├── ClassDirectory.tsx
    │   │   ├── DigitalYearbook.tsx
    │   │   ├── Timeline1970.tsx
    │   │   └── ResourcesFooter.tsx
    │   └── lib/
    │       ├── types.ts       # TypeScript interfaces
    │       ├── db-service.ts  # D1 query functions
    │       └── r2-service.ts  # R2 storage functions
    ├── package.json
    └── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (`npm i -g wrangler`)
- Cloudflare account

### Setup

```bash
# Install dependencies
cd chs1970-app
npm install

# Create D1 database
wrangler d1 create chs1970-classmates
# Update wrangler.toml with the returned database_id

# Apply schema
wrangler d1 execute chs1970-classmates --local --file=../schema.sql

# Seed data
wrangler d1 execute chs1970-classmates --local --file=../seed-data.sql

# Create R2 bucket
wrangler r2 bucket create chs1970-yearbook-scans

# Run locally
npm run dev
```

### Upload Yearbook Scans to R2

```bash
# Upload images (organize by category)
wrangler r2 object put chs1970-yearbook-scans/yearbook/senior-class-1970.jpg --file=./scans/senior-class.jpg
wrangler r2 object put chs1970-yearbook-scans/clippings/basketball-championship.jpg --file=./scains/clipping.jpg
```

### Deploy

```bash
npm run build
wrangler pages deploy .next --project-name=chs1970-time-capsule
```

## 🎨 Design System

### Colors (Vintage Panther)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-panther-red` | `#C41E3A` | Primary accent, headings, CTAs |
| `--color-panther-red-dark` | `#8B1528` | Hover states, borders |
| `--color-parchment` | `#F5F0E8` | Background, cards |
| `--color-parchment-dark` | `#E8DFD0` | Alternating sections |
| `--color-amber-ink` | `#2D1B0E` | Body text |
| `--color-panther-black` | `#1A1A1A` | Footer, dark elements |

### Typography

- **Headings**: Georgia / Times New Roman (serif, vintage feel)
- **Body**: System sans-serif stack

## 📊 Database Schema

### Tables

- **`classmates`** — Name, status (alive/deceased/unknown), bio, contact info
- **`memorials`** — Memorial text, date of passing, obituary links (FK to classmates)
- **`gallery_metadata`** — Captions, dates, R2 object keys, categories, tags
- **`timeline_events`** — 1970 Creston events with dates, categories, descriptions

## 🔗 External Resources

| Resource | URL |
|----------|-----|
| Archive.org — Secondary School Directories | https://archive.org/details/secondaryschooldirectory |
| Creston News Advertiser Archives | https://www.crestonnews.com/archives |
| Gibson Memorial Library | https://www.gibsonmemoriallibrary.org |
| State Historical Society of Iowa | https://iowaculture.gov/history |

## 📝 License

This project is a community tribute. All yearbook images and newspaper clippings remain the property of their respective copyright holders.

---

**Go Panthers! 🐾**
