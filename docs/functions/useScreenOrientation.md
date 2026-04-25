---
title: Track screen orientation state
sidebar_label: useScreenOrientation
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useScreenOrientation.tsx'
description: >-
  useScreenOrientation from @dedalik/use-react: orientation type and angle updates.
---

# useScreenOrientation()

<PackageData fn="useScreenOrientation" />

Last updated: 24/04/2026

## Overview

`useScreenOrientation` reads **`window.screen.orientation`** when present (angle + canonical **`type`** string such as `portrait-primary`), falls back to a neutral `{ angle: 0, type: 'portrait-primary' }` when the API is missing, and re-reads on the window **`orientationchange`** event so rotating a phone or unlocking tablet rotation updates React without polling. SSR mirrors the same fallback because **`window`** is undefined; treat **`angle`** as degrees from the natural orientation for layout hints, not as a substitute for **`matchMedia`** for responsive breakpoints.

### What it accepts

- None.

### What it returns

- **`angle`** - Current orientation angle in degrees (`number`).
- **`type`** - Screen Orientation API type string (`string`).

## Usage

Show type and angle, and suggest layout from portrait vs landscape (no `JSON.stringify`).

```tsx
import useScreenOrientation from '@dedalik/use-react/useScreenOrientation'

function Example() {
  const { angle, type } = useScreenOrientation()
  const isLandscape = type.includes('landscape')

  return (
    <div>
      <h3>Screen orientation</h3>
      <p>
        Type: <strong>{type}</strong> - angle: <strong>{angle}°</strong>
      </p>
      <p>
        Suggested layout: <strong>{isLandscape ? 'wide canvas' : 'tall canvas'}</strong>
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useScreenOrientation`

**Signature:** `useScreenOrientation(): ScreenOrientationState`

#### Parameters

None.

#### Returns

Object **`ScreenOrientationState`**:

- **`angle`** (`number`) - `screen.orientation.angle` or `0`.
- **`type`** (`string`) - `screen.orientation.type` or `'portrait-primary'`.

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

export interface ScreenOrientationState {
  angle: number
  type: string
}

function readOrientation(): ScreenOrientationState {
  if (typeof window === 'undefined') return { angle: 0, type: 'portrait-primary' }

  const orientation = (window.screen as Screen & { orientation?: { angle?: number; type?: string } }).orientation
  if (orientation) {
    return {
      angle: orientation.angle ?? 0,
      type: orientation.type ?? 'portrait-primary',
    }
  }

  return { angle: 0, type: 'portrait-primary' }
}

/**
 * Tracks current screen orientation info.
 */
export default function useScreenOrientation(): ScreenOrientationState {
  const [state, setState] = useState<ScreenOrientationState>(() => readOrientation())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const update = () => setState(readOrientation())
    window.addEventListener('orientationchange', update)
    return () => window.removeEventListener('orientationchange', update)
  }, [])

  return state
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

function readOrientation() {
  if (typeof window === 'undefined') return { angle: 0, type: 'portrait-primary' }

  const orientation = window.screen.orientation
  if (orientation) {
    return {
      angle: orientation.angle ?? 0,
      type: orientation.type ?? 'portrait-primary',
    }
  }

  return { angle: 0, type: 'portrait-primary' }
}

export default function useScreenOrientation() {
  const [state, setState] = useState(() => readOrientation())

  useEffect(() => {
    if (typeof window === 'undefined') return

    const update = () => setState(readOrientation())
    window.addEventListener('orientationchange', update)
    return () => window.removeEventListener('orientationchange', update)
  }, [])

  return state
}
```
