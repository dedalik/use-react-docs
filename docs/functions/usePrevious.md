---
title: Read the previous value
sidebar_label: usePrevious
category: State
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/usePrevious.tsx'
description: >-
  usePrevious from @dedalik/use-react: Read the previous value. TypeScript,
  tree-shakable import, examples, SSR notes.
---

# usePrevious()

<PackageData fn="usePrevious" />
<HookLiveDemo demo="usePrevious/basic" title="Live demo: usePrevious" />

## Overview

`usePrevious` keeps track of the value from the previous render and returns it on the current render. On the first render it returns `undefined`, then after each update it stores the latest value so you can compare "before vs after" states for UI transitions, change detection, analytics events, or conditional logic based on value direction.

### What it accepts

- `value: T`.

### What it returns

- Returns `T | undefined`.

## Usage

Real-world example: track price changes and highlight direction compared to the previous render.

```tsx
import { useState } from 'react'
import usePrevious from '@dedalik/use-react/usePrevious'

function Example() {
  const [price, setPrice] = useState(99)
  const previousPrice = usePrevious(price)
  const direction =
    previousPrice == null ? 'initial' : price > previousPrice ? 'up' : price < previousPrice ? 'down' : 'same'

  return (
    <div>
      <h3>Price Tracker</h3>
      <p>Current price: ${price}</p>
      <p>Previous price: {previousPrice == null ? '-' : `$${previousPrice}`}</p>
      <p>Direction: {direction}</p>

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => setPrice((p) => p + 5)}>Increase</button>
        <button onClick={() => setPrice((p) => Math.max(0, p - 5))}>Decrease</button>
      </div>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `usePrevious`

**Signature:** `usePrevious(value: T): T | undefined`

#### Parameters

1. **`value`** (`T`) - See type in signature.

#### Returns

Returns `T | undefined`.

## Copy-paste hook

```tsx
import { useEffect, useRef } from 'react'

/**
 * Returns the previous value from the last render cycle.
 */
export default function usePrevious<T>(value: T): T | undefined {
  const previousRef = useRef<T>()

  useEffect(() => {
    previousRef.current = value
  }, [value])

  return previousRef.current
}

export type UsePreviousType = ReturnType<typeof usePrevious>
```

```js
import { useEffect, useRef } from 'react'

export default function usePrevious(value) {
  const previousRef = useRef()

  useEffect(() => {
    previousRef.current = value
  }, [value])

  return previousRef.current
}
```
