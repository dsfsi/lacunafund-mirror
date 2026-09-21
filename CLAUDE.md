# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

This is a static HTTrack mirror/backup of the Lacuna Fund website (lacunafund.org), served via GitHub Pages. It exists as a fallback in case the primary lacunafund.org site goes down. The repo is scaffolded from the [cookiecutter data science](https://drivendata.github.io/cookiecutter-data-science/) template, but almost none of that data-science tooling (`src/data`, `src/features`, `src/models`, `src/visualization`) is actually used — those files are empty stubs left over from the template. The one real piece of `src/` is `src/banner_manager.py`, which injects/removes a "this is a backup site" banner into every mirrored HTML page.

Key paths:
- `lacunafund-httrack-backup/lacunafund.org/` — the mirrored site content (one directory per page, HTTrack output). This is what actually gets deployed.
- `lacunafund-httrack-backup/banners/` — the three banner HTML components (`banner_component.html` en, `banner_component_fr.html` fr, `banner_component_es.html` es) that get injected into every page in the mirror.
- `src/banner_manager.py` — CLI/module for inserting/removing those banners across the mirrored HTML tree.
- `CNAME` — GitHub Pages custom domain file (currently `lacunafund.org`).
- `.github/workflows/github-pages.yml` — deploy workflow.
- `data/external/` — zipped source snapshots of the site/backup (not the live mirror).
- `old-dns/` — historical DNS screenshots, reference only.

## Deployment

GitHub Actions (`.github/workflows/github-pages.yml`) deploys automatically on push to `master`, or via manual `workflow_dispatch`. The workflow copies `lacunafund-httrack-backup/lacunafund.org/*` into a `_site/` directory and publishes that to GitHub Pages — nothing else in the repo is deployed. There is no build step; the HTML in `lacunafund-httrack-backup/lacunafund.org/` is served as-is.

## Updating the backup banner

The banner (shown at the top of every mirrored page, stating the backup date) is managed with `src/banner_manager.py`. Banners are wrapped in `<!-- BANNER_START -->` / `<!-- BANNER_END -->` markers and inserted right after `<body>`.

To change the backup date shown in the banner: edit the date string (`This is a backup site current up to DD/MM/YYYY`) in each of the three banner component files under `lacunafund-httrack-backup/banners/`, then reinsert:

```bash
# from src/, pointing --path at the mirror root (parent of banners/)
# Step 1: remove existing banners first (all languages, or one at a time)
python banner_manager.py --action remove_all --path ../lacunafund-httrack-backup

# Step 2: insert updated banners, once per language
python banner_manager.py --action insert --language en --path ../lacunafund-httrack-backup
python banner_manager.py --action insert --language fr --path ../lacunafund-httrack-backup
python banner_manager.py --action insert --language es --path ../lacunafund-httrack-backup

# add --dry-run to simulate without writing files
```

`--path` must point at the directory containing `banners/` (i.e. `lacunafund-httrack-backup/`, not `lacunafund.org/` inside it) — `banner_manager.py` resolves `banners/banner_component*.html` and the page glob patterns (`**/index.html`, `**/fr/**/*.html`, `**/es/**/*.html`, etc.) relative to that root. Language routing to pages is pattern-based (see `LANGUAGE_PATTERNS` in `banner_manager.py`), not driven by a sitemap.

Can also be driven as a module: `from banner_manager import manage_banners; manage_banners(path, action, language, dry_run)`.

## Environment

```bash
python setup.py install
pip install -r requirements.txt
```

Requires Python 3.11.3. There is no test suite in this repo currently.

## DNS / custom domain

`lacunafund.org` is the custom domain (see `CNAME`), managed at easyDNS. The apex (`@`) and `www` GitHub Pages DNS records must satisfy GitHub's Pages custom-domain validation (A/AAAA for apex, CNAME for `www`) — check `https://github.com/dsfsi/lacunafund-mirror/settings/pages` for current domain verification status if the site appears down.
