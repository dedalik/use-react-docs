---
title: Declarative setTimeout
sidebar_label: useTimeout
category: Time
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useTimeout.tsx'
description: >-
  useTimeout from @dedalik/use-react: schedule a callback with automatic cleanup.
---

# useTimeout()

<PackageData fn="useTimeout" />

Last updated: 24/04/2026

## Overview

`useTimeout` registers **`setTimeout(() => callbackRef.current(), delay)`** in an effect. The **latest** `callback` is always kept in a ref (first effect), so the scheduled timeout does not need a **stale** closure, but the **call** on fire uses whatever `callback` was on last render. **`delay` is a dependency of the second effect: each change clears the old timer and starts a new one. If **`delay` is `null`**, the hook **skips** scheduling (useful to **pause**). The cleanup clears the ID on unmount or before rescheduling. It does not track **loading** or **return** a **cancel** handle-`null` the delay in parent state to cancel. Uses **`globalThis.setTimeout`\*\*.

### What it accepts

1. **`callback`**: `() => void`
2. **`delay`**: `number | null` - when **`null`**, no timer runs

## Usage

After **1.2 s** show a **“Ready”** message once; a **“Cancel”** button sets **`delay`** to **`null`**.

```tsx
import { useState } from 'react'
import useTimeout from '@dedalik/use-react/useTimeout'

function Example() {
  const [delay, setDelay] = useState<number | null>(1200)
  const [message, setMessage] = useState('Waiting…')

  useTimeout(() => {
    setMessage('Ready')
  }, delay)

  return (
    <div>
      <p>{message}</p>
      {delay != null && (
        <button type='button' onClick={() => setDelay(null)}>
          Cancel timer
        </button>
      )}
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useTimeout`

**Signature:** `useTimeout(callback: () => void, delay: number | null): void`

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useRef } from 'react'

export default function useTimeout(callback: () => void, delay: number | null) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (delay == null) return

    const timeoutId = globalThis.setTimeout(() => {
      callbackRef.current()
    }, delay)

    return () => globalThis.clearTimeout(timeoutId)
  }, [delay])
}
```

### JavaScript

```js
import { useEffect, useRef } from 'react'

export default function useTimeout(callback, delay) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (delay == null) return

    const timeoutId = globalThis.setTimeout(() => {
      callbackRef.current()
    }, delay)

    return () => globalThis.clearTimeout(timeoutId)
  }, [delay])
}
```
