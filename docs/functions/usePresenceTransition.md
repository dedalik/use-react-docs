---
title: Presence transition stage helper
sidebar_label: usePresenceTransition
category: Animation
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/usePresenceTransition.tsx'
description: >-
  usePresenceTransition from @dedalik/use-react: derive enter/exit stages with mount control (no clash with React’s useTransition).
---

# usePresenceTransition()

<PackageData fn="usePresenceTransition" />

Last updated: 25/04/2026

## Overview

`usePresenceTransition` takes a **visibility** boolean **`show`** and a **duration** in ms (default **300**). When **`show`** flips to **true**, it sets **`mounted` true** immediately, moves **`stage`** to **`entering`**, and after **`duration`** sets **`entered`**. When **`show`** is **false**, it sets **`exiting`**, and after **`duration`** sets **`exited`** and **`mounted` false** so you can unmount the subtree. The effect **clears** the timer on re‑run and cleanup, which avoids double‑firing. Initial state matches **`show`**: if **true** you get **`mounted`** / **`entered`**; if **false** **`exited`**. The **`idle`** value exists in the type for symmetry but the implementation never sets it-treat the union as a hint for your own FSM. Use it to drive **CSS** classes (opacity/transform) in sync with mount timing.

> **React 18:** This is **not** `import { useTransition } from 'react'`. That concurrent hook keeps a different name; import this one from `@dedalik/use-react/usePresenceTransition`.

### What it accepts

1. **`show`**: `boolean`
2. **`duration`**: `number` (ms), default **300**

### What it returns

- **`mounted`**: `boolean` - true while the child should be in the tree
- **`stage`**: `PresenceTransitionStage` - **`entering` | `entered` | `exiting` | `exited`**

## Usage

Tie a panel’s **opacity** to **`stage`**, and toggle **`show`**; use **`duration` 400** ms in the example.

```tsx
import type { CSSProperties } from 'react'
import { useState } from 'react'
import usePresenceTransition from '@dedalik/use-react/usePresenceTransition'

function Example() {
  const [open, setOpen] = useState(false)
  const { mounted, stage } = usePresenceTransition(open, 400)

  const style: CSSProperties = {
    opacity: stage === 'entering' || stage === 'exiting' ? 0 : 1,
    transform: stage === 'entering' || stage === 'exiting' ? 'translateY(8px)' : 'translateY(0)',
    transition: 'opacity 400ms ease, transform 400ms ease',
    maxWidth: 360,
    padding: '1rem',
    border: '1px solid #ccc',
  }

  return (
    <div>
      <p>
        <button type='button' onClick={() => setOpen((v) => !v)}>
          {open ? 'Close' : 'Open'}
        </button>
      </p>
      {mounted && <div style={style}>Content - stage: {stage}</div>}
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `usePresenceTransition`

**Signature:** `usePresenceTransition(show: boolean, duration = 300): UsePresenceTransitionReturn`

#### Parameters

1. **`show`**
2. **`duration`**

#### Returns

**`mounted`**, **`stage`**

**Type** - `PresenceTransitionStage`: `'idle' | 'entering' | 'entered' | 'exiting' | 'exited'`

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

export type PresenceTransitionStage = 'idle' | 'entering' | 'entered' | 'exiting' | 'exited'

export interface UsePresenceTransitionReturn {
  mounted: boolean
  stage: PresenceTransitionStage
}

/**
 * Derives enter/exit stage and mount flag from a boolean `show` (presence-style transitions).
 */
export default function usePresenceTransition(
  show: boolean,
  duration = 300,
): UsePresenceTransitionReturn {
  const [mounted, setMounted] = useState(show)
  const [stage, setStage] = useState<PresenceTransitionStage>(show ? 'entered' : 'exited')

  useEffect(() => {
    let timeoutId: number | null = null

    if (show) {
      setMounted(true)
      setStage((prev) => (prev === 'entered' ? 'entered' : 'entering'))
      timeoutId = window.setTimeout(() => setStage('entered'), duration)
    } else {
      setStage((prev) => (prev === 'exited' ? 'exited' : 'exiting'))
      timeoutId = window.setTimeout(() => {
        setStage('exited')
        setMounted(false)
      }, duration)
    }

    return () => {
      if (timeoutId != null) window.clearTimeout(timeoutId)
    }
  }, [duration, show])

  return { mounted, stage }
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

/**
 * Derives enter/exit stage and mount flag from a boolean `show`.
 */
export default function usePresenceTransition(show, duration = 300) {
  const [mounted, setMounted] = useState(show)
  const [stage, setStage] = useState(show ? 'entered' : 'exited')

  useEffect(() => {
    let timeoutId = null

    if (show) {
      setMounted(true)
      setStage((prev) => (prev === 'entered' ? 'entered' : 'entering'))
      timeoutId = window.setTimeout(() => setStage('entered'), duration)
    } else {
      setStage((prev) => (prev === 'exited' ? 'exited' : 'exiting'))
      timeoutId = window.setTimeout(() => {
        setStage('exited')
        setMounted(false)
      }, duration)
    }

    return () => {
      if (timeoutId != null) window.clearTimeout(timeoutId)
    }
  }, [duration, show])

  return { mounted, stage }
}
```
