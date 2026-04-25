---
title: Numeric counter with helpers
sidebar_label: useCounter
category: State
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useCounter.tsx'
description: >-
  useCounter from @dedalik/use-react: count state with inc/dec/set/reset and
  optional min/max clamping.
---

# useCounter()

<PackageData fn="useCounter" />
<HookLiveDemo demo="useCounter/basic" title="Live demo: useCounter" />

## Overview

`useCounter` stores a numeric state and gives you ready-to-use actions to increment, decrement, set, and reset it. It can also enforce optional `min`/`max` bounds, so every update is clamped automatically, which makes it practical for quantity pickers, pagination controls, and any UI where the value must stay within a safe range.

### What it accepts

- `initialValue = 0`.
- `options: UseCounterOptions = {}`.

### What it returns

- `count`: Numeric measurement or counter. Type `number`.
- `inc`: Callable helper returned by the hook. Type `(step?: number) => void`.
- `dec`: Callable helper returned by the hook. Type `(step?: number) => void`.
- `set`: Updates `value` directly. Type `(value: number) => void`.
- `reset`: Callable helper returned by the hook. Type `() => void`.

## Usage

Real-world example: a quantity picker with custom step controls and min/max limits.

```tsx
import useCounter from '@dedalik/use-react/useCounter'

function Example() {
  const { count, inc, dec, set, reset } = useCounter(2, { min: 1, max: 10 })

  return (
    <div>
      <h3>Quantity</h3>
      <p>Selected: {count}</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={() => dec()}>-1</button>
        <button onClick={() => inc()}>+1</button>
        <button onClick={() => dec(2)}>-2</button>
        <button onClick={() => inc(2)}>+2</button>
        <button onClick={() => set(5)}>Set to 5</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useCounter`

**Signature:** `useCounter(initialValue = 0, options: UseCounterOptions = {}): UseCounterReturn`

#### Parameters

1. **Parameter** - `initialValue`.
2. **`options`** (optional `UseCounterOptions`) - See type in signature. Default: `{}`.

#### Returns

Object with:

- `count` - Numeric measurement or counter. (`number`).
- `inc` - Callable helper returned by the hook. (`(step?: number) => void`).
- `dec` - Callable helper returned by the hook. (`(step?: number) => void`).
- `set` - Updates `value` directly. (`(value: number) => void`).
- `reset` - Callable helper returned by the hook. (`() => void`).

## Copy-paste hook

```tsx
import { useCallback, useState } from 'react'

export interface UseCounterOptions {
  min?: number
  max?: number
}

export interface UseCounterReturn {
  count: number
  inc: (step?: number) => void
  dec: (step?: number) => void
  set: (value: number) => void
  reset: () => void
}

function clamp(value: number, min?: number, max?: number): number {
  let next = value
  if (typeof min === 'number') next = Math.max(min, next)
  if (typeof max === 'number') next = Math.min(max, next)
  return next
}

export default function useCounter(initialValue = 0, options: UseCounterOptions = {}): UseCounterReturn {
  const { min, max } = options
  const initial = clamp(initialValue, min, max)
  const [count, setCount] = useState(initial)

  const set = useCallback(
    (value: number) => {
      setCount(clamp(value, min, max))
    },
    [min, max],
  )

  const inc = useCallback(
    (step = 1) => {
      setCount((c) => clamp(c + step, min, max))
    },
    [min, max],
  )

  const dec = useCallback(
    (step = 1) => {
      setCount((c) => clamp(c - step, min, max))
    },
    [min, max],
  )

  const reset = useCallback(() => {
    setCount(initial)
  }, [initial])

  return { count, inc, dec, set, reset }
}
```

```js
import { useCallback, useState } from 'react'

function clamp(value, min, max) {
  let next = value
  if (typeof min === 'number') next = Math.max(min, next)
  if (typeof max === 'number') next = Math.min(max, next)
  return next
}

export default function useCounter(initialValue = 0, options = {}) {
  const { min, max } = options
  const initial = clamp(initialValue, min, max)
  const [count, setCount] = useState(initial)

  const set = useCallback(
    (value) => {
      setCount(clamp(value, min, max))
    },
    [min, max],
  )

  const inc = useCallback(
    (step = 1) => {
      setCount((c) => clamp(c + step, min, max))
    },
    [min, max],
  )

  const dec = useCallback(
    (step = 1) => {
      setCount((c) => clamp(c - step, min, max))
    },
    [min, max],
  )

  const reset = useCallback(() => {
    setCount(initial)
  }, [initial])

  return { count, inc, dec, set, reset }
}
```
