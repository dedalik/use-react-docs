---
title: Manage async state and execution
sidebar_label: useAsync
category: Async
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useAsync.tsx'
description: >-
  useAsync from @dedalik/use-react: Manage async state and execution.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useAsync()

<PackageData fn="useAsync" />

Last updated: 24/04/2026

## Overview

`useAsync` wraps an **`asyncFunction`** you provide and exposes **`loading`**, **`data`**, **`error`**, plus **`execute(...args)`** which runs that function with the same arguments and updates state. Each successful run sets **`data`** and clears **`error`**; failures set **`error`** and **`data`** to **`null`**, and **re-throw** so callers can still **`catch`**. Nothing runs automatically-you must call **`execute`**. The inner **`execute`** depends on **`asyncFunction`**, so pass a **stable** function (typically **`useCallback`**) to avoid identity churn. This is a small state machine for imperative async work, not a replacement for query libraries.

### What it accepts

- **`asyncFunction`**: `(...args: Args) => Promise<T>`

### What it returns

- **`loading`**: `boolean`
- **`data`**: `T | null`
- **`error`**: `unknown`
- **`execute`**: `(...args: Args) => Promise<T>`

## Usage

Keep the async worker in **`useCallback`**, then call **`execute`** with arguments (here a user id).

```tsx
import { useCallback } from 'react'
import useAsync from '@dedalik/use-react/useAsync'

type User = { id: number; name: string }

function Example() {
  const loadUser = useCallback(async (id: number) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return (await res.json()) as User
  }, [])

  const { loading, data, error, execute } = useAsync(loadUser)

  return (
    <div>
      <p>
        <button type='button' onClick={() => void execute(1)} disabled={loading}>
          {loading ? 'Loading…' : 'Load user 1'}
        </button>
      </p>
      {error != null && <p role='alert'>{(error as Error).message ?? String(error)}</p>}
      {data && (
        <p>
          <strong>{data.name}</strong> (id {data.id})
        </p>
      )}
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useAsync`

**Signature:** `useAsync(asyncFunction: (...args: Args) => Promise<T>): UseAsyncResult<T, Args>`

#### Parameters

1. **`asyncFunction`** - Invoked by **`execute`** with forwarded args.

#### Returns

**`loading`**, **`data`**, **`error`**, **`execute`**

## Copy-paste hook

### TypeScript

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

### JavaScript

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
