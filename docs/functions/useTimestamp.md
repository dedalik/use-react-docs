---
title: Live millisecond timestamp
sidebar_label: useTimestamp
category: Time
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useTimestamp.tsx'
description: >-
  useTimestamp from @dedalik/use-react: Date.now on an interval, same as useNow but number.
---

# useTimestamp()

<PackageData fn="useTimestamp" />

Last updated: 24/04/2026

## Overview

`useTimestamp` is **`useNow`** in **numeric** form: **`state`** holds **`Date.now()`** and a **`setInterval`** refreshes it. **Default** `interval` **1000** ms; **`null` or `0`** (or `≤0`) **disables** ticking after the initial value. Handy for **stale-time** math, **elapsed** ms, or passing a **number** to APIs; pair with `new Date(ts)` for display. Same **caveats** on background tab throttling. Server render uses the first **`Date.now()`** at that moment.

### What it accepts

- Optional **`options`**: `{ interval?: number | null }` - same semantics as **useNow**

### What it returns

- **`number`**: Unix ms (wall clock)

## Usage

Show **elapsed** ms since a **Start** **click** (timestamp stored in state), updating every **100 ms** while **running**.

```tsx
import { useState } from 'react'
import useTimestamp from '@dedalik/use-react/useTimestamp'

function Example() {
  const [start, setStart] = useState<number | null>(null)
  const [running, setRunning] = useState(false)
  const now = useTimestamp({ interval: running ? 100 : 0 })
  const elapsed = start == null ? 0 : now - start

  return (
    <div>
      <p>Elapsed: {start == null ? '-' : `${(elapsed / 1000).toFixed(1)}s`}</p>
      <button
        type="button"
        onClick={() => {
          if (!running) {
            setStart(Date.now())
            setRunning(true)
          } else {
            setRunning(false)
            setStart(null)
          }
        }}
      >
        {running ? 'Stop' : 'Start'}
      </button>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useTimestamp`

**Signature:** `useTimestamp(options?: UseTimestampOptions): number`

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

export interface UseTimestampOptions {
  interval?: number | null
}

/**
 * Live Unix timestamp in milliseconds (`Date.now()`), refreshed on an interval (client only).
 */
export default function useTimestamp(options: UseTimestampOptions = {}): number {
  const { interval = 1000 } = options
  const [ts, setTs] = useState(() => Date.now())

  useEffect(() => {
    if (interval == null || interval <= 0) {
      return
    }

    const id = window.setInterval(() => {
      setTs(Date.now())
    }, interval)

    return () => window.clearInterval(id)
  }, [interval])

  return ts
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

/**
 * Live Unix timestamp in milliseconds (`Date.now()`), refreshed on an interval (client only).
 */
export default function useTimestamp(options = {}) {
  const { interval = 1000 } = options
  const [ts, setTs] = useState(() => Date.now())

  useEffect(() => {
    if (interval == null || interval <= 0) {
      return
    }

    const id = window.setInterval(() => {
      setTs(Date.now())
    }, interval)

    return () => window.clearInterval(id)
  }, [interval])

  return ts
}
```
