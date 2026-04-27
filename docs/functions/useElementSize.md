---
title: Track element width and height
sidebar_label: useElementSize
category: Elements
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useElementSize.tsx'
description: >-
  useElementSize from @dedalik/use-react: observe element width/height with ResizeObserver.
---

# useElementSize()

<PackageData fn="useElementSize" />
<HookLiveDemo demo="useElementSize/basic" title="Live demo: useElementSize" />

## Overview

`useElementSize` observes a DOM node referenced by `target` and keeps `{ width, height }` in sync using `ResizeObserver`, falling back to doing nothing when the API is unavailable (SSR / older environments). It measures the element’s layout box via `getBoundingClientRect()` whenever the observer fires, so you get live dimensions for responsive layouts, canvas sizing, or any UI that needs to react to element growth/shrink beyond window resize events.

### What it accepts

- `target: RefObject<HTMLElement | null>`.

### What it returns

- `width`: Element width from `getBoundingClientRect().width`. Type `number`.
- `height`: Element height from `getBoundingClientRect().height`. Type `number`.

## Usage

Real-world example: a resizable panel (`resize: both`) where the hook reports live width/height for layout/debug output.

```tsx
import { useRef, useState } from 'react'
import useElementSize from '@dedalik/use-react/useElementSize'

function Example() {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const { width, height } = useElementSize(panelRef)
  const [padding, setPadding] = useState(16)

  return (
    <div>
      <h3>Resizable panel</h3>
      <p>
        Measured size: {Math.round(width)}×{Math.round(height)}px
      </p>
      <label htmlFor='pad-range' style={{ display: 'block', marginBottom: 8 }}>
        Inner padding: {padding}px (changes layout → ResizeObserver updates)
      </label>
      <input
        id='pad-range'
        type='range'
        min={8}
        max={40}
        value={padding}
        onChange={(event) => setPadding(Number(event.target.value))}
      />

      <div
        ref={panelRef}
        style={{
          marginTop: 12,
          width: 320,
          height: 180,
          padding,
          resize: 'both',
          overflow: 'auto',
          border: '1px solid #ddd',
          borderRadius: 12,
          background: 'white',
        }}
      >
        Drag the corner handle to resize this box.
      </div>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useElementSize`

**Signature:** `useElementSize(target: RefObject<HTMLElement | null>): ElementSize`

#### Parameters

1. **`target`** (`RefObject<HTMLElement | null>`) - Ref attached to the element whose layout box you want to measure.

#### Returns

Object with:

- `width` - Element width from `getBoundingClientRect().width`. (`number`).
- `height` - Element height from `getBoundingClientRect().height`. (`number`).

## Copy-paste hook

### TypeScript

```tsx
import { RefObject, useEffect, useState } from 'react'

export interface ElementSize {
  width: number
  height: number
}

/**
 * Tracks element width/height with ResizeObserver.
 */
export default function useElementSize(target: RefObject<HTMLElement | null>): ElementSize {
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 })

  useEffect(() => {
    const node = target.current
    if (!node || typeof ResizeObserver === 'undefined') return

    const update = () => {
      const rect = node.getBoundingClientRect()
      setSize({ width: rect.width, height: rect.height })
    }

    update()
    const observer = new ResizeObserver(() => update())
    observer.observe(node)

    return () => observer.disconnect()
  }, [target])

  return size
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

export default function useElementSize(target) {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const node = target.current
    if (!node || typeof ResizeObserver === 'undefined') return

    const update = () => {
      const rect = node.getBoundingClientRect()
      setSize({ width: rect.width, height: rect.height })
    }

    update()
    const observer = new ResizeObserver(() => update())
    observer.observe(node)

    return () => observer.disconnect()
  }, [target])

  return size
}
```
