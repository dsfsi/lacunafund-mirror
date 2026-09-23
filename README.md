# Lacuna Fund Website

The live, official website for [Lacuna Fund](https://lacunafund.org) — a funder collaborative mobilizing funding for labeled datasets that solve urgent problems in low- and middle-income contexts globally. Deployed to [lacunafund.org](https://lacunafund.org) via GitHub Pages.

This project is built with [Lovable](https://lovable.dev).

## Development

You need [Bun](https://bun.sh) installed (`bun.lock` is authoritative — don't use `npm`/`yarn`).

```sh
git clone https://github.com/dsfsi/lacunafund-mirror.git
cd lacunafund-mirror
bun install
bun run dev
```

Other scripts: `bun run build` (production build, prerenders every route to static HTML), `bun run preview`, `bun run lint`, `bun run format`.

To edit site content (navigation, page copy, links, dataset catalogue), edit `src/data/site.ts` and `src/data/datasets.json` rather than the page components — see `AGENTS.md`/`CLAUDE.md` for the fuller architecture rundown.

## Deploying

See `DEPLOY.md` for the static-export process, and `.github/workflows/github-pages.yml` for the actual CI deploy (push to `master`).

## Build with Lovable

Open this project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
- shadcn/ui
