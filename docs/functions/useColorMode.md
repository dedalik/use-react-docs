---
title: Manage color mode (light/dark/auto)
sidebar_label: useColorMode
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useColorMode.tsx'
description: >-
  useColorMode from @dedalik/use-react: persisted light/dark/auto mode with DOM sync.
---

# useColorMode()

<PackageData fn="useColorMode" />

Last updated: 24/04/2026

## Overview

`useColorMode` persists a tri-state **`ColorMode`** (`light`, `dark`, **`auto`**) in **`localStorage`** under **`storageKey`**, resolves **`auto`** against **`usePreferredDark`**, and mirrors the effective theme onto **`element`** either as **`data-theme="dark|light"`** (default) or as mutually exclusive **`dark` / `light`** classes when **`attribute === 'class'`**. **`isDark`** is the resolved boolean for styling logic; **`setMode`** writes storage and re-runs the DOM effect; **`toggle`** cycles dark → light → the opposite of the current system guess when in auto-so quick user controls stay ergonomic without separate “system” button wiring in simple UIs.

### What it accepts

- Optional **`storageKey`** - Key for stored mode. Default `'use-react-color-mode'`.
- Optional **`attribute`** - `'data-theme'` (set attribute value) or `'class'` (toggle `dark` / `light` classes). Default `'data-theme'`.
- Optional **`element`** - Target node; default `document.documentElement` when `document` exists.

### What it returns

- **`mode`**, **`isDark`**, **`setMode`**, **`toggle`** - See API Reference.

## Usage

All options visible: custom key, **class**-based sync on **`<html>`**, and controls for each mode.

```tsx
import useColorMode from '@dedalik/use-react/useColorMode'

function Example() {
  const { mode, isDark, setMode, toggle } = useColorMode({
    storageKey: 'docs:color-mode-demo',
    attribute: 'class',
    element: typeof document !== 'undefined' ? document.documentElement : null,
  })

  return (
    <div>
      <h3>Color mode</h3>
      <p>
        Stored mode: <strong>{mode}</strong> - resolved dark: <strong>{isDark ? 'yes' : 'no'}</strong>
      </p>
      <p style={{ fontSize: 14, opacity: 0.85 }}>
        With <code>attribute: &apos;class&apos;</code>, check <code>&lt;html class&gt;</code> for <code>dark</code> /{' '}
        <code>light</code>.
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button type='button' onClick={() => setMode('light')}>
          Light
        </button>
        <button type='button' onClick={() => setMode('dark')}>
          Dark
        </button>
        <button type='button' onClick={() => setMode('auto')}>
          Auto
        </button>
        <button type='button' onClick={toggle}>
          Toggle
        </button>
      </div>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useColorMode`

**Signature:** `useColorMode(options?: UseColorModeOptions): UseColorModeReturn`

#### Parameters

Optional **`UseColorModeOptions`**:

- **`storageKey`** (`string`) - `localStorage` key. Default `'use-react-color-mode'`.
- **`attribute`** (`'data-theme' | 'class'`) - DOM application strategy. Default `'data-theme'`.
- **`element`** (`HTMLElement | null`) - Node to update. Default `document.documentElement` in browser.

#### Returns

Object with:

- **`mode`** (`ColorMode`) - Stored `'light' | 'dark' | 'auto'`.
- **`isDark`** (`boolean`) - Effective theme after resolving `auto`.
- **`setMode`** (`(mode: ColorMode) => void`) - Persists and applies.
- **`toggle`** (`() => void`) - Cycles between light/dark (and auto branch per implementation).

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useEffect, useMemo } from 'react'
import useLocalStorage from './useLocalStorage'
import usePreferredDark from './usePreferredDark'

export type ColorMode = 'light' | 'dark' | 'auto'

export interface UseColorModeOptions {
  storageKey?: string
  attribute?: 'data-theme' | 'class'
  element?: HTMLElement | null
}

export interface UseColorModeReturn {
  mode: ColorMode
  isDark: boolean
  setMode: (mode: ColorMode) => void
  toggle: () => void
}

/**
 * Stores and applies light/dark/auto color mode.
 */
export default function useColorMode(options: UseColorModeOptions = {}): UseColorModeReturn {
  const {
    storageKey = 'use-react-color-mode',
    attribute = 'data-theme',
    element = typeof document !== 'undefined' ? document.documentElement : null,
  } = options

  const prefersDark = usePreferredDark()
  const [mode, setMode] = useLocalStorage<ColorMode>(storageKey, 'auto')

  const isDark = useMemo(() => (mode === 'auto' ? prefersDark : mode === 'dark'), [mode, prefersDark])

  useEffect(() => {
    if (!element) return

    const resolved = isDark ? 'dark' : 'light'
    if (attribute === 'class') {
      element.classList.toggle('dark', resolved === 'dark')
      element.classList.toggle('light', resolved === 'light')
      return
    }

    element.setAttribute(attribute, resolved)
  }, [attribute, element, isDark])

  const toggle = useCallback(() => {
    setMode((prev) => {
      const current = prev ?? 'auto'
      if (current === 'dark') return 'light'
      if (current === 'light') return 'dark'
      return prefersDark ? 'light' : 'dark'
    })
  }, [prefersDark, setMode])

  return { mode, isDark, setMode, toggle }
}
```

### JavaScript

```js
import { useCallback, useEffect, useMemo } from 'react'
import useLocalStorage from './useLocalStorage'
import usePreferredDark from './usePreferredDark'

export default function useColorMode(options = {}) {
  const {
    storageKey = 'use-react-color-mode',
    attribute = 'data-theme',
    element = typeof document !== 'undefined' ? document.documentElement : null,
  } = options

  const prefersDark = usePreferredDark()
  const [mode, setMode] = useLocalStorage(storageKey, 'auto')

  const isDark = useMemo(() => (mode === 'auto' ? prefersDark : mode === 'dark'), [mode, prefersDark])

  useEffect(() => {
    if (!element) return

    const resolved = isDark ? 'dark' : 'light'
    if (attribute === 'class') {
      element.classList.toggle('dark', resolved === 'dark')
      element.classList.toggle('light', resolved === 'light')
      return
    }

    element.setAttribute(attribute, resolved)
  }, [attribute, element, isDark])

  const toggle = useCallback(() => {
    setMode((prev) => {
      const current = prev ?? 'auto'
      if (current === 'dark') return 'light'
      if (current === 'light') return 'dark'
      return prefersDark ? 'light' : 'dark'
    })
  }, [prefersDark, setMode])

  return { mode, isDark, setMode, toggle }
}
```
