---
title: Async state loader
sidebar_label: useAsyncState
category: State
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useAsyncState.tsx'
description: >-
  useAsyncState from @dedalik/use-react: load async data with managed state and loading flags.
---

# useAsyncState()

<PackageData fn="useAsyncState" />
<HookLiveDemo demo="useAsyncState/basic" title="Live demo: useAsyncState" />

## Overview

`useAsyncState` wraps an async `producer` function (`() => Promise<T>`) and exposes `state`, `loading`, `error`, and `execute` so you can load remote data (or any async work) with a predictable UI lifecycle. On `execute`, it clears the error, toggles loading, awaits the producer, then stores the resolved value or captures failures; with `immediate: true` it runs once on mount, and options like `initialState` and `resetOnExecute` let you seed the UI or reset before each run.

### What it accepts

- `producer: () => Promise<T>`.
- `options: UseAsyncStateOptions<T> = {}`.

### What it returns

- `state`: Latest resolved value (shape depends on generics / producer). Type `T | undefined`.
- `loading`: Whether async work is in progress. Type `boolean`.
- `error`: Last failure, or cleared when idle. Type `unknown`.
- `execute`: Runs async work again and updates state. Type `() => Promise<T>`.

## Usage

Copy-paste ready sample: import the hook and call it inside a component.

```tsx
import useAsyncState from '@dedalik/use-react/useAsyncState'

function Example() {
  const result = useAsyncState()

  return (
    <div>
      <h3>useAsyncState state</h3>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useAsyncState`

**Signature:** `useAsyncState(producer: () => Promise<T>, options: UseAsyncStateOptions<T> = {}): { state: T | undefined, loading: boolean, error: unknown, execute: () => Promise<T> }`

#### Parameters

1. **`producer`** (`() => Promise<T>`) - Async function that loads data; called by `execute` (and on mount when `immediate` is `true`).
2. **`options`** (optional `UseAsyncStateOptions<T>`) - `immediate` runs on mount, `initialState` seeds `state`, `resetOnExecute` resets `state` to `initialState` before each run. Default: `{}`.

#### Returns

Object with:

- `state` - Latest resolved value (shape depends on generics / producer). (`T | undefined`).
- `loading` - Whether async work is in progress. (`boolean`).
- `error` - Last failure, or cleared when idle. (`unknown`).
- `execute` - Runs async work again and updates state. (`() => Promise<T>`).

## Copy-paste hook

```tsx
import { useEffect, useState } from 'react'

export interface UseAsyncStateOptions<T> {
  immediate?: boolean
  resetOnExecute?: boolean
  initialState?: T
}

/**
 * Resolves async producer into managed loading/data/error state.
 */
export default function useAsyncState<T>(
  producer: () => Promise<T>,
  options: UseAsyncStateOptions<T> = {},
): {
  state: T | undefined
  loading: boolean
  error: unknown
  execute: () => Promise<T>
} {
  const { immediate = true, resetOnExecute = false, initialState } = options
  const [state, setState] = useState<T | undefined>(initialState)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState<unknown>(undefined)

  const execute = async () => {
    if (resetOnExecute) setState(initialState)
    setLoading(true)
    setError(undefined)
    try {
      const result = await producer()
      setState(result)
      return result
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (immediate) void execute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate])

  return { state, loading, error, execute }
}
```

```js
import { useEffect, useState } from 'react'

export default function useAsyncState(producer, options = {}) {
  const { immediate = true, resetOnExecute = false, initialState } = options
  const [state, setState] = useState(initialState)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState(undefined)

  const execute = async () => {
    if (resetOnExecute) setState(initialState)
    setLoading(true)
    setError(undefined)
    try {
      const result = await producer()
      setState(result)
      return result
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (immediate) void execute()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate])

  return { state, loading, error, execute }
}
```
