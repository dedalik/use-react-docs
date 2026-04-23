---
title: Attach and clean up event listeners
sidebar_label: useEventListener
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useEventListener'
description: >-
  useEventListener from @dedalik/use-react: Attach and clean up event listeners.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useEventListener()

<PackageData fn="useEventListener" />

Last updated: 23/04/2026, 15:56

## Overview

`useEventListener` attaches an event listener to `window`, `document`, an element, or another supported target.

This hook simplifies setup and cleanup logic so beginners can avoid memory leaks and duplicate listener code.

### What it accepts

- `eventName`: event to listen for.
- `listener`: event handler.
- `target` (optional): event target or ref.

### What it returns

- This hook returns nothing. It manages subscription lifecycle internally.

## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import { useState } from 'react'
import useEventListener from '@dedalik/use-react/useEventListener'

function KeyCounterExample() {
  const [count, setCount] = useState(0)

  useEventListener('keydown', () => {
    setCount((c) => c + 1)
  })

  return <p>Keydown count: {count} (press any key)</p>
}

export default function KeyCounterDemo() {
  return <KeyCounterExample />
}
```

## API Reference

### `useEventListener`

**Signature:** `useEventListener(eventName, listener, target?)`

#### Parameters

1. **`eventName`** - DOM event name (typed against `WindowEventMap` when targeting `window`).
2. **`listener`** - Handler invoked when the event fires.
3. **`target`** (optional) - `Window`, `Document`, `HTMLElement`, `MediaQueryList`, or a ref to one of these. Defaults to `window` in the browser.

#### Returns

Nothing (`void`). Subscribes on mount/update and unsubscribes on cleanup.

## Copy-paste hook

```tsx
import { RefObject, useEffect, useRef } from 'react'

type Target = Window | Document | HTMLElement | MediaQueryList | null

export default function useEventListener<KW extends keyof WindowEventMap>(
  eventName: KW,
  listener: (event: WindowEventMap[KW]) => void,
  target?: Target | RefObject<Target>,
) {
  const savedListener = useRef(listener)

  useEffect(() => {
    savedListener.current = listener
  }, [listener])

  useEffect(() => {
    const targetValue =
      target && 'current' in target ? target.current : target || (typeof window !== 'undefined' ? window : null)

    if (!targetValue?.addEventListener) {
      return
    }

    const eventListener = (event: Event) => savedListener.current(event as WindowEventMap[KW])
    targetValue.addEventListener(eventName, eventListener as EventListener)

    return () => targetValue.removeEventListener(eventName, eventListener as EventListener)
  }, [eventName, target])
}
```

### JavaScript version

```js
import { useEffect, useRef } from 'react'

export default function useEventListener(eventName, listener, target) {
  const savedListener = useRef(listener)

  useEffect(() => {
    savedListener.current = listener
  }, [listener])

  useEffect(() => {
    const targetValue =
      target && 'current' in target ? target.current : target || (typeof window !== 'undefined' ? window : null)

    if (!targetValue?.addEventListener) {
      return
    }

    const eventListener = (event) => savedListener.current(event)
    targetValue.addEventListener(eventName, eventListener)
    return () => targetValue.removeEventListener(eventName, eventListener)
  }, [eventName, target])
}
```
