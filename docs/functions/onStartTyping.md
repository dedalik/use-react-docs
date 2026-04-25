---
title: After idle, detect next printable keystroke
sidebar_label: onStartTyping
category: Event
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/onStartTyping.tsx'
description: >-
  onStartTyping from @dedalik/use-react: first printable key after idle, keydown on target.
---

# onStartTyping()

<PackageData fn="onStartTyping" />

Last updated: 24/04/2026

## Overview

`onStartTyping` listens to **`keydown`** on **`window`** (or a **`target`** **node**) and only cares about **“printable”** **keys**-those where **`event.key.length === 1`** (letters, **digits**, **punctuation** from a typical **US** layout; **not** **Enter**, **arrows**, **F**-**keys**). The **first** such **key** after an **idle** **period** invokes your **callback** and flips an **internal** `isTyping` **flag** **true**; every **further** **stroke** in the **session** only **resets** a **timer**-no **repeat** **callback**-until the **timer** **fires** (after **`timeout`** ms, default **1000** **ms**) and **resets** **idle** so the **next** “**burst**’s” **first** key **triggers** again. Use for **kiosk**-style “**any** **key** to **start**” or **nudging** a **user** on **inactivity** **re**-**entry** into a **form**. **SSR** returns a **no**-**op** **cleanup** **immediately**.

### What it accepts

1. **`callback`**: `(event: KeyboardEvent) => void` - only on the **first** key of a new **session**
2. **`options`**: `target?`, `timeout?` (idle **reset**, default **1000** **ms**)

### What it returns

- **Teardown** `() => void`

## Usage

**First** **letter** after **600** ms of **not** using **this** field **announces** the key (listen on **`window`**, like **default** **options**).

```tsx
import { useEffect, useState } from 'react'
import onStartTyping from '@dedalik/use-react/onStartTyping'

function Example() {
  const [first, setFirst] = useState('(type anywhere in the window)')

  useEffect(() => {
    return onStartTyping(
      (e) => {
        setFirst(e.key)
      },
      { target: window, timeout: 600 },
    )
  }, [])

  return <p>First key after pause: {first}</p>
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `onStartTyping`

**Signature:** `onStartTyping(callback: (event: KeyboardEvent) => void, options?: OnStartTypingOptions): () => void`

## Copy-paste hook

### TypeScript

```ts
export interface OnStartTypingOptions {
  target?: Window | Document | HTMLElement
  timeout?: number
}

/**
 * Calls callback when user starts typing after idle pause.
 */
export default function onStartTyping(
  callback: (event: KeyboardEvent) => void,
  options: OnStartTypingOptions = {},
): () => void {
  if (typeof window === 'undefined') return () => {}

  const target = options.target ?? window
  const timeout = options.timeout ?? 1000
  let isTyping = false
  let timerId: ReturnType<typeof setTimeout> | null = null

  const reset = () => {
    if (timerId) clearTimeout(timerId)
    timerId = setTimeout(() => {
      isTyping = false
      timerId = null
    }, timeout)
  }

  const listener = (event: KeyboardEvent) => {
    const hasPrintableKey = event.key.length === 1
    if (!hasPrintableKey) return

    if (!isTyping) {
      callback(event)
      isTyping = true
    }

    reset()
  }

  target.addEventListener('keydown', listener as EventListener)

  return () => {
    if (timerId) clearTimeout(timerId)
    target.removeEventListener('keydown', listener as EventListener)
  }
}
```

### JavaScript

```js
/**
 * Calls callback when user starts typing after idle pause.
 */
export default function onStartTyping(callback, options = {}) {
  if (typeof window === 'undefined') return () => {}

  const target = options.target ?? window
  const timeout = options.timeout ?? 1000
  let isTyping = false
  let timerId = null

  const reset = () => {
    if (timerId) clearTimeout(timerId)
    timerId = setTimeout(() => {
      isTyping = false
      timerId = null
    }, timeout)
  }

  const listener = (event) => {
    const hasPrintableKey = event.key.length === 1
    if (!hasPrintableKey) return

    if (!isTyping) {
      callback(event)
      isTyping = true
    }

    reset()
  }

  target.addEventListener('keydown', listener)

  return () => {
    if (timerId) clearTimeout(timerId)
    target.removeEventListener('keydown', listener)
  }
}
```
