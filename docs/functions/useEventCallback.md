---
title: Keep callback identity stable
sidebar_label: useEventCallback
category: State
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useEventCallback.tsx'
description: >-
  useEventCallback from @dedalik/use-react: Keep callback identity stable.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useEventCallback()

<PackageData fn="useEventCallback" />

Last updated: 24/04/2026

## Overview

`useEventCallback` returns a **function whose reference is stable** across renders (empty **`useCallback`** deps) while always **invoking the latest** **`fn`**: each render overwrites **`fnRef.current`**, and the returned wrapper calls **`fnRef.current(...args)`**. That lets you pass a handler into **`useEffect` / `useMemo` / `memo`** dependency arrays **without** listing the inner `fn` and **without** stale closures when the wrapper is invoked later. It is the same “latest callback” pattern as the familiar **`useEvent`** / `useEventCallback` recipes. **Parameters** and **`this`** are forwarded to the current `fn` as a normal function call; there is no attempt to **bind** `this`.

### What it accepts

- **`fn`**: a function of any arity (`T extends AnyFunction`)

### What it returns

- The **same** callable `T` type-**identity-stable** for React’s referential dependencies

## Usage

Keep a child **`memo`’d**; pass a **stable** `onSave` that still reads fresh **`count`** (increment then save).

```tsx
import { memo, useState } from 'react'
import useEventCallback from '@dedalik/use-react/useEventCallback'

const Toolbar = memo(function Toolbar({ onSave }: { onSave: () => void }) {
  return (
    <button type='button' onClick={onSave}>
      Save snapshot
    </button>
  )
})

function Example() {
  const [count, setCount] = useState(0)
  const [log, setLog] = useState<string[]>([])

  const onSave = useEventCallback(() => {
    setLog((L) => [...L.slice(-5), `saved: count is ${count}`])
  })

  return (
    <div>
      <p>Count: {count}</p>
      <button type='button' onClick={() => setCount((c) => c + 1)}>
        +1
      </button>
      <Toolbar onSave={onSave} />
      <ul>
        {log.map((l, i) => (
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

### `useEventCallback`

**Signature:** `useEventCallback<T extends AnyFunction>(fn: T): T`

#### Parameters

1. **`fn`**

#### Returns

Stable wrapper with the same `T` signature; runs the most recently passed **`fn`**.

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useRef } from 'react'

type AnyFunction = (...args: any[]) => any

export default function useEventCallback<T extends AnyFunction>(fn: T): T {
  const fnRef = useRef(fn)
  fnRef.current = fn

  return useCallback((...args: Parameters<T>) => fnRef.current(...args), []) as T
}
```

### JavaScript

```js
import { useCallback, useRef } from 'react'

export default function useEventCallback(fn) {
  const fnRef = useRef(fn)
  fnRef.current = fn

  return useCallback((...args) => fnRef.current(...args), [])
}
```
