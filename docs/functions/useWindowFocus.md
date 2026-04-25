---
title: Track window focus state
sidebar_label: useWindowFocus
category: Elements
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useWindowFocus.tsx'
description: >-
  useWindowFocus from @dedalik/use-react: reactive window focus/blur state.
---

# useWindowFocus()

<PackageData fn="useWindowFocus" />

Last updated: 24/04/2026

## Overview

`useWindowFocus` subscribes to the browser window’s `focus`/`blur` events and returns a boolean indicating whether the page is currently considered focused. The initial value prefers `document.hasFocus()` when `document` exists (so the first render matches reality), otherwise it defaults to `true` during SSR-after hydration, focus transitions are driven by the window listeners until the component unmounts.

### What it accepts

- No arguments.

### What it returns

- `true` when the window is focused, `false` when it is blurred. Type `boolean`.

## Usage

Real-world example: show a live “session active” indicator and pause expensive background work while the tab is blurred.

```tsx
import { useEffect, useRef, useState } from 'react'
import useWindowFocus from '@dedalik/use-react/useWindowFocus'

function Example() {
  const focused = useWindowFocus()
  const [ticks, setTicks] = useState(0)
  const lastBlurAt = useRef<number | null>(null)

  useEffect(() => {
    if (!focused) {
      lastBlurAt.current = Date.now()
      return
    }

    const id = window.setInterval(() => setTicks((t) => t + 1), 1000)
    return () => window.clearInterval(id)
  }, [focused])

  return (
    <div>
      <h3>Window focus</h3>
      <p>
        Status:{' '}
        <span style={{ fontWeight: 700, color: focused ? '#166534' : '#991b1b' }}>
          {focused ? 'Focused' : 'Blurred'}
        </span>
      </p>
      <p>Background ticker (runs only while focused): {ticks}s</p>
      {!focused && lastBlurAt.current ? (
        <p>Blurred since: {new Date(lastBlurAt.current).toLocaleTimeString()}</p>
      ) : null}
      <p>Switch tabs/windows to see the state change.</p>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useWindowFocus`

**Signature:** `useWindowFocus(): boolean`

#### Parameters

None.

#### Returns

`true` when the window is focused, `false` when it is blurred. (`boolean`).

## Copy-paste hook

### TypeScript

```tsx
import { useEffect, useState } from 'react'

/**
 * Tracks whether window currently has focus.
 */
export default function useWindowFocus(): boolean {
  const [focused, setFocused] = useState(() => (typeof document !== 'undefined' ? document.hasFocus() : true))

  useEffect(() => {
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)

    return () => {
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  return focused
}
```

### JavaScript

```js
import { useEffect, useState } from 'react'

export default function useWindowFocus() {
  const [focused, setFocused] = useState(() => (typeof document !== 'undefined' ? document.hasFocus() : true))

  useEffect(() => {
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)

    return () => {
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('blur', onBlur)
    }
  }, [])

  return focused
}
```
