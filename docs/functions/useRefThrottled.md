---
title: Throttled reactive value
sidebar_label: useRefThrottled
category: Reactivity
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useRefThrottled.tsx'
description: >-
  useRefThrottled from @dedalik/use-react: expose a throttled version of a changing value.
---

# useRefThrottled()

<PackageData fn="useRefThrottled" />

Last updated: 24/04/2026

## Overview

`useRefThrottled` (implementation **`useRefThrottled`**) keeps a **throttled** **copy** of **`value`**: at most one update per **`delay`** ms, using **`Date.now()`** plus a **trailing** `setTimeout` to flush the **latest** `value` when new updates arrive too fast. That matches the same shape as the **`useWatchThrottled`** effect logic-**leading** edge when the interval has passed, **trailing** for the most recent `value` within the **wait** window. The returned `T` **starts** as the first **`value`**. It is a **read-only** mirror: update **`value`** from the parent. Use for scroll position or pointer sampling where you do not need every frame.

### What it accepts

1. **`value`**: `T`
2. **`delay`**: `number` (ms), default **200**

### What it returns

- **`T`**: the **throttled** snapshot of **`value`**

## Usage

A fast-changing **`x`**; **`useRefThrottled(x, 120)`** updates a display field at most ~**8×/s** as you move the **slider** quickly.

```tsx
import { useState } from 'react'
import useRefThrottled from '@dedalik/use-react/useRefThrottled'

function Example() {
  const [x, setX] = useState(50)
  const smoothX = useRefThrottled(x, 120)

  return (
    <div>
      <label>
        <input type='range' min={0} max={100} value={x} onChange={(e) => setX(Number(e.target.value))} /> live: {x}
      </label>
      <p>
        throttled (min 120 ms between updates): <strong>{smoothX}</strong>
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useRefThrottled`

**Signature:** `useRefThrottled<T>(value: T, delay?: number): T`

#### Parameters

1. **`value`**
2. **`delay`**

#### Returns

Throttled `T` (state-backed in the implementation).

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useRef, useState } from 'react'

/**
 * Throttled mirror of any input value.
 */
export default function useRefThrottled<T>(value: T, delay = 200): T {
  const [throttled, setThrottled] = useState(value)
  const lastRunRef = useRef(0)
  const trailingRef = useRef<number | null>(null)

  useEffect(() => {
    const now = Date.now()
    const wait = Math.max(0, delay - (now - lastRunRef.current))

    const run = () => {
      setThrottled(value)
      lastRunRef.current = Date.now()
    }

    if (wait <= 0) {
      if (trailingRef.current != null) {
        window.clearTimeout(trailingRef.current)
        trailingRef.current = null
      }
      run()
    } else {
      if (trailingRef.current != null) window.clearTimeout(trailingRef.current)
      trailingRef.current = window.setTimeout(() => {
        trailingRef.current = null
        run()
      }, wait)
    }

    return () => {
      if (trailingRef.current != null) {
        window.clearTimeout(trailingRef.current)
        trailingRef.current = null
      }
    }
  }, [delay, value])

  return throttled
}
```

### JavaScript

```js
import { useEffect, useRef, useState } from 'react'

/**
 * Throttled mirror of any input value.
 */
export default function useRefThrottled(value, delay = 200) {
  const [throttled, setThrottled] = useState(value)
  const lastRunRef = useRef(0)
  const trailingRef = useRef(null)

  useEffect(() => {
    const now = Date.now()
    const wait = Math.max(0, delay - (now - lastRunRef.current))

    const run = () => {
      setThrottled(value)
      lastRunRef.current = Date.now()
    }

    if (wait <= 0) {
      if (trailingRef.current != null) {
        window.clearTimeout(trailingRef.current)
        trailingRef.current = null
      }
      run()
    } else {
      if (trailingRef.current != null) window.clearTimeout(trailingRef.current)
      trailingRef.current = window.setTimeout(() => {
        trailingRef.current = null
        run()
      }, wait)
    }

    return () => {
      if (trailingRef.current != null) {
        window.clearTimeout(trailingRef.current)
        trailingRef.current = null
      }
    }
  }, [delay, value])

  return throttled
}
```
