---
title: Bundle Optimization
description: >-
  Tree-shake @dedalik/use-react: per-hook imports, Vite and webpack bundle tips,
  lean production builds.
---

# Bundle Optimization

You can use either named imports or direct per-hook imports. For the smallest bundle and predictable tree-shaking, prefer direct imports when you only need one hook.

For this documentation and all examples in this project, we use direct imports so teams can copy snippets
without revisiting import strategy later.

## Recommended: direct import (single hook)

```tsx
import useDebounce from '@dedalik/use-react/useDebounce'
import useMediaQuery from '@dedalik/use-react/useMediaQuery'
```

## Direct import for multiple hooks

```tsx
import useDebounce from '@dedalik/use-react/useDebounce'
import useMediaQuery from '@dedalik/use-react/useMediaQuery'
```

Use one import line per hook. This keeps import boundaries explicit and avoids accidental package-root imports.

## When to choose which

- **Single hook:** use direct import.
- **Several hooks:** keep direct imports line-by-line for explicit control.
- **Legacy/unknown bundler setup:** direct import is the safest optimization path.

## Recommended project policy

- Keep docs and starter templates on direct imports.
- Keep direct imports as the default in internal app code and public examples.
- Run bundle analysis during CI for large apps to confirm that unused hooks are not included.
