---
title: Watch a value only once
sidebar_label: useWatchOnce
category: Watch
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useWatchOnce.tsx'
description: >-
  useWatchOnce from @dedalik/use-react: fire a callback a single time from a watched value.
---

# useWatchOnce()

<PackageData fn="useWatchOnce" />

Last updated: 24/04/2026

## Overview

`useWatchOnce` arranges to call your **`callback(value)`** **at most once**: with **`{ immediate: true }`** (default is **false** in options), it can fire on the **first** effect run; with **`immediate: false`**, it waits until **`value`** **differs** from the value seen on the **first render** ( **`initialRef`** ), then fires and **never** runs again. After **`fired`**, further **`value`** changes are ignored. Optional **`deps`** are spread into the effect dependency list like the other watch helpers. Use for one-time reactions (e.g. “when user id first becomes **non-null**”).

### What it accepts

1. **`value`**: `T`
2. **`callback`**: `(value: T) => void`
3. Optional **`options`**: `{ immediate?: boolean }` - default **`{}`** (`immediate` **false**)
4. Optional **`deps`**: `DependencyList`

### What it returns

- **`void`**

## Usage

**`immediate: true`** - log the initial theme once; further toggles are ignored by **`useWatchOnce`**.

```tsx
import { useState } from 'react'
import useWatchOnce from '@dedalik/use-react/useWatchOnce'

function Example() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [seen, setSeen] = useState<string | null>(null)

  useWatchOnce(
    theme,
    (t) => {
      setSeen(`First theme observed: ${t}`)
    },
    { immediate: true },
  )

  return (
    <div>
      <p>{seen ?? '-'}</p>
      <p>
        <button type='button' onClick={() => setTheme((x) => (x === 'light' ? 'dark' : 'light'))}>
          Toggle (useWatchOnce will not re-log)
        </button>
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useWatchOnce`

**Signature:** `useWatchOnce<T>(value: T, callback: (value: T) => void, options?: WatchOnceOptions, deps?: DependencyList): void`

#### Parameters

1. **`value`**
2. **`callback`**
3. **`options`** - **`immediate`**
4. **`deps`**

#### Returns

`void`

## Copy-paste hook

### TypeScript

```tsx
import { DependencyList, useEffect, useRef } from 'react'

export interface WatchOnceOptions {
  immediate?: boolean
}

/**
 * Runs callback once, then ignores subsequent changes.
 */
export default function useWatchOnce<T>(
  value: T,
  callback: (value: T) => void,
  options: WatchOnceOptions = {},
  deps: DependencyList = [],
): void {
  const firedRef = useRef(false)
  const initialRef = useRef(value)

  useEffect(() => {
    if (firedRef.current) return

    const shouldFire = options.immediate ? true : value !== initialRef.current
    if (!shouldFire) return

    firedRef.current = true
    callback(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.immediate, value, ...deps])
}
```

### JavaScript

```js
import { useEffect, useRef } from 'react'

/**
 * Runs callback once, then ignores subsequent changes.
 */
export default function useWatchOnce(value, callback, options = {}, deps = []) {
  const firedRef = useRef(false)
  const initialRef = useRef(value)

  useEffect(() => {
    if (firedRef.current) return

    const shouldFire = options.immediate ? true : value !== initialRef.current
    if (!shouldFire) return

    firedRef.current = true
    callback(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.immediate, value, ...deps])
}
```
