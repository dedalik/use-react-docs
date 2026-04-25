---
title: Trigger callback near scroll end
sidebar_label: useInfiniteScroll
category: Sensors
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useInfiniteScroll.tsx'
description: >-
  useInfiniteScroll from @dedalik/use-react: invoke loader near bottom of page.
---

# useInfiniteScroll()

<PackageData fn="useInfiniteScroll" />

Last updated: 24/04/2026

## Overview

`useInfiniteScroll` attaches a passive **`window`** **`scroll`** listener and calls **`onLoadMore`** when the distance from the bottom of the **document** falls within **`offset`** pixels of zero (default **200**), i.e. when **`window.innerHeight + scrollY`** reaches **`documentElement.scrollHeight - offset`**. It is meant for the **main page** scroll, not a nested scrollable div. The effect is gated by **`enabled`**: set **`false`** to pause loading (for example when a list is not mounted). **`onLoadMore`** is included in the effect dependencies, so you should pass a **stable** callback (typically **`useCallback`**) to avoid re-subscribing every render. The hook does not debounce; if the user stays at the bottom, the handler can fire on many scroll events until you add your own guard in **`onLoadMore`**.

### What it accepts

1. **`onLoadMore`**: `() => void`
2. **Optional `options`**: `{ offset?: number; enabled?: boolean }` (defaults: **`offset` 200**, **`enabled` true**)

### What it returns

- Nothing ( **`void`** ) - side effect only

## Usage

Pass **`useCallback`**, extend a list, and set **`offset`** / **`enabled`** in options.

```tsx
import { useCallback, useState } from 'react'
import useInfiniteScroll from '@dedalik/use-react/useInfiniteScroll'

function Example() {
  const [count, setCount] = useState(30)
  const [loadMore, setLoadMore] = useState(true)

  const onLoadMore = useCallback(() => {
    if (!loadMore) return
    setCount((c) => Math.min(c + 20, 200))
  }, [loadMore])

  useInfiniteScroll(onLoadMore, { offset: 240, enabled: loadMore })

  return (
    <div>
      <label>
        <input type='checkbox' checked={loadMore} onChange={(e) => setLoadMore(e.target.checked)} /> Load more when near
        bottom
      </label>
      <ul>
        {Array.from({ length: count }, (_, i) => (
          <li key={i}>Item {i + 1}</li>
        ))}
      </ul>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useInfiniteScroll`

**Signature:** `useInfiniteScroll(onLoadMore: () => void, options: UseInfiniteScrollOptions = {}): void`

#### Parameters

1. **`onLoadMore`** - Invoked when scroll position is within **`offset`** px of the document bottom.
2. **`options`**
   - **`offset`** - Pixels from the end of the page before calling **`onLoadMore`**. Default **200**.
   - **`enabled`** - If **`false`**, no scroll listener. Default **true**.

#### Returns

`void`

## Copy-paste hook

### TypeScript

```tsx
import { useEffect } from 'react'

export interface UseInfiniteScrollOptions {
  offset?: number
  enabled?: boolean
}

/**
 * Calls `onLoadMore` when user scrolls near page bottom.
 */
export default function useInfiniteScroll(onLoadMore: () => void, options: UseInfiniteScrollOptions = {}): void {
  const { offset = 200, enabled = true } = options

  useEffect(() => {
    if (!enabled || typeof window === 'undefined' || typeof document === 'undefined') return

    const onScroll = () => {
      const scrollBottom = window.innerHeight + window.scrollY
      const fullHeight = document.documentElement.scrollHeight

      if (scrollBottom >= fullHeight - offset) {
        onLoadMore()
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [enabled, offset, onLoadMore])
}
```

### JavaScript

```js
import { useEffect } from 'react'

/**
 * Calls `onLoadMore` when user scrolls near page bottom.
 */
export default function useInfiniteScroll(onLoadMore, options = {}) {
  const { offset = 200, enabled = true } = options

  useEffect(() => {
    if (!enabled || typeof window === 'undefined' || typeof document === 'undefined') return

    const onScroll = () => {
      const scrollBottom = window.innerHeight + window.scrollY
      const fullHeight = document.documentElement.scrollHeight

      if (scrollBottom >= fullHeight - offset) {
        onLoadMore()
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [enabled, offset, onLoadMore])
}
```
