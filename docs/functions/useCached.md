---
title: Memoized computed value by deps
sidebar_label: useCached
category: Utilities
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useCached.tsx'
description: >-
  useCached from @dedalik/use-react: useMemo with an explicit dependency list in the API.
---

# useCached()

<PackageData fn="useCached" />

Last updated: 24/04/2026

## Overview

`useCached` is a thin wrapper over **`useMemo`**: you pass a **factory** `() => T` and a React **`DependencyList`**, and the **computed value** is cached until **any** listed dependency **changes** (by `Object.is`). It exists so call sites can keep **custom** “dependency arrays” in the **same** position as the **factory**, mirroring the **`useMemo`**, **`useCallback`**, and **`useEffect`** mental model, while the implementation **disables** the **`react-hooks/exhaustive-deps`** rule **intentionally** because the **author** is responsible for the **`deps`** array. It does **not** add **deep** comparison or **auto**-tracking-**staleness** bugs are possible if **`deps`** omits a value read inside **`factory`**.

### What it accepts

1. **`factory`**: `() => T`
2. **`deps`**: `DependencyList`

### What it returns

- **`T`**

## Usage

**Derive** a **greeting** from **`name`** and **`title`**; the string **recomputes** only when those **deps** change.

```tsx
import { useState } from 'react'
import useCached from '@dedalik/use-react/useCached'

function Example() {
  const [title, setTitle] = useState('Dr')
  const [name, setName] = useState('River')

  const line = useCached(() => `${title}. ${name}`.trim(), [title, name])

  return (
    <div>
      <p>{line}</p>
      <label>
        Title
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Name
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useCached`

**Signature:** `useCached<T>(factory: () => T, deps: DependencyList): T`

## Copy-paste hook

### TypeScript

```tsx
import { DependencyList, useMemo } from 'react'

/**
 * Returns a memoized value computed from dependency list.
 */
export default function useCached<T>(factory: () => T, deps: DependencyList): T {
  return useMemo(factory, deps) // eslint-disable-line react-hooks/exhaustive-deps -- explicit deps are part of API
}
```

### JavaScript

```js
import { useMemo } from 'react'

/**
 * Returns a memoized value computed from dependency list.
 */
export default function useCached(factory, deps) {
  return useMemo(factory, deps) // eslint-disable-line react-hooks/exhaustive-deps -- explicit deps are part of API
}
```
