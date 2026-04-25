---
title: Compute parallax transform from pointer
sidebar_label: useParallax
category: Sensors
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useParallax.tsx'
description: >-
  useParallax from @dedalik/use-react: parallax offsets and transform string.
---

# useParallax()

<PackageData fn="useParallax" />

Last updated: 24/04/2026

## Overview

`useParallax` builds a **`translate3d`**-style parallax from the current **mouse** position: it reuses **`useMouse`** (global **`mousemove`**, viewport **`clientX` / `clientY`**) and compares the pointer to the **center of the window** so offsets are zero when the cursor is centered. **`factorX`** and **`factorY`** (defaults **0.02**) scale how many pixels the layer drifts from center per pixel of mouse travel; `offsetX` / `offsetY` are those drifts, and **`transform`** is a ready-to-apply `translate3d(…, 0)` with fixed decimal precision. On the server, centering uses **0** width/height, so the layer stays neutral until the client is active.

### What it accepts

- Optional **`options`**: `{ factorX?: number; factorY?: number }` (defaults `0.02` each)

### What it returns

- **`offsetX`**, **`offsetY`**: `number`
- **`transform`**: `string` (CSS `transform`)

## Usage

Tie **`transform`** to a card and set stronger factors for a more pronounced tilt.

```tsx
import useParallax from '@dedalik/use-react/useParallax'

function Example() {
  const { offsetX, offsetY, transform } = useParallax({ factorX: 0.04, factorY: 0.03 })

  return (
    <div style={{ minHeight: '30vh' }}>
      <p>
        offset: {offsetX.toFixed(1)} × {offsetY.toFixed(1)} px
      </p>
      <div
        style={{
          display: 'inline-block',
          padding: '1.5rem 2rem',
          border: '1px solid #ccc',
          borderRadius: 8,
          willChange: 'transform',
          transform,
        }}
      >
        Parallax card
      </div>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useParallax`

**Signature:** `useParallax(options: UseParallaxOptions = {}): UseParallaxReturn`

#### Parameters

1. **`options`** (optional) - **`factorX`**, **`factorY`**; default **0.02** for each.

#### Returns

- **`offsetX` / `offsetY`** - Parallax in px from the viewport center.
- **`transform`** - `translate3d(…, 0)` for inline styles.

**Depends on** [`useMouse`](./useMouse) for pointer sampling.

## Copy-paste hook

### TypeScript

```tsx
import { useMemo } from 'react'
import useMouse from './useMouse'

export interface UseParallaxOptions {
  factorX?: number
  factorY?: number
}

export interface UseParallaxReturn {
  offsetX: number
  offsetY: number
  transform: string
}

/**
 * Computes parallax offsets from current pointer position.
 */
export default function useParallax(options: UseParallaxOptions = {}): UseParallaxReturn {
  const { factorX = 0.02, factorY = 0.02 } = options
  const { x, y } = useMouse()

  return useMemo(() => {
    const centerX = typeof window === 'undefined' ? 0 : window.innerWidth / 2
    const centerY = typeof window === 'undefined' ? 0 : window.innerHeight / 2
    const offsetX = (x - centerX) * factorX
    const offsetY = (y - centerY) * factorY

    return {
      offsetX,
      offsetY,
      transform: `translate3d(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px, 0)`,
    }
  }, [factorX, factorY, x, y])
}
```

### JavaScript

```js
import { useMemo } from 'react'
import useMouse from './useMouse'

/**
 * Computes parallax offsets from current pointer position.
 */
export default function useParallax(options = {}) {
  const { factorX = 0.02, factorY = 0.02 } = options
  const { x, y } = useMouse()

  return useMemo(() => {
    const centerX = typeof window === 'undefined' ? 0 : window.innerWidth / 2
    const centerY = typeof window === 'undefined' ? 0 : window.innerHeight / 2
    const offsetX = (x - centerX) * factorX
    const offsetY = (y - centerY) * factorY

    return {
      offsetX,
      offsetY,
      transform: `translate3d(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px, 0)`,
    }
  }, [factorX, factorY, x, y])
}
```
