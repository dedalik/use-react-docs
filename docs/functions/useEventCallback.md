---
title: useEventCallback Hook
sidebar_label: useEventCallback
category: State
hide_table_of_contents: false
demoUrl: ""
demoSourceUrl: "https://github.com/dedalik/use-react/tree/main/src/hooks/useEventCallback"
---

# useEventCallback()

<PackageData fn="useEventCallback" />

## Usage

```tsx
const onChange = useEventCallback((nextValue: string) => {
  // always uses latest closure values
});
```

## Copy-paste hook

```tsx
import { useCallback, useRef } from "react";

type AnyFunction = (...args: any[]) => any;

export default function useEventCallback<T extends AnyFunction>(fn: T): T {
  const fnRef = useRef(fn);
  fnRef.current = fn;
  return useCallback((...args: Parameters<T>) => fnRef.current(...args), []) as T;
}
```
