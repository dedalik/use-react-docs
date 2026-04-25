---
title: Declarative setInterval
sidebar_label: useInterval
category: Time
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useInterval.tsx'
description: >-
  useInterval from @dedalik/use-react: recurring timer with ref-safe callback and cleanup.
---

# useInterval()

<PackageData fn="useInterval" />

Last updated: 24/04/2026

## Overview

`useInterval` mirrors `useTimeout`’s ref pattern: **`setInterval`**, and **latest `callback` via ref** on every tick. Changing **`delay`** re-runs the effect, **clears** the old interval, and (if `delay` is a **number**) starts a **new** one. If **`delay` is `null`**, **no** interval is registered. Cleanup runs on unmount. Use for **clocks** or **pollers** where you do not need **`start`/`stop`** return values; drive **`null`** vs a number to pause.

### What it accepts

1. **`callback`**: `() => void`
2. **`delay`**: `number | null` - `null` disables the interval

## Usage

Tock every **0.5 s**; **Stop** sets **`delay`** to **`null`**.

```tsx
import { useState } from 'react'
import useInterval from '@dedalik/use-react/useInterval'

function Example() {
  const [ticks, setTicks] = useState(0)
  const [delay, setDelay] = useState<number | null>(500)

  useInterval(() => {
    setTicks((t) => t + 1)
  }, delay)

  return (
    <div>
      <p>ticks: {ticks}</p>
      <p>
        <button type='button' onClick={() => setDelay((d) => (d == null ? 500 : null))}>
          {delay == null ? 'Start' : 'Stop'}
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

### `useInterval`

**Signature:** `useInterval(callback: () => void, delay: number | null): void`

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useRef } from 'react'

export default function useInterval(callback: () => void, delay: number | null) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (delay == null) return

    const intervalId = globalThis.setInterval(() => {
      callbackRef.current()
    }, delay)

    return () => globalThis.clearInterval(intervalId)
  }, [delay])
}
```

### JavaScript

```js
import { useEffect, useRef } from 'react'

export default function useInterval(callback, delay) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (delay == null) return

    const intervalId = globalThis.setInterval(() => {
      callbackRef.current()
    }, delay)

    return () => globalThis.clearInterval(intervalId)
  }, [delay])
}
```
