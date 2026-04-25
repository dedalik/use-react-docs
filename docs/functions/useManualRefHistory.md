---
title: Manual commit history snapshots
sidebar_label: useManualRefHistory
category: State
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useManualRefHistory.tsx'
description: >-
  useManualRefHistory from @dedalik/use-react: commit-based state history with undo/redo.
---

# useManualRefHistory()

<PackageData fn="useManualRefHistory" />

Last updated: 24/04/2026

## Overview

`useManualRefHistory` keeps a working `value` you can edit freely with `set`, but it only appends a durable snapshot to `history` when you explicitly call `commit`. That makes it a good fit for editors and forms where every keystroke should not become an undo step: you batch changes, then checkpoint with `commit`, while `undo`/`redo` navigate prior checkpoints and `capacity` bounds how many snapshots are retained.

### What it accepts

- `initialValue: T`.
- `options: UseManualRefHistoryOptions = {}`.

### What it returns

- `value`: The editable working state (not necessarily committed yet). Type `T`.
- `set`: Updates `value` without recording a new history snapshot. Type `(next: T) => void`.
- `commit`: Appends the current `value` as a new snapshot after `pointer` and trims by `capacity`. Type `() => void`.
- `history`: Ordered list of committed snapshots (length bounded by `capacity`). Type `T[]`.
- `pointer`: Index into `history` for the active committed snapshot. Type `number`.
- `canUndo`: `true` when `pointer` can move backward. Type `boolean`.
- `canRedo`: `true` when `pointer` can move forward. Type `boolean`.
- `undo`: Moves `pointer` back and restores `value` from `history`. Type `() => void`.
- `redo`: Moves `pointer` forward and restores `value` from `history`. Type `() => void`.
- `clear`: Collapses history to only the current `value` and resets `pointer` to `0`. Type `() => void`.

## Usage

Real-world example: edit a note freely, then commit checkpoints to history (bounded by `capacity`).

```tsx
import useManualRefHistory from '@dedalik/use-react/useManualRefHistory'

function Example() {
  const { value, set, commit, history, pointer, canUndo, canRedo, undo, redo, clear } = useManualRefHistory(
    'Version 1',
    { capacity: 4 },
  )

  return (
    <div>
      <h3>Note checkpoints</h3>
      <textarea value={value} onChange={(event) => set(event.target.value)} rows={4} />
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
        <button type='button' onClick={commit}>
          Commit checkpoint
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
        Pointer: {pointer} / {history.length - 1} (snapshots kept: {history.length}, max 4)
      </p>
      <ol>
        {history.map((snapshot, index) => (
          <li key={`${index}-${snapshot.slice(0, 12)}`}>
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

### `useManualRefHistory`

**Signature:** `useManualRefHistory(initialValue: T, options: UseManualRefHistoryOptions = {}): UseManualRefHistoryReturn<T>`

#### Parameters

1. **`initialValue`** (`T`) - Starting `value` and the first committed snapshot in `history`.
2. **`options`** (optional `UseManualRefHistoryOptions`) - `capacity` caps how many committed snapshots are kept (oldest dropped). Default: `{}`.

#### Returns

Object with:

- `value` - The editable working state (not necessarily committed yet). (`T`).
- `set` - Updates `value` without recording a new history snapshot. (`(next: T) => void`).
- `commit` - Appends the current `value` as a new snapshot after `pointer` and trims by `capacity`. (`() => void`).
- `history` - Ordered list of committed snapshots (length bounded by `capacity`). (`T[]`).
- `pointer` - Index into `history` for the active committed snapshot. (`number`).
- `canUndo` - `true` when `pointer` can move backward. (`boolean`).
- `canRedo` - `true` when `pointer` can move forward. (`boolean`).
- `undo` - Moves `pointer` back and restores `value` from `history`. (`() => void`).
- `redo` - Moves `pointer` forward and restores `value` from `history`. (`() => void`).
- `clear` - Collapses history to only the current `value` and resets `pointer` to `0`. (`() => void`).

## Copy-paste hook

```tsx
import { useCallback, useState } from 'react'

export interface UseManualRefHistoryOptions {
  capacity?: number
}

export interface UseManualRefHistoryReturn<T> {
  value: T
  set: (next: T) => void
  commit: () => void
  history: T[]
  pointer: number
  canUndo: boolean
  canRedo: boolean
  undo: () => void
  redo: () => void
  clear: () => void
}

/**
 * State history that records snapshots only when commit is called.
 */
export default function useManualRefHistory<T>(
  initialValue: T,
  options: UseManualRefHistoryOptions = {},
): UseManualRefHistoryReturn<T> {
  const { capacity = 10 } = options
  const [value, setValue] = useState(initialValue)
  const [history, setHistory] = useState<T[]>([initialValue])
  const [pointer, setPointer] = useState(0)

  const commit = useCallback(() => {
    setHistory((prev) => {
      const base = prev.slice(0, pointer + 1)
      const nextHistory = [...base, value]
      const max = Math.max(1, capacity)
      const trimmed = nextHistory.length > max ? nextHistory.slice(nextHistory.length - max) : nextHistory
      setPointer(trimmed.length - 1)
      return trimmed
    })
  }, [capacity, pointer, value])

  const undo = useCallback(() => {
    setPointer((p) => {
      const next = Math.max(0, p - 1)
      setValue(history[next])
      return next
    })
  }, [history])

  const redo = useCallback(() => {
    setPointer((p) => {
      const next = Math.min(history.length - 1, p + 1)
      setValue(history[next])
      return next
    })
  }, [history])

  const clear = useCallback(() => {
    setHistory([value])
    setPointer(0)
  }, [value])

  return {
    value,
    set: setValue,
    commit,
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

export default function useManualRefHistory(initialValue, options = {}) {
  const { capacity = 10 } = options
  const [value, setValue] = useState(initialValue)
  const [history, setHistory] = useState([initialValue])
  const [pointer, setPointer] = useState(0)

  const commit = useCallback(() => {
    setHistory((prev) => {
      const base = prev.slice(0, pointer + 1)
      const nextHistory = [...base, value]
      const max = Math.max(1, capacity)
      const trimmed = nextHistory.length > max ? nextHistory.slice(nextHistory.length - max) : nextHistory
      setPointer(trimmed.length - 1)
      return trimmed
    })
  }, [capacity, pointer, value])

  const undo = useCallback(() => {
    setPointer((p) => {
      const next = Math.max(0, p - 1)
      setValue(history[next])
      return next
    })
  }, [history])

  const redo = useCallback(() => {
    setPointer((p) => {
      const next = Math.min(history.length - 1, p + 1)
      setValue(history[next])
      return next
    })
  }, [history])

  const clear = useCallback(() => {
    setHistory([value])
    setPointer(0)
  }, [value])

  return {
    value,
    set: setValue,
    commit,
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
