---
title: Track mouse pressed state
sidebar_label: useMousePressed
category: Sensors
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useMousePressed.tsx'
description: >-
  useMousePressed from @dedalik/use-react: reactive state for mouse button down/up.
---

# useMousePressed()

<PackageData fn="useMousePressed" />

Last updated: 24/04/2026

## Overview

`useMousePressed` tracks whether **any** primary-button cycle is down: **`mousedown`** sets **`true`**, **`mouseup`** clears it, and **`window`** **`blur`** also clears so dragging outside the tab does not leave “stuck” pressed state. It does not distinguish which button-only a single boolean for UI affordances like “dragging” paint tools; use raw pointer events if you need multi-button detail.

### What it accepts

- None.

### What it returns

- **`boolean`** - Whether a press is currently held.

## Usage

Visual feedback while the button is down (no `JSON.stringify`).

```tsx
import useMousePressed from '@dedalik/use-react/useMousePressed'

function Example() {
  const pressed = useMousePressed()

  return (
    <div>
      <h3>Mouse pressed</h3>
      <button
        type='button'
        style={{
          transform: pressed ? 'scale(0.97)' : 'scale(1)',
          background: pressed ? '#312e81' : '#4f46e5',
          color: '#fff',
          padding: '10px 16px',
          border: 'none',
          borderRadius: 8,
        }}
      >
        {pressed ? 'Holding…' : 'Press and hold'}
      </button>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useMousePressed`

**Signature:** `useMousePressed(): boolean`

#### Parameters

None.

#### Returns

**`boolean`**.

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

/**
 * Tracks whether primary pointer is currently pressed.
 */
export default function useMousePressed(): boolean {
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('blur', onUp)

    return () => {
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('blur', onUp)
    }
  }, [])

  return pressed
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

export default function useMousePressed() {
  const [pressed, setPressed] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)

    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    window.addEventListener('blur', onUp)

    return () => {
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      window.removeEventListener('blur', onUp)
    }
  }, [])

  return pressed
}
```
