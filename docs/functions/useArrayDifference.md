---
title: Memoized array difference
sidebar_label: useArrayDifference
category: Array
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useArrayDifference.tsx'
description: >-
  useArrayDifference from @dedalik/use-react: items in source not in values (includes).
---

# useArrayDifference()

<PackageData fn="useArrayDifference" />

Last updated: 24/04/2026

## Overview

`useArrayDifference` returns **elements of `source` that are not in `values`**, using **`includes`** ( **strict** equality) for membership-so it is a **set difference** in **value** space, not **keyed** by id unless your **T** is an id type. **Order** of **`source`** is **preserved**; **duplicates** in **`source`** remain if not in **`values`**. It memoizes on **`[source, values]`** references. For **object** items, only **same** references are removed from consideration when present in **`values`**.

### What it accepts

1. **`source`**: `T[]` - “minuend”
2. **`values`**: `T[]` - “subtrahend” (members to exclude)

### What it returns

- **`T[]`**

## Usage

**Tags** on a draft **minus** tags already **saved** on the server (string ids).

```tsx
import { useState } from 'react'
import useArrayDifference from '@dedalik/use-react/useArrayDifference'

function Example() {
  const [serverTags, setServerTags] = useState<string[]>(['a', 'b'])
  const [draftTags, setDraftTags] = useState<string[]>(['a', 'b', 'c', 'c'])
  const newOnly = useArrayDifference(draftTags, serverTags)

  return (
    <div>
      <p>server: {serverTags.join(', ')}</p>
      <p>draft: {draftTags.join(', ')}</p>
      <p>new vs server: {newOnly.join(', ') || '-'}</p>
      <button type='button' onClick={() => setServerTags((s) => [...s, 'c'])}>
        server gains “c”
      </button>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useArrayDifference`

**Signature:** `useArrayDifference<T>(source: T[], values: T[]): T[]`

## Copy-paste hook

### TypeScript

```tsx
import { useMemo } from 'react'

/**
 * Memoized difference between source and values arrays.
 */
export default function useArrayDifference<T>(source: T[], values: T[]): T[] {
  return useMemo(() => source.filter((item) => !values.includes(item)), [source, values])
}
```

### JavaScript

```js
import { useMemo } from 'react'

/**
 * Memoized difference between source and values arrays.
 */
export default function useArrayDifference(source, values) {
  return useMemo(() => source.filter((item) => !values.includes(item)), [source, values])
}
```
