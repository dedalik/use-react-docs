---
title: Memoized array some
sidebar_label: useArraySome
category: Array
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useArraySome.tsx'
description: >-
  useArraySome from @dedalik/use-react: useMemo around Array.some.
---

# useArraySome()

<PackageData fn="useArraySome" />

Last updated: 24/04/2026

## Overview

`useArraySome` memoizes **`source.some(predicate)`** and returns a **boolean**. It is the **O(n)** “any” check with the same **reference** rules for **`predicate`** as the other **useArray\*** helpers. Empty **source** yields **false**.

### What it accepts

1. **`source`**: `T[]`
2. **`predicate`**: `Array#some` callback

### What it returns

- **`boolean`**

## Usage

Show a warning if **any** score is **under 50**.

```tsx
import { useCallback, useState } from 'react'
import useArraySome from '@dedalik/use-react/useArraySome'

function Example() {
  const [scores, setScores] = useState([80, 72, 40, 90])
  const hasFail = useArraySome(
    scores,
    useCallback((s: number) => s < 50, []),
  )

  return (
    <div>
      <p>Scores: {scores.join(', ')}</p>
      {hasFail && <p role='alert'>At least one score needs a retake.</p>}
      <button type='button' onClick={() => setScores((S) => S.map((n) => n + 5))}>
        curve +5
      </button>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useArraySome`

**Signature:** `useArraySome<T>(source: T[], predicate: (item: T, index: number, array: T[]) => boolean): boolean`

## Copy-paste hook

### TypeScript

```tsx
import { useMemo } from 'react'

/**
 * Memoized Array.some for derived existence checks.
 */
export default function useArraySome<T>(
  source: T[],
  predicate: (item: T, index: number, array: T[]) => boolean,
): boolean {
  return useMemo(() => source.some(predicate), [source, predicate])
}
```

### JavaScript

```js
import { useMemo } from 'react'

/**
 * Memoized Array.some for derived existence checks.
 */
export default function useArraySome(source, predicate) {
  return useMemo(() => source.some(predicate), [source, predicate])
}
```
