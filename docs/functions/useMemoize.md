---
title: Memoize function results by arguments
sidebar_label: useMemoize
category: Utilities
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useMemoize.tsx'
description: >-
  useMemoize from @dedalik/use-react: per-argument cache via JSON key, stable wrapper.
---

# useMemoize()

<PackageData fn="useMemoize" />

Last updated: 24/04/2026

## Overview

`useMemoize` wraps a **function** in a **stable** callback (empty dependency array) that **caches** return values in a **`Map`**. The cache key is **`JSON.stringify(args)`** for each call, so **same serialized arguments** hit the cache; **order** and **primitives** matter, and **non-JSON** values (e.g. **`undefined`**, **`Map`**, **functions**) **collapse** or stringify unpredictably. When you pass a **new** **`fn`**, a **ref** updates so the next **miss** uses the new implementation, but **old** cache **entries** from prior **`fn`** **remain** in the same hook instance. Use for **expensive pure** work called **many** times with repeated **small** argument sets; pair with a **keyed** remount or **custom** cache if you need **eviction** or **non-JSON** keys.

### What it accepts

1. **`fn`**: any function `T extends (...args: any[]) => any`

### What it returns

- The same **function type** `T`, but **cached** by serialized arguments

## Usage

**Sum** two numbers: repeat calls with **(2, 3)** read from the **cache**; the **useMemoize** call is at top level, **add** is stable.

```tsx
import { useState } from 'react'
import useMemoize from '@dedalik/use-react/useMemoize'

function Example() {
  const add = useMemoize((a: number, b: number) => {
    return a + b
  })

  const [a, setA] = useState(2)
  const [b, setB] = useState(3)

  return (
    <div>
      <p>
        {a} + {b} = {add(a, b)}
      </p>
      <label>
        a
        <input type='number' value={a} onChange={(e) => setA(Number(e.target.value))} />
      </label>
      <label>
        b
        <input type='number' value={b} onChange={(e) => setB(Number(e.target.value))} />
      </label>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useMemoize`

**Signature:** `useMemoize<T extends (...args: any[]) => any>(fn: T): T`

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useEffect, useRef } from 'react'

/**
 * Returns a memoized wrapper around `fn` that caches results by serialized arguments.
 */
export default function useMemoize<T extends (...args: any[]) => any>(fn: T): T {
  const fnRef = useRef(fn)
  const cacheRef = useRef(new Map<string, ReturnType<T>>())

  useEffect(() => {
    fnRef.current = fn
  }, [fn])

  return useCallback((...args: Parameters<T>) => {
    const key = JSON.stringify(args)
    if (cacheRef.current.has(key)) {
      return cacheRef.current.get(key) as ReturnType<T>
    }

    const result = fnRef.current(...args)
    cacheRef.current.set(key, result)
    return result
  }, []) as T
}
```

### JavaScript

```js
import { useCallback, useEffect, useRef } from 'react'

/**
 * Returns a memoized wrapper around `fn` that caches results by serialized arguments.
 */
export default function useMemoize(fn) {
  const fnRef = useRef(fn)
  const cacheRef = useRef(new Map())

  useEffect(() => {
    fnRef.current = fn
  }, [fn])

  return useCallback((...args) => {
    const key = JSON.stringify(args)
    if (cacheRef.current.has(key)) {
      return cacheRef.current.get(key)
    }

    const result = fnRef.current(...args)
    cacheRef.current.set(key, result)
    return result
  }, [])
}
```
