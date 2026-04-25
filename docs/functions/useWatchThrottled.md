---
title: Throttle watched values
sidebar_label: useWatchThrottled
category: Watch
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useWatchThrottled.tsx'
description: >-
  useWatchThrottled from @dedalik/use-react: cap how often a watch callback runs.
---

# useWatchThrottled()

<PackageData fn="useWatchThrottled" />

Last updated: 24/04/2026

## Overview

`useWatchThrottled` limits how often **`callback(value, previous)`** runs: if **`value`** (or deps) change **faster** than **`delay`**, a **trailing** timeout is used so a run still happens with the **latest** value when the wait elapses. If the minimum interval has passed, the callback runs **synchronously** in the effect. **`delay`** (default **200** ms) is a **minimum spacing** between successful **`callback`** invocations, not a `requestAnimationFrame` throttle. The implementation uses **`Date.now()`** and **`setTimeout`** for the trailing case.

### What it accepts

1. **`value`**: `T`
2. **`callback`**: `(value: T, previous: T | undefined) => void`
3. **`delay`**: `number` (ms), default **200**
4. Optional **`deps`**: `DependencyList`

### What it returns

- **`void`**

## Usage

Rapidly increment a counter; **`useWatchThrottled`** ( **150 ms** ) only updates a **throttled** display a few times per second at most.

```tsx
import { useState } from 'react'
import useWatchThrottled from '@dedalik/use-react/useWatchThrottled'

function Example() {
  const [n, setN] = useState(0)
  const [throttled, setThrottled] = useState(0)

  useWatchThrottled(
    n,
    (v) => {
      setThrottled(v)
    },
    150,
  )

  return (
    <div>
      <p>
        live: <strong>{n}</strong> - throttled: <strong>{throttled}</strong>
      </p>
      <button type='button' onClick={() => setN((x) => x + 1)}>
        +1
      </button>{' '}
      <button type='button' onClick={() => setN((x) => x + 20)}>
        +20
      </button>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useWatchThrottled`

**Signature:** `useWatchThrottled<T>(value: T, callback: (value: T, previous: T | undefined) => void, delay?: number, deps?: DependencyList): void`

#### Parameters

1. **`value`**
2. **`callback`**
3. **`delay`**
4. **`deps`**

#### Returns

`void`

## Copy-paste hook

### TypeScript

```tsx
import { DependencyList, useEffect, useRef } from 'react'

/**
 * Limits callback execution frequency for changing values.
 */
export default function useWatchThrottled<T>(
  value: T,
  callback: (value: T, previous: T | undefined) => void,
  delay = 200,
  deps: DependencyList = [],
): void {
  const previousRef = useRef<T | undefined>(undefined)
  const lastRunRef = useRef(0)
  const trailingRef = useRef<number | null>(null)

  useEffect(() => {
    const now = Date.now()
    const wait = Math.max(0, delay - (now - lastRunRef.current))

    const run = () => {
      callback(value, previousRef.current)
      previousRef.current = value
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay, ...deps])
}
```

### JavaScript

```js
import { useEffect, useRef } from 'react'

/**
 * Limits callback execution frequency for changing values.
 */
export default function useWatchThrottled(value, callback, delay = 200, deps = []) {
  const previousRef = useRef(undefined)
  const lastRunRef = useRef(0)
  const trailingRef = useRef(null)

  useEffect(() => {
    const now = Date.now()
    const wait = Math.max(0, delay - (now - lastRunRef.current))

    const run = () => {
      callback(value, previousRef.current)
      previousRef.current = value
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay, ...deps])
}
```
