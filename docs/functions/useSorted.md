---
title: Return a sorted copy of an array
sidebar_label: useSorted
category: Array
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useSorted'
description: >-
  useSorted from @dedalik/use-react: memoized sorted array copy. TypeScript,
  tree-shakable import, examples, SSR notes.
---

# useSorted()

<PackageData fn="useSorted" />

Last updated: 24/04/2026

## Overview

`useSorted` returns a memoized **sorted copy** of the input array and never mutates the source array. Use it for view-layer ordering when your state should stay in original insertion order.

### What it accepts

1. **`values`** — source array (or readonly array).
2. **`compareFn`** (optional) — comparator like `Array.prototype.sort`.

### What it returns

- `T[]` — sorted copy.

## SSR

Pure and deterministic from input values/comparator; safe for SSR.

## Usage

```tsx
import useSorted from '@dedalik/use-react/useSorted'

export default function SortedUsers({ users }: { users: { name: string }[] }) {
  const sorted = useSorted(users, (a, b) => a.name.localeCompare(b.name))
  return (
    <ul>
      {sorted.map((u) => (
        <li key={u.name}>{u.name}</li>
      ))}
    </ul>
  )
}
```

## API Reference

### `useSorted`

**Signature:** `useSorted<T>(values: readonly T[], compareFn?): T[]`

#### Parameters

1. **`values`** — array to sort.
2. **`compareFn`** — optional comparator.

#### Returns

Sorted array copy.

## Copy-paste hook

Source of truth: [`useSorted.tsx` on GitHub](https://github.com/dedalik/use-react/blob/main/src/hooks/useSorted.tsx).

## Type declarations

```ts
declare function useSorted<T>(values: readonly T[], compareFn?: (a: T, b: T) => number): T[]

export default useSorted
```
