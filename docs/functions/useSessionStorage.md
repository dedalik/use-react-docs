---
title: Persist state in sessionStorage
sidebar_label: useSessionStorage
category: Storage
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useSessionStorage.tsx'
description: >-
  useSessionStorage from @dedalik/use-react: useState-like API backed by sessionStorage.
---

# useSessionStorage()

<PackageData fn="useSessionStorage" />

Last updated: 24/04/2026

## Overview

`useSessionStorage` is the **session-scoped** sibling of [`useLocalStorage`](./useLocalStorage): the same **tuple** shape **`[value, setValue, removeValue]`** and the same default **JSON** serialization, but it reads and writes only **`window.sessionStorage`**. Data **survives** reloads in the same **tab** but is **cleared** when the **tab** closes. There is **no** cross-tab **`storage`** sync (the **`storage`** event does not fire for *same-origin* `sessionStorage` in the same tab the way you usually need for sharing). On **SSR** or if reads/writes **throw**, state still updates in **memory**. **`initializeWithValue: false`** delays the first read until a **`useEffect`** (same pattern as local). Use it for **wizard steps**, **draft** UI state, or anything that should reset when the browsing **session** ends.

### What it accepts

1. **`key`**: `string`
2. **`initialValue`**: `T` or `() => T`
3. **`options`** (optional): `initializeWithValue?`, `serializer?`, `deserializer?`

### What it returns

- **Tuple** `[T, setValue, removeValue]`

## Usage

Track a **checkout step** for the current **session**; **Next** updates both React and **`sessionStorage`**.

```tsx
import useSessionStorage from '@dedalik/use-react/useSessionStorage'

function Example() {
  const [step, setStep, clear] = useSessionStorage('checkout:step', 1, {
    initializeWithValue: true,
  })

  return (
    <div>
      <p>Step {step} of 3</p>
      <button type="button" disabled={step >= 3} onClick={() => setStep((s) => Math.min(3, s + 1))}>
        Next
      </button>
      <button type="button" onClick={clear}>
        Restart flow
      </button>
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useSessionStorage`

**Signature:** `useSessionStorage<T>(key: string, initialValue: InitialValue<T>, options?: UseSessionStorageOptions<T>): [T, SetValue<T>, () => void]`

## Copy-paste hook

### TypeScript

```tsx
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'

type InitialValue<T> = T | (() => T)
type SetValue<T> = Dispatch<SetStateAction<T>>

export interface UseSessionStorageOptions<T> {
  initializeWithValue?: boolean
  serializer?: (value: T) => string
  deserializer?: (value: string) => T
}

const isBrowser = typeof window !== 'undefined'

export default function useSessionStorage<T>(
  key: string,
  initialValue: InitialValue<T>,
  options: UseSessionStorageOptions<T> = {},
): [T, SetValue<T>, () => void] {
  const {
    initializeWithValue = true,
    serializer = JSON.stringify,
    deserializer = JSON.parse as (value: string) => T,
  } = options

  const getInitialValue = useCallback((): T => {
    return initialValue instanceof Function ? initialValue() : initialValue
  }, [initialValue])

  const readValue = useCallback((): T => {
    const fallback = getInitialValue()
    if (!isBrowser) return fallback

    try {
      const rawValue = window.sessionStorage.getItem(key)
      return rawValue ? deserializer(rawValue) : fallback
    } catch {
      return fallback
    }
  }, [deserializer, getInitialValue, key])

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

        if (isBrowser) {
          try {
            window.sessionStorage.setItem(key, serializer(valueToStore))
          } catch {
            // Keep in-memory state when storage write fails.
          }
        }

        return valueToStore
      })
    },
    [key, serializer],
  )

  const removeValue = useCallback(() => {
    const fallback = getInitialValue()
    setStoredValue(fallback)

    if (!isBrowser) return

    try {
      window.sessionStorage.removeItem(key)
    } catch {
      // Keep in-memory fallback when storage removal fails.
    }
  }, [getInitialValue, key])

  return useMemo(() => [storedValue, setValue, removeValue], [removeValue, setValue, storedValue])
}
```

### JavaScript

```js
import { useCallback, useEffect, useMemo, useState } from 'react'

const isBrowser = typeof window !== 'undefined'

export default function useSessionStorage(key, initialValue, options = {}) {
  const {
    initializeWithValue = true,
    serializer = JSON.stringify,
    deserializer = JSON.parse,
  } = options

  const getInitialValue = useCallback(() => {
    return initialValue instanceof Function ? initialValue() : initialValue
  }, [initialValue])

  const readValue = useCallback(() => {
    const fallback = getInitialValue()
    if (!isBrowser) return fallback

    try {
      const rawValue = window.sessionStorage.getItem(key)
      return rawValue ? deserializer(rawValue) : fallback
    } catch {
      return fallback
    }
  }, [deserializer, getInitialValue, key])

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

        if (isBrowser) {
          try {
            window.sessionStorage.setItem(key, serializer(valueToStore))
          } catch {
            // Keep in-memory state when storage write fails.
          }
        }

        return valueToStore
      })
    },
    [key, serializer],
  )

  const removeValue = useCallback(() => {
    const fallback = getInitialValue()
    setStoredValue(fallback)

    if (!isBrowser) return

    try {
      window.sessionStorage.removeItem(key)
    } catch {
      // Keep in-memory fallback when storage removal fails.
    }
  }, [getInitialValue, key])

  return useMemo(() => [storedValue, setValue, removeValue], [removeValue, setValue, storedValue])
}
```
