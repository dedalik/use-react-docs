---
title: Detect user inactivity
sidebar_label: useIdle
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useIdle.tsx'
description: >-
  useIdle from @dedalik/use-react: Detect user inactivity. TypeScript,
  tree-shakable import, examples, SSR notes.
---

# useIdle()

<PackageData fn="useIdle" />

Last updated: 24/04/2026

## Overview

`useIdle` starts a timer: after **`timeout`** milliseconds with no **mousemove**, **mousedown**, **keydown**, **touchstart**, or **scroll** on `window`, it flips to **`true`** (user is considered idle); any of those events resets the timer and clears idle until the next quiet period. Listeners are registered with **`{ passive: true }`** on add for scroll performance, and the effect re-binds when **`timeout`** changes-use it to dim UI, pause video, or defer analytics after inactivity, not as a security timeout.

### What it accepts

- **`timeout`** (optional) - Idle delay in ms. Default **`60_000`** (one minute).

### What it returns

- **`boolean`** - **`true`** if the user has been inactive for **`timeout`** ms.

## Usage

Shorter **5 s** timeout for a demo “away” banner (no `JSON.stringify`).

```tsx
import useIdle from '@dedalik/use-react/useIdle'

function Example() {
  const isIdle = useIdle(5_000)

  return (
    <div>
      <h3>Idle detection</h3>
      <p>
        Status: <strong>{isIdle ? 'idle - move the mouse to wake' : 'active'}</strong>
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useIdle`

**Signature:** `useIdle(timeout?: number): boolean`

#### Parameters

- **`timeout`** (`number`, optional) - Milliseconds of no input before **idle**. Default `60000`.

#### Returns

**`boolean`** - Whether the idle timer has fired.

## Copy-paste hook

### TypeScript

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

### JavaScript

```js
import { useEffect, useRef, useState } from 'react'

const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll']

export default function useIdle(timeout = 60_000) {
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
