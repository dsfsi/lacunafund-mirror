# AGENTS.md

Guidance for AI coding agents working in this repository.

## What this repo is

A static HTTrack mirror/backup of the Lacuna Fund website (lacunafund.org), served via GitHub Pages as a fallback if the primary site goes down. It's scaffolded from the [cookiecutter data science](https://drivendata.github.io/cookiecutter-data-science/) template, but the data-science scaffolding (`src/data`, `src/features`, `src/models`, `src/visualization`) is unused boilerplate — empty stub files left over from the template generator. The only real code is `src/banner_manager.py`, which injects/removes a "this is a backup site" banner across the mirrored HTML pages.

## Layout

- `lacunafund-httrack-backup/lacunafund.org/` — the mirrored site content (HTTrack output, one directory per page). This is what actually gets deployed to GitHub Pages.
- `lacunafund-httrack-backup/banners/` — the three banner HTML components (`banner_component.html` en, `banner_component_fr.html` fr, `banner_component_es.html` es) injected into every mirrored page.
- `src/banner_manager.py` — the only functional script; manages banner insertion/removal.
- `CNAME` — GitHub Pages custom domain (`lacunafund.org`).
- `.github/workflows/github-pages.yml` — deploy workflow, triggered on push to `master`.
- `data/external/` — zipped source snapshots, not the live mirror.

## Setup

```bash
python setup.py install
pip install -r requirements.txt
```

Requires Python 3.11.3. No test suite currently exists in this repo.

## Deployment

Push to `master` triggers `.github/workflows/github-pages.yml`, which copies `lacunafund-httrack-backup/lacunafund.org/*` into `_site/` and publishes it via GitHub Pages. There's no build step — the mirrored HTML is served as-is, so changes must be made directly to files under `lacunafund-httrack-backup/lacunafund.org/`.

## Working with banners

Banners live between `<!-- BANNER_START -->` / `<!-- BANNER_END -->` markers, inserted right after `<body>` in each mirrored page. Never hand-edit banner markup directly into the mirrored pages — always go through `banner_manager.py` so removal/reinsertion stays consistent across the whole tree:

```bash
# --path must point at lacunafund-httrack-backup/ (the dir containing banners/), not lacunafund.org/
python banner_manager.py --action remove_all --path ../lacunafund-httrack-backup
python banner_manager.py --action insert --language en --path ../lacunafund-httrack-backup
python banner_manager.py --action insert --language fr --path ../lacunafund-httrack-backup
python banner_manager.py --action insert --language es --path ../lacunafund-httrack-backup
# --dry-run simulates without writing
```

Which pages get which language banner is decided by filename/path glob patterns (`LANGUAGE_PATTERNS` in `banner_manager.py`), not a sitemap or config file.

## DNS

`lacunafund.org` is managed at easyDNS. GitHub Pages custom-domain validation requires A/AAAA records on the apex and a CNAME on `www`; check `https://github.com/dsfsi/lacunafund-mirror/settings/pages` if domain validation issues come up.
