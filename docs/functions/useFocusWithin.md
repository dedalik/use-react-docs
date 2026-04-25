---
title: Track focus within a container
sidebar_label: useFocusWithin
category: Sensors
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useFocusWithin.tsx'
description: >-
  useFocusWithin from @dedalik/use-react: tracks focus for container and descendants.
---

# useFocusWithin()

<PackageData fn="useFocusWithin" />

Last updated: 24/04/2026

## Overview

`useFocusWithin` places **`focusin` / `focusout`** on the container: **`focusin`** sets **focused** true; on **`focusout`** it re-checks **`document.activeElement`** to see if focus stayed **inside** the node via **`contains`**, so tabbing between inner inputs keeps **focused** true until focus leaves the subtree. Like **`useFocus`**, the effect has **no dependency array** and re-binds every render. Use for Roving focus groups, “section active” outlines, or form panels.

### What it accepts

- None.

### What it returns

- **`{ focused, ref }`**.

## Usage

Two child inputs inside a **`ref`**’d box (no `JSON.stringify`).

```tsx
import useFocusWithin from '@dedalik/use-react/useFocusWithin'

function Example() {
  const { focused, ref } = useFocusWithin<HTMLDivElement>()

  return (
    <div
      ref={ref}
      style={{
        padding: 16,
        borderRadius: 8,
        border: focused ? '2px solid #4f46e5' : '1px solid #e2e8f0',
      }}
    >
      <h3 style={{ marginTop: 0 }}>Group</h3>
      <p>
        focus-within: <strong>{focused ? 'yes' : 'no'}</strong>
      </p>
      <p style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <input type='text' placeholder='First' />
        <input type='text' placeholder='Second' />
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useFocusWithin`

**Signature:** `useFocusWithin<T extends HTMLElement = HTMLElement>(): UseFocusWithinReturn<T>`

#### Parameters

None.

#### Returns

**`UseFocusWithinReturn<T>`** - `focused` if the container or any descendant has focus.

## Copy-paste hook

### TypeScript

```tsx
import { RefObject, useEffect, useRef, useState } from 'react'

export interface UseFocusWithinReturn<T extends HTMLElement> {
  focused: boolean
  ref: RefObject<T | null>
}

/**
 * Tracks whether container or any descendant has focus.
 */
export default function useFocusWithin<T extends HTMLElement = HTMLElement>(): UseFocusWithinReturn<T> {
  const ref = useRef<T | null>(null)
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const onFocusIn = () => setFocused(true)
    const onFocusOut = () => {
      const active = document.activeElement
      setFocused(Boolean(active && node.contains(active)))
    }

    node.addEventListener('focusin', onFocusIn)
    node.addEventListener('focusout', onFocusOut)

    return () => {
      node.removeEventListener('focusin', onFocusIn)
      node.removeEventListener('focusout', onFocusOut)
    }
  })

  return { focused, ref }
}
```

### JavaScript

```js
import { useEffect, useRef, useState } from 'react'

export default function useFocusWithin() {
  const ref = useRef(null)
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const onFocusIn = () => setFocused(true)
    const onFocusOut = () => {
      const active = document.activeElement
      setFocused(Boolean(active && node.contains(active)))
    }

    node.addEventListener('focusin', onFocusIn)
    node.addEventListener('focusout', onFocusOut)

    return () => {
      node.removeEventListener('focusin', onFocusIn)
      node.removeEventListener('focusout', onFocusOut)
    }
  })

  return { focused, ref }
}
```
