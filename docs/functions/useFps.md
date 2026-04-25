---
title: Estimate current frames per second
sidebar_label: useFps
category: Sensors
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useFps.tsx'
description: >-
  useFps from @dedalik/use-react: requestAnimationFrame-based FPS estimator.
---

# useFps()

<PackageData fn="useFps" />

Last updated: 24/04/2026

## Overview

`useFps` runs a **`requestAnimationFrame`** loop and estimates how many frames ran in a sliding window of **`sampleMs`** milliseconds (default **1000**). Each time the elapsed time since the window start reaches **`sampleMs`**, it sets FPS to **frames × 1000 / elapsed** (rounded) and starts counting the next window. Smaller **`sampleMs`** makes the readout more responsive (noisier); larger values average over a longer period. The value is **0** until the first full window completes. The hook is meant for on-screen diagnostics, not for precise performance profiling. Changing **`sampleMs`** re-runs the effect and resets the internal counters.

### What it accepts

- **`sampleMs`** (optional, default **`1000`**) - width of each averaging window in ms.

### What it returns

- A **`number`**: estimated frames per second.

## Usage

Show two readouts: default 1s smoothing vs a faster 0.5s window.

```tsx
import useFps from '@dedalik/use-react/useFps'

function Example() {
  const fpsSmooth = useFps(1000)
  const fpsFast = useFps(500)

  return (
    <dl>
      <dt>Estimated FPS (sample 1000 ms, default)</dt>
      <dd>
        <strong>{fpsSmooth}</strong>
      </dd>
      <dt>Estimated FPS (sample 500 ms)</dt>
      <dd>
        <strong>{fpsFast}</strong>
      </dd>
    </dl>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useFps`

**Signature:** `useFps(sampleMs = 1000): number`

#### Parameters

1. **`sampleMs`** (optional) - Averaging window in milliseconds. Default **1000**.

#### Returns

A **`number`**: current FPS estimate from the rAF-based counter.

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useRef, useState } from 'react'

/**
 * Estimates current frames-per-second using requestAnimationFrame.
 */
export default function useFps(sampleMs = 1000): number {
  const [fps, setFps] = useState(0)
  const framesRef = useRef(0)
  const startRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const loop = (ts: number) => {
      if (startRef.current === 0) startRef.current = ts
      framesRef.current += 1

      const elapsed = ts - startRef.current
      if (elapsed >= sampleMs) {
        setFps(Math.round((framesRef.current * 1000) / elapsed))
        framesRef.current = 0
        startRef.current = ts
      }

      rafRef.current = window.requestAnimationFrame(loop)
    }

    rafRef.current = window.requestAnimationFrame(loop)

    return () => {
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current)
    }
  }, [sampleMs])

  return fps
}
```

### JavaScript

```js
import { useEffect, useRef, useState } from 'react'

/**
 * Estimates current frames-per-second using requestAnimationFrame.
 */
export default function useFps(sampleMs = 1000) {
  const [fps, setFps] = useState(0)
  const framesRef = useRef(0)
  const startRef = useRef(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const loop = (ts) => {
      if (startRef.current === 0) startRef.current = ts
      framesRef.current += 1

      const elapsed = ts - startRef.current
      if (elapsed >= sampleMs) {
        setFps(Math.round((framesRef.current * 1000) / elapsed))
        framesRef.current = 0
        startRef.current = ts
      }

      rafRef.current = window.requestAnimationFrame(loop)
    }

    rafRef.current = window.requestAnimationFrame(loop)

    return () => {
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current)
    }
  }, [sampleMs])

  return fps
}
```
