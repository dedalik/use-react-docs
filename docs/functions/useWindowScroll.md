---
title: Track window scroll offsets
sidebar_label: useWindowScroll
category: Elements
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useWindowScroll.tsx'
description: >-
  useWindowScroll from @dedalik/use-react: reactive window scroll coordinates.
---

# useWindowScroll()

<PackageData fn="useWindowScroll" />

Last updated: 24/04/2026

## Overview

`useWindowScroll` listens to the window `scroll` event (registered as `{ passive: true }`) and keeps `{ x, y }` in sync with `window.scrollX` / `window.scrollY`, seeding initial values from the current scroll position on the client (and `0` during SSR). That gives you a reactive read of the document’s scroll offsets for UI like scroll progress indicators, “back to top” controls, parallax hints, or any feature that needs to react to page scrolling without manually wiring listeners in every component.

### What it accepts

- No arguments.

### What it returns

- `x`: Horizontal scroll offset (`window.scrollX`). Type `number`.
- `y`: Vertical scroll offset (`window.scrollY`). Type `number`.

## Usage

Real-world example: show scroll position + a reading progress bar driven by vertical scroll.

```tsx
import useWindowScroll from '@dedalik/use-react/useWindowScroll'

function Example() {
  const { x, y } = useWindowScroll()
  const docHeight = typeof document !== 'undefined' ? document.documentElement.scrollHeight - window.innerHeight : 1
  const progress = Math.max(0, Math.min(1, y / Math.max(docHeight, 1)))

  return (
    <div>
      <h3>Window scroll</h3>
      <p>
        scrollX / scrollY: {Math.round(x)} / {Math.round(y)}
      </p>

      <div style={{ height: 8, borderRadius: 999, background: '#eee', overflow: 'hidden' }}>
        <div style={{ width: `${progress * 100}%`, height: '100%', background: '#2563eb' }} />
      </div>
      <p style={{ marginTop: 8, opacity: 0.8 }}>Scroll this page to move the bar.</p>

      <div style={{ height: 1400, marginTop: 24, borderTop: '1px dashed #ccc', paddingTop: 16 }}>
        <p>Tall content to make scrolling easy.</p>
        <button type='button' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Scroll to top
        </button>
      </div>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useWindowScroll`

**Signature:** `useWindowScroll(): WindowScrollState`

#### Parameters

None.

#### Returns

Object with:

- `x` - Horizontal scroll offset (`window.scrollX`). (`number`).
- `y` - Vertical scroll offset (`window.scrollY`). (`number`).

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

export interface WindowScrollState {
  x: number
  y: number
}

/**
 * Tracks window scroll offsets.
 */
export default function useWindowScroll(): WindowScrollState {
  const [state, setState] = useState<WindowScrollState>(() => ({
    x: typeof window !== 'undefined' ? window.scrollX : 0,
    y: typeof window !== 'undefined' ? window.scrollY : 0,
  }))

  useEffect(() => {
    const onScroll = () => {
      setState({ x: window.scrollX, y: window.scrollY })
    }

    const scrollListenerOptions: AddEventListenerOptions = { passive: true }
    window.addEventListener('scroll', onScroll, scrollListenerOptions)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll, scrollListenerOptions)
  }, [])

  return state
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

export default function useWindowScroll() {
  const [state, setState] = useState(() => ({
    x: typeof window !== 'undefined' ? window.scrollX : 0,
    y: typeof window !== 'undefined' ? window.scrollY : 0,
  }))

  useEffect(() => {
    const onScroll = () => {
      setState({ x: window.scrollX, y: window.scrollY })
    }

    const scrollListenerOptions = { passive: true }
    window.addEventListener('scroll', onScroll, scrollListenerOptions)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll, scrollListenerOptions)
  }, [])

  return state
}
```
