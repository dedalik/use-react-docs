---
title: State with history snapshots
sidebar_label: useRefHistory
category: State
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useRefHistory.tsx'
description: >-
  useRefHistory from @dedalik/use-react: state utility with undo/redo history.
---

# useRefHistory()

<PackageData fn="useRefHistory" />

Last updated: 24/04/2026

## Overview

`useRefHistory` keeps a linear snapshot history of a value and moves a pointer through it for undo/redo. Each `set` appends a new snapshot after the current pointer (discarding any “future” branch), while `capacity` trims the oldest entries so memory stays bounded. `undo`/`redo` only move the pointer (they do not mutate past snapshots), and `clear` collapses history down to the current snapshot so you can checkpoint after a save or reset exploration.

### What it accepts

- `initialValue: T`.
- `options: UseRefHistoryOptions = {}`.

### What it returns

- `value`: The snapshot at `history[pointer]`. Type `T`.
- `set`: Appends a new snapshot after the current pointer and trims by `capacity`. Type `(next: T) => void`.
- `history`: Ordered list of snapshots (length bounded by `capacity`). Type `T[]`.
- `pointer`: Index into `history` for the active snapshot. Type `number`.
- `canUndo`: `true` when `pointer` can move backward. Type `boolean`.
- `canRedo`: `true` when `pointer` can move forward. Type `boolean`.
- `undo`: Moves `pointer` back one step. Type `() => void`.
- `redo`: Moves `pointer` forward one step. Type `() => void`.
- `clear`: Keeps only the current snapshot and resets `pointer` to `0`. Type `() => void`.

## Usage

Real-world example: a simple counter with bounded history (`capacity`) and undo/redo/clear controls.

```tsx
import useRefHistory from '@dedalik/use-react/useRefHistory'

function Example() {
  const { value, set, history, pointer, canUndo, canRedo, undo, redo, clear } = useRefHistory(0, {
    capacity: 5,
  })

  return (
    <div>
      <h3>Counter with history</h3>
      <p>Current value: {value}</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button type='button' onClick={() => set(value + 1)}>
          +1
        </button>
        <button type='button' onClick={() => set(value - 1)}>
          -1
        </button>
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
        Pointer: {pointer} / {history.length - 1} (snapshots kept: {history.length}, max 5)
      </p>
      <p>Trail: {history.join(' → ')}</p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useRefHistory`

**Signature:** `useRefHistory(initialValue: T, options: UseRefHistoryOptions = {}): UseRefHistoryReturn<T>`

#### Parameters

1. **`initialValue`** (`T`) - Starting snapshot; becomes the first entry in `history`.
2. **`options`** (optional `UseRefHistoryOptions`) - `capacity` caps how many snapshots are kept (oldest dropped). Default: `{}`.

#### Returns

Object with:

- `value` - The snapshot at `history[pointer]`. (`T`).
- `set` - Appends a new snapshot after the current pointer and trims by `capacity`. (`(next: T) => void`).
- `history` - Ordered list of snapshots (length bounded by `capacity`). (`T[]`).
- `pointer` - Index into `history` for the active snapshot. (`number`).
- `canUndo` - `true` when `pointer` can move backward. (`boolean`).
- `canRedo` - `true` when `pointer` can move forward. (`boolean`).
- `undo` - Moves `pointer` back one step. (`() => void`).
- `redo` - Moves `pointer` forward one step. (`() => void`).
- `clear` - Keeps only the current snapshot and resets `pointer` to `0`. (`() => void`).

## Copy-paste hook

```tsx
import { useCallback, useState } from 'react'

export interface UseRefHistoryOptions {
  capacity?: number
}

export interface UseRefHistoryReturn<T> {
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
 * State with snapshot history and undo/redo controls.
 */
export default function useRefHistory<T>(initialValue: T, options: UseRefHistoryOptions = {}): UseRefHistoryReturn<T> {
  const { capacity = 10 } = options
  const [state, setState] = useState(() => ({ history: [initialValue] as T[], pointer: 0 }))
  const { history, pointer } = state
  const value = history[pointer] ?? history[history.length - 1]

  const set = useCallback(
    (next: T) => {
      setState((prev) => {
        const base = prev.history.slice(0, prev.pointer + 1)
        const nextHistory = [...base, next]
        const max = Math.max(1, capacity)
        const trimmed = nextHistory.length > max ? nextHistory.slice(nextHistory.length - max) : nextHistory
        return { history: trimmed, pointer: trimmed.length - 1 }
      })
    },
    [capacity],
  )

  const undo = useCallback(() => {
    setState((prev) => ({ ...prev, pointer: Math.max(0, prev.pointer - 1) }))
  }, [])

  const redo = useCallback(() => {
    setState((prev) => ({ ...prev, pointer: Math.min(prev.history.length - 1, prev.pointer + 1) }))
  }, [])

  const clear = useCallback(() => {
    setState((prev) => ({ history: [prev.history[prev.pointer]], pointer: 0 }))
  }, [])

  return {
    value,
    set,
    history,
    pointer,
    canUndo: pointer > 0,
    canRedo: pointer < history.length - 1,
    undo,
    redo,
    clear,
  }
}
```

```js
import { useCallback, useState } from 'react'

export default function useRefHistory(initialValue, options = {}) {
  const { capacity = 10 } = options
  const [state, setState] = useState(() => ({ history: [initialValue], pointer: 0 }))
  const { history, pointer } = state
  const value = history[pointer] ?? history[history.length - 1]

  const set = useCallback(
    (next) => {
      setState((prev) => {
        const base = prev.history.slice(0, prev.pointer + 1)
        const nextHistory = [...base, next]
        const max = Math.max(1, capacity)
        const trimmed = nextHistory.length > max ? nextHistory.slice(nextHistory.length - max) : nextHistory
        return { history: trimmed, pointer: trimmed.length - 1 }
      })
    },
    [capacity],
  )

  const undo = useCallback(() => {
    setState((prev) => ({ ...prev, pointer: Math.max(0, prev.pointer - 1) }))
  }, [])

  const redo = useCallback(() => {
    setState((prev) => ({ ...prev, pointer: Math.min(prev.history.length - 1, prev.pointer + 1) }))
  }, [])

  const clear = useCallback(() => {
    setState((prev) => ({ history: [prev.history[prev.pointer]], pointer: 0 }))
  }, [])

  return {
    value,
    set,
    history,
    pointer,
    canUndo: pointer > 0,
    canRedo: pointer < history.length - 1,
    undo,
    redo,
    clear,
  }
}
```
