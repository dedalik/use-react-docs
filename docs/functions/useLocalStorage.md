---
title: Persist state in localStorage
sidebar_label: useLocalStorage
category: Storage
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useLocalStorage'
description: >-
  useLocalStorage from @dedalik/use-react: Persist state in localStorage.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useLocalStorage()

<PackageData fn="useLocalStorage" />

Last updated: 23/04/2026, 15:56

## Overview

`useLocalStorage` syncs React state with browser `localStorage` and keeps a fallback when storage is unavailable.

It is beginner-friendly for persisted settings (theme, layout, filters) and includes options for SSR-safe initialization and custom serialization.

### What it accepts

- `key`: storage key.
- `initialValue`: initial state or lazy initializer function.
- `options` (optional): serializer, deserializer, and storage behavior flags.

### What it returns

- `[value, setValue, removeValue]` tuple for reading, updating, and clearing persisted state.

`useLocalStorage` stores React state in `localStorage` while remaining safe for SSR and privacy-sensitive environments. If storage is unavailable or disabled, it keeps state in memory.

## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import { useState } from 'react'
import useLocalStorage from '@dedalik/use-react/useLocalStorage'

function NotesFieldExample() {
  const [notes, setNotes, clearNotes] = useLocalStorage('usage-demo-notes', '')

  return (
    <div>
      <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
      <button type='button' onClick={() => clearNotes()}>
        Clear storage
      </button>
      <p>Also in localStorage key: usage-demo-notes</p>
    </div>
  )
}

export default function NotesFieldDemo() {
  return <NotesFieldExample />
}
```

## API Reference

### `useLocalStorage`

**Signature:** `useLocalStorage<T>(key, initialValue, options?)`

#### Parameters

1. **`key`** - `localStorage` key string.
2. **`initialValue`** - Initial value or lazy `() => T` when nothing is stored yet.
3. **`options`** (optional) - `initializeWithValue`, `enabled`, `serializer`, `deserializer`, `storage`.

#### Returns

Tuple `[value, setValue, removeValue]` - same ergonomics as `useState`, plus explicit removal from storage.

## Copy-paste hook

```tsx
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'

type InitialValue<T> = T | (() => T)
type SetValue<T> = Dispatch<SetStateAction<T>>

export interface UseLocalStorageOptions<T> {
  initializeWithValue?: boolean
  enabled?: boolean
  serializer?: (value: T) => string
  deserializer?: (value: string) => T
  storage?: Storage
}

type UseLocalStorageReturn<T> = [T, SetValue<T>, () => void]

const isBrowser = typeof window !== 'undefined'

