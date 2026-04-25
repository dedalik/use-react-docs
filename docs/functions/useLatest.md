---
title: Store the latest value in a ref
sidebar_label: useLatest
category: State
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useLatest.tsx'
description: >-
  useLatest from @dedalik/use-react: Store the latest value in a ref.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useLatest()

<PackageData fn="useLatest" />
<HookLiveDemo demo="useLatest/basic" title="Live demo: useLatest" />

## Overview

`useLatest` keeps the newest value in a mutable ref (`React.MutableRefObject<T>`) and updates `ref.current` on every render. This is useful when you need a stable callback (for example, an interval, subscription, or event listener) that always reads the latest props/state without re-creating the callback or re-subscribing on every change.

### What it accepts

- `value: T`.

### What it returns

- A ref whose `current` always points at the latest `value`. Type `React.MutableRefObject<T>`.

## Usage

Real-world example: log the latest counter from a stable interval without restarting the timer when the count changes.

```tsx
import { useEffect, useState } from 'react'
import useLatest from '@dedalik/use-react/useLatest'

function Example() {
  const [count, setCount] = useState(0)
  const latestCountRef = useLatest(count)

  useEffect(() => {
    const id = window.setInterval(() => {
      // Always reads the newest count, even though this effect only runs once.
      console.log('latest count:', latestCountRef.current)
    }, 1000)

    return () => window.clearInterval(id)
  }, [])

  return (
    <div>
      <h3>Live Counter</h3>
      <p>Current: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <p>Open the console to see the interval log update as you click.</p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useLatest`

**Signature:** `useLatest(value: T)`

#### Parameters

1. **`value`** (`T`) - See type in signature.

#### Returns

A ref whose `current` always points at the latest `value`. (`React.MutableRefObject<T>`).

## Copy-paste hook

```tsx
import { useRef } from 'react'

export default function useLatest<T>(value: T) {
  const valueRef = useRef<T>(value)
  valueRef.current = value
  return valueRef
}
```

```js
import { useRef } from 'react'

export default function useLatest(value) {
  const valueRef = useRef(value)
  valueRef.current = value
  return valueRef
}
```
