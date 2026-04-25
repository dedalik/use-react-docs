---
title: Web Worker state hook
sidebar_label: useWebWorker
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useWebWorker.tsx'
description: >-
  useWebWorker from @dedalik/use-react: create a worker from script text with reactive messages.
---

# useWebWorker()

<PackageData fn="useWebWorker" />

Last updated: 24/04/2026

## Overview

`useWebWorker` takes a **JavaScript string** and turns it into a **Blob** URL, starts a classic **`Worker`**, and on cleanup **terminates** the worker and **revokes** the object URL. Incoming **`onmessage`** updates **`data`**, **`onerror`** sets a string **`error`**. **`post(payload)`** forwards a message to the worker; **`terminate()`** force-stops the worker. When **`script`** is empty, no worker is created. **Structured clone** rules apply: send plain objects, not DOM nodes. The hook is **one-way last result** (latest **`data`**) and does not queue or correlate message IDs. **`isSupported`** requires **`Worker`** and **`URL.createObjectURL`**.

### What it accepts

- **`script`**: `string` - full worker source (e.g. assign **`self.onmessage`**)

### What it returns

- **`isSupported`**: `boolean`
- **`data`**: `TOutput | null`
- **`error`**: `string | null`
- **`post`**: `(payload: TInput) => boolean`
- **`terminate`**: `() => void`

## Usage

Define a tiny echo worker: double a number posted from the main thread. Change **`script`** only if you need a new worker (same string identity is fine).

```tsx
import { useState } from 'react'
import useWebWorker from '@dedalik/use-react/useWebWorker'

const WORKER_SCRIPT = `
self.onmessage = (event) => {
  const n = Number(event.data);
  self.postMessage(Number.isFinite(n) ? n * 2 : 0);
};
`

function Example() {
  const { isSupported, data, error, post, terminate } = useWebWorker<number, number>(WORKER_SCRIPT)
  const [n, setN] = useState(21)

  if (!isSupported) {
    return <p>Web Workers or Blob URLs are not available in this context.</p>
  }

  return (
    <div>
      <p>
        <input type='number' value={n} onChange={(e) => setN(Number(e.target.value) || 0)} />
        <button type='button' onClick={() => post(n)}>
          Post ×2
        </button>{' '}
        <button type='button' onClick={terminate}>
          Terminate
        </button>
      </p>
      {error && <p role='alert'>{error}</p>}
      <p>Worker result: {data != null ? data : '-'}</p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useWebWorker`

**Signature:** `useWebWorker<TInput, TOutput>(script: string): UseWebWorkerReturn<TInput, TOutput>`

#### Parameters

1. **`script`** - Entire worker file as a string; **`useEffect`** re-runs when it changes.

#### Returns

**`isSupported`**, **`data`**, **`error`**, **`post`**, **`terminate`**

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useRef, useState } from 'react'

export interface UseWebWorkerReturn<TInput = unknown, TOutput = unknown> {
  isSupported: boolean
  data: TOutput | null
  error: string | null
  post: (payload: TInput) => boolean
  terminate: () => void
}

/**
 * Creates a worker from source string and tracks latest message/error.
 */
export default function useWebWorker<TInput = unknown, TOutput = unknown>(
  script: string,
): UseWebWorkerReturn<TInput, TOutput> {
  const workerRef = useRef<Worker | null>(null)
  const [data, setData] = useState<TOutput | null>(null)
  const [error, setError] = useState<string | null>(null)

  const isSupported = typeof Worker !== 'undefined' && typeof URL !== 'undefined'

  useEffect(() => {
    if (!isSupported || !script) return

    const blob = new Blob([script], { type: 'text/javascript' })
    const url = URL.createObjectURL(blob)
    const worker = new Worker(url)
    workerRef.current = worker

    worker.onmessage = (event) => setData(event.data as TOutput)
    worker.onerror = (event) => setError(event.message || 'Worker execution failed')

    return () => {
      worker.terminate()
      workerRef.current = null
      URL.revokeObjectURL(url)
    }
  }, [isSupported, script])

  const post = (payload: TInput) => {
    const worker = workerRef.current
    if (!worker) return false
    worker.postMessage(payload)
    return true
  }

  const terminate = () => {
    workerRef.current?.terminate()
    workerRef.current = null
  }

  return { isSupported, data, error, post, terminate }
}
```

### JavaScript

```js
import { useEffect, useRef, useState } from 'react'

/**
 * Creates a worker from source string and tracks latest message/error.
 */
export default function useWebWorker(script) {
  const workerRef = useRef(null)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  const isSupported = typeof Worker !== 'undefined' && typeof URL !== 'undefined'

  useEffect(() => {
    if (!isSupported || !script) return

    const blob = new Blob([script], { type: 'text/javascript' })
    const url = URL.createObjectURL(blob)
    const worker = new Worker(url)
    workerRef.current = worker

    worker.onmessage = (event) => setData(event.data)
    worker.onerror = (event) => setError(event.message || 'Worker execution failed')

    return () => {
      worker.terminate()
      workerRef.current = null
      URL.revokeObjectURL(url)
    }
  }, [isSupported, script])

  const post = (payload) => {
    const worker = workerRef.current
    if (!worker) return false
    worker.postMessage(payload)
    return true
  }

  const terminate = () => {
    workerRef.current?.terminate()
    workerRef.current = null
  }

  return { isSupported, data, error, post, terminate }
}
```
