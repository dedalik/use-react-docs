---
title: Memoized array map
sidebar_label: useArrayMap
category: Array
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useArrayMap.tsx'
description: >-
  useArrayMap from @dedalik/use-react: useMemo around Array.map for derived rows.
---

# useArrayMap()

<PackageData fn="useArrayMap" />

Last updated: 24/04/2026

## Overview

`useArrayMap` is a thin **`useMemo(() => source.map(mapper), [source, mapper])`**: the **mapped** result is **recomputed** only when **`source`** or **`mapper`** (by **reference**) changes. If **`mapper`** is an **inline** function, it is new every render and the map **re-runs** every time-**stabilize** with **`useCallback`**. It does not **mutate** **`source`**. Use to derive **view models** or **React elements** from list data without hand-writing **`useMemo`** each time.

### What it accepts

1. **`source`**: `T[]`
2. **`mapper`**: same signature as **`Array.prototype.map`**

### What it returns

- **`R[]`**

## Usage

Map cart line ids to **line totals**; **`mapLine`** is **stable** via **`useCallback`**.

```tsx
import { useCallback, useState } from 'react'
import useArrayMap from '@dedalik/use-react/useArrayMap'

type Line = { id: string; qty: number; price: number }

function Example() {
  const [lines, setLines] = useState<Line[]>([
    { id: 'a', qty: 1, price: 10 },
    { id: 'b', qty: 2, price: 4 },
  ])
  const mapLine = useCallback((l: Line) => l.qty * l.price, [])
  const subtotals = useArrayMap(lines, mapLine)

  return (
    <div>
      <ul>
        {subtotals.map((s, i) => (
          <li key={lines[i].id}>
            {lines[i].id}: {s} ({lines[i].qty} × {lines[i].price})
          </li>
        ))}
      </ul>
      <button type='button' onClick={() => setLines((L) => [...L, { id: 'z', qty: 1, price: 1 }])}>
        add line
      </button>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useArrayMap`

**Signature:** `useArrayMap<T, R>(source: T[], mapper: (item: T, index: number, array: T[]) => R): R[]`

## Copy-paste hook

### TypeScript

```tsx
import { useMemo } from 'react'

/**
 * Memoized Array.map for derived list values.
 */
export default function useArrayMap<T, R>(source: T[], mapper: (item: T, index: number, array: T[]) => R): R[] {
  return useMemo(() => source.map(mapper), [source, mapper])
}
```

### JavaScript

```js
import { useMemo } from 'react'

/**
 * Memoized Array.map for derived list values.
 */
export default function useArrayMap(source, mapper) {
  return useMemo(() => source.map(mapper), [source, mapper])
}
```
