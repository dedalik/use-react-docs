---
title: Cancel stale async requests
sidebar_label: useAbortController
category: Async
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useAbortController.tsx'
description: >-
  useAbortController from @dedalik/use-react: Cancel stale async requests.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useAbortController()

<PackageData fn="useAbortController" />

Last updated: 24/04/2026

## Overview

`useAbortController` keeps a single **`AbortController`** in state (or **`null`** if the environment has no **`AbortController`**) and exposes **`signal`** for passing into **`fetch`** and other cancellable APIs. **`renew()`** creates a new controller, **aborts the previous** `signal` first, and returns the new instance-use it when you start a new request and want the old one cancelled. **`abort()`** aborts the current signal and **replaces** the controller with a fresh one. The cleanup effect **aborts on unmount** so in-flight work tied to this component’s signal does not outlive the tree. Pair **`signal`** with your request; when aborted, typical **`fetch`** calls reject with **`AbortError`**.

### What it accepts

- None.

### What it returns

- **`controller`**: `AbortController | null`
- **`signal`**: `AbortSignal | null`
- **`renew`**: `() => AbortController | null`
- **`abort`**: `() => void`

## Usage

Pass **`signal`** into **`fetch`**; **Cancel** calls **`abort()`**, which aborts the in-flight request and issues a new controller for the next **Load**. Use **`renew()`** when you need a new **`signal`** without the extra swap-after-abort (e.g. starting a new search and cancelling the old one in one step).

```tsx
import { useState } from 'react'
import useAbortController from '@dedalik/use-react/useAbortController'

function Example() {
  const { signal, abort } = useAbortController()
  const [label, setLabel] = useState<string | null>(null)

  return (
    <div>
      <p>
        <button
          type='button'
          onClick={async () => {
            if (!signal) return
            setLabel('…')
            try {
              const res = await fetch('https://jsonplaceholder.typicode.com/posts/2', { signal })
              const json = (await res.json()) as { title: string }
              setLabel(json.title)
            } catch (e) {
              if (e instanceof Error && e.name === 'AbortError') setLabel('aborted')
            }
          }}
        >
          Load
        </button>{' '}
        <button type='button' onClick={abort}>
          Cancel
        </button>
      </p>
      <p>Result: {label ?? '-'}</p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useAbortController`

**Signature:** `useAbortController(): UseAbortControllerReturn`

#### Parameters

None.

#### Returns

**`controller`**, **`signal`**, **`renew`**, **`abort`**

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useEffect, useMemo, useState } from 'react'

export interface UseAbortControllerReturn {
  controller: AbortController | null
  signal: AbortSignal | null
  renew: () => AbortController | null
  abort: () => void
}

const hasAbortController = typeof AbortController !== 'undefined'

function createController(): AbortController | null {
  return hasAbortController ? new AbortController() : null
}

/**
 * Provides an AbortController lifecycle that auto-aborts on unmount.
 */
export default function useAbortController(): UseAbortControllerReturn {
  const [controller, setController] = useState<AbortController | null>(() => createController())

  const renew = useCallback((): AbortController | null => {
    const nextController = createController()

    setController((currentController) => {
      currentController?.abort()
      return nextController
    })

    return nextController
  }, [])

  const abort = useCallback(() => {
    setController((currentController) => {
      currentController?.abort()
      return createController()
    })
  }, [])

  useEffect(() => {
    return () => {
      controller?.abort()
    }
  }, [controller])

  return useMemo(
    () => ({
      controller,
      signal: controller?.signal ?? null,
      renew,
      abort,
    }),
    [abort, controller, renew],
  )
}
```

### JavaScript

```js
import { useCallback, useEffect, useMemo, useState } from 'react'

const hasAbortController = typeof AbortController !== 'undefined'

function createController() {
  return hasAbortController ? new AbortController() : null
}

/**
 * Provides an AbortController lifecycle that auto-aborts on unmount.
 */
export default function useAbortController() {
  const [controller, setController] = useState(() => createController())

  const renew = useCallback(() => {
    const nextController = createController()

    setController((currentController) => {
      currentController?.abort()
      return nextController
    })

    return nextController
  }, [])

  const abort = useCallback(() => {
    setController((currentController) => {
      currentController?.abort()
      return createController()
    })
  }, [])

  useEffect(() => {
    return () => {
      controller?.abort()
    }
  }, [controller])

  return useMemo(
    () => ({
      controller,
      signal: controller?.signal ?? null,
      renew,
      abort,
    }),
    [abort, controller, renew],
  )
}
```
