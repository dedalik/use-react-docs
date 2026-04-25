---
title: Countdown to a future instant
sidebar_label: useCountdown
category: Time
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useCountdown.tsx'
description: >-
  useCountdown from @dedalik/use-react: remaining ms, clock fields, optional onComplete.
---

# useCountdown()

<PackageData fn="useCountdown" />

Last updated: 24/04/2026

## Overview

`useCountdown` measures time **until a future** **`Date`** or **ms** timestamp. It returns **`remainingMs`** (clamped to **`0`**) and floored **days / hours / minutes / seconds** plus **`totalSeconds`**. If **`target`** is **`null`**, **`undefined`**, or not a **valid** time, it treats the countdown as **finished** (`isFinished: true`, zeros). An internal **`tick`** re-runs the computation on a schedule: by default **`interval` = 1000** ms; **`0`** or **`null`** means **no** `setInterval`-values update **only** when **`target`** (or **`interval`**) changes. When **`remainingMs`** first hits **zero** for a given **resolved** target, **`onComplete`** runs **once** (re-targeting or changing **`targetMs`** clears the one-shot so a new end can fire again). **Past** or **“now”** targets yield **finished** immediately.

### What it accepts

1. **`target`**: `Date | number | null | undefined`
2. Optional **`options`**: `{ interval?: number | null; onComplete?: () => void }` - default **interval 1000** ms

### What it returns

**`UseCountdownResult`**: **`{ remainingMs, isFinished, totalSeconds, days, hours, minutes, seconds }`**

## Usage

Event in **2 minutes 30 s**, **250 ms** tick for smoother UI, and **`onComplete`** to show “Live” (example state).

