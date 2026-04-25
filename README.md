# useReact documentation

Official documentation and marketing site for [**useReact**](https://usereact.org) - the hook collection published as [`@dedalik/use-react`](https://www.npmjs.com/package/@dedalik/use-react) on npm.

This repository is a **[VitePress](https://vitepress.dev/)** project: guides, API reference for every hook, a custom theme (Vue + Tailwind), and small Node utilities that generate sidebars, sitemaps, and optional bundle-size data.

## API snapshot

- **Current exports:** `188` (hooks + utilities)
- **Canonical naming:** all hook APIs use `use*` prefixes (`useWatch*`, `useWhenever`, `useRef*`)
- **Transition hook:** `usePresenceTransition` (renamed to avoid collision with React's built-in `useTransition`)
- **Export size source:** `docs/export-size.json` (generated from sibling `../use-react/dist`)

### Core sections on docs site

- `State`
- `Elements`
- `Browser`
- `Sensors`
- `Network`
- `Animation`
- `Component`
- `Watch`
- `Reactivity`
- `Array`
- `Time`
- `Utilities`

## Requirements

- **Node.js 24.x** (see `engines` in `package.json` and `.nvmrc`) - matches GitHub Actions and recommended Vercel settings.

## Quick start

```bash
git clone https://github.com/dedalik/use-react-docs.git
cd use-react-docs
npm ci
npm run docs:dev
```

Open the URL VitePress prints (usually `http://localhost:5173`). Edit Markdown under `docs/`; the dev server hot-reloads.

## Scripts

| Command                          | Description                                                                        |
| -------------------------------- | ---------------------------------------------------------------------------------- |
| `npm start` / `npm run docs:dev` | Local development server                                                           |
| `npm run docs:build`             | Production build → `docs/.vitepress/dist` + `utils/generate-sitemap.mjs`           |
| `npm run docs:preview`           | Preview the last production build                                                  |
| `npm run docs:seo`               | Run `utils/inject-seo.mjs` to refresh meta descriptions where configured           |
| `npm run exportsize:generate`    | Regenerate `docs/export-size.json` when a sibling `../use-react/dist` build exists |
| `npm run format`                 | Prettier - Markdown, Vue, CSS, theme TS, and `utils/*.mjs`                         |
| `npm run format:check`           | CI-style formatting check                                                          |

`docs:build` runs **`predocs:build`** first (`exportsize:generate`). In CI or on hosts without a local `use-react` build, export-size generation **skips** and the site uses the committed **`docs/export-size.json`**.

## Repository layout

| Path               | Role                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| `docs/`            | VitePress content: home, guides, generated hook pages                                             |
| `docs/.vitepress/` | Config (`config.mts`), theme (`theme/`), SEO helpers (`seo/`), build output (`dist/` after build) |
| `docs/public/`     | Static assets (favicons, `robots.txt`, etc.)                                                      |
| `utils/`           | Node scripts: sitemap, SEO injection, export-size, hook catalog helpers                           |

Hook sidebar and listings are driven by the shared catalog under `docs/.vitepress/data/` and related utilities - see **`docs/guide/contributing.md`** when adding or renaming hooks.

When hook names change, update these sources together:

- `docs/.vitepress/data/hookCatalog.ts` (navigation and grouping)
- `docs/functions/*.md` (per-hook pages, frontmatter, examples)
- `docs/export-size.json` (size table used in docs and package README)

## Deployment

- **Production site:** [usereact.org](https://usereact.org)
- **Vercel:** `vercel.json` pins install/build commands and `outputDirectory: docs/.vitepress/dist`. Match **Node 24.x** in the Vercel project settings if an older default is still set.

## Related repository

Library source, tests, and npm releases live in **[dedalik/use-react](https://github.com/dedalik/use-react)**. Clone it **next to** this repo if you want live `export-size` regeneration:

```text
parent/
  use-react/       # npm run build → dist/
  use-react-docs/  # this repo
```

## Contributing

See **[CONTRIBUTING.md](./CONTRIBUTING.md)** for formatting rules, CI expectations, and Vercel notes.

## License

Documentation and site code are provided under the same spirit as the library (**MIT**). See the [`use-react` LICENSE](https://github.com/dedalik/use-react/blob/main/LICENSE) for the hooks package.
