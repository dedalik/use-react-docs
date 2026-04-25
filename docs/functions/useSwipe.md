---
title: Detect touch swipe direction
sidebar_label: useSwipe
category: Sensors
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useSwipe.tsx'
description: >-
  useSwipe from @dedalik/use-react: touch swipe direction and active swipe state.
---

# useSwipe()

<PackageData fn="useSwipe" />

Last updated: 24/04/2026

## Overview

`useSwipe` listens to **`touchstart`** and **`touchend`** on **`window`**, records the first touch’s **`clientX` / `clientY`**, and on end computes **`dx` / `dy`**. If the larger axis exceeds **`threshold`** (default **30** CSS pixels), the stronger axis becomes the swipe: horizontal gives **`left`** or **`right`**, vertical gives **`up`** or **`down`**; otherwise **`direction`** stays **`null`**. While a finger is down, **`isSwiping`** is **`true`**; after **`touchend`**, **`isSwiping`** is **`false`** and **`direction`** holds the last result for that gesture. The API is **touch only**; mouse drags and pointer swipes are not included.

### What it accepts

- Optional **`threshold`** (default **30**): minimum travel to count as a swipe, in the same units as `client*`.

### What it returns

- **`direction`**: `'left' | 'right' | 'up' | 'down' | null`
- **`isSwiping`**: `boolean`

## Usage

Use a higher **threshold** to ignore tiny jitters. Show last direction and whether a touch is in progress (test on a touch device).

```tsx
import useSwipe from '@dedalik/use-react/useSwipe'

function Example() {
  const { direction, isSwiping } = useSwipe(64)

  return (
    <div>
      <p>Threshold: 64 px (custom)</p>
      <p>Swiping: {isSwiping ? 'yes' : 'no'}</p>
      <p>Last direction: {direction ?? '-'}</p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useSwipe`

**Signature:** `useSwipe(threshold = 30): UseSwipeState`

#### Parameters

1. **`threshold`** (optional) - Min delta on the dominant axis. Default **30**.

#### Returns

- **`direction`** - Cardinal swipe or **`null`**
- **`isSwiping`** - True between **`touchstart`** and **`touchend`**

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

export type SwipeDirection = 'left' | 'right' | 'up' | 'down' | null

export interface UseSwipeState {
  direction: SwipeDirection
  isSwiping: boolean
}

/**
 * Detects swipe direction from touch events.
 */
export default function useSwipe(threshold = 30): UseSwipeState {
  const [state, setState] = useState<UseSwipeState>({ direction: null, isSwiping: false })

  useEffect(() => {
    if (typeof window === 'undefined') return

    let startX = 0
    let startY = 0

    const onStart = (event: TouchEvent) => {
      const touch = event.touches[0]
      if (!touch) return
      startX = touch.clientX
      startY = touch.clientY
      setState({ direction: null, isSwiping: true })
    }

    const onEnd = (event: TouchEvent) => {
      const touch = event.changedTouches[0]
      if (!touch) return

      const dx = touch.clientX - startX
      const dy = touch.clientY - startY
      const absX = Math.abs(dx)
      const absY = Math.abs(dy)

      let direction: SwipeDirection = null

      if (absX >= threshold || absY >= threshold) {
        if (absX > absY) {
          direction = dx > 0 ? 'right' : 'left'
        } else {
          direction = dy > 0 ? 'down' : 'up'
        }
      }

      setState({ direction, isSwiping: false })
    }

    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })

    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
    }
  }, [threshold])

  return state
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

/**
 * Detects swipe direction from touch events.
 */
export default function useSwipe(threshold = 30) {
  const [state, setState] = useState({ direction: null, isSwiping: false })

  useEffect(() => {
    if (typeof window === 'undefined') return

    let startX = 0
    let startY = 0

    const onStart = (event) => {
      const touch = event.touches[0]
      if (!touch) return
      startX = touch.clientX
      startY = touch.clientY
      setState({ direction: null, isSwiping: true })
    }

    const onEnd = (event) => {
      const touch = event.changedTouches[0]
      if (!touch) return

      const dx = touch.clientX - startX
      const dy = touch.clientY - startY
      const absX = Math.abs(dx)
      const absY = Math.abs(dy)

      let direction = null

      if (absX >= threshold || absY >= threshold) {
        if (absX > absY) {
          direction = dx > 0 ? 'right' : 'left'
        } else {
          direction = dy > 0 ? 'down' : 'up'
        }
      }

      setState({ direction, isSwiping: false })
    }

    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })

    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
    }
  }, [threshold])

  return state
}
```
