---
title: Track connected gamepads
sidebar_label: useGamepad
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useGamepad.tsx'
description: >-
  useGamepad from @dedalik/use-react: reactive connected gamepad list via browser API.
---

# useGamepad()

<PackageData fn="useGamepad" />

Last updated: 24/04/2026

## Overview

`useGamepad` exposes a live list of connected **Gamepad** objects by calling **`navigator.getGamepads()`** and filtering out empty slots. It registers **`gamepadconnected`** and **`gamepaddisconnected`**, and also polls on a **200 ms** `setInterval` so button and axis **reads** (which the Gamepad API updates during polling) stay fresh even when the browser only fires connect/disconnect on device attach. **`isSupported`** is true when **`getGamepads`** exists. This hook does not normalize vendor-specific button layouts; it is a thin wrapper for building game UIs or debugging input.

### What it accepts

- None.

### What it returns

- **`isSupported`**: `boolean`
- **`gamepads`**: `Gamepad[]` (active slots only, in index order with gaps removed)

## Usage

List connected pads and one face-button row so you can see activity after pressing A/B/X/Y.

```tsx
import useGamepad from '@dedalik/use-react/useGamepad'

function Example() {
  const { isSupported, gamepads } = useGamepad()

  if (!isSupported) {
    return <p>Gamepad API is not available in this environment.</p>
  }

  if (gamepads.length === 0) {
    return <p>No gamepad detected - connect a controller and press a button.</p>
  }

  return (
    <ul>
      {gamepads.map((gp) => {
        const face = gp.buttons.slice(0, 4)
        return (
          <li key={gp.id || `${gp.index}`}>
            <strong>{gp.id || 'Gamepad'}</strong> (index {gp.index}
            {gp.mapping ? `, ${gp.mapping} mapping` : ''})
            <ul>
              {face.map((btn, i) => (
                <li key={i}>
                  Button {i}: {btn.pressed ? 'on' : 'off'} (value {btn.value.toFixed(2)})
                </li>
              ))}
            </ul>
          </li>
        )
      })}
    </ul>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useGamepad`

**Signature:** `useGamepad(): UseGamepadReturn`

#### Parameters

None.

#### Returns

Object with:

- `isSupported` - `typeof navigator.getGamepads === 'function'`.
- `gamepads` - Non-`null` entries from `navigator.getGamepads()`.

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

export interface UseGamepadReturn {
  isSupported: boolean
  gamepads: Gamepad[]
}

/**
 * Tracks connected gamepads via polling and connect/disconnect events.
 */
export default function useGamepad(): UseGamepadReturn {
  const isSupported = typeof navigator !== 'undefined' && typeof navigator.getGamepads === 'function'
  const [gamepads, setGamepads] = useState<Gamepad[]>([])

  useEffect(() => {
    if (!isSupported || typeof window === 'undefined') return

    const update = () => {
      const next = Array.from(navigator.getGamepads() ?? []).filter(Boolean) as Gamepad[]
      setGamepads(next)
    }

    const onChange = () => {
      const next = Array.from(navigator.getGamepads() ?? []).filter(Boolean) as Gamepad[]
      setGamepads(next)
    }

    window.addEventListener('gamepadconnected', onChange)
    window.addEventListener('gamepaddisconnected', onChange)
    onChange()
    const intervalId = window.setInterval(update, 200)

    return () => {
      window.clearInterval(intervalId)
      window.removeEventListener('gamepadconnected', onChange)
      window.removeEventListener('gamepaddisconnected', onChange)
    }
  }, [isSupported])

  return { isSupported, gamepads }
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

/**
 * Tracks connected gamepads via polling and connect/disconnect events.
 */
export default function useGamepad() {
  const isSupported = typeof navigator !== 'undefined' && typeof navigator.getGamepads === 'function'
  const [gamepads, setGamepads] = useState([])

  useEffect(() => {
    if (!isSupported || typeof window === 'undefined') return

    const update = () => {
      const next = Array.from(navigator.getGamepads() ?? []).filter(Boolean)
      setGamepads(next)
    }

    const onChange = () => {
      const next = Array.from(navigator.getGamepads() ?? []).filter(Boolean)
      setGamepads(next)
    }

    window.addEventListener('gamepadconnected', onChange)
    window.addEventListener('gamepaddisconnected', onChange)
    onChange()
    const intervalId = window.setInterval(update, 200)

    return () => {
      window.clearInterval(intervalId)
      window.removeEventListener('gamepadconnected', onChange)
      window.removeEventListener('gamepaddisconnected', onChange)
    }
  }, [isSupported])

  return { isSupported, gamepads }
}
```
