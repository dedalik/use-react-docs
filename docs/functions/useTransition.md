---
title: Transition stage state helper
sidebar_label: useTransition
category: Animation
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useTransition.tsx'
description: >-
  useTransition from @dedalik/use-react: derive enter/exit stages with mount control.
---

# useTransition()

<PackageData fn="useTransition" />

Last updated: 24/04/2026

## Overview

`useTransition` (this **library** hook, **not** React 18’s concurrent **`useTransition`**) takes a **visibility** boolean **`show`** and a **duration** in ms (default **300**). When **`show`** flips to **true**, it sets **`mounted` true** immediately, moves **`stage`** to **`entering`**, and after **`duration`** sets **`entered`**. When **`show`** is **false**, it sets **`exiting`**, and after **`duration`** sets **`exited`** and **`mounted` false** so you can unmount the subtree. The effect **clears** the timer on re‑run and cleanup, which avoids double‑firing. Initial state matches **`show`**: if **true** you get **`mounted`**/ **`entered`**; if **false** **`exited`**. The **`idle`** value exists in the type for symmetry but the implementation never sets it-treat the union as a hint for your own FSM. Use it to drive **CSS** classes (opacity/transform) in sync with mount timing.

> **Name collision:** This hook is different from `import { useTransition } from 'react'`. Import from `@dedalik/use-react/useTransition` to get this one.

### What it accepts

1. **`show`**: `boolean`
2. **`duration`**: `number` (ms), default **300**

### What it returns

- **`mounted`**: `boolean` - true while the child should be in the tree
- **`stage`**: `TransitionStage` - **`entering` | `entered` | `exiting` | `exited`**

## Usage

Tie a panel’s **opacity** to **`stage`**, and toggle **`show`**; use **`duration` 400** ms in the example.

```tsx
import type { CSSProperties } from 'react'
import { useState } from 'react'
import useTransition from '@dedalik/use-react/useTransition'

function Example() {
  const [open, setOpen] = useState(false)
  const { mounted, stage } = useTransition(open, 400)

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

### `useTransition` (use-react)

**Signature:** `useTransition(show: boolean, duration = 300): UseTransitionReturn`

#### Parameters

1. **`show`**
2. **`duration`**

#### Returns

**`mounted`**, **`stage`**

**Type** - `TransitionStage`: `'idle' | 'entering' | 'entered' | 'exiting' | 'exited'`

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

export type TransitionStage = 'idle' | 'entering' | 'entered' | 'exiting' | 'exited'

export interface UseTransitionReturn {
  mounted: boolean
  stage: TransitionStage
}

/**
 * Derives transition stage and mount state from a boolean toggle.
 */
export default function useTransition(show: boolean, duration = 300): UseTransitionReturn {
  const [mounted, setMounted] = useState(show)
  const [stage, setStage] = useState<TransitionStage>(show ? 'entered' : 'exited')

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
 * Derives transition stage and mount state from a boolean toggle.
 */
export default function useTransition(show, duration = 300) {
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