export default function useLocalStorage<T>(
  key: string,
  initialValue: InitialValue<T>,
  options: UseLocalStorageOptions<T> = {},
): UseLocalStorageReturn<T> {
  const {
    initializeWithValue = true,
    enabled = true,
    serializer = JSON.stringify,
    deserializer = JSON.parse as (value: string) => T,
    storage = isBrowser ? window.localStorage : undefined,
  } = options

  const getInitialValue = useCallback((): T => {
    return initialValue instanceof Function ? initialValue() : initialValue
  }, [initialValue])

  const readValue = useCallback((): T => {
    const fallback = getInitialValue()

    if (!isBrowser || !enabled || !storage) {
      return fallback
    }

    try {
      const rawValue = storage.getItem(key)
      return rawValue ? deserializer(rawValue) : fallback
    } catch {
      return fallback
    }
  }, [deserializer, enabled, getInitialValue, key, storage])

  const [storedValue, setStoredValue] = useState<T>(() => (initializeWithValue ? readValue() : getInitialValue()))

  useEffect(() => {
    if (!initializeWithValue) {
      setStoredValue(readValue())
    }
  }, [initializeWithValue, readValue])

  const setValue: SetValue<T> = useCallback(
    (value) => {
      setStoredValue((currentValue) => {
        const valueToStore = value instanceof Function ? value(currentValue) : value

        if (!isBrowser || !enabled || !storage) {
          return valueToStore
        }

        try {
          storage.setItem(key, serializer(valueToStore))
        } catch {
          // Ignore quota and privacy mode errors and keep state in memory.
        }

        return valueToStore
      })
    },
    [enabled, key, serializer, storage],
  )

  const removeValue = useCallback(() => {
    const fallback = getInitialValue()
    setStoredValue(fallback)

    if (!isBrowser || !enabled || !storage) {
      return
    }

    try {
      storage.removeItem(key)
    } catch {
      // Ignore privacy mode errors and keep state in memory.
    }
  }, [enabled, getInitialValue, key, storage])

  useEffect(() => {
    if (!isBrowser || !enabled || !storage) {
      return
    }

    const onStorage = (event: StorageEvent) => {
      if (event.storageArea !== storage || event.key !== key) {
        return
      }

      if (event.newValue == null) {
        setStoredValue(getInitialValue())
        return
      }

      try {
        setStoredValue(deserializer(event.newValue))
      } catch {
        setStoredValue(getInitialValue())
      }
    }

    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [deserializer, enabled, getInitialValue, key, storage])

  return useMemo(() => [storedValue, setValue, removeValue], [removeValue, setValue, storedValue])
}

export type UseLocalStorageType = ReturnType<typeof useLocalStorage>
```

### JavaScript version

```js
import { useCallback, useEffect, useMemo, useState } from 'react'

const isBrowser = typeof window !== 'undefined'
export default function useLocalStorage(key, initialValue, options = {}) {
  const {
    initializeWithValue = true,
    enabled = true,
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    storage = isBrowser ? window.localStorage : undefined,
  } = options

  const getInitialValue = useCallback(() => {
    return initialValue instanceof Function ? initialValue() : initialValue
  }, [initialValue])

  const readValue = useCallback(() => {
    const fallback = getInitialValue()

    if (!isBrowser || !enabled || !storage) {
      return fallback
    }
    try {
      const rawValue = storage.getItem(key)
      return rawValue ? deserializer(rawValue) : fallback
    } catch {
      return fallback
    }
  }, [deserializer, enabled, getInitialValue, key, storage])

  const [storedValue, setStoredValue] = useState(() => (initializeWithValue ? readValue() : getInitialValue()))

  useEffect(() => {
    if (!initializeWithValue) {
      setStoredValue(readValue())
    }
  }, [initializeWithValue, readValue])

  const setValue = useCallback(
    (value) => {
      setStoredValue((currentValue) => {
        const valueToStore = value instanceof Function ? value(currentValue) : value

        if (!isBrowser || !enabled || !storage) {
          return valueToStore
        }
        try {
          storage.setItem(key, serializer(valueToStore))
        } catch {
          // Ignore quota and privacy mode errors and keep state in memory.
        }
        return valueToStore
      })
    },
    [enabled, key, serializer, storage],
  )

  const removeValue = useCallback(() => {
    const fallback = getInitialValue()
    setStoredValue(fallback)

    if (!isBrowser || !enabled || !storage) {
      return
    }
    try {
      storage.removeItem(key)
    } catch {
      // Ignore privacy mode errors and keep state in memory.
    }
  }, [enabled, getInitialValue, key, storage])

  useEffect(() => {
    if (!isBrowser || !enabled || !storage) {
      return
    }

    const onStorage = (event) => {
      if (event.storageArea !== storage || event.key !== key) {
        return
      }

      if (event.newValue == null) {
        setStoredValue(getInitialValue())
        return
      }
      try {
        setStoredValue(deserializer(event.newValue))
      } catch {
        setStoredValue(getInitialValue())
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [deserializer, enabled, getInitialValue, key, storage])

  return useMemo(() => [storedValue, setValue, removeValue], [removeValue, setValue, storedValue])
}
```

## Type declarations

```ts
declare function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T),
  options?: {
    initializeWithValue?: boolean
    enabled?: boolean
    serializer?: (value: T) => string
    deserializer?: (value: string) => T
    storage?: Storage
  },
): [T, React.Dispatch<React.SetStateAction<T>>, () => void]

export default useLocalStorage
```
