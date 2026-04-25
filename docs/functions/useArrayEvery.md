---
title: Memoized array every
sidebar_label: useArrayEvery
category: Array
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useArrayEvery.tsx'
description: >-
  useArrayEvery from @dedalik/use-react: useMemo around Array.every.
---

# useArrayEvery()

<PackageData fn="useArrayEvery" />

Last updated: 24/04/2026

## Overview

`useArrayEvery` memoizes **`source.every(predicate)`**: **true** for an **empty** **source** (like native **every**), **false** if any item fails the test. Stabilize **`predicate`** with **`useCallback`**.

### What it accepts

1. **`source`**: `T[]`
2. **`predicate`**: `Array#every` callback

### What it returns

- **`boolean`**

## Usage

“All **done**” when every task’s **`status`** is **`'done'`**.

```tsx
import { useCallback, useState } from 'react'
import useArrayEvery from '@dedalik/use-react/useArrayEvery'

type Task = { id: string; status: 'open' | 'done' }

function Example() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', status: 'open' },
    { id: '2', status: 'done' },
  ])
  const allDone = useArrayEvery(
    tasks,
    useCallback((t: Task) => t.status === 'done', []),
  )

  return (
    <div>
      <p>{allDone ? 'All done' : 'Still work left'}</p>
      <button
        type='button'
        onClick={() => setTasks((T) => T.map((t) => (t.id === '1' ? { ...t, status: 'done' } : t)))}
      >
        finish first
      </button>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useArrayEvery`

**Signature:** `useArrayEvery<T>(source: T[], predicate: (item: T, index: number, array: T[]) => boolean): boolean`

## Copy-paste hook

### TypeScript

```tsx
import { useMemo } from 'react'

/**
 * Memoized Array.every for all-match checks.
 */
export default function useArrayEvery<T>(
  source: T[],
  predicate: (item: T, index: number, array: T[]) => boolean,
): boolean {
  return useMemo(() => source.every(predicate), [source, predicate])
}
```

### JavaScript

```js
import { useMemo } from 'react'

/**
 * Memoized Array.every for all-match checks.
 */
export default function useArrayEvery(source, predicate) {
  return useMemo(() => source.every(predicate), [source, predicate])
}
```
