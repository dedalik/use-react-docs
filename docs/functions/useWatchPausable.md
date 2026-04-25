---
title: Pausable value watcher
sidebar_label: useWatchPausable
category: Watch
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useWatchPausable.tsx'
description: >-
  useWatchPausable from @dedalik/use-react: pause and resume a watch on value changes.
---

# useWatchPausable()

<PackageData fn="useWatchPausable" />

Last updated: 24/04/2026

## Overview

`useWatchPausable` behaves like a standard **`value`** watcher-**`callback(value, previous)`** on each effect when **active**-but **`pause()`** / **`resume()`** toggle **`isActive`**. When **paused**, **`value`** can change without **invoking the callback** and **`previousRef`** is **not** updated during those commits (so when you **resume**, the _next_ run can still use the “last seen” previous from before pause, depending on React’s batching). The hook **returns** **`{ isActive, pause, resume }`**. Same **`deps` spread** pattern as other watch helpers. Use to temporarily silence expensive side effects (analytics, network).

### What it accepts

1. **`value`**: `T`
2. **`callback`**: `(value: T, previous: T | undefined) => void`
3. Optional **`deps`**: `DependencyList`

### What it returns

- **`isActive`**: `boolean` - `false` when paused
- **`pause`**: `() => void`
- **`resume`**: `() => void`

## Usage

A counter drives **`n`**; when **paused**, ticks do not update **`last`**.

```tsx
import { useState } from 'react'
import useWatchPausable from '@dedalik/use-react/useWatchPausable'

function Example() {
  const [n, setN] = useState(0)
  const [last, setLast] = useState<number | null>(null)
  const { isActive, pause, resume } = useWatchPausable(n, (v) => {
    setLast(v)
  })

  return (
    <div>
      <p>
        n: <strong>{n}</strong> - last seen by watcher: <strong>{last ?? '-'}</strong>
      </p>
      <p>watcher: {isActive ? 'active' : 'paused'}</p>
      <button type='button' onClick={() => setN((x) => x + 1)}>
        +1
      </button>{' '}
      <button type='button' onClick={isActive ? pause : resume}>
        {isActive ? 'Pause' : 'Resume'}
      </button>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useWatchPausable`

**Signature:** `useWatchPausable<T>(value: T, callback: (value: T, previous: T | undefined) => void, deps?: DependencyList): WatchPausableControls`

#### Parameters

1. **`value`**
2. **`callback`**
3. **`deps`**

#### Returns

**`WatchPausableControls`**

## Copy-paste hook

### TypeScript

```tsx
import { DependencyList, useCallback, useEffect, useRef, useState } from 'react'

export interface WatchPausableControls {
  isActive: boolean
  pause: () => void
  resume: () => void
}

/**
 * Watcher that can be paused/resumed.
 */
export default function useWatchPausable<T>(
  value: T,
  callback: (value: T, previous: T | undefined) => void,
  deps: DependencyList = [],
): WatchPausableControls {
  const previousRef = useRef<T | undefined>(undefined)
  const [isActive, setIsActive] = useState(true)

  const pause = useCallback(() => setIsActive(false), [])
  const resume = useCallback(() => setIsActive(true), [])

  useEffect(() => {
    if (!isActive) return

    callback(value, previousRef.current)
    previousRef.current = value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, value, ...deps])

  return { isActive, pause, resume }
}
```

### JavaScript

```js
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Watcher that can be paused/resumed.
 */
export default function useWatchPausable(value, callback, deps = []) {
  const previousRef = useRef(undefined)
  const [isActive, setIsActive] = useState(true)

  const pause = useCallback(() => setIsActive(false), [])
  const resume = useCallback(() => setIsActive(true), [])

  useEffect(() => {
    if (!isActive) return

    callback(value, previousRef.current)
    previousRef.current = value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, value, ...deps])

  return { isActive, pause, resume }
}
```
