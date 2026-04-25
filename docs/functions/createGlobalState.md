---
title: Shared global useSyncExternalStore state
sidebar_label: createGlobalState
category: Utilities
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/createGlobalState.tsx'
description: >-
  createGlobalState from @dedalik/use-react: module-level state + setState, hook per call site.
---

# createGlobalState()

<PackageData fn="createGlobalState" />

Last updated: 24/04/2026

## Overview

`createGlobalState` builds a **module-scoped** store: **initial** value (or **lazy** `() => T`) is held in a **closure** variable, and **`setState(next)`** applies either a **value** or an **updater** `(prev) => next` and **notifies** all **listeners** (a **`Set` of** `() => void`). The returned function **`useGlobalState`** is a real **React hook** implemented with **`useSyncExternalStore`**: every component that calls it **re-renders** on **setState**, and reads are **tearing-safe** in concurrent React. **One** `createGlobalState` **instance** = **one** shared **atom**; create **separate** factories for **independent** globals. There is **no** `Provider`; state is **not** in **context**-it is **process-wide** (for that module **bundle**). For **hydration** the **server** snapshot matches **initial** until the first **client** **update**.

### What it accepts

1. **`initialState`**: `T` or `() => T`

### What it returns

- A hook **`() => [T, setState]`** where **`setState`** updates the shared store (same type as `useState`’s **setter** shape, but **synchronous** notification)

## Usage

Two **buttons** in different **branches** share a **count**; **`setCount`** is the **second** array element (functional updates supported).

```tsx
import createGlobalState from '@dedalik/use-react/createGlobalState'

const useCount = createGlobalState(0)

function Plus() {
  const [, setCount] = useCount()
  return (
    <button type="button" onClick={() => setCount((n) => n + 1)}>
      +1
    </button>
  )
}

function Display() {
  const [count] = useCount()
  return <p>Shared count: {count}</p>
}

function Example() {
  return (
    <div>
      <Display />
      <Plus />
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `createGlobalState`

**Signature:** `createGlobalState<T>(initialState: T | (() => T)): () => readonly [T, (next: T | ((prev: T) => T)) => void]`

## Copy-paste hook

### TypeScript

```tsx
import { useSyncExternalStore } from 'react'

/**
 * Creates a shared global state hook.
 */
export default function createGlobalState<T>(initialState: T | (() => T)) {
  let state = typeof initialState === 'function' ? (initialState as () => T)() : initialState
  const listeners = new Set<() => void>()

  const getSnapshot = () => state
  const subscribe = (listener: () => void) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  const setState = (next: T | ((prev: T) => T)) => {
    state = typeof next === 'function' ? (next as (prev: T) => T)(state) : next
    listeners.forEach((listener) => listener())
  }

  return function useGlobalState() {
    const value = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
    return [value, setState] as const
  }
}
```

### JavaScript

```js
import { useSyncExternalStore } from 'react'

/**
 * Creates a shared global state hook.
 */
export default function createGlobalState(initialState) {
  let state = typeof initialState === 'function' ? initialState() : initialState
  const listeners = new Set()

  const getSnapshot = () => state
  const subscribe = (listener) => {
    listeners.add(listener)
    return () => listeners.delete(listener)
  }

  const setState = (next) => {
    state = typeof next === 'function' ? next(state) : next
    listeners.forEach((listener) => listener())
  }

  return function useGlobalState() {
    const value = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
    return [value, setState]
  }
}
```
