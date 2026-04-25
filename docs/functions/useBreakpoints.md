---
title: Resolve responsive breakpoints from window width
sidebar_label: useBreakpoints
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useBreakpoints.tsx'
description: >-
  useBreakpoints from @dedalik/use-react: active breakpoint names and flags from window width.
---

# useBreakpoints()

<PackageData fn="useBreakpoints" />

Last updated: 24/04/2026

## Overview

`useBreakpoints` takes a map of **name → minimum width in pixels**, reads the live window width via `useWindowSize`, sorts breakpoints ascending, and derives **`current`** as the highest breakpoint whose min width is still satisfied (your “largest active” token), **`active`** as the ordered list of all names currently matched, per-name **`flags`** booleans, plus **`greaterOrEqual(name)`** for imperative checks. Because width comes from `resize` listeners, SSR or the first paint may see `0` until hydration-design tokens and layout switches should tolerate that initial width. The map object identity participates in `useMemo`; keep breakpoint maps **stable** (`useMemo` or module-level constant) to avoid recomputing on every render.

### What it accepts

- **`breakpoints`** - `Record<string, number>`: keys are breakpoint names, values are min widths in px (same semantics as `min-width` in CSS).

### What it returns

- **`width`** - Current inner width from `useWindowSize`.
- **`current`** - Top matched breakpoint key, or `null` if none.
- **`active`** - All matched names from smallest min to largest.
- **`greaterOrEqual(name)`** - Whether `width >= breakpoints[name]`.
- **`flags`** - Record of booleans, same keys as **`breakpoints`**.

## Usage

Tailwind-style scale passed once from a constant; UI shows width, current band, flags, and a sample `greaterOrEqual` check.

```tsx
import useBreakpoints from '@dedalik/use-react/useBreakpoints'

const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const

function Example() {
  const { width, current, active, greaterOrEqual, flags } = useBreakpoints(BREAKPOINTS)

  return (
    <div>
      <h3>Breakpoints</h3>
      <p>
        Width: <strong>{width}px</strong> - current band: <strong>{current ?? '-'}</strong>
      </p>
      <p>
        Active (ordered): <strong>{active.length ? active.join(' → ') : 'none'}</strong>
      </p>
      <p>
        <code>greaterOrEqual(&apos;md&apos;)</code>: <strong>{greaterOrEqual('md') ? 'yes' : 'no'}</strong>
      </p>
      <ul>
        {(Object.keys(BREAKPOINTS) as (keyof typeof BREAKPOINTS)[]).map((key) => (
          <li key={key}>
            <code>{key}</code>: {flags[key] ? 'on' : 'off'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useBreakpoints`

**Signature:** `useBreakpoints<T extends BreakpointMap>(breakpoints: T)` - returns `{ width, current, active, greaterOrEqual, flags }` (see Returns).

#### Parameters

- **`breakpoints`** (`Record<string, number>`) - Minimum widths per named breakpoint. Sorted internally by numeric value.

#### Returns

Object with:

- **`width`** (`number`) - `window.innerWidth` from `useWindowSize`.
- **`current`** (`keyof T | null`) - Largest breakpoint name with `width >= min`.
- **`active`** (`(keyof T)[]`) - Names whose mins are satisfied, ascending by min width.
- **`greaterOrEqual`** (`(name: keyof T) => boolean`) - `width >= breakpoints[name]`.
- **`flags`** (`Record<keyof T, boolean>`) - Per-name match flags.

## Copy-paste hook

### TypeScript

```tsx
import { useMemo } from 'react'
import useWindowSize from './useWindowSize'

export type BreakpointMap = Record<string, number>

/**
 * Resolves active breakpoint names for current window width.
 */
export default function useBreakpoints<T extends BreakpointMap>(breakpoints: T) {
  const { width } = useWindowSize()

  return useMemo(() => {
    const entries = Object.entries(breakpoints).sort((a, b) => a[1] - b[1])
    const active = entries.filter(([, min]) => width >= min).map(([name]) => name)
    const current = active[active.length - 1] ?? null

    const flags = Object.fromEntries(entries.map(([name]) => [name, width >= breakpoints[name]])) as Record<
      keyof T,
      boolean
    >

    return {
      width,
      current: current as keyof T | null,
      active: active as (keyof T)[],
      greaterOrEqual: (name: keyof T) => width >= breakpoints[name],
      flags,
    }
  }, [breakpoints, width])
}
```

### JavaScript

```js
import { useMemo } from 'react'
import useWindowSize from './useWindowSize'

export default function useBreakpoints(breakpoints) {
  const { width } = useWindowSize()

  return useMemo(() => {
    const entries = Object.entries(breakpoints).sort((a, b) => a[1] - b[1])
    const active = entries.filter(([, min]) => width >= min).map(([name]) => name)
    const current = active[active.length - 1] ?? null

    const flags = Object.fromEntries(entries.map(([name]) => [name, width >= breakpoints[name]]))

    return {
      width,
      current,
      active,
      greaterOrEqual: (name) => width >= breakpoints[name],
      flags,
    }
  }, [breakpoints, width])
}
```
