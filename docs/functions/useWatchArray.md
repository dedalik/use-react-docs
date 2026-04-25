---
title: Watch array membership changes
sidebar_label: useWatchArray
category: Watch
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useWatchArray.tsx'
description: >-
  useWatchArray from @dedalik/use-react: diff array updates into added/removed items.
---

# useWatchArray()

<PackageData fn="useWatchArray" />

Last updated: 24/04/2026

## Overview

`useWatchArray` runs **`callback(next, previous, added, removed)`** on every effect where **`value`** (or **`deps`**) changes. **`added`** and **`removed`** are computed with **`includes`** ( **reference/shallow equality** per item): items present in **`next`** but not **`previous`**, and in **`previous`** but not **`next`**. It does not do deep diffing of element fields-use **stable ids** (strings) or **immutable** item references for predictable results. After each run, **`prevRef`** is set to the **`value`** array reference. **Duplicate** values in a list can make **`includes`**-based diffs ambiguous; treat as a **set-like** list of unique items for clear **added/removed** semantics.

### What it accepts

1. **`value`**: `T[]`
2. **`callback`**: `(value: T[], previous: T[], added: T[], removed: T[]) => void`
3. Optional **`deps`**: `DependencyList`

### What it returns

- **`void`**

## Usage

Tag list of strings: add and remove; show last **added** / **removed** side by side.

```tsx
import { useState } from 'react'
import useWatchArray from '@dedalik/use-react/useWatchArray'

function Example() {
  const [tags, setTags] = useState<string[]>(['a', 'b'])
  const [summary, setSummary] = useState('')

  useWatchArray(tags, (next, _prev, added, removed) => {
    setSummary(`added: [${added.join(', ')}] · removed: [${removed.join(', ')}] · size ${next.length}`)
  })

  return (
    <div>
      <p>tags: {tags.join(', ')}</p>
      <p>
        <button type='button' onClick={() => setTags((t) => [...t, 'c'])}>
          add c
        </button>{' '}
        <button type='button' onClick={() => setTags((t) => t.filter((x) => x !== 'a'))}>
          remove a
        </button>
      </p>
      <p>
        <small>{summary || '-'}</small>
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useWatchArray`

**Signature:** `useWatchArray<T>(value: T[], callback: (value: T[], previous: T[], added: T[], removed: T[]) => void, deps?: DependencyList): void`

#### Parameters

1. **`value`**
2. **`callback`**
3. **`deps`**

#### Returns

`void`

## Copy-paste hook

### TypeScript

```tsx
import { DependencyList, useEffect, useRef } from 'react'

/**
 * Watches array changes and reports added/removed items.
 */
export default function useWatchArray<T>(
  value: T[],
  callback: (value: T[], previous: T[], added: T[], removed: T[]) => void,
  deps: DependencyList = [],
): void {
  const prevRef = useRef<T[]>(value)

  useEffect(() => {
    const previous = prevRef.current
    const added = value.filter((item) => !previous.includes(item))
    const removed = previous.filter((item) => !value.includes(item))

    callback(value, previous, added, removed)
    prevRef.current = value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, ...deps])
}
```

### JavaScript

```js
import { useEffect, useRef } from 'react'

/**
 * Watches array changes and reports added/removed items.
 */
export default function useWatchArray(value, callback, deps = []) {
  const prevRef = useRef(value)

  useEffect(() => {
    const previous = prevRef.current
    const added = value.filter((item) => !previous.includes(item))
    const removed = previous.filter((item) => !value.includes(item))

    callback(value, previous, added, removed)
    prevRef.current = value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, ...deps])
}
```
