---
title: Debounced state history snapshots
sidebar_label: useDebouncedRefHistory
category: State
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useDebouncedRefHistory.tsx'
description: >-
  useDebouncedRefHistory from @dedalik/use-react: records history snapshots after debounce delay.
---

# useDebouncedRefHistory()

<PackageData fn="useDebouncedRefHistory" />

Last updated: 24/04/2026

## Overview

`useDebouncedRefHistory` updates `value` immediately via `set`, but it only appends a new snapshot to `history` after the value stays stable for `delay` milliseconds (debounced checkpointing). If you keep typing, intermediate states are not recorded as undo steps; when you pause, the latest `value` becomes the next history entry (trimmed by `capacity`), and `undo`/`redo` navigate those checkpoints while `clear` collapses history to the current committed snapshot.

### What it accepts

- `initialValue: T`.
- `options: UseDebouncedRefHistoryOptions = {}`.

### What it returns

- `value`: The live editable state updated on every `set` call. Type `T`.
- `set`: Updates `value` immediately (history snapshots are debounced). Type `(next: T) => void`.
- `history`: Ordered list of committed snapshots (after debounce), bounded by `capacity`. Type `T[]`.
- `pointer`: Index into `history` for the active committed snapshot. Type `number`.
- `canUndo`: `true` when `pointer` can move backward. Type `boolean`.
- `canRedo`: `true` when `pointer` can move forward. Type `boolean`.
- `undo`: Moves `pointer` back and restores `value` from `history`. Type `() => void`.
- `redo`: Moves `pointer` forward and restores `value` from `history`. Type `() => void`.
- `clear`: Collapses history to only the current committed snapshot and resets `pointer` to `0`. Type `() => void`.

## Usage

Real-world example: type freely in a textarea, but only create undo history after you pause typing (`delay`), while keeping history bounded (`capacity`).

```tsx
import useDebouncedRefHistory from '@dedalik/use-react/useDebouncedRefHistory'

function Example() {
  const { value, set, history, pointer, canUndo, canRedo, undo, redo, clear } = useDebouncedRefHistory('', {
    delay: 400,
    capacity: 6,
  })

  return (
    <div>
      <h3>Debounced checkpoints</h3>
      <textarea
        value={value}
        onChange={(event) => set(event.target.value)}
        rows={5}
        placeholder='Type, pause, then keep typing…'
      />
      <p>Tip: pause ~400ms to record a new checkpoint.</p>
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
        Pointer: {pointer} / {history.length - 1} (snapshots kept: {history.length}, max 6)
      </p>
      <ol>
        {history.map((snapshot, index) => (
          <li key={`${index}-${snapshot.slice(0, 16)}`}>
            {index === pointer ? <strong>active</strong> : 'saved'}: {snapshot || '(empty)'}
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

### `useDebouncedRefHistory`

**Signature:** `useDebouncedRefHistory(initialValue: T, options: UseDebouncedRefHistoryOptions = {}): UseDebouncedRefHistoryReturn<T>`

#### Parameters

1. **`initialValue`** (`T`) - Starting `value` and the first committed snapshot in `history`.
2. **`options`** (optional `UseDebouncedRefHistoryOptions`) - `delay` debounces snapshot commits; `capacity` caps how many committed snapshots are kept (oldest dropped). Default: `{}`.

#### Returns

Object with:

- `value` - The live editable state updated on every `set` call. (`T`).
- `set` - Updates `value` immediately (history snapshots are debounced). (`(next: T) => void`).
- `history` - Ordered list of committed snapshots (after debounce), bounded by `capacity`. (`T[]`).
- `pointer` - Index into `history` for the active committed snapshot. (`number`).
- `canUndo` - `true` when `pointer` can move backward. (`boolean`).
- `canRedo` - `true` when `pointer` can move forward. (`boolean`).
- `undo` - Moves `pointer` back and restores `value` from `history`. (`() => void`).
- `redo` - Moves `pointer` forward and restores `value` from `history`. (`() => void`).
- `clear` - Collapses history to only the current committed snapshot and resets `pointer` to `0`. (`() => void`).

## Copy-paste hook

```tsx
import { useEffect, useState } from 'react'

export interface UseDebouncedRefHistoryOptions {
  delay?: number
  capacity?: number
}

export interface UseDebouncedRefHistoryReturn<T> {
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
 * Records history snapshots after debounced state changes.
 */
export default function useDebouncedRefHistory<T>(
  initialValue: T,
  options: UseDebouncedRefHistoryOptions = {},
): UseDebouncedRefHistoryReturn<T> {
  const { delay = 200, capacity = 10 } = options
  const [value, setValue] = useState(initialValue)
  const [state, setState] = useState(() => ({ history: [initialValue] as T[], pointer: 0 }))

  useEffect(() => {
    const id = window.setTimeout(
      () => {
        setState((prev) => {
          const current = prev.history[prev.pointer]
          if (Object.is(current, value)) return prev
          const base = prev.history.slice(0, prev.pointer + 1)
          const nextHistory = [...base, value]
          const max = Math.max(1, capacity)
          const trimmed = nextHistory.length > max ? nextHistory.slice(nextHistory.length - max) : nextHistory
          return { history: trimmed, pointer: trimmed.length - 1 }
        })
      },
      Math.max(0, delay),
    )

    return () => window.clearTimeout(id)
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
import { useEffect, useState } from 'react'

export default function useDebouncedRefHistory(initialValue, options = {}) {
  const { delay = 200, capacity = 10 } = options
  const [value, setValue] = useState(initialValue)
  const [state, setState] = useState(() => ({ history: [initialValue], pointer: 0 }))

  useEffect(() => {
    const id = window.setTimeout(
      () => {
        setState((prev) => {
          const current = prev.history[prev.pointer]
          if (Object.is(current, value)) return prev
          const base = prev.history.slice(0, prev.pointer + 1)
          const nextHistory = [...base, value]
          const max = Math.max(1, capacity)
          const trimmed = nextHistory.length > max ? nextHistory.slice(nextHistory.length - max) : nextHistory
          return { history: trimmed, pointer: trimmed.length - 1 }
        })
      },
      Math.max(0, delay),
    )

    return () => window.clearTimeout(id)
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
