// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Emit static HTML for every route so the site can be served by any static
    // host (e.g. GitHub Pages) with no backend, database, or SSR at runtime.
    pages: [
      { path: "/" },
      { path: "/about" },
      { path: "/apply" },
      { path: "/datasets" },
      { path: "/datasets/agriculture" },
      { path: "/datasets/climate" },
      { path: "/datasets/health" },
      { path: "/datasets/language" },
      { path: "/governance" },
      { path: "/governance/funders" },
      { path: "/governance/steering-committee" },
      { path: "/governance/technical-advisory-panels" },
    ],
    prerender: {
      enabled: true,
      autoStaticPathsDiscovery: false,
      // Every HTML page is listed above; do not try to prerender linked files
      // such as PDFs as if they were application routes.
      crawlLinks: false,
    },
  },
});
