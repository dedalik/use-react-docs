---
title: Subscribe to key events with a filter
sidebar_label: onKeyStroke
category: Event
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/events/onKeyStroke.tsx'
description: >-
  onKeyStroke from @dedalik/use-react: add keydown/keyup listener with key filter, cleanup fn.
---

# onKeyStroke()

<PackageData fn="onKeyStroke" />

Last updated: 24/04/2026

## Overview

`onKeyStroke` registers a **`keydown`** or **`keyup`** listener (default **`keydown`**) on **`window`**, a **`Document`**, or a specific **`HTMLElement`**. The **`key`** argument can be a **single** `event.key` string, an **array** of keys (OR), or **`null`** to **fire** the **handler** for **every** key. The **returned** function **unsubscribes**; on **non**-**browser** environments the **no**-**op** subscription returns a **no**-**op** cleanup. Use inside **`useEffect`** so **listeners** **tie** to **component** **lifetime**. The **handler** receives the full **`KeyboardEvent`**; use **`event.preventDefault()`** when you need to **block** **default** **browser** **actions**.

### What it accepts

1. **`key`**: `string | string[] | null` - which **`event.key`** values match, or all when **`null`**
2. **`handler`**: `(event: KeyboardEvent) => void`
3. **`options`**: `target?`, `event?` - `'keydown' | 'keyup'`, default **`keydown`**

### What it returns

- **Teardown** `() => void`

## Usage

Close a **panel** on **Escape**; listen on **`window`**, default **`keydown`**.

```tsx
import { useEffect, useState } from 'react'
import onKeyStroke from '@dedalik/use-react/events/onKeyStroke'

function Example() {
  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (!open) return
    return onKeyStroke(
      'Escape',
      (e) => {
        e.preventDefault()
        setOpen(false)
      },
      { target: window, event: 'keydown' },
    )
  }, [open])

  if (!open) {
    return (
      <button type='button' onClick={() => setOpen(true)}>
        Open again
      </button>
    )
  }

  return (
    <div>
      <p>Press Escape to close this hint.</p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `onKeyStroke`

**Signature:** `onKeyStroke(key: string | string[] | null, handler: (event: KeyboardEvent) => void, options?: OnKeyStrokeOptions): () => void`

## Copy-paste hook

### TypeScript

```ts
export interface OnKeyStrokeOptions {
  target?: Window | Document | HTMLElement
  event?: 'keydown' | 'keyup'
}

/**
 * Subscribes to keyboard events and invokes callback for matching keys.
 */
export default function onKeyStroke(
  key: string | string[] | null,
  handler: (event: KeyboardEvent) => void,
  options: OnKeyStrokeOptions = {},
): () => void {
  if (typeof window === 'undefined') return () => {}

  const target = options.target ?? window
  const type = options.event ?? 'keydown'
  const keys = key ? (Array.isArray(key) ? key : [key]) : null

  const listener = (event: KeyboardEvent) => {
    if (!keys || keys.includes(event.key)) {
      handler(event)
    }
  }

  target.addEventListener(type, listener as EventListener)
  return () => target.removeEventListener(type, listener as EventListener)
}
```

### JavaScript

```js
/**
 * Subscribes to keyboard events and invokes callback for matching keys.
 */
export default function onKeyStroke(key, handler, options = {}) {
  if (typeof window === 'undefined') return () => {}

  const target = options.target ?? window
  const type = options.event ?? 'keydown'
  const keys = key ? (Array.isArray(key) ? key : [key]) : null

  const listener = (event) => {
    if (!keys || keys.includes(event.key)) {
      handler(event)
    }
  }

  target.addEventListener(type, listener)
  return () => target.removeEventListener(type, listener)
}
```
