---
title: useDebounce Hook for Delayed Value Updates
sidebar_label: useDebounce
category: State
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useDebounce"
---

# useDebounce()

<PackageData fn="useDebounce" />

## Overview

`useDebounce` postpones value updates until the value stops changing for a specified delay. It is useful for search inputs and API calls where every keystroke should not trigger a request.

## Usage

```tsx
import { useState } from "react";
import { useDebounce } from "@dedalik/use-react";

const SearchBox = () => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);

  return (
    <div>
      <input value={query} onChange={(event) => setQuery(event.target.value)} />
      <p>Debounced value: {debouncedQuery}</p>
    </div>
  );
};
```

## Copy-paste hook

```tsx
import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeoutId = globalThis.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      globalThis.clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

## Type declarations

```ts
declare function useDebounce<T>(value: T, delay?: number): T;
export default useDebounce;
```
