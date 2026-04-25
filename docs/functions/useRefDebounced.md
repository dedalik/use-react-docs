---
title: Debounced reactive value
sidebar_label: useRefDebounced
category: Reactivity
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useRefDebounced.tsx'
description: >-
  useRefDebounced from @dedalik/use-react: expose a debounced version of a changing value.
---

# useRefDebounced()

<PackageData fn="useRefDebounced" />

Last updated: 24/04/2026

## Overview

`useRefDebounced` (implementation **`useRefDebounced`**) mirrors a **`value`** in **state** and updates the mirror **only after** **`value`** has stopped changing for **`delay`** ms (default **200**). Each new **`value`** (or **`delay`**) cancels the previous **timeout** and starts a new one, so the returned snapshot **lags** during rapid input-classic **debounce** for “run search when the user pauses.” The initial `useState` is **`value`**, so the debounced result **starts equal** to the first render’s **`value`**. The hook is **read-only** from the outside: you do not pass a **setter**; drive **`value`** from parent state. Not suitable for “leading edge” or **max wait** without changing the code.

### What it accepts

1. **`value`**: `T` - source to mirror
2. **`delay`**: `number` (ms), default **200**

### What it returns

- **`T`**: the **debounced** snapshot of **`value`**

## Usage

**Live** text vs **300 ms** debounced copy: use the debounced string for a “searching…” label to avoid work on every keystroke.

```tsx
import { useState } from 'react'
import useRefDebounced from '@dedalik/use-react/useRefDebounced'

function Example() {
  const [q, setQ] = useState('')
  const stable = useRefDebounced(q, 300)

  return (
    <div>
      <label>
        Type: <input value={q} onChange={(e) => setQ(e.target.value)} size={32} />
      </label>
      <p>live: {q || '-'}</p>
      <p>
        debounced (300 ms after last change): <strong>{stable || '-'}</strong>
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useRefDebounced`

**Signature:** `useRefDebounced<T>(value: T, delay?: number): T`

#### Parameters

1. **`value`**
2. **`delay`**

#### Returns

Debounced `T` (a value read during render, backed by `useState` in the implementation).

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

/**
 * Debounced mirror of any input value.
 */
export default function useRefDebounced<T>(value: T, delay = 200): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), Math.max(0, delay))
    return () => window.clearTimeout(id)
  }, [delay, value])

  return debounced
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

/**
 * Debounced mirror of any input value.
 */
export default function useRefDebounced(value, delay = 200) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), Math.max(0, delay))
    return () => window.clearTimeout(id)
  }, [delay, value])

  return debounced
}
```
