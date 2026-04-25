---
title: Read JS heap memory
sidebar_label: useMemory
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useMemory.tsx'
description: >-
  useMemory from @dedalik/use-react: reactive snapshot of performance.memory values.
---

# useMemory()

<PackageData fn="useMemory" />

Last updated: 24/04/2026

## Overview

`useMemory` polls the non-standard Chromium `performance.memory` object on a timer and copies `usedJSHeapSize`, `totalJSHeapSize`, and `jsHeapSizeLimit` into React state so dashboards or devtools-style panels can show heap growth without wiring `setInterval` yourself. The **`interval`** argument controls how often samples are taken (milliseconds); when the API is missing (Firefox, Safari, secure contexts without the flag), `isSupported` is `false` and `memory` stays `null`. This is diagnostic data only-sizes are approximate and should not be used for hard security or billing logic.

### What it accepts

- **`interval`** (optional) - Polling period in ms between reads. Default `1000`.

### What it returns

- **`isSupported`** - Whether `performance.memory` exists.
- **`memory`** - Last snapshot `{ jsHeapSizeLimit, totalJSHeapSize, usedJSHeapSize }`, or `null` when unsupported or before the first read.

## Usage

Live heap readout with a faster refresh interval (here **500 ms**).

```tsx
import useMemory from '@dedalik/use-react/useMemory'

function formatMb(bytes: number) {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function Example() {
  const { isSupported, memory } = useMemory(500)

  return (
    <div>
      <h3>JS heap (Chromium)</h3>

      {!isSupported ? (
        <p>
          <code>performance.memory</code> is not exposed in this browser.
        </p>
      ) : memory ? (
        <ul>
          <li>
            Used: <strong>{formatMb(memory.usedJSHeapSize)}</strong>
          </li>
          <li>
            Total: <strong>{formatMb(memory.totalJSHeapSize)}</strong>
          </li>
          <li>
            Limit: <strong>{formatMb(memory.jsHeapSizeLimit)}</strong>
          </li>
        </ul>
      ) : (
        <p>Waiting for first sample…</p>
      )}
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useMemory`

**Signature:** `useMemory(interval?: number): UseMemoryReturn`

#### Parameters

- **`interval`** (`number`, optional) - Milliseconds between `performance.memory` reads. Default `1000`.

#### Returns

Object with:

- **`isSupported`** - `performance.memory` availability (`boolean`).
- **`memory`** - Copied heap fields or `null` (`MemoryInfoLike | null`).

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

interface MemoryInfoLike {
  jsHeapSizeLimit: number
  totalJSHeapSize: number
  usedJSHeapSize: number
}

export interface UseMemoryReturn {
  isSupported: boolean
  memory: MemoryInfoLike | null
}

/**
 * Reads performance.memory when available and keeps it fresh.
 */
export default function useMemory(interval = 1000): UseMemoryReturn {
  const isSupported = typeof performance !== 'undefined' && 'memory' in performance
  const [memory, setMemory] = useState<MemoryInfoLike | null>(null)

  useEffect(() => {
    if (!isSupported) return

    const read = () => {
      const info = (performance as Performance & { memory: MemoryInfoLike }).memory
      setMemory({
        jsHeapSizeLimit: info.jsHeapSizeLimit,
        totalJSHeapSize: info.totalJSHeapSize,
        usedJSHeapSize: info.usedJSHeapSize,
      })
    }

    read()
    const id = window.setInterval(read, interval)
    return () => window.clearInterval(id)
  }, [interval, isSupported])

  return { isSupported, memory }
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

export default function useMemory(interval = 1000) {
  const isSupported = typeof performance !== 'undefined' && 'memory' in performance
  const [memory, setMemory] = useState(null)

  useEffect(() => {
    if (!isSupported) return

    const read = () => {
      const info = performance.memory
      setMemory({
        jsHeapSizeLimit: info.jsHeapSizeLimit,
        totalJSHeapSize: info.totalJSHeapSize,
        usedJSHeapSize: info.usedJSHeapSize,
      })
    }

    read()
    const id = window.setInterval(read, interval)
    return () => window.clearInterval(id)
  }, [interval, isSupported])

  return { isSupported, memory }
}
```
