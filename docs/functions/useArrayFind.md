---
title: Memoized array find
sidebar_label: useArrayFind
category: Array
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useArrayFind.tsx'
description: >-
  useArrayFind from @dedalik/use-react: useMemo around Array.find.
---

# useArrayFind()

<PackageData fn="useArrayFind" />

Last updated: 24/04/2026

## Overview

`useArrayFind` returns **`source.find(predicate)`** cached in **`useMemo`**. The result is **undefined** when nothing matches, same as native **find**. **`predicate`** identity is part of the dependency list; stabilize with **`useCallback`**. It does not **short-circuit** render work across the list beyond **one** `find` pass when dependencies change.

### What it accepts

1. **`source`**: `T[]`
2. **`predicate`**: `Array#find` callback

### What it returns

- **`T | undefined`**

## Usage

Find the first user with **`role === 'admin'`** in a small table.

```tsx
import { useCallback, useState } from 'react'
import useArrayFind from '@dedalik/use-react/useArrayFind'

type User = { id: string; name: string; role: 'admin' | 'user' }

function Example() {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'A', role: 'user' },
    { id: '2', name: 'B', role: 'admin' },
  ])
  const firstAdmin = useArrayFind(
    users,
    useCallback((u: User) => u.role === 'admin', []),
  )

  return <p>First admin: {firstAdmin ? firstAdmin.name : '-'}</p>
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useArrayFind`

**Signature:** `useArrayFind<T>(source: T[], predicate: (item: T, index: number, array: T[]) => boolean): T | undefined`

## Copy-paste hook

### TypeScript

```tsx
import { useMemo } from 'react'

/**
 * Memoized Array.find for derived item lookup.
 */
export default function useArrayFind<T>(
  source: T[],
  predicate: (item: T, index: number, array: T[]) => boolean,
): T | undefined {
  return useMemo(() => source.find(predicate), [source, predicate])
}
```

### JavaScript

```js
import { useMemo } from 'react'

/**
 * Memoized Array.find for derived item lookup.
 */
export default function useArrayFind(source, predicate) {
  return useMemo(() => source.find(predicate), [source, predicate])
}
```
