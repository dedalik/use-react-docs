---
title: Observe DOM mutations
sidebar_label: useMutationObserver
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useMutationObserver.tsx'
description: >-
  useMutationObserver from @dedalik/use-react: Observe DOM mutations.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useMutationObserver()

<PackageData fn="useMutationObserver" />

Last updated: 24/04/2026

## Overview

`useMutationObserver` wires a **`MutationObserver`** to **`elementRef.current`**, calling your **`callback`** with **`MutationRecord[]`** whenever the tree changes according to **`MutationObserverInit`** (default **`{ childList: true, subtree: true }`** for broad subtree watches). The effect re-runs when **`callback`**, **`elementRef`**, or **`options`** reference changes-wrap the handler in **`useCallback`** and the options in **`useMemo`** to avoid disconnect/reconnect every render. It returns nothing; side effects live entirely in your callback (e.g. sync external state, count list items). If **`MutationObserver`** is missing, the hook is a no-op.

### What it accepts

- **`elementRef`** - Root **`Node`** to observe.
- **`callback`** - `MutationCallback` receiving mutation batches.
- **`options`** (optional) - `MutationObserverInit`. Default **`{ childList: true, subtree: true }`**.

### What it returns

- **`void`** - No return value.

## Usage

**`useMemo`** for `options`, **`useCallback`** for the counter; append children with a button (no `JSON.stringify`).

```tsx
import { useCallback, useMemo, useRef, useState } from 'react'
import useMutationObserver from '@dedalik/use-react/useMutationObserver'

function Example() {
  const rootRef = useRef<HTMLUListElement>(null)
  const [count, setCount] = useState(0)
  const [items, setItems] = useState(1)

  const options = useMemo(
    () => ({
      childList: true,
      subtree: true,
    }),
    [],
  )

  const onMutate: MutationCallback = useCallback(() => {
    setCount((c) => c + 1)
  }, [])

  useMutationObserver(rootRef, onMutate, options)

  return (
    <div>
      <h3>DOM mutations</h3>
      <p>
        Callback fired: <strong>{count}</strong> times
      </p>
      <button type='button' onClick={() => setItems((n) => n + 1)}>
        Add list item
      </button>
      <ul ref={rootRef}>
        {Array.from({ length: items }, (_, index) => (
          <li key={index}>Item {index + 1}</li>
        ))}
      </ul>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useMutationObserver`

**Signature:** `useMutationObserver(elementRef, callback, options?: MutationObserverInit): void`

#### Parameters

- **`elementRef`** (`RefObject<Node | null>`) - Observed subtree root.
- **`callback`** (`MutationCallback`) - Invoked for each batch.
- **`options`** - `MutationObserverInit`. Default `{ childList: true, subtree: true }`.

#### Returns

**`void`**.

## Copy-paste hook

### TypeScript

```tsx
import { RefObject, useEffect } from 'react'

export default function useMutationObserver(
  elementRef: RefObject<Node | null>,
  callback: MutationCallback,
  options: MutationObserverInit = { childList: true, subtree: true },
) {
  useEffect(() => {
    const target = elementRef.current
    if (!target || typeof MutationObserver === 'undefined') return

    const observer = new MutationObserver(callback)
    observer.observe(target, options)

    return () => observer.disconnect()
  }, [callback, elementRef, options])
}
```

### JavaScript

```js
import { useEffect } from 'react'

export default function useMutationObserver(elementRef, callback, options = { childList: true, subtree: true }) {
  useEffect(() => {
    const target = elementRef.current
    if (!target || typeof MutationObserver === 'undefined') return

    const observer = new MutationObserver(callback)
    observer.observe(target, options)

    return () => observer.disconnect()
  }, [callback, elementRef, options])
}
```
