---
title: Handle clicks outside an element
sidebar_label: useClickOutside
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useClickOutside.tsx'
description: >-
  useClickOutside from @dedalik/use-react: Handle clicks outside an element.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useClickOutside()

<PackageData fn="useClickOutside" />

Last updated: 24/04/2026

## Overview

`useClickOutside` registers global `mousedown` and `touchstart` listeners and calls your `handler` when the event target is outside every referenced DOM node (supports either a single ref or an array of refs, which is handy when the “inside” region is split across a toggle button and a floating panel). It keeps the latest `handler` in a ref so you do not need to rebind listeners on every render, and it no-ops when `document` is unavailable (SSR).

### What it accepts

- `refs: ElementRef`.
- `handler: (event: MouseEvent | TouchEvent) => void`.

### What it returns

- Nothing (`void`). Side effects only.

## Usage

Real-world example: a popover menu that closes on outside clicks, while clicks on the toggle button still count as “inside”.

```tsx
import { useRef, useState } from 'react'
import useClickOutside from '@dedalik/use-react/useClickOutside'

function Example() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)

  useClickOutside([toggleRef, panelRef], () => setOpen(false))

  return (
    <div>
      <h3>Account menu</h3>
      <button ref={toggleRef} type='button' onClick={() => setOpen((v) => !v)}>
        {open ? 'Close menu' : 'Open menu'}
      </button>

      {open ? (
        <div
          ref={panelRef}
          style={{
            marginTop: 8,
            border: '1px solid #ddd',
            borderRadius: 8,
            padding: 12,
            width: 240,
          }}
        >
          <p>Click outside the button or panel to close.</p>
          <button type='button' onClick={() => setOpen(false)}>
            Log out (demo)
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useClickOutside`

**Signature:** `useClickOutside(refs: ElementRef, handler: (event: MouseEvent | TouchEvent) => void)`

#### Parameters

1. **`refs`** (`ElementRef`) - One ref or an array of refs whose combined DOM subtree should be treated as “inside”.
2. **`handler`** (`(event: MouseEvent | TouchEvent) => void`) - Called when a pointer event happens outside all `refs`.

#### Returns

Nothing (`void`). The hook registers listeners only.

## Copy-paste hook

### TypeScript

```tsx
import { RefObject, useEffect, useRef } from 'react'

type ElementRef = RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[]

export default function useClickOutside(refs: ElementRef, handler: (event: MouseEvent | TouchEvent) => void) {
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    if (typeof document === 'undefined') return
    const refList = Array.isArray(refs) ? refs : [refs]

    const onPointer = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node
      const isInside = refList.some((ref) => ref.current?.contains(target))
      if (!isInside) {
        handlerRef.current(event)
      }
    }

    document.addEventListener('mousedown', onPointer)
    document.addEventListener('touchstart', onPointer)

    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('touchstart', onPointer)
    }
  }, [refs])
}
```

### JavaScript

```js
import { useEffect, useRef } from 'react'

export default function useClickOutside(refs, handler) {
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    if (typeof document === 'undefined') return
    const refList = Array.isArray(refs) ? refs : [refs]

    const onPointer = (event) => {
      const target = event.target
      const isInside = refList.some((ref) => ref.current?.contains(target))
      if (!isInside) {
        handlerRef.current(event)
      }
    }

    document.addEventListener('mousedown', onPointer)
    document.addEventListener('touchstart', onPointer)

    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('touchstart', onPointer)
    }
  }, [refs])
}
```
