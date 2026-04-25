---
title: Track hover state for an element
sidebar_label: useElementHover
category: Sensors
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useElementHover.tsx'
description: >-
  useElementHover from @dedalik/use-react: reactive hover state from element ref.
---

# useElementHover()

<PackageData fn="useElementHover" />

Last updated: 24/04/2026

## Overview

`useElementHover` listens to **`mouseenter`** / **`mouseleave`** on **`target.current`** (not bubble-only `mouseover`), so **`true`** means the pointer is inside that element’s border box including descendants, without thrashing when crossing child nodes. The effect depends on **`target`** ref identity; keep a stable **`useRef`** and let React fill **`.current`**. If **`current`** is **`null`**, listeners are not attached.

### What it accepts

- **`target`** - `RefObject<HTMLElement | null>` for the hovered node.

### What it returns

- **`boolean`**.

## Usage

**`useRef`** + hover card (no `JSON.stringify`).

```tsx
import { useRef } from 'react'
import useElementHover from '@dedalik/use-react/useElementHover'

function Example() {
  const cardRef = useRef<HTMLDivElement>(null)
  const hovered = useElementHover(cardRef)

  return (
    <div
      ref={cardRef}
      style={{
        padding: 20,
        maxWidth: 360,
        borderRadius: 12,
        background: hovered ? '#1e293b' : '#f1f5f9',
        color: hovered ? '#f8fafc' : '#0f172a',
        transition: 'background 0.15s ease, color 0.15s ease',
      }}
    >
      <h3 style={{ marginTop: 0 }}>Hover me</h3>
      <p style={{ marginBottom: 0 }}>
        hovered: <strong>{hovered ? 'yes' : 'no'}</strong>
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useElementHover`

**Signature:** `useElementHover(target: RefObject<HTMLElement | null>): boolean`

#### Parameters

- **`target`** - Element whose hover state is tracked.

#### Returns

**`boolean`**.

## Copy-paste hook

### TypeScript

```tsx
import { RefObject, useEffect, useState } from 'react'

/**
 * Tracks hover state for a target element ref.
 */
export default function useElementHover(target: RefObject<HTMLElement | null>): boolean {
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const node = target.current
    if (!node) return

    const onEnter = () => setHovered(true)
    const onLeave = () => setHovered(false)

    node.addEventListener('mouseenter', onEnter)
    node.addEventListener('mouseleave', onLeave)

    return () => {
      node.removeEventListener('mouseenter', onEnter)
      node.removeEventListener('mouseleave', onLeave)
    }
  }, [target])

  return hovered
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

export default function useElementHover(target) {
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const node = target.current
    if (!node) return

    const onEnter = () => setHovered(true)
    const onLeave = () => setHovered(false)

    node.addEventListener('mouseenter', onEnter)
    node.addEventListener('mouseleave', onLeave)

    return () => {
      node.removeEventListener('mouseenter', onEnter)
      node.removeEventListener('mouseleave', onLeave)
    }
  }, [target])

  return hovered
}
```
