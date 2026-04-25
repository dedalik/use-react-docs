---
title: Controlled timeout with start/stop
sidebar_label: useTimeoutFn
category: Animation
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useTimeoutFn.tsx'
description: >-
  useTimeoutFn from @dedalik/use-react: one-shot timeout controls.
---

# useTimeoutFn()

<PackageData fn="useTimeoutFn" />

Last updated: 24/04/2026

## Overview

`useTimeoutFn` schedules a **one-shot** call to **`callback`** after **`delay`** ms (default **1000**). Each **`start()`** **clears** any previous pending timeout first, so re‑starting is effectively “reset the timer.” If **`immediate`** is **true**, the callback also runs **synchronously** at **`start()`** before the delayed run. While a timer is scheduled, **`pending`** is **true**; it returns **false** after the callback fires (or after **`stop()`**). A cleanup effect **`stop()`**s on unmount so timers do not fire after the component is gone. Use it for “fire once after inactivity” or a delayed follow‑up, not a repeating tick.

### What it accepts

1. **`callback`**: `() => void`
2. **`delay`**: `number` (ms), default **1000**
3. **`immediate`**: `boolean`, default **false**

### What it returns

- **`pending`**: `boolean`
- **`start`**: `() => void`
- **`stop`**: `() => void`

## Usage

Show a “Saved” toast **2 s** after clicking Save; **`start()`** resets the timer if the user saves again. Enable **`immediate`** in the example to flash feedback right away, then the delayed log.

```tsx
import { useCallback, useState } from 'react'
import useTimeoutFn from '@dedalik/use-react/useTimeoutFn'

function Example() {
  const [message, setMessage] = useState('')

  const hide = useCallback(() => setMessage(''), [])
  const { pending, start, stop } = useTimeoutFn(
    hide,
    2000, // delay (ms)
    false, // immediate: set true to also run callback when start() is called
  )

  return (
    <div>
      <p>
        <button
          type='button'
          onClick={() => {
            setMessage('Draft saved (will clear in 2s)')
            start()
          }}
        >
          Save
        </button>{' '}
        <button type='button' onClick={stop} disabled={!pending}>
          Cancel clear
        </button>
      </p>
      {message && <p role='status'>{message}</p>}
      <p>
        <small>Timer {pending ? 'active' : 'idle'}</small>
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useTimeoutFn`

**Signature:** `useTimeoutFn(callback: () => void, delay = 1000, immediate = false): UseTimeoutFnReturn`

#### Parameters

1. **`callback`**, **`delay`**, **`immediate`**

#### Returns

**`pending`**, **`start`**, **`stop`**

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseTimeoutFnReturn {
  pending: boolean
  start: () => void
  stop: () => void
}

/**
 * Controlled timeout runner with restart semantics.
 */
export default function useTimeoutFn(callback: () => void, delay = 1000, immediate = false): UseTimeoutFnReturn {
  const callbackRef = useRef(callback)
  const timerRef = useRef<number | null>(null)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const stop = useCallback(() => {
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setPending(false)
  }, [])

  const start = useCallback(() => {
    stop()
    if (immediate) callbackRef.current()
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null
      setPending(false)
      callbackRef.current()
    }, delay)
    setPending(true)
  }, [delay, immediate, stop])

  useEffect(() => stop, [stop])

  return { pending, start, stop }
}
```

### JavaScript

```js
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Controlled timeout runner with restart semantics.
 */
export default function useTimeoutFn(callback, delay = 1000, immediate = false) {
  const callbackRef = useRef(callback)
  const timerRef = useRef(null)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const stop = useCallback(() => {
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setPending(false)
  }, [])

  const start = useCallback(() => {
    stop()
    if (immediate) callbackRef.current()
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null
      setPending(false)
      callbackRef.current()
    }, delay)
    setPending(true)
  }, [delay, immediate, stop])

  useEffect(() => stop, [stop])

  return { pending, start, stop }
}
```
