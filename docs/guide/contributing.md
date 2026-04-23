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

## Writing high-signal PR descriptions

Include:

- the problem being solved,
- why this approach was selected,
- how reviewers can verify behavior quickly.
