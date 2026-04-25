---
title: Get parent element from ref
sidebar_label: useParentElement
category: Elements
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useParentElement.tsx'
description: >-
  useParentElement from @dedalik/use-react: resolve parent element for a target ref.
---

# useParentElement()

<PackageData fn="useParentElement" />

Last updated: 24/04/2026

## Overview

`useParentElement` reads `target.current?.parentElement` after mount and stores it in React state, returning the resolved parent `HTMLElement` (or `null` when the node is missing or has no parent). This is handy when a child needs to drive layout/styling/behavior of its DOM container (for example, measuring the parent box, toggling a class on the wrapper, or choosing a portal boundary) without threading an extra ref through every intermediate component.

### What it accepts

- `target: RefObject<HTMLElement | null>`.

### What it returns

- The resolved `parentElement` for `target`, or `null`. Type `HTMLElement | null`.

## Usage

Real-world example: highlight the immediate DOM parent of a chip without passing a ref to the wrapper manually.

```tsx
import { useRef, useState } from 'react'
import useParentElement from '@dedalik/use-react/useParentElement'

function Example() {
  const chipRef = useRef<HTMLSpanElement | null>(null)
  const parentEl = useParentElement(chipRef)
  const [highlight, setHighlight] = useState(false)

  return (
    <div>
      <h3>Tag editor</h3>

      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 10px',
          borderRadius: 999,
          border: highlight ? '2px solid #16a34a' : '1px solid #ddd',
          background: highlight ? '#ecfdf5' : '#fafafa',
        }}
      >
        <span ref={chipRef} style={{ fontWeight: 600 }}>
          react
        </span>
        <button type='button' onClick={() => setHighlight((v) => !v)}>
          Toggle parent highlight
        </button>
      </div>

      <p style={{ marginTop: 12 }}>
        Parent tagName: <code>{parentEl?.tagName.toLowerCase() ?? 'null'}</code>
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useParentElement`

**Signature:** `useParentElement(target: RefObject<HTMLElement | null>): HTMLElement | null`

#### Parameters

1. **`target`** (`RefObject<HTMLElement | null>`) - Ref attached to the child node whose `parentElement` you want to read.

#### Returns

The resolved `parentElement` for `target`, or `null`. (`HTMLElement | null`).

## Copy-paste hook

### TypeScript

```tsx
import { RefObject, useEffect, useState } from 'react'

/**
 * Returns the parent element for a target ref.
 */
export default function useParentElement(target: RefObject<HTMLElement | null>): HTMLElement | null {
  const [parent, setParent] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setParent(target.current?.parentElement ?? null)
  }, [target])

  return parent
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

export default function useParentElement(target) {
  const [parent, setParent] = useState(null)

  useEffect(() => {
    setParent(target.current?.parentElement ?? null)
  }, [target])

  return parent
}
```
