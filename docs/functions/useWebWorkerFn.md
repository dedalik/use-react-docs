---
title: Run function in Web Worker
sidebar_label: useWebWorkerFn
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useWebWorkerFn.tsx'
description: >-
  useWebWorkerFn from @dedalik/use-react: offload function execution to worker context.
---

# useWebWorkerFn()

<PackageData fn="useWebWorkerFn" />

Last updated: 24/04/2026

## Overview

`useWebWorkerFn` builds a worker **script string** by embedding **`fn.toString()`** inside a small **`onmessage`** bootstrap: the worker deserializes that function and runs it on each **`event.data`**, then **`postMessage`s** the return value. The implementation delegates to [`useWebWorker`](./useWebWorker) (Blob URL + `Worker`), so the same **structured clone** and “latest **`data` only**” behavior applies. The work must be **pure and serializable** as source text; closures and outer variables are not captured-only what you pass in **`call(payload)`** is available. Changing **`fn` identity** makes **`useMemo`** rebuild the worker script. **`call`** is **`post`** with a different name for ergonomics.

### What it accepts

- **`fn`**: `(payload: TInput) => TOutput` - will be stringified; keep it self-contained

### What it returns

- **`isSupported`**: `boolean`
- **`data`**: `TOutput | null`
- **`error`**: `string | null`
- **`call`**: `(payload: TInput) => boolean`
- **`terminate`**: `() => void`

## Usage

Wrap a **stable** function with **`useCallback`** so the worker is not rebuilt every render. This example squares a number off the main thread.

```tsx
import { useCallback } from 'react'
import useWebWorkerFn from '@dedalik/use-react/useWebWorkerFn'

function Example() {
  const square = useCallback((n: number) => n * n, [])
  const { isSupported, data, error, call } = useWebWorkerFn(square)

  if (!isSupported) {
    return <p>Workers are not available in this context.</p>
  }

  return (
    <div>
      <p>
        <button type='button' onClick={() => call(12)}>
          Compute 12² in worker
        </button>
      </p>
      {error && <p role='alert'>{error}</p>}
      <p>Result: {data != null ? data : '-'}</p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useWebWorkerFn`

**Signature:** `useWebWorkerFn(fn: (payload: TInput) => TOutput): UseWebWorkerFnReturn<TInput, TOutput>`

#### Parameters

1. **`fn`** - Inlined in generated worker code via **`toString()`**.

#### Returns

Same surface as **useWebWorker** plus **`call`**.

**Depends on** [`useWebWorker`](./useWebWorker).

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useMemo } from 'react'
import useWebWorker from './useWebWorker'

export interface UseWebWorkerFnReturn<TInput = unknown, TOutput = unknown> {
  isSupported: boolean
  data: TOutput | null
  error: string | null
  call: (payload: TInput) => boolean
  terminate: () => void
}

/**
 * Runs a function in a worker by stringifying its body.
 */
export default function useWebWorkerFn<TInput = unknown, TOutput = unknown>(
  fn: (payload: TInput) => TOutput,
): UseWebWorkerFnReturn<TInput, TOutput> {
  const script = useMemo(
    () => `self.onmessage = (event) => { const fn = ${fn.toString()}; self.postMessage(fn(event.data)); };`,
    [fn],
  )

  const worker = useWebWorker<TInput, TOutput>(script)

  const call = useCallback((payload: TInput) => worker.post(payload), [worker])

  return {
    isSupported: worker.isSupported,
    data: worker.data,
    error: worker.error,
    call,
    terminate: worker.terminate,
  }
}
```

### JavaScript

```js
import { useCallback, useMemo } from 'react'
import useWebWorker from './useWebWorker'

/**
 * Runs a function in a worker by stringifying its body.
 */
export default function useWebWorkerFn(fn) {
  const script = useMemo(
    () => `self.onmessage = (event) => { const fn = ${fn.toString()}; self.postMessage(fn(event.data)); };`,
    [fn],
  )

  const worker = useWebWorker(script)

  const call = useCallback((payload) => worker.post(payload), [worker])

  return {
    isSupported: worker.isSupported,
    data: worker.data,
    error: worker.error,
    call,
    terminate: worker.terminate,
  }
}
```
