---
title: Run logic when component mounts
sidebar_label: useOnMount
category: State
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useOnMount.tsx'
description: >-
  useOnMount from @dedalik/use-react: Run logic when component mounts.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useOnMount()

<PackageData fn="useOnMount" />

Last updated: 24/04/2026

## Overview

`useOnMount` runs your **`fn`** inside a **`useEffect`** on the **client** after paint. The effect’s dependency array is **`[fn]`**, so the body runs **on mount** and **again whenever `fn`’s identity changes**-it is **not** a “run once ever” helper if you pass a new inline function every render. For one-time work, pass a **stable** reference (**`useCallback`** or a **module-level** function). If **`fn`** is not a function, nothing runs. There is **no cleanup** return from your callback; this hook is only for fire-and-forget side effects. **Strict Mode** in development may **double-invoke** effects, so account for that in logging or idempotent setup.

### What it accepts

- **`fn`**: `() => void`

### What it returns

- **`void`** (side effect only)

## Usage

Log once on mount by **stabilizing** the callback with **`useCallback`**.

```tsx
import { useCallback, useState } from 'react'
import useOnMount from '@dedalik/use-react/useOnMount'

function Example() {
  const [clicks, setClicks] = useState(0)

  useOnMount(
    useCallback(() => {
      // Runs when this effect first commits; `fn` identity is stable.
      document.title = 'Mounted demo'
    }, []),
  )

  return (
    <div>
      <p>Title was set on mount (see tab).</p>
      <button type='button' onClick={() => setClicks((c) => c + 1)}>
        Clicks: {clicks}
      </button>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useOnMount`

**Signature:** `useOnMount(fn: () => void): void`

#### Parameters

1. **`fn`** - Invoked when the effect runs (see **`[fn]`** dependency note above).

#### Returns

`void`

## Copy-paste hook

### TypeScript

```tsx
import { useEffect } from 'react'

type Fn = () => void

export default function useOnMount(fn: Fn): void {
  useEffect(() => {
    if (typeof fn === 'function') {
      fn()
    }
  }, [fn])
}
```

### JavaScript

```js
import { useEffect } from 'react'

export default function useOnMount(fn) {
  useEffect(() => {
    if (typeof fn === 'function') {
      fn()
    }
  }, [fn])
}
```
