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

## Pull requests

- Run `npm run format:check` and `npm run docs:build` before opening a PR.
- Register new guide pages in `docs/.vitepress/config.mts` and follow notes in `docs/guide/contributing.md` when adding hooks or SEO-related files.

## Deploying on Vercel

This repo pins **Node.js 20.x** via `package.json` `engines` and `.nvmrc` so builds do not pick discontinued runtimes (for example Node 18).

If a project was created with an old default, open **Vercel → Project → Settings → General → Node.js Version** and choose **20.x** (or match `.nvmrc`). The committed `vercel.json` sets `installCommand`, `buildCommand`, and `outputDirectory` for the VitePress output under `docs/.vitepress/dist`.
