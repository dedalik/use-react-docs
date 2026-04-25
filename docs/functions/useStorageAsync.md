---
title: Async storage-backed state
sidebar_label: useStorageAsync
category: State
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/blob/main/src/hooks/useStorageAsync.tsx'
description: >-
  useStorageAsync from @dedalik/use-react: persist state in async storage backends.
---

# useStorageAsync()

<PackageData fn="useStorageAsync" />

Last updated: 24/04/2026

## Overview

`useStorageAsync` works like `useState` backed by an asynchronous storage engine (for example IndexedDB wrappers, React Native AsyncStorage, or custom remote/local adapters). On mount it loads and parses the stored value by `key`, exposes a `loading` flag during hydration, and returns async `set`/`remove` helpers that keep React state and persistent storage in sync.

### What it accepts

- `storage: AsyncStorageLike`.
- `key: string`.
- `initialValue: T`.
- `options: UseStorageAsyncOptions<T> = {}`.

### What it returns

- Position **1**: `T`.
- Position **2**: `boolean`.
- Position **3**: `(next: T) => Promise<void>`.
- Position **4**: `() => Promise<void>`.

## Usage

Real-world example: persist user preferences with an async storage adapter and custom parser/serializer.

```tsx
import { useMemo } from 'react'
import useStorageAsync from '@dedalik/use-react/useStorageAsync'

type Preferences = {
  language: 'en' | 'de'
  compactMode: boolean
}

function Example() {
  const memoryStorage = useMemo(() => {
    const map = new Map<string, string>()
    return {
      async getItem(key: string) {
        return map.get(key) ?? null
      },
      async setItem(key: string, value: string) {
        map.set(key, value)
      },
      async removeItem(key: string) {
        map.delete(key)
      },
    }
  }, [])

  const [prefs, loading, setPrefs, clearPrefs] = useStorageAsync<Preferences>(
    memoryStorage,
    'demo:async-preferences',
    { language: 'en', compactMode: false },
    {
      serializer: (value) => JSON.stringify(value),
      parser: (raw) => JSON.parse(raw) as Preferences,
    },
  )

  return (
    <div>
      <h3>Async Preferences</h3>

      {loading ? (
        <p>Loading persisted preferences…</p>
      ) : (
        <>
          <p>Language: {prefs.language}</p>
          <p>Compact mode: {prefs.compactMode ? 'Enabled' : 'Disabled'}</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type='button'
              onClick={() =>
                void setPrefs({
                  ...prefs,
                  language: prefs.language === 'en' ? 'de' : 'en',
                })
              }
            >
              Toggle language
            </button>
            <button type='button' onClick={() => void setPrefs({ ...prefs, compactMode: !prefs.compactMode })}>
              Toggle compact mode
            </button>
            <button type='button' onClick={() => void clearPrefs()}>
              Reset preferences
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default function Demo() {
  return <Example />
}
```

## API Reference

### `useStorageAsync`

**Signature:** `useStorageAsync(storage: AsyncStorageLike, key: string, initialValue: T, options: UseStorageAsyncOptions<T> = {}): [T, boolean, (next: T) => Promise<void>, () => Promise<void>]`

#### Parameters

1. **`storage`** (`AsyncStorageLike`) - See type in signature.
2. **`key`** (`string`) - See type in signature.
3. **`initialValue`** (`T`) - See type in signature.
4. **`options`** (optional `UseStorageAsyncOptions<T>`) - See type in signature. Default: `{}`.

#### Returns

Tuple:

1. `T`
2. `boolean`
3. `(next: T) => Promise<void>`
4. `() => Promise<void>`

## Copy-paste hook

```tsx
import { useCallback, useEffect, useState } from 'react'

export interface AsyncStorageLike {
  getItem: (key: string) => Promise<string | null>
  setItem: (key: string, value: string) => Promise<void>
  removeItem: (key: string) => Promise<void>
}

export interface UseStorageAsyncOptions<T> {
  serializer?: (value: T) => string
  parser?: (raw: string) => T
}

/**
 * Async storage-backed state with loading flag.
 */
export default function useStorageAsync<T>(
  storage: AsyncStorageLike,
  key: string,
  initialValue: T,
  options: UseStorageAsyncOptions<T> = {},
): [T, boolean, (next: T) => Promise<void>, () => Promise<void>] {
  const { serializer = JSON.stringify, parser = JSON.parse } = options
  const [value, setValue] = useState(initialValue)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const load = async () => {
      setLoading(true)
      try {
        const raw = await storage.getItem(key)
        if (!active) return
        setValue(raw == null ? initialValue : parser(raw))
      } catch {
        if (active) setValue(initialValue)
      } finally {
        if (active) setLoading(false)
      }
    }

    void load()

    return () => {
      active = false
    }
  }, [initialValue, key, parser, storage])

  const set = useCallback(
    async (next: T) => {
      setValue(next)
      await storage.setItem(key, serializer(next))
    },
    [key, serializer, storage],
  )

  const remove = useCallback(async () => {
    await storage.removeItem(key)
    setValue(initialValue)
  }, [initialValue, key, storage])

  return [value, loading, set, remove]
}
```

```js
import { useCallback, useEffect, useState } from 'react'

export default function useStorageAsync(storage, key, initialValue, options = {}) {
  const { serializer = JSON.stringify, parser = JSON.parse } = options
  const [value, setValue] = useState(initialValue)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    const load = async () => {
      setLoading(true)
      try {
        const raw = await storage.getItem(key)
        if (!active) return
        setValue(raw == null ? initialValue : parser(raw))
      } catch {
        if (active) setValue(initialValue)
      } finally {
        if (active) setLoading(false)
      }
    }

    void load()

    return () => {
      active = false
    }
  }, [initialValue, key, parser, storage])

  const set = useCallback(
    async (next) => {
      setValue(next)
      await storage.setItem(key, serializer(next))
    },
    [key, serializer, storage],
  )

  const remove = useCallback(async () => {
    await storage.removeItem(key)
    setValue(initialValue)
  }, [initialValue, key, storage])

  return [value, loading, set, remove]
}
```
