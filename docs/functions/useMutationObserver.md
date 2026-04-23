---
title: Observe DOM mutations
sidebar_label: useMutationObserver
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useMutationObserver'
description: >-
  useMutationObserver from @dedalik/use-react: Observe DOM mutations.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useMutationObserver()

<PackageData fn="useMutationObserver" />

Last updated: 23/04/2026, 15:56

## Overview

`useMutationObserver` observes DOM mutations on a target node.

Use it when UI logic depends on external DOM changes (content injection, portal updates, or third-party widgets).

### What it accepts

- `elementRef`: node ref to observe.
- `callback`: mutation handler.
- `options` (optional): observer configuration.

### What it returns

- This hook returns nothing.

## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import { useRef, useState } from 'react'
import useMutationObserver from '@dedalik/use-react/useMutationObserver'

function AttrWatcherExample() {
  const hostRef = useRef<HTMLDivElement>(null)
  const [log, setLog] = useState('')

  useMutationObserver(
    hostRef,
    (records) => {
      setLog(records.map((r) => r.type + (r.attributeName ? ':' + r.attributeName : '')).join(', '))
    },
    { attributes: true, childList: false, subtree: false },
  )

  return (
    <div>
      <div ref={hostRef} data-x='0'>
        Target node
      </div>
      <button type='button' onClick={() => hostRef.current?.setAttribute('data-x', String(Date.now()))}>
        Change attribute
      </button>
      <p>Last mutations: {log || '(none yet)'}</p>
    </div>
  )
}

export default function AttrWatcherDemo() {
  return <AttrWatcherExample />
}
```

## API Reference

### `useMutationObserver`

**Signature:** `useMutationObserver(elementRef, callback, options?): void`

#### Parameters

1. **`elementRef`** - Ref to the DOM node to observe.
2. **`callback`** - `MutationCallback` invoked on mutations.
3. **`options`** - `MutationObserverInit` (defaults include subtree/childList where applicable).

#### Returns

Nothing (`void`).

## Copy-paste hook

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

### JavaScript version

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
