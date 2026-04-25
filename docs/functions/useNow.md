---
title: Live current Date
sidebar_label: useNow
category: Time
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useNow.tsx'
description: >-
  useNow from @dedalik/use-react: re-render on a wall-clock tick with Date state.
---

# useNow()

<PackageData fn="useNow" />

Last updated: 24/04/2026

## Overview

`useNow` returns a **`Date`** in **state** that updates on a **`setInterval`**. The **default** **`interval`** is **1000** ms. If **`interval` is `null` or `0` (or `≤` 0)**, the effect does **not** set an interval, so the value **stays** at the **client mount** time (SSR: initial `new Date()` in state still runs, but the interval is skipped when disabled). **Changing** **`interval`** re-runs the effect and re-starts the timer. The hook is **for UI clocks**; it is **not** high-precision and can drift with tab throttling. Use for “last refresh” or **relative** time displays paired with your own formatters.

### What it accepts

- Optional **`options`**: `{ interval?: number | null }` - default **1000**; `null`/`0` = **no tick** after mount

### What it returns

- **`Date`**

## Usage

Show **seconds** with a **2 s** tick, then a toggle to **freeze** (`interval: 0`).

```tsx
import { useState } from 'react'
import useNow from '@dedalik/use-react/useNow'

function Example() {
  const [live, setLive] = useState(true)
  const now = useNow({ interval: live ? 2000 : 0 })

  return (
    <div>
      <p>{now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
      <label>
        <input type='checkbox' checked={live} onChange={(e) => setLive(e.target.checked)} /> Live (2s tick)
      </label>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useNow`

**Signature:** `useNow(options?: UseNowOptions): Date`

**`UseNowOptions`**

- `interval?` - ms; `null` or `0` to freeze

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

export interface UseNowOptions {
  interval?: number | null
}

/**
 * Live `Date` refreshed on an interval (client only).
 */
export default function useNow(options: UseNowOptions = {}): Date {
  const { interval = 1000 } = options
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    if (interval == null || interval <= 0) {
      return
    }

    const id = window.setInterval(() => {
      setNow(new Date())
    }, interval)

    return () => window.clearInterval(id)
  }, [interval])

  return now
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

/**
 * Live `Date` refreshed on an interval (client only).
 */
export default function useNow(options = {}) {
  const { interval = 1000 } = options
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    if (interval == null || interval <= 0) {
      return
    }

    const id = window.setInterval(() => {
      setNow(new Date())
    }, interval)

    return () => window.clearInterval(id)
  }, [interval])

  return now
}
```
