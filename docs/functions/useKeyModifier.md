---
title: Track pressed modifier keys
sidebar_label: useKeyModifier
category: Sensors
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useKeyModifier.tsx'
description: >-
  useKeyModifier from @dedalik/use-react: alt/ctrl/meta/shift key state.
---

# useKeyModifier()

<PackageData fn="useKeyModifier" />

Last updated: 24/04/2026

## Overview

`useKeyModifier` keeps **`alt`**, **`ctrl`**, **`meta`**, and **`shift`** in sync with the last **`KeyboardEvent`**: every **`keydown`** and **`keyup`** on **`window`** re-reads the modifier fields from the event, so the booleans always reflect the browser’s own modifier state. When the tab loses focus, **`window` `blur`** resets all flags to **`false`**, so stuck keys after `Alt+Tab` or similar do not keep reporting as pressed. The hook does not expose non-modifier keys; it is meant for shortcut UI (show which chord is active) and guard logic.

### What it accepts

- None.

### What it returns

- **`alt`**, **`ctrl`**, **`meta`**, **`shift`**: `boolean`

## Usage

Use the flags in labels or to explain a modifier-aware shortcut to the user.

```tsx
import useKeyModifier from '@dedalik/use-react/useKeyModifier'

function pill(on: boolean, label: string) {
  return (
    <span
      style={{
        padding: '0.1em 0.4em',
        borderRadius: 4,
        marginRight: 4,
        background: on ? '#c8f7c5' : '#eee',
        fontFamily: 'monospace',
        fontSize: 12,
      }}
    >
      {label}
    </span>
  )
}

function Example() {
  const m = useKeyModifier()

  return (
    <p>
      {pill(m.meta, 'Meta')}
      {pill(m.ctrl, 'Ctrl')}
      {pill(m.alt, 'Alt')}
      {pill(m.shift, 'Shift')}
    </p>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useKeyModifier`

**Signature:** `useKeyModifier(): UseKeyModifierState`

#### Parameters

None.

#### Returns

**`UseKeyModifierState`** - Current modifier key flags from the last keyboard event (or all **`false`** after window blur / initial).

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

export interface UseKeyModifierState {
  alt: boolean
  ctrl: boolean
  meta: boolean
  shift: boolean
}

function fromEvent(event: KeyboardEvent): UseKeyModifierState {
  return {
    alt: event.altKey,
    ctrl: event.ctrlKey,
    meta: event.metaKey,
    shift: event.shiftKey,
  }
}

/**
 * Tracks active keyboard modifier keys.
 */
export default function useKeyModifier(): UseKeyModifierState {
  const [state, setState] = useState<UseKeyModifierState>({ alt: false, ctrl: false, meta: false, shift: false })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onKeyDown = (event: KeyboardEvent) => setState(fromEvent(event))
    const onKeyUp = (event: KeyboardEvent) => setState(fromEvent(event))
    const onBlur = () => setState({ alt: false, ctrl: false, meta: false, shift: false })

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onBlur)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  return state
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

function fromEvent(event) {
  return {
    alt: event.altKey,
    ctrl: event.ctrlKey,
    meta: event.metaKey,
    shift: event.shiftKey,
  }
}

/**
 * Tracks active keyboard modifier keys.
 */
export default function useKeyModifier() {
  const [state, setState] = useState({ alt: false, ctrl: false, meta: false, shift: false })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const onKeyDown = (event) => setState(fromEvent(event))
    const onKeyUp = (event) => setState(fromEvent(event))
    const onBlur = () => setState({ alt: false, ctrl: false, meta: false, shift: false })

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', onBlur)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  return state
}
```
