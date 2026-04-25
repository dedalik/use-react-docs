---
title: Return a sorted copy of an array
sidebar_label: useSorted
category: Array
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useSorted.tsx'
description: >-
  useSorted from @dedalik/use-react: memoized sorted array copy. TypeScript,
  tree-shakable import, examples, SSR notes.
---

# useSorted()

<PackageData fn="useSorted" />

Last updated: 24/04/2026

## Overview

`useSorted` returns a **new array** (never mutates **`values`**) and **`sort`s** a copy in **`useMemo`**. If you pass **`compareFn`**, it is used as the comparator; otherwise the hook uses the default **`<` as strings** sort (same as calling **`copy.sort()`** with no args). The memo **depends** on **`values`** and **`compareFn`**, so an **inline** comparator function re-runs the sort every render-wrap **`compareFn`** in **`useCallback`** for stable work. Use when you need a **derived, sorted** view of props or state without re-sorting on unrelated renders when dependencies are stable.

### What it accepts

1. **`values`**: `readonly T[]`
2. Optional **`compareFn`**: `(a, b) => number`

### What it returns

- **`T[]`**: new sorted array

## Usage

Sort user ids **numerically descending**; keep **`compare` stable** with **`useCallback`**.

```tsx
import { useCallback, useState } from 'react'
import useSorted from '@dedalik/use-react/useSorted'

function Example() {
  const [ids, setIds] = useState([12, 3, 7, 1])
  const compare = useCallback((a: number, b: number) => b - a, [])
  const highFirst = useSorted(ids, compare)

  return (
    <div>
      <p>Raw: {ids.join(', ')}</p>
      <p>High first: {highFirst.join(' → ')}</p>
      <button type='button' onClick={() => setIds((x) => [9, ...x, 0])}>
        change list
      </button>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useSorted`

**Signature:** `useSorted<T>(values: readonly T[], compareFn?: (a: T, b: T) => number): T[]`

## Copy-paste hook

### TypeScript

```tsx
import { useMemo } from 'react'

/**
 * Returns a memoized sorted copy of the input array.
 * Never mutates the original array.
 */
export default function useSorted<T>(values: readonly T[], compareFn?: (a: T, b: T) => number): T[] {
  return useMemo(() => {
    const copy = [...values]
    if (compareFn) {
      copy.sort(compareFn)
    } else {
      copy.sort()
    }
    return copy
  }, [values, compareFn])
}
```

### JavaScript

```js
import { useMemo } from 'react'

/**
 * Returns a memoized sorted copy of the input array.
 * Never mutates the original array.
 */
export default function useSorted(values, compareFn) {
  return useMemo(() => {
    const copy = [...values]
    if (compareFn) {
      copy.sort(compareFn)
    } else {
      copy.sort()
    }
    return copy
  }, [values, compareFn])
}
```
