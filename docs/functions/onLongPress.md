---
title: Pointer long-press handlers
sidebar_label: onLongPress
category: Event
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/events/onLongPress.tsx'
description: >-
  onLongPress from @dedalik/use-react: mousedown/touch long press with delay, no React hook.
---

# onLongPress()

<PackageData fn="onLongPress" />

Last updated: 24/04/2026

## Overview

`onLongPress` is a **synchronous** **helper** (not a **hook**): it starts a **timer** on **pointer** **down** (**mouse** or **touch**) and **fires** your **callback** once the **`delay`** (default **500** ms) **elapses** without an **end** or **cancel**. **MouseUp**, **MouseLeave**, **TouchEnd** (and the **end** of the long-press by **firing** the **callback** which **clears** the **timer**) all **clear** a **pending** **timeout**-so a **short** **tap** does **not** **trigger** the **action**. The **return** is a **set** of **DO**M **event** **props** to **spread** onto a **pressable** **node**. It uses **no** **React** **state**; for **repeated** **long** **presses**, each **cycle** **reschedules** **fresh** **timers**. **Not** a **press**-**and**-**hold** **repeat**-**one** **callback** per **satisfied** **press**.

### What it accepts

1. **`callback`**: `() => void` - run **after** **delay** with **press** still **held** (or until then **cleared**)
2. **`delay`**: `number` (ms) - default **500**

### What it returns

- **Handlers** `{ onMouseDown, onMouseUp, onMouseLeave, onTouchStart, onTouchEnd }` to **spread** on a **host** **element**

## Usage

**800** ms long-press **arm**s a “**saved**” **message**; **brief** **clicks** do **not**.

```tsx
import { useState } from 'react'
import onLongPress from '@dedalik/use-react/events/onLongPress'

function Example() {
  const [msg, setMsg] = useState('hold the button')
  const lp = onLongPress(() => setMsg('long press saved!'), 800)

  return (
    <div>
      <p>{msg}</p>
      <button type="button" {...lp}>
        Press and hold
      </button>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `onLongPress`

**Signature:** `onLongPress(callback: () => void, delay?: number): OnLongPressHandlers`

## Copy-paste hook

### TypeScript

```ts
export interface OnLongPressHandlers {
  onMouseDown: () => void
  onMouseUp: () => void
  onMouseLeave: () => void
  onTouchStart: () => void
  onTouchEnd: () => void
}

/**
 * Returns pointer handlers that call callback after press duration.
 */
export default function onLongPress(callback: () => void, delay = 500): OnLongPressHandlers {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const start = () => {
    timeoutId = setTimeout(() => {
      callback()
      timeoutId = null
    }, delay)
  }

  const stop = () => {
    if (!timeoutId) return
    clearTimeout(timeoutId)
    timeoutId = null
  }

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  }
}
```

### JavaScript

```js
/**
 * Returns pointer handlers that call callback after press duration.
 */
export default function onLongPress(callback, delay = 500) {
  let timeoutId = null

  const start = () => {
    timeoutId = setTimeout(() => {
      callback()
      timeoutId = null
    }, delay)
  }

  const stop = () => {
    if (!timeoutId) return
    clearTimeout(timeoutId)
    timeoutId = null
  }

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  }
}
```
