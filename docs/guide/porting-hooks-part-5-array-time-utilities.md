---
title: 'Porting hooks - Part 5: Arrays, time & utilities'
description: >-
  Planning array combinator hooks, time formatting hooks, and small utilities for
  @dedalik/use-react with documentation and tests.
---

# Part 5 - Arrays, time & utilities

## Array helpers

Reference lists many `useArray*` reducers (`useArrayFilter`, `useArrayMap`, …) and `useSorted`.

### Guidance

- Prefer **plain TypeScript utilities** (`arrayFilter`, `useMemo(() => ..., [deps])`) before adding 10 thin hooks.
- If you ship hooks, make them **thin `useMemo` wrappers** with stable references and **document Big-O** for large collections.
- Consider **one** `useArray` namespace or grouped export to avoid exploding the sidebar.

## Time

**Shipped:** `useNow` (live `Date` with optional interval tick), **`useTimestamp`** (epoch ms tick), `useInterval` / `useTimeout`, **`useDateFormat`** / **`useTimeAgo`** (`Intl` only), and **`useCountdown`** (deadline snapshot + optional `onComplete`) - see [Time](/functions/time).

**Still to plan:** richer countdown drift correction, higher-level scheduling helpers, and similar extras still need:

- **Locale strategy** - `Intl` APIs vs `date-fns` / `dayjs` peer dependency decision (avoid silent bundle bloat).
- **Timer hygiene** - `setInterval` cleanup; drift correction for countdowns.
- **SSR** - deterministic default on server vs live clock on client; document flash (especially for ticking relative labels).

## Utilities

`useCounter` (already shipped), `useCycleList`, `useStepper`, `useToggle` (already shipped), `useEventBus`, `useMemoize`, `useCloned`, `useBase64`, etc.

### Guidance

- **Pure functions first** - `useCounter` can be `useReducer` recipe; only promote to hook if you add persistence or telemetry.
- **`useEventBus`** - implement with `useSyncExternalStore` or mitt-like emitter; document memory leak risks with long-lived buses.
- **`get` / `set` / `isDefined`** - usually **not hooks**; keep as TS helpers in `src/utils`.

## Implementation checklist

- Avoid **duplicate** functionality with existing hooks (`useThrottle`, `useDebounce`, `usePrevious`).
- For encoding helpers (`useBase64`), validate large strings async if needed (chunk + `queueMicrotask`).
- **Do not re-implement equivalents** - if a requested hook already exists under another stable name in this library, keep the existing hook and mark the requested name as `covered-by-existing` in the progress tracker.

## Documentation checklist

- **Performance** - array hooks: mention memoization expectations.
- **Locale** - time hooks: show `Intl` examples and fallback behavior.
- **Dependencies** - if you add optional peer deps, document install in [Configurations](/guide/configurations).

## Suggested milestones

1. ~~**`useTimeAgo` + `useDateFormat`** with `Intl` only (no extra deps).~~ **Done** - shipped in `@dedalik/use-react` with matching function docs.
2. **Array pack** - ship 2–3 highest-value reducers behind one module entry if possible.
3. **Utility audit** - convert obvious utilities to **non-hook** exports to keep the catalog focused.

Next: docs and delivery pipeline pass (Part 6 is maintained in the internal planning docs).
