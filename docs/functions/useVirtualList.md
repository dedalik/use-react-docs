---
title: Virtualize fixed-height lists
sidebar_label: useVirtualList
category: Component
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useVirtualList.tsx'
description: >-
  useVirtualList from @dedalik/use-react: render only visible rows for large lists.
---

# useVirtualList()

<PackageData fn="useVirtualList" />

Last updated: 24/04/2026

## Overview

`useVirtualList` assumes **every row has the same height** and computes a **visible slice** of **`source`** from the current **`scrollTop`**: **`start`/`end`** indices, a **`list`** of **`VirtualItem`s** (each with **`index`**, **`data`**, **`offsetTop`**) for rows to render, and **`totalHeight`** for the full scrollable content. **`overscan`** (default **2**) adds extra rows above and below the viewport to reduce pop-in while scrolling. **`onScroll`** reads **`currentTarget.scrollTop`**; wire it to a scroll container with **fixed** **`containerHeight`**. **`initialOffset`** seeds the initial **`scrollTop`** state (e.g. restore position). The hook does **not** render DOM-it only provides numbers; you position rows (for example **absolute** `top: offsetTop` inside a **relative** inner wrapper) and set the inner wrapper’s **height** to **`totalHeight`**. Variable row heights, horizontal virtualisation, and dynamic data are out of scope.

### What it accepts

1. **`source`**: `T[]` - full data array
2. **`options`**: `{ itemHeight: number; containerHeight: number; overscan?: number; initialOffset?: number }`

### What it returns

- **`list`**: `VirtualItem<T>[]` - items to render for the current window
- **`totalHeight`**, **`offsetTop`**: `number` - full content height; Y offset of the first rendered row (for transforms)
- **`start`**, **`end`**: `number` - slice range in **`source`**
- **`scrollTop`**: `number` - current scroll state tracked by the hook
- **`setScrollTop`**: `(value: number) => void`
- **`onScroll`**: `(event: UIEvent<HTMLElement>) => void`

## Usage

A scrollable box **240px** tall, **32px** rows, **overscan 3**, 10_000 string rows; render only **`list`**.

```tsx
import useVirtualList from '@dedalik/use-react/useVirtualList'

const ROW = 32
const VIEW = 240
const N = 10_000
const source = Array.from({ length: N }, (_, i) => `Item ${i + 1}`)

function Example() {
  const { list, totalHeight, onScroll, scrollTop, start, end } = useVirtualList(source, {
    itemHeight: ROW,
    containerHeight: VIEW,
    overscan: 3,
    initialOffset: 0,
  })

  return (
    <div>
      <div onScroll={onScroll} style={{ height: VIEW, overflow: 'auto', border: '1px solid #ccc' }}>
        <div style={{ height: totalHeight, position: 'relative' }}>
          {list.map((row) => (
            <div
              key={row.index}
              style={{
                position: 'absolute',
                top: row.offsetTop,
                left: 0,
                right: 0,
                height: ROW,
                lineHeight: `${ROW}px`,
                paddingLeft: 8,
                boxSizing: 'border-box',
              }}
            >
              {row.data}
            </div>
          ))}
        </div>
      </div>
      <p style={{ fontSize: 12, margin: 8 }}>
        window: {start}–{end} (scroll {scrollTop.toFixed(0)})
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useVirtualList`

**Signature:** `useVirtualList<T>(source: T[], options: UseVirtualListOptions): UseVirtualListReturn<T>`

#### Parameters

1. **`source`**
2. **`options`**
   - **`itemHeight`**, **`containerHeight`** (required)
   - **`overscan`**, **`initialOffset`** (optional; defaults **2** and **0**)

#### Returns

See “What it returns” above.

## Copy-paste hook

### TypeScript

```tsx
import { UIEvent, useCallback, useMemo, useState } from 'react'

export interface UseVirtualListOptions {
  itemHeight: number
  containerHeight: number
  overscan?: number
  initialOffset?: number
}

export interface VirtualItem<T> {
  index: number
  data: T
  offsetTop: number
}

export interface UseVirtualListReturn<T> {
  list: VirtualItem<T>[]
  totalHeight: number
  offsetTop: number
  start: number
  end: number
  scrollTop: number
  setScrollTop: (value: number) => void
  onScroll: (event: UIEvent<HTMLElement>) => void
}

/**
 * Renders only the visible window of a large fixed-height list.
 */
export default function useVirtualList<T>(source: T[], options: UseVirtualListOptions): UseVirtualListReturn<T> {
  const { itemHeight, containerHeight, overscan = 2, initialOffset = 0 } = options
  const [scrollTop, setScrollTopState] = useState(Math.max(0, initialOffset))

  const safeItemHeight = Math.max(1, itemHeight)
  const visibleCount = Math.max(1, Math.ceil(containerHeight / safeItemHeight))

  const setScrollTop = useCallback((value: number) => {
    setScrollTopState(Math.max(0, value))
  }, [])

  const onScroll = useCallback((event: UIEvent<HTMLElement>) => {
    setScrollTopState(Math.max(0, event.currentTarget.scrollTop))
  }, [])

  const start = Math.max(0, Math.floor(scrollTop / safeItemHeight) - overscan)
  const end = Math.min(source.length, start + visibleCount + overscan * 2)

  const list = useMemo(
    () =>
      source.slice(start, end).map((item, idx) => {
        const index = start + idx
        return {
          index,
          data: item,
          offsetTop: index * safeItemHeight,
        }
      }),
    [end, safeItemHeight, source, start],
  )

  return {
    list,
    totalHeight: source.length * safeItemHeight,
    offsetTop: start * safeItemHeight,
    start,
    end,
    scrollTop,
    setScrollTop,
    onScroll,
  }
}
```

### JavaScript

```js
import { useCallback, useMemo, useState } from 'react'

/**
 * Renders only the visible window of a large fixed-height list.
 */
export default function useVirtualList(source, options) {
  const { itemHeight, containerHeight, overscan = 2, initialOffset = 0 } = options
  const [scrollTop, setScrollTopState] = useState(Math.max(0, initialOffset))

  const safeItemHeight = Math.max(1, itemHeight)
  const visibleCount = Math.max(1, Math.ceil(containerHeight / safeItemHeight))

  const setScrollTop = useCallback((value) => {
    setScrollTopState(Math.max(0, value))
  }, [])

  const onScroll = useCallback((event) => {
    setScrollTopState(Math.max(0, event.currentTarget.scrollTop))
  }, [])

  const start = Math.max(0, Math.floor(scrollTop / safeItemHeight) - overscan)
  const end = Math.min(source.length, start + visibleCount + overscan * 2)

  const list = useMemo(
    () =>
      source.slice(start, end).map((item, idx) => {
        const index = start + idx
        return {
          index,
          data: item,
          offsetTop: index * safeItemHeight,
        }
      }),
    [end, safeItemHeight, source, start],
  )

  return {
    list,
    totalHeight: source.length * safeItemHeight,
    offsetTop: start * safeItemHeight,
    start,
    end,
    scrollTop,
    setScrollTop,
    onScroll,
  }
}
```
