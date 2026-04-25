---
title: Memoized array reduce
sidebar_label: useArrayReduce
category: Array
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useArrayReduce.tsx'
description: >-
  useArrayReduce from @dedalik/use-react: useMemo around Array.reduce for aggregates.
---

# useArrayReduce()

<PackageData fn="useArrayReduce" />

Last updated: 24/04/2026

## Overview

`useArrayReduce` memoizes **`source.reduce(reducer, initialValue)`** with dependencies **`[source, reducer, initialValue]`**. If **`reducer`** or **`initialValue`** is **recreated** each render, the reduce **re-runs** every time. Use **primitives** or **stable** **`reducer`** from **`useCallback`**. It is a drop-in **perf** wrapper for **sum / object build / string concat** from list data.

### What it accepts

1. **`source`**: `T[]`
2. **`reducer`**: `Array#reduce` callback
3. **`initialValue`**: `R` - **accumulator** start

### What it returns

- **`R`**

## Usage

**Sum** line amounts with **`initialValue` 0** and a **stable** reducer.

```tsx
import { useCallback, useState } from 'react'
import useArrayReduce from '@dedalik/use-react/useArrayReduce'

function Example() {
  const [amounts, setAmounts] = useState([10, 4, 2])
  const sum = useArrayReduce(
    amounts,
    useCallback((t: number, n: number) => t + n, []),
    0,
  )

  return (
    <div>
      <p>Total: {sum}</p>
      <button type='button' onClick={() => setAmounts((a) => [...a, 3])}>
        +3
      </button>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useArrayReduce`

**Signature:** `useArrayReduce<T, R>(source: T[], reducer: (acc: R, item: T, i: number, arr: T[]) => R, initialValue: R): R`

## Copy-paste hook

### TypeScript

```tsx
import { useMemo } from 'react'

/**
 * Memoized Array.reduce for derived aggregate values.
 */
export default function useArrayReduce<T, R>(
  source: T[],
  reducer: (previousValue: R, currentValue: T, currentIndex: number, array: T[]) => R,
  initialValue: R,
): R {
  return useMemo(() => source.reduce(reducer, initialValue), [source, reducer, initialValue])
}
```

### JavaScript

```js
import { useMemo } from 'react'

/**
 * Memoized Array.reduce for derived aggregate values.
 */
export default function useArrayReduce(source, reducer, initialValue) {
  return useMemo(() => source.reduce(reducer, initialValue), [source, reducer, initialValue])
}
```
