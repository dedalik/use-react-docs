---
title: Get Started
description: >-
  Install @dedalik/use-react: tree-shakable React hooks for TypeScript, Vite,
  Next.js, and React 17-19. Quick start with per-hook imports.
---

# Get Started

`@dedalik/use-react` is a utility-first hooks library focused on practical React development.
It gives you production-ready hooks for state, browser APIs, async flows, and UI behavior without forcing
extra abstractions on your codebase.

This guide shows the fastest way to integrate hooks and keep bundle size predictable from day one.

## Install

```bash
npm i @dedalik/use-react
```

## Fast import patterns

```tsx
import useDebounce from "@dedalik/use-react/useDebounce";
import useMediaQuery from "@dedalik/use-react/useMediaQuery";
```

Prefer direct imports when you want the safest bundle optimization path. This approach works especially well
in mixed or legacy bundler environments where tree-shaking behavior might differ.

## First example

```tsx
import { useState } from "react";
import useDebounce from "@dedalik/use-react/useDebounce";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  return (
    <div>
      <input value={query} onChange={(event) => setQuery(event.target.value)} />
      <p>Debounced: {debouncedQuery}</p>
    </div>
  );
}
```

## Next steps

- Read [How to](/guide/how-to) for stack-specific checklists (Vite, Next.js), SSR notes, and debugging flow.
- Move to [Best Practice](/guide/best-practice) to learn how to pick the right hook category for each feature.
- Open [Bundle Optimization](/guide/bundle-optimization) to choose import strategy by project size and bundler setup.
- Use [Functions](/functions/) to explore copy-paste implementations when you need lower coupling.
