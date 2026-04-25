---
title: Schedule state updates with requestAnimationFrame
sidebar_label: useRafState
category: Performance
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useRafState.tsx'
description: >-
  useRafState from @dedalik/use-react: Schedule state updates with
  requestAnimationFrame. TypeScript, tree-shakable import, examples, SSR notes.
---

# useRafState()

<PackageData fn="useRafState" />

Last updated: 24/04/2026

## Overview

`useRafState` is **`useState`**-shaped, but the setter defers the actual **`setState`** to the next **animation frame**: every call **cancels** a previously scheduled frame, then **`requestAnimationFrame`**, and only the latest value wins if you trigger many updates in one screen paint (for example, pointer move). It follows **`SetStateAction`** (value or updater function). In **SSR** (no `window`) it **falls back to synchronous** **`setState`**, so there is no extra delay on the server. Use it to coalesce high‑frequency visual updates; do not use it for logic that must commit immediately every time.

### What it accepts

- **`initialState`**: `T`

### What it returns

- A tuple **`[state, setRafState]`** with the same `T` and **`SetStateAction`** semantics as React’s **`useState`**, except updates are applied after **rAF**.

## Usage

Track pointer position; rapid **`mousemove`** updates are merged to one state commit per frame.

```tsx
import { useRef } from 'react'
import useRafState from '@dedalik/use-react/useRafState'

function Example() {
  const [pos, setRafState] = useRafState({ x: 0, y: 0 })
  const onMove = (e: React.MouseEvent) => {
    setRafState({ x: e.clientX, y: e.clientY })
  }
  return (
    <div onMouseMove={onMove} style={{ minHeight: 200, border: '1px solid #ccc' }}>
      <p>
        client: <strong>{pos.x}</strong> × <strong>{pos.y}</strong>
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useRafState`

**Signature:** `useRafState<T>(initialState: T): [T, SetRafState<T>]`

#### Parameters

1. **`initialState`**

#### Returns

**`[state, setRafState]`**

## Copy-paste hook

### TypeScript

```tsx
import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react'

type SetRafState<T> = Dispatch<SetStateAction<T>>

export default function useRafState<T>(initialState: T): [T, SetRafState<T>] {
  const frameRef = useRef<number>()
  const [state, setState] = useState(initialState)

  const setRafState: SetRafState<T> = useCallback((value) => {
    if (typeof window === 'undefined') {
      setState(value)
      return
    }

    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current)
    }

    frameRef.current = window.requestAnimationFrame(() => {
      setState(value)
    })
  }, [])

  return [state, setRafState]
}
```

### JavaScript

```js
import { useCallback, useRef, useState } from 'react'

export default function useRafState(initialState) {
  const frameRef = useRef()
  const [state, setState] = useState(initialState)

  const setRafState = useCallback((value) => {
    if (typeof window === 'undefined') {
      setState(value)
      return
    }

    if (frameRef.current) {
      window.cancelAnimationFrame(frameRef.current)
    }

    frameRef.current = window.requestAnimationFrame(() => {
      setState(value)
    })
  }, [])

  return [state, setRafState]
}
```
