---
title: Controlled interval with start/stop
sidebar_label: useIntervalFn
category: Animation
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useIntervalFn.tsx'
description: >-
  useIntervalFn from @dedalik/use-react: interval controls with active state.
---

# useIntervalFn()

<PackageData fn="useIntervalFn" />

Last updated: 24/04/2026

## Overview

`useIntervalFn` runs a **`callback`** on a **fixed** **`interval`** (default **1000 ms**) after you call **`start()`**, and **clears** the timer on **`stop()`** or on **unmount**. The latest **`callback`** is kept in a ref so the interval does not need to be recreated when the function identity changes. If **`immediate`** is **true**, the callback runs **once** right when **`start()`** is called, then on every tick. **`isActive`** reflects whether an interval is currently running. If **`start()`** is called while a timer is already set, the hook **no-ops** (it does not stack two intervals). Combine with a stable **`useCallback`** for **`callback`**.

### What it accepts

1. **`callback`**: `() => void`
2. **`interval`**: `number` (ms), default **1000**
3. **`immediate`**: `boolean`, default **false** - run once immediately on **`start`**

### What it returns

- **`isActive`**: `boolean`
- **`start`**: `() => void`
- **`stop`**: `() => void`

## Usage

A ticking counter: **500 ms** step, with **`immediate`** so the first tick is instant.

```tsx
import { useCallback, useState } from 'react'
import useIntervalFn from '@dedalik/use-react/useIntervalFn'

function Example() {
  const [ticks, setTicks] = useState(0)
  const tick = useCallback(() => setTicks((n) => n + 1), [])

  const { isActive, start, stop } = useIntervalFn(tick, 500, true)

  return (
    <div>
      <p>
        Ticks: <strong>{ticks}</strong> - running: {isActive ? 'yes' : 'no'}
      </p>
      <p>
        <button type='button' onClick={start} disabled={isActive}>
          Start
        </button>{' '}
        <button type='button' onClick={stop} disabled={!isActive}>
          Stop
        </button>
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useIntervalFn`

**Signature:** `useIntervalFn(callback: () => void, interval = 1000, immediate = false): UseIntervalFnReturn`

#### Parameters

1. **`callback`**
2. **`interval`**
3. **`immediate`**

#### Returns

**`isActive`**, **`start`**, **`stop`**

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseIntervalFnReturn {
  isActive: boolean
  start: () => void
  stop: () => void
}

/**
 * Controlled interval runner with start/stop helpers.
 */
export default function useIntervalFn(callback: () => void, interval = 1000, immediate = false): UseIntervalFnReturn {
  const callbackRef = useRef(callback)
  const timerRef = useRef<number | null>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const stop = useCallback(() => {
    if (timerRef.current != null) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
    setIsActive(false)
  }, [])

  const start = useCallback(() => {
    if (timerRef.current != null) return
    if (immediate) callbackRef.current()
    timerRef.current = window.setInterval(() => callbackRef.current(), interval)
    setIsActive(true)
  }, [immediate, interval])

  useEffect(() => stop, [stop])

  return { isActive, start, stop }
}
```

### JavaScript

```js
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Controlled interval runner with start/stop helpers.
 */
export default function useIntervalFn(callback, interval = 1000, immediate = false) {
  const callbackRef = useRef(callback)
  const timerRef = useRef(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const stop = useCallback(() => {
    if (timerRef.current != null) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
    setIsActive(false)
  }, [])

  const start = useCallback(() => {
    if (timerRef.current != null) return
    if (immediate) callbackRef.current()
    timerRef.current = window.setInterval(() => callbackRef.current(), interval)
    setIsActive(true)
  }, [immediate, interval])

  useEffect(() => stop, [stop])

  return { isActive, start, stop }
}
```
