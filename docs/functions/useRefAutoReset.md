---
title: Auto-reset reactive value
sidebar_label: useRefAutoReset
category: Reactivity
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useRefAutoReset.tsx'
description: >-
  useRefAutoReset from @dedalik/use-react: reset a value to initial state after a timeout.
---

# useRefAutoReset()

<PackageData fn="useRefAutoReset" />

Last updated: 24/04/2026

## Overview

`useRefAutoReset` (implementation **`useRefAutoReset`**) is **state** with a **scheduled return** to the **`initial`** value: every **`set(next)`** updates **`value` immediately** and starts a **new** **single-shot** **timer** of **`afterMs`**, clearing any **previous** timeout first. When the timer fires, **`value` resets** to **`initial`**. **`reset()`** clears the timer and **sets** **`value`** to **`initial`** at once (use to dismiss early). The cleanup effect **clears** pending timers on unmount. **`afterMs`** default is **1000**; the timeout uses **`setTimeout`**, so the reset runs in the same tab **task** model. If **`initial`** is an **object** and you need a new identity, pass a new **`initial` reference** (parent) or the hook will reset to that same reference on schedule.

### What it accepts

1. **`initial`**: `T` - value to return to
2. **`afterMs`**: `number` (ms), default **1000** - time after the **last** **`set()`** before auto-reset

### What it returns

- **`value`**: `T`
- **`set`**: `(next: T) => void` - set and (re)start the reset timer
- **`reset`**: `() => void` - clear timer, jump back to **`initial`**

## Usage

Flash a short message: **`set('Form saved!')`**, and after **2.5 s** the label returns to the **`initial`** empty string; **Clear** jumps back immediately and cancels the timer.

```tsx
import useRefAutoReset from '@dedalik/use-react/useRefAutoReset'

function Example() {
  const { value: line, set: setLine, reset: clearLine } = useRefAutoReset<string>('', 2500)

  return (
    <div>
      <p>{line || 'Nothing to show'}</p>
      <p>
        <button type='button' onClick={() => setLine('Form saved!')}>
          Show toast
        </button>{' '}
        <button type='button' onClick={clearLine} disabled={!line}>
          Clear now
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

### `useRefAutoReset`

**Signature:** `useRefAutoReset<T>(initial: T, afterMs?: number): RefAutoResetReturn<T>`

#### Parameters

1. **`initial`**
2. **`afterMs`** (optional) - default **1000**

#### Returns

**`{ value, set, reset }`**

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useEffect, useRef, useState } from 'react'

export interface RefAutoResetReturn<T> {
  value: T
  set: (next: T) => void
  reset: () => void
}

/**
 * State-like ref value that resets to initial after delay.
 */
export default function useRefAutoReset<T>(initial: T, afterMs = 1000): RefAutoResetReturn<T> {
  const [value, setValue] = useState(initial)
  const timerRef = useRef<number | null>(null)

  const clear = useCallback(() => {
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const scheduleReset = useCallback(() => {
    clear()
    timerRef.current = window.setTimeout(
      () => {
        setValue(initial)
        timerRef.current = null
      },
      Math.max(0, afterMs),
    )
  }, [afterMs, clear, initial])

  const set = useCallback(
    (next: T) => {
      setValue(next)
      scheduleReset()
    },
    [scheduleReset],
  )

  const reset = useCallback(() => {
    clear()
    setValue(initial)
  }, [clear, initial])

  useEffect(() => clear, [clear])

  return { value, set, reset }
}
```

### JavaScript

```js
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * State-like ref value that resets to initial after delay.
 */
export default function useRefAutoReset(initial, afterMs = 1000) {
  const [value, setValue] = useState(initial)
  const timerRef = useRef(null)

  const clear = useCallback(() => {
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const scheduleReset = useCallback(() => {
    clear()
    timerRef.current = window.setTimeout(
      () => {
        setValue(initial)
        timerRef.current = null
      },
      Math.max(0, afterMs),
    )
  }, [afterMs, clear, initial])

  const set = useCallback(
    (next) => {
      setValue(next)
      scheduleReset()
    },
    [scheduleReset],
  )

  const reset = useCallback(() => {
    clear()
    setValue(initial)
  }, [clear, initial])

  useEffect(() => clear, [clear])

  return { value, set, reset }
}
```
