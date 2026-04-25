---
title: Throttle function execution
sidebar_label: useThrottleFn
category: Utilities
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useThrottleFn.tsx'
description: >-
  useThrottleFn from @dedalik/use-react: trailing throttle with optional delayed call, cancel.
---

# useThrottleFn()

<PackageData fn="useThrottleFn" />

Last updated: 24/04/2026

## Overview

`useThrottleFn` **limits** how often your **callback** runs: if **less** than **`delay`** ms (default **500**) has passed since the **last** **successful** run, the call is **deferred** with a **single** pending **`setTimeout`** (so you get at most one **trailing** invocation while events keep firing). If the window has **expired**, it **runs** immediately and **clears** any scheduled trailing run. The **`fn`** is kept on a **ref** so the latest implementation is used without re-creating the throttled function. **`.cancel()`** clears a pending run and is invoked on **unmount**. This **coalesces** bursty input so executions stay roughly **`delay`** ms apart, rather than sampling on a wall-clock **interval** regardless of input.

### What it accepts

1. **`fn`**: function to throttle
2. **`delay`** (optional, ms): default **500**

### What it returns

- A throttled function with **`.cancel()`**

## Usage

**Scroll** updates a **readout** with **`delay: 200`** so rapid wheel events do not thrash your state.

```tsx
import { useRef, useState } from 'react'
import useThrottleFn from '@dedalik/use-react/useThrottleFn'

function Example() {
  const boxRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  const onScrollY = useThrottleFn((y: number) => {
    setScrollY(y)
  }, 200)

  return (
    <div
      ref={boxRef}
      style={{ height: 200, overflow: 'auto', border: '1px solid #ccc' }}
      onScroll={() => {
        const el = boxRef.current
        if (el) onScrollY(el.scrollTop)
      }}
    >
      <div style={{ height: 800, padding: 8 }}>Scroll this panel</div>
      <p style={{ position: 'sticky', bottom: 0, background: '#fff' }}>Scroll top: {Math.round(scrollY)}px</p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useThrottleFn`

**Signature:** `useThrottleFn<T extends (...args: any[]) => any>(fn: T, delay?: number): ThrottledFunction<T>`

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useEffect, useRef } from 'react'

export interface ThrottledFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): void
  cancel: () => void
}

export default function useThrottleFn<T extends (...args: any[]) => any>(fn: T, delay = 500): ThrottledFunction<T> {
  const fnRef = useRef(fn)
  const lastRunRef = useRef(0)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    fnRef.current = fn
  }, [fn])

  const cancel = useCallback(() => {
    if (timeoutRef.current != null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  useEffect(() => cancel, [cancel])

  const throttled = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now()
      const remaining = delay - (now - lastRunRef.current)

      if (remaining <= 0) {
        cancel()
        lastRunRef.current = now
        fnRef.current(...args)
        return
      }

      if (timeoutRef.current != null) return

      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null
        lastRunRef.current = Date.now()
        fnRef.current(...args)
      }, remaining)
    },
    [cancel, delay],
  ) as ThrottledFunction<T>

  throttled.cancel = cancel
  return throttled
}
```

### JavaScript

```js
import { useCallback, useEffect, useRef } from 'react'

export default function useThrottleFn(fn, delay = 500) {
  const fnRef = useRef(fn)
  const lastRunRef = useRef(0)
  const timeoutRef = useRef(null)

  useEffect(() => {
    fnRef.current = fn
  }, [fn])

  const cancel = useCallback(() => {
    if (timeoutRef.current != null) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }, [])

  useEffect(() => cancel, [cancel])

  const throttled = useCallback(
    (...args) => {
      const now = Date.now()
      const remaining = delay - (now - lastRunRef.current)

      if (remaining <= 0) {
        cancel()
        lastRunRef.current = now
        fnRef.current(...args)
        return
      }

      if (timeoutRef.current != null) return

      timeoutRef.current = window.setTimeout(() => {
        timeoutRef.current = null
        lastRunRef.current = Date.now()
        fnRef.current(...args)
      }, remaining)
    },
    [cancel, delay],
  )

  throttled.cancel = cancel
  return throttled
}
```
