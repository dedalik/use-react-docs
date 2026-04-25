---
title: Memoized array filter
sidebar_label: useArrayFilter
category: Array
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useArrayFilter.tsx'
description: >-
  useArrayFilter from @dedalik/use-react: useMemo around Array.filter for derived subset.
---

# useArrayFilter()

<PackageData fn="useArrayFilter" />

Last updated: 24/04/2026

## Overview

`useArrayFilter` memoizes **`source.filter(predicate)`** with dependencies **`[source, predicate]`**. The **original** array is not modified. A new **inline** **`predicate`** each render **breaks** memoization-**use `useCallback`**. Pairs with [`useArrayMap`](./useArrayMap) in pipelines (filter then map) when each step’s functions are **stable**.

### What it accepts

1. **`source`**: `T[]`
2. **`predicate`**: `Array#filter` callback

### What it returns

- **`T[]`**: filtered copy

## Usage

Keep only **in-stock** rows with a **stable** predicate.

```tsx
import { useCallback, useState } from 'react'
import useArrayFilter from '@dedalik/use-react/useArrayFilter'

type Row = { sku: string; qty: number }

function Example() {
  const [rows, setRows] = useState<Row[]>([
    { sku: 'x', qty: 0 },
    { sku: 'y', qty: 2 },
  ])
  const inStock = useArrayFilter(
    rows,
    useCallback((r: Row) => r.qty > 0, []),
  )

  return (
    <div>
      <p>In stock: {inStock.map((r) => r.sku).join(', ')}</p>
      <button type='button' onClick={() => setRows((R) => R.map((r) => (r.sku === 'x' ? { ...r, qty: 5 } : r)))}>
        restock x
      </button>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useArrayFilter`

**Signature:** `useArrayFilter<T>(source: T[], predicate: (item: T, index: number, array: T[]) => boolean): T[]`

## Copy-paste hook

### TypeScript

```tsx
import { useMemo } from 'react'

/**
 * Memoized Array.filter for derived subset values.
 */
export default function useArrayFilter<T>(
  source: T[],
  predicate: (item: T, index: number, array: T[]) => boolean,
): T[] {
  return useMemo(() => source.filter(predicate), [source, predicate])
}
```

### JavaScript

```js
import { useMemo } from 'react'

/**
 * Memoized Array.filter for derived subset values.
 */
export default function useArrayFilter(source, predicate) {
  return useMemo(() => source.filter(predicate), [source, predicate])
}
```
