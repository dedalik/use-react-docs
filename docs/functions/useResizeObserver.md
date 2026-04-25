---
title: Track element size changes
sidebar_label: useResizeObserver
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useResizeObserver.tsx'
description: >-
  useResizeObserver from @dedalik/use-react: Track element size changes.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useResizeObserver()

<PackageData fn="useResizeObserver" />

Last updated: 24/04/2026

## Overview

`useResizeObserver` subscribes **`ResizeObserver`** to the **`targetRef`** node and stores **`contentRect.width`** and **`.height`** from the first entry batch-handy for fluid components, split panes, or chart sizing without polling **`getBoundingClientRect`**. Initial state is **0×0** until the first callback runs; if **`ResizeObserver`** is undefined (older engines) the effect bails. The effect depends on **`targetRef` identity**-if the ref object is stable, swapping **`current`** to a new DOM node may require a layout tick before sizes update, same as in vanilla observers.

### What it accepts

- **`targetRef`** - `RefObject<HTMLElement | null>` pointing at the measured element.

### What it returns

- **`{ width, height }`** - Content box size in CSS pixels (from **`contentRect`**).

## Usage

Resizable box: **`ref`** on the container, display **width / height** (no `JSON.stringify`).

```tsx
import { useRef } from 'react'
import useResizeObserver from '@dedalik/use-react/useResizeObserver'

function Example() {
  const boxRef = useRef<HTMLDivElement>(null)
  const { width, height } = useResizeObserver(boxRef)

  return (
    <div>
      <h3>Element size</h3>
      <p>
        Observed: <strong>{Math.round(width)}</strong> × <strong>{Math.round(height)}</strong> px
      </p>
      <div
        ref={boxRef}
        style={{
          resize: 'both',
          overflow: 'auto',
          minWidth: 120,
          minHeight: 80,
          maxWidth: '100%',
          border: '1px solid #94a3b8',
          padding: 8,
        }}
      >
        Drag the corner to resize-numbers should track.
      </div>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useResizeObserver`

**Signature:** `useResizeObserver(targetRef: RefObject<HTMLElement | null>): UseResizeObserverSize`

#### Parameters

- **`targetRef`** - Element to measure.

#### Returns

**`UseResizeObserverSize`** - `width` and `height` numbers.

## Copy-paste hook

### TypeScript

```tsx
import { RefObject, useEffect, useState } from 'react'

export interface UseResizeObserverSize {
  width: number
  height: number
}

export default function useResizeObserver(targetRef: RefObject<HTMLElement | null>): UseResizeObserverSize {
  const [size, setSize] = useState<UseResizeObserverSize>({ width: 0, height: 0 })

  useEffect(() => {
    const target = targetRef.current
    if (!target || typeof ResizeObserver === 'undefined') return

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return

      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      })
    })

    observer.observe(target)
    return () => observer.disconnect()
  }, [targetRef])

  return size
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

export default function useResizeObserver(targetRef) {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const target = targetRef.current
    if (!target || typeof ResizeObserver === 'undefined') return

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return

      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      })
    })

    observer.observe(target)
    return () => observer.disconnect()
  }, [targetRef])

  return size
}
```
