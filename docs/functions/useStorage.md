---
title: Storage-backed state
sidebar_label: useStorage
category: State
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useStorage.tsx'
description: >-
  useStorage from @dedalik/use-react: persist state in localStorage-compatible storage.
---

# useStorage()

<PackageData fn="useStorage" />
<HookLiveDemo demo="useStorage/basic" title="Live demo: useStorage" />

## Overview

`useStorage` behaves like `useState`, but synchronizes the value with a storage key (localStorage by default) so state survives page reloads. On mount it reads and parses an existing value (or falls back to `initialValue`), then writes updates via a serializer; it also exposes `remove` to clear storage and reset local state back to the initial value.

### What it accepts

- `key: string`.
- `initialValue: T`.
- `options: UseStorageOptions<T> = {}`.

### What it returns

- Position **1**: `T`.
- Position **2**: `(next: T) => void`.
- Position **3**: `() => void`.

## Usage

Real-world example: persist UI preferences in `localStorage` with a custom parser/serializer.

```tsx
import useStorage from '@dedalik/use-react/useStorage'

type Preferences = {
  theme: 'light' | 'dark'
  compactMode: boolean
}

function Example() {
  const [prefs, setPrefs, clearPrefs] = useStorage<Preferences>(
    'demo:preferences',
    { theme: 'light', compactMode: false },
    {
      serializer: (value) => JSON.stringify(value),
      parser: (raw) => JSON.parse(raw) as Preferences,
      storage: window.localStorage,
    },
  )

  return (
    <div>
      <h3>Preferences</h3>

      <p>Theme: {prefs.theme}</p>
      <p>Compact mode: {prefs.compactMode ? 'Enabled' : 'Disabled'}</p>

      <div style={{ display: 'flex', gap: 8 }}>
        <button type='button' onClick={() => setPrefs({ ...prefs, theme: prefs.theme === 'light' ? 'dark' : 'light' })}>
          Toggle theme
        </button>
        <button type='button' onClick={() => setPrefs({ ...prefs, compactMode: !prefs.compactMode })}>
          Toggle compact mode
        </button>
        <button type='button' onClick={clearPrefs}>
          Reset preferences
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

### `useStorage`

**Signature:** `useStorage(key: string, initialValue: T, options: UseStorageOptions<T> = {}): [T, (next: T) => void, () => void]`

#### Parameters

1. **`key`** (`string`) - See type in signature.
2. **`initialValue`** (`T`) - See type in signature.
3. **`options`** (optional `UseStorageOptions<T>`) - See type in signature. Default: `{}`.

#### Returns

Tuple:

1. `T`
2. `(next: T) => void`
3. `() => void`

## Copy-paste hook

```tsx
import { useCallback, useEffect, useRef, useState } from 'react'

export interface UseStorageOptions<T> {
  serializer?: (value: T) => string
  parser?: (raw: string) => T
  storage?: Storage
}

/**
 * Persists state in storage under a key.
 */
export default function useStorage<T>(
  key: string,
  initialValue: T,
  options: UseStorageOptions<T> = {},
): [T, (next: T) => void, () => void] {
  const { serializer = JSON.stringify, parser = JSON.parse, storage = window.localStorage } = options
  const skipPersistRef = useRef(false)

  const [value, setValue] = useState<T>(() => {
    try {
      const raw = storage.getItem(key)
      return raw == null ? initialValue : parser(raw)
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    if (skipPersistRef.current) {
      skipPersistRef.current = false
      return
    }
    try {
      storage.setItem(key, serializer(value))
    } catch {
      // ignore storage write failures
    }
  }, [key, serializer, storage, value])

  const set = useCallback((next: T) => {
    setValue(next)
  }, [])

  const remove = useCallback(() => {
    try {
      storage.removeItem(key)
    } catch {
      // ignore storage remove failures
    }
    skipPersistRef.current = true
    setValue(initialValue)
  }, [initialValue, key, storage])

  return [value, set, remove]
}
```

```js
import { useCallback, useEffect, useRef, useState } from 'react'

export default function useStorage(key, initialValue, options = {}) {
  const { serializer = JSON.stringify, parser = JSON.parse, storage = window.localStorage } = options
  const skipPersistRef = useRef(false)

  const [value, setValue] = useState(() => {
    try {
      const raw = storage.getItem(key)
      return raw == null ? initialValue : parser(raw)
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    if (skipPersistRef.current) {
      skipPersistRef.current = false
      return
    }
    try {
      storage.setItem(key, serializer(value))
    } catch {
      // ignore storage write failures
    }
  }, [key, serializer, storage, value])

  const set = useCallback((next) => {
    setValue(next)
  }, [])

  const remove = useCallback(() => {
    try {
      storage.removeItem(key)
    } catch {
      // ignore storage remove failures
    }
    skipPersistRef.current = true
    setValue(initialValue)
  }, [initialValue, key, storage])

  return [value, set, remove]
}
```
