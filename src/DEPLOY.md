# Deploying to GitHub Pages

This site is fully static: no backend, no database, no server-side APIs. All
content lives in `src/data/` and is bundled into the build.

## 1. Build

```bash
bun install
bun run build
```

Prerendering is enabled in `vite.config.ts`, so every route is emitted as static
HTML (`/`, `/about`, `/governance/...`, `/datasets/...`, `/apply`).

## 2. Base path

If you publish to `https://<user>.github.io/<repo>/`, set the base path before
building:

```ts
// vite.config.ts
export default defineConfig({
  vite: { base: "/<repo>/" },
  tanstackStart: { ... },
});
```

Leave it unset for a user/organisation page (`https://<user>.github.io/`) or a
custom domain.

## 3. Publish

Copy the generated static output into the branch or folder GitHub Pages serves
(for example the `gh-pages` branch, or `docs/` on `main`), and add an empty
`.nojekyll` file at its root so folders beginning with `_` are served.

A minimal workflow:

```yaml
name: Deploy
on: { push: { branches: [main] } }
permissions: { contents: read, pages: write, id-token: write }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install --frozen-lockfile
      - run: bun run build
      - run: touch dist/.nojekyll
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: github-pages
    steps:
      - uses: actions/deploy-pages@v4
```

Adjust `path:` to the directory your build writes the prerendered HTML to.

## 4. Adding a page

1. Add content to `src/data/site.ts`.
2. Create `src/routes/<name>.tsx` using `AppShell` + `BasePage` (copy any
   existing page, e.g. `src/routes/about.tsx`).
3. Add the link to `navigation` in `src/data/site.ts`.

## Replacing image placeholders

Every `<ImagePlaceholder />` is a drop-in slot. Put the real file in
`src/assets/`, import it, and pass it as `src`.
