---
title: Persist state in sessionStorage
sidebar_label: useSessionStorage
category: Storage
hide_table_of_contents: false
demoUrl: ''
demoSourceUrl: 'https://github.com/dedalik/use-react/tree/main/src/hooks/useSessionStorage'
description: >-
  useSessionStorage from @dedalik/use-react: Persist state in sessionStorage.
  TypeScript, tree-shakable import, examples, SSR notes.
---

# useSessionStorage()

<PackageData fn="useSessionStorage" />


Last updated: 23/04/2026, 15:56
## Overview

`useSessionStorage` stores state in session storage for the current browser tab session.

It behaves similarly to local storage hooks but data resets when the session ends, which is useful for temporary UI state.

### What it accepts

- `key`: storage key.
- `initialValue`: initial state or lazy initializer.
- `options` (optional): serializer and deserializer config.

### What it returns

- `[value, setValue, removeValue]` tuple.


## Usage

Copy-paste ready sample: a small inner component calls the hook, and the default export is a thin demo wrapper you can drop into any route or sandbox.

```tsx
import { useState } from "react";
import useSessionStorage from "@dedalik/use-react/useSessionStorage";

function SessionDraftExample() {
  const [draft, setDraft, removeDraft] = useSessionStorage("usage-demo-draft", "");

  return (
    <div>
      <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={3} />
      <button type="button" onClick={() => removeDraft()}>
        Clear session draft
      </button>
    </div>
  );
}

export default function SessionDraftDemo() {
  return <SessionDraftExample />;
}
```

## API Reference

### `useSessionStorage`

**Signature:** `useSessionStorage<T>(key, initialValue, options?)`

#### Parameters

1. **`key`** - `sessionStorage` key.
2. **`initialValue`** - Initial value or lazy initializer.
3. **`options`** (optional) - `initializeWithValue`, `serializer`, `deserializer`.

#### Returns

Tuple `[value, setValue, removeValue]` mirroring `useState` plus storage removal.

## Copy-paste hook

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

### JavaScript version

```js
import { useCallback, useEffect, useMemo, useState } from "react";

const isBrowser = typeof window !== 'undefined';
export default function useSessionStorage(
  key,
  initialValue,
  options = {}
) {
  const {
    initializeWithValue = true,
    serializer = JSON.stringify,
    deserializer = JSON.parse,
  } = options;

  const getInitialValue = useCallback(() => {
    return initialValue instanceof Function
      ? initialValue()
      : initialValue;
  }, [initialValue]);

  const readValue = useCallback(() => {
    const fallback = getInitialValue();

    if (!isBrowser) return fallback;
    try {
      const rawValue = window.sessionStorage.getItem(key);
      return rawValue ? deserializer(rawValue) : fallback;
    } catch {
      return fallback;
    }
  }, [deserializer, getInitialValue, key]);

  const [storedValue, setStoredValue] = useState(() =>
    initializeWithValue ? readValue() : getInitialValue()
  );

  useEffect(() => {
    if (!initializeWithValue) {
      setStoredValue(readValue());
    }
  }, [initializeWithValue, readValue]);

  const setValue = useCallback(
    (value) => {
      setStoredValue((currentValue) => {
        const valueToStore =
          value instanceof Function ? value(currentValue) : value;

        if (isBrowser) {
          try {
            window.sessionStorage.setItem(
              key,
              serializer(valueToStore)
            );
          } catch {
            // Keep in-memory state when storage write fails.
          }
        }
        return valueToStore;
      });
    },
    [key, serializer]
  );

  const removeValue = useCallback(() => {
    const fallback = getInitialValue();
    setStoredValue(fallback);

    if (!isBrowser) return;
    try {
      window.sessionStorage.removeItem(key);
    } catch {
      // Keep in-memory fallback when storage removal fails.
    }
  }, [getInitialValue, key]);

  return useMemo(
    () => [storedValue, setValue, removeValue],
    [removeValue, setValue, storedValue]
  );
}
```
