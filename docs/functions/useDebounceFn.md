---
title: Debounce function execution
sidebar_label: useDebounceFn
category: Utilities
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useDebounceFn.tsx'
description: >-
  useDebounceFn from @dedalik/use-react: debounced callback with cancel, stable fn ref.
---

# useDebounceFn()

<PackageData fn="useDebounceFn" />

Last updated: 24/04/2026

## Overview

`useDebounceFn` returns a **stable** function that **delays** invoking your **callback** until the caller has **stopped** re-invoking it for **`delay`** ms (default **500**). Each new call **resets** the timer (leading-edge is **not** fired; only the **trailing** edge). The latest **`fn`** is always used via a **ref**, so you do not need to wrap **`fn`** in **`useCallback`** for correctness. The returned function has a **`.cancel()`** method to **abort** a pending run; that also runs on **unmount** via an effect. The debounced function returns **void** (it does not forward the wrapped function’s return value). Ideal for **search** boxes, **resize** handlers, and **auto-save** drafts.

### What it accepts

1. **`fn`**: a function to debounce
2. **`delay`** (optional, ms): default **500**

### What it returns

- A **`debounced`** function with **`debounced.cancel()`**

## Usage

**400 ms** after the user **stops** typing, run a **search**; **`cancel`** is available if you need to flush-abort (not shown here).

```tsx
import { useState } from 'react'
import useDebounceFn from '@dedalik/use-react/useDebounceFn'

function Example() {
  const [query, setQuery] = useState('')
  const [last, setLast] = useState('')

  const runSearch = (q: string) => {
    setLast(q.trim() || '(empty)')
  }

  const debouncedSearch = useDebounceFn(runSearch, 400)

  return (
    <div>
      <label>
        Search
        <input
          value={query}
          onChange={(e) => {
            const v = e.target.value
            setQuery(v)
            debouncedSearch(v)
          }}
        />
      </label>
      <p>Last search: {last}</p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useDebounceFn`

**Signature:** `useDebounceFn<T extends (...args: any[]) => any>(fn: T, delay?: number): DebouncedFunction<T>`

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useEffect, useRef } from 'react'

export interface DebouncedFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): void
  cancel: () => void
}

export default function useDebounceFn<T extends (...args: any[]) => any>(fn: T, delay = 500): DebouncedFunction<T> {
  const fnRef = useRef(fn)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    fnRef.current = fn
  }, [fn])

  const cancel = useCallback(() => {
    if (timeoutRef.current != null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  useEffect(() => cancel, [cancel])

  const debounced = useCallback(
    (...args: Parameters<T>) => {
      cancel()
      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null
        fnRef.current(...args)
      }, delay)
    },
    [cancel, delay],
  ) as DebouncedFunction<T>

  debounced.cancel = cancel
  return debounced
}
```

### JavaScript

```js
import { useCallback, useEffect, useRef } from 'react'

export default function useDebounceFn(fn, delay = 500) {
  const fnRef = useRef(fn)
  const timeoutRef = useRef(null)

  useEffect(() => {
    fnRef.current = fn
  }, [fn])

  const cancel = useCallback(() => {
    if (timeoutRef.current != null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  useEffect(() => cancel, [cancel])

  const debounced = useCallback(
    (...args) => {
      cancel()
      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null
        fnRef.current(...args)
      }, delay)
    },
    [cancel, delay],
  )

  debounced.cancel = cancel
  return debounced
}
```
