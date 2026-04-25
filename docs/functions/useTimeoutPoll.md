---
title: Polling with setTimeout loop
sidebar_label: useTimeoutPoll
category: Utilities
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useTimeoutPoll.tsx'
description: >-
  useTimeoutPoll from @dedalik/use-react: recursive setTimeout poll, start/stop, async-safe.
---

# useTimeoutPoll()

<PackageData fn="useTimeoutPoll" />

Last updated: 24/04/2026

## Overview

`useTimeoutPoll` schedules a **callback** on a **`setTimeout`** **chain** (not **`setInterval`**): after each run it waits **`interval`** ms, then runs again, so **long-running** or **async** `fn` **pushes** the next tick to **after** the work **completes** (if **`fn`** returns a **Promise**, the next schedule runs in **`.finally`**). A **`useEffect`** on mount calls **`start()`**; cleanup calls **`stop()`**. **`immediate`** (default **true**) runs the **first** tick right away; **`false`** delays the first run by **`interval`**. **`isActive`**, **`start`**, and **`stop`** let you read or re-drive the loop (e.g. after a manual **stop**). **Errors** in **sync** `fn` are **caught** and the loop **continues**; **`fn`** is kept on a **ref** so the **latest** closure is used without re-creating the schedule **identity** for every render.

### What it accepts

1. **`fn`**: `() => void | Promise<void>`
2. **`interval`** (optional, ms): default **1000**
3. **`options`**: `{ immediate?: boolean }` - default **immediate: true**

### What it returns

- **`{ isActive, start, stop }`**

## Usage

**Poll** a “server status” every **2 s**; use **`immediate: true`** (default) for an **instant** first read, **`async`** `fn` with **`fetch`**.

```tsx
import { useState } from 'react'
import useTimeoutPoll from '@dedalik/use-react/useTimeoutPoll'

function Example() {
  const [status, setStatus] = useState<'ok' | 'error' | '…'>('…')

  useTimeoutPoll(
    async () => {
      try {
        const r = await fetch('/api/health', { method: 'HEAD' })
        setStatus(r.ok ? 'ok' : 'error')
      } catch {
        setStatus('error')
      }
    },
    2000,
    { immediate: true },
  )

  return <p>Health: {status}</p>
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useTimeoutPoll`

**Signature:** `useTimeoutPoll(fn: () => void | Promise<void>, interval?: number, options?: UseTimeoutPollOptions): UseTimeoutPollControls`

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseTimeoutPollControls {
  isActive: boolean
  start: () => void
  stop: () => void
}

export interface UseTimeoutPollOptions {
  immediate?: boolean
}

/**
 * Polls with setTimeout recursion and start/stop controls.
 */
export default function useTimeoutPoll(
  fn: () => void | Promise<void>,
  interval = 1000,
  options: UseTimeoutPollOptions = {},
): UseTimeoutPollControls {
  const { immediate = true } = options
  const fnRef = useRef(fn)
  const timeoutRef = useRef<number | null>(null)
  const activeRef = useRef(false)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    fnRef.current = fn
  }, [fn])

  const clearTimer = useCallback(() => {
    if (timeoutRef.current != null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const stop = useCallback(() => {
    activeRef.current = false
    setIsActive(false)
    clearTimer()
  }, [clearTimer])

  const tick = useCallback(() => {
    if (!activeRef.current) return

    const scheduleNext = () => {
      if (!activeRef.current) return
      timeoutRef.current = window.setTimeout(() => {
        tick()
      }, interval)
    }

    try {
      const result = fnRef.current()
      if (result && typeof (result as Promise<void>).then === 'function') {
        void (result as Promise<void>).finally(scheduleNext)
        return
      }
      scheduleNext()
    } catch {
      scheduleNext()
    }
  }, [interval])

  const start = useCallback(() => {
    if (activeRef.current) return
    activeRef.current = true
    setIsActive(true)

    if (immediate) {
      tick()
      return
    }

    timeoutRef.current = window.setTimeout(() => {
      tick()
    }, interval)
  }, [immediate, interval, tick])

  useEffect(() => {
    start()
    return stop
  }, [start, stop])

  return { isActive, start, stop }
}
```

### JavaScript

```js
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Polls with setTimeout recursion and start/stop controls.
 */
export default function useTimeoutPoll(fn, interval = 1000, options = {}) {
  const { immediate = true } = options
  const fnRef = useRef(fn)
  const timeoutRef = useRef(null)
  const activeRef = useRef(false)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    fnRef.current = fn
  }, [fn])

  const clearTimer = useCallback(() => {
    if (timeoutRef.current != null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  const stop = useCallback(() => {
    activeRef.current = false
    setIsActive(false)
    clearTimer()
  }, [clearTimer])

  const tick = useCallback(() => {
    if (!activeRef.current) return

    const scheduleNext = () => {
      if (!activeRef.current) return
      timeoutRef.current = window.setTimeout(() => {
        tick()
      }, interval)
    }

    try {
      const result = fnRef.current()
      if (result && typeof result.then === 'function') {
        void result.finally(scheduleNext)
        return
      }
      scheduleNext()
    } catch {
      scheduleNext()
    }
  }, [interval])

  const start = useCallback(() => {
    if (activeRef.current) return
    activeRef.current = true
    setIsActive(true)

    if (immediate) {
      tick()
      return
    }

    timeoutRef.current = window.setTimeout(() => {
      tick()
    }, interval)
  }, [immediate, interval, tick])

  useEffect(() => {
    start()
    return stop
  }, [start, stop])

  return { isActive, start, stop }
}
```
