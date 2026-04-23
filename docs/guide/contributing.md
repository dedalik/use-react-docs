---
title: Contributing
description: >-
  Contribute to @dedalik/use-react and docs: hook catalog, tests,
  ssr-support.json, and focused pull requests.
---

# Contributing

We welcome contributions to hooks, tests, and docs.

The project is open to both small fixes and larger feature proposals. If you are not sure where to start,
improving docs examples or test quality is always a valuable contribution.

## Local workflow

```bash
npm install
npm run test
npm run lint
```

## Before opening a PR

- Confirm behavior in a realistic usage example.
- Check that docs snippets compile conceptually and match current API.
- Keep each PR focused on one unit of change (hook, docs section, or infra improvement).

## Pull request checklist

- Keep scope focused.
- Add tests for behavior changes.
- Update docs page for changed hook APIs.
- Use clear Conventional Commit messages.

## Documentation site: new or renamed hooks

The Functions sidebar and the home page category grid both read from a single catalog:

- `docs/.vitepress/data/hookCatalog.ts` - add the hook under the right category (links and `sidebarCollapsed` for the group).
- `docs/ssr-support.json` - set `true` when the hook is safe with `window` / `document` absent, otherwise `false`.
- Add new guide pages under `docs/guide/` and register them in `docs/.vitepress/config.mts` (sidebar `items` and optional `inject-seo.mjs` `guideDescriptions` entry for `docs:seo`).
- Regenerate bundle size data with `npm run docs:build` (runs `export-size` first) when `@dedalik/use-react` exports change.

## SEO and sitemap

- Page titles use `titleTemplate` in `docs/.vitepress/config.mts` (`:title | useReact`). Set `titleTemplate: false` on a page when the title is already complete (for example the home page).
- Run `npm run docs:seo` to (re)fill `description` in Markdown from templates. After large edits run `node utils/inject-seo.mjs --force` so every doc page gets a fresh meta description. The home page `docs/index.md` is skipped so its frontmatter stays hand-tuned.
- Per-page `<link rel="canonical">`, robots, author, publisher, `og:url`, and JSON-LD (`Organization`, `WebSite`, `WebPage`) are injected at build time via `transformHead` in `docs/.vitepress/config.mts` and `docs/.vitepress/seo/transformHead.ts`. Set `SITE_URL` so canonicals match production (same variable as the sitemap script).
- `npm run docs:build` writes `docs/.vitepress/dist/sitemap.xml`. Override the public URL with `SITE_URL=https://your.domain` when the production host is not the default.
- `docs/public/robots.txt` points crawlers at `https://usereact.org/sitemap.xml` - update the domain there if it changes.

## Writing high-signal PR descriptions

Include:

- the problem being solved,
- why this approach was selected,
- how reviewers can verify behavior quickly.
