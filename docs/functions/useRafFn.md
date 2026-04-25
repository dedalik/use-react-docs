---
title: requestAnimationFrame loop controls
sidebar_label: useRafFn
category: Animation
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useRafFn.tsx'
description: >-
  useRafFn from @dedalik/use-react: start/stop RAF loop with active state.
---

# useRafFn()

<PackageData fn="useRafFn" />

Last updated: 24/04/2026

## Overview

`useRafFn` runs your **`callback(timestamp)`** once per **animation frame** in a self‑chaining **rAF** loop. The ref keeps the **latest** callback, so the loop need not be restarted on each render. **`start()`** begins a frame (no‑ops if a loop is already running); **`stop()`** cancels the current frame and marks **`isActive` false** when the loop is not running. If **`autoStart`** is **true** (the default), the effect **starts** the loop on mount and **stops** on unmount. If **`autoStart`** is **false**, you drive \*\*`start`/`stop` yourself (for example, only run while a drag is in progress). Use it for per‑frame work tied to the display’s refresh (smooth counters, time‑based readouts, canvas updates).

### What it accepts

1. **`callback`**: `(timestamp: number) => void` - `timestamp` is **`requestAnimationFrame`** time (DOMHighResTimeStamp in supporting browsers)
2. **`autoStart`**: `boolean`, default **true** - if **false**, call **`start()`** manually

### What it returns

- **`isActive`**: `boolean` - set **true** when a loop is scheduled/running, **false** after **`stop`**
- **`start`**: `() => void`
- **`stop`**: `() => void`

## Usage

**Manual** loop with **`autoStart: false`**: a running clock started/stopped with buttons, using the frame timestamp in the label.

```tsx
import { useState } from 'react'
import useRafFn from '@dedalik/use-react/useRafFn'

function Example() {
  const [last, setLast] = useState<number | null>(null)

  const { isActive, start, stop } = useRafFn((t) => {
    setLast(t)
  }, false)

  return (
    <div>
      <p>Last rAF time: {last != null ? last.toFixed(1) : '-'}</p>
      <p>Active: {isActive ? 'yes' : 'no'}</p>
      <p>
        <button type='button' onClick={start} disabled={isActive}>
          Start loop
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

### `useRafFn`

**Signature:** `useRafFn(callback: (timestamp: number) => void, autoStart = true): UseRafFnReturn`

#### Parameters

1. **`callback`**
2. **`autoStart`**

#### Returns

**`isActive`**, **`start`**, **`stop`**

> **Note:** This is **not** the same as React 18’s concurrent **`useTransition`**. The library’s [`useTransition` hook](./useTransition) controls enter/exit stages.

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseRafFnReturn {
  isActive: boolean
  start: () => void
  stop: () => void
}

/**
 * requestAnimationFrame loop with start/stop controls.
 */
export default function useRafFn(callback: (timestamp: number) => void, autoStart = true): UseRafFnReturn {
  const callbackRef = useRef(callback)
  const frameRef = useRef<number | null>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const stop = useCallback(() => {
    if (frameRef.current != null) {
      window.cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
    setIsActive(false)
  }, [])

  const loopRef = useRef<(time: number) => void>(() => {})
  loopRef.current = (time: number) => {
    callbackRef.current(time)
    frameRef.current = window.requestAnimationFrame(loopRef.current)
  }

  const start = useCallback(() => {
    if (frameRef.current != null) return
    setIsActive(true)
    frameRef.current = window.requestAnimationFrame(loopRef.current)
  }, [])

  useEffect(() => {
    if (autoStart) start()
    return stop
  }, [autoStart, start, stop])

  return { isActive, start, stop }
}
```

### JavaScript

```js
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * requestAnimationFrame loop with start/stop controls.
 */
export default function useRafFn(callback, autoStart = true) {
  const callbackRef = useRef(callback)
  const frameRef = useRef(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const stop = useCallback(() => {
    if (frameRef.current != null) {
      window.cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
    setIsActive(false)
  }, [])

  const loopRef = useRef(() => {})
  loopRef.current = (time) => {
    callbackRef.current(time)
    frameRef.current = window.requestAnimationFrame(loopRef.current)
  }

  const start = useCallback(() => {
    if (frameRef.current != null) return
    setIsActive(true)
    frameRef.current = window.requestAnimationFrame(loopRef.current)
  }, [])

  useEffect(() => {
    if (autoStart) start()
    return stop
  }, [autoStart, start, stop])

  return { isActive, start, stop }
}
```
