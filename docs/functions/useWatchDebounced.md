---
title: Debounce watched values
sidebar_label: useWatchDebounced
category: Watch
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useWatchDebounced.tsx'
description: >-
  useWatchDebounced from @dedalik/use-react: delay watch callback until value stops changing.
---

# useWatchDebounced()

<PackageData fn="useWatchDebounced" />

Last updated: 24/04/2026

## Overview

`useWatchDebounced` **schedules** **`callback(value, previous)`** after **`delay`** ms; if **`value`** (or **`deps`**) change again before the timer fires, the previous timeout is **cleared** and a new one starts-so the callback runs only after **`value` settles**. **`previous`** is the last value passed to a **completed** callback, not the last attempted value. Default **`delay`** is **200** ms. Each effect re-run for the same “burst” of changes resets the debounce. Use for **search** or **autosave** tied to user typing.

### What it accepts

1. **`value`**: `T`
2. **`callback`**: `(value: T, previous: T | undefined) => void`
3. **`delay`**: `number` (ms), default **200**
4. Optional **`deps`**: `DependencyList`

### What it returns

- **`void`**

## Usage

**400 ms** debounce on a search string; show the **stabilized** query in the status line.

```tsx
import { useState } from 'react'
import useWatchDebounced from '@dedalik/use-react/useWatchDebounced'

function Example() {
  const [q, setQ] = useState('')
  const [stable, setStable] = useState('')

  useWatchDebounced(
    q,
    (v) => {
      setStable(v)
    },
    400,
  )

  return (
    <div>
      <label>
        Search: <input value={q} onChange={(e) => setQ(e.target.value)} size={32} />
      </label>
      <p>
        Stabilized (400 ms after last keystroke): <code>{stable || '-'}</code>
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useWatchDebounced`

**Signature:** `useWatchDebounced<T>(value: T, callback: (value: T, previous: T | undefined) => void, delay?: number, deps?: DependencyList): void`

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
 * Delays callback execution until value settles.
 */
export default function useWatchDebounced<T>(
  value: T,
  callback: (value: T, previous: T | undefined) => void,
  delay = 200,
  deps: DependencyList = [],
): void {
  const previousRef = useRef<T | undefined>(undefined)

  useEffect(() => {
    const id = window.setTimeout(
      () => {
        callback(value, previousRef.current)
        previousRef.current = value
      },
      Math.max(0, delay),
    )

    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay, ...deps])
}
```

### JavaScript

```js
import { useEffect, useRef } from 'react'

/**
 * Delays callback execution until value settles.
 */
export default function useWatchDebounced(value, callback, delay = 200, deps = []) {
  const previousRef = useRef(undefined)

  useEffect(() => {
    const id = window.setTimeout(
      () => {
        callback(value, previousRef.current)
        previousRef.current = value
      },
      Math.max(0, delay),
    )

    return () => window.clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay, ...deps])
}
```
