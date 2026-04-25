---
title: React to truthy transitions
sidebar_label: useWhenever
category: Watch
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useWhenever.tsx'
description: >-
  useWhenever from @dedalik/use-react: call side effects when a condition flips to true.
---

# useWhenever()

<PackageData fn="useWhenever" />

Last updated: 24/04/2026

## Overview

`useWhenever` fires **`callback()`** only on the **transition** from **falsy → truthy** for **`condition`**: on each run it compares **`condition`** to the value stored in **`previousRef`**. It does **not** run when `condition` stays `true` across renders, and it does not run on **true → false**. An optional extra **`deps`** list is **spread** into the effect (after **`condition`**), so unrelated keys can re-run the check. For “run while `true` every time” use a different pattern (e.g. `useWatchImmediate` on a boolean or `useEffect` on `[condition]`).

### What it accepts

1. **`condition`**: `boolean`
2. **`callback`**: `() => void`
3. Optional **`deps`**: `DependencyList`

### What it returns

- **`void`**

## Usage

When **`on`** first becomes **true**, append a one-line message; toggling off/on fires again on the next **false → true**.

```tsx
import { useState } from 'react'
import useWhenever from '@dedalik/use-react/useWhenever'

function Example() {
  const [on, setOn] = useState(false)
  const [log, setLog] = useState<string[]>([])

  useWhenever(on, () => {
    setLog((d) => [...d, 'Condition became true at ' + new Date().toLocaleTimeString()])
  })

  return (
    <div>
      <p>
        <label>
          <input type='checkbox' checked={on} onChange={(e) => setOn(e.target.checked)} /> Online
        </label>
      </p>
      <ol>
        {log.map((l, i) => (
          <li key={i}>{l}</li>
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

### `useWhenever`

**Signature:** `useWhenever(condition: boolean, callback: () => void, deps?: DependencyList): void`  
(Package import: `import useWhenever from '@dedalik/use-react/useWhenever'`.)

#### Parameters

1. **`condition`**
2. **`callback`**
3. **`deps`**

#### Returns

`void`

## Copy-paste hook

### TypeScript

```tsx
import { DependencyList, useEffect, useRef } from 'react'

/**
 * Runs callback when condition turns true.
 */
export default function useWhenever(condition: boolean, callback: () => void, deps: DependencyList = []): void {
  const previousRef = useRef(condition)

  useEffect(() => {
    if (condition && !previousRef.current) callback()
    previousRef.current = condition
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condition, ...deps])
}
```

### JavaScript

```js
import { useEffect, useRef } from 'react'

/**
 * Runs callback when condition turns true.
 */
export default function useWhenever(condition, callback, deps = []) {
  const previousRef = useRef(condition)

  useEffect(() => {
    if (condition && !previousRef.current) callback()
    previousRef.current = condition
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condition, ...deps])
}
```
