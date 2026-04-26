# Contributing to the useReact documentation site

This repository powers [usereact.org](https://usereact.org) (VitePress). Use English for documentation and UI copy.

## Setup

```bash
git clone https://github.com/dedalik/use-react-docs.git
cd use-react-docs
npm ci
```

## Code style

Formatting uses **Prettier**, aligned with the main [`use-react`](https://github.com/dedalik/use-react) package (single quotes, no semicolons, trailing commas).

| Command                | Purpose                                                         |
| ---------------------- | --------------------------------------------------------------- |
| `npm run format`       | Format Markdown, theme sources, and `utils/` scripts            |
| `npm run format:check` | Verify formatting (used in CI)                                  |

EditorConfig (`.editorconfig`) sets two-space indentation and UTF-8 for consistent diffs across editors.

## Useful scripts

| Command          | Purpose                    |
| ---------------- | -------------------------- |
| `npm run docs:dev` | Local dev server         |
| `npm run docs:build` | Production build + sitemap |
| `npm run docs:seo`   | Refresh meta descriptions where configured |

## Bundle size data (`docs/export-size.json`)

`predocs:build` runs `utils/generate-export-size.mjs`. If `../use-react/dist/esm/hooks` exists (after `npm run build` in a sibling [`use-react`](https://github.com/dedalik/use-react) clone), sizes are regenerated. On **Vercel**, **GitHub Actions**, and other docs-only checkouts that directory is missing: the step **skips** and the site uses the **committed** `docs/export-size.json`. To refresh numbers locally, build the library first, then run `npm run exportsize:generate` or `npm run docs:build`.

## Pull requests

- Do **not** add editor trailers (for example `Made-with: Cursor`) to commit message bodies; keep the subject line and optional project-focused body only.
- Run `npm run format:check` and `npm run docs:build` before opening a PR.
- Register new guide pages in `docs/.vitepress/config.mts` and follow notes in `docs/guide/contributing.md` when adding hooks or SEO-related files.

## Deploying on Vercel

This repo pins **Node.js 24.x** via `package.json` `engines` and `.nvmrc` so Vercel and CI stay on a supported runtime (GitHub Actions uses Node 24 with `actions/setup-node@v5`).

If a project was created with an old default, open **Vercel → Project → Settings → General → Node.js Version** and choose **24.x** (or match `.nvmrc`). The committed `vercel.json` sets `installCommand`, `buildCommand`, and `outputDirectory` for the VitePress output under `docs/.vitepress/dist`.
