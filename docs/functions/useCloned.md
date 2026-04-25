---
title: Return a deep-cloned value
sidebar_label: useCloned
category: Utilities
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useCloned.tsx'
description: >-
  useCloned from @dedalik/use-react: memoized deep clone via structuredClone with JSON fallback.
---

# useCloned()

<PackageData fn="useCloned" />

Last updated: 24/04/2026

## Overview

`useCloned` **deep-clones** the **`value`** you pass in and **memoizes** that clone on **`[value]`** identity (referential equality only-**same object reference** returns the **cached** clone from the last time that reference was seen). It prefers **`globalThis.structuredClone`** when available; otherwise it falls back to **`JSON.parse(JSON.stringify(value))`**, which does **not** preserve **`Date`**, **`Map`**, **`undefined`**, or **circular** structures. Use it when you receive **props** or **context** objects you want to **mutate** locally (e.g. form **drafts**) without touching the **source** object, while avoiding a new clone on every render when the **parent** keeps the same **reference**.

### What it accepts

1. **`value`**: `T`

### What it returns

- **`T`** - a **new** deep copy when **`value`** changes by reference

## Usage

**Mutate** a **draft** object while the **source** instance (same **shape**) stays unchanged; **`tick`** only forces a re-render after in-place mutation.

```tsx
import { useMemo, useState } from 'react'
import useCloned from '@dedalik/use-react/useCloned'

function Example() {
  const source = useMemo(() => ({ label: 'Hello', n: 0 }), [])
  const draft = useCloned(source)
  const [, setTick] = useState(0)

  return (
    <div>
      <p>
        Source n: {source.n} - draft n: {draft.n}
      </p>
      <button
        type="button"
        onClick={() => {
          draft.n += 1
          setTick((t) => t + 1)
        }}
      >
        Increment draft only
      </button>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useCloned`

**Signature:** `useCloned<T>(value: T): T`

## Copy-paste hook

### TypeScript

```tsx
import { useMemo } from 'react'

function cloneValue<T>(value: T): T {
  if (typeof globalThis.structuredClone === 'function') {
    return globalThis.structuredClone(value)
  }

  // Fallback for environments without structuredClone support
  return JSON.parse(JSON.stringify(value)) as T
}

/**
 * Returns a memoized deep clone of the provided value.
 */
export default function useCloned<T>(value: T): T {
  return useMemo(() => cloneValue(value), [value])
}
```

### JavaScript

```js
import { useMemo } from 'react'

function cloneValue(value) {
  if (typeof globalThis.structuredClone === 'function') {
    return globalThis.structuredClone(value)
  }

  // Fallback for environments without structuredClone support
  return JSON.parse(JSON.stringify(value))
}

/**
 * Returns a memoized deep clone of the provided value.
 */
export default function useCloned(value) {
  return useMemo(() => cloneValue(value), [value])
}
```
