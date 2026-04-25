---
title: Fetch JSON with state and abort
sidebar_label: useFetch
category: Network
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useFetch.tsx'
description: >-
  useFetch from @dedalik/use-react: loading/data/error state around fetch calls.
---

# useFetch()

<PackageData fn="useFetch" />

Last updated: 24/04/2026

## Overview

`useFetch` wraps **`fetch`** with **`loading`**, **`data`**, and **`error`** state, assumes a **JSON** response body ( **`res.json()`** ), and treats non-**`ok`** HTTP statuses as errors (`HTTP ${status}`). Each **`execute(input?, init?)`** aborts any previous in-flight request, creates a fresh **`AbortController`**, merges **`init`** on top of **`defaultInit`**, and forwards **`signal`**. **`AbortError`** leaves **`data`/`error`** unchanged aside from clearing **`loading`**. If **`fetch`** or **`AbortController`** is missing, **`execute`** resolves **`null`**. **`defaultInput`** is required when **`execute()`** is called with no URL-pass it at the hook level or always pass **`input`** to **`execute`**.

### What it accepts

- Optional **`defaultInput`**: `RequestInfo | URL`
- Optional **`defaultInit`**: `RequestInit` (merged into each call)

### What it returns

- **`loading`**: `boolean`
- **`data`**: `T | null`
- **`error`**: `Error | null`
- **`execute`**: `(input?, init?) => Promise<T | null>`
- **`abort`**: `() => void`

## Usage

Bind a default URL and headers, then **Load**; **Stop** calls **`abort()`** mid-flight. Use a generic for the JSON shape.

```tsx
import useFetch from '@dedalik/use-react/useFetch'

type Post = { id: number; title: string; body: string }

function Example() {
  const { data, loading, error, execute, abort } = useFetch<Post>('https://jsonplaceholder.typicode.com/posts/1', {
    headers: { Accept: 'application/json' },
  })

  return (
    <div>
      <p>
        <button type='button' onClick={() => void execute()} disabled={loading}>
          {loading ? 'Loading…' : 'Load default post'}
        </button>{' '}
        <button type='button' onClick={abort} disabled={!loading}>
          Stop
        </button>{' '}
        <button
          type='button'
          onClick={() => void execute('https://jsonplaceholder.typicode.com/posts/2', { method: 'GET' })}
        >
          Load post 2
        </button>
      </p>
      {error && <p role='alert'>{error.message}</p>}
      {data && (
        <article>
          <h3>{data.title}</h3>
          <p>{data.body}</p>
        </article>
      )}
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useFetch`

**Signature:** `useFetch<T = unknown>(defaultInput?: RequestInfo | URL, defaultInit?: RequestInit): UseFetchReturn<T>`

#### Parameters

1. **`defaultInput`**, **`defaultInit`** - Used when **`execute()`** is called without **`input`**.

#### Returns

**`loading`**, **`data`**, **`error`**, **`execute`**, **`abort`**

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useRef, useState } from 'react'

export interface UseFetchState<T> {
  loading: boolean
  data: T | null
  error: Error | null
}

export interface UseFetchReturn<T> extends UseFetchState<T> {
  execute: (input?: RequestInfo | URL, init?: RequestInit) => Promise<T | null>
  abort: () => void
}

/**
 * Fetch wrapper with loading/data/error state and abort support.
 */
export default function useFetch<T = unknown>(
  defaultInput?: RequestInfo | URL,
  defaultInit?: RequestInit,
): UseFetchReturn<T> {
  const [state, setState] = useState<UseFetchState<T>>({ loading: false, data: null, error: null })
  const controllerRef = useRef<AbortController | null>(null)

  const abort = useCallback(() => {
    controllerRef.current?.abort()
    controllerRef.current = null
  }, [])

  const execute = useCallback(
    async (input?: RequestInfo | URL, init?: RequestInit): Promise<T | null> => {
      if (typeof fetch === 'undefined') return null

      abort()
      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null
      controllerRef.current = controller

      setState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        const res = await fetch(input ?? defaultInput!, { ...defaultInit, ...init, signal: controller?.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        const data = (await res.json()) as T
        setState({ loading: false, data, error: null })
        return data
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          setState((prev) => ({ ...prev, loading: false }))
          return null
        }
        setState({ loading: false, data: null, error: error as Error })
        return null
      }
    },
    [abort, defaultInit, defaultInput],
  )

  return { ...state, execute, abort }
}
```

### JavaScript

```js
import { useCallback, useRef, useState } from 'react'

/**
 * Fetch wrapper with loading/data/error state and abort support.
 */
export default function useFetch(defaultInput, defaultInit) {
  const [state, setState] = useState({ loading: false, data: null, error: null })
  const controllerRef = useRef(null)

  const abort = useCallback(() => {
    controllerRef.current?.abort()
    controllerRef.current = null
  }, [])

  const execute = useCallback(
    async (input, init) => {
      if (typeof fetch === 'undefined') return null

      abort()
      const controller = typeof AbortController !== 'undefined' ? new AbortController() : null
      controllerRef.current = controller

      setState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        const res = await fetch(input ?? defaultInput, { ...defaultInit, ...init, signal: controller?.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)

        const data = await res.json()
        setState({ loading: false, data, error: null })
        return data
      } catch (error) {
        if (error.name === 'AbortError') {
          setState((prev) => ({ ...prev, loading: false }))
          return null
        }
        setState({ loading: false, data: null, error: error })
        return null
      }
    },
    [abort, defaultInit, defaultInput],
  )

  return { ...state, execute, abort }
}
```
