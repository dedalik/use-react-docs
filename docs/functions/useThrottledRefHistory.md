---
title: Throttled state history snapshots
sidebar_label: useThrottledRefHistory
category: State
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useThrottledRefHistory.tsx'
description: >-
  useThrottledRefHistory from @dedalik/use-react: records history snapshots at throttled intervals.
---

# useThrottledRefHistory()

<PackageData fn="useThrottledRefHistory" />
<HookLiveDemo demo="useThrottledRefHistory/basic" title="Live demo: useThrottledRefHistory" />

## Overview

`useThrottledRefHistory` updates `value` immediately via `set`, but it only commits new snapshots into `history` at a throttled rate: at most once per `delay` window while `value` keeps changing, with a trailing commit scheduled so the history eventually catches up to the latest value. That makes undo/redo checkpoints feel “sampled” during continuous input (sliders, drag gestures, live resizing), while `capacity` bounds how many snapshots are retained.

### What it accepts

- `initialValue: T`.
- `options: UseThrottledRefHistoryOptions = {}`.

### What it returns

- `value`: The live editable state updated on every `set` call. Type `T`.
- `set`: Updates `value` immediately (history snapshots are throttled). Type `(next: T) => void`.
- `history`: Ordered list of committed snapshots (throttled), bounded by `capacity`. Type `T[]`.
- `pointer`: Index into `history` for the active committed snapshot. Type `number`.
- `canUndo`: `true` when `pointer` can move backward. Type `boolean`.
- `canRedo`: `true` when `pointer` can move forward. Type `boolean`.
- `undo`: Moves `pointer` back and restores `value` from `history`. Type `() => void`.
- `redo`: Moves `pointer` forward and restores `value` from `history`. Type `() => void`.
- `clear`: Collapses history to only the current committed snapshot and resets `pointer` to `0`. Type `() => void`.

## Usage

Real-world example: drag a slider quickly-`value` updates every frame, but `history` only records checkpoints at most every `delay` ms (plus a trailing commit), bounded by `capacity`.

```tsx
import useThrottledRefHistory from '@dedalik/use-react/useThrottledRefHistory'

function Example() {
  const { value, set, history, pointer, canUndo, canRedo, undo, redo, clear } = useThrottledRefHistory(50, {
    delay: 250,
    capacity: 8,
  })

  return (
    <div>
      <h3>Slider with throttled checkpoints</h3>
      <label htmlFor='size-slider'>Width: {value}px</label>
      <input
        id='size-slider'
        type='range'
        min={120}
        max={420}
        value={value}
        onChange={(event) => set(Number(event.target.value))}
      />
      <p>Move the slider continuously: checkpoints appear at most ~250ms apart.</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
        <button type='button' onClick={undo} disabled={!canUndo}>
          Undo
        </button>
        <button type='button' onClick={redo} disabled={!canRedo}>
          Redo
        </button>
        <button type='button' onClick={clear}>
          Clear history
        </button>
      </div>
      <p>
        Pointer: {pointer} / {history.length - 1} (snapshots kept: {history.length}, max 8)
      </p>
      <ol>
        {history.map((snapshot, index) => (
          <li key={`${index}-${snapshot}`}>
            {index === pointer ? <strong>active</strong> : 'saved'}: {snapshot}px
          </li>
        ))}
      </ol>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useThrottledRefHistory`

**Signature:** `useThrottledRefHistory(initialValue: T, options: UseThrottledRefHistoryOptions = {}): UseThrottledRefHistoryReturn<T>`

#### Parameters

1. **`initialValue`** (`T`) - Starting `value` and the first committed snapshot in `history`.
2. **`options`** (optional `UseThrottledRefHistoryOptions`) - `delay` throttles snapshot commits; `capacity` caps how many committed snapshots are kept (oldest dropped). Default: `{}`.

#### Returns

Object with:

- `value` - The live editable state updated on every `set` call. (`T`).
- `set` - Updates `value` immediately (history snapshots are throttled). (`(next: T) => void`).
- `history` - Ordered list of committed snapshots (throttled), bounded by `capacity`. (`T[]`).
- `pointer` - Index into `history` for the active committed snapshot. (`number`).
- `canUndo` - `true` when `pointer` can move backward. (`boolean`).
- `canRedo` - `true` when `pointer` can move forward. (`boolean`).
- `undo` - Moves `pointer` back and restores `value` from `history`. (`() => void`).
- `redo` - Moves `pointer` forward and restores `value` from `history`. (`() => void`).
- `clear` - Collapses history to only the current committed snapshot and resets `pointer` to `0`. (`() => void`).

## Copy-paste hook

