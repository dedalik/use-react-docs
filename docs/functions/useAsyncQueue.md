---
title: Run async tasks sequentially
sidebar_label: useAsyncQueue
category: Utilities
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useAsyncQueue.tsx'
description: >-
  useAsyncQueue from @dedalik/use-react: for-await style results/errors, autoStart option.
---

# useAsyncQueue()

<PackageData fn="useAsyncQueue" />

Last updated: 24/04/2026

## Overview

`useAsyncQueue` takes an **array** of **thunks** `() => Promise<T>`. Calling **`start()`** **runs** them **one** **at** a **time** in **order** (no **concurrency**): each **fulfillment** is **stored** in **`results[i]`**, each **rejection** in **`errors[i]`**, and the **queue** **keeps** **going**-it does **not** **abort** the **whole** **run** on a **failed** **step**. **While** **running**, **`pending`** is **true** and **`currentIndex`** is the **active** **index** (or **-1** when **done**). **`reset()`** **clears** **arrays** and **flags** for a **fresh** **run**. With **`{ autoStart: true }`**, an **effect** **invokes** **`start()`** when **`start`** (and thus **`autoStart`**) **change**-stabilize **`tasks`** (e.g. **`useMemo`**) to **avoid** **unwanted** **re**-**runs**. A **ref** **blocks** **overlapping** **`start()`** **calls**. **`start`** is **recreated** when the **`tasks`** **array** **reference** **changes**.

### What it accepts

1. **`tasks`**: `Array<() => Promise<T>>`
2. **`options`**: `{ autoStart?: boolean }` - default **`false`**

### What it returns

- **`{ results, errors, pending, currentIndex, start, reset }`**

## Usage

**Three** **fakes** **await** a **short** **delay**; **`autoStart: true`** **runs** on **mount**; **render** the **last** **non**-**null** **result**.

```tsx
import { useMemo } from 'react'
import useAsyncQueue from '@dedalik/use-react/useAsyncQueue'

function wait(ms: number) {
  return new Promise<string>((r) => {
    window.setTimeout(() => r(`after ${ms}ms`), ms)
  })
}

function Example() {
  const tasks = useMemo(
    () => [
      () => wait(40).then(() => 'step-1'),
      () => wait(40).then(() => 'step-2'),
      () => wait(40).then(() => 'step-3'),
    ],
    [],
  )

  const { results, pending, currentIndex, start } = useAsyncQueue(tasks, { autoStart: true })

  const last = results.filter(Boolean).at(-1) ?? '-'

  return (
    <div>
      <p>Status: {pending ? `running #${currentIndex + 1}` : 'done'}</p>
      <p>Last result: {last}</p>
      <button type='button' onClick={() => void start()}>
        Run again
      </button>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useAsyncQueue`

**Signature:** `useAsyncQueue<T>(tasks: Array<() => Promise<T>>, options?: UseAsyncQueueOptions): UseAsyncQueueReturn<T>`

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseAsyncQueueOptions {
  autoStart?: boolean
}

export interface UseAsyncQueueReturn<T> {
  results: Array<T | null>
  errors: Array<unknown | null>
  pending: boolean
  currentIndex: number
  start: () => Promise<void>
  reset: () => void
}

/**
 * Runs async tasks one-by-one and stores per-step outcomes.
 */
export default function useAsyncQueue<T>(
  tasks: Array<() => Promise<T>>,
  options: UseAsyncQueueOptions = {},
): UseAsyncQueueReturn<T> {
  const { autoStart = false } = options
  const [results, setResults] = useState<Array<T | null>>(() => tasks.map(() => null))
  const [errors, setErrors] = useState<Array<unknown | null>>(() => tasks.map(() => null))
  const [pending, setPending] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const runningRef = useRef(false)

  const reset = useCallback(() => {
    setResults(tasks.map(() => null))
    setErrors(tasks.map(() => null))
    setPending(false)
    setCurrentIndex(-1)
    runningRef.current = false
  }, [tasks])

  const start = useCallback(async () => {
    if (runningRef.current) return
    runningRef.current = true
    setPending(true)

    for (let i = 0; i < tasks.length; i += 1) {
      setCurrentIndex(i)
      try {
        const value = await tasks[i]()
        setResults((prev) => {
          const next = [...prev]
          next[i] = value
          return next
        })
      } catch (error) {
        setErrors((prev) => {
          const next = [...prev]
          next[i] = error
          return next
        })
      }
    }

    setPending(false)
    setCurrentIndex(-1)
    runningRef.current = false
  }, [tasks])

  useEffect(() => {
    if (autoStart) void start()
  }, [autoStart, start])

  return { results, errors, pending, currentIndex, start, reset }
}
```

### JavaScript

```js
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Runs async tasks one-by-one and stores per-step outcomes.
 */
export default function useAsyncQueue(tasks, options = {}) {
  const { autoStart = false } = options
  const [results, setResults] = useState(() => tasks.map(() => null))
  const [errors, setErrors] = useState(() => tasks.map(() => null))
  const [pending, setPending] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(-1)
  const runningRef = useRef(false)

  const reset = useCallback(() => {
    setResults(tasks.map(() => null))
    setErrors(tasks.map(() => null))
    setPending(false)
    setCurrentIndex(-1)
    runningRef.current = false
  }, [tasks])

  const start = useCallback(async () => {
    if (runningRef.current) return
    runningRef.current = true
    setPending(true)

    for (let i = 0; i < tasks.length; i += 1) {
      setCurrentIndex(i)
      try {
        const value = await tasks[i]()
        setResults((prev) => {
          const next = [...prev]
          next[i] = value
          return next
        })
      } catch (error) {
        setErrors((prev) => {
          const next = [...prev]
          next[i] = error
          return next
        })
      }
    }

    setPending(false)
    setCurrentIndex(-1)
    runningRef.current = false
  }, [tasks])

  useEffect(() => {
    if (autoStart) void start()
  }, [autoStart, start])

  return { results, errors, pending, currentIndex, start, reset }
}
```
