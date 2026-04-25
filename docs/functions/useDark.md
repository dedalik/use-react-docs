---
title: Manage dark mode state and DOM classes
sidebar_label: useDark
category: Browser
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useDark.tsx'
description: >-
  useDark from @dedalik/use-react: persisted dark mode state with DOM class sync.
---

# useDark()

<PackageData fn="useDark" />

Last updated: 24/04/2026

## Overview

`useDark` combines **`usePreferredDark`** (system preference) with **`useLocalStorage`** so the user’s manual choice survives reloads: the boolean stored under **`storageKey`** seeds from the OS when no value exists, then an effect toggles **`classNameDark`** / **`classNameLight`** on **`element`** (default `<html>`) whenever `isDark` changes-handy for Tailwind-style `class="dark"` roots or scoped theme containers. The tuple **`[isDark, set, reset]`** mirrors common ergonomics: **`set(next)`** persists the override, **`reset()`** removes the key so the next read falls back to **`usePreferredDark`** again. Pass a custom **`element`** when you only want to theme a subtree (portal, embed) instead of the whole document.

### What it accepts

- Optional **`storageKey`** - `localStorage` key for the boolean. Default `'use-react-color-scheme'`.
- Optional **`classNameDark`** / **`classNameLight`** - Classes toggled exclusively on **`element`**. Defaults `'dark'` / `'light'`.
- Optional **`element`** - Node receiving classes; default `document.documentElement` in the browser, `null` during SSR.

### What it returns

- Tuple **`[isDark, set, reset]`** - Current dark flag, setter, and storage reset.

## Usage

Explicit options: custom key, class names, and **`document.documentElement`** so the snippet shows every parameter (same behavior as defaults, but visible).

```tsx
import useDark from '@dedalik/use-react/useDark'

function Example() {
  const [isDark, setDark, resetDark] = useDark({
    storageKey: 'docs:use-dark-demo',
    classNameDark: 'demo-dark',
    classNameLight: 'demo-light',
    element: typeof document !== 'undefined' ? document.documentElement : null,
  })

  return (
    <div>
      <h3>Theme</h3>
      <p>
        Stored dark mode: <strong>{isDark ? 'on' : 'off'}</strong> (see <code>&lt;html&gt;</code> class list in
        devtools).
      </p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button type='button' onClick={() => setDark(true)}>
          Dark
        </button>
        <button type='button' onClick={() => setDark(false)}>
          Light
        </button>
        <button type='button' onClick={resetDark}>
          Reset (follow system)
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

### `useDark`

**Signature:** `useDark(options?: UseDarkOptions): [boolean, (next: boolean) => void, () => void]`

#### Parameters

Optional **`UseDarkOptions`**:

- **`storageKey`** (`string`) - Key for persisted boolean. Default `'use-react-color-scheme'`.
- **`classNameDark`** / **`classNameLight`** (`string`) - Mutually exclusive classes on **`element`**. Defaults `'dark'` / `'light'`.
- **`element`** (`HTMLElement | null`) - Target for `classList.toggle`. Default `document.documentElement` when `document` exists.

#### Returns

Tuple:

1. **`isDark`** (`boolean`) - Persisted value (initialized from system preference when unset).
2. **`set`** (`(next: boolean) => void`) - Updates storage and triggers class sync.
3. **`reset`** (`() => void`) - Removes the storage entry so preference reverts to system on next read.

## Copy-paste hook

### TypeScript

```tsx
import { useCallback, useEffect } from 'react'
import useLocalStorage from './useLocalStorage'
import usePreferredDark from './usePreferredDark'

export interface UseDarkOptions {
  storageKey?: string
  classNameDark?: string
  classNameLight?: string
  element?: HTMLElement | null
}

/**
 * Manages dark mode preference and syncs DOM classes.
 */
export default function useDark(options: UseDarkOptions = {}): [boolean, (next: boolean) => void, () => void] {
  const {
    storageKey = 'use-react-color-scheme',
    classNameDark = 'dark',
    classNameLight = 'light',
    element = typeof document !== 'undefined' ? document.documentElement : null,
  } = options

  const preferredDark = usePreferredDark()
  const [isDark, setIsDark, removeIsDark] = useLocalStorage<boolean>(storageKey, preferredDark)

  useEffect(() => {
    if (!element) return
    element.classList.toggle(classNameDark, isDark)
    element.classList.toggle(classNameLight, !isDark)
  }, [classNameDark, classNameLight, element, isDark])

  const set = useCallback((next: boolean) => setIsDark(next), [setIsDark])
  const reset = useCallback(() => removeIsDark(), [removeIsDark])

  return [isDark, set, reset]
}
```

### JavaScript

```js
import { useCallback, useEffect } from 'react'
import useLocalStorage from './useLocalStorage'
import usePreferredDark from './usePreferredDark'

export default function useDark(options = {}) {
  const {
    storageKey = 'use-react-color-scheme',
    classNameDark = 'dark',
    classNameLight = 'light',
    element = typeof document !== 'undefined' ? document.documentElement : null,
  } = options

  const preferredDark = usePreferredDark()
  const [isDark, setIsDark, removeIsDark] = useLocalStorage(storageKey, preferredDark)

  useEffect(() => {
    if (!element) return
    element.classList.toggle(classNameDark, isDark)
    element.classList.toggle(classNameLight, !isDark)
  }, [classNameDark, classNameLight, element, isDark])

  const set = useCallback((next) => setIsDark(next), [setIsDark])
  const reset = useCallback(() => removeIsDark(), [removeIsDark])

  return [isDark, set, reset]
}
```
