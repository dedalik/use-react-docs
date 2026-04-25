---
title: Attach and clean up event listeners
sidebar_label: useEventListener
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useEventListener.tsx'
description: >-
  useEventListener from @dedalik/use-react: Attach and clean up event listeners.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useEventListener()

<PackageData fn="useEventListener" />

Last updated: 24/04/2026

## Overview

`useEventListener` subscribes **`addEventListener`** on a **target** (default **`window`** if omitted) and removes the listener on unmount or when **`eventName`** or **`target`** change. The latest **`listener`** is kept in a ref so you do not rebind on every render while still seeing fresh closures. **`target`** can be a **DOM node**, **`window`**, **`document`**, **`MediaQueryList`**, or a **ref** whose **`.current`** is used; the effect depends on the **ref object**, not **`.current`**, so re-pointing a ref to a new element may require a key or a dedicated effect. Event names are typed from **`WindowEventMap`** in TypeScript. The hook returns **nothing**-it is a side-effect utility.

### What it accepts

1. **`eventName`** - A key of **`WindowEventMap`** (e.g. **`resize`**, **`keydown`**)
2. **`listener`** - Handler receiving the typed event
3. Optional **`target`** - Event target, or a ref; defaults to **`window`**

### What it returns

- **`void`**

## Usage

Track **inner** viewport width on **`window`** **`resize`**.

```tsx
import { useState } from 'react'
import useEventListener from '@dedalik/use-react/useEventListener'

function Example() {
  const [width, setWidth] = useState(typeof window === 'undefined' ? 0 : window.innerWidth)

  useEventListener('resize', () => {
    setWidth(window.innerWidth)
  })

  return (
    <p>
      Window inner width: <strong>{width}</strong> px
    </p>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useEventListener`

**Signature:** `useEventListener<KW extends keyof WindowEventMap>(eventName: KW, listener: (event: WindowEventMap[KW]) => void, target?: Target | RefObject<Target>): void`

#### Parameters

1. **`eventName`**
2. **`listener`**
3. **`target`** (optional)

#### Returns

`void`

## Copy-paste hook

### TypeScript

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

### JavaScript

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
