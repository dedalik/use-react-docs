---
title: Manage async state and execution
sidebar_label: useAsync
category: Async
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useAsync'
description: >-
  useAsync from @dedalik/use-react: Manage async state and execution.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useAsync()

<PackageData fn="useAsync" />

Last updated: 23/04/2026, 15:56

## Overview

`useAsync` wraps an async function and gives you a simple request lifecycle state in one place.

It is useful for beginners because it standardizes loading, success, and error handling, so your component code stays focused on rendering instead of promise bookkeeping.

### What it accepts

- `asyncFunction`: a function that returns a `Promise`.

### What it returns

- `loading`: `true` while request is running.
- `data`: resolved value (or `null` before success).
- `error`: captured error state (or `null` when there is no error).
- `execute(...args)`: runs the async function with arguments and returns the resulting promise.

## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import useAsync from '@dedalik/use-react/useAsync'

function JsonUserExample() {
  const { data, loading, error, execute } = useAsync(async (id: number) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    if (!res.ok) throw new Error('Request failed')
    return res.json()
  })

  return (
    <div>
      <button type='button' onClick={() => void execute(1)} disabled={loading}>
        Load user 1
      </button>
      {error ? <p role='alert'>Something went wrong</p> : null}
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : null}
    </div>
  )
}

export default function JsonUserDemo() {
  return <JsonUserExample />
}
```

## API Reference

### `useAsync`

**Signature:** `useAsync(asyncFunction): UseAsyncResult<T, Args>`

#### Parameters

1. **`asyncFunction`** - `(...args: Args) => Promise<T>`. The async work to run when `execute` is called.

#### Returns

Object combining state and an executor:

- `loading`, `data`, `error` - request lifecycle fields.
- `execute(...args)` - runs `asyncFunction` with arguments; updates state and returns the same promise.

## Copy-paste hook

```tsx
import { useCallback, useState } from 'react'

export interface UseAsyncState<T> {
  loading: boolean
  data: T | null
  error: unknown
}

export interface UseAsyncResult<T, Args extends unknown[]> extends UseAsyncState<T> {
  execute: (...args: Args) => Promise<T>
}

export default function useAsync<T, Args extends unknown[]>(
  asyncFunction: (...args: Args) => Promise<T>,
): UseAsyncResult<T, Args> {
  const [state, setState] = useState<UseAsyncState<T>>({
    loading: false,
    data: null,
    error: null,
  })

  const execute = useCallback(
    async (...args: Args): Promise<T> => {
      setState((currentState) => ({ ...currentState, loading: true, error: null }))

      try {
        const data = await asyncFunction(...args)
        setState({ loading: false, data, error: null })
        return data
      } catch (error) {
        setState({ loading: false, data: null, error })
        throw error
      }
    },
    [asyncFunction],
  )

  return {
    ...state,
    execute,
  }
}
```

### JavaScript version

```js
import { useCallback, useState } from 'react'

export default function useAsync(asyncFunction) {
  const [state, setState] = useState({
    loading: false,
    data: null,
    error: null,
  })

  const execute = useCallback(
    async (...args) => {
      setState((currentState) => ({
        ...currentState,
        loading: true,
        error: null,
      }))
      try {
        const data = await asyncFunction(...args)
        setState({ loading: false, data, error: null })
        return data
      } catch (error) {
        setState({ loading: false, data: null, error })
        throw error
      }
    },
    [asyncFunction],
  )

  return {
    ...state,
    execute,
  }
}
```
