---
title: Run a callback on an interval
sidebar_label: useInterval
category: Async
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useInterval'
description: >-
  useInterval from @dedalik/use-react: Run a callback on an interval.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useInterval()

<PackageData fn="useInterval" />

Last updated: 23/04/2026, 15:56

## Overview

`useInterval` runs a callback repeatedly at a fixed interval.

It avoids stale callback issues and keeps interval setup/cleanup safe inside React lifecycle.

### What it accepts

- `callback`: function to execute.
- `delay`: milliseconds between runs (`null` disables interval).

### What it returns

- This hook returns nothing.

## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import { useState } from 'react'
import useInterval from '@dedalik/use-react/useInterval'

function TickExample() {
  const [count, setCount] = useState(0)

  useInterval(() => setCount((c) => c + 1), 1000)

  return <p>Ticks: {count}</p>
}

export default function TickDemo() {
  return <TickExample />
}
```

## API Reference

### `useInterval`

**Signature:** `useInterval(callback: () => void, delay: number | null): void`

#### Parameters

1. **`callback`** - Function invoked on each tick.
2. **`delay`** - Interval in ms, or `null` to disable the interval.

#### Returns

Nothing (`void`).

## Copy-paste hook

```tsx
import { useEffect, useRef } from 'react'

export default function useInterval(callback: () => void, delay: number | null) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (delay == null) return

    const intervalId = globalThis.setInterval(() => {
      callbackRef.current()
    }, delay)

    return () => globalThis.clearInterval(intervalId)
  }, [delay])
}
```

### JavaScript version

```js
import { useEffect, useRef } from 'react'

export default function useInterval(callback, delay) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (delay == null) return

    const intervalId = globalThis.setInterval(() => {
      callbackRef.current()
    }, delay)
    return () => globalThis.clearInterval(intervalId)
  }, [delay])
}
```
