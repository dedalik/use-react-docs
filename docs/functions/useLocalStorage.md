---
title: Persist state in localStorage
sidebar_label: useLocalStorage
category: Storage
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useLocalStorage.tsx'
description: >-
  useLocalStorage from @dedalik/use-react: useState-like API backed by localStorage, sync, SSR-safe.
---

# useLocalStorage()

<PackageData fn="useLocalStorage" />

Last updated: 24/04/2026

## Overview

`useLocalStorage` mirrors **`useState`** with a persistent layer: you pass a **storage key**, an **initial value** (or lazy initializer), and optional **options**. On each **set**, it updates React state and **writes** through **`serializer`** (default **`JSON.stringify`**) to **`localStorage`** (or a custom **`storage`**). Reads use **`deserializer`** (default **`JSON.parse`)**. If **`enabled`** is false, **`localStorage`** is missing, or a write **throws** (quota, private mode), state still updates **in memory**. It listens to the global **`storage`** event so **other tabs** editing the same key rehydrate this hook. **`removeValue`** clears the key and resets to **initial**. **`initializeWithValue: false`** defers the first read until after mount (avoids some SSR footguns). Defaults assume a **browser**; on the **server** it uses **initial** only.

### What it accepts

1. **`key`**: `string`
2. **`initialValue`**: `T` or `() => T`
3. **`options`** (optional): `initializeWithValue?`, `enabled?`, `serializer?`, `deserializer?`, `storage?`

### What it returns

- **Tuple** `[T, setValue, removeValue]` - **`setValue`** like **`useState`**, **`removeValue`** clears storage and resets to initial

## Usage

Persist **theme** and a **reset**; optional **`enabled`** stays useful when gating for tests or embeds.

```tsx
import useLocalStorage from '@dedalik/use-react/useLocalStorage'

function Example() {
  const [theme, setTheme, remove] = useLocalStorage<'light' | 'dark'>('app:theme', 'light', {
    enabled: true,
    initializeWithValue: true,
  })

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button type='button' onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>
        Toggle
      </button>
      <button type='button' onClick={remove}>
        Use default
      </button>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useLocalStorage`

**Signature:** `useLocalStorage<T>(key: string, initialValue: InitialValue<T>, options?: UseLocalStorageOptions<T>): [T, SetValue<T>, () => void]`

## Copy-paste hook

### TypeScript

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

### JavaScript

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
