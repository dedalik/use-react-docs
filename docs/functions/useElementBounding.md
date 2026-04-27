---
title: Track element bounding rect
sidebar_label: useElementBounding
category: Elements
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useElementBounding.tsx'
description: >-
  useElementBounding from @dedalik/use-react: observe element client rect values.
---

# useElementBounding()

<PackageData fn="useElementBounding" />
<HookLiveDemo demo="useElementBounding/basic" title="Live demo: useElementBounding" />

## Overview

`useElementBounding` keeps a live snapshot of an element’s `DOMRect` in **viewport coordinates** (`getBoundingClientRect()`), including `x/y`, edges, and `width/height`. It updates on element resize (via `ResizeObserver` when available), on window resize, and on scroll (capture phase so nested scroll containers also trigger updates), which makes it useful for overlays, popovers, sticky headers, and any layout math that must track a node’s on-screen box-not just its CSS size.

### What it accepts

- `target: RefObject<HTMLElement | null>` - Ref attached to the element whose viewport bounding box you want to track.

### What it returns

- `x`: Viewport X from `DOMRect.x`. Type `number`.
- `y`: Viewport Y from `DOMRect.y`. Type `number`.
- `top`: Viewport top edge (`DOMRect.top`). Type `number`.
- `right`: Viewport right edge (`DOMRect.right`). Type `number`.
- `bottom`: Viewport bottom edge (`DOMRect.bottom`). Type `number`.
- `left`: Viewport left edge (`DOMRect.left`). Type `number`.
- `width`: Layout width (`DOMRect.width`). Type `number`.
- `height`: Layout height (`DOMRect.height`). Type `number`.

## Usage

Real-world example: track a card inside a scrollable panel-scroll and padding changes update the viewport rect, not just width/height.

```tsx
import { useRef, useState } from 'react'
import useElementBounding from '@dedalik/use-react/useElementBounding'

function Example() {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const rect = useElementBounding(cardRef)
  const [padding, setPadding] = useState(16)

  return (
    <div>
      <h3>Bounding rect</h3>
      <p>
        x/y: {Math.round(rect.x)}, {Math.round(rect.y)} - size: {Math.round(rect.width)}×{Math.round(rect.height)} -
        edges LTRB: {Math.round(rect.left)}/{Math.round(rect.top)}/{Math.round(rect.right)}/{Math.round(rect.bottom)}
      </p>

      <label htmlFor='pad-range' style={{ display: 'block', marginBottom: 8 }}>
        Card padding: {padding}px
      </label>
      <input
        id='pad-range'
        type='range'
        min={8}
        max={40}
        value={padding}
        onChange={(event) => setPadding(Number(event.target.value))}
      />

      <div
        style={{
          marginTop: 12,
          height: 220,
          overflow: 'auto',
          border: '1px solid #ddd',
          borderRadius: 12,
          background: '#fafafa',
        }}
      >
        <div style={{ height: 700, padding: 16 }}>
          <div style={{ height: 120 }}>Scroll down ↓</div>
          <div
            ref={cardRef}
            style={{
              width: 280,
              padding,
              borderRadius: 12,
              border: '1px solid #ccc',
              background: 'white',
            }}
          >
            This card’s bounding rect updates while you scroll this panel.
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useElementBounding`

**Signature:** `useElementBounding(target: RefObject<HTMLElement | null>): ElementBounding`

#### Parameters

1. **`target`** (`RefObject<HTMLElement | null>`) - Ref attached to the element whose viewport bounding box you want to track.

#### Returns

Object with:

- `x` - Viewport X from `DOMRect.x`. (`number`).
- `y` - Viewport Y from `DOMRect.y`. (`number`).
- `top` - Viewport top edge (`DOMRect.top`). (`number`).
- `right` - Viewport right edge (`DOMRect.right`). (`number`).
- `bottom` - Viewport bottom edge (`DOMRect.bottom`). (`number`).
- `left` - Viewport left edge (`DOMRect.left`). (`number`).
- `width` - Layout width (`DOMRect.width`). (`number`).
- `height` - Layout height (`DOMRect.height`). (`number`).

## Copy-paste hook

### TypeScript

```tsx
import { RefObject, useEffect, useState } from 'react'

export interface ElementBounding {
  x: number
  y: number
  top: number
  right: number
  bottom: number
  left: number
  width: number
  height: number
}

const initialBounding: ElementBounding = {
  x: 0,
  y: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: 0,
  height: 0,
}

/**
 * Tracks element bounding client rect values.
 */
export default function useElementBounding(target: RefObject<HTMLElement | null>): ElementBounding {
  const [rect, setRect] = useState<ElementBounding>(initialBounding)

  useEffect(() => {
    const node = target.current
    if (!node) return

    const update = () => {
      const r = node.getBoundingClientRect()
      setRect({
        x: r.x,
        y: r.y,
        top: r.top,
        right: r.right,
        bottom: r.bottom,
        left: r.left,
        width: r.width,
        height: r.height,
      })
    }

    update()

    let observer: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(update)
      observer.observe(node)
    }

    window.addEventListener('scroll', update, true)
    window.addEventListener('resize', update)

    return () => {
      observer?.disconnect()
      window.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
    }
  }, [target])

  return rect
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

const initialBounding = {
  x: 0,
  y: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: 0,
  height: 0,
}

export default function useElementBounding(target) {
  const [rect, setRect] = useState(initialBounding)

  useEffect(() => {
    const node = target.current
    if (!node) return

    const update = () => {
      const r = node.getBoundingClientRect()
      setRect({
        x: r.x,
        y: r.y,
        top: r.top,
        right: r.right,
        bottom: r.bottom,
        left: r.left,
        width: r.width,
        height: r.height,
      })
    }

    update()

    let observer = null
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(update)
      observer.observe(node)
    }

    window.addEventListener('scroll', update, true)
    window.addEventListener('resize', update)

    return () => {
      observer?.disconnect()
      window.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
    }
  }, [target])

  return rect
}
```
