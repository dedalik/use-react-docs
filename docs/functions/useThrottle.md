---
title: Limit update frequency
sidebar_label: useThrottle
category: State
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useThrottle.tsx'
description: >-
  useThrottle from @dedalik/use-react: Limit update frequency. TypeScript,
  tree-shakable import, examples, SSR notes.
---

# useThrottle()

<PackageData fn="useThrottle" />

Last updated: 24/04/2026

## Overview

`useThrottle` returns a throttled copy of a fast-changing value: it updates at most once per `delay` window while `value` keeps changing, and schedules a trailing update so the output eventually catches up to the latest input. This is a good fit for high-frequency sources like pointer move, scroll position, or rapid slider changes where you want periodic UI or computation without running work on every single event.

### What it accepts

- `value: T`.
- `delay = 500`.

### What it returns

- Returns `T`.

## Usage

Real-world example: keep the input responsive while throttling a derived label used for expensive work (filtering, chart updates, preview text).

```tsx
import { useState } from 'react'
import useThrottle from '@dedalik/use-react/useThrottle'

function Example() {
  const [query, setQuery] = useState('')
  const throttledQuery = useThrottle(query, 300)

  return (
    <div>
      <h3>Search</h3>
      <input
        type='search'
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder='Type quickly...'
      />
      <p>Live value: {query || '-'}</p>
      <p>Throttled value (300ms): {throttledQuery || '-'}</p>
      {throttledQuery ? <p>Would run heavy work for: "{throttledQuery}"</p> : <p>Start typing.</p>}
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useThrottle`

**Signature:** `useThrottle(value: T, delay = 500): T`

#### Parameters

1. **`value`** (`T`) - The fast-changing source value to throttle.
2. **`delay`** (optional `number`) - Minimum time between emitted updates, in milliseconds. Default: `500`.

#### Returns

Returns `T`.

## Copy-paste hook

```tsx
import { useEffect, useRef, useState } from 'react'

export default function useThrottle<T>(value: T, delay = 500): T {
  const [throttledValue, setThrottledValue] = useState(value)
  const lastExecuted = useRef(0)

  useEffect(() => {
    const now = Date.now()
    const remaining = delay - (now - lastExecuted.current)

    if (remaining <= 0) {
      lastExecuted.current = now
      setThrottledValue(value)
      return
    }

    const timeoutId = globalThis.setTimeout(() => {
      lastExecuted.current = Date.now()
      setThrottledValue(value)
    }, remaining)

    return () => globalThis.clearTimeout(timeoutId)
  }, [delay, value])

  return throttledValue
}
```

```js
import { useEffect, useRef, useState } from 'react'

export default function useThrottle(value, delay = 500) {
  const [throttledValue, setThrottledValue] = useState(value)
  const lastExecuted = useRef(0)

  useEffect(() => {
    const now = Date.now()
    const remaining = delay - (now - lastExecuted.current)

    if (remaining <= 0) {
      lastExecuted.current = now
      setThrottledValue(value)
      return
    }

    const timeoutId = globalThis.setTimeout(() => {
      lastExecuted.current = Date.now()
      setThrottledValue(value)
    }, remaining)

    return () => globalThis.clearTimeout(timeoutId)
  }, [delay, value])

  return throttledValue
}
```
