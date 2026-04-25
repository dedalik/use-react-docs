---
title: Watch a value with a run limit
sidebar_label: useWatchAtMost
category: Watch
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useWatchAtMost.tsx'
description: >-
  useWatchAtMost from @dedalik/use-react: only handle the first N value updates.
---

# useWatchAtMost()

<PackageData fn="useWatchAtMost" />

Last updated: 24/04/2026

## Overview

`useWatchAtMost` invokes **`callback(value, previous)`** each time the effect runs, but **stops** after **`limit`** invocations ( **`countRef`** tracks how many times the callback was allowed to run; **`limit` ≤ 0** means **zero** callback runs from the first check onward). Unlike **`useWatchOnce`**, a new **`value` / deps** change after the last allowed run is simply **skipped**-it does not reset the counter. **`previous`** tracks the value from the last **successful** callback, same as other watch helpers. Useful for "log the first N updates" or sampling early transitions.

### What it accepts

1. **`value`**: `T`
2. **`callback`**: `(value: T, previous: T | undefined) => void`
3. **`limit`**: `number` - max number of **callback** executions
4. Optional **`deps`**: `DependencyList`

### What it returns

- **`void`**

## Usage

Count changes to **`x`** with **`limit: 3`**; after three callbacks, further clicks do not append to the log.

```tsx
import { useState } from 'react'
import useWatchAtMost from '@dedalik/use-react/useWatchAtMost'

function Example() {
  const [x, setX] = useState(0)
  const [log, setLog] = useState<string[]>([])

  useWatchAtMost(
    x,
    (v, prev) => {
      setLog((lines) => [...lines, `value=${v}, previous=${prev === undefined ? '∅' : String(prev)}`])
    },
    3,
  )

  return (
    <div>
      <p>x = {x}</p>
      <button type='button' onClick={() => setX((n) => n + 1)}>
        bump
      </button>
      <ol>
        {log.map((line, i) => (
          <li key={i}>{line}</li>
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

### `useWatchAtMost`

**Signature:** `useWatchAtMost<T>(value: T, callback: (value: T, previous: T | undefined) => void, limit: number, deps?: DependencyList): void`

#### Parameters

1. **`value`**
2. **`callback`**
3. **`limit`**
4. **`deps`**

#### Returns

`void`

## Copy-paste hook

### TypeScript

```tsx
import { DependencyList, useEffect, useRef } from 'react'

/**
 * Runs callback for value changes up to a fixed limit.
 */
export default function useWatchAtMost<T>(
  value: T,
  callback: (value: T, previous: T | undefined) => void,
  limit: number,
  deps: DependencyList = [],
): void {
  const previousRef = useRef<T | undefined>(undefined)
  const countRef = useRef(0)

  useEffect(() => {
    if (countRef.current >= Math.max(0, limit)) return

    callback(value, previousRef.current)
    previousRef.current = value
    countRef.current += 1
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, limit, ...deps])
}
```

### JavaScript

```js
import { useEffect, useRef } from 'react'

/**
 * Runs callback for value changes up to a fixed limit.
 */
export default function useWatchAtMost(value, callback, limit, deps = []) {
  const previousRef = useRef(undefined)
  const countRef = useRef(0)

  useEffect(() => {
    if (countRef.current >= Math.max(0, limit)) return

    callback(value, previousRef.current)
    previousRef.current = value
    countRef.current += 1
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, limit, ...deps])
}
```
