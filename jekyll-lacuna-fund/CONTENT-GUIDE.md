# Editing Lacuna Fund without code

Most regular updates are plain-text edits in GitHub's web editor:

- Pages: edit the matching `.md` file in the project root, `datasets/`, or `governance/`. Text below the first `---` is standard Markdown.
- Dataset catalogue: edit `_data/datasets.yml`. Each dataset has a title, `fields`, and optional `body` paragraphs; no template edit is required.
- Navigation: edit `_data/navigation.yml`.
- Images and PDFs: upload replacements to `assets/images/` or `assets/reports/`, then update the image/link path in the relevant Markdown page.

Do not edit `_layouts/lacuna.html`, `_includes/`, or `_sass/lacuna.scss` for ordinary content changes: those files control shared structure and the Lacuna visual theme.

Preview locally with `bundle install` then `bundle exec jekyll serve`. GitHub Pages can build the site directly from this folder once it is made the publishing source.
