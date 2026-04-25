---
title: Memoized array includes
sidebar_label: useArrayIncludes
category: Array
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useArrayIncludes.tsx'
description: >-
  useArrayIncludes from @dedalik/use-react: useMemo around Array.includes.
---

# useArrayIncludes()

<PackageData fn="useArrayIncludes" />

Last updated: 24/04/2026

## Overview

`useArrayIncludes` memoizes **`source.includes(searchElement)`** (strict equality **`===`**, like the native method). For **objects**, only the **same reference** matches. The memo key is **`[searchElement, source]`**-a new **source** array reference still recomputes the check even if elements are the same.

### What it accepts

1. **`source`**: `T[]`
2. **`searchElement`**: `T`

### What it returns

- **`boolean`**

## Usage

Check if the **picked** tag is one of the **suggested** tags.

```tsx
import { useState } from 'react'
import useArrayIncludes from '@dedalik/use-react/useArrayIncludes'

const SUGGESTED = ['bug', 'docs', 'ux'] as const

function Example() {
  const [tag, setTag] = useState('bug')
  const isSuggested = useArrayIncludes([...SUGGESTED], tag)

  return (
    <div>
      <p>
        tag “{tag}” is <strong>{isSuggested ? 'in' : 'not in'}</strong> the list
      </p>
      <p>
        <input value={tag} onChange={(e) => setTag(e.target.value)} size={20} />
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useArrayIncludes`

**Signature:** `useArrayIncludes<T>(source: T[], searchElement: T): boolean`

## Copy-paste hook

### TypeScript

```tsx
import { useMemo } from 'react'

/**
 * Memoized Array.includes for membership checks.
 */
export default function useArrayIncludes<T>(source: T[], searchElement: T): boolean {
  return useMemo(() => source.includes(searchElement), [searchElement, source])
}
```

### JavaScript

```js
import { useMemo } from 'react'

/**
 * Memoized Array.includes for membership checks.
 */
export default function useArrayIncludes(source, searchElement) {
  return useMemo(() => source.includes(searchElement), [searchElement, source])
}
```
