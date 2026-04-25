---
title: Memoized last matching array element
sidebar_label: useArrayFindLast
category: Array
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useArrayFindLast.tsx'
description: >-
  useArrayFindLast from @dedalik/use-react: find last match without relying on findLast.
---

# useArrayFindLast()

<PackageData fn="useArrayFindLast" />

Last updated: 24/04/2026

## Overview

`useArrayFindLast` walks **from the end** of **`source`** and returns the **first** item (i.e. **last** in array order) that satisfies **`predicate`**, or **`undefined`**. The implementation uses a **for** loop (no dependency on **`Array.prototype.findLast`**), which helps in environments where that method is **missing** or you want the same behavior everywhere. It is still wrapped in **`useMemo([source, predicate])`**. **Stabilize** **`predicate`**.

### What it accepts

1. **`source`**: `T[]`
2. **`predicate`**: same idea as **find** / **findIndex**

### What it returns

- **`T | undefined`**

## Usage

Get the **last** **even** number in a log of integers.

```tsx
import { useCallback, useState } from 'react'
import useArrayFindLast from '@dedalik/use-react/useArrayFindLast'

function Example() {
  const [log, setLog] = useState([1, 2, 3, 4, 3, 6])
  const lastEven = useArrayFindLast(
    log,
    useCallback((n: number) => n % 2 === 0, []),
  )

  return (
    <div>
      <p>log: {log.join(', ')}</p>
      <p>last even: {lastEven ?? '-'}</p>
      <button type='button' onClick={() => setLog((L) => [...L, 8])}>
        push 8
      </button>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useArrayFindLast`

**Signature:** `useArrayFindLast<T>(source: T[], predicate: (item: T, index: number, array: T[]) => boolean): T | undefined`

## Copy-paste hook

### TypeScript

```tsx
import { useMemo } from 'react'

/**
 * Memoized Array.findLast fallback-safe lookup.
 */
export default function useArrayFindLast<T>(
  source: T[],
  predicate: (item: T, index: number, array: T[]) => boolean,
): T | undefined {
  return useMemo(() => {
    for (let i = source.length - 1; i >= 0; i -= 1) {
      const item = source[i]
      if (predicate(item, i, source)) return item
    }
    return undefined
  }, [source, predicate])
}
```

### JavaScript

```js
import { useMemo } from 'react'

/**
 * Memoized Array.findLast fallback-safe lookup.
 */
export default function useArrayFindLast(source, predicate) {
  return useMemo(() => {
    for (let i = source.length - 1; i >= 0; i -= 1) {
      const item = source[i]
      if (predicate(item, i, source)) return item
    }
    return undefined
  }, [source, predicate])
}
```
