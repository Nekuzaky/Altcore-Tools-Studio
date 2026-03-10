# Altcore Tools Studio

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)

Altcore Tools Studio is a premium, dark, fast multi-tool platform for developers, Discord communities, creators, gamers, and Unity users.

The project is fully browser-first, scalable through config-driven architecture, and designed for SEO, discovery, and tool retention.

## Live Product Goals

- Fast utility tools with zero backend dependency for most features
- Strong discovery via Home, Category pages, and `/all-tools`
- Config-driven growth (add new tools without rewriting core pages)
- SEO-ready metadata system for homepage, categories, and tool pages
- Premium developer-focused UI (clean, modern, mobile-first)

## Tech Stack

- React
- TypeScript
- Vite
- TailwindCSS
- React Router

## Core Features

- Config-driven tool registry (`src/config/tools.ts`)
- Config-driven categories (`src/config/categories.ts`)
- Shared layout system (AppShell, Navbar, Footer, ToolLayout)
- Shared discovery components (ToolCard, ToolGrid, RelatedTools, CategoryPills)
- `/all-tools` discovery page with search, filters, sorting, and category highlights
- Multilingual support (English + French)
- Theme support (dark, light, midnight)
- SEO engine with canonical, Open Graph, Twitter metadata, robots handling
- Unity category with a large set of practical Unity code/snippet tools

## Project Structure

```txt
src/
  app/
    router.tsx
    seo.ts
    providers.tsx
    i18n.tsx
    theme.tsx

  components/
    layout/
    shared/
    ui/

  config/
    site.ts
    categories.ts
    tools.ts
    routes.ts

  features/
    [tool-slug]/
      page.tsx
      components/

  pages/
    HomePage.tsx
    AllToolsPage.tsx
    CategoryPage.tsx
    AboutPage.tsx
    NotFoundPage.tsx

  i18n/
    en.ts
    fr.ts
    index.ts
```

## Prerequisites

- Node.js 20+ recommended
- npm 10+ recommended

## Installation

```bash
npm install
```

## Local Development

```bash
npm run dev
```

Open the app at:

- `http://localhost:5173`

## Production Build

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Type Check

```bash
npm run typecheck
```

## Environment Variables

Create a local `.env` file from `.env.example`:

```bash
cp .env.example .env
```

PowerShell:

```powershell
Copy-Item .env.example .env
```

### Supported Variables

| Variable | Description | Example |
|---|---|---|
| `VITE_SITE_URL` | Public site URL used for SEO and canonical context | `https://tools.altcore.fr` |
| `VITE_ANALYTICS_ID` | Optional analytics identifier | `your_analytics_id_here` |

## Sensitive Files Policy

Do not commit secrets or private runtime values.

Rules:

- Keep private files out of Git.
- Commit only safe templates with `.example` suffix.
- For each sensitive file, provide a matching `*.example` file.

Example pattern:

- `.env` -> commit `.env.example`
- `some-private-config.ts` -> commit `some-private-config.ts.example`

## SEO Architecture

SEO is handled in two layers:

1. Static baseline in `index.html`
2. Runtime route-level SEO in `src/app/seo.ts` via `SeoHead`

Per-page SEO supports:

- title
- description
- canonical URL
- Open Graph tags
- Twitter card tags
- robots meta (`index`/`noindex`)
- optional keywords

## Search Console + Analytics (Visibility Tracking)

To measure visibility and growth, connect both:

1. Google Search Console (SEO visibility)
2. Google Analytics 4 (user behavior)

### 1) Google Search Console Setup

1. Open Google Search Console and add property: `https://tools.altcore.fr`
2. Verify ownership (DNS recommended)
3. Submit sitemap: `https://tools.altcore.fr/sitemap.xml`
4. Keep `robots.txt` accessible at `https://tools.altcore.fr/robots.txt`

Track these reports weekly:

- Impressions
- Clicks
- CTR
- Average position
- Top pages
- Top queries

### 2) Google Analytics 4 Setup

1. Create a GA4 web data stream.
2. Add your Measurement ID to `.env`:

```env
VITE_ANALYTICS_ID=G-XXXXXXXXXX
```

3. Rebuild/redeploy.

What is tracked:

- `page_view` on route changes
- `tool_view` when a tool page is opened

### Visibility KPI Baseline

Use a simple weekly dashboard:

- Search Console:
  - Total impressions
  - Total clicks
  - CTR
  - Average position
  - Top 20 pages by clicks
- GA4:
  - Landing pages
  - Engaged sessions per tool
  - Event counts for `tool_view`

## Add a New Tool (Scalable Workflow)

1. Create a new feature folder:

```txt
src/features/your-tool-slug/page.tsx
```

2. Register metadata in `src/config/tools.ts`:

- `slug`
- `name`
- `description`
- `category`
- `route`
- `keywords`
- `title`
- `metaDescription`
- optional flags (`featured`, `popular`, `isNew`, `related`)

3. Register the page component in `src/app/router.tsx`.

4. Tool automatically appears in:

- Home sections (if flagged)
- `/all-tools`
- category pages
- related tools blocks
- search/filter system

## Design and Product Rules

- Keep UI dark, clean, and professional
- Prioritize usability over decoration
- Avoid fake placeholder tools
- Preserve Altcore brand identity and logo usage
- Keep interactions fast and mobile-friendly

## Deployment Notes

- `public/robots.txt` already includes sitemap reference
- `public/site.webmanifest` is configured
- Ensure `VITE_SITE_URL` matches your deployed domain

## License

This repository is private by default unless you explicitly add an open-source license file.
