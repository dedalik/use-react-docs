---
title: Watch value changes immediately
sidebar_label: useWatchImmediate
category: Watch
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useWatchImmediate.tsx'
description: >-
  useWatchImmediate from @dedalik/use-react: run callback on mount and each source change.
---

# useWatchImmediate()

<PackageData fn="useWatchImmediate" />

Last updated: 24/04/2026

## Overview

`useWatchImmediate` runs your **`callback(value, previous)`** inside **`useEffect`** **after commit**, so it fires **on mount** ( **`previous`** is **`undefined`** ) and on **every** update where **`value`** or spread **`deps`** change. It always advances **`previous`** after each run. For referentially stable **`value`** (same object identity), the effect may not re-run-use **immutable** updates or **`deps`** for fields that are not part of **`value`**. This is the “watch this primitive/object reference” primitive; it does **not** deep-compare unless **`value`** changes by identity.

### What it accepts

1. **`value`**: `T`
2. **`callback`**: `(value: T, previous: T | undefined) => void`
3. Optional **`deps`**: React **`DependencyList`** (default **`[]`**) - merged into the effect deps after **`value`**

### What it returns

- **`void`**

## Usage

Log each **`count`** and show **`previous`** in the UI when it changes.

```tsx
import { useState } from 'react'
import useWatchImmediate from '@dedalik/use-react/useWatchImmediate'

function Example() {
  const [count, setCount] = useState(0)
  const [log, setLog] = useState<string[]>([])

  useWatchImmediate(count, (next, prev) => {
    setLog((lines) => [...lines.slice(-4), `next=${next}, prev=${prev === undefined ? '∅' : prev}`])
  })

  return (
    <div>
      <p>
        count: <strong>{count}</strong>
      </p>
      <button type='button' onClick={() => setCount((c) => c + 1)}>
        +1
      </button>
      <ul>
        {log.map((line, i) => (
          <li key={i}>{line}</li>
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

### `useWatchImmediate`

**Signature:** `useWatchImmediate<T>(value: T, callback: WatchImmediateCallback<T>, deps?: DependencyList): void`

#### Parameters

1. **`value`**
2. **`callback`**
3. **`deps`** (optional)

#### Returns

`void`

## Copy-paste hook

### TypeScript

```tsx
import { DependencyList, useEffect, useRef } from 'react'

export type WatchImmediateCallback<T> = (value: T, previous: T | undefined) => void

/**
 * Runs callback on mount and whenever value changes.
 */
export default function useWatchImmediate<T>(
  value: T,
  callback: WatchImmediateCallback<T>,
  deps: DependencyList = [],
): void {
  const previousRef = useRef<T | undefined>(undefined)

  useEffect(() => {
    callback(value, previousRef.current)
    previousRef.current = value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, ...deps])
}
```

### JavaScript

```js
import { useEffect, useRef } from 'react'

/**
 * Runs callback on mount and whenever value changes.
 */
export default function useWatchImmediate(value, callback, deps = []) {
  const previousRef = useRef(undefined)

  useEffect(() => {
    callback(value, previousRef.current)
    previousRef.current = value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, ...deps])
}
```
