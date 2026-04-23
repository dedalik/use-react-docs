---
title: Configurations
description: >-
  Configure TypeScript, bundlers, and SSR safety for @dedalik/use-react hooks in
  production React apps.
---

# Configurations

This page summarizes configuration decisions that affect reliability, bundle size, and compatibility in production.
Use it as a quick checklist when setting up a new project or reviewing an existing one.

## Bundler optimization

The package supports:

- `sideEffects: false`
- direct subpath imports: `@dedalik/use-react/<hook>`

Direct imports reduce ambiguity and make optimization intent obvious in code review.

## TypeScript

All hooks ship with declaration files. This gives you inference for hook return values and safer refactors.

```ts
import type { UseAbortControllerReturn } from '@dedalik/use-react/useAbortController'
```

## SSR safety

Hooks that touch browser APIs use runtime checks. For critical SSR paths, initialize with safe defaults and hydrate on client.

## Recommended defaults for app teams

- Prefer direct imports in feature code.
- Keep hooks package updates grouped into dedicated dependency PRs.
- Run CI with build + tests whenever hook APIs or docs examples change.
