---
title: Delay value updates until input settles
sidebar_label: useDebounce
category: State
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useDebounce.tsx'
description: >-
  useDebounce from @dedalik/use-react: Delay value updates until input settles.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useDebounce()

<PackageData fn="useDebounce" />
<HookLiveDemo demo="useDebounce/basic" title="Live demo: useDebounce" />

## Overview

`useDebounce` returns a delayed version of a rapidly changing value and updates it only after the value stays unchanged for the given timeout. This helps reduce noisy updates during typing, scrolling, or slider interaction, so expensive work (like filtering, API calls, or validation) runs less often and only after user input settles.

### What it accepts

- `value: T`.
- `delay = 500`.

### What it returns

- Returns `T`.

## Usage

Real-world example: instant input with delayed search trigger.

```tsx
import { useState } from 'react'
import useDebounce from '@dedalik/use-react/useDebounce'

function Example() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 400)

  return (
    <div>
      <h3>Product Search</h3>
      <input
        type='search'
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder='Type to search...'
      />

      <p>Typing value: {query || '-'}</p>
      <p>Debounced value (400ms): {debouncedQuery || '-'}</p>

      {debouncedQuery ? <p>Searching API for: "{debouncedQuery}"</p> : <p>Start typing to trigger search.</p>}
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useDebounce`

**Signature:** `useDebounce(value: T, delay = 500): T`

#### Parameters

1. **`value`** (`T`) - See type in signature.
2. **Parameter** - `delay`.

#### Returns

Returns `T`.

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

```js
import { useEffect, useState } from 'react'

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
