---
title: Callback when a node is disconnected
sidebar_label: onElementRemoval
category: Event
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/events/onElementRemoval.tsx'
description: >-
  onElementRemoval from @dedalik/use-react: MutationObserver until element removed from DOM.
---

# onElementRemoval()

<PackageData fn="onElementRemoval" />

Last updated: 24/04/2026

## Overview

`onElementRemoval` attaches a **`MutationObserver`** on **`root`** (default **`document.body`**) with **`childList`** / **`subtree`** flags (default **true** for both) and, on every **mutation** batch, checks if the **target** **`Element`** is still **`isConnected`**. The **first** time it is **not**, it runs your **`callback`** once, **disconnects** the **observer**, and **stops**. This is a **portable** way to know when a **node** was **removed** (e.g. **unmount** by React, **reparenting**, or **imperative** DOM **changes**) without relying on `useEffect` **cleanup** alone. The **returned** function **disconnects** early. If **`MutationObserver`** is **undefined** (rare), it returns a **no**-**op** **cleanup** **immediately**. **Performance**: wide **`subtree`** on **`body`** is **heavier**-narrow **`root`** when **possible**.

### What it accepts

1. **`element`**: the **`Element`** to **watch** for **disconnection**
2. **`callback`**: `() => void` - **fires once** when the element is **not** in the **document** anymore
3. **`options`**: `root?`, `childList?`, `subtree?` - **passed** to **`observe`**

### What it returns

- **Teardown** `() => void` - **disconnects** the **observer** without **firing** the **callback** unless **already** **fired**

## Usage

When a **teaser** **card** is **unmounted** from a **toggled** **parent**, a **one-time** log updates (guard **return** if **ref** is **missing** on first **paint**).

```tsx
import { useEffect, useRef, useState } from 'react'
import onElementRemoval from '@dedalik/use-react/events/onElementRemoval'

function Teaser({ onGone }: { onGone: () => void }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    return onElementRemoval(
      el,
      () => {
        onGone()
      },
      { root: document.body, childList: true, subtree: true },
    )
  }, [onGone])

  return <div ref={ref}>I disappear when the parent unmounts me</div>
}

function Example() {
  const [show, setShow] = useState(true)
  const [label, setLabel] = useState('still mounted')

  return (
    <div>
      <p>{label}</p>
      {show && <Teaser onGone={() => setLabel('removed from DOM')} />}
      <button type='button' onClick={() => setShow(false)}>
        Remove teaser
      </button>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `onElementRemoval`

**Signature:** `onElementRemoval(element: Element, callback: () => void, options?: OnElementRemovalOptions): () => void`

## Copy-paste hook

### TypeScript

```ts
export interface OnElementRemovalOptions {
  root?: Node
  childList?: boolean
  subtree?: boolean
}

/**
 * Calls callback once target element is removed from DOM.
 */
export default function onElementRemoval(
  element: Element,
  callback: () => void,
  options: OnElementRemovalOptions = {},
): () => void {
  if (typeof MutationObserver === 'undefined') return () => {}

  const root = options.root ?? document.body
  const observer = new MutationObserver(() => {
    if (!element.isConnected) {
      callback()
      observer.disconnect()
    }
  })

  observer.observe(root, {
    childList: options.childList ?? true,
    subtree: options.subtree ?? true,
  })

  return () => observer.disconnect()
}
```

### JavaScript

```js
/**
 * Calls callback once target element is removed from DOM.
 */
export default function onElementRemoval(element, callback, options = {}) {
  if (typeof MutationObserver === 'undefined') return () => {}

  const root = options.root ?? document.body
  const observer = new MutationObserver(() => {
    if (!element.isConnected) {
      callback()
      observer.disconnect()
    }
  })

  observer.observe(root, {
    childList: options.childList ?? true,
    subtree: options.subtree ?? true,
  })

  return () => observer.disconnect()
}
```
