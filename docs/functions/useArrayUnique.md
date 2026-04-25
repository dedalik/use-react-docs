---
title: Memoized unique array (Set)
sidebar_label: useArrayUnique
category: Array
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useArrayUnique.tsx'
description: >-
  useArrayUnique from @dedalik/use-react: first-seen unique values via Set.
---

# useArrayUnique()

<PackageData fn="useArrayUnique" />

Last updated: 24/04/2026

## Overview

`useArrayUnique` builds **`Array.from(new Set(source))`**: **Set** uses **SameValueZero** (like **`Map`** keys), so **`NaN`** is handled once, **+0** and **-0** merge, and **object** elements are only **deduped** by **reference**-two different `{a:1}` **objects** both stay. **Order** is **first-seen** order of **Set** iteration. The result is **memoized** on **`[source]`** by **reference**-a **new** array with the same items still **recomputes** the set.

### What it accepts

1. **`source`**: `T[]`

### What it returns

- **`T[]`**: new array of **unique** items

## Usage

Deduplicate string **id**s chosen in a **multi-select**-style list.

```tsx
import { useState } from 'react'
import useArrayUnique from '@dedalik/use-react/useArrayUnique'

const IDS = ['u1', 'u2', 'u3', 'u1', 'u2'] as const

function Example() {
  const [picked, setPicked] = useState<string[]>(['u1', 'u1', 'u3', 'u1'])
  const unique = useArrayUnique(picked)

  return (
    <div>
      <p>picked (with dupes): {picked.join(' → ')}</p>
      <p>unique: {unique.join(' → ')}</p>
      {IDS.map((id) => (
        <button key={id} type='button' onClick={() => setPicked((p) => [...p, id])}>
          +{id}
        </button>
      ))}
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useArrayUnique`

**Signature:** `useArrayUnique<T>(source: T[]): T[]`

## Copy-paste hook

### TypeScript

```tsx
import { useMemo } from 'react'

/**
 * Memoized unique list preserving first-seen order.
 */
export default function useArrayUnique<T>(source: T[]): T[] {
  return useMemo(() => Array.from(new Set(source)), [source])
}
```

### JavaScript

```js
import { useMemo } from 'react'

/**
 * Memoized unique list preserving first-seen order.
 */
export default function useArrayUnique(source) {
  return useMemo(() => Array.from(new Set(source)), [source])
}
```