```tsx
import { useState } from 'react'
import useCountdown from '@dedalik/use-react/useCountdown'

function Example() {
  const [phase, setPhase] = useState<'waiting' | 'live'>('waiting')
  const target = new Date(Date.now() + 2 * 60 * 1000 + 30 * 1000)

  const { remainingMs, isFinished, days, hours, minutes, seconds } = useCountdown(target, {
    interval: 250,
    onComplete: () => setPhase('live'),
  })

  return (
    <div>
      <p>
        {isFinished
          ? phase === 'live'
            ? 'We are live.'
            : 'Starting…'
          : `Starts in: ${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
      </p>
      <p>Remaining: {Math.ceil(remainingMs / 1000)} s (approx.)</p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useCountdown`

**Signature:** `useCountdown(target: Date | number | null | undefined, options?: UseCountdownOptions): UseCountdownResult`

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useMemo, useRef, useState } from 'react'

export interface UseCountdownOptions {
  /**
   * How often to recompute remaining time (ms). `null` or `0` updates only when
   * `target` changes (no interval).
   */
  interval?: number | null
  /** Called once when remaining time first reaches zero for a given `target`. */
  onComplete?: () => void
}

export interface UseCountdownResult {
  /** Milliseconds until `target`, clamped at `0`. */
  remainingMs: number
  /** True when `target` is nullish, invalid, or not in the future. */
  isFinished: boolean
  /** Floored whole seconds until `target` (0 when finished). */
  totalSeconds: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

function targetToMs(target: Date | number | null | undefined): number | null {
  if (target == null) return null
  const t = typeof target === 'number' ? target : target.getTime()
  return Number.isNaN(t) ? null : t
}

function breakdown(remainingMs: number, isFinished: boolean): Omit<UseCountdownResult, 'remainingMs' | 'isFinished'> {
  if (isFinished || remainingMs <= 0) {
    return { totalSeconds: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  const totalSeconds = Math.floor(remainingMs / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { totalSeconds, days, hours, minutes, seconds }
}

/**
 * Countdown to a future instant: remaining milliseconds and clock fields, with optional tick.
 */
export default function useCountdown(
  target: Date | number | null | undefined,
  options?: UseCountdownOptions,
): UseCountdownResult {
  const { interval = 1000, onComplete } = options ?? {}
  const targetMs = useMemo(() => targetToMs(target), [target])
  const onCompleteRef = useRef(onComplete)
  const completionMarkerRef = useRef<number | null>(null)
  const prevTargetMsRef = useRef<number | null | undefined>(undefined)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    if (prevTargetMsRef.current !== targetMs) {
      completionMarkerRef.current = null
      prevTargetMsRef.current = targetMs ?? null
    }
  }, [targetMs])

  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (targetMs == null) {
      return
    }

    setTick((n) => n + 1)

    if (interval == null || interval <= 0) {
      return
    }

    const id = window.setInterval(() => {
      setTick((n) => n + 1)
      if (Date.now() >= targetMs) {
        window.clearInterval(id)
      }
    }, interval)

    return () => window.clearInterval(id)
  }, [targetMs, interval])

  const result = useMemo(() => {
    if (targetMs == null) {
      return {
        remainingMs: 0,
        isFinished: true,
        totalSeconds: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }

    const remainingMs = Math.max(0, targetMs - Date.now())
    const isFinished = remainingMs <= 0
    const parts = breakdown(remainingMs, isFinished)

    return { remainingMs, isFinished, ...parts }
  }, [targetMs, tick]) // eslint-disable-line react-hooks/exhaustive-deps -- tick bumps wall-clock reads

  const { isFinished } = result

  useEffect(() => {
    if (targetMs == null || !isFinished) {
      return
    }
    if (completionMarkerRef.current === targetMs) {
      return
    }
    completionMarkerRef.current = targetMs
    onCompleteRef.current?.()
  }, [isFinished, targetMs])

  return result
}
```

### JavaScript

```js
import { useEffect, useMemo, useRef, useState } from 'react'

function targetToMs(target) {
  if (target == null) return null
  const t = typeof target === 'number' ? target : target.getTime()
  return Number.isNaN(t) ? null : t
}

function breakdown(remainingMs, isFinished) {
  if (isFinished || remainingMs <= 0) {
    return { totalSeconds: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  const totalSeconds = Math.floor(remainingMs / 1000)
  const days = Math.floor(totalSeconds / 86400)
  const hours = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return { totalSeconds, days, hours, minutes, seconds }
}

/**
 * Countdown to a future instant: remaining milliseconds and clock fields, with optional tick.
 */
export default function useCountdown(target, options) {
  const { interval = 1000, onComplete } = options ?? {}
  const targetMs = useMemo(() => targetToMs(target), [target])
  const onCompleteRef = useRef(onComplete)
  const completionMarkerRef = useRef(null)
  const prevTargetMsRef = useRef(undefined)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    if (prevTargetMsRef.current !== targetMs) {
      completionMarkerRef.current = null
      prevTargetMsRef.current = targetMs ?? null
    }
  }, [targetMs])

  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (targetMs == null) {
      return
    }

    setTick((n) => n + 1)

    if (interval == null || interval <= 0) {
      return
    }

    const id = window.setInterval(() => {
      setTick((n) => n + 1)
      if (Date.now() >= targetMs) {
        window.clearInterval(id)
      }
    }, interval)

    return () => window.clearInterval(id)
  }, [targetMs, interval])

  const result = useMemo(() => {
    if (targetMs == null) {
      return {
        remainingMs: 0,
        isFinished: true,
        totalSeconds: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      }
    }

    const remainingMs = Math.max(0, targetMs - Date.now())
    const isFinished = remainingMs <= 0
    const parts = breakdown(remainingMs, isFinished)

    return { remainingMs, isFinished, ...parts }
  }, [targetMs, tick]) // eslint-disable-line react-hooks/exhaustive-deps -- tick bumps wall-clock reads

  const { isFinished } = result

  useEffect(() => {
    if (targetMs == null || !isFinished) {
      return
    }
    if (completionMarkerRef.current === targetMs) {
      return
    }
    completionMarkerRef.current = targetMs
    onCompleteRef.current?.()
  }, [isFinished, targetMs])

  return result
}
```
