---
title: useAsync Hook
sidebar_label: useAsync
category: Async
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useAsync"
---

# useAsync()

<PackageData fn="useAsync" />

## Usage

```tsx
const { loading, data, error, execute } = useAsync(fetchUser);
```

## Copy-paste hook

```tsx
import { useCallback, useState } from "react";

export default function useAsync<T, Args extends unknown[]>(
  asyncFunction: (...args: Args) => Promise<T>
) {
  const [state, setState] = useState({
    loading: false,
    data: null as T | null,
    error: null as unknown,
  });

  const execute = useCallback(async (...args: Args): Promise<T> => {
    setState((currentState) => ({ ...currentState, loading: true, error: null }));
    try {
      const data = await asyncFunction(...args);
      setState({ loading: false, data, error: null });
      return data;
    } catch (error) {
      setState({ loading: false, data: null, error });
      throw error;
    }
  }, [asyncFunction]);

  return { ...state, execute };
}
```
