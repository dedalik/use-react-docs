---
title: Toggle boolean state
sidebar_label: useToggle
category: State
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useToggle.tsx'
description: >-
  useToggle from @dedalik/use-react: Toggle boolean state. TypeScript,
  tree-shakable import, examples, SSR notes.
---

# useToggle()

<PackageData fn="useToggle" />

Last updated: 24/04/2026

## Overview

`useToggle` manages a boolean flag and returns both a quick toggle action and an explicit setter. It is useful for UI states like open/closed panels, modal visibility, enabled/disabled controls, or any two-state behavior where you sometimes flip the current value and sometimes force a specific next value.

### What it accepts

- `initialValue = false`.

### What it returns

- Position **1**: `boolean`.
- Position **2**: `() => void`.
- Position **3**: `(nextValue: boolean) => void`.

## Usage

Real-world example: control a settings panel with a default open state, plus separate actions for toggle/open/close.

```tsx
import useToggle from '@dedalik/use-react/useToggle'

function Example() {
  const [isOpen, toggleOpen, setOpen] = useToggle(true)

  return (
    <div>
      <h3>Settings Panel</h3>
      <p>Status: {isOpen ? 'Open' : 'Closed'}</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={toggleOpen}>Toggle</button>
        <button onClick={() => setOpen(true)}>Open</button>
        <button onClick={() => setOpen(false)}>Close</button>
      </div>

      {isOpen && (
        <section style={{ marginTop: 12, padding: 12, border: '1px solid #ddd' }}>Panel content is visible.</section>
      )}
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useToggle`

**Signature:** `useToggle(initialValue = false): UseToggleReturn`

#### Parameters

1. **Parameter** - `initialValue`.

#### Returns

Tuple:

1. `boolean`
2. `() => void`
3. `(nextValue: boolean) => void`

## Copy-paste hook

```tsx
import { useCallback, useState } from 'react'

export type UseToggleReturn = [boolean, () => void, (nextValue: boolean) => void]

export default function useToggle(initialValue = false): UseToggleReturn {
  const [value, setValue] = useState<boolean>(initialValue)

  const toggle = useCallback(() => {
    setValue((currentValue) => !currentValue)
  }, [])

  const set = useCallback((nextValue: boolean) => {
    setValue(nextValue)
  }, [])

  return [value, toggle, set]
}
```

```js
import { useCallback, useState } from 'react'

export default function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue)

  const toggle = useCallback(() => {
    setValue((currentValue) => !currentValue)
  }, [])

  const set = useCallback((nextValue) => {
    setValue(nextValue)
  }, [])

  return [value, toggle, set]
}
```
