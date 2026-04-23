---
title: useSessionStorage Hook
sidebar_label: useSessionStorage
category: Storage
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useSessionStorage"
---

# useSessionStorage()

<PackageData fn="useSessionStorage" />

## Usage

```tsx
const [token, setToken, removeToken] = useSessionStorage("token", "");
```

## Copy-paste hook

```tsx
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";

type InitialValue<T> = T | (() => T);
type SetValue<T> = Dispatch<SetStateAction<T>>;
const isBrowser = typeof window !== "undefined";

export default function useSessionStorage<T>(key: string, initialValue: InitialValue<T>) {
  const getInitialValue = useCallback((): T => {
    return initialValue instanceof Function ? initialValue() : initialValue;
  }, [initialValue]);

  const readValue = useCallback((): T => {
    const fallback = getInitialValue();
    if (!isBrowser) return fallback;
    try {
      const rawValue = window.sessionStorage.getItem(key);
      return rawValue ? (JSON.parse(rawValue) as T) : fallback;
    } catch {
      return fallback;
    }
  }, [getInitialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(() => readValue());

  useEffect(() => {
    setStoredValue(readValue());
  }, [readValue]);

  const setValue: SetValue<T> = useCallback(
    (value) => {
      setStoredValue((currentValue) => {
        const valueToStore = value instanceof Function ? value(currentValue) : value;
        if (isBrowser) window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
        return valueToStore;
      });
    },
    [key]
  );

  const removeValue = useCallback(() => {
    setStoredValue(getInitialValue());
    if (isBrowser) window.sessionStorage.removeItem(key);
  }, [getInitialValue, key]);

  return useMemo(() => [storedValue, setValue, removeValue] as const, [removeValue, setValue, storedValue]);
}
```
