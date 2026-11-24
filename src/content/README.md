# Adding content without touching React components

Create a Markdown file in `stories/`. The filename becomes its web address: `climate-data-update.md` becomes `/stories/climate-data-update`.

Start every file with:

```md
---
title: "Your story title"
date: "2026-11-24"
excerpt: "A one-sentence summary used on the listing page."
---
```

Then write the page with normal Markdown. Content is loaded during the React build and published as static HTML; no Jekyll build or duplicate theme is involved.
