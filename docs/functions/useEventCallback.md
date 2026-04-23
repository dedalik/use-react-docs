---
title: Keep callback identity stable
sidebar_label: useEventCallback
category: State
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useEventCallback'
description: >-
  useEventCallback from @dedalik/use-react: Keep callback identity stable.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useEventCallback()

<PackageData fn="useEventCallback" />

Last updated: 23/04/2026, 15:56

## Overview

`useEventCallback` returns a stable callback reference that always executes the latest callback logic.

This avoids stale closure bugs in event listeners, timers, and external integrations while keeping a stable function identity.

### What it accepts

- `fn`: callback function you want to keep up to date.

### What it returns

- A stable callback function with the same call signature as `fn`.

## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import { useState } from 'react'
import useEventCallback from '@dedalik/use-react/useEventCallback'

function StableHandlerExample() {
  const [count, setCount] = useState(0)
  const bump = useEventCallback(() => setCount((c) => c + 1))

  return (
    <button type='button' onClick={bump}>
      Stable handler clicks: {count}
    </button>
  )
}

export default function StableHandlerDemo() {
  return <StableHandlerExample />
}
```

## API Reference

### `useEventCallback`

**Signature:** `useEventCallback<T extends (...args: any[]) => any>(fn: T): T`

#### Parameters

1. **`fn`** - Callback whose latest implementation should always run (avoids stale closures).

#### Returns

A **stable** function reference with the same call signature as `fn`, always forwarding to the newest `fn`.

## Copy-paste hook

```tsx
import { useCallback, useRef } from 'react'

type AnyFunction = (...args: any[]) => any

export default function useEventCallback<T extends AnyFunction>(fn: T): T {
  const fnRef = useRef(fn)
  fnRef.current = fn

  return useCallback((...args: Parameters<T>) => fnRef.current(...args), []) as T
}
```

### JavaScript version

```js
import { useCallback, useRef } from 'react'

export default function useEventCallback(fn) {
  const fnRef = useRef(fn)
  fnRef.current = fn

  return useCallback((...args) => fnRef.current(...args), [])
}
```
