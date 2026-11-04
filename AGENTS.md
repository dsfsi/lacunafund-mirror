# AGENTS.md

Guidance for AI coding agents working in this repository.

## What this repo is

This repo is the live, official Lacuna Fund website (lacunafund.org), deployed via GitHub Pages. It's a TanStack Start / React / TypeScript app built with [Lovable](https://lovable.dev), styled with Tailwind CSS and shadcn/ui. It previously held a static HTTrack mirror/backup of an older site; that mirror and its tooling were fully replaced by this rebuild — don't look for or recreate it.

The site is fully static at runtime (no backend, no database, no server-side APIs). All content lives in `src/data/site.ts` and `src/data/datasets.json`, bundled at build time, and every route is prerendered to static HTML.

## Leftover, unused files

`data/`, `data_statement.md`, `docs/` (Sphinx), `reports/` (top-level), `requirements.txt`, `setup.py`, `old-dns/` are leftovers from the previous Python/cookiecutter-data-science repo — nothing in the current app references them. The site's real PDFs live in `public/reports/`, referenced from `src/data/site.ts`.

## Commands

```bash
bun install
bun run dev       # vite dev server
bun run build     # prerenders every route to static HTML
bun run preview
bun run lint       # eslint .
bun run format     # prettier --write .
```

No test suite exists in this repo. `bun.lock` is authoritative — use `bun`, not `npm`/`yarn`, even though a stale `package-lock.json` is also present.

## Architecture

- **Routing**: TanStack Start file-based routing under `src/routes/` — see `src/routes/README.md` for naming conventions (`$id` dynamic, `$` splat, `_layout`, `__root.tsx` app shell). `src/routeTree.gen.ts` is auto-generated; never hand-edit it.
- **Content**: edit `src/data/site.ts` for nav/copy/links, `src/data/datasets.json` for the static dataset catalogue — not the components — for content changes.
- **Live dataset sync**: `src/lib/google-sheet-datasets.ts` can pull dataset rows live from a Google Sheet and auto-categorizes them (agriculture/health/language/climate) via keyword regex. Check whether a given route actually uses this live fetch vs. the static `datasets.json` before changing either.
- **i18n**: `src/i18n/en.ts` is the source-of-truth copy bundle; other locales (es/fr/sw) are referenced in a comment as intended mirrors but don't exist yet. The visible language switcher (`src/components/LanguageSwitcher.tsx`) uses the Google Translate widget (cookie-based), not per-locale files — adding an `es.ts` alone won't change rendered output without also wiring the switcher to use it.
- **UI kit**: shadcn/ui components in `src/components/ui/` (style "new-york", `@/` alias to `src/`, see `components.json`). Page layout primitives: `AppShell.tsx`, `BasePage.tsx`, `DomainPage.tsx`, `ui-kit.tsx`.
- **Error handling**: `src/server.ts` wraps the SSR entry to normalize errors into a rendered error page; `src/start.ts` wires request middleware including CSRF protection for server functions — keep it in place.

## Deployment

Push to `master` triggers `.github/workflows/github-pages.yml`: `bun install --frozen-lockfile` → `bun run build` → upload `.output/public` → `actions/deploy-pages@v4`. `DEPLOY.md` describes the general static-export process but mentions a `dist` output dir; the real CI workflow uses `.output/public` — trust the workflow if the two disagree.

## DNS

Registrar and DNS host are split, on purpose:

- **Registrar: easyDNS.** Registration ("Domain Plus with .ORG Registration") is prepaid through 11-May-2030 — don't touch it.
- **DNS host: Cloudflare** (free plan), as of November 2026. Moved from easyDNS because easyDNS's free query cap (250,000/month) was being blown through by 10-50x (8-13M queries/month starting right after the site relaunch) — implausible as organic traffic, likely abuse, and billed as overages regardless of cause. Cloudflare's free plan doesn't meter DNS query volume, so hosting DNS there removes the billing exposure.
- Records mirror the old easyDNS zone exactly (4×A + 4×AAAA apex → GitHub Pages IPs, `CNAME www → www.dsfsi.co.za`, 2× `_acme-challenge` TXT), all set to **DNS only** (not proxied), so GitHub Pages custom-domain validation sees the same records as before. Don't flip these to proxied (orange cloud) without checking it doesn't break that validation.

GitHub Pages custom-domain validation requires A/AAAA on the apex and a CNAME on `www` — check `https://github.com/dsfsi/lacunafund-mirror/settings/pages` if domain issues come up.
