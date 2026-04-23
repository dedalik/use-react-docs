---
title: Contributing
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
- Regenerate bundle size data with `npm run docs:build` (runs `export-size` first) when `@dedalik/use-react` exports change.

## Writing high-signal PR descriptions

Include:

- the problem being solved,
- why this approach was selected,
- how reviewers can verify behavior quickly.
