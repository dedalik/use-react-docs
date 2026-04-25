---
title: Watch deep object changes
sidebar_label: useWatchDeep
category: Watch
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useWatchDeep.tsx'
description: >-
  useWatchDeep from @dedalik/use-react: trigger callback when deep serialized state changes.
---

# useWatchDeep()

<PackageData fn="useWatchDeep" />

Last updated: 24/04/2026

## Overview

`useWatchDeep` runs **`useEffect`** on **`[value, ...deps]`** and, inside, compares **`JSON.stringify(value)`** to the last serialized snapshot; when the string **changes**, it calls **`callback(value, previous)`** and updates refs. That makes it useful for **plain, JSON-like** data, but you must follow normal JSON rules (no **circular** structures, no **`Map`/`Set`**, stable key order expectations, **Date** and **undefined** behavior, etc.). **Important:** the effect only runs when React sees **`value`** (or **`deps`**) as changed-**mutate in place** without a new **reference** and the effect may **not** run, so use **immutable** updates to **`value`**, then the stringify diff picks up nested field changes.

### What it accepts

1. **`value`**: `T` - any JSON-serializable-friendly value (see caveats)
2. **`callback`**: `(value: T, previous: T | undefined) => void`
3. Optional **`deps`**: `DependencyList`

### What it returns

- **`void`**

## Usage

Immutable **settings** object: when **`count`** (nested) changes, **`setLog`** even if the parent creates **`{...settings}`** on each field change.

```tsx
import { useState } from 'react'
import useWatchDeep from '@dedalik/use-react/useWatchDeep'

type Settings = { count: number; name: string }

function Example() {
  const [settings, setSettings] = useState<Settings>({ count: 0, name: 'cal' })
  const [log, setLog] = useState('')

  useWatchDeep(settings, (s) => {
    setLog(`count=${s.count} name=${s.name}`)
  })

  return (
    <div>
      <p>current: {log || '-'}</p>
      <button type='button' onClick={() => setSettings((p) => ({ ...p, count: p.count + 1 }))}>
        +1
      </button>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useWatchDeep`

**Signature:** `useWatchDeep<T>(value: T, callback: (value: T, previous: T | undefined) => void, deps?: DependencyList): void`

#### Parameters

1. **`value`**
2. **`callback`**
3. **`deps`**

#### Returns

`void`

**Caveat:** The effect re-runs when **`value` reference** or **`deps`** change. Use **immutable** updates to **`value`** so nested changes schedule the effect; **`JSON.stringify`** is used only to detect **content** change relative to the **last** run. Values must be **JSON-serializable** and not **circular**.

## Copy-paste hook

### TypeScript

```tsx
import { DependencyList, useEffect, useRef } from 'react'

/**
 * Watches deep changes using serialized value snapshots.
 */
export default function useWatchDeep<T>(
  value: T,
  callback: (value: T, previous: T | undefined) => void,
  deps: DependencyList = [],
): void {
  const previousRef = useRef<T | undefined>(undefined)
  const previousSerializedRef = useRef<string>('')

  useEffect(() => {
    const serialized = JSON.stringify(value)
    if (serialized !== previousSerializedRef.current) {
      callback(value, previousRef.current)
      previousRef.current = value
      previousSerializedRef.current = serialized
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, ...deps])
}
```

### JavaScript

```js
import { useEffect, useRef } from 'react'

/**
 * Watches deep changes using serialized value snapshots.
 */
export default function useWatchDeep(value, callback, deps = []) {
  const previousRef = useRef(undefined)
  const previousSerializedRef = useRef('')

  useEffect(() => {
    const serialized = JSON.stringify(value)
    if (serialized !== previousSerializedRef.current) {
      callback(value, previousRef.current)
      previousRef.current = value
      previousSerializedRef.current = serialized
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, ...deps])
}
```
