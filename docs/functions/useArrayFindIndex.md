---
title: Memoized array findIndex
sidebar_label: useArrayFindIndex
category: Array
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useArrayFindIndex.tsx'
description: >-
  useArrayFindIndex from @dedalik/use-react: useMemo around Array.findIndex.
---

# useArrayFindIndex()

<PackageData fn="useArrayFindIndex" />

Last updated: 24/04/2026

## Overview

`useArrayFindIndex` memoizes **`source.findIndex(predicate)`**: returns **-1** if no match, like the native method. Same **dependency** story as the other **useArray\*** hooks-**`predicate`** should be **stable** when possible.

### What it accepts

1. **`source`**: `T[]`
2. **`predicate`**: `Array#findIndex` callback

### What it returns

- **`number`**

## Usage

Highlight the first **even** number’s **index** in a list.

```tsx
import { useCallback, useState } from 'react'
import useArrayFindIndex from '@dedalik/use-react/useArrayFindIndex'

function Example() {
  const [nums, setNums] = useState([1, 3, 4, 5, 6])
  const firstEvenIndex = useArrayFindIndex(
    nums,
    useCallback((n: number) => n % 2 === 0, []),
  )

  return (
    <div>
      <p>First even at index: {firstEvenIndex}</p>
      <ul>
        {nums.map((n, i) => (
          <li key={i} style={{ fontWeight: i === firstEvenIndex ? 700 : 400 }}>
            {n}
          </li>
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

### `useArrayFindIndex`

**Signature:** `useArrayFindIndex<T>(source: T[], predicate: (item: T, index: number, array: T[]) => boolean): number`

## Copy-paste hook

### TypeScript

```tsx
import { useMemo } from 'react'

/**
 * Memoized Array.findIndex for derived index lookup.
 */
export default function useArrayFindIndex<T>(
  source: T[],
  predicate: (item: T, index: number, array: T[]) => boolean,
): number {
  return useMemo(() => source.findIndex(predicate), [source, predicate])
}
```

### JavaScript

```js
import { useMemo } from 'react'

/**
 * Memoized Array.findIndex for derived index lookup.
 */
export default function useArrayFindIndex(source, predicate) {
  return useMemo(() => source.findIndex(predicate), [source, predicate])
}
```
