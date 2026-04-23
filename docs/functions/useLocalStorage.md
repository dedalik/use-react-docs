---
title: useLocalStorage Hook for Persistent State
sidebar_label: useLocalStorage
category: Storage
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useLocalStorage"
---

# useLocalStorage()

<PackageData fn="useLocalStorage" />

## Overview

`useLocalStorage` stores React state in `localStorage` while remaining safe for SSR and privacy-sensitive environments. If storage is unavailable or disabled, it keeps state in memory.

## Usage

```tsx
import { useLocalStorage } from "@dedalik/use-react";

const ThemeSwitcher = () => {
  const [theme, setTheme, removeTheme] = useLocalStorage("theme", "light", {
    enabled: true,
  });

  return (
    <div>
      <p>Theme: {theme}</p>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={removeTheme}>Reset</button>
    </div>
  );
};
```

## Copy-paste hook

```tsx
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";

type InitialValue<T> = T | (() => T);
type SetValue<T> = Dispatch<SetStateAction<T>>;

export interface UseLocalStorageOptions<T> {
  initializeWithValue?: boolean;
  enabled?: boolean;
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  storage?: Storage;
}

type UseLocalStorageReturn<T> = [T, SetValue<T>, () => void];

const isBrowser = typeof window !== "undefined";

export default function useLocalStorage<T>(
  key: string,
  initialValue: InitialValue<T>,
  options: UseLocalStorageOptions<T> = {}
): UseLocalStorageReturn<T> {
  const {
    initializeWithValue = true,
    enabled = true,
    serializer = JSON.stringify,
    deserializer = JSON.parse as (value: string) => T,
    storage = isBrowser ? window.localStorage : undefined,
  } = options;

  const getInitialValue = useCallback((): T => {
    return initialValue instanceof Function ? initialValue() : initialValue;
  }, [initialValue]);

  const readValue = useCallback((): T => {
    const fallback = getInitialValue();

    if (!isBrowser || !enabled || !storage) {
      return fallback;
    }

    try {
      const rawValue = storage.getItem(key);
      return rawValue ? deserializer(rawValue) : fallback;
    } catch {
      return fallback;
    }
  }, [deserializer, enabled, getInitialValue, key, storage]);

  const [storedValue, setStoredValue] = useState<T>(() =>
    initializeWithValue ? readValue() : getInitialValue()
  );

  useEffect(() => {
    if (!initializeWithValue) {
      setStoredValue(readValue());
    }
  }, [initializeWithValue, readValue]);

  const setValue: SetValue<T> = useCallback(
    (value) => {
      setStoredValue((currentValue) => {
        const valueToStore = value instanceof Function ? value(currentValue) : value;

        if (!isBrowser || !enabled || !storage) {
          return valueToStore;
        }

        try {
          storage.setItem(key, serializer(valueToStore));
        } catch {
          // Ignore quota and privacy mode errors and keep state in memory.
        }

        return valueToStore;
      });
    },
    [enabled, key, serializer, storage]
  );

  const removeValue = useCallback(() => {
    const fallback = getInitialValue();
    setStoredValue(fallback);

    if (!isBrowser || !enabled || !storage) {
      return;
    }

    try {
      storage.removeItem(key);
    } catch {
      // Ignore privacy mode errors and keep state in memory.
    }
  }, [enabled, getInitialValue, key, storage]);

  useEffect(() => {
    if (!isBrowser || !enabled || !storage) {
      return;
    }

    const onStorage = (event: StorageEvent) => {
      if (event.storageArea !== storage || event.key !== key) {
        return;
      }

      if (event.newValue == null) {
        setStoredValue(getInitialValue());
        return;
      }

      try {
        setStoredValue(deserializer(event.newValue));
      } catch {
        setStoredValue(getInitialValue());
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [deserializer, enabled, getInitialValue, key, storage]);

  return useMemo(() => [storedValue, setValue, removeValue], [removeValue, setValue, storedValue]);
}
```

## Type declarations

```ts
declare function useLocalStorage<T>(
  key: string,
  initialValue: T | (() => T),
  options?: {
    initializeWithValue?: boolean;
    enabled?: boolean;
    serializer?: (value: T) => string;
    deserializer?: (value: string) => T;
    storage?: Storage;
  }
): [T, React.Dispatch<React.SetStateAction<T>>, () => void];

export default useLocalStorage;
```