```tsx
import { useEffect, useRef, useState } from 'react'

export interface UseThrottledRefHistoryOptions {
  delay?: number
  capacity?: number
}

export interface UseThrottledRefHistoryReturn<T> {
  value: T
  set: (next: T) => void
  history: T[]
  pointer: number
  canUndo: boolean
  canRedo: boolean
  undo: () => void
  redo: () => void
  clear: () => void
}

/**
 * Records history snapshots at most once per throttle window.
 */
export default function useThrottledRefHistory<T>(
  initialValue: T,
  options: UseThrottledRefHistoryOptions = {},
): UseThrottledRefHistoryReturn<T> {
  const { delay = 200, capacity = 10 } = options
  const [value, setValue] = useState(initialValue)
  const [state, setState] = useState(() => ({ history: [initialValue] as T[], pointer: 0 }))
  const lastRunRef = useRef(0)
  const trailingRef = useRef<number | null>(null)

  useEffect(() => {
    const apply = () => {
      setState((prev) => {
        const current = prev.history[prev.pointer]
        if (Object.is(current, value)) return prev
        const base = prev.history.slice(0, prev.pointer + 1)
        const nextHistory = [...base, value]
        const max = Math.max(1, capacity)
        const trimmed = nextHistory.length > max ? nextHistory.slice(nextHistory.length - max) : nextHistory
        return { history: trimmed, pointer: trimmed.length - 1 }
      })
      lastRunRef.current = Date.now()
    }

    const now = Date.now()
    const wait = Math.max(0, delay - (now - lastRunRef.current))
    if (wait <= 0) {
      if (trailingRef.current != null) {
        window.clearTimeout(trailingRef.current)
        trailingRef.current = null
      }
      apply()
    } else {
      if (trailingRef.current != null) window.clearTimeout(trailingRef.current)
      trailingRef.current = window.setTimeout(() => {
        trailingRef.current = null
        apply()
      }, wait)
    }

    return () => {
      if (trailingRef.current != null) {
        window.clearTimeout(trailingRef.current)
        trailingRef.current = null
      }
    }
  }, [capacity, delay, value])

  const undo = () => {
    setState((prev) => {
      const pointer = Math.max(0, prev.pointer - 1)
      setValue(prev.history[pointer])
      return { ...prev, pointer }
    })
  }

  const redo = () => {
    setState((prev) => {
      const pointer = Math.min(prev.history.length - 1, prev.pointer + 1)
      setValue(prev.history[pointer])
      return { ...prev, pointer }
    })
  }

  const clear = () => {
    setState((prev) => ({ history: [prev.history[prev.pointer]], pointer: 0 }))
  }

  return {
    value,
    set: setValue,
    history: state.history,
    pointer: state.pointer,
    canUndo: state.pointer > 0,
    canRedo: state.pointer < state.history.length - 1,
    undo,
    redo,
    clear,
  }
}
```

```js
import { useEffect, useRef, useState } from 'react'

export default function useThrottledRefHistory(initialValue, options = {}) {
  const { delay = 200, capacity = 10 } = options
  const [value, setValue] = useState(initialValue)
  const [state, setState] = useState(() => ({ history: [initialValue], pointer: 0 }))
  const lastRunRef = useRef(0)
  const trailingRef = useRef(null)

  useEffect(() => {
    const apply = () => {
      setState((prev) => {
        const current = prev.history[prev.pointer]
        if (Object.is(current, value)) return prev
        const base = prev.history.slice(0, prev.pointer + 1)
        const nextHistory = [...base, value]
        const max = Math.max(1, capacity)
        const trimmed = nextHistory.length > max ? nextHistory.slice(nextHistory.length - max) : nextHistory
        return { history: trimmed, pointer: trimmed.length - 1 }
      })
      lastRunRef.current = Date.now()
    }

    const now = Date.now()
    const wait = Math.max(0, delay - (now - lastRunRef.current))
    if (wait <= 0) {
      if (trailingRef.current != null) {
        window.clearTimeout(trailingRef.current)
        trailingRef.current = null
      }
      apply()
    } else {
      if (trailingRef.current != null) window.clearTimeout(trailingRef.current)
      trailingRef.current = window.setTimeout(() => {
        trailingRef.current = null
        apply()
      }, wait)
    }

    return () => {
      if (trailingRef.current != null) {
        window.clearTimeout(trailingRef.current)
        trailingRef.current = null
      }
    }
  }, [capacity, delay, value])

  const undo = () => {
    setState((prev) => {
      const pointer = Math.max(0, prev.pointer - 1)
      setValue(prev.history[pointer])
      return { ...prev, pointer }
    })
  }

  const redo = () => {
    setState((prev) => {
      const pointer = Math.min(prev.history.length - 1, prev.pointer + 1)
      setValue(prev.history[pointer])
      return { ...prev, pointer }
    })
  }

  const clear = () => {
    setState((prev) => ({ history: [prev.history[prev.pointer]], pointer: 0 }))
  }

  return {
    value,
    set: setValue,
    history: state.history,
    pointer: state.pointer,
    canUndo: state.pointer > 0,
    canRedo: state.pointer < state.history.length - 1,
    undo,
    redo,
    clear,
  }
}
```
