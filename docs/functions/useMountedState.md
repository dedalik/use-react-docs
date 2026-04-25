---
title: Check if component is mounted
sidebar_label: useMountedState
category: Lifecycle
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useMountedState.tsx'
description: >-
  useMountedState from @dedalik/use-react: Check if component is mounted.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useMountedState()

<PackageData fn="useMountedState" />

Last updated: 24/04/2026

## Overview

`useMountedState` returns a **stable function** that reads a ref: **`true`** after the first **client** `useEffect` runs (post-mount) and **`false`** after unmount. Use it to **guard** **`setState`** or DOM updates after **`async`** work-if the component unmounted while a Promise was pending, you can skip the update. The getter is **synchronous** and does not cause re-renders; it only reflects mount state at call time. On the **server**, the ref stays **`false`** because the effect never runs, so treat `isMounted()` as **false** during SSR. It does not replace **AbortController** for cancelling fetches; it only answers “is this tree still mounted?”

### What it accepts

- None.

### What it returns

- **`isMounted`**: `() => boolean` - **true** only after mount effect, **false** after unmount (and before mount on the server)

## Usage

After a **fake** delay, call **`setState`** only if **`isMounted()`** is still true.

```tsx
import { useCallback, useState } from 'react'
import useMountedState from '@dedalik/use-react/useMountedState'

function Example() {
  const isMounted = useMountedState()
  const [label, setLabel] = useState('idle')

  const load = useCallback(async () => {
    setLabel('loading…')
    await new Promise((r) => setTimeout(r, 1500))
    if (isMounted()) {
      setLabel('done (still mounted)')
    }
  }, [isMounted])

  return (
    <div>
      <p>Status: {label}</p>
      <p>
        <button type='button' onClick={load}>
          Start async
        </button>
      </p>
      <p>
        <small>Unmount this component before 1.5s to see that we avoid the final state update.</small>
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useMountedState`

**Signature:** `useMountedState(): () => boolean`

#### Parameters

None.

#### Returns

A **stable** no-arg function that returns the current mounted flag.

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useEffect, useRef } from 'react'

export default function useMountedState(): () => boolean {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  return useCallback(() => mountedRef.current, [])
}
```

### JavaScript

```js
import { useCallback, useEffect, useRef } from 'react'

export default function useMountedState() {
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  return useCallback(() => mountedRef.current, [])
}
```
