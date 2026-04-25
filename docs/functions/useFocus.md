---
title: Track focus state for one element
sidebar_label: useFocus
category: Sensors
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useFocus.tsx'
description: >-
  useFocus from @dedalik/use-react: ref-based element focus state helper.
---

# useFocus()

<PackageData fn="useFocus" />

Last updated: 24/04/2026

## Overview

`useFocus` returns a **`ref`** to attach to one focusable node and wires **`focus`** / **`blur`** to a **`focused`** boolean. The effect re-subscribes on **every render** (no dependency array) so it always targets the current **`ref.current`**, which is intentional for quickly swapped nodes at the same ref slot. Use for styling a single input or control; for focus inside a subtree of children, prefer **`useFocusWithin`**.

### What it accepts

- None (generic `HTMLElement` default for \*\*`ref` typing).

### What it returns

- **`{ focused, ref }`**.

## Usage

Single input: **`ref`** and **`focused`** in UI (no `JSON.stringify`).

```tsx
import useFocus from '@dedalik/use-react/useFocus'

function Example() {
  const { focused, ref } = useFocus<HTMLInputElement>()

  return (
    <div>
      <h3>Field focus</h3>
      <input
        ref={ref}
        type='text'
        placeholder='Tab or click here'
        style={{
          outline: focused ? '2px solid #6366f1' : '1px solid #cbd5e1',
        }}
      />
      <p>
        focused: <strong>{focused ? 'yes' : 'no'}</strong>
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useFocus`

**Signature:** `useFocus<T extends HTMLElement = HTMLElement>(): UseFocusReturn<T>`

#### Parameters

None.

#### Returns

**`UseFocusReturn<T>`** - `focused` flag and `ref` to place on the element.

## Copy-paste hook

### TypeScript

```tsx
import { RefObject, useEffect, useRef, useState } from 'react'

export interface UseFocusReturn<T extends HTMLElement> {
  focused: boolean
  ref: RefObject<T | null>
}

/**
 * Tracks focus state of a single element via returned ref.
 */
export default function useFocus<T extends HTMLElement = HTMLElement>(): UseFocusReturn<T> {
  const ref = useRef<T | null>(null)
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    node.addEventListener('focus', onFocus)
    node.addEventListener('blur', onBlur)

    return () => {
      node.removeEventListener('focus', onFocus)
      node.removeEventListener('blur', onBlur)
    }
  })

  return { focused, ref }
}
```

### JavaScript

```js
import { useEffect, useRef, useState } from 'react'

export default function useFocus() {
  const ref = useRef(null)
  const [focused, setFocused] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    node.addEventListener('focus', onFocus)
    node.addEventListener('blur', onBlur)

    return () => {
      node.removeEventListener('focus', onFocus)
      node.removeEventListener('blur', onBlur)
    }
  })

  return { focused, ref }
}
```
