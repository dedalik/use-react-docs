---
title: Track preferred color scheme
sidebar_label: usePreferredColorScheme
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/usePreferredColorScheme.tsx'
description: >-
  usePreferredColorScheme from @dedalik/use-react: returns light/dark/no-preference from media queries.
---

# usePreferredColorScheme()

<PackageData fn="usePreferredColorScheme" />

Last updated: 24/04/2026

## Overview

`usePreferredColorScheme` mirrors the OS / browser theme signal exposed by CSS `prefers-color-scheme`: it initializes from `matchMedia('(prefers-color-scheme: dark)')` and `(light)` on the client, returns **`'dark'`**, **`'light'`**, or **`'no-preference'`** when neither query matches (unusual but spec-allowed), and subscribes to `change` on both lists so toggling system appearance updates React without polling. On the server or without `matchMedia`, the hook defaults to **`'light'`** for the initial state and skips listeners-pair with your own CSS variables or design tokens rather than assuming dark mode during SSR.

### What it accepts

- None.

### What it returns

- **`PreferredColorScheme`** - `'light' | 'dark' | 'no-preference'`.

## Usage

Drive inline styles from the resolved scheme (no `JSON.stringify`).

```tsx
import usePreferredColorScheme from '@dedalik/use-react/usePreferredColorScheme'

function Example() {
  const scheme = usePreferredColorScheme()

  const palette =
    scheme === 'dark'
      ? { bg: '#0f172a', fg: '#e2e8f0', border: '#334155' }
      : scheme === 'light'
        ? { bg: '#f8fafc', fg: '#0f172a', border: '#cbd5e1' }
        : { bg: '#f1f5f9', fg: '#1e293b', border: '#94a3b8' }

  return (
    <div
      style={{
        padding: 16,
        borderRadius: 8,
        border: `1px solid ${palette.border}`,
        background: palette.bg,
        color: palette.fg,
      }}
    >
      <h3 style={{ marginTop: 0 }}>System color scheme</h3>
      <p>
        Resolved to: <strong>{scheme}</strong>
      </p>
      <p style={{ marginBottom: 0, opacity: 0.85 }}>
        Change OS light/dark appearance - this panel should follow on the next media event.
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `usePreferredColorScheme`

**Signature:** `usePreferredColorScheme(): PreferredColorScheme`

#### Parameters

None.

#### Returns

**`PreferredColorScheme`** - `'light' | 'dark' | 'no-preference'`.

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

export type PreferredColorScheme = 'light' | 'dark' | 'no-preference'

function readScheme(): PreferredColorScheme {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return 'light'
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'
  return 'no-preference'
}

/**
 * Tracks preferred color scheme from media queries.
 */
export default function usePreferredColorScheme(): PreferredColorScheme {
  const [scheme, setScheme] = useState<PreferredColorScheme>(() => readScheme())

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return

    const dark = window.matchMedia('(prefers-color-scheme: dark)')
    const light = window.matchMedia('(prefers-color-scheme: light)')
    const update = () => setScheme(readScheme())

    dark.addEventListener('change', update)
    light.addEventListener('change', update)

    return () => {
      dark.removeEventListener('change', update)
      light.removeEventListener('change', update)
    }
  }, [])

  return scheme
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

function readScheme() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return 'light'
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
  if (window.matchMedia('(prefers-color-scheme: light)').matches) return 'light'
  return 'no-preference'
}

export default function usePreferredColorScheme() {
  const [scheme, setScheme] = useState(() => readScheme())

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return

    const dark = window.matchMedia('(prefers-color-scheme: dark)')
    const light = window.matchMedia('(prefers-color-scheme: light)')
    const update = () => setScheme(readScheme())

    dark.addEventListener('change', update)
    light.addEventListener('change', update)

    return () => {
      dark.removeEventListener('change', update)
      light.removeEventListener('change', update)
    }
  }, [])

  return scheme
}
```
