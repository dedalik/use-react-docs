---
title: Track preferred contrast level
sidebar_label: usePreferredContrast
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/usePreferredContrast.tsx'
description: >-
  usePreferredContrast from @dedalik/use-react: media-query based contrast preference value.
---

# usePreferredContrast()

<PackageData fn="usePreferredContrast" />

<HookLiveDemo demo="usePreferredContrast/basic" title="usePreferredContrast interactive demo" />

## Overview

`usePreferredContrast` evaluates the CSS **`prefers-contrast`** media features **`more`**, **`less`**, and **`custom`** (in that priority order when reading) and exposes the winning label as a string union, subscribing to `change` on each `MediaQueryList` so OS accessibility tweaks (high contrast themes, forced colors, etc.) immediately re-render your palette logic. When no query matches or `matchMedia` is unavailable (SSR, old engines), it reports **`'no-preference'`**-treat that as your default contrast ramp rather than assuming low contrast.

### What it accepts

- None.

### What it returns

- **`PreferredContrast`** - `'more' | 'less' | 'custom' | 'no-preference'`.

## Usage

Pick border and text weights from the contrast token (no `JSON.stringify`).

```tsx
import usePreferredContrast from '@dedalik/use-react/usePreferredContrast'

function Example() {
  const contrast = usePreferredContrast()

  const borderWidth = contrast === 'more' ? 2 : 1
  const fontWeight = contrast === 'less' ? 400 : 600

  return (
    <div
      style={{
        padding: 16,
        borderRadius: 8,
        border: `${borderWidth}px solid #334155`,
        fontWeight,
        background: contrast === 'custom' ? '#fefce8' : '#f8fafc',
      }}
    >
      <h3 style={{ marginTop: 0 }}>Contrast preference</h3>
      <p>
        Resolved: <strong>{contrast}</strong>
      </p>
      <p style={{ marginBottom: 0, opacity: 0.85 }}>
        Adjust OS high-contrast / contrast settings to see the label update.
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `usePreferredContrast`

**Signature:** `usePreferredContrast(): PreferredContrast`

#### Parameters

None.

#### Returns

**`PreferredContrast`** - `'more' | 'less' | 'custom' | 'no-preference'`.

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

export type PreferredContrast = 'more' | 'less' | 'custom' | 'no-preference'

function readContrast(): PreferredContrast {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return 'no-preference'
  if (window.matchMedia('(prefers-contrast: more)').matches) return 'more'
  if (window.matchMedia('(prefers-contrast: less)').matches) return 'less'
  if (window.matchMedia('(prefers-contrast: custom)').matches) return 'custom'
  return 'no-preference'
}

/**
 * Tracks prefers-contrast media query value.
 */
export default function usePreferredContrast(): PreferredContrast {
  const [contrast, setContrast] = useState<PreferredContrast>(() => readContrast())

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return

    const more = window.matchMedia('(prefers-contrast: more)')
    const less = window.matchMedia('(prefers-contrast: less)')
    const custom = window.matchMedia('(prefers-contrast: custom)')
    const update = () => setContrast(readContrast())

    more.addEventListener('change', update)
    less.addEventListener('change', update)
    custom.addEventListener('change', update)

    return () => {
      more.removeEventListener('change', update)
      less.removeEventListener('change', update)
      custom.removeEventListener('change', update)
    }
  }, [])

  return contrast
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

function readContrast() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return 'no-preference'
  if (window.matchMedia('(prefers-contrast: more)').matches) return 'more'
  if (window.matchMedia('(prefers-contrast: less)').matches) return 'less'
  if (window.matchMedia('(prefers-contrast: custom)').matches) return 'custom'
  return 'no-preference'
}

export default function usePreferredContrast() {
  const [contrast, setContrast] = useState(() => readContrast())

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return

    const more = window.matchMedia('(prefers-contrast: more)')
    const less = window.matchMedia('(prefers-contrast: less)')
    const custom = window.matchMedia('(prefers-contrast: custom)')
    const update = () => setContrast(readContrast())

    more.addEventListener('change', update)
    less.addEventListener('change', update)
    custom.addEventListener('change', update)

    return () => {
      more.removeEventListener('change', update)
      less.removeEventListener('change', update)
      custom.removeEventListener('change', update)
    }
  }, [])

  return contrast
}
```
