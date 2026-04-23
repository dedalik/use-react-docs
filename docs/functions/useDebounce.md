---
title: Delay value updates until input settles
sidebar_label: useDebounce
category: State
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useDebounce'
description: >-
  useDebounce from @dedalik/use-react: Delay value updates until input settles.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useDebounce()

<PackageData fn="useDebounce" />

Last updated: 23/04/2026, 15:56

## Overview

`useDebounce` delays value updates until changes stop for the configured delay.

Beginners often use it for search inputs to avoid hitting the API on every keystroke and to smooth expensive computations.

### What it accepts

- `value`: value to debounce.
- `delay` (optional): delay in milliseconds.

### What it returns

- Debounced value with the same type as the input value.

`useDebounce` postpones value updates until the value stops changing for a specified delay. It is useful for search inputs and API calls where every keystroke should not trigger a request.

## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import { useState } from 'react'
import useDebounce from '@dedalik/use-react/useDebounce'

function SearchBoxExample() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 400)

  return (
    <div>
      <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder='Type quickly...' />
      <p>Debounced: {debouncedQuery}</p>
    </div>
  )
}

export default function SearchBoxDemo() {
  return <SearchBoxExample />
}
```

## API Reference

### `useDebounce`

**Signature:** `useDebounce<T>(value: T, delay?: number): T`

#### Parameters

1. **`value`** - Any value to debounce (string, number, object, etc.).
2. **`delay`** - Optional debounce window in milliseconds (default `500`).

#### Returns

The latest **debounced** value: it updates only after `value` stops changing for `delay` ms.

## Copy-paste hook

```tsx
import { useEffect, useState } from 'react'

/**
 * Delays value updates until changes stop for the provided delay.
 */
export default function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timeoutId = globalThis.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      globalThis.clearTimeout(timeoutId)
    }
  }, [value, delay])

  return debouncedValue
}

export type UseDebounceType = ReturnType<typeof useDebounce>
```

### JavaScript version

```js
import { useEffect, useState } from 'react'

/**
 * Delays value updates until changes stop for the provided delay.
 */
export default function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = globalThis.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      globalThis.clearTimeout(timeoutId)
    }
  }, [value, delay])

  return debouncedValue
}
```

## Type declarations

```ts
declare function useDebounce<T>(value: T, delay?: number): T
export default useDebounce
```
