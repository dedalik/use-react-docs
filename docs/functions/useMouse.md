---
title: Track viewport mouse coordinates
sidebar_label: useMouse
category: Sensors
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useMouse.tsx'
description: >-
  useMouse from @dedalik/use-react: reactive mouse position in viewport coordinates.
---

# useMouse()

<PackageData fn="useMouse" />

Last updated: 24/04/2026

## Overview

`useMouse` listens to **`window`** **`mousemove`** and mirrors **`clientX` / `clientY`** into React state-viewport coordinates relative to the layout viewport, not page coordinates (no scroll offset). The listener is global, so you get the pointer even when it is not over your component; remove or narrow usage if you only need local tracking. SSR starts at **`{ x: 0, y: 0 }`** until the client effect runs.

### What it accepts

- None.

### What it returns

- **`{ x, y }`** - Last mouse position in CSS pixels.

## Usage

Live readout of pointer position (no `JSON.stringify`).

```tsx
import useMouse from '@dedalik/use-react/useMouse'

function Example() {
  const { x, y } = useMouse()

  return (
    <div>
      <h3>Pointer</h3>
      <p>
        clientX: <strong>{x}</strong>, clientY: <strong>{y}</strong>
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useMouse`

**Signature:** `useMouse(): UseMouseState`

#### Parameters

None.

#### Returns

**`UseMouseState`** - `x`, `y` from the last `mousemove`.

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

export interface UseMouseState {
  x: number
  y: number
}

/**
 * Tracks mouse pointer coordinates in viewport space.
 */
export default function useMouse(): UseMouseState {
  const [state, setState] = useState<UseMouseState>({ x: 0, y: 0 })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onMove = (event: MouseEvent) => {
      setState({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return state
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

export default function useMouse() {
  const [state, setState] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onMove = (event) => {
      setState({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return state
}
```
