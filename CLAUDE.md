# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

This repo is the live, official Lacuna Fund website (lacunafund.org), deployed via GitHub Pages. It's a TanStack Start / React / TypeScript app built with [Lovable](https://lovable.dev), styled with Tailwind CSS and shadcn/ui (`components.json`, "new-york" style). It was previously a static HTTrack mirror/backup of an older site; that entire mirror (`lacunafund-httrack-backup/`, `src/banner_manager.py`, the cookiecutter-data-science scaffolding) was fully replaced by this rebuild — don't look for or recreate any of that.

The site is **fully static at runtime**: no backend, no database, no server-side APIs. All content lives in `src/data/site.ts` (nav, page copy, links) and `src/data/datasets.json` (the dataset catalogue), bundled at build time. Every route is prerendered to static HTML (see `pages` list in `vite.config.ts`).

## Leftover, unused files

`data/`, `data_statement.md`, `docs/` (Sphinx), `reports/` (top-level), `requirements.txt`, `setup.py`, `old-dns/` are all leftovers from the previous Python/cookiecutter-data-science repo. Nothing in the current app references them — the site's actual PDFs live in `public/reports/` and are referenced from `src/data/site.ts`. Don't assume these old paths are load-bearing; they're candidates for cleanup, not documentation.

## Commands

```bash
bun install            # install deps (bun is the package manager — bun.lock is authoritative)
bun run dev             # vite dev server
bun run build           # production build; prerenders every route to static HTML
bun run preview         # preview the production build
bun run lint             # eslint .
bun run format           # prettier --write .
```

There is no test suite in this repo.

## Architecture

- **Routing**: TanStack Start file-based routing under `src/routes/`. Every `.tsx` file there is a route; `src/routes/__root.tsx` is the app shell (see `src/routes/README.md` for the file-naming conventions — dynamic `$id`, splat `$`, layout `_layout`, etc.). `src/routeTree.gen.ts` is auto-generated — never hand-edit it.
- **Content**: `src/data/site.ts` holds nav structure and all page copy/links (edit this, not the components, for copy changes). `src/data/datasets.json` holds the static dataset catalogue actually shipped in the build.
- **Live dataset sync**: `src/lib/google-sheet-datasets.ts` can pull dataset rows live from a Google Sheet (`gviz` JSON endpoint, hardcoded `spreadsheetId`/`sheetId`) and categorizes each row into agriculture/health/language/climate via keyword regex matching on its text fields. Check whether a given dataset page uses this live fetch or the static `datasets.json` before assuming one or the other is authoritative.
- **i18n**: `src/i18n/en.ts` is the source-of-truth English copy bundle; the comment there says other locales (es/fr/sw) should mirror its shape, but only `en.ts` currently exists. Runtime language switching (`src/components/LanguageSwitcher.tsx`) works via the **Google Translate widget** (cookie-based, `googtrans` cookie), not per-locale content files — so don't assume adding an `es.ts`/`fr.ts` file alone would change what's rendered; the switcher needs wiring to actually use it.
- **UI kit**: shadcn/ui components live in `src/components/ui/` (generated, style "new-york", Tailwind, `@/` path alias to `src/`). `src/components/ui-kit.tsx` and `src/components/AppShell.tsx`/`BasePage.tsx`/`DomainPage.tsx` are the higher-level page-layout primitives most routes build on.
- **Error handling**: `src/server.ts` wraps the TanStack Start server entry to catch and normalize SSR errors (including ones h3 would otherwise swallow into a bare 500 JSON body) into a rendered error page (`src/lib/error-page.ts`). `src/start.ts` defines request middleware (error handling + CSRF protection for server functions) — it's required for CSRF protection to stay active; don't delete it.

## Deployment

`.github/workflows/github-pages.yml` deploys on push to `master` (or manual `workflow_dispatch`): `bun install --frozen-lockfile` → `bun run build` → upload `.output/public` as the Pages artifact → `actions/deploy-pages@v4`. `DEPLOY.md` documents the general static-export process (including base-path config for non-custom-domain GitHub Pages URLs) but references a `dist` output dir — the actual CI workflow uses `.output/public`; trust the workflow over `DEPLOY.md` if they disagree.

## DNS / custom domain

`lacunafund.org` is the custom domain (see `CNAME`), managed at easyDNS (registrar and DNS host). The apex (`@`) and `www` GitHub Pages DNS records must satisfy GitHub's Pages custom-domain validation (A/AAAA for apex, CNAME for `www`) — check `https://github.com/dsfsi/lacunafund-mirror/settings/pages` for current domain verification status if the site appears down. There is also a dormant, inactive Cloudflare zone for this domain (leftover from an earlier, abandoned Cloudflare Pages attempt) — the domain's real nameservers point at easyDNS, not Cloudflare, and that's intentional.
