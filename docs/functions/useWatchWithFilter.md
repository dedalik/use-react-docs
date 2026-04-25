---
title: Watcher with predicate filter
sidebar_label: useWatchWithFilter
category: Watch
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useWatchWithFilter.tsx'
description: >-
  useWatchWithFilter from @dedalik/use-react: run a watch only when a predicate matches.
---

# useWatchWithFilter()

<PackageData fn="useWatchWithFilter" />

Last updated: 24/04/2026

## Overview

`useWatchWithFilter` runs **`callback(value, previous)`** **only** when **`filter(value, previous)`** returns **true**; **either way**, it **always** updates **stored** **`previousRef`** to **`value`**, so a later change can still be evaluated. Include **`filter`** in dependencies-if the function identity **changes** every render, the effect re-runs often. Use for "only when number increases" or "ignore undefined → defined churn" patterns. It is **shallow** like other watchers: **`value`** is whatever React passed into the effect dependency array.

### What it accepts

1. **`value`**: `T`
2. **`callback`**: `(value: T, previous: T | undefined) => void`
3. **`filter`**: `(next: T, previous: T | undefined) => boolean`
4. Optional **`deps`**: `DependencyList`

### What it returns

- **`void`**

## Usage

Run the callback **only** when the new count is a **multiple of 3**; intermediate updates still advance **`previous`**, so parity checks stay consistent.

```tsx
import { useState } from 'react'
import useWatchWithFilter from '@dedalik/use-react/useWatchWithFilter'

function Example() {
  const [n, setN] = useState(0)
  const [hits, setHits] = useState<string[]>([])

  useWatchWithFilter(
    n,
    (v) => {
      setHits((h) => [...h, `fired at ${v}`])
    },
    (next) => next > 0 && next % 3 === 0,
  )

  return (
    <div>
      <p>
        n: <strong>{n}</strong>
      </p>
      <button type='button' onClick={() => setN((x) => x + 1)}>
        +1
      </button>
      <p>Filter hits: {hits.length ? hits.join(' · ') : '-'}</p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useWatchWithFilter`

**Signature:** `useWatchWithFilter<T>(value: T, callback: (value: T, previous: T | undefined) => void, filter: WatchFilter<T>, deps?: DependencyList): void`

#### Parameters

1. **`value`**
2. **`callback`**
3. **`filter`**
4. **`deps`**

#### Returns

`void`

**Type** - `WatchFilter<T> = (next: T, previous: T | undefined) => boolean`

## Copy-paste hook

### TypeScript

```tsx
import { DependencyList, useEffect, useRef } from 'react'

export type WatchFilter<T> = (next: T, previous: T | undefined) => boolean

/**
 * Runs watcher callback only when filter returns true.
 */
export default function useWatchWithFilter<T>(
  value: T,
  callback: (value: T, previous: T | undefined) => void,
  filter: WatchFilter<T>,
  deps: DependencyList = [],
): void {
  const previousRef = useRef<T | undefined>(undefined)

  useEffect(() => {
    if (filter(value, previousRef.current)) {
      callback(value, previousRef.current)
    }
    previousRef.current = value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, filter, ...deps])
}
```

### JavaScript

```js
import { useEffect, useRef } from 'react'

/**
 * Runs watcher callback only when filter returns true.
 */
export default function useWatchWithFilter(value, callback, filter, deps = []) {
  const previousRef = useRef(undefined)

  useEffect(() => {
    if (filter(value, previousRef.current)) {
      callback(value, previousRef.current)
    }
    previousRef.current = value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, filter, ...deps])
}
```
