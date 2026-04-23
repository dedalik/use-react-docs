---
title: How to use useReact hooks with TypeScript
sidebar_label: How to
description: >-
  Step-by-step how to use @dedalik/use-react: install from npm, import hooks for tree-shaking, wire them in
  components, pick APIs from the Functions catalog, FAQ for CRA, Vite, Next.js App Router, and ship with SSR in mind.
---

# How to use useReact hooks

This page is a practical **how-to** for developers who want to adopt [`@dedalik/use-react`](https://www.npmjs.com/package/@dedalik/use-react) quickly.
You will learn the install path, import patterns that keep **bundles small**, where to read **TypeScript**-friendly API docs, and how to stay safe with **SSR** when a hook touches the browser.

If you prefer a shorter onboarding, start with [Get Started](/guide/get-started) and return here when you want checklists and common stacks (Vite, Next.js).

## How to install `@dedalik/use-react`

Use your package manager of choice:

```bash
npm i @dedalik/use-react
```

```bash
pnpm add @dedalik/use-react
```

```bash
yarn add @dedalik/use-react
```

Peer dependencies are **React** and **React DOM** (17+ through current stable releases). Keep versions aligned with your app so TypeScript and runtime behavior match what the hooks expect.

## How to import a hook for tree-shaking

Prefer **per-hook entry points** when you care about predictable dead-code elimination:

```tsx
import useDebounce from "@dedalik/use-react/useDebounce";
import useWindowSize from "@dedalik/use-react/useWindowSize";
```

You can still import from the **barrel** when prototyping:

```tsx
import { useDebounce, useWindowSize } from "@dedalik/use-react";
```

For production bundles, the per-hook style is usually the safer default. See [Bundle Optimization](/guide/bundle-optimization) for bundler-specific notes.

## How to use a hook inside a React component

1. **Call hooks at the top level** of a function component or another custom hook (follow the [Rules of Hooks](https://react.dev/reference/rules/rules-of-hooks)).
2. **Pass refs and options** exactly as the function page describes - many APIs accept a `RefObject` and optional configuration objects.
3. **Read the Usage block** on each hook page - examples are copy-paste ready and match the published types.

Minimal pattern:

```tsx
import { useRef } from "react";
import useClickOutside from "@dedalik/use-react/useClickOutside";

export function Panel() {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => console.log("outside"));
  return <div ref={ref}>Content</div>;
}
```

## How to find the right hook for your task

Browse the **[Functions](/functions/)** overview and filter by **category** (State, Browser, Sensors, Network, Time, and more).
Each hook has its own page with **overview**, **parameters**, **return value**, and **SSR** hints where relevant.

Common starting points:

- **Debounce or throttle user input** - `useDebounce`, `useThrottle`
- **Media and layout** - `useMediaQuery`, `useWindowSize`, `useResizeObserver`
- **Persistence** - `useLocalStorage`, `useSessionStorage`
- **Async work** - `useAsync`, `useAbortController`

## How to use useReact with Vite

Vite resolves ESM cleanly. Use per-hook imports, enable TypeScript `moduleResolution` settings that match your `tsconfig`, and rely on Vite’s default tree-shaking in production builds.

If you split vendor chunks, keep React in a stable chunk so hooks that depend on lifecycle behavior do not load in the wrong order.

## How to use useReact with Next.js

- **Client components** - add `"use client"` at the top of modules that call browser-heavy hooks (for example `useWindowSize`, `useLocalStorage` when it reads on first render).
- **Server components** - do not call browser hooks directly; wrap UI that needs them in a client child.
- **SSR** - read [Configurations - SSR safety](/guide/configurations#ssr-safety) and the compatibility notes on each hook page.

## How to handle SSR and browser-only APIs

Some hooks read `window`, `document`, or `localStorage`. The docs mark **SSR support** where it matters.
When you render on the server, guard client-only branches or defer work to `useEffect` patterns described in [Configurations](/guide/configurations).

## How to keep bundles small

- Prefer **per-hook** imports in shared libraries and apps.
- Avoid re-exporting the entire package from a single internal barrel unless you need it for DX inside a monorepo.
- Measure with your bundler’s analyzer when in doubt.

Details: [Bundle Optimization](/guide/bundle-optimization).

## How to debug unexpected behavior

1. Confirm the **hook version** matches your installed `@dedalik/use-react` release.
2. Re-read the **API** section on the hook page - defaults (delays, thresholds) often explain surprises.
3. For SSR issues, verify whether the hook expects the DOM on first render.
4. If you believe you found a bug, open an issue on the repository linked from the site header with a **minimal reproduction**.

## How to contribute or extend the library

See [Contributing](/guide/contributing) for tests, docs updates, and the shared **hook catalog** that powers navigation.

## Frequently asked questions

### Can I use `@dedalik/use-react` with Create React App or Vite?

Yes. The package is plain **ESM** JavaScript with **TypeScript** types. Point your bundler at the same import paths as in [Get Started](/guide/get-started); **Vite** and **CRA-style** webpack setups both resolve the published `exports` map.

### Does useReact support Next.js App Router and SSR?

Yes, with the usual React rule: hooks that touch the browser may need **client components** (`"use client"`) or guarded usage. Read [Configurations](/guide/configurations) for SSR notes and hook-specific flags in the docs.

### How do I find the right hook for my use case?

Browse the [Functions](/functions/) catalog: each hook has a short summary, parameters, and return shape so you can compare similar utilities (debounce vs throttle, media queries vs layout, and so on).

### Is tree-shaking automatic if I import from `@dedalik/use-react`?

**Per-hook paths** (`@dedalik/use-react/useSomething`) give bundlers the clearest graph. A root import may still tree-shake in many setups, but explicit paths are the safest default for libraries. See [Bundle Optimization](/guide/bundle-optimization).

### Where is the API reference for a single hook?

Open the hook’s page under [Functions](/functions/) - that is the canonical **API** surface for parameters, defaults, and TypeScript types.

## Related guides

- [Get Started](/guide/get-started) - install and first imports
- [Best Practice](/guide/best-practice) - structure and responsibilities
- [Configurations](/guide/configurations) - TypeScript and SSR
- [Bundle Optimization](/guide/bundle-optimization) - tree-shaking and production builds
