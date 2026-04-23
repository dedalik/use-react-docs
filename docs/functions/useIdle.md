---
title: Detect user inactivity
sidebar_label: useIdle
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useIdle'
description: >-
  useIdle from @dedalik/use-react: Detect user inactivity. TypeScript,
  tree-shakable import, examples, SSR notes.
---

# useIdle()

<PackageData fn="useIdle" />

Last updated: 23/04/2026, 15:56

## Overview

`useIdle` tells you whether the user has been inactive for a given timeout.

Use it for auto-logout prompts, low-priority refreshes, and UI behavior that should change when users stop interacting.

### What it accepts

- `timeout` (optional): inactivity window in milliseconds.

### What it returns

- `boolean` idle state (`true` when user is inactive).

## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import useIdle from '@dedalik/use-react/useIdle'

function IdleBannerExample() {
  const idle = useIdle(5000)

  return <p>{idle ? 'Idle (5s)' : 'Active'}</p>
}

export default function IdleBannerDemo() {
  return <IdleBannerExample />
}
```

## API Reference

### `useIdle`

**Signature:** `useIdle(timeout?: number): boolean`

#### Parameters

1. **`timeout`** - Milliseconds without user activity before switching to idle (default `60000`).

#### Returns

`true` when the user is considered idle, `false` while activity resets the timer.

## Copy-paste hook

```tsx
import { useEffect, useRef, useState } from 'react'

const events: Array<keyof WindowEventMap> = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll']

export default function useIdle(timeout = 60_000): boolean {
  const [isIdle, setIsIdle] = useState(false)
  const timeoutRef = useRef<number>()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const reset = () => {
      setIsIdle(false)

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = window.setTimeout(() => {
        setIsIdle(true)
      }, timeout)
    }

    reset()
    events.forEach((eventName) => window.addEventListener(eventName, reset, { passive: true }))

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }

      events.forEach((eventName) => window.removeEventListener(eventName, reset))
    }
  }, [timeout])

  return isIdle
}
```

### JavaScript version

```js
import { useEffect, useRef, useState } from 'react'

const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll']
export default function useIdle(timeout = 60000) {
  const [isIdle, setIsIdle] = useState(false)

  const timeoutRef = useRef()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const reset = () => {
      setIsIdle(false)

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = window.setTimeout(() => {
        setIsIdle(true)
      }, timeout)
    }
    reset()
    events.forEach((eventName) => window.addEventListener(eventName, reset, { passive: true }))
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
      }
      events.forEach((eventName) => window.removeEventListener(eventName, reset))
    }
  }, [timeout])

  return isIdle
}
```
