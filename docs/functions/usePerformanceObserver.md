---
title: Observe performance entries
sidebar_label: usePerformanceObserver
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/usePerformanceObserver.tsx'
description: >-
  usePerformanceObserver from @dedalik/use-react: collect PerformanceObserver entries reactively.
---

# usePerformanceObserver()

<PackageData fn="usePerformanceObserver" />

Last updated: 24/04/2026

## Overview

`usePerformanceObserver` instantiates **`PerformanceObserver`**, calls **`observe({ entryTypes, buffered })`** from your **`options`** object, and appends every emitted batch into React state so DevTools-style tables or custom dashboards can render **`navigation`**, **`resource`**, **`mark`**, **`measure`**, or other supported entry kinds without manual `performance.getEntries()` polling. **`buffered: true`** asks the browser to replay recent entries where the platform allows; cleanup **`disconnect()`** runs on unmount or when **`options`** fields change identity in the effect dependency list-memoize the **`options`** object at the call site (especially the **`entryTypes`** array) so you do not churn observers every render. **`isSupported`** is simply whether the **`PerformanceObserver`** constructor exists.

### What it accepts

- **`options.entryTypes`** - Array of Performance Timeline entry type strings to subscribe to.
- **`options.buffered`** (optional) - Forwarded to `observe`. Default `undefined` (browser default).

### What it returns

- **`isSupported`**, **`entries`** - See API Reference.

## Usage

Stable **`useMemo`** options with **`entryTypes`** and **`buffered`**; list a few recent entries (no `JSON.stringify`).

```tsx
import { useMemo } from 'react'
import usePerformanceObserver from '@dedalik/use-react/usePerformanceObserver'

function Example() {
  const observerOptions = useMemo(
    () => ({
      entryTypes: ['navigation', 'resource'],
      buffered: true,
    }),
    [],
  )

  const { isSupported, entries } = usePerformanceObserver(observerOptions)
  const recent = entries.slice(-5)

  return (
    <div>
      <h3>Performance entries</h3>

      {!isSupported ? (
        <p>PerformanceObserver is not available.</p>
      ) : (
        <>
          <p>
            Total buffered: <strong>{entries.length}</strong> (showing last {recent.length})
          </p>
          <ul>
            {recent.map((entry, index) => (
              <li key={`${entry.entryType}-${entry.name}-${index}`}>
                <code>{entry.entryType}</code> - <strong>{entry.name || '-'}</strong> - start{' '}
                <strong>{Math.round(entry.startTime)}</strong> ms
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `usePerformanceObserver`

**Signature:** `usePerformanceObserver(options: UsePerformanceObserverOptions): UsePerformanceObserverReturn`

#### Parameters

**`options`** (`UsePerformanceObserverOptions`):

- **`entryTypes`** (`string[]`) - Passed to `PerformanceObserver.observe`.
- **`buffered`** (`boolean`, optional) - Include buffered entries when supported.

#### Returns

Object with:

- **`isSupported`** - `typeof PerformanceObserver !== 'undefined'` (`boolean`).
- **`entries`** - Accumulated `PerformanceEntry[]` from observer callbacks.

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useMemo, useState } from 'react'

export interface UsePerformanceObserverOptions {
  entryTypes: string[]
  buffered?: boolean
}

export interface UsePerformanceObserverReturn {
  isSupported: boolean
  entries: PerformanceEntry[]
}

/**
 * Subscribes to PerformanceObserver and stores emitted entries.
 */
export default function usePerformanceObserver(options: UsePerformanceObserverOptions): UsePerformanceObserverReturn {
  const [entries, setEntries] = useState<PerformanceEntry[]>([])
  const isSupported = typeof PerformanceObserver !== 'undefined'

  useEffect(() => {
    if (!isSupported) return

    const observer = new PerformanceObserver((list) => {
      const next = list.getEntries()
      setEntries((prev) => [...prev, ...next])
    })

    observer.observe({ entryTypes: options.entryTypes, buffered: options.buffered })

    return () => observer.disconnect()
  }, [isSupported, options.buffered, options.entryTypes])

  return useMemo(() => ({ isSupported, entries }), [entries, isSupported])
}
```

### JavaScript

```js
import { useEffect, useMemo, useState } from 'react'

export default function usePerformanceObserver(options) {
  const [entries, setEntries] = useState([])
  const isSupported = typeof PerformanceObserver !== 'undefined'

  useEffect(() => {
    if (!isSupported) return

    const observer = new PerformanceObserver((list) => {
      const next = list.getEntries()
      setEntries((prev) => [...prev, ...next])
    })

    observer.observe({ entryTypes: options.entryTypes, buffered: options.buffered })

    return () => observer.disconnect()
  }, [isSupported, options.buffered, options.entryTypes])

  return useMemo(() => ({ isSupported, entries }), [entries, isSupported])
}
```
