---
title: Watcher with temporary ignore
sidebar_label: useWatchIgnorable
category: Watch
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useWatchIgnorable.tsx'
description: >-
  useWatchIgnorable from @dedalik/use-react: batch updates without firing a watch.
---

# useWatchIgnorable()

<PackageData fn="useWatchIgnorable" />

Last updated: 24/04/2026

## Overview

`useWatchIgnorable` provides **`ignoreUpdates(fn)`**: call **`setState` / other** work inside **`fn`**, and the **next** **`value` change** that React surfaces from that update is **consumed** (one **ignore** token) **without** calling your **`callback`**; **`previousRef`** is still advanced to the new **value** so the stream stays in sync. Extra **`value`** changes in the same tick are controlled by the **single** `ignoreNextRef` counter. Use to avoid feedback loops: **watch** `text` to push to a server, but when the **server echo** comes back, **`ignoreUpdates`** the write so you do not **re-fetch**. Same **`deps`** pattern as the other **watch\*** helpers.

### What it accepts

1. **`value`**: `T`
2. **`callback`**: `(value: T, previous: T | undefined) => void`
3. Optional **`deps`**: `DependencyList`

### What it returns

- **`ignoreUpdates`**: `(fn: () => void) => void` - run **`fn`**, then skip the **next** effect-driven callback

## Usage

Mirror **`draft`** to **`text`** on each keystroke, but a **"Sync"** button calls **`setText` inside `ignoreUpdates`** so the echo does not append "synced" twice.

```tsx
import { useState } from 'react'
import useWatchIgnorable from '@dedalik/use-react/useWatchIgnorable'

function Example() {
  const [text, setText] = useState('hi')
  const [draft, setDraft] = useState('hi')
  const [lines, setLines] = useState<string[]>([])

  const { ignoreUpdates } = useWatchIgnorable(text, (t) => {
    setLines((L) => [...L.slice(-5), `watch: ${t}`])
  })

  return (
    <div>
      <p>
        <input
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value)
            setText(e.target.value)
          }}
        />
      </p>
      <button
        type='button'
        onClick={() => {
          ignoreUpdates(() => {
            setText('(server echo)')
            setDraft('(server echo)')
          })
        }}
      >
        Simulate server round-trip (ignore next watch)
      </button>
      <ul>
        {lines.map((l, i) => (
          <li key={i}>{l}</li>
        ))}
      </ul>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useWatchIgnorable`

**Signature:** `useWatchIgnorable<T>(value: T, callback: (value: T, previous: T | undefined) => void, deps?: DependencyList): WatchIgnorableControls`

#### Parameters

1. **`value`**
2. **`callback`**
3. **`deps`**

#### Returns

**`{ ignoreUpdates }`**

## Copy-paste hook

### TypeScript

```tsx
import { DependencyList, useCallback, useEffect, useRef } from 'react'

export interface WatchIgnorableControls {
  ignoreUpdates: (fn: () => void) => void
}

/**
 * Watcher that can temporarily ignore source updates.
 */
export default function useWatchIgnorable<T>(
  value: T,
  callback: (value: T, previous: T | undefined) => void,
  deps: DependencyList = [],
): WatchIgnorableControls {
  const previousRef = useRef<T | undefined>(undefined)
  const ignoreNextRef = useRef(0)

  const ignoreUpdates = useCallback((fn: () => void) => {
    ignoreNextRef.current += 1
    fn()
  }, [])

  useEffect(() => {
    if (ignoreNextRef.current > 0) {
      ignoreNextRef.current -= 1
      previousRef.current = value
      return
    }
    callback(value, previousRef.current)
    previousRef.current = value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, ...deps])

  return { ignoreUpdates }
}
```

### JavaScript

```js
import { useCallback, useEffect, useRef } from 'react'

/**
 * Watcher that can temporarily ignore source updates.
 */
export default function useWatchIgnorable(value, callback, deps = []) {
  const previousRef = useRef(undefined)
  const ignoreNextRef = useRef(0)

  const ignoreUpdates = useCallback((fn) => {
    ignoreNextRef.current += 1
    fn()
  }, [])

  useEffect(() => {
    if (ignoreNextRef.current > 0) {
      ignoreNextRef.current -= 1
      previousRef.current = value
      return
    }
    callback(value, previousRef.current)
    previousRef.current = value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, ...deps])

  return { ignoreUpdates }
}
```
