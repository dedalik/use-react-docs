---
title: Track window scroll offsets
sidebar_label: useScroll
category: Sensors
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useScroll.tsx'
description: >-
  useScroll from @dedalik/use-react: reactive `scrollX` and `scrollY` values.
---

# useScroll()

<PackageData fn="useScroll" />

Last updated: 24/04/2026

## Overview

`useScroll` mirrors the window’s **`scrollX` / `scrollY`** (as **`x` / `y`** in state), seeds from the current position on mount, and updates on **`window`** **`scroll`** with a **passive** listener so the main thread stays smooth during fling scrolling. It does **not** observe scrollable divs-only the document scroller. For in-panel scrolling, use **`addEventListener`** on that element or a dedicated hook.

### What it accepts

- None.

### What it returns

- **`{ x, y }`** - `window.scrollX` / `scrollY`.

## Usage

Sticky readout while the page scrolls (no `JSON.stringify`).

```tsx
import useScroll from '@dedalik/use-react/useScroll'

function Example() {
  const { x, y } = useScroll()

  return (
    <div>
      <h3>Window scroll</h3>
      <p
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          padding: 8,
          background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        scrollX: <strong>{Math.round(x)}</strong> - scrollY: <strong>{Math.round(y)}</strong>
      </p>
      <div style={{ minHeight: '150vh', paddingTop: 16 }}>Scroll this page to update values.</div>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useScroll`

**Signature:** `useScroll(): UseScrollState`

#### Parameters

None.

#### Returns

**`UseScrollState`** - `x` ≈ `scrollX`, `y` ≈ `scrollY`.

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

export interface UseScrollState {
  x: number
  y: number
}

function readScroll(): UseScrollState {
  if (typeof window === 'undefined') return { x: 0, y: 0 }
  return { x: window.scrollX, y: window.scrollY }
}

/**
 * Tracks window scroll offsets.
 */
export default function useScroll(): UseScrollState {
  const [state, setState] = useState<UseScrollState>(() => readScroll())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onScroll = () => setState(readScroll())
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return state
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

function readScroll() {
  if (typeof window === 'undefined') return { x: 0, y: 0 }
  return { x: window.scrollX, y: window.scrollY }
}

export default function useScroll() {
  const [state, setState] = useState(() => readScroll())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onScroll = () => setState(readScroll())
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return state
}
```
