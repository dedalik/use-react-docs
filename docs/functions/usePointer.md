---
title: Track pointer coordinates and pressed state
sidebar_label: usePointer
category: Sensors
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/usePointer.tsx'
description: >-
  usePointer from @dedalik/use-react: pointer position, type, and pressed flag.
---

# usePointer()

<PackageData fn="usePointer" />

Last updated: 24/04/2026

## Overview

`usePointer` subscribes to global **`pointermove`**, **`pointerdown`**, and **`pointerup`** on **`window`** and mirrors **`clientX` / `clientY`**, a **`pressed`** boolean (true from down until the matching up), and the **`pointerType`** string (for example **`mouse`**, **`touch`**, **`pen`**). The coordinates update on move, down, and up so the last event position is always available. The initial type is **`mouse`**, then updates on the first pointer event. It is a viewport-level view of the active pointer, not a single-target capture helper.

### What it accepts

- None.

### What it returns

- **`x`**, **`y`**: `number` (client coordinates)
- **`pressed`**: `boolean`
- **`pointerType`**: `string`

## Usage

Read pointer kind and a simple “dragging” hint from **`pressed`**.

```tsx
import usePointer from '@dedalik/use-react/usePointer'

function Example() {
  const { x, y, pressed, pointerType } = usePointer()

  return (
    <div>
      <p>
        <strong>Pointer</strong> ({pointerType}){pressed ? ' - held' : ''}
      </p>
      <p>
        client: <code>{x}</code> × <code>{y}</code>
      </p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `usePointer`

**Signature:** `usePointer(): UsePointerState`

#### Parameters

None.

#### Returns

**`UsePointerState`** - `x`, `y`, `pressed`, `pointerType` from the Pointer Events surface.

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

export interface UsePointerState {
  x: number
  y: number
  pressed: boolean
  pointerType: string
}

/**
 * Tracks pointer coordinates, state, and pointer type.
 */
export default function usePointer(): UsePointerState {
  const [state, setState] = useState<UsePointerState>({ x: 0, y: 0, pressed: false, pointerType: 'mouse' })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onMove = (event: PointerEvent) => {
      setState((prev) => ({
        ...prev,
        x: event.clientX,
        y: event.clientY,
        pointerType: event.pointerType || prev.pointerType,
      }))
    }

    const onDown = (event: PointerEvent) => {
      setState((prev) => ({
        ...prev,
        x: event.clientX,
        y: event.clientY,
        pressed: true,
        pointerType: event.pointerType || prev.pointerType,
      }))
    }

    const onUp = (event: PointerEvent) => {
      setState((prev) => ({
        ...prev,
        x: event.clientX,
        y: event.clientY,
        pressed: false,
        pointerType: event.pointerType || prev.pointerType,
      }))
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  return state
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

/**
 * Tracks pointer coordinates, state, and pointer type.
 */
export default function usePointer() {
  const [state, setState] = useState({ x: 0, y: 0, pressed: false, pointerType: 'mouse' })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onMove = (event) => {
      setState((prev) => ({
        ...prev,
        x: event.clientX,
        y: event.clientY,
        pointerType: event.pointerType || prev.pointerType,
      }))
    }

    const onDown = (event) => {
      setState((prev) => ({
        ...prev,
        x: event.clientX,
        y: event.clientY,
        pressed: true,
        pointerType: event.pointerType || prev.pointerType,
      }))
    }

    const onUp = (event) => {
      setState((prev) => ({
        ...prev,
        x: event.clientX,
        y: event.clientY,
        pressed: false,
        pointerType: event.pointerType || prev.pointerType,
      }))
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  return state
}
```
